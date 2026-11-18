# CHUR-10 — open-source source research (slot 10)

- **Run:** `2026-11-17T05-06-00-487Z-research-CHUR-10`
- **Scope:** partial — this file covers CHUR-10 only. The rest of the category is researched separately.
- **Research model:** unsloth/gpt-oss-120b-GGUF (vt-arc-falcon-llamacpp, apache-2.0, open weights) declared for slot 10
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 3/3 candidate homepages and 13/13 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/CHUR-10-http-2026-11-17.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### CHUR-10
{
  "source_id": "CHUR-10",
  "subcategory": "additional distinct large or multisite church (complexity-matched reserve)",
  "source_name": "Elevation Church",
  "official_url": "https://www.elevationchurch.org/",
  "verified_at": "2026-11-17T00:00:00Z",
  "verification_result": "verified",
  "source_pages": [
    {
      "url": "https://www.elevationchurch.org/",
      "title": "Welcome Home - Elevation Church",
      "local_file": "home-index.html"
    },
    {
      "url": "https://www.elevationchurch.org/giving",
      "title": "Giving - Elevation Church",
      "local_file": "giving-index.html"
    },
    {
      "url": "https://www.elevationchurch.org/events",
      "title": "Events at Elevation Church",
      "local_file": "events-index.html"
    },
    {
      "url": "https://www.elevationchurch.org/about",
      "title": "About Us - Elevation Church",
      "local_file": "about-index.html"
    },
    {
      "url": "https://www.elevationchurch.org/sermons",
      "title": "Sermons - Elevation Church",
      "local_file": "sermons-index.html"
    },
    {
      "url": "https://www.elevationchurch.org/locations",
      "title": "All Locations",
      "local_file": "locations-index.html"
    },
    {
      "url": "https://www.elevationchurch.org/store",
      "title": "Elevation Church Store – Elevation Church Resources",
      "local_file": "store-index.html"
    },
    {
      "url": "https://www.elevationchurch.org/streaming",
      "title": "Streaming - Elevation Church",
      "local_file": "streaming-index.html"
    },
    {
      "url": "https://www.elevationchurch.org/connect",
      "title": "Get Connected at Elevation Church",
      "local_file": "connect-index.html"
    },
    {
      "url": "https://www.elevationchurch.org/sermons/you-get-to-choose",
      "title": "Welcome Home - Elevation Church",
      "local_file": "you-get-to-choose-index.html"
    }
  ],
  "key_regions": [
    "header (observed via nav_links)",
    "navigation (observed)",
    "footer (observed via repeated nav_links on pages)",
    "hero (inferred)",
    "content bands (inferred)",
    "sidebar (inferred)"
  ],
  "key_interactions": [
    {
      "name": "Giving form",
      "evidence": "observed",
      "notes": "Link labeled “Give” present in navigation on every page"
    },
    {
      "name": "Groups finder",
      "evidence": "observed",
      "notes": "Link labeled “Groups” (eGroups) present in navigation"
    },
    {
      "name": "Events calendar",
      "evidence": "observed",
      "notes": "Link labeled “Events” present in navigation"
    },
    {
      "name": "Prayer / contact form",
      "evidence": "observed",
      "notes": "Link labeled “Get Connected” leads to a page with a “Submit a prayer” link"
    },
    {
      "name": "Streaming / live video",
      "evidence": "observed",
      "notes": "Link labeled “Streaming” present in navigation"
    },
    {
      "name": "Sermon archive browsing",
      "evidence": "observed",
      "notes": "Sermons page with many individual sermon URLs"
    },
    {
      "name": "Store search / cart",
      "evidence": "observed",
      "notes": "Store page includes a search link and cart link"
    },
    {
      "name": "Sermon search / filters",
      "evidence": "inferred",
      "notes": "Typical for large sermon archives but not directly visible in fetched markup"
    }
  ],
  "complexity": "high",
  "stack_clues": "Main site appears to be a custom CMS (no explicit framework clues in markup). Store subdomain uses Shopify (evident from URL pattern and collection routes).",
  "limitations": "Pages such as /egroups and /eteams are omitted from the map because title metadata was not present in the fetched evidence. All listed pages returned 2xx; no failed requests."
}

```json
{
  "rows": [
    {
      "source_id": "CHUR-10",
      "subcategory": "additional distinct large or multisite church (complexity-matched reserve)",
      "source_name": "Elevation Church",
      "source_url": "https://www.elevationchurch.org/",
      "verified_at": "2026-11-17T00:00:00Z",
      "verification_method": "HTTP GET by the orchestrator",
      "verification_result": "verified",
      "evidence_reference": "",
      "source_pages": [
        {
          "url": "https://www.elevationchurch.org/",
          "title": "Welcome Home - Elevation Church",
          "local_file": "home-index.html"
        },
        {
          "url": "https://www.elevationchurch.org/giving",
          "title": "Giving - Elevation Church",
          "local_file": "giving-index.html"
        },
        {
          "url": "https://www.elevationchurch.org/events",
          "title": "Events at Elevation Church",
          "local_file": "events-index.html"
        },
        {
          "url": "https://www.elevationchurch.org/about",
          "title": "About Us - Elevation Church",
          "local_file": "about-index.html"
        },
        {
          "url": "https://www.elevationchurch.org/sermons",
          "title": "Sermons - Elevation Church",
          "local_file": "sermons-index.html"
        },
        {
          "url": "https://www.elevationchurch.org/locations",
          "title": "All Locations",
          "local_file": "locations-index.html"
        },
        {
          "url": "https://www.elevationchurch.org/store",
          "title": "Elevation Church Store – Elevation Church Resources",
          "local_file": "store-index.html"
        },
        {
          "url": "https://www.elevationchurch.org/streaming",
          "title": "Streaming - Elevation Church",
          "local_file": "streaming-index.html"
        },
        {
          "url": "https://www.elevationchurch.org/connect",
          "title": "Get Connected at Elevation Church",
          "local_file": "connect-index.html"
        },
        {
          "url": "https://www.elevationchurch.org/sermons/you-get-to-choose",
          "title": "Welcome Home - Elevation Church",
          "local_file": "you-get-to-choose-index.html"
        }
      ],
      "key_regions": [
        "header (observed via nav_links)",
        "navigation (observed)",
        "footer (observed via repeated nav_links on pages)",
        "hero (inferred)",
        "content bands (inferred)",
        "sidebar (inferred)"
      ],
      "key_interactions": [
        {
          "name": "Giving form",
          "evidence": "observed",
          "notes": "Link labeled “Give” present in navigation on every page"
        },
        {
          "name": "Groups finder",
          "evidence": "observed",
          "notes": "Link labeled “Groups” (eGroups) present in navigation"
        },
        {
          "name": "Events calendar",
          "evidence": "observed",
          "notes": "Link labeled “Events” present in navigation"
        },
        {
          "name": "Prayer / contact form",
          "evidence": "observed",
          "notes": "Link labeled “Get Connected” leads to a page with a “Submit a prayer” link"
        },
        {
          "name": "Streaming / live video",
          "evidence": "observed",
          "notes": "Link labeled “Streaming” present in navigation"
        },
        {
          "name": "Sermon archive browsing",
          "evidence": "observed",
          "notes": "Sermons page with many individual sermon URLs"
        },
        {
          "name": "Store search / cart",
          "evidence": "observed",
          "notes": "Store page includes a search link and cart link"
        },
        {
          "name": "Sermon search / filters",
          "evidence": "inferred",
          "notes": "Typical for large sermon archives but not directly visible in fetched markup"
        }
      ],
      "complexity": "high",
      "stack_clues": "Main site appears to be a custom CMS (no explicit framework clues in markup). Store subdomain uses Shopify (evident from URL pattern and collection routes).",
      "limitations": "Pages such as /egroups and /eteams are omitted from the map because title metadata was not present in the fetched evidence. All listed pages returned 2xx; no failed requests."
    }
  ]
}
```
