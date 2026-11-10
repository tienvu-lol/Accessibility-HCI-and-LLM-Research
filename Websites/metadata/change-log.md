# Change log

## 2026-11-10 — Claude slots 01–03 for 10 categories

- Categories: university, healthcare (hospital), company (banking & tech), e-commerce, news, government (public), fashion (content-driven), weather, nonprofit (& charity), church.
- Model: `claude-sonnet-5-5` via the `claude-bridge` provider, dispatched by pi-subagents from a `claude-opus-5-5` orchestrator session. One agent run per replica.
- **Approval-gate deviation (RULES.md §3):** the project lead (repo owner, tienvu-lol) told the agents to proceed without stopping at Phase A. References were chosen and verified by a research agent, and the lead's instruction stands in as approval. Each replica's `generation-metadata.json` records this.
- Restaurant rows were added to the register from `restaurant websites/README.md`. That batch predates this allocation protocol, and its model group was not recorded.
