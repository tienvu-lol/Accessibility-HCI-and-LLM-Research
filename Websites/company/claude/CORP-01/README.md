# CORP-01 - Corvane Bank (fictional national retail bank)

- **Replica ID:** CORP-01 (slot 1, model group claude)
- **Category / stratum:** Company, national retail bank (personal banking)
- **Fictional brand:** Corvane Bank. Invented names used: Tessera (card network), Pocketline Pay (payment app), Steady Debit, Northmark Banking Standards Board (fictional regulator, footer badge). All are made up.
- **Approved source URL:** https://www.usbank.com/ (personal banking). Verified 2026-11-10 by HTTP GET via curl (`-sSL -A "Mozilla/5.0"`); approved by the project lead 2026-11-13 (`Websites/pipelines/claude/research/approval-2026-11-13.md`).
- **Active allocation note:** built under the reduced active allocation of 2026-11-12 (slots 01-06); open-source slots 07-10 are deferred.
- **Generation:** claude-sonnet-5-5 via Claude Code agent subagent; see `generation-metadata.json`.

## Run locally
Open `index.html` in a browser (works from `file://`; no server, no network, no build). All data is inline in `js/main.js` or in the HTML.

## Financial-claims notice
Every rate, APR, APY, fee, balance, branch and phone number is **fictional sample data** for a design study. The reference's rate tables and calculator internals are rendered client-side and were never observed, so all rates and calculator logic here are my own invention (standard fixed-payment formula; simple compounding for the CD estimate). Nothing is an offer, quote or financial advice. No real deposit insurance or regulatory status is claimed. The log in dialog and enroll form are non-functional demos that store and send nothing.

## Sitemap (16 HTML files)
| Local page | Reference page (path on the approved source) |
| --- | --- |
| index.html | `/` |
| checking.html | `/bank-accounts/checking-accounts.html` |
| savings.html | `/bank-accounts/savings-accounts.html` |
| cds.html | `/bank-accounts/savings-accounts/certificate-of-deposit.html` |
| credit-cards.html | `/credit-cards.html` |
| mortgage.html | `/home-loans/mortgage.html` |
| mortgage-rates.html | `/home-loans/mortgage/mortgage-rates.html` |
| mortgage-calculators.html | `/home-loans/mortgage/mortgage-calculators.html` |
| personal-loan-calculator.html | `/loans-credit-lines/personal-loans-and-lines-of-credit/personal-loan-calculator.html` |
| customer-service.html | `/customer-service.html` |
| online-banking.html | `/online-mobile-banking.html` |
| accessibility.html | `/about-us-bank/accessibility.html` |
| financial-education.html | `/financial-education.html` |
| locations.html | intentional addition (reference links to a locator that was not fetched; `/locations.html` was a 404) |
| search.html | reference global search form (results page not observed; built over an inline index) |
| 404.html | required by Rules.md |

Other files: `css/styles.css`, `js/main.js`, `assets/*.svg` (8), `README.md`, `fidelity-notes.md`, `component-inventory.json`, `generation-metadata.json`.

## Feature checklist
- Header with utility bar, logo, global search, log in demo, enroll link; mega-menu dropdown disclosures (`aria-expanded`), mobile menu toggle with nested disclosures and "Return to main menu".
- Product pages, comparison and rate tables with captions and `th` scopes (checking, savings, CD, mortgage).
- CD maturity estimator; mortgage rate filter and sort; mortgage payment (with 5-year schedule) and 15 vs 30 comparison calculators; personal loan calculator.
- Credit card filter (goal, no annual fee) with per-card disclosure; FAQ search with topic filter; education topic chips; branch/ATM locator; site search over inline index.
- Login dialog (native `dialog`), enroll form; each with error summary, inline errors, focus management and a demo-only success state.

## Sample data counts
30 locations, 18 help topics, 12 education summaries, 6 cards, 8 CD terms, 8 mortgage products, 6 savings tiers, 14 pages plus 12 articles in the search index.

## Interaction simulation notes
Log in, enroll and "Open online" are simulated only. The locator has no map. Calculators are client-side estimates of principal and interest only. Search runs over an inline index.

## QC gates (Rules.md section 9)
`node Websites/tools/qc/qc.js Websites/company/claude/CORP-01` final run: `pages=16 files=30 failures=0 warnings=0` (static link/asset audit, axe-core at 1280 and 375 px on every page, horizontal-scroll check at 375 px, console/network errors).

| Gate | Result | Evidence |
| --- | --- | --- |
| 13 Technology | pass | qc.js: no prohibited files, no remote requests, no fetch; vanilla JS, system fonts |
| 14 Completeness | pass | qc.js link/asset audit; all mapped pages and artifacts present |
| 15 Structure | pass (automated presence only) | landmarks, `data-section`/`data-component` present; fidelity to the reference layout compared from the research notes, not visually side by side |
| 16 Interaction | pass | scripted Playwright flows (nav, dialog, locator, calculators incl. invalid input, rates, cards, FAQ, search, chips, mobile menu); all 50 checks passed |
| 17 Accessibility | partial | axe-core (no violations, including with the mega-menu, dialog and results open in the flow script) plus scripted keyboard/Escape checks; no screen-reader, zoom/text-resize, or manual contrast testing |
| 18 Traceability | pass | inventory generated from delivered HTML; docs reflect the build |
| 19 Scope | pass | additions labeled in fidelity-notes.md |

## Not tested
Screen readers; browsers other than Chromium; Windows high contrast or forced colors beyond a CSS rule; 200% text resize and 400% zoom; touch devices; manual contrast audit; print. No WCAG conformance is claimed.

## Known limitations
No map; no real session; reference rate widgets unobserved; Spanish site banner, audience switcher and many deeper product pages not rebuilt (see fidelity-notes.md).
