'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const http = require('node:http');
const { create } = require('../lib/rating');

const STUDY = path.resolve(__dirname, '..', '..');
const SECRET = 'test-secret';
const LEAK = /wcag|nielsen|naive|blinding_key|\bboth\b/i;

// 3 items over S-01..S-03; S-03 only has the wcag variant => unavailable.
function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'rating-'));
  const studyDir = path.join(root, 'study');
  const dataDir = path.join(root, 'data');
  fs.mkdirSync(path.join(studyDir, 'sample'), { recursive: true });
  fs.mkdirSync(path.join(studyDir, 'human'), { recursive: true });
  fs.copyFileSync(path.join(STUDY, 'human', 'rubric.md'), path.join(studyDir, 'human', 'rubric.md'));
  const pairs = [['S-01', 'A1'], ['S-02', 'A2'], ['S-03', 'A3']];
  fs.writeFileSync(path.join(studyDir, 'sample', 'human_items.csv'),
    'item_id,category,site_id,generator_group,arm,form_page,form_controls,seed\n' +
    pairs.map(([s, a]) => `${s}-${a},university,${s},codex,${a},form-both.html,4,20261119`).join('\n') + '\n');
  fs.writeFileSync(path.join(studyDir, 'sample', 'sites.csv'),
    'category,site_id,generator_group,slot,index_bytes,form_page,form_controls,low_form_density,relative_path,stylesheet,slice_files\n' +
    pairs.map(([s]) => `university,${s},codex,1,1,form-both.html,4,0,x,css/styles.css,index.html;form-both.html;css/styles.css`).join('\n') + '\n');
  const put = (file, text) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, text); };
  for (const [site, arm] of pairs) {
    for (const cond of ['wcag', 'both']) {
      if (site === 'S-03' && cond === 'both') continue;
      const name = cond === 'wcag' ? 'Alpha' : 'Beta';
      const cell = path.join(dataDir, 'runs', arm, cond, site);
      put(path.join(cell, 'iter1', 'index.html'), '<h1>OLD</h1>');
      put(path.join(cell, 'iter1', 'status.json'), '{"status":"ok"}');
      put(path.join(cell, 'iter3', 'status.json'), '{"status":"failed"}');
      const d = path.join(cell, 'iter2');
      put(path.join(d, 'status.json'), '{"status":"ok"}');
      put(path.join(d, 'index.html'), `<!-- ${cond} fix --><html data-variant="${cond}"><link rel="stylesheet" href="css/styles.css"><h1>${name} ${site}</h1><a href="form-both.html">Naive form</a><img src="https://evil.example/x.png"></html>`);
      put(path.join(d, 'form-both.html'), `<h1>${name} form</h1><a href="index.html">Home</a>`);
      put(path.join(d, 'css', 'styles.css'), `/* ${cond} */ body{background:url(../img/bg.png)}`);
    }
  }
  return { root, studyDir, dataDir };
}

async function serve(fx = fixture()) {
  const rating = create({ dataDir: fx.dataDir, studyDir: fx.studyDir, secret: SECRET });
  const seen = [];
  const server = http.createServer((req, res) => {
    seen.push(req.url);
    if (!rating.handle(req, res, new URL(req.url, 'http://x'))) { res.writeHead(404); res.end('no'); }
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const base = `http://127.0.0.1:${server.address().port}`;
  const bodies = [];
  const call = async (method, p, body) => {
    const r = await fetch(base + p, { method, body: body === undefined ? undefined : JSON.stringify(body) });
    const text = await r.text();
    bodies.push(text);
    let json = null;
    try { json = JSON.parse(text); } catch { /* html or css */ }
    return { status: r.status, text, headers: r.headers, json };
  };
  return { call, bodies, seen, base, dataDir: fx.dataDir, close: () => server.close() };
}

const csvPath = (s) => path.join(s.dataDir, 'human', 'human_ratings.csv');
const csvRows = (s) => fs.readFileSync(csvPath(s), 'utf8').trim().split('\n').slice(1);
const getItem = (s, name, i) => s.call('GET', `/api/rate/item?name=${name}&i=${i}`);
const progress = async (s, name) => (await s.call('GET', `/api/rate/progress?name=${name}`)).json;

// first available item for a rater, plus which variant is on the left
async function firstItem(s, name) {
  const i = (await progress(s, name)).next;
  const it = (await getItem(s, name, i)).json;
  const html = (await s.call('GET', `/rate/frame/${it.token}/l/index.html`)).text;
  return { i, it, left: html.includes('Alpha') ? 'wcag' : 'both' };
}

test('order is deterministic per name and differs between names', async () => {
  const s = await serve();
  try {
    const a1 = await progress(s, 'Ada');
    assert.equal(a1.rater_id, 'ada');
    assert.deepEqual(a1, await progress(s, 'ada'));
    const positions = new Set();
    for (const n of ['u1', 'u2', 'u3', 'u4', 'u5', 'u6', 'u7', 'u8']) positions.add((await progress(s, n)).unavailable[0]);
    assert.ok(positions.size > 1, 'item order must vary by name');
  } finally { s.close(); }
});

test('start, resume, progress, unavailable', async () => {
  const s = await serve();
  try {
    const st = (await s.call('POST', '/api/rate/start', { name: 'Grace Hopper' })).json;
    assert.equal(st.rater_id, 'grace-hopper');
    assert.equal(st.total_items, 3);
    assert.equal(st.done_items, 0);
    const p = await progress(s, 'Grace Hopper');
    assert.equal(p.unavailable.length, 1);
    assert.notEqual(st.next, p.unavailable[0]);
    for (let q = 1; q <= 14; q++) assert.equal((await s.call('POST', '/api/rate/answer', { name: 'Grace Hopper', item: st.next, question: q, verdict: 'tie', note: '' })).status, 200);
    const again = (await s.call('POST', '/api/rate/start', { name: 'grace  hopper!' })).json;
    assert.equal(again.rater_id, 'grace-hopper');
    assert.equal(again.done_items, 1);
    assert.notEqual(again.next, st.next);
    assert.equal((await progress(s, 'grace-hopper')).per_question['14'], 1);
    const item = (await getItem(s, 'grace-hopper', st.next)).json;
    assert.equal(item.questions.length, 14);
    assert.equal(item.answers['3'].verdict, 'tie');
    assert.equal((await getItem(s, 'grace-hopper', p.unavailable[0])).status, 409);
    assert.equal((await getItem(s, 'grace-hopper', 3)).status, 400);
  } finally { s.close(); }
});

test('left/right mapping un-blinds correctly for both assignments', async () => {
  const s = await serve();
  try {
    const seenLeft = new Set();
    for (let n = 0; n < 16 && seenLeft.size < 2; n++) {
      const name = `rater${n}`;
      const { i, it, left } = await firstItem(s, name);
      seenLeft.add(left);
      const right = left === 'wcag' ? 'both' : 'wcag';
      const rhtml = (await s.call('GET', `/rate/frame/${it.token}/r/index.html`)).text;
      assert.ok(rhtml.includes(left === 'wcag' ? 'Beta' : 'Alpha'), 'right pane is the other variant');
      for (const [q, v] of [[1, 'A'], [2, 'B'], [3, 'tie']]) await s.call('POST', '/api/rate/answer', { name, item: i, question: q, verdict: v, note: '' });
      const byQ = Object.fromEntries(csvRows(s).map((r) => r.split(',')).filter((r) => r[3] === name).map((r) => [r[2], r]));
      assert.deepEqual([byQ['1'][4], byQ['2'][4], byQ['3'][4]], [left, right, 'tie']);
      assert.deepEqual([byQ['1'][6], byQ['1'][7]], [left, right]);
      const back = (await getItem(s, name, i)).json.answers;
      assert.deepEqual([back['1'].verdict, back['2'].verdict, back['3'].verdict], ['A', 'B', 'tie']);
    }
    assert.equal(seenLeft.size, 2, 'both left/right assignments exercised');
  } finally { s.close(); }
});

test('no leakage of condition names, arm or key across start/item/frame', async () => {
  const fx = fixture();
  fs.writeFileSync(path.join(fx.dataDir, 'blinding_key.csv'), 'site_id,arm,label_shown,condition\nS-01,A1,V1,wcag\n');
  const s = await serve(fx);
  try {
    for (const name of ['Ada', 'Bob', 'Cy']) {
      await s.call('POST', '/api/rate/start', { name });
      const p = await progress(s, name);
      for (let i = 0; i < 3; i++) {
        const r = await getItem(s, name, i);
        if (p.unavailable.includes(i)) continue;
        assert.equal(r.status, 200);
        for (const side of ['l', 'r']) {
          for (const page of [...r.json.pages, 'css/styles.css']) {
            const f = await s.call('GET', `/rate/frame/${r.json.token}/${side}/${page}`);
            assert.equal(f.status, 200, page);
            assert.match(f.headers.get('content-security-policy'), /sandbox/);
            assert.doesNotMatch(f.text, /href="(?!\/rate\/frame\/|https?:)|src="(?!\/rate\/frame\/|https?:)/);
          }
          const css = await s.call('GET', `/rate/frame/${r.json.token}/${side}/css/styles.css`);
          assert.match(css.text, /url\(\/rate\/frame\/[^/]+\/[lr]\/img\/bg\.png\)/);
        }
      }
    }
    const leaks = s.bodies.filter((b) => LEAK.test(b)).map((b) => b.slice(0, 100));
    for (const u of s.seen) if (LEAK.test(u.replace(/name=[^&]*/, ''))) leaks.push(u);
    assert.deepEqual(leaks, []);
  } finally { s.close(); }
});

test('latest answer wins, file is atomic and ordered', async () => {
  const s = await serve();
  try {
    const { i } = await firstItem(s, 'zed');
    const ans = (v, note) => s.call('POST', '/api/rate/answer', { name: 'zed', item: i, question: 5, verdict: v, note });
    await ans('A', 'first');
    await ans('B', 'second');
    const rows = csvRows(s);
    assert.equal(rows.length, 1);
    assert.match(rows[0], /second/);
    assert.deepEqual(fs.readdirSync(path.join(s.dataDir, 'human')), ['human_ratings.csv']);
    assert.equal((await getItem(s, 'zed', i)).json.answers['5'].verdict, 'B');
    assert.equal(fs.readFileSync(csvPath(s), 'utf8').split('\n')[0], 'site_id,arm,question,rater_id,verdict,note,shown_left,shown_right,ts');
  } finally { s.close(); }
});

test('strict validation rejections', async () => {
  const s = await serve();
  try {
    const ok = { name: 'Val', item: 0, question: 1, verdict: 'A', note: '' };
    const bad = [
      { ...ok, name: '' }, { ...ok, name: '!!!' }, { ...ok, name: 'x'.repeat(65) }, { ...ok, name: 5 },
      { ...ok, item: -1 }, { ...ok, item: 3 }, { ...ok, item: 1.5 }, { ...ok, item: '0' },
      { ...ok, question: 0 }, { ...ok, question: 15 }, { ...ok, question: '1' },
      { ...ok, verdict: 'wcag' }, { ...ok, verdict: 'a' }, { ...ok, verdict: undefined },
      { ...ok, note: 'x'.repeat(501) }, { ...ok, note: 5 },
    ];
    for (const b of bad) assert.equal((await s.call('POST', '/api/rate/answer', b)).status, 400, JSON.stringify(b).slice(0, 80));
    assert.equal((await s.call('POST', '/api/rate/start', { name: '' })).status, 400);
    assert.equal((await s.call('GET', '/api/rate/progress')).status, 400);
    assert.equal((await s.call('GET', '/api/rate/answer')).status, 405);
    assert.equal(fs.existsSync(csvPath(s)), false);
    assert.equal((await fetch(s.base + '/api/rate/answer', { method: 'POST', body: '{nope' })).status, 400);
  } finally { s.close(); }
});

test('formula prefix, control chars, 500-char note', async () => {
  const s = await serve();
  try {
    const { i } = await firstItem(s, 'inj');
    const send = (q, note) => s.call('POST', '/api/rate/answer', { name: 'inj', item: i, question: q, verdict: 'A', note });
    for (const [q, n] of [[1, '=SUM(A1)'], [2, '+1'], [3, '-1'], [4, '@x']]) assert.equal((await send(q, n)).status, 200);
    assert.equal((await send(5, 'a\u0000b\u0007c\nd')).status, 200);
    assert.equal((await send(6, 'y'.repeat(500))).status, 200);
    const a = (await getItem(s, 'inj', i)).json.answers;
    assert.equal(a['1'].note, '=SUM(A1)');
    const raw = fs.readFileSync(csvPath(s), 'utf8');
    for (const re of [/,'=SUM\(A1\),/, /,'\+1,/, /,'-1,/, /,'@x,/]) assert.match(raw, re);
    assert.equal(a['5'].note, 'abc d');
    assert.equal(a['6'].note.length, 500);
  } finally { s.close(); }
});

test('token tampering and path traversal are rejected', async () => {
  const s = await serve();
  try {
    const { it } = await firstItem(s, 'tam');
    const [p, m] = it.token.split('.');
    const forged = Buffer.from('other|0').toString('base64url');
    const fr = (t, side, page) => s.call('GET', `/rate/frame/${t}/${side}/${page}`);
    assert.equal((await fr(it.token, 'l', 'index.html')).status, 200);
    assert.equal((await fr(`${p}.${'0'.repeat(32)}`, 'l', 'index.html')).status, 404);
    assert.equal((await fr(`${forged}.${m}`, 'l', 'index.html')).status, 404);
    assert.equal((await fr(p, 'l', 'index.html')).status, 404);
    assert.equal((await fr(it.token, 'x', 'index.html')).status, 404);
    for (const page of ['..%2F..%2Fstatus.json', '%2e%2e/index.html', '..%5Cindex.html', 'status.json', 'iter2/index.html', 'css%2F..%2F..%2Fx', '%00', 'nope.html', '']) {
      assert.equal((await fr(it.token, 'l', page)).status, 404, page);
    }
  } finally { s.close(); }
});

test('concurrent answers do not corrupt the CSV', async () => {
  const s = await serve();
  try {
    const names = ['c1', 'c2', 'c3', 'c4'];
    const first = {};
    for (const n of names) first[n] = (await progress(s, n)).next;
    await Promise.all(names.flatMap((n) => Array.from({ length: 14 }, (_, k) => s.call('POST', '/api/rate/answer', { name: n, item: first[n], question: k + 1, verdict: k % 2 ? 'A' : 'B', note: `n,"${k}"` }))));
    await Promise.all(Array.from({ length: 20 }, (_, k) => s.call('POST', '/api/rate/answer', { name: 'c1', item: first.c1, question: 1, verdict: 'A', note: `v${k}` })));
    const rows = csvRows(s);
    assert.equal(rows.length, 56);
    assert.equal(new Set(rows.map((r) => r.split(',').slice(0, 4).join())).size, 56);
    assert.equal((await progress(s, 'c2')).done_items, 1);
    assert.deepEqual(fs.readdirSync(path.join(s.dataDir, 'human')), ['human_ratings.csv']);
  } finally { s.close(); }
});

test('handle returns false for paths it does not own', () => {
  const fx = fixture();
  const r = create({ dataDir: fx.dataDir, studyDir: fx.studyDir, secret: SECRET });
  assert.equal(r.handle({ url: '/api/state', method: 'GET' }, {}, new URL('http://x/api/state')), false);
});

module.exports = { fixture, serve };
