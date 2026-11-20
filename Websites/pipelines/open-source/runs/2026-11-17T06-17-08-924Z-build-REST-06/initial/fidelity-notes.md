# Fidelity Notes – Sunrise Bakery (REST‑10)

## General approach
- All six approved pages are reproduced with original prose and placeholder graphics.  
- The site follows the observed information architecture (header, navigation, hero, main, footer).  
- WCAG‑oriented baseline implemented (skip link, landmarks, focus management, ARIA attributes).  

## Page‑by‑page deviations

| Page | Replicated | Approximated / Simulated | Omitted | Reason / Note |
|------|------------|--------------------------|---------|----------------|
| Home (`index.html`) | Header, nav, hero, main sections, footer | – | – | Matches observed markup; no dynamic content observed. |
| Locations (`cities-index.html`) | Header, nav, hero, filter UI, card grid | Filter interaction **simulated** (inferred) | – | No client‑side filtering observed; added to demonstrate interaction. |
| Bakery (`bakery-index.html`) | Header, nav, hero, menu download link, reservation form | Reservation form **simulated** (inferred) | – | No reservation form in source markup; added as per category requirement, clearly labeled “Demo”. |
| About (`about-index.html`) | Header, nav, hero, static sections | – | – | Directly mirrors observed sections. |
| Our Story (`our-story-index.html`) | Header, nav, hero, article content | – | – | Content rewritten in original prose. |
| Press (`press-index.html`) | Header, nav, hero, press list | Press items **simulated** (inferred) | – | No press items in fetched markup; placeholder items added for demo. |
| 404 (`404.html`) | Standard error page | – | – | Not part of source map but required for site completeness. |

## Components

- **site-header**, **primary-nav**, **hero**, **site-footer**: present on every page, tagged with `data-component`.  
- **location-card-grid**: added to locations page; uses `data-component`.  
- **menu-download**: button linking to placeholder PDF.  
- **reservation-form**: demo form with validation; labeled as simulation.  
- **press-list**: dynamic list populated from inline `pressItems`.  

## Data sets

All datasets are defined inline in `js/main.js`. Row counts are as documented in README. No external fetches are used.

## Accessibility

- `<html lang="en">` present.  
- Skip link is first focusable element, visible on focus.  
- Landmarks: `<header>`, `<nav>`, `<main id="main-content">`, `<footer>`.  
- One `<h1>` per page, heading hierarchy maintained.  
- Native form controls with `<label>` elements.  
- `aria-expanded` on nav toggle, `aria-live` for form error region.  
- Focus moves to error summary on validation failure.  
- Responsive navigation respects `Escape` key.  

## Intentional additions / simulations

- Location filter UI (inferred).  
- Reservation demo form (inferred, labeled).  
- Press list items (inferred).  
- 404 page (standard fallback).  

All such additions are explicitly noted in this document and in the page markup (e.g., “Demo”, “simulation”).

## Unverified / inferred elements

- No evidence of client‑side filtering or reservation handling in source markup; these are inferred from category requirements.  
- No actual PDF menu was fetched; a placeholder file is provided.  
- No press items were present; placeholder titles are used.

---  

These notes should guide reviewers on what matches the source, what is simulated, and where evidence was lacking.
