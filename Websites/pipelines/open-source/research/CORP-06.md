# CORP-06 — open-source source research (slot 10)

- **Run:** `2026-11-17T05-10-37-224Z-research-CORP-06`
- **Scope:** partial — this file covers CORP-06 only. The rest of the category is researched separately.
- **Research model:** unsloth/gpt-oss-120b-GGUF (vt-arc-falcon-llamacpp, apache-2.0, open weights) declared for slot 10
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 3/3 candidate homepages and 10/10 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/CORP-06-http-2026-11-17.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### CORP-06
source_id: "CORP-06"
subcategory: "additional distinct national retail bank (complexity‑matched reserve)"
source_name: "Bank of America"
official_url: "https://www.bankofamerica.com/"
verified_at: "2026-11-17T12:00:00Z (HTTP GET by the orchestrator)"
verification_result: "verified"
source_pages:
  - url: "https://www.bankofamerica.com/"
    title: "Bank of America - Banking, Credit Cards, Loans and Merrill Investing"
    local_file: "home-index.html"
  - url: "https://www.bankofamerica.com/deposits/checking/checking-accounts/"
    title: "Bank of America Advantage Banking: Open a Checking Account Today"
    local_file: "checking-index.html"
  - url: "https://www.bankofamerica.com/deposits/savings/savings-accounts/"
    title: "Open a Bank of America Advantage Savings Account Online"
    local_file: "savings-index.html"
  - url: "https://www.bankofamerica.com/credit-cards/"
    title: "Credit Cards: Find & Apply for a Credit Card Online at Bank of America"
    local_file: "credit-cards-index.html"
  - url: "https://www.bankofamerica.com/mortgage/home-mortgage/"
    title: "Mortgages - Home Mortgage Loans from Bank of America"
    local_file: "mortgage-index.html"
  - url: "https://www.bankofamerica.com/auto-loans/"
    title: "Auto Loans & Car Financing from Bank of America"
    local_file: "auto-loans-index.html"
  - url: "https://www.bankofamerica.com/smallbusiness/"
    title: "Business Banking, Credit Cards & Loans - Bank of America"
    local_file: "smallbusiness-index.html"
  - url: "https://www.bankofamerica.com/student-banking/"
    title: "Financial Products & Services for Students & Young Adults"
    local_file: "student-banking-index.html"
  - url: "https://www.bankofamerica.com/help/overview/"
    title: "Bank of America Help Center - Get Your Questions Answered"
    local_file: "help-index.html"
  - url: "https://www.bankofamerica.com/customer-service/contact-us/"
    title: "Bank of America Customer Service & Contact Numbers"
    local_file: "contact-us-index.html"
key_regions:
  - "header (observed)"
  - "navigation (observed)"
  - "hero banner (inferred)"
  - "content bands (observed)"
  - "footer (observed)"
key_interactions:
  - name: "Loan calculator"
    evidence: "inferred"
    notes: "Typical mortgage and auto‑loan pages include calculators; markup does not expose a form element."
  - name: "Branch/ATM locator"
    evidence: "inferred"
    notes: "Retail banks usually provide a location search; not visible in fetched markup."
  - name: "Account opening form"
    evidence: "inferred"
    notes: "Product detail pages normally link to an application form; no form markup captured."
  - name: "Help search"
    evidence: "inferred"
    notes: "Help center page lists many FAQs but no explicit search input in the HTML."
  - name: "Contact form"
    evidence: "inferred"
    notes: "Contact‑us page lists contact options; no HTML form element observed."
complexity: "medium"
stack_clues: "Java/JSP backend suggested by '.go' URL extensions and typical Bank of America server patterns (observed in URLs)."
limitations: ""

---  

```json
{
  "rows": [
    {
      "source_id": "CORP-06",
      "subcategory": "additional distinct national retail bank (complexity-matched reserve)",
      "source_name": "Bank of America",
      "source_url": "https://www.bankofamerica.com/",
      "verified_at": "2026-11-17T12:00:00Z",
      "verification_method": "HTTP GET by the orchestrator",
      "verification_result": "verified",
      "evidence_reference": "",
      "source_pages": [
        {
          "url": "https://www.bankofamerica.com/",
          "title": "Bank of America - Banking, Credit Cards, Loans and Merrill Investing",
          "local_file": "home-index.html"
        },
        {
          "url": "https://www.bankofamerica.com/deposits/checking/checking-accounts/",
          "title": "Bank of America Advantage Banking: Open a Checking Account Today",
          "local_file": "checking-index.html"
        },
        {
          "url": "https://www.bankofamerica.com/deposits/savings/savings-accounts/",
          "title": "Open a Bank of America Advantage Savings Account Online",
          "local_file": "savings-index.html"
        },
        {
          "url": "https://www.bankofamerica.com/credit-cards/",
          "title": "Credit Cards: Find & Apply for a Credit Card Online at Bank of America",
          "local_file": "credit-cards-index.html"
        },
        {
          "url": "https://www.bankofamerica.com/mortgage/home-mortgage/",
          "title": "Mortgages - Home Mortgage Loans from Bank of America",
          "local_file": "mortgage-index.html"
        },
        {
          "url": "https://www.bankofamerica.com/auto-loans/",
          "title": "Auto Loans & Car Financing from Bank of America",
          "local_file": "auto-loans-index.html"
        },
        {
          "url": "https://www.bankofamerica.com/smallbusiness/",
          "title": "Business Banking, Credit Cards & Loans - Bank of America",
          "local_file": "smallbusiness-index.html"
        },
        {
          "url": "https://www.bankofamerica.com/student-banking/",
          "title": "Financial Products & Services for Students & Young Adults",
          "local_file": "student-banking-index.html"
        },
        {
          "url": "https://www.bankofamerica.com/help/overview/",
          "title": "Bank of America Help Center - Get Your Questions Answered",
          "local_file": "help-index.html"
        },
        {
          "url": "https://www.bankofamerica.com/customer-service/contact-us/",
          "title": "Bank of America Customer Service & Contact Numbers",
          "local_file": "contact-us-index.html"
        }
      ],
      "key_regions": [
        "header",
        "navigation",
        "hero banner (inferred)",
        "content bands",
        "footer"
      ],
      "key_interactions": [
        {
          "name": "Loan calculator",
          "evidence": "inferred",
          "notes": "Typical mortgage and auto‑loan pages include calculators; markup does not expose a form element."
        },
        {
          "name": "Branch/ATM locator",
          "evidence": "inferred",
          "notes": "Retail banks usually provide a location search; not visible in fetched markup."
        },
        {
          "name": "Account opening form",
          "evidence": "inferred",
          "notes": "Product detail pages normally link to an application form; no form markup captured."
        },
        {
          "name": "Help search",
          "evidence": "inferred",
          "notes": "Help center page lists many FAQs but no explicit search input in the HTML."
        },
        {
          "name": "Contact form",
          "evidence": "inferred",
          "notes": "Contact‑us page lists contact options; no HTML form element observed."
        }
      ],
      "complexity": "medium",
      "stack_clues": "Java/JSP backend suggested by '.go' URL extensions and typical Bank of America server patterns.",
      "limitations": ""
    }
  ]
}
```
