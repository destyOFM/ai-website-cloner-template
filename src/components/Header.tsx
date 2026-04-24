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
const TILE_STYLE: React.CSSProperties = {
  display: "flex", flexDirection: "column", gap: 8, textDecoration: "none",
};
const TILE_PLACEHOLDER_STYLE: React.CSSProperties = {
  width: "100%", aspectRatio: "3/4", background: "#f0efed",
};
const TILE_LABEL_STYLE: React.CSSProperties = {
  fontFamily: "var(--font-courier)", fontSize: 10, color: "#171717",
  letterSpacing: "0.08em", textTransform: "uppercase", textAlign: "center",
};

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const linkStyle: React.CSSProperties = {
    fontFamily: "var(--font-courier)", fontSize: 13, color: "#171717",
    letterSpacing: "0.06em", textTransform: "uppercase",
  };
  const subStyle: React.CSSProperties = {
    ...linkStyle, fontSize: 12, opacity: 0.6, letterSpacing: "0.05em",
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black transition-opacity duration-300",
          open ? "opacity-40 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        style={{ zIndex: 9998 }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Full-height slide-in panel */}
      <div
        className="fixed top-0 left-0 h-screen w-[85vw] max-w-[360px] bg-white flex flex-col transition-transform duration-300 ease-in-out"
        style={{ zIndex: 9999, transform: open ? "translateX(0)" : "translateX(-100%)" }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* ── Header: logo centered, X absolute right ── */}
        <div className="relative flex items-center justify-center h-[72px] px-14 border-b border-[#e8e8e8] shrink-0">
          <a href="/" onClick={onClose} aria-label="Home" className="flex items-center leading-none">
            <GalleryDeptLogo width={87} height={40} fill="#171717" />
          </a>
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center cursor-pointer text-[#171717] hover:opacity-50 transition-opacity"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <line x1="2" y1="2" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="18" y1="2" x2="2" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>

          {/* Nav links */}
          <ul className="list-none px-5 m-0">
            {NAV.map((item) => (
              <li key={item.label} className="border-b border-[#e8e8e8]">
                {item.columns ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                      className="w-full flex items-center justify-between h-[52px] bg-transparent border-0 p-0 cursor-pointer"
                      aria-expanded={expanded === item.label}
                      style={linkStyle}
                    >
                      <span>{item.label}</span>
                      <svg
                        width="12" height="8" viewBox="0 0 12 8" fill="none"
                        style={{ flexShrink: 0, transition: "transform 0.22s ease", transform: expanded === item.label ? "rotate(180deg)" : "rotate(0deg)" }}
                      >
                        <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <div
                      style={{ maxHeight: expanded === item.label ? "600px" : "0", overflow: "hidden", transition: "max-height 0.3s ease" }}
                    >
                      <div className="pb-3">
                        {item.columns.map((col) => (
                          <div key={col.heading}>
                            <p className="pt-2 pb-1" style={{ fontFamily: "var(--font-fjalla)", fontSize: 11, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                              {col.heading}
                            </p>
                            {col.links.map((link) => (
                              <a key={link.href} href={link.href} onClick={onClose} className="block no-underline py-2 pl-3" style={subStyle}>
                                {link.label}
                              </a>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <a href={item.href} onClick={onClose} className="flex items-center h-[52px] no-underline" style={linkStyle}>
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          {/* ── Collection tiles ── */}
          <div className="grid grid-cols-2 gap-2 px-5 pt-5 pb-6 border-t border-[#e8e8e8] mt-1">
            <a href="/collections/new-release" className="no-underline" style={TILE_STYLE}>
              <div style={TILE_PLACEHOLDER_STYLE} />
              <span style={TILE_LABEL_STYLE}>LATEST RELEASES</span>
            </a>
            <a href="/collections/all" className="no-underline" style={TILE_STYLE}>
              <div style={TILE_PLACEHOLDER_STYLE} />
              <span style={TILE_LABEL_STYLE}>DISCOVER MORE</span>
            </a>
          </div>

        </div>

        {/* ── Footer ── */}
        <div className="border-t border-[#e8e8e8] px-5 py-4 shrink-0">
          <a href="/pages/stores" onClick={onClose} style={{ ...linkStyle, fontSize: 12, opacity: 0.6 }} className="no-underline hover:opacity-100 transition-opacity">
            STORES
          </a>
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
      {/*
        Mobile:  display:grid  3×(1fr) — col1=left icons, col2=logo, col3=right icons
        Desktop: display:flex  — left | center | right
      */}
      <header
        className={cn(
          "w-full bg-white h-16 md:h-[105px]",
          /* mobile: 3-equal-column grid */
          "grid grid-cols-3 md:grid-cols-none items-center",
          /* desktop: flex */
          "md:flex",
          "px-1 md:px-8"
        )}
      >
        {/* ── MOBILE col 1: Burger + Search (far left) ── */}
        <div
          className="flex md:hidden items-center justify-start"
          style={{ gridColumn: 1 }}
        >
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

        {/* ── LOGO — mobile col 2 (center), desktop fixed width ── */}
        <div
          className="flex items-center justify-center md:flex-none md:w-[160px]"
          style={{ gridColumn: 2 } as React.CSSProperties}
        >
          <a href="/" aria-label="Home" className="flex items-center">
            <span className="hidden md:block">
              <GalleryDeptLogo width={156} height={72} fill="#171717" />
            </span>
            <span className="block md:hidden">
              <GalleryDeptLogo width={91} height={42} fill="#171717" />
            </span>
          </a>
        </div>

        {/* ── MOBILE col 3: Account + Cart (far right) ── */}
        <div
          className="flex md:hidden items-center justify-end"
          style={{ gridColumn: 3 }}
        >
          <IconBtn label="Account" href="/account">
            <AccountIcon width={20} height={20} color="#171717" />
          </IconBtn>
          <IconBtn label="Cart" href="/cart" badge={1}>
            <CartIcon width={20} height={20} color="#171717" />
          </IconBtn>
        </div>

        {/* ── DESKTOP left nav (hidden on mobile) ── */}
        <div className="hidden md:flex items-center flex-1">
          <IconBtn label="Search">
            <SearchIcon width={20} height={20} color="#171717" />
          </IconBtn>
          {LEFT_NAV.map((item) => (
            <DesktopNavItem key={item.label} item={item} />
          ))}
        </div>

        {/* ── DESKTOP right nav (hidden on mobile) ── */}
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
