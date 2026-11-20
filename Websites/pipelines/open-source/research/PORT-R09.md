# PORT-R09 — open-source source research (slot 09)

- **Run:** `2026-11-17T05-24-36-125Z-research-PORT-R09`
- **Scope:** partial — this file covers PORT-R09 only. The rest of the category is researched separately.
- **Research model:** unsloth/Llama-3.3-70B-Instruct-GGUF (vt-arc-falcon-llamacpp, llama3.3-community, open weights) declared for slot 09
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 3/3 candidate homepages and 10/11 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/PORT-R09-http-2026-11-17.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### PORT-R09
Source ID: PORT-R09
Subcategory: motion / 3D designer
Source Name: Gmunk
Official URL: https://gmunk.com
Verified At: 2024-09-16
Verification Result: verified
Source Pages:
- https://gmunk.com (Home, index.html)
- https://gmunk.com/Information (Information, information.html)
- https://gmunk.com/Everything (Everything, everything.html)
- https://gmunk.com/Collect (Collect, collect.html)
- https://gmunk.com/TRON-Ares-Finding-Eve (TRON: Ares – Finding Eve, tron-ares-finding-eve.html)
- https://gmunk.com/TRON-Ares-Computer-Vision (TRON: Ares – Computer Vision, tron-ares-computer-vision.html)
- https://gmunk.com/Rivian-Borealis-x-Art-Basel (Rivian – Borealis x Art Basel, rivian-borealis-x-art-basel.html)
- https://gmunk.com/FUTURE-of-SPACE-Galapagos (FUTURE of SPACE – Galapagos, future-of-space-galapagos.html)
- https://gmunk.com/Billie-Eilish-2024-World-Tour (Billie Eilish – 2024 World Tour, billie-eilish-2024-world-tour.html)
Key Regions: header, navigation, hero, content bands, footer
Key Interactions:
- Project filtering: inferred
- Gallery or lightbox navigation: inferred
- Responsive navigation: observed
- Contact inquiry: inferred
Complexity: medium
Stack Clues: unknown
Limitations: https://gmunk.com/Work returned a 404 status

```json
{"rows": [{"source_id": "PORT-R09", "subcategory": "motion / 3D designer", "source_name": "Gmunk", "source_url": "https://gmunk.com", "verified_at": "2024-09-16", "verification_method": "HTTP GET by the orchestrator", "verification_result": "verified", "evidence_reference": "", "source_pages": [{"url": "https://gmunk.com", "title": "GMUNK", "local_file": "index.html"}, {"url": "https://gmunk.com/Information", "title": "Information — GMUNK", "local_file": "information.html"}, {"url": "https://gmunk.com/Everything", "title": "Everything — GMUNK", "local_file": "everything.html"}, {"url": "https://gmunk.com/Collect", "title": "Collect — GMUNK", "local_file": "collect.html"}, {"url": "https://gmunk.com/TRON-Ares-Finding-Eve", "title": "TRON: Ares – Finding Eve — GMUNK", "local_file": "tron-ares-finding-eve.html"}, {"url": "https://gmunk.com/TRON-Ares-Computer-Vision", "title": "TRON: Ares – Computer Vision — GMUNK", "local_file": "tron-ares-computer-vision.html"}, {"url": "https://gmunk.com/Rivian-Borealis-x-Art-Basel", "title": "Rivian – Borealis x Art Basel — GMUNK", "local_file": "rivian-borealis-x-art-basel.html"}, {"url": "https://gmunk.com/FUTURE-of-SPACE-Galapagos", "title": "FUTURE of SPACE – Galapagos — GMUNK", "local_file": "future-of-space-galapagos.html"}, {"url": "https://gmunk.com/Billie-Eilish-2024-World-Tour", "title": "Billie Eilish – 2024 World Tour — GMUNK", "local_file": "billie-eilish-2024-world-tour.html"}], "key_regions": ["header", "navigation", "hero", "content bands", "footer"], "key_interactions": [{"name": "responsive navigation", "evidence": "observed", "notes": ""}], "complexity": "medium", "stack_clues": "unknown", "limitations": "https://gmunk.com/Work returned a 404 status"}]}
```
