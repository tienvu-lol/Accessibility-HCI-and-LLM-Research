# Sunrise Bakery – Replica REST-06

**Replica ID:** REST-06 (slot 10)  
**Category:** Restaurants & Food Service – Café / Bakery  
**Fictional brand:** Sunrise Bakery (original prose, placeholder artwork)  

**Approved source**  
- **Name:** Tartine Bakery  
- **URL:** https://tartinebakery.com/  
- **Verified at:** 2026‑11‑17 (HTTP GET)  
- **Verification method:** HTTP GET by the orchestrator (see `evidence_reference`)  

**How to open locally**  
1. Clone / copy the `restaurant/open-source/REST-06` directory.  
2. Open any HTML file (e.g., `index.html`) in a browser via `file://` URL.  
3. No server is required; all assets are local.

**Sitemap (local files → source mapping)**  

| Local file | Source URL (approved) | Page purpose |
|------------|----------------------|--------------|
| `index.html` | https://tartinebakery.com | Home |
| `cities-index.html` | https://tartinebakery.com/cities | Locations directory |
| `bakery-index.html` | https://tartinebakery.com/san-francisco/bakery | Bakery page (menu download) |
| `about-index.html` | https://tartinebakery.com/about | About overview |
| `our-story-index.html` | https://tartinebakery.com/about/our-story | Our Story |
| `press-index.html` | https://tartinebakery.com/press | Press |
| `404.html` | – (error page) | Not‑found fallback |

**Sample datasets (inline, rows)**  

- `menuItems` – 12 rows (demo bakery menu)  
- `cityLocations` – 5 rows (city/store list)  
- `pressItems` – 4 rows (press mentions)  

**Implemented interactions**  

| Interaction | Source evidence | Implementation |
|-------------|----------------|----------------|
| Navigation (responsive) | observed | Hamburger toggle, `aria-expanded`, Escape to close |
| Menu download | observed | Link to local `assets/menu.pdf` (placeholder) |
| Location directory filter | inferred | Text input filters city cards (client‑side) |
| Reservation request | inferred | Demo form with validation, non‑functional submission |
| Skip link | required for WCAG baseline | Visible on focus, jumps to `#main-content` |
| Hero sections | observed (markup) | Simple banner with heading |
| Press list rendering | inferred | JS injects placeholder items |

**QC gates (Rules.md §9) – status**  

| Gate | Status |
|------|--------|
| 1. HTML validity | not‑tested |
| 2. CSS validity | not‑tested |
| 3. JS syntax | not‑tested |
| 4. Accessibility landmarks & skip link | not‑tested |
| 5. Keyboard navigation | not‑tested |
| 6. Responsive layout | not‑tested |
| 7. Data‑component tagging | not‑tested |

*All gates will be evaluated by the orchestrator’s shared QC tool.*

---  

**Note:** This replica uses only the pages approved in the source map. All additional content (e.g., demo reservation form, filtered location list) is clearly labeled as a simulation or inferred behavior in the fidelity notes.
