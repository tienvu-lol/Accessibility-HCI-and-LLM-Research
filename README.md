# Accessibility-HCI-and-LLM-Research

Researching how LLM-driven UI repair affects both web accessibility and usability, by
jointly evaluating WCAG 2.2 conformance and Nielsen's usability heuristics across
iterative generation and repair loops.

**Research question.** Does a WCAG-focused LLM repair loop improve accessibility at the
cost of Nielsen usability, and where do the two conflict?

## Contents

- `Study/` — the repair experiment: protocol, sample, criteria, prompts, baselines.
  Start at [`Study/README.md`](Study/README.md), which is the self-contained protocol.
- `Websites/` — the replica dataset: 60 static replicas of real websites, 10 categories
  × 6, balanced 2 Claude / 2 Codex / 2 open-weight by generator group.
- `archive/` — 40 replicas retired by the 2026-11-19 slot reduction. Nothing deleted.
- `Literature/` — published papers and the literature review spreadsheet.
- `Papers/` — project proposal, planning report, simulation and reading notes, UI list.
- `files.zip` — WCAG 2.2 reference archive, converted from the w3c/wcag normative
  source. `Study/criteria/wcag-2.2.json` is derived from it.

## Experiment at a glance

| | |
|---|---|
| Sites | 60 |
| Repair arms | 6 (Opus 5.5, Sonnet 5.5, Astra, Sol 6.1, DeepSeek, Qwen 3.6) |
| Conditions | 4 — naive, WCAG, Nielsen, WCAG+Nielsen |
| Repaired variants | 1,440 (+ 60 baselines) |
| Accessibility | axe-core + keyboard/focus probes + accessibility-tree metrics, all 1,500 |
| Usability | LLM judge (Gemini) ranks 4 variants on 14 questions, 360 calls |
| Human validation | 30 items, 3 raters, Cohen's and Fleiss' kappa |

See [`Study/README.md`](Study/README.md) for the full protocol, data schemas and
analysis plan.
