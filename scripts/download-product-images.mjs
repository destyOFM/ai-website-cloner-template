import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "../public/images");

mkdirSync(publicDir, { recursive: true });

const images = [
  {
    url: "https://gallerydept.com/cdn/shop/files/FRENCH-PARKER-TOP045_Tan_L_Front_5c2ad9fd-69ee-4f2d-a81e-ed719eaacabe.jpg?v=1772745425",
    dest: "product-french-parker-shirt-tan-front.jpg",
  },
  {
    url: "https://gallerydept.com/cdn/shop/files/FRENCH-PARKER-TOP045_Tan_L_Back_625019f9-b7d3-4557-b93a-27dc66842b5c.jpg?v=1772745425",
    dest: "product-french-parker-shirt-tan-back.jpg",
  },
];

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const buf = await res.arrayBuffer();
  writeFileSync(join(publicDir, dest), Buffer.from(buf));
  console.log(`✓ ${dest}`);
}

const tasks = images.map(({ url, dest }) =>
  download(url, dest).catch((e) => console.error(`✗ ${dest}: ${e.message}`))
);
await Promise.all(tasks);
console.log("done");
