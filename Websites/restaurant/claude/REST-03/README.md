# REST-03 — Vane & Alder (fictional fine dining replica)

- **Replica ID:** REST-03, slot 3, category restaurant (Restaurant & Food Service), stratum fine dining, model group claude.
- **Fictional branding:** "Vane & Alder", 14 Lantern Court, Harrowgate, Fictional State. Every name, address, phone number, press item, price and biography is invented.
- **Approved source:** Eleven Madison Park, https://www.elevenmadisonpark.com/ (research metadata only; no names, address, copy or media reused).
- **Verification:** researched, HTTP-verified and approved on 2026-11-14. Method was HTTP GET only (12 pages returned 200; `robots.txt` matched no disallow rule), with no browser rendering. Records: `Websites/pipelines/claude/research/evidence/REST-http-2026-11-14.json` and `approval-restaurant-2026-11-14.md`.
- **Evidence gap (read `fidelity-notes.md`):** the reference served zero `h1`/`h2`/`h3` elements in raw HTML, so this replica's information architecture is **inferred** from link, form and control structure, not observed.

## Run locally
No build, server or network is needed. Open `index.html` in a browser (works from `file://`). All data is inline in `js/main.js`. Cart contents use `sessionStorage` when available and degrade silently if not.

## Sitemap (14 content pages + 404)
| File | Purpose | Reference page it maps to |
|---|---|---|
| index.html | Home | `/` |
| about.html | Our restaurant | `/ourrestaurant` (and `/about`, a byte-identical duplicate; one route kept) |
| team.html | Team grid with bio disclosures | `/team` |
| menu.html | Evening menu, dietary filter, wine sample | **Intentional addition** (no menu page observed) |
| reservations.html | Reservation request (simulation) | **Intentional addition** (reference books off-site via a third-party service) |
| events.html | Spaces and private-events inquiry | `/events` |
| stories.html | Journal list, topic filter, dialog reader | `/stories` |
| lantern-fields.html | Partner farm, seasonal tabs | `/magic-farms` |
| faq.html | Searchable accordion | `/faq` |
| press.html | Press and awards, filters | `/press-and-accolades` |
| careers.html | Sample roles, filter, demo application | `/careers` |
| gift-cards.html | Demo gift card form and demo cart | `/giftcards` |
| contact.html | Address, hours, demo contact form | `/contact` |
| accessibility.html | Accessibility statement for this replica | `/accessibility-statement` (listed in reference nav; not in the 12 verified 200 pages) |
| 404.html | Not-found page with route home | n/a |

Navigation was pruned to pages that exist here; nothing routes to a stand-in page. Reference nav labels "Folder: About" and "Folder: Shop" are represented by two disclosure menus (About, Shop) whose contents are inferred.

## Feature checklist
- [x] Skip link, landmarks, one h1 per page, breadcrumbs on interior pages
- [x] Primary/utility/footer navs (3 `nav` landmarks on the home page matching the observed count of 3; interior pages add a breadcrumb `nav`), mobile menu, dropdown disclosures with Escape
- [x] Menu search plus course and dietary filters with empty state
- [x] Reservation, events, contact, careers, gift card and newsletter forms: labeled fields, inline errors, error summary with focus, demo success
- [x] FAQ search and accordion, press filters, careers filter and accordion, farm tabs (arrow keys), story dialog, team bio disclosures, demo cart
- [x] `data-section` / `data-component` instrumentation, local SVG placeholders, `404.html`

## Sample data counts
12 dishes, 5 wines, 6 stories, 6 team members, 6 press items, 9 FAQs, 5 roles, 4 seasons x 5 produce items.

## Simulation notes
Reservations, private-event inquiry, careers application, contact, newsletter, gift cards and checkout are **simulations**. No availability is shown, nothing is transmitted or stored (beyond the demo cart in `sessionStorage`), and every success message says so.

## QC (Rules.md section 9) — evidence from this run
Run on 2026-11-14: `node Websites/tools/qc/qc.js Websites/restaurant/claude/REST-03` -> `pages=15 files=27 failures=0 warnings=0`. Scripted Playwright flow checks (own script, kept outside the repo): 35 of 35 checks passed (reservation validation and success, menu filters, nav Escape, FAQ search, dialog, tabs, gift cart, newsletter, press, careers, team, mobile menu, no console errors).

| Gate | Result | Basis |
|---|---|---|
| 13 Technology | pass | qc.js prohibited-tech and remote-request checks; no libraries, fonts or CDNs |
| 14 Completeness | pass | qc.js required files, link and asset checks over 15 HTML pages |
| 15 Structure | partial / not testable | Landmarks and metadata pass in qc.js. **Match to the reference's hierarchy cannot be tested: the reference's hierarchy was never observed.** |
| 16 Interaction | pass (scripted) | flow script above; simulations labeled on page |
| 17 Accessibility | partial | axe-core at 1280px and 375px and horizontal-scroll check pass; **not tested:** screen readers, 200% zoom and text spacing, a full human keyboard walkthrough (keyboard behaviours were exercised by script only), manual contrast |
| 18 Traceability | pass (self-review) | docs written from the implemented files; evidence gap disclosed |
| 19 Scope | pass (self-review) | additions (menu, reservations) are labeled |

**No claim of WCAG conformance is made.** The target is a WCAG 2.2 AA-oriented baseline only.

## Known limitations
- Information architecture is inferred; see `fidelity-notes.md`.
- Lists on several pages are rendered by JavaScript and need it enabled (noscript notes shown).
- Gift cart count uses `sessionStorage`, which can be unavailable; the count then resets per page.
- Placeholder SVGs have short alt text only.
