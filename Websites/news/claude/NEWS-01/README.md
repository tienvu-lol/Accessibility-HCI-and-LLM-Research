# NEWS-01 — The Vellmoor Ledger (fictional)

**Replica ID:** NEWS-01 · **Category:** news (national daily newspaper) · **Model group:** claude, slot 1 · **Complexity:** high

> **Fictional publication.** Every article, byline and quote here is invented sample content for an accessibility research dataset. Nothing here is real news. No real person, organisation, place or event is depicted.

- **Fictional branding:** masthead "The Vellmoor Ledger"; fictional country Orravia, city Halbrook Cross, towns Pennyfold, Mossgate, Thistledown; imaginary countries Selvane, Karrowby, Dunmarra.
- **Approved source:** The Guardian US edition, https://www.theguardian.com/us (research metadata only). Verified 2026-11-10 by HTTP GET via curl (home 200; /us/video, /info/about-guardian, /us/lifestyle returned 404). Approved by the project lead 2026-11-13. I did not re-fetch it during this build.
- **Run locally:** open `index.html` in a browser (works from `file://`; no server, no build, no network). Data is inline in `js/main.js`.

## Where the fictional notice sits
1. Every page (all 15 including `404.html`): a yellow-ruled notice as the first element inside `<header>`, above the nav and masthead.
2. Article pages: a second, inline "Fictional article" notice directly above the `h1`, plus the byline marks the author as invented, a figure caption, and a closing note.
3. Every page footer repeats the notice. The `<title>` of every page includes "(fictional)".

## Sitemap and page-to-source mapping
index.html (home), orravia.html, abroad.html, business.html, technology.html, opinion.html, sport.html, culture.html, lifestyle.html, newsletters.html, podcasts.html, article.html (`?id=a01`..`a33`), search.html, support.html, 404.html. Mapping table in `fidelity-notes.md`. 15 HTML pages; 12 map to reference pages, 2 are labelled intentional additions (search, support), plus 404.

## Features
Skip link; primary nav with section sub-nav and All sections disclosure (aria-expanded, Escape closes); per-section Hide/Show; Latest / Most read tabs (roles, aria-selected, arrow/Home/End, focusable tabpanel); section live filter with polite status and empty state; site search (inline data, section filter, sort, empty state); article page rendered from `?id=` with an unknown-id error state; related stories; newsletter signup simulation with error summary and focus management; membership simulation; podcast Play (demo) toggles; 404.

## Sample data
33 invented articles, 8 invented authors, 8 sections, 5 newsletters, 4 podcast episodes. Article subjects: a library renovation, a tram request stop, a county fair pie tent, a pottery dig, a footbridge repaint, ferry timetable, lighthouse museum, tea festival, canal cycle path, bakery oven, market stall plan, clockmakers open afternoon, cup lending, large-print timetables, repair cafe, village hall network, parish map scans, stadium turf, youth coaching morning, regatta course, quoits league, four gentle columns, teapot exhibition, choir, novel review, puppet theatre, flatbread recipe, balcony herbs, sock mending, a lake weekend. No elections, health, medicine, emergencies, crime, war, immigration, finance or real groups.

## Simulation notes
Newsletter, membership and podcast controls are demonstrations: nothing is sent, stored or charged, and no audio exists. Phone numbers use 555. Example addresses use `example.test`. Imagery is abstract SVG.

## QC (Rules.md section 9)
Run: `node Websites/tools/qc/qc.js Websites/news/claude/NEWS-01` → `pages=15 files=29 failures=0 warnings=0` (final run, 2026-11-13).

| Gate | Result | Evidence |
| --- | --- | --- |
| Technology | pass | qc.js: no prohibited files, no remote requests, no fetch/XHR warnings; manual review: vanilla HTML/CSS/JS only |
| Completeness | pass | qc.js: required files present; relative links and assets resolve |
| Structure | pass (partial for fidelity) | landmarks and data-section/data-component present on all pages; structure derived from the approved research block, not a fresh crawl |
| Interaction | pass (scripted) | Playwright scripts: skip link, menu + Escape, Hide/Show, tab arrow/Home/End + panel focus, search + empty state, header search, section filter + empty state, newsletter errors/summary/focus/success, membership errors/success, article render + not-found, podcast demo, mobile menu |
| Accessibility | partial | qc.js axe (wcag2a/aa, 2.1, 2.2aa, best-practice) at 1280 and 375 on all 15 pages in the default state, plus no horizontal scroll at 375; scripted keyboard checks. Not tested: screen readers, axe in open-menu/error states, contrast in dark mode by tool, zoom to 400%, reduced-motion emulation, target size audit |
| Traceability | pass | docs and inventory generated from the delivered files; component-inventory pages verified to exist |
| Scope | pass | 15 pages, 33 articles |

Not tested: real assistive technology, browsers other than Chromium, forced-colors mode, print, text spacing overrides. This is a WCAG-oriented baseline; no conformance is claimed.

## Known limitations
Article pages other than a01 are rendered by JavaScript (a01 is static fallback). Carousels are plain grids. No author pages, comments or ads. The expanded menu is not closed on focus loss except by Escape or outside click.
