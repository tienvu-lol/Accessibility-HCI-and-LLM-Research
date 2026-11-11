/* The Larkfield Dispatch (US edition) - fictional replica. Vanilla JS, no network. All data is inline sample data. */
(function () {
  'use strict';

  // Sample stories: id, sec, tags, title, dek, by, date, loc, mins, body[]
  const STORIES = [
    {"id":"s01","sec":"us-news","tags":"environment flooding","title":"Riverton votes to rebuild its flood-hit centre on higher ground","dek":"Residents back a $180m plan to move the town hall, library and clinic after the third flood in a decade.","by":"Marisol Quade","date":"2026-11-09","loc":"RIVERTON","mins":5,"body":["Voters in Riverton approved the relocation plan on Sunday by a margin of 61% to 39%, ending two years of argument over whether the low-lying town centre could be saved with taller flood walls.","The plan moves the town hall, the public library and the health clinic to a former orchard on the northern ridge, about 40 metres above the river. Shops and homes on the old high street will be offered buy-outs funded largely by a state resilience grant.","\"We kept patching the same wall and hoping,\" said Dolores Whitfield, who has run a hardware shop on Mill Street for 31 years. \"I will miss the street, but I will not miss carrying stock upstairs every spring.\"","Construction is due to start next autumn. Engineers estimate the new civic buildings will take three years to finish, and officials say the old centre will become a floodplain park with a small museum on the town’s history."]},
    {"id":"s02","sec":"us-news","tags":"education transport","title":"State auditors find school bus contractor missed safety checks","dek":"A review of 14 districts found overdue inspections on one in five vehicles.","by":"Dev Anand-Rhodes","date":"2026-11-09","loc":"CAPITAL CITY","mins":4,"body":["A state audit published on Monday found that a contractor serving 14 school districts failed to complete scheduled brake and door inspections on roughly one in five of its buses over the past school year.","The contractor said the gaps were caused by a records-system migration and that every vehicle has since been re-inspected. Auditors recommended spot checks by an independent body."]},
    {"id":"s03","sec":"us-news","tags":"health work","title":"Night-shift nurses win ruling on overtime pay","dek":"An appeals panel says hospitals cannot average hours across pay periods.","by":"Hannah Teague","date":"2026-11-08","loc":"HARTWELL","mins":4,"body":["A three-judge panel ruled that hospitals may not average a nurse’s hours across two pay periods to avoid overtime, a practice the court described as \"arithmetic convenience\".","The decision applies in four states. Hospital associations said they were reviewing it and may seek a wider hearing."]},
    {"id":"s04","sec":"us-news","tags":"environment climate","title":"Heat-pump rebates run dry in three states within a week","dek":"Installers report waiting lists as the programme’s first-year budget is exhausted.","by":"Luis Ferrante","date":"2026-11-08","loc":"DENVER PARK","mins":4,"body":["Rebate funds for home heat pumps were fully committed in three states within days of reopening, leaving installers with full order books and households with unexpected waiting lists.","Programme managers said demand was about twice the forecast. Lawmakers in two of the states are weighing emergency top-ups."]},
    {"id":"s05","sec":"us-news","tags":"community","title":"Rural libraries try late-night opening to reach shift workers","dek":"A pilot in the Pine Valley has doubled evening visits in six months.","by":"Orla Whitcombe","date":"2026-11-07","loc":"PINE VALLEY","mins":3,"body":["Six libraries in the Pine Valley now stay open until 10pm on Thursdays, a change prompted by a survey in which a third of residents said they worked when the branches were open.","Librarians say the late sessions draw job-seekers, students and people who simply want somewhere warm to sit. The pilot is funded for one more year."]},
    {"id":"s06","sec":"politics","tags":"congress transport","title":"Senate committee delays vote on transport funding bill","dek":"Negotiators say a dispute over rail grants could push a deal into December.","by":"Priya Raman","date":"2026-11-09","loc":"WASHINGTON","mins":4,"body":["A Senate committee postponed a vote on a major transport funding bill on Monday after talks over the size of regional rail grants stalled.","Aides from both parties described the mood as \"cautious but not hostile\" and said a revised draft could circulate this week."]},
    {"id":"s07","sec":"politics","tags":"midterms media","title":"Midterm campaigns pour record sums into local radio","dek":"Spending on small-market stations is up 40% on the last cycle, analysts say.","by":"Tom Bracewell","date":"2026-11-08","loc":"WASHINGTON","mins":4,"body":["Campaigns and outside groups have bought more airtime on local radio this autumn than in any previous midterm cycle, according to an analysis of public filings.","Strategists say audiences there are harder to reach online and more likely to listen to a whole advert. Station owners report that rates have risen sharply in the final fortnight."]},
    {"id":"s08","sec":"politics","tags":"midterms states","title":"Governors split over plan to pool disaster-relief funds","dek":"Eight states back a shared reserve; five say it would shift costs unfairly.","by":"Evelyn Okafor","date":"2026-11-07","loc":"SANTA ROSALIA","mins":5,"body":["A proposal to create a shared disaster-relief reserve divided governors at a regional summit, with coastal states in favour and several inland states warning they would subsidise others’ risks.","Supporters argue that pooling would lower borrowing costs after a major storm. Opponents want a cap on any state’s draw."]},
    {"id":"s09","sec":"politics","tags":"explainer","title":"Explainer: how a continuing resolution keeps the lights on","dek":"What happens when Congress cannot agree a budget by the deadline, in five questions.","by":"Sam Pollard","date":"2026-11-06","loc":"WASHINGTON","mins":6,"body":["A continuing resolution is a stopgap law that lets agencies keep spending at last year’s levels while lawmakers keep negotiating. It avoids a shutdown but freezes new programmes.","Because it usually lasts only weeks, it also creates a second deadline, which negotiators sometimes use as leverage."]},
    {"id":"s10","sec":"world","tags":"diplomacy","title":"Coastal nations agree first treaty on deep-sea cable protection","dek":"Twenty-two countries sign a pact on repairs, patrols and shared incident reporting.","by":"Aiko Matsuda","date":"2026-11-09","loc":"LISBON","mins":5,"body":["Twenty-two coastal countries signed a treaty in Lisbon that commits them to share reports of damage to undersea communications cables and to coordinate repair ships.","Negotiators described it as the first agreement of its kind. Several large shipping nations attended as observers but did not sign."]},
    {"id":"s11","sec":"world","tags":"middle east aid","title":"Aid convoys resume after weeks-long closure of mountain pass","dek":"Trucks carrying food and medicine crossed at dawn under a temporary truce.","by":"Karim Haddad","date":"2026-11-08","loc":"AMMAN","mins":4,"body":["More than sixty trucks carrying flour, medical supplies and fuel crossed the mountain pass on Sunday for the first time in five weeks, relief agencies said.","Aid officials cautioned that the truce is fragile and that stocks in the northern districts remain dangerously low."]},
    {"id":"s12","sec":"world","tags":"food","title":"Monsoon delays push grain prices higher across the region","dek":"Traders expect the squeeze to ease only after the winter harvest.","by":"Anita Desai-Lowe","date":"2026-11-07","loc":"KOLKATA","mins":4,"body":["A late and uneven monsoon has cut yields of staple grains, pushing wholesale prices to their highest level in three years.","Governments in the region are releasing reserve stocks and relaxing import duties, but market traders say the effect has been modest so far."]},
    {"id":"s13","sec":"world","tags":"ukraine energy","title":"Ukraine: engineers race first frosts to repair power stations","dek":"Crews work in shifts to restore heating capacity before temperatures fall below zero.","by":"Oleksandr Marchetti","date":"2026-11-06","loc":"KYIV","mins":5,"body":["Engineers are working around the clock to bring damaged power plants back online before the first hard frosts, with local officials warning of rolling outages in the meantime.","Volunteers have set up heated \"points of resilience\" in schools and libraries where residents can charge phones and warm up."]},
    {"id":"s14","sec":"business","tags":"money","title":"Regional bank offers fee-free accounts to under-25s","dek":"The move follows a customer survey showing monthly fees as the top complaint among young adults.","by":"Gareth Nwosu","date":"2026-11-09","loc":"CHICAGO","mins":3,"body":["Lakeshore Mutual said it will waive all monthly account fees for customers under 25 from January, a change it expects to cost about $9m a year.","Consumer groups welcomed the move but said overdraft charges remain the larger problem for young borrowers."]},
    {"id":"s15","sec":"business","tags":"shipping","title":"Container rates ease as port backlogs clear","dek":"Spot prices on the busiest routes have fallen for six straight weeks.","by":"Ines Valdivia","date":"2026-11-08","loc":"ROTTERDAM","mins":4,"body":["The cost of shipping a standard container on the busiest east-west routes has fallen for six consecutive weeks as port queues shrink.","Retailers say the relief has come too late for most holiday orders but should help prices in the spring."]},
    {"id":"s16","sec":"business","tags":"work","title":"Why the four-day week is spreading among small manufacturers","dek":"Owners say shorter weeks cut absence and help them recruit skilled machinists.","by":"Rachel Oduya","date":"2026-11-07","loc":"DAYTON","mins":6,"body":["A growing number of small factories are moving to a four-day schedule, not as a perk but as a response to a shortage of machinists who can pick where they work.","Owners report lower absence and fewer accidents. Some have kept output steady by redesigning shifts so that expensive equipment never sits idle."]},
    {"id":"s17","sec":"business","tags":"money","title":"Savers shift to short-term bonds as rate cuts loom","dek":"Fund flows show a sharp move away from longer-dated holdings.","by":"Martin Hale","date":"2026-11-06","loc":"NEW YORK","mins":4,"body":["Individual savers moved billions of dollars into short-term bond funds last month, according to industry data, as expectations of lower interest rates grew.","Advisers say the shift reflects a desire for predictable income, though some warn it may lock in lower returns if rates stay high."]},
    {"id":"s18","sec":"technology","tags":"environment","title":"Library lends out repair kits to cut e-waste","dek":"Borrowers can take home a toolkit, a spare-parts box and a guide for common phone and laptop faults.","by":"Tessa Brandt","date":"2026-11-09","loc":"PORTLAND HEIGHTS","mins":3,"body":["A city library has begun lending repair kits that include precision screwdrivers, a heat gun and a parts box, alongside printed guides for the most common phone and laptop faults.","Staff say the scheme has been borrowed more often than the library’s power tools."]},
    {"id":"s19","sec":"technology","tags":"science energy","title":"Researchers test battery that charges in four minutes","dek":"Early results show little loss of capacity after 2,000 cycles.","by":"Noor Siddiqui","date":"2026-11-08","loc":"CAMBRIDGE","mins":5,"body":["A university team reported a lithium-based cell that reaches 80% charge in four minutes and keeps more than 90% of its capacity after 2,000 cycles in laboratory tests.","Independent experts called the results promising but noted that the cells are small and have not yet been tested at the scale needed for vehicles."]},
    {"id":"s20","sec":"technology","tags":"ai education","title":"Teachers weigh classroom rules for AI homework helpers","dek":"Districts are split between outright bans and supervised use.","by":"Jonah Fairweather","date":"2026-11-07","loc":"AUSTIN","mins":5,"body":["School districts are adopting sharply different policies on AI writing assistants, from outright bans to \"show your prompts\" rules that treat the tool as a reference source.","Teachers say the most reliable safeguard so far is simple: asking students to explain their work out loud."]},
    {"id":"s21","sec":"sport","tags":"soccer","title":"Soccer: Harbour City edge late winner in derby","dek":"A stoppage-time header settles a bad-tempered local clash.","by":"Dani Moretti","date":"2026-11-09","loc":"HARBOUR CITY","mins":3,"body":["Harbour City won the derby 2-1 with a header in the 93rd minute, after the visitors had equalised from the penalty spot with ten men.","The result lifts the hosts to third in the table, one point behind the leaders."]},
    {"id":"s22","sec":"sport","tags":"nfl","title":"NFL: backup quarterback seizes chance as Lakeshore stun unbeaten Ridgemont","dek":"Three touchdown passes in the second half turn a 14-point deficit.","by":"Cole Brannigan","date":"2026-11-09","loc":"LAKESHORE","mins":4,"body":["Stepping in for an injured starter, Lakeshore’s backup quarterback threw three second-half touchdown passes to beat the previously unbeaten Ridgemont 27-24.","The coach said the plan did not change: \"We just stopped going backwards.\""]},
    {"id":"s23","sec":"sport","tags":"nba","title":"NBA: rookie guard scores 41 in overtime thriller","dek":"The 20-year-old matched a franchise record for a first-year player.","by":"Marcus Eddings","date":"2026-11-08","loc":"FAIRMONT","mins":3,"body":["A 20-year-old rookie guard scored 41 points, including eight in overtime, as Fairmont beat visiting Cascade 128-124.","It equalled the franchise record for a first-year player, set in 1998."]},
    {"id":"s24","sec":"sport","tags":"tennis","title":"Tennis: veteran reaches final in first event since surgery","dek":"A three-set semi-final win ends a 14-month absence from tour finals.","by":"Lena Hofstad","date":"2026-11-08","loc":"STOCKHOLM","mins":3,"body":["The 34-year-old reached her first final in more than a year with a 6-4, 3-6, 7-5 win over the top seed, saving two match points.","\"I did not expect to be here,\" she said. \"I only wanted to get through a week without pain.\""]},
    {"id":"s25","sec":"sport","tags":"golf","title":"Golf: course designers rethink bunkers for older players","dek":"A new generation of layouts offers forward tees and gentler sand faces.","by":"Walt Pruitt","date":"2026-11-06","loc":"SCOTTSDALE","mins":4,"body":["Several new courses are being laid out with older golfers in mind, from forward tees that shorten holes to bunkers with gently sloping faces that are easier to exit.","Designers say the changes also help beginners and have been welcomed by club managers worried about falling participation."]},
    {"id":"s26","sec":"opinion","tags":"editorial environment","title":"The Larkfield view: rebuilding on higher ground is expensive, but cheaper than the alternative","dek":"Riverton’s vote is a template other flood-prone towns should study.","by":"The Larkfield Dispatch editorial","date":"2026-11-09","loc":"","mins":3,"body":["Riverton’s decision to move its civic centre uphill will cost a great deal. It will also end a cycle in which the same buildings are repaired at public expense every few years.","Other towns will be tempted to wait for the next flood to make the case for them. They should not. The cheapest time to relocate is before the water arrives."]},
    {"id":"s27","sec":"opinion","tags":"column","title":"Your commute is quietly shaping your politics","dek":"Long drives and short train rides produce different instincts about what government is for.","by":"Beatrice Almeida","date":"2026-11-08","loc":"","mins":5,"body":["People who spend ninety minutes a day alone in a car tend to think of public services as a cost. People who share a carriage with strangers tend to think of them as a commons.","That is not a law of nature, but it is a pattern worth noticing, especially in an election season."]},
    {"id":"s28","sec":"opinion","tags":"cartoon","title":"Cartoon: the committee of the whole","dek":"A weekly look at the week in politics, drawn by Jules Arnaud.","by":"Jules Arnaud","date":"2026-11-08","loc":"","mins":1,"body":["This week’s cartoon shows a long table of lawmakers passing a single document hand to hand, none of them reading it. The caption: \"Pass it along.\"","Cartoons are published each Sunday and archived in the opinion section."]},
    {"id":"s29","sec":"opinion","tags":"letters","title":"Letters: readers on the cost of heat pumps","dek":"\"My installer quoted me a nine-month wait, and I considered myself lucky.\"","by":"Readers’ letters","date":"2026-11-07","loc":"","mins":3,"body":["Readers wrote in about rebates, waiting lists and noisy outdoor units after our report on exhausted heat-pump funds. Several said the paperwork was harder than the installation.","We publish a selection of letters every weekday. Letters may be edited for length and clarity."]},
    {"id":"s30","sec":"opinion","tags":"column","title":"Small towns are not a metaphor","dek":"They are places where people live, and the stories we tell about them should start there.","by":"Caleb Thornquist","date":"2026-11-06","loc":"","mins":7,"body":["Every election, small towns are summoned as a symbol of something: resilience, grievance, authenticity. The people who live in them are rarely asked what they want from a week.","I spent a month in three of them. What they asked for was, mostly, a working bus, a doctor within thirty miles, and to be left out of the metaphors."]},
    {"id":"s31","sec":"culture","tags":"film","title":"Film: a quiet drama about a night-ferry crew is the year’s surprise","dek":"Four stars for a film in which almost nothing happens and everything matters.","by":"Imogen Castellane","date":"2026-11-09","loc":"","mins":4,"body":["Set entirely on a late-night ferry crossing, the film follows a crew of five through one winter shift. There is no villain, and very little plot, yet the final twenty minutes are unexpectedly moving.","The cast is superb, particularly the veteran engineer who barely speaks."]},
    {"id":"s32","sec":"culture","tags":"music","title":"Music: the folk trio reinventing the sea shanty","dek":"Their second album pairs old work-songs with synthesizers and field recordings.","by":"Declan Foyle","date":"2026-11-08","loc":"","mins":4,"body":["Using harbour sounds, hand-cranked drones and sparse synthesizers, the trio has given a dozen traditional shanties a hushed, strangely modern feel.","It is not for purists, but it is for anyone who thinks folk music should still be allowed to change."]},
    {"id":"s33","sec":"culture","tags":"books","title":"Books: five debut novels worth your winter","dek":"From a lighthouse mystery to a comic novel about a failing choir.","by":"Yasmin Okonkwo-Reid","date":"2026-11-07","loc":"","mins":6,"body":["This year’s debut fiction is unusually varied. Our five picks range from a slow-burn mystery set on a remote lighthouse to a warm comic novel about a village choir on the edge of collapse.","All five are available in paperback by the end of the month."]},
    {"id":"s34","sec":"culture","tags":"tv radio","title":"TV: why everyone is watching a drama about municipal planning","dek":"A slow, sharp series about zoning hearings has become an unlikely hit.","by":"Greta Lindqvist","date":"2026-11-06","loc":"","mins":5,"body":["The series follows a small-city planning board through a single contested development. Its tension comes from procedure, not plot twists, and it has found a devoted audience.","Viewers are posting about the \"public comment\" scenes more than about any cliffhanger."]},
    {"id":"s35","sec":"culture","tags":"games","title":"Games: a cosy game about running a lighthouse","dek":"You trim the lamp, repaint the stairs and answer letters from passing ships.","by":"Felix Aubrey","date":"2026-11-05","loc":"","mins":3,"body":["The game asks for patience rather than reflexes: wind the clockwork, repaint the stairs and write replies to the notes that arrive by boat.","It lasts about six hours and feels shorter."]},
    {"id":"s36","sec":"lifestyle","tags":"wellness","title":"Wellness: the case for walking meetings","dek":"Small studies suggest a short walk improves attention for the hour that follows.","by":"Maya Lindgren","date":"2026-11-09","loc":"","mins":4,"body":["Walking meetings work best with two or three people, a loop you do not need to think about, and an agenda short enough to remember.","They are not for every discussion, but several small studies suggest they leave people more alert afterwards."]},
    {"id":"s37","sec":"lifestyle","tags":"food recipes","title":"Food: one-pan suppers for short days","dek":"Five recipes that go from the cupboard to the table in under 40 minutes.","by":"Rosa Pellegrino","date":"2026-11-08","loc":"","mins":5,"body":["When the light disappears at four o’clock, supper should not need three pans. These five recipes use one roasting tin or one deep skillet, and make good leftovers.","Our favourite is a chickpea and squash traybake with a lemon-yoghurt sauce."]},
    {"id":"s38","sec":"lifestyle","tags":"travel","title":"Travel: sleeper trains for the winter-curious","dek":"Six overnight routes that turn the journey into the holiday.","by":"Hugo Tran","date":"2026-11-07","loc":"","mins":5,"body":["An overnight train replaces a flight, a hotel night and a taxi queue. We ride six routes, from a budget seat to a private cabin, and rate them for sleep.","Book early: the best cabins sell out weeks ahead."]},
    {"id":"s39","sec":"lifestyle","tags":"family","title":"Family: how to talk to teenagers about money","dek":"Start with their spending, not your rules, say financial educators.","by":"Priscilla Adeyemi","date":"2026-11-06","loc":"","mins":5,"body":["Educators suggest beginning with a teenager’s own purchases and asking what they were trying to get. Rules come later, once there is something to apply them to.","A shared savings goal, even a small one, makes the conversation concrete."]},
    {"id":"s40","sec":"lifestyle","tags":"home garden","title":"Home & garden: plant spring bulbs now","dek":"Late autumn is the last good window for tulips, and the right moment for alliums.","by":"Edmund Rask","date":"2026-11-05","loc":"","mins":4,"body":["Tulips go in the ground now, as the soil cools, while alliums and daffodils can go in a little earlier. Plant them at three times the bulb’s height.","Use a gritty mix if your soil stays wet, or the bulbs will rot before they flower."]}
  ];
  const SECTIONS = {
    'us-news': 'US news', politics: 'US politics', world: 'World', business: 'Business', technology: 'Technology',
    sport: 'Sport', opinion: 'Opinion', culture: 'Culture', lifestyle: 'Lifestyle'
  };
  const SECTION_PAGES = {
    'us-news': 'us-news.html', politics: 'us-politics.html', world: 'world.html', business: 'business.html',
    technology: 'technology.html', sport: 'sport.html', opinion: 'opinion.html', culture: 'culture.html', lifestyle: 'lifestyle.html'
  };
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmtDate = (iso) => new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
  const photoFor = (id) => 'assets/photo-' + ((parseInt(id.slice(1), 10) % 6) + 1) + '.svg';
  const byId = (id) => STORIES.find((s) => s.id === id);

  /* ---------- Expanded menu (mobile disclosure + desktop groups) ---------- */
  function initMenu() {
    const toggle = $('#menu-toggle');
    const panel = $('#site-menu');
    if (!toggle || !panel) return;
    toggle.hidden = false;
    const setOpen = (open) => {
      panel.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
    };
    setOpen(false);
    toggle.addEventListener('click', () => setOpen(panel.hidden));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !panel.hidden) {
        setOpen(false);
        toggle.focus();
      }
    });
    $$('.menu-group', panel).forEach((group) => {
      const btn = $('.grp-toggle', group);
      if (!btn) return;
      btn.hidden = false;
      group.classList.add('is-collapsed');
      btn.addEventListener('click', () => {
        const collapsed = group.classList.toggle('is-collapsed');
        btn.setAttribute('aria-expanded', String(!collapsed));
      });
    });
  }

  /* ---------- Tabs (Latest / Most read) ---------- */
  function initTabs() {
    $$('[data-component="content-tabs"]').forEach((root) => {
      const tabs = $$('[role="tab"]', root);
      const select = (tab, focus) => {
        tabs.forEach((t) => {
          const on = t === tab;
          t.setAttribute('aria-selected', String(on));
          t.tabIndex = on ? 0 : -1;
          $('#' + t.getAttribute('aria-controls')).hidden = !on;
        });
        if (focus) tab.focus();
      };
      select(tabs[0], false);
      tabs.forEach((tab, i) => {
        tab.addEventListener('click', () => select(tab, false));
        tab.addEventListener('keydown', (e) => {
          const move = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
          if (move) { e.preventDefault(); select(tabs[(i + move + tabs.length) % tabs.length], true); }
          if (e.key === 'Home') { e.preventDefault(); select(tabs[0], true); }
          if (e.key === 'End') { e.preventDefault(); select(tabs[tabs.length - 1], true); }
        });
      });
    });
  }

  /* ---------- Hide / Show front sections ---------- */
  function initHideButtons() {
    $$('.hide-btn').forEach((btn) => {
      const body = document.getElementById(btn.getAttribute('aria-controls'));
      btn.addEventListener('click', () => {
        const show = body.hidden;
        body.hidden = !show;
        btn.setAttribute('aria-expanded', String(show));
        btn.firstChild.nodeValue = show ? 'Hide' : 'Show';
      });
    });
  }

  /* ---------- Dialogs ---------- */
  function initDialogs() {
    let opener = null;
    $$('[data-open-dialog]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const dlg = document.getElementById(btn.dataset.openDialog);
        if (!dlg || typeof dlg.showModal !== 'function') return;
        opener = btn;
        if (btn.dataset.scopeName) $('[data-scope-name]', dlg).textContent = btn.dataset.scopeName;
        dlg.showModal();
      });
    });
    $$('dialog').forEach((dlg) => {
      $$('[data-close-dialog]', dlg).forEach((b) => b.addEventListener('click', () => dlg.close()));
      dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
      dlg.addEventListener('close', () => { if (opener) opener.focus(); });
    });
  }

  /* ---------- Form validation (demo only, nothing is sent) ---------- */
  function labelText(el) {
    const l = el.id && document.querySelector('label[for="' + el.id + '"]');
    return l ? l.textContent.trim().toLowerCase() : 'a value';
  }
  function initForms() {
    $$('form[data-validate]').forEach((form) => {
      const summary = $('.error-summary', form);
      const success = $('.form-success', form);
      const clear = () => {
        $$('.field-error', form).forEach((n) => n.remove());
        $$('[aria-invalid]', form).forEach((n) => n.removeAttribute('aria-invalid'));
        $$('[data-base-describedby]', form).forEach((n) => {
          const base = n.dataset.baseDescribedby;
          if (base) n.setAttribute('aria-describedby', base); else n.removeAttribute('aria-describedby');
        });
        summary.hidden = true;
        $('ul', summary).innerHTML = '';
      };
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        clear();
        success.textContent = '';
        const errors = [];
        $$('input[required], textarea[required], select[required]', form).forEach((el) => {
          if (el.type === 'radio' || el.type === 'checkbox') return;
          const v = el.value.trim();
          if (!v) errors.push({ el, msg: el.dataset.errorRequired || 'Enter ' + labelText(el) });
          else if (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) errors.push({ el, msg: 'Enter an email address in the correct format, like name@example.com' });
        });
        $$('fieldset[data-require-one]', form).forEach((fs) => {
          if (!$('input:checked', fs)) errors.push({ el: $('input', fs), group: fs, msg: fs.dataset.requireOne });
        });
        errors.sort((a, b) => (a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
        errors.forEach((err, i) => {
          const host = err.group || err.el.closest('.field');
          const p = document.createElement('p');
          p.className = 'field-error';
          p.id = 'err-' + (form.id || 'form') + '-' + i;
          p.textContent = err.msg;
          const target = err.group || err.el;
          target.dataset.baseDescribedby = target.getAttribute('aria-describedby') || '';
          target.setAttribute('aria-describedby', (target.dataset.baseDescribedby + ' ' + p.id).trim());
          if (!err.group) err.el.setAttribute('aria-invalid', 'true');
          if (err.group) host.insertBefore(p, host.children[1] || null); else host.append(p);
        });
        if (errors.length) {
          const ul = $('ul', summary);
          errors.forEach((err) => {
            if (!err.el.id) err.el.id = 'fld-' + Math.random().toString(36).slice(2, 8);
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#' + err.el.id;
            a.textContent = err.msg;
            a.addEventListener('click', (ev) => { ev.preventDefault(); err.el.focus(); });
            li.append(a);
            ul.append(li);
          });
          summary.hidden = false;
          summary.focus();
          return;
        }
        form.reset();
        success.textContent = (form.dataset.success || 'Done.') + ' This is a demo: nothing was sent or saved.';
      });
    });
  }

  /* ---------- Search results page ---------- */
  function cardHtml(s, text) {
    return '<article class="card' + (text ? ' card--text' : '') + '" data-component="story-card"><img src="' + photoFor(s.id) + '" alt="" width="640" height="400" loading="lazy">' +
      '<div><p class="card__kicker">' + esc(SECTIONS[s.sec]) + '</p><h3 class="card__title"><a href="article.html?id=' + s.id + '">' + esc(s.title) + '</a></h3>' +
      '<p class="card__dek">' + esc(s.dek) + '</p><p class="card__meta"><time datetime="' + s.date + '">' + fmtDate(s.date) + '</time> &middot; ' + s.mins + ' min read</p></div></article>';
  }
  function initSearch() {
    const root = $('[data-component="search-results"]');
    if (!root) return;
    const params = new URLSearchParams(location.search);
    const q = (params.get('q') || '').trim();
    const sec = params.get('sec') || '';
    const sort = params.get('sort') === 'newest' ? 'newest' : 'relevance';
    $('#q').value = q;
    $('#sec').value = SECTIONS[sec] ? sec : '';
    $('#sort').value = sort;
    const status = $('#search-status');
    const list = $('#search-results');
    const empty = $('#search-empty');
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) {
      status.textContent = 'Enter a search term to search the sample archive.';
      empty.hidden = false;
      empty.innerHTML = '<p><strong>No search yet.</strong> Try one of: <a href="search.html?q=flood">flood</a>, <a href="search.html?q=climate">climate</a>, <a href="search.html?q=film">film</a>, <a href="search.html?q=soccer">soccer</a>.</p>';
      document.title = 'Search | The Larkfield Dispatch';
      return;
    }
    let hits = STORIES.map((s) => {
      const hay = (s.title + ' ' + s.dek + ' ' + s.by + ' ' + s.tags + ' ' + SECTIONS[s.sec] + ' ' + s.body.join(' ')).toLowerCase();
      const score = terms.reduce((n, t) => (hay.includes(t) ? n + (s.title.toLowerCase().includes(t) ? 3 : 1) : -1000), 0);
      return { s, score };
    }).filter((h) => h.score > 0 && (!sec || h.s.sec === sec));
    hits.sort((a, b) => (sort === 'newest' ? b.s.date.localeCompare(a.s.date) : b.score - a.score || b.s.date.localeCompare(a.s.date)));
    document.title = 'Search: ' + q + ' | The Larkfield Dispatch';
    status.textContent = hits.length + (hits.length === 1 ? ' result' : ' results') + ' for “' + q + '”' + (sec ? ' in ' + SECTIONS[sec] : '') + ', sorted by ' + sort + '.';
    if (!hits.length) {
      empty.hidden = false;
      empty.innerHTML = '<p><strong>No stories match “' + esc(q) + '”.</strong> Check the spelling, use fewer words, or remove the section filter. This replica searches about 40 sample stories only.</p>';
      return;
    }
    list.innerHTML = hits.map((h) => '<li>' + cardHtml(h.s, true) + '</li>').join('');
  }

  /* ---------- Article page ---------- */
  function initArticle() {
    const root = $('[data-component="article"]');
    if (!root) return;
    const id = new URLSearchParams(location.search).get('id');
    if (!id || id === root.dataset.storyId) return;
    const s = byId(id);
    if (!s) {
      root.innerHTML = '<h1>Story not found</h1><div class="empty-state"><p>There is no sample story with the id “' + esc(id) + '”. <a href="index.html">Return to the front page</a> or <a href="search.html">search the sample archive</a>.</p></div>';
      document.title = 'Story not found | The Larkfield Dispatch';
      return;
    }
    document.title = s.title + ' | The Larkfield Dispatch';
    const tags = s.tags.split(' ').map((t) => '<li><a href="search.html?q=' + encodeURIComponent(t) + '">' + esc(t) + '</a></li>').join('');
    const related = STORIES.filter((r) => r.sec === s.sec && r.id !== s.id).slice(0, 3)
      .map((r) => '<li><a href="article.html?id=' + r.id + '">' + esc(r.title) + '</a></li>').join('');
    root.dataset.storyId = s.id;
    root.innerHTML =
      '<p class="article__kicker"><a href="' + SECTION_PAGES[s.sec] + '">' + esc(SECTIONS[s.sec]) + '</a></p>' +
      '<h1>' + esc(s.title) + '</h1><p class="article__standfirst">' + esc(s.dek) + '</p>' +
      '<div class="meta" data-component="byline"><span>By <strong><a rel="author" href="search.html?q=' + encodeURIComponent(s.by) + '">' + esc(s.by) + '</a></strong></span>' +
      '<span>' + (s.loc ? '<span class="dateline">' + esc(s.loc) + '</span> &middot; ' : '') + '<time datetime="' + s.date + '">' + fmtDate(s.date) + '</time></span><span>' + s.mins + ' min read</span><a href="#comments">Comments</a></div>' +
      '<figure><img src="' + photoFor(s.id) + '" alt="Abstract placeholder illustration standing in for the story photograph" width="640" height="400"><figcaption>Placeholder graphic. No photograph is used in this replica.</figcaption></figure>' +
      '<div class="article__body">' + s.body.map((p) => '<p>' + esc(p) + '</p>').join('') + '</div>' +
      '<ul class="tag-list" aria-label="Topics">' + tags + '</ul>' +
      (related ? '<aside class="richlink" aria-labelledby="related-title" data-section="related-stories" data-component="rich-link-list"><h2 id="related-title">Related</h2><ul>' + related + '</ul></aside>' : '');
  }

  /* ---------- Crossword clue check ---------- */
  function initClue() {
    const form = $('#clue-form');
    if (!form) return;
    const input = $('#clue-answer');
    const out = $('#clue-result');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const v = input.value.trim().toUpperCase().replace(/[^A-Z]/g, '');
      input.removeAttribute('aria-invalid');
      if (!v) {
        input.setAttribute('aria-invalid', 'true');
        out.textContent = 'Error: type a five-letter answer first.';
        input.focus();
      } else if (v.length !== 5) {
        input.setAttribute('aria-invalid', 'true');
        out.textContent = 'Error: the answer has five letters; you typed ' + v.length + '.';
        input.focus();
      } else {
        out.textContent = v === 'TIDAL' ? 'Correct: TIDAL.' : 'Not quite. Try again or open the hint.';
      }
    });
  }

  initMenu();
  initTabs();
  initHideButtons();
  initDialogs();
  initForms();
  initSearch();
  initArticle();
  initClue();
})();
