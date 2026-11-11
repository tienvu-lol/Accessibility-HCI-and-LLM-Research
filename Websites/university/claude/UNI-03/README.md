# UNI-03 - Harbor Valley Community College (fictional replica)

| Field | Value |
| --- | --- |
| Replica ID | UNI-03 (category `university`, slot 3, stratum: community college) |
| Model group | claude (`claude-sonnet-5-5`, orchestrated by `claude-opus-5-5`) |
| Fictional branding | **Harbor Valley Community College** ("HVCC", the Herons), Alder Falls. All names, people, phone numbers, addresses, dates, prices and statistics are invented. The emblem is an original SVG. |
| Approved source URL | https://www.nvcc.edu/ (Northern Virginia Community College; research metadata only) |
| Source verification | 2026-11-10, HTTP GET via curl during Phase A research (see `Websites/pipelines/claude/research/UNI.md`, block UNI-03): home page returned 200, title "Home \| Northern Virginia Community College"; the 13 other mapped pages also returned 200. No page was rendered in a browser. |
| Source approval | 2026-11-10. **The project lead waived the Phase A approval stop** and approved the UNI-03 reference directly. |

This is a reference-inspired replica of information architecture and interaction patterns. It is not pixel-faithful and makes no claim of exhaustive coverage or WCAG conformance.

## Run locally

Open `index.html` in a browser (works from `file://`). No server, build step or network access is needed. All data is inline in `js/main.js`. (The pages were assembled by a throwaway generator script kept outside the repository; the delivered files are plain static HTML/CSS/JS.)

## Sitemap and page-to-source mapping

| Local page | Reference page (nvcc.edu) |
| --- | --- |
| `index.html` | `/` Home |
| `programs.html` | `/academics/programs/` Find a Program (program finder) |
| `program-detail.html?id=...` | *Intentional addition* (program detail; reference detail pages not inspected) |
| `schedule.html` | `/academics/schedule/` Schedule of Classes |
| `calendar.html` | `/academics/calendar/` Academic Calendar |
| `admissions.html` | `/admissions/` Admissions & Aid |
| `apply.html` | `/admissions/apply/` Apply |
| `financial-aid.html` | `/admissions/financialaid/` Financial Aid |
| `tuition.html` | `/admissions/tuition/` Tuition & Costs |
| `visit.html` | `/admissions/visit/` Visit & Connect |
| `student-resources.html` | `/student-resources/` Student Resources |
| `student-life.html` | `/student-life/` Student Life |
| `locations.html` | `/about/locations/` Locations |
| `directory.html` | `/about/directory/` College Directory |
| `news.html` | `/about/news/` News |
| `search.html` | `/search` (site-search form action observed in header HTML) |
| `404.html` | *Required addition* |

17 HTML files (14 mapped reference pages + site search, program detail and 404), plus `css/styles.css`, `js/main.js`, 6 SVGs in `assets/`, and 4 documentation/metadata files (29 files total).

## Feature checklist

- Header: skip link, utility bar with Quick Links / Info For / Language disclosures, Apply and Request Info buttons, site search, six-item primary nav (five disclosure groups + News) with mobile "Menu" disclosure, breadcrumbs, local nav on admissions pages, grouped footer.
- Program finder (text, degree, interest filters, live count, empty state, clear), program detail by `?id=`.
- Schedule search (text, campus, format, open seats), academic calendar by term, news search/category filter, directory search (people/offices, validated), site search.
- Forms with labels, inline errors, error summary with focus management, demo success: practice application, visit/information request, portal sign-in dialog, tuition estimator.
- Accordions (`aria-expanded`), native `<dialog>`, Escape closes menus and the dialog, `prefers-reduced-motion`, responsive reflow.

Sample data counts: 14 programs, 10 class sections, 11 calendar dates, 8 news stories, 14 directory entries (8 people, 6 offices).

## Simulation notes (nothing is real)

- Application, visit request, portal sign-in: simulation only; labeled "demo" in the UI; no data is stored or sent.
- Language menu: demo only; selecting a language shows a message and does not translate.
- Tuition estimator: *intentional addition*, uses invented rates.
- "Request Info" opens the visit/information request form instead of an external portal. The reference's Give button, chat widget and Google Translate are omitted or simulated.

## QC gates (RULES.md section 9)

Automated run: `node Websites/tools/qc/qc.js Websites/university/claude/UNI-03` on 2026-11-11 (UTC), final run: **pages=17 files=29 failures=0 warnings=0** (required files, JSON validity, broken links/assets, prohibited tech, remote requests, JS errors, landmarks/skip link/metadata, axe-core WCAG 2.0-2.2 A/AA + best-practice at 1280px and 375px, horizontal scroll at 375px).
A separate scripted Playwright flow check (not part of the repo) exercised 42 assertions across the flows listed below; all passed.

| # | Gate | Result | Evidence |
| --- | --- | --- | --- |
| 13 | Technology | **pass** | qc.js: no prohibited file types/libraries, no remote requests, no network API use; vanilla HTML/CSS/JS only. |
| 14 | Completeness | **pass** | qc.js: required files present, no broken relative links/assets, JSON valid. All mapped pages exist. |
| 15 | Structure | **pass** (automated only) | qc.js: `<main id="main-content">`, skip link, `lang`, data-section/data-component on every page. Region order was matched to the reference HTML description, not to a rendered reference. |
| 16 | Interaction | **pass** (scripted) | Playwright flows: skip link; desktop dropdowns open/switch/Escape + focus return; mobile menu and nested group Escape order; portal dialog open/Escape/validation; program filters, empty state, reset, `?query=` prefill; program detail found/not found; visit form errors, summary focus, summary link focus, success state, start over; directory min-length error, results, empty-state focus; tuition validation and estimate; site search hit/empty; schedule open-seats filter; calendar term switch; news category filter; accordion. |
| 17 | Accessibility review | **partially tested** | Pass: axe-core (WCAG 2.0-2.2 A/AA + best-practice tags) with 0 violations at 1280px and 375px on all 17 pages; no horizontal scroll at 375px; scripted focus-management checks. **Not tested:** see below. |
| 18 | Traceability | **pass** | README, `fidelity-notes.md`, `component-inventory.json` and `generation-metadata.json` written against the final files; component pages generated from the HTML by script. |
| 19 | Scope | **pass** | 14 mapped reference pages plus three labeled additions; small sample datasets. |

### Not tested

- Screen readers (NVDA, JAWS, VoiceOver, TalkBack) - no announcement behavior verified.
- Full manual keyboard-only walkthrough of every page (only the scripted flows above were run).
- 200% / 400% zoom and text-spacing overrides; only 1280px and 375px viewports were checked.
- Color contrast was checked only by axe-core's automated rules, not by manual review; color-only-state avoidance was not audited manually.
- Forced-colors / high-contrast mode, `prefers-reduced-motion` behavior (rule present in CSS, not observed), touch target sizing audit, Firefox/Safari rendering (Chromium only).
- Comparison against a rendered copy of the live reference.
- No claim of WCAG conformance is made; passing axe-core is not an audit.

## Known limitations

- Menus contain only items that map to a local page or section; reference menu items without a local page (e.g. Honors Program, Study Abroad, Parking details pages) are omitted.
- Program finder, schedule and news results are filtered on local sample data; the reference loads programs from an API that was not fetched.
- Dates in the calendar are sample dates; the date shown in the browser clock is not used.
