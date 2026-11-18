# Commonwealth Services Replica

**Replica ID:** GOV-08  
**Category:** government  
**Fictional Branding:** Commonwealth Services  
**Approved Source:** Massachusetts State Government (https://www.mass.gov/)  
**Verification Method:** HTTP GET by the orchestrator  
**Verification Date:** 2026-11-17  

## How to Open Locally
1. Download the entire site directory.
2. Open `index.html` in any modern browser (Chrome, Firefox, Safari, Edge) – no server required.
3. Navigate via the navigation menu or links.

## Sitemap
- index.html (Home)
- health-social-services.html (Health & Social Services)
- families-children.html (Families & Children)
- transportation.html (Transportation)
- apply-unemployment-benefits.html (Apply for Unemployment Benefits)
- renew-vehicle-registration.html (Renew Vehicle Registration)
- search-court-dockets.html (Search Court Dockets)
- state-organizations-a-to-z.html (State Organizations A–Z)
- 404.html (Page Not Found)

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
| 404.html | (error page – not in source) |

## Sample Dataset Row Counts
- Homepage hero featured topics: 3 items
- Health & Social Services subtopics: 5 items
- Families & Children programs: 4 items
- Transportation services: 3 items
- Organizations directory: 20 items
- Court docket search results: 6 mock entries

## Interaction and Simulation Notes
- **Skip link & focus management:** WCAG baseline, present on every page.
- **Responsive navigation toggle:** Vanilla JS expands/collapses primary-nav on ≤375 px, manages `aria-expanded`, returns focus on Escape.
- **Organization list filter:** Intentional addition – client‑side text search that filters the 20‑item organization list in real time (no evidence in source, provides usable demo).
- **Demo form feedback:** Forms on Apply for Unemployment Benefits and Renew Vehicle Registration pages are functional (native inputs, labels, buttons) and on submit show an accessible success message (`role="alert"`); clearly labeled as simulation – no data is sent.
- **Court docket demo data:** Table populated with sample rows via JavaScript (intentional addition for demonstration).
- **Alerts, calendar navigation, language selector, report‑a‑problem form:** Not observed in source; omitted and marked unverified.

## Quality Control Gates (Rules.md Section 9)
| Gate | Status |
|------|--------|
| 1. HTML5 validity | not-tested |
| 2. CSS3 validity | not-tested |
| 3. No prohibited dependencies | not-tested |
| 4. Responsive reflow @375px | not-tested |
| 5. Keyboard accessibility | not-tested |
| 6. WCAG 2.2 AA baseline (color, focus, landmarks, etc.) | not-tested |
| 7. File protocol compliance (relative paths, no network) | not-tested |

## What Was Not Tested
- Screen reader verification (unless otherwise informed by orchestrator)
- Manual zoom testing
- Non‑Chromium browser testing
- Actual QC execution (the orchestrator will run the shared QC tool and report results)

---  
*This replica is intended for research use only. No real logos, trademarks, or copyrighted content from the source site has been used.*  
