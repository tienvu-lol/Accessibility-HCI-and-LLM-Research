# REST-02 - Cinder Ridge Smokehouse (fictional replica)

- **Replica ID:** REST-02 (restaurant, slot 2, model group claude)
- **Category / stratum:** Restaurant & Food Service / BBQ / smokehouse
- **Fictional branding:** "Cinder Ridge Smokehouse", 1480 Mesquite Row, Juniper Falls, TX 78999 (invented), phone and email are placeholders (`.example`). The real brand name and address are not used.
- **Approved source:** https://franklinbbq.com/ (research metadata only)
- **Source verification:** 2026-11-14 by HTTP GET (no browser rendering); 9 pages returned 200, one nav target (`/private-events`) returned 404. The source was researched, HTTP-verified and approved on 2026-11-14 (`source_approved_at` 2026-11-14). Records: `Websites/pipelines/claude/research/REST.md`, `.../evidence/REST-http-2026-11-14.json`, `.../approval-restaurant-2026-11-14.md`.
- **Built by:** claude-sonnet-5-5 (Claude Code Agent tool builder), orchestrated by claude-opus-5. See `generation-metadata.json`.

## Run locally
Open `index.html` in a browser directly (`file://`). No server, build step or network is needed. All data is inline in `js/main.js`; the only browser storage used is `sessionStorage` (wrapped in try/catch) for announcement dismissal, demo cart, demo pre-order and the line-status demo.

## Sitemap and page-to-source mapping
| Local page | Reference page (observed) |
|---|---|
| `index.html` | `/` home |
| `menu.html` | `/menu` |
| `visit-us.html` | `/visitus` |
| `about.html` | `/about` |
| `private-events.html` | `/private-events01` (the nav label "Private Events" pointed to a 404 on the source) |
| `backyard-party.html` | `/private-party-franklin-backyard` |
| `gift-cards.html` | `/gift-cards` |
| `sauces-rubs.html` | `/sauces-rubs` |
| `contact.html` | `/contact` |
| `cart.html` | intentional addition (the source header shows a cart count linked to `/cart`; that page was not among the 9 observed) |
| `404.html` | required by Rules.md (source 404 observed only as a defect) |

11 HTML pages, 31 files in total. Navigation links only pages that exist here; the source's "Folder: Ship" item (off-site shipping) and its social links are not linked.

## Feature checklist
- Dismissible announcement bar (sessionStorage, try/catch), skip link, responsive header with mobile disclosure (`aria-expanded`, Escape closes), breadcrumbs (addition).
- Open/closed indicator based on the visitor's local clock against the invented hours, plus a **clearly labeled demo** line-status selector (running low / sold out) that also flags "limited" menu items. Real sell-out status is not available, so it is a simulation.
- Menu: 21 inline items in 5 categories; search, category, sort, four dietary filters (AND), clear, result count in a live region, empty state, native `<dialog>` details with focus return, demo pre-order tray with validated pickup form.
- Sauces and rubs: 6 inline products, demo cart (count in header), cart page with quantity change, remove, empty state and demo checkout.
- Gift card demo form with conditional custom amount; catering and backyard inquiry forms; contact form; newsletter signup. All validate client-side with labels, inline errors, an error summary and focus management, and end in a labeled demo success state.
- Sample data counts: 21 menu items, 6 products, 4 holiday-hours rows, 6 weekly-hours rows plus Monday closed.

## Simulations
Pre-ordering, shop/cart, gift cards, newsletter and all inquiries are local simulations. Nothing is sent, stored beyond the browser session, charged or shipped. Holiday dates, prices, capacity and the line status are invented.

## QC (Rules.md section 9)
Run on 2026-11-14: `node "Websites/tools/qc/qc.js" "Websites/restaurant/claude/REST-02"` reported `pages=11 files=31 failures=0 warnings=0`. It covers required files, JSON validity, links/assets, prohibited tech, remote requests, JS errors, landmarks/skip link/metadata, axe-core (WCAG 2.0-2.2 A/AA + best practice) at 1280px and 375px, and horizontal scroll. A scripted Playwright flow (29 checks) also passed; its script was kept outside the repo.

| Gate | Result |
|---|---|
| 13 Technology | pass (qc.js: no prohibited files, no remote requests; no fetch) |
| 14 Completeness | pass (qc.js: required files present, no broken links or assets) |
| 15 Structure | pass for landmarks and data-section/data-component; match to the reference's section order is by manual inspection of the research notes only |
| 16 Interaction | pass (scripted flows: menu filter/empty/dialog/pre-order, cart, checkout, gift card, inquiry errors, announcement, mobile nav) |
| 17 Accessibility | partial: axe-core pass at two widths and scripted focus checks; keyboard walkthrough, contrast beyond axe, 200% zoom, screen readers = not tested |
| 18 Traceability | pass by self-review of docs against files; no independent audit |
| 19 Scope | pass by self-review |

**Not tested:** screen readers, 200% zoom and text-spacing overrides, a full manual keyboard walkthrough, real mobile devices, browsers other than Chromium, reduced-motion behavior (CSS present, not exercised). This baseline is WCAG 2.2 AA-oriented; no conformance is claimed.

## Known limitations
- Raw-HTML research only; the reference's rendered layout was not inspected, so visual fidelity is approximate and no pixel match is claimed.
- The line-status demo applies for the whole browser session via sessionStorage.
- Home page uses one `h1` (the pull quote); "Planning to visit?" is an `h2` (the source had two h1s).
