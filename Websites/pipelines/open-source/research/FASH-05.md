# FASH-05 — open-source source research (slot 07)

- **Run:** `2026-11-16T21-43-57-698Z-research-FASH-05`
- **Scope:** partial — this file covers FASH-05 only. The rest of the category is researched separately.
- **Research model:** unsloth/Qwen3.6-35B-A3B-GGUF (vt-arc-falcon-llamacpp, apache-2.0, open weights) declared for slot 07
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 3/3 candidate homepages and 12/13 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/FASH-05-http-2026-11-16.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### FASH-05

- **source_id**: FASH-05
- **subcategory**: fashion magazine
- **source_name**: Vogue
- **official_url**: https://www.vogue.com
- **verified_at**: 2024-05-22 HTTP GET by the orchestrator
- **verification_result**: verified
- **source_pages**:
    - `https://www.vogue.com/` (Vogue: Fashion, Beauty, Celebrity, Fashion Shows | Vogue) -> `index.html`
    - `https://www.vogue.com/fashion` (Fashion News and Trends: Designers, Models, Style Guides | Vogue) -> `fashion.html`
    - `https://www.vogue.com/fashion-shows` (Fashion Shows: Fashion Week, Runway, Designer Collections | Vogue) -> `fashion-shows.html`
    - `https://www.vogue.com/shopping` (Shop Top Fashion, Beauty & Home Products | Vogue) -> `shopping.html`
    - `https://www.vogue.com/beauty` (Beauty: Tips and Trends, Beauty Product Reviews | Vogue) -> `beauty.html`
    - `https://www.vogue.com/culture` (Culture: News, Reviews and Opinion | Vogue) -> `culture.html`
    - `https://www.vogue.com/fashion/trends` (Fashion Trends: What's In For Spring, Summer, Fall, and Winter | Vogue) -> `fashion-trends.html`
    - `https://www.vogue.com/slideshow/10-best-dressed-stars-zendaya-mikey-madison-ayo-edebiri` (The Best Dressed Stars of the Week Proved Formal Can Be Fun | Vogue) -> `slideshow-best-dressed-stars.html`
    - `https://www.vogue.com/shopping/vogue-shopping-lookbook` (The Editor Lookbook | Vogue) -> `shopping-lookbook.html`
    - `https://www.vogue.com/article/faux-fur-trim-robe-coat-trend` (The Data Shows It: The Faux Fur-Trimmed Coat Is the Coat of the Season | Vogue) -> `article-faux-fur-trim-robe-coat-trend.html`
    - `https://www.vogue.com/business` (Vogue Business: Fashion Industry Expertise From an Insider's Perspective | Vogue) -> `business.html`
- **key_regions**: Header, Navigation (main, fashion sub, beauty sub, culture sub, shopping sub, business sub), Hero (featured stories), Content Bands (grid of articles), Sidebar (related stories, newsletter signup), Footer (links, social).
- **key_interactions**:
    - **Editorial Navigation**: observed (nav_links present in all fetched pages)
    - **Article Search**: inferred (search link present in navigation, but search page itself failed to fetch)
    - **Newsletter Simulation**: inferred (newsletter links present in footer and navigation)
    - **Gallery/Lightbox**: inferred (slideshow pages present, markup shows slideshow structure)
- **complexity**: high (large byte counts, extensive navigation, multiple sections)
- **stack_clues**: unknown
- **limitations**: Search page blocked by robots.txt.

```json
{"rows": [{"source_id": "FASH-05", "subcategory": "fashion magazine", "source_name": "Vogue", "source_url": "https://www.vogue.com", "verified_at": "2024-05-22 HTTP GET by the orchestrator", "verification_method": "HTTP GET by the orchestrator", "verification_result": "verified", "evidence_reference": "", "source_pages": [{"url": "https://www.vogue.com/", "title": "Vogue: Fashion, Beauty, Celebrity, Fashion Shows | Vogue", "local_file": "index.html"}, {"url": "https://www.vogue.com/fashion", "title": "Fashion News and Trends: Designers, Models, Style Guides | Vogue", "local_file": "fashion.html"}, {"url": "https://www.vogue.com/fashion-shows", "title": "Fashion Shows: Fashion Week, Runway, Designer Collections | Vogue", "local_file": "fashion-shows.html"}, {"url": "https://www.vogue.com/shopping", "title": "Shop Top Fashion, Beauty & Home Products | Vogue", "local_file": "shopping.html"}, {"url": "https://www.vogue.com/beauty", "title": "Beauty: Tips and Trends, Beauty Product Reviews | Vogue", "local_file": "beauty.html"}, {"url": "https://www.vogue.com/culture", "title": "Culture: News, Reviews and Opinion | Vogue", "local_file": "culture.html"}, {"url": "https://www.vogue.com/fashion/trends", "title": "Fashion Trends: What's In For Spring, Summer, Fall, and Winter | Vogue", "local_file": "fashion-trends.html"}, {"url": "https://www.vogue.com/slideshow/10-best-dressed-stars-zendaya-mikey-madison-ayo-edebiri", "title": "The Best Dressed Stars of the Week Proved Formal Can Be Fun | Vogue", "local_file": "slideshow-best-dressed-stars.html"}, {"url": "https://www.vogue.com/shopping/vogue-shopping-lookbook", "title": "The Editor Lookbook | Vogue", "local_file": "shopping-lookbook.html"}, {"url": "https://www.vogue.com/article/faux-fur-trim-robe-coat-trend", "title": "The Data Shows It: The Faux Fur-Trimmed Coat Is the Coat of the Season | Vogue", "local_file": "article-faux-fur-trim-robe-coat-trend.html"}, {"url": "https://www.vogue.com/business", "title": "Vogue Business: Fashion Industry Expertise From an Insider's Perspective | Vogue", "local_file": "business.html"}], "key_regions": ["Header", "Navigation", "Hero", "Content Bands", "Sidebar", "Footer"], "key_interactions": [{"name": "Editorial Navigation", "evidence": "observed", "notes": "nav_links present in all fetched pages"}, {"name": "Article Search", "evidence": "inferred", "notes": "search link present in navigation, but search page itself failed to fetch"}, {"name": "Newsletter Simulation", "evidence": "inferred", "notes": "newsletter links present in footer and navigation"}, {"name": "Gallery/Lightbox", "evidence": "inferred", "notes": "slideshow pages present, markup shows slideshow structure"}], "complexity": "high", "stack_clues": "unknown", "limitations": "Search page blocked by robots.txt."}]}
```
