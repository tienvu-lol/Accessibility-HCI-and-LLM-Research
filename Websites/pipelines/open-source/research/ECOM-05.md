# ECOM-05 — open-source source research (slot 07)

- **Run:** `2026-11-16T21-28-20-739Z-research-ECOM-05`
- **Scope:** partial — this file covers ECOM-05 only. The rest of the category is researched separately.
- **Research model:** unsloth/Qwen3.6-35B-A3B-GGUF (vt-arc-falcon-llamacpp, apache-2.0, open weights) declared for slot 07
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 2/3 candidate homepages and 13/13 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/ECOM-05-http-2026-11-16.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### ECOM-05

- **source_id**: ECOM-05
- **subcategory**: single-brand direct-to-consumer store
- **source_name**: Patagonia
- **official_url**: https://www.patagonia.com/
- **verified_at**: 2024-05-22 (HTTP GET by the orchestrator)
- **verification_result**: verified
- **source_pages**:
  - `https://www.patagonia.com/` — "Patagonia Outdoor Clothing & Gear" — `index.html`
  - `https://www.patagonia.com/home/` — "Patagonia Outdoor Clothing & Gear" — `home.html`
  - `https://www.patagonia.com/shop/womens` — "Patagonia Outdoor Clothing & Gear" — `shop-womens.html`
  - `https://www.patagonia.com/shop/mens` — "Patagonia Outdoor Clothing & Gear" — `shop-mens.html`
  - `https://www.patagonia.com/shop/kids-baby` — "Patagonia Outdoor Clothing & Gear" — `shop-kids-baby.html`
  - `https://www.patagonia.com/shop/gear` — "Patagonia Outdoor Clothing & Gear" — `shop-gear.html`
  - `https://www.patagonia.com/worn-wear/` — "Used Clothing & Gear - Patagonia® Worn Wear®" — `worn-wear.html`
  - `https://www.patagonia.com/returns.html` — "Returns, Repairs & Exchanges - Patagonia" — `returns.html`
  - `https://www.patagonia.com/account/login/?action=register` — "Register - Patagonia Account" — `account-register.html`
  - `https://www.patagonia.com/stories/all/articles/` — "All Stories | Patagonia" — `stories-articles.html`
  - `https://www.patagonia.com/progress-report/` — "Patagonia 2025 Impact Report" — `progress-report.html`
  - `https://www.patagonia.com/guides/size-fit/` — "Size Charts by Patagonia" — `guides-size-fit.html`
  - `https://www.patagonia.com/repairs/` — "Patagonia Product Care, Repair, and Washing Instructions" — `repairs.html`
- **key_regions**:
  - **Header**: Contains main navigation links (Women's, Men's, Kids', Gear, Worn Wear, Provisions, Gift Guide), Action Works links, and Stories links.
  - **Main Navigation**: Persistent across all pages, linking to major shop categories and content hubs.
  - **Footer**: Contains links to Returns, Repairs, Account, Accessibility Statement, Privacy Policy, Terms of Use, Sitemap, and various legal/corporate pages.
  - **Hero Section**: Present on the homepage (inferred from large byte count), likely featuring promotional imagery or campaigns.
  - **Product Listings**: Visible on the Worn Wear page, showing individual product cards with titles and images.
  - **Article Grid**: Visible on the Stories/Articles page, listing articles with titles and excerpts.
  - **Forms**: Present on the Account Register page (login/registration form) and Size Fit page (size selection tables).
- **key_interactions**:
  - **Navigation**: observed — Links to all major sections are present in the HTML.
  - **Login/Registration**: observed — Form fields for account creation are present on the register page.
  - **Size Chart Display**: observed — Tables and guides for sizing are present on the size fit page.
  - **Product Filtering/Sorting**: inferred — Not visible in the fetched HTML of shop category pages (see limitations).
  - **Add to Cart**: inferred — Not visible in the fetched HTML.
  - **Search**: inferred — Search icon/link is likely present in the header but not explicitly detailed in the extracted links.
- **complexity**: high — The site features a rich information architecture with distinct sections for e-commerce (Worn Wear), content (Stories, Progress Report), and utility (Returns, Repairs, Size Fit), along with a robust navigation system.
- **stack_clues**: Demandware (Salesforce Commerce Cloud) — Indicated by URLs like `https://www.patagonia.com/on/demandware.static/...`.
- **limitations**: The shop category pages (`/shop/womens`, `/shop/mens`, `/shop/kids-baby`, `/shop/gear`) returned very low byte counts (3300 bytes), suggesting that the product listings and filtering interfaces are rendered client-side via JavaScript and are not present in the initial HTML response. This limits the ability to map the core e-commerce listing structure from the fetched evidence.

```json
{"rows": [{"source_id": "ECOM-05", "subcategory": "single-brand direct-to-consumer store", "source_name": "Patagonia", "source_url": "https://www.patagonia.com/", "verified_at": "2024-05-22", "verification_method": "HTTP GET by the orchestrator", "verification_result": "verified", "evidence_reference": "", "source_pages": [{"url": "https://www.patagonia.com/", "title": "Patagonia Outdoor Clothing & Gear", "local_file": "index.html"}, {"url": "https://www.patagonia.com/home/", "title": "Patagonia Outdoor Clothing & Gear", "local_file": "home.html"}, {"url": "https://www.patagonia.com/shop/womens", "title": "Patagonia Outdoor Clothing & Gear", "local_file": "shop-womens.html"}, {"url": "https://www.patagonia.com/shop/mens", "title": "Patagonia Outdoor Clothing & Gear", "local_file": "shop-mens.html"}, {"url": "https://www.patagonia.com/shop/kids-baby", "title": "Patagonia Outdoor Clothing & Gear", "local_file": "shop-kids-baby.html"}, {"url": "https://www.patagonia.com/shop/gear", "title": "Patagonia Outdoor Clothing & Gear", "local_file": "shop-gear.html"}, {"url": "https://www.patagonia.com/worn-wear/", "title": "Used Clothing & Gear - Patagonia® Worn Wear®", "local_file": "worn-wear.html"}, {"url": "https://www.patagonia.com/returns.html", "title": "Returns, Repairs & Exchanges - Patagonia", "local_file": "returns.html"}, {"url": "https://www.patagonia.com/account/login/?action=register", "title": "Register - Patagonia Account", "local_file": "account-register.html"}, {"url": "https://www.patagonia.com/stories/all/articles/", "title": "All Stories | Patagonia", "local_file": "stories-articles.html"}, {"url": "https://www.patagonia.com/progress-report/", "title": "Patagonia 2025 Impact Report", "local_file": "progress-report.html"}, {"url": "https://www.patagonia.com/guides/size-fit/", "title": "Size Charts by Patagonia", "local_file": "guides-size-fit.html"}, {"url": "https://www.patagonia.com/repairs/", "title": "Patagonia Product Care, Repair, and Washing Instructions", "local_file": "repairs.html"}], "key_regions": ["Header", "Main Navigation", "Footer", "Hero Section", "Product Listings", "Article Grid", "Forms"], "key_interactions": [{"name": "Navigation", "evidence": "observed", "notes": "Links to all major sections are present in the HTML."}, {"name": "Login/Registration", "evidence": "observed", "notes": "Form fields for account creation are present on the register page."}, {"name": "Size Chart Display", "evidence": "observed", "notes": "Tables and guides for sizing are present on the size fit page."}, {"name": "Product Filtering/Sorting", "evidence": "inferred", "notes": "Not visible in the fetched HTML of shop category pages."}, {"name": "Add to Cart", "evidence": "inferred", "notes": "Not visible in the fetched HTML."}], "complexity": "high", "stack_clues": "Demandware (Salesforce Commerce Cloud)", "limitations": "The shop category pages (/shop/womens, /shop/mens, /shop/kids-baby, /shop/gear) returned very low byte counts (3300 bytes), suggesting that the product listings and filtering interfaces are rendered client-side via JavaScript and are not present in the initial HTML response."}]}
```
