# Xi'an Famous Foods Replica (REST-R08)

**Category:** Restaurants and food service  
**Slot:** 8  
**Source ID:** REST-R08  
**Approved source:** https://www.xianfoods.com  
**Verification method:** HTTP GET by the orchestrator  
**Verification date:** 2026-11-17  
**Verification result:** verified  

## Fictional branding
- **Name:** Xi'an Famous Foods (replica)  
- **Tagline:** Specialty Chinese dishes from family recipes  
- **Logo:** None (text‑only treatment)  

## How to open the site locally
1. Download the entire site directory.  
2. Open `index.html` in any modern browser (Chrome, Firefox, Safari, Edge).  
3. No web server is required; the site uses only relative paths and works via `file://`.  

## Full sitemap (local files)
- index.html (home)  
- menu.html (menu index)  
- our-story.html (about/story)  
- locations.html (locations/visit)  
- contact.html (contact)  
- order-acknowledgment.html (pickup/delivery acknowledgment)  
- press.html (news/journal)  
- accessibility.html (accessibility statement)  
- 404.html (not found)  

## Page‑to‑source mapping
| Local file | Source URL |
|------------|------------|
| index.html | https://www.xianfoods.com/ |
| menu.html | https://www.xianfoods.com/menu |
| our-story.html | https://www.xianfoods.com/our-story |
| locations.html | https://www.xianfoods.com/locations |
| contact.html | https://www.xianfoods.com/contact |
| order-acknowledgment.html | https://www.xianfoods.com/order-acknowledgment |
| press.html | https://www.xianfoods.com/press |
| accessibility.html | https://www.xianfoods.com/accessibility |
| 404.html | (not present in source; required by category checklist) |

## Sample dataset row counts (inline data)
- **Menu items:** 12 objects (see `js/main.js` for structure)  
- **Locations:** 3 objects  
- **Press articles:** 4 objects  
- **Newsletter subscribers:** 0 (empty array to demonstrate empty state)  

## Interactions implemented
| Interaction | Source evidence | Implementation notes |
|-------------|----------------|----------------------|
| Menu filtering on inline data | inferred | Checkbox filters update the menu card grid in real time; live count shown. |
| Reservation request on inline data | inferred | Form validates date, time, party size (1‑20); shows a toast‑style confirmation with a simulated reservation number. |
| Responsive navigation | inferred | Hamburger button toggles mobile nav; ESC closes and returns focus. |
| Open/closed hours display | inferred | Each location card shows a badge that reads “Open now” or “Closed” based on a simulated time‑of‑day check (11:00‑22:00). |
| Age gate | inferred | Modal asks for date of birth; if ≥ 18, access granted and stored in sessionStorage; otherwise shows restriction message. |
| Newsletter signup | inferred (added for demo) | Simple email input with pattern validation; shows thank‑you message on submit. |

## Intentional additions (not in source)
- Skip link as first focusable element (required for accessibility baseline).  
- Newsletter signup form in the footer of every page.  
- Breadcrumb navigation on interior pages (our‑story, locations, contact, press, order‑acknowledgment, accessibility).  
- Toast‑style live region for reservation and contact form confirmations.  
- Placeholder SVG illustrations (no real images used).  

## Known deviations and limitations
- Visual design (colors, typography, spacing) is an original, accessible interpretation; no claim of pixel‑perfect match.  
- Real‑time opening‑hours detection is simulated; we cannot access the user's clock for actual business hours without a server.  
- Age gate enforcement is client‑side only (sessionStorage); a real deployment would require server‑side verification.  
- No actual data persistence; all forms are simulations.  
- Social‑media icons in the footer are placeholders with no real links.  

## Quality‑control gates (as reported by the orchestrator after QC run)
| Gate | Status |
|------|--------|
| 1. HTML5 validity | not‑tested |
| 2. CSS3 validity | not‑tested |
| 3. No JavaScript errors | not‑tested |
| 4. WCAG 2.2 AA baseline attempted | not‑tested |
| 5. Responsive reflow at 375 px | not‑tested |
| 6. Prefers‑reduced‑motion respected | not‑tested |
| 7. All interactive controls operable | not‑tested |

*These gates will be filled in by the orchestrator after the shared QC run.*  

---  
*End of README.*  
