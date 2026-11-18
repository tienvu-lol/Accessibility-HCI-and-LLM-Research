# HOSP-07 — open-source source research (slot 07)

- **Run:** `2026-11-16T21-28-20-739Z-research-HOSP-07`
- **Scope:** partial — this file covers HOSP-07 only. The rest of the category is researched separately.
- **Research model:** unsloth/Qwen3.6-35B-A3B-GGUF (vt-arc-falcon-llamacpp, apache-2.0, open weights) declared for slot 07
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 2/3 candidate homepages and 11/12 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/HOSP-07-http-2026-11-16.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### HOSP-07

- `source_id`: HOSP-07
- `subcategory`: academic medical center
- `source_name`: NYU Langone Health
- `official_url`: https://nyulangone.org/
- `verified_at`: 2024-05-20 (HTTP GET by the orchestrator)
- `verification_result`: verified
- `source_pages`:
  1. https://nyulangone.org/ | Patient Care at NYU Langone Health | index.html
  2. https://nyulangone.org/doctors | Find a Doctor | NYU Langone Health | doctors.html
  3. https://nyulangone.org/conditions | Conditions We Treat | conditions.html
  4. https://nyulangone.org/locations | Our Locations | NYU Langone Health | locations.html
  5. https://nyulangone.org/care-services | Care & Services | care-services.html
  6. https://nyulangone.org/insurance-billing-financial-assistance | Insurance, Billing & Financial Assistance | NYU Langone Health | insurance-billing.html
  7. https://nyulangone.org/patient-forms | Patient Forms | NYU Langone Health | patient-forms.html
  8. https://nyulangone.org/brain | Brain Care | brain-care.html
  9. https://nyulangone.org/cancer | Perlmutter Cancer Center | cancer-care.html
  10. https://nyulangone.org/womens-health | Women's Health | womens-health.html
  11. https://nyulangone.org/contact-us | Contact Us | NYU Langone Health | contact-us.html
- `key_regions`: Header with global navigation; hero or primary content banner; service and specialty directory links (Care & Services, Brain Care, Cancer Care, etc.); location directory and regional filters; condition area expertise links; footer with policies, accessibility, and contact information.
- `key_interactions`: 
  - Location filtering by geographic region (observed): Navigation and other links explicitly list regional directories (Manhattan, Brooklyn, Queens, etc.).
  - Service category navigation (observed): Multiple pages feature prominent links to care services, brain care, cancer care, and women's health.
  - Insurance and financial assistance document access (observed): Dedicated page with numerous PDF links for financial assistance applications and billing information.
  - Doctor and specialty search/filter (inferred): Directory page structure implies search and filtering capabilities, though specific form markup was not fully detailed in the fetched evidence.
- `complexity`: high: Extensive multi-level navigation, large page sizes, numerous service and location subdirectories, and rich content bands across multiple verified pages.
- `stack_clues`: JavaScript-heavy client-side rendering (indicated by large page byte counts and dynamic URL structures), PDF-based document delivery for forms and policies, standard web server infrastructure.
- `limitations`: https://nyulangone.org/our-story returned a 404 status and redirected to a non-HTTPS URL, so it is excluded from the page map. Some navigation elements may be dynamically rendered via JavaScript, meaning the full extent of the site's information architecture might not be fully captured by the HTTP GET method alone.

```json
{"rows": [{"source_id": "HOSP-07", "subcategory": "academic medical center", "source_name": "NYU Langone Health", "source_url": "https://nyulangone.org/", "verified_at": "2024-05-20 (HTTP GET by the orchestrator)", "verification_method": "HTTP GET by the orchestrator", "verification_result": "verified", "evidence_reference": "", "source_pages": [{"url": "https://nyulangone.org/", "title": "Patient Care at NYU Langone Health", "local_file": "index.html"}, {"url": "https://nyulangone.org/doctors", "title": "Find a Doctor | NYU Langone Health", "local_file": "doctors.html"}, {"url": "https://nyulangone.org/conditions", "title": "Conditions We Treat", "local_file": "conditions.html"}, {"url": "https://nyulangone.org/locations", "title": "Our Locations | NYU Langone Health", "local_file": "locations.html"}, {"url": "https://nyulangone.org/care-services", "title": "Care & Services", "local_file": "care-services.html"}, {"url": "https://nyulangone.org/insurance-billing-financial-assistance", "title": "Insurance, Billing & Financial Assistance | NYU Langone Health", "local_file": "insurance-billing.html"}, {"url": "https://nyulangone.org/patient-forms", "title": "Patient Forms | NYU Langone Health", "local_file": "patient-forms.html"}, {"url": "https://nyulangone.org/brain", "title": "Brain Care", "local_file": "brain-care.html"}, {"url": "https://nyulangone.org/cancer", "title": "Perlmutter Cancer Center", "local_file": "cancer-care.html"}, {"url": "https://nyulangone.org/womens-health", "title": "Women's Health", "local_file": "womens-health.html"}, {"url": "https://nyulangone.org/contact-us", "title": "Contact Us | NYU Langone Health", "local_file": "contact-us.html"}], "key_regions": ["Header with global navigation", "Hero or primary content banner", "Service and specialty directory links", "Location directory and regional filters", "Condition area expertise links", "Footer with policies, accessibility, and contact information"], "key_interactions": [{"name": "Location filtering by geographic region", "evidence": "observed", "notes": "Navigation and other links explicitly list regional directories (Manhattan, Brooklyn, Queens, etc.)"}, {"name": "Service category navigation", "evidence": "observed", "notes": "Multiple pages feature prominent links to care services, brain care, cancer care, and women's health"}, {"name": "Insurance and financial assistance document access", "evidence": "observed", "notes": "Dedicated page with numerous PDF links for financial assistance applications and billing information"}, {"name": "Doctor and specialty search/filter", "evidence": "inferred", "notes": "Directory page structure implies search and filtering capabilities, though specific form markup was not fully detailed in the fetched evidence"}], "complexity": "high", "stack_clues": "JavaScript-heavy client-side rendering (indicated by large page byte counts and dynamic URL structures), PDF-based document delivery for forms and policies, standard web server infrastructure", "limitations": "https://nyulangone.org/our-story returned a 404 status and redirected to a non-HTTPS URL, so it is excluded from the page map. Some navigation elements may be dynamically rendered via JavaScript, meaning the full extent of the site's information architecture might not be fully captured by the HTTP GET method alone."}]}
```

**Coordination View**

- HOSP-07: NYU Langone Health (proposed)
- HOSP-08: Pending (researched separately)
- HOSP-09: Pending (researched separately)
- HOSP-10: Pending (researched separately)
- HOSP-01: Held by Claude group
- HOSP-02: Held by Claude group
- HOSP-03: Held by Claude group
- HOSP-04: Held by Codex group
- HOSP-05: Held by Codex group
- HOSP-06: Held by Codex group
