# CORP-05 — open-source source research (slot 07)

- **Run:** `2026-11-16T21-28-20-740Z-research-CORP-05`
- **Scope:** partial — this file covers CORP-05 only. The rest of the category is researched separately.
- **Research model:** unsloth/Qwen3.6-35B-A3B-GGUF (vt-arc-falcon-llamacpp, apache-2.0, open weights) declared for slot 07
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 3/3 candidate homepages and 13/13 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/CORP-05-http-2026-11-16.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### CORP-05

- `source_id`: CORP-05
- `subcategory`: national retail bank
- `source_name`: Wells Fargo
- `official_url`: https://www.wellsfargo.com
- `verified_at`: 2024-05-24 HTTP GET by the orchestrator
- `verification_result`: verified
- `source_pages`:
  - `url`: https://www.wellsfargo.com, `title`: Wells Fargo Bank | Financial Services & Online Banking, `local_file`: index.html
  - `url`: https://www.wellsfargo.com/checking/, `title`: Apply & Open a Checking Account Online Today | Wells Fargo, `local_file`: checking.html
  - `url`: https://www.wellsfargo.com/checking/compare-checking-accounts/, `title`: Compare Checking Accounts | Wells Fargo, `local_file`: checking-compare.html
  - `url`: https://www.wellsfargo.com/savings-cds/, `title`: Open a Savings Account Online | Wells Fargo, `local_file`: savings-cds.html
  - `url`: https://www.wellsfargo.com/savings-cds/rates/, `title`: Savings and Certificate of Deposit (CD) Interest Rates | Wells Fargo, `local_file`: savings-rates.html
  - `url`: https://www.wellsfargo.com/mortgage/, `title`: Home Mortgage Loans & Financing | Wells Fargo, `local_file`: mortgage.html
  - `url`: https://www.wellsfargo.com/mortgage/calculators/, `title`: Mortgage Calculators | Wells Fargo, `local_file`: mortgage-calculators.html
  - `url`: https://www.wellsfargo.com/auto-loans/, `title`: Auto loans and financing | Wells Fargo, `local_file`: auto-loans.html
  - `url`: https://www.wellsfargo.com/help/, `title`: Customer Service – Wells Fargo, `local_file`: help.html
  - `url`: https://www.wellsfargo.com/help/routing-number/, `title`: Routing & Account Number Information for Your Wells Fargo Accounts, `local_file`: help-routing.html
  - `url`: https://www.wellsfargo.com/about/, `title`: About Wells Fargo, `local_file`: about.html
  - `url`: https://www.wellsfargo.com/about/inclusion/, `title`: Inclusion and accessibility: Building an inclusive workplace | Wells Fargo, `local_file`: about-inclusion.html
- `key_regions`: Header with global navigation and language switch; Hero section with promotional tiles; Product category links (Checking, Savings, Mortgages, Auto); Educational content bands; Footer with sitemap, legal links, and social media.
- `key_interactions`:
  - `name`: Savings Rate Table, `observed`: observed (Table of rates on /savings-cds/rates/ page)
  - `name`: Mortgage Calculator, `observed`: observed (Calculator tools on /mortgage/calculators/ page)
  - `name`: Help Search, `observed`: observed (Search input on /help/ and /help/routing-number/ pages)
  - `name`: Branch Locator, `observed`: inferred (Link present in navigation (/locator/) but page not mapped)
- `complexity`: High (large byte counts, deep navigation structure, multiple product verticals)
- `stack_clues`: Server-rendered HTML, standard meta tags, no obvious client-side framework indicators in initial markup
- `limitations`: None. All 12 requested pages returned 200 status.

```json
{"rows": [{"source_id": "CORP-05", "subcategory": "national retail bank", "source_name": "Wells Fargo", "source_url": "https://www.wellsfargo.com", "verified_at": "2024-05-24 HTTP GET by the orchestrator", "verification_method": "HTTP GET by the orchestrator", "verification_result": "verified", "evidence_reference": "", "source_pages": [{"url": "https://www.wellsfargo.com", "title": "Wells Fargo Bank | Financial Services & Online Banking", "local_file": "index.html"}, {"url": "https://www.wellsfargo.com/checking/", "title": "Apply & Open a Checking Account Online Today | Wells Fargo", "local_file": "checking.html"}, {"url": "https://www.wellsfargo.com/checking/compare-checking-accounts/", "title": "Compare Checking Accounts | Wells Fargo", "local_file": "checking-compare.html"}, {"url": "https://www.wellsfargo.com/savings-cds/", "title": "Open a Savings Account Online | Wells Fargo", "local_file": "savings-cds.html"}, {"url": "https://www.wellsfargo.com/savings-cds/rates/", "title": "Savings and Certificate of Deposit (CD) Interest Rates | Wells Fargo", "local_file": "savings-rates.html"}, {"url": "https://www.wellsfargo.com/mortgage/", "title": "Home Mortgage Loans & Financing | Wells Fargo", "local_file": "mortgage.html"}, {"url": "https://www.wellsfargo.com/mortgage/calculators/", "title": "Mortgage Calculators | Wells Fargo", "local_file": "mortgage-calculators.html"}, {"url": "https://www.wellsfargo.com/auto-loans/", "title": "Auto loans and financing | Wells Fargo", "local_file": "auto-loans.html"}, {"url": "https://www.wellsfargo.com/help/", "title": "Customer Service – Wells Fargo", "local_file": "help.html"}, {"url": "https://www.wellsfargo.com/help/routing-number/", "title": "Routing & Account Number Information for Your Wells Fargo Accounts", "local_file": "help-routing.html"}, {"url": "https://www.wellsfargo.com/about/", "title": "About Wells Fargo", "local_file": "about.html"}, {"url": "https://www.wellsfargo.com/about/inclusion/", "title": "Inclusion and accessibility: Building an inclusive workplace | Wells Fargo", "local_file": "about-inclusion.html"}], "key_regions": ["Header with global navigation and language switch", "Hero section with promotional tiles", "Product category links (Checking, Savings, Mortgages, Auto)", "Educational content bands", "Footer with sitemap, legal links, and social media"], "key_interactions": [{"name": "Savings Rate Table", "evidence": "observed", "notes": "Table of rates on /savings-cds/rates/ page"}, {"name": "Mortgage Calculator", "evidence": "observed", "notes": "Calculator tools on /mortgage/calculators/ page"}, {"name": "Help Search", "evidence": "observed", "notes": "Search input on /help/ and /help/routing-number/ pages"}, {"name": "Branch Locator", "evidence": "inferred", "notes": "Link present in navigation (/locator/) but page not mapped"}], "complexity": "High", "stack_clues": "Server-rendered HTML, standard meta tags, no obvious client-side framework indicators in initial markup", "limitations": "None. All 12 requested pages returned 200 status."}]}
```
