/* Harbor Ridge Church (fictional) - CHUR-01 replica. Vanilla JS, no network use; all data is inline sample data. */
const DATA = {
 "campuses": [
  {
   "id": "bayfront",
   "name": "Bayfront",
   "city": "Bayfront",
   "address": "2210 Lantern Way, Bayfront",
   "times": "Sat 5:00 PM; Sun 8:30 AM, 10:30 AM",
   "features": [
    "Kids",
    "Students",
    "Spanish service",
    "Saturday evening"
   ],
   "note": "Main campus"
  },
  {
   "id": "cedar-hollow",
   "name": "Cedar Hollow",
   "city": "Cedar Hollow",
   "address": "48 Millrace Road, Cedar Hollow",
   "times": "Sun 9:00 AM, 11:00 AM",
   "features": [
    "Kids",
    "Students"
   ],
   "note": ""
  },
  {
   "id": "north-pines",
   "name": "North Pines",
   "city": "North Pines",
   "address": "915 Alder Court, North Pines",
   "times": "Sun 10:00 AM",
   "features": [
    "Kids"
   ],
   "note": ""
  },
  {
   "id": "stonebridge",
   "name": "Stonebridge",
   "city": "Stonebridge",
   "address": "7 Quarry Street, Stonebridge",
   "times": "Sat 6:00 PM; Sun 10:00 AM",
   "features": [
    "Kids",
    "Spanish service",
    "Saturday evening"
   ],
   "note": ""
  },
  {
   "id": "lakeview",
   "name": "Lakeview",
   "city": "Lakeview",
   "address": "3300 Heron Drive, Lakeview",
   "times": "Sun 9:30 AM, 11:15 AM",
   "features": [
    "Kids",
    "Students"
   ],
   "note": ""
  },
  {
   "id": "riverbend",
   "name": "Riverbend",
   "city": "Riverbend",
   "address": "120 Ferry Landing Road, Riverbend",
   "times": "Sun 10:30 AM",
   "features": [
    "Kids",
    "Spanish service"
   ],
   "note": ""
  },
  {
   "id": "sunset-mesa",
   "name": "Sunset Mesa",
   "city": "Sunset Mesa",
   "address": "5602 Terrace View, Sunset Mesa",
   "times": "Sun 9:00 AM",
   "features": [
    "Students"
   ],
   "note": ""
  },
  {
   "id": "online",
   "name": "Online",
   "city": "Anywhere",
   "address": "Watch from home on this website",
   "times": "Sun 10:00 AM and 6:00 PM",
   "features": [],
   "note": "Online campus"
  }
 ],
 "sermons": [
  {
   "title": "Learning to Rest",
   "series": "Steady Ground",
   "topic": "Hope",
   "speaker": "Maya Okafor",
   "date": "2026-11-08",
   "minutes": 38,
   "summary": "Why slowing down is an act of trust, and three small habits that make room for it."
  },
  {
   "title": "Still Waters, Busy Week",
   "series": "Steady Ground",
   "topic": "Faith",
   "speaker": "Daniel Reyes",
   "date": "2026-11-01",
   "minutes": 34,
   "summary": "Finding calm inside a full calendar rather than waiting for a quiet season."
  },
  {
   "title": "A Foundation You Can Stand On",
   "series": "Steady Ground",
   "topic": "Hope",
   "speaker": "Maya Okafor",
   "date": "2026-10-25",
   "minutes": 41,
   "summary": "What holds when plans fall apart, told through a story of a flooded basement."
  },
  {
   "title": "Seats at the Table",
   "series": "Come to the Table",
   "topic": "Relationships",
   "speaker": "Lena Hartmann",
   "date": "2026-10-18",
   "minutes": 36,
   "summary": "Hospitality as a daily practice: who is missing from your table?"
  },
  {
   "title": "Forgiving at Dinner Time",
   "series": "Come to the Table",
   "topic": "Relationships",
   "speaker": "Lena Hartmann",
   "date": "2026-10-11",
   "minutes": 39,
   "summary": "Practical steps for repairing a strained family relationship."
  },
  {
   "title": "Enough to Share",
   "series": "Come to the Table",
   "topic": "Generosity",
   "speaker": "Isaac Bell",
   "date": "2026-10-04",
   "minutes": 33,
   "summary": "A look at generosity that starts with what is already in your hands."
  },
  {
   "title": "Carry a Light",
   "series": "Lanterns",
   "topic": "Faith",
   "speaker": "Maya Okafor",
   "date": "2026-09-27",
   "minutes": 42,
   "summary": "Faith as a small lamp for the next few steps, not a floodlight for the whole road."
  },
  {
   "title": "Lanterns in the Dark Hours",
   "series": "Lanterns",
   "topic": "Hope",
   "speaker": "Daniel Reyes",
   "date": "2026-09-20",
   "minutes": 37,
   "summary": "Encouragement for people walking through grief, illness, or long waits."
  },
  {
   "title": "Passing the Flame",
   "series": "Lanterns",
   "topic": "Relationships",
   "speaker": "Isaac Bell",
   "date": "2026-09-13",
   "minutes": 35,
   "summary": "Mentoring across generations and why it changes both people."
  },
  {
   "title": "Open Hands",
   "series": "Lanterns",
   "topic": "Generosity",
   "speaker": "Lena Hartmann",
   "date": "2026-09-06",
   "minutes": 31,
   "summary": "Giving time, skills, and money without keeping score."
  },
  {
   "title": "Questions Worth Asking",
   "series": "Lanterns",
   "topic": "Faith",
   "speaker": "Maya Okafor",
   "date": "2026-08-30",
   "minutes": 40,
   "summary": "Doubt, curiosity, and honest questions in a community of faith."
  },
  {
   "title": "The Long Way Home",
   "series": "Summer Stories",
   "topic": "Hope",
   "speaker": "Daniel Reyes",
   "date": "2026-08-23",
   "minutes": 36,
   "summary": "A retelling of the prodigal story with attention to the waiting parent."
  },
  {
   "title": "Neighbors",
   "series": "Summer Stories",
   "topic": "Relationships",
   "speaker": "Isaac Bell",
   "date": "2026-08-16",
   "minutes": 32,
   "summary": "Practical ways to know the people on your street."
  },
  {
   "title": "Small Seeds",
   "series": "Summer Stories",
   "topic": "Faith",
   "speaker": "Lena Hartmann",
   "date": "2026-08-09",
   "minutes": 34,
   "summary": "Patience, growth, and why the smallest steps count."
  }
 ],
 "events": [
  {
   "title": "Harvest Pancake Breakfast",
   "date": "2026-11-14",
   "time": "8:30 AM",
   "campus": "Cedar Hollow",
   "category": "Family",
   "description": "Pancakes, fruit, and games for all ages. Free; bring a neighbor."
  },
  {
   "title": "Newcomers Lunch",
   "date": "2026-11-15",
   "time": "12:15 PM",
   "campus": "Bayfront",
   "category": "Classes",
   "description": "A relaxed lunch with pastors for anyone new in the last six months."
  },
  {
   "title": "Food Pantry Pack Day",
   "date": "2026-11-21",
   "time": "9:00 AM",
   "campus": "Lakeview",
   "category": "Service",
   "description": "Pack grocery boxes with the neighborhood pantry team. Ages 10 and up."
  },
  {
   "title": "Student Night: Game Show",
   "date": "2026-11-18",
   "time": "6:30 PM",
   "campus": "Bayfront",
   "category": "Students",
   "description": "Grades 6-12. Snacks, teams, and a short talk."
  },
  {
   "title": "Thanksgiving Eve Worship",
   "date": "2026-11-25",
   "time": "7:00 PM",
   "campus": "All campuses",
   "category": "Worship",
   "description": "A short evening of songs, readings, and gratitude at every campus."
  },
  {
   "title": "Grief and Holidays Workshop",
   "date": "2026-12-03",
   "time": "6:30 PM",
   "campus": "North Pines",
   "category": "Care",
   "description": "A gentle evening for anyone facing the holidays after a loss."
  },
  {
   "title": "Advent Candle Walk",
   "date": "2026-12-06",
   "time": "5:00 PM",
   "campus": "Riverbend",
   "category": "Worship",
   "description": "An outdoor walk with lanterns, carols, and warm cider."
  },
  {
   "title": "Parents of Teens Panel",
   "date": "2026-12-09",
   "time": "7:00 PM",
   "campus": "Stonebridge",
   "category": "Classes",
   "description": "Four parents share what has and has not worked. Childcare provided."
  },
  {
   "title": "Toy and Coat Drive Sort",
   "date": "2026-12-12",
   "time": "10:00 AM",
   "campus": "Sunset Mesa",
   "category": "Service",
   "description": "Sort and wrap donations for local families."
  },
  {
   "title": "Christmas Eve Services",
   "date": "2026-12-24",
   "time": "4:00 PM and 6:00 PM",
   "campus": "All campuses",
   "category": "Worship",
   "description": "Candlelight services for the whole family. Doors open 30 minutes early."
  },
  {
   "title": "Winter Retreat Sign-Up Night",
   "date": "2027-01-08",
   "time": "6:30 PM",
   "campus": "Lakeview",
   "category": "Students",
   "description": "Learn about the winter retreat and ask questions. Registration is not part of this demo."
  },
  {
   "title": "New Year Prayer Gathering",
   "date": "2027-01-02",
   "time": "9:00 AM",
   "campus": "All campuses",
   "category": "Care",
   "description": "Start the year in quiet prayer, with open sessions every hour."
  }
 ],
 "groups": [
  {
   "name": "Table Talk",
   "type": "Study",
   "day": "Monday",
   "time": "7:00 PM",
   "campus": "Bayfront",
   "format": "In person",
   "audience": "Adults",
   "description": "Weekly discussion of the current sermon series over dessert."
  },
  {
   "name": "Early Risers",
   "type": "Study",
   "day": "Wednesday",
   "time": "6:15 AM",
   "campus": "Cedar Hollow",
   "format": "In person",
   "audience": "Adults",
   "description": "Coffee and a short study before work."
  },
  {
   "name": "Steady Hearts",
   "type": "Support",
   "day": "Tuesday",
   "time": "6:30 PM",
   "campus": "North Pines",
   "format": "In person",
   "audience": "Adults",
   "description": "A confidential group for people navigating grief and loss."
  },
  {
   "name": "Evening Exhale",
   "type": "Support",
   "day": "Thursday",
   "time": "8:00 PM",
   "campus": "Online",
   "format": "Online",
   "audience": "Adults",
   "description": "Online check-in for people managing anxiety and stress."
  },
  {
   "name": "Twenties on Tap",
   "type": "Young adults",
   "day": "Friday",
   "time": "7:30 PM",
   "campus": "Lakeview",
   "format": "In person",
   "audience": "Ages 20-29",
   "description": "Games, food, and honest conversation."
  },
  {
   "name": "Date Night Basics",
   "type": "Couples",
   "day": "Saturday",
   "time": "6:00 PM",
   "campus": "Stonebridge",
   "format": "In person",
   "audience": "Couples",
   "description": "Monthly dinner and a practical conversation starter for couples."
  },
  {
   "name": "Iron and Oak",
   "type": "Men",
   "day": "Tuesday",
   "time": "6:00 AM",
   "campus": "Riverbend",
   "format": "In person",
   "audience": "Men",
   "description": "Breakfast and accountability for men of all ages."
  },
  {
   "name": "Wellspring",
   "type": "Women",
   "day": "Wednesday",
   "time": "9:30 AM",
   "campus": "Bayfront",
   "format": "In person",
   "audience": "Women",
   "description": "Morning group with childcare available."
  },
  {
   "name": "Sunday Seeds",
   "type": "Parents",
   "day": "Sunday",
   "time": "12:30 PM",
   "campus": "Sunset Mesa",
   "format": "In person",
   "audience": "Parents",
   "description": "Lunch and conversation for parents of young children."
  },
  {
   "name": "Home Base Online",
   "type": "Study",
   "day": "Monday",
   "time": "8:30 PM",
   "campus": "Online",
   "format": "Online",
   "audience": "Adults",
   "description": "A video-call study group for people who cannot attend in person."
  }
 ],
 "serve": [
  {
   "team": "Welcome Team",
   "area": "Welcome",
   "campus": "All campuses",
   "commitment": "Twice a month",
   "description": "Greet guests, hand out programs, and help people find their way."
  },
  {
   "team": "Kids Check-In",
   "area": "Kids",
   "campus": "Bayfront",
   "commitment": "Weekly",
   "description": "Help families check in and keep the children’s area safe and friendly."
  },
  {
   "team": "Sound and Lights",
   "area": "Music and tech",
   "campus": "Cedar Hollow",
   "commitment": "Twice a month",
   "description": "Run the sound board or lighting. Training is provided."
  },
  {
   "team": "Worship Band",
   "area": "Music and tech",
   "campus": "Lakeview",
   "commitment": "Weekly",
   "description": "Open to vocalists and instrumentalists. Short audition required."
  },
  {
   "team": "Meal Train",
   "area": "Care",
   "campus": "All campuses",
   "commitment": "Occasional",
   "description": "Prepare and deliver meals to families in a hard season."
  },
  {
   "team": "Neighborhood Pantry",
   "area": "Community",
   "campus": "Stonebridge",
   "commitment": "Monthly",
   "description": "Sort donations and pack boxes for neighborhood families."
  },
  {
   "team": "Student Small Group Leaders",
   "area": "Students",
   "campus": "North Pines",
   "commitment": "Weekly",
   "description": "Lead a small group of middle or high school students."
  },
  {
   "team": "Parking and Traffic",
   "area": "Welcome",
   "campus": "Riverbend",
   "commitment": "Twice a month",
   "description": "Direct cars and welcome people on the way in."
  }
 ],
 "jobs": [
  {
   "title": "Worship Coordinator",
   "department": "Worship",
   "campus": "Bayfront",
   "type": "Full-time",
   "summary": "Plan weekly setlists, schedule volunteers, and support the worship leaders."
  },
  {
   "title": "Children’s Ministry Associate",
   "department": "Kids",
   "campus": "Lakeview",
   "type": "Part-time",
   "summary": "Support lesson planning and volunteer coaching for weekend kids programs."
  },
  {
   "title": "Facilities Technician",
   "department": "Operations",
   "campus": "Cedar Hollow",
   "type": "Full-time",
   "summary": "Keep buildings safe, clean, and ready for weekend services."
  },
  {
   "title": "Care Ministry Coordinator",
   "department": "Care",
   "campus": "North Pines",
   "type": "Full-time",
   "summary": "Coordinate volunteers who provide meals, visits, and follow-up."
  },
  {
   "title": "Video Editor",
   "department": "Communications",
   "campus": "Bayfront",
   "type": "Part-time",
   "summary": "Edit weekly messages and short stories for the website and app."
  },
  {
   "title": "Campus Administrator",
   "department": "Operations",
   "campus": "Riverbend",
   "type": "Full-time",
   "summary": "Welcome visitors, manage calendars, and support the campus pastor."
  }
 ]
};

(function () {
  'use strict';
  document.documentElement.classList.add('js');

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmtDate = (d) => new Date(d + 'T00:00:00Z').toLocaleDateString('en-US', { timeZone: 'UTC', month: 'short', day: 'numeric', year: 'numeric' });

  /* ---------- disclosure buttons: nav menu, mega menu, language menu ---------- */
  function setOpen(btn, open) {
    btn.setAttribute('aria-expanded', String(open));
    document.getElementById(btn.dataset.toggle).classList.toggle('open', open);
  }
  const toggles = $$('[data-toggle]');
  toggles.forEach((btn) => btn.addEventListener('click', () => setOpen(btn, btn.getAttribute('aria-expanded') !== 'true')));
  const closeAll = (except) => toggles.forEach((b) => b !== except && b.getAttribute('aria-expanded') === 'true' && setOpen(b, false));
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    // Native <dialog> handles its own Escape; here we only close open menus and return focus.
    const open = toggles.filter((b) => b.getAttribute('aria-expanded') === 'true' && b.offsetParent !== null);
    if (!open.length) return;
    open.forEach((b) => setOpen(b, false));
    open[open.length - 1].focus();
  });
  document.addEventListener('click', (e) => {
    toggles.forEach((b) => {
      const panel = document.getElementById(b.dataset.toggle);
      if (b.getAttribute('aria-expanded') === 'true' && !panel.contains(e.target) && !b.contains(e.target)) setOpen(b, false);
    });
  });
  document.addEventListener('focusin', (e) => {
    toggles.forEach((b) => {
      const panel = document.getElementById(b.dataset.toggle);
      if (b.getAttribute('aria-expanded') === 'true' && !panel.contains(e.target) && !b.contains(e.target)) setOpen(b, false);
    });
  });

  /* Language menu: demo only, the site has English pages only. */
  $$('[data-lang]').forEach((b) => b.addEventListener('click', () => {
    const toggle = $('#lang-toggle');
    setOpen(toggle, false);
    toggle.focus();
    $('#lang-status').textContent = b.dataset.lang === 'English'
      ? 'Language is English.'
      : 'Demo only: translated pages are not included in this replica. The site stays in English.';
  }));

  /* ---------- dialog ---------- */
  $$('[data-open-dialog]').forEach((b) => b.addEventListener('click', () => {
    const dlg = document.getElementById(b.dataset.openDialog);
    closeAll();
    dlg.showModal();
    const first = $('input', dlg);
    if (first) first.focus();
  }));
  $$('dialog').forEach((dlg) => {
    $$('[data-close-dialog]', dlg).forEach((b) => b.addEventListener('click', () => dlg.close()));
    dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  });

  /* ---------- form validation (client-side, demo success only) ---------- */
  function labelOf(el) {
    const src = el.closest('fieldset') && el.type === 'radio' ? el.closest('fieldset').querySelector('legend') : el.labels && el.labels[0];
    if (!src) return el.name;
    const c = src.cloneNode(true);
    $$('.req', c).forEach((n) => n.remove());
    return c.textContent.trim();
  }
  function problem(el) {
    const v = el.validity;
    if (v.valueMissing) return el.tagName === 'SELECT' ? 'choose an option.' : 'this field is required.';
    if (v.typeMismatch) return 'enter a valid email address, for example name@example.org.';
    if (v.badInput) return 'enter a number.';
    if (v.rangeUnderflow || v.rangeOverflow) return `enter a number from ${el.min} to ${el.max}.`;
    if (el.minLength > 0 && el.value.length < el.minLength) return `enter at least ${el.minLength} characters.`;
    return '';
  }
  function setError(group, msg, controls) {
    const err = $('.field-error', group);
    err.textContent = msg;
    err.hidden = !msg;
    group.classList.toggle('invalid', !!msg);
    controls.forEach((c) => (msg ? c.setAttribute('aria-invalid', 'true') : c.removeAttribute('aria-invalid')));
  }
  function validateForm(form) {
    const errors = [];
    $$('.field', form).forEach((group) => {
      if (group.tagName === 'FIELDSET') {
        const radiosIn = $$('input[type=radio]', group);
        const bad = group.hasAttribute('data-required') && !radiosIn.some((r) => r.checked);
        const msg = bad ? `${labelOf(radiosIn[0])}: choose one option.` : '';
        setError(group, msg, radiosIn);
        if (bad) errors.push({ msg, target: radiosIn[0] });
        return;
      }
      const ctl = $('input:not([type=checkbox]), select, textarea', group);
      if (!ctl) return;
      const p = problem(ctl);
      const msg = p ? `${labelOf(ctl)}: ${p}` : '';
      setError(group, msg, [ctl]);
      if (msg) errors.push({ msg, target: ctl });
    });
    return errors;
  }
  function successText(form) {
    if (form.id !== 'giving-form') return form.dataset.success;
    const f = new FormData(form);
    return `Demo only: no payment was processed, nothing was saved, and no receipt was emailed. Your selection: $${Number(f.get('amount')).toFixed(2)} (${f.get('frequency')}) to ${f.get("fund")} at ${f.get('campus')}.`;
  }
  $$('form[data-validate]').forEach((form) => {
    const summary = $('.error-summary', form);
    const success = $('.form-success', form);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      success.hidden = true;
      const errors = validateForm(form);
      if (errors.length) {
        $('ul', summary).innerHTML = errors.map((x, i) => `<li><a href="#${x.target.id}" data-err="${i}">${esc(x.msg)}</a></li>`).join('');
        $$('a', summary).forEach((a, i) => a.addEventListener('click', (ev) => { ev.preventDefault(); errors[i].target.focus(); }));
        summary.hidden = false;
        summary.focus();
        return;
      }
      summary.hidden = true;
      success.textContent = successText(form);
      success.hidden = false;
      form.reset();
      success.focus();
    });
    // Clear a field's error as soon as the person edits it.
    form.addEventListener('input', (e) => {
      const group = e.target.closest('.field');
      if (group && group.classList.contains('invalid') && !problem(e.target)) setError(group, '', [e.target]);
    });
  });
  $$('[data-amount]').forEach((b) => b.addEventListener('click', () => {
    const input = $('#give-amount');
    input.value = b.dataset.amount;
    input.focus();
  }));

  /* ---------- filterable lists ---------- */
  const li = (cls, inner) => `<li class="${cls}">${inner}</li>`;
  const pills = (arr) => (arr.length ? `<p class="pills">${arr.map((a) => `<span class="pill">${esc(a)}</span>`).join('')}</p>` : '');
  const RENDER = {
    campuses: (c) => li('card', `<img src="assets/campus.svg" alt="" width="320" height="140" loading="lazy"><div class="card-body"><h3>${esc(c.name)}${c.note ? ` <span class="tag">${esc(c.note)}</span>` : ''}</h3><p>${esc(c.address)}</p><p><strong>Services:</strong> ${esc(c.times)}</p>${pills(c.features)}<a class="card-link" href="contact.html?topic=visit">Plan a visit<span class="sr-only"> to ${esc(c.name)}</span></a></div>`),
    sermons: (s) => li('result', `<h3>${esc(s.title)}</h3><p class="meta">${esc(s.series)} &middot; ${esc(s.topic)} &middot; ${esc(s.speaker)} &middot; ${fmtDate(s.date)} &middot; ${s.minutes} min</p><details><summary>Summary<span class="sr-only"> of ${esc(s.title)}</span></summary><p>${esc(s.summary)}</p></details>`),
    events: (e) => li('result', `<h3>${esc(e.title)}</h3><p class="meta">${fmtDate(e.date)} &middot; ${esc(e.time)} &middot; ${esc(e.campus)} &middot; ${esc(e.category)}</p><p>${esc(e.description)}</p>`),
    groups: (g) => li('result', `<h3>${esc(g.name)}</h3><p class="meta">${esc(g.type)} &middot; ${esc(g.day)}s at ${esc(g.time)} &middot; ${esc(g.campus)} &middot; ${esc(g.format)} &middot; ${esc(g.audience)}</p><p>${esc(g.description)}</p><a class="card-link" href="contact.html?topic=group">Ask to join<span class="sr-only"> ${esc(g.name)}</span></a>`),
    serve: (s) => li('result', `<h3>${esc(s.team)}</h3><p class="meta">${esc(s.area)} &middot; ${esc(s.campus)} &middot; ${esc(s.commitment)}</p><p>${esc(s.description)}</p><a class="card-link" href="contact.html?topic=serve">Ask about this team<span class="sr-only">: ${esc(s.team)}</span></a>`),
    jobs: (j) => li('result', `<h3>${esc(j.title)}</h3><p class="meta">${esc(j.department)} &middot; ${esc(j.campus)} &middot; ${esc(j.type)}</p><p>${esc(j.summary)}</p><a class="card-link" href="contact.html?topic=other">Ask about this role<span class="sr-only">: ${esc(j.title)}</span></a>`),
  };
  const SORT = {
    newest: (a, b) => b.date.localeCompare(a.date),
    oldest: (a, b) => a.date.localeCompare(b.date),
    title: (a, b) => a.title.localeCompare(b.title),
    date: (a, b) => a.date.localeCompare(b.date),
  };
  const DEFAULT_SORT = { sermons: 'newest', events: 'date' };

  function initFilter(form) {
    const source = form.dataset.source;
    const items = DATA[source];
    const out = $('#results');
    const count = $('#result-count');
    const params = new URLSearchParams(location.search);
    $$('[name]', form).forEach((c) => { if (params.has(c.name)) c.value = params.get(c.name); });

    function update() {
      const v = {};
      $$('[name]', form).forEach((c) => { v[c.name] = c.value.trim(); });
      const q = (v.q || '').toLowerCase();
      let list = items.filter((item) => {
        if (q && !Object.values(item).flat().join(' ').toLowerCase().includes(q)) return false;
        if (v.from && item.date && item.date < v.from) return false;
        return Object.keys(v).every((k) => {
          if (!v[k] || ['q', 'from', 'sort'].includes(k)) return true;
          const val = item[k];
          return Array.isArray(val) ? val.includes(v[k]) : val === v[k] || val === 'All campuses';
        });
      });
      const sort = SORT[v.sort] || SORT[DEFAULT_SORT[source]];
      if (sort) list = list.slice().sort(sort);
      const n = list.length;
      count.textContent = `Showing ${n} of ${items.length} ${form.dataset.noun}`;
      if (!n) {
        out.innerHTML = `<div class="empty-state"><p><strong>No ${esc(form.dataset.noun)} match those filters.</strong></p><p>Try a different keyword or clear the filters.</p><button type="button" class="btn btn-secondary" data-clear>Clear filters</button></div>`;
        $('[data-clear]', out).addEventListener('click', () => { form.reset(); update(); $('input,select', form).focus(); });
        return;
      }
      const wrap = source === 'campuses' ? 'cards' : 'result-list';
      out.innerHTML = `<ul class="${wrap}">${list.map(RENDER[source]).join('')}</ul>`;
    }
    form.addEventListener('input', update);
    form.addEventListener('submit', (e) => { e.preventDefault(); update(); });
    form.addEventListener('reset', () => setTimeout(update));
    update();
  }
  $$('form[data-source]').forEach(initFilter);

  /* ---------- query-string prefill for the contact form topic ---------- */
  const topic = new URLSearchParams(location.search).get('topic');
  const topicSelect = $('#contact-topic');
  if (topic && topicSelect && $$('option', topicSelect).some((o) => o.value === topic)) topicSelect.value = topic;
})();
