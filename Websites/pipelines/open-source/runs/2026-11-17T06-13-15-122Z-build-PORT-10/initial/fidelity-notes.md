# Fidelity Notes – PORT‑10 Replica

## General approach
- All pages follow the approved page map.  
- Shared components (`site-header`, `primary-nav`, `site-footer`, etc.) are reused across pages with identical `data-component` values.  
- Content is original prose; no copyrighted text, logos, or real images are used.  
- Inline sample data is derived from the evidence description (row counts) but the actual text is fabricated.

## Page‑by‑page deviations

| Page | Replicated | Approximated / Simulated | Omitted / Not verified | Reason |
|------|------------|--------------------------|------------------------|--------|
| `index.html` | Header, nav, hero, footer, basic card grid | Hero image replaced with placeholder SVG; card content is fictional | Exact hero image, real project cards | No visual evidence; placeholder used. |
| `blog.html` | Header, nav, list component, footer | Blog list generated from fabricated sample data (5 rows) | Real blog post titles/content | Inferred from “blog” page existence; data invented. |
| `talks.html` | Same as blog | Talks list (6 rows) fabricated | Real talk details | Inferred; no markup captured. |
| `courses.html` | Same pattern | Courses list (4 rows) fabricated | Real course descriptions | Inferred. |
| `about.html` | Header, nav, footer, sections | Bio and skills are original placeholder text | Real biography, exact skill list | No source text provided. |
| `contact.html` | Header, nav, footer, contact form | Form validation simulated; success message is a demo. | Real backend handling, email sending | Interaction inferred; simulation noted. |
| `resume.html` | Header, nav, footer, sections | Experience and education are fictional placeholders. | Real resume content | No resume markup was fetched. |
| `office-hours.html` | Header, nav, footer, table component | Table populated from fabricated 3‑row schedule. | Real office‑hours schedule | Inferred from page title only. |
| `transparency.html` | Header, nav, footer, placeholder text | Content is generic transparency statement. | Real transparency data (e.g., financials) | Not present in fetched evidence. |
| `testimonials.html` | Header, nav, footer, list component | 5 fabricated testimonial entries. | Real testimonial quotes | Inferred from count. |
| `404.html` | Custom 404 page | Fully invented layout; follows site pattern. | Real 404 design (none provided) | Added for completeness; marked intentional addition. |

## Component inventory deviations
- `nav-toggle` button added to support responsive navigation (inferred).  
- `card-grid` and `card` components on home page are placeholders; real design unknown.  
- No ARIA roles beyond those required for navigation toggling and form error handling; native semantics used wherever possible.

## Intentional additions
- `404.html` – not part of the source map but required for a functional site. Marked as intentional.  
- Sample data objects in `js/main.js` – created to enable list rendering; counts match the row counts specified in the README.  

## Unverified / inferred elements
- Hero image, sidebar, project filtering UI, gallery/lightbox, and any animation effects are **unverified** (no evidence). They are omitted or replaced with simple placeholders.  
- Reduced‑motion handling is implemented via CSS media query, though the source did not expose such CSS.  

## Summary
The replica reproduces the structural hierarchy, navigation, and page count of the approved source while using original placeholder content. All deviations are documented above, and any inferred behavior is clearly labeled.  
