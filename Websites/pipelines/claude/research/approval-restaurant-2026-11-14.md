# Phase A approval — restaurant, Claude slots 01–03

**Approved at:** 2026-11-14
**Approved by:** Samhith Varma (project lead)
**Scope of this approval:** restaurant slots REST-01, REST-02, REST-03 only — the Claude group's
three slots in the restaurant category. It confers nothing on any other slot, group or category.
**Evidence this approval rests on:** `pipelines/claude/research/REST.md` and
`pipelines/claude/research/evidence/REST-http-2026-11-14.json` (38 request records over 34 unique
URLs, three passes, HTTP GET only, no browser rendering).

## Approved references

| Slot | Stratum | Approved source | Verified |
|---|---|---|---|
| REST-01 | small local independent | https://www.viacarota.com/ | 2026-11-14, HTTP 200, 10 pages |
| REST-02 | BBQ / smokehouse | https://franklinbbq.com/ | 2026-11-14, HTTP 200, 9 pages |
| REST-03 | fine dining | https://www.elevenmadisonpark.com/ | 2026-11-14, HTTP 200, 12 pages |

## This is an approval, not a waiver

The 2026-11-13 record (`approval-2026-11-13.md`) waived the `Rules.md` section 3 Phase A stop for the
ten original categories. **That waiver does not extend to restaurant.** These three sources were
researched, HTTP-verified and then explicitly approved. Replicas built under this approval must
record `source_approved_at` as **2026-11-14** and must **not** state that the Phase A stop was
waived.

## Conditions and disclosures carried into the builds

1. **REST-03's structure is inferred, and that was known at approval time.**
   `https://www.elevenmadisonpark.com/` returned **zero `h1`, `h2` and `h3` elements** in raw HTML on
   two separate passes; its content is rendered client-side. Its section hierarchy, section order and
   copy hierarchy are therefore **not established by research**. The project lead approved it anyway,
   with the structure to be labeled as inferred under `Rules.md` section 5. REST-03's
   `fidelity-notes.md` must state plainly that its information architecture was inferred from link
   and control structure, not observed, and its recorded complexity stays `unknown`.
2. **No platform diversity in this third.** All three sources are Squarespace sites. Accepted.
3. **No on-site booking form in this third.** All three delegate reservations and ordering to third
   parties (Resy for REST-01 and REST-03; preorder/Toast/Goldbelly for REST-02). Every booking and
   ordering flow in these replicas is a labeled simulation. Accepted.
4. **Source defects are to be recorded, not reproduced.** Franklin's nav links "Private Events" to a
   404 (`/private-events`; the live page is `/private-events01`) and two of its pages share one
   `<title>`. Via Carota's "Careers" link points to `/covid-19-safety-measures`, and `/search`
   returned no HTTP status at all. Eleven Madison Park serves `/about` and `/ourrestaurant` as one
   byte-identical page. Each belongs in the relevant replica's `fidelity-notes.md`.
5. **Via Carota's dual menu is a feature, not an accident.** Its homepage menu is an image, with a
   plain-text menu at `/text`. That text alternative should be replicated as a pattern.

## Research provenance

This category's Phase A was performed by the **orchestrator session (`claude-opus-5`)**, not by a
`claude-sonnet-5-5` worker agent through pi-subagents, which was unavailable. Rounds 01–10 were
researched by workers. The difference is recorded here, in `REST.md`, in
`queue/round-11-restaurant-build.md` and in `metadata/change-log.md`.

## What this approval does not do

It does not approve any restaurant source for Codex (slots 04–06 carry their own approval of
2026-11-14) or for the open-source group (slots 07–10 remain unresearched). It does not mark any
replica accepted — acceptance requires a QC run that actually executed, plus review.
