# Fictional Daily – News Publisher Replica (Slot 10)

**Replica ID:** NEWS-10  
**Category:** news (News publishers)  
**Fictional organization:** *Fictional Daily* – a made‑up national daily newspaper.  

**Approved source**  
- **Source name:** Los Angeles Times  
- **URL:** https://www.latimes.com/  
- **Verified at:** 2026‑11‑17 (HTTP GET by orchestrator)  

**How to open locally**  
1. Clone or copy the entire `news/open-source/NEWS-10` directory.  
2. Open any HTML file (e.g., `index.html`) in a browser via `file://` URL. No server is required.  

**Sitemap (local files → source mapping)**  

| Local file | Source URL (reference) | Page purpose |
|------------|------------------------|--------------|
| index.html | https://www.latimes.com/ | Home |
| politics-index.html | https://www.latimes.com/politics | Politics section |
| business-index.html | https://www.latimes.com/business | Business section |
| technology-index.html | https://www.latimes.com/business/technology | Technology section |
| world-index.html | https://www.latimes.com/world-nation | World & Nation section |
| science-index.html | https://www.latimes.com/science | Science & Medicine section |
| environment-index.html | https://www.latimes.com/environment | Climate & Environment section |
| entertainment-arts-index.html | https://www.latimes.com/entertainment-arts | Entertainment & Arts section |
| food-index.html | https://www.latimes.com/food | Food section |
| 404.html | – | Generic “not found” page |

**Sample datasets (inline in `js/main.js`)**  

| Dataset | Rows used | Description |
|---------|-----------|-------------|
| `homeArticles` | 6 | Featured articles shown on the home page. |
| `sectionArticles` (per section) | 5 each | Article previews for each section page. |
| `mostRead` | 4 | “Most read” list displayed in the sidebar on home and business pages. |

**Implemented interactions**  

| Interaction | Source evidence | Implementation |
|-------------|----------------|----------------|
| Section navigation | observed | Header nav links to each section page; keyboard accessible, `aria-label`. |
| Local article search | inferred | Search form in header; client‑side filtering of `homeArticles`; accessible alerts for empty query / no results. |
| Newsletter subscription | inferred | Simple email form in footer; client‑side validation; success message shown inline. |
| Skip link | required for WCAG baseline | First focusable element, visible on focus, jumps to `#main-content`. |
| Sidebar most‑read list | observed on home (inferred for business) | Populated from `mostRead` dataset; keyboard‑navigable links. |

**QC gates (Rules.md §9) – status will be filled by orchestrator**  
- Gate 1: File structure – not‑tested (orchestrator will set)  
- Gate 2: HTML validity – not‑tested  
- Gate 3: CSS compliance – not‑tested  
- Gate 4: JS syntax – not‑tested  
- Gate 5: Accessibility landmarks – not‑tested  
- Gate 6: Keyboard interaction – not‑tested  
- Gate 7: Data‑attribute tagging – not‑tested  

**What was not tested** – any automated WCAG audit, visual design fidelity, or performance metrics; these are outside the scope of this replica.

---  
*All textual content, logos, and images are fictional placeholders created for research purposes.*  
