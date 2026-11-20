# FASH-02 - Linden Vael (invented house)

- Replica ID: FASH-02 (slot 2, model group `claude`), category `fashion`, stratum: fashion brand editorial / lookbook site. Complexity: medium.
- Fictional branding: **Linden Vael**, an invented house with an invented founder, town (Fennimere), mill (Tarn Hollow Mill), stockists and journal. Nothing here is real, and the house, its history, collections and stockists are fictional. A visible fictional-house note sits in the masthead (inside `<header>`) of every page including `404.html`.
- Approved reference (research metadata only): https://www.margarethowell.co.uk/ . Verified 2026-11-12 by HTTP GET via curl (home and 11 interior pages returned 200; one collection page returned 429 and was not verified; page titles were not extractable from raw HTML). Approved by the project lead 2026-11-13 (`Websites/pipelines/claude/research/approval-2026-11-13.md`). No request to the reference was made during this build.
- Stack: semantic HTML5, one `css/styles.css`, one `js/main.js`, local SVG in `assets/`. No frameworks, libraries, CDNs, web fonts, fetch or build step. Data is inline in `main.js`.

## Run locally
Open `index.html` in a browser straight from the folder (`file://`). No server is needed.

## Sitemap (17 pages)
| Local page | Purpose | Reference page mapped |
| --- | --- | --- |
| index.html | Brand home: hero, collections, featured garments, journal teasers, visit panel | `/` |
| journal.html | Journal index with topic filter and search | `/pages/news` |
| article.html?slug=... | Journal entry rendered from inline data (8 entries) | news story pages such as `/pages/held-by-light` (pattern only) |
| lookbook.html | House lookbook carousel, 8 plates | `/pages/margaret-howell-aw26-lookbook` |
| lookbook-field.html | Second-line lookbook carousel, 6 plates | `/pages/mhl-by-margaret-howell-aw26-lookbook` |
| campaign.html | Campaign story and named colour palette | `/pages/autumn-winter-2026-campaign` |
| plates.html | Abstract studio plates with lightbox | `/pages/photographs-by-margaret-howell` |
| about.html | Invented history | `/pages/about-margaret-howell` |
| materials.html | Invented making and materials | `/pages/sustainability` |
| stockists.html | Filterable invented stockists | `/pages/shops-margaret-howell` |
| care.html | Care and repair | `/pages/care-repair` |
| contact.html | Simulated contact form | `/pages/contact` |
| accessibility.html | Accessibility statement | `/pages/accessibility` |
| collections.html | Garment listing with filters (intentional addition: the reference's collection depth is a shop) | `/collections/*` (demo) |
| garment.html?id=... | Garment detail from inline data, colourway radios, fictional dimension table | product pages (demo) |
| search.html | Search over inline data (intentional addition) | not observed |
| 404.html | Not found | none |

## Sample data counts
24 garments (7 categories, 2 lines, 7 materials), 8 journal entries, 8 stockists, 8 + 6 lookbook plates, 6 studio plates, 33 abstract SVG files.

## Feature checklist
Skip link; fictional-house note on every page; mega-nav as dropdown buttons with `aria-expanded`; mobile menu disclosure; breadcrumbs; garment filters (name, category, line, material, sort) with count, empty state and reset; garment detail with colourway radios (swatches always carry a text name); keyboard lookbook carousel; lightbox with Escape and focus return; journal filter and search; stockist filter; site search with empty state; simulated newsletter and contact forms with error summary, inline errors and focus management.

## Gallery behaviour
The carousel never autoplays, so there is no pause control to need. Previous and next are labelled buttons, the status "Plate N of M" is a polite live region, thumbnails are a list of buttons with `aria-current`, and Left/Right arrow keys work within the gallery. "Enlarge plate" opens a native `<dialog>`; Escape or the Close button closes it and focus returns to the opener. Slide changes are instant, with no animation, and CSS also disables any animation under `prefers-reduced-motion`.

## Simulations and demos
Both forms only validate and show a "demo only" message. Nothing is stored or sent. Search and filters run on inline arrays. There is no cart, checkout, payment field, price, wishlist or login.

## QC (Rules.md section 9) - evidence: `node Websites/tools/qc/qc.js Websites/fashion/claude/FASH-02` plus a scripted Playwright flow check
| Gate | Result |
| --- | --- |
| 13 Technology | pass (qc.js static scan: no prohibited files, no remote requests; fetch not used) |
| 14 Completeness | pass (qc.js: files present, links and asset paths resolve) |
| 15 Structure | partial (landmarks and metadata checked; reference titles were never extractable, so heading and section order are matched to recorded regions only) |
| 16 Interaction | partial (scripted Playwright flows; see list below; no manual exploratory testing) |
| 17 Accessibility | partial (axe-core at 1280 and 375 plus scripted keyboard flows; 375px horizontal scroll check; no screen reader, zoom or contrast-by-eye testing) |
| 18 Traceability | partial (docs written from the implemented files; inventory page lists checked against delivered filenames by script) |
| 19 Scope | pass by review (no shop, no excess data) |

Flows scripted and passed: dropdown open and Escape; mobile menu and Escape; carousel by keyboard, arrow keys, lightbox open, Escape and focus return; plates lightbox focus return; collection filter, empty state and reset; garment detail, colourway change and unknown id; journal and stockist empty states; search results and empty state; newsletter invalid and valid; contact error summary and focus.

## Not tested
Screen readers and other assistive technology; browsers other than Chromium; print; zoom to 400% beyond the 375px reflow check; touch devices; cognitive review; manual colour-contrast beyond axe. No WCAG conformance is claimed.

## Known limitations
Titles of reference pages were not extractable; imagery is abstract SVG only; garment/article/search pages use query strings that rely on JavaScript; the fictional dimension tables are not size advice.
