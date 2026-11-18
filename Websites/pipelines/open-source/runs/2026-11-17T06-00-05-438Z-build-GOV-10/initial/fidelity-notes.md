# Fidelity Notes – GOV‑10 Replica

## General approach
All pages are built from the approved HTTP‑fetched markup of the six source URLs. No visual rendering of the source was performed; any layout, colour, or image that could not be derived from the markup is replaced with original placeholders and noted below.

## Page‑by‑page summary

| Page | Replicated elements | Approximated / Simulated | Intentional additions | Omitted / Unverified | Notes |
|------|--------------------|--------------------------|-----------------------|----------------------|-------|
| `index.html` | Header, primary nav, hero banner, skip link, footer, alert banner | Hero image replaced with text placeholder; colour scheme invented | Language toggle (observed) | Exact visual design (unverified) | Search not present on home page in source; not added. |
| `parks-and-recreation.html` | Header, nav, service list grid, sidebar, skip link, footer | Service cards populated from a 5‑row inline dataset (inferred) | Client‑side search widget (inferred) | Exact icons / images (unverified) | Calendar link present in source – linked to placeholder `events.html`. |
| `park-permits.html` | Header, nav, form fields, skip link, footer | Permit type dropdown populated from inline dataset | Form validation demo (observed) | Real permit application processing (unavailable) | Marked as demo; no backend. |
| `pothole-repair.html` | Header, nav, issue list, sidebar, skip link, footer | Issue cards from inline dataset | Search widget (inferred) | Real issue‑reporting system (unavailable) | Alerts banner omitted (not in source). |
| `pay-bill.html` | Header, nav, payment form, skip link, footer | Payment method dropdown from inline dataset | Demo submission success message | Real payment gateway integration (unavailable) | Language toggle present as observed. |
| `complaint-form.html` | Header, nav, complaint form, skip link, footer | Complaint categories from inline dataset | Inline validation, error summary | Real ticket creation system (unavailable) | Form marked as demo. |
| `404.html` | Header, nav, skip link, footer, simple message | All content original placeholder | None | None | Provides standard not‑found page. |

## Components inventory
See `component-inventory.json` for a structured list of each reusable component, its selector, pages, behaviours, keyboard expectations and validation status.

## Data & interactions
All datasets are hard‑coded in `js/main.js`. Counts match the table in `README.md`. Interactions marked “inferred” (search, alerts) are not observable in the fetched markup; they are reasonable approximations based on typical municipal sites and are flagged accordingly.

## Unverified / missing elements
- Visual branding (logo, colour palette) – replaced with generic SVG placeholder.  
- Exact hero image and banner copy – invented placeholder text.  
- Any dynamic calendar widget – replaced with static link.  
- Real backend processing for forms and payments – omitted, replaced with demo messages.

All deviations are documented here to preserve research fidelity.  
