'use strict';
(() => {
  const $ = (id) => document.getElementById(id);
  const KEY = 'rate_name';
  const VERDICT_FOR_KEY = { 1: 'A', 2: 'B', 3: 'tie' };
  const LABEL = { A: 'A', B: 'B', tie: 'Tie' };
  const state = { name: '', total: 0, answered: [], unavailable: [], i: null, item: null, questions: [], timers: {}, last: {} };

  async function api(method, url, body) {
    const res = await fetch(url, {
      method, credentials: 'same-origin',
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
    let data = null;
    try { data = await res.json(); } catch { /* non-JSON error page */ }
    if (!res.ok) throw new Error((data && data.error) || `Request failed (${res.status})`);
    return data;
  }

  const announce = (msg) => { $('status').textContent = msg; };
  const show = (id) => { for (const s of ['screen-name', 'screen-rate', 'screen-done']) $(s).hidden = s !== id; };
  const q = () => `?name=${encodeURIComponent(state.name)}`;

  // ---- name screen ----
  function showName() {
    show('screen-name');
    $('session').hidden = true;
    $('name').value = localStorage.getItem(KEY) || '';
    $('name').focus();
  }

  $('name-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = $('name').value.trim();
    $('name-err').textContent = '';
    $('name').removeAttribute('aria-invalid');
    if (!name) { $('name-err').textContent = 'Enter your name to start.'; $('name').setAttribute('aria-invalid', 'true'); $('name').focus(); return; }
    try {
      const r = await api('POST', '/api/rate/start', { name });
      localStorage.setItem(KEY, name);
      state.name = name;
      $('who').textContent = `Rating as ${r.rater_id}`;
      $('session').hidden = false;
      await refreshProgress();
      if (r.next === null) return showDone();
      await openItem(r.next);
    } catch (err) {
      $('name-err').textContent = err.message;
      $('name').setAttribute('aria-invalid', 'true');
    }
  });

  $('switch-name').addEventListener('click', showName);

  // ---- progress ----
  async function refreshProgress() {
    const p = await api('GET', `/api/rate/progress${q()}`);
    state.total = p.total_items;
    state.answered = p.answered;
    state.unavailable = p.unavailable;
    state.doneItems = p.done_items;
    state.perQuestion = p.per_question;
    const nAvail = p.total_items - p.unavailable.length;
    $('item-total').textContent = p.total_items;
    $('meter').setAttribute('aria-valuemax', nAvail);
    $('meter').setAttribute('aria-valuenow', p.done_items);
    $('meter-fill').style.width = `${nAvail ? (100 * p.done_items) / nAvail : 0}%`;
    $('meter-text').textContent = `${p.done_items} of ${nAvail} items finished` + (p.unavailable.length ? `, ${p.unavailable.length} unavailable and skipped` : '');
    return p;
  }

  function neighbour(from, step) {
    for (let j = from + step; j >= 0 && j < state.total; j += step) if (state.answered[j] !== null) return j;
    return null;
  }

  // ---- item ----
  async function openItem(i) {
    $('load-err').textContent = '';
    $('load-retry').hidden = true;
    show('screen-rate');
    $('session').hidden = false;
    state.i = i;
    $('item-pos').textContent = i + 1;
    $('prev').disabled = neighbour(i, -1) === null;
    $('next').textContent = neighbour(i, 1) === null ? 'Finish (n)' : 'Next item (n)';
    try {
      state.item = await api('GET', `/api/rate/item${q()}&i=${i}`);
    } catch (err) {
      $('load-err').textContent = `Could not load this item: ${err.message}`;
      $('load-retry').hidden = false;
      return;
    }
    state.questions = state.item.questions;
    renderPages();
    renderQuestions();
    setCurrent(state.questions[0].id);
    $('item-h').focus();
    announce(`Item ${i + 1} of ${state.total}`);
  }

  $('retry-load').addEventListener('click', () => openItem(state.i));
  $('next').addEventListener('click', () => goto(1));
  $('prev').addEventListener('click', () => goto(-1));

  async function flush() {
    for (const [qid, t] of Object.entries(state.timers)) { clearTimeout(t); delete state.timers[qid]; await save(Number(qid)); }
  }

  async function goto(step) {
    const j = neighbour(state.i, step);
    if (j === null && step < 0) return;
    await flush();
    await refreshProgress().catch(() => {});
    if (j !== null) return openItem(j);
    if (state.doneItems === state.total - state.unavailable.length) return showDone();
    const left = state.answered.findIndex((n) => n !== null && n < state.questions.length);
    announce('Some items are not finished yet.');
    if (left >= 0) openItem(left);
  }

  function renderPages() {
    const sel = $('page');
    sel.replaceChildren(...state.item.pages.map((p) => Object.assign(document.createElement('option'), { value: p, textContent: p })));
    sel.value = state.item.pages.includes('index.html') ? 'index.html' : state.item.pages[0];
    loadFrames();
  }

  function loadFrames() {
    const page = $('page').value.split('/').map(encodeURIComponent).join('/');
    const base = `/rate/frame/${state.item.token}`;
    $('frame-a').src = `${base}/l/${page}`;
    $('frame-b').src = `${base}/r/${page}`;
    $('frame-a').title = `Version A, page ${$('page').value}`;
    $('frame-b').title = `Version B, page ${$('page').value}`;
  }
  $('page').addEventListener('change', loadFrames);

  // ---- questions ----
  function renderQuestions() {
    const box = $('questions');
    box.replaceChildren();
    for (const qu of state.questions) {
      const a = state.item.answers[qu.id] || { verdict: null, note: '' };
      const fs = document.createElement('div');
      fs.className = 'qrow';
      fs.dataset.q = qu.id;
      fs.setAttribute('role', 'radiogroup');
      fs.setAttribute('aria-labelledby', `qt-${qu.id}`);
      const legend = document.createElement('h3');
      legend.id = `qt-${qu.id}`;
      legend.textContent = `Q${qu.id}. ${qu.text}`;
      fs.append(legend);
      const choices = document.createElement('div');
      choices.className = 'choices';
      for (const v of ['A', 'B', 'tie']) {
        const id = `q${qu.id}-${v}`;
        const lab = document.createElement('label');
        lab.className = 'choice';
        lab.htmlFor = id;
        const inp = Object.assign(document.createElement('input'), { type: 'radio', name: `q${qu.id}`, value: v, id, checked: a.verdict === v });
        inp.addEventListener('change', () => queueSave(qu.id, true));
        const span = document.createElement('span');
        span.textContent = LABEL[v];
        lab.append(inp, span);
        choices.append(lab);
      }
      const note = Object.assign(document.createElement('input'), { type: 'text', id: `note-${qu.id}`, maxLength: 500, value: a.note, className: 'note', autocomplete: 'off' });
      note.setAttribute('aria-label', `Note for question ${qu.id} (optional, one sentence)`);
      note.placeholder = 'Optional note: one sentence on what you saw';
      note.addEventListener('input', () => queueSave(qu.id, false));
      note.addEventListener('change', () => queueSave(qu.id, true));
      const status = document.createElement('p');
      status.className = 'rowstatus';
      status.id = `st-${qu.id}`;
      status.setAttribute('role', 'status');
      status.textContent = a.verdict ? 'Saved' : 'Not answered';
      const retry = Object.assign(document.createElement('button'), { type: 'button', textContent: 'Retry', hidden: true, className: 'retry' });
      retry.id = `retry-${qu.id}`;
      retry.addEventListener('click', () => save(qu.id));
      fs.append(choices, note, status, retry);
      fs.addEventListener('focusin', () => setCurrent(qu.id));
      fs.addEventListener('click', () => setCurrent(qu.id));
      box.append(fs);
    }
  }

  function setCurrent(id) {
    const qu = state.questions.find((x) => x.id === id);
    $('rubric-title').textContent = `Q${qu.id}. ${qu.text}`;
    $('rubric-anchor').textContent = qu.anchor;
    for (const r of document.querySelectorAll('.qrow')) r.classList.toggle('current', Number(r.dataset.q) === id);
  }

  const row = (id) => document.querySelector(`.qrow[data-q="${id}"]`);
  const setStatus = (id, text, isError) => {
    const el = $(`st-${id}`);
    el.textContent = text;
    el.classList.toggle('bad', !!isError);
    $(`retry-${id}`).hidden = !isError;
  };

  function queueSave(id, now) {
    clearTimeout(state.timers[id]);
    delete state.timers[id];
    const verdict = (row(id).querySelector('input[type=radio]:checked') || {}).value;
    if (!verdict) { setStatus(id, 'Choose A, B or Tie; the note saves with it.', false); return; }
    setStatus(id, 'Saving…', false);
    if (now) save(id); else state.timers[id] = setTimeout(() => { delete state.timers[id]; save(id); }, 700);
  }

  async function save(id) {
    const r = row(id);
    if (!r) return;
    const checked = r.querySelector('input[type=radio]:checked');
    if (!checked) return;
    const body = { name: state.name, item: state.i, question: id, verdict: checked.value, note: r.querySelector('.note').value };
    const item = state.i;
    const seq = (state.last[id] = (state.last[id] || 0) + 1);
    setStatus(id, 'Saving…', false);
    try {
      await api('POST', '/api/rate/answer', body);
      if (seq === state.last[id] && item === state.i) setStatus(id, 'Saved', false);
      refreshProgress().catch(() => {});
    } catch (err) {
      if (item === state.i) setStatus(id, `Not saved: ${err.message}`, true);
    }
  }

  // ---- finish ----
  function showDone() {
    show('screen-done');
    const avail = state.total - state.unavailable.length;
    $('done-text').textContent = `You finished ${state.doneItems} of ${avail} items, ${state.doneItems * 14} answers in total.` +
      (state.unavailable.length ? ` ${state.unavailable.length} items were unavailable and skipped.` : '') + ' You can close this page.';
    $('done-h').focus();
  }
  $('review').addEventListener('click', () => { const j = state.answered.findIndex((n) => n !== null); openItem(j); });

  // ---- keyboard ----
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey || $('screen-rate').hidden) return;
    const t = e.target;
    if (t.matches('input[type=text], textarea, select')) return;
    if (e.key === 'n') goto(1);
    else if (e.key === 'p') goto(-1);
    else if (VERDICT_FOR_KEY[e.key]) {
      const fs = t.closest && t.closest('.qrow');
      if (!fs) return;
      e.preventDefault();
      const inp = fs.querySelector(`input[value="${VERDICT_FOR_KEY[e.key]}"]`);
      inp.checked = true;
      inp.focus();
      queueSave(Number(fs.dataset.q), true);
    }
  });

  // ---- boot ----
  const saved = localStorage.getItem(KEY);
  showName();
  if (saved) $('name').value = saved;
})();
