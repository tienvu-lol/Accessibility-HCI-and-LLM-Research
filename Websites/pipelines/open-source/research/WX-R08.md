# WX-R08 — open-source source research (slot 08)

- **Run:** `2026-11-17T05-20-05-716Z-research-WX-R08`
- **Scope:** partial — this file covers WX-R08 only. The rest of the category is researched separately.
- **Research model:** unsloth/NVIDIA-Nemotron-3-Super-120B-A12B-GGUF (vt-arc-falcon-llamacpp, nvidia-nemotron-open-model-license, open weights) declared for slot 08
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 3/3 candidate homepages and 9/9 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/WX-R08-http-2026-11-17.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### WX-R08
source_id: WX-R08
subcategory: commercial weather portal
source_name: Weather.com
official_url: https://weather.com/
verified_at: date not provided in evidence
verification_result: verified
source_pages: [
  {"url": "https://weather.com/", "title": "National and Local Weather Radar, Daily Forecast, Hurricane and information from The Weather Channel and weather.com", "local_file": "index.html"},
  {"url": "https://weather.com/redir?id=autodetect&page=today&locale=en-US", "title": "Weather Forecast and Conditions for Ashburn, Virginia - The Weather Channel | Weather.com", "local_file": "today.html"},
  {"url": "https://weather.com/redir?id=autodetect&page=radar&locale=en-US", "title": "Interactive Radar for Ashburn, Virginia | weather.com", "local_file": "radar.html"},
  {"url": "https://weather.com/news", "title": "Local & National Breaking Weather News & Videos | weather.com", "local_file": "news.html"},
  {"url": "https://weather.com/login", "title": "Login - The Weather Channel | weather.com", "local_file": "login.html"},
  {"url": "https://weather.com/redir?id=autodetect&page=hourly&locale=en-US", "title": "Hourly Weather Forecast for Ashburn, Virginia - The Weather Channel | Weather.com", "local_file": "hourly.html"},
  {"url": "https://weather.com/redir?id=autodetect&page=tenday&locale=en-US", "title": "10-Day Weather Forecast for Ashburn, Virginia - The Weather Channel | weather.com", "local_file": "tenday.html"},
  {"url": "https://weather.com/redir?id=autodetect&page=monthly&locale=en-US", "title": "Monthly Weather Forecast for Ashburn, Virginia - weather.com", "local_file": "monthly.html"},
  {"url": "https://weather.com/redir?id=autodetect&page=allergy&locale=en-US", "title": "Pollen count and allergy forecast for Ashburn, Virginia - The Weather Channel | weather.com", "local_file": "allergy.html"}
]
key_regions: [
  "header",
  "navigation (with links to Today Forecasts, Radar Radar, News News, User Avatar Sign in, lightning Get Premium Upgrade Chevron Right, Hourly, 10 Day, Monthly, Allergies, Air Quality, Cold & Flu, lightning Get Premium, Winter Outlook, El Niño, Hurricanes, Tornadoes, Health & Wellness, Wildfires, Fall Outlook, Home & Garden, Fall Travel)"
]
key_interactions: [
  {"name": "inline location search", "evidence": "inferred"},
  {"name": "forecast tabs", "evidence": "inferred"},
  {"name": "F/C conversion", "evidence": "inferred"},
  {"name": "labeled static radar/map", "evidence": "inferred"},
  {"name": "alert filters", "evidence": "inferred"}
]
complexity: medium (multiple distinct sections such as forecast, radar, news, login and a visible navigation hierarchy)
stack_clues: unknown
limitations: No fetched pages failed; however, the exact date of the HTTP GET is not included in the evidence, and navigation may be incomplete if the site relies on JavaScript for some links that were not present in the raw HTML.

```json
{"rows": [{"source_id": "WX-R08", "subcategory": "commercial weather portal", "source_name": "Weather.com", "source_url": "https://weather.com/", "verified_at": "date not provided in evidence", "verification_method": "HTTP GET by the orchestrator", "verification_result": "verified", "evidence_reference": "", "source_pages": [{"url": "https://weather.com/", "title": "National and Local Weather Radar, Daily Forecast, Hurricane and information from The Weather Channel and weather.com", "local_file": "index.html"}, {"url": "https://weather.com/redir?id=autodetect&page=today&locale=en-US", "title": "Weather Forecast and Conditions for Ashburn, Virginia - The Weather Channel | Weather.com", "local_file": "today.html"}, {"url": "https://weather.com/redir?id=autodetect&page=radar&locale=en-US", "title": "Interactive Radar for Ashburn, Virginia | weather.com", "local_file": "radar.html"}, {"url": "https://weather.com/news", "title": "Local & National Breaking Weather News & Videos | weather.com", "local_file": "news.html"}, {"url": "https://weather.com/login", "title": "Login - The Weather Channel | weather.com", "local_file": "login.html"}, {"url": "https://weather.com/redir?id=autodetect&page=hourly&locale=en-US", "title": "Hourly Weather Forecast for Ashburn, Virginia - The Weather Channel | Weather.com", "local_file": "hourly.html"}, {"url": "https://weather.com/redir?id=autodetect&page=tenday&locale=en-US", "title": "10-Day Weather Forecast for Ashburn, Virginia - The Weather Channel | weather.com", "local_file": "tenday.html"}, {"url": "https://weather.com/redir?id=autodetect&page=monthly&locale=en-US", "title": "Monthly Weather Forecast for Ashburn, Virginia - weather.com", "local_file": "monthly.html"}, {"url": "https://weather.com/redir?id=autodetect&page=allergy&locale=en-US", "title": "Pollen count and allergy forecast for Ashburn, Virginia - The Weather Channel | Weather.com", "local_file": "allergy.html"}], "key_regions": ["header", "navigation (with links to Today Forecasts, Radar Radar, News News, User Avatar Sign in, lightning Get Premium Upgrade Chevron Right, Hourly, 10 Day, Monthly, Allergies, Air Quality, Cold & Flu, lightning Get Premium, Winter Outlook, El Niño, Hurricanes, Tornadoes, Health & Wellness, Wildfires, Fall Outlook, Home & Garden, Fall Travel)"], "key_interactions": [{"name": "inline location search", "evidence": "inferred", "notes": "No search form observed in fetched markup."}, {"name": "forecast tabs", "evidence": "inferred", "notes": "Links for today, hourly, 10‑day, monthly present but not confirmed as tabs."}, {"name": "F/C conversion", "evidence": "inferred", "notes": "No temperature unit toggle seen in markup."}, {"name": "labeled static radar/map", "evidence": "inferred", "notes": "Radar link present but not confirmed as a labeled static map."}, {"name": "alert filters", "evidence": "inferred", "notes": "No alert filter controls observed."}], "complexity": "medium", "stack_clues": "unknown", "limitations": "No fetched pages failed; however, the exact date of the HTTP GET is not included in the evidence, and navigation may be incomplete if the site relies on JavaScript for some links that were not present in the raw HTML."}]}
```
