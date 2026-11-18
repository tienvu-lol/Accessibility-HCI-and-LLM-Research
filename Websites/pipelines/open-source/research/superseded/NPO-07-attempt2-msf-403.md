# NPO-07 — open-source source research (slot 07)

- **Run:** `2026-11-16T21-51-19-979Z-research-NPO-07`
- **Scope:** partial — this file covers NPO-07 only. The rest of the category is researched separately.
- **Research model:** unsloth/Qwen3.6-35B-A3B-GGUF (vt-arc-falcon-llamacpp, apache-2.0, open weights) declared for slot 07
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 3/3 candidate homepages and 2/12 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/NPO-07-http-2026-11-16.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### NPO-07
- `source_id`: NPO-07
- `subcategory`: international humanitarian charity
- `source_name`: Doctors Without Borders USA
- `official_url`: https://www.doctorswithoutborders.org/
- `verified_at`: 2024-05-20, HTTP GET by the orchestrator
- `verification_result`: UNVERIFIED
- `source_pages`: 
  - `https://www.doctorswithoutborders.org/` → `index.html` (Title: Home | Doctors Without Borders - USA)
  - `https://www.doctorswithoutborders.org/get-involved/ways-to-give` → `ways-to-give.html` (Title: Ways to give donations | Doctors Without Borders - USA)
  - `https://www.doctorswithoutborders.org/get-involved/fundraise-for-us` → `fundraise-for-us.html` (Title: Fundraise for us | Doctors Without Borders - USA)
- `key_regions`: Header navigation (visible in accessible pages), Donation options list, Fundraising tools list, Footer links
- `key_interactions`: 
  - Donation amount and frequency selection (inferred)
  - Volunteer application form (inferred)
  - Program/chapter search (inferred)
- `complexity`: medium (Static navigation structure visible in accessible pages; core content pages blocked from inspection)
- `stack_clues`: unknown
- `limitations`: Homepage and 9 of 11 requested interior pages returned HTTP 403 (likely WAF/Cloudflare blocking the research user-agent). Only two donation/fundraising pages were accessible. Core information architecture (mission, programs, news, careers) could not be mapped from fetched markup.

```json
{"rows": [{"source_id": "NPO-07", "subcategory": "international humanitarian charity", "source_name": "Doctors Without Borders USA", "source_url": "https://www.doctorswithoutborders.org/", "verified_at": "2024-05-20, HTTP GET by the orchestrator", "verification_method": "HTTP GET by the orchestrator", "verification_result": "UNVERIFIED", "evidence_reference": "", "source_pages": [{"url": "https://www.doctorswithoutborders.org/", "title": "Home | Doctors Without Borders - USA", "local_file": "index.html"}, {"url": "https://www.doctorswithoutborders.org/get-involved/ways-to-give", "title": "Ways to give donations | Doctors Without Borders - USA", "local_file": "ways-to-give.html"}, {"url": "https://www.doctorswithoutborders.org/get-involved/fundraise-for-us", "title": "Fundraise for us | Doctors Without Borders - USA", "local_file": "fundraise-for-us.html"}], "key_regions": ["Header navigation (visible in accessible pages)", "Donation options list", "Fundraising tools list", "Footer links"], "key_interactions": [{"name": "Donation amount and frequency selection", "evidence": "inferred", "notes": "Expected on donation pages but markup not fully inspected for form elements due to limited access."}, {"name": "Volunteer application form", "evidence": "inferred", "notes": "Likely present on get-involved pages, but those returned 403."}], "complexity": "medium", "stack_clues": "unknown", "limitations": "Homepage and 9 of 11 requested interior pages returned HTTP 403 (likely WAF/Cloudflare blocking the research user-agent). Only two donation/fundraising pages were accessible. Core information architecture (mission, programs, news, careers) could not be mapped from fetched markup."}]}
```
