# GOV-07 — open-source source research (slot 07)

- **Run:** `2026-11-16T21-31-49-701Z-research-GOV-07`
- **Scope:** partial — this file covers GOV-07 only. The rest of the category is researched separately.
- **Research model:** unsloth/Qwen3.6-35B-A3B-GGUF (vt-arc-falcon-llamacpp, apache-2.0, open weights) declared for slot 07
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 3/3 candidate homepages and 13/13 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/GOV-07-http-2026-11-16.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### GOV-07

- `source_id`: GOV-07
- `subcategory`: municipal government
- `source_name`: City of Austin
- `official_url`: https://www.austintexas.gov
- `verified_at`: 2024-05-22 HTTP GET by the orchestrator
- `verification_result`: verified
- `source_pages`:
  - `url`: https://www.austintexas.gov/
    `title`: City of Austin | AustinTexas.gov
    `local_file`: index.html
  - `url`: https://www.austintexas.gov/services
    `title`: All City Services | AustinTexas.gov
    `local_file`: services.html
  - `url`: https://www.austintexas.gov/departments
    `title`: Departments | AustinTexas.gov
    `local_file`: departments.html
  - `url`: https://www.austintexas.gov/news
    `title`: News | AustinTexas.gov
    `local_file`: news.html
  - `url`: https://www.austintexas.gov/events
    `title`: Events | AustinTexas.gov
    `local_file`: events.html
  - `url`: https://www.austintexas.gov/311
    `title`: Service Request
    `local_file`: service-request.html
  - `url`: https://www.austintexas.gov/services/pay-utility-bill
    `title`: Pay a City of Austin utility bill | AustinTexas.gov
    `local_file`: pay-utility-bill.html
  - `url`: https://www.austintexas.gov/housing
    `title`: Austin Housing | City of Austin | AustinTexas.gov
    `local_file`: housing.html
  - `url`: https://www.austintexas.gov/parks/locations/park-directory
    `title`: Park Directory | Austin Parks and Recreation | AustinTexas.gov
    `local_file`: park-directory.html
  - `url`: https://www.austintexas.gov/police
    `title`: Austin Police | City of Austin | AustinTexas.gov
    `local_file`: police.html
  - `url`: https://www.austintexas.gov/development-services/types-permits
    `title`: Types of Permits | Austin Development Services | AustinTexas.gov
    `local_file`: permits.html
  - `url`: https://www.austintexas.gov/animal-services
    `title`: Austin Animal Services | City of Austin | AustinTexas.gov
    `local_file`: animal-services.html
- `key_regions`:
  - Header: Contains main navigation links (Services, Departments, Housing, etc.), search, and contact links.
  - Navigation: Deep hierarchical structure visible in markup, including sub-pages for specific services and departments.
  - Hero: Inferred from page size and structure, though not explicitly tagged in the text.
  - Content Bands: News listings with dates and snippets, Event listings with dates and locations, Service category grids, Department directory lists.
  - Footer: Contains links to 311, social media, RSS feeds, legal notices, and privacy policies.
- `key_interactions`:
  - `name`: Service Search
    `observed`: inferred
  - `name`: Alerts
    `observed`: inferred
  - `name`: Calendar Navigation
    `observed`: inferred
  - `name`: Report-a-Problem Form
    `observed`: observed (311 link present, though it redirects)
  - `name`: Language Control
    `observed`: not observed
- `complexity`: high — Large byte counts (up to 187KB), deep navigation with many sub-pages, and diverse content types (news, events, services, departments).
- `stack_clues`: unknown
- `limitations`: The 311 Service Request page redirects to an external domain (`austin-cwiprod.motorolasolutions.com`), so the actual form markup is not present in the local fetch.

```json
{"rows": [{"source_id": "GOV-07", "subcategory": "municipal government", "source_name": "City of Austin", "source_url": "https://www.austintexas.gov", "verified_at": "2024-05-22 HTTP GET by the orchestrator", "verification_method": "HTTP GET by the orchestrator", "verification_result": "verified", "evidence_reference": "", "source_pages": [{"url": "https://www.austintexas.gov/", "title": "City of Austin | AustinTexas.gov", "local_file": "index.html"}, {"url": "https://www.austintexas.gov/services", "title": "All City Services | AustinTexas.gov", "local_file": "services.html"}, {"url": "https://www.austintexas.gov/departments", "title": "Departments | AustinTexas.gov", "local_file": "departments.html"}, {"url": "https://www.austintexas.gov/news", "title": "News | AustinTexas.gov", "local_file": "news.html"}, {"url": "https://www.austintexas.gov/events", "title": "Events | AustinTexas.gov", "local_file": "events.html"}, {"url": "https://www.austintexas.gov/311", "title": "Service Request", "local_file": "service-request.html"}, {"url": "https://www.austintexas.gov/services/pay-utility-bill", "title": "Pay a City of Austin utility bill | AustinTexas.gov", "local_file": "pay-utility-bill.html"}, {"url": "https://www.austintexas.gov/housing", "title": "Austin Housing | City of Austin | AustinTexas.gov", "local_file": "housing.html"}, {"url": "https://www.austintexas.gov/parks/locations/park-directory", "title": "Park Directory | Austin Parks and Recreation | AustinTexas.gov", "local_file": "park-directory.html"}, {"url": "https://www.austintexas.gov/police", "title": "Austin Police | City of Austin | AustinTexas.gov", "local_file": "police.html"}, {"url": "https://www.austintexas.gov/development-services/types-permits", "title": "Types of Permits | Austin Development Services | AustinTexas.gov", "local_file": "permits.html"}, {"url": "https://www.austintexas.gov/animal-services", "title": "Austin Animal Services | City of Austin | AustinTexas.gov", "local_file": "animal-services.html"}], "key_regions": ["Header", "Navigation", "Hero", "Content Bands", "Footer"], "key_interactions": [{"name": "Service Search", "evidence": "inferred", "notes": "Common for this site type, not explicitly in nav_links"}, {"name": "Alerts", "evidence": "inferred", "notes": "News and events suggest alert functionality"}, {"name": "Calendar Navigation", "evidence": "inferred", "notes": "Events page has dates"}, {"name": "Report-a-Problem Form", "evidence": "observed", "notes": "311 link present"}, {"name": "Language Control", "evidence": "not observed", "notes": "Not found in markup"}], "complexity": "high", "stack_clues": "unknown", "limitations": "311 page redirects to external site"}]}
```

**Coordination View:**

| Slot | Status | Source |
| :--- | :--- | :--- |
| GOV-01 | Held | Claude |
| GOV-02 | Held | Claude |
| GOV-03 | Held | Claude |
| GOV-04 | Held | Codex |
| GOV-05 | Held | Codex |
| GOV-06 | Held | Codex |
| GOV-07 | Proposed | City of Austin |
| GOV-08 | Pending | |
| GOV-09 | Pending | |
| GOV-10 | Pending | |
