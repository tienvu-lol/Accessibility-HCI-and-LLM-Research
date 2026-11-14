# QC correction — the same replica

The shared quality-control tool ran against the site you just built and reported real failures. They are included verbatim in your task, with the file and line context where the tool gave it. Your job is the smallest set of changes that resolves them.

This is generation-stage correction. It is not the study's accessibility repair condition, and the two must not be confused: do not inject defects, do not "improve" accessibility beyond fixing what failed, and do not treat this as a second chance to redesign.

Boundaries that do not move: the approved source, the page map, the category, the model attribution, the output directory, and every other group's files. You may not weaken, edit or work around the QC tool, and you may not delete a page or a control to make a check pass. If a failure can only be fixed by changing the approved scope, say so and stop.

The orchestrator has already preserved your initial output as the study's raw artifact, so you are editing a copy. Resend each file you change in full through the file protocol — there is no patch mode, and a partial file overwrites a working one with a broken one.

Read the failures carefully before changing anything. The tool reports several distinct kinds:

- **Missing required file** — the deliverable is incomplete; add it.
- **Broken link or asset** — the target does not exist at that relative path. Fix the path or create the target; do not delete the link.
- **`href="#"` placeholder** — give the control a real destination or make it a labelled demo control.
- **Root-absolute path** — starts with `/` and breaks `file://`; make it relative.
- **Remote dependency or network request** — something is loaded over the network; inline it or replace it with a local asset.
- **Missing landmark, skip link, `lang` or instrumentation** — add it to every page the tool names, not only the first.
- **`axe` violation** — the rule ID names the WCAG failure and the node is given; fix the markup rather than suppressing the rule.
- **Horizontal scroll at 375px** — something has a fixed width or overflows; make it reflow.
- **JS or console error** — a real runtime error on that page; fix the script.
- **Invalid JSON** — a documentation artifact is malformed; re-emit it valid.

A failure you cannot reproduce from the evidence is still a failure: the tool ran, you did not. Ask for the detail you need in your notes instead of guessing.

When you have resent every change, emit `=== STATUS: COMPLETE ===` with a list of what you changed and why, plus anything you could not fix and the reason. Update `fidelity-notes.md` if a correction changed how the replica relates to its reference, and leave the `validation_summary` gates in `generation-metadata.json` alone — the orchestrator sets them from the re-run, and you have still not run anything yourself. The orchestrator re-runs QC and keeps both reports.
