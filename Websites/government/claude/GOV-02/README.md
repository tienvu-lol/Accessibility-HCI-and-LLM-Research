# GOV-02 — State of Aldermere portal (fictional replica)

| Field | Value |
| --- | --- |
| Replica ID | GOV-02 (category `government`, slot 2, model group `claude`) |
| Stratum | Public / Government: state government portal |
| Fictional branding | "State of Aldermere" / "Aldermere State Portal", with an original shield-and-pine emblem (`assets/emblem.svg`). All agencies, counties, events, numbers and copy are invented. |
| Approved source URL | https://www.ny.gov/ (research metadata only; no real branding, seal or prose is reused) |
| Source verification | 2026-11-10, HTTP GET via curl: home page returned 200 with title "The Official Website of New York State" (about 100 KB); all 14 source pages returned 200. Recorded in `Websites/pipelines/claude/research/GOV.md`. The inventory was HTTP-only: JS behavior was not observed. |
| Approval | Approved 2026-11-10. **The project lead waived the Phase A approval stop** and approved this reference in the orchestrator brief. |
| Model / run | `claude-sonnet-5-5` (version not recorded), see `generation-metadata.json` |

## Run locally

Open `index.html` in a browser (double-click works). Everything runs from `file://`: no server, build step, `fetch()` or network. Filters use data embedded in `js/main.js`.

## Sitemap and page-to-source mapping

| Local page | Reference page |
| --- | --- |
| `index.html` | ny.gov home |
| `services-and-benefits.html` | /services-and-benefits |
| `service-vehicle-registration.html` | /services/renew-vehicle-registration |
| `service-food-assistance.html` | /services/apply-snap (fictionalized as food support) |
| `service.html?id=…` | intentional addition: generic detail page for the other 22 directory entries |
| `agencies.html` | /state-agencies-and-departments |
| `counties.html` | /counties |
| `taxes.html` | /taxes |
| `start-business.html` | /start-business |
| `events.html` | /events |
| `government.html` | /government |
| `visit-and-explore.html` | /visit-and-explore |
| `elections-and-voting.html` | /elections-and-voting |
| `accessibility.html` | /accessibility, plus /privacy-policy merged in |
| `search.html` | /search (global search results) |
| `404.html` | required error page |

That is 15 mapped pages plus the 404 (16 HTML files). Not mapped: the Spanish home page (language selector is a demo). See `fidelity-notes.md`.

## Feature checklist

- [x] Header: trust-banner disclosure, wordmark/emblem, demo log-in, language selector (demo), search with clear button
- [x] Four-item mega-menu (Services & Benefits, Work & Business, Visit & Explore, Your Government) with mobile Menu disclosure and accordion submenus
- [x] Skip link, landmarks, `data-section` / `data-component` metadata on all pages
- [x] Home: alert banner (addition), Popular Topics chips, popular services, guide cards, Discover section
- [x] Services directory: keyword + topic filter, query-string preselection, result count, empty state, reset
- [x] Service detail pages (two full pages: "On this page" list, steps, table, FAQ, tabs on food support; one generic data-driven page)
- [x] Agencies directory: keyword + first-letter filter, empty state (addition)
- [x] Counties table with search (addition)
- [x] Events with type / month / keyword filters and agendas (the filters are the addition)
- [x] Elections: county board finder with validation (addition)
- [x] Accessibility page with simulated problem-report form: inline errors, error summary, focus management, demo success (addition)
- [x] Site search over services, agencies, events and pages
- [x] Dialogs close with Escape; menus and language panel close with Escape and outside click
- [x] Reduced-motion media query, responsive layout (no horizontal scroll at 375px per QC)

## Sample data counts

24 services (22 on the generic page, 2 with their own page), 16 agencies, 12 counties, 10 events (5 of them with agendas), 12 languages in the selector, 14 service topics.

## Interaction and simulation notes

- Log in, "Start online", the language selector and the problem-report form are **demos**. Each says so; nothing is sent, stored or authenticated.
- No cookies, storage or network. The filter state is written to the URL query string with `history.replaceState` when the browser allows it.
- Dates, fees, income limits and phone numbers (555-01xx) are invented. 988 is shown as plain text because it is a real national crisis line number.

## QC gates (RULES.md section 9)

Automated run: `node Websites/tools/qc/qc.js Websites/government/claude/GOV-02`, 2026-11-11 (UTC), **pages=16 files=29 failures=0 warnings=0**. The tool checks required files, JSON validity, broken links/assets, prohibited tech, remote requests, JS/console errors, landmarks/skip link/metadata and axe-core (WCAG 2.0–2.2 A/AA + best-practice) at 1280px and 375px, plus horizontal scroll at 375px.

| Gate | Result | Evidence |
| --- | --- | --- |
| 13 Technology | pass | qc.js: no prohibited files, no remote requests, no `fetch`/XHR warnings; plain HTML/CSS/JS |
| 14 Completeness | pass | qc.js: required files present, no broken links or asset paths |
| 15 Structure | pass (against the Phase A inventory only) | qc.js landmark/skip-link/metadata checks; hierarchy compared to the HTTP-only inventory, not the live pages |
| 16 Interaction | pass | Playwright script (scratch, not in the repo) on 2026-11-11: mega-menu click/Enter/Escape, mobile menu, search and empty state, filters and reset, tabs with arrow keys, dialog Escape/focus return, form error summary and success on both forms, language demo, alert dismiss, 404. 46 checks, all passed. |
| 17 Accessibility | partial | axe-core clean at 1280px and 375px; scripted keyboard flows above. No manual keyboard walkthrough of every page, no screen reader test |
| 18 Traceability | pass | README, fidelity notes, inventory and metadata were written from the files as built; the source mapping rests on the HTTP-only inventory |
| 19 Scope | pass | 15 pages plus 404; additions are labeled in `fidelity-notes.md` |

**Not tested:** screen readers (NVDA, JAWS, VoiceOver), 200% / 400% zoom and text-spacing overrides, manual keyboard walkthrough of every page, Firefox and Safari, real touch devices, forced-colors mode, printing, and visual comparison with the live reference. No WCAG conformance is claimed; this is a WCAG 2.2 AA-oriented baseline.

## Known limitations

- Lists (services, agencies, counties, events, search results) are rendered by JavaScript and are empty without it.
- Menus open on click only (no hover) and use Tab, not arrow keys, to move between links.
- The generic service page uses short invented steps, so it is much thinner than the two full service pages.
- The mega-menu grouping and open/close behavior are inferred from link order in the Phase A inventory.
- Privacy and disclaimer live on `accessibility.html` instead of separate pages.
