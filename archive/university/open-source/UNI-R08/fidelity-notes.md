# Fidelity Notes – Liberal Arts College Replica (UNI-R08)

## Overview
This replica is based on the approved source (Amherst College) as of the verification date 2025-09-16. No visual rendering or interaction testing was performed by the agent; all replication is inferred from the provided page map and typical patterns for a small private liberal‑arts college website.

## Page‑by‑Page Notes

### index.html (Home)
- **Replicated**: Site header, primary navigation, hero banner, main welcome text, quick‑links section, site footer.  
- **Approximated**: Hero banner uses a solid background color instead of a specific image (no image was observed in evidence).  
- **Intentionally Added**: Skip link (first focusable element) to meet WCAG baseline; toast container for simulation feedback.  
- **Omitted**: Any rotating carousel or dynamic featured content not present in the evidence.  
- **Unverified**: Exact wording of the hero text and link set; we used generic placeholders.

### academic-life.html (Academics)
- **Replicated**: Header, navigation, sidebar with faculty list, main heading, program search, card grid of programs.  
- **Approximated**: Faculty sidebar uses placeholder names and titles; no actual staff data was observed.  
- **Intentionally Added**: Search input for program filtering (matches inferred interaction).  
- **Omitted**: Detailed department descriptions, accreditation badges, or nested sub‑pages.  
- **Unverified**: Whether the sidebar appears on the real site; we included it as a common pattern.

### departments.html (Majors / Program Listing)
- **Replicated**: Header, navigation, program search, card grid of all programs.  
- **Approximated**: Program descriptions are generic; no specific catalog text was observed.  
- **Intentionally Added**: Search input (same as academic-life).  
- **Omitted**: Any filter by school or degree type, pagination, or detailed course listings per major.  
- **Unverified**: Whether the real site uses a grid or list layout; we chose a responsive grid.

### college-catalog.html (Course Catalog)
- **Replicated**: Header, navigation, course search, card grid of courses with code, title, credits, description.  
- **Approximated**: Course data are invented samples; no actual course catalog was observed.  
- **Intentionally Added**: Search input for course filtering.  
- **Omitted**: Prerequisites, scheduling information, instructor names, or PDF download links.  
- **Unverified**: Whether the real site paginates results; we show all samples on one page.

### admission.html (Admission & Financial Aid)
- **Replicated**: Header, navigation, FAQ section, simulated contact form.  
- **Approximated**: FAQ questions and answers are generic placeholders.  
- **Intentionally Added**: Contact form simulation (matches inferred visit/information inquiry).  
- **Omitted**: Tuition calculator, net‑price calculator, detailed aid eligibility tables, or application status portal.  
- **Unverified**: Whether the real site includes an accordion or tabs for FAQ; we used a definition list.

### apply.html (Apply)
- **Replicated**: Header, navigation, simulated application form with disclaimer.  
- **Approximated**: Form fields are typical admission fields; no real application was observed.  
- **Intentionally Added**: Explicit note that the form is a demo and no data is stored.  
- **Omitted**: File upload for transcripts, recommendation letters, essay prompts, or payment integration.  
- **Unverified**: Whether the real site uses a multi‑step wizard; we used a single page for simplicity.

### visiting.html (Visit)
- **Replicated**: Header, navigation, visit options cards, simulated contact form for scheduling.  
- **Approximated**: Visit option descriptions are generic; no specific tour schedule was observed.  
- **Intentionally Added**: Contact form simulation (same pattern as admission).  
- **Omitted**: Calendar picker, real‑time availability checking, or virtual tour embed.  
- **Unverified**: Whether the real site includes a map or directions widget; we omitted it.

### news.html (News & Events)
- **Replicated**: Header, navigation, filter bar by category, card grid of news items with date, title, summary.  
- **Approximated**: News items are invented samples; no actual news feed was observed.  
- **Intentionally Added**: Category filter buttons (matches inferred events filtering).  
- **Omitted**: Pagination, search within news, tags beyond categories, or comment sections.  
- **Unverified**: Whether the real site uses a list or grid; we chose a grid for consistency.

### 404.html (Page Not Found)
- **Replicated**: Header, navigation, error message, link to home, site footer.  
- **Intentionally Added**: None beyond standard error page.  
- **Omitted**: Search box or suggested links sometimes present on custom 404 pages.  

## Component‑Level Notes

### site-header
- **Replicated**: Logo/site name on every page.  
- **Approximated**: Site name is fictional; no logo image used (placeholder could be added).  
- **Status**: Implemented.

### primary-nav
- **Replicated**: Horizontal list of links; collapses to hamburger on narrow viewports.  
- **Approximated**: Interaction relies on JavaScript for aria‑expanded toggling.  
- **Status**: Implemented.

### hero-banner
- **Replicated**: Prominent section on home and academic‑life pages.  
- **Approximated**: Background color only; no background image.  
- **Status**: Implemented.

### site-footer
- **Replicated**: Copyright and simple navigation on every page.  
- **Status**: Implemented.

### card-grid
- **Replicated**: Used for programs, courses, news, and visit options.  
- **Approximated**: Uniform card styling; no variation for featured vs. regular items.  
- **Status**: Implemented.

### sidebar
- **Replicated**: Faculty list on academic‑life page.  
- **Approximated**: Static list; no dynamic loading or show/hide.  
- **Status**: Implemented.

### contact-form
- **Replicated**: Simple form with name, email, message on visiting.html and admission.html.  
- **Approximated**: No server‑side processing; simulated via toast.  
- **Status**: Implemented (demo).

### filter-bar
- **Replicated**: Category buttons on news.html.  
- **Approximated**: Mutually exclusive via ARIA‑pressed; no persistent state.  
- **Status**: Implemented.

### FAQ
- **Replicated**: Definition list on admission.html.  
- **Approximated**: Static questions/answers.  
- **Status**: Implemented.

### application-form
- **Replicated**: Demo form on apply.html.  
- **Approximated**: No validation beyond required fields; demo only.  
- **Status**: Implemented (simulation).

### program-search / course-search
- **Replicated**: Search inputs that filter card grids in real time.  
- **Approximated**: Case‑insensitive substring match.  
- **Status**: Implemented.

## Intentional Additions
- Skip link (first focusable element) for WCAG compliance.  
- Toast container for simulation feedback.  
- Search inputs on program and course listings (to satisfy inferred interaction).  
- Category filter bar on news page (to satisfy inferred events filtering).  
- Explicit simulation disclaimers on forms.

## Omissions (Due to Lack of Evidence)
- Any dynamic content requiring server‑side processing (login, real‑time calendar, payment).  
- Third‑party widgets, embeds, or web fonts.  
- Advanced UI patterns like accordions, tabs, modals, or carousels not observed.  
- Detailed accessibility features beyond the baseline (e.g., skip link visibility only on focus, focus outline).  

## Unverified Items
- Exact visual design (colors, spacing, typography) beyond inferred WCAG‑friendly choices.  
- Presence of certain sections (e.g., alumni, giving, athletics) not in the approved page map.  
- Whether the real site uses a responsive grid or list for programs/courses.  

---  
*These notes are provided for research transparency under WEB-REPLICA-V1.0.*  
