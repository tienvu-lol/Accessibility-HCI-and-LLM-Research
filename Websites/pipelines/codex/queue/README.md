# Codex queue

`manifest.json` contains ten research tasks and thirty single-replica build tasks. Categories exclude portfolio and restaurant; Codex IDs are 04–06 only. All tasks begin planned. Research tasks depend on no local task; each build depends on its category research task AND the separately checked complete ten-source approval/register gate.

Allowed execution states: planned, prepared, running, completed, blocked. `run_id` links the active/most recent task evidence. Only the operator/coordinator changes these fields after the corresponding action occurs; preparation deliberately leaves the queue unchanged. `completed` describes a task, not dataset acceptance.

Recommended sequence: research one category, coordinate its ten references and model assignments, record approval, prepare one Codex build, execute it, retain QC and interaction evidence, review its delivery, then explicitly proceed to another build. Other groups' queued/approved statuses do not automatically approve Codex work. Do not assume all ten categories are ready because the queue has forty entries.

Default execution concurrency is one; the preparation script refuses builds when the declared running count reaches the configured limit. This manual-handoff pipeline has no background scheduler or cross-process lock. Keep running-state bookkeeping current. Each site is an independent run; do not concatenate three builds into one model response.
