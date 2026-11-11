# UNI-02 — Alderbrook College (fictional replica)

| Field | Value |
| --- | --- |
| Replica ID | UNI-02 (slot 2) |
| Category / stratum | University — small private liberal-arts college |
| Model group / model | claude / `claude-sonnet-5-5` (see `generation-metadata.json`) |
| Fictional branding | "Alderbrook College", Quillfield, Pennsylvania; all people, dates, figures and course titles are invented. No real logo, seal, trademark, photo or copied prose is used. |
| Approved source (research metadata only) | Swarthmore College — <https://www.swarthmore.edu/> |
| Source verification | 2026-11-10 by `curl -sSL` GET during Phase A research (`Websites/pipelines/claude/research/UNI.md`). The home page returned HTTP 200 with title "Swarthmore Home :: Swarthmore College"; all 14 listed source pages also returned 200. Observations come from that HTML fetch only; **the reference pages were not rendered in a browser**. |
| Approval | Phase A stop waived by the project lead, who approved this source on 2026-11-10 (`source_approved_at` in `generation-metadata.json`). |

## Run locally

Open `index.html` directly in a browser (works from `file://`). No server, build step, network access or package install is needed. All data is embedded in `js/main.js` (`SITE_DATA`). Query-string deep links (`department.html?dept=biology`, `directory.html?q=Whitaker`, `search.html?keys=aid`) also work from `file://`.

Authoring note: the HTML pages and `js/main.js` data block were emitted once by a throwaway generator script (not included in this folder) to keep the duplicated header/footer consistent. The delivered files are plain static files that can be edited by hand.

## Sitemap and page-to-source mapping

| Local page | Reference page(s) it mirrors |
| --- | --- |
| `index.html` | `/` Home (hero, alumni feature, weekend feature, "Watch" cards, sustainability, tuition guarantee, link list, living, city opportunities, news) |
| `meet.html` | `/meet-swarthmore` (plus the "Meet" dropdown topics as anchors) |
| `academics.html` | `/academics` (Programs of Study list, here with added filters) |
| `department.html?dept=…` | `/biology` department template (one template, 19 sample departments) |
| `design-your-own-major.html` | `/academics/design-your-own-major` |
| `academic-calendar.html` | `/academics/academic-calendar` |
| `admissions.html` | `/admissions-aid` |
| `apply.html` | `/admissions-aid/apply-to-swarthmore` |
| `affordability.html` | `/admissions-aid/affordability-access` and `/financial-aid` (merged) |
| `visit.html` | `/admissions-aid/campus-tours-and-virtual-visits` and `/visit-swarthmore` (merged) |
| `campus-life.html` | `/campus-life` |
| `news-events.html` | `/news-events` |
| `stories.html` | `/news-events/stories-swarthmore` |
| `directory.html` | `/directory` (JS people search) |
| `search.html` | `/search?keys=` (site search target) |
| `404.html` | none (required by the protocol) |

15 content pages mapped from 16 reference URLs (two pairs merged), plus `404.html`. Details are in `fidelity-notes.md`.

## Feature checklist

- Utility bar (phone, calendar, directory, campus map, visit) with search flyout and accessibility-options panel (animation off) — replicated.
- Five-group primary navigation with dropdown/mega-menu panels (click, hover on desktop, keyboard, Escape) and a mobile Menu disclosure — replicated/approximated.
- Home hero with pause/play for the animated backdrop — approximated (CSS animation instead of video).
- Programs-of-study list with search + division + offered-as filters, live count, empty state, reset — filters are an **intentional addition**.
- Department detail template, academic calendar with filters, news filter, directory search, site search — see simulation notes.
- Visit-request form, applicant portal sign-in and net price estimator — **simulations**, clearly labeled; inline errors, error summary, focus management, demo success.
- Virtual tour as a native modal dialog (text only).
- Footer with contact, grouped links and legal/demo notice; `404.html` with routes back.

## Sample data counts

19 programs/departments, 16 people, 8 news items, 16 calendar dates (5 are "Campus event" and appear on the news page), 13 search-indexed pages (programs and news are indexed too).

## Simulation notes

- Applicant portal sign-in, visit request and net price estimator never send or store data. Success messages say so. The estimator uses an invented formula against an invented cost of attendance.
- The only persisted value is the animation preference in `localStorage` (safe-fails if storage is unavailable).
- The reference's external systems (course catalog, careers site, application portal, giving) are not reproduced; social links and "Make A Gift" are omitted rather than faked.

## QC gates (RULES.md section 9)

Evidence: `node Websites/tools/qc/qc.js Websites/university/claude/UNI-02` run on 2026-11-11 (UTC) → `pages=16 files=29 failures=0 warnings=0`. Output was written outside the repo. A scripted Playwright flow check (48 assertions, 0 failures, 0 JS errors) was also run.

| Gate | Result | Basis |
| --- | --- | --- |
| 13 Technology | **pass** | qc.js: no prohibited file types/libraries, no remote requests, no build files. |
| 14 Completeness | **pass** | qc.js: required files present, JSON valid, no broken links/assets across all pages. |
| 15 Structure | **pass (partial evidence)** | qc.js checks landmarks, skip link, metadata attributes. Region order was compared with the reference HTML summary only, not a rendered page. |
| 16 Interaction | **pass** | Scripted flows: nav dropdown/Escape, mobile menu, search flyout + empty state, program finder filters/empty state, department found/not-found, visit form errors/summary/focus/success, dialog Escape + focus return, portal and estimator, calendar/news/directory filters. |
| 17 Accessibility review | **pass for automated checks; manual items not tested** | axe-core (WCAG 2.0–2.2 A/AA + best-practice) at 1280 px and 375 px: 0 violations; no horizontal scroll at 375 px. Not claimed: WCAG conformance. |
| 18 Traceability | **pass (self-checked)** | Docs generated/checked against the delivered files; component-inventory pages come from the actual HTML. |
| 19 Scope | **pass (self-assessed)** | 15 pages, small sample datasets; additions are labeled. |

**Not tested:** screen readers (NVDA, JAWS, VoiceOver, TalkBack); a human keyboard-only walkthrough of every page; 200% / 400% zoom and text-spacing overrides; Windows high-contrast/forced-colors mode; browsers other than headless Chromium; touch devices; reduced-motion behavior beyond reading the CSS/JS; color-contrast of states axe cannot compute (hover, disabled); visual comparison against the live reference.

## Known limitations

- The reference's ambient video is replaced by a CSS animation; no video or real imagery.
- Dropdown links point only to topics that exist locally (as pages or anchors); the reference's many other menu items (Course Catalog, Libraries, Registrar, Tri-College Consortium, etc.) are omitted.
- The sixth navigation group mentioned in the research notes could not be confirmed and was not built.
- Dates are static sample data; "today" is only used to validate the tour-request date.
- Hover opens menus only on hover-capable desktop widths; mouse click on a hover-opened menu keeps it open (Escape or moving away closes).
