# NEWS-02 - The Alderny Daily Lantern (FICTIONAL)

**FICTIONAL PUBLICATION.** Every article, byline, quote, place and organization on this site is invented sample content for an accessibility research dataset. Nothing here is real news. The fictional notice appears in the masthead of every page (including `404.html`), immediately above the headline on article pages, and in the footer.

- Replica ID: NEWS-02 (slot 2, model group claude); category: news; stratum: local / regional news outlet (metro daily)
- Fictional branding: *The Alderny Daily Lantern*, of the invented city Port Alderny, Tessaly County, state of Calvern. Invented suburbs: Fairmeadow, Kettle Ridge, Linden Weir, Oxbow Heights, Quillon Park.
- Approved source: Chicago Tribune, https://www.chicagotribune.com/ (research metadata only; no trademarks, copy or real places are used). Verified 2026-11-10 by HTTP GET via curl (all 14 source pages returned 200); approved 2026-11-13 (`Websites/pipelines/claude/research/approval-2026-11-13.md`). Reference paywall behavior was **not verified**.

## Run locally
Open `index.html` directly in a browser (works from `file://`; no server, no build, no network). Vanilla HTML, one CSS file, one JS file with inline sample data.

## Sitemap and page-to-source mapping
| Local page | Reference page |
| --- | --- |
| `index.html` | `/` home |
| `news.html` | `/news/` |
| `local-news.html` | `/local-news/` |
| `latest-headlines.html` | `/latest-headlines/` |
| `business.html` | `/business/` |
| `sports.html` | `/sports/` |
| `opinion.html` | `/opinion/` |
| `things-to-do.html` | `/things-to-do/` |
| `suburbs.html` | `/suburbs/` |
| `search.html` | `/?s=` search results |
| `article.html?id=...` | article page (one template, 26 sample articles via `?id=`; static default is the farmers-market story) |
| `subscribe.html` | Subscribe / subscriber services / newsletter blocks (simulation) |
| `about.html` | Footer company info, site map, accessibility (intentional addition) |
| `404.html` | Error page (required by Rules.md) |

14 HTML pages (including 404.html); 27 files in total (14 HTML, 1 CSS, 1 JS, 7 SVG, 4 documentation/metadata files).

## Features
Menu disclosure with aria-expanded and Escape; subscriber-services dropdown; primary nav (hidden below 760px in favour of the menu); header search plus search page with section filter, sort, result count and empty state; Latest / Most read tabs (correct tab pattern); headline filters (latest-headlines, local-news) with live count and empty state; article page with breadcrumbs, invented byline, fictional dateline, related stories, copy-link and print; simulated metered-paywall dialog (button-triggered; Escape and Close button); simulated newsletter and subscription forms with error summary, inline errors, focus management and demo success.

## Sample data
26 invented articles (6 sections), 5 invented suburbs, 10-item invented "most read" ranking labelled as sample, 6 abstract SVG illustrations.

## Simulation notes
No payment, subscription, account or email storage exists. Every success message says so. The paywall prompt is an **unverified inference** and is only shown on demand.

## QC (Rules.md section 9)
Evidence: `node Websites/tools/qc/qc.js Websites/news/claude/NEWS-02` (static link/asset checks, JSON validity, Playwright chromium at 1280px and 375px, axe-core rules, console/network errors, horizontal scroll check) plus a scripted interaction run (menu, tabs, search, filters, forms, dialog).
- 13 Technology: pass (qc.js: no remote requests, no prohibited files; manual grep: no libraries/CDNs)
- 14 Completeness: pass (qc.js: all required files and links)
- 15 Structure: pass (qc.js landmarks and metadata checks; hierarchy compared to research notes by inspection)
- 16 Interaction: pass for flows in scripted run; partial because not every control was exercised by script
- 17 Accessibility: partial (axe rules at two widths plus scripted keyboard checks only; no screen reader, no manual contrast audit, no zoom/text-resize test)
- 18 Traceability: partial (inventory pages generated from actual markup; manual review only)
- 19 Scope: pass by inspection

The final qc.js summary line is quoted in the delivery report; see `generation-metadata.json` for the per-gate summary.

## Not tested
Screen readers, real mobile devices, Firefox/Safari, 200% text zoom, high-contrast mode, print output, forced colors, clipboard copy under `file://`.

## Known limitations
Article text is rendered by JS from inline data for `?id=` URLs; without JS only the default article shows. Only first-level reference navigation was rebuilt. The most-read list is a fixed invented sample, not live.
