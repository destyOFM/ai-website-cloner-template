"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  GalleryDeptLogo,
  SearchIcon,
  AccountIcon,
  CartIcon,
} from "@/components/icons";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="no-underline cursor-pointer select-none hover:opacity-55 transition-opacity duration-200"
      style={{
        fontFamily: "var(--font-courier)",
        fontSize: "13px",
        color: "#171717",
        padding: "0 10px",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </a>
  );
}

function IconBtn({ label, href, children }: { label: string; href?: string; children: React.ReactNode }) {
  const cls = "relative flex items-center justify-center p-1.5 cursor-pointer hover:opacity-55 transition-opacity duration-200 text-[#171717]";
  if (href) {
    return <a href={href} aria-label={label} className={cls}>{children}</a>;
  }
  return <button type="button" aria-label={label} className={cls}>{children}</button>;
}

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const lastYRef = useRef(0);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        if (currentY <= 0) {
          header.style.transform = "translateY(0)";
          header.style.boxShadow = "none";
        } else if (currentY > lastYRef.current) {
          header.style.transform = "translateY(-100%)";
          header.style.boxShadow = "0 1px 0 rgba(0,0,0,0.08)";
        } else {
          header.style.transform = "translateY(0)";
          header.style.boxShadow = "0 1px 0 rgba(0,0,0,0.08)";
        }
        lastYRef.current = currentY;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-white w-full",
        "flex items-center justify-between",
        "h-[105px] px-8"
      )}
      style={{ transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
    >
      {/* Desktop left: Search + SHOP + BRANDS */}
      <div className="hidden md:flex items-center flex-1">
        <IconBtn label="Search">
          <SearchIcon width={20} height={20} color="#171717" />
        </IconBtn>
        <NavLink href="/collections/shop">SHOP</NavLink>
        <NavLink href="/pages/brands">BRANDS</NavLink>
      </div>

      {/* Centre: Logo — 20% larger (72px tall), crisp SVG */}
      <div className="flex items-center justify-center w-[160px] shrink-0">
        <a href="/" aria-label="Home">
          <GalleryDeptLogo
            width={156}
            height={72}
            fill="#171717"
            style={{ display: "block", imageRendering: "crisp-edges" } as React.CSSProperties}
          />
        </a>
      </div>

      {/* Desktop right: DIALOGUE + STORES + Search + Account + Cart */}
      <div className="hidden md:flex items-center justify-end flex-1">
        <NavLink href="/pages/dialogue">DIALOGUE</NavLink>
        <NavLink href="/pages/stores">STORES</NavLink>
        <div className="flex items-center gap-0.5 ml-2">
          <IconBtn label="Search">
            <SearchIcon width={20} height={20} color="#171717" />
          </IconBtn>
          <IconBtn label="Account" href="/account">
            <AccountIcon width={20} height={20} color="#171717" />
          </IconBtn>
          <IconBtn label="Cart" href="/cart">
            <CartIcon width={20} height={20} color="#171717" />
            <span
              className={cn(
                "absolute -top-0.5 -right-0.5",
                "flex items-center justify-center",
                "w-[15px] h-[15px] rounded-full bg-black",
                "text-white text-[9px] leading-none font-bold"
              )}
            >
              1
            </span>
          </IconBtn>
        </div>
      </div>

      {/* Mobile: Cart + hamburger */}
      <div className="flex md:hidden items-center gap-2 ml-auto">
        <IconBtn label="Cart" href="/cart">
          <CartIcon width={20} height={20} color="#171717" />
          <span
            className={cn(
              "absolute -top-0.5 -right-0.5",
              "flex items-center justify-center",
              "w-[15px] h-[15px] rounded-full bg-black",
              "text-white text-[9px] leading-none font-bold"
            )}
          >
            1
          </span>
        </IconBtn>
        <button
          type="button"
          aria-label="Open menu"
          className="p-1.5 text-[20px] text-[#171717] cursor-pointer"
          style={{ fontFamily: "var(--font-courier)" }}
        >
          ☰
        </button>
      </div>
    </header>
  );
}
