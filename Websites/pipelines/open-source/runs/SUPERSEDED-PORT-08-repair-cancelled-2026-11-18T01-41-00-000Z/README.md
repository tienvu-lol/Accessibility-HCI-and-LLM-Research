# Ava Portfolio Replica

**Replica ID:** portfolio-open-source-PORT-08  
**Category:** portfolio  
**Fictional Branding:** Ava Portfolio  
**Approved Source URL:** https://wesbos.com/  
**Verification Method:** HTTP GET by the orchestrator  
**Verification Date:** 2026-11-17  

## How to Open Locally
Open `index.html` in any modern browser using a file:// URL (e.g., double-click the file or run `file:///path/to/index.html`). No server is required.

## Full Sitemap
- index.html (Home)
- courses.html
- about.html
- blog.html
- tips.html
- javascript.html
- speaking-and-training.html
- uses.html
- contact.html
- 404.html

## Page‑to‑Source Mapping
| Local File | Source URL |
|------------|------------|
| index.html | https://wesbos.com/ |
| courses.html | https://wesbos.com/courses |
| about.html | https://wesbos.com/about |
| blog.html | https://wesbos.com/blog |
| tips.html | https://wesbos.com/tips |
| javascript.html | https://wesbos.com/javascript |
| speaking-and-training.html | https://wesbos.com/speaking-and-training |
| uses.html | https://wesbos.com/uses |
| contact.html | https://wesbos.com/contact |
| 404.html | (not in source; added for completeness) |

## Sample Dataset Row Counts
- **projects** (used on courses.html): 12 items  
- **blogPosts** (used on blog.html): 8 items  
- **tips** (used on tips.html): 15 items  
- **speakingEvents** (used on speaking-and-training.html): 6 items  
- **techStack** (used on uses.html): 20 items  

## Interaction and Simulation Notes
| Interaction | Implementation | Notes |
|-------------|----------------|-------|
| Project filtering on inline data | Checkbox filter on courses.html that shows/hides project cards | Simulated; no actual backend |
| Gallery or lightbox navigation | Clicking a tech‑stack icon on uses.html opens a lightbox with a larger SVG placeholder | Simulated lightbox; content is placeholder |
| Responsive navigation | Nav collapses to a hamburger menu below 480 px; toggles with ARIA attributes and ESC to close | Simulated behavior; verified via JS |
| Contact inquiry on inline data | Form on contact.html prevents submission, shows a demo “Message sent” toast, then clears | Simulated; no actual email sent |
| Reduced‑motion handling | `@media (prefers-reduced-motion: reduce)` disables all non‑essential transitions and animations | Applied site‑wide |

## Quality‑Control Gates (Rules.md § 9)
As no QC run has been performed by the orchestrator, all gates are reported as **not tested**:

1. HTML validity – not tested  
2. CSS validity – not tested  
3. JavaScript error‑free – not tested  
4. Landmark and heading structure – not tested  
5. Skip link present and functional – not tested  
6. Colour contrast compliance – not tested  
7. Prefers‑reduced‑motion respected – not tested  

## What Was Not Tested
- Screen‑reader verification (e.g., NVDA, JAWS, VoiceOver)  
- Zoom functionality (up to 400 %)  
- Manual keyboard walkthroughs beyond basic tab order  
- Non‑Chromium browsers (Firefox, Safari) unless explicitly exercised by the orchestrator  

---  
*Generated as part of the WEB‑REPLICA‑V1.0 study.*  
