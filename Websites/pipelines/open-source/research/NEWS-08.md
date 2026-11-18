# NEWS-08 — open-source source research (slot 08)

- **Run:** `2026-11-17T05-13-14-228Z-research-NEWS-08`
- **Scope:** partial — this file covers NEWS-08 only. The rest of the category is researched separately.
- **Research model:** unsloth/NVIDIA-Nemotron-3-Super-120B-A12B-GGUF (vt-arc-falcon-llamacpp, nvidia-nemotron-open-model-license, open weights) declared for slot 08
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 3/3 candidate homepages and 10/10 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/NEWS-08-http-2026-11-17.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### NEWS-08
source_id: NEWS-08
subcategory: local/regional newsroom
source_name: The Seattle Times
official_url: https://www.seattletimes.com/
verified_at: 
verification_result: verified
source_pages:
- url: https://www.seattletimes.com/
  title: The Seattle Times | Local news, sports, business, politics, entertainment, travel, restaurants and opinion for Seattle and the Pacific Northwest.
  local_file: index.html
- url: https://www.seattletimes.com/seattle-news/
  title: Local News | The Seattle Times
  local_file: seattle-news.html
- url: https://www.seattletimes.com/business/
  title: Business | The Seattle Times
  local_file: business.html
- url: https://www.seattletimes.com/sports/
  title: Sports | The Seattle Times
  local_file: sports.html
- url: https://www.seattletimes.com/nation-world/
  title: Nation & World | The Seattle Times
  local_file: nation-world.html
- url: https://www.seattletimes.com/seattle-news/transportation/seattles-i-5-express-lanes-suddenly-closed-by-severe-cracking/
  title: Seattle’s I-5 express lanes suddenly closed by severe cracking | The Seattle Times
  local_file: seattle-i-5-express-lanes-closed.html
- url: https://www.seattletimes.com/subscribe/signup-offers/?subsource=voluntary
  title: Subscribe | The Seattle Times
  local_file: subscribe-signup-offers-subsource-voluntary.html
- url: https://www.seattletimes.com/help/
  title: Questions? | The Seattle Times
  local_file: help.html
- url: https://www.seattletimes.com/newsroom-staff/
  title: Newsroom staff | The Seattle Times
  local_file: newsroom-staff.html
- url: https://www.seattletimes.com/rss-feeds/
  title: RSS Feeds | The Seattle Times
  local_file: rss-feeds.html
key_regions:
- header
- navigation
- footer groups
key_interactions:
- name: Section navigation
  evidence: observed
  notes: Nav links show section fronts such as Local News, Business, Sports, Nation & World.
- name: Local article search
  evidence: inferred
  notes: No search form observed in markup; typical news sites include search.
- name: Latest/most-read tabs
  evidence: inferred
  notes: Not observed in fetched markup; common feature.
- name: Newsletter signup
  evidence: observed
  notes: Subscribe page present with signup offers.
complexity: medium
rationale: Multiple distinct sections and page types evident in navigation, indicating moderate structural richness.
stack_clues: unknown
limitations: Verification date not provided in evidence; only a subset of available sections and article pages were mapped to stay within 6‑16 page limit; many additional sections (e.g., author archives, topic tags) exist but were not included.

```json
{
  "rows": [
    {
      "source_id": "NEWS-08",
      "subcategory": "local/regional newsroom",
      "source_name": "The Seattle Times",
      "source_url": "https://www.seattletimes.com/",
      "verified_at": "",
      "verification_method": "HTTP GET by the orchestrator",
      "verification_result": "verified",
      "evidence_reference": "",
      "source_pages": [
        {
          "url": "https://www.seattletimes.com/",
          "title": "The Seattle Times | Local news, sports, business, politics, entertainment, travel, restaurants and opinion for Seattle and the Pacific Northwest.",
          "local_file": "index.html"
        },
        {
          "url": "https://www.seattletimes.com/seattle-news/",
          "title": "Local News | The Seattle Times",
          "local_file": "seattle-news.html"
        },
        {
          "url": "https://www.seattletimes.com/business/",
          "title": "Business | The Seattle Times",
          "local_file": "business.html"
        },
        {
          "url": "https://www.seattletimes.com/sports/",
          "title": "Sports | The Seattle Times",
          "local_file": "sports.html"
        },
        {
          "url": "https://www.seattletimes.com/nation-world/",
          "title": "Nation & World | The Seattle Times",
          "local_file": "nation-world.html"
        },
        {
          "url": "https://www.seattletimes.com/seattle-news/transportation/seattles-i-5-express-lanes-suddenly-closed-by-severe-cracking/",
          "title": "Seattle’s I-5 express lanes suddenly closed by severe cracking | The Seattle Times",
          "local_file": "seattle-i-5-express-lanes-closed.html"
        },
        {
          "url": "https://www.seattletimes.com/subscribe/signup-offers/?subsource=voluntary",
          "title": "Subscribe | The Seattle Times",
          "local_file": "subscribe-signup-offers-subsource-voluntary.html"
        },
        {
          "url": "https://www.seattletimes.com/help/",
          "title": "Questions? | The Seattle Times",
          "local_file": "help.html"
        },
        {
          "url": "https://www.seattletimes.com/newsroom-staff/",
          "title": "Newsroom staff | The Seattle Times",
          "local_file": "newsroom-staff.html"
        },
        {
          "url": "https://www.seattletimes.com/rss-feeds/",
          "title": "RSS Feeds | The Seattle Times",
          "local_file": "rss-feeds.html"
        }
      ],
      "key_regions": [
        "header",
        "navigation",
        "footer groups"
      ],
      "key_interactions": [
        {
          "name": "Section navigation",
          "evidence": "observed",
          "notes": "Nav links show section fronts such as Local News, Business, Sports, Nation & World."
        },
        {
          "name": "Local article search",
          "evidence": "inferred",
          "notes": "No search form observed in markup; typical news sites include search."
        },
        {
          "name": "Latest/most-read tabs",
          "evidence": "inferred",
          "notes": "Not observed in fetched markup; common feature."
        },
        {
          "name": "Newsletter signup",
          "evidence": "observed",
          "notes": "Subscribe page present with signup offers."
        }
      ],
      "complexity": "medium",
      "stack_clues": "unknown",
      "limitations": "Verification date not provided in evidence; only a subset of available sections and article pages were mapped to stay within 6‑16 page limit; many additional sections (e.g., author archives, topic tags) exist but were not included."
    }
  ]
}
```
