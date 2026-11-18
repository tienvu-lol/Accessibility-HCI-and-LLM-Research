# NPO-07, attempt 1 — superseded 2026-11-16

Source chosen: https://www.doctorswithoutborders.org

Outcome: unusable. The homepage answered 200 during candidate screening, then returned 403 for
11 of 13 interior page fetches (bot defense engaging mid-run). The resulting page map had 2 pages,
no index.html, below the configured minimum of 6.

The model's reporting was accurate: it mapped only the two pages the evidence confirmed and did not
claim the blocked ones. The failure is the reference site's, not the model's.

Re-run with the same command; oxfam.org and savethechildren.org both answered 200 as candidates.
