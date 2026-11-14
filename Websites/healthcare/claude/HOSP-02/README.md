# HOSP-02 - Harborview Community Hospital (fictional replica)

- **Replica ID:** HOSP-02 (slot 2) | **Category:** healthcare / community-regional hospital (nonprofit health system) | **Model group:** claude
- **Fictional branding:** "Harborview Community Hospital / Harborview Health Network". All names, cities, addresses, doctors and plans are invented; phone numbers use the 555 exchange.
- **Approved source:** Hoag Hospital (Hoag Health Network), https://www.hoag.org/ - verified 2026-11-10 by HTTP GET via curl (home page 200); approved by the project lead 2026-11-13 (`Websites/pipelines/claude/research/approval-2026-11-13.md`). Research metadata only; no logos, prose or media were copied.
- **Run locally:** open `index.html` in a browser (works from `file://`; no server, no build, no network). All data is inline in `js/main.js`.

## Sitemap and page-to-source mapping (14 pages + 404)
| Local page | Reference page |
|---|---|
| index.html | `/` |
| find-care.html | `/find-care/` (also the only doctor search; no directory/profile pages) |
| locations.html | `/locations` |
| hospital-bayfront.html | `/locations/hoag-hospital-newport-beach` |
| patients-visitors.html | `/patients-visitors/` |
| insurance-accepted.html | `/patients-visitors/insurance-accepted` |
| infection-prevention.html | `/patients-visitors/infection-prevention/` |
| billing-help.html | `/billing-information/help-paying-your-bill/` |
| cancer-institute.html | `/institute/cancer/` |
| heart-vascular-institute.html | `/institute/heart-vascular/` |
| specialties-services.html | `/specialties-services/` |
| classes-events.html | `/resources/classes-events/` |
| about.html | `/about-hoag/` |
| contact-us.html | `/contact-us/` (+ intentional addition: simulated appointment request form) |
| 404.html | not a reference page |

Files: 15 HTML, `css/styles.css`, `js/main.js`, 7 SVG assets, README.md, fidelity-notes.md, component-inventory.json, generation-metadata.json (28 files).

## Sample data
11 services, 12 locations, 24 providers, 14 classes/events, 20 insurance plans, 3 testimonials (all invented).

## Feature checklist
Skip link; emergency notice (calls to local emergency services, no medical instructions); utility nav; primary nav with dropdown disclosures and mobile menu; hero find-care widget (specialty/physician radio + term + location); quick-link tiles; testimonial carousel (manual controls); find-care search with filters, sort, empty state; locations filter; programs search; classes/events filters; insurance search; accordions; breadcrumbs; patient-portal sign-in as a labeled non-functional demo dialog; simulated appointment form with error summary and focus management; 404.

## Simulation notes
Portal dialog never signs in or stores anything. Appointment form is an **intentional addition** (the reference's checked pages show none) and sends nothing. Pay Your Bill opens the portal demo. Articles on the home page are static cards without links (the reference article pages were not rebuilt).

## QC (Rules.md section 9)
Run: `node Websites/tools/qc/qc.js Websites/healthcare/claude/HOSP-02` on 2026-11-13, pages=15, final result recorded below (failures=0). Plus a scripted Playwright (Chromium) flow check of: dropdown open/Escape/focus return, portal dialog open/validate/Escape/focus return, carousel, home-to-find-care query hand-off, find-care specialty and physician search plus empty state, locations/events/insurance/services filters, accordion, appointment error summary + focus + field-link focus + demo success, 375px mobile menu and submenu with Escape, no horizontal scroll, no console errors (all passed).

| Gate | Result |
|---|---|
| Technology | pass (qc.js: no prohibited tech or remote requests) |
| Completeness | pass (qc.js: required files, links, assets) |
| Structure | pass (landmarks, skip link, metadata checked by qc.js) |
| Interaction | pass for the scripted flows above; partial overall (not every control exhaustively exercised) |
| Accessibility | **partial** - axe-core automated rules at 1280px and 375px only, plus scripted checks of focus handling |
| Traceability | partial - authored alongside the build; reviewed by the builder only |
| Scope | pass, judged by the builder |

**Not tested:** screen readers, 200%/400% zoom, manual keyboard walkthrough by a person, forced-colors/high-contrast, non-Chromium browsers, real touch devices, color-contrast beyond axe. No WCAG conformance is claimed; this is a WCAG 2.2 AA-oriented baseline.

## Known limitations
Reference nav targets without a local page are not linked (see fidelity-notes.md). Nav dropdowns open on click/Enter only, not hover (reference behavior inferred). Dates in sample events are static. `history.replaceState` for search state may be ignored under `file://`.
