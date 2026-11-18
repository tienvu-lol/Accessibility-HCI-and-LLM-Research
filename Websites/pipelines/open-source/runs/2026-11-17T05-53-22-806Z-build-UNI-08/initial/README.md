# Liberal Arts College Replica (UNI-08)

**Replica ID:** UNI-08  
**Category:** University  
**Fictional Branding:** Liberal Arts College  
**Approved Source URL:** https://www.amherst.edu/  
**Verification Method:** HTTP GET by the orchestrator  
**Verification Date:** 2025-09-16  

## How to Open Locally
Open `index.html` in any modern browser (file://). No server is required.

## Sitemap
- index.html (Home)
- academic-life.html (Academics)
- departments.html (Majors / Program Listing)
- college-catalog.html (Course Catalog)
- admission.html (Admission & Financial Aid)
- apply.html (Apply)
- visiting.html (Visit)
- news.html (News & Events)
- 404.html (Page Not Found)

## Page-to-Source Mapping
| Local File            | Source URL                                                            |
|-----------------------|-----------------------------------------------------------------------|
| index.html            | https://www.amherst.edu/                                              |
| academic-life.html    | https://www.amherst.edu/academiclife                                  |
| departments.html      | https://www.amherst.edu/academiclife/departments                      |
| college-catalog.html  | https://www.amherst.edu/academiclife/college-catalog                  |
| admission.html        | https://www.amherst.edu/admission                                     |
| apply.html            | https://www.amherst.edu/admission/apply                               |
| visiting.html         | https://www.amherst.edu/visiting                                      |
| news.html             | https://www.amherst.edu/news                                          |
| 404.html              | (Not in source map; standard error page)                              |

## Sample Dataset Row Counts
- **Programs** (used on academic-life.html and departments.html): 12 entries  
- **Courses** (used on college-catalog.html): 20 entries  
- **News/Events** (used on news.html): 8 entries  
- **Staff/Faculty** (sidebar on academic-life.html): 6 entries  
- **FAQ** (used on admission.html): 5 entries  

## Interaction and Simulation Notes
- **Program/Directory Search**: Implemented as a client‑side filter on the programs card grid (academic-life.html, departments.html).  
- **Responsive Navigation**: Hamburger button toggles the primary navigation on viewports ≤ 600 px; ESC closes the mobile menu and returns focus to the button.  
- **Visit/Information Inquiry**: Simulated contact forms on visiting.html and admission.html show a toast thank‑you message on submit; no data is transmitted.  
- **Events Filtering**: On news.html, category buttons filter the news card grid; ARIA‑pressed indicates active state.  
- **Application Simulation**: The apply.html form is a demonstration only; submit shows a toast and resets the form.  
- **Admission Process**: All content is informational; no real application or aid calculation is performed.  

## Quality Control Gates (Rules.md Section 9)
The exact seven QC gates are not detailed in the task evidence; therefore we cannot list them specifically. All gates are reported as **not‑tested** pending the orchestrator’s QC run.

## What Was Not Tested
- Screen reader verification (unless otherwise informed by the orchestrator)  
- Manual zoom and reflow testing  
- Full keyboard walkthroughs beyond implemented interactions  
- Non‑Chromium browser behavior  
- Any gate requiring network access (e.g., remote asset loading)  

---  
*This README is provided as part of the WEB-REPLICA-V1.0 research dataset.*  
