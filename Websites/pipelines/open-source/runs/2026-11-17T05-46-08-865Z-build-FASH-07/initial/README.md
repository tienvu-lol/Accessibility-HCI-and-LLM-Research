# Lumina Magazine — FASH-07 Replica

## Replica Information
- **Replica ID**: FASH-07
- **Category**: Fashion editorial
- **Fictional Branding**: Lumina Magazine
- **Approved Source**: [Vogue](https://www.vogue.com)
- **Source Verified At**: 2026-11-16
- **Verification Method**: HTTP GET by the orchestrator
- **Verification Result**: verified

## How to Open Locally
Open `index.html` in any modern browser. All assets are local; no server required.

## Sitemap
| Page | Local File | Source URL |
|------|------------|------------|
| Home | `index.html` | https://www.vogue.com/ |
| Fashion | `fashion.html` | https://www.vogue.com/fashion |
| Fashion Shows | `fashion-shows.html` | https://www.vogue.com/fashion-shows |
| Shopping | `shopping.html` | https://www.vogue.com/shopping |
| Beauty | `beauty.html` | https://www.vogue.com/beauty |
| Culture | `culture.html` | https://www.vogue.com/culture |
| Fashion Trends | `fashion-trends.html` | https://www.vogue.com/fashion/trends |
| Slideshow: Best Dressed | `slideshow-best-dressed-stars.html` | https://www.vogue.com/slideshow/10-best-dressed-stars-zendaya-mikey-madison-ayo-edebiri |
| Shopping Lookbook | `shopping-lookbook.html` | https://www.vogue.com/shopping/vogue-shopping-lookbook |
| Article: Faux Fur Trim | `article-faux-fur-trim-robe-coat-trend.html` | https://www.vogue.com/article/faux-fur-trim-robe-coat-trend |
| Business | `business.html` | https://www.vogue.com/business |
| 404 | `404.html` | (not in source map; intentional addition) |

## Page-to-Source Mapping
- `index.html` → Vogue homepage: hero banner, editorial content bands, trending sidebar, newsletter signup
- `fashion.html` → Vogue Fashion: category grid, filter bar, article cards
- `fashion-shows.html` → Vogue Fashion Shows: schedule cards, designer profiles
- `shopping.html` → Vogue Shopping: product grid, price/category filters
- `beauty.html` → Vogue Beauty: review cards, ingredient tags, skin-type filter
- `culture.html` → Vogue Culture: opinion pieces, event listings, topic filter
- `fashion-trends.html` → Vogue Fashion Trends: trend cards, seasonal tabs
- `slideshow-best-dressed-stars.html` → Vogue Slideshow: lightbox gallery with keyboard nav
- `shopping-lookbook.html` → Vogue Lookbook: editor picks, related products
- `article-faux-fur-trim-robe-coat-trend.html` → Vogue Article: full story, related articles
- `business.html` → Vogue Business: industry news, sector filters
- `404.html` → Intentional addition: error page with search and popular links

## Sample Dataset Row Counts
- `articles`: 10 rows
- `shows`: 5 rows
- `shopping`: 8 rows
- `beauty`: 6 rows
- `culture`: 4 rows
- `business`: 3 rows
- `slideshow`: 10 rows
- `lookbook`: 12 rows

## Interactions and Simulation Notes
- **Editorial Navigation**: Dropdown menus with keyboard focus trap and Escape close (observed)
- **Newsletter Simulation**: Footer/nav form with inline validation and demo success state (inferred)
- **Gallery/Lightbox**: Keyboard nav (Arrows/Escape), focus locked inside overlay (inferred)
- **Article Search**: Local `input` filtering across inline datasets, empty-state handling (inferred)
- **Shopping Cart**: Demo outcome with clear non-functional label (intentional addition)
- **Seasonal Tabs**: Visual toggle only, no content switching (intentional addition)

## QC Gates (Rules.md Section 9)
1. **HTML Validity**: not-tested
2. **CSS Validity**: not-tested
3. **JS Validity**: not-tested
4. **Accessibility (WCAG 2.2 AA)**: not-tested
5. **Performance**: not-tested
6. **Security**: not-tested
7. **Functionality**: not-tested

## What Was Not Tested
- Screen readers (NVDA, VoiceOver, JAWS)
- Zoom to 200% and 400%
- Manual keyboard walkthroughs
- Non-Chromium browsers (Firefox, Safari, Edge)
- Real-time interaction testing
- Live search functionality

---
*This is a fictional replica for research purposes. No real purchases, copyrighted photographs, external embeds, or invented endorsements are included.*
