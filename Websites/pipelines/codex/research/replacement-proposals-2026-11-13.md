# Proposed replacements for five blocked Codex sources

Checked 2026-11-13 UTC / 2026-11-12 America/New_York. These are reviewable replacement proposals, not approved source reassignment or build clearance. Existing inventories, approvals, research blocks and run snapshots are preserved unchanged.

## Verification boundary

Connected web search plus page-open text retrieval, 25 source-mapped pages and one company supporting page. Independent urllib GET attempts for all five candidate hosts failed DNS resolution in this session; no direct-origin HTTP success is claimed. CUA inventory returned browser access host unavailable; no rendered or executed interaction verification. Tool retrieval can use indexed/cached content; a crawl label is not a fresh origin-response timestamp.

Observed means an affordance or structure was present in retrieved text, not that an interaction was executed. Do not silently equate this method with the earlier direct-HTTP verification standard. Acceptance of this disclosed evidence and approval of changed source/scope must be recorded before promoting any proposal into the canonical inventory.

Full structured record: [evidence/replacement-proposals-2026-11-13.json](evidence/replacement-proposals-2026-11-13.json).

## Replacement table

| ID | Previous source | Proposed source | Stratum | Mapped pages | Complexity |
|---|---|---|---|---:|---|
| UNI-06 | Community College of Philadelphia | [Wake Technical Community College](https://www.waketech.edu/) | community college | 5 | high |
| GOV-04 | City of Raleigh | [City of Boston](https://www.boston.gov/) | municipal government | 5 | high |
| GOV-05 | Mass.gov | [Commonwealth of Virginia portal](https://www.virginia.gov/) | state portal/agency | 5 | medium |
| FASH-06 | Fashionista | [Who What Wear](https://www.whowhatwear.com/) | fashion blog or trend publication | 5 | high |
| WX-05 | meteoblue | [Time and Date AS — weather section](https://www.timeanddate.com/weather/) | commercial weather portal | 5 | high |

## Source-specific scope

### UNI-06 — Wake Technical Community College

Page-to-local map:

- `index.html` ← [Lead the Way | Wake Tech](https://www.waketech.edu/)
- `programs.html` ← [Programs of Study | Wake Tech](https://www.waketech.edu/catalog/programs-study)
- `admissions.html` ← [Admissions | Wake Tech](https://www.waketech.edu/admissions)
- `program-detail.html` ← [General Business Administration AAS | Wake Tech](https://www.waketech.edu/programs-courses/credit/business-administration/degrees-programs/a25120a)
- `tuition.html` ← [Tuition Information and Payment Deadlines | Wake Tech](https://www.waketech.edu/student-services/registration-student-records/payment-deadlines)

Regions: Apply/aid/info/search utility links; Career-field homepage bands; Credential tables; Program subnavigation and detail metadata; Admissions and tuition information.

Observed affordances: Program links and credential rows; Apply, request-information and virtual-tour links; Program local-menu affordance.

Limits:
- Mobile-menu activation, filtering and form submission are untested
- Application and virtual-tour destinations are external; simulate or disclose rather than embed
- Do not assume a filterable program finder from the listing table

### GOV-04 — City of Boston

Page-to-local map:

- `index.html` ← [Homepage | Boston.gov](https://www.boston.gov/)
- `departments.html` ← [Departments | Boston.gov](https://www.boston.gov/departments)
- `notices.html` ← [Public notices | Boston.gov](https://www.boston.gov/public-notices)
- `parking.html` ← [Parking Clerk | Boston.gov](https://www.boston.gov/departments/parking-clerk)
- `government.html` ← [City of Boston Government | Boston.gov](https://www.boston.gov/departments/311/city-boston-government)

Regions: Utility/menu/language controls; City-status homepage bands; Department directory; Public-notice listing; Service page section navigation.

Observed affordances: Search affordance; Public-notice text and department filters; In-page section navigation and 311 handoff.

Limits:
- Search includes an AI-summary mode; replicate only labeled local search/demo behavior, never a live AI backend
- Language switch, mobile menu, directory behavior and filters not executed
- Do not copy real operational notices, seals, public officials or contact data into fictional content

### GOV-05 — Commonwealth of Virginia portal

Page-to-local map:

- `index.html` ← [Home | Virginia.gov](https://www.virginia.gov/)
- `services.html` ← [Services & Resources | Virginia.gov](https://www.virginia.gov/services/)
- `agencies.html` ← [Agencies | Virginia.gov](https://www.virginia.gov/agencies/)
- `government.html` ← [State Government | Virginia.gov](https://www.virginia.gov/state-government/)
- `service-category.html` ← [Government | Virginia.gov](https://www.virginia.gov/services/government/)

Regions: Multi-level service-topic navigation; Service category cards; Agency directory; State-government overview; Grouped footer navigation.

Observed affordances: Site search affordance; Agency text filter and category checkboxes; Feedback open/close affordances.

Limits:
- Search/filter/feedback behavior untested
- Agency-specific transactions are external and excluded from verified local scope
- Prior GOV notes mentioned Virginia as a possible unverified substitute, not a reserved/selected source

### FASH-06 — Who What Wear

Page-to-local map:

- `index.html` ← [Celebrity Style and Fashion Trend Coverage | Who What Wear](https://www.whowhatwear.com/)
- `trends.html` ← [The Latest Fashion and Style Trends for 2026 | Who What Wear](https://www.whowhatwear.com/fashion/trends)
- `fashion.html` ← [All Things Fashion, According to the Experts | Who What Wear](https://www.whowhatwear.com/fashion)
- `guides.html` ← [Shopping Guides to the Latest Fashion Trends | Who What Wear](https://www.whowhatwear.com/buying-guides)
- `article.html` ← [20 Trends That Defined the Past 20 Years of Fashion | Who What Wear](https://www.whowhatwear.com/fashion/trends/most-iconic-fashion-trends-last-20-years)

Regions: Edition controls and search; Topic/subtopic navigation; Editorial card collections; Article image and section-jump list; Share affordances.

Observed affordances: Search button/input; Subnavigation toggles indicated by extracted controls; Article jump links and sharing affordances.

Limits:
- No proprietary photos, editorial copy, affiliate products or endorsements will be reused
- Sharing and commercial links will be labeled simulations
- More complex than the original medium-rated Fashionista proposal; complexity matching should be rechecked

### WX-05 — Time and Date AS — weather section

Page-to-local map:

- `index.html` ← [World Weather Today & Temperatures Right Now](https://www.timeanddate.com/weather/)
- `location.html` ← [Weather for New York, New York, USA](https://www.timeanddate.com/weather/usa/new-york)
- `hourly.html` ← [Hourly forecast for New York, New York, USA](https://www.timeanddate.com/weather/usa/new-york/hourly)
- `extended.html` ← [New York, New York, USA 14 day weather forecast](https://www.timeanddate.com/weather/usa/new-york/ext)
- `help.html` ← [FAQ: 14 Day Extended Weather Forecast for any City](https://www.timeanddate.com/weather/ext-help.html)

Regions: Utility navigation and search; World-city weather table; City breadcrumbs and section navigation; Conditions overview; Hourly/extended forecast tables; Help questions.

Observed affordances: City search and world-table selection controls; Hourly date selector; Forecast-page links and unit-settings affordance.

Limits:
- Forecast links are separate pages; do not describe them as proven client-side tabs
- No radar was observed in this selected scope; omit radar rather than force it
- All replica weather and alerts must be fictional labeled samples; no live data/API
- Company page was also retrieved to support the commercial-provider classification

## Approval and integration

Retain source IDs. If approved, archive original row values and replace only UNI-06, GOV-04, GOV-05, FASH-06 and WX-05 in their category inventories and assignment rows. Record the new method/date/scope and actual approval evidence; previous source approvals never transfer automatically. Append versioned research addenda and the central change log. Generate new task snapshots only after integration and policy reconciliation; do not alter old snapshots.

No website implementation was performed. The all-ten-versus-per-group approval-policy conflict and NPO-06 scope issue remain separate from this replacement proposal.

## Approval applied — 2026-11-13T00:11:23.688078+00:00

The user approved all five replacements and their disclosed verification method. Their canonical inventory and assignment rows are updated; original row values are archived in [the approval record](evidence/replacement-approval-2026-11-13.json). The proposal-stage evidence JSON remains unchanged as a historical snapshot. No website generation or protocol-policy change occurred.
