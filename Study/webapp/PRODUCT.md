# Product: Repair Study Console

**Register:** product (Operate mode). A researcher dashboard, not a marketing surface.

**Users:** the study's researchers (a handful, shared password). They run an LLM accessibility-repair study (arms A1 to A6, 60 sites, 4 prompt conditions), watch spend against a budget, read poster figures as results arrive, and send teammates to rate pages blind.

**Purpose:** launch and supervise the pipeline (import, repair, score, judge, human rating), keep spend honest, and export publication figures (SVG, 4x PNG, CSV) without leaving the tool.

**Principles**
- Scanability and honest numbers over decoration: tables and charts first, every figure has a data table and CSV.
- The tool is itself WCAG 2.2 AA: landmarks, labels, visible focus, contrast, reduced motion, no colour-only status (every state has a word or glyph).
- Keys never come back to the browser: only `{set, last4, source}`; inputs are cleared on submit.
- Say what is unverified: placeholder prices, partial coverage, the Fig 3 baseline caveat, the ceiling gate.

**Brand:** VTURCS maroon `#861F41` (header, primary action) and orange `#FF6406` (current tab, running, projections; text on orange fills is black) on a flat near-black floor (`#090A0C`, panels `#0E1014`). One colour per meaning: orange running, green done, yellow needs attention, red failed, always with a word or glyph. One family, Atkinson Hyperlegible Next (self-hosted; tabular figures), capitals only on tabs and column heads. Figures are dark cards on screen and light in SVG/PNG exports. No external assets. Source of truth: `brand-kit/`.
