# GOV-08 Replica

**Replica ID:** GOV-08  
**Category:** government  
**Fictional Branding:** MassGov (fictional Massachusetts State Government)  
**Approved Source:** Massachusetts State Government  
**Source URL:** https://www.mass.gov/  
**Verification Method:** HTTP GET by the orchestrator  
**Verification Date:** 2026-11-17  

## How to Open Locally
1. Download or clone the repository folder `government/open-source/GOV-08`.
2. Open `index.html` in any modern browser (Chrome, Firefox, Safari, Edge) using `file://` protocol.
3. No server is required; all demo data is inlined.

## Sitemap
- index.html (Home)
- health-social-services.html (Health & Social Services topic)
- families-children.html (Families & Children topic)
- transportation.html (Transportation topic)
- apply-unemployment-benefits.html (Apply for unemployment insurance benefits)
- renew-vehicle-registration.html (Renew your vehicle or trailer registration)
- search-court-dockets.html (Search Court Dockets, Calendars and Case Information)
- state-organizations-a-to-z.html (Massachusetts State Organizations A‑Z)
- 404.html (Page not found)

## Page-to-Source Mapping
| Local File | Source URL |
|------------|------------|
| index.html | https://www.mass.gov/ |
| health-social-services.html | https://www.mass.gov/topics/health-social-services |
| families-children.html | https://www.mass.gov/topics/families-children |
| transportation.html | https://www.mass.gov/topics/transportation |
| apply-unemployment-benefits.html | https://www.mass.gov/how-to/apply-for-unemployment-insurance-benefits |
| renew-vehicle-registration.html | https://www.mass.gov/how-to/renew-your-vehicle-or-trailer-registration |
| search-court-dockets.html | https://www.mass.gov/search-court-dockets-calendars-and-case-information |
| state-organizations-a-to-z.html | https://www.mass.gov/info-details/massachusetts-state-organizations-a-to-z |
| 404.html | (error page – not in source map) |

## Sample Dataset Row Counts
- `servicesList`: 12 service items (used in topic pages and search)
- `orgsAtoZ`: 45 Massachusetts state organizations (used in A‑to‑Z page)
- `unemploymentSteps`: 6 steps (apply‑unemployment-benefits.html)
- `vehicleRegSteps`: 5 steps (renew‑vehicle‑registration.html)
- `courtDocketSample`: 8 mock docket entries (search‑court‑dockets.html)
- `alertMessages`: 3 rotating demo alerts (alert banner)

## Interaction and Simulation Notes
- **Service/Department Search:** Implemented as client‑side filtering of `servicesList`; no backend.
- **Alerts:** Demo banner shows rotating messages; dismissible with focus management.
- **Calendar Navigation:** Simple month‑picker demo (previous/next) on application and renewal pages; no real date logic.
- **Report‑a‑Problem Form:** Demo form with client‑side validation, error summary, and success toast (all non‑functional).
- **Language Control:** Demo selector (English/Spanish) that changes placeholder text only; marked as intentional addition (category allows language control only if observed; we added a clearly labeled demo).
- No real transactions, submissions, or account actions are implied.

## Quality Control Gates (Rules.md section 9)
| Gate | Status |
|------|--------|
| 1. HTML5 validity | not-tested |
| 2. CSS3 validity | not-tested |
| 3. No prohibited dependencies | not-tested |
| 4. Accessible name and description | not-tested |
| 5. Keyboard operability | not-tested |
| 6. Color contrast and non‑color signals | not-tested |
| 7. Reduced motion respect | not-tested |

## What Was Not Tested
- Screen reader verification (unless otherwise informed by orchestrator)
- Manual keyboard walkthroughs beyond basic tab order
- Non‑Chromium browser compatibility (e.g., Firefox, Safari) beyond basic opening
- Zoom responsiveness beyond 375px width test
- Live server deployment (all content is static file://)

---
*This replica is built for research purposes only. All branding, text, and data are fictional or simulated.*  
