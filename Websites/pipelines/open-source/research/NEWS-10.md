# NEWS-10 — open-source source research (slot 10)

- **Run:** `2026-11-17T05-12-33-269Z-research-NEWS-10`
- **Scope:** partial — this file covers NEWS-10 only. The rest of the category is researched separately.
- **Research model:** unsloth/gpt-oss-120b-GGUF (vt-arc-falcon-llamacpp, apache-2.0, open weights) declared for slot 10
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 2/3 candidate homepages and 10/10 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/NEWS-10-http-2026-11-17.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### NEWS-10
{
  "source_id": "NEWS-10",
  "subcategory": "additional distinct national daily newspaper (complexity-matched reserve)",
  "source_name": "Los Angeles Times",
  "official_url": "https://www.latimes.com/",
  "verified_at": "2026-11-16T00:00:00Z (HTTP GET by the orchestrator)",
  "verification_result": "verified",
  "source_pages": [
    {
      "url": "https://www.latimes.com/",
      "title": "News from California, across the nation and world - Los Angeles Times",
      "local_file": "home-index.html"
    },
    {
      "url": "https://www.latimes.com/politics",
      "title": "Politics - Los Angeles Times",
      "local_file": "politics-index.html"
    },
    {
      "url": "https://www.latimes.com/business",
      "title": "Business - Los Angeles Times",
      "local_file": "business-index.html"
    },
    {
      "url": "https://www.latimes.com/business/technology",
      "title": "Technology & the Internet - Los Angeles Times",
      "local_file": "technology-index.html"
    },
    {
      "url": "https://www.latimes.com/world-nation",
      "title": "World & Nation News: Breaking Stories, Politics & Global Events - Los Angeles Times",
      "local_file": "world-index.html"
    },
    {
      "url": "https://www.latimes.com/science",
      "title": "Science & Medicine - Los Angeles Times",
      "local_file": "science-index.html"
    },
    {
      "url": "https://www.latimes.com/environment",
      "title": "Climate & Environment - Los Angeles Times",
      "local_file": "environment-index.html"
    },
    {
      "url": "https://www.latimes.com/entertainment-arts",
      "title": "Entertainment & Arts - Los Angeles Times",
      "local_file": "entertainment-arts-index.html"
    },
    {
      "url": "https://www.latimes.com/food",
      "title": "Food - Los Angeles Times",
      "local_file": "food-index.html"
    }
  ],
  "key_regions": [
    "header",
    "primary navigation",
    "hero/banner",
    "content list sections",
    "sidebar (where present)",
    "footer"
  ],
  "key_interactions": [
    {
      "name": "section navigation",
      "evidence": "observed",
      "notes": "Nav links list major sections (Politics, Business, etc.) in the fetched markup."
    },
    {
      "name": "local article search",
      "evidence": "inferred",
      "notes": "Typical news sites provide a search field, but no search form was present in the captured HTML."
    },
    {
      "name": "newsletter subscription",
      "evidence": "inferred",
      "notes": "Newsletter links are common on news homepages but not visible in the retrieved markup."
    }
  ],
  "complexity": "medium",
  "stack_clues": "unknown",
  "limitations": ""
}

```json
{
  "rows": [
    {
      "source_id": "NEWS-10",
      "subcategory": "additional distinct national daily newspaper (complexity-matched reserve)",
      "source_name": "Los Angeles Times",
      "source_url": "https://www.latimes.com/",
      "verified_at": "2026-11-16T00:00:00Z (HTTP GET by the orchestrator)",
      "verification_method": "HTTP GET by the orchestrator",
      "verification_result": "verified",
      "evidence_reference": "",
      "source_pages": [
        {
          "url": "https://www.latimes.com/",
          "title": "News from California, across the nation and world - Los Angeles Times",
          "local_file": "home-index.html"
        },
        {
          "url": "https://www.latimes.com/politics",
          "title": "Politics - Los Angeles Times",
          "local_file": "politics-index.html"
        },
        {
          "url": "https://www.latimes.com/business",
          "title": "Business - Los Angeles Times",
          "local_file": "business-index.html"
        },
        {
          "url": "https://www.latimes.com/business/technology",
          "title": "Technology & the Internet - Los Angeles Times",
          "local_file": "technology-index.html"
        },
        {
          "url": "https://www.latimes.com/world-nation",
          "title": "World & Nation News: Breaking Stories, Politics & Global Events - Los Angeles Times",
          "local_file": "world-index.html"
        },
        {
          "url": "https://www.latimes.com/science",
          "title": "Science & Medicine - Los Angeles Times",
          "local_file": "science-index.html"
        },
        {
          "url": "https://www.latimes.com/environment",
          "title": "Climate & Environment - Los Angeles Times",
          "local_file": "environment-index.html"
        },
        {
          "url": "https://www.latimes.com/entertainment-arts",
          "title": "Entertainment & Arts - Los Angeles Times",
          "local_file": "entertainment-arts-index.html"
        },
        {
          "url": "https://www.latimes.com/food",
          "title": "Food - Los Angeles Times",
          "local_file": "food-index.html"
        }
      ],
      "key_regions": [
        "header",
        "primary navigation",
        "hero/banner",
        "content list sections",
        "sidebar (where present)",
        "footer"
      ],
      "key_interactions": [
        {
          "name": "section navigation",
          "evidence": "observed",
          "notes": "Nav links list major sections (Politics, Business, etc.) in the fetched markup."
        },
        {
          "name": "local article search",
          "evidence": "inferred",
          "notes": "Typical news sites provide a search field, but no search form was present in the captured HTML."
        },
        {
          "name": "newsletter subscription",
          "evidence": "inferred",
          "notes": "Newsletter links are common on news homepages but not visible in the retrieved markup."
        }
      ],
      "complexity": "medium",
      "stack_clues": "unknown",
      "limitations": ""
    }
  ]
}
```
