import { writeFileSync, readdirSync, statSync, readFileSync, existsSync, unlinkSync } from 'fs';
import { join, relative } from 'path';

// Use JSZip-style manual approach via archiver pattern
// Since no external deps, we'll use the built-in zlib + manual ZIP format

const ROOT = process.cwd();
const OUT  = join(ROOT, 'gallery-dept-theme.zip');

// Shopify theme folders required
const THEME_DIRS = ['assets', 'config', 'layout', 'locales', 'sections', 'snippets', 'templates'];

// Collect all files recursively
function collectFiles(dir, base = dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      results.push(...collectFiles(full, base));
    } else {
      results.push({ full, rel: relative(ROOT, full).replace(/\\/g, '/') });
    }
  }
  return results;
}

const files = [];
for (const d of THEME_DIRS) {
  const dirPath = join(ROOT, d);
  if (existsSync(dirPath)) files.push(...collectFiles(dirPath));
}

console.log(`Collecting ${files.length} files...`);

// Manual ZIP writer (DEFLATE-stored, no compression for simplicity)
// Uses ZIP local file header + central directory format
function writeZip(entries, outPath) {
  const centralDir = [];
  let offset = 0;
  const parts = [];

  for (const { full, rel } of entries) {
    const data   = readFileSync(full);
    const name   = Buffer.from(rel, 'utf8');
    const crc    = crc32(data);
    const now    = dosDateTime();

    // Local file header
    const lhSize = 30 + name.length;
    const lh = Buffer.alloc(lhSize);
    lh.writeUInt32LE(0x04034b50, 0);  // signature
    lh.writeUInt16LE(20, 4);          // version needed
    lh.writeUInt16LE(0, 6);           // flags
    lh.writeUInt16LE(0, 8);           // compression: stored
    lh.writeUInt16LE(now.time, 10);
    lh.writeUInt16LE(now.date, 12);
    lh.writeUInt32LE(crc, 14);
    lh.writeUInt32LE(data.length, 18); // compressed size
    lh.writeUInt32LE(data.length, 22); // uncompressed size
    lh.writeUInt16LE(name.length, 26);
    lh.writeUInt16LE(0, 28);           // extra field length
    name.copy(lh, 30);

    // Central directory entry
    const cd = Buffer.alloc(46 + name.length);
    cd.writeUInt32LE(0x02014b50, 0); // central dir signature
    cd.writeUInt16LE(20, 4);         // version made by
    cd.writeUInt16LE(20, 6);         // version needed
    cd.writeUInt16LE(0, 8);          // flags
    cd.writeUInt16LE(0, 10);         // compression
    cd.writeUInt16LE(now.time, 12);
    cd.writeUInt16LE(now.date, 14);
    cd.writeUInt32LE(crc, 16);
    cd.writeUInt32LE(data.length, 20);
    cd.writeUInt32LE(data.length, 24);
    cd.writeUInt16LE(name.length, 28);
    cd.writeUInt16LE(0, 30);  // extra
    cd.writeUInt16LE(0, 32);  // comment
    cd.writeUInt16LE(0, 34);  // disk start
    cd.writeUInt16LE(0, 36);  // int attrs
    cd.writeUInt32LE(0, 38);  // ext attrs
    cd.writeUInt32LE(offset, 42); // local header offset
    name.copy(cd, 46);

    parts.push(lh, data);
    centralDir.push(cd);
    offset += lhSize + data.length;
  }

  const cdBuf    = Buffer.concat(centralDir);
  const cdOffset = offset;
  const cdSize   = cdBuf.length;

  // End of central directory
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(0, 4);              // disk number
  eocd.writeUInt16LE(0, 6);              // disk with cd
  eocd.writeUInt16LE(entries.length, 8);
  eocd.writeUInt16LE(entries.length, 10);
  eocd.writeUInt32LE(cdSize, 12);
  eocd.writeUInt32LE(cdOffset, 16);
  eocd.writeUInt16LE(0, 20);             // comment length

  const out = Buffer.concat([...parts, cdBuf, eocd]);
  writeFileSync(outPath, out);
}

// CRC-32
function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xEDB88320 : 0);
    }
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function dosDateTime() {
  const d = new Date();
  return {
    time: (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1),
    date: ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate(),
  };
}

if (existsSync(OUT)) unlinkSync(OUT);
writeZip(files, OUT);

const sizeMB = (statSync(OUT).size / 1024 / 1024).toFixed(2);
console.log(`✓ gallery-dept-theme.zip — ${files.length} files — ${sizeMB} MB`);
files.forEach(f => console.log('  ' + f.rel));
