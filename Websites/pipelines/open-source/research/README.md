# Open-source research notes

One file per category prefix, written by `scripts/run-research.mjs`: `UNI.md`, `HOSP.md`, `CORP.md`, `ECOM.md`, `NEWS.md`, `GOV.md`, `FASH.md`, `WX.md`, `NPO.md`, `CHUR.md`. Each covers this group's four slots only.

- `<PREFIX>.md` — the model's Phase A blocks, with a header recording which model proposed the sources, how many pages actually returned 2xx, and where the evidence lives.
- `evidence/<PREFIX>-http-<date>.json` — the raw HTTP records: URL, status, redirect, title, byte count, extracted navigation links, robots.txt decision and timestamp for every request. The orchestrator made these requests, not the model.
- `proposals/<PREFIX>-rows.json` — proposed inventory rows plus the orchestrator's own checks on them: how many mapped pages had a successful fetch, whether the map includes `index.html`, whether the source URL itself answered.

Everything here is a proposal. A file in this directory approves nothing, and the Claude group's Phase A waiver does not extend to this group. `sync-register.mjs rows` copies these rows into the shared inventory with the approval cells still empty; `sync-register.mjs approve` fills them only from an approval the operator states explicitly.

Verification here means one thing: an HTTP GET returned a status and a title on a recorded date. No page was rendered in a browser, no script ran, and no interaction was exercised. Research notes and inventory rows must say so, and a replica's documentation must not describe its reference as visually inspected.
