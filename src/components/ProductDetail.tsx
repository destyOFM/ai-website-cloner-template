"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ProductVariant {
  color: string;
  images: string[];
  stock: string | null;
}

export interface ProductSize {
  label: string;
  available: boolean;
}

export interface ProductDetailData {
  brand: string;
  title: string;
  price: string;
  sizes: ProductSize[];
  variants: ProductVariant[];
  details: string;
  materials: string;
  shipping: string;
}

interface AccordionProps {
  heading: string;
  children: React.ReactNode;
}

function Accordion({ heading, children }: AccordionProps) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #171717" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "16px 0",
          fontFamily: "var(--font-courier)",
          fontSize: "13px",
          color: "#171717",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <span>{heading}</span>
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          style={{
            transition: "transform 0.2s ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            flexShrink: 0,
          }}
        >
          <path
            d="M1 1.5l5 5 5-5"
            stroke="#171717"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && (
        <div
          style={{
            paddingBottom: "16px",
            fontFamily: "var(--font-courier)",
            fontSize: "13px",
            lineHeight: "1.7",
            color: "#171717",
            whiteSpace: "pre-line",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

interface ProductDetailProps {
  product: ProductDetailData;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [activeColor, setActiveColor] = useState(0);
  const [activeSize, setActiveSize] = useState<string | null>(null);

  const currentVariant = product.variants[activeColor];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "58fr 42fr",
        alignItems: "start",
      }}
      className="product-layout"
    >
      {/* ── LEFT: Stacked images ── */}
      <div className="product-images">
        {currentVariant.images.map((src, i) => (
          <div
            key={i}
            style={{ position: "relative", width: "100%", aspectRatio: "1 / 1.25" }}
          >
            <Image
              src={src}
              alt={`${product.title} – ${currentVariant.color} – view ${i + 1}`}
              fill
              priority={i === 0}
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        ))}
      </div>

      {/* ── RIGHT: Sticky product info ── */}
      <div
        className="product-info"
        style={{
          position: "sticky",
          top: 0,
          maxHeight: "100vh",
          overflowY: "auto",
          padding: "40px 40px 40px 48px",
        }}
      >
        {/* Brand */}
        <p
          style={{
            fontFamily: "var(--font-courier)",
            fontSize: "13px",
            color: "#171717",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            margin: "0 0 4px",
          }}
        >
          {product.brand}
        </p>

        {/* Title */}
        <h1
          style={{
            fontFamily: "var(--font-courier)",
            fontSize: "20px",
            fontWeight: 700,
            color: "#171717",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            margin: "0 0 12px",
          }}
        >
          {product.title}
        </h1>

        {/* Price */}
        <p
          style={{
            fontFamily: "var(--font-courier)",
            fontSize: "18px",
            color: "#171717",
            margin: "0 0 20px",
          }}
        >
          {product.price}
        </p>

        {/* Stock notice */}
        {currentVariant.stock && (
          <p
            style={{
              fontFamily: "var(--font-courier)",
              fontSize: "12px",
              color: "#171717",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              margin: "0 0 16px",
            }}
          >
            {currentVariant.stock}
          </p>
        )}

        {/* Color selector */}
        <div style={{ marginBottom: "20px" }}>
          <p
            style={{
              fontFamily: "var(--font-courier)",
              fontSize: "13px",
              color: "#171717",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              margin: "0 0 10px",
            }}
          >
            Color: {currentVariant.color}
          </p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {product.variants.map((v, i) => (
              <button
                key={v.color}
                onClick={() => setActiveColor(i)}
                style={{
                  fontFamily: "var(--font-courier)",
                  fontSize: "12px",
                  padding: "6px 14px",
                  border: "1px solid #171717",
                  background: activeColor === i ? "#171717" : "transparent",
                  color: activeColor === i ? "#ffffff" : "#171717",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  transition: "background 0.15s, color 0.15s",
                }}
              >
                {v.color}
              </button>
            ))}
          </div>
        </div>

        {/* Size selector */}
        <div style={{ marginBottom: "24px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-courier)",
                fontSize: "13px",
                color: "#171717",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                margin: 0,
              }}
            >
              Size
            </p>
            <Link
              href="#"
              style={{
                fontFamily: "var(--font-courier)",
                fontSize: "12px",
                color: "#171717",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              Size Guide
            </Link>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {product.sizes.map((s) => (
              <button
                key={s.label}
                onClick={() => s.available && setActiveSize(s.label)}
                disabled={!s.available}
                style={{
                  fontFamily: "var(--font-courier)",
                  fontSize: "13px",
                  width: "52px",
                  height: "44px",
                  border: "1px solid #171717",
                  background: activeSize === s.label ? "#171717" : "transparent",
                  color: activeSize === s.label ? "#ffffff" : "#171717",
                  cursor: s.available ? "pointer" : "not-allowed",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  opacity: s.available ? 1 : 0.35,
                  transition: "background 0.15s, color 0.15s",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart */}
        <button
          className={cn("add-to-cart-btn")}
          style={{
            display: "block",
            width: "100%",
            height: "52px",
            background: "#171717",
            color: "#ffffff",
            fontFamily: "var(--font-courier)",
            fontSize: "14px",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            border: "1px solid #171717",
            cursor: "pointer",
            marginBottom: "12px",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#ffffff";
            (e.currentTarget as HTMLButtonElement).style.color = "#171717";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#171717";
            (e.currentTarget as HTMLButtonElement).style.color = "#ffffff";
          }}
        >
          Add to Cart
        </button>

        {/* Buy Now */}
        <button
          style={{
            display: "block",
            width: "100%",
            height: "52px",
            background: "transparent",
            color: "#171717",
            fontFamily: "var(--font-courier)",
            fontSize: "14px",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            border: "1px solid #171717",
            cursor: "pointer",
            marginBottom: "24px",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#171717";
            (e.currentTarget as HTMLButtonElement).style.color = "#ffffff";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = "#171717";
          }}
        >
          Buy Now
        </button>

        {/* Details accordion */}
        <div style={{ borderTop: "1px solid #171717" }}>
          <Accordion heading="Details">{product.details}</Accordion>
          <Accordion heading="Materials & Care">{product.materials}</Accordion>
          <Accordion heading="Shipping & Returns">{product.shipping}</Accordion>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .product-layout {
            grid-template-columns: 1fr !important;
          }
          .product-info {
            position: static !important;
            max-height: none !important;
            padding: 24px 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
