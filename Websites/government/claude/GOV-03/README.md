# GOV-03 - Kelmoran Landmarks Service (fictional)

- Replica ID: GOV-03 (slot 3, model group claude); category government; stratum federal agency
- Fictional branding: "Kelmoran Landmarks Service", an invented agency of the invented Republic of Kelmora. Fictional domain kelmoran-landmarks.example (a reserved example name, not a real site).
- Approved source: https://www.nps.gov/ (research metadata only). Verified 2026-11-12 by HTTP GET via curl; approved 2026-11-13 (see Websites/pipelines/claude/research/GOV.md and approval-2026-11-13.md). This build did not re-verify the live site.
- **Fictional-government notice:** a persistent notice sits in the header, above the masthead, on every page including 404.html. Everything (country, agency, sites, people, domain) is invented. Nothing here is official information or guidance.

## Run locally
Open `index.html` directly from disk (file://). No server, build step or network is needed. All data is inline in `js/main.js`.

## Sitemap (11 pages + 404)
| File | Purpose | Source page mapped |
| --- | --- | --- |
| index.html | Home: hero Find a Site block, topic links, topics grid, teasers | /index.htm |
| find-a-site.html | Directory with search, region, type filters, sort, live count, empty state | /findapark/index.htm |
| site.html?id= | Site detail (30 invented sites) | /yell/index.htm |
| site-plan.html?id= | Illustrative per-site "plan your visit" page with no practical info | /yell/planyourvisit/index.htm |
| plan-your-visit.html | Planning overview with accordion | /planyourvisit/index.htm |
| learn-and-explore.html | Topics overview | /learnandexplore/index.htm |
| topic.html(?t=) | Topic index and topic detail | /subjects/bears/index.htm |
| get-involved.html | Descriptive only, no sign-up | /getinvolved/index.htm |
| what-we-do.html | Fictional agency overview | /aboutus/index.htm |
| news.html | Sample news with category filter | /aboutus/news/index.htm |
| contact.html | Simulated contact form (intentional addition) | none (reference contact URL returned 404) |
| 404.html | Not found page | n/a |

## Sample data
30 sites (6 types, 5 regions), 8 topics (4 groups), 8 news items, all invented. Phone numbers use 555-01xx; email uses .example/.test domains; dates are 2098-2099 sample dates.

## Feature checklist
Skip link; two-level global-nav dropdowns with aria-expanded and Escape at each level; mobile menu disclosure; header and hero search into the local directory; filters (text, region, type checkboxes, sort) with text chips (not colour only), polite live-region count, empty state with reset; site and topic detail with not-found states; accordion; news filter; contact form with labels, inline errors, error summary with focus, demo-only outcome. `data-section` / `data-component` instrumentation on regions and components.

## QC (Rules.md section 9), from `node Websites/tools/qc/qc.js Websites/government/claude/GOV-03`
Final run summary: see generation-metadata.json and the delivery message (failures=0). axe-core ran on all 12 pages at 1280px and 375px.
| Gate | Result | Evidence |
| --- | --- | --- |
| Technology | pass | qc.js static scan (no libraries, no remote requests, no fetch) |
| Completeness | pass | qc.js link and asset audit; all files present |
| Structure | partial | landmarks and metadata present; reference nav markup was never captured |
| Interaction | partial | scripted Playwright flows (nav levels, Escape, filters, empty state, detail pages, contact form, mobile menu) |
| Accessibility | partial | axe plus scripted checks only |
| Traceability | partial | inventory generated from delivered HTML; no human audit |
| Scope | partial | nav labels inferred, not observed |

Not tested: screen readers, real-device and other browsers (only Chromium headless), forced-colors, zoom/text-resize beyond 375px reflow, manual contrast review, voice control. No WCAG conformance is claimed.

## Known limitations
Site detail pages are query-string driven and render via JS. Without JS those pages show a notice. Dropdowns open on click, not hover. The reference's GlobalNav dropdown items were never captured, so all dropdown contents are original. No language selector exists.
