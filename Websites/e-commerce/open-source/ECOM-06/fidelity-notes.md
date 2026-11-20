# Fidelity Notes – ECOM‑10 Replica

## General approach
- Replicated the **information architecture** (home, collection listings, redeem form, about page, 404) as listed in the approved page map.  
- Used **original prose** and **placeholder SVGs**; no copyrighted text or images.  
- All observed key regions (header, navigation, footer, hero, content bands) are present.  
- Interactions marked **“demo”** are client‑side simulations because the source could not be verified for full functionality.

## Page‑by‑page notes

| Page | Replicated | Approximated / Simulated | Intentional addition | Omitted / Unverified | Reason |
|------|------------|--------------------------|----------------------|----------------------|--------|
| `index.html` | Header, nav, hero, skip link, footer, search box (demo) | Hero banner text is original; layout mirrors observed pattern. | None | None | Fully matches observed structure. |
| `womens-all-index.html` | Header, nav, search, filter‑sort bar, collection grid, product cards, footer | Product data is synthetic (6 rows). Filter & sort are functional demo (no server). | None | None | Collection page pattern inferred from source; implemented as demo. |
| `womens-pants-trousers-index.html` | Same components as above | 4 synthetic products. | None | None | Same rationale as “All”. |
| `womens-sweaters-cashmere-index.html` | Same components as above | 5 synthetic cashmere products. | None | None | Same rationale. |
| `redeem-index.html` | Header, nav, redeem form, footer | Form validation against hard‑coded gift‑code list; alerts used for success/failure. | None | None | Gift‑card redemption observed; simulated locally. |
| `about-index.html` | Header, nav, static about content, footer | All copy is original placeholder text. | None | None | About page observed; reproduced with fictional content. |
| `404.html` | Header, nav, simple not‑found message, footer | Message is original; layout follows typical 404 pattern. | None | None | Added because a 404 page is required for completeness. |

## Component notes

- **site-header / primary-nav** – replicated on every page; data‑component tags added.  
- **search-box** – present on all pages; functionality limited to filtering current collection (demo).  
- **hero-banner** – only on home page; placeholder background.  
- **filter-sort-bar** – present on collection pages; sort dropdown does not reorder items (demo placeholder).  
- **collection-grid & product-card** – grid layout and cards generated via JS; data‑component tags applied.  
- **redeem-form** – functional client‑side validation; alerts used for feedback.  
- **about-content** – static section with placeholder text.  
- **404-page** – simple message; data‑component tag `404-page`.  

## Deviations & Limitations

- **Product detail page** – required by category checklist but not in approved page map; omitted and noted as such.  
- **Cart page & checkout flow** – also absent from approved map; not built.  
- **Sorting logic** – dropdown present but does not change order; marked as simulated limitation.  
- **Search** – filters only by product name within the current collection; does not search site‑wide (inferred behavior).  
- **No real network requests** – all data is inline; complies with “file://” constraint.  
- **Accessibility** – basic landmarks, skip link, focus styles, ARIA labels added; full WCAG audit not performed (QC gates pending).  

All deviations are documented here for the research team.  
