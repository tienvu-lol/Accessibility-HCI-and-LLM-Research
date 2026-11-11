# FASH-02: Vesperine (fashion brand editorial and lookbook replica)

- **Replica ID:** FASH-02 (slot 2, model group `claude`)
- **Category / stratum:** Content-driven (Fashion) / fashion brand editorial or lookbook site
- **Fictional branding:** the fashion house is **Vesperine**; its editorial journal is **Vesper Notes**. All names, authors, products, stories and prices are invented. There are no real logos, seals or copied prose, and all imagery is local SVG placeholder artwork.
- **Approved source URL:** https://www.toryburch.com/en-us/ (research metadata only: Tory Burch with its "Tory Daily" editorial blog and runway pages)
- **Source verification:** 2026-11-10, HTTP GET via curl, taken from the Phase A research inventory (`Websites/pipelines/claude/research/FASH.md`, block FASH-02). Home returned 200 with title "Women's Clothing, Dresses, Designer Shoes, Handbags, Accessories | Tory Burch"; all 14 source pages returned 200. This run did not re-fetch the reference; it relies on the inventory.
- **Approval:** the project lead waived the Phase A approval stop and approved this source on 2026-11-10 (`source_approved_at` in `generation-metadata.json`).

## Run locally

Open `index.html` in a browser straight from disk (file://). There is no build step, server or network access. All data is inline in `js/main.js`. Menus, search, filters, dialogs and the carousel need JavaScript; with JavaScript disabled the pages still show their content (stories are pre-rendered, menus show expanded) but the interactive controls do nothing.

The HTML pages and SVG placeholders were produced with a throwaway generator script kept outside the repository (it only wrote static files). The delivered site has no build step and no such script.

## Sitemap and page-to-source mapping

Reference paths are under `https://www.toryburch.com/en-us/`.

| Local page | Reference page | Notes |
| --- | --- | --- |
| `index.html` | `/en-us/` | Home: hero, shop tiles (demo), latest stories, runway and campaign promos, newsletter |
| `journal.html` | `/blog/torys-blog.html` | Journal home: sub-nav, blog search, card grid with Read More |
| `journal-style.html` | `/blog/torys-blog-style-landing.html` | Style landing |
| `journal-culture.html` | `/blog/torys-blog-culture-landing.html` | Culture landing |
| `journal-travel.html` | `/blog/torys-blog-travel-landing.html` | Travel landing |
| `journal-issues.html` | `/blog/torys-blog-issues-landing.html` | Issues landing |
| `journal-archive.html` | `/blog/torys-blog-archive.html` | Archive with filters |
| `article.html` | `/blog-post/blog-post.html?bpid=742601` | Runway report; `?bpid=` swaps in other inline stories, like the reference's `bpid` pattern |
| `campaign.html` | `/blog-post/blog-post.html?bpid=742204` | Campaign post with lookbook carousel |
| `search.html` | `/blog/torys-blog-search-results.html?q=dress` | Client-side search over inline data |
| `runway.html` | `/new/runway/` | Runway landing |
| `runway-show.html` | `/new/runway/spring-summer-2027/` | Show page: demo stream dialog and filterable look gallery |
| `about.html` | `/about-us/` | About |
| `sitemap.html` | `/sitemap/` | Site map |
| `demo.html` | none (intentional addition) | Notice page for every shop, help, legal and social link |
| `404.html` | none | Dedicated not-found page |

Not replicated: `/new/runway/runwayindex/` and `/our-impact/` (optional extras in the inventory), real shop, product and account pages.

## Feature checklist

- [x] Skip link, `<main id="main-content">`, one h1 per page, landmarks, `data-section` / `data-component` metadata
- [x] Header with search disclosure, primary nav with four mega-menu panels (hover/click/keyboard) and mobile disclosure
- [x] Vesper Notes sub-nav (Issues, Style, Beauty, Culture, Travel, Entertaining, Music, Sport, Archive)
- [x] Story card grids, load more, sort, archive filters with empty state, search with empty and error states
- [x] Article page with breadcrumb, share (copy link, email), related stories, not-found state for unknown `bpid`
- [x] Lookbook carousel (no autoplay), runway look filter chips, modal look viewer, demo stream dialog
- [x] Newsletter form with inline errors, error summary, focus management and demo success state
- [x] 404 page, site map, reduced-motion CSS, responsive layout down to 375px

## Sample data counts

14 stories (8 sections, 2025 and 2026), 12 runway looks in 4 groups, 6 campaign frames, 5 listed runway seasons (1 linked), 4 mega-menu panels (3 columns each), 1 newsletter form.

## Interaction simulation notes

- Shop, help, legal, social and bag links go to `demo.html?topic=...`, which says no such page exists. The mega-menu panels and footer carry a visible note about this.
- The newsletter never sends or stores anything; the success message says so.
- The runway "live stream" is a dialog explaining that no video is included.
- Search, archive filters, sort and load more run only over the inline `POSTS` array in `js/main.js`.
- The share "Copy link" button uses the clipboard API where the browser allows it on file:// and otherwise shows a fallback message.

## Intentional additions (not observed on the reference)

Shop-category tiles on the home page, the demo notice page, the demo stream dialog, the look viewer dialog, the archive empty-state reset and the share block. They are labelled in the page copy or in `fidelity-notes.md`.

## QC results (RULES.md section 9)

Automated run: `node Websites/tools/qc/qc.js Websites/fashion/claude/FASH-02` on 2026-11-11 (UTC): `pages=16 files=33 failures=0 warnings=0`. The tool checks required files, JSON validity, broken links/assets, prohibited tech, remote requests, JS errors, landmarks/skip link/metadata, axe-core (WCAG 2.0 to 2.2 A/AA plus best-practice rules) at 1280px and 375px, and horizontal scroll at 375px.

A separate scripted Playwright (Chromium) flow check, run from a scratch directory and not stored in this repository, passed all 44 assertions: mega-menu click/Enter/Escape and focus return, header search disclosure, search results/empty/error states, newsletter errors/summary focus/success, load more, category sort, archive prefilter/empty/reset/keyword, article bpid swap and not-found, carousel buttons/arrows/dots, look filter and dialogs with Escape and focus return, demo topic text, mobile menu and submenu with Escape.

| Gate | Result | Evidence |
| --- | --- | --- |
| 13. Technology | pass | qc.js: no prohibited file types or libraries, no remote requests, no JS errors; no fetch/XHR in `js/main.js` |
| 14. Completeness | pass | qc.js: required files present, no broken links or assets across 16 pages |
| 15. Structure | pass (partial basis) | landmarks and metadata checked by qc.js; section order follows the Phase A research notes, not a live re-inspection of the reference |
| 16. Interaction | pass | scripted flows above; controls work on local data or are labelled demos |
| 17. Accessibility review | partial | axe-core clean at both widths; labels, alt text, heading order and contrast covered only as far as axe checks them; reduced-motion CSS present but not exercised; see not-tested list |
| 18. Traceability | pass | component inventory pages were generated from the actual HTML; this README and `fidelity-notes.md` were written against the implemented files |
| 19. Scope | pass | 15 content pages plus 404; small inline datasets, no bulk dummy content |

### Not tested

Screen readers (NVDA, JAWS, VoiceOver, TalkBack); 200% / 400% zoom and text-spacing overrides; a full manual keyboard walkthrough of every page (only the scripted flows above); Windows high-contrast / forced-colors; Firefox and Safari (only Chromium ran); touch devices; real-device mobile; `prefers-reduced-motion` behaviour (the CSS rule exists, but there are few animations); WCAG success criteria that axe cannot detect (e.g. meaningful sequence, consistent help, cognitive load). No WCAG conformance claim is made.

## Known limitations

- Menus, search, filters, dialogs and the carousel need JavaScript.
- Hover-open on mega-menus uses a pointer-and-width media query check; mixed-input devices may behave differently.
- The reference's exact main-nav dropdown text was not extracted in Phase A, so the mega-menu items are invented in the same pattern (headings Categories, Collections, Shops, By Occasion, Gifts By Price, Featured).
- Only two stories (default and campaign) have bespoke layouts; the rest share the article template and have two short paragraphs each.
- Sections Beauty, Entertaining, Music and Sport have no page of their own; they link to the archive filtered by section.
