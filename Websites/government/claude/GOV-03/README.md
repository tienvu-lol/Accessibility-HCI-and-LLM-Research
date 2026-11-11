# GOV-03 - Verdant Environmental Agency (fictional)

- **Replica ID:** GOV-03 (category: government, slot 3, model group: claude)
- **Fictional branding:** "Verdant Environmental Agency" with an original leaf-and-wave emblem (`assets/emblem.svg`). No real seal, logo, trademark or copied prose is used.
- **Approved source (research metadata only):** U.S. Environmental Protection Agency, <https://www.epa.gov/> (stratum: federal agency).
- **Source verification:** 2026-11-10, HTTP GET via curl by the earlier research step (`Websites/pipelines/claude/research/GOV.md`). Home page returned 200, title "U.S. Environmental Protection Agency | US EPA". The 14 source pages listed there were recorded as 200. This build run did not re-fetch the site, and no JavaScript behavior of the reference was observed (HTTP-only research).
- **Approval:** the project lead waived the Phase A approval stop and approved this source on 2026-11-10.
- **Model/provenance:** see `generation-metadata.json`.

## Run locally

Open `index.html` directly in a browser (works from `file://`). No server, build step or network is needed. All data is inline in `js/main.js`.

## Sitemap and page-to-source mapping

| Local page | Reference page (epa.gov) |
| --- | --- |
| `index.html` | `/` home |
| `environmental-topics.html` | `/environmental-topics` |
| `water-topics.html` | `/environmental-topics/water-topics` |
| `drinking-water.html` | `/ground-water-and-drinking-water` |
| `radon.html` | `/radon` |
| `topic-index.html` | `/topics-epa-web` (A - Z Topic Index) |
| `laws-regulations.html` | `/laws-regulations` |
| `report-violation.html` | `/report-violation` |
| `about.html` | `/aboutepa` |
| `regional-offices.html` | `/aboutepa/regional-and-geographic-offices` |
| `newsroom.html` | `/newsroom` |
| `alerts.html` | `/alerts` |
| `contact.html` | `/home/forms/contact-epa` |
| `accessibility.html` | `/accessibility/epa-accessibility-statement` |
| `404.html` | none (required by protocol) |

14 mapped pages + `404.html` = 15 HTML files. Total delivered files: 27.

## Feature checklist

- Skip link, fictional-site notice banner with "how this works" disclosure (stands in for the reference's government banner), dismissible alert banner linking to the alerts page.
- Header search drawer; the form does a GET to `topic-index.html?q=` and the page filters its local A-Z data (demo search, not a live agency search).
- Primary navigation with three dropdown/mega-menu panels (Environmental Topics, Laws and Regulations, About the Agency) plus a direct Newsroom link; mobile "Menu" disclosure; `aria-expanded`, Escape, outside-click/focus-out closing.
- Home: hero, four featured cards, latest news list, Discover/Connect/Ask/Follow blocks, language block (labeled demo).
- Topic landing and detail pages with breadcrumbs and local side navigation.
- A-Z index: text filter, letter buttons (`aria-pressed`, disabled when no topics), empty state, live count.
- Newsroom: keyword, region, topic, sort, reset, empty state, live count, `?q=` prefill.
- Regional offices: searchable table that stacks at narrow widths.
- Report a violation and Contact: labeled fields, inline errors, error summary receiving focus, simulated success panel.
- Footer with grouped links and a back-to-top button; custom 404.

## Sample data counts

10 regional offices, 12 news releases, 38 A-Z topics, 3 sample alerts, 2 forms, 5 accordion items.

## Interaction simulation notes

- Forms never send data; success panels show a `DEMO-xxxxxx` number and state that nothing was sent.
- Language buttons only display a message; no translated pages exist.
- Alerts and news are invented sample text. They are not live information.
- News releases have no detail pages (the reference's news search endpoint was not observable). Home news titles link to the newsroom pre-filtered by title.
- Intentional additions (not observed on the reference): accordions on the drinking water and radon pages, the dismiss button on the alert banner.

## QC (RULES.md section 9)

Run: `node Websites/tools/qc/qc.js Websites/government/claude/GOV-03` on 2026-11-11.
Result line: `pages=15 files=27 failures=0 warnings=0`

| Gate | Result | Evidence |
| --- | --- | --- |
| 1. Technology | pass | qc.js: no prohibited file types, no remote requests, no JS errors. Vanilla HTML/CSS/JS only. |
| 2. Completeness | pass | qc.js: required files present, JSON valid, no broken links/assets; an extra script checked that every in-page and JS data link and anchor resolves. |
| 3. Structure | pass (own review) | Landmarks, skip link, `main#main-content`, data-section/data-component present on all pages (qc.js landmark/metadata checks). Comparison with the reference is limited to the HTTP-only research notes. |
| 4. Interaction | pass (scripted) | Playwright flows (Chromium): skip link, desktop dropdown open/close/Escape/outside click, mobile menu and submenu, header search to A-Z, A-Z letter/text filter and empty state, news filter/sort/reset/empty/`?q=`, office search and empty state, both forms (error summary focus, field-link focus, email and future-date errors, simulated success focus), language demo, banner, alert dismiss. 0 JS errors. |
| 5. Accessibility review | partial | qc.js axe-core (WCAG 2.0-2.2 A/AA + best-practice) at 1280px and 375px on all 15 pages with 0 failures, and no horizontal scroll. Keyboard behavior only through scripted Playwright. Not a conformance claim. |
| 6. Traceability | pass (own review) | This README, `fidelity-notes.md` and `component-inventory.json` were written from the delivered files; selectors counted with grep. |
| 7. Scope | pass (own review) | 14 pages, small datasets; no meetings calendar or service directory since the reference has none. |

### Not tested

Screen readers (NVDA, JAWS, VoiceOver, TalkBack); 200% / 400% zoom and text-spacing overrides; a full manual keyboard walkthrough of every page; Firefox and Safari; high-contrast / forced-colors mode; real mobile devices; print styles; comparison to the live reference beyond the HTTP-only research notes. Automated tools find only part of WCAG issues. This baseline is an implementation target, not a conformance claim.

## Known limitations

- Only HTTP-level research of the reference exists; its dropdown contents and interaction details are partly inferred (see `fidelity-notes.md`).
- Several topic cards and menu items point to anchor sections or pre-filtered searches because dedicated pages are out of scope.
- Dropdown menus use disclosure buttons (not the ARIA `menu` role). Focus leaving the nav closes open menus.
