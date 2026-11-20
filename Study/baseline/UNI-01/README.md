# UNI-01 - Cedar Lake State University (fictional replica)

- **Replica ID:** UNI-01 (category `university`, slot 1, model group `claude`)
- **Stratum:** large public research university
- **Fictional branding:** "Cedar Lake State University" (CLSU), mascot "Herons", invented logo (`assets/logo.svg`), invented people, numbers, events, news and policies. `example` addresses only.
- **Approved source URL:** https://www.wisc.edu/ (University of Wisconsin-Madison; used only as structural reference, nothing copied)
- **Source verification:** 2026-11-10, HTTP GET via curl (home page and 11 interior pages returned 200; recorded in `Websites/pipelines/claude/research/UNI.md`). Approved by the project lead 2026-11-13. This build did not re-fetch the reference; the structure follows the recorded research block. The reference was not rendered, so dropdown or JS behaviour beyond its HTML is unverified.

## Run locally
Open `index.html` in a browser (works from `file://`; no server, no build, no network). Data is inline in `js/main.js`.

## Sitemap (17 HTML files)
| Local page | Purpose |
| --- | --- |
| `index.html` | Home: hero with Visit/Apply, Key next steps, Why choose, Trending, Discoveries, Public service, The Heron Way, One Heron, College town, bottom search |
| `academics.html` | Colleges and schools, learning support |
| `majors.html` | Majors and certificates; searchable/filterable list of 37 programs with details dialog |
| `admissions.html` | Affording college, promise programs, sample tuition table, professional schools |
| `apply.html` | Application steps and a simulation-only application start form |
| `visit.html` | Visit options, map placeholder, demo visit request form |
| `directories.html` | People/office search over 30 fictional records |
| `research.html`, `student-life.html`, `athletics.html`, `about.html`, `facts.html` | Section pages |
| `news.html`, `events.html` | Local stand-ins for the separate news and events subdomains (12 stories, 14 events) |
| `services.html` | Local stand-in for utility-menu tools, audience links and policy links (all non-functional) |
| `search.html` | Local stand-in for the reference `/search/` (searches pages, programs, people, news, events) |
| `404.html` | Not-found page with routes back |

## Page-to-source mapping
index <- /; academics <- /academics/; majors <- /academics/majors/; admissions <- /admissions/; apply <- /admissions/apply/; visit <- /visit/; directories <- /directories/; research <- /research/; student-life <- /student-life/; athletics <- /athletics/; about <- /about/; facts <- /about/facts/; news <- news subdomain (reference only); events <- events subdomain (reference only); search <- /search/ (form action); services <- targets of the utility/footer links (external tools in the reference). Details in `fidelity-notes.md`.

## Feature checklist
- Skip link, landmarks, one `h1` per page, breadcrumbs on interior pages, `aria-current` on active nav
- Flat 6-item primary nav (as observed) plus 14-item utility nav; mobile "Menu" disclosure with `aria-expanded`, Escape closes and returns focus
- Header search (GET) to `search.html` with grouped results and empty state
- Program list with search, select, checkboxes, sort, reset, live result count, empty state, native `<dialog>` details (Escape closes, focus returns)
- Directory search with validation (min 2 chars), error summary, empty state
- Apply and Visit forms: labels, hints, inline errors, error summary with focus, demo success state
- News and events filters with empty states
- `data-section` / `data-component` instrumentation; `component-inventory.json` (42 components)
- `prefers-reduced-motion` CSS; no animation is otherwise used

## Simulation notes
All forms and "portals" are simulations. Apply, Visit, MyCLSU, email, courses, giving etc. send or connect to nothing and are labeled as demonstrations. Events, news and people are invented. Tuition numbers are invented.

## Sample data counts
37 programs, 30 people, 12 news stories, 14 events, 16 search-indexed pages.

## Intentional additions (not observed on the reference)
Searchable program finder (reference majors page is a link list), visit request form, local news/events/tuition stand-ins, sample tuition table, details dialog, accordions on academics/research. See `fidelity-notes.md`.

## QC (Rules.md section 9)
Automated run: `node Websites/tools/qc/qc.js Websites/university/claude/UNI-01` on 2026-11-13, 17 pages, 31 files: **`pages=17 files=31 failures=0 warnings=0`** (required files, JSON validity, link/asset audit, prohibited tech, remote requests, console errors, landmarks/skip link/metadata, axe-core WCAG 2.0-2.2 A/AA + best-practice at 1280px and 375px, horizontal scroll at 375px). Output was kept outside the repository.

| Gate | Result | Evidence |
| --- | --- | --- |
| 13 Technology | pass | qc.js prohibited-file, remote-request and network-API checks; no frameworks, CDNs, web fonts or fetch |
| 14 Completeness | pass | qc.js required files and link/asset audit |
| 15 Structure | pass (partial) | landmarks and instrumentation checked by qc.js; match with reference regions is by comparison to the written research block only, not a rendered side-by-side |
| 16 Interaction | pass | scripted Playwright flows (headless Chromium): mobile menu open/Escape, majors search/filter/empty/dialog, directory validation/empty state, apply and visit validation and demo success, search results/empty, events and news filters, skip link first focus |
| 17 Accessibility review | partial | axe-core clean on all pages at 1280 and 375 and also in error-summary, empty, dialog, success and open-menu states; reflow at 375 has no horizontal scroll. Not a conformance claim |
| 18 Traceability | pass | docs written from the implemented files; inventory generated from the HTML |
| 19 Scope | pass | additions are labeled |

**Not tested:** screen readers (NVDA, JAWS, VoiceOver); 200% and 400% zoom or text-spacing overrides; manual keyboard-only walkthrough by a person (keyboard behaviour was only scripted for Tab/Escape/Enter paths); real mobile devices; Safari and Firefox; forced-colors mode visually; touch target sizes beyond axe rules; cognitive/usability testing; print. Several WCAG 2.2 criteria need manual review (e.g. consistent help, redundant entry, focus not obscured). This is a WCAG-oriented baseline, not proof of conformance.

## Known limitations
- Reference look-ahead search suggestions, cookie-consent banner and site-alert script are omitted.
- No real article pages, map, imagery or application portal.
- Past/future dates in the sample events are fixed (Dec 2026 - Apr 2027).
- The visit-date minimum is "tomorrow" in the visitor's browser clock.
