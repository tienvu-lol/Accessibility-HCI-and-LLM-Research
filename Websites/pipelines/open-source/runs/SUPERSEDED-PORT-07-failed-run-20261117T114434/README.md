# PORT-07 — partial output from a failed build, superseded

These 21 files were written by a build run that failed with "Network error: fetch failed" when the
VT ARC LLM session serving slot 07 ended mid-run on 2026-11-17. That run's status is "failed" and it
produced no QC report, so the output was never a valid delivery: it is a partial artifact of an
interrupted generation, not the model's completed first emission.

Preserved rather than deleted because the pipeline treats regeneration as a recorded decision.
PORT-07 was rebuilt afterwards on a fresh session of the same declared model and quant
(unsloth/Qwen3.6-35B-A3B-GGUF, Q4_K_M, node fal043:33733), with max_repair_rounds = 0, so the
rebuilt replica is the model's uncorrected first emission.
