# CORP-03 - Northcairn (fictional DevSecOps platform marketing site)

- **Replica ID:** CORP-03 (slot 3, model group `claude`)
- **Category / stratum:** Company, technology company (software / SaaS)
- **Fictional branding:** company **Northcairn**; platform **Cairn**. Invented capability names: **Trunk** (source control), **Relay** (pipelines), **Cellar** (package and container registry), **Sentinel** (scanning), **Launchpad** (deployments), **Cairn Assist** (assisted agents). Invented customers: Brannock Aerospace, Larkspur Credit Co-op, Tidewater Transit Authority, Quillon Retail Group, Ferngate Health Network, Ombra Telecom, Wickham Mutual, Pinecrest University IT. All prices, people, postings and statistics are invented. Domains use `example.com`-style names and are not linked. Phone numbers use the 555 exchange.
- **Approved source:** https://about.gitlab.com/ (marketing site; docs are on a separate host and are not replicated). Verified 2026-11-10 by HTTP GET via curl (200 on home and 15 interior pages); approved by the project lead 2026-11-13 (`Websites/pipelines/claude/research/approval-2026-11-13.md`). The replica was built from the approved research block; during this build the source was not re-fetched, so no new verification is claimed.

## Run locally
Open `index.html` in any browser (works from `file://`). No server, build step, network access or libraries are needed. All data is inline in `js/main.js`.

## Sitemap (15 pages + 404)
| Local page | Mapped reference page |
| --- | --- |
| `index.html` | `/` home |
| `platform.html` | `/platform/` |
| `pricing.html` | `/pricing/` |
| `pricing-plus.html` | `/pricing/<mid-tier page>/` |
| `solutions.html` | `/solutions/` |
| `solutions-pipelines.html` | `/solutions/continuous-integration/` |
| `customers.html` | `/customers/` (tabs) |
| `customer-story.html` | `/customers/<one story>/` |
| `blog.html` | `/blog/` (search + filter) |
| `sales.html` | `/sales/` (embedded form, simulated) |
| `demo.html` | `/request-a-demo/` |
| `jobs.html` | `/jobs/` and `/jobs/all-jobs/` merged (two select filters + accordion list) |
| `company.html` | `/company/` |
| `get-started.html` | `/get-started/` |
| `security.html` | `/security/` |
| `404.html` | none (required by protocol) |

Files: 16 HTML, `css/styles.css`, `js/main.js`, 5 SVGs in `assets/`, plus README, fidelity notes, component inventory and generation metadata.

## Sample data
36 job openings (7 locations, 10 departments, in `JOBS`), 14 blog articles in 5 categories, 8 customer stories in 6 industries, 15-entry site-search index, 14-row (11 feature + 3 group) plan comparison.

## Feature checklist
- [x] Mega-menu disclosure navigation (buttons with `aria-expanded`), mobile Menu disclosure, Escape closes and restores focus
- [x] Static pricing: three tiers, comparison table (caption, `th scope`, "Included / Not included" text), FAQ accordion. **No billing-period toggle**, as in the reference
- [x] Site search dialog over inline index, with empty state
- [x] Blog search + category filter with empty state
- [x] Jobs: location and department selects, keyword box, accordion rows, empty state, clear filters
- [x] Customers: tabs (arrow/Home/End keys) filtering stories
- [x] Contact-sales and demo forms: labels, hints, inline errors, error summary with focus, demo success state
- [x] Breadcrumbs, skip link, `data-section`/`data-component` metadata, reduced-motion CSS

## Interaction simulation notes
Forms never send data; the success panel states this. Job rows say applications are not accepted. Blog cards have no article pages (no link). "Get free trial" goes to the Get started page; no account is created. Prices are fictional sample figures with a visible notice.

## Known limitations
Layout is an approximation, not pixel-faithful. Single-language. No sign-in. Carousel/video content in the reference is not reproduced. Mega-menus are click-activated (not hover).

## QC gates (Rules.md section 9)
Evidence: `node Websites/tools/qc/qc.js Websites/company/claude/CORP-03` (static audit plus axe-core at 1280px and 375px on every page) and a scripted Playwright flow run (nav, search, jobs, blog, forms, tabs, pricing, mobile menu, Escape).
| Gate | Result |
| --- | --- |
| 13 Technology | pass (qc.js: no remote requests, no prohibited files; vanilla JS only, no fetch) |
| 14 Completeness | pass (qc.js link/asset audit, all required files) |
| 15 Structure | partial (landmarks and metadata checked automatically; match to reference order judged from the research notes only) |
| 16 Interaction | pass for the flows listed above (scripted); not exhaustively tested |
| 17 Accessibility | partial (axe automated rules, scripted keyboard checks, 375px overflow check; contrast by axe only) |
| 18 Traceability | partial (inventory pages generated from the delivered HTML; docs reviewed by the generating agent only) |
| 19 Scope | pass (self-assessed) |

**Not tested:** screen readers, manual keyboard walkthrough on real devices, Safari/Firefox, 200% text zoom, forced-colors mode, Windows high contrast, human usability testing. This is a WCAG 2.2 AA-oriented baseline, not a conformance claim.
