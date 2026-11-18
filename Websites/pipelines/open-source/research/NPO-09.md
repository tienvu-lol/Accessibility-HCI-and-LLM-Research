# NPO-09 — open-source source research (slot 09)

- **Run:** `2026-11-17T05-16-09-175Z-research-NPO-09`
- **Scope:** partial — this file covers NPO-09 only. The rest of the category is researched separately.
- **Research model:** unsloth/Llama-3.3-70B-Instruct-GGUF (vt-arc-falcon-llamacpp, llama3.3-community, open weights) declared for slot 09
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 3/3 candidate homepages and 10/10 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/NPO-09-http-2026-11-17.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### NPO-09
The American Red Cross website was chosen for the NPO-09 slot due to its comprehensive navigation links visible in the fetched markup, indicating a more traditional server-rendered approach that can be verified through HTTP GETs.

- **source_id**: NPO-09
- **subcategory**: cause-focused charity
- **source_name**: American Red Cross
- **official_url**: https://www.redcross.org
- **verified_at**: 2024-09-16
- **verification_result**: verified
- **source_pages**:
  - https://www.redcross.org (American Red Cross | Help Those Affected by Disasters, index.html)
  - https://www.redcross.org/donate/donation.html (Donate Now - Online Donations | American Red Cross, donate.html)
  - https://www.redcross.org/take-a-class/first-aid (First Aid | Learn How to Perform First Aid | Red Cross, first-aid.html)
  - https://www.redcross.org/take-a-class/cpr (Red Cross CPR Training, cpr.html)
  - https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/fire.html (Home Fire Prevention & Safety Tips | American Red Cross, fire-safety.html)
  - https://www.redcross.org/about-us/news-and-events/news/2026/holiday-decorating-fire-safety-tips.html (Help Prevent Home Fires with These Holiday Decorating Safety Tips, holiday-decorating-fire-safety-tips.html)
  - https://www.redcross.org/find-your-local-chapter.html (American Red Cross Locations | Find Your Local Red Cross, find-local-chapter.html)
  - https://www.redcross.org/donations/where-your-money-goes.html (Where Does the Money Go? | American Red Cross, where-your-money-goes.html)
  - https://www.redcross.org/volunteer (Become a Volunteer | American Red Cross, volunteer.html)
- **key_regions**: header, navigation, hero, content bands, sidebar, footer
- **key_interactions**:
  - Donation form (inferred)
  - Volunteer sign-up (inferred)
  - Class registration (inferred)
  - Search functionality (observed)
  - Navigation menu (observed)
- **complexity**: medium
- **stack_clues**: unknown
- **limitations**: 
  - https://www.redcross.org/donate/dr/new-mexico-floods.html (give now, failed to fetch)
  - https://www.redcross.org/donate/holiday-giving.html (give now, failed to fetch)

```json
{"rows": [
  {
    "source_id": "NPO-09",
    "subcategory": "cause-focused charity",
    "source_name": "American Red Cross",
    "source_url": "https://www.redcross.org",
    "verified_at": "2024-09-16",
    "verification_method": "HTTP GET",
    "verification_result": "verified",
    "evidence_reference": "",
    "source_pages": [
      {"url": "https://www.redcross.org", "title": "American Red Cross | Help Those Affected by Disasters", "local_file": "index.html"},
      {"url": "https://www.redcross.org/donate/donation.html", "title": "Donate Now - Online Donations | American Red Cross", "local_file": "donate.html"},
      {"url": "https://www.redcross.org/take-a-class/first-aid", "title": "First Aid | Learn How to Perform First Aid | Red Cross", "local_file": "first-aid.html"},
      {"url": "https://www.redcross.org/take-a-class/cpr", "title": "Red Cross CPR Training", "local_file": "cpr.html"},
      {"url": "https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/fire.html", "title": "Home Fire Prevention & Safety Tips | American Red Cross", "local_file": "fire-safety.html"},
      {"url": "https://www.redcross.org/about-us/news-and-events/news/2026/holiday-decorating-fire-safety-tips.html", "title": "Help Prevent Home Fires with These Holiday Decorating Safety Tips", "local_file": "holiday-decorating-fire-safety-tips.html"},
      {"url": "https://www.redcross.org/find-your-local-chapter.html", "title": "American Red Cross Locations | Find Your Local Red Cross", "local_file": "find-local-chapter.html"},
      {"url": "https://www.redcross.org/donations/where-your-money-goes.html", "title": "Where Does the Money Go? | American Red Cross", "local_file": "where-your-money-goes.html"},
      {"url": "https://www.redcross.org/volunteer", "title": "Become a Volunteer | American Red Cross", "local_file": "volunteer.html"}
    ],
    "key_regions": ["header", "navigation", "hero", "content bands", "sidebar", "footer"],
    "key_interactions": [
      {"name": "Donation form", "evidence": "inferred", "notes": "No donation form found in the fetched markup"},
      {"name": "Volunteer sign-up", "evidence": "inferred", "notes": "No volunteer sign-up form found in the fetched markup"},
      {"name": "Class registration", "evidence": "inferred", "notes": "No class registration form found in the fetched markup"},
      {"name": "Search functionality", "evidence": "observed", "notes": "Search bar found in the navigation menu"},
      {"name": "Navigation menu", "evidence": "observed", "notes": "Navigation menu found at the top of the page"}
    ],
    "complexity": "medium",
    "stack_clues": "unknown",
    "limitations": "https://www.redcross.org/donate/dr/new-mexico-floods.html (give now, failed to fetch), https://www.redcross.org/donate/holiday-giving.html (give now, failed to fetch)"
  }
]}
```
