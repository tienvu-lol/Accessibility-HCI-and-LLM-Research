# NPO-03 - Hollowbrook Animal Alliance (fictional)

- **Replica ID:** NPO-03 (slot 3, model group `claude`)
- **Category / stratum:** Nonprofit & Charity / cause-focused charity (animal welfare)
- **Fictional branding:** "Hollowbrook Animal Alliance - Kindness, rescue and a voice for animals". Logo, people, places, figures and animals are invented. Nothing here is the real reference organization's content.
- **Approved source URL:** https://www.aspca.org/ (research metadata only)
- **Source verification:** 2026-11-11T03:46Z, HTTP GET via curl by the Phase A research (`Websites/pipelines/claude/research/NPO.md`): homepage 200, title "ASPCA | American Society for the Prevention of Cruelty to Animals"; the 14 mapped source pages returned 200. Verification was not repeated during this run, and the page markup was not re-inspected.
- **Approval:** the project lead approved the source on 2026-11-10 and **waived the Phase A approval stop** for this run.
- **Generation:** `claude-sonnet-5-5`, autonomous run, no human edits. See `generation-metadata.json`.

## Run locally

Open `index.html` in a browser (file:// works; no server, no build, no network). All data is inline in `js/main.js`.

## Sitemap and page-to-source mapping

| Local page | Reference page (aspca.org path) | Notes |
| --- | --- | --- |
| `index.html` | `/` | Seasonal banner, hero + 3 CTAs, "You can make a difference", The Latest, pets of the week, appeal, email signup, "Connect with us" |
| `about.html` | `/about-us` | Mission, history, leadership; impact stats (intentional addition); terms/privacy/accessibility sections hold the footer legal anchors |
| `helping-shelters.html` | `/helping-shelters-people-pets`, `/grants-and-scholarships` | Grants merged in as `#grants` |
| `investigations-rescue.html` | `/investigations-rescue` | Program template |
| `animal-care-recovery.html` | `/animal-care-recovery` | Program template |
| `improving-laws.html` | `/improving-laws-animals` | Program template |
| `adopt.html` | `/adopt-pet` | Filterable sample pet search (search behavior inferred, not observed) |
| `pet-care.html` | `/pet-care` | Tabs Dog / Cat / Horse / Poison safety (from the page title) |
| `get-involved.html` | `/get-involved` | Ways-to-help cards + location quick find |
| `advocacy.html` | `/get-involved/advocacy-center` | Campaign list + action form (inferred) |
| `ways-to-give.html` | `/ways-to-give` | Giving options |
| `donate.html` | `secure.aspca.org/donate/...` | Amount radios, frequency, simulated only |
| `news.html` | `/news` | Search + topic filter + show more |
| `local-initiative.html` | `/nyc` (+ other local-initiative pages) | One data-driven template, 5 fictional hubs via `?city=` |
| `search.html` | site search (header form) | Search over inline pages, news and pets |
| `404.html` | none | Required by RULES.md |

15 reference-mapped pages + `404.html` = 16 HTML files. 30 files in total (16 HTML, 1 CSS, 1 JS, 8 SVG, 4 documentation/metadata files).

## Feature checklist

- Header with utility bar, brand, Donate button, three dropdown menus (Our work, Locations, Get involved), plain links, search; mobile "Menu" disclosure.
- Skip link, breadcrumbs, `aria-current`, footer with grouped links, legal links and a cookie-preferences dialog (demo).
- Donate flow (frequency + amount + other amount + details, dedication disclosure), advocacy form, email signup: client-side validation, error summary, inline errors, focus management, demo success.
- Adoption search, news filter with show more, poison-safety lookup, campaign filter, location pages, site search; each has an empty state.
- `prefers-reduced-motion` stylesheet rule; layout reflows at 375px.

## Simulation notes

- **Donations:** nothing is charged, no card fields exist, and the success panel says so. Impact examples ("could feed a shelter dog...") are invented sample text.
- **Advocacy/email/adoption:** no message or address is sent or stored.
- **Cookie dialog:** illustrative only; the site sets no cookies.
- **Sample data counts:** 12 animals, 10 news stories, 5 locations, 10 poison entries, 5 campaigns, 5 preset gift amounts.

## QC gates (RULES.md section 9)

QC run: `node Websites/tools/qc/qc.js Websites/nonprofit/claude/NPO-03` on 2026-11-11, final result `pages=16 files=30 failures=0 warnings=0` (see below for the exact line). The tool checks required files, JSON validity, broken links/assets, prohibited tech, remote requests, JS/console errors, landmarks/skip link/metadata, axe-core (WCAG 2.0-2.2 A/AA + best-practice) at 1280px and 375px, and horizontal scroll.

| Gate | Result | Evidence |
| --- | --- | --- |
| 13 Technology | pass | qc.js: no prohibited file types/libraries, no remote requests; no fetch(), no build step |
| 14 Completeness | pass | qc.js: required files present, no broken links/assets; all 16 pages present |
| 15 Structure | pass (limited) | qc.js landmark/skip-link/metadata checks; structure compared with the reference only through the Phase A notes (nav dropdown markup was never inspected) |
| 16 Interaction | pass | A scripted Playwright run (not shipped; scratch script, 47 assertions, 0 failures) covered: donate validation/other amount/success/reset, menus (open, switch, Escape, focus return), skip link first Tab, cookie and pet dialogs, adopt filters/sort/empty/reset, news filter/show more/empty, tabs arrow keys, hazard search, location query, search, advocacy, email signup errors, mobile menu |
| 17 Accessibility | partial | qc.js axe-core clean at 1280px and 375px; no horizontal scroll at 375px; keyboard behaviors above exercised by script. Not tested: see below |
| 18 Traceability | pass | Component inventory generated from the actual `data-component` attributes in the HTML |
| 19 Scope | pass | 15 pages; volunteer signup and events omitted because the reference does not show them |

**Not tested:** screen readers (NVDA/JAWS/VoiceOver), 200%/400% zoom and text-spacing overrides, a human keyboard walkthrough of every page, real contrast audit beyond axe, Windows high-contrast, touch devices, browsers other than Chromium, validation of the HTML against the W3C validator. This README makes no WCAG conformance claim.

## Known limitations

- Reference nav grouping, footer groups and form field labels were not observed; they are approximated.
- Pages are static duplicates of one header/footer; they were authored consistently by a throwaway script that is not part of the deliverable.
- Location pages need JavaScript (a `noscript` note is shown). Menus need JavaScript.
- No article-detail pages; news cards expand a sample summary.
