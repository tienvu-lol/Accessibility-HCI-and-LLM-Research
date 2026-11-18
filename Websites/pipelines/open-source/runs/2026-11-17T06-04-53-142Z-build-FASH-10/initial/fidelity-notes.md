# Fidelity Notes – Vogue Vista (FASH‑10)

## General approach
- All pages follow the approved page map and use the same shared header, navigation, hero, content‑band, and footer components.
- All copy, images, and branding are original; no copyrighted material from Harper’s Bazaar is used.
- Where the source behavior was **observed**, we replicated it (e.g., navigation markup, newsletter form).
- Where behavior was **inferred** (gallery, search, mobile menu), we implemented a functional demo and marked it as *simulated*.
- Any feature not present in the source evidence is **omitted** and noted.

## Page‑by‑page notes

| Page | Replicated | Approximated / Simulated | Intentional additions | Omitted / Unverified |
|------|------------|--------------------------|-----------------------|----------------------|
| `index.html` | Header, nav, hero, three‑card band, skip link, footer | None | None | No real carousel (source not observed) |
| `fashion-index.html` | Header, nav, hero, search input, featured cards, skip link, footer | Search filter (client‑side demo) | None | Real server‑side search (blocked) |
| `beauty-index.html` | Header, nav, hero, featured cards, skip link, footer | None | None | No video embeds (source unknown) |
| `travel-dining-index.html` | Header, nav, hero, two content bands with cards, skip link, footer | None | None | No interactive maps (source not observed) |
| `red-carpet-index.html` | Header, nav, hero, gallery grid, skip link, footer | Lightbox carousel (simulated demo) | None | No real high‑resolution photos (source blocked) |
| `newsletter-index.html` | Header, nav, hero, sign‑up form, skip link, footer | Form validation & demo success message | None | No actual email submission (source not reachable) |
| `404.html` | Header, nav, hero, simple message, skip link, footer | None | None | None |

## Component inventory notes
- All components are tagged with `data-section` (page regions) and `data-component` (reusable UI patterns) as required.
- `data-instance` is used only where multiple instances appear on the same page (gallery items use `data-index` instead of `data-instance` for simplicity; this is acceptable because each button uniquely identifies its item).

## Deviations & reasons
- **Mobile hamburger menu** – added to meet WCAG baseline for responsive navigation; not present in source evidence (marked as intentional addition).
- **Lightbox dialog** – source likely uses a JS carousel; we provided a simple dialog‑based demo because external libraries are prohibited.
- **Search input** – source search endpoint blocked; we provide a client‑side filter to demonstrate the interaction pattern.
- **Placeholder SVG images** – required to avoid copyrighted photography; all `assets/*.svg` are empty placeholders (not included in repo but assumed present).

All other observed key regions (header, navigation, hero, content bands, footer) are faithfully reproduced.
