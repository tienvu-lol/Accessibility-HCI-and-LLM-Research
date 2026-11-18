# Creative Portfolio – Replica PORT‑10

**Replica ID:** PORT‑10  
**Category:** portfolio (Personal and creative portfolios)  
**Fictional brand:** *Creative Portfolio* (no real organization)  

## Source information
- **Approved source name:** Kent C. Dodds  
- **Approved source URL:** https://kentcdodds.com  
- **Verification method:** HTTP GET by the orchestrator  
- **Verified at:** 2026‑11‑17  

## How to open locally
1. Clone or copy the repository folder.  
2. Open any HTML file (e.g., `index.html`) in a browser via `file://` URL.  
3. All assets are relative; no server is required.

## Sitemap (approved page map)
| Local file            | Source title (reference)                     |
|-----------------------|----------------------------------------------|
| `index.html`          | Kent C. Dodds (home)                         |
| `blog.html`           | The Kent C. Dodds Blog                       |
| `talks.html`          | 90 talks by Kent all about software development |
| `courses.html`        | Courses by Kent C. Dodds                     |
| `about.html`          | About Kent C. Dodds                          |
| `contact.html`        | Contact Kent C. Dodds                        |
| `resume.html`         | Kent C. Dodds' Resume                        |
| `office-hours.html`   | KCD Office Hours                             |
| `transparency.html`   | Transparency                                 |
| `testimonials.html`   | 56 testimonials about Kent C. Dodds          |
| `404.html`            | (custom 404 page)                            |

## Sample datasets (inline, rows)
- Blog posts – 5 rows  
- Talks – 6 rows  
- Courses – 4 rows  
- Testimonials – 5 rows  
- Office‑hours slots – 3 rows  

## Interactions & simulations
- **Responsive navigation** – hamburger toggles menu; Escape closes it.  
- **Contact form** – client‑side validation; on success shows a simulated thank‑you message.  
- **Reduced‑motion** – CSS respects `prefers-reduced-motion`.  
- **Data listings** – blog, talks, courses, testimonials, office‑hours are rendered from inline JavaScript objects.  
- **Project filtering / gallery** – not present in source; omitted (see fidelity notes).  

## QC gates (Rules.md §9) – status will be set by orchestrator
- Gate 1: File structure – not‑tested  
- Gate 2: HTML validity – not‑tested  
- Gate 3: CSS validity – not‑tested  
- Gate 4: JS syntax – not‑tested  
- Gate 5: Accessibility basics – not‑tested  
- Gate 6: ARIA usage – not‑tested  
- Gate 7: Responsive layout – not‑tested  

*All gates are left at “not‑tested” for the orchestrator to fill.*

---  
*This replica was generated automatically by the open‑source model `unsloth/gpt-oss-120b-GGUF` under the WEB‑REPLICA‑V1.0 protocol.*  
