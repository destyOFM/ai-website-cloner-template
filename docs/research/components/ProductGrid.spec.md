# ProductGrid Specification

## Overview
- **Target file:** `src/components/ProductGrid.tsx`
- **Interaction model:** static (hover shows secondary image)

## DOM Structure
```
section.section-featured-collection
  .container
    .product-list (3-col grid)
      .product-block (×6)
        .block-inner
          .block-inner-inner
            .image-cont (position: relative, overflow: hidden)
              .product-block__image--primary (img)
              .product-block__image--secondary (img, shown on hover)
            .product-block__meta
              .product-block__title (product name)
              .product-block__price (price)
```

## Computed Styles

### `.product-list`
- display: grid
- gridTemplateColumns: repeat(3, 1fr)
- gap: 0px (no gap between products, padding on each block)
- width: 100%

### `.product-block`
- paddingLeft: 20px
- paddingRight: 0
- paddingBottom: 40px
- backgroundColor: transparent

### Image container
- position: relative
- overflow: hidden
- aspectRatio: 1/1.2 (portrait)
- backgroundColor: #f5f5f5

### Product image (primary)
- width: 100%
- height: 100%
- objectFit: cover
- transition: opacity 0.3s ease

### Product image (secondary) — hover state
- position: absolute
- top: 0, left: 0
- width: 100%, height: 100%
- objectFit: cover
- opacity: 0
- transition: opacity 0.3s ease
- On hover: opacity: 1

### `.product-block__title`
- fontFamily: courier-std → var(--font-courier)
- fontSize: 14px
- fontWeight: 400
- color: rgb(23,23,23)
- marginTop: 12px
- textTransform: none

### `.product-block__price`
- fontFamily: courier-std → var(--font-courier)
- fontSize: 14px
- color: rgb(23,23,23)
- marginTop: 4px

## Product Data — Grid 1 (Tops)
```
[
  { title: "FRENCH PARKER SHIRT", price: "$850.00", img: "/images/product-french-parker-shirt.jpg", link: "/products/french-parker-shirt-tan" },
  { title: "SUN TANK", price: "$610.00", img: "/images/product-sun-tank.jpg", link: "/products/sun-tank-sun-faded-black" },
  { title: "PAINTED FRENCH COLLECTOR TEE", price: "$695.00", img: "/images/product-painted-collector-tee.jpg", link: "/products/painted-french-collector-tee-light-blue" },
  { title: "FRENCH LOGO LUX L/S TEE", price: "$610.00", img: "/images/product-french-logo-lux-ls-tee.jpg", link: "/products/french-logo-lux-ls-tee" },
  { title: "MIXED CAMO TEE", price: "$455.00", img: "/images/product-mixed-camo-tee.jpg", link: "/products/mixed-camo-tee" },
  { title: "NOISE 2FER L/S", price: "$655.00", img: "/images/product-noise-2fer-ls.jpg", link: "/products/noise-2fer-ls" }
]
```

## Product Data — Grid 2 (Bottoms)
```
[
  { title: "THEO SHORTS", price: "$2,080.00", img: "/images/product-theo-shorts.jpg", link: "/products/theo-shorts" },
  { title: "PLATOON PAINTER SHORTS", price: "$1,225.00", img: "/images/product-platoon-painter-shorts.jpg", link: "/products/platoon-painter-shorts" },
  { title: "FRENCH ZUMA SHORTS", price: "$695.00", img: "/images/product-french-zuma-shorts.jpg", link: "/products/french-zuma-shorts" },
  { title: "MARLEY DENIM", price: "$1,535.00", img: "/images/product-marley-denim.jpg", link: "/products/marley-denim" },
  { title: "COMPOSITION PANT", price: "$3,995.00", img: "/images/product-composition-pant.jpg", link: "/products/composition-pant" },
  { title: "LA OG FLARE", price: "$1,550.00", img: "/images/product-la-og-flare.jpg", link: "/products/la-og-flare" }
]
```

## Responsive Behavior
- **Desktop (1440px):** 3 columns
- **Mobile (390px):** 2 columns (product-list--per-row-mob-2)
