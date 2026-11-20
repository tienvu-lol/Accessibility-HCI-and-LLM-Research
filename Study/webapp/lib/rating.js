'use strict';
// Name-based, server-side-blinded human rating. See API.md "Human rating".
const fs = require('node:fs');
const fsp = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');

const QUESTIONS = 14;
const MAX_NOTE = 500;
const MAX_BODY = 32 * 1024;
const VERDICTS = ['A', 'B', 'tie'];
const CSV_HEADER = ['site_id', 'arm', 'question', 'rater_id', 'verdict', 'note', 'shown_left', 'shown_right', 'ts'];
const CONDITIONS = ['naive', 'wcag', 'nielsen', 'both'];
const FRAME_CSP = "sandbox allow-same-origin; default-src 'none'; style-src 'self' 'unsafe-inline'; " +
  "img-src 'self' data:; font-src 'self'; form-action 'none'; base-uri 'none'; frame-ancestors 'self'";
const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.gif': 'image/gif', '.webp': 'image/webp', '.woff2': 'font/woff2', '.woff': 'font/woff',
};

// ---- same rules as Study/tools/judge/blind.py ----
const COMMENT = /<!--.*?-->|\/\*.*?\*\//gs;
const NAME_WORDS = /\b(?:wcag|nielsen|naive)\b/gi;
const MARKER_ATTR = /\s(?:data-)?(?:condition|variant|arm)\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;
const BOTH_MARKER = /\b(?:condition|variant)\s*[:=]\s*both\b/gi;
const ANY_NAME = new RegExp(CONDITIONS.join('|'), 'gi');

function stripMarkers(text) {
  return text.replace(COMMENT, '').replace(MARKER_ATTR, '').replace(BOTH_MARKER, '').replace(NAME_WORDS, '');
}

function cleanPath(p) {
  return p.split('/').map((seg) => {
    const dot = seg.lastIndexOf('.');
    const [stem, ext] = dot >= 0 ? [seg.slice(0, dot), seg.slice(dot)] : [seg, ''];
    return (stem.replace(ANY_NAME, '').replace(/^[-_ ]+|[-_ ]+$/g, '') || 'f') + ext;
  }).join('/');
}

// ---- small helpers ----
const sha256 = (s) => crypto.createHash('sha256').update(s).digest('hex');
const b64u = (s) => Buffer.from(s, 'utf8').toString('base64url');

function slug(name) {
  if (typeof name !== 'string' || name.length > 64) return null;
  const s = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 32).replace(/-+$/, '');
  return s || null;
}

function parseCsv(text) {
  const rows = [];
  let row = [], field = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else q = false; } else field += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field); field = '';
      if (row.length > 1 || row[0] !== '') rows.push(row);
      row = [];
    } else field += c;
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row); }
  return rows;
}

const csvCell = (v) => (/[",\r\n]/.test(v) ? `"${String(v).replace(/"/g, '""')}"` : String(v));
const toCsv = (rows) => rows.map((r) => r.map(csvCell).join(',')).join('\n') + '\n';

function readCsvObjects(file) {
  const [head, ...rows] = parseCsv(fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, ''));
  return rows.map((r) => Object.fromEntries(head.map((h, i) => [h.trim(), (r[i] || '').trim()])));
}

const locks = new Map(); // per-file mutex, shared across create() instances
function withLock(file, fn) {
  const run = (locks.get(file) || Promise.resolve()).then(fn);
  locks.set(file, run.catch(() => {}));
  return run;
}

async function renameRetry(from, to) {
  for (let n = 0; ; n++) {
    try { return await fsp.rename(from, to); } catch (e) {
      if (n >= 8 || !['EPERM', 'EBUSY', 'EACCES'].includes(e.code)) throw e; // Windows: reader holds the target
      await new Promise((r) => setTimeout(r, 15 * (n + 1)));
    }
  }
}

function sendJson(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(body);
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', (c) => {
      size += c.length;
      if (size > MAX_BODY) { reject(Object.assign(new Error('body too large'), { status: 413 })); req.destroy(); } else chunks.push(c);
    });
    req.on('end', () => {
      try {
        const v = JSON.parse(Buffer.concat(chunks).toString('utf8') || 'null');
        if (v === null || typeof v !== 'object' || Array.isArray(v)) throw new Error();
        resolve(v);
      } catch { reject(Object.assign(new Error('invalid JSON object'), { status: 400 })); }
    });
    req.on('error', reject);
  });
}

function create({ dataDir, studyDir, secret }) {
  if (!secret) throw new Error('rating: secret required');
  const ratingsFile = path.join(dataDir, 'human', 'human_ratings.csv');
  let staticData = null;

  function loadStatic() {
    if (staticData) return staticData;
    const items = readCsvObjects(path.join(studyDir, 'sample', 'human_items.csv'));
    const sites = Object.fromEntries(readCsvObjects(path.join(studyDir, 'sample', 'sites.csv')).map((r) => [r.site_id, r.slice_files.split(';')]));
    const rubric = fs.readFileSync(path.join(studyDir, 'human', 'rubric.md'), 'utf8');
    const questions = [...rubric.matchAll(/^## Q(\d+)\.\s*(.+)\r?\n(.+)$/gm)]
      .map((m) => ({ id: Number(m[1]), text: m[2].trim(), anchor: m[3].trim() }));
    if (questions.length !== QUESTIONS) throw new Error(`rating: rubric has ${questions.length} questions`);
    staticData = { items, sites, questions };
    return staticData;
  }

  // Deterministic per-rater order; position -> item row.
  function orderFor(rater) {
    return loadStatic().items
      .map((it) => ({ it, k: sha256(`${rater}|${it.seed}|order|${it.item_id}`) }))
      .sort((a, b) => (a.k < b.k ? -1 : a.k > b.k ? 1 : 0))
      .map((x) => x.it);
  }

  const leftCondition = (rater, it) => (parseInt(sha256(`${rater}|${it.seed}|side|${it.item_id}`).slice(0, 2), 16) & 1 ? 'both' : 'wcag');

  // Final iteration = highest iterN with status ok; null if the slice files are not all there.
  function finalDir(arm, cond, site) {
    const base = path.join(dataDir, 'runs', arm, cond, site);
    let names;
    try { names = fs.readdirSync(base); } catch { return null; }
    const iters = names.map((n) => /^iter(\d+)$/.exec(n)).filter(Boolean).map((m) => Number(m[1])).sort((a, b) => b - a);
    for (const n of iters) {
      const dir = path.join(base, `iter${n}`);
      try {
        if (JSON.parse(fs.readFileSync(path.join(dir, 'status.json'), 'utf8')).status === 'ok') return dir;
      } catch { /* try the next lower iteration */ }
    }
    return null;
  }

  // -> {wcag:{dir,pages}, both:{...}} or null when either variant is missing
  function variantsOf(it) {
    const files = loadStatic().sites[it.site_id];
    if (!files) return null;
    const out = {};
    for (const cond of ['wcag', 'both']) {
      const dir = finalDir(it.arm, cond, it.site_id);
      if (!dir || !files.every((f) => fs.existsSync(path.join(dir, f)))) return null;
      out[cond] = { dir, files };
    }
    return out;
  }

  // cleaned path -> original relative path, for every servable file in a variant dir
  function fileMap(dir) {
    const map = new Map();
    const walk = (rel, depth) => {
      for (const e of fs.readdirSync(path.join(dir, rel), { withFileTypes: true })) {
        if (e.name.startsWith('.')) continue;
        const r = rel ? `${rel}/${e.name}` : e.name;
        if (e.isDirectory()) { if (depth < 4) walk(r, depth + 1); } else if (!['status.json', 'response.json'].includes(r)) {
          const c = cleanPath(r);
          if (!map.has(c)) map.set(c, r);
        }
      }
    };
    walk('', 0);
    return map;
  }

  const mac = (rater, i) => crypto.createHmac('sha256', secret).update(`${rater}|${i}`).digest('hex').slice(0, 32);
  const tokenFor = (rater, i) => `${b64u(`${rater}|${i}`)}.${mac(rater, i)}`;
  function parseToken(token) {
    const [p, m] = String(token).split('.');
    if (!p || !m) return null;
    const [rater, i] = Buffer.from(p, 'base64url').toString('utf8').split('|');
    if (!/^[a-z0-9-]{1,32}$/.test(rater || '') || !/^\d+$/.test(i || '')) return null;
    const want = Buffer.from(mac(rater, i));
    const got = Buffer.from(m);
    return got.length === want.length && crypto.timingSafeEqual(got, want) ? { rater, i: Number(i) } : null;
  }

  // ---- ratings store ----
  function readRatings() {
    try { return readCsvObjects(ratingsFile); } catch (e) { if (e.code === 'ENOENT') return []; throw e; }
  }
  const readLocked = () => withLock(ratingsFile, async () => readRatings());

  // question -> {verdict:A|B|tie, note} for one rater and item
  function answersOf(rows, rater, it) {
    const out = {};
    for (const r of rows) {
      if (r.rater_id !== rater || r.site_id !== it.site_id || r.arm !== it.arm) continue;
      const verdict = r.verdict === 'tie' ? 'tie' : r.verdict === r.shown_left ? 'A' : r.verdict === r.shown_right ? 'B' : null;
      if (verdict) out[r.question] = { verdict, note: r.note.replace(/^'(?=[=+\-@])/, '') };
    }
    return out;
  }

  async function progressOf(rater) {
    const order = orderFor(rater);
    const rows = await readLocked();
    const unavailable = [];
    const answered = order.map((it, i) => {
      if (!variantsOf(it)) { unavailable.push(i); return null; }
      return Object.keys(answersOf(rows, rater, it)).length;
    });
    const perQuestion = {};
    for (let q = 1; q <= QUESTIONS; q++) {
      perQuestion[q] = order.filter((it, i) => answered[i] !== null && answersOf(rows, rater, it)[q]).length;
    }
    const doneItems = answered.filter((n) => n === QUESTIONS).length;
    const next = answered.findIndex((n) => n !== null && n < QUESTIONS);
    return {
      rater_id: rater, total_items: order.length, done_items: doneItems, unavailable, answered,
      per_question: perQuestion, next: next < 0 ? null : next,
    };
  }

  // ---- request handlers ----
  const fail = (res, status, error) => sendJson(res, status, { error });

  function raterFrom(res, name) {
    const rater = slug(name);
    if (!rater) { fail(res, 400, 'name required (letters or digits, up to 64 characters)'); return null; }
    return rater;
  }

  async function start(req, res) {
    const body = await readJsonBody(req);
    const rater = raterFrom(res, body.name);
    if (!rater) return;
    const p = await progressOf(rater);
    sendJson(res, 200, { rater_id: rater, total_items: p.total_items, done_items: p.done_items, next: p.next });
  }

  async function item(req, res, url) {
    const rater = raterFrom(res, url.searchParams.get('name'));
    if (!rater) return;
    const raw = url.searchParams.get('i');
    const order = orderFor(rater);
    if (!/^\d+$/.test(raw || '') || Number(raw) >= order.length) return fail(res, 400, 'i out of range');
    const i = Number(raw);
    const it = order[i];
    const variants = variantsOf(it);
    if (!variants) return fail(res, 409, 'item unavailable');
    const pages = [...fileMap(variants[leftCondition(rater, it)].dir).keys()].filter((c) => c.endsWith('.html'));
    sendJson(res, 200, {
      i, token: tokenFor(rater, i), pages, questions: loadStatic().questions,
      answers: answersOf(await readLocked(), rater, it),
    });
  }

  async function answer(req, res) {
    const b = await readJsonBody(req);
    const rater = raterFrom(res, b.name);
    if (!rater) return;
    const order = orderFor(rater);
    if (!Number.isInteger(b.item) || b.item < 0 || b.item >= order.length) return fail(res, 400, 'item out of range');
    if (!Number.isInteger(b.question) || b.question < 1 || b.question > QUESTIONS) return fail(res, 400, 'question must be 1..14');
    if (!VERDICTS.includes(b.verdict)) return fail(res, 400, 'verdict must be A, B or tie');
    if (b.note !== undefined && typeof b.note !== 'string') return fail(res, 400, 'note must be text');
    let note = (b.note || '').replace(/[\r\n\t]/g, ' ').replace(/[\u0000-\u001f\u007f]/g, '').trim();
    if (note.length > MAX_NOTE) return fail(res, 400, `note must be at most ${MAX_NOTE} characters`);
    if (/^[=+\-@]/.test(note)) note = `'${note}`;
    const it = order[b.item];
    if (!variantsOf(it)) return fail(res, 409, 'item unavailable');
    const left = leftCondition(rater, it);
    const right = left === 'wcag' ? 'both' : 'wcag';
    const verdict = b.verdict === 'tie' ? 'tie' : b.verdict === 'A' ? left : right;
    const row = [it.site_id, it.arm, String(b.question), rater, verdict, note, left, right, new Date().toISOString()];
    await withLock(ratingsFile, async () => {
      const rows = fs.existsSync(ratingsFile) ? parseCsv(fs.readFileSync(ratingsFile, 'utf8').replace(/^\uFEFF/, '')).slice(1) : [];
      const at = rows.findIndex((r) => r[0] === row[0] && r[1] === row[1] && r[2] === row[2] && r[3] === row[3]);
      if (at >= 0) rows[at] = row; else rows.push(row);
      await fsp.mkdir(path.dirname(ratingsFile), { recursive: true });
      const tmp = `${ratingsFile}.${process.pid}.${crypto.randomBytes(4).toString('hex')}.tmp`;
      await fsp.writeFile(tmp, toCsv([CSV_HEADER, ...rows]));
      await renameRetry(tmp, ratingsFile);
    });
    sendJson(res, 200, { ok: true });
  }

  async function progress(req, res, url) {
    const rater = raterFrom(res, url.searchParams.get('name'));
    if (!rater) return;
    sendJson(res, 200, await progressOf(rater));
  }

  function rewriteRef(ref, curOrig, base) {
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(ref) || ref === '') return ref;
    const m = /^([^?#]*)(.*)$/.exec(ref);
    const resolved = ref[0] === '/' || m[1] === '' ? m[1].replace(/^\/+/, '') : path.posix.join(path.posix.dirname(curOrig), m[1]);
    const norm = path.posix.normalize(resolved);
    if (!norm || norm === '.' || norm.startsWith('..')) return `${base}f`; // escapes the variant: dead link
    return base + cleanPath(norm).split('/').map(encodeURIComponent).join('/') + m[2];
  }

  function rewriteText(text, curOrig, base, isHtml) {
    let out = stripMarkers(text).replace(/url\(\s*(['"]?)([^'")]*)\1\s*\)/gi, (_, q, ref) => `url(${q}${rewriteRef(ref.trim(), curOrig, base)}${q})`);
    if (isHtml) out = out.replace(/(\b(?:href|src|poster|action)\s*=\s*)(?:"([^"]*)"|'([^']*)')/gi, (_, pre, d, s) => `${pre}"${rewriteRef((d ?? s).trim(), curOrig, base)}"`);
    return out;
  }

  function frame(req, res, url) {
    const parts = url.pathname.split('/').slice(3); // token, side, page...
    let segs;
    try { segs = parts.slice(2).map(decodeURIComponent); } catch { return fail(res, 404, 'not found'); }
    const tok = parseToken(parts[0]);
    if (!tok || !['l', 'r'].includes(parts[1])) return fail(res, 404, 'not found');
    if (!segs.length || segs.some((s) => s === '' || s === '.' || s === '..' || /[\\\0:]/.test(s))) return fail(res, 404, 'not found');
    const it = orderFor(tok.rater)[tok.i];
    const variants = it && variantsOf(it);
    if (!variants) return fail(res, 404, 'not found');
    const left = leftCondition(tok.rater, it);
    const dir = variants[parts[1] === 'l' ? left : left === 'wcag' ? 'both' : 'wcag'].dir;
    const orig = fileMap(dir).get(segs.join('/'));
    if (!orig) return fail(res, 404, 'not found');
    const ext = path.extname(orig).toLowerCase();
    const headers = {
      'Content-Type': MIME[ext] || 'application/octet-stream', 'Content-Security-Policy': FRAME_CSP,
      'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer', 'Cache-Control': 'no-store',
    };
    const buf = fs.readFileSync(path.join(dir, orig));
    const textual = ['.html', '.css', '.svg', '.txt'].includes(ext);
    res.writeHead(200, headers);
    res.end(textual ? rewriteText(buf.toString('utf8'), orig, `/rate/frame/${parts[0]}/${parts[1]}/`, ext === '.html') : buf);
  }

  const routes = { '/api/rate/start': ['POST', start], '/api/rate/item': ['GET', item], '/api/rate/answer': ['POST', answer], '/api/rate/progress': ['GET', progress] };

  // Returns false for paths this module does not own. ctx is accepted for interface parity; local helpers are used.
  function handle(req, res, url) {
    const u = url instanceof URL ? url : new URL(url || req.url, 'http://localhost');
    const isFrame = u.pathname.startsWith('/rate/frame/');
    const route = routes[u.pathname];
    if (!route && !isFrame) return false;
    const run = async () => {
      if (isFrame) {
        if (req.method !== 'GET' && req.method !== 'HEAD') return fail(res, 405, 'method not allowed');
        return frame(req, res, u);
      }
      if (req.method !== route[0]) return fail(res, 405, 'method not allowed');
      return route[1](req, res, u);
    };
    run().catch((e) => {
      if (res.headersSent) return res.end();
      fail(res, e.status || 500, e.status ? e.message : 'internal error');
    });
    return true;
  }

  return { handle };
}

module.exports = { create, cleanPath, stripMarkers, slug };
