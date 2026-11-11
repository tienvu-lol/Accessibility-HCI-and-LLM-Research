# ECOM-02 - Lindora Home (replica)

| Field | Value |
| --- | --- |
| Replica ID | ECOM-02 (e-commerce, slot 2, model group `claude`) |
| Category / stratum | E-commerce / large multi-category retailer (home furnishings) |
| Fictional branding | **Lindora Home** (original name, logo and copy; all products, prices, reviews and policies are invented) |
| Approved source URL | https://www.ikea.com/us/en/ (research metadata only; no real branding is used) |
| Source verification | 2026-11-10, HTTP GET via curl, all 16 reference URLs returned 200 (from `Websites/pipelines/claude/research/ECOM.md`; not re-fetched in this run) |
| Source approval | 2026-11-10. The project lead **waived the Phase A approval stop** and approved this reference directly. |
| Protocols | WEB-REPLICA-V1.0 / WEB-REPLICA-ALLOCATION-V1.0 |

## Run locally

Open `index.html` in a browser (double-click or `file://`). No server, build step, network access or install is needed. All data is inline in `js/main.js`.

## Sitemap and page-to-source mapping

Reference paths are under `https://www.ikea.com/us/en/`.

| Local page | Reference page | Notes |
| --- | --- | --- |
| `index.html` | `/` | Promo strip, hero, category tiles, deals, family offers, new designs, "right now" band |
| `furniture.html` | `/cat/furniture-fu001/` | Category hub with subcategory and product-type tiles |
| `sofas.html` | `/cat/sofas-armchairs-700640/` | Listing: filters, sort, pagination |
| `lighting.html` | `/cat/lighting-li001/` | Same listing pattern |
| `beds.html` | `/cat/beds-mattresses-bm001/` | Same listing pattern |
| `product.html?id=...` | `/p/kivik-sofa-...` | Product detail with cover/option choice, quantity, add to bag |
| `search.html?q=...` | `/search/?q=desk` | Results over inline data, empty state |
| `cart.html` | `/shoppingcart/` | Bag with quantity, remove, promo code |
| `login.html` | `/profile/login/` | Demo sign-in and sign-up |
| `new.html` | `/new/` | New products |
| `rooms.html` | `/rooms/` | Room tiles linking to room searches |
| `customer-service.html` | `/customer-service/` and `/customer-service/services/delivery/` | Hub; delivery options merged in as a section (approximation) |
| `returns.html` | `/customer-service/returns-claims/` | Policy, windows, return-window checker (intentional addition) |
| `faq.html` | `/customer-service/faq/` | Accordion with a search filter (filter is an intentional addition) |
| `contact.html` | `/customer-service/contact-us/` | Demo contact form |
| `checkout.html` | not among the 16 fetched pages | **Intentional addition** (simulated checkout and demo confirmation) |
| `404.html` | n/a | Required artifact |

15 reference-mapped pages + 1 intentional addition + 404 = 17 HTML files.

## Feature checklist

- [x] Header with skip link, search form, utility links (log in, bag with live count), primary navigation with a "Products" mega-menu disclosure (works at mobile widths too)
- [x] Product listings (3 categories) with checkbox/select filters, active-filter chips, sort, pagination, empty state, `?type=` presets
- [x] Product detail with required cover/option choice, quantity, price update, image thumbnails, accordions, related products, dialog after add to bag
- [x] Bag persisted in `localStorage`, quantity change, remove, demo promo code `FAMILY10` (10% off), free delivery over $500
- [x] Simulated checkout with validation and a clearly marked demo confirmation (bag cleared)
- [x] Site search over inline data with empty state
- [x] Demo sign-in/sign-up (display name in `sessionStorage` only)
- [x] Help: delivery options, returns checker, FAQ filter, contact form, footer sign-up
- [ ] Favorites, store/location finder, planning tools, other ~18 reference categories: omitted (see `fidelity-notes.md`)

## Sample data

24 products (8 each in sofas & armchairs, lighting, beds & mattresses; 5 flagged new, 5 on sale), 11 colour names, 3 option groups, 2 delivery methods, 1 promo code, 8 FAQ entries, 4 rooms.

## Interaction simulation notes

- No request leaves the page. Search, filters, bag, checkout and forms run on inline data and browser storage.
- Bag: `localStorage` key `lindora.bag` (plus `lindora.promo`, `lindora.delivery`). Demo user: `sessionStorage` key `lindora.user`.
- Checkout reads card fields only to validate their format; nothing is stored or sent. The confirmation says no payment was taken and nothing will ship.
- Sign-in accepts any well-formed email and an 8+ character password; no account exists.
- The contact form, footer sign-up and return checker end in a "demo only" status message.

## Accessibility baseline (implementation targets, not conformance)

`<html lang>`, first-tab skip link, one `h1` per page, labelled fields with inline errors, an error summary that receives focus, `aria-expanded` on the menu and filter toggles, Escape closing the menu, filters and dialog, visible focus ring, reduced-motion media query, reflow to 375px. **This is a WCAG 2.2 AA-oriented baseline. No conformance is claimed.**

## QC results (RULES.md section 9)

Run: `node Websites/tools/qc/qc.js Websites/e-commerce/claude/ECOM-02` on 2026-11-11, result `pages=17 files=39 failures=0 warnings=0` (static checks, JSON validity, links/assets, prohibited tech, remote requests, console/JS errors, landmarks, skip link, metadata, axe-core WCAG 2.0-2.2 A/AA + best-practice at 1280px and 375px, horizontal scroll at 375px). A separate scripted Playwright run (72 assertions, 0 failed; script kept outside the repo) exercised the flows below and re-ran axe on interactive states: open menu, empty listing, product errors, open dialog, bag, checkout errors, confirmation, empty search, mobile menu.

| Gate | Result | Evidence |
| --- | --- | --- |
| 13 Technology | pass | qc.js: no prohibited files/libraries, no remote requests; grep found no `fetch(` or `http(s)://` in HTML/JS/CSS |
| 14 Completeness | pass | qc.js: all required files present, no broken links or assets |
| 15 Structure | pass | qc.js: landmarks, `main#main-content`, skip link, `data-section`/`data-component` on every page; region order compared with the research notes only, not the live site |
| 16 Interaction | pass (automated) | scripted flows: menu, filters, sort, paging, empty states, variant errors, dialog, bag, promo, checkout, sign-in, search, FAQ, returns, contact, footer form |
| 17 Accessibility | partial | axe clean on 17 pages x 2 widths and on the states above; Escape/Tab/focus-return asserted in script. **Not tested:** screen readers, 200% zoom/text resize, a full manual keyboard walkthrough, forced-colors, real contrast beyond axe, voice control |
| 18 Traceability | pass | inventory generated from the shipped HTML plus a listed set of JS-rendered components; source facts come from the research file, not from new browsing |
| 19 Scope | pass | 15 reference pages + 1 labelled addition; 24 products |

### Flows checked by script

Home feeds and mega-menu (open, Escape, focus return); skip link first Tab stop; sofas listing (6 + 2 across two pages, type filter, chip removal, price sort, sale+new empty state, clear all, `?type=`); product required-field errors with summary focus and summary-link focus, variant price update, dialog open/Escape/focus return, bag count, unknown product id; bag persistence, quantity, invalid and valid promo; checkout errors, ZIP error, confirmation with focus, bag cleared; sign-in/out; search results, prefilled box, empty state, room search; FAQ filter and empty state; returns errors, future date, expired window; contact errors, min length, success; footer sign-up; 404 link; 375px filter disclosure, Escape, mobile menu and no horizontal scroll on the product page.

## Known limitations

- Reference mega-menu contents were not in the static HTML, so the menu structure is inferred from the category and product-type pages.
- Search results, shopping bag and login page content of the reference were unverified in the research; those pages follow the typical pattern and are labelled as inferred in `fidelity-notes.md`.
- Product pages render with JavaScript; without it a notice is shown. Filters, search and the bag need JavaScript by design.
- Product images are generic SVG illustrations; swatch colour only tints the image background.
- Taxes, stock, store pickup, favorites and ZIP-based delivery are not modelled.
- `localStorage` may be unavailable in some `file://` privacy modes; the bag then falls back to in-memory storage for that page load only.
