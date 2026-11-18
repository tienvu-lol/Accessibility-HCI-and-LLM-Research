# CHUR-07 — open-source source research (slot 07)

- **Run:** `2026-11-16T21-45-45-988Z-research-CHUR-07`
- **Scope:** partial — this file covers CHUR-07 only. The rest of the category is researched separately.
- **Research model:** unsloth/Qwen3.6-35B-A3B-GGUF (vt-arc-falcon-llamacpp, apache-2.0, open weights) declared for slot 07
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 2/3 candidate homepages and 12/12 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/CHUR-07-http-2026-11-16.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### CHUR-07

- `source_id`: CHUR-07
- `subcategory`: large or multisite church
- `source_name`: Saddleback Church
- `official_url`: https://saddleback.com/
- `verified_at`: 2024-05-22 HTTP GET by the orchestrator
- `verification_result`: verified
- `source_pages`:
    - `url`: https://saddleback.com/
      `title`: Saddleback Church
      `local_file`: index.html
    - `url`: https://saddleback.com/locations/
      `title`: Locations | Saddleback Church
      `local_file`: locations.html
    - `url`: https://saddleback.com/watch/
      `title`: Watch Saddleback Online
      `local_file`: watch.html
    - `url`: https://saddleback.com/about/
      `title`: About Us
      `local_file`: about.html
    - `url`: https://saddleback.com/care/
      `title`: Saddleback Cares
      `local_file`: care.html
    - `url`: https://saddleback.com/giving/
      `title`: Giving | Saddleback Church
      `local_file`: giving.html
    - `url`: https://saddleback.com/events
      `title`: Events | Saddleback Church
      `local_file`: events.html
    - `url`: https://saddleback.com/sections/get-involved/adults/small-groups/
      `title`: Small Groups | Saddleback Church
      `local_file`: small-groups.html
    - `url`: https://saddleback.com/sections/get-care/prayer/
      `title`: Prayer | Saddleback Church
      `local_file`: prayer.html
    - `url`: https://saddleback.com/sections/pursue-growth/resources/
      `title`: Resources | Saddleback Church
      `local_file`: resources.html
    - `url`: https://saddleback.com/sections/more/careers/
      `title`: Careers | Saddleback Church
      `local_file`: careers.html
    - `url`: https://saddleback.com/sections/more/contact-us/
      `title`: Contact Us | Saddleback Church
      `local_file`: contact-us.html
- `key_regions`:
    - Header Navigation (Home, Locations, Watch, About, Care, Giving, My Dashboard)
    - Footer (Privacy Policy, Terms of Use, Language Switcher)
    - Sermon Listings (Watch page)
    - Giving Section (Giving page)
    - Event Listings (Events page)
    - Small Groups Directory (Small Groups page)
    - Prayer Resources (Prayer page)
    - Resource Library (Resources page)
    - Career Opportunities (Careers page)
    - Contact Directory (Contact page)
- `key_interactions`:
    - `name`: Find Your Group
      `evidence`: observed
      `notes`: Link to /groups/find-a-group present on Small Groups page.
    - `name`: Give Now
      `evidence`: observed
      `notes`: Tithely links with "Give Now" text present on Giving page.
    - `name`: Language Switch
      `evidence`: observed
      `notes`: Links to /es, /fil-ph, /zh-hans, /zh-hant present in footer and other links.
    - `name`: Sermon View
      `evidence`: observed
      `notes`: Links to specific sermon pages (e.g., /resource/timeless-truths/1465) present on Watch page.
    - `name`: Prayer Request
      `evidence`: inferred
      `notes`: Prayer page exists; form structure not visible in fetched markup.
    - `name`: Event Search
      `evidence`: inferred
      `notes`: Events page exists; search interface not visible in fetched markup.
- `complexity`: medium
  `rationale`: Multi-page structure with distinct sections for ministries, giving, events, and resources; consistent navigation across pages.
- `stack_clues`: unknown
- `limitations`: None. All requested pages returned 200 OK.

```json
{"rows": [{"source_id": "CHUR-07", "subcategory": "large or multisite church", "source_name": "Saddleback Church", "source_url": "https://saddleback.com/", "verified_at": "2024-05-22", "verification_method": "HTTP GET by the orchestrator", "verification_result": "verified", "evidence_reference": "", "source_pages": [{"url": "https://saddleback.com/", "title": "Saddleback Church", "local_file": "index.html"}, {"url": "https://saddleback.com/locations/", "title": "Locations | Saddleback Church", "local_file": "locations.html"}, {"url": "https://saddleback.com/watch/", "title": "Watch Saddleback Online", "local_file": "watch.html"}, {"url": "https://saddleback.com/about/", "title": "About Us", "local_file": "about.html"}, {"url": "https://saddleback.com/care/", "title": "Saddleback Cares", "local_file": "care.html"}, {"url": "https://saddleback.com/giving/", "title": "Giving | Saddleback Church", "local_file": "giving.html"}, {"url": "https://saddleback.com/events", "title": "Events | Saddleback Church", "local_file": "events.html"}, {"url": "https://saddleback.com/sections/get-involved/adults/small-groups/", "title": "Small Groups | Saddleback Church", "local_file": "small-groups.html"}, {"url": "https://saddleback.com/sections/get-care/prayer/", "title": "Prayer | Saddleback Church", "local_file": "prayer.html"}, {"url": "https://saddleback.com/sections/pursue-growth/resources/", "title": "Resources | Saddleback Church", "local_file": "resources.html"}, {"url": "https://saddleback.com/sections/more/careers/", "title": "Careers | Saddleback Church", "local_file": "careers.html"}, {"url": "https://saddleback.com/sections/more/contact-us/", "title": "Contact Us | Saddleback Church", "local_file": "contact-us.html"}], "key_regions": ["Header Navigation", "Footer", "Sermon Listings", "Giving Section", "Event Listings", "Small Groups Directory", "Prayer Resources", "Resource Library", "Career Opportunities", "Contact Directory"], "key_interactions": [{"name": "Find Your Group", "evidence": "observed", "notes": "Link to /groups/find-a-group present on Small Groups page."}, {"name": "Give Now", "evidence": "observed", "notes": "Tithely links with 'Give Now' text present on Giving page."}, {"name": "Language Switch", "evidence": "observed", "notes": "Links to /es, /fil-ph, /zh-hans, /zh-hant present in footer and other links."}, {"name": "Sermon View", "evidence": "observed", "notes": "Links to specific sermon pages present on Watch page."}, {"name": "Prayer Request", "evidence": "inferred", "notes": "Prayer page exists; form structure not visible in fetched markup."}, {"name": "Event Search", "evidence": "inferred", "notes": "Events page exists; search interface not visible in fetched markup."}], "complexity": "medium", "stack_clues": "unknown", "limitations": "None. All requested pages returned 200 OK."}]}
```
