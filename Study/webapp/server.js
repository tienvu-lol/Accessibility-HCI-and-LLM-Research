// Researcher console server: UI + API + coordinator. Zero dependencies (Node built-ins only).
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execFile, spawn } = require('child_process');
const { promisify } = require('util');

const H = require('./lib/http');
const csv = require('./lib/csv');
const authLib = require('./lib/auth');
const keysLib = require('./lib/keys');
const stateLib = require('./lib/state');
const storeLib = require('./lib/store');
const coordLib = require('./lib/coordinator');
const importer = require('./lib/importer');
const sseLib = require('./lib/sse');
const launchLib = require('./lib/launches');
const dockerLib = require('./lib/docker');

const { HttpError, json, readJson, readBody, sendFile, safeJoin } = H;
const HUMAN_HEADER = ['site_id', 'arm', 'question', 'rater_id', 'verdict', 'note', 'shown_left', 'shown_right', 'ts'];
const VARIANT_CSP = "sandbox; default-src 'self' 'unsafe-inline'";
const execFileP = promisify(execFile);

// require an optional module; only a missing module itself (not a bug inside it) is tolerated
function optional(name) {
  try { return require(name); } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND' && e.message.includes(name.replace('./', ''))) return null;
    throw e;
  }
}

function createApp(opts = {}) {
  const env = opts.env || process.env;
  const production = env.NODE_ENV === 'production';
  if (production && (!env.APP_PASSWORD || !env.WORKER_TOKEN)) throw new Error('APP_PASSWORD and WORKER_TOKEN are required in production');
  const dataDir = path.resolve(opts.dataDir || env.DATA_DIR || './data');
  const studyDir = path.resolve(opts.studyDir || env.STUDY_DIR || path.join(__dirname, '..'));
  const publicDir = path.join(__dirname, 'public');
  const now = opts.now || Date.now;
  fs.mkdirSync(dataDir, { recursive: true });

  const cfg = JSON.parse(fs.readFileSync(path.join(studyDir, 'config', 'repair-allocation.json'), 'utf8'));
  const sitesCsv = csv.readRows(path.join(studyDir, 'sample', 'sites.csv'));
  const sites = sitesCsv.slice(1).map((r) => {
    const o = Object.fromEntries(sitesCsv[0].map((h, i) => [h, r[i]]));
    return { ...o, slice_files: o.slice_files.split(';') };
  });

  const store = storeLib.create(dataDir);
  const auth = authLib.create({ password: env.APP_PASSWORD, workerToken: env.WORKER_TOKEN, now });
  if (!auth.enabled) console.warn('APP_PASSWORD not set: authentication is disabled (development only)');

  const armKind = (id) => /self-hosted/.test(cfg.arms[id].serving || '') ? 'open_source' : 'mainstream';
  const openArms = Object.fromEntries(Object.entries(cfg.arms).filter(([id]) => armKind(id) === 'open_source'));
  const ctx = {
    dataDir, studyDir, cfg, sites, store, now, keys: keysLib.create(env, openArms),
    mock: env.MOCK_PROVIDERS === '1', geminiRejected: false,
    state: stateLib.load(dataDir, cfg),
    ledger: store.readJsonl('usage.jsonl'),
    siteIds: () => sites.map((s) => s.site_id),
    armKind,
    concurrency: (id) => (Number.isInteger(cfg.arms[id].concurrency) ? cfg.arms[id].concurrency : 4),
    baselineFile: (site, file) => { try { return fs.readFileSync(path.join(studyDir, 'baseline', site, file), 'utf8'); } catch { return ''; } },
    estimate: () => estimate(),
  };
  ctx.docker = dockerLib.create({ env, port: Number(env.PORT) || 8080 });
  ctx.coord = coordLib.create(ctx, { leaseS: opts.leaseS });
  ctx.machineOf = ctx.coord.machineOf; // usage is attributed per computer, not per container
  ctx.tailnet = require('./lib/tailnet').create(ctx, env.TAILSCALE_CLI);
  ctx.launches = launchLib.create(ctx, env.DASHBOARD_LAUNCH_TOKEN);

  // ---- per-call token estimate: estimate.json (python), else chars/4 of the slice files
  let spawned = false, fallback = null;
  function runEstimator() {
    const script = path.join(__dirname, 'estimate.py');
    if (spawned || !fs.existsSync(script)) return;
    spawned = true;
    const args = [script, '--study', studyDir, '--out', path.join(dataDir, 'estimate.json')];
    const tryExe = (list) => {
      if (!list.length) return;
      const p = spawn(list[0], args, { cwd: __dirname, stdio: 'ignore' });
      p.on('error', () => tryExe(list.slice(1)));
    };
    tryExe(env.PYTHON ? [env.PYTHON] : ['python3', 'python']);
  }
  function estimate() {
    const j = store.readJson('estimate.json');
    if (j) {
      const src = j.per_call || j;
      const input = [src.avg_in, src.input_tokens, src.input].find(Number.isFinite);
      const output = [src.avg_out, src.output_tokens, src.output].find(Number.isFinite);
      if (input !== undefined && output !== undefined) return { input, output };
    } else runEstimator();
    if (!fallback) {
      const chars = sites.map((s) => s.slice_files.reduce((n, f) => n + ctx.baselineFile(s.site_id, f).length, 0));
      const mean = chars.length ? chars.reduce((a, b) => a + b, 0) / chars.length : 0;
      fallback = { input: mean / 4, output: (mean / 4) * 1.1 };
    }
    return fallback;
  }

  const getSnapshot = () => (env.DEMO === '1' ? stateLib.demoSnapshot(ctx) : stateLib.snapshot(ctx));
  const sse = sseLib.create(getSnapshot);
  const results = optional('./lib/results');
  const rating = optional('./lib/rating');
  const ratingHandler = rating && rating.create({ dataDir, studyDir, secret: auth.secret.toString('hex') });
  let resultsCache = { at: 0, value: null };
  const activeOpts = () => ({ sites: ctx.state.settings.sites || ctx.siteIds(), conditions: ctx.state.settings.conditions,
    arms: Object.keys(ctx.state.arms), maxIter: ctx.state.settings.max_iter,
    // only legacy usage rows need these: rows written now carry the cost they were booked at
    pricing: ctx.state.pricing,
    modelBySource: Object.fromEntries(Object.entries(ctx.state.arms).map(([id, a]) => [id, a.model_id])) });
  const resultsFor = () => {
    if (now() - resultsCache.at > 2000) resultsCache = { at: now(), value: results.build(dataDir, activeOpts()) };
    return resultsCache.value;
  };

  // ---- handlers
  const notFound = () => { throw new HttpError(404, 'not found'); };
  const body = (req, max) => readJson(req, max);

  async function api(req, res, url, parts) {
    const m = req.method;
    const [, , a, b, c] = parts; // ['', 'api', a, b, c]
    if (a === 'state' && m === 'GET') return json(res, 200, getSnapshot());
    if (a === 'events' && m === 'GET') return sse.add(req, res);

    if (a === 'keys' && b) {
      if (!ctx.keys.has(b)) throw new HttpError(400, 'bad key slot');
      if (m === 'DELETE') ctx.keys.delete(b);
      else if (m === 'PUT') {
        const { key } = await body(req);
        if (typeof key !== 'string' || !key.trim() || key.length > 500 || /\s/.test(key.trim())) throw new HttpError(400, 'key must be a non-empty string');
        ctx.keys.set(b, key.trim());
      } else notFound();
      sse.notify();
      return json(res, 200, { ok: true, key: ctx.keys.status()[b] });
    }
    if (a === 'arms' && b && m === 'PUT') {
      if (!ctx.state.arms[b] || ctx.armKind(b) !== 'mainstream') throw new HttpError(400, 'only mainstream arms are configurable');
      const { provider, model_id } = await body(req);
      if (provider === 'gemini') { ctx.geminiRejected = true; throw new HttpError(400, 'Gemini is the judge only; arms accept openai or anthropic'); }
      if (!stateLib.ARM_PROVIDERS.includes(provider)) throw new HttpError(400, 'provider must be openai or anthropic');
      if (typeof model_id !== 'string' || !model_id.trim() || model_id.length > 200) throw new HttpError(400, 'model_id required');
      ctx.state.arms[b] = { provider, model_id: model_id.trim() };
      ctx.state.save(); sse.notify();
      return json(res, 200, { ok: true });
    }
    if (a === 'settings' && m === 'PUT') {
      const err = stateLib.applySettings(ctx, await body(req));
      if (err) throw new HttpError(400, err);
      ctx.state.save(); sse.notify();
      return json(res, 200, { ok: true, settings: ctx.state.settings });
    }
    if (a === 'pricing' && m === 'PUT') {
      const err = stateLib.applyPricing(ctx, await body(req));
      if (err) throw new HttpError(400, err);
      ctx.state.save(); sse.notify();
      return json(res, 200, { ok: true });
    }
    if (a === 'run' && m === 'POST') {
      const co = ctx.coord;
      if (b === 'start') {
        const { phase, force } = await body(req);
        if (!['repair', 'judge', 'score'].includes(phase)) throw new HttpError(400, 'phase must be repair, judge or score');
        const r = co.start(phase, !!force);
        if (!r.blockers && !ctx.state.baseline) { ctx.state.baseline = stateLib.captureBaseline(ctx); ctx.state.save(); }
        sse.notify();
        if (r.blockers) return json(res, 409, { error: 'blocked', blockers: r.blockers });
        return json(res, 200, { ok: true });
      }
      if (b === 'pause') co.pause();
      else if (b === 'resume') co.resume();
      else if (b === 'retry-failed') { const n = co.retryFailed(); sse.notify(); return json(res, 200, { ok: true, requeued: n }); }
      else notFound();
      sse.notify();
      return json(res, 200, { ok: true });
    }
    // Set the recorded usage aside. Mock/test runs otherwise keep every arm's projection "measured"
    // off fabricated token counts for good, so there has to be a way to start the books clean.
    if (a === 'usage' && b === 'reset' && m === 'POST') {
      const r = ctx.coord.resetLedger();
      ctx.state.baseline = null;
      ctx.state.save(); sse.notify();
      return json(res, 200, { ok: true, ...r });
    }
    if (a === 'projection' && b === 'baseline' && m === 'POST') {
      ctx.state.baseline = stateLib.captureBaseline(ctx);
      ctx.state.save(); sse.notify();
      return json(res, 200, { ok: true });
    }
    if (a === 'launchers' && b && parts.length === 4 && m === 'POST') {
      const { target, arm, job_id, kind } = await body(req);
      ctx.launches.deploy(decodeURIComponent(b), target, { arm, job_id, kind });
      sse.notify();
      return json(res, 202, { ok: true });
    }
    if (a === 'launchers' && b && parts.length === 4 && m === 'DELETE') {
      ctx.launches.cancel(decodeURIComponent(b));
      sse.notify();
      return json(res, 200, { ok: true });
    }
    if (a === 'arms' && b && parts.length === 5 && parts[4] === 'claim' && (m === 'POST' || m === 'DELETE')) {
      const arm = decodeURIComponent(b);
      const r = m === 'POST' ? ctx.coord.claimArm(arm, String((await body(req).catch(() => ({}))).worker_id || '')) : ctx.coord.releaseArm(arm);
      sse.notify();
      return json(res, 200, { ok: true, ...r });
    }
    if (a === 'queue' && b === 'cancel' && m === 'POST') {
      const r = ctx.coord.cancelQueued(await body(req).catch(() => ({})));
      sse.notify();
      return json(res, 200, { ok: true, ...r });
    }
    if (a === 'jobs' && b && parts.length === 5 && parts[4] === 'stop' && m === 'POST') {
      const r = ctx.coord.stopJob(decodeURIComponent(b));
      sse.notify();
      return json(res, 202, r);
    }
    if (a === 'workers' && b && parts.length === 5 && parts[4] === 'claim' && (m === 'POST' || m === 'DELETE')) {
      const id = decodeURIComponent(b);
      const claim = m === 'POST' ? ctx.coord.requestWork(id, await body(req).catch(() => ({}))) : ctx.coord.unclaimWork(id);
      sse.notify();
      return json(res, 200, { ok: true, ...claim });
    }
    if (a === 'workers' && b && parts.length === 4 && m === 'PUT') {
      ctx.coord.setWorkerCtl(decodeURIComponent(b), await body(req));
      sse.notify();
      return json(res, 200, { ok: true });
    }
    if (a === 'docker' && b === 'workers') {
      const wrap = async (fn) => { try { return await fn(); } catch (e) { throw new HttpError(400, e.message); } };
      if (m === 'POST') {
        const { count, slots } = await body(req);
        const r = await wrap(() => ctx.docker.start(count, slots));
        sse.notify();
        return json(res, r.started.length ? 200 : 502, { ok: r.started.length > 0, ...r });
      }
      if (m === 'DELETE') {
        const r = await wrap(() => ctx.docker.stop(c ? decodeURIComponent(c) : null));
        sse.notify();
        return json(res, 200, { ok: true, ...r });
      }
      notFound();
    }
    if (a === 'import' && m === 'POST') {
      const r = await importer.run(ctx, req);
      sse.notify();
      return json(res, 200, r);
    }
    if (a === 'human' && b === 'build' && m === 'POST') return humanBuild(res);
    if (a === 'human' && b === 'ratings' && m === 'POST') return humanRatings(req, res);
    if (a === 'variant' && m === 'GET') return variant(res, parts.slice(3));
    if (a === 'results' && m === 'GET') {
      if (!results) return json(res, 501, { error: 'results module not available' });
      return json(res, 200, resultsFor());
    }
    if (a === 'export' && m === 'GET' && b === 'runs.tar.gz') { // stored run tree, same layout as Study/runs
      if (!fs.existsSync(path.join(dataDir, 'runs'))) notFound();
      res.writeHead(200, { 'Content-Type': 'application/gzip', 'Content-Disposition': 'attachment; filename="runs.tar.gz"', 'Cache-Control': 'no-store' });
      const tar = spawn('tar', ['-czf', '-', '-C', dataDir, 'runs'], { stdio: ['ignore', 'pipe', 'ignore'] });
      tar.on('error', () => res.destroy());
      tar.stdout.pipe(res);
      return;
    }
    if (a === 'export' && m === 'GET' && b) {
      if (!results) return json(res, 501, { error: 'results module not available' });
      const tables = results.tables(dataDir, activeOpts());
      if (b === 'all.json') return json(res, 200, { ...resultsFor(), tables });
      const name = /^([a-z0-9_]+)\.csv$/.exec(b);
      const t = name && Object.prototype.hasOwnProperty.call(tables, name[1]) ? tables[name[1]] : null;
      if (!t) notFound();
      res.writeHead(200, { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': `attachment; filename="${name[1]}.csv"`, 'Cache-Control': 'no-store' });
      return res.end(csv.stringify([t.columns, ...t.rows]));
    }
    return notFound();
  }

  async function worker(req, res, parts) {
    if (!auth.isWorker(req)) throw new HttpError(401, 'bad worker token');
    if (req.method !== 'POST') notFound();
    const op = parts[3];
    const co = ctx.coord;
    let out;
    if (op === 'claim') out = { jobs: co.claim(await body(req)) };
    else if (op === 'heartbeat') { const b = await body(req); out = co.heartbeat(b.job_id, b); }
    else if (op === 'release') { const b = await body(req); out = co.release(b.job_id, b.reason, b.retryable, b); }
    else if (op === 'result') out = co.result(await body(req, 90 * 1024 * 1024));
    else notFound();
    sse.notify();
    return json(res, 200, out);
  }

  function variant(res, p) { // p = [arm, cond, site, iter, ...page]
    const seg = p.map((s) => { try { return decodeURIComponent(s); } catch { return ''; } });
    const [arm, cond, site, iter, ...page] = seg;
    if (!arm || !site || !page.length) notFound();
    const baseline = safeJoin(path.join(studyDir, 'baseline'), [site, ...page]);
    let file = null, fallback = null;
    if (arm === 'baseline') file = baseline;
    else if (/^A\d+$/.test(arm) && stateLib.CONDITIONS.includes(cond) && /^(iter)?\d+$/.test(iter || '')) {
      const iterDir = safeJoin(path.join(dataDir, 'runs'), [arm, cond, site, `iter${iter.replace('iter', '')}`]);
      file = iterDir && safeJoin(iterDir, page);
      // a stored iteration only holds the slice; its other assets come from the baseline site
      if (iterDir && fs.existsSync(iterDir)) fallback = baseline;
    }
    if (!file) notFound();
    if (!sendFile(res, file, { csp: VARIANT_CSP }) && !(fallback && sendFile(res, fallback, { csp: VARIANT_CSP }))) notFound();
  }

  async function humanBuild(res) {
    const human = path.join(dataDir, 'human');
    const run = (cmd, args) => execFileP(cmd, args, { timeout: 120000, cwd: studyDir });
    try {
      await run(process.execPath, [path.join(studyDir, 'human', 'build_harness.js'), path.join(studyDir, 'sample', 'human_items.csv'),
        path.join(dataDir, 'blinding_key.csv'), path.join(human, 'harness')]);
      const py = path.join(studyDir, 'human', 'materialize_variants.py');
      if (fs.existsSync(py)) await run(env.PYTHON || 'python3', [py, '--study', studyDir, '--data', dataDir, '--out', path.join(human, 'variants')]);
    } catch (e) {
      throw new HttpError(500, `human build failed: ${String(e.stderr || e.message).slice(0, 500)}`);
    }
    sse.notify();
    return json(res, 200, { ok: true });
  }

  async function humanRatings(req, res) {
    const rows = csv.parse(await readBody(req, 5 * 1024 * 1024));
    if (!rows.length || rows[0].join(',') !== HUMAN_HEADER.join(',')) throw new HttpError(400, 'header mismatch');
    const data = rows.slice(1);
    if (!data.every((r) => r.length === HUMAN_HEADER.length)) throw new HttpError(400, 'bad row width');
    for (const r of data) if (/^[=+\-@]/.test(r[5])) r[5] = `'${r[5]}`;
    const file = path.join(dataDir, 'human', 'human_ratings.csv');
    const exists = csv.readRows(file).length > 0;
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.appendFileSync(file, csv.stringify(exists ? data : [HUMAN_HEADER, ...data]));
    sse.notify();
    return json(res, 200, { ok: true, appended: data.length });
  }

  function serveStatic(req, res, pathname) {
    let segs;
    try { segs = decodeURIComponent(pathname).split('/').filter(Boolean); } catch { return false; }
    if (pathname === '/') segs = ['index.html'];
    if (pathname === '/rate' || pathname === '/rate/') segs = ['rate.html'];
    const file = safeJoin(publicDir, segs);
    if (!file) return false;
    return sendFile(res, file, { cache: file.endsWith('.html') ? 'no-cache' : 'public, max-age=300' });
  }

  async function handle(req, res) {
    const url = new URL(req.url, 'http://x');
    const p = url.pathname;
    const parts = p.split('/'); // ['', 'api', ...]
    if (p === '/healthz') return json(res, 200, { ok: true });
    if (p === '/api/login' && req.method === 'POST') {
      const r = auth.login(req, (await body(req)).password);
      if (r.limited) { res.setHeader('Retry-After', '60'); return json(res, 429, { error: 'too many attempts' }); }
      if (!r.ok) return json(res, 401, { error: 'wrong password' });
      res.setHeader('Set-Cookie', r.cookie);
      return json(res, 200, { ok: true });
    }
    if (p === '/api/logout' && req.method === 'POST') {
      res.setHeader('Set-Cookie', auth.logoutCookie);
      return json(res, 200, { ok: true });
    }
    if (p.startsWith('/api/worker/')) return worker(req, res, parts);
    if (p === '/api/launcher/poll' && req.method === 'POST') {
      if (!ctx.launches.valid(req.headers.authorization)) throw new HttpError(401, 'bad launcher token');
      const out = ctx.launches.poll(await body(req));
      sse.notify();
      return json(res, 200, out);
    }

    // login.html loads these (plus the self-hosted fonts); they hold no secrets, so they must be reachable without a cookie
    const isLoginAsset = p === '/login.html' || p.startsWith('/login.') || p === '/favicon.svg' || p === '/style.css' || p === '/app.js' || p === '/charts.js' || p.startsWith('/fonts/');
    if (!isLoginAsset && !auth.isAuthed(req)) {
      if (p.startsWith('/api/') || p.startsWith('/rate/frame/')) return json(res, 401, { error: 'login required' });
      res.writeHead(302, { Location: '/login.html' });
      return res.end();
    }
    if (p.startsWith('/api/rate/') || p.startsWith('/rate/frame/')) {
      const handled = ratingHandler && await ratingHandler.handle(req, res, url, { readBody, json, sendFile });
      if (handled) return;
      return json(res, ratingHandler ? 404 : 501, { error: ratingHandler ? 'not found' : 'rating module not available' });
    }
    if (p.startsWith('/api/')) return api(req, res, url, parts);
    if (p.startsWith('/human/')) {
      const [, , kind, ...rest] = parts;
      const f = ['harness', 'variants'].includes(kind) ? safeJoin(path.join(dataDir, 'human', kind), rest.map(decodeURIComponent)) : null;
      if (f && sendFile(res, f, { csp: kind === 'variants' ? VARIANT_CSP : undefined })) return;
      return json(res, 404, { error: 'not found' });
    }
    if (req.method === 'GET' && serveStatic(req, res, p)) return;
    return json(res, 404, { error: 'not found' });
  }

  const server = http.createServer((req, res) => {
    handle(req, res).catch((e) => {
      if (res.headersSent) return res.destroy();
      if (e instanceof HttpError) return json(res, e.status, { error: e.message, ...e.extra });
      console.error('request failed:', req.method, req.url.split('?')[0], e.message);
      json(res, 500, { error: 'internal error' });
    });
  });

  return {
    server, ctx, sse,
    listen: (port = Number(env.PORT) || 8080) => new Promise((resolve) => server.listen(port, () => { ctx.docker.watch(() => sse.notify()); resolve(server.address().port); })),
    close: () => new Promise((resolve) => {
      sse.close();
      ctx.tailnet.stop();
      ctx.docker.unwatch();
      ctx.state.flush();
      server.close(resolve);
      server.closeAllConnections();
    }),
  };
}

if (require.main === module) {
  const app = createApp();
  app.listen().then((port) => console.log(`console listening on :${port}`));
  for (const sig of ['SIGTERM', 'SIGINT']) process.on(sig, () => app.close().then(() => process.exit(0)));
}

module.exports = { createApp };
