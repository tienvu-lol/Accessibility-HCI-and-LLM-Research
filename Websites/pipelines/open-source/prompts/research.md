# Phase A — source research for the open-source slots

This task is research only. No website code, no site folders, no file blocks of site content. It runs in three exchanges, and the orchestrator tells you which one you are in.

## What the slots are

You are choosing references for the four open-source slots of one category: slots 07, 08, 09 and 10. Slots 01–06 belong to the Claude and Codex groups and are listed in your task for one reason only — so that you do not pick a site another group has already reserved. You never propose, change or comment on their assignments.

Each slot has a sampling stratum. Slot 10 is normally a second, distinct site from slot 07's stratum, kept as a complexity-matched reserve. Pick one real site per slot, four distinct organizations, none of them duplicating a URL already held anywhere in the category's inventory.

## Exchange 1 — candidates

Propose three candidate sites per slot, best first, from your own knowledge. For each: organization name, canonical homepage URL, the stratum it satisfies, why it fits, and your expectation of its structural richness. Prefer well-known, English-language, server-rendered, multi-page sites with real information architecture — a program finder, a service directory, a product listing, a section front. Avoid single-page marketing sites, sites that are mostly a login wall, sites behind consent interstitials, and anything that is likely to block an automated HTTP request.

You cannot check whether any of these are live. Do not say that you have. The orchestrator fetches your candidates and comes back with the results.

## Exchange 2 — page maps from real evidence

You receive the actual HTTP evidence: status codes, titles, redirect chains, byte counts, and extracted navigation links for the candidates that answered. Choose the one site per slot that the evidence best supports, and map its pages.

For each chosen source, produce a block headed `### <SOURCE_ID>` with exactly these fields:

- `source_id`, `subcategory` — the slot's stratum
- `source_name`, `official_url` — canonical homepage as actually fetched
- `verified_at` — the ISO date and the method exactly as the evidence states it, which is HTTP GET by the orchestrator, not browser rendering
- `verification_result` — `verified` only where the evidence shows a successful fetch; otherwise `UNVERIFIED` with the reason
- `source_pages` — 6 to 16 entries, each with the real URL from the evidence, its title, and a local filename. Filenames are lowercase kebab-case `.html`, unique, and must include `index.html`. Map only URLs the evidence confirms; a page you want but cannot confirm goes in `limitations`, not in the map.
- `key_regions` — the regions the fetched markup actually shows: header, navigation and its structure, hero, each content band in order, sidebar if present, footer groups
- `key_interactions` — each with a name and `observed` or `inferred`. Observed means the fetched HTML contains it. Anything you expect from the kind of site but cannot see in the markup is inferred, and labelling it honestly is the point of the field.
- `complexity` — low, medium or high, with a one-line rationale tied to the evidence
- `stack_clues` — only what the markup or headers show; otherwise `unknown`
- `limitations` — pages that failed, were blocked or were ambiguous; anything you are substituting and why

If a slot has no workable candidate, say so plainly and propose a replacement in the same stratum for the next round rather than lowering the bar.

## Exchange 3 — inventory rows

The orchestrator asks for the four rows in the shared inventory format. Emit one JSON object per slot with the field names of `metadata/source-inventories/<category>.csv`, using the JSON-array shapes that README defines for `source_pages`, `key_regions` and `key_interactions`.

Leave `approved_at`, `approved_by` and `approval_reference` empty. Approval is a decision the project lead records; the Claude group's waiver does not extend to this group, and filling an approval cell to satisfy a validator would falsify the dataset's provenance. Leave `model_id` and `model_version` to the orchestrator, which knows which model is answering.

Finish with a short coordination view: the four open-source slots as proposed, and the other six listed as held by their groups, pending.
