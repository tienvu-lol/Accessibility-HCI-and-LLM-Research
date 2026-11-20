# ECOM-R08 — open-source source research (slot 08)

- **Run:** `2026-11-17T05-11-04-530Z-research-ECOM-R08`
- **Scope:** partial — this file covers ECOM-R08 only. The rest of the category is researched separately.
- **Research model:** unsloth/NVIDIA-Nemotron-3-Super-120B-A12B-GGUF (vt-arc-falcon-llamacpp, nvidia-nemotron-open-model-license, open weights) declared for slot 08
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 2/3 candidate homepages and 7/10 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/ECOM-R08-http-2026-11-17.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### ECOM-R08
source_id: ECOM-R08
subcategory: multi-category retailer
source_name: Target
official_url: https://www.target.com/
verified_at: 
verification_method: HTTP GET by the orchestrator
verification_result: verified
source_pages:
- url: https://www.target.com/
  title: Target : Expect More. Pay Less.
  local_file: index.html
- url: https://www.target.com/l/target-circle/-/N-pzno9
  title: Target Circle™
  local_file: target-circle.html
- url: https://www.target.com/gift-registry
  title: Gift Registry & Wish lists : Target
  local_file: gift-registry.html
- url: https://www.target.com/weekly-ad
  title: Target Weekly Ad
  local_file: weekly-ad.html
- url: https://www.target.com/store-locator/find-stores
  title: Stores Near Me : Target
  local_file: store-locator.html
- url: https://www.target.com/c/shop-all-categories/-/N-5xsxf?prehydrateClick=true
  title: Shop All Categories : Target
  local_file: shop-all-categories.html
- url: https://www.target.com/c/top-deals/-/N-4xw74?prehydrateClick=true
  title: Top Deals at Target
  local_file: top-deals.html
key_regions:
- header
- navigation
- hero (inferred)
- content band (inferred)
- footer (inferred)
key_interactions:
- name: cart navigation
  evidence: observed
  notes: Link to /cart present in nav_links on multiple pages.
- name: account navigation
  evidence: observed
  notes: Link to /account present in nav_links on multiple pages.
- name: product category navigation
  evidence: observed
  notes: Link to /c/shop-all-categories present in nav_links.
- name: deals navigation
  evidence: observed
  notes: Link to /c/top-deals present in nav_links.
- name: product category/price filters
  evidence: inferred
  notes: Typical e-commerce category pages include filters; not visible in fetched markup.
- name: sort
  evidence: inferred
  notes: Typical e-commerce pages include sort controls; not visible in fetched markup.
- name: variant selection
  evidence: inferred
  notes: Product detail pages would include size/color selectors; not visible in fetched markup.
- name: cart quantity/removal
  evidence: inferred
  notes: Cart functionality implied by cart link; quantity/removal controls not visible in fetched markup.
- name: checkout validation
  evidence: inferred
  notes: Checkout flow implied by site type; validation controls not visible in fetched markup.
complexity: high
rationale: Multiple top‑level sections (Target Circle, Registry, Weekly Ad, Store Locator, Shop All Categories, Deals, etc.) and extensive navigation indicate a high‑information‑architecture site.
stack_clues: unknown
limitations:
- Verification date not provided in evidence; verified_at left blank.
- Cart page (https://www.target.com/cart?prehydrateClick=true) skipped due to robots.txt disallow.
- Product detail pages (e.g., https://www.target.com/pl/188903077, https://www.target.com/pl/411502157?content_id=STORY-48777) skipped due to robots.txt disallow.
- Any other desired pages not present in nav_links or other_links remain unverified.

```json
{"rows": [{"source_id": "ECOM-R08", "subcategory": "multi-category retailer", "source_name": "Target", "source_url": "https://www.target.com/", "verified_at": "", "verification_method": "HTTP GET by the orchestrator", "verification_result": "verified", "evidence_reference": "", "source_pages": [{"url": "https://www.target.com/", "title": "Target : Expect More. Pay Less.", "local_file": "index.html"}, {"url": "https://www.target.com/l/target-circle/-/N-pzno9", "title": "Target Circle™", "local_file": "target-circle.html"}, {"url": "https://www.target.com/gift-registry", "title": "Gift Registry & Wish lists : Target", "local_file": "gift-registry.html"}, {"url": "https://www.target.com/weekly-ad", "title": "Target Weekly Ad", "local_file": "weekly-ad.html"}, {"url": "https://www.target.com/store-locator/find-stores", "title": "Stores Near Me : Target", "local_file": "store-locator.html"}, {"url": "https://www.target.com/c/shop-all-categories/-/N-5xsxf?prehydrateClick=true", "title": "Shop All Categories : Target", "local_file": "shop-all-categories.html"}, {"url": "https://www.target.com/c/top-deals/-/N-4xw74?prehydrateClick=true", "title": "Top Deals at Target", "local_file": "top-deals.html"}], "key_regions": ["header", "navigation", "hero", "content band", "footer"], "key_interactions": [{"name": "cart navigation", "evidence": "observed", "notes": "Link to /cart present in nav_links on multiple pages."}, {"name": "account navigation", "evidence": "observed", "notes": "Link to /account present in nav_links on multiple pages."}, {"name": "product category navigation", "evidence": "observed", "notes": "Link to /c/shop-all-categories present in nav_links."}, {"name": "deals navigation", "evidence": "observed", "notes": "Link to /c/top-deals present in nav_links."}, {"name": "product category/price filters", "evidence": "inferred", "notes": "Typical e-commerce category pages include filters; not visible in fetched markup."}, {"name": "sort", "evidence": "inferred", "notes": "Typical e-commerce pages include sort controls; not visible in fetched markup."}, {"name": "variant selection", "evidence": "inferred", "notes": "Product detail pages would include size/color selectors; not visible in fetched markup."}, {"name": "cart quantity/removal", "evidence": "inferred", "notes": "Cart functionality implied by cart link; quantity/removal controls not visible in fetched markup."}, {"name": "checkout validation", "evidence": "inferred", "notes": "Checkout flow implied by site type; validation controls not visible in fetched markup."}], "complexity": "high", "stack_clues": "unknown", "limitations": "Verification date not provided in evidence; verified_at left blank. Cart page (https://www.target.com/cart?prehydrateClick=true) skipped due to robots.txt disallow. Product detail pages (e.g., https://www.target.com/pl/188903077, https://www.target.com/pl/411502157?content_id=STORY-48777) skipped due to robots.txt disallow. Any other desired pages not present in nav_links or other_links remain unverified."}]}
```
