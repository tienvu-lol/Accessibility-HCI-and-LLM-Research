// The Lakeport Ledger (fictional) - vanilla JS, no dependencies. Data below is invented sample data.
'use strict';
const DATA = {
 "sections": {
  "news": {
   "label": "News",
   "file": "news.html"
  },
  "business": {
   "label": "Business",
   "file": "business.html"
  },
  "sports": {
   "label": "Sports",
   "file": "sports.html"
  },
  "opinion": {
   "label": "Opinion",
   "file": "opinion.html"
  },
  "things-to-do": {
   "label": "Things to Do",
   "file": "things-to-do.html"
  },
  "suburbs": {
   "label": "Suburbs",
   "file": "suburbs.html"
  }
 },
 "topics": {
  "news": {
   "local": "Local",
   "crime": "Crime and public safety",
   "education": "Education",
   "environment": "Environment",
   "health": "Health",
   "immigration": "Immigration",
   "national": "National",
   "science": "Science",
   "world": "World",
   "weather": "Weather",
   "politics": "Politics",
   "investigations": "Investigations",
   "history": "History"
  },
  "business": {
   "real-estate": "Real estate",
   "transportation": "Transportation",
   "careers": "Careers and finance",
   "workplaces": "Top workplaces"
  },
  "sports": {
   "college": "College sports",
   "soccer": "Soccer",
   "pro": "Pro teams"
  },
  "opinion": {
   "editorials": "Editorials",
   "commentary": "Commentary",
   "letters": "Letters",
   "voices": "Reader voices"
  },
  "things-to-do": {
   "dining": "Dining",
   "music": "Music",
   "theater": "Theater",
   "movies": "Movies and TV",
   "travel": "Travel"
  },
  "suburbs": {
   "fox-bend": "Fox Bend Beacon",
   "southside": "Southside Dispatch",
   "harlow": "Harlow Courier",
   "quarry-falls": "Quarry Falls Sentinel",
   "westmere": "Westmere Gazette",
   "port-alder": "Port Alder Post"
  }
 },
 "weather": {
  "lakeport": {
   "name": "Lakeport",
   "now": {
    "f": 41,
    "cond": "Cloudy",
    "wind": "12 mph NW",
    "hum": 62
   },
   "days": [
    {
     "d": "Tue",
     "hi": 44,
     "lo": 33,
     "cond": "Cloudy"
    },
    {
     "d": "Wed",
     "hi": 40,
     "lo": 31,
     "cond": "Partly sunny"
    },
    {
     "d": "Thu",
     "hi": 36,
     "lo": 28,
     "cond": "Snow showers late"
    },
    {
     "d": "Fri",
     "hi": 33,
     "lo": 26,
     "cond": "Light snow"
    },
    {
     "d": "Sat",
     "hi": 35,
     "lo": 25,
     "cond": "Mostly sunny"
    }
   ]
  },
  "fox-bend": {
   "name": "Fox Bend",
   "now": {
    "f": 39,
    "cond": "Partly cloudy",
    "wind": "9 mph W",
    "hum": 58
   },
   "days": [
    {
     "d": "Tue",
     "hi": 42,
     "lo": 30,
     "cond": "Partly cloudy"
    },
    {
     "d": "Wed",
     "hi": 39,
     "lo": 29,
     "cond": "Sunny"
    },
    {
     "d": "Thu",
     "hi": 34,
     "lo": 25,
     "cond": "Flurries late"
    },
    {
     "d": "Fri",
     "hi": 31,
     "lo": 23,
     "cond": "Light snow"
    },
    {
     "d": "Sat",
     "hi": 33,
     "lo": 22,
     "cond": "Sunny"
    }
   ]
  },
  "port-alder": {
   "name": "Port Alder",
   "now": {
    "f": 43,
    "cond": "Breezy",
    "wind": "20 mph NE",
    "hum": 71
   },
   "days": [
    {
     "d": "Tue",
     "hi": 45,
     "lo": 36,
     "cond": "Breezy"
    },
    {
     "d": "Wed",
     "hi": 42,
     "lo": 34,
     "cond": "Cloudy"
    },
    {
     "d": "Thu",
     "hi": 38,
     "lo": 31,
     "cond": "Rain to snow"
    },
    {
     "d": "Fri",
     "hi": 34,
     "lo": 28,
     "cond": "Snow showers"
    },
    {
     "d": "Sat",
     "hi": 36,
     "lo": 27,
     "cond": "Partly sunny"
    }
   ]
  }
 },
 "stories": [
  {
   "id": "s1",
   "section": "news",
   "topic": "local",
   "local": true,
   "title": "Bronzeline streetcar riders get a second chance as the city revives a shuttered line",
   "dek": "A two-mile loop that closed in 2019 returns in January, with free rides for the first month.",
   "by": "Marisol Quade",
   "date": "2026-11-09T18:30",
   "pop": 1,
   "img": "city",
   "p": [
    "City transit officials said Monday that the Bronzeline streetcar will resume service on Jan. 12, reconnecting the riverfront with the Eastgate neighborhood for the first time in seven years.",
    "The restored line runs 14 hours a day and will be free for the first 30 days. Riders who relied on the loop before it closed said the return could cut a 40-minute bus transfer to about 12 minutes.",
    "Transit board member Alan Okonkwo-Reyes said the repairs came in under budget, but he cautioned that weekend frequency will depend on staffing. A public comment session is scheduled for Dec. 3 at the Eastgate library."
   ]
  },
  {
   "id": "s2",
   "section": "news",
   "topic": "education",
   "local": true,
   "title": "Marsh County schools weigh a four-day week for rural campuses",
   "dek": "Superintendents say the shorter schedule could help fill teaching vacancies; parents want child care answers first.",
   "by": "Devon Aldrich-Hayes",
   "date": "2026-11-09T16:10",
   "pop": 3,
   "img": "field",
   "p": [
    "Three rural districts in Marsh County will survey families this month on a pilot four-day week that would start next fall.",
    "Supporters point to teacher retention in similar districts. Opponents worry about working parents, and the districts have not yet said who would run Friday programs."
   ]
  },
  {
   "id": "s3",
   "section": "news",
   "topic": "crime",
   "local": true,
   "title": "Police close two lanes of Harbor Drive after overnight collision; no serious injuries reported",
   "dek": "The crash involving a delivery van and a city bus snarled the morning commute for hours.",
   "by": "Greg Holloway",
   "date": "2026-11-10T07:45",
   "pop": 5,
   "img": "city",
   "p": [
    "Lakeport police said a delivery van ran a red light near the Pier 9 crossing at about 5 a.m. and struck a southbound bus carrying six passengers.",
    "Two people were treated at the scene. Both lanes reopened by mid-morning, and investigators asked anyone with dashboard video to contact the traffic unit."
   ]
  },
  {
   "id": "s4",
   "section": "news",
   "topic": "environment",
   "local": true,
   "title": "Lakeshore erosion survey finds three beaches losing sand faster than expected",
   "dek": "Park district engineers propose rock barriers at Cutler Point and a sand-replenishment pilot.",
   "by": "Lena Okafor",
   "date": "2026-11-08T09:00",
   "pop": 7,
   "img": "lake",
   "p": [
    "A new survey from the Lakeport Park District measured as much as 11 feet of shoreline loss at Cutler Point since 2023, double the rate in the district's last report.",
    "Engineers presented two options on Saturday: a rock barrier estimated at $4.2 million or a repeating sand-replenishment cycle that costs less up front but must be redone every few years."
   ]
  },
  {
   "id": "s5",
   "section": "news",
   "topic": "health",
   "local": true,
   "title": "Flu shots are widely available early this year. Clinics say demand is already up",
   "dek": "Health officials urge residents over 65 and those with asthma to get vaccinated by Thanksgiving.",
   "by": "Priya Natarajan",
   "date": "2026-11-08T12:20",
   "pop": 9,
   "img": "city",
   "p": [
    "The Marsh County Health Department opened walk-in clinics at four libraries last week, about three weeks earlier than usual.",
    "Pharmacists reported lines on weekends. Officials said supplies are adequate and that appointments are not required at the library sites."
   ]
  },
  {
   "id": "s6",
   "section": "news",
   "topic": "politics",
   "local": true,
   "title": "City council advances a budget that adds 60 inspectors and trims library hours",
   "dek": "The 9-6 preliminary vote sets up a final decision before Thanksgiving.",
   "by": "Tomas Wren",
   "date": "2026-11-09T21:05",
   "pop": 2,
   "img": "city",
   "p": [
    "The Lakeport City Council voted 9-6 Monday night to move forward a $4.1 billion spending plan that funds 60 new building and food-safety inspectors.",
    "To balance the plan, library branches would close on Sundays, a change that drew an hour of objections from residents during public comment.",
    "Council members have until Nov. 24 to offer amendments. The mayor's office said it would not veto a version that preserves the inspector hiring."
   ]
  },
  {
   "id": "s7",
   "section": "news",
   "topic": "politics",
   "local": false,
   "title": "State lawmakers return to the capital with transit funding at the top of the agenda",
   "dek": "A special session starts Tuesday, with a vote on a regional fare-integration plan expected by Friday.",
   "by": "Tomas Wren",
   "date": "2026-11-10T06:30",
   "pop": 0,
   "img": "city",
   "p": [
    "Legislators arrive for a short session focused on funding for the region's three transit agencies, which have warned of service cuts without new revenue.",
    "Leaders in both parties say they expect a deal, though they disagree about whether to raise the sales tax or the vehicle registration fee."
   ]
  },
  {
   "id": "s8",
   "section": "news",
   "topic": "investigations",
   "local": true,
   "title": "Inspection backlog left 300 apartment buildings unchecked for five years, records show",
   "dek": "A review of city data found the oldest buildings waited the longest.",
   "by": "Ruth Castellan",
   "date": "2026-11-07T05:00",
   "pop": 4,
   "img": "city",
   "p": [
    "City records obtained by the Ledger show that 312 apartment buildings did not receive a full inspection between 2021 and 2026, including 90 built before 1940.",
    "Tenants in several of the buildings described broken heat, blocked exits and unreported mold. The inspections office said staffing, not policy, caused the delay."
   ]
  },
  {
   "id": "s9",
   "section": "news",
   "topic": "national",
   "local": false,
   "title": "Cold snap pushes heating costs higher across the Midwest, utilities warn",
   "dek": "Natural gas prices have climbed 18 percent since September.",
   "by": "Jun Park-Ellis",
   "date": "2026-11-09T14:00",
   "pop": 0,
   "img": "field",
   "p": [
    "Utility regulators in several states said households should expect winter bills to run about 12 to 20 percent above last year.",
    "Assistance programs open earlier this year in most states. Lakeport residents can apply through the county energy office beginning Nov. 15."
   ]
  },
  {
   "id": "s10",
   "section": "news",
   "topic": "science",
   "local": false,
   "title": "University telescope team confirms a faint comet will be visible before dawn this month",
   "dek": "Observers in dark areas around Lakeport should see it with binoculars.",
   "by": "Lena Okafor",
   "date": "2026-11-06T10:00",
   "pop": 0,
   "img": "lake",
   "p": [
    "Astronomers at Marsh State University said the comet, discovered in March, has brightened more than predicted.",
    "The best viewing is between 4:30 and 5:30 a.m. over the next two weeks, looking low in the east. The group plans a free public viewing at the campus observatory."
   ]
  },
  {
   "id": "s11",
   "section": "news",
   "topic": "world",
   "local": false,
   "title": "Regional trade ministers meet in the port city to discuss shipping delays",
   "dek": "Talks focus on a backlog of grain exports and new customs software.",
   "by": "Jun Park-Ellis",
   "date": "2026-11-09T11:15",
   "pop": 0,
   "img": "lake",
   "p": [
    "Ministers from nine countries began two days of talks on Monday, aiming to reduce wait times at the busiest grain terminals.",
    "Officials said a shared electronic customs form could cut clearance times in half by spring."
   ]
  },
  {
   "id": "s12",
   "section": "news",
   "topic": "weather",
   "local": true,
   "title": "Chilly week ahead: first measurable snow possible by Friday",
   "dek": "Forecasters say lake-effect bands could drop one to three inches on the south side.",
   "by": "Imani Fairbanks",
   "date": "2026-11-10T05:30",
   "pop": 6,
   "img": "lake",
   "p": [
    "Temperatures will hold in the 30s through midweek, and a cold front on Thursday night could bring the season's first measurable snow.",
    "Road crews said salt trucks are staged. See the weather page for the sample forecast."
   ]
  },
  {
   "id": "s13",
   "section": "business",
   "topic": "real-estate",
   "local": true,
   "title": "Lakefront condo prices cool for the third straight quarter",
   "dek": "Buyers are waiting for lower mortgage rates, brokers say, while rentals remain tight.",
   "by": "Dale Kimura",
   "date": "2026-11-09T09:30",
   "pop": 8,
   "img": "city",
   "p": [
    "Median sale prices for lakefront condos fell 2.4 percent compared with the same quarter last year, according to a sample market report compiled by regional brokers.",
    "Rents in the same buildings rose 3 percent. Analysts say a wave of new construction, scheduled to finish next summer, may ease the squeeze."
   ]
  },
  {
   "id": "s14",
   "section": "business",
   "topic": "transportation",
   "local": true,
   "title": "Airport adds nonstop service to three new cities as holiday travel ramps up",
   "dek": "The additions include a seasonal route to a ski destination.",
   "by": "Dale Kimura",
   "date": "2026-11-08T15:40",
   "pop": 0,
   "img": "city",
   "p": [
    "Lakeport International said carriers will add three nonstop routes starting in December.",
    "Airport officials expect about 1.1 million passengers over the holiday period and recommend arriving two hours before domestic flights."
   ]
  },
  {
   "id": "s15",
   "section": "business",
   "topic": "careers",
   "local": true,
   "title": "Entry-level hiring rebounds in logistics and health care, job board data shows",
   "dek": "Warehouse and nursing-assistant postings rose sharply from the summer.",
   "by": "Alicia Brandt",
   "date": "2026-11-07T08:00",
   "pop": 10,
   "img": "field",
   "p": [
    "Postings for entry-level logistics roles in the Lakeport area rose 14 percent in October, according to a sample data set compiled for this report.",
    "Career counselors say applicants with short certificate programs are getting interviews faster than those without."
   ]
  },
  {
   "id": "s16",
   "section": "business",
   "topic": "workplaces",
   "local": true,
   "title": "What makes a great workplace? Employees at this bakery chain say it is Tuesday pastries and predictable shifts",
   "dek": "Our annual list of top regional employers opens for nominations.",
   "by": "Alicia Brandt",
   "date": "2026-11-06T07:30",
   "pop": 0,
   "img": "food",
   "p": [
    "Workers at the Rye & Rise bakery chain told surveyors that scheduling two weeks ahead mattered more to them than pay perks.",
    "Nominations for the Ledger's Top Workplaces list are open through Dec. 5 to any employer with more than 50 local employees."
   ]
  },
  {
   "id": "s17",
   "section": "sports",
   "topic": "pro",
   "local": true,
   "title": "Harbor Hawks hold off a late rally to stay perfect at home",
   "dek": "Rookie guard scores 24 in a 108-102 win.",
   "by": "Nate Silverstein",
   "date": "2026-11-10T00:10",
   "pop": 0,
   "img": "stage",
   "p": [
    "The Hawks led by 18 in the third quarter before the visitors cut it to two with four minutes left.",
    "A pair of free throws from veteran Cole Barrow sealed the win. Harbor Hawks are 5-0 at home for the first time in a decade."
   ]
  },
  {
   "id": "s18",
   "section": "sports",
   "topic": "college",
   "local": false,
   "title": "Marsh State edges rival in double overtime to keep playoff hopes alive",
   "dek": "Quarterback throws for 331 yards and the winning score.",
   "by": "Nate Silverstein",
   "date": "2026-11-08T23:30",
   "pop": 0,
   "img": "field",
   "p": [
    "Marsh State needed two extra periods to beat the Cedar Valley Owls 41-38 on Saturday.",
    "The Lancers now need a win next week and some help from other results to reach the conference title game."
   ]
  },
  {
   "id": "s19",
   "section": "sports",
   "topic": "soccer",
   "local": true,
   "title": "Lakeport FC signs defender on a two-year deal ahead of the spring season",
   "dek": "The 24-year-old arrives from a second-division side.",
   "by": "Hana Ito",
   "date": "2026-11-09T13:00",
   "pop": 0,
   "img": "field",
   "p": [
    "Lakeport FC announced the signing of defender Mateo Brisa on Monday.",
    "Coach Samira Hale said the club wanted more pace in the back line. Brisa could debut in a preseason friendly in February."
   ]
  },
  {
   "id": "s20",
   "section": "opinion",
   "topic": "editorials",
   "local": false,
   "title": "Editorial: Fix the inspection backlog before the next winter",
   "dek": "Hiring more inspectors is a start. The city also needs a public dashboard.",
   "by": "The Editorial Board",
   "date": "2026-11-09T05:00",
   "pop": 0,
   "img": "city",
   "p": [
    "The Ledger's reporting this week showed hundreds of apartment buildings went years without a full inspection. The city council's budget plan includes inspectors, and that is the right call.",
    "But hiring alone will not rebuild trust. Residents deserve to see which buildings are due and which have been checked, in a form they can search from a phone."
   ]
  },
  {
   "id": "s21",
   "section": "opinion",
   "topic": "commentary",
   "local": false,
   "title": "Commentary: Four-day school weeks solve the wrong problem",
   "dek": "Rural districts need teachers and broadband before they need a shorter calendar.",
   "by": "Wanda Pruitt",
   "date": "2026-11-10T04:00",
   "pop": 0,
   "img": "field",
   "p": [
    "Marsh County's proposal treats a staffing shortage as a scheduling puzzle. Cutting a day from the week may attract applicants, but it cuts instruction for students who can least afford to lose it.",
    "If the districts want to keep teachers, they should start with housing stipends and mentoring, and survey teachers, not just parents."
   ]
  },
  {
   "id": "s22",
   "section": "opinion",
   "topic": "letters",
   "local": false,
   "title": "Letters: Streetcar skeptics, library hours and a lost glove on the 22 bus",
   "dek": "Readers respond to the week's news.",
   "by": "Reader letters",
   "date": "2026-11-09T05:30",
   "pop": 0,
   "img": "stage",
   "p": [
    "Readers wrote in about the Bronzeline streetcar, with views split between enthusiasm and worries about weekend service.",
    "One reader asked for the return of a gray wool glove left on the number 22 bus on Nov. 3."
   ]
  },
  {
   "id": "s23",
   "section": "opinion",
   "topic": "voices",
   "local": false,
   "title": "Reader voices: What my corner bakery taught me about showing up",
   "dek": "A retired teacher reflects on 40 years of Saturday mornings.",
   "by": "Odette Marchetti",
   "date": "2026-11-08T06:00",
   "pop": 0,
   "img": "food",
   "p": [
    "Every Saturday since 1986 I have bought a loaf at the same corner bakery, and each time the owner has asked about my week.",
    "It is a small thing. But in a city of strangers it is the kind of habit that makes a neighborhood."
   ]
  },
  {
   "id": "s24",
   "section": "things-to-do",
   "topic": "dining",
   "local": true,
   "title": "Five soups worth braving the cold for, from Eastgate to Fox Bend",
   "dek": "A tour through ramen, borscht, pozole and two chowders.",
   "by": "Camila Ferreira",
   "date": "2026-11-08T10:00",
   "pop": 0,
   "img": "food",
   "p": [
    "When the temperature drops, the best lunch in Lakeport is often a bowl. We tasted our way through dozens of options.",
    "Our favorites include a smoky pozole at a family-run Eastgate counter and a no-frills beet borscht served with rye."
   ]
  },
  {
   "id": "s25",
   "section": "things-to-do",
   "topic": "music",
   "local": true,
   "title": "Winter concert season preview: 12 shows to put on your calendar",
   "dek": "From a free carol sing to a sold-out jazz residency.",
   "by": "Camila Ferreira",
   "date": "2026-11-07T11:00",
   "pop": 0,
   "img": "stage",
   "p": [
    "The Lakeport Symphony kicks off its holiday series on Nov. 28, and clubs across the city have lined up an unusually deep jazz calendar.",
    "Several shows are free or pay-what-you-can; check the events list below for sample dates."
   ]
  },
  {
   "id": "s26",
   "section": "things-to-do",
   "topic": "theater",
   "local": true,
   "title": "A scrappy storefront troupe stages a dazzling Dickens in the round",
   "dek": "Review: Twelve actors, a bedsheet and a lot of heart.",
   "by": "Camila Ferreira",
   "date": "2026-11-09T12:00",
   "pop": 0,
   "img": "stage",
   "p": [
    "The Storefront Players' new take on a holiday classic fits 60 seats and no more, which makes the ghost scene startlingly intimate.",
    "It runs through Dec. 20. Tickets start at $18, with a pay-what-you-can matinee on Sundays."
   ]
  },
  {
   "id": "s27",
   "section": "things-to-do",
   "topic": "travel",
   "local": false,
   "title": "Weekend getaway: a lighthouse inn two hours north of Lakeport",
   "dek": "Where to eat, walk and warm up when the lake turns gray.",
   "by": "Hana Ito",
   "date": "2026-11-06T09:30",
   "pop": 0,
   "img": "lake",
   "p": [
    "The Gull Point Inn sits beside a working lighthouse and offers off-season rates through March.",
    "Pack boots. The cliff trail is open all year, and a winter fish fry runs on Fridays."
   ]
  },
  {
   "id": "s28",
   "section": "suburbs",
   "topic": "fox-bend",
   "local": true,
   "title": "Fox Bend library to add late hours for students during finals",
   "dek": "Doors will stay open until midnight on weeknights in December.",
   "by": "Fox Bend Beacon staff",
   "date": "2026-11-09T10:00",
   "pop": 0,
   "img": "field",
   "p": [
    "The Fox Bend Public Library will extend weeknight hours through Dec. 18, funded by a small grant.",
    "Librarians said study rooms can be reserved online or at the desk."
   ]
  },
  {
   "id": "s29",
   "section": "suburbs",
   "topic": "southside",
   "local": true,
   "title": "Southside food pantry gets a new walk-in freezer",
   "dek": "A donation will let volunteers handle fresh meat and dairy for the first time.",
   "by": "Southside Dispatch staff",
   "date": "2026-11-08T08:00",
   "pop": 0,
   "img": "food",
   "p": [
    "The Calumet Road Pantry installed a walk-in freezer last week thanks to a $22,000 gift from a local credit union.",
    "Volunteers said they expect to serve about 300 more households a month."
   ]
  },
  {
   "id": "s30",
   "section": "suburbs",
   "topic": "harlow",
   "local": true,
   "title": "Harlow Heights council approves a new bike path along the creek",
   "dek": "The 1.8-mile trail will link two parks by next summer.",
   "by": "Harlow Courier staff",
   "date": "2026-11-07T14:00",
   "pop": 0,
   "img": "lake",
   "p": [
    "Council members voted unanimously to fund the path with a mix of village money and a regional grant.",
    "Construction is expected to begin in March."
   ]
  },
  {
   "id": "s31",
   "section": "suburbs",
   "topic": "quarry-falls",
   "local": true,
   "title": "Quarry Falls high school robotics team heads to state",
   "dek": "The squad of 14 earned its berth with a last-second pickup.",
   "by": "Quarry Falls Sentinel staff",
   "date": "2026-11-06T16:00",
   "pop": 0,
   "img": "city",
   "p": [
    "The Quarry Falls Engineers placed second at a regional event, qualifying for the state championship.",
    "The team is raising money for travel and invites sponsors to contact the school."
   ]
  },
  {
   "id": "s32",
   "section": "suburbs",
   "topic": "westmere",
   "local": true,
   "title": "Westmere farmers market moves indoors for winter",
   "dek": "The Saturday market will run in the old depot through March.",
   "by": "Westmere Gazette staff",
   "date": "2026-11-05T09:00",
   "pop": 0,
   "img": "food",
   "p": [
    "Vendors will sell root vegetables, eggs, bread and honey from the depot's main hall.",
    "Parking is free behind the building."
   ]
  },
  {
   "id": "s33",
   "section": "suburbs",
   "topic": "port-alder",
   "local": true,
   "title": "Port Alder harbor dredging to start after Thanksgiving",
   "dek": "Boaters will see temporary closures at the north channel.",
   "by": "Port Alder Post staff",
   "date": "2026-11-04T13:00",
   "pop": 0,
   "img": "lake",
   "p": [
    "Crews will remove silt from the north channel over the next six weeks.",
    "Harbor officials said winter storage customers are not affected."
   ]
  },
  {
   "id": "s34",
   "section": "news",
   "topic": "local",
   "local": true,
   "title": "Neighbors turn an empty lot into a winter skating rink",
   "dek": "Volunteers flood the Eastgate lot each night; skates are free to borrow.",
   "by": "Marisol Quade",
   "date": "2026-11-10T08:20",
   "pop": 0,
   "img": "lake",
   "p": [
    "For the third year, residents of a four-block stretch of Eastgate are building a rink in a vacant lot.",
    "The rink opens when overnight temperatures stay below 25 degrees. Organizers keep a bin of loaner skates by the gate."
   ]
  }
 ]
};

/* ---------- shared templates (same code produced the static HTML) ---------- */
const IMG_ALT = { city: 'stylized city skyline', lake: 'stylized lakeshore', field: 'stylized open field', food: 'stylized bowl and loaf', stage: 'stylized stage curtain' };
const MONTHS = ['Jan.', 'Feb.', 'March', 'April', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function fmtDate(iso) {
  const d = new Date(iso.length > 10 ? iso : iso + 'T12:00'); // date-only strings would parse as UTC
  let h = d.getHours();
  const ap = h >= 12 ? 'p.m.' : 'a.m.';
  h = h % 12 || 12;
  const time = h + ':' + String(d.getMinutes()).padStart(2, '0') + ' ' + ap;
  return MONTHS[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear() + (iso.length > 10 ? ', ' + time : '');
}

function topicLabel(s) {
  return DATA.topics[s.section][s.topic];
}

function cardHTML(s, o) {
  o = o || {};
  const h = o.h || 3;
  return '<li class="story-item' + (o.lead ? ' story-item--lead' : '') + '" data-filter-item data-sec="' + s.section + '" data-topic="' + s.topic + '" data-text="' + esc((s.title + ' ' + s.dek).toLowerCase()) + '">' +
    '<article class="story-card' + (o.lead ? ' story-card--lead' : '') + '" data-component="story-card">' +
    '<a class="story-card__media" href="article.html?id=' + s.id + '" tabindex="-1" aria-hidden="true"><img src="assets/img-' + s.img + '.svg" alt="" width="320" height="200"></a>' +
    '<div class="story-card__body"><p class="kicker">' + esc(topicLabel(s)) + '</p>' +
    '<h' + h + ' class="story-card__title"><a href="article.html?id=' + s.id + '">' + esc(s.title) + '</a></h' + h + '>' +
    '<p class="story-card__dek">' + esc(s.dek) + '</p>' +
    '<p class="meta">By ' + esc(s.by) + ' <span aria-hidden="true">·</span> <time datetime="' + s.date + '">' + fmtDate(s.date) + '</time></p></div></article></li>';
}

function articleInner(s) {
  const sec = DATA.sections[s.section];
  const related = DATA.stories.filter((r) => r.section === s.section && r.id !== s.id).slice(0, 3);
  return '<article class="article" data-section="article" data-component="article-body">' +
    '<header class="article-header"><p class="kicker">' + esc(topicLabel(s)) + '</p><h1>' + esc(s.title) + '</h1><p class="article-dek">' + esc(s.dek) + '</p>' +
    '<div class="byline" data-component="byline"><p class="byline__author">By <strong>' + esc(s.by) + '</strong> <span class="byline__org">| For The Lakeport Ledger</span></p>' +
    '<p class="byline__dateline">Lakeport <span aria-hidden="true">·</span> Published <time datetime="' + s.date + '">' + fmtDate(s.date) + '</time></p></div></header>' +
    '<figure class="article-figure"><img src="assets/img-' + s.img + '.svg" alt="Placeholder illustration: ' + IMG_ALT[s.img] + '" width="720" height="450"><figcaption>Placeholder illustration, not a news photograph.</figcaption></figure>' +
    '<div class="article-body">' + s.p.map((t) => '<p>' + esc(t) + '</p>').join('') + '</div>' +
    '<div class="share" data-section="share" data-component="share-tools"><h2 class="share__title">Share this story</h2><ul class="share__list"><li><button type="button" class="btn btn--quiet" data-share="copy">Copy link</button></li><li><a class="btn btn--quiet" data-share-email href="mailto:?subject=A%20story%20from%20The%20Lakeport%20Ledger">Email</a></li><li><button type="button" class="btn btn--quiet" data-share="print">Print</button></li></ul><p id="share-status" class="share__status" role="status"></p></div></article>' +
    '<section class="related" aria-labelledby="related-title" data-section="related-stories" data-component="related-stories"><h2 id="related-title">More in ' + esc(sec.label) + '</h2><ul>' +
    related.map((r) => '<li><a href="article.html?id=' + r.id + '">' + esc(r.title) + '</a></li>').join('') + '</ul></section>';
}

function weatherHTML(key, unit) {
  const w = DATA.weather[key];
  const t = (f) => (unit === 'C' ? Math.round((f - 32) * 5 / 9) : f) + '°' + unit;
  return '<h2 id="wx-title">' + esc(w.name) + ': conditions now <span class="sample-tag">sample data</span></h2>' +
    '<p class="wx-now"><strong>' + t(w.now.f) + '</strong> ' + esc(w.now.cond) + '. Wind ' + esc(w.now.wind) + '. Humidity ' + w.now.hum + '%.</p>' +
    '<div class="table-wrap"><table><caption>Five-day forecast for ' + esc(w.name) + ' (static sample data, not a live forecast)</caption>' +
    '<thead><tr><th scope="col">Day</th><th scope="col">High</th><th scope="col">Low</th><th scope="col">Conditions</th></tr></thead><tbody>' +
    w.days.map((d) => '<tr><th scope="row">' + d.d + '</th><td>' + t(d.hi) + '</td><td>' + t(d.lo) + '</td><td>' + esc(d.cond) + '</td></tr>').join('') +
    '</tbody></table></div>';
}


/* ---------- behavior ---------- */
const params = new URLSearchParams(location.search);
const $ = (sel, root) => (root || document).querySelector(sel);
const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

/* Disclosures: menu, search panel, services dropdown, nav submenus. Escape closes and restores focus. */
function setOpen(btn, open) {
  const panel = document.getElementById(btn.getAttribute('aria-controls'));
  if (open) $$('[data-disclosure][aria-expanded="true"]').forEach((o) => o !== btn && !o.contains(btn) && setOpen(o, false));
  btn.setAttribute('aria-expanded', String(open));
  panel.hidden = !open;
  if (open && btn.dataset.focus) $(btn.dataset.focus, panel).focus();
}
$$('[data-disclosure]').forEach((btn) => btn.addEventListener('click', () => setOpen(btn, btn.getAttribute('aria-expanded') !== 'true')));
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  $$('[data-disclosure][aria-expanded="true"]').forEach((btn) => {
    const hadFocus = btn.contains(document.activeElement) || document.getElementById(btn.getAttribute('aria-controls')).contains(document.activeElement);
    setOpen(btn, false);
    if (hadFocus) btn.focus();
  });
});
document.addEventListener('click', (e) => {
  $$('[data-disclosure][data-dismiss-outside][aria-expanded="true"]').forEach((btn) => {
    if (!btn.contains(e.target) && !document.getElementById(btn.getAttribute('aria-controls')).contains(e.target)) setOpen(btn, false);
  });
});

/* Filters: select controls match item data-<key>; text inputs match item data-text. */
$$('[data-filter-scope]').forEach((scope) => {
  const controls = $$('[data-filter]', scope);
  const items = $$('[data-filter-item]', scope);
  const status = $('[data-filter-status]', scope);
  const empty = $('[data-filter-empty]', scope);
  controls.forEach((c) => {
    const preset = params.get(c.dataset.filter);
    if (c.tagName === 'SELECT' && preset && $('option[value="' + CSS.escape(preset) + '"]', c)) c.value = preset;
  });
  function update() {
    let shown = 0;
    items.forEach((it) => {
      const ok = controls.every((c) => {
        const v = c.value.trim().toLowerCase();
        if (!v) return true;
        return c.tagName === 'SELECT' ? it.dataset[c.dataset.filter] === c.value : it.dataset.text.includes(v);
      });
      it.hidden = !ok;
      if (ok) shown++;
    });
    if (status) status.textContent = 'Showing ' + shown + ' of ' + items.length + ' ' + (scope.dataset.noun || 'items') + '.';
    if (empty) empty.hidden = shown !== 0;
  }
  controls.forEach((c) => c.addEventListener(c.tagName === 'SELECT' ? 'change' : 'input', update));
  $$('[data-filter-reset]', scope).forEach((r) => r.addEventListener('click', () => { controls.forEach((c) => { c.value = ''; }); update(); controls[0].focus(); }));
  update();
});

/* Tabs (WAI-ARIA tabs pattern with arrow keys). */
$$('[data-tabs]').forEach((box) => {
  const tabs = $$('[role="tab"]', box);
  function select(tab, focus) {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) tab.focus();
  }
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', (e) => {
      const next = { ArrowRight: (i + 1) % tabs.length, ArrowLeft: (i + tabs.length - 1) % tabs.length, Home: 0, End: tabs.length - 1 }[e.key];
      if (next !== undefined) { e.preventDefault(); select(tabs[next], true); }
    });
  });
});

/* Forms: client-side validation, error summary, focus management, demo-only success. */
function fieldError(el) {
  if (el.tagName === 'FIELDSET') return $('input:checked', el) ? '' : 'Choose at least one option for ' + el.dataset.label + '.';
  const v = el.value.trim();
  if (el.required && !v) return el.dataset.label + ' is required.';
  if (v && el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Enter an email address such as name@example.com.';
  if (v && el.dataset.pattern && !new RegExp(el.dataset.pattern).test(v)) return el.dataset.patternMessage;
  return '';
}
function showError(el, msg) {
  const out = document.getElementById(el.id + '-error');
  out.textContent = msg;
  out.hidden = !msg;
  if (el.tagName !== 'FIELDSET') el.toggleAttribute('aria-invalid', !!msg);
}
$$('form[data-validate]').forEach((form) => {
  const summary = $('.error-summary', form);
  const success = $('.demo-success', form);
  form.addEventListener('submit', (e) => {
    const errors = [];
    $$('[data-field]', form).forEach((el) => {
      const msg = fieldError(el);
      showError(el, msg);
      if (msg) errors.push({ el, msg });
    });
    if (!errors.length && form.getAttribute('method') === 'get') return; // native GET to the search page
    e.preventDefault();
    if (success) success.hidden = true;
    if (summary) {
      summary.hidden = !errors.length;
      $('ul', summary).innerHTML = errors.map((x) => '<li><a href="#' + x.el.id + '">' + esc(x.msg) + '</a></li>').join('');
    }
    if (errors.length) return summary.focus();
    if (success) { success.hidden = false; success.focus(); }
    form.reset();
  });
  if (summary) summary.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    e.preventDefault();
    const el = document.getElementById(a.getAttribute('href').slice(1));
    (el.tagName === 'FIELDSET' ? $('input', el) : el).focus();
  });
  form.addEventListener('input', (e) => { if (e.target.closest('[data-field]') && !fieldError(e.target.closest('[data-field]'))) showError(e.target.closest('[data-field]'), ''); });
});

/* Dialog (subscription prompt simulation). Native <dialog> provides Escape and focus return. */
$$('[data-open-dialog]').forEach((b) => b.addEventListener('click', () => document.getElementById(b.dataset.openDialog).showModal()));
$$('dialog').forEach((d) => {
  $$('[data-close-dialog]', d).forEach((b) => b.addEventListener('click', () => d.close()));
  d.addEventListener('click', (e) => { if (e.target === d) d.close(); });
});

/* Search results page */
const searchRoot = $('[data-search-results]');
if (searchRoot) {
  const q = (params.get('s') || '').trim();
  const sec = params.get('sec') || '';
  const sort = params.get('sort') || 'relevance';
  $('#search-q').value = q;
  $('#search-sec').value = sec;
  $('#search-sort').value = sort;
  const out = $('#search-output', searchRoot);
  const status = $('#search-status', searchRoot);
  if (!q) {
    status.textContent = params.has('s') ? 'Enter a search term to see results.' : 'Search the demo archive of 34 sample stories.';
  } else {
    const terms = q.toLowerCase().split(/\s+/);
    const hits = DATA.stories.map((s) => {
      const t = s.title.toLowerCase(), d = s.dek.toLowerCase(), b = s.p.join(' ').toLowerCase();
      if (!terms.every((w) => (t + ' ' + d + ' ' + b).includes(w))) return null;
      return { s, score: terms.reduce((n, w) => n + (t.includes(w) ? 3 : 0) + (d.includes(w) ? 2 : 0) + b.split(w).length - 1, 0) };
    }).filter((h) => h && (!sec || h.s.section === sec))
      .sort((a, b) => (sort === 'newest' ? b.s.date.localeCompare(a.s.date) : b.score - a.score));
    status.textContent = hits.length + (hits.length === 1 ? ' result' : ' results') + ' for “' + q + '”' + (sec ? ' in ' + DATA.sections[sec].label : '') + '.';
    out.innerHTML = hits.length ? hits.map((h) => cardHTML(h.s)).join('') : '';
    $('#search-empty').hidden = hits.length !== 0;
  }
}

/* Article page: render the story named by ?id= from inline data (default story is in the HTML). */
const articleRoot = $('#article-root');
if (articleRoot && params.has('id')) {
  const s = DATA.stories.find((x) => x.id === params.get('id'));
  if (s) {
    articleRoot.innerHTML = articleInner(s);
    document.title = s.title + ' | The Lakeport Ledger';
    const crumbSection = $('#crumb-section');
    crumbSection.textContent = DATA.sections[s.section].label;
    crumbSection.href = DATA.sections[s.section].file;
    $('#crumb-current').textContent = s.title;
  } else {
    articleRoot.innerHTML = '<h1>Story not found</h1><p>No sample story has the id “' + esc(params.get('id')) + '”. Try the <a href="latest-headlines.html">latest headlines</a>.</p>';
    document.title = 'Story not found | The Lakeport Ledger';
    $('#crumb-current').textContent = 'Story not found';
  }
}
const shareStatus = $('#share-status');
$$('[data-share]').forEach((b) => b.addEventListener('click', () => {
  if (b.dataset.share === 'print') return window.print();
  const done = (m) => { shareStatus.textContent = m; };
  (navigator.clipboard ? navigator.clipboard.writeText(location.href) : Promise.reject()).then(
    () => done('Link copied.'), () => done('Copying is not available here. Copy the address from the browser bar.'));
}));
const mail = $('[data-share-email]');
if (mail) mail.href = 'mailto:?subject=' + encodeURIComponent(document.title) + '&body=' + encodeURIComponent(location.href);

/* Weather widget (static sample data) */
const wxForm = $('[data-weather-controls]');
if (wxForm) {
  const out = $('#weather-output');
  const render = () => { out.innerHTML = weatherHTML($('#wx-loc').value, $('input[name="unit"]:checked').value); };
  wxForm.addEventListener('change', render);
  wxForm.addEventListener('submit', (e) => e.preventDefault());
}

/* Subscriber-services form: preselect request type from ?topic= */
const reqType = $('#req-type');
if (reqType && $('option[value="' + CSS.escape(params.get('topic') || '') + '"]', reqType)) reqType.value = params.get('topic');
