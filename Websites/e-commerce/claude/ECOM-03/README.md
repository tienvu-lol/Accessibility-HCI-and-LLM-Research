# ECOM-03 - Fernhollow Outfitters (fictional demo store)

- **Replica ID:** ECOM-03 (slot 3), category e-commerce, stratum specialty retailer, model group claude
- **Fictional brand:** Fernhollow Outfitters
- **Approved source:** https://www.orvis.com/ - verified 2026-11-10 (HTTP GET via curl, per the research record), approved 2026-11-13. The source is research metadata only.
- **Everything is fictional:** brand, products, fabrics, prices, policies, address (100 Example Road), phone (555-0142), email (care@fernhollow.example). Nothing can be bought, paid for or shipped.

## Run locally
Open `index.html` in a browser (works from `file://`; no server, no network, no build step). All data is inline in `js/main.js`.

## Sitemap (19 HTML files)
`index.html`, `men.html`, `women.html`, `fly-fishing.html`, `waders.html`, `dog-products.html`, `packs-bags.html`, `product.html?id=<id>`, `cart.html`, `checkout.html`, `order-demo.html`, `login.html`, `gift-cards.html`, `customer-care.html`, `returns.html`, `size-guide.html`, `about.html`, `search.html`, `404.html`. See `fidelity-notes.md` for the page-to-source mapping.
Other files: `css/styles.css`, `js/main.js`, 20 SVGs in `assets/`, `component-inventory.json`, `generation-metadata.json`.

## Sample data
44 products (men 8, women 7, fly fishing 13, dog 9, packs and bags 7), 8 colours, 15 product types, several sold-out sizes and one fully sold-out item, 14 items on sale. No ratings or reviews. Four FAQ items, three size tables.

## Feature checklist
- Modal category drawer with accordion sub-lists (own labels), focus trap, Escape, focus return, aria-expanded
- Listing pages with checkbox filters (type, colour, size, price cap, sale, availability), sort, result-count announcement, empty state, mobile filter disclosure
- Product detail with colour and size radios (text names), sold-out options disabled, validation, add to cart with polite live announcement
- Cart in `localStorage` (try/catch, in-memory fallback): quantity inputs, remove, clear, empty state, announcements
- Simulated checkout: validated form, error summary with focus, delivery radio, **payment placeholder (no payment fields)**, demo acknowledgement checkbox, DEMO ONLY confirmation without any order number
- Site search over inline data with empty state; demo sign-in, gift-card and contact forms (validation only); FAQ accordion; size tabs; 404

## Simulation notes
Checkout, sign-in, gift cards and contact never send or store anything. The checkout writes only an item summary to `sessionStorage` for the confirmation page, never the typed personal details. Totals are illustrative; tax is not calculated.

## QC gates (Rules.md section 9)
Evidence: `node Websites/tools/qc/qc.js Websites/e-commerce/claude/ECOM-03` (final result below), plus a scripted Playwright flow I ran from a scratch directory (not shipped) and grep audits.

| Gate | Result |
|---|---|
| 13 Technology | pass (no libraries, CDNs, fonts, fetch, build; qc.js reported no remote requests) |
| 14 Completeness | pass (qc.js link and asset checks; all required files present) |
| 15 Structure | partial (landmarks and data attributes verified; hierarchy follows the research block, not a live comparison) |
| 16 Interaction | pass for the flows listed below; scripted checks passed |
| 17 Accessibility | **partial**: axe automated rules via qc.js at 1280px and 375px plus scripted keyboard and focus checks; no manual screen-reader, zoom or contrast-tool review |
| 18 Traceability | pass (inventory page lists generated from the delivered files) |
| 19 Scope | partial (checkout, search and packs-bags pages are labelled additions; 44 products) |

Final qc.js run: `QC .../ECOM-03` -> `pages=19 files=45 failures=0 warnings=0`

**Flows scripted and passed:** drawer open, focus trap, accordion, Escape and focus return; listing prefilter, filter, sort, empty state, clear; variant errors with summary focus and error link; sold-out option disabled; add to cart and live announcement; cart quantity and badge; checkout validation and email error; demo confirmation; empty cart and empty checkout; search results and empty state; unknown product; mobile filter disclosure; add to cart with storage throwing.

**Not tested:** screen readers, browsers other than headless Chromium, Escape on the FAQ and mobile filter panel in every state, forced-colours mode, zoom to 200/400 percent beyond the 375px reflow check, touch interaction, print, real-user usability. No WCAG conformance is claimed.

## Known limitations
One shared product template; the drawer is used at every width; sort and filter labels are my own; reference sub-drawer labels were never observed; Escape handling on the mobile filter panel only applies where that panel is collapsible.
