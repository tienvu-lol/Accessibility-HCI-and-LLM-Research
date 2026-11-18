# REST-09 — open-source source research (slot 09)

- **Run:** `2026-11-17T05-28-01-311Z-research-REST-09`
- **Scope:** partial — this file covers REST-09 only. The rest of the category is researched separately.
- **Research model:** unsloth/Llama-3.3-70B-Instruct-GGUF (vt-arc-falcon-llamacpp, llama3.3-community, open weights) declared for slot 09
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 3/3 candidate homepages and 8/8 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/REST-09-http-2026-11-17.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### REST-09
- `source_id`: REST-09
- `subcategory`: brewery
- `source_name`: Firestone Walker Brewing Company
- `official_url`: https://www.firestonewalker.com/
- `verified_at`: 2026-03-08
- `verification_result`: verified
- `source_pages`: 
  - https://www.firestonewalker.com/ (index.html)
  - https://www.firestonewalker.com/our-beers/ (our-beers.html)
  - https://www.firestonewalker.com/about-us/ (about-us.html)
  - https://www.firestonewalker.com/stories/ (stories.html)
  - https://www.firestonewalker.com/paso-robles-taproom/ (paso-robles-taproom.html)
  - https://www.firestonewalker.com/find-beer/ (find-beer.html)
  - https://www.firestonewalker.com/contact/ (contact.html)
  - https://www.firestonewalker.com/accessibility/ (accessibility.html)
- `key_regions`: 
  - Header
  - Navigation
  - Hero
  - Content bands
  - Footer
- `key_interactions`: 
  - Menu filtering (inferred)
  - Responsive navigation (observed)
  - Open/closed hours display (inferred)
  - Newsletter signup (inferred)
- `complexity`: medium
- `stack_clues`: unknown
- `limitations`: None of the pages failed to load, but some interactions like menu filtering and newsletter signup are inferred as they are not directly observable from the fetched markup.

```json
{"rows": [
  {
    "source_id": "REST-09",
    "subcategory": "brewery",
    "source_name": "Firestone Walker Brewing Company",
    "source_url": "https://www.firestonewalker.com/",
    "verified_at": "2026-03-08",
    "verification_method": "HTTP GET by the orchestrator",
    "verification_result": "verified",
    "evidence_reference": "",
    "source_pages": [
      {"url": "https://www.firestonewalker.com/", "title": "Firestone Walker Brewing Company", "local_file": "index.html"},
      {"url": "https://www.firestonewalker.com/our-beers/", "title": "Our Beers - Firestone Walker Brewing Company", "local_file": "our-beers.html"},
      {"url": "https://www.firestonewalker.com/about-us/", "title": "About Us - Firestone Walker Brewing Company", "local_file": "about-us.html"},
      {"url": "https://www.firestonewalker.com/stories/", "title": "Stories - Firestone Walker Brewing Company", "local_file": "stories.html"},
      {"url": "https://www.firestonewalker.com/paso-robles-taproom/", "title": "Paso Robles - Firestone Walker Brewing Company", "local_file": "paso-robles-taproom.html"},
      {"url": "https://www.firestonewalker.com/find-beer/", "title": "Find Beer - Firestone Walker Brewing Company", "local_file": "find-beer.html"},
      {"url": "https://www.firestonewalker.com/contact/", "title": "Contact - Firestone Walker Brewing Company", "local_file": "contact.html"},
      {"url": "https://www.firestonewalker.com/accessibility/", "title": "Accessibility Statement - Firestone Walker Brewing Company", "local_file": "accessibility.html"}
    ],
    "key_regions": ["Header", "Navigation", "Hero", "Content bands", "Footer"],
    "key_interactions": [
      {"name": "Menu filtering", "evidence": "inferred", "notes": "Not directly observable from the fetched markup"},
      {"name": "Responsive navigation", "evidence": "observed", "notes": "Observed in the fetched markup"},
      {"name": "Open/closed hours display", "evidence": "inferred", "notes": "Not directly observable from the fetched markup"},
      {"name": "Newsletter signup", "evidence": "inferred", "notes": "Not directly observable from the fetched markup"}
    ],
    "complexity": "medium",
    "stack_clues": "unknown",
    "limitations": "Some interactions are inferred due to lack of direct observation in the fetched markup"
  }
]}
```
