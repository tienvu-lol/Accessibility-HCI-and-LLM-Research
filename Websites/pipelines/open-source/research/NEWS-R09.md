# NEWS-R09 — open-source source research (slot 09)

- **Run:** `2026-11-17T05-49-15-024Z-research-NEWS-R09`
- **Scope:** partial — this file covers NEWS-R09 only. The rest of the category is researched separately.
- **Research model:** unsloth/Llama-3.3-70B-Instruct-GGUF (vt-arc-falcon-llamacpp, llama3.3-community, open weights) declared for slot 09
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 3/3 candidate homepages and 13/13 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/NEWS-R09-http-2026-11-17.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### NEWS-R09
- source_id: NEWS-R09
- subcategory: public broadcaster or nonprofit newsroom
- source_name: PBS NewsHour
- official_url: https://www.pbs.org/newshour/
- verified_at: 2026-11-16
- verification_result: verified
- source_pages:
  - https://www.pbs.org/newshour/ (PBS News: News, Analysis, Top Headlines, Live Coverage, index.html)
  - https://www.pbs.org/newshour/show/november-16-2026-pbs-news-hour-full-episode (November 16, 2026 - PBS News Hour full episode | PBS News, full-episode.html)
  - https://www.pbs.org/newshour/video (Video | PBS News, video.html)
  - https://www.pbs.org/newshour/podcasts (Podcasts | PBS News, podcasts.html)
  - https://www.pbs.org/newshour/newsletters (Newsletters | PBS News, newsletters.html)
  - https://www.pbs.org/newshour/latest (The Latest | PBS News, latest.html)
  - https://www.pbs.org/newshour/politics (Politics | PBS News, politics.html)
  - https://www.pbs.org/newshour/arts (Arts | PBS News, arts.html)
  - https://www.pbs.org/newshour/nation (Nation | PBS News, nation.html)
  - https://www.pbs.org/newshour/world (World | PBS News, world.html)
  - https://www.pbs.org/newshour/health (Health | PBS News, health.html)
  - https://www.pbs.org/newshour/education (Education | PBS News, education.html)
  - https://www.pbs.org/newshour/about (About Us | PBS News, about.html)
- key_regions: ["header", "navigation", "hero", "content bands", "sidebar", "footer"]
- key_interactions: 
  - {"name": "section navigation", "evidence": "observed", "notes": "Navigation menu is present on all pages"}
  - {"name": "search", "evidence": "inferred", "notes": "No search bar found in the fetched markup"}
  - {"name": "newsletter subscription", "evidence": "observed", "notes": "Newsletter subscription link is present on all pages"}
- complexity: medium
- stack_clues: unknown
- limitations: 
  - https://www.pbs.org/newshour/presspass/ (status: unknown, reason: not fetched)
  - https://www.pbs.org/newshour/elections-2026/results (status: unknown, reason: not fetched)

```json
{"rows": [
  {
    "source_id": "NEWS-R09",
    "subcategory": "public broadcaster or nonprofit newsroom",
    "source_name": "PBS NewsHour",
    "source_url": "https://www.pbs.org/newshour/",
    "verified_at": "2026-11-16",
    "verification_method": "HTTP GET",
    "verification_result": "verified",
    "evidence_reference": "",
    "source_pages": [
      {"url": "https://www.pbs.org/newshour/", "title": "PBS News: News, Analysis, Top Headlines, Live Coverage", "local_file": "index.html"},
      {"url": "https://www.pbs.org/newshour/show/november-16-2026-pbs-news-hour-full-episode", "title": "November 16, 2026 - PBS News Hour full episode | PBS News", "local_file": "full-episode.html"},
      {"url": "https://www.pbs.org/newshour/video", "title": "Video | PBS News", "local_file": "video.html"},
      {"url": "https://www.pbs.org/newshour/podcasts", "title": "Podcasts | PBS News", "local_file": "podcasts.html"},
      {"url": "https://www.pbs.org/newshour/newsletters", "title": "Newsletters | PBS News", "local_file": "newsletters.html"},
      {"url": "https://www.pbs.org/newshour/latest", "title": "The Latest | PBS News", "local_file": "latest.html"},
      {"url": "https://www.pbs.org/newshour/politics", "title": "Politics | PBS News", "local_file": "politics.html"},
      {"url": "https://www.pbs.org/newshour/arts", "title": "Arts | PBS News", "local_file": "arts.html"},
      {"url": "https://www.pbs.org/newshour/nation", "title": "Nation | PBS News", "local_file": "nation.html"},
      {"url": "https://www.pbs.org/newshour/world", "title": "World | PBS News", "local_file": "world.html"},
      {"url": "https://www.pbs.org/newshour/health", "title": "Health | PBS News", "local_file": "health.html"},
      {"url": "https://www.pbs.org/newshour/education", "title": "Education | PBS News", "local_file": "education.html"},
      {"url": "https://www.pbs.org/newshour/about", "title": "About Us | PBS News", "local_file": "about.html"}
    ],
    "key_regions": ["header", "navigation", "hero", "content bands", "sidebar", "footer"],
    "key_interactions": [
      {"name": "section navigation", "evidence": "observed", "notes": "Navigation menu is present on all pages"},
      {"name": "search", "evidence": "inferred", "notes": "No search bar found in the fetched markup"},
      {"name": "newsletter subscription", "evidence": "observed", "notes": "Newsletter subscription link is present on all pages"}
    ],
    "complexity": "medium",
    "stack_clues": "unknown",
    "limitations": "https://www.pbs.org/newshour/presspass/ (status: unknown, reason: not fetched), https://www.pbs.org/newshour/elections-2026/results (status: unknown, reason: not fetched)"
  }
]}
```
