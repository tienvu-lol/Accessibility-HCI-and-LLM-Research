# NPO-07 — open-source source research (slot 07)

- **Run:** `2026-11-17T04-08-03-770Z-research-NPO-07`
- **Scope:** partial — this file covers NPO-07 only. The rest of the category is researched separately.
- **Research model:** unsloth/Qwen3.6-35B-A3B-GGUF (vt-arc-falcon-llamacpp, apache-2.0, open weights) declared for slot 07
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 1/1 candidate homepages and 13/13 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/NPO-07-http-2026-11-17.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### NPO-07

- **source_id**: NPO-07
- **subcategory**: Non-Profit / NGO
- **source_name**: Oxfam International
- **official_url**: https://www.oxfam.org/en
- **verified_at**: 2026-08-26
- **verification_result**: verified
- **source_pages**:
  - https://www.oxfam.org/en
  - https://www.oxfam.org/en/blogs
  - https://www.oxfam.org/en/research
  - https://www.oxfam.org/en/press-releases
  - https://www.oxfam.org/en/what-we-do/issues/water-and-sanitation
  - https://www.oxfam.org/en/what-we-do/issues/food-climate-and-natural-resources
  - https://www.oxfam.org/en/what-we-do/emergencies/gaza-crisis-appeal
  - https://www.oxfam.org/en/what-we-do/about
  - https://www.oxfam.org/en/take-action/campaigns
  - https://www.oxfam.org/en/take-action/jobs
  - https://www.oxfam.org/en/take-action/volunteer-us
  - https://www.oxfam.org/en?form=general
  - https://www.oxfam.org/en/what-we-do/about/our-finances-and-accountability/annual-reports-and-financial-statements
- **key_regions**: Global, Gaza, South Sudan, Nepal, East Africa
- **key_interactions**:
  - Donation Form: observed (URL parameter `?form=general` present on multiple pages)
  - Job Application: observed (dedicated `/jobs` section)
  - Volunteer Sign-up: observed (dedicated `/volunteer-us` section)
  - Content Filtering: observed (URL parameters like `?f[0]=` and `?facets_query=`)
  - Pagination: observed (`?page=...` parameters)
  - Language Switching: observed (links to `/fr`, `/es`)
- **complexity**: medium
- **stack_clues**: URL structure includes `/node/` paths and query parameters like `?f[0]=` and `?form=`, consistent with a Drupal CMS.
- **limitations**: Markup inspection only. No JavaScript execution, form submission, or visual rendering was performed. Dynamic content loading via AJAX cannot be verified.

```json
{"rows": [{"source_id": "NPO-07", "subcategory": "Non-Profit / NGO", "source_name": "Oxfam International", "source_url": "https://www.oxfam.org/en", "verified_at": "2026-08-26", "verification_method": "HTTP GET", "verification_result": "verified", "evidence_reference": "", "source_pages": [{"url": "https://www.oxfam.org/en", "title": "The future is equal | Oxfam International", "local_file": "index.html"}, {"url": "https://www.oxfam.org/en/blogs", "title": "Blogs | Oxfam International", "local_file": "blogs.html"}, {"url": "https://www.oxfam.org/en/research", "title": "Policy Papers | Oxfam International", "local_file": "research.html"}, {"url": "https://www.oxfam.org/en/press-releases", "title": "Press releases | Oxfam International", "local_file": "press-releases.html"}, {"url": "https://www.oxfam.org/en/what-we-do/issues/water-and-sanitation", "title": "Water and Sanitation | Oxfam International", "local_file": "water-and-sanitation.html"}, {"url": "https://www.oxfam.org/en/what-we-do/issues/food-climate-and-natural-resources", "title": "Food, Climate, and Natural Resources | Oxfam International", "local_file": "food-climate-natural-resources.html"}, {"url": "https://www.oxfam.org/en/what-we-do/emergencies/gaza-crisis-appeal", "title": "Gaza Crisis Appeal | Oxfam International", "local_file": "gaza-crisis-appeal.html"}, {"url": "https://www.oxfam.org/en/what-we-do/about", "title": "About Us | Oxfam International", "local_file": "about.html"}, {"url": "https://www.oxfam.org/en/take-action/campaigns", "title": "Campaign With Us | Oxfam International", "local_file": "campaigns.html"}, {"url": "https://www.oxfam.org/en/take-action/jobs", "title": "Work With Us | Oxfam International", "local_file": "jobs.html"}, {"url": "https://www.oxfam.org/en/take-action/volunteer-us", "title": "Volunteer With Us | Oxfam International", "local_file": "volunteer-us.html"}, {"url": "https://www.oxfam.org/en?form=general", "title": "The future is equal | Oxfam International", "local_file": "donate.html"}, {"url": "https://www.oxfam.org/en/what-we-do/about/our-finances-and-accountability/annual-reports-and-financial-statements", "title": "Annual Reports and Financial Statements | Oxfam International", "local_file": "annual-reports.html"}], "key_regions": ["Global", "Gaza", "South Sudan", "Nepal", "East Africa"], "key_interactions": [{"name": "Donation Form", "evidence": "observed", "notes": "URL parameter ?form=general present on multiple pages"}, {"name": "Job Application", "evidence": "observed", "notes": "Dedicated /jobs section"}, {"name": "Volunteer Sign-up", "evidence": "observed", "notes": "Dedicated /volunteer-us section"}, {"name": "Content Filtering", "evidence": "observed", "notes": "URL parameters like ?f[0]= and ?facets_query="}, {"name": "Pagination", "evidence": "observed", "notes": "?page=... parameters"}, {"name": "Language Switching", "evidence": "observed", "notes": "Links to /fr, /es"}], "complexity": "medium", "stack_clues": "URL structure includes /node/ paths and query parameters like ?f[0]= and ?form=, consistent with a Drupal CMS.", "limitations": "Markup inspection only. No JavaScript execution, form submission, or visual rendering was performed. Dynamic content loading via AJAX cannot be verified."}]}
```
