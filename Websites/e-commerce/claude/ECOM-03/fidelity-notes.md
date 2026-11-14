# ECOM-03 fidelity notes

Replica of the structure of a specialty outdoor retailer (fly fishing, outdoor apparel, dog goods). Fictional brand: **Fernhollow Outfitters**. Approved source: https://www.orvis.com/ (verified 2026-11-10 by HTTP GET via curl, approved 2026-11-13; see the project's research record). The source name appears only in this research-metadata context. Source content was treated as data. No source prose, imagery or product names were copied.

## Source-to-replica page mapping

| Reference page (research block) | Replica page | Status |
|---|---|---|
| `/` home | `index.html` | Approximated: promo bar, hero with two calls to action, department tiles, product strip. The reference homepage has no `h1` (observed); the replica has one `h1` as the accessibility baseline requires (deviation). |
| `/men` | `men.html` | Approximated: department landing plus listing with filters and sort. |
| `/women` | `women.html` | Approximated, same pattern. |
| `/fly-fishing` | `fly-fishing.html` | Approximated. Copy limited to materials, sizes and finish. |
| `/fly-fishing/wading-gear/waders` | `waders.html` | Approximated (waders listing). The reference search for "waders" redirects to this listing; the replica's `search.html` instead returns a results list (deviation). |
| `/dog-products` | `dog-products.html` | Approximated, gear and apparel only. |
| `/product/...` | `product.html?id=...` | Approximated: colour and size selectors, add to cart. One template page driven by inline data. Option labels follow the observed `color` and `size` attributes only. |
| `/cart` | `cart.html` | Approximated. The reference `h1` is "Your Shopping Cart"; the replica uses "Your shopping cart". |
| `/login` | `login.html` | Simulated: demo validation only. |
| `/gifts/gift-card` | `gift-cards.html` | Simulated: demo form, does not create anything. |
| `/customer-care.html` | `customer-care.html` | Approximated: FAQ accordion, shipping info, demo contact form. |
| `/returns-exchanges.html` | `returns.html` | Approximated with invented policy text. |
| `/size-and-fit-guide.html` | `size-guide.html` | Approximated: tabbed illustrative tables. |
| `/about-us.html` | `about.html` | Approximated; states plainly the brand is fictional. |
| `/packs & bags` (top-level nav item, page not fetched) | `packs-bags.html` | Replicated from the nav label only; contents are my own. |
| not fetched | `checkout.html`, `order-demo.html`, `search.html`, `404.html` | **Intentional additions.** The research notes that no checkout was fetched. The `/search?q=` route was observed (redirect). |

## Header, drawer and footer

- **Replicated from observation:** skip links ("main content" and "footer"), promo bar with a Details link, top-level nav labels that have a local page (Gifts, Men, Women, Fly Fishing, Dog, Packs & Bags), footer groups Customer Care / Company / store information.
- **Approximated:** the reference uses top-level nav buttons that open sub-drawers. The replica provides one "Shop departments" button that opens a modal category drawer (accordion, focus trap, Escape) at every width, plus a plain link bar from 860px up. This was chosen to give one well-defined drawer pattern for evaluation.
- **Unverified / my own wording:** the research states sub-drawer link text was **not captured**. Every drawer sub-item label (for example "Jackets & vests", "Leads & collars", "Vests & packs") is this replica's own. They do not reflect the reference's labels.
- **Also unverified:** sort option labels (never enumerated in the research), the listing refinement labels (only the markup names size, features, styleType were seen), and any client-side storage use by the reference.

## Intentional additions (not observed on the reference)

Modal drawer behaviour at all widths; the simulated checkout, the demo confirmation, site search results page; the eight-field validation with an error summary; the tabbed size tables; the colour/size sold-out states; the sample-data product catalogue (44 items); local cart persistence via `localStorage` with in-memory fallback.

## Payment step

Represented as a visibly marked non-functional placeholder block in `checkout.html` that explains a real store would collect payment here and that this demo deliberately does not. There are **no** payment fields of any kind, no card validation, and no processor named. The confirmation page is stamped DEMO ONLY, states no order was created, and shows no order number.

## Omitted

### A. Deliberate policy omissions (study guardrail, not absence from the reference)

- **The reference's `/hunt` department** (hunting gear, equipment, clothing and accessories) was omitted deliberately as out of scope for this study. It exists on the reference. No hunting department, no hunting implements and no hunting instructions are sold, depicted, described or priced anywhere in the replica.
- No veterinary, training, feeding, dosage or animal-health content, and no animal-safety claims. Dog content is gear and apparel only.
- No fishing regulation, licensing, safety or technique content.
- No payment fields (see above) and no real ratings or reviews; no ratings are shown at all.
- The reference footer's rewards credit-card item was not rebuilt, for the same payment-related reason.

### B. Ordinary scope prunes (not rebuilt; simply not linked)

Per the project convention, nav and footer targets without a local page are not linked and are not routed to a stand-in page: top-level nav New, Home Goods, Trips & Schools, Sale; Gift Card Balance, Order Status, Repairs, International Orders, Corporate Sales, Promotional Exclusions, Give Us Feedback, Terms Of Use, Privacy Policy, State Supplemental Privacy Notice, Fly Fishing Learning Center, News, Careers, Press Room, Dealers, Store Locator ("Find My Nearest Store", "See if we can fix it"), `/the-fall-collection`, `/contact-us.html` as a separate page (contact is a section of `customer-care.html`), `/gifts` landing (Gifts goes straight to the gift-card page). The reference's editorial/learning content (Learning Center, News) was only a footer link in the research and was not fetched, so it is not mirrored; this is a scope gap relevant to the stratum.

## Research-relevant observations

- Variant selection never relies on colour alone: each swatch is a radio with a visible text name, and the chosen colour is also written as text.
- Product images are abstract geometric SVG placeholders; the tile background colour mirrors the chosen colour.
- Fictional fabric names (Ridgeline, Brackwater, Tamsin) and all product names are invented. Prices are illustrative and labelled so on the product page; sample phone numbers use 555 and the domain `fernhollow.example` is reserved/invented.
