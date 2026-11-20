# Fidelity Notes for FASH-R08 Replica

## General Approach
“…….”

## Page‑by‑Page Notes

### index.html (Home)
- **Replicated**: Header with site name, primary navigation, hero section with placeholder image and heading, content bands, sidebar, footer.
- **Approximated**: Layout proportions and spacing approximated from evidence; exact visual styling not verified.
- **Simulated**: Search filtering of fashion articles (inline data), newsletter signup toast.
- **Intentionally Added**: Skip link, visible focus indicator, `prefers-reduced-motion` respect, focus trap for lightbox (though no lightbox on home page, the script is ready).
- **Omitted**: Deeper article pages beyond the sections shown on the source homepage; any third‑party widgets or ads.
- **Unverified**: Exact hero image dimensions, exact color palette, exact font choices; these are inferred from typical editorial layouts.

### fashion.html
- **Replicated**: Same header/nav/footer structure, hero, content band with card grid, sidebar.
- **Approximated**: Card grid layout and spacing approximated.
- **Simulated**: Search filters the `fashionArticles` dataset; carousel not present on this page.
- **Intentionally Added**: Skip link, focus indicator, reduced‑motion respect.
- **Omitted**: Individual article pages; any embedded videos or interactive widgets.
- **Unverified**: Exact card hover effects, exact image aspect ratios.

### beauty.html
- Same as fashion.html, using `beautyArticles` dataset.

### shopping.html
- Same structure, using `shoppingItems` dataset; simulates product cards.

### summer-lookbook-2026.html
- **Replicated**: Header/nav/footer, hero, content band with carousel placeholder, sidebar.
- **Approximated**: Carousel layout approximated; exact transition timing not verified.
- **Simulated**: Keyboard‑operable carousel with lightbox simulation (click image → lightbox). Lightbox includes focus trap and Escape close.
- **Intentionally Added**: Skip link, focus indicator, reduced‑motion respect (carousel motion respects preference), focus trap for lightbox.
- **Omitted**: Exact lookbook image gallery as seen on source; any embedded video or social sharing widgets.
- **Unverified**: Exact carousel swipe/touch behavior (not required for file‑only operation), exact lightbox styling.

### money-diary.html
- **Replicated**: Header/nav/footer, hero, content band with article list, sidebar.
- **Approximated**: Article list styling approximated.
- **Simulated**: Search filters the `moneyDiaryEntries` dataset.
- **Intentionally Added**: Skip link, focus indicator, reduced‑motion respect.
- **Omitted**: Full diary entry pages; any comment systems or interactive forms.
- **Unverified**: Exact date formatting, exact typographic details.

### horoscope.html
- Same as money‑diary, using `horoscopeSigns` dataset.

### podcasts.html
- Same as money‑diary, using `podcastEpisodes` dataset.

### 404.html
- **Replicated**: Header/nav/footer, hero with illustration and message, link back to home.
- **Approximated**: Simple layout; no evidence of source 404 page, so this is a conventional placeholder.
- **Simulated**: None.
- **Intentionally Added**: Skip link, focus indicator.
- **Omitted**: Any source‑specific 404 features (e.g., search suggestions).
- **Unverified**: N/A (no source evidence).

## Component‑by‑Component Notes

### site-header
- **Replicated**: Site name and navigation container.
- **Approximated**: Height and vertical padding approximated.
- **Simulated**: None.
- **Intentionally Added**: None.
- **Omitted**: Any source‑specific logo or branding (replaced with fictional name).
- **Unverified**: Exact font weight, exact color.

### primary-nav
- **Replicated**: List of section links and search form.
- **Approximated**: Horizontal spacing approximated.
- **Simulated**: Search filtering (live region).
- **Intentionally Added**: `aria-current` on active link.
- **Omitted**: Any source‑specific dropdowns or mega‑menus.
- **Unverified**: Exact hover/focus styles.

### hero
- **Replicated**: Large placeholder image, heading, short paragraph.
- **Approximated**: Image aspect ratio and text sizing approximated.
- **Simulated**: None.
- **Intentionally Added**: None.
- **Omitted**: Source‑specific hero image, any overlay text or buttons.
- **Unverified**: Exact image source, exact heading hierarchy (we used h1 as required).

### content-band
- **Replicated**: Section wrapping heading and main content (card grid or article list).
- **Approximated**: Padding and max‑width approximated.
- **Simulated**: None.
- **Intentionally Added**: None.
- **Omitted**: Any source‑specific background patterns or dividers.
- **Unverified**: Exact spacing between bands.

### sidebar
- **Replicated**: Heading and list of links.
- **Approximated**: Vertical spacing approximated.
- **Simulated**: None.
- **Intentionally Added**: None.
- **Omitted**: Any source‑specific widgets (e.g., ads, social feeds).
- **Unverified**: Exact link styling.

### site-footer
- **Replicated**: Copyright text and newsletter form.
- **Approximated**: Padding and border‑top approximated.
- **Simulated**: Newsletter toast simulation.
- **Intentionally Added**: None.
- **Omitted**: Source‑specific social icons, legal links.
- **Unverified**: Exact font size, exact color.

### newsletter-signup
- **Replicated**: Email input and submit button.
- **Approximated**: Input width and button padding approximated.
- **Simulated**: Toast message on submit.
- **Intentionally Added**: None.
- **Omitted**: Actual subscription backend.
- **Unverified**: Source‑specific placeholder text, exact validation behavior.

### search-form
- **Replicated**: Input inside primary nav.
- **Approximated**: Width and padding approximated.
- **Simulated**: Live filtering of inline dataset, ARIA live region for results.
- **Intentionally Added**: None.
- **Omitted**: Source‑specific autocomplete or suggestions.
- **Unverified**: Exact debounce timing (we used input event).

### card-grid
- **Replicated**: Responsive grid of cards.
- **Approximated**: Gap and column count approximated via CSS grid.
- **Simulated**: None.
- **Intentionally Added**: None.
- **Omitted**: Source‑specific hover effects, shadow depth.
- **Unverified**: Exact card dimensions, exact image treatment.

### gallery-carousel (lookbook page)
- **Replicated**: Container with track, slides, prev/next buttons.
- **Approximated**: Slide width and button placement approximated.
- **Simulated**: Keyboard navigation (arrow keys), click to advance, lightbox on image click.
- **Intentionally Added**: Focus trap for lightbox, reduced‑motion respect.
- **Omitted**: Source‑specific swipe gestures, pagination dots, exact transition easing.
- **Unverified**: Exact timing function, exact slide scaling.

### article-list
- **Replicated**: Vertical list of article/entry elements.
- **Approximated**: Vertical spacing approximated.
- **Simulated**: None.
- **Intentionally Added**: None.
- **Omitted**: Source‑specific metadata badges, read‑more links.
- **Unverified**: Exact date formatting, exact typography.

### lightbox
- **Replicated**: Modal overlay with close button and enlarged image.
- **Approximated**: Background opacity and centering approximated.
- **Simulated**: Click image → lightbox; Escape closes; focus trap.
- **Intentionally Added**: Focus trap, Escape handling.
- **Omitted**: Source‑specific caption, download/share buttons.
- **Unverified**: Exact backdrop color, exact animation (we respect reduced‑motion).

### toast
- **Replicated**: Fixed‑position container for temporary message.
- **Approximated**: Position, background color, timing approximated.
- **Simulated**: Appears on newsletter submit, disappears after 3 s.
- **Intentionally Added**: None.
- **Omitted**: Source‑specific styling, action buttons (e.g., “Undo”).
- **Unverified**: Exact duration, exact easing.

## Summary of Deviations
All deviations are either approximations (due to lack of exact visual evidence), simulations (of interactions requiring a backend), intentional additions (to meet accessibility baseline), or omissions (of features not present in the evidence or outside scope). No accessibility defects were introduced intentionally.  
