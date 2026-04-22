import { StickyBanner } from "@/components/StickyBanner";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { ProductGrid } from "@/components/ProductGrid";
import { CollectionBanner } from "@/components/CollectionBanner";
import { Footer } from "@/components/Footer";
import type { Product } from "@/types";

const topsProducts: Product[] = [
  { title: "FRENCH PARKER SHIRT", price: "$850.00", imgSrc: "/images/product-french-parker-shirt.jpg", link: "french-parker-shirt-tan" },
  { title: "SUN TANK", price: "$610.00", imgSrc: "/images/product-sun-tank.jpg", link: "sun-tank-sun-faded-black" },
  { title: "PAINTED FRENCH COLLECTOR TEE", price: "$695.00", imgSrc: "/images/product-painted-collector-tee.jpg", link: "painted-french-collector-tee-light-blue" },
  { title: "FRENCH LOGO LUX L/S TEE", price: "$610.00", imgSrc: "/images/product-french-logo-lux-ls-tee.jpg", link: "french-logo-lux-ls-tee" },
  { title: "MIXED CAMO TEE", price: "$455.00", imgSrc: "/images/product-mixed-camo-tee.jpg", link: "mixed-camo-tee" },
  { title: "NOISE 2FER L/S", price: "$655.00", imgSrc: "/images/product-noise-2fer-ls.jpg", link: "noise-2fer-ls" },
];

const bottomsProducts: Product[] = [
  { title: "THEO SHORTS", price: "$2,080.00", imgSrc: "/images/product-theo-shorts.jpg", link: "theo-shorts" },
  { title: "PLATOON PAINTER SHORTS", price: "$1,225.00", imgSrc: "/images/product-platoon-painter-shorts.jpg", link: "platoon-painter-shorts" },
  { title: "FRENCH ZUMA SHORTS", price: "$695.00", imgSrc: "/images/product-french-zuma-shorts.jpg", link: "french-zuma-shorts" },
  { title: "MARLEY DENIM", price: "$1,535.00", imgSrc: "/images/product-marley-denim.jpg", link: "marley-denim" },
  { title: "COMPOSITION PANT", price: "$3,995.00", imgSrc: "/images/product-composition-pant.jpg", link: "composition-pant" },
  { title: "LA OG FLARE", price: "$1,550.00", imgSrc: "/images/product-la-og-flare.jpg", link: "la-og-flare" },
];

const moreProducts: Product[] = [
  { title: "RAG APPLIQUED TEE", price: "$765.00", imgSrc: "/images/product-rag-appliqued-tee.jpg", link: "rag-appliqued-tee" },
  { title: "MARLEY PANT", price: "$1,380.00", imgSrc: "/images/product-marley-pant.jpg", link: "marley-pant" },
  { title: "LA FLARE", price: "$1,535.00", imgSrc: "/images/product-la-flare.jpg", link: "la-flare" },
  { title: "SOTO SHORTS", price: "$2,610.00", imgSrc: "/images/product-soto-shorts.jpg", link: "soto-shorts" },
  { title: "DENIM SHIRT", price: "$1,535.00", imgSrc: "/images/product-denim-shirt.jpg", link: "denim-shirt" },
];

const topsCollections = [
  { title: "SHORT SLEEVE TEES", imgSrc: "/images/collection-short-sleeve-tees.jpg", link: "/collections/short-sleeve-tees" },
  { title: "SWEATSHIRTS", imgSrc: "/images/collection-sweatshirts.jpg", link: "/collections/sweatshirts" },
];

const bottomsCollections = [
  { title: "BOTTOMS", imgSrc: "/images/collection-bottoms.jpg", link: "/collections/bottoms" },
  { title: "DENIM", imgSrc: "/images/collection-denim.jpg", link: "/collections/denim" },
];

export default function Home() {
  return (
    <>
      <StickyBanner />
      <main>
        <HeroSlideshow />
        <section style={{ padding: "40px 40px 0" }}>
          <ProductGrid products={topsProducts} />
        </section>
        <CollectionBanner items={topsCollections} />
        <section style={{ padding: "40px 40px 0" }}>
          <ProductGrid products={bottomsProducts} />
        </section>
        <CollectionBanner items={bottomsCollections} />
        <section style={{ padding: "40px 40px 0" }}>
          <ProductGrid products={moreProducts} />
        </section>
        <div
          style={{
            display: "flex",
            gap: "24px",
            justifyContent: "center",
            padding: "32px 40px 48px",
          }}
        >
          {["LATEST", "MEN", "WOMEN"].map((label) => (
            <a
              key={label}
              href={`/collections/${label.toLowerCase() === "latest" ? "new-release" : label.toLowerCase()}`}
              style={{
                fontSize: "13px",
                fontFamily: "var(--font-courier)",
                color: "#171717",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
