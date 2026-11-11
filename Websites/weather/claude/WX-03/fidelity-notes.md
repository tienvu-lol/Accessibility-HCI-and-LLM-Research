# WX-03 fidelity notes

Reference: KING 5 Weather (https://www.king5.com/weather), verified 2026-11-10 by HTTP GET only (raw HTML, no JS rendering). "Observed" below means seen in raw HTML; everything else is inferred or invented.

## Page mapping

| Local page | Reference | Status |
| --- | --- | --- |
| `index.html` | `/weather` h3 sequence: KING 5 Forecast, Western Washington Weather Forecast, Weather News, 10-Day Forecast, Hourly Forecast, Entertainment, "Before You Leave, Check This Out" | **Replicated** section order (renamed to fictional equivalents); content **simulated** |
| `alerts.html` | `/weather/alerts` | **Approximated**: reference title was generic and body not checked |
| `radar.html` | `/radar` | **Approximated** with a placeholder map; reference is a client-side map app |
| `ten-day.html`, `hourly.html` | `/10-day`, `/hourly` | **Approximated**; reference forecast values are client-rendered, so layout is inferred |
| `maps.html` | `/maps` | **Approximated** as tabs; tab pattern is an assumption |
| `traffic.html`, `webcams.html`, `closings.html` | same names | **Approximated** with invented data |
| `meet-the-team.html`, `tv-listings.html`, `closed-captioning.html`, `contact-us.html` | same names | **Approximated** with original copy |
| `legal.html` | footer links | **Approximated**: one page with anchors instead of separate pages |
| `404.html` | none | **Intentionally added** |

## Components

- **Replicated (observed):** skip link; main `<nav>` with Weather, Closings, TV Listings, Meet the Team and a "More" menu; weather sub-nav items (Forecast, Radar, 10-Day, Hourly, Maps, Traffic, Drive Times, Webcams, Closings & Delays, plus Alerts); carousel Previous/Next; footer link set (Terms, Privacy, Ad Choices, EEO, FCC file, Closed Caption Procedures, Do Not Sell).
- **Approximated (inferred):** whether the weather sub-nav is a dropdown or a bar. Both exist here: dropdown under "Weather" and a sub-bar on weather pages. Story cards use an in-place "Read summary" disclosure because article pages were not replicated.
- **Simulated:** current conditions, forecasts, alerts, radar frames, maps, webcams, traffic, closings, team, TV schedule, contact form, Do Not Sell control.
- **Intentionally added:** location search over 8 sample locations; F/C unit toggle; filters on alerts, hourly, traffic, webcams, team; sortable drive-times table; radar controls; sample-data notice banner; 404 page. The reference showed no search or unit toggle.
- **Omitted:** top-level links Advertise With Us (mapped to a Contact topic instead), Evening, New Day, Investigators, Immigration in WA, Contests, Environment NW, On The Record; sub-nav SchoolNet and Jobs; the reference's ad-blocker notice and modal/close behavior (replaced by the webcam dialog); breadcrumbs (not observed).
- **Unverified:** rendered appearance, real heading levels after JS runs, accessibility of the reference, exact carousel behavior.

## Deviations and rationale

- All proper names, places, call letters and copy are invented; no real logos or prose were used.
- Reference uses h3 for body sections; this replica uses h2 under a single h1 for a logical outline.
- Data tables get a focusable scroll region on small screens (axe `scrollable-region-focusable`) rather than a stacked layout.

## Research-relevant observations

- Dense chrome plus many sibling templates produced a repetitive structure; the shared header/footer HTML is duplicated across 15 files (no includes).
- axe flagged only two classes of issue on the first run (content outside landmarks for the sample banner; unfocusable scroll regions); both were fixed before the final run.
