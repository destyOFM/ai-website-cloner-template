"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  GalleryDeptLogo,
  SearchIcon,
  AccountIcon,
  CartIcon,
} from "@/components/icons";

/* ─────────────────────────────────────────
   NAV DATA  (labels yours, structure from reference)
───────────────────────────────────────── */
const NAV = [
  {
    label: "SHOP",
    href: "/collections/shop",
    columns: [
      {
        heading: "LATEST",
        links: [
          { label: "NEW RELEASES", href: "/collections/new-release" },
          { label: "TOPS",         href: "/collections/tops" },
          { label: "BOTTOMS",      href: "/collections/bottoms" },
          { label: "OUTERWEAR",    href: "/collections/outerwear" },
          { label: "ACCESSORIES",  href: "/collections/accessories" },
        ],
      },
      {
        heading: "SHOP ALL",
        links: [
          { label: "FEATURED", href: "/collections/featured" },
          { label: "MEN",      href: "/collections/men" },
          { label: "WOMEN",    href: "/collections/women" },
          { label: "ART/MUSIC",href: "/collections/art-music" },
          { label: "ALL",      href: "/collections/all" },
        ],
      },
    ],
  },
  {
    label: "BRANDS",
    href: "/pages/brands",
    columns: [
      {
        heading: "OUR BRANDS",
        links: [
          { label: "GALLERY DEPT.",         href: "/collections/gallery-dept" },
          { label: "ART THAT KILLS",        href: "/collections/art-that-kills" },
          { label: "CHATEAU JOSUÉ",         href: "/collections/chateau-josue" },
          { label: "DÉPT.",                 href: "/collections/dept" },
          { label: "DÉPT. DE LA GALERIE",   href: "/collections/dept-de-la-galerie" },
          { label: "RETOUCHE",              href: "/collections/retouche" },
        ],
      },
      {
        heading: "PARTNERSHIPS",
        links: [
          { label: "VANS",      href: "/collections/vans" },
          { label: "UGG",       href: "/collections/ugg" },
          { label: "ASICS",     href: "/collections/asics" },
          { label: "LA DODGERS",href: "/collections/la-dodgers" },
          { label: "LA RAMS",   href: "/collections/la-rams" },
          { label: "LANVIN",    href: "/collections/lanvin" },
        ],
      },
    ],
  },
  { label: "DIALOGUE", href: "/pages/dialogue" },
  { label: "STORES",   href: "/pages/stores" },
];

const LEFT_NAV  = NAV.slice(0, 2);   // SHOP, BRANDS  → left of logo
const RIGHT_NAV = NAV.slice(2);      // DIALOGUE, STORES → right of logo

/* ─────────────────────────────────────────
   ICON BUTTON  (44×44 touch target)
───────────────────────────────────────── */
function IconBtn({
  label, href, badge, children, onClick,
}: {
  label: string; href?: string; badge?: number;
  children: React.ReactNode; onClick?: () => void;
}) {
  const cls = cn(
    "relative inline-flex items-center justify-center",
    "w-11 h-11 shrink-0 cursor-pointer",
    "bg-transparent border-0 p-0 text-[#171717]",
    "hover:opacity-55 transition-opacity duration-200"
  );
  const inner = (
    <>
      {children}
      {badge != null && badge > 0 && (
        <span className="absolute top-1 right-1 flex items-center justify-center w-[15px] h-[15px] rounded-full bg-[#171717] text-white text-[9px] leading-none font-bold pointer-events-none">
          {badge}
        </span>
      )}
    </>
  );
  return href
    ? <a href={href} aria-label={label} className={cls}>{inner}</a>
    : <button type="button" aria-label={label} className={cls} onClick={onClick}>{inner}</button>;
}

/* ─────────────────────────────────────────
   DESKTOP NAV LINK with mega-menu
───────────────────────────────────────── */
function DesktopNavItem({ item }: { item: typeof NAV[number] }) {
  const [open, setOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpen(true);
  };
  const hide = () => {
    timerRef.current = setTimeout(() => setOpen(false), 120);
  };

  if (!item.columns) {
    return (
      <a
        href={item.href}
        className="no-underline cursor-pointer hover:opacity-55 transition-opacity duration-200"
        style={{ fontFamily: "var(--font-courier)", fontSize: "13px", color: "#171717", padding: "0 10px", whiteSpace: "nowrap" }}
      >
        {item.label}
      </a>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      <a
        href={item.href}
        className="no-underline cursor-pointer hover:opacity-55 transition-opacity duration-200 inline-flex items-center"
        style={{ fontFamily: "var(--font-courier)", fontSize: "13px", color: "#171717", padding: "0 10px", whiteSpace: "nowrap" }}
      >
        {item.label}
      </a>

      {/* Mega-menu dropdown */}
      {open && (
        <div
          className="absolute top-full left-0 z-50 bg-white border-t border-[#171717] pt-6 pb-8 px-8"
          style={{ minWidth: "420px" }}
          onMouseEnter={show}
          onMouseLeave={hide}
        >
          <div className="flex gap-12">
            {item.columns.map((col) => (
              <div key={col.heading}>
                <p
                  className="mb-3"
                  style={{ fontFamily: "var(--font-fjalla)", fontSize: "13px", color: "#171717", textTransform: "uppercase", letterSpacing: "0.05em" }}
                >
                  {col.heading}
                </p>
                {col.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block no-underline hover:opacity-55 transition-opacity duration-200"
                    style={{ fontFamily: "var(--font-courier)", fontSize: "13px", color: "#171717", lineHeight: "2.2" }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   MOBILE DRAWER
───────────────────────────────────────── */
function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black transition-opacity duration-300",
          open ? "opacity-40 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in panel */}
      <div
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-[85vw] max-w-[360px] bg-white",
          "flex flex-col overflow-y-auto",
          "transition-transform duration-300 ease-in-out"
        )}
        style={{ transform: open ? "translateX(0)" : "translateX(-100%)" }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-[#e8e8e8] shrink-0">
          <a href="/" onClick={onClose} aria-label="Home">
            <GalleryDeptLogo width={80} height={37} fill="#171717" />
          </a>
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="w-11 h-11 flex items-center justify-center cursor-pointer text-[#171717] hover:opacity-55 transition-opacity"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <line x1="1" y1="1" x2="17" y2="17" stroke="#171717" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="17" y1="1" x2="1" y2="17" stroke="#171717" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-4 pt-4">
          {NAV.map((item) => (
            <div key={item.label} className="border-b border-[#e8e8e8]">
              {item.columns ? (
                /* Accordion item */
                <>
                  <button
                    type="button"
                    onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                    className="w-full flex items-center justify-between h-12 cursor-pointer bg-transparent border-0 p-0"
                    aria-expanded={expanded === item.label}
                  >
                    <span style={{ fontFamily: "var(--font-courier)", fontSize: "13px", color: "#171717" }}>
                      {item.label}
                    </span>
                    <svg
                      width="12" height="12" viewBox="0 0 12 12" fill="none"
                      style={{ transform: expanded === item.label ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
                    >
                      <path d="M1 4l5 5 5-5" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                  {/* Accordion content */}
                  <div
                    style={{
                      maxHeight: expanded === item.label ? "600px" : "0",
                      overflow: "hidden",
                      transition: "max-height 0.3s ease",
                    }}
                  >
                    {item.columns.map((col) => (
                      <div key={col.heading} className="pb-4">
                        <p
                          className="pt-2 pb-1"
                          style={{ fontFamily: "var(--font-fjalla)", fontSize: "11px", color: "#888", textTransform: "uppercase", letterSpacing: "0.08em" }}
                        >
                          {col.heading}
                        </p>
                        {col.links.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            onClick={onClose}
                            className="block no-underline"
                            style={{ fontFamily: "var(--font-courier)", fontSize: "13px", color: "#171717", lineHeight: "2.4", paddingLeft: "8px" }}
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                /* Simple link */
                <a
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center h-12 no-underline"
                  style={{ fontFamily: "var(--font-courier)", fontSize: "13px", color: "#171717" }}
                >
                  {item.label}
                </a>
              )}
            </div>
          ))}
        </nav>

        {/* Drawer footer */}
        <div className="px-4 py-6 border-t border-[#e8e8e8] shrink-0">
          <span style={{ fontFamily: "var(--font-courier)", fontSize: "12px", color: "#888" }}>
            CANADA (CAD$) ▾
          </span>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────
   MAIN HEADER
───────────────────────────────────────── */
export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header
        className={cn(
          "w-full bg-white",
          "h-16 md:h-[105px]",
          "flex items-center",
          "px-2 md:px-8",
          "border-t border-[#e8e8e8]"
        )}
      >
        {/* ── MOBILE: Burger + Search | Logo | Account + Cart ── */}

        {/* Left col */}
        <div className="flex md:hidden items-center flex-1 justify-start">
          <IconBtn label="Open menu" onClick={() => setDrawerOpen(true)}>
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
              <line x1="0" y1="1"  x2="22" y2="1"  stroke="#171717" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="0" y1="8"  x2="22" y2="8"  stroke="#171717" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="0" y1="15" x2="22" y2="15" stroke="#171717" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </IconBtn>
          <IconBtn label="Search">
            <SearchIcon width={20} height={20} color="#171717" />
          </IconBtn>
        </div>

        {/* Center col — Logo */}
        <div className="flex items-center justify-center flex-1 md:flex-none md:w-[160px]">
          <a href="/" aria-label="Home" className="flex items-center">
            <span className="hidden md:block">
              <GalleryDeptLogo width={156} height={72} fill="#171717" />
            </span>
            <span className="block md:hidden">
              <GalleryDeptLogo width={91} height={42} fill="#171717" />
            </span>
          </a>
        </div>

        {/* Right col */}
        <div className="flex md:hidden items-center flex-1 justify-end">
          <IconBtn label="Account" href="/account">
            <AccountIcon width={20} height={20} color="#171717" />
          </IconBtn>
          <IconBtn label="Cart" href="/cart" badge={1}>
            <CartIcon width={20} height={20} color="#171717" />
          </IconBtn>
        </div>

        {/* ── DESKTOP: Left nav | Logo | Right nav ── */}

        {/* Desktop left */}
        <div className="hidden md:flex items-center flex-1">
          <IconBtn label="Search">
            <SearchIcon width={20} height={20} color="#171717" />
          </IconBtn>
          {LEFT_NAV.map((item) => (
            <DesktopNavItem key={item.label} item={item} />
          ))}
        </div>

        {/* Desktop right */}
        <div className="hidden md:flex items-center justify-end flex-1">
          {RIGHT_NAV.map((item) => (
            <DesktopNavItem key={item.label} item={item} />
          ))}
          <div className="flex items-center ml-2">
            <IconBtn label="Search">
              <SearchIcon width={20} height={20} color="#171717" />
            </IconBtn>
            <IconBtn label="Account" href="/account">
              <AccountIcon width={20} height={20} color="#171717" />
            </IconBtn>
            <IconBtn label="Cart" href="/cart" badge={1}>
              <CartIcon width={20} height={20} color="#171717" />
            </IconBtn>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
