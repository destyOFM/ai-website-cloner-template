# Footer Specification

## Overview
- **Target file:** `src/components/Footer.tsx`
- **Interaction model:** static

## DOM Structure
```
footer#pagefooter
  .section-footer__row--blocks (3-col flex, border-top: 1px solid #171717)
    .section-footer__menu-block (COMPANY links)
    .section-footer__menu-block (CUSTOMER links)
    .section-footer__email-block (GET ON THE LIST + email form)
  .section-footer__row--bottom (copyright / bottom links)
```

## Computed Styles

### Footer container
- backgroundColor: rgb(255,255,255)
- color: rgb(23,23,23)
- fontFamily: courier-std → var(--font-courier)
- padding: 0

### `.section-footer__row--blocks`
- display: flex
- flexDirection: row
- justifyContent: space-between
- alignItems: flex-start
- padding: 40px 40px
- borderTop: 1px solid rgb(23,23,23)
- gap: 40px

### `.section-footer__title` (COMPANY, CUSTOMER, GET ON THE LIST)
- fontFamily: "Fjalla One" → var(--font-fjalla)
- fontSize: 16px
- fontWeight: 400
- textTransform: uppercase
- color: rgb(23,23,23)
- marginBottom: 16px

### Menu links
- fontSize: 14px
- fontFamily: courier-std → var(--font-courier)
- color: rgb(23,23,23)
- textDecoration: none
- lineHeight: 2

### GET ON THE LIST section
- "We'll send you email notifications on events and new releases."
- fontSize: 14px
- marginBottom: 16px

### Email input
- border: 1px solid rgb(0,0,0)
- padding: 0 0 0 16px
- fontSize: 16px
- width: 100%
- height: 52px
- backgroundColor: white
- fontFamily: courier-std

### Subscribe button
- backgroundColor: rgb(23,23,23)
- color: rgb(255,255,255)
- padding: 16px 25px
- fontSize: 16px
- fontFamily: courier-std
- border: none
- cursor: pointer
- marginTop: 8px

### Bottom row
- padding: 16px 40px
- borderTop: 1px solid rgb(23,23,23)
- display: flex
- justifyContent: space-between
- fontSize: 12px

## Text Content

### COMPANY
- Careers → /pages/careers-2
- Stores → /pages/stores
- STOP BEING RACIST → https://www.stopbeingracist.org/

### CUSTOMER
- Contact Us → /pages/contact-us
- Shipping, Returns & More → /pages/faq
- Check Gift Card Balance → /pages/gift-card-balance
- Privacy Policy → /privacy-policy
- CCPA Notice → /privacy-policy#california-privacy-notice
- ⚖️ Your Privacy Choices → /opt-out (with privacy icon)

### GET ON THE LIST
- Heading: "GET ON THE LIST"
- Subtext: "We'll send you email notifications on events and new releases."
- Input placeholder: "Your email"
- Button: "Subscribe"

### Bottom row
- © 2025 GALLERY DEPT.
- Link back to: GALLERY DEPT.

## Responsive Behavior
- **Desktop (1440px):** 3-column flex layout
- **Mobile (390px):** stacks to single column
