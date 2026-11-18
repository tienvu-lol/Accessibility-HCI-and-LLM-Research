# Vogue Vista – Replica FASH‑10

**Replica ID:** FASH-10  
**Category:** fashion (Fashion editorial)  
**Fictional brand:** Vogue Vista (original name, logo, copy)  

## Source information
- **Approved source:** Harper’s Bazaar  
- **Source URL:** https://www.harpersbazaar.com/  
- **Verification method:** HTTP GET by the orchestrator  
- **Verified at:** 2026‑11‑17  

## How to open the site locally
1. Clone or copy the `fashion/open-source/FASH-10` directory to a local folder.  
2. Open any HTML file (e.g., `index.html`) in a browser via `file://` URL.  
3. All assets are relative; no server is required.

## Sitemap (full page list)
| Local file                | Corresponding source URL (approved) |
|---------------------------|--------------------------------------|
| `index.html`              | https://www.harpersbazaar.com/ |
| `fashion-index.html`      | https://www.harpersbazaar.com/fashion/ |
| `beauty-index.html`       | https://www.harpersbazaar.com/beauty/ |
| `travel-dining-index.html`| https://www.harpersbazaar.com/culture/travel-dining/ |
| `red-carpet-index.html`   | https://www.harpersbazaar.com/celebrity/red-carpet-dresses/... |
| `newsletter-index.html`   | https://www.harpersbazaar.com/email/harpersbazaar-newsletter |
| `404.html`                | Generic not‑found page (required) |

## Sample datasets (inline JavaScript)
| Dataset | Rows (objects) | Where used |
|---------|----------------|------------|
| `featuredArticles` | 6 | Fashion page search filter |
| `galleryItems` | 4 | Red‑carpet lightbox demo |
| Newsletter form fields | 3 | Newsletter sign‑up page (validation) |

## Interaction & simulation notes
- **Editorial navigation:** Fully keyboard‑accessible, ARIA‑expanded handling, Escape to close mobile menu.  
- **Gallery / lightbox carousel:** Simulated client‑side dialog with next/prev controls; labelled “demo”.  
- **Article search:** Client‑side filter of `featuredArticles`; no server request.  
- **Newsletter sign‑up:** Client‑side validation, error summary, demo success message.  
- **Responsive menu toggle:** Added for mobile (intentional addition, noted in fidelity notes).  

## QC Gates (Rules.md §9) – status (set by orchestrator)
- Gate 1 (HTML validity): not‑tested  
- Gate 2 (CSS validity): not‑tested  
- Gate 3 (Accessibility baseline): not‑tested  
- Gate 4 (Data‑attribute tagging): not‑tested  
- Gate 5 (Responsive layout): not‑tested  
- Gate 6 (Script errors): not‑tested  
- Gate 7 (Asset availability): not‑tested  

*All gates will be evaluated by the shared QC tool after delivery.*
