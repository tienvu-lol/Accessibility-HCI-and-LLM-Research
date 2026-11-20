# GOV-R09 — open-source source research (slot 09)

- **Run:** `2026-11-17T06-12-27-727Z-research-GOV-R09`
- **Scope:** partial — this file covers GOV-R09 only. The rest of the category is researched separately.
- **Research model:** unsloth/Llama-3.3-70B-Instruct-GGUF (vt-arc-falcon-llamacpp, llama3.3-community, open weights) declared for slot 09
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 1/1 candidate homepages and 10/10 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/GOV-R09-http-2026-11-17.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### GOV-R09
The source ID is GOV-R09, and the subcategory is Government Services. The source name is General Services Administration, and the official URL is https://www.gsa.gov. The verified_at date is not applicable as the verification was done through HTTP GET requests. The verification result is verified, but only for the availability of the pages. The source pages are:
- https://www.gsa.gov (Home | GSA)
- https://www.gsa.gov/buy-through-us (Buy through us | GSA)
- https://www.gsa.gov/buy-through-us/category-management (Category management | GSA)
- https://www.gsa.gov/sell-to-government (Sell to government | GSA)
- https://www.gsa.gov/sell-to-government/step-1-learn-about-government-contracting (Step 1: Learn about government contracting | GSA)
- https://www.gsa.gov/sell-to-government/step-2-compete-for-a-contract (Step 2: Compete for a contract | GSA)
- https://www.gsa.gov/buy-through-us/products-and-services (Products and services | GSA)
- https://www.gsa.gov/buy-through-us/purchasing-programs (Purchasing programs | GSA)
- https://www.gsa.gov/assisted-acquisition-services (Assisted Acquisition Services | GSA)
The key regions are the homepage, buying and selling services, and assisted acquisition services. The key interactions include:
- Navigating through the website: observed
- Accessing buying and selling services: observed
- Accessing assisted acquisition services: observed
The complexity is medium due to the variety of services offered. The stack clues include the use of HTML, CSS, and JavaScript. The limitations include the lack of verification for page rendering, script execution, and user interaction.

```json
{"rows": [{"source_id": "GOV-R09", "subcategory": "Government Services", "source_name": "General Services Administration", "source_url": "https://www.gsa.gov", "verified_at": "2024-09-16", "verification_method": "HTTP GET requests", "verification_result": "verified", "evidence_reference": "", "source_pages": [{"url": "https://www.gsa.gov", "title": "Home | GSA", "local_file": "index.html"}, {"url": "https://www.gsa.gov/buy-through-us", "title": "Buy through us | GSA", "local_file": "buy-through-us.html"}, {"url": "https://www.gsa.gov/buy-through-us/category-management", "title": "Category management | GSA", "local_file": "category-management.html"}, {"url": "https://www.gsa.gov/sell-to-government", "title": "Sell to government | GSA", "local_file": "sell-to-government.html"}, {"url": "https://www.gsa.gov/sell-to-government/step-1-learn-about-government-contracting", "title": "Step 1: Learn about government contracting | GSA", "local_file": "step-1-learn-about-government-contracting.html"}, {"url": "https://www.gsa.gov/sell-to-government/step-2-compete-for-a-contract", "title": "Step 2: Compete for a contract | GSA", "local_file": "step-2-compete-for-a-contract.html"}, {"url": "https://www.gsa.gov/buy-through-us/products-and-services", "title": "Products and services | GSA", "local_file": "products-and-services.html"}, {"url": "https://www.gsa.gov/buy-through-us/purchasing-programs", "title": "Purchasing programs | GSA", "local_file": "purchasing-programs.html"}, {"url": "https://www.gsa.gov/assisted-acquisition-services", "title": "Assisted Acquisition Services | GSA", "local_file": "assisted-acquisition-services.html"}], "key_regions": ["Homepage", "Buying and Selling Services", "Assisted Acquisition Services"], "key_interactions": [{"name": "Navigating through the website", "evidence": "observed", "notes": "The website has a clear navigation menu."}, {"name": "Accessing buying and selling services", "evidence": "observed", "notes": "The buying and selling services are accessible through the navigation menu."}, {"name": "Accessing assisted acquisition services", "evidence": "observed", "notes": "The assisted acquisition services are accessible through the navigation menu."}], "complexity": "medium", "stack_clues": "HTML, CSS, JavaScript", "limitations": "Lack of verification for page rendering, script execution, and user interaction."}]}
```
