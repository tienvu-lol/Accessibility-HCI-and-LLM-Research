# FASH-R08 — open-source source research (slot 08)

- **Run:** `2026-11-17T05-18-11-014Z-research-FASH-R08`
- **Scope:** partial — this file covers FASH-R08 only. The rest of the category is researched separately.
- **Research model:** unsloth/NVIDIA-Nemotron-3-Super-120B-A12B-GGUF (vt-arc-falcon-llamacpp, nvidia-nemotron-open-model-license, open weights) declared for slot 08
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 3/3 candidate homepages and 8/8 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/FASH-R08-http-2026-11-17.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### FASH-R08
source_id: FASH-R08
subcategory: brand editorial/lookbook
source_name: Refinery29
official_url: https://www.refinery29.com/en-us
verified_at: 
verification_result: verified
source_pages:
- url: https://www.refinery29.com/en-us
  title: Refinery29
  local_file: index.html
- url: https://www.refinery29.com/en-us/fashion/
  title: Fashion: What To Wear, Trends, Styling Tips - Refinery29
  local_file: fashion.html
- url: https://www.refinery29.com/en-us/beauty/
  title: Beauty: Skincare Tips, Hair & Makeup Trends - Refinery29
  local_file: beauty.html
- url: https://www.refinery29.com/en-us/shopping/
  title: Shop The Best Beauty, Fashion & Homeware - Refinery29
  local_file: shopping.html
- url: https://www.refinery29.com/en-us/summer-lookbook-2026
  title: The R29 Lookbook: The Making of a Summer Star
  local_file: summer-lookbook-2026.html
- url: https://www.refinery29.com/en-us/money-diary
  title: Money Diaries - Refinery29
  local_file: money-diary.html
- url: https://www.refinery29.com/en-us/horoscope
  title: Horoscopes & Zodiac Star Sign Predictions - Refinery29
  local_file: horoscope.html
- url: https://www.refinery29.com/en-us/podcasts
  title: Refinery29 Podcasts
  local_file: podcasts.html
key_regions:
- header (observed)
- navigation (observed)
- hero (inferred)
- content bands (inferred)
- sidebar (inferred)
- footer groups (inferred)
key_interactions:
- editorial navigation (observed) – navigation links present in fetched markup
- gallery/lightbox or carousel (inferred) – lookbook page suggests image gallery
- article search (observed) – search/ link present in navigation
- newsletter simulation (inferred) – typical for editorial sites but not seen in markup
complexity: medium – multiple top‑level sections (fashion, beauty, shopping, lookbook, money diary, horoscope, podcasts) with structured navigation and recurring content bands.
stack_clues: unknown – no explicit technology indicators visible in the fetched HTML.
limitations:
- verified_at date not supplied in evidence; only confirmation of successful GET.
- Deeper article pages beyond the selected section fronts were not requested, so their availability is unverified.
- Any JavaScript‑driven navigation or dynamic content cannot be confirmed from the static markup.

```json
{
  "rows": [
    {
      "source_id": "FASH-R08",
      "subcategory": "brand editorial/lookbook",
      "source_name": "Refinery29",
      "source_url": "https://www.refinery29.com/en-us",
      "verified_at": "",
      "verification_method": "HTTP GET by the orchestrator",
      "verification_result": "verified",
      "evidence_reference": "",
      "source_pages": [
        {
          "url": "https://www.refinery29.com/en-us",
          "title": "Refinery29",
          "local_file": "index.html"
        },
        {
          "url": "https://www.refinery29.com/en-us/fashion/",
          "title": "Fashion: What To Wear, Trends, Styling Tips - Refinery29",
          "local_file": "fashion.html"
        },
        {
          "url": "https://www.refinery29.com/en-us/beauty/",
          "title": "Beauty: Skincare Tips, Hair & Makeup Trends - Refinery29",
          "local_file": "beauty.html"
        },
        {
          "url": "https://www.refinery29.com/en-us/shopping/",
          "title": "Shop The Best Beauty, Fashion & Homeware - Refinery29",
          "local_file": "shopping.html"
        },
        {
          "url": "https://www.refinery29.com/en-us/summer-lookbook-2026",
          "title": "The R29 Lookbook: The Making of a Summer Star",
          "local_file": "summer-lookbook-2026.html"
        },
        {
          "url": "https://www.refinery29.com/en-us/money-diary",
          "title": "Money Diaries - Refinery29",
          "local_file": "money-diary.html"
        },
        {
          "url": "https://www.refinery29.com/en-us/horoscope",
          "title": "Horoscopes & Zodiac Star Sign Predictions - Refinery29",
          "local_file": "horoscope.html"
        },
        {
          "url": "https://www.refinery29.com/en-us/podcasts",
          "title": "Refinery29 Podcasts",
          "local_file": "podcasts.html"
        }
      ],
      "key_regions": [
        "header",
        "navigation",
        "hero",
        "content bands",
        "sidebar",
        "footer groups"
      ],
      "key_interactions": [
        {
          "name": "editorial navigation",
          "evidence": "observed",
          "notes": "Navigation links present in fetched markup"
        },
        {
          "name": "gallery/lightbox or carousel",
          "evidence": "inferred",
          "notes": "Lookbook page suggests an image gallery"
        },
        {
          "name": "article search",
          "evidence": "observed",
          "notes": "Search link present in navigation"
        },
        {
          "name": "newsletter simulation",
          "evidence": "inferred",
          "notes": "Typical for editorial sites but not seen in markup"
        }
      ],
      "complexity": "medium",
      "stack_clues": "unknown",
      "limitations": "Verified_at date not supplied in evidence; deeper article pages not requested; JavaScript‑driven content cannot be confirmed."
    }
  ]
}
```
