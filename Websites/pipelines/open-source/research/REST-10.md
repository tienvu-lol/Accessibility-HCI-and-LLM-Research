# REST-10 — open-source source research (slot 10)

- **Run:** `2026-11-17T05-08-04-495Z-research-REST-10`
- **Scope:** partial — this file covers REST-10 only. The rest of the category is researched separately.
- **Research model:** unsloth/gpt-oss-120b-GGUF (vt-arc-falcon-llamacpp, apache-2.0, open weights) declared for slot 10
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 3/3 candidate homepages and 7/7 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/REST-10-http-2026-11-17.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### REST-10
{
  "source_id": "REST-10",
  "subcategory": "cafe / bakery",
  "source_name": "Tartine Bakery",
  "official_url": "https://tartinebakery.com/",
  "verified_at": "2026-11-17",
  "verification_result": "verified",
  "source_pages": [
    {
      "url": "https://tartinebakery.com",
      "title": "Tartine Bakery – Tartine is a thoughtful expression of modern craft through good food and warm experiences. We are a product of our communities and our friends.",
      "local_file": "home-index.html"
    },
    {
      "url": "https://tartinebakery.com/cities",
      "title": "Locations – Tartine Bakery",
      "local_file": "cities-index.html"
    },
    {
      "url": "https://tartinebakery.com/san-francisco/bakery",
      "title": "The Bakery – Tartine Bakery",
      "local_file": "bakery-index.html"
    },
    {
      "url": "https://tartinebakery.com/about",
      "title": "About Us – Tartine Bakery",
      "local_file": "about-index.html"
    },
    {
      "url": "https://tartinebakery.com/about/our-story",
      "title": "Our Story – Tartine Bakery",
      "local_file": "our-story-index.html"
    },
    {
      "url": "https://tartinebakery.com/press",
      "title": "Press – Tartine Bakery",
      "local_file": "press-index.html"
    }
  ],
  "key_regions": [
    "header",
    "navigation",
    "hero",
    "main-content",
    "footer"
  ],
  "key_interactions": [
    {
      "name": "navigation",
      "evidence": "observed",
      "notes": "nav_links array present on every fetched page"
    },
    {
      "name": "menu download",
      "evidence": "observed",
      "notes": "PDF link to bakery menu on the bakery page"
    },
    {
      "name": "location directory",
      "evidence": "inferred",
      "notes": "multiple city/store pages linked from navigation"
    },
    {
      "name": "reservation request",
      "evidence": "inferred",
      "notes": "no reservation form observed in fetched markup"
    }
  ],
  "complexity": "medium",
  "stack_clues": "WordPress (wp-content path in PDF URL), Cloudflare (cdn-cgi email protection)",
  "limitations": ""
}

```json
{
  "rows": [
    {
      "source_id": "REST-10",
      "subcategory": "cafe / bakery",
      "source_name": "Tartine Bakery",
      "source_url": "https://tartinebakery.com/",
      "verified_at": "2026-11-17",
      "verification_method": "HTTP GET by the orchestrator",
      "verification_result": "verified",
      "evidence_reference": "",
      "source_pages": [
        {
          "url": "https://tartinebakery.com",
          "title": "Tartine Bakery – Tartine is a thoughtful expression of modern craft through good food and warm experiences. We are a product of our communities and our friends.",
          "local_file": "home-index.html"
        },
        {
          "url": "https://tartinebakery.com/cities",
          "title": "Locations – Tartine Bakery",
          "local_file": "cities-index.html"
        },
        {
          "url": "https://tartinebakery.com/san-francisco/bakery",
          "title": "The Bakery – Tartine Bakery",
          "local_file": "bakery-index.html"
        },
        {
          "url": "https://tartinebakery.com/about",
          "title": "About Us – Tartine Bakery",
          "local_file": "about-index.html"
        },
        {
          "url": "https://tartinebakery.com/about/our-story",
          "title": "Our Story – Tartine Bakery",
          "local_file": "our-story-index.html"
        },
        {
          "url": "https://tartinebakery.com/press",
          "title": "Press – Tartine Bakery",
          "local_file": "press-index.html"
        }
      ],
      "key_regions": [
        "header",
        "navigation",
        "hero",
        "main-content",
        "footer"
      ],
      "key_interactions": [
        {
          "name": "navigation",
          "evidence": "observed",
          "notes": "nav_links array present on every fetched page"
        },
        {
          "name": "menu download",
          "evidence": "observed",
          "notes": "PDF link to bakery menu on the bakery page"
        },
        {
          "name": "location directory",
          "evidence": "inferred",
          "notes": "multiple city/store pages linked from navigation"
        },
        {
          "name": "reservation request",
          "evidence": "inferred",
          "notes": "no reservation form observed in fetched markup"
        }
      ],
      "complexity": "medium",
      "stack_clues": "WordPress (wp-content path in PDF URL), Cloudflare (cdn-cgi email protection)",
      "limitations": ""
    }
  ]
}
```
