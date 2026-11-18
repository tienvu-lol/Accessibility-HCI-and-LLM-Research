# Nimbus Weather Service – Replica WX‑10

**Replica ID:** WX‑10 (slot 10)  
**Category:** Weather information (open‑source model)  
**Fictional organization:** Nimbus Weather Service  

## Source information
- **Approved source URL:** https://www.jma.go.jp/jma/indexe.html  
- **Verification method:** HTTP GET by the orchestrator (verified 2026‑11‑17)  
- **Approved at:** 2026‑11‑17 by Samhith Varma Yallamraju  

## How to open locally
1. Clone or copy the `weather/open-source/WX-10` directory.  
2. Open `index.html` in a browser (file:// protocol).  
3. All links are relative; no server is required.

## Sitemap (pages)
| Local file | Approx. source title |
|------------|----------------------|
| index.html | Home |
| menu.html | Menu |
| services.html | Services |
| publications.html | Publications/Periodicals |
| news.html | News |
| nmhs.html | NMHS |
| about-us.html | About Us |
| links.html | Links |
| site-map.html | Site Map |
| access.html | Access |
| 404.html | Error page (added intentionally) |

## Page‑to‑source mapping
Each local file corresponds to the URL listed in the approved page map (see task JSON). The 404 page is an intentional addition required by the category checklist.

## Sample datasets (inline)
- **forecastData** – 5 rows (5‑day forecast)  
- **hourlyData** – 12 rows (12‑hour forecast)  
- **alertsData** – 3 rows (fictional alerts)  
- **articlesData** – 2 rows (sample weather articles)  

All data are hard‑coded in `js/main.js`.

## Interactions & simulations
| Interaction | Implemented? | Notes |
|------------|---------------|-------|
| Inline location search | ✅ | Filters the daily forecast table (demo only). |
| Forecast tabs (daily / hourly) | ✅ | Accessible tablist with ARIA. |
| Fahrenheit/Celsius toggle | ✅ | Switches temperature units in tables. |
| Labeled static radar/map | ✅ | SVG placeholder opens a modal with larger demo graphic. |
| Alert filters | ✅ | Checkbox filter shows/hides alerts. |
| Other inferred UI (e.g., map pages) | ❌ | Not present in fetched markup; omitted. |

All simulated content is fictional; no live data or external APIs are used.

## QC Gates (Rules.md §9)
| Gate | Status |
|------|--------|
| 1. File naming & paths | not‑tested |
| 2. HTML validity | not‑tested |
| 3. CSS syntax | not‑tested |
| 4. JS syntax | not‑tested |
| 5. Accessibility basics | not‑tested |
| 6. Data‑attribute tagging | not‑tested |
| 7. Documentation completeness | not‑tested |

The orchestrator will run the real QC and fill these results.

## What was not tested
- Keyboard‑only navigation on all interactive components (will be covered by QC).  
- Screen‑reader experience (outside scope of this build).  

---  
*This replica is generated automatically by the open‑source model `unsloth/gpt-oss-120b-GGUF` under the WEB‑REPLICA‑V1.0 protocol.*  
