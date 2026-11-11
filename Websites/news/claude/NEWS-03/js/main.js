/* Larkspur Public Media (NEWS-03): vanilla JS for a static research replica. All data is inline; nothing is fetched or sent. */
(function () {
 'use strict';
 document.documentElement.classList.add('js');
 const $ = (s, r = document) => r.querySelector(s);
 const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
 const SEARCH_DATA = [
 {
  "t": "Flood-control vote splits river counties as autumn storms return",
  "d": "A $1.4 billion levee plan passed the state senate by one vote, and the counties that would pay for it are not done arguing.",
  "u": "article.html",
  "k": "audio",
  "s": "National",
  "dt": "2026-11-09",
  "a": "Marisol Quint",
  "g": "levee flood storms infrastructure marisol quint"
 },
 {
  "t": "Why the harbor’s oldest ferry route may go quiet by spring",
  "d": "Rising fuel costs and a retiring fleet leave a commuter lifeline with two boats and no replacement budget.",
  "u": "audio-story.html",
  "k": "audio",
  "s": "National",
  "dt": "2026-11-09",
  "a": "Dev Anand Okoro",
  "g": "transit ferry harbor commuters dev anand okoro"
 },
 {
  "t": "Budget talks stall in the senate over a school-meals rider",
  "d": "Negotiators say a short stopgap is likely, but neither side has agreed on what rides along with it.",
  "u": "article.html?story=senate-budget-talks",
  "k": "story",
  "s": "Politics",
  "dt": "2026-11-10",
  "a": "Imogen Hartwell",
  "g": "congress budget senate schools imogen hartwell"
 },
 {
  "t": "Three candidates, one stage: what the governor’s debate did and did not settle",
  "d": "Water rights and rural broadband drew the sharpest exchanges in a tightly timed hour.",
  "u": "article.html?story=governor-race-debate",
  "k": "audio",
  "s": "Elections",
  "dt": "2026-11-10",
  "a": "Tomas Reyes-Bell",
  "g": "governor debate candidates ballot tomas reyes-bell"
 },
 {
  "t": "County clerks begin a recount on a transit tax measure decided by 212 votes",
  "d": "The hand count is expected to take through the weekend; observers from both campaigns are on site.",
  "u": "article.html?story=ballot-measure-recount",
  "k": "story",
  "s": "Elections",
  "dt": "2026-11-09",
  "a": "Priya Nandakumar",
  "g": "recount ballot measure county clerks priya nandakumar"
 },
 {
  "t": "Rural clinics cut wait times with a shared scheduling pilot",
  "d": "Four counties pooled appointment slots. Early numbers are encouraging, and the caveats are real.",
  "u": "article.html?story=clinic-wait-times",
  "k": "audio",
  "s": "Health",
  "dt": "2026-11-08",
  "a": "Helena Voss",
  "g": "clinics rural scheduling helena voss"
 },
 {
  "t": "Flu season arrives early, and pharmacies are the first to feel it",
  "d": "Pharmacists describe a month of shortages in children’s medicine and a rush on same-day shots.",
  "u": "article.html?story=flu-season-early",
  "k": "story",
  "s": "Health",
  "dt": "2026-11-10",
  "a": "Nia Abernathy",
  "g": "flu pharmacies vaccines nia abernathy"
 },
 {
  "t": "A small study links later school start times to steadier teenage sleep",
  "d": "Researchers followed 340 students for two years. The effect was modest and consistent.",
  "u": "article.html?story=sleep-teen-study",
  "k": "story",
  "s": "Science",
  "dt": "2026-11-07",
  "a": "Helena Voss",
  "g": "sleep teenagers school research study helena voss"
 },
 {
  "t": "Restored wetlands soak up more storm water than engineers predicted",
  "d": "A decade after volunteers replanted a delta, measurements show a buffer worth millions in avoided damage.",
  "u": "article.html?story=wetland-restoration",
  "k": "audio",
  "s": "Climate",
  "dt": "2026-11-08",
  "a": "Ayo Fenwick",
  "g": "wetlands storm water restoration delta ayo fenwick"
 },
 {
  "t": "Heat-pump rebates are running out in three states",
  "d": "Installers report a rush of orders. Program managers say the money was always meant to be a bridge.",
  "u": "article.html?story=heat-pump-rebates",
  "k": "story",
  "s": "Climate",
  "dt": "2026-11-06",
  "a": "Ayo Fenwick",
  "g": "heat pumps rebates energy homes ayo fenwick"
 },
 {
  "t": "Off the northern coast, a kelp farm tests a new kind of harvest",
  "d": "Growers hope seaweed can pay the bills in a fishery that has shrunk for twenty years.",
  "u": "article.html?story=kelp-farm",
  "k": "audio",
  "s": "Climate",
  "dt": "2026-11-05",
  "a": "Dev Anand Okoro",
  "g": "kelp seaweed fishery coast dev anand okoro"
 },
 {
  "t": "Port workers ratify a four-year contract after a tense weekend",
  "d": "Automation language, not wages, was the sticking point until the final hours.",
  "u": "article.html?story=port-labor-deal",
  "k": "story",
  "s": "Business",
  "dt": "2026-11-09",
  "a": "Camille Duarte",
  "g": "port workers contract automation labor camille duarte"
 },
 {
  "t": "Community banks brace for a year of thinner margins",
  "d": "Lenders in farm country say deposits are drifting toward online accounts.",
  "u": "article.html?story=small-bank-rates",
  "k": "story",
  "s": "Business",
  "dt": "2026-11-07",
  "a": "Camille Duarte",
  "g": "banks lending rates farm camille duarte"
 },
 {
  "t": "Fisheries treaty talks resume with a new draft on the table",
  "d": "Delegations from eleven countries return to the table after a six-month pause.",
  "u": "article.html?story=treaty-talks-world",
  "k": "audio",
  "s": "World",
  "dt": "2026-11-10",
  "a": "Ines Barros",
  "g": "treaty fisheries diplomacy talks ines barros"
 },
 {
  "t": "Relief convoys reach the last cut-off mountain villages",
  "d": "Aid groups say roads reopened sooner than feared, but shelter remains the urgent need.",
  "u": "article.html?story=earthquake-relief",
  "k": "story",
  "s": "World",
  "dt": "2026-11-08",
  "a": "Ines Barros",
  "g": "earthquake relief aid villages ines barros"
 },
 {
  "t": "A telescope array in the desert listens for something new",
  "d": "Astronomers say the first full-sky survey will take three years, and surprise is the point.",
  "u": "article.html?story=telescope-array",
  "k": "story",
  "s": "Science",
  "dt": "2026-11-06",
  "a": "Rhea Castellanos",
  "g": "telescope astronomy survey desert rhea castellanos"
 },
 {
  "t": "Immersion schools bring a nearly lost language back to the classroom",
  "d": "Elders and fourth-graders share a curriculum written by both.",
  "u": "article.html?story=language-schools",
  "k": "audio",
  "s": "Race & Culture",
  "dt": "2026-11-07",
  "a": "Marisol Quint",
  "g": "language schools immersion elders education marisol quint"
 },
 {
  "t": "At a small mountain film festival, the movies are short and the lines are long",
  "d": "Programmers say audiences want stories under twenty minutes, and filmmakers are happy to oblige.",
  "u": "article.html?story=indie-film-festival",
  "k": "story",
  "s": "Culture",
  "dt": "2026-11-09",
  "a": "Lucia Ferrante",
  "g": "movies film festival shorts lucia ferrante"
 },
 {
  "t": "Quiet television is having a comeback",
  "d": "Slow dramas with long takes are drawing audiences that action series did not expect to lose.",
  "u": "article.html?story=tv-quiet-comeback",
  "k": "story",
  "s": "Culture",
  "dt": "2026-11-08",
  "a": "Lucia Ferrante",
  "g": "television series drama lucia ferrante"
 },
 {
  "t": "The night market that taught a neighborhood to eat late",
  "d": "A dozen stalls, one parking lot, and a recipe swap that has lasted six summers.",
  "u": "article.html?story=night-market-food",
  "k": "audio",
  "s": "Culture",
  "dt": "2026-11-06",
  "a": "Nia Abernathy",
  "g": "food market recipes neighborhood nia abernathy"
 },
 {
  "t": "Volunteers repaint a 1970s mural, one flaking panel at a time",
  "d": "The original artist, now eighty-one, is directing from a folding chair.",
  "u": "article.html?story=mural-restoration",
  "k": "story",
  "s": "Culture",
  "dt": "2026-11-05",
  "a": "Rhea Castellanos",
  "g": "art & design mural painting rhea castellanos"
 },
 {
  "t": "A community opera finds its audience in a former grain elevator",
  "d": "Performing arts groups are moving into industrial spaces the city no longer needs.",
  "u": "article.html?story=community-opera",
  "k": "story",
  "s": "Culture",
  "dt": "2026-11-04",
  "a": "Lucia Ferrante",
  "g": "performing arts opera theater lucia ferrante"
 },
 {
  "t": "Cozy games are a hit with players who never called themselves gamers",
  "d": "Developers say low stakes and gentle pacing are the draw.",
  "u": "article.html?story=gaming-cozy",
  "k": "story",
  "s": "Culture",
  "dt": "2026-11-03",
  "a": "Tomas Reyes-Bell",
  "g": "gaming video games cozy pop culture tomas reyes-bell"
 },
 {
  "t": "A public library opens a shelf for fan fiction",
  "d": "Patrons can borrow zines and print-on-demand fandom anthologies written by locals.",
  "u": "article.html?story=fan-fiction-library",
  "k": "story",
  "s": "Culture",
  "dt": "2026-11-02",
  "a": "Nia Abernathy",
  "g": "pop culture fan fiction library books nia abernathy"
 },
 {
  "t": "Little Room Sessions: a brass quintet plays to eleven desks and a ficus",
  "d": "A fifteen-minute set recorded in our own newsroom, with the heating pipes audible on purpose.",
  "u": "article.html?story=little-room-brass",
  "k": "story",
  "s": "Music",
  "dt": "2026-11-10",
  "a": "Josie Park",
  "g": "little room sessions brass live sessions josie park"
 },
 {
  "t": "Fresh Fridays: twelve new songs worth your weekend",
  "d": "Folk-pop from the plains, a two-minute punk single, and one very long, very good synth piece.",
  "u": "article.html?story=fresh-fridays-nov",
  "k": "story",
  "s": "Music",
  "dt": "2026-11-06",
  "a": "Josie Park",
  "g": "fresh fridays new music songs josie park"
 },
 {
  "t": "The accordion is back, and it brought a drum machine",
  "d": "Three young bands are reworking border-country dance music for small clubs.",
  "u": "article.html?story=accordion-revival",
  "k": "audio",
  "s": "Music",
  "dt": "2026-11-05",
  "a": "Josie Park",
  "g": "music features accordion bands josie park"
 },
 {
  "t": "Late Night Listening: songs for the long drive home",
  "d": "Hosts trade favorites from a month of overnight shifts.",
  "u": "article.html?story=late-night-listening",
  "k": "story",
  "s": "Music",
  "dt": "2026-11-03",
  "a": "Josie Park",
  "g": "late night listening songs playlist josie park"
 },
 {
  "t": "Daybreak Edition",
  "d": "Weekday morning news program with hosts in three time zones.",
  "u": "daybreak-edition.html",
  "k": "program",
  "s": "Program",
  "dt": "",
  "g": "program morning news radio"
 },
 {
  "t": "Evening Rounds",
  "d": "The afternoon news magazine: reporting, conversation, and one good story to close.",
  "u": "podcasts.html",
  "k": "program",
  "s": "Program",
  "dt": "",
  "g": "program afternoon news radio evening"
 },
 {
  "t": "Weekend Edition",
  "d": "Saturday and Sunday mornings, slower and a bit weirder.",
  "u": "podcasts.html",
  "k": "program",
  "s": "Program",
  "dt": "",
  "g": "program weekend news radio"
 },
 {
  "t": "Up Next Briefing",
  "d": "A daily news podcast that fits inside a short commute.",
  "u": "podcasts.html",
  "k": "program",
  "s": "Podcast",
  "dt": "",
  "g": "podcast daily briefing news"
 },
 {
  "t": "Capitol Hour",
  "d": "Politics podcast: what happened in the statehouse and why it matters.",
  "u": "podcasts.html",
  "k": "program",
  "s": "Podcast",
  "dt": "",
  "g": "podcast politics statehouse"
 },
 {
  "t": "Crosscurrents",
  "d": "Long conversations with people who changed their minds.",
  "u": "podcasts.html",
  "k": "program",
  "s": "Podcast",
  "dt": "",
  "g": "podcast interviews conversation"
 },
 {
  "t": "Wild Hunch",
  "d": "A science show where the guest brings an unproven idea.",
  "u": "podcasts.html",
  "k": "program",
  "s": "Podcast",
  "dt": "",
  "g": "podcast science ideas"
 },
 {
  "t": "The Quiz Show",
  "d": "A panel game show about the week’s news, recorded before a live audience.",
  "u": "podcasts.html",
  "k": "program",
  "s": "Podcast",
  "dt": "",
  "g": "podcast comedy quiz game show"
 },
 {
  "t": "Little Room Sessions",
  "d": "Short live performances recorded at a desk in our newsroom.",
  "u": "music.html",
  "k": "program",
  "s": "Program",
  "dt": "",
  "g": "music video live sessions performance"
 },
 {
  "t": "Fresh Fridays",
  "d": "The new-music roundup, every Friday.",
  "u": "music.html",
  "k": "program",
  "s": "Program",
  "dt": "",
  "g": "music new songs weekly"
 },
 {
  "t": "Daily Briefing newsletter",
  "d": "Morning: the five stories to know, in plain language.",
  "u": "newsletters.html",
  "k": "newsletter",
  "s": "Newsletter",
  "dt": "",
  "g": "daily briefing news"
 },
 {
  "t": "Politics Weekly newsletter",
  "d": "Friday: the week at the statehouse and on the campaign trail.",
  "u": "newsletters.html",
  "k": "newsletter",
  "s": "Newsletter",
  "dt": "",
  "g": "politics weekly campaign"
 },
 {
  "t": "Health Check newsletter",
  "d": "Tuesday: practical health news and what the studies actually found.",
  "u": "newsletters.html",
  "k": "newsletter",
  "s": "Newsletter",
  "dt": "",
  "g": "health weekly studies"
 },
 {
  "t": "Weekend Playlist newsletter",
  "d": "Friday: new music and what to watch, read and cook.",
  "u": "newsletters.html",
  "k": "newsletter",
  "s": "Newsletter",
  "dt": "",
  "g": "music culture weekend playlist"
 }
];
 const SECTION_PAGES = { National: 'national.html', Politics: 'politics.html', Health: 'health.html', Culture: 'culture.html', Music: 'music.html' };
 const store = {
  get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* storage blocked: the choice just is not remembered */ } },
 };

 /* ---------- header: mobile menu, submenus, search dropdown ---------- */
 const nav = $('.primary-nav'), menuBtn = $('.btn-menu'), searchBtn = $('.btn-search'), searchPanel = $('#search-panel');
 const subToggles = $$('.sub-toggle');
 function setExpanded(btn, open) {
  btn.setAttribute('aria-expanded', String(open));
  const panel = document.getElementById(btn.getAttribute('aria-controls'));
  if (panel) panel.hidden = !open;
 }
 function closeSubs(except) { subToggles.forEach((t) => t !== except && setExpanded(t, false)); }
 subToggles.forEach((t) => t.addEventListener('click', () => {
  const open = t.getAttribute('aria-expanded') !== 'true';
  closeSubs(t); setExpanded(t, open);
 }));
 menuBtn.addEventListener('click', () => {
  const open = menuBtn.getAttribute('aria-expanded') !== 'true';
  menuBtn.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
  if (!open) closeSubs();
 });
 searchBtn.addEventListener('click', () => {
  const open = searchBtn.getAttribute('aria-expanded') !== 'true';
  setExpanded(searchBtn, open);
  if (open) $('input', searchPanel).focus();
 });
 document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape' || $('dialog[open]')) return; // open dialogs handle Escape natively
  const openSub = subToggles.find((t) => t.getAttribute('aria-expanded') === 'true');
  if (openSub) { setExpanded(openSub, false); if (nav.contains(document.activeElement)) openSub.focus(); return; }
  if (searchBtn.getAttribute('aria-expanded') === 'true') { setExpanded(searchBtn, false); searchBtn.focus(); return; }
  if (menuBtn.getAttribute('aria-expanded') === 'true') { menuBtn.click(); menuBtn.focus(); }
 });
 document.addEventListener('click', (e) => {
  if (!nav.contains(e.target)) closeSubs();
  if (!searchPanel.contains(e.target) && e.target !== searchBtn) setExpanded(searchBtn, false);
 });
 nav.addEventListener('focusout', (e) => { if (e.relatedTarget && !nav.contains(e.relatedTarget)) closeSubs(); });

 /* ---------- disclosures (accordion, caption, transcript) ---------- */
 $$('[data-disclosure]').forEach((b) => b.addEventListener('click', () => {
  const open = b.getAttribute('aria-expanded') !== 'true';
  setExpanded(b, open);
  if (b.dataset.labelOpen) b.textContent = open ? b.dataset.labelOpen : b.dataset.labelClosed;
 }));

 /* ---------- forms: validation, error summary, focus management ---------- */
 function fieldMessage(f) {
  if (f.hasAttribute('data-require-one')) return $(':checked', f) ? '' : f.dataset.msgRequired;
  const i = $('input,select,textarea', f);
  if (!i.value.trim()) return f.dataset.msgRequired;
  return i.checkValidity() ? '' : f.dataset.msgType;
 }
 function showFieldError(f, msg) {
  const err = $('.field-error', f), ctl = f.hasAttribute('data-require-one') ? $('input', f) : $('input,select,textarea', f);
  err.hidden = !msg; err.textContent = msg ? 'Error: ' + msg : '';
  $$('input,select,textarea', f).forEach((i) => {
   if (msg) i.setAttribute('aria-invalid', 'true'); else i.removeAttribute('aria-invalid');
   const ids = (i.getAttribute('aria-describedby') || '').split(' ').filter((x) => x && x !== err.id);
   if (msg) ids.push(err.id);
   ids.length ? i.setAttribute('aria-describedby', ids.join(' ')) : i.removeAttribute('aria-describedby');
  });
  return ctl;
 }
 function resetForm(form) {
  $$('.field', form).forEach((f) => showFieldError(f, ''));
  const sum = $('.error-summary', form); if (sum) sum.hidden = true;
  const ok = $('.form-success', form), fields = $('.form-fields', form);
  if (ok) ok.hidden = true; if (fields) fields.hidden = false;
 }
 $$('form[data-validate]').forEach((form) => {
  form.addEventListener('submit', (e) => {
   e.preventDefault();
   const sum = $('.error-summary', form), list = $('ul', sum);
   list.textContent = '';
   let first = null;
   $$('.field', form).forEach((f) => {
    const msg = fieldMessage(f), ctl = showFieldError(f, msg);
    if (!msg) return;
    first = first || ctl;
    if (!ctl.id) ctl.id = f.id + '-first';
    const li = document.createElement('li'), a = document.createElement('a');
    a.href = '#' + ctl.id; a.textContent = msg;
    a.addEventListener('click', (ev) => { ev.preventDefault(); ctl.focus(); });
    li.appendChild(a); list.appendChild(li);
   });
   sum.hidden = !first;
   if (first) { sum.focus(); return; }
   const ok = $('.form-success', form);
   if (ok) { $('.form-fields', form).hidden = true; ok.hidden = false; ok.focus(); }
   form.dispatchEvent(new CustomEvent('validsubmit'));
  });
  // once an error is shown, clear it as soon as that field is fixed
  form.addEventListener('input', (e) => { const f = e.target.closest('.field'); if (f && !$('.field-error', f).hidden && !fieldMessage(f)) showFieldError(f, ''); });
  form.addEventListener('change', (e) => { const f = e.target.closest('.field'); if (f && !$('.field-error', f).hidden && !fieldMessage(f)) showFieldError(f, ''); });
 });

 /* ---------- dialogs ---------- */
 $$('[data-open-dialog]').forEach((b) => b.addEventListener('click', () => {
  const d = document.getElementById(b.dataset.openDialog), f = $('form', d);
  f.reset(); resetForm(f);
  if (d.id === 'station-dialog') $('select', d).value = store.get('lpm-station') || '';
  d.showModal();
 }));
 $$('dialog').forEach((d) => {
  d.addEventListener('click', (e) => { if (e.target === d || e.target.closest('[data-close-dialog]')) d.close(); });
 });
 const stationLabel = $('[data-station-label]');
 const setStation = (s) => { stationLabel.textContent = s || 'No station chosen'; };
 setStation(store.get('lpm-station'));
 $('[data-component="station-form"]').addEventListener('validsubmit', () => {
  const v = $('#station-select').value; store.set('lpm-station', v); setStation(v); $('#station-dialog').close();
 });

 /* ---------- demo media player shelf ---------- */
 const shelf = $('#player-shelf'), shelfTitle = $('[data-shelf-title]'), shelfState = $('[data-shelf-state]'), shelfToggle = $('[data-shelf-toggle]');
 let current = null;
 function setPlaying(on) {
  if (current) current.setAttribute('aria-pressed', String(on));
  shelfState.textContent = on ? 'Now playing (demo)' : 'Paused (demo)';
  shelfToggle.textContent = on ? 'Pause' : 'Play';
 }
 document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-media]'); if (!b) return;
  if (b === current) { setPlaying(b.getAttribute('aria-pressed') !== 'true'); return; }
  if (current) current.setAttribute('aria-pressed', 'false');
  current = b; shelfTitle.textContent = b.dataset.mediaTitle;
  shelf.hidden = false; document.body.classList.add('has-shelf'); setPlaying(true);
 });
 shelfToggle.addEventListener('click', () => setPlaying(current.getAttribute('aria-pressed') !== 'true'));
 $('[data-shelf-close]').addEventListener('click', () => {
  current.setAttribute('aria-pressed', 'false'); shelf.hidden = true; document.body.classList.remove('has-shelf');
  current.focus(); current = null;
 });
 shelf.addEventListener('keydown', (e) => { if (e.key === 'Escape') $('[data-shelf-close]').click(); });

 /* ---------- video playlist ---------- */
 const pl = $('[data-playlist]');
 if (pl) {
  const items = $$('li', pl), status = $('[data-playlist-status]');
  let idx = 0;
  const show = (n) => {
   idx = (n + items.length) % items.length;
   items.forEach((li, i) => { li.hidden = i !== idx; });
   status.textContent = 'Video ' + (idx + 1) + ' of ' + items.length;
  };
  $('[data-playlist-prev]').addEventListener('click', () => show(idx - 1));
  $('[data-playlist-next]').addEventListener('click', () => show(idx + 1));
 }

 /* ---------- section pages: show more ---------- */
 const more = $('[data-show-more]');
 if (more) more.addEventListener('click', () => {
  const extra = $$('[data-extra]');
  extra.forEach((c) => { c.hidden = false; });
  $('[data-show-more-status]').textContent = extra.length + ' more stories shown.';
  more.hidden = true;
  $('a', extra[0]).focus();
 });

 /* ---------- podcasts filter ---------- */
 const podQ = $('#pod-q');
 if (podQ) {
  const cat = $('#pod-cat'), cards = $$('[data-podcast]'), status = $('[data-pod-status]'), empty = $('[data-pod-empty]');
  const run = () => {
   const q = podQ.value.trim().toLowerCase();
   let n = 0;
   cards.forEach((c) => {
    const ok = (!cat.value || c.dataset.cat === cat.value) && (!q || c.dataset.text.includes(q));
    c.hidden = !ok; if (ok) n++;
   });
   empty.hidden = n > 0;
   status.textContent = 'Showing ' + n + ' of ' + cards.length + ' shows';
  };
  podQ.form.addEventListener('submit', (e) => e.preventDefault());
  podQ.addEventListener('input', run); cat.addEventListener('change', run);
 }

 /* ---------- search page ---------- */
 const sForm = $('[data-search-form]');
 if (sForm) {
  const qIn = $('#q'), typeSel = $('#type'), sortSel = $('#sort'), list = $('[data-search-list]'), status = $('[data-search-status]'), empty = $('[data-search-empty]');
  const hay = (r) => (r.t + ' ' + r.d + ' ' + r.s + ' ' + r.g).toLowerCase();
  function run(focusStatus) {
   const q = qIn.value.trim().toLowerCase(), words = q.split(/\s+/).filter(Boolean);
   list.textContent = ''; empty.hidden = true;
   if (!words.length) { status.textContent = 'Enter a search term to see results.'; return; }
   const hits = SEARCH_DATA.filter((r) => (!typeSel.value || r.k === typeSel.value) && words.every((w) => hay(r).includes(w)))
    .map((r) => ({ r, score: words.reduce((n, w) => n + (r.t.toLowerCase().includes(w) ? 3 : 0) + (r.s.toLowerCase().includes(w) ? 1 : 0), 0) }));
   hits.sort(sortSel.value === 'newest' ? (a, b) => b.r.dt.localeCompare(a.r.dt) : (a, b) => b.score - a.score);
   hits.forEach(({ r }) => {
    const li = document.createElement('li'), h = document.createElement('h3'), a = document.createElement('a'), p = document.createElement('p'), m = document.createElement('p');
    li.dataset.component = 'search-result';
    a.href = r.u; a.textContent = r.t; h.appendChild(a);
    p.textContent = r.d;
    m.className = 'meta'; m.textContent = r.s + ' · ' + r.k + (r.dt ? ' · ' + r.dt : '');
    li.append(h, p, m); list.appendChild(li);
   });
   status.textContent = hits.length + (hits.length === 1 ? ' result for “' : ' results for “') + qIn.value.trim() + '”';
   empty.hidden = hits.length > 0;
   if (focusStatus) status.focus();
  }
  sForm.addEventListener('validsubmit', () => run(true));
  [typeSel, sortSel].forEach((s) => s.addEventListener('change', () => run(false)));
  qIn.value = new URLSearchParams(location.search).get('q') || '';
  run(false);
 }

 /* ---------- article: share + demo story swap ---------- */
 const copy = $('[data-copy-link]');
 if (copy) copy.addEventListener('click', () => {
  const out = $('[data-copy-status]');
  const done = (m) => { out.textContent = m; };
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(location.href).then(() => done('Link copied.'), () => done('Copy is blocked here. Copy the address from the browser bar.'));
  else done('Copy is not available here. Copy the address from the browser bar.');
 });
 const storyTitle = $('[data-story-title]');
 if (storyTitle) {
  const slug = new URLSearchParams(location.search).get('story');
  const row = slug && SEARCH_DATA.find((r) => r.u === 'article.html?story=' + slug);
  if (row) {
   storyTitle.textContent = row.t; $('[data-story-dek]').textContent = row.d;
   const t = $('[data-story-date]'); t.dateTime = row.dt;
   t.textContent = new Date(row.dt + 'T12:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
   const sec = $('[data-story-section]'); sec.textContent = row.s; sec.href = SECTION_PAGES[row.s] || 'search.html?q=' + encodeURIComponent(row.s);
   const by = $('.byline a'); by.textContent = row.a; by.href = 'search.html?q=' + encodeURIComponent(row.a);
   const crumb = $$('.breadcrumb li'); crumb[1].firstElementChild.textContent = row.s; crumb[1].firstElementChild.href = sec.href; crumb[2].firstElementChild.textContent = row.t;
   document.title = row.t + ' | Larkspur Public Media';
   $('[data-story-note]').hidden = false;
  }
 }
})();
