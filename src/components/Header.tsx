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

function IconBtn({
  label,
  href,
  children,
}: {
  label: string;
  href?: string;
  children: React.ReactNode;
}) {
  /* 44×44 touch target, icon centred inside */
  const cls = cn(
    "relative flex items-center justify-center",
    "w-11 h-11 cursor-pointer",
    "hover:opacity-55 transition-opacity duration-200",
    "text-[#171717] bg-transparent border-0 p-0"
  );
  if (href) {
    return <a href={href} aria-label={label} className={cls}>{children}</a>;
  }
  return <button type="button" aria-label={label} className={cls}>{children}</button>;
}

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const lastYRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
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
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 bg-white",
          "flex items-center justify-between",
          /* desktop: 105px tall, mobile: 64px */
          "h-16 md:h-[105px]",
          "px-4 md:px-8"
        )}
        style={{ transition: "transform 0.28s ease, box-shadow 0.28s ease" }}
      >
        {/* ── Desktop left: Search + first nav links ── */}
        <div className="hidden md:flex items-center flex-1">
          <IconBtn label="Search">
            <SearchIcon width={20} height={20} color="#171717" />
          </IconBtn>
          <NavLink href="/collections/shop">SHOP</NavLink>
          <NavLink href="/pages/brands">BRANDS</NavLink>
        </div>

        {/* ── Logo ── */}
        <div className={cn(
          "flex items-center justify-center shrink-0",
          /* mobile: takes remaining space left of icons */
          "flex-1 md:flex-none md:w-[160px]"
        )}>
          <a href="/" aria-label="Home" className="flex items-center">
            {/* Desktop: 72px tall (20% up from 60px) */}
            <span className="hidden md:block">
              <GalleryDeptLogo width={156} height={72} fill="#171717" />
            </span>
            {/* Mobile: 42px tall — fits neatly in 64px header */}
            <span className="block md:hidden">
              <GalleryDeptLogo width={91} height={42} fill="#171717" />
            </span>
          </a>
        </div>

        {/* ── Desktop right: second nav links + icons ── */}
        <div className="hidden md:flex items-center justify-end flex-1">
          <NavLink href="/pages/dialogue">DIALOGUE</NavLink>
          <NavLink href="/pages/stores">STORES</NavLink>
          <div className="flex items-center ml-2">
            <IconBtn label="Search">
              <SearchIcon width={20} height={20} color="#171717" />
            </IconBtn>
            <IconBtn label="Account" href="/account">
              <AccountIcon width={20} height={20} color="#171717" />
            </IconBtn>
            <IconBtn label="Cart" href="/cart">
              <CartIcon width={20} height={20} color="#171717" />
              <span className={cn(
                "absolute top-1 right-1",
                "flex items-center justify-center",
                "w-[15px] h-[15px] rounded-full bg-black",
                "text-white text-[9px] leading-none font-bold pointer-events-none"
              )}>1</span>
            </IconBtn>
          </div>
        </div>

        {/* ── Mobile right: Cart + Hamburger ── */}
        <div className="flex md:hidden items-center shrink-0">
          <IconBtn label="Cart" href="/cart">
            <CartIcon width={20} height={20} color="#171717" />
            <span className={cn(
              "absolute top-1 right-1",
              "flex items-center justify-center",
              "w-[15px] h-[15px] rounded-full bg-black",
              "text-white text-[9px] leading-none font-bold pointer-events-none"
            )}>1</span>
          </IconBtn>
          <IconBtn label="Open menu">
            <span
              className="text-[22px] leading-none"
              style={{ fontFamily: "var(--font-courier)" }}
              aria-hidden="true"
            >☰</span>
          </IconBtn>
        </div>
      </header>

      {/* Spacer that matches header height so content isn't hidden underneath */}
      <div className="h-16 md:h-[105px]" aria-hidden="true" />
    </>
  );
}
