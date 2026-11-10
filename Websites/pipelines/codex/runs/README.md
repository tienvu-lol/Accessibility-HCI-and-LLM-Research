# Run evidence

No generation runs have been created by setup. `prepare-task.mjs --record` creates a uniquely timestamped subdirectory with exact task text, input snapshots/hashes, declared attribution and a handoff file. Status begins prepared; generation timestamps remain null until actual execution.

Retain actual QC JSON and task/provenance files. Raw logs, screenshots, videos and scratch data are ignored by default. Do not store secrets or personal user data. Run preparation and website acceptance are separate events. The pipeline does not automatically launch a model or publish anything.
