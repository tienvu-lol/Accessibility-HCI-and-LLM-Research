# NEWS-07 — open-source source research (slot 07)

- **Run:** `2026-11-16T21-39-35-613Z-research-NEWS-07`
- **Scope:** partial — this file covers NEWS-07 only. The rest of the category is researched separately.
- **Research model:** unsloth/Qwen3.6-35B-A3B-GGUF (vt-arc-falcon-llamacpp, apache-2.0, open weights) declared for slot 07
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 3/3 candidate homepages and 16/16 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/NEWS-07-http-2026-11-16.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### NEWS-07

- `source_id`: NEWS-07
- `subcategory`: national daily newspaper
- `source_name`: The New Zealand Herald
- `official_url`: https://www.nzherald.co.nz
- `verified_at`: 2026-11-17 (HTTP GET by the orchestrator)
- `verification_result`: verified
- `source_pages`:
  - https://www.nzherald.co.nz/ | NZ Herald: Breaking & Latest New Zealand News - NZ Herald | index.html
  - https://www.nzherald.co.nz/nz/ | Local & Breaking New Zealand News - Stay Informed With NZ Herald - NZ Herald | nz.html
  - https://www.nzherald.co.nz/world/ | World News - Latest Top International Stories - NZ Herald - NZ Herald | world.html
  - https://www.nzherald.co.nz/business/ | NZ Herald Business - Latest Market & Finance News - NZ Herald | business.html
  - https://www.nzherald.co.nz/sport/ | Sports News: Rugby, Football, Cricket, World Cup, All Blacks - NZ Herald - NZ Herald | sport.html
  - https://www.nzherald.co.nz/entertainment/ | Entertainment - Latest News, Reviews & Celebrity Gossip - NZ Herald - NZ Herald | entertainment.html
  - https://www.nzherald.co.nz/nz/politics/ | Politics - Latest News, Analysis & Opinion - NZ Herald | politics.html
  - https://www.nzherald.co.nz/nz/crime/ | Crime News - Latest Police & Court Updates - NZ Herald | crime.html
  - https://www.nzherald.co.nz/topic/election-2026/ | Election 2026: NZ Election news, results & analysis - NZ Herald | election-2026.html
  - https://www.nzherald.co.nz/video/ | News Video from NZ Herald - Watch Now - NZ Herald | video.html
  - https://www.nzherald.co.nz/topic/opinion/ | Opinion, analysis, reviews and commentary from NZ Herald - NZ Herald | opinion.html
  - https://www.nzherald.co.nz/lifestyle/ | Lifestyle News - Latest Fashion, Food & Royal Stories - NZ Herald | lifestyle.html
  - https://www.nzherald.co.nz/weather/ | NZ Weather - forecasts and news - NZ Herald | weather.html
  - https://www.nzherald.co.nz/premium/ | NZ Herald Premium: Exclusive News, In-Depth Analysis & Insights - NZ Herald | premium.html
  - https://www.nzherald.co.nz/news/podcasts/ | Podcasts from NZ Herald - Listen In - NZ Herald | podcasts.html
- `key_regions`:
  - Header with logo and primary navigation
  - Navigation links (visible in markup)
  - Hero section with featured stories
  - Content bands by section (NZ, World, Business, Sport, etc.)
  - Sidebar with trending or related content
  - Footer with site links and legal information
- `key_interactions`:
  - Section navigation: observed (visible in nav_links)
  - Latest/most-read tabs: inferred (common for news sites, not explicitly visible in markup)
  - Newsletter simulation: inferred (common for news sites, not explicitly visible in markup)
- `complexity`: medium - Multiple section fronts with consistent navigation structure and varied content types
- `stack_clues`: unknown
- `limitations`: No individual article pages were mapped in this evidence set; only section fronts and topic pages were fetched.

```json
{"rows": [{"source_id": "NEWS-07", "subcategory": "national daily newspaper", "source_name": "The New Zealand Herald", "source_url": "https://www.nzherald.co.nz", "verified_at": "2026-11-17", "verification_method": "HTTP GET by the orchestrator", "verification_result": "verified", "evidence_reference": "", "source_pages": [{"url": "https://www.nzherald.co.nz/", "title": "NZ Herald: Breaking & Latest New Zealand News - NZ Herald", "local_file": "index.html"}, {"url": "https://www.nzherald.co.nz/nz/", "title": "Local & Breaking New Zealand News - Stay Informed With NZ Herald - NZ Herald", "local_file": "nz.html"}, {"url": "https://www.nzherald.co.nz/world/", "title": "World News - Latest Top International Stories - NZ Herald - NZ Herald", "local_file": "world.html"}, {"url": "https://www.nzherald.co.nz/business/", "title": "NZ Herald Business - Latest Market & Finance News - NZ Herald", "local_file": "business.html"}, {"url": "https://www.nzherald.co.nz/sport/", "title": "Sports News: Rugby, Football, Cricket, World Cup, All Blacks - NZ Herald - NZ Herald", "local_file": "sport.html"}, {"url": "https://www.nzherald.co.nz/entertainment/", "title": "Entertainment - Latest News, Reviews & Celebrity Gossip - NZ Herald - NZ Herald", "local_file": "entertainment.html"}, {"url": "https://www.nzherald.co.nz/nz/politics/", "title": "Politics - Latest News, Analysis & Opinion - NZ Herald", "local_file": "politics.html"}, {"url": "https://www.nzherald.co.nz/nz/crime/", "title": "Crime News - Latest Police & Court Updates - NZ Herald", "local_file": "crime.html"}, {"url": "https://www.nzherald.co.nz/topic/election-2026/", "title": "Election 2026: NZ Election news, results & analysis - NZ Herald", "local_file": "election-2026.html"}, {"url": "https://www.nzherald.co.nz/video/", "title": "News Video from NZ Herald - Watch Now - NZ Herald", "local_file": "video.html"}, {"url": "https://www.nzherald.co.nz/topic/opinion/", "title": "Opinion, analysis, reviews and commentary from NZ Herald - NZ Herald", "local_file": "opinion.html"}, {"url": "https://www.nzherald.co.nz/lifestyle/", "title": "Lifestyle News - Latest Fashion, Food & Royal Stories - NZ Herald", "local_file": "lifestyle.html"}, {"url": "https://www.nzherald.co.nz/weather/", "title": "NZ Weather - forecasts and news - NZ Herald", "local_file": "weather.html"}, {"url": "https://www.nzherald.co.nz/premium/", "title": "NZ Herald Premium: Exclusive News, In-Depth Analysis & Insights - NZ Herald", "local_file": "premium.html"}, {"url": "https://www.nzherald.co.nz/news/podcasts/", "title": "Podcasts from NZ Herald - Listen In - NZ Herald", "local_file": "podcasts.html"}], "key_regions": ["Header with logo and primary navigation", "Navigation links (visible in markup)", "Hero section with featured stories", "Content bands by section (NZ, World, Business, Sport, etc.)", "Sidebar with trending or related content", "Footer with site links and legal information"], "key_interactions": [{"name": "Section navigation", "evidence": "observed", "notes": "Visible in nav_links"}, {"name": "Latest/most-read tabs", "evidence": "inferred", "notes": "Common for news sites, not explicitly visible in markup"}, {"name": "Newsletter simulation", "evidence": "inferred", "notes": "Common for news sites, not explicitly visible in markup"}], "complexity": "medium", "stack_clues": "unknown", "limitations": "No individual article pages were mapped in this evidence set; only section fronts and topic pages were fetched."}]}
```
