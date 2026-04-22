# AnnouncementBar Specification

## Overview
- **Target file:** `src/components/AnnouncementBar.tsx`
- **Screenshot:** `docs/design-references/announcement-bar.png`
- **Interaction model:** static

## DOM Structure
Two stacked bars:
1. Top bar: "Free shipping to Canada on all orders above CA$980.00" — full width, centered text
2. Announcement bar: Left = currency selector "CANADA (CAD$) ▾", Center = "FREE SHIPPING ON ORDERS $500+ (US)", Right = empty area

## Computed Styles (exact values from getComputedStyle)

### Top bar (`.ge-free-shipping-container`)
- backgroundColor: rgba(0,0,0,0) (white effectively from body)
- color: rgb(23,23,23)
- fontSize: 13px
- fontFamily: courier-std, monospace → use var(--font-courier)
- textAlign: center
- padding: ~4px 0
- height: 22px
- display: flex, alignItems: center, justifyContent: center

### Announcement bar container
- backgroundColor: #ffffff
- color: rgb(23,23,23)
- height: 30px
- display: flex, alignItems: center
- padding: 0 40px

### Left (currency selector)
- fontSize: 13px
- fontFamily: courier-std
- display: flex, alignItems: center, gap: 4px

### Center announcement text
- fontSize: 13px
- position: absolute center OR flex-grow in middle column
- textAlign: center
- letterSpacing: normal

### Right area
- empty / icons area

## Text Content
- Top bar: "Free shipping to Canada on all orders above CA$980.00"
- Center: "FREE SHIPPING ON ORDERS $500+ (US)"
- Currency: "CANADA (CAD$)" with ▾ down arrow

## Responsive Behavior
- **Desktop (1440px):** Both bars visible, layout as described
- **Mobile (390px):** Top bar hidden (desktop-only), announcement bar stays
