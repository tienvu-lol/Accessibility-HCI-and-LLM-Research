# Fidelity Notes – WX‑10 Replica

## General approach
- All structural elements (header, nav, main, footer) follow the observed key regions.  
- No real logos or photographs are used; placeholders (`<svg>` with descriptive `aria-label`) replace them.  
- All textual content is original and fictional.

## Page‑by‑page deviations

| Page | Replicated | Approximated / Simulated | Omitted | Intentional addition | Reason |
|------|------------|--------------------------|---------|----------------------|--------|
| index.html | Header, nav, hero, main layout, footer, tabs, temp toggle, search form, radar placeholder, alerts | Forecast tables (sample data), alert filter UI, map modal | None | 404 page (required by category) | Category checklist demands a 404. |
| menu.html | Header, nav, sidebar, footer | Menu list (fictional) | None | – | No source markup beyond navigation; sidebar inferred from “observed_key_regions”. |
| services.html | Header, nav, sidebar, footer | Services overview (fictional) | None | – | Content invented to fill the page while keeping layout. |
| publications.html | Header, nav, sidebar, footer | Publications list (sample titles) | None | – | No fetched list; created placeholder items. |
| news.html | Header, nav, footer | Alerts section (simulated) and article list (now buttons instead of placeholder links) | None | – | Alerts UI is an inferred interaction; articles now use non‑link buttons to avoid `href="#"`. |
| nmhs.html | Header, nav, footer | NMHS description (fictional) | None | – | Content invented. |
| about-us.html | Header, nav, footer | About text (fictional) | None | – | Content invented. |
| links.html | Header, nav, footer | Links list (now buttons instead of placeholder links) | None | – | Replaced `href="#"` placeholders with accessible demo buttons. |
| site-map.html | Header, nav, footer | Simple site map (list of pages) | None | – | Mirrors approved page map. |
| access.html | Header, nav, footer | Access information (fictional) | None | – | Content invented. |
| 404.html | Header, nav, footer, main | Full error page | None | ✅ | Required by category requirements; not present in source map. |

## Component fidelity
- **site-header**, **primary-nav**, **site-footer**: replicated on every page, using original placeholder branding.  
- **hero-section**: now marked with `role="region"` and `aria-label="hero"` to satisfy region landmark.  
- **sidebar**: added where the source indicated a secondary region; content is fictional.  
- **forecast tabs**, **temp toggle**, **location search**, **alert filters**, **radar map modal**: simulated based on inferred interactions; marked as such.  

## Unverified / Inferred elements
- Inline location search UI – inferred (no evidence in fetched HTML).  
- Forecast tabs – inferred.  
- Fahrenheit/Celsius toggle – inferred.  
- Radar/map placeholder – inferred (no real map markup fetched).  
- Alert filter UI – inferred.  

## Corrections applied
- Replaced all `href="#"` placeholders with `<button>` elements to avoid invalid placeholder links.  
- Increased link color contrast by changing CSS link color to `#003366`.  
- Added `role="region"` and `aria-label="hero"` to the hero section on the home page to address region landmark issue.  
- Added responsive nav flex‑direction change for ≤375 px to eliminate horizontal scrolling on the site‑map page.  

## Limitations
- No real‑time data, no external API calls.  
- No pagination or large data tables; sample rows are limited to those listed in the README.  

---  
*These notes accompany the automatically generated replica and are intended for researchers evaluating fidelity.*  
