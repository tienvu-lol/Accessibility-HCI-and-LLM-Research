# Replica ID: ECOM-10 (open‑source)

**Category:** e‑commerce (slot 10)  
**Fictional brand:** **Fictitious Apparel** – a placeholder direct‑to‑consumer clothing store created solely for research.

**Approved source URL:** https://www.everlane.com/  
**Verification method:** HTTP GET by the orchestrator (verified 2026‑11‑17).  

## How to open the site locally
1. Clone or copy the `e-commerce/open-source/ECOM-10` directory to a local folder.  
2. Open any HTML file (e.g., `index.html`) in a modern browser via `file://` URL.  
3. All assets are relative; no server is required.

## Sitemap (pages & source mapping)

| Local file | Approx. source page (title) | Role |
|------------|----------------------------|------|
| `index.html` | Home – Everlane | Homepage |
| `womens-all-index.html` | Women’s Clothing – Everlane | Collection “All” |
| `womens-pants-trousers-index.html` | Women’s Trousers – Everlane | Collection “Pants & Trousers” |
| `womens-sweaters-cashmere-index.html` | Women’s Cashmere Sweaters – Everlane | Collection “Cashmere Sweaters” |
| `redeem-index.html` | Redeem – Everlane | Gift‑card redemption form |
| `about-index.html` | About – Everlane | About page |
| `404.html` | (fallback) | Not‑found page |

## Sample datasets (inline in `js/main.js`)

| Dataset | Rows |
|---------|------|
| `womens-all` | 6 |
| `womens-pants-trousers` | 4 |
| `womens-sweaters-cashmere` | 5 |
| `gift-codes` | 3 |

These datasets power the demo collection grids and the redemption form validation.

## Interaction & simulation notes
- **Navigation:** Header links navigate between pages (standard anchors).  
- **Search box:** Filters the current collection grid by product name (client‑side demo).  
- **Filter / sort bar:** Dropdowns change the order of displayed items (demo only; sorting not fully implemented).  
- **Add to cart:** Button adds the product to a client‑side array and shows an alert – no real cart UI.  
- **Gift‑card redemption:** Form validates code against the hard‑coded list and shows an alert; no backend processing.  
- **No real checkout, payment, or account flows** – per simulation notes.  

## QC Gates (Rules.md §9) – status after orchestrator run
| Gate | Status |
|------|--------|
| 1. File naming & paths | not‑tested |
| 2. HTML validity | not‑tested |
| 3. CSS syntax | not‑tested |
| 4. JS syntax | not‑tested |
| 5. Accessibility basics (landmarks, skip link, focus) | not‑tested |
| 6. Data‑component tagging | not‑tested |
| 7. No external resources | not‑tested |

*All gates will be evaluated by the shared QC tool after submission.*

## What was not tested
- Keyboard‑only navigation across all interactive elements (will be covered by QC).  
- Screen‑reader experience (beyond basic landmarks).  

---  
*This replica is intended solely for controlled research; all content is fictional and any resemblance to real brands is coincidental.*  
