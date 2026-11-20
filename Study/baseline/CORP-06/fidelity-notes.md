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
- The three unverified pages (`smallbusiness`, `student‑banking`, `checking` source) lack confirmation that their structure matches the live site; they are built to the same pattern as verified pages.  

---  
*All deviations are documented above; no undocumented changes were made.*  
