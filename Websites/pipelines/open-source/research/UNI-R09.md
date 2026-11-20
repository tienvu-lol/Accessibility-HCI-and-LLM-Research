# UNI-R09 — open-source source research (slot 09)

- **Run:** `2026-11-17T05-31-35-467Z-research-UNI-R09`
- **Scope:** partial — this file covers UNI-R09 only. The rest of the category is researched separately.
- **Research model:** unsloth/Llama-3.3-70B-Instruct-GGUF (vt-arc-falcon-llamacpp, llama3.3-community, open weights) declared for slot 09
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 3/3 candidate homepages and 11/11 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/UNI-R09-http-2026-11-17.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### UNI-R09
- source_id: UNI-R09
- subcategory: community college
- source_name: Houston Community College
- official_url: https://www.hccs.edu
- verified_at: 2024-09-16
- verification_result: verified
- source_pages:
  - https://www.hccs.edu (Home | Houston City College, index.html)
  - https://www.hccs.edu/programs--courses/ (Programs & Courses | Houston City College, programs.html)
  - https://www.hccs.edu/programs--courses/explore-all-programs/ (Explore All Programs | Houston City College, explore-programs.html)
  - https://www.hccs.edu/admissions/ (Admissions | Houston City College, admissions.html)
  - https://www.hccs.edu/admissions/apply--enroll/ (Apply & Enroll | Houston City College, apply-enroll.html)
  - https://www.hccs.edu/paying-for-college/ (Paying for College | Houston City College, paying-for-college.html)
  - https://www.hccs.edu/paying-for-college/tuition--cost/ (Tuition & Cost | Houston City College, tuition-cost.html)
  - https://www.hccs.edu/student-life--services/ (Student Life & Services | Houston City College, student-life.html)
  - https://www.hccs.edu/student-life--services/academic-support--tutoring/ (Academic Support & Tutoring | Houston City College, academic-support.html)
  - https://www.hccs.edu/about-us/contact-us/virtual-lobby/ (Virtual Lobby | Houston City College, virtual-lobby.html)
- key_regions: ["header", "navigation", "hero", "content bands", "sidebar", "footer"]
- key_interactions:
  - {"name": "program search", "evidence": "inferred", "notes": "No search form found in fetched markup"}
  - {"name": "responsive navigation", "evidence": "observed", "notes": "Navigation links are present in the fetched markup"}
  - {"name": "visit/information inquiry", "evidence": "inferred", "notes": "No contact form found in fetched markup"}
  - {"name": "events filtering", "evidence": "inferred", "notes": "No events filtering functionality found in fetched markup"}
- complexity: medium
- stack_clues: unknown
- limitations:
  - No search form found in fetched markup
  - No contact form found in fetched markup
  - No events filtering functionality found in fetched markup

```json
{"rows": [{"source_id": "UNI-R09", "subcategory": "community college", "source_name": "Houston Community College", "source_url": "https://www.hccs.edu", "verified_at": "2024-09-16", "verification_method": "HTTP GET", "verification_result": "verified", "evidence_reference": "", "source_pages": [{"url": "https://www.hccs.edu", "title": "Home | Houston City College", "local_file": "index.html"}, {"url": "https://www.hccs.edu/programs--courses/", "title": "Programs & Courses | Houston City College", "local_file": "programs.html"}, {"url": "https://www.hccs.edu/programs--courses/explore-all-programs/", "title": "Explore All Programs | Houston City College", "local_file": "explore-programs.html"}, {"url": "https://www.hccs.edu/admissions/", "title": "Admissions | Houston City College", "local_file": "admissions.html"}, {"url": "https://www.hccs.edu/admissions/apply--enroll/", "title": "Apply & Enroll | Houston City College", "local_file": "apply-enroll.html"}, {"url": "https://www.hccs.edu/paying-for-college/", "title": "Paying for College | Houston City College", "local_file": "paying-for-college.html"}, {"url": "https://www.hccs.edu/paying-for-college/tuition--cost/", "title": "Tuition & Cost | Houston City College", "local_file": "tuition-cost.html"}, {"url": "https://www.hccs.edu/student-life--services/", "title": "Student Life & Services | Houston City College", "local_file": "student-life.html"}, {"url": "https://www.hccs.edu/student-life--services/academic-support--tutoring/", "title": "Academic Support & Tutoring | Houston City College", "local_file": "academic-support.html"}, {"url": "https://www.hccs.edu/about-us/contact-us/virtual-lobby/", "title": "Virtual Lobby | Houston City College", "local_file": "virtual-lobby.html"}], "key_regions": ["header", "navigation", "hero", "content bands", "sidebar", "footer"], "key_interactions": [{"name": "program search", "evidence": "inferred", "notes": "No search form found in fetched markup"}, {"name": "responsive navigation", "evidence": "observed", "notes": "Navigation links are present in the fetched markup"}, {"name": "visit/information inquiry", "evidence": "inferred", "notes": "No contact form found in fetched markup"}, {"name": "events filtering", "evidence": "inferred", "notes": "No events filtering functionality found in fetched markup"}], "complexity": "medium", "stack_clues": "unknown", "limitations": "No search form found in fetched markup, No contact form found in fetched markup, No events filtering functionality found in fetched markup"}]}
```
