"use client";

import { cn } from "@/lib/utils";
import {
  GalleryDeptLogo,
  SearchIcon,
  AccountIcon,
  WishlistIcon,
  CartIcon,
} from "@/components/icons";

const NAV_FONT: React.CSSProperties = {
  fontFamily: "var(--font-courier)",
  fontSize: "13px",
  color: "#171717",
  textTransform: "none" as const,
};

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={cn(
        "px-4 no-underline cursor-pointer select-none",
        "hover:opacity-60 transition-opacity duration-200"
      )}
      style={NAV_FONT}
    >
      {children}
    </a>
  );
}

export function Header() {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-white w-full",
        "flex items-center justify-between",
        "h-[105px] px-10"
      )}
    >
      <div className={cn("hidden md:flex items-center flex-1 max-w-[475px]")}>
        <button
          type="button"
          aria-label="Search"
          className={cn(
            "px-4 cursor-pointer hover:opacity-60 transition-opacity duration-200"
          )}
        >
          <SearchIcon width={20} height={20} color="#171717" />
        </button>
        <NavLink href="/collections/shop">SHOP</NavLink>
        <NavLink href="/pages/brands">BRANDS</NavLink>
      </div>

      <div className="flex items-center justify-center w-[300px] shrink-0 mx-auto md:mx-0">
        <a href="/" aria-label="Gallery Dept. Home">
          <GalleryDeptLogo width={130} height={60} fill="black" />
        </a>
      </div>

      <div
        className={cn(
          "hidden md:flex items-center justify-end flex-1 max-w-[475px]"
        )}
      >
        <NavLink href="/pages/dialogue">DIALOGUE</NavLink>
        <NavLink href="/pages/stores">STORES</NavLink>

        <div className="flex items-center gap-4 pl-4">
          <button
            type="button"
            aria-label="Search"
            className="cursor-pointer hover:opacity-60 transition-opacity duration-200"
          >
            <SearchIcon width={20} height={20} color="#171717" />
          </button>
          <button
            type="button"
            aria-label="Account"
            className="cursor-pointer hover:opacity-60 transition-opacity duration-200"
          >
            <AccountIcon width={20} height={20} color="#171717" />
          </button>
          <button
            type="button"
            aria-label="Wishlist"
            className="cursor-pointer hover:opacity-60 transition-opacity duration-200"
          >
            <WishlistIcon width={20} height={20} color="#171717" />
          </button>
          <button
            type="button"
            aria-label="Cart"
            className="relative cursor-pointer hover:opacity-60 transition-opacity duration-200"
          >
            <CartIcon width={20} height={20} color="#171717" />
            <span
              className={cn(
                "absolute -top-1.5 -right-1.5",
                "flex items-center justify-center",
                "w-4 h-4 rounded-full bg-black",
                "text-white text-[9px] leading-none font-bold"
              )}
            >
              1
            </span>
          </button>
        </div>
      </div>

      <div className="flex md:hidden items-center gap-4 ml-auto">
        <button
          type="button"
          aria-label="Cart"
          className="relative cursor-pointer"
        >
          <CartIcon width={20} height={20} color="#171717" />
          <span
            className={cn(
              "absolute -top-1.5 -right-1.5",
              "flex items-center justify-center",
              "w-4 h-4 rounded-full bg-black",
              "text-white text-[9px] leading-none font-bold"
            )}
          >
            1
          </span>
        </button>
        <button
          type="button"
          aria-label="Open menu"
          className="text-[20px] text-[#171717] cursor-pointer"
          style={{ fontFamily: "var(--font-courier)" }}
        >
          ☰
        </button>
      </div>
    </header>
  );
}
