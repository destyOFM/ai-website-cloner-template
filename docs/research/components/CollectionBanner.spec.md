# CollectionBanner Specification

## Overview
- **Target file:** `src/components/CollectionBanner.tsx`
- **Interaction model:** static (hover scale on image)

## DOM Structure
```
section.section-collection-list (height: 1080px)
  .container
    .collection-list (display: flex, 2 columns)
      .collection-item (×2)
        a.collection-link
          .collection-item__image (overflow: hidden)
            img (portrait, full bleed)
          .collection-item__title (Fjalla One, uppercase)
```

## Computed Styles

### Container
- width: 100%
- height: 1080px (desktop)
- overflow: hidden

### `.collection-list` (two-col flex)
- display: flex
- flexDirection: row
- gap: 0
- width: 100%

### `.collection-item`
- width: 50%
- position: relative
- overflow: hidden

### Image wrapper
- width: 100%
- height: 974px (desktop)
- overflow: hidden

### Image
- width: 100%
- height: 100%
- objectFit: cover
- objectPosition: center top
- transition: transform 0.4s ease
- On hover: transform: scale(1.03)

### `.collection-item__title` (overlay text at bottom)
- position: absolute
- bottom: 0
- left: 0
- width: 100%
- padding: 24px
- fontFamily: "Fjalla One" → var(--font-fjalla)
- fontSize: 23px
- fontWeight: 400
- textTransform: uppercase
- color: rgb(23,23,23)
- backgroundColor: rgba(255,255,255,0) (no bg — sits on white area below image? Or text overlays image bottom)

## Collection Data — Banner 1 (Tops)
```
[
  { title: "SHORT SLEEVE TEES", img: "/images/collection-short-sleeve-tees.jpg", link: "/collections/short-sleeve-tees" },
  { title: "SWEATSHIRTS", img: "/images/collection-sweatshirts.jpg", link: "/collections/sweatshirts" }
]
```

## Collection Data — Banner 2 (Bottoms/Denim)
```
[
  { title: "BOTTOMS", img: "/images/collection-bottoms.jpg", link: "/collections/bottoms" },
  { title: "DENIM", img: "/images/collection-denim.jpg", link: "/collections/denim" }
]
```

## Responsive Behavior
- **Desktop (1440px):** 2 columns, 974px image height
- **Mobile (390px):** stacks to 1 column, shorter image height
