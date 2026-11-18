# ECOM-10 — open-source source research (slot 10)

- **Run:** `2026-11-17T05-11-36-137Z-research-ECOM-10`
- **Scope:** partial — this file covers ECOM-10 only. The rest of the category is researched separately.
- **Research model:** unsloth/gpt-oss-120b-GGUF (vt-arc-falcon-llamacpp, apache-2.0, open weights) declared for slot 10
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 2/3 candidate homepages and 7/8 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/ECOM-10-http-2026-11-17.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### ECOM-10
- **source_id**: ECOM-10  
- **subcategory**: single‑brand direct‑to‑consumer (complexity‑matched reserve)  
- **source_name**: Everlane  
- **official_url**: https://www.everlane.com/  
- **verified_at**: unknown (HTTP GET by the orchestrator)  
- **verification_result**: verified  
- **source_pages**:  
  ```json
  [
    {
      "url": "https://everlane.com",
      "title": "Everlane",
      "local_file": "home-index.html"
    },
    {
      "url": "https://www.everlane.com/collections/womens-all",
      "title": "Women's Clothing, Shoes & More | Everlane",
      "local_file": "womens-all-index.html"
    },
    {
      "url": "https://www.everlane.com/collections/womens-pants-trousers",
      "title": "Women's Trousers & Dress Pants | Chinos, Wide-Leg & More | Everlane",
      "local_file": "womens-pants-trousers-index.html"
    },
    {
      "url": "https://www.everlane.com/collections/womens-sweaters?fq=Fabric%3ACashmere",
      "title": "Women's Sweaters | Cashmere, Cotton & Wool | Everlane",
      "local_file": "womens-sweaters-cashmere-index.html"
    },
    {
      "url": "https://www.everlane.com/pages/redeem",
      "title": "Redeem – Everlane",
      "local_file": "redeem-index.html"
    },
    {
      "url": "https://www.everlane.com/pages/about",
      "title": "Everlane - About",
      "local_file": "about-index.html"
    }
  ]
  ```
- **key_regions**: ["header", "navigation", "footer", "hero (inferred)", "content bands (inferred)"]
- **key_interactions**:  
  ```json
  [
    {"name": "navigation", "evidence": "observed", "notes": "links to collections, gift guide, etc."},
    {"name": "gift‑card redemption form", "evidence": "observed", "notes": "Redeem page contains a form element"},
    {"name": "product variant selection", "evidence": "inferred", "notes": "typical for product detail pages"},
    {"name": "add to cart", "evidence": "inferred", "notes": "standard e‑commerce interaction"},
    {"name": "filter / sort controls", "evidence": "inferred", "notes": "collections usually expose filters"},
    {"name": "search", "evidence": "inferred", "notes": "site likely offers a search field"},
    {"name": "cart quantity adjustment", "evidence": "inferred", "notes": "common in cart UI"}
  ]
  ```
- **complexity**: medium – the site presents a large catalogue of collections, multiple content sections, and standard e‑commerce flows, but the fetched markup is largely static.
- **stack_clues**: unknown (no server‑header or framework clues present in the fetched HTML).
- **limitations**:  
  - `https://www.everlane.com/products/womens-cashmere-slim-crew-sweater-canvas` returned **429** (too many requests); product detail page could not be verified.  

---

```json
{
  "rows": [
    {
      "source_id": "ECOM-10",
      "subcategory": "single-brand direct-to-consumer (complexity-matched reserve)",
      "source_name": "Everlane",
      "source_url": "https://www.everlane.com/",
      "verified_at": "unknown (HTTP GET by the orchestrator)",
      "verification_method": "HTTP GET by the orchestrator",
      "verification_result": "verified",
      "evidence_reference": "",
      "source_pages": [
        {
          "url": "https://everlane.com",
          "title": "Everlane",
          "local_file": "home-index.html"
        },
        {
          "url": "https://www.everlane.com/collections/womens-all",
          "title": "Women's Clothing, Shoes & More | Everlane",
          "local_file": "womens-all-index.html"
        },
        {
          "url": "https://www.everlane.com/collections/womens-pants-trousers",
          "title": "Women's Trousers & Dress Pants | Chinos, Wide-Leg & More | Everlane",
          "local_file": "womens-pants-trousers-index.html"
        },
        {
          "url": "https://www.everlane.com/collections/womens-sweaters?fq=Fabric%3ACashmere",
          "title": "Women's Sweaters | Cashmere, Cotton & Wool | Everlane",
          "local_file": "womens-sweaters-cashmere-index.html"
        },
        {
          "url": "https://www.everlane.com/pages/redeem",
          "title": "Redeem – Everlane",
          "local_file": "redeem-index.html"
        },
        {
          "url": "https://www.everlane.com/pages/about",
          "title": "Everlane - About",
          "local_file": "about-index.html"
        }
      ],
      "key_regions": ["header", "navigation", "footer", "hero (inferred)", "content bands (inferred)"],
      "key_interactions": [
        {"name": "navigation", "evidence": "observed", "notes": "links to collections, gift guide, etc."},
        {"name": "gift-card redemption form", "evidence": "observed", "notes": "Redeem page contains a form element"},
        {"name": "product variant selection", "evidence": "inferred", "notes": "typical for product detail pages"},
        {"name": "add to cart", "evidence": "inferred", "notes": "standard e-commerce interaction"},
        {"name": "filter / sort controls", "evidence": "inferred", "notes": "collections usually expose filters"},
        {"name": "search", "evidence": "inferred", "notes": "site likely offers a search field"},
        {"name": "cart quantity adjustment", "evidence": "inferred", "notes": "common in cart UI"}
      ],
      "complexity": "medium",
      "stack_clues": "unknown",
      "limitations": "Product detail page https://www.everlane.com/products/womens-cashmere-slim-crew-sweater-canvas returned 429 (too many requests); could not verify product markup."
    }
  ]
}
```
