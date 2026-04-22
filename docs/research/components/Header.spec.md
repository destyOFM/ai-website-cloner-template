# Header Specification

## Overview
- **Target file:** `src/components/Header.tsx`
- **Interaction model:** sticky (stays at top on scroll)

## DOM Structure
```
.pageheader (sticky, white bg, 105px tall)
  .logo-area.container (flex row, full width)
    .logo-area__left (flex, ~475px wide)
      Search icon button
      Nav: SHOP (with dropdown) | BRANDS (with dropdown)
    .logo-area__middle (300px, centered)
      .logo (SVG logo, 130px wide × 60px tall)
    .logo-area__right (~475px wide)
      Nav: DIALOGUE (with dropdown) | STORES
      Icons: Search, Account, Wishlist, Cart (with count badge)
```

## Computed Styles

### `.pageheader`
- backgroundColor: rgb(255,255,255)
- position: sticky (top: 0)
- zIndex: 100
- width: 100%
- height: 105px
- borderBottom: none (no border)

### `.logo-area` (flex container)
- display: flex
- alignItems: center
- justifyContent: space-between
- padding: 0 40px
- height: 105px

### Nav links (SHOP, BRANDS, DIALOGUE, STORES)
- fontFamily: courier-std → var(--font-courier)
- fontSize: 13px
- fontWeight: 400
- color: rgb(23,23,23)
- textTransform: none
- letterSpacing: normal
- padding: 0 16px

### Logo link
- display: inline-block
- width: 130px
- height: 60.23px
- color: rgb(23,23,23) (SVG fill)

### Icon buttons (Search, Account, Wishlist, Cart)
- width: 20px, height: 20px
- color: rgb(23,23,23)
- margin-left: 16px

### Cart badge
- position: absolute (top-right of cart icon)
- backgroundColor: rgb(23,23,23)
- color: white
- borderRadius: 50%
- fontSize: 10px
- width: 16px, height: 16px
- display: flex, alignItems: center, justifyContent: center

## Navigation Dropdown Menus
Left nav (SHOP dropdown):
- SHOP ALL, LATEST, ALL, TOPS, BOTTOMS, OUTERWEAR, ACCESSORIES, MEN, WOMEN, ART/MUSIC
Left nav (BRANDS dropdown — inside the right section):
- GALLERY DEPT., PARTNERSHIPS, VANS, UGG, ASICS, LA DODGERS NEW ERA, LA RAMS, LANVIN, BTS: JOSUÉ THOMAS, SEOUL DEPT.

Top-level visible nav items:
- Left side: SHOP, BRANDS
- Right side: DIALOGUE, STORES

## Text Content
- Logo: SVG (see GalleryDeptLogo component in icons.tsx)
- Left nav: SHOP | BRANDS
- Right nav: DIALOGUE | STORES
- Currency: CANADA (CAD$)

## Responsive Behavior
- **Desktop (1440px):** Full layout with left/center/right columns
- **Mobile (390px):** Hamburger menu, logo centered, cart icon visible

## States & Behaviors
No scroll-triggered style change detected (header stays white throughout).
Dropdowns appear on hover over SHOP / BRANDS / DIALOGUE.
