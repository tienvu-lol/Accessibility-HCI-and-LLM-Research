# FASH-03 - Stitch & Strut Daily (fictional)

- **Replica ID:** FASH-03 (slot 3, model group `claude`)
- **Category / stratum:** fashion / content-driven fashion blog, trend and street-style site
- **Fictional brand:** Stitch & Strut Daily. All names, people, events and copy are invented; imagery is local SVG placeholders.
- **Approved source (research metadata only):** https://fashionbombdaily.com/ (Fashion Bomb Daily)
- **Source verification:** 2026-11-10, HTTP GET via curl, recorded in `Websites/pipelines/claude/research/FASH.md` (home 200, title "Fashion Bomb Daily - Multicultural Fashion, Beauty & Style"; all 14 listed source pages returned 200). This run did not re-fetch the source and did not render it in a browser.
- **Approval:** the project lead waived the Phase A approval stop and approved this reference on 2026-11-10 (`source_approved_at`).
- **Generation:** `claude-sonnet-5-5`, autonomous run, no human edits. See `generation-metadata.json`.

## Run locally

Open `index.html` from the file system. No server, build step, network or install is needed. Stories are inline data in `js/main.js` (20 stories, 8 sections); nothing is fetched.

## Sitemap and page-to-source mapping

| Local page | Reference page (path on the source) |
| --- | --- |
| `index.html` | `/` home: "The latest", video block, Black Designers, Popular posts, Stay Connected |
| `fashion.html` | `/category/fashion/` |
| `street-style.html` | `/category/real-style/` (labeled Street Style) |
| `trend.html` | `/category/trend/` |
| `celebrity-style.html` | `/category/celebrity-style/` |
| `runway.html` | `/category/fashion-show/` (labeled Runway) |
| `designers.html` | `/category/black-designers/` |
| `what-to-wear.html` | `/category/what-to-wear/` |
| `beauty.html` | `/category/beauty/` |
| `article.html?id=N` | a dated post URL (story template, author block, share buttons, slideshow, related articles) |
| `author.html` | `/author/the-fashion-bomb-staff/` |
| `search.html?s=word` | `/?s=dress` (search results) |
| `about.html` | `/about/`, plus condensed stand-ins for Advertising, Press & Features, Privacy Policy and Terms of Use |
| `contact.html` | `/contact/` |
| `404.html` | not in the source inventory; required by RULES.md |

That is 14 mapped pages plus the 404. Category pages are separate files; their story lists are drawn by `js/main.js` from the inline data (the pages need JavaScript for the list).

## Feature checklist

- Skip link, header with logo, demo shop links and `role="search"` form, primary navigation with three click-to-open dropdowns and a mobile Menu disclosure (`aria-expanded`, Escape closes).
- Home sections in the observed order: The latest (8 stories, two columns), video block, Black Designers, Popular posts, then the footer's Stay connected block.
- Category archive pages: breadcrumb, h1, intro, sort select, "Load more" pagination (6 per page), status line, empty state.
- Article page: breadcrumb, h1, author block, share buttons (Copy link works; the others are demos), 4-slide slideshow, body, designer-resource and shop-promo widgets, 3 related stories, not-found state.
- Search over the inline stories with section filter, sort, empty state and a blank-query prompt.
- Author page, About page, contact form with error summary, inline errors, focus management and a demo success state, 404 page.
- Footer groups: sections, site links, demo social buttons.

## Simulation notes

- **Demo controls:** "Shop (demo)", "Shop Our Feed (demo)", social buttons, "Share on ... (demo)", "Shop the look" and every "Play video (demo)" button open a native dialog stating that nothing happens. No external site is contacted.
- **Contact form:** validates in the browser only; the success panel says nothing was sent.
- **Copy link:** uses `navigator.clipboard` when allowed and otherwise says copying was not possible.
- **Sample data:** 20 stories (each 2 short paragraphs), 8 sections, 1 staff author, 4 slideshow slides per story. Fashion has 9 stories, which exercises "Load more"; search for `zzzxq` exercises the empty state; `article.html?id=999` exercises the not-found state.

## Intentional additions and omissions

- Added: sort select, section filter on author/search, and the "Load more" pager (the source lists stories by date).
- Omitted: ads (the source uses Google Publisher Tag slots), the newsletter (none was found on the source), celebrity-name and event menu entries beyond the nine primary categories, and separate legal/press pages (condensed into `about.html`).

## QC gates (RULES.md section 9)

Evidence: `node Websites/tools/qc/qc.js Websites/fashion/claude/FASH-03` on 2026-11-11 - **pages=15 files=32 failures=0 warnings=0**. It checks required files, JSON validity, broken links/assets, prohibited tech, remote requests, JS errors, landmarks/skip link/metadata, axe-core (WCAG 2.0-2.2 A/AA + best-practice tags) at 1280px and 375px, and horizontal scroll at 375px.

| Gate | Result | Basis |
| --- | --- | --- |
| 13 Technology | pass | qc.js prohibited-tech and remote-request checks; vanilla HTML/CSS/JS only |
| 14 Completeness | pass | qc.js required-files and link/asset checks across 15 pages |
| 15 Structure | pass | qc.js landmark/metadata checks; order of regions taken from the Phase A notes, not re-inspected on the live site |
| 16 Interaction | pass | 47 scripted Playwright assertions in headless Chromium over `file://` (nav dropdown and Escape, mobile menu, demo dialog, load more and sort, search results/empty/blank, article slideshow and arrow keys, copy-link status, not-found, author filter, contact errors/summary focus/success) |
| 17 Accessibility review | partial | axe-core clean at 1280px and 375px; no horizontal scroll at 375px; reduced-motion CSS present but not run; focus management scripted only |
| 18 Traceability | pass | docs written from the implemented files; component inventory lists actual pages |
| 19 Scope | pass | 14 pages plus 404, 20 sample stories |

**Not tested:** screen readers (NVDA/JAWS/VoiceOver), 200% / 400% zoom and text-resize, a manual keyboard walkthrough by a person, Firefox/Safari, touch devices, high-contrast/forced-colors mode, `prefers-reduced-motion` behavior at runtime, and color contrast beyond what axe-core reports. This is a WCAG 2.2 AA-oriented baseline, not a conformance claim.

## Known limitations

- Category, search, author and article content are drawn by JavaScript; without JavaScript they show a notice.
- Dropdown (click-to-open) and slideshow behavior are inferred in the source inventory and were not confirmed by interacting with the source.
- One shared author persona; the source's per-article layout, ads and photo slideshows are approximated.
- Dialogs use the native `<dialog>` element, which needs a current browser.
