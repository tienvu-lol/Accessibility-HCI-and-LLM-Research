// Job queue, leases, budget gate and result ingestion for repair / score / judge jobs.
const crypto = require('crypto');
const csv = require('./csv');
const proj = require('./projection');
const keysLib = require('./keys');
const { HttpError } = require('./http');
const { validateFiles } = require('./store');
const { CONDITIONS } = require('./state');

const MAX_ATTEMPTS = 3;
const BASE_URL = { anthropic: null, openai: 'https://api.openai.com/v1', gemini: 'https://generativelanguage.googleapis.com/v1beta/openai' };
const METRICS_HEADER = ['site_id', 'category', 'generator_group', 'arm', 'condition', 'iteration', 'page', 'breakpoint', 'axe_violations',
  'axe_passes', 'axe_incomplete', 'violation_rate', 'ax_name_chars', 'ax_interactive_nodes', 'name_chars_per_interactive', 'tab_order_mismatches',
  'keyboard_traps', 'unreachable_interactives', 'focus_visible_fails', 'heading_skips', 'text_chars', 'element_count', 'status'];
const METRICS_KEY = [0, 3, 4, 5, 6, 7];
const JUDGE_HEADER = ['site_id', 'arm', 'question', 'condition', 'rank', 'judge_model', 'call_id'];
const KEY_HEADER = ['site_id', 'arm', 'label_shown', 'condition'];
const num = (v) => (Number.isFinite(v) && v >= 0 ? Math.round(v) : 0);

function create(ctx, { leaseS = 900 } = {}) {
  const { state, store } = ctx;
  const jobs = new Map(state.queue.map((j) => [j.id, { ...j }]));
  const imported = new Set(state.imported);
  const workers = new Map();
  const scored = new Set();
  const mainstream = () => Object.keys(state.arms).filter((a) => ctx.armKind(a) === 'mainstream');
  const dispatched = () => Object.keys(state.arms).filter((a) => ctx.armKind(a) === 'mainstream' || state.settings.dispatch_open);
  // fresh workers that advertise a reachable ARC tunnel for this arm
  const arcWorkers = (arm) => [...workers.values()].filter((w) => w.arcs && w.arcs[arm] && ctx.now() - w.last_seen < 60000);
  const siteList = () => state.settings.sites || ctx.siteIds();
  const persist = () => {
    state.queue = [...jobs.values()].map(({ worker, lease_exp, ...j }) => ({ ...j, state: j.state === 'running' ? 'queued' : j.state }));
    state.imported = [...imported];
    state.save();
  };

  // ---- metrics seed + scored index
  const metricsFile = store.abs('metrics/metrics.csv');
  if (!store.readText('metrics/metrics.csv')) {
    const seed = csv.readRows(require('path').join(ctx.studyDir, 'metrics', 'metrics.csv'));
    if (seed.length) csv.writeAtomic(metricsFile, csv.stringify(seed));
  }
  for (const r of csv.readRows(metricsFile).slice(1)) scored.add(`${r[3]}|${r[4]}|${r[0]}`);

  function addJob(kind, arm, condition, site) {
    const id = kind === 'judge' ? `judge:${site}:${arm}` : `${kind}:${arm}:${condition}:${site}`;
    if (jobs.has(id)) return jobs.get(id);
    const j = { id, kind, arm, condition, site, state: 'queued', attempts: 0, error: null };
    jobs.set(id, j);
    return j;
  }
  const queueScore = (arm, cond, site) => { if (!scored.has(`${arm}|${cond}|${site}`)) addJob('score', arm, cond, site); };

  // ---- cell view
  function char(arm, cond, site) {
    if (imported.has(`${arm}/${cond}/${site}`)) return 'i';
    const j = jobs.get(`repair:${arm}:${cond}:${site}`);
    if (!j) return '-';
    if (j.state === 'queued') return '.';
    if (j.state === 'running') return 'r';
    return j.state === 'done' ? 'o' : j.final === 't' ? 't' : 'f';
  }
  function armCells(arm) {
    const c = { total: 0, queued: 0, running: 0, ok: 0, failed: 0, truncated: 0, imported: 0, converged: 0 };
    const name = { '.': 'queued', r: 'running', o: 'ok', f: 'failed', t: 'truncated', i: 'imported' };
    for (const cond of state.settings.conditions) {
      for (const site of siteList()) {
        c.total++;
        const ch = char(arm, cond, site);
        if (name[ch]) c[name[ch]]++;
        if (ch === 'o' && jobs.get(`repair:${arm}:${cond}:${site}`).converged) c.converged++;
      }
    }
    return c;
  }
  const finishedRepairs = (arm) => [...jobs.values()].filter((j) => j.kind === 'repair' && j.arm === arm && (j.state === 'done' || j.state === 'failed')).length;
  const matrix = () => Object.fromEntries(Object.keys(state.arms).map((arm) => [arm, Object.fromEntries(
    state.settings.conditions.map((cond) => [cond, siteList().map((site) => char(arm, cond, site)).join('')]))]));
  const judgeItems = () => {
    const n = { total: 0, queued: 0, running: 0, done: 0, failed: 0 };
    for (const j of jobs.values()) if (j.kind === 'judge') { n.total++; n[j.state]++; }
    return n;
  };

  // ---- readiness
  // ---- which computer ran what
  // The matrix is sent once per snapshot, so a machine is one character: an index into `machines`.
  // '-' = no machine (not run here yet). Imported cells belong to the pseudo-machine "(imported)".
  const MACHINE_CHARS = '0123456789abcdefghijklmnopqrstuvwxyz';
  const IMPORTED = '(imported)';
  function machineView(agg) {
    const ids = new Set();
    for (const j of jobs.values()) if (j.worker) ids.add(j.worker);
    for (const id of workers.keys()) ids.add(id);
    if (agg) for (const m of agg.machines) ids.add(m.id);
    if (imported.size) ids.add(IMPORTED);
    const order = [...ids].filter((id) => id && id !== 'unknown').sort().slice(0, MACHINE_CHARS.length);
    const idx = new Map(order.map((id, i) => [id, MACHINE_CHARS[i]]));
    const stats = new Map((agg ? agg.machines : []).map((m) => [m.id, m]));
    const t = ctx.now();
    const machines = order.map((id, i) => {
      const w = workers.get(id), m = stats.get(id) || {};
      return { id, char: MACHINE_CHARS[i], online: !!w && t - w.last_seen < 60000, host: w && w.info ? w.info.host : null,
        os: w && w.info ? w.info.os : null, running: w ? runningOn(id) : 0,
        calls: m.calls || 0, input: m.input || 0, output: m.output || 0, cost_usd: m.cost_usd || 0, mock_calls: m.mock_calls || 0,
        cells: 0 };
    });
    const byChar = new Map(machines.map((m) => [m.char, m]));
    const cellChar = (arm, cond, site) => {
      if (imported.has(`${arm}/${cond}/${site}`)) return idx.get(IMPORTED) || '-';
      const j = jobs.get(`repair:${arm}:${cond}:${site}`);
      return (j && j.worker && idx.get(j.worker)) || '-';
    };
    const matrix_workers = Object.fromEntries(Object.keys(state.arms).map((arm) => [arm, Object.fromEntries(
      state.settings.conditions.map((cond) => [cond, siteList().map((site) => {
        const c = cellChar(arm, cond, site);
        const m = byChar.get(c);
        if (m) m.cells++;
        return c;
      }).join('')]))]));
    return { machines, matrix_workers };
  }

  const armBlockers = (id) => {
    const a = state.arms[id];
    if (ctx.armKind(id) === 'open_source') {
      if (state.settings.dispatch_open) return arcWorkers(id).length ? [] : [`no online worker with an ARC tunnel for ${id}`];
      return armCells(id).imported ? [] : ['no imported cells'];
    }
    const b = [];
    if (!a.provider) b.push('provider not set');
    if (!a.model_id) b.push('model not set');
    if (a.provider && !ctx.mock && !ctx.keys.get(a.provider)) b.push(`no ${a.provider} key`);
    return b;
  };
  const judgeBlockers = () => {
    const b = [];
    if (!state.settings.judge_model_id) b.push('judge model not set');
    if (!ctx.mock && !ctx.keys.get('gemini')) b.push('no gemini key');
    return b;
  };

  // ---- run control
  function reap() {
    const t = ctx.now();
    for (const j of jobs.values()) if (j.state === 'running' && j.lease_exp < t) { j.state = 'queued'; j.error = 'lease expired'; }
    if (state.run.phase === 'running' && ![...jobs.values()].some((j) => j.state === 'queued' || j.state === 'running')) {
      state.run = { phase: 'idle', kind: null, started_at: null };
      persist();
    }
  }

  function planRepair() {
    for (const site of siteList()) {
      for (const cond of state.settings.conditions) {
        for (const arm of dispatched()) {
          const j = addJob('repair', arm, cond, site);
          const last = store.lastStatus(arm, cond, site);
          if (j.state === 'queued' && last && last.st.status === 'ok' && (last.st.converged || last.n >= state.settings.max_iter)) {
            Object.assign(j, { state: 'done', final: 'o', converged: !!last.st.converged });
            queueScore(arm, cond, site);
          }
        }
      }
    }
  }
  const queueBaselines = () => siteList().forEach((site) => queueScore('baseline', 'baseline', site));

  function planScore() {
    queueBaselines();
    for (const j of jobs.values()) if (j.kind === 'score' && j.state === 'failed') Object.assign(j, { state: 'queued', attempts: 0, error: null });
    for (const j of [...jobs.values()]) if (j.kind === 'repair' && j.state === 'done' && j.final === 'o') queueScore(j.arm, j.condition, j.site);
    for (const cell of imported) queueScore(...cell.split('/'));
  }

  const hasVariants = (arm, site) => CONDITIONS.every((c) => {
    const its = store.iterations(arm, c, site);
    return its.length && store.iterFiles(arm, c, site, its[its.length - 1])['index.html'] !== undefined;
  });
  // Streaming judge: a (site, arm) is queued the moment all its conditions are finished, while other cells still run.
  function maybeQueueJudge(arm, site) {
    const ready = state.settings.conditions.length === CONDITIONS.length &&
      CONDITIONS.every((c) => 'oi'.includes(char(arm, c, site))) && hasVariants(arm, site);
    if (ready) addJob('judge', arm, null, site);
  }
  function planJudge() {
    for (const site of siteList()) for (const arm of Object.keys(state.arms)) if (hasVariants(arm, site)) addJob('judge', arm, null, site);
  }

  function start(phase, force) {
    let blockers = [];
    if (phase === 'repair') blockers = dispatched().flatMap((id) => armBlockers(id).map((b) => `${id}: ${b}`));
    if (phase === 'judge') {
      blockers = judgeBlockers();
      planJudge();
      if (judgeItems().total === 0) blockers.push('no (site, arm) has all four conditions yet');
      if (!force) {
        let open = 0;
        for (const arm of Object.keys(state.arms)) for (const cond of state.settings.conditions) {
          for (const site of siteList()) if ('.r-'.includes(char(arm, cond, site))) open++;
        }
        if (open) blockers.push(`${open} repair/import cells unfinished (use force to override)`);
      }
    }
    if (blockers.length) return { blockers };
    if (phase === 'repair') { planRepair(); queueBaselines(); }
    if (phase === 'score') planScore();
    state.run = { phase: 'running', kind: phase, started_at: ctx.now() };
    persist();
    return { ok: true };
  }
  const pause = () => { if (state.run.phase === 'running') { state.run.phase = 'paused'; persist(); } };
  const resume = () => { if (state.run.phase === 'paused') { state.run.phase = 'running'; persist(); } };
  function retryFailed() {
    let n = 0;
    for (const j of jobs.values()) if (j.state === 'failed') { Object.assign(j, { state: 'queued', attempts: 0, error: null }); n++; }
    if (n && state.run.phase === 'idle') state.run = { phase: 'running', kind: 'repair', started_at: ctx.now() };
    persist();
    return n;
  }

  // ---- claim
  // What this job was actually dispatched with, kept so the usage row can record it even if the
  // arm's model or key is changed afterwards. Spend is history; it must not move when settings do.
  function stamp(j, modelId, keyId) {
    j.model_id = modelId || null;
    j.key_id = keyId || null;
    j.mock = !!ctx.mock;
  }

  function jobPayload(j, w) {
    const base = { id: j.id, kind: j.kind, mock: ctx.mock };
    if (j.kind === 'repair') {
      const a = state.arms[j.arm];
      if (ctx.armKind(j.arm) === 'open_source') { // base_url is the claiming worker's own tunnel
        if (!w.arcs || !w.arcs[j.arm]) return null;
        // Each open arm has its own llama.cpp credential: A5 (DeepSeek), A6 (Qwen) and A7 (GLM) never share one.
        // The console's key for the arm is used when set; otherwise the key stays on the worker, in its
        // own A5_API_KEY / A6_API_KEY / A7_API_KEY, and never travels at all.
        const slot = keysLib.armSlot(j.arm);
        const armKey = slot ? ctx.keys.get(slot) : null;
        stamp(j, a.model_id, slot && armKey ? ctx.keys.id(slot) : `local:${w.id}`);
        return { ...base, arm: j.arm, condition: j.condition, site: j.site, max_iter: state.settings.max_iter, lease_s: leaseS,
          provider: a.provider, base_url: w.arcs[j.arm], model_id: a.model_id, api_key_env: ctx.cfg.arms[j.arm].api_key_env, api_key: armKey };
      }
      const key = ctx.keys.get(a.provider);
      if (!key && !ctx.mock) return null;
      stamp(j, a.model_id, ctx.keys.id(a.provider));
      return { ...base, arm: j.arm, condition: j.condition, site: j.site, max_iter: state.settings.max_iter, lease_s: leaseS,
        provider: a.provider, base_url: BASE_URL[a.provider] ?? null, model_id: a.model_id,
        api_key_env: ctx.cfg.arms[j.arm].api_key_env, api_key: key };
    }
    if (j.kind === 'score') {
      const slice = ctx.sites.find((s) => s.site_id === j.site).slice_files;
      const iterations = {};
      if (j.arm === 'baseline') {
        iterations['0'] = Object.fromEntries(slice.map((f) => [f, ctx.baselineFile(j.site, f)]));
      } else {
        for (const n of store.iterations(j.arm, j.condition, j.site)) iterations[n] = store.iterFiles(j.arm, j.condition, j.site, n);
      }
      return { ...base, arm: j.arm, condition: j.condition, site: j.site, slice_files: slice, iterations };
    }
    const key = ctx.keys.get('gemini');
    if (!key && !ctx.mock) return null;
    stamp(j, state.settings.judge_model_id, ctx.keys.id('gemini'));
    const variants = {};
    for (const c of CONDITIONS) {
      const its = store.iterations(j.arm, c, j.site);
      variants[c] = store.iterFiles(j.arm, c, j.site, its[its.length - 1]);
    }
    // 5th, unrepaired variant so the judge can rank repaired pages against the original
    variants.baseline = Object.fromEntries(ctx.sites.find((x) => x.site_id === j.site).slice_files.map((f) => [f, ctx.baselineFile(j.site, f)]));
    return { ...base, site: j.site, arm: j.arm, seed: parseInt(crypto.createHash('sha1').update(j.id).digest('hex').slice(0, 8), 16),
      variants, provider: 'gemini', base_url: BASE_URL.gemini, model_id: state.settings.judge_model_id, api_key: key,
      call_id: `${j.id}:${crypto.randomBytes(4).toString('hex')}` };
  }

  const runningOn = (id) => [...jobs.values()].filter((j) => j.state === 'running' && j.worker === id).length;
  const str = (v) => (typeof v === 'string' ? v.slice(0, 64) : undefined);
  function claim({ worker_id, kinds, max, slots, info, arcs, arms }) {
    reap();
    const id = String(worker_id || 'worker').slice(0, 64);
    const want = Array.isArray(kinds) ? kinds : ['repair', 'score', 'judge'];
    let limit = Math.min(Math.max(Number.isInteger(max) ? max : 1, 1), 50);
    const w = workers.get(id) || { id };
    Object.assign(w, { last_seen: ctx.now(), slots: Number.isInteger(slots) && slots > 0 ? Math.min(slots, 64) : limit,
      info: info && typeof info === 'object' ? { host: str(info.host), os: str(info.os) } : w.info,
      arcs: arcs && typeof arcs === 'object' ? Object.fromEntries(Object.entries(arcs).filter(([a, u]) => state.arms[a] && /^https?:\/\/[\w.-]+(:\d+)?(\/[\w./-]*)?$/.test(u))) : {},
      armsOnly: Array.isArray(arms) ? arms.filter((a) => state.arms[a]) : null });
    workers.set(id, w);
    if (max === 0) return []; // keepalive from a worker with no free slots
    const ctl = state.workerCtl[id] || {};
    if (ctl.paused || state.run.phase === 'paused') return [];
    if (Number.isInteger(ctl.cap)) limit = Math.min(limit, ctl.cap - runningOn(id));
    if (limit < 1) return [];

    const agg = proj.aggregate(ctx, ctx.now());
    const counts = Object.fromEntries(Object.keys(state.arms).map((a) => { const c = armCells(a); return [a, { done: c.ok + c.failed + c.truncated + c.imported, finished: finishedRepairs(a) }]; }));
    const judgeAvg = agg.by.judge.calls ? agg.by.judge.cost_usd / agg.by.judge.calls : 0;
    const estimate = (j) => (j.kind === 'repair' ? proj.armStats(ctx, agg, j.arm, counts[j.arm].finished).perCell : j.kind === 'judge' ? judgeAvg : 0);
    let committed = agg.total.cost_usd;
    const running = {};
    for (const j of jobs.values()) {
      if (j.state !== 'running') continue;
      committed += estimate(j);
      if (j.kind === 'repair') running[j.arm] = (running[j.arm] || 0) + 1;
    }
    const out = [];
    for (const j of jobs.values()) {
      if (out.length >= limit) break;
      if (j.state !== 'queued' || !want.includes(j.kind)) continue;
      if (w.armsOnly && !w.armsOnly.includes(j.arm)) continue;
      if (j.kind === 'repair' && (running[j.arm] || 0) >= ctx.concurrency(j.arm)) continue;
      const est = estimate(j);
      if (j.kind !== 'score' && committed + est >= state.settings.budget_usd) continue;
      const payload = jobPayload(j, w);
      if (!payload) continue;
      Object.assign(j, { state: 'running', worker: id, lease_exp: ctx.now() + leaseS * 1000 });
      committed += est;
      if (j.kind === 'repair') running[j.arm] = (running[j.arm] || 0) + 1;
      out.push(payload);
    }
    if (out.length) persist();
    return out;
  }

  const getJob = (id) => {
    const j = jobs.get(id);
    if (!j) throw new HttpError(404, 'unknown job');
    return j;
  };
  function heartbeat(id) {
    const j = getJob(id);
    if (j.state !== 'running') throw new HttpError(409, 'job not running');
    j.lease_exp = ctx.now() + leaseS * 1000;
    return { ok: true, lease_s: leaseS };
  }
  function release(id, reason, retryable) {
    const j = getJob(id);
    if (j.state !== 'running') return { ok: true };
    j.error = String(reason || 'released').slice(0, 300);
    j.state = retryable === false ? 'failed' : 'queued';
    persist();
    return { ok: true };
  }

  // ---- results
  // One row per finished call, holding everything needed to attribute it later: the machine that ran
  // it, the model that served it, the credential that paid, whether it was a mock (test) call, and the
  // cost at today's price. Nothing downstream reprices it.
  function addLedger({ worker, arm, kind, model_id, key_id, mock }, input, output, calls) {
    const e = { ts: ctx.now(), worker: worker || 'unknown', arm, kind,
      model_id: model_id || null, key_id: key_id || null, mock: !!mock,
      input: num(input), output: num(output), calls: num(calls) };
    Object.assign(e, proj.entryCost(ctx, e));
    ctx.ledger.push(e);
    store.appendLine('usage.jsonl', e);
  }

  // Drop the recorded history (a test run makes every projection "measured" from fabricated tokens).
  // The file is kept beside the new one so nothing is destroyed, only set aside.
  function resetLedger() {
    const n = ctx.ledger.length;
    const to = `usage.archived-${new Date(ctx.now()).toISOString().replace(/[:.]/g, '-')}.jsonl`;
    store.renameIfExists('usage.jsonl', to);
    ctx.ledger.length = 0;
    return { cleared: n, archived_to: n ? to : null };
  }

  function fail(j, error) {
    j.attempts++;
    j.error = String(error || 'failed').slice(0, 300);
    j.state = j.attempts >= MAX_ATTEMPTS ? 'failed' : 'queued';
  }

  const rowsOf = (v, width, j, name) => {
    if (!Array.isArray(v) || v.length > 5000 || !v.every((r) => Array.isArray(r) && r.length === width && r.every((x) => x === null || typeof x !== 'object')) ||
      !v.every((r) => r[0] === j.site)) throw new HttpError(400, `bad ${name}`);
    return v;
  };

  function result(b) {
    const j = getJob(b.job_id);
    if (j.state === 'done' || j.state === 'failed') return { ok: true, ignored: true };
    const usage = b.usage || {};
    const ok = b.status === 'ok';

    if (j.kind === 'repair') {
      const entries = validateFiles(b.files || {}, `runs/${j.arm}/${j.condition}/${j.site}/`);
      store.writeFiles(entries);
    } else if (j.kind === 'score' && ok) {
      const rows = rowsOf(b.rows, METRICS_HEADER.length, j, 'rows');
      if (!rows.every((r) => r[3] === j.arm && r[4] === j.condition)) throw new HttpError(400, 'rows do not match job');
      const rules = Array.isArray(b.rules) ? b.rules : [];
      if (!rules.every((r) => r && r.site_id === j.site && r.arm === j.arm && r.condition === j.condition)) throw new HttpError(400, 'bad rules');
      csv.upsert(metricsFile, METRICS_HEADER, rows, METRICS_KEY);
      for (const r of rules) store.appendLine('metrics/axe_rules.jsonl', r);
      scored.add(`${j.arm}|${j.condition}|${j.site}`);
    } else if (j.kind === 'judge' && ok) {
      const rows = rowsOf(b.rows, JUDGE_HEADER.length, j, 'rows');
      const keyRows = rowsOf(b.key_rows, KEY_HEADER.length, j, 'key_rows');
      if (![...rows, ...keyRows].every((r) => r[1] === j.arm)) throw new HttpError(400, 'rows do not match job');
      csv.upsert(store.abs('verdicts/judge_rankings.csv'), JUDGE_HEADER, rows, [0, 1, 2, 3]);
      csv.upsert(store.abs('blinding_key.csv'), KEY_HEADER, keyRows, [0, 1, 2]);
      store.appendLine('verdicts/usage.jsonl', { ts: ctx.now(), site: j.site, arm: j.arm, input: num(usage.input), output: num(usage.output) });
    }

    // the model the provider actually answered with, when the worker reports it; else what we dispatched
    const reported = typeof b.model_version === 'string' ? b.model_version.trim().slice(0, 200) : '';
    const servedBy = reported && reported !== 'mock' ? reported : j.model_id;
    if (j.kind !== 'score') addLedger({ ...j, model_id: servedBy }, usage.input, usage.output, b.calls);
    else addLedger({ worker: j.worker, arm: j.arm, kind: 'score', mock: j.mock }, 0, 0, 0);

    if (ok) {
      j.state = 'done';
      j.error = null;
      if (j.kind === 'repair') {
        const last = store.lastStatus(j.arm, j.condition, j.site);
        Object.assign(j, { final: 'o', converged: !!(last && last.st.converged) });
        queueScore(j.arm, j.condition, j.site);
        maybeQueueJudge(j.arm, j.site);
      }
    } else {
      fail(j, b.error);
      if (j.kind === 'repair') {
        const last = store.lastStatus(j.arm, j.condition, j.site);
        j.final = last && String(last.st.reason || '').startsWith('truncated') ? 't' : 'f';
      }
    }
    persist();
    return { ok: true, state: j.state };
  }

  // ---- imports
  function markImported(cells) {
    for (const c of cells) { imported.add(c); queueScore(...c.split('/')); const [a, , si] = c.split('/'); maybeQueueJudge(a, si); }
    persist();
  }

  function workerList() {
    const t = ctx.now();
    for (const [id, w] of workers) if (t - w.last_seen > 7 * 24 * 3600000) workers.delete(id); // offline machines stay listed
    return [...workers.values()].map((w) => ({ id: w.id, last_seen: w.last_seen, slots: w.slots, info: w.info, arcs: Object.keys(w.arcs || {}),
      cap: Number.isInteger((state.workerCtl[w.id] || {}).cap) ? state.workerCtl[w.id].cap : null, paused: !!(state.workerCtl[w.id] || {}).paused,
      running: runningOn(w.id) }));
  }
  // compute split: per-worker slot cap (null = no cap) and pause; persisted so it survives a restart
  function setWorkerCtl(id, { cap, paused }) {
    if (!workers.has(id)) throw new HttpError(404, 'unknown worker');
    if (cap !== undefined && cap !== null && !(Number.isInteger(cap) && cap >= 0 && cap <= 64)) throw new HttpError(400, 'cap must be null or an integer 0-64');
    if (paused !== undefined && typeof paused !== 'boolean') throw new HttpError(400, 'paused must be boolean');
    const cur = { ...(state.workerCtl[id] || {}) };
    if (cap !== undefined) cur.cap = cap;
    if (paused !== undefined) cur.paused = paused;
    state.workerCtl[id] = cur;
    state.save();
  }

  persist();
  return { start, pause, resume, retryFailed, claim, heartbeat, release, result, reap, armCells, finishedRepairs, matrix, judgeItems, armBlockers, judgeBlockers,
    markImported, addLedger, resetLedger, machineView, workers: workerList, setWorkerCtl, runInfo: () => state.run, jobs };
}

module.exports = { create };
