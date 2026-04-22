import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, '..', 'public', 'images');

if (!existsSync(PUBLIC_DIR)) mkdirSync(PUBLIC_DIR, { recursive: true });

const assets = [
  // Hero banner
  { url: 'https://gallerydept.com/cdn/shop/files/deskotp_banner_15.0.jpg', name: 'hero-banner-desktop.jpg' },
  { url: 'https://gallerydept.com/cdn/shop/files/mobile_hp_15.0.jpg', name: 'hero-banner-mobile.jpg' },

  // Top strip banner
  { url: 'https://gallerydept.com/cdn/shop/files/Screenshot_2026-03-12_at_2.20.01_PM_1080x.png', name: 'strip-banner.png' },

  // Featured collection 1 - Tops
  { url: 'https://gallerydept.com/cdn/shop/files/FRENCH-PARKER-TOP045_Tan_L_Front_5c2ad9fd-69ee-4f2d-a81e-ed719eaacabe_460x.jpg', name: 'product-french-parker-shirt.jpg' },
  { url: 'https://gallerydept.com/cdn/shop/files/SUN-TANK-TOP006_SUN-FADED-BLACK_L_Front_460x.jpg', name: 'product-sun-tank.jpg' },
  { url: 'https://gallerydept.com/cdn/shop/files/PAINTED-FRENCH-COLLECTOR-TEE-TOP039_LIGHT_BLUE_L_Front_460x.jpg', name: 'product-painted-collector-tee.jpg' },
  { url: 'https://gallerydept.com/cdn/shop/files/FRENCH-LOGO-LUX-LS-TEE_TOP037_CREM_L_Front_e10aeeee-d401-4da2-ac2d-bf748e32b13b_460x.jpg', name: 'product-french-logo-lux-ls-tee.jpg' },
  { url: 'https://gallerydept.com/cdn/shop/files/MIXED-CAMO-TEE-TOP040_CAMO_L_Front_460x.jpg', name: 'product-mixed-camo-tee.jpg' },
  { url: 'https://gallerydept.com/cdn/shop/files/NOISE-2FER-LS-TOP042_WASHED_BLACK_L_Front_460x.jpg', name: 'product-noise-2fer-ls.jpg' },

  // Featured collection 2 - Bottoms
  { url: 'https://gallerydept.com/cdn/shop/files/MEDIUM-WASHED-INDIGO_Front_a5c01ef4-242a-4644-bfa5-e5aef37f7d7f_460x.jpg', name: 'product-theo-shorts.jpg' },
  { url: 'https://gallerydept.com/cdn/shop/files/PLATOONPAINTERBTM031_MILITARY_32X32_FRONT_3da60f58-0236-4b12-b7c4-713c0a210202_460x.jpg', name: 'product-platoon-painter-shorts.jpg' },
  { url: 'https://gallerydept.com/cdn/shop/files/FRENCH-ZUMA-SHORTS_BLACK_L_FRONT_460x.jpg', name: 'product-french-zuma-shorts.jpg' },
  { url: 'https://gallerydept.com/cdn/shop/files/MARLEY-DENIM--BTMM038_MDWI_32x32_Front_460x.jpg', name: 'product-marley-denim.jpg' },
  { url: 'https://gallerydept.com/cdn/shop/files/COMPOSITION-PANT_MIXED_DENIM_32X32_FRONT_460x.jpg', name: 'product-composition-pant.jpg' },
  { url: 'https://gallerydept.com/cdn/shop/files/LA-OG-FLARE-LA-OG52-F_BLACK_31x32_Front_460x.jpg', name: 'product-la-og-flare.jpg' },

  // Collection banners - tops
  { url: 'https://gallerydept.com/cdn/shop/files/084_01_DJTL-10297__H2T_3682_2048x.jpg', name: 'collection-short-sleeve-tees.jpg' },
  { url: 'https://gallerydept.com/cdn/shop/files/070_01_DFZ-50038_H2T_RESHOOT_4645_7df5d6ac-4794-4f8d-a714-bd17e5c2dcd4_2048x.jpg', name: 'collection-sweatshirts.jpg' },

  // Collection banners - bottoms/denim
  { url: 'https://gallerydept.com/cdn/shop/files/016_01_AI-SWEATER_H2T_0888_58753a68-b356-4d3d-bd17-8048d8064b23_2048x.jpg', name: 'collection-bottoms.jpg' },
  { url: 'https://gallerydept.com/cdn/shop/files/018_01_PT-10293_H2T_1035_2048x.jpg', name: 'collection-denim.jpg' },

  // Infinite scroll products (first 12)
  { url: 'https://gallerydept.com/cdn/shop/files/RAG-APPLIQUED-TEE-TOP009_WASHED_CREAM_L_FRONT_460x.jpg', name: 'product-rag-appliqued-tee.jpg' },
  { url: 'https://gallerydept.com/cdn/shop/files/MARLEY-PANT-BTM024_YELLOW-GOLD_32_Front_460x.jpg', name: 'product-marley-pant.jpg' },
  { url: 'https://gallerydept.com/cdn/shop/files/LA-FLARE--BTM005_DARK-NAVY_32_Front_460x.jpg', name: 'product-la-flare.jpg' },
  { url: 'https://gallerydept.com/cdn/shop/files/SOTO-SHORTS--BTM001_MULTI_L_Front_e1863a79-ef2e-430e-9db9-04637fb1a6f2_460x.jpg', name: 'product-soto-shorts.jpg' },
  { url: 'https://gallerydept.com/cdn/shop/files/DENIM-SHIRT-TOP021_LIGHT-DENIM-BLUE_L_Front_460x.jpg', name: 'product-denim-shirt.jpg' },
];

async function downloadAsset(url, filename) {
  const dest = join(PUBLIC_DIR, filename);
  if (existsSync(dest)) {
    console.log(`⏭  Already exists: ${filename}`);
    return;
  }
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = await res.arrayBuffer();
    writeFileSync(dest, Buffer.from(buf));
    console.log(`✅ Downloaded: ${filename}`);
  } catch (e) {
    console.error(`❌ Failed: ${filename} — ${e.message}`);
  }
}

async function main() {
  console.log(`Downloading ${assets.length} assets to ${PUBLIC_DIR}...\n`);
  // Batch 4 at a time
  for (let i = 0; i < assets.length; i += 4) {
    const batch = assets.slice(i, i + 4);
    await Promise.all(batch.map(a => downloadAsset(a.url, a.name)));
  }
  console.log('\nDone!');
}

main();
