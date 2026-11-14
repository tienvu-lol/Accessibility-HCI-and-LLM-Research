# ECOM-01 - Pebblebloom (fictional demo store)

- **Replica ID:** ECOM-01 (slot 1, model group `claude`)
- **Category / stratum:** e-commerce / direct-to-consumer single-brand store (beauty)
- **Fictional brand:** Pebblebloom. Every product, shade, price, rating, address, email and phone number is invented.
- **Approved source:** https://www.glossier.com/ - verified 2026-11-10 by HTTP GET via curl (`-sSL -A "Mozilla/5.0"`), approved by the project lead on 2026-11-13. Complexity: medium. The research notes say the hero and carousel content was not characterized, so those regions here follow a generic structural pattern.
- **Protocol:** WEB-REPLICA-V1.0 with WEB-REPLICA-ALLOCATION-V1.0 (see `generation-metadata.json`).

**This is a simulation.** Nothing is sold, charged or shipped. The checkout has no payment fields at all: the payment step is a labelled non-functional placeholder. The confirmation page says no order was placed and shows no order number.

## Run it

Open `index.html` in a browser (works from `file://`; no server, no build step, no network). Vanilla HTML, one `css/styles.css`, one `js/main.js`, inline sample data. Keep scripting enabled: product lists, bag and forms are rendered by JavaScript. Bag state uses `sessionStorage` (every access is in try/catch with an in-memory fallback). Some browsers give each `file://` page its own storage origin, in which case the bag may not carry from page to page; serving the folder over local HTTP avoids that (not required for the rest).

## Sitemap and source mapping

| Local page | Reference page (research block) |
| --- | --- |
| `index.html` | `/` (structure only) |
| `shop.html` | `/collections/all` |
| `skincare.html` | `/collections/skincare` |
| `makeup.html` | `/collections/makeup` |
| `fragrance.html` | `/collections/fragrance` |
| `bestsellers.html` | `/collections/best-sellers` |
| `product.html?id=<id>` | `/products/...` (one template, 35 products) |
| `search.html?q=<term>` | `/search?q=...` |
| `cart.html` (+ drawer on every page) | `/cart` + cart drawer |
| `account.html` | `/account/login` (demo) |
| `gift-guide.html` | `/pages/holiday-gift-guide` |
| `returns.html` | `/policies/refund-policy` (+ help questions) |
| `checkout.html`, `confirmation.html` | intentional addition (reference checkout is externally hosted and was not fetched) |
| `404.html` | required |

Pruned navigation targets are listed in `fidelity-notes.md`; none are linked and there is no catch-all page.

## Feature checklist

- [x] Header with search form, primary nav, dropdown submenus, mobile "Menu" disclosure, bag button
- [x] Bag drawer (native dialog) and bag page: quantity change, remove, empty state, subtotal
- [x] Listings with filters (type/category, price band, extras), five sort orders, result count, empty state, Clear filters, `?type=` preselect from the nav
- [x] Product page: shade or size radio group (text name, swatch, check mark), unavailable options, quantity, add to bag, sticky add-to-bag bar, related products, ratings labelled fictional
- [x] Search over inline data with empty state
- [x] Simulated checkout with validation, error summary, focus management, demo confirmation
- [x] Demo sign-in, Gift Guide, returns/help accordions, 404
- [x] `data-section` / `data-component` instrumentation; `component-inventory.json` lists real filenames

## Interaction simulation notes

- Add to bag, quantity changes, removal, filter/sort results and shade selection are announced through a polite live region (`role="status"`).
- Escape closes the open submenu (focus returns to its button), the mobile menu, and the bag drawer.
- Checkout validates email shape, required address fields, postal code shape (3-10 letters/digits/spaces/hyphens), optional phone (7+ digits if given) and a required demo acknowledgement. On failure an error summary receives focus and links to each field; fields get `aria-invalid` and inline messages.
- The sign-in form validates shape only; nothing is stored or sent.

## Sample data counts

35 products (12 skincare, 17 makeup, 6 fragrance), 95 shade/size options, 9 best-sellers, 15 HTML pages, 6 static SVGs (product art is generated inline by `main.js`).

## QC against Rules.md section 9

Evidence: `node Websites/tools/qc/qc.js Websites/e-commerce/claude/ECOM-01` (static audit plus axe-core at 1280px and 375px for every page, initial state only) and a scripted Playwright flow run (about 90 assertions at 1280px and 375px, including axe on opened menu, opened drawer, empty states and error states). Final qc.js summary: see below.

| Gate | Result | Basis |
| --- | --- | --- |
| 13 Technology | pass | No libraries, CDNs, fonts, `fetch`, or build step; qc.js found no remote requests |
| 14 Completeness | pass | All mapped pages and artifacts present; qc.js link and asset audit clean |
| 15 Structure | partial | Landmarks and metadata checked by qc.js; match to the reference hierarchy is limited by what the research block recorded (hero/carousel unobserved) |
| 16 Interaction | pass | Scripted flows: nav, filters, sort, empty states, variants, bag, checkout validation, demo confirmation, search, Escape |
| 17 Accessibility | partial | axe automated rules plus scripted keyboard/focus checks only; no screen-reader, zoom, forced-colors or manual contrast audit |
| 18 Traceability | pass | Docs reviewed against the files; inventory pages are real filenames |
| 19 Scope | pass | Additions are labelled in `fidelity-notes.md` |

**Not tested:** screen readers and other assistive technology; browsers other than headless Chromium; `file://` storage behaviour in Firefox/Safari; 200% text zoom and forced-colors modes; dark-mode contrast beyond what axe checks; touch gestures; print.

No WCAG conformance claim is made. This is a WCAG 2.2 AA-oriented baseline, not an audited conformance result.

## Known limitations

- Reference hero/carousel content, filter labels and the reference's real checkout were not observed.
- Bag persistence depends on browser storage behaviour for `file://` pages.
- Colour chips are illustrative; shade names are invented and carry no real-world matching meaning.
- Ratings are fictional sample data.
