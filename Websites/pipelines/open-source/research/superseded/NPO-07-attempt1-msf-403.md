# NPO-07 — open-source source research (slot 07)

- **Run:** `2026-11-16T21-45-45-988Z-research-NPO-07`
- **Scope:** partial — this file covers NPO-07 only. The rest of the category is researched separately.
- **Research model:** unsloth/Qwen3.6-35B-A3B-GGUF (vt-arc-falcon-llamacpp, apache-2.0, open weights) declared for slot 07
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 3/3 candidate homepages and 2/13 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/NPO-07-http-2026-11-16.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### NPO-07

- **source_id**: NPO-07
- **subcategory**: international humanitarian charity
- **source_name**: Doctors Without Borders / Médecins Sans Frontières
- **official_url**: https://www.doctorswithoutborders.org
- **verified_at**: 2024-05-22 (HTTP GET by the orchestrator)
- **verification_result**: UNVERIFIED (Homepage and 8 of 10 requested interior pages returned 403; only 2 pages accessible)
- **source_pages**:
  - url: https://www.doctorswithoutborders.org/get-involved/ways-to-give, title: Ways to give donations | Doctors Without Borders - USA, local_file: ways-to-give.html
  - url: https://www.doctorswithoutborders.org/get-involved/student-chapters, title: Join a Friends of MSF chapter Doctors Without Borders (MSF) Student Chapters: Join or start a club at your college or university., local_file: student-chapters.html
- **key_regions**:
  - Navigation (Global header with links to Mission, What We Do, Latest, Get Involved, Careers)
  - Content Area (Page-specific text and links)
  - Footer (Links to Privacy, Terms, Contact, Social Media inferred from other_links)
- **key_interactions**:
  - Donation Form: inferred (Page title "Ways to give" and links to "Become monthly donor" suggest a donation interface, but form markup not visible)
  - Chapter Search/Filter: observed (URLs in other_links show filter parameters like `f%5B0%5D=country%3A...` on the student chapters page)
  - Newsletter Signup: inferred (Link to "Alert Magazine" in nav)
- **complexity**: medium (Large byte counts on accessible pages indicate rich content; navigation structure is deep)
- **stack_clues**: Drupal (URLs contain `node/`, `sites/default/files`, and query parameters `f%5B0%5D` typical of Drupal Views)
- **limitations**: Homepage and 8 other interior pages returned 403 (Forbidden/Checking connection). Only the "Ways to Give" and "Student Chapters" pages were accessible. The site likely uses bot protection or IP blocking for automated requests.

```json
{"rows": [{"source_id": "NPO-07", "subcategory": "international humanitarian charity", "source_name": "Doctors Without Borders / Médecins Sans Frontières", "source_url": "https://www.doctorswithoutborders.org", "verified_at": "2024-05-22 (HTTP GET by the orchestrator)", "verification_method": "HTTP GET by the orchestrator", "verification_result": "UNVERIFIED", "evidence_reference": "", "source_pages": [{"url": "https://www.doctorswithoutborders.org/get-involved/ways-to-give", "title": "Ways to give donations | Doctors Without Borders - USA", "local_file": "ways-to-give.html"}, {"url": "https://www.doctorswithoutborders.org/get-involved/student-chapters", "title": "Join a Friends of MSF chapter Doctors Without Borders (MSF) Student Chapters: Join or start a club at your college or university.", "local_file": "student-chapters.html"}], "key_regions": ["Navigation", "Content Area", "Footer"], "key_interactions": [{"name": "Donation Form", "evidence": "inferred", "notes": "Page title and links to 'Become monthly donor' suggest donation interface, but form markup not visible."}, {"name": "Chapter Search/Filter", "evidence": "observed", "notes": "URLs in other_links show filter parameters like f%5B0%5D=country%3A... on the student chapters page."}], "complexity": "medium", "stack_clues": "Drupal", "limitations": "Homepage and 8 other interior pages returned 403. Only 'Ways to Give' and 'Student Chapters' pages were accessible. Site likely uses bot protection."}]}
```
