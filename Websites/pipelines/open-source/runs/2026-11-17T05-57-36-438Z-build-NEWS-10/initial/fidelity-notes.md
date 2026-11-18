# Fidelity Notes – NEWS-10 Replica

## General approach
- Replicated the information architecture (home + nine section fronts) exactly as listed in the approved page map.
- All shared UI patterns (header, primary navigation, skip link, footer, article‑card grid, sidebar) were built as reusable components and tagged with `data-component` attributes.
- No real images or branding were used; all graphics are generic SVG placeholders (`assets/placeholder.svg`).

## Page‑by‑page fidelity

| Page | Replicated elements | Approximated / Simulated | Omitted / Unverified |
|------|--------------------|--------------------------|----------------------|
| `index.html` | Header, nav, hero banner, article list, sidebar, search form, newsletter form, skip link, footer | Search and newsletter are **simulated** (client‑side only). | Hero image is a placeholder; exact visual layout inferred from markup only. |
| Section pages (`*-index.html`) | Header, nav, article list, skip link, footer, search & newsletter (simulated) | No hero banner; sidebar only on business (as observed on home). | Any carousel, video, or interactive widgets that might exist on the real site are **unverified** and therefore omitted. |
| `404.html` | Basic error message, header, nav, footer, skip link | None – purely static. | No custom design from source (unverified). |

## Components inventory
- `site-header` – present on every page; contains logo placeholder, site title, and primary nav.
- `primary-nav` – list of links to all nine section pages; keyboard accessible, `aria-label="Main navigation"`.
- `hero-banner` – only on home; static heading and paragraph.
- `article-list` – grid of article‑card previews; populated via JS from inline datasets.
- `article-card` – individual preview; image `alt=""` (decorative), title, summary, “Read more” link (`href="#"` placeholder).
- `sidebar` – appears on home and business; shows “Most Read” list.
- `search-form` – header search; client‑side filter of `homeArticles`; alerts announced via `role="alert"` and `aria-live="polite"`.
- `newsletter-form` – footer subscription; simple email validation, success message announced via `aria-live="polite"`.
- `site-footer` – static copyright and site‑map link.

## Simulations & intentional additions
- **Search**: Inferred from typical news sites; implemented as a client‑side filter of the home‑page dataset. Marked as **simulated**.
- **Newsletter subscription**: Inferred; implemented with client‑side validation and a static thank‑you message. Marked as **simulated**.
- **Most‑read sidebar**: Data provided inline; not verified against the source but matches the observed pattern of a sidebar on the home page.
- **Placeholder SVG**: Added to satisfy image requirements without using copyrighted assets.

## Deviations & reasons
- **No article detail pages** – the approved map does not include them; creating them would exceed the scoped page count.
- **No live search index** – HTTP evidence did not contain a search form; a full‑stack search is impossible without a backend, so a lightweight client‑side simulation was used.
- **No external fonts or icons** – prohibited by the technology constraints.
- **No dynamic ads or paywall widgets** – not present in the evidence and would require external services.

All deviations are documented here for transparency. No undocumented changes were made.
