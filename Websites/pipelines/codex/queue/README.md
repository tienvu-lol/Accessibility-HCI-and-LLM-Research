# Codex queue

`manifest.json` contains twelve research tasks and thirty-six single-replica build tasks across all twelve categories; Codex IDs are 04–06 only. Tasks begin planned, except portfolio's four, which are marked `completed` because those three replicas were delivered on 2026-11-10 before this queue existed, and `research-REST`, completed 2026-11-14 with sources approved for REST-04/05/06. All of those carry no `run_id` and no run directory because the work happened outside this queue. Research tasks depend on no local task; each build depends on its category research task AND the separately checked complete ten-source approval/register gate.

Allowed execution states: planned, prepared, running, completed, blocked. `run_id` links the active/most recent task evidence. Only the operator/coordinator changes these fields after the corresponding action occurs; preparation deliberately leaves the queue unchanged. `completed` describes a task, not dataset acceptance.

Recommended sequence: research one category, coordinate its ten references and model assignments, record approval, prepare one Codex build, execute it, retain QC and interaction evidence, review its delivery, then explicitly proceed to another build. Other groups' queued/approved statuses do not automatically approve Codex work. Do not assume all twelve categories are ready because the queue has forty-eight entries.

Default execution concurrency is one; the preparation script refuses builds when the declared running count reaches the configured limit. This manual-handoff pipeline has no background scheduler or cross-process lock. Keep running-state bookkeeping current. Each site is an independent run; do not concatenate three builds into one model response.
