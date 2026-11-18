# Community Health Center Replica (HOSP-08)

**Replica ID:** healthcare/open-source/HOSP-08  
**Category:** healthcare  
**Slot:** 8  
**Fictional Branding:** Community Health Center  
**Approved Source:** Mercy Medical Center (https://www.mercy.com/)  
**Verification Method:** HTTP GET by the orchestrator  
**Verification Date:** 2026-11-17  

## How to Open Locally
1. Download or clone the repository folder containing this replica.
2. Open `index.html` in any modern browser (Chrome, Firefox, Safari, Edge) – no server required.
3. Navigate via the navigation menu or directly open other `.html` files.

## Full Sitemap
- index.html (home)
- get-care-now.html (appointment inquiry)
- pay-a-bill.html (billing/insurance)
- find-a-doctor.html (provider listing – all specialties)
- find-a-doctor-primary-care.html (provider listing – primary care)
- health-care-services.html (services overview)
- conditions-and-treatments.html (conditions and treatments)
- location-map.html (location map with filter)
- locations-hospitals.html (hospital list)
- patient-resources.html (patient and visitor information)
- 404.html (not found)

## Page-to-Source Mapping
| Local File | Source URL | Notes |
|------------|------------|-------|
| index.html | https://www.mercy.com/ | Home page |
| get-care-now.html | https://www.mercy.com/get-care-now | Appointment request page |
| pay-a-bill.html | https://www.mercy.com/pay-a-bill | Bill pay page |
| find-a-doctor.html | https://www.mercy.com/find-a-doctor | Physician search (unfiltered) |
| find-a-doctor-primary-care.html | https://www.mercy.com/find-a-doctor?displayValue=Primary%20Care%20Providers&page=1&primary_care=Primary%20Care%20Providers&shuffle_seed=cc2dc033-78de-4d3e-acb9-cb48ed7f5c63&sort=networks%2Cdistance%2Cavailability_soonest%2Crelevance | Filtered to primary care |
| health-care-services.html | https://www.mercy.com/health-care-services | Services & specialties |
| conditions-and-treatments.html | https://www.mercy.com/conditions-and-treatments | Conditions and treatments |
| location-map.html | https://www.mercy.com/location-map | Location map |
| locations-hospitals.html | https://www.mercy.com/locations/hospitals | Hospital locations |
| patient-resources.html | https://www.mercy.com/patient-resources | Patient information |
| 404.html | (generic) | Not found page |

## Sample Dataset Row Counts
- Doctors: 12 records
- Services: 8 records
- Locations (clinics): 6 records
- Hospitals: 4 records
- Insurance Plans: 4 records
- Patient Resources: 5 records

## Interaction and Simulation Notes
- **Doctor filter:** Implemented client‑side filtering on the provider listing pages; typing filters by name or specialty; Escape clears the filter.
- **Location filter:** Dropdown filter on location-map.html and locations-hospitals.html filters by city/downtown etc.
- **Service navigation:** Service bands on home and services page act as accessible accordions (Enter/Space to toggle).
- **Appointment‑request validation:** Form on get-care-now.html provides inline errors, error summary, and focus management; submission shows a simulated alert (no real booking).
- **Billing/insurance information:** Button on pay-a-bill.html opens a modal listing accepted insurance plans (simulated data).
- All interactions use only vanilla JavaScript and work over `file://`.
- No real health advice, appointment scheduling, or transaction processing is simulated; all data is fictional.

## QC Gates (Rules.md Section 9) – as reported by the orchestrator after validation
| Gate | Status |
|------|--------|
| 1. HTML5 validity | not-tested |
| 2. CSS2/3 validity | not-tested |
| 3. No JavaScript errors | not-tested |
| 4. WCAG 2.2 AA baseline (manual checks) | not-tested |
| 5. Responsive reflow @ 375px | not-tested |
| 6. prefers-reduced-motion respected | not-tested |
| 7. No inaccessible remote resources | not-tested |

## What Was Not Tested
- Screen reader verification (unless explicitly reported by orchestrator)
- Manual keyboard walkthroughs beyond basic tab order
- Non‑Chromium browser compatibility (e.g., Firefox, Safari) beyond the orchestrator’s report
- Zoom scaling beyond 200%
- Any interactive component requiring a network or backend (all interactions are client‑side only)

---  
*End of README*  
