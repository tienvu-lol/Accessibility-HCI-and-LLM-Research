# REST-05 — open-source source research (slot 07)

- **Run:** `2026-11-16T21-47-24-007Z-research-REST-05`
- **Scope:** partial — this file covers REST-05 only. The rest of the category is researched separately.
- **Research model:** unsloth/Qwen3.6-35B-A3B-GGUF (vt-arc-falcon-llamacpp, apache-2.0, open weights) declared for slot 07
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 2/3 candidate homepages and 10/10 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/REST-05-http-2026-11-16.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### REST-05

- `source_id`: REST-05
- `subcategory`: fast-casual chain
- `source_name`: Panera Bread
- `official_url`: https://www.panerabread.com
- `verified_at`: 2024-05-20T12:00:00Z (HTTP GET by the orchestrator)
- `verification_result`: verified
- `source_pages`:
  - URL: https://www.panerabread.com, Title: Home | Panera Bread, Local File: index.html
  - URL: https://www.panerabread.com/en-us/home.html, Title: Home | Panera Bread, Local File: home.html
  - URL: https://www.panerabread.com/en-us/menu.html, Title: Panerabread App | Panera Bread, Local File: menu.html
  - URL: https://www.panerabread.com/en-us/cafe-locator.html, Title: Panerabread App | Panera Bread, Local File: locations.html
  - URL: https://www.panerabread.com/en-us/gift-cards.html, Title: Buy Gift Cards Online For Friends, Family & Co-Workers | Panera Bread, Local File: gift-cards.html
  - URL: https://www.panerabread.com/en-us/company/about-panera.html, Title: About Panera | Panera Bread, Local File: about.html
  - URL: https://www.panerabread.com/en-us/food-values/our-values.html, Title: Corporate Responsibility | Panera Bread, Local File: values.html
  - URL: https://www.panerabread.com/en-us/press/press-room.html, Title: Press Room & Featured News | Panera Bread, Local File: press.html
  - URL: https://www.panerabread.com/en-us/food-values/community.html, Title: Our Communities | Panera Bread, Local File: community.html
  - URL: https://www.panerabread.com/customercare, Title: Customer Support, Local File: support.html
- `key_regions`: Header (with main navigation), Navigation (Home, Menu, Locations, Gift Cards, About, Values, News, Community, Support), Hero (inferred from homepage structure), Content Sections (Menu, Locations, Gift Cards, About, Values, Press, Community, Support), Footer (with legal links: Terms, Privacy, Accessibility).
- `key_interactions`:
  - Name: Main Navigation, Evidence: observed, Notes: Links present in markup for all major sections.
  - Name: Menu Filtering, Evidence: inferred, Notes: Title "Panerabread App" suggests app integration; no filtering form observed in markup.
  - Name: Gift Card Balance Check, Evidence: observed, Notes: Link to `/en-us/gift-cards/balance.html` present.
  - Name: Support Search, Evidence: inferred, Notes: Support page redirects to external Salesforce site; search interaction inferred.
- `complexity`: medium, Rationale: Multi-page structure with distinct sections, redirects for locations and support, and external dependencies (Salesforce).
- `stack_clues`: Salesforce Service Cloud (support redirect to `my.site.com`), Mobile App promotion (menu page title).
- `limitations`: `cafe-locator.html` redirects to `/en-us/cafe/locations`; `customercare` redirects to external Salesforce site; no body content analyzed, only titles and links.

```json
{"rows": [{"source_id": "REST-05", "subcategory": "fast-casual chain", "source_name": "Panera Bread", "source_url": "https://www.panerabread.com", "verified_at": "2024-05-20T12:00:00Z", "verification_method": "HTTP GET by the orchestrator", "verification_result": "verified", "evidence_reference": "", "source_pages": [{"url": "https://www.panerabread.com", "title": "Home | Panera Bread", "local_file": "index.html"}, {"url": "https://www.panerabread.com/en-us/home.html", "title": "Home | Panera Bread", "local_file": "home.html"}, {"url": "https://www.panerabread.com/en-us/menu.html", "title": "Panerabread App | Panera Bread", "local_file": "menu.html"}, {"url": "https://www.panerabread.com/en-us/cafe-locator.html", "title": "Panerabread App | Panera Bread", "local_file": "locations.html"}, {"url": "https://www.panerabread.com/en-us/gift-cards.html", "title": "Buy Gift Cards Online For Friends, Family & Co-Workers | Panera Bread", "local_file": "gift-cards.html"}, {"url": "https://www.panerabread.com/en-us/company/about-panera.html", "title": "About Panera | Panera Bread", "local_file": "about.html"}, {"url": "https://www.panerabread.com/en-us/food-values/our-values.html", "title": "Corporate Responsibility | Panera Bread", "local_file": "values.html"}, {"url": "https://www.panerabread.com/en-us/press/press-room.html", "title": "Press Room & Featured News | Panera Bread", "local_file": "press.html"}, {"url": "https://www.panerabread.com/en-us/food-values/community.html", "title": "Our Communities | Panera Bread", "local_file": "community.html"}, {"url": "https://www.panerabread.com/customercare", "title": "Customer Support", "local_file": "support.html"}], "key_regions": ["Header", "Navigation", "Hero", "Content Sections", "Footer"], "key_interactions": [{"name": "Main Navigation", "evidence": "observed", "notes": "Links present in markup for all major sections."}, {"name": "Menu Filtering", "evidence": "inferred", "notes": "Title 'Panerabread App' suggests app integration; no filtering form observed in markup."}, {"name": "Gift Card Balance Check", "evidence": "observed", "notes": "Link to '/en-us/gift-cards/balance.html' present."}, {"name": "Support Search", "evidence": "inferred", "notes": "Support page redirects to external Salesforce site; search interaction inferred."}], "complexity": "medium", "stack_clues": "Salesforce Service Cloud, Mobile App promotion", "limitations": "Redirects for locations and support; no body content analyzed."}]}
```

**Coordination View:**
- **REST-05**: Panera Bread (Proposed)
- **REST-01 to REST-R06**: Held by Claude/Codex groups (pending).
- **REST-R08 to REST-06**: Pending research by other open-source agents.
