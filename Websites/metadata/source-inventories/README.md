# Shared source inventories

One CSV per active category, with ten stable slots and a 3 Claude / 3 Codex / 4 open-source allocation. Portfolio and restaurant are outside this 100-site study. The initial files are blank allocation templates, NOT verified sources or approval records. Existing research must be entered with its original evidence; no observations are inferred from an empty cell.

All model groups coordinate here to avoid duplicate references. Each group edits its own proposals; the project coordinator reconciles the complete category and records actual approval. Do not overwrite another group's approved source/model/scope. Other-group strata shown in the Codex configuration are proposals until reconciled centrally.

| CSV field | Meaning |
| --- | --- |
| category, slot, source_id, model_group | Fixed allocation identifiers matching assignments.csv |
| model_id, model_version | Actual intended generator/release; unknown version may be blank; resolve model before build |
| subcategory | Agreed sampling stratum |
| source_name, source_url | Actual reference organization and canonical official homepage |
| verified_at | Actual ISO date/timestamp of verification |
| verification_method | Exact tools/method used; distinguish search, HTTP, browser observation |
| verification_result | `verified` for supported availability; otherwise `UNVERIFIED` or another honest failure state |
| evidence_reference | Existing path relative to Websites, or durable HTTP(S) evidence URL; retain underlying observations |
| source_pages | JSON array of objects with `url`, `title`, `local_file`; include index.html; unique lowercase kebab-case .html filenames |
| key_regions | Nonempty JSON array describing observed structural regions |
| key_interactions | JSON array of objects with `name`, `evidence` (`observed` or `inferred`), and supporting `notes` |
| complexity | `low`, `medium` or `high`; keep rationale in evidence notes |
| stack_clues | Observable clues or explicit `unknown` |
| limitations | Explicit limitations or `none observed`; do not imply tests not performed |
| approved_at, approved_by, approval_reference | Actual project-lead approval date/person/evidence for source, scope and model assignment |

The JSON-array cells require standard CSV quoting. For example, a source_pages cell on disk may be:

```csv
"[{""url"":""https://example.org/"",""title"":""Example homepage"",""local_file"":""index.html""}]"
```

This is a format example, not a verified reference. A 404 page is a required local addition and does not require an invented reference URL. Other source-specific pages should map to inspected source content. Stable IDs and ten rows exist even when source selection is pending.

Keep source_url, model_id, model_version and approved_at synchronized with metadata/assignments.csv before building. Codex's readiness check requires all ten category sources verified/approved with known model assignments, rejects duplicate URLs, and checks selected-model consistency. It validates recorded fields; it cannot authenticate a person's approval or independently prove the observations. Never fill approval cells merely to satisfy a validator.

Do not copy Claude's waiver to other groups. Legacy research availability claims remain claims from those recorded tools until independently checked; importing them does not retroactively establish browser interaction tests.
