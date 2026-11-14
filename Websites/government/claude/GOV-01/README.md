# GOV-01 - City of Quillhaven (fictional)

**WARNING: this is a fictional city government.** The site is invented sample content for an accessibility research dataset. It is not a real government, nothing in it is official information or civic guidance, and it must not be presented as a real city's site. A fictional-government notice is in the masthead of every page.

- Replica ID: GOV-01, slot 1, category government, stratum city / municipal government, model group claude
- Fictional branding: City of Quillhaven, Tarnmere County, Republic of Ostrelle (all invented). Invented domain `quillhaven.example`. Emblem is a plain stylised lantern tile, not a seal or crest.
- Approved source: City of Boise, Idaho, https://www.cityofboise.org/ (research metadata only; nothing here is set in or about that place). Verified 2026-11-12 by HTTP GET via curl (home page and 12 interior pages returned 200). Approved 2026-11-13. Page-level structure (headings, ARIA, forms) of the source was never inspected, so no structural fidelity is claimed.
- Run locally: open `index.html` from disk (file://). No server, build or network needed.

## Sitemap and page-to-source mapping (14 pages + 404)
| Local page | Source page (reference) |
|---|---|
| index.html | / |
| residents.html | /residents/ |
| visitors.html | /visitors/ |
| business.html | /business/ |
| government.html | /government/ |
| departments.html | /departments-programs/ (filterable directory is an intentional addition) |
| trash-and-recycling.html | /residents/trash-and-recycling/ (illustrative content only) |
| public-meetings.html | /departments/finance-and-administration/city-clerk/public-meetings/ |
| report-an-issue.html | /government/report-an-issue-or-file-a-complaint/ (simulation) |
| executive-office.html | /departments/mayor/ (no named people) |
| city-council.html | /departments/city-council/ (no named people) |
| permits.html | /business/permits/ (illustrative list, no requirements) |
| boards-and-commissions.html | /government/boards-and-commissions/ |
| services.html | none; intentional addition (services directory with search) |
| 404.html | none; protocol requirement |

## Sample data counts
36 services in 6 groups, 12 departments in 4 groups, 12 permit types in 3 categories, 14 meetings across 5 bodies (year 2099), 6 council seats, 6 boards. Data is inline in `js/main.js`.

## Feature checklist
Skip link; persistent fictional notice (static HTML) in every masthead; primary nav with Residents/Business/Government dropdowns (aria-expanded, Escape closes and returns focus, outside click closes); mobile Menu disclosure; header search form leading to the services directory; services search with polite live-region count and empty state; department and permit filters (permit page accepts `?category=` and `?search=` like the reference); meetings table (real `<table>`, caption, row headers, stacked on narrow screens, filter by body and month, per-row sample agenda in `<details>`); report-an-issue form with labelled fields, inline errors, error summary, focus management and a demo-only outcome; language selector shown as a labelled non-functional demo; 404 page.

## Simulation notes
The report form validates only. It sends, stores and receives nothing, says so in three places, and its success message states that nothing was sent. It collects no identity numbers, dates of birth or payment data, and there is no login. A nickname and an optional made-up email are the only personal-looking fields, with hints to use invented values.

## QC gates (RULES.md section 9), from `node Websites/tools/qc/qc.js Websites/government/claude/GOV-01`
Final qc.js line is recorded in generation-metadata and the delivery report: `failures=0`.
- Technology: pass (qc.js static scan: no prohibited files, no remote assets; hand grep for frameworks)
- Completeness: pass (qc.js link and asset audit, all mapped pages present)
- Structure: partial (landmarks and instrumentation present; reference structure never inspected, so no match to it is claimed)
- Interaction: partial (scripted Playwright flows: nav disclosure and Escape, services search, count and empty state, department and permit filters, meetings filters, form validation, error summary, focus, demo outcome, mobile menu; no manual testing)
- Accessibility: partial (axe-core at 1280 and 375 via qc.js plus scripted keyboard checks; no screen-reader, zoom or human testing). No WCAG conformance is claimed.
- Traceability: partial (author check that docs match files; not independently reviewed)
- Scope: pass (author review)

## Not tested
Screen readers, real assistive technology, 200% text zoom beyond reflow check, browsers other than Playwright Chromium, forced-colors mode, contrast beyond axe, printing, Safari/Firefox.

## Known limitations
Directory pages are JavaScript-rendered and show a noscript message without JS. Reference alert banner, payments, translation and external map link are not reproduced (see fidelity-notes.md).
