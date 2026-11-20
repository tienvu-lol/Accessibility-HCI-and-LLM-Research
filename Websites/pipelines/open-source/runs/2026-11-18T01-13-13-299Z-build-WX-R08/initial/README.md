# WeatherWise Replica (WX-R08)

**Replica ID:** WX-R08  
**Category:** Weather information  
**Fictional Branding:** WeatherWise  
**Approved Source:** Weather.com (https://weather.com/)  
**Verification Method:** HTTP GET by the orchestrator  
**Verification Date:** 2026-11-17  
**Model Group:** open-source  
**Model ID:** unsloth/NVIDIA-Nemotron-3-Super-120B-A12B-GGUF  
**Model Version:** MXFP4_MOE  
**Provider/Runtime:** vt-arc-falcon-llamacpp (OpenAI-compatible chat completions)  

## How to open locally
Download the entire site folder and open `index.html` in a browser (file://). No server is required.

## Sitemap
- index.html – Home page
- today.html – Today’s forecast for Ashburn, VA
- hourly.html – Hourly forecast
- tenday.html – 10‑day forecast
- monthly.html – Monthly averages
- allergy.html – Pollen and allergy forecast
- radar.html – Radar placeholder
- news.html – Weather news listing
- login.html – Demo sign‑in form
- 404.html – Page not found

## Page‑to‑source mapping
| Local file | Source URL |
|------------|------------|
| index.html | https://weather.com/ |
| today.html | https://weather.com/redir?id=autodetect&page=today&locale=en-US |
| hourly.html | https://weather.com/redir?id=autodetect&page=hourly&locale=en-US |
| tenday.html | https://weather.com/redir?id=autodetect&page=tenday&locale=en-US |
| monthly.html | https://weather.com/redir?id=autodetect&page=monthly&locale=en-US |
| allergy.html | https://weather.com/redir?id=autodetect&page=allergy&locale=en-US |
| radar.html | https://weather.com/redir?id=autodetect&page=radar&locale=en-US |
| news.html | https://weather.com/news |
| login.html | https://weather.com/login |
| 404.html | (not in source; added for completeness) |

## Sample dataset row counts
- Today forecast (hourly): 24 rows
- Hourly forecast: 24 rows
- 10‑day forecast: 10 rows
- Monthly averages: 12 rows
- Allergy index: 5 rows
- News items: 6 rows

## Interactions implemented
- **Inline location search** (inferred): text input; on submit shows a toast with the entered location (demo).
- **Forecast tabs** (inferred): ARIA tabs on index.html and today.html to switch between Today, Hourly, 10‑Day, Monthly views.
- **F/C conversion** (inferred): toggle button that converts all displayed temperatures between Fahrenheit and Celsius.
- **Labeled static radar/map** (inferred): radar.html shows an SVG placeholder labeled “Radar”.
- **Alert filters** (inferred): checkboxes for Severe Weather, Pollen, Air Quality, Cold & Flu; on submit shows a toast with active filters (demo).
- **Demo login simulation** (intentional addition): login.html accepts any email/password; on submit shows a toast “Login successful (demo)” and redirects to home via hash change.

## QC gates (Rules.md section 9) – as reported by orchestrator
- Gate 1: not-tested
- Gate 2: not-tested
- Gate 3: not-tested
- Gate 4: not-tested
- Gate 5: not-tested
- Gate 6: not-tested
- Gate 7: not-tested

## What was not tested
Screen readers, zoom, manual keyboard walkthroughs, and non‑Chromium browsers were not tested unless the orchestrator explicitly states otherwise.
