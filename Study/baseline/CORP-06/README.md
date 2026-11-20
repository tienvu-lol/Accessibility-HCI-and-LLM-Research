# NovaBank – Static Replica (Slot 10, CORP‑10)

**Replica ID:** `company/open-source/CORP-06`  
**Category:** Banking and technology companies (company)  
**Fictional brand:** NovaBank (all text, images, and data are invented)  

## Source information
- **Approved source name:** Bank of America  
- **Source URL:** https://www.bankofamerica.com/  
- **Verified at:** 2026‑11‑17 (HTTP GET by orchestrator)  
- **Verification method:** HTTP GET, result *verified* (see `evidence_reference` in task)  

## How to open locally
1. Clone or copy the repository preserving the directory structure.  
2. Open any `.html` file in a browser via `file://` (e.g., double‑click `index.html`).  
3. No server, no network requests are required.

## Sitemap (local files → source URL)
| Local file | Source URL (approved) |
|------------|-----------------------|
| `index.html` | https://www.bankofamerica.com/ |
| `checking-index.html` | https://www.bankofamerica.com/deposits/checking/checking-accounts/ |
| `savings-index.html` | https://www.bankofamerica.com/deposits/savings/savings-accounts/ |
| `credit-cards-index.html` | https://www.bankofamerica.com/credit-cards/ |
| `mortgage-index.html` | https://www.bankofamerica.com/mortgage/home-mortgage/ |
| `auto-loans-index.html` | https://www.bankofamerica.com/auto-loans/ |
| `smallbusiness-index.html` | https://www.bankofamerica.com/smallbusiness/ |
| `student-banking-index.html` | https://www.bankofamerica.com/student-banking/ |
| `help-index.html` | https://www.bankofamerica.com/help/overview/ |
| `contact-us-index.html` | https://www.bankofamerica.com/customer-service/contact-us/ |
| `404.html` | (fallback for missing pages) |

## Sample datasets (inline in `js/main.js`)
- **Rate table** – 5 rows (term, rate, APR) used by mortgage & auto‑loan calculators.  
- **Branch locator** – 3 rows (name, address, distance).  
- **Account‑opening options** – 4 rows per product (illustrative only).  

## Interactions implemented
- **Branch/ATM locator** (home page) – search box, live results.  
- **Loan calculators** (mortgage & auto‑loan pages) – amount + term → estimated monthly payment.  
- **Account opening forms** (checking & savings) – required‑field validation, error summary, demo success message.  
- **Help search** – input → “No results found” placeholder.  
- **Contact form** – required‑field validation, demo success message.  

All interactions are **simulated**; no data is sent anywhere.

## QC Gates (Rules.md §9) – status (to be filled by orchestrator)
| Gate | Status |
|------|--------|
| 1. File structure | not‑tested |
| 2. HTML validity | not‑tested |
| 3. CSS compliance | not‑tested |
| 4. JS syntax | not‑tested |
| 5. Accessibility basics | not‑tested |
| 6. Data‑attributes present | not‑tested |
| 7. No external resources | not‑tested |

## What was not tested
- Browser‑specific quirks (e.g., Safari).  
- Automated accessibility audit tools (WCAG 2.2 AA).  

---  
*All content is original and does not infringe any trademark or copyright.*  
=== STATUS: CONTINUE ===

=== FILE: fidelity-notes.md ===
# Fidelity Notes – NovaBank Replica (CORP‑10)

## General approach
- Reproduced the **information architecture**, **navigation**, **hero banner**, and **footer** observed in the approved source.
- All textual content, images, and data are **invented**; no real brand material is used.
- Where the source markup was **unverified** (three URLs), placeholder pages were created that follow the same layout pattern and are marked as *unverified* in this document.

## Page‑by‑page notes

| Page | Replicated | Approximated / Simulated | Unverified / Omitted | Reason / Comment |
|------|------------|--------------------------|----------------------|------------------|
| `index.html` | Header, nav, hero, footer, branch locator widget | Branch locator (simulated with inline data) | – | Layout matches observed header/footer; branch search inferred. |
| `checking-index.html` | Header, nav, hero, footer, form layout | Account opening form (simulated) | – | Form not present in source markup; added as inferred interaction. |
| `savings-index.html` | Same as checking | Account opening form (simulated) | – | Same reasoning as checking. |
| `credit-cards-index.html` | Header, nav, hero, footer, list of cards | Card list is placeholder (no real product data) | – | No detailed markup in source; reproduced structure only. |
| `mortgage-index.html` | Header, nav, hero, footer | Mortgage calculator (simulated) | – | Calculator inferred from “loan calculator” interaction note. |
| `auto-loans-index.html` | Header, nav, hero, footer | Auto‑loan calculator (simulated) | – | Same inference as mortgage. |
| `smallbusiness-index.html` | Header, nav, hero, footer | Service list (placeholder) | **Unverified** | Source page could not be fetched; layout follows observed pattern. |
| `student-banking-index.html` | Header, nav, hero, footer | Product list (placeholder) | **Unverified** | Source page could not be fetched; created placeholder. |
| `help-index.html` | Header, nav, hero, footer | Help search box (simulated) | – | Search inferred; no markup in source. |
| `contact-us-index.html` | Header, nav, hero, footer | Contact form (simulated) | – | Form inferred from “contact form” interaction note. |
| `404.html` | Standard fallback page | – | – | Added for completeness; not part of source map. |

## Components inventory
- `site-header` – present on every page.  
- `primary-nav` – same links across pages; data‑component consistent.  
- `hero-banner` – unique per page, contains a single `<h1>`.  
- `content-band` – wraps main content area.  
- `branch-locator` – home page only.  
- `account-opening-form` – checking & savings pages.  
- `loan-calculator` – mortgage & auto‑loan pages.  
- `help-search` – help page.  
- `contact-form` – contact page.  
- `site-footer` – present on every page.

All components are tagged with `data-section` (page region) and `data-component` (stable kebab‑case). No `data-instance` needed because each component appears only once per page.

## Intentional additions
- **Skip‑to‑content link** – required WCAG baseline, not present in source markup.  
- **Error summary** and inline error spans for all demo forms – added to meet accessibility requirements.  
- **404 page** – not in source map but required for a complete static site.

## Omissions / Limitations
- No real images or brand logos; a placeholder SVG (`assets/logo.svg`) is used.  
- No real loan rate tables, branch data, or product specifications – all are fabricated demo data.  
- No server‑side processing; all interactions are client‑side only.  
- The three unverified pages (`smallbusiness`, `student-banking`, `checking` source) lack confirmation that their structure matches the live site; they are built to the same pattern as verified pages.  

---  
*All deviations are documented above; no undocumented changes were made.*  
=== STATUS: CONTINUE ===

=== FILE: component-inventory.json ===
{
  "components": [
    {
      "name": "site-header",
      "selector": "header[data-component=\"site-header\"]",
      "pages": [
        "index.html",
        "checking-index.html",
        "savings-index.html",
        "credit-cards-index.html",
        "mortgage-index.html",
        "auto-loans-index.html",
        "smallbusiness-index.html",
        "student-banking-index.html",
        "help-index.html",
        "contact-us-index.html",
        "404.html"
      ],
      "behaviors": ["contains logo image", "contains primary navigation"],
      "keyboard": ["Tab navigation through logo and nav links"],
      "status": "implemented"
    },
    {
      "name": "primary-nav",
      "selector": "nav[data-component=\"primary-nav\"]",
      "pages": [
        "index.html",
        "checking-index.html",
        "savings-index.html",
        "credit-cards-index.html",
        "mortgage-index.html",
        "auto-loans-index.html",
        "smallbusiness-index.html",
        "student-banking-index.html",
        "help-index.html",
        "contact-us-index.html",
        "404.html"
      ],
      "behaviors": ["list of internal links"],
      "keyboard": ["Arrow keys not required; standard tab order"],
      "status": "implemented"
    },
    {
      "name": "hero-banner",
      "selector": "[data-component=\"hero-banner\"]",
      "pages": [
        "index.html",
        "checking-index.html",
        "savings-index.html",
        "credit-cards-index.html",
        "mortgage-index.html",
        "auto-loans-index.html",
        "smallbusiness-index.html",
        "student-banking-index.html",
        "help-index.html",
        "contact-us-index.html",
        "404.html"
      ],
      "behaviors": ["contains page‑specific <h1> and tagline"],
      "keyboard": [],
      "status": "implemented"
    },
    {
      "name": "content-band",
      "selector": "[data-component=\"content-band\"]",
      "pages": [
        "index.html",
        "checking-index.html",
        "savings-index.html",
        "credit-cards-index.html",
        "mortgage-index.html",
        "auto-loans-index.html",
        "smallbusiness-index.html",
        "student-banking-index.html",
        "help-index.html",
        "contact-us-index.html",
        "404.html"
      ],
      "behaviors": ["wraps main content"],
      "keyboard": [],
      "status": "implemented"
    },
    {
      "name": "branch-locator",
      "selector": "form[data-component=\"branch-locator\"]",
      "pages": ["index.html"],
      "behaviors": ["search input filters static branch list"],
      "keyboard": ["Enter key submits form; focus moves to results"],
      "status": "implemented"
    },
    {
      "name": "account-opening-form",
      "selector": "form[data-component=\"account-opening-form\"]",
      "pages": ["checking-index.html", "savings-index.html"],
      "behaviors": ["client‑side required field validation, error summary"],
      "keyboard": ["Tab navigation, Escape does not close (no dialog)"],
      "status": "implemented"
    },
    {
      "name": "loan-calculator",
      "selector": "form[data-component=\"loan-calculator\"]",
      "pages": ["mortgage-index.html", "auto-loans-index.html"],
      "behaviors": ["calculates mock monthly payment using static rate table"],
      "keyboard": ["Enter submits; results announced via aria‑live"],
      "status": "implemented"
    },
    {
      "name": "help-search",
      "selector": "form[data-component=\"help-search\"]",
      "pages": ["help-index.html"],
      "behaviors": ["displays placeholder no‑results message"],
      "keyboard": ["Enter submits; results announced via aria‑live"],
      "status": "implemented"
    },
    {
      "name": "contact-form",
      "selector": "form[data-component=\"contact-form\"]",
      "pages": ["contact-us-index.html"],
      "behaviors": ["required field validation, error summary, demo success message"],
      "keyboard": ["Tab navigation, Enter submits"],
      "status": "implemented"
    },
    {
      "name": "site-footer",
      "selector": "footer[data-component=\"site-footer\"]",
      "pages": [
        "index.html",
        "checking-index.html",
        "savings-index.html",
        "credit-cards-index.html",
        "mortgage-index.html",
        "auto-loans-index.html",
        "smallbusiness-index.html",
        "student-banking-index.html",
        "help-index.html",
        "contact-us-index.html",
        "404.html"
      ],
      "behaviors": ["copyright notice"],
      "keyboard": [],
      "status": "implemented"
    }
  ]
}
