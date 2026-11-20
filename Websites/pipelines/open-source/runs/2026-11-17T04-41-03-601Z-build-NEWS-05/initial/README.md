# Replica: NEWS-05

## Metadata
- **Replica ID:** NEWS-05
- **Category:** News publishers
- **Fictional Branding:** The Metropolitan Herald
- **Approved Source:** [The New Zealand Herald](https://www.nzherald.co.nz)
- **Verification Method:** HTTP GET by the orchestrator
- **Verified At:** 2026-11-16

## Local Usage
To view this site locally, open `index.html` in a web browser. No server is required. All assets are local.

## Sitemap
1. `index.html` - Home
2. `nz.html` - NZ
3. `world.html` - World
4. `business.html` - Business
5. `sport.html` - Sport
6. `entertainment.html` - Entertainment
7. `politics.html` - Politics
8. `crime.html` - Crime
9. `election-2026.html` - Election 2026
10. `video.html` - Video
11. `opinion.html` - Opinion
12. `lifestyle.html` - Lifestyle
13. `weather.html` - Weather
14. `premium.html` - Premium
15. `podcasts.html` - Podcasts
16. `404.html` - Not Found

## Page-to-Source Mapping
| Local File | Source URL |
| :--- | :--- |
| `index.html` | https://www.nzherald.co.nz/ |
| `nz.html` | https://www.nzherald.co.nz/nz/ |
| `world.html` | https://www.nzherald.co.nz/world/ |
| `business.html` | https://www.nzherald.co.nz/business/ |
| `sport.html` | https://www.nzherald.co.nz/sport/ |
| `entertainment.html` | https://www.nzherald.co.nz/entertainment/ |
| `politics.html` | https://www.nzherald.co.nz/nz/politics/ |
| `crime.html` | https://www.nzherald.co.nz/nz/crime/ |
| `election-2026.html` | https://www.nzherald.co.nz/topic/election-2026/ |
| `video.html` | https://www.nzherald.co.nz/video/ |
| `opinion.html` | https://www.nzherald.co.nz/topic/opinion/ |
| `lifestyle.html` | https://www.nzherald.co.nz/lifestyle/ |
| `weather.html` | https://www.nzherald.co.nz/weather/ |
| `premium.html` | https://www.nzherald.co.nz/premium/ |
| `podcasts.html` | https://www.nzherald.co.nz/news/podcasts/ |
| `404.html` | N/A (Standard error page) |

## Sample Datasets
- **Articles:** 50 rows (fictional headlines, summaries, dates, categories)
- **Trending Items:** 10 rows (sidebar content)
- **Podcast Episodes:** 8 rows (`podcasts.html`)
- **Weather Data:** 7 rows (`weather.html`)

## Interactions & Simulations
- **Section Navigation:** Implemented via `primary-nav` with mobile toggle.
- **Latest/Most-Read Tabs:** Implemented via `tabs` component, toggling content via JS.
- **Newsletter Simulation:** Implemented via `newsletter-signup` form with client-side validation.
- **Premium Gate:** Implemented via `premium-gate` overlay on select content.
- **Media Players:** Simulated with static UI and local controls.

## QC Gates
1. **HTML Validity:** not-tested
2. **CSS Validity:** not-tested
3. **JS Validity:** not-tested
4. **Accessibility (WCAG 2.2 AA):** not-tested
5. **Performance:** not-tested
6. **Responsiveness:** not-tested
7. **Functionality:** not-tested

## Limitations
- Individual article pages are not included.
- Real-time data (weather, finance) is simulated.
- No server-side features (search, auth) are implemented.
- Screen readers, zoom, manual keyboard walkthroughs, and non-Chromium browsers were not tested.
