// Job queue, leases, budget gate and result ingestion for repair / score / judge jobs.
const crypto = require('crypto');
const csv = require('./csv');
const proj = require('./projection');
const { HttpError } = require('./http');
const { validateFiles } = require('./store');
const { CONDITIONS } = require('./state');

const MAX_ATTEMPTS = 3;
// One freshness rule for "online": the worker list, the machine view and ARC availability all use it.
const ONLINE_MS = 45000;
const BASE_URL = { anthropic: null, openai: 'https://api.openai.com/v1', gemini: 'https://generativelanguage.googleapis.com/v1beta/openai' };
const METRICS_HEADER = ['site_id', 'category', 'generator_group', 'arm', 'condition', 'iteration', 'page', 'breakpoint', 'axe_violations',
  'axe_passes', 'axe_incomplete', 'violation_rate', 'ax_name_chars', 'ax_interactive_nodes', 'name_chars_per_interactive', 'tab_order_mismatches',
  'keyboard_traps', 'unreachable_interactives', 'focus_visible_fails', 'heading_skips', 'text_chars', 'element_count', 'status'];
const METRICS_KEY = [0, 3, 4, 5, 6, 7];
const JUDGE_HEADER = ['site_id', 'arm', 'question', 'condition', 'rank', 'judge_model', 'call_id'];
const KEY_HEADER = ['site_id', 'arm', 'label_shown', 'condition'];
// Names come from agents (MACHINE_NAME, host name, Tailscale node): keep them printable, one line, bounded.
const cleanName = (v, max = 64) => (typeof v === 'string' ? v.replace(/[\u0000-\u001f\u007f-\u009f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max) || undefined : undefined);
const REGISTRY_MAX = 500, REGISTRY_TTL_MS = 30 * 24 * 3600000, LAST_SEEN_WRITE_MS = 60000;
const num = (v) => (Number.isFinite(v) && v >= 0 ? Math.round(v) : 0);

function create(ctx, { leaseS = 900 } = {}) {
  const { state, store } = ctx;
  const jobs = new Map(state.queue.map((j) => [j.id, { ...j }]));
  const imported = new Set(state.imported);
  // Older workers left the mock marker in the final status, not in the queue.
  for (const j of jobs.values()) {
    if (j.kind === 'repair' && j.state === 'done' && j.mock === undefined &&
      store.lastStatus(j.arm, j.condition, j.site)?.st.model_version === 'mock') j.mock = true;
  }
  const workers = new Map();
  // Computers seen before this process started come back as offline rows with their reported names.
  const registry = state.registry.workers;
  const registryEntries = Object.entries(registry);
  for (const [id, r] of registryEntries) {
    if (!r || typeof r !== 'object' || ctx.now() - r.last_seen > REGISTRY_TTL_MS) { delete registry[id]; continue; }
    workers.set(id, { id, last_seen: r.last_seen, slots: r.slots || 1, info: r.info, kinds: [], arcs: {}, armsOnly: null });
  }
  const remember = (w) => {
    const prev = registry[w.id];
    const same = prev && JSON.stringify(prev.info) === JSON.stringify(w.info) && prev.slots === w.slots;
    if (same && w.last_seen - prev.last_seen < LAST_SEEN_WRITE_MS) return;
    registry[w.id] = { id: w.id, info: w.info, slots: w.slots, last_seen: w.last_seen };
    const ids = Object.keys(registry);
    if (ids.length > REGISTRY_MAX) for (const id of ids.sort((a, b) => registry[a].last_seen - registry[b].last_seen).slice(0, ids.length - REGISTRY_MAX)) { delete registry[id]; workers.delete(id); }
    state.save();
  };
  const scored = new Set();
  const measured = new Set();
  const indexMetrics = (rows) => {
    for (const r of rows) {
      const key = `${r[3]}|${r[4]}|${r[0]}`;
      scored.add(key);
      if ((r[21] === 'ok' || r[21] === '' || r[21] === undefined) && Number(r[7]) === 1280 &&
        String(r[8] ?? '').trim() && Number.isFinite(Number(r[8]))) measured.add(key);
    }
  };
  const mainstream = () => Object.keys(state.arms).filter((a) => ctx.armKind(a) === 'mainstream');
  const dispatched = () => Object.keys(state.arms).filter((a) => ctx.armKind(a) === 'mainstream' || state.settings.dispatch_open);
  // fresh workers that advertise a reachable ARC tunnel for this arm
  const arcWorkers = (arm) => [...workers.values()].filter((w) => w.arcs && w.arcs[arm] && ctx.now() - w.last_seen < ONLINE_MS);
  const siteList = () => state.settings.sites || ctx.siteIds();
  const persist = () => {
    state.queue = [...jobs.values()].map(({ lease_exp, reserved_by, reserved_until, stop_at, ...j }) => ({ ...j, state: j.state === 'running' ? 'queued' : j.state }));
    state.imported = [...imported];
    state.save();
  };

  // ---- metrics seed + scored index
  const metricsFile = store.abs('metrics/metrics.csv');
  if (!store.readText('metrics/metrics.csv')) {
    const seed = csv.readRows(require('path').join(ctx.studyDir, 'metrics', 'metrics.csv'));
    if (seed.length) csv.writeAtomic(metricsFile, csv.stringify(seed));
  }
  indexMetrics(csv.readRows(metricsFile).slice(1));

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

  // Overview uses the full study plan, independent of the worker's selected run scope.
  function pipelineProgress() {
    const sites = ctx.siteIds();
    const arms = Object.keys(state.arms);
    const repair = { total: 0, done: 0, bad: 0 };
    const open = { total: 0, done: 0, bad: 0 };
    const score = { total: sites.length * (arms.length * CONDITIONS.length + 1), done: 0, bad: 0 };
    const judge = { total: sites.length * arms.length, done: 0, bad: 0 };
    for (const site of sites) {
      if (measured.has(`baseline|baseline|${site}`)) score.done++;
      else if (jobs.get(`score:baseline:baseline:${site}`)?.state === 'failed') score.bad++;
      for (const arm of arms) {
        const counts = ctx.armKind(arm) === 'open_source' ? open : repair;
        let allVariants = true;
        for (const cond of CONDITIONS) {
          counts.total++;
          const key = `${arm}:${cond}:${site}`;
          const ch = char(arm, cond, site);
          if (ch === 'i' || (ch === 'o' && !jobs.get(`repair:${key}`).mock)) {
            counts.done++;
            if (measured.has(`${arm}|${cond}|${site}`)) score.done++;
            else if (jobs.get(`score:${key}`)?.state === 'failed') score.bad++;
          } else {
            allVariants = false;
            if ('ft'.includes(ch) && !jobs.get(`repair:${key}`).mock) counts.bad++;
          }
        }
        const j = jobs.get(`judge:${site}:${arm}`);
        if (allVariants && j && !j.mock) {
          if (j.state === 'done') judge.done++;
          if (j.state === 'failed') judge.bad++;
        }
      }
    }
    const runSites = new Set(siteList()).size;
    return { repair, open, score, judge, mock: ctx.mock,
      scope: { sites: runSites, study_sites: sites.length, conditions: state.settings.conditions.length, study_conditions: CONDITIONS.length } };
  }

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
    // One character per machine, so at most 36 are tinted. Past that, keep the ones that matter most
    // (online, then with cells or calls), and report how many were left out instead of dropping them silently.
    const stat0 = new Map((agg ? agg.machines : []).map((m) => [m.id, m]));
    const all = [...ids].filter((id) => id && id !== 'unknown');
    const rank = (id) => (workers.has(id) && ctx.now() - workers.get(id).last_seen < ONLINE_MS ? 2 : 0) + (stat0.get(id)?.calls || runningOn(id) ? 1 : 0);
    const kept = all.length > MACHINE_CHARS.length ? [...all].sort((a, b) => rank(b) - rank(a) || a.localeCompare(b)).slice(0, MACHINE_CHARS.length) : all;
    const order = kept.sort();
    const omitted = all.length - order.length;
    const idx = new Map(order.map((id, i) => [id, MACHINE_CHARS[i]]));
    const stats = new Map((agg ? agg.machines : []).map((m) => [m.id, m]));
    const t = ctx.now();
    const machines = order.map((id, i) => {
      const w = workers.get(id), m = stats.get(id) || {};
      return { id, char: MACHINE_CHARS[i], online: !!w && t - w.last_seen < ONLINE_MS, host: w && w.info ? w.info.host : null,
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
    return { machines, matrix_workers, machines_omitted: omitted };
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
    for (const j of jobs.values()) {
      if (j.state === 'running' && j.lease_exp < t) {
        if (j.stop_at) cancel(j, 'stopped by operator (worker did not answer; lease expired)');
        else { j.state = 'queued'; j.error = 'lease expired'; }
      }
      if (j.reserved_until && j.reserved_until < t) { delete j.reserved_by; delete j.reserved_until; }
    }
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
            if (last.st.model_version === 'mock') j.mock = true;
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
    // An unavailable ARC tunnel only blocks its own claims, not the rest of the repair phase.
    if (phase === 'repair') blockers = mainstream().flatMap((id) => armBlockers(id).map((b) => `${id}: ${b}`));
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
    for (const j of jobs.values()) if (j.state === 'failed') { Object.assign(j, { state: 'queued', attempts: 0, error: null, canceled: undefined }); n++; }
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
        const slot = ctx.keys.armSlot(j.arm);
        const armKey = ctx.keys.get(slot);
        stamp(j, a.model_id, armKey ? ctx.keys.id(slot) : `local:${w.id}`);
        return { ...base, arm: j.arm, condition: j.condition, site: j.site, max_iter: state.settings.max_iter, lease_s: leaseS,
          provider: a.provider, base_url: w.arcs[j.arm], model_id: a.model_id, api_key_env: ctx.keys.envName(slot), api_key: armKey };
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
  const str = cleanName;
  const workerManual = (w) => state.workerCtl[w.id]?.manual ?? (w.info?.manual === true);
  const workerOnline = (w) => ctx.now() - w.last_seen < ONLINE_MS;
  const requested = (w) => w.request_until > ctx.now() ? w.requested : 0;
  // Why this worker cannot take this job right now, or null when it can. The one place eligibility lives:
  // the UI shows the text, requestWork refuses with it, and claim() skips on it.
  function whyNot(j, w) {
    if (j.state !== 'queued') return `job is ${j.state}`;
    if (!w.kinds.includes(j.kind)) return `this worker does not run ${j.kind} jobs`;
    if (j.arm !== 'baseline' && !Object.hasOwn(state.arms, j.arm)) return `unknown arm ${j.arm}`;
    if (w.armsOnly && !w.armsOnly.includes(j.arm)) return `this worker only runs ${w.armsOnly.join('/')}`;
    if (j.reserved_by && j.reserved_by !== w.id && j.reserved_until > ctx.now()) return `reserved for ${j.reserved_by}`;
    if (j.kind === 'repair' && ctx.armKind(j.arm) === 'open_source') {
      if (!state.settings.dispatch_open) return 'open-source arms are not dispatched (Keys & arms)';
      if (!w.arcs[j.arm]) return `no live ARC tunnel for ${j.arm} on this computer`;
    } else if (j.kind === 'repair') {
      const provider = state.arms[j.arm].provider;
      if (!provider) return `${j.arm} has no provider set`;
      if (!ctx.mock && !ctx.keys.get(provider)) return `no ${provider} key`;
    } else if (j.kind === 'judge' && !ctx.mock && !ctx.keys.get('gemini')) return 'no gemini key';
    return null;
  }
  const canTake = (j, w) => whyNot(j, w) === null;
  const matches = (j, want) => !want || (want.job_id ? j.id === want.job_id : (!want.arm || j.arm === want.arm) && (!want.kind || j.kind === want.kind));
  function dropReservations(id) {
    for (const j of jobs.values()) if (j.reserved_by === id) { delete j.reserved_by; delete j.reserved_until; }
  }
  // sel = { job_id } | { arm, kind? } | undefined (any job this worker is eligible for).
  // Everything is revalidated here, whatever the page showed when the operator clicked.
  function requestWork(id, sel) {
    const w = workers.get(id);
    if (!w || !workerOnline(w)) throw new HttpError(409, 'worker is offline');
    if (!workerManual(w) || state.workerCtl[id]?.paused) throw new HttpError(409, 'worker must be in manual mode and not paused');
    if (requested(w)) throw new HttpError(409, 'claim already requested');
    if (state.run.phase === 'paused') throw new HttpError(409, 'resume the study before claiming jobs');
    let want = null;
    if (sel && typeof sel === 'object' && (sel.job_id || sel.arm)) {
      if (sel.job_id !== undefined && typeof sel.job_id !== 'string') throw new HttpError(400, 'bad job_id');
      if (sel.arm !== undefined && !Object.hasOwn(state.arms, sel.arm)) throw new HttpError(400, `unknown arm ${sel.arm}`);
      want = sel.job_id ? { job_id: sel.job_id } : { arm: sel.arm, ...(['repair', 'score', 'judge'].includes(sel.kind) ? { kind: sel.kind } : {}) };
    }
    const label = want ? (want.job_id || [want.arm, want.kind].filter(Boolean).join(' ')) : 'jobs';
    if (want?.job_id && !jobs.has(want.job_id)) throw new HttpError(404, 'unknown job');
    const candidates = [...jobs.values()].filter((j) => matches(j, want));
    const open = candidates.filter((j) => j.state === 'queued');
    if (!open.length) throw new HttpError(409, want
      ? (candidates.length ? `no queued ${label}: ${candidates[0].state}` : `no queued ${label} in the selected scope; queue a phase first`)
      : 'no queued jobs; queue a phase first');
    const take = open.filter((j) => canTake(j, w));
    if (!take.length) throw new HttpError(409, `${w.id} cannot take ${label}: ${whyNot(open[0], w)}`);
    if (state.settings.budget_usd <= proj.aggregate(ctx, ctx.now()).total.cost_usd && take.some((j) => j.kind !== 'score')) throw new HttpError(409, 'budget cap reached');
    const free = Math.min(w.slots, state.workerCtl[id]?.cap ?? w.slots, 50) - runningOn(id);
    if (free < 1) throw new HttpError(409, 'no free worker slots');
    const n = want?.job_id ? 1 : Math.min(free, take.length);
    w.requested = n;
    w.request_until = ctx.now() + 60000;
    w.want = want;
    // a named job is held for this worker so a second operator or worker cannot take it first
    if (want?.job_id) Object.assign(take[0], { reserved_by: id, reserved_until: w.request_until });
    return { requested: n, ...(want ? { want } : {}) };
  }
  function unclaimWork(id) {
    const w = workers.get(id);
    if (!w) throw new HttpError(404, 'unknown worker');
    const unclaimed = requested(w);
    w.requested = 0;
    w.want = null;
    dropReservations(id);
    return { unclaimed };
  }
  function claim({ worker_id, kinds, max, slots, info, arcs, arms }) {
    reap();
    const id = cleanName(String(worker_id || 'worker')) || 'worker';
    const want = Array.isArray(kinds) ? kinds : ['repair', 'score', 'judge'];
    let limit = Math.min(Math.max(Number.isInteger(max) ? max : 1, 1), 50);
    const w = workers.get(id) || { id };
    const prevIp = w.info?.tailnet_ip, nextIp = info && typeof info === 'object' ? str(info.tailnet_ip) : undefined;
    // the same worker id reporting two different Tailscale addresses = two computers sharing one id
    if (prevIp && nextIp && prevIp !== nextIp && ctx.now() - w.last_seen < ONLINE_MS) w.conflict = true;
    Object.assign(w, { last_seen: ctx.now(), kinds: want, slots: Number.isInteger(slots) && slots > 0 ? Math.min(slots, 64) : limit,
      info: info && typeof info === 'object' ? { host: str(info.host), os: str(info.os),
        ...(info.tailnet_node ? { tailnet_node: str(info.tailnet_node) } : {}),
        ...(info.tailnet_ip ? { tailnet_ip: str(info.tailnet_ip) } : {}),
        ...(info.tailnet_user ? { tailnet_user: str(info.tailnet_user, 128) } : {}),
        ...(info.manual === true ? { manual: true } : {}) } : w.info,
      arcs: arcs && typeof arcs === 'object' ? Object.fromEntries(Object.entries(arcs).filter(([a, u]) => state.arms[a] && /^https?:\/\/[\w.-]+(:\d+)?(\/[\w./-]*)?$/.test(u))) : {},
      armsOnly: Array.isArray(arms) ? arms.filter((a) => state.arms[a]) : null });
    workers.set(id, w);
    remember(w);
    if (max === 0) return []; // keepalive from a worker with no free slots
    const ctl = state.workerCtl[id] || {};
    if (ctl.paused || state.run.phase === 'paused') return [];
    if (Number.isInteger(ctl.cap)) limit = Math.min(limit, ctl.cap - runningOn(id));
    if (workerManual(w)) limit = Math.min(limit, requested(w));
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
      if (!canTake(j, w) || (workerManual(w) && !matches(j, w.want))) continue;
      if (j.kind === 'repair' && (running[j.arm] || 0) >= ctx.concurrency(j.arm)) continue;
      const est = estimate(j);
      if (j.kind !== 'score' && committed + est >= state.settings.budget_usd) continue;
      const payload = jobPayload(j, w);
      if (!payload) continue;
      Object.assign(j, { state: 'running', worker: id, worker_node: w.info?.tailnet_node || w.info?.host,
        worker_user: w.info?.tailnet_user, started_at: ctx.now(), finished_at: null, lease_exp: ctx.now() + leaseS * 1000,
        lease: (j.lease || 0) + 1, canceled: undefined });
      delete j.reserved_by; delete j.reserved_until; delete j.stop_at;
      payload.lease = j.lease;
      committed += est;
      if (j.kind === 'repair') running[j.arm] = (running[j.arm] || 0) + 1;
      out.push(payload);
    }
    if (out.length) {
      if (workerManual(w)) { w.requested -= out.length; if (w.requested <= 0) w.want = null; }
      persist();
    }
    return out;
  }

  const getJob = (id) => {
    const j = jobs.get(id);
    if (!j) throw new HttpError(404, 'unknown job');
    return j;
  };
  // A lease is (worker, generation). A late heartbeat, result or release from a worker that was stopped,
  // timed out or replaced carries an old generation and is refused instead of overwriting the new owner.
  // Workers older than this change send neither field and keep the previous behaviour.
  function checkLease(j, b) {
    const stale = (b.lease !== undefined && b.lease !== j.lease) || (b.worker_id !== undefined && b.worker_id !== j.worker);
    if (stale) throw new HttpError(409, 'stale lease');
  }
  function cancel(j, why) {
    Object.assign(j, { state: 'failed', canceled: true, error: why, final: j.kind === 'repair' ? 'f' : j.final, finished_at: ctx.now() });
    delete j.stop_at;
  }
  function heartbeat(id, b = {}) {
    const j = getJob(id);
    if (j.state !== 'running') throw new HttpError(409, 'job not running');
    checkLease(j, b);
    j.lease_exp = ctx.now() + leaseS * 1000;
    return { ok: true, lease_s: leaseS, ...(j.stop_at ? { stop: true } : {}) };
  }
  // Asks the owning worker to abort this one job. The job stays "running" (stop pending) until the worker
  // confirms through release(stopped) or its lease expires; nothing else on that machine is touched.
  function stopJob(id) {
    const j = getJob(id);
    if (j.state !== 'running') throw new HttpError(409, `job is ${j.state}, not running`);
    j.stop_at = j.stop_at || ctx.now();
    return { ok: true, pending: true };
  }
  function release(id, reason, retryable, b = {}) {
    const j = getJob(id);
    if (j.state !== 'running') return { ok: true };
    checkLease(j, b);
    if (b.stopped === true || j.stop_at) { cancel(j, 'stopped by operator'); persist(); return { ok: true, canceled: true }; }
    j.error = String(reason || 'released').slice(0, 300);
    j.state = retryable === false ? 'failed' : 'queued';
    if (j.state === 'failed') j.finished_at = ctx.now();
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
    checkLease(j, b);
    delete j.stop_at; // it finished before the stop reached it: keep the result
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
      indexMetrics(rows);
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
    if (j.state === 'done' || j.state === 'failed') j.finished_at = ctx.now();
    persist();
    return { ok: true, state: j.state };
  }

  // ---- imports
  function markImported(cells) {
    for (const c of cells) { imported.add(c); queueScore(...c.split('/')); const [a, , si] = c.split('/'); maybeQueueJudge(a, si); }
    persist();
  }

  // Per queue group: why each online manual worker could not take it (null = it can). The reason comes from
  // the same whyNot() that requestWork enforces, so the page never offers what the server would refuse.
  const queueEligibility = (list) => Object.fromEntries([...workers.values()].filter((w) => workerOnline(w)).map((w) => [w.id,
    state.workerCtl[w.id]?.paused ? 'paused' : !workerManual(w) ? 'auto mode: it claims by itself' : requested(w) ? 'claim already requested'
      : list.some((j) => canTake(j, w)) ? null : whyNot(list[0], w)]));
  // Arms with nothing queued, and the reason, so an empty A1 row is explained instead of silent.
  function idleArms(queuedArms) {
    return Object.keys(state.arms).filter((a) => !queuedArms.has(a)).map((a) => {
      const c = armCells(a);
      const reason = ctx.armKind(a) === 'open_source' && !state.settings.dispatch_open ? 'open-source arms are not dispatched (Keys & arms); their cells are imported'
        : c.total && c.ok + c.failed + c.truncated + c.imported >= c.total ? `all ${c.total} cells in this scope are finished`
        : c.running ? `${c.running} already running; nothing else queued`
        : 'not queued yet in this scope: use Queue repair jobs';
      return { arm: a, reason };
    });
  }
  function jobView() {
    const counts = { queued: 0, running: 0, done: 0, failed: 0 };
    const running = [], recent = [];
    const queue = new Map();
    for (const j of jobs.values()) {
      counts[j.state]++;
      if (j.state === 'queued') {
        const key = `${j.kind}:${j.arm}`;
        if (!queue.has(key)) queue.set(key, { kind: j.kind, arm: j.arm, jobs: [], ids: [], reserved: {}, list: [] });
        const g = queue.get(key);
        g.jobs.push([j.site, j.condition]);
        g.ids.push(j.id);
        g.list.push(j);
        if (j.reserved_by && j.reserved_until > ctx.now()) g.reserved[j.id] = j.reserved_by;
      }
      if (j.state === 'running') running.push(j);
      if (j.state === 'done' || j.state === 'failed') recent.push(j);
    }
    recent.sort((a, b) => (b.finished_at || 0) - (a.finished_at || 0));
    const groups = [...queue.values()].map(({ list, ...g }) => ({ ...g, eligible: queueEligibility(list) }));
    return { counts, queue: groups, idle: idleArms(new Set(groups.filter((g) => g.kind === 'repair').map((g) => g.arm))),
      jobs: [...running, ...recent.slice(0, 30)].map((j) => ({
        id: j.id, kind: j.kind, arm: j.arm, condition: j.condition, site: j.site, state: j.state, worker: j.worker,
        worker_node: j.worker_node, worker_user: j.worker_user, started_at: j.started_at, finished_at: j.finished_at, mock: j.mock === true,
        stopping: j.state === 'running' && !!j.stop_at, canceled: j.canceled === true,
      })) };
  }

  // One row per physical computer. Identity is what the agent reported (Tailscale IP, else host name);
  // nothing here is inferred from a legacy worker id. `launchers` is the launcher snapshot, keyed by IP.
  // Ids that appear only in job/usage history, with no worker ever connected, go to `history`.
  function devices(launchers = []) {
    const byKey = new Map();
    const dev = (key, label) => { if (!byKey.has(key)) byKey.set(key, { key, label, os: null, launcher: null, workers: [], tailnet: null, last_seen: 0, conflict: false }); return byKey.get(key); };
    for (const w of workers.values()) {
      const inf = w.info || {};
      // the name the operator gave the machine (MACHINE_NAME) wins; Tailscale node and IP are secondary facts
      const d = dev(inf.tailnet_ip || inf.host || w.id, inf.host || inf.tailnet_node || inf.tailnet_ip || w.id);
      d.os = d.os || inf.os || null;
      if (inf.tailnet_node || inf.tailnet_ip) d.tailnet = { node: inf.tailnet_node || null, ip: inf.tailnet_ip || null, user: inf.tailnet_user || null };
      d.last_seen = Math.max(d.last_seen, w.last_seen);
      d.conflict = d.conflict || w.conflict === true;
      d.workers.push({ id: w.id, online: workerOnline(w), arcs: Object.keys(w.arcs || {}), running: runningOn(w.id), manual: workerManual(w),
        paused: !!state.workerCtl[w.id]?.paused, last_seen: w.last_seen });
    }
    for (const h of launchers) {
      const d = dev(h.ip, h.name || h.node || h.ip);
      if (h.name) d.label = h.name;
      d.launcher = { online: h.online, ip: h.ip, node: h.node, targets: h.targets, task: h.task, seen: h.seen };
      d.last_seen = Math.max(d.last_seen, h.seen || 0);
      if (!d.tailnet) d.tailnet = { node: h.node || null, ip: h.ip, user: h.user || null };
    }
    const list = [...byKey.values()].map((d) => ({ ...d, workers_online: d.workers.filter((w) => w.online).length,
      online: d.workers.some((w) => w.online) || !!d.launcher?.online })).sort((a, b) => a.label.localeCompare(b.label) || a.key.localeCompare(b.key));
    const seen = new Set([...workers.keys(), ...launchers.map((h) => h.ip), IMPORTED]);
    const history = [];
    for (const j of jobs.values()) if (j.worker && !seen.has(j.worker) && !history.includes(j.worker)) history.push(j.worker);
    for (const e of ctx.ledger) if (e.worker && e.worker !== 'unknown' && !seen.has(e.worker) && !history.includes(e.worker)) history.push(e.worker);
    return { devices: list, history_machines: history.sort(), computers: { total: list.length, online: list.filter((d) => d.online).length } };
  }

  function workerList() {
    const t = ctx.now();
    for (const [id, w] of workers) if (t - w.last_seen > REGISTRY_TTL_MS) { workers.delete(id); delete registry[id]; } // offline machines stay listed for 30 days
    return [...workers.values()].map((w) => ({ id: w.id, last_seen: w.last_seen, slots: w.slots, info: w.info, arcs: Object.keys(w.arcs || {}),
      cap: Number.isInteger((state.workerCtl[w.id] || {}).cap) ? state.workerCtl[w.id].cap : null, paused: !!(state.workerCtl[w.id] || {}).paused,
      online: workerOnline(w), manual: workerManual(w), requested: requested(w), running: runningOn(w.id), conflict: w.conflict === true }));
  }
  // compute split: per-worker slot cap (null = no cap) and pause; persisted so it survives a restart
  function setWorkerCtl(id, { cap, paused, manual }) {
    if (!workers.has(id)) throw new HttpError(404, 'unknown worker');
    if (cap !== undefined && cap !== null && !(Number.isInteger(cap) && cap >= 0 && cap <= 64)) throw new HttpError(400, 'cap must be null or an integer 0-64');
    if (paused !== undefined && typeof paused !== 'boolean') throw new HttpError(400, 'paused must be boolean');
    const cur = { ...(state.workerCtl[id] || {}) };
    if (cap !== undefined) cur.cap = cap;
    if (paused !== undefined) cur.paused = paused;
    if (manual !== undefined) {
      if (typeof manual !== 'boolean') throw new HttpError(400, 'manual must be boolean');
      cur.manual = manual;
    }
    if (paused === true || manual !== undefined) workers.get(id).requested = 0;
    state.workerCtl[id] = cur;
    state.save();
  }

  persist();
  return { start, pause, resume, retryFailed, claim, heartbeat, release, result, reap, armCells, finishedRepairs, matrix, judgeItems, pipelineProgress, armBlockers, judgeBlockers,
    markImported, stopJob, addLedger, resetLedger, machineView, devices, jobView, workers: workerList, setWorkerCtl, requestWork, unclaimWork, runInfo: () => state.run, jobs };
}

module.exports = { create };
