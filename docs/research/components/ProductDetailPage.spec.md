# ProductDetailPage Specification

## Overview
- **Target files:** `src/app/products/[slug]/page.tsx`, `src/components/ProductDetail.tsx`
- **Interaction model:** Click-driven (size/color selection, accordion toggles)
- **Reference:** https://gallerydept.com/collections/new-release-tops/products/french-parker-shirt-tan?variant=52303124594869

## DOM Structure

```
StickyBanner (existing component — AnnouncementBar + Header)
<main>
  <div class="product-layout"> (2-column on desktop)
    <div class="product-images"> (left, ~58% width, scroll through stacked images)
      <img front />
      <img back />
    </div>
    <div class="product-info"> (right, ~42% width, sticky)
      <p>GALLERY DEPT.</p>         — brand
      <h1>FRENCH PARKER SHIRT</h1> — product name
      <p>$550</p>                  — price
      <div>Only 3 left</div>       — stock notice (if low stock)
      <div class="color-section">
        <p>Color: Tan</p>
        [Tan] [Black]              — color pill links
      </div>
      <div class="size-section">
        <div class="size-header"> Size  |  Size Guide </div>
        [XS] [S] [M] [L] [XL] [XXL]   — size pills
      </div>
      <button>Add to Cart</button>
      <button>Buy Now</button>
      <div class="details-accordion">
        [Details ▼]  [Materials & Care ▼]  [Shipping & Returns ▼]
      </div>
    </div>
  </div>
  <section class="recommendations">
    <ProductGrid> — 3 related products
  </section>
</main>
Footer
```

## Computed Styles (from Gallery Dept design system, verified against existing codebase)

### Page
- background: #ffffff
- color: #171717
- font-family: Courier Prime, Courier New, monospace

### .product-layout
- display: grid
- grid-template-columns: 58fr 42fr (desktop); 1fr (mobile, stacked)
- align-items: start
- gap: 0

### .product-images (left column)
- Stacked images, no gap between them, each full-width of column
- Each image: aspect-ratio 1 / 1.25
- width: 100%
- object-fit: cover

### .product-info (right sticky panel)
- position: sticky
- top: 0 (sticks below the StickyBanner ~130px from top)
- padding: 40px 40px 40px 48px (desktop)
- padding: 24px 16px (mobile)
- max-height: 100vh
- overflow-y: auto

### Brand label
- font-size: 13px
- font-family: var(--font-courier)
- color: #171717
- text-transform: uppercase
- letter-spacing: 0.06em
- margin-bottom: 4px

### Product name (h1)
- font-size: 20px
- font-family: var(--font-courier)
- font-weight: 700
- color: #171717
- text-transform: uppercase
- letter-spacing: 0.04em
- margin: 0 0 12px

### Price
- font-size: 18px
- font-family: var(--font-courier)
- color: #171717
- margin-bottom: 20px

### Stock notice
- font-size: 12px
- font-family: var(--font-courier)
- color: #171717
- letter-spacing: 0.04em
- text-transform: uppercase
- margin-bottom: 16px

### Section label (Color:, Size:)
- font-size: 13px
- font-family: var(--font-courier)
- color: #171717
- text-transform: uppercase
- letter-spacing: 0.06em
- margin-bottom: 10px

### Color swatches row
- display: flex
- gap: 8px
- margin-bottom: 20px

### Color pill button
- font-size: 12px
- font-family: var(--font-courier)
- padding: 6px 14px
- border: 1px solid #171717
- background: transparent
- color: #171717
- cursor: pointer
- text-transform: uppercase
- letter-spacing: 0.04em
- Active state: background: #171717, color: #ffffff

### Size header row
- display: flex
- justify-content: space-between
- align-items: center
- margin-bottom: 10px

### Size guide link
- font-size: 12px
- font-family: var(--font-courier)
- color: #171717
- text-decoration: underline
- text-underline-offset: 3px

### Size pills container
- display: flex
- flex-wrap: wrap
- gap: 8px
- margin-bottom: 24px

### Size pill button (default)
- font-size: 13px
- font-family: var(--font-courier)
- width: 52px
- height: 44px
- border: 1px solid #171717
- background: transparent
- color: #171717
- cursor: pointer
- text-transform: uppercase
- letter-spacing: 0.04em
- transition: background 0.15s, color 0.15s

### Size pill button (selected)
- background: #171717
- color: #ffffff

### Size pill button (disabled/out of stock)
- opacity: 0.35
- cursor: not-allowed
- (no change on hover)

### Add to Cart button
- display: block
- width: 100%
- height: 52px
- background: #171717
- color: #ffffff
- font-size: 14px
- font-family: var(--font-courier)
- text-transform: uppercase
- letter-spacing: 0.08em
- border: 1px solid #171717
- cursor: pointer
- margin-bottom: 12px
- transition: background 0.15s, color 0.15s
- Hover: background: #ffffff, color: #171717

### Buy Now button
- display: block
- width: 100%
- height: 52px
- background: transparent
- color: #171717
- font-size: 14px
- font-family: var(--font-courier)
- text-transform: uppercase
- letter-spacing: 0.08em
- border: 1px solid #171717
- cursor: pointer
- margin-bottom: 24px
- transition: background 0.15s, color 0.15s
- Hover: background: #171717, color: #ffffff

### Details accordion wrapper
- border-top: 1px solid #171717
- margin-top: 8px

### Accordion row
- display: flex
- justify-content: space-between
- align-items: center
- padding: 16px 0
- border-bottom: 1px solid #171717
- cursor: pointer
- font-size: 13px
- font-family: var(--font-courier)
- text-transform: uppercase
- letter-spacing: 0.06em

### Accordion content (open)
- padding: 0 0 16px 0
- font-size: 13px
- font-family: var(--font-courier)
- line-height: 1.7
- color: #171717
- border-bottom: 1px solid #171717

### Accordion chevron
- transition: transform 0.2s ease
- Open state: transform: rotate(180deg)

## States & Behaviors

### Size Selection
- **Trigger:** click on size pill
- **State A:** border: 1px solid #171717, background: transparent
- **State B (selected):** background: #171717, color: #ffffff
- **Transition:** background 0.15s ease, color 0.15s ease

### Accordion Toggle
- **Trigger:** click on accordion row
- **State A (closed):** content hidden (height: 0, overflow: hidden)
- **State B (open):** content visible
- **Chevron:** rotates 180deg on open
- **Transition:** instant (no height animation needed — keep simple)

### Hover on CTA buttons
- Add to Cart hover: invert colors (white bg, black text)
- Buy Now hover: invert colors (black bg, white text)
- Transition: 0.15s ease

## Per-State Content

### Color: Tan (active)
- Images: /images/product-french-parker-shirt-tan-front.jpg, /images/product-french-parker-shirt-tan-back.jpg
- Stock: "Only 3 left"

### Color: Black
- Images: /images/product-french-parker-shirt.jpg (fallback)
- Stock: Available

## Assets
- Front image: `public/images/product-french-parker-shirt-tan-front.jpg`
- Back image: `public/images/product-french-parker-shirt-tan-back.jpg`

## Text Content (verbatim from site)
- Brand: "GALLERY DEPT."
- Product name: "FRENCH PARKER SHIRT"
- Price: "$550"
- Stock: "Only 3 left"
- Color label: "Color: Tan"
- Size label: "Size"
- Size guide label: "Size Guide"
- Sizes: XS, S, M, L, XL, XXL
- Add to Cart button: "Add to Cart"
- Buy Now button: "Buy Now"
- Details heading: "Details"
- Details body: "Designed with a boxy, wide fit and point collar. Features a tonal button closure and front pocket detailed with the FRENCH logotype.\n\n• Short sleeve button-up\n• Textured fabric\n• Boxy, wide fit\n• Point collar\n• Tonal button closure\n• Front pocket with "FRENCH" logotype"
- Materials heading: "Materials & Care"
- Materials body: "100% Cotton\nMade in Portugal\n\nThis product may have wrinkles, scars, scratches that are inherent characteristics and natural beauty of this material."
- Shipping heading: "Shipping & Returns"
- Shipping body: "Orders can take 1–3 business days to be processed.\n\nItems being returned must be unworn and in original condition with all tags attached.\n\nDOMESTIC (US): Free shipping on orders $500+. Free returns.\nINTERNATIONAL: Free exchanges for store credit."

## Responsive Behavior
- **Desktop (1440px):** 2-column grid (58%/42%), images scroll, info panel sticky
- **Tablet (768px):** Same 2-column but tighter padding (24px right column)
- **Mobile (390px):** Single column — images full width first, then info panel below (no sticky), padding 16px
- **Breakpoint:** switches at 768px
