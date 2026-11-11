# NPO-02: Larkfield Region Food Bank (fictional)

| Field | Value |
| --- | --- |
| Replica ID | NPO-02 (nonprofit, slot 2, model group `claude`) |
| Stratum | Local community nonprofit (regional food bank) |
| Fictional brand | **Larkfield Region Food Bank**, serving the invented "Tri-River region". All names, figures, addresses, phone numbers (555-01xx), events and stories are invented. |
| Approved source | Capital Area Food Bank, <https://www.capitalareafoodbank.org/> (research metadata only) |
| Source verification | Phase A inventory (`Websites/pipelines/claude/research/NPO.md`): HTTP GET via curl on 2026-11-11T03:46Z, homepage 200, title "Food Bank for the Washington, DC, Region \| Capital Area Food Bank". This build did not re-fetch the site. The `/donate/` flow (403) and the volunteer subdomain (generic title) were not observed. |
| Approval | Source approved 2026-11-10. **The project lead waived the Phase A approval stop** and approved this reference directly in the build brief. |
| Generated | Model `claude-sonnet-5-5` (version not recorded), 2026-11-11, autonomous run; see `generation-metadata.json`. |

## Run locally

Open `index.html` in any modern browser (works from `file://`; no server, build step or network needed). All data is inline in `js/main.js` or the HTML. The site search uses a native `<dialog>`, so a browser from 2022 or later is expected.

## Sitemap (16 HTML files: 15 content pages + 404)

| Page | Purpose |
| --- | --- |
| `index.html` | Home: hero, hunger band, partner cards, story cards, programs, CTA row, sign-up prompt, events |
| `hunger.html` | Hunger in Our Region: stats, sortable county table, causes |
| `what-we-do.html` | Programs overview with anchored sections (partnerships, advocacy, nutrition, gardens) |
| `distribution.html` | Direct Food Distribution (accordion of five programs) |
| `impact.html` | Impact stats with fiscal-year selector, food sources, meal-count disclosure |
| `how-to-help.html` | Ways to give; anchors for fundraising, corporate, workplace giving |
| `donate-food.html` | Food guidance, filterable drop-off sites, food drive steps |
| `donate.html` | **Simulated** donation form (amount, frequency) |
| `volunteer.html` | **Simulated** shift sign-up |
| `events.html` | Filterable events (type, month, text) |
| `blog.html` | Filterable stories and news with inline "Read more" |
| `partners.html` | Filterable partner agencies |
| `get-help.html` | Food assistance finder (ZIP, day, type) over inline sample data |
| `contact.html` | Contact form (demo) |
| `sign-up.html` | Email sign-up form (demo) |
| `404.html` | Not-found page with routes back |

Other files: `css/styles.css`, `js/main.js`, `assets/*.svg` (6: logo, hero, 4 story illustrations), `README.md`, `fidelity-notes.md`, `component-inventory.json` (47 components), `generation-metadata.json`. Total 28 files.

## Page-to-source mapping

See `fidelity-notes.md` for the full table. Summary: 14 reference pages from the inventory plus the two external flows (donate, volunteer) map to 15 local pages (`/how-to-help/` and `/how-to-help/ways-to-give/` are merged).

## Feature checklist

- [x] Mission/programs: What We Do, Distribution, Impact
- [x] Donate flow with amount selector and frequency (simulation only, no payment fields)
- [x] Volunteer signup form (simulation only)
- [x] Events with filters
- [x] Impact stats (fiscal-year selector)
- [x] News/stories (blog)
- [x] Location search (food assistance finder)
- [x] Primary navigation with two dropdowns and a mobile disclosure; modal site search
- [x] Skip link, one `h1` per page, landmarks, `data-section` / `data-component` instrumentation
- [x] Client-side validation with inline errors, error summary and focus management on 5 forms (donate, volunteer, contact, sign-up, finder ZIP)

Intentional additions (not observed on the reference): breadcrumbs, filters on events/blog/partners/drop-offs, sortable county table, fiscal-year selector, in-site donate and volunteer simulations, modal site search (the reference has a header search form), original footer.

## Interaction and simulation notes

- Every form is demo only. Success panels say so, and nothing is stored, sent or charged. The donate page asks for no card data.
- "Meals per dollar" (3) and all figures are illustrative.
- The finder sorts by ZIP number proximity, not real distance; the page says so.
- Sample data sizes: 14 finder locations, 7 events, 7 blog posts, 8 partners, 6 drop-off sites, 6 volunteer shifts, 6 counties, 3 fiscal years, 15 search-index entries.
- Navigation dropdowns open on click/keyboard only (no hover). Escape closes the open submenu (then the mobile menu) and returns focus to its button; Escape in the search dialog closes it in one press.

## QC (RULES.md section 9)

Run: `node Websites/tools/qc/qc.js Websites/nonprofit/claude/NPO-02` on 2026-11-11 (see result below), covering 16 pages at 1280px and 375px. Playwright with headless Chromium. Output was written outside the repo.

Final qc.js summary line (2026-11-11): `pages=16 files=28 failures=0 warnings=0`.

| Gate | Result | Evidence |
| --- | --- | --- |
| 13 Technology | pass | qc.js: no prohibited file types or libraries, no remote requests at runtime, no `href="#"`; `fetch`/XHR warnings: 0. No build step. |
| 14 Completeness | pass | qc.js: all required files present, JSON valid, no broken relative links or assets. |
| 15 Structure | pass (automated) / not tested (fidelity to the live reference) | qc.js: landmarks, `main#main-content`, skip link, `lang`, `data-section`/`data-component` on all pages. Section order follows the inventory only; the live site was not re-inspected. |
| 16 Interaction | pass | Scripted Playwright flows (37 checks, all passed, 2026-11-11): skip link first, dropdown open/Escape, mobile menu and Escape, search dialog open/empty/Escape, donate errors/range/email/summary/success/reset, volunteer errors + summary link + success, finder ZIP error/proximity/empty/reset, events/blog/drop-off/partner filters and empty states, hash-opened story, sortable table, fiscal-year switch, contact topic prefill, accordion, 404. No JS errors. |
| 17 Accessibility | partial: axe pass, rest not tested | axe-core (WCAG 2.0-2.2 A/AA and best-practice tags) reported 0 violations on all 16 pages at 1280px and 375px; no horizontal scroll at 375px. Not tested: see below. |
| 18 Traceability | pass | README, fidelity notes and `component-inventory.json` (generated from the actual `data-component` attributes) match the files. |
| 19 Scope | pass (self-assessed) | 15 pages, modest sample data, no libraries. |

### Not tested

- Screen readers (NVDA, JAWS, VoiceOver, TalkBack): none used.
- A full manual keyboard walkthrough of every page: keyboard behavior was exercised only through the scripted flows above (Tab, Escape, clicks on controls).
- 200% / 400% zoom and text-spacing overrides, high-contrast mode, forced colors, `prefers-reduced-motion` behavior (CSS rule present, not exercised).
- Focus-indicator visibility and contrast judged only by axe and code review, not visually on every control.
- Cross-browser (only Chromium), real touch devices, print.
- WCAG conformance: **not claimed.** axe cannot detect many WCAG 2.2 criteria.

## Known limitations

- Reference details beyond the Phase A inventory (footer, forms, sub-pages) were not observed; those parts are original designs.
- No article pages or event detail pages: stories expand inline.
- Finder cards are rendered by JavaScript; with scripting disabled the finder, filters, dropdowns and search do nothing.
- Placeholder SVG art only; no real photography.
