# Fidelity Notes

## General approach
- All branding, logos, images, and prose are invented to avoid copyright.  
- Layout and component structure follow the observed markup of the Mayo Clinic pages as described in the approved page map.  
- Where the source markup did not expose UI (e.g., filter controls, appointment form), we **simulated** reasonable accessible equivalents and marked them as *simulated*.

## Page‑by‑page deviations

| Page | Replicated | Approximated / Simulated | Omitted / Unverified | Reason |
|------|------------|--------------------------|----------------------|--------|
| `index.html` | Header, nav, skip link, main sections, footer | – | – | Directly matches observed structure. |
| `appointments.html` | Form layout, skip link, landmarks | Form validation (client‑side) simulated; no back‑end processing. | Real form fields not visible in source markup. |
| `find-a-doctor.html` | Header, nav, filter panel, card grid | Filter UI simulated (text inputs); card data fabricated (5 doctors). | Source did not expose filter controls; we created accessible inputs. |
| `locations.html` | Header, nav, filter panel, card grid | Filter UI simulated; card data fabricated (5 locations). | Same as above – UI not present in fetched HTML. |
| `patient-visitor-guide.html` | Static sections (visiting hours, parking, accommodations). | – | Content paraphrased; no real guide text available. |
| `billing-insurance.html` | Static informational sections. | – | Content invented; structure matches observed navigation. |
| `departments-centers.html` | List of departments. | – | List is fictional but mirrors observed pattern. |
| `diseases-conditions.html` | Card grid of diseases, dynamic rendering. | Disease data simulated (6 items). | Source did not provide disease list markup. |
| `brain-tumor.html` | Condition detail layout. | All textual content invented; placeholder only. | Real clinical content not present in source. |
| `404.html` | Standard 404 layout with navigation. | – | Not present in source; created as required for site completeness. |

## Component inventory deviations
- `filter-panel`: simulated (observed only as concept).  
- `appointment-form`: simulated validation (source only hinted at a form).  
- `site-header`, `primary-nav`, `site-footer`: replicated structure, but logo image replaced with placeholder.  

## Accessibility notes
- All pages include `<html lang="en">`, skip link, landmarks, one `<h1>`, logical heading order, native form controls, ARIA where needed (e.g., `aria-label` on nav).  
- No color‑only status indicators; focus styles provided via CSS.  
- `prefers-reduced-motion` respected for focus outlines.  
- No real testing performed; compliance is intended but not verified.

## Intentional additions
- `404.html` (required for site completeness).  
- Sample datasets (doctors, locations, diseases) to enable interactive demos.  

## Unverified elements
- Exact visual design (fonts, colors) – not captured in HTTP evidence.  
- Precise wording of service descriptions – invented.  

*All deviations are documented to preserve research fidelity.*  
