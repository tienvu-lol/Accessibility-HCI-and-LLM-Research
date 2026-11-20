# Fidelity notes - REST-02 (source: https://franklinbbq.com/, research metadata only)

Evidence base: HTTP GET of raw HTML on 2026-11-14 (headings, nav anchors, element counts). No rendered layout, colors or typography were observed, so visual design is original.

## Replicated (from observed raw HTML)
- Page set: home, menu, visit, about, catering/events, backyard party, gift cards, sauces and rubs, contact.
- Primary nav order (Visit Us, Menu, Sauces & Rubs, About, Gift Cards, Private Events, Contact) plus a cart count; announcement bar with a holiday-booking message.
- Home section order: pull-quote h1, "Planning to visit?" with "Our location" / "Our hours", new venue space, holiday hours, sister restaurant, e-gift card promo, "Get the latest" newsletter.
- Menu page leads with lunch hours ("Tuesday to Sunday, 11 am until sold out, closed Monday") and a pre-order pointer.
- "Open until sold out" scarcity and queue culture: status chip, hours table, line tips.

## Approximated
- Footer and utility nav groupings (the source has 4 `<nav>` elements; here: primary, cart, footer, breadcrumb).
- Catering and backyard inquiry forms: the source routes inquiries through those pages; the form fields are invented.
- Holiday hours content (dates, closures) invented.

## Simulated
Pre-ordering, shop/cart, gift cards, newsletter, inquiries and contact. On the source, pre-order, shop and gift cards are off-site services; here they are labeled local demos. The sold-out/low-stock state is a labeled demo selector, not live data.

## Intentionally added (not observed on the source)
Dietary filtering, search, sort and item details dialog on the menu (the source menu was image-led with 4 images and no form); the demo pre-order tray; `cart.html`; breadcrumbs; the line-status demo; a 404 page.

## Omitted
- Nav item "Folder: Ship" (off-site nationwide shipping) and social links: not built, so not linked (round-11 navigation convention).
- The sister restaurant has no local page and is not linked.
- 46 home images are replaced by 14 local SVG placeholders, used where needed.
- Typekit fonts, Squarespace, Toast and Goldbelly integrations: not replicated.

## Source defects (recorded, not reproduced)
1. Primary nav links "Private Events" to `/private-events`, which returns 404; the working page is `/private-events01`. Here the nav links the built page `private-events.html`.
2. `/visitus` and `/private-events01` share the same `<title>`. Every page here has a distinct, descriptive title.
3. Home has two `h1` elements in raw HTML; here one `h1` and an `h2` for "Planning to visit?".

## Unverified
Rendered nav and visual styling, JS behavior of the source, actual menu items and prices (all invented here), accessibility of the source.

## Research-relevant observations
Dismissible announcement bar, native dialog, live-region result counts and error summary are the main dynamic patterns. The status chip uses shape plus text, not color alone.
