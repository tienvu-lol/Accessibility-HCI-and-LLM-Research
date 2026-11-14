# UNI-02 - Linden Ridge College (fictional replica)

- **Replica ID:** UNI-02 (category `university`, slot 2, model group `claude`, stratum: small private liberal-arts college)
- **Fictional branding:** "Linden Ridge College", Alder Falls, Pennsylvania (fictional). All text, figures, names, phone numbers and e-mail addresses are invented. No real logo, seal or prose is used; the mark is an original SVG.
- **Approved source (research metadata only):** Swarthmore College, https://www.swarthmore.edu/ - verified 2026-11-10 by HTTP GET via curl (200 on all proposed pages, per `Websites/pipelines/claude/research/UNI.md`); approved by the project lead 2026-11-13 (`approval-2026-11-13.md`). The reference was not re-fetched during this build; every structural claim comes from the approved research block.
- **Protocols:** WEB-REPLICA-V1.0 / WEB-REPLICA-ALLOCATION-V1.0 (active allocation slots 01-06).

## Run locally
Open `index.html` in any browser (works from `file://`; no server, no build, no network). All data is inline in `js/main.js`.

## Sitemap and page-to-source mapping
| Local page | Reference page |
| --- | --- |
| `index.html` | `/` Swarthmore Home |
| `meet.html` | `/meet-swarthmore` |
| `academics.html` | `/academics` (Programs of Study plain list) |
| `biology.html` | `/biology` (department detail) |
| `design-your-own-major.html` | `/academics/design-your-own-major` |
| `academic-calendar.html` | `/academics/academic-calendar` |
| `admissions.html` | `/admissions-aid` |
| `apply.html` | `/admissions-aid/apply-to-swarthmore` |
| `affordability.html` | `/admissions-aid/affordability-access` |
| `financial-aid.html` | `/financial-aid` |
| `visit.html` | `/admissions-aid/campus-tours-and-virtual-visits` and `/visit-swarthmore` |
| `campus-life.html` | `/campus-life` |
| `news-events.html` | `/news-events` |
| `stories.html` | `/news-events/stories-swarthmore` |
| `directory.html` | `/directory` (React people search) |
| `search.html` | `/search` (target of the search flyout form, `keys` parameter; not in the verified page list) |
| `accessibility.html` | footer "Site Feedback and Accessibility" link (target not verified; intentional small addition) |
| `not-replicated.html` | Honest landing page for nav/footer links whose pages were not rebuilt (utility, added) |
| `404.html` | Required by Rules.md |

15 reference pages are mapped (14 verified pages, with the two visit URLs sharing one page, plus `/directory`); 19 HTML files in total.

## Feature checklist
- Header with utility bar (phone, A-Z Index, Calendar, Directory, Campus Map, Gift, Visit), brand row, search flyout, accessibility options panel with an animation on/off toggle, and a five-group dropdown mega-menu using ARIA `menubar`/`menu`/`menuitem` roles (keyboard: Enter/Space/Arrow keys open and move, Left/Right between groups, Home/End, Escape closes and returns focus, focus-out closes). Mobile (below 60em): a Menu button (`aria-expanded`) reveals the same nav as an accordion.
- Home page sections in the observed order: hero (with pause/play for the background animation), alumni voices and sustainability, featured weekend, "Watch" cards, net-zero feature, tuition-guarantee callout, link list, living and Valley City opportunities, news.
- Breadcrumbs and local navigation sidebars on interior pages; five-column footer.
- Working local features: site search (`search.html?keys=`), directory search with type filter and empty state, visit-request form with validation, error summary, inline errors, focus management and a demo success state.
- Sample data counts: 24 directory records, 20 site-search index entries, 33 department links, 16 calendar rows, 8 events, 6 news/stories, 8 tour dates.

## Interaction and simulation notes
- The tour form is **simulation only**: nothing is sent, no tour is booked, and the success panel says so. There is no application portal or login.
- Links to reference pages that were not rebuilt go to `not-replicated.html?page=<label>`, which says so plainly (72 distinct targets).
- The video hero is replaced by an animated SVG background (no video media). "Watch" cards link to text stories.
- Social links are non-linked fictional text (`news-events.html#social`).
- The animation toggle holds state only for the current page view (no storage).

## Intentional additions and deviations (also in fidelity-notes.md)
- No filterable program finder was added; departments are a plain list, as in the reference.
- Added: `accessibility.html`, `not-replicated.html`, `search.html` results page, "Design Your Own Major" as a link in the Academics menu, a text-only virtual tour and self-guided route on the visit page, a form on the visit page (reference sign-up is inferred to be an external form).
- The reference's sixth nav group is unconfirmed in the research; only five groups were built.
- The directory reference uses `role=combobox`; this replica uses a plain search input with live-region results.

## QC (Rules.md section 9)
Automated run: `node Websites/tools/qc/qc.js Websites/university/claude/UNI-02` on 2026-11-13, 19 pages, final result `failures=0` (see generation-metadata.json for the exact line).

| Gate | Result | Evidence |
| --- | --- | --- |
| 13 Technology | pass | qc.js prohibited-tech and remote-request checks; no frameworks, CDNs, fonts or fetch(). |
| 14 Completeness | pass | qc.js required files, link and asset checks. |
| 15 Structure | pass (automated landmark/metadata checks); fidelity to reference hierarchy not independently re-verified against a live render | qc.js; research-block comparison by the builder. |
| 16 Interaction | pass | Scripted Playwright flows (builder-run, not part of qc.js): mega-menu keyboard, search flyout, Escape handling, site search and empty state, directory filter and empty state, form errors/summary/focus/success, mobile menu. |
| 17 Accessibility | partial: axe-core A/AA/best-practice at 1280px and 375px passes, no horizontal scroll at 375px; other items not tested | see below |
| 18 Traceability | pass (builder review) | docs written after implementation from the actual files |
| 19 Scope | pass (builder review) | additions are labeled |

**Not tested:** screen readers (NVDA, JAWS, VoiceOver); 200% and 400% zoom / text-resize; a full manual keyboard walkthrough of every page (only the scripted flows above); touch devices; browsers other than headless Chromium; forced-colors mode; reduced-motion was implemented but not exercised under an OS setting; color contrast was checked only through axe. This is a WCAG-oriented baseline, not a conformance claim.

## Known limitations
- ARIA `menubar` for site navigation follows the reference's pattern; it is more complex than a disclosure navigation and has not been tested with assistive technology.
- Dates, costs and deadlines are invented sample values. Many reference pages are represented only by the `not-replicated.html` landing page.
- Without JavaScript the dropdown panels stay hidden (no-JS fallback was not built).
