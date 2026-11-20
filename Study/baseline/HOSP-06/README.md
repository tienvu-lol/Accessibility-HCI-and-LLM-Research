# Fictional Health Center – Replica HOSP‑10

**Replica ID:** HOSP‑10  
**Category:** healthcare (Hospitals and healthcare)  
**Fictional organization:** *Fictional Health Center* (all branding, logos, and text are invented)  

**Approved source:** Mayo Clinic – https://www.mayoclinic.org  
**Verification method:** HTTP GET by the orchestrator (verified 2026‑11‑17)  

## How to open locally
1. Clone or copy the repository folder.  
2. Open any HTML file (e.g., `index.html`) in a web browser via `file://` URL.  
3. All assets are relative; no server is required.

## Sitemap (approved page map)
| Local file | Approx. source page title |
|------------|---------------------------|
| `index.html` | Home |
| `appointments.html` | Appointments |
| `find-a-doctor.html` | Doctors and Medical Staff |
| `locations.html` | U.S. and International Locations |
| `patient-visitor-guide.html` | Patient and Visitor Guide |
| `billing-insurance.html` | Billing and Insurance |
| `departments-centers.html` | Medical departments and centers |
| `diseases-conditions.html` | Medical Diseases & Conditions |
| `brain-tumor.html` | Brain tumor – Care at Mayo Clinic |
| `404.html` | 404 error page |

## Sample dataset row counts
- Doctors: **5** rows (name, specialty, location, placeholder image)  
- Locations: **5** rows (facility name, city, state, placeholder image)  
- Diseases: **6** rows (name, brief description, placeholder icon)  
- Brain‑tumor detail: **1** record (static placeholder content)

## Interactions & simulations
| Interaction (observed / inferred) | Pages implementing | Notes |
|-----------------------------------|--------------------|-------|
| Doctor and location filters | `find-a-doctor.html`, `locations.html` | Simulated filter UI; client‑side JS updates card grids. |
| Service navigation | All pages | Header navigation links; skip link; ARIA landmarks. |
| Appointment‑request validation | `appointments.html` | Client‑side validation with error summary; demo alert on success. |
| Billing/insurance information | `billing-insurance.html` | Static informational sections (observed). |

## QC Gates (Rules.md §9) – status will be filled by orchestrator
- Gate 1: **not‑tested**  
- Gate 2: **not‑tested**  
- Gate 3: **not‑tested**  
- Gate 4: **not‑tested**  
- Gate 5: **not‑tested**  
- Gate 6: **not‑tested**  
- Gate 7: **not‑tested**  

## What was not tested
Keyboard‑only navigation, screen‑reader verification, and non‑Chromium browsers were not exercised by us.

---

*All content is fictional and for research replication only. No real health advice, appointments, or transactions are provided.*  
