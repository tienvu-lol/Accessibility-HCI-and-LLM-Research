# CORP-08 — open-source source research (slot 08)

- **Run:** `2026-11-17T05-09-03-841Z-research-CORP-08`
- **Scope:** partial — this file covers CORP-08 only. The rest of the category is researched separately.
- **Research model:** unsloth/NVIDIA-Nemotron-3-Super-120B-A12B-GGUF (vt-arc-falcon-llamacpp, nvidia-nemotron-open-model-license, open weights) declared for slot 08
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 3/3 candidate homepages and 11/11 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/CORP-08-http-2026-11-17.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### CORP-08
source_id: CORP-08
subcategory: regional bank or credit union
source_name: First Horizon Bank
official_url: https://www.firsthorizon.com/
verified_at: 
verification_result: verified
source_pages:
- url: https://www.firsthorizon.com/
  title: First Horizon Bank - A Trusted Choice for Financial Services
  local_file: index.html
- url: https://www.firsthorizon.com/first-horizon-corporation
  title: First Horizon Corporation
  local_file: about.html
- url: https://www.firsthorizon.com/learning-center
  title: Learning Center - First Horizon Bank
  local_file: learning.html
- url: https://www.firsthorizon.com/personal/support/contact-us
  title: Find a Bank or ATM - First Horizon Bank
  local_file: contact.html
- url: https://www.firsthorizon.com/personal/support
  title: Support - First Horizon Bank
  local_file: support.html
- url: https://www.firsthorizon.com/personal/checking-and-savings
  title: Banking With First Horizon Bank - First Horizon Bank
  local_file: checking.html
- url: https://www.firsthorizon.com/personal/personal-loans
  title: Borrowing, lending and credit solutions - First Horizon Bank
  local_file: loans.html
- url: https://www.firsthorizon.com/personal/digital-banking
  title: Online and Digital Banking - First Horizon Bank
  local_file: digital.html
- url: https://www.firsthorizon.com/personal/support/calculators
  title: Money Management Calculators - First Horizon Bank
  local_file: calculators.html
- url: https://www.firsthorizon.com/first-horizon-corporation/Careers
  title: Careers – First Horizon
  local_file: careers.html
key_regions:
- header (inferred)
- navigation (observed)
- hero (inferred)
- content band: product listings (observed via checking/savings, loans, digital banking)
- content band: educational resources (observed via learning center)
- sidebar (not observed)
- footer groups (inferred)
key_interactions:
- name: sample rate table
  evidence: inferred
  notes: Typical regional bank site includes rate tables; not seen in fetched markup.
- name: loan calculator
  evidence: observed
  notes: Calculators page shows various loan and mortgage calculators.
- name: branch search
  evidence: inferred
  notes: Contact‑us page offers “Find a Bank or ATM” indicating a branch locator.
- name: contact inquiry
  evidence: inferred
  notes: Contact‑us page likely contains a form for inquiries.
complexity: medium
rationale: Multiple top‑level sections (personal, business, wealth, learning, support, careers) with distinct product listings, calculators, and educational content.
stack_clues: unknown
limitations: Login page (personal/login) returns 200 but is behind authentication and was excluded; some deeper product detail pages were not requested; verification date not provided in evidence.

```json
{"rows": [{"source_id": "CORP-08", "subcategory": "regional bank or credit union", "source_name": "First Horizon Bank", "source_url": "https://www.firsthorizon.com/", "verified_at": "", "verification_method": "HTTP GET by the orchestrator", "verification_result": "verified", "evidence_reference": "", "source_pages": [{"url": "https://www.firsthorizon.com/", "title": "First Horizon Bank - A Trusted Choice for Financial Services", "local_file": "index.html"}, {"url": "https://www.firsthorizon.com/first-horizon-corporation", "title": "First Horizon Corporation", "local_file": "about.html"}, {"url": "https://www.firsthorizon.com/learning-center", "title": "Learning Center - First Horizon Bank", "local_file": "learning.html"}, {"url": "https://www.firsthorizon.com/personal/support/contact-us", "title": "Find a Bank or ATM - First Horizon Bank", "local_file": "contact.html"}, {"url": "https://www.firsthorizon.com/personal/support", "title": "Support - First Horizon Bank", "local_file": "support.html"}, {"url": "https://www.firsthorizon.com/personal/checking-and-savings", "title": "Banking With First Horizon Bank - First Horizon Bank", "local_file": "checking.html"}, {"url": "https://www.firsthorizon.com/personal/personal-loans", "title": "Borrowing, lending and credit solutions - First Horizon Bank", "local_file": "loans.html"}, {"url": "https://www.firsthorizon.com/personal/digital-banking", "title": "Online and Digital Banking - First Horizon Bank", "local_file": "digital.html"}, {"url": "https://www.firsthorizon.com/personal/support/calculators", "title": "Money Management Calculators - First Horizon Bank", "local_file": "calculators.html"}, {"url": "https://www.firsthorizon.com/first-horizon-corporation/Careers", "title": "Careers – First Horizon", "local_file": "careers.html"}], "key_regions": ["header (inferred)", "navigation (observed)", "hero (inferred)", "content band: product listings (observed)", "content band: educational resources (observed)", "sidebar (not observed)", "footer groups (inferred)"], "key_interactions": [{"name": "sample rate table", "evidence": "inferred", "notes": "Typical regional bank site includes rate tables; not seen in fetched markup."}, {"name": "loan calculator", "evidence": "observed", "notes": "Calculators page shows various loan and mortgage calculators."}, {"name": "branch search", "evidence": "inferred", "notes": "Contact‑us page offers “Find a Bank or ATM” indicating a branch locator."}, {"name": "contact inquiry", "evidence": "inferred", "notes": "Contact‑us page likely contains a form for inquiries."}], "complexity": "medium", "stack_clues": "unknown", "limitations": "Login page (personal/login) returns 200 but is behind authentication and was excluded; some deeper product detail pages were not requested; verification date not provided in evidence."}]}
```
