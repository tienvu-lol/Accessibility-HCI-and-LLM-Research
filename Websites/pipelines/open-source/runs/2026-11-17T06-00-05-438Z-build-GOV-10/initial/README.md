# Civic Harbor – Government Site Replica (GOV‑10)

**Replica ID:** GOV‑10  
**Category:** government (Public and government)  
**Fictional organization:** Civic Harbor (a placeholder municipal government)  

**Approved source**  
- **Source name:** City of San Diego  
- **Source URL:** https://www.sandiego.gov/  
- **Verified at:** 2026‑11‑17 (HTTP GET by the orchestrator)  
- **Verification method:** HTTP GET (no rendering)  

**How to open locally**  
1. Clone or copy the repository folder.  
2. Open `index.html` in a browser (file:// protocol).  
3. All links are relative; no server is required.

## Sitemap (local files)

| Local file                | Source page (original)                                            |
|---------------------------|-------------------------------------------------------------------|
| `index.html`              | Home page (https://www.sandiego.gov/)                             |
| `parks-and-recreation.html` | Parks and Recreation (https://www.sandiego.gov/parks-and-recreation) |
| `park-permits.html`       | Park Use Permits (https://www.sandiego.gov/park-and-recreation/parks/permits) |
| `pothole-repair.html`    | Street Resurfacing & Pothole Repair (https://www.sandiego.gov/street-div/services/street-resurfacing-pothole-repair) |
| `pay-bill.html`           | Pay Your Bill (https://www.sandiego.gov/public-utilities/customer-support/pay-your-bill) |
| `complaint-form.html`     | File a Complaint (https://www.sandiego.gov/cpp/filing/complaint-form) |
| `404.html`                | Not‑found page (static)                                           |

## Sample dataset row counts (inline in `js/main.js`)

- Parks list: 5 rows  
- Permit types: 5 rows  
- Pothole issues: 5 rows  
- Payment methods: 5 rows  
- Complaint categories: 5 rows  

## Interactions & simulations

| Interaction | Implemented? | Notes |
|-------------|---------------|-------|
| Search (client‑side filter) | Yes (inferred) | Works on park list and pothole issue list |
| Alerts (dismissible) | Yes (inferred) | Simple banner on home page |
| Calendar navigation | Yes (observed) | Links to placeholder `events.html` (not included) |
| Report‑a‑problem form | Yes (observed) | Demo form with validation, error summary |
| Language control | Yes (observed) | Toggles between English and Spanish placeholder text |
| Payment form | Yes (observed) | Demo form; submission shows static success message |
| Skip link | Yes | First focusable element |
| Keyboard Escape to close alerts | Yes | Returns focus to trigger (if any) |

All interactive elements are clearly labeled as demos; no real transactions or data submissions occur.

## QC Gates (Rules.md §9)

| Gate | Status |
|------|--------|
| 1. HTML validity | not‑tested |
| 2. CSS validity | not‑tested |
| 3. WCAG 2.2 AA baseline | not‑tested |
| 4. Data‑section/component tagging | not‑tested |
| 5. No external resources | not‑tested |
| 6. No real backend calls | not‑tested |
| 7. File‑structure compliance | not‑tested |

*The orchestrator will set the final results.*

---

*This replica is for research purposes only and does not represent an official municipal website.*  
