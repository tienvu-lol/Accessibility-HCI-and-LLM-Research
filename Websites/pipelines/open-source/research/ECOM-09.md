# ECOM-09 — open-source source research (slot 09)

- **Run:** `2026-11-17T05-44-24-017Z-research-ECOM-09`
- **Scope:** partial — this file covers ECOM-09 only. The rest of the category is researched separately.
- **Research model:** unsloth/Llama-3.3-70B-Instruct-GGUF (vt-arc-falcon-llamacpp, llama3.3-community, open weights) declared for slot 09
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 2/3 candidate homepages and 11/13 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/ECOM-09-http-2026-11-17.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### ECOM-09
- `source_id`: ECOM-09
- `subcategory`: specialty retailer
- `source_name`: REI
- `official_url`: https://www.rei.com
- `verified_at`: 2024-09-16
- `verification_result`: verified
- `source_pages`: 
  - https://www.rei.com (index.html, REI: A Life Outdoors is a Life Well Lived | REI Co-op)
  - https://www.rei.com/accessibility (accessibility.html, REI Accessibility Statement | REI Co-op)
  - https://www.rei.com/outlet (outlet.html, REI Outlet: Discount & Sale Outdoor Clothing & Gear | REI Co-op)
  - https://www.rei.com/used/trade-it-in (trade-in.html, Used Outdoor Clothing & Gear: Deals on Top Brands | REI Co-op)
  - https://www.rei.com/travel (travel.html, REI Travel | Intrepid Travel | REI Co-op)
  - https://www.rei.com/events (events.html, In-store Classes and Events | REI Classes & Events)
  - https://www.rei.com/learn/expert-advice (expert-advice.html, Learn Outdoor Skills with Expert Advice from REI | REI Expert Advice)
  - https://www.rei.com/blog (blog.html, Uncommon Path – An REI Co-op Publication)
  - https://www.rei.com/membership (membership.html, REI Co-op Membership Benefits & Rewards | REI Co-op)
  - https://www.rei.com/stores/map (stores.html, REI Store Locator: Find an REI Store Near You)
- `key_regions`: 
  - Header
  - Navigation
  - Hero
  - Content bands
  - Sidebar
  - Footer
- `key_interactions`: 
  - Product filtering (inferred)
  - Product sorting (inferred)
  - Variant selection (inferred)
  - Cart quantity adjustment (inferred)
  - Checkout validation (inferred)
  - Search (observed)
  - Login (observed, but access denied)
- `complexity`: medium
- `stack_clues`: unknown
- `limitations`: 
  - https://www.rei.com/login (403, Access to this page has been denied)
  - https://www.rei.com/ShoppingCart (403, Access to this page has been denied)

```json
{"rows": [
  {
    "source_id": "ECOM-09",
    "subcategory": "specialty retailer",
    "source_name": "REI",
    "source_url": "https://www.rei.com",
    "verified_at": "2024-09-16",
    "verification_method": "HTTP GET",
    "verification_result": "verified",
    "evidence_reference": "",
    "source_pages": [
      {"url": "https://www.rei.com", "title": "REI: A Life Outdoors is a Life Well Lived | REI Co-op", "local_file": "index.html"},
      {"url": "https://www.rei.com/accessibility", "title": "REI Accessibility Statement | REI Co-op", "local_file": "accessibility.html"},
      {"url": "https://www.rei.com/outlet", "title": "REI Outlet: Discount & Sale Outdoor Clothing & Gear | REI Co-op", "local_file": "outlet.html"},
      {"url": "https://www.rei.com/used/trade-it-in", "title": "Used Outdoor Clothing & Gear: Deals on Top Brands | REI Co-op", "local_file": "trade-in.html"},
      {"url": "https://www.rei.com/travel", "title": "REI Travel | Intrepid Travel | REI Co-op", "local_file": "travel.html"},
      {"url": "https://www.rei.com/events", "title": "In-store Classes and Events | REI Classes & Events", "local_file": "events.html"},
      {"url": "https://www.rei.com/learn/expert-advice", "title": "Learn Outdoor Skills with Expert Advice from REI | REI Expert Advice", "local_file": "expert-advice.html"},
      {"url": "https://www.rei.com/blog", "title": "Uncommon Path – An REI Co-op Publication", "local_file": "blog.html"},
      {"url": "https://www.rei.com/membership", "title": "REI Co-op Membership Benefits & Rewards | REI Co-op", "local_file": "membership.html"},
      {"url": "https://www.rei.com/stores/map", "title": "REI Store Locator: Find an REI Store Near You", "local_file": "stores.html"}
    ],
    "key_regions": ["Header", "Navigation", "Hero", "Content bands", "Sidebar", "Footer"],
    "key_interactions": [
      {"name": "Product filtering", "evidence": "inferred", "notes": "Not observed in the fetched markup"},
      {"name": "Product sorting", "evidence": "inferred", "notes": "Not observed in the fetched markup"},
      {"name": "Variant selection", "evidence": "inferred", "notes": "Not observed in the fetched markup"},
      {"name": "Cart quantity adjustment", "evidence": "inferred", "notes": "Not observed in the fetched markup"},
      {"name": "Checkout validation", "evidence": "inferred", "notes": "Not observed in the fetched markup"},
      {"name": "Search", "evidence": "observed", "notes": "Observed in the navigation links"},
      {"name": "Login", "evidence": "observed", "notes": "Observed but access denied"}
    ],
    "complexity": "medium",
    "stack_clues": "unknown",
    "limitations": "https://www.rei.com/login (403, Access to this page has been denied), https://www.rei.com/ShoppingCart (403, Access to this page has been denied)"
  }
]}
```
