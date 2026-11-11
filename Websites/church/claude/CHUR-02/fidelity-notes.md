# Fidelity notes - CHUR-02 (Cathedral of Saint Aurelian, fictional)

Source: Cathedral of Saint John the Divine, https://www.stjohndivine.org/ (verification 2026-11-10 per `Websites/pipelines/claude/research/CHUR.md`). Observations below come from that research entry; I did not re-visit the source during this run, so layout details beyond it are **unverified**. No pixel-level similarity is claimed.

## Page mapping
See the table in `README.md`. Omitted: `/art-ideas` (scope) and the Shop utility link (external system).

## Replicated (from the research notes)
- Header: utility bar (Support Us, Donate, Search, Calendar, Watch) and a primary nav of dropdown groups labelled About, Visit, Spiritual Life, Education & Outreach, Music, Support.
- Home order: date, Hours & Admission and Sunday Services cards, "Live at the Cathedral" event cards (Daily Eucharist, Choral Evensong, Holy Eucharist, tours), "2026–2027 Events", "Seeking more?" with Livestreams and Recordings and Support the Cathedral.
- Footer: "Stay in Touch" newsletter with first name, last name and email, and "Share the Cathedral".
- Services page with Sundays and Weekdays schedules; calendar with per-event details; search page; watch/listen page; donate page.

## Approximated
- Dropdown contents: the source lists 6-9 items per group; here only items that map to local pages or to anchors on them are shown (for example "Space rentals" goes to `about.html#rentals`).
- Calendar filters are inferred (the source's static HTML showed no form). Details open in a dialog instead of per-event pages.
- Watch & Listen: search, filters and sort are an approximation; the source's archive search was not checked.
- Share the Cathedral: a copy-link button instead of social sharing links.

## Simulated
Timed tickets (the source's booking is external), donation (external), newsletter (the source posts to Mailchimp), tour reservation and volunteer interest. All validate locally and say "Demo only".

## Intentionally added
Ticket price calculator, tour reservation form, volunteer interest form, filters on Leadership and Volunteer, FAQ accordion, tabs on Choral Ensembles, demo-rule validations (Sunday start, tour days), and the "About this demo site" notice. Prayer-request and beliefs pages were not added because the research entry does not show them.

## Omitted / unverified
Art & Ideas, Shop, Blog, Press, Columbarium page, space-rental pages, Nightwatch, real photography, real names and copy. Exact grid proportions, typography, colours and the source's mega-menu width are unverified and not matched; colours and type are original.

## Research-relevant observations
- The source navigation is very large; the replica keeps the same disclosure pattern with fewer items, so tab-order length is smaller than the source.
- Date handling uses the browser clock for "Today" and the "next events" cards; results therefore vary by run date outside the sample window.
- Controls that depend on JavaScript (calendar, archive, search, tabs, menus) have no no-JS fallback beyond a notice.
