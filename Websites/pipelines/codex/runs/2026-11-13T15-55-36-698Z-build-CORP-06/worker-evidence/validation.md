# CORP-06 validation

Mandatory shared qc.js was executed once with the absolute site path and --json report target. Exit 2: Chromium launch crashed before page/axe execution. No qc-report.json emitted; qc.log and qc-execution.json preserve actual outcome. No browser reinstall or bypass attempted. An initial unsupported --help invocation returned ENOENT for a directory named --help, before any site audit; it was followed by reading the QC source for supported usage.

Source checks: Python HTMLParser audit passed eight pages with no missing local paths/fragments, regional instrumentation, explicit button types, image alt presence, H1/main counts or JSON errors. Node syntax check passed. Seven actual JS assertions passed covering help matching, product exclusion, whitespace/case handling, empty matches and all three project renderers. These source/logic checks are not browser interaction or accessibility validation.

Not tested: page rendering, browser menu open/close and Escape focus return, mobile navigation, project-view DOM interactions, help-search DOM/live announcements, native disclosures, screen-reader, zoom/reflow, contrast measurements, axe and visual fidelity. All require later browser/human review.

Initial generated artifact preserved before scope correction in initial-artifact.tar.gz. Correction removed careers filters after coordinator clarification. Current artifact is the corrected baseline; no post-QC implementation repairs.
