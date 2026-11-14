# ECOM-02 - Larkwood Home (fictional)

- **Replica ID:** ECOM-02 (slot 2, model group claude)
- **Category / stratum:** e-commerce / large multi-category retailer (home furnishings)
- **Fictional brand:** Larkwood Home. Every brand, product, collection and store name is invented.
- **Approved source:** https://www.ikea.com/us/en/ (verified 2026-11-10 by HTTP GET via curl, all 16 reference URLs returned 200; approved by the project lead 2026-11-13, record `Websites/pipelines/claude/research/approval-2026-11-13.md`). Structure was re-read from the research block only; no reference content was copied.
- **Status:** a static, WCAG 2.2 AA-oriented research baseline. It is not a claim of conformance and no manual audit was done.

## Run locally

Open `index.html` directly (`file://`). No server, build step, network or library is needed. The demo bag uses `sessionStorage`; every access is wrapped in try/catch and falls back to memory, so the pages still work when storage throws.

## COMMERCE GUARDRAILS (read first)

- **Nothing can be bought.** Every page carries a "fictional demo store" strip; the bag, checkout and confirmation carry additional demo banners.
- **The checkout is a simulation.** No order is placed, no money moves, nothing is shipped or scheduled. The confirmation page is marked demo and issues **no order number** (there is no order).
- **No payment fields exist.** The payment step is a labelled non-functional placeholder box (`data-component="payment-placeholder"`) stating that a real store would collect payment here and this demo deliberately does not. There is no card, expiry, security-code or bank input, and no card validation code.
- Product copy sticks to materials, dimensions, finish and style. There are no safety, compliance, certification or assembly claims. Prices, dimensions and product data are invented; there are no ratings or reviews.
- Phone numbers use 555 exchanges; the contact email uses a reserved `.example` domain; store addresses are invented. Imagery is abstract SVG furniture silhouettes with no people.

## Sitemap and page-to-source mapping

| Local page | Reference page (path under the source host) | Notes |
| --- | --- | --- |
| `index.html` | `/us/en/` | Home |
| `furniture.html` | `/us/en/cat/furniture-fu001/` | Department landing |
| `sofas.html` | `/us/en/cat/sofas-armchairs-700640/` | Listing: filters, sort, show more |
| `lighting.html` | `/us/en/cat/lighting-li001/` | Listing |
| `beds.html` | `/us/en/cat/beds-mattresses-bm001/` | Listing (frames, headboards, bedside tables; no mattresses) |
| `product.html?id=...` | `/us/en/p/...` (one sofa page) | Detail for all 44 sample products via query string |
| `search.html` | `/us/en/search/?q=desk` | Search results over inline data |
| `cart.html` | `/us/en/shoppingcart/` | Demo bag |
| `login.html` | `/us/en/profile/login/` | Labelled demo sign-in |
| `new.html` | `/us/en/new/` | New designs |
| `rooms.html` | `/us/en/rooms/` | Rooms with anchors |
| `customer-service.html` | `/us/en/customer-service/` plus `.../contact-us/` and `.../services/delivery/` | Hub; contact and delivery are sections, not pages |
| `returns.html` | `/us/en/customer-service/returns-claims/` | Sample policy text |
| `faq.html` | `/us/en/customer-service/faq/` | Accordion |
| `checkout.html` | (none) | Intentional addition: simulated checkout |
| `confirmation.html` | (none) | Intentional addition: demo confirmation |
| `stores.html` | footer "Find a Location" target (page itself not in the 16 sampled) | Store locator over invented data |
| `404.html` | (none) | Required |

14 reference pages mapped (the 16 sampled, with two merged into the hub), 3 intentional additions, 1 not-found page = 18 HTML files. 33 files in total (see below).

## Feature checklist

- Skip link, landmarks, one h1 per page, breadcrumbs, `aria-current`.
- Mega-menu: "Shop all" button, four department sub-disclosures, links. `aria-expanded` at each level; Escape closes the innermost open level and returns focus; outside click or focus closes it. On narrow screens the whole nav sits behind a "Menu" disclosure.
- Listing: type, finish, price and "new only" filters, sort, result count (polite status), empty state with clear-filters, "Show more" paging (8 per page), mobile filter disclosure, `?type=` preselection from the menu.
- Product: finish radio swatches with visible text names (not colour alone), size select with price change, quantity 1-10 with validation, add to bag with polite live announcement.
- Bag: persistence in `sessionStorage` (guarded), +/-/typed quantity with range error, remove with focus management, empty state, empty-bag button.
- Checkout simulation: labelled fields with autocomplete tokens, inline errors, error summary that takes focus, links from summary to fields, payment placeholder, acknowledgement checkbox, demo confirmation.
- Search (header form to `search.html`), empty and blank states; store locator with text and state filter, empty state, reset; FAQ accordion; demo sign-in with validation.
- Escape handling, `prefers-reduced-motion`, responsive reflow, visible focus.

## Sample data counts

44 products (12 sofas and armchairs, 12 lighting, 12 beds and bedroom, 8 desks and storage), 8 fictional stores, 6 FAQ entries, 2 invented collections, 3 room groupings.

## Files

18 HTML pages, `css/styles.css`, `js/main.js`, 9 SVGs in `assets/`, `README.md`, `fidelity-notes.md`, `component-inventory.json`, `generation-metadata.json` (33 files). Pages were authored from a scratch generation script that is not shipped; the delivered files are plain static HTML.

## QC gates (Rules.md section 9)

Run: `node Websites/tools/qc/qc.js Websites/e-commerce/claude/ECOM-02` (see `generation-metadata.json` for the final summary line). The qc run covers static link/asset checks and axe-core (WCAG 2/2.1/2.2 A/AA plus best-practice tags) on every page at 1280 px and 375 px, runtime console errors, remote requests and horizontal scroll at 375 px.

| Gate | Result | Evidence |
| --- | --- | --- |
| 13 Technology | pass | qc.js: no frameworks, no remote requests, no fetch; vanilla JS only |
| 14 Completeness | pass | qc.js: all required files present, no broken relative links or assets |
| 15 Structure | pass | qc.js landmark/metadata checks; section order manually compared with the research block |
| 16 Interaction | partial | Scripted Playwright flows (mega-menu levels, filters, sort, show more, empty states, variants, add to bag, quantity, removal, checkout validation, confirmation, search, stores, login, FAQ, mobile menu, blocked storage) passed; not every control was exercised |
| 17 Accessibility | partial | axe-core automated rules plus scripted keyboard/focus checks only; no screen reader, no manual contrast audit beyond axe, no zoom/text-spacing testing |
| 18 Traceability | pass | docs reflect the delivered files; inventory pages are real filenames |
| 19 Scope | pass | additions labelled; reference nav pruned rather than stubbed |

### Not tested

Screen readers; real assistive-technology use; browsers other than Chromium; 200 percent zoom and text-spacing overrides; Windows high-contrast mode; touch input; printing; very long product lists; real mouse-hover timing for the mega-menu (it is click-driven). WCAG conformance is not claimed.

## Known limitations

- Mega-menu items are the author's own (the reference's dropdown contents were not observed).
- Search is simple substring matching with no ranking or typo tolerance.
- Product images are generated abstract SVGs, not photographs.
- Bag state is per browser session only.
