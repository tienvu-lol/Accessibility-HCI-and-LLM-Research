# Fidelity Notes – PORT‑10 Replica (updated)

## General updates
- Added **privacy.html** and **terms.html** as placeholder legal pages to resolve broken footer links on every page.
- Fixed JavaScript runtime errors by wrapping all inline data‑rendering scripts in `DOMContentLoaded` listeners so that `window.sampleData` (defined in `js/main.js`) is available before the scripts execute.
- Added `role="region"` and `aria-label="hero"` to the hero section on the home page to address the Axe moderate region issue.
- Enhanced CSS:
  * Made tables full‑width and added border‑collapse for better layout on small viewports.
  * Added a responsive flex‑wrap layout for the card grid on the home page.
- Updated the footer on `office-hours.html` (typo fix in copyright line).

## Page‑by‑page deviations (unchanged from previous notes unless noted)
| Page | Note |
|------|------|
| `index.html` | Hero now has explicit region role/label. |
| `blog.html`, `talks.html`, `courses.html`, `testimonials.html`, `office-hours.html` | Inline scripts now wait for `DOMContentLoaded`. |
| All pages | Footer links now point to existing `privacy.html` and `terms.html`. |
| `privacy.html` / `terms.html` | New placeholder pages (intentional addition). |

All other fidelity notes remain as previously documented.
