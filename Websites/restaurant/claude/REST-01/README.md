# REST-01 - Trattoria Fico Nero (fictional)

- **Replica ID:** REST-01 (slot 1, model group claude)
- **Category / stratum:** Restaurant & Food Service / small local independent
- **Fictional branding:** "Trattoria Fico Nero", 27 Mulberry Alley, Lakeview Falls, ciao@ficonero.example. Owners "Marta Venn & Joel Ostrander". All names, dishes, prices, reviews and addresses are invented.
- **Approved source:** https://www.viacarota.com/ (research metadata only; no real name, address, logo or copy is reproduced).
- **Source verification:** researched, HTTP-verified and approved on 2026-11-14. Ten pages returned HTTP 200 by plain HTTP GET (no browser rendering); see `Websites/pipelines/claude/research/REST.md` (REST-01 block), `.../evidence/REST-http-2026-11-14.json` and `.../approval-restaurant-2026-11-14.md`.
- **Model / protocol:** claude-sonnet-5-5, WEB-REPLICA-V1.0 / WEB-REPLICA-ALLOCATION-V1.0 (see `generation-metadata.json`).

## Run locally
Open `index.html` in a browser (works from `file://`; no server, build step, network or fetch). The demo cart uses `localStorage` when available and falls back to memory.

## Sitemap (13 pages + 404)
| Local page | Purpose | Reference page |
|---|---|---|
| `index.html` | Home: image menu with text-menu link, address, hours, "It takes a village", cards | `/` |
| `text-menu.html` | Plain-text menu (real-text headings), plus search and dietary filter | `/text` |
| `press.html` | Reviews (invented) | `/press` |
| `gatherings.html` | Private-events info and demo inquiry form | `/gatherings` |
| `shop.html` | Demo shop, 6 products | `/shop` |
| `cocktails.html` | Cocktail list as disclosures | `/craft-cocktails` |
| `owners.html` | Owners story | `/ritaandjody` |
| `community.html` | Community involvement | `/community` |
| `cart.html` | Demo cart | `/cart` |
| `gallery.html` | Image gallery with dialog | hashed `/pomeriggio-1/...` gallery |
| `reserve.html` | Demo reservation request | **Intentional addition** (reference books off-site) |
| `search.html` | Working local search | `GET /search` (which did not respond on the reference) |
| `accessibility.html` | Short statement | footer "Accessibility" link |
| `404.html` | Not-found with route back | required by Rules.md |

Navigation is pruned to pages that exist here. Privacy, Careers, sister-restaurant links and the off-site ordering and booking links are not linked.

## Feature checklist
- Menu shown as an image (SVG) on the home page with descriptive alt text, a visible caption link, and a text-alternative link placed before the image; the full text equivalent is `text-menu.html` (headings SPUNTINI, BRUSCHETTA, ANTIPASTI, VERDURE, Pasta, PESCE, CARNE, SPeCIALS, Lista del vini with Spumanti, Bianchi, Rossi, Aperitivi, Cocktails).
- Dietary filter and text search on the plain-text menu (intentional addition) with live count and empty state.
- Header search, newsletter footer form on every page, demo reservation, demo events inquiry, demo cart/checkout.
- Hours block with a device-clock open/closed indicator (intentional addition, labeled demo).
- Disclosure nav on small screens, accordions, native `<dialog>` lightbox.
- `data-section` / `data-component` instrumentation; see `component-inventory.json` (32 components).

## Sample data counts
46 menu items (32 food, 14 wine/aperitivi/cocktails), 6 products, 5 cocktails, 4 press quotes, 8 gallery images, 3 community items, 69-entry local search index.

## Simulation notes
Reservation, events inquiry, newsletter, shop cart and checkout are local simulations. Each says "Demo" in its label and success message; nothing is sent, stored (other than the cart in the browser) or charged. No gift cards, delivery or payment forms were built.

## QC gates (Rules.md section 9)
Run: `node Websites/tools/qc/qc.js Websites/restaurant/claude/REST-01` on 2026-11-14: **pages=14 files=42 failures=0 warnings=0** (final run, all deliverables present).

| Gate | Result | Evidence |
|---|---|---|
| 13 Technology | pass | qc.js prohibited-tech and remote-request checks, failures=0; no frameworks, fetch or CDNs |
| 14 Completeness | pass | qc.js required files, links and assets, failures=0 |
| 15 Structure | pass | qc.js landmarks, skip link, metadata; structure matches observed reference order (judged by author from the research notes, not re-browsed) |
| 16 Interaction | pass | Scripted Playwright flow run (30 checks, 29 passed; the 1 miss was a wrong expectation in my test, not a site defect): filters, empty states, form errors and focus, reservation/events/newsletter validation, cart add/edit/remove/checkout, search, accordion, dialog, mobile nav |
| 17 Accessibility | partial: pass for automated | axe-core (WCAG 2.0-2.2 A/AA + best practice) at 1280px and 375px, 14 pages, no violations; no horizontal scroll at 375px; Escape and focus-return scripted. Contrast was checked by axe only |
| 18 Traceability | pass (author review) | docs describe implemented files |
| 19 Scope | pass (author review) | 8-15 pages; extras labeled as additions |

**Not tested:** screen readers (NVDA, JAWS, VoiceOver, TalkBack), 200%/400% zoom and text-spacing overrides, manual keyboard walkthrough on every page, Firefox/Safari, forced-colors mode, dark-mode appearance review, real touch devices. **No claim of WCAG conformance is made;** the site is a WCAG 2.2 AA-oriented baseline only.

## Known limitations
- Menu image is an abridged SVG (first two dishes per section); the text menu is the complete list.
- Open/closed indicator uses the visitor's clock, not a time zone.
- Dietary tags are invented demo data.
- Reference rendering was not observed in a browser (HTTP GET only), so layout is approximated.
