import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { StickyBanner } from "@/components/StickyBanner";
import { Footer } from "@/components/Footer";
import { ProductDetail } from "@/components/ProductDetail";
import type { ProductDetailData } from "@/components/ProductDetail";
import { ProductGrid } from "@/components/ProductGrid";
import type { Product } from "@/types";

/* ─────────────────────────────────────────
   PRODUCT CATALOG  (static data — add more products here)
───────────────────────────────────────── */
const PRODUCTS: Record<string, ProductDetailData> = {
  "french-parker-shirt-tan": {
    brand: "GALLERY DEPT.",
    title: "FRENCH PARKER SHIRT",
    price: "$550",
    sizes: [
      { label: "XS", available: true },
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: true },
      { label: "XXL", available: true },
    ],
    variants: [
      {
        color: "Tan",
        images: [
          "/images/product-french-parker-shirt-tan-front.jpg",
          "/images/product-french-parker-shirt-tan-back.jpg",
        ],
        stock: "Only 3 left",
      },
      {
        color: "Black",
        images: ["/images/product-french-parker-shirt.jpg"],
        stock: null,
      },
    ],
    details:
      'Designed with a boxy, wide fit and point collar. Features a tonal button closure and front pocket detailed with the FRENCH logotype.\n\n• Short sleeve button-up\n• Textured fabric\n• Boxy, wide fit\n• Point collar\n• Tonal button closure\n• Front pocket with "FRENCH" logotype',
    materials:
      "100% Cotton\nMade in Portugal\n\nThis product may have wrinkles, scars, scratches that are inherent characteristics and natural beauty of this material.",
    shipping:
      "Orders can take 1–3 business days to be processed.\n\nItems being returned must be unworn and in original condition with all tags attached.\n\nDOMESTIC (US): Free shipping on orders $500+. Free returns.\nINTERNATIONAL: Free exchanges for store credit.",
  },
};

/* ─────────────────────────────────────────
   RELATED PRODUCTS
───────────────────────────────────────── */
const RELATED: Product[] = [
  {
    title: "SUN TANK",
    price: "$610.00",
    imgSrc: "/images/product-sun-tank.jpg",
    link: "sun-tank-sun-faded-black",
  },
  {
    title: "PAINTED FRENCH COLLECTOR TEE",
    price: "$695.00",
    imgSrc: "/images/product-painted-collector-tee.jpg",
    link: "painted-french-collector-tee-light-blue",
  },
  {
    title: "FRENCH LOGO LUX L/S TEE",
    price: "$610.00",
    imgSrc: "/images/product-french-logo-lux-ls-tee.jpg",
    link: "french-logo-lux-ls-tee",
  },
];

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS[slug];
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.title} – GALLERY DEPT.`,
    description: product.details.slice(0, 160),
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = PRODUCTS[slug];
  if (!product) notFound();

  return (
    <>
      <StickyBanner />
      <main>
        <ProductDetail product={product} />

        {/* Related products */}
        <div style={{ borderTop: "1px solid #171717", padding: "40px 40px 0" }}>
          <p
            style={{
              fontFamily: "var(--font-courier)",
              fontSize: "13px",
              color: "#171717",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: "24px",
            }}
          >
            You May Also Like
          </p>
          <ProductGrid products={RELATED} />
        </div>
      </main>
      <Footer />
    </>
  );
}
