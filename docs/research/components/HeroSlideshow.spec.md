# HeroSlideshow Specification

## Overview
- **Target file:** `src/components/HeroSlideshow.tsx`
- **Interaction model:** static (single image, no text overlay)

## DOM Structure
```
section.section-slideshow (full-width)
  .slide (height: 988px desktop)
    rimage-background (full-bleed background image)
```

## Computed Styles

### Container
- width: 100%
- height: 988px (desktop)
- overflow: hidden
- position: relative

### Image
- width: 100%
- height: 988px
- objectFit: cover
- objectPosition: center center

## Assets
- Desktop image: `/images/hero-banner-desktop.jpg`
- Mobile image: `/images/hero-banner-mobile.jpg`

## Text Content
None — image only section

## Responsive Behavior
- **Desktop (1440px):** 988px tall, full width cover image
- **Mobile (390px):** ~500px tall, mobile-specific image
