# CHUR-09 — open-source source research (slot 09)

- **Run:** `2026-11-17T05-20-21-701Z-research-CHUR-09`
- **Scope:** partial — this file covers CHUR-09 only. The rest of the category is researched separately.
- **Research model:** unsloth/Llama-3.3-70B-Instruct-GGUF (vt-arc-falcon-llamacpp, llama3.3-community, open weights) declared for slot 09
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 3/3 candidate homepages and 13/13 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/CHUR-09-http-2026-11-17.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### CHUR-09
- **source_id**: CHUR-09
- **subcategory**: small community congregation
- **source_name**: The Village Church
- **official_url**: https://www.thevillagechurch.net
- **verified_at**: 2024-09-16
- **verification_result**: verified
- **source_pages**:
  - https://www.thevillagechurch.net/ (index.html, The Village Church)
  - https://www.thevillagechurch.net/about (about.html, About | The Village Church)
  - https://www.thevillagechurch.net/our-beliefs (beliefs.html, Our Beliefs | The Village Church)
  - https://www.thevillagechurch.net/staff-and-elders (staff.html, Staff & Elders | The Village Church)
  - https://www.thevillagechurch.net/ministries (ministries.html, Ministries | The Village Church)
  - https://www.thevillagechurch.net/events/featured (events.html, Events | The Village Church)
  - https://www.thevillagechurch.net/giving (giving.html, Giving | The Village Church)
  - https://www.thevillagechurch.net/contact-us (contact.html, Contact Us | The Village Church)
  - https://www.thevillagechurch.net/resources (resources.html, Resources | The Village Church)
  - https://www.thevillagechurch.net/ministries/kids (kids.html, Kids | The Village Church | The Village Church)
  - https://www.thevillagechurch.net/ministries/students (students.html, Students | The Village Church | The Village Church)
  - https://www.thevillagechurch.net/young-adults (young-adults.html, Young Adults | The Village Church | The Village Church)
- **key_regions**: header, navigation, hero, content, sidebar, footer
- **key_interactions**:
  - name: sermon search, evidence: inferred
  - name: groups finder, evidence: inferred
  - name: events, evidence: observed
  - name: prayer/inquiry validation, evidence: inferred
  - name: giving simulation, evidence: inferred
- **complexity**: medium
- **stack_clues**: unknown
- **limitations**: No limitations found for the fetched pages.

```json
{"rows": [
  {
    "source_id": "CHUR-09",
    "subcategory": "small community congregation",
    "source_name": "The Village Church",
    "source_url": "https://www.thevillagechurch.net",
    "verified_at": "2024-09-16",
    "verification_method": "HTTP GET",
    "verification_result": "verified",
    "evidence_reference": "",
    "source_pages": [
      {"url": "https://www.thevillagechurch.net/", "title": "The Village Church", "local_file": "index.html"},
      {"url": "https://www.thevillagechurch.net/about", "title": "About | The Village Church", "local_file": "about.html"},
      {"url": "https://www.thevillagechurch.net/our-beliefs", "title": "Our Beliefs | The Village Church", "local_file": "beliefs.html"},
      {"url": "https://www.thevillagechurch.net/staff-and-elders", "title": "Staff & Elders | The Village Church", "local_file": "staff.html"},
      {"url": "https://www.thevillagechurch.net/ministries", "title": "Ministries | The Village Church", "local_file": "ministries.html"},
      {"url": "https://www.thevillagechurch.net/events/featured", "title": "Events | The Village Church", "local_file": "events.html"},
      {"url": "https://www.thevillagechurch.net/giving", "title": "Giving | The Village Church", "local_file": "giving.html"},
      {"url": "https://www.thevillagechurch.net/contact-us", "title": "Contact Us | The Village Church", "local_file": "contact.html"},
      {"url": "https://www.thevillagechurch.net/resources", "title": "Resources | The Village Church", "local_file": "resources.html"},
      {"url": "https://www.thevillagechurch.net/ministries/kids", "title": "Kids | The Village Church | The Village Church", "local_file": "kids.html"},
      {"url": "https://www.thevillagechurch.net/ministries/students", "title": "Students | The Village Church | The Village Church", "local_file": "students.html"},
      {"url": "https://www.thevillagechurch.net/young-adults", "title": "Young Adults | The Village Church | The Village Church", "local_file": "young-adults.html"}
    ],
    "key_regions": ["header", "navigation", "hero", "content", "sidebar", "footer"],
    "key_interactions": [
      {"name": "sermon search", "evidence": "inferred"},
      {"name": "groups finder", "evidence": "inferred"},
      {"name": "events", "evidence": "observed"},
      {"name": "prayer/inquiry validation", "evidence": "inferred"},
      {"name": "giving simulation", "evidence": "inferred"}
    ],
    "complexity": "medium",
    "stack_clues": "unknown",
    "limitations": "No limitations found for the fetched pages."
  }
]}
```
