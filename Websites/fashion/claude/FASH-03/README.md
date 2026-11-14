# FASH-03 - Curbside Signal (fictional)

- Replica ID: FASH-03; category: fashion; slot 3; model group: claude
- Stratum: fashion blog, trend and street-style content site
- Fictional branding: **Curbside Signal**, an invented magazine. A visible fictional-publication note sits in the masthead area (inside `<header>`, above the logo) of every page including `404.html`, and again in the footer.
- Approved source: https://hypebeast.com/ (research metadata only). Verified 2026-11-12 by HTTP GET via curl (14 URLs returned 200 per the research block); approved by the project lead 2026-11-13. The reference changes hourly, so the scope is one snapshot.
- Complexity: high (per research block); about 8 pages were deemed enough, 12 plus a 404 were built.

## Run it
Open `index.html` in a browser from disk. No server, build step, network or storage is needed. All data is inline in `js/main.js`.

## Sitemap and source mapping
| Local page | Reference page | Notes |
| --- | --- | --- |
| `index.html` | `/` | dense front page |
| `fashion.html` | `/fashion` | topic chips, sort |
| `footwear.html` | `/footwear` | topic chips, sort |
| `culture.html` | `/art`, `/design`, `/lifestyle`, `/music` (merged) | `?tag=` deep links from the Culture dropdown |
| `magazine.html` | `/magazine` | plate gallery + lightbox (addition) |
| `brands.html` | `/directory` | 20 invented labels, filters |
| `author.html` | `/author/<name>` | `?a=` selects one of 5 invented writers |
| `article.html` | article page | `?id=` selects one of 30 stories |
| `search.html` | `/search?s=` | `?q=` |
| `calendar.html` | none (addition) | sample-data release calendar |
| `newsletter.html` | none (addition) | simulated sign-up |
| `about.html` | footer targets (combined) | about, contact, sample privacy |
| `404.html` | n/a | route back to home, search, calendar |

Also: `css/styles.css`, `js/main.js`, `assets/*.svg` (14 abstract compositions + logo), `fidelity-notes.md`, `component-inventory.json`, `generation-metadata.json`.

## Sample data counts
30 stories, 5 writers, 20 brands, 16 calendar entries (April to June 2099), 8 gallery plates. Every name, place and date is invented; dates use the year 2099 so they are obviously sample data.

## Feature checklist
- Primary nav with Culture and More dropdowns (aria-expanded, Escape closes and returns focus), mobile disclosure menu, aria-current.
- Search (header + page) over inline data with announced count and empty state.
- Topic chips (aria-pressed) with announced count and empty state; sort; load more.
- Release calendar labelled **"Sample data, not a real release schedule"** on the page (strong notice), in the home sidebar, in entry names ("(sample)"), column headings ("invented"), and in the nav ("Release calendar (sample)"). No times, no links, no purchase paths. The Mark button toggles a local demo list only.
- Gallery: previous/next buttons with accessible names, thumbnail buttons with `aria-current`, polite status "Plate N of 8", Left/Right arrow keys, no autoplay (so no pause control is needed; `prefers-reduced-motion` also removes all transitions/animations). "View larger" opens a native modal `<dialog>`; Escape closes it and focus returns to the opener button.
- Newsletter: labelled fields, hint, inline errors (`aria-invalid`, `aria-describedby`), error summary that receives focus with links to fields, demo-only success message.
- Skip link, one `h1` per page, list semantics for card grids, `data-section`/`data-component` on regions and components.

## Content guardrails applied
No real people, brands, models, colourways, retailers, events or publications; no resale/investment/price content; no authentication or counterfeit content; no shop, cart, account or payment; abstract SVG only; phone numbers use 555; emails use `.example`/`.test`.

## QC results (Rules.md section 9)
Evidence: `node Websites/tools/qc/qc.js Websites/fashion/claude/FASH-03` (static audit + axe-core at 1280 and 375 px for every page) and a separate scripted Playwright flow check run from a private temp directory (not stored in the repo). Final qc.js summary line: `pages=13 files=34 failures=0 warnings=0`.

| Gate | Result | Basis |
| --- | --- | --- |
| Technology | pass | qc.js: no prohibited files, no remote requests; no `fetch()` |
| Completeness | pass | qc.js: all required files, links and asset paths resolve |
| Structure | partial | landmarks and metadata present; fidelity to the reference is inferred from a research block, not compared visually |
| Interaction | partial | scripted checks of nav, filters, search, calendar, gallery, lightbox, newsletter; not every state or browser |
| Accessibility | partial | axe-core clean + scripted keyboard checks; no screen reader, no manual contrast audit, no zoom/text-spacing test |
| Traceability | partial | docs generated from the same files; checked by the author only |
| Scope | partial | reference was a fast-changing snapshot; scope was reduced by design |

**Not tested:** screen readers (NVDA, JAWS, VoiceOver), Firefox and Safari, real touch devices, 200% to 400% zoom and text-spacing overrides, forced-colors mode, high-contrast checks beyond axe, print. No claim of WCAG conformance is made.

## Known limitations
- Cards and article pages for stories are rendered from inline data; the article page needs JavaScript for stories other than the default one.
- Only abstract imagery; no video.
- Merged Culture section; several reference sections not rebuilt (see `fidelity-notes.md`).
