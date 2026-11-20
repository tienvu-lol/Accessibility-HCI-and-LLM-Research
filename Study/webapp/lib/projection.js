// Cost, intake and projection maths, pure over ctx.ledger / ctx.state.
//
// A ledger row is a historical fact: the machine that ran the call, the model that served it, the
// credential that paid for it, whether it was a mock (test) call, and the cost at the price in effect
// when it finished. So nothing here reprices history, and a mock run can never be mistaken for spend.
// Rows written before that (no `cost_usd`) are still read, priced the old way, and counted as legacy.
const DEFAULT_ITER = 2;
const MIN = 60000;

function modelOf(ctx, arm) {
  if (arm === 'judge') return { model_id: ctx.state.settings.judge_model_id, provider: 'gemini', open: false };
  const a = ctx.state.arms[arm];
  return { model_id: a.model_id, provider: a.provider, open: ctx.armKind(arm) === 'open_source' };
}

// Price for one model id: exact id first, else the provider's rate. Open-source arms have no provider
// rate (they are self-hosted), so an unpriced open model stays unpriced rather than inheriting one.
function priceFor(ctx, arm, modelId) {
  const p = ctx.state.pricing;
  const m = modelOf(ctx, arm);
  return (modelId && p[modelId]) || (m.open ? null : p[m.provider]) || null;
}
const priceAt = (p, input, output) => (p ? (input * p.input_per_mtok + output * p.output_per_mtok) / 1e6 : 0);

// the price of a call on an arm's *current* model (projections, not history)
const price = (ctx, arm) => priceFor(ctx, arm, modelOf(ctx, arm).model_id);
const cost = (ctx, arm, input, output) => priceAt(price(ctx, arm), input, output);

// What one finished call costs, decided once, at the moment it is recorded.
function entryCost(ctx, e) {
  if (e.mock) return { cost_usd: 0, priced: true };
  const p = priceFor(ctx, e.kind === 'judge' ? 'judge' : e.arm, e.model_id);
  return { cost_usd: priceAt(p, e.input, e.output), priced: !!p };
}

const bucket = () => ({ calls: 0, input: 0, output: 0, cost_usd: 0 });
const addTo = (b, e, c) => { b.calls += e.calls; b.input += e.input; b.output += e.output; b.cost_usd += c; };

function aggregate(ctx, now) {
  const by = {};
  for (const id of [...Object.keys(ctx.state.arms), 'judge']) {
    by[id] = { id, input: 0, output: 0, cost_usd: 0, calls: 0, rtokens: 0, rcalls: 0, models: {}, mock: bucket(), legacy_calls: 0 };
  }
  const total = { input: 0, output: 0, cost_usd: 0 };
  const roll = { tokens: 0, cost_usd: 0 };
  const machines = new Map(); // which computer ran the call
  const keys = new Map();     // which API key paid for it
  const t0 = Math.floor(now / MIN) * MIN - 119 * MIN;
  const buckets = Array.from({ length: 120 }, () => ({ cost: 0, tokens: 0 }));
  let preCost = 0, preTokens = 0, legacy = 0, mockCalls = 0;

  for (const e of ctx.ledger) {
    const id = e.kind === 'judge' ? 'judge' : e.arm;
    const s = by[id];
    if (!s) continue;
    const isLegacy = typeof e.cost_usd !== 'number';
    const isMock = e.mock === true;
    // a legacy row has no model, so it can only be priced by the arm's model as it stands now
    const model = e.model_id || (isLegacy ? modelOf(ctx, id).model_id : null) || 'unknown';
    const c = isMock ? 0 : isLegacy ? cost(ctx, id, e.input, e.output) : e.cost_usd;
    const tokens = e.input + e.output;
    if (isLegacy) { s.legacy_calls += e.calls; legacy += e.calls; }

    if (isMock) { addTo(s.mock, e, 0); mockCalls += e.calls; } else {
      s.input += e.input; s.output += e.output; s.cost_usd += c; s.calls += e.calls;
      s.models[model] = s.models[model] || bucket();
      addTo(s.models[model], e, c);
      total.input += e.input; total.output += e.output; total.cost_usd += c;
      if (e.ts >= now - 5 * MIN) { s.rtokens += tokens; s.rcalls += e.calls; roll.tokens += tokens; roll.cost_usd += c; }
      const b = Math.floor((e.ts - t0) / MIN);
      if (b < 0) { preCost += c; preTokens += tokens; } else if (b < 120) { buckets[b].cost += c; buckets[b].tokens += tokens; }
    }

    // a machine is a physical computer; the worker containers on it are its nodes (ctx.machineOf maps one to the other)
    const node = e.worker || e.source || 'unknown';
    const host = ctx.machineOf ? ctx.machineOf(node) : node;
    let mm = machines.get(host);
    if (!mm) machines.set(host, (mm = { id: host, ...bucket(), mock_calls: 0, arms: {}, nodes: {} }));
    const nn = mm.nodes[node] = mm.nodes[node] || { id: node, ...bucket(), mock_calls: 0 };
    if (isMock) { mm.mock_calls += e.calls; nn.mock_calls += e.calls; }
    else { addTo(mm, e, c); addTo(mm.arms[id] = mm.arms[id] || bucket(), e, c); addTo(nn, e, c); }

    const kid = e.key_id || (isLegacy ? null : 'unattributed');
    if (kid && !isMock) {
      let kk = keys.get(kid);
      if (!kk) keys.set(kid, (kk = { id: kid, arm: id, model_id: model, ...bucket() }));
      addTo(kk, e, c);
      if (kk.arm !== id) kk.arm = 'several';
    }
  }
  let cc = preCost, ct = preTokens;
  const series = buckets.map((b, i) => {
    cc += b.cost; ct += b.tokens;
    return { t: t0 + (i + 1) * MIN, cum_cost_usd: cc, cum_tokens: ct };
  });
  const cmp = (a, b) => b.cost_usd - a.cost_usd || b.calls - a.calls || String(a.id).localeCompare(String(b.id));
  return { by, total, roll, series, legacy_calls: legacy, mock_calls: mockCalls,
    machines: [...machines.values()].sort(cmp), keys: [...keys.values()].sort(cmp) };
}

function intake(agg) {
  return {
    total: agg.total,
    rolling5m: agg.roll,
    sources: Object.values(agg.by).map((s) => ({
      id: s.id, input: s.input, output: s.output, cost_usd: s.cost_usd, calls: s.calls, tokens_per_min: s.rtokens / 5,
    })),
    machines: agg.machines.map((m) => ({ id: m.id, calls: m.calls, input: m.input, output: m.output, cost_usd: m.cost_usd, mock_calls: m.mock_calls })),
    series: agg.series,
  };
}

// expected iterations (measured mean, default 2, capped) and per-call tokens, measured from this arm's
// CURRENT model only: calls on a model it no longer uses, and mock calls, say nothing about what it will cost.
function armStats(ctx, agg, id, done) {
  const s = agg.by[id];
  const est = ctx.estimate();
  const maxIter = ctx.state.settings.max_iter;
  const cur = modelOf(ctx, id).model_id;
  const m = (cur && s.models[cur]) || null;
  const measured = !!(m && m.calls > 0);
  const expectedIter = Math.min(maxIter, measured && done > 0 ? Math.max(1, m.calls / done) : DEFAULT_ITER);
  const avgIn = measured ? m.input / m.calls : est.input;
  const avgOut = measured ? m.output / m.calls : est.output;
  return { measured, expectedIter, avgIn, avgOut, perCell: expectedIter * priceAt(price(ctx, id), avgIn, avgOut) };
}

// counts: {<arm>: {total, done}}
function project(ctx, agg, counts, baseline) {
  const { budget_usd } = ctx.state.settings;
  let estTotal = 0, repairCallsLeft = 0, repairCallsPerMin = 0;
  const by_arm = Object.keys(ctx.state.arms).map((id) => {
    const { total, done, finished = done } = counts[id];
    const st = armStats(ctx, agg, id, finished);
    const open = ctx.armKind(id) === 'open_source';
    const left = (total - done) * st.expectedIter;
    const est = open && !price(ctx, id) ? 0 : (total - done) * st.perCell;
    estTotal += est;
    if (!open) { repairCallsLeft += left; repairCallsPerMin += agg.by[id].rcalls / 5; }
    const s = agg.by[id];
    return {
      arm: id, model_id: modelOf(ctx, id).model_id, calls_total: Math.max(Math.round(total * st.expectedIter), s.calls), calls_done: s.calls,
      avg_in: st.avgIn, avg_out: st.avgOut, spent_usd: s.cost_usd, est_cost_usd: est, est_total_usd: s.cost_usd + est,
      mock_calls: s.mock.calls, legacy_calls: s.legacy_calls,
      basis: open && !price(ctx, id) ? 'self-hosted' : !price(ctx, id) ? 'unpriced' : st.measured ? 'measured' : 'estimated',
    };
  });
  // judge: one call per (site, arm); the repair arms alone understate the total
  const j = counts.judge;
  if (j) {
    const js = agg.by.judge;
    const st = armStats(ctx, agg, 'judge', 0);
    const nVariants = ctx.state.settings.conditions.length + 1; // the judge sees every condition plus the unrepaired page
    // shortcut: unmeasured judge output is a flat 1000 tokens, replaced by the first real judge usage
    const avgIn = st.measured ? st.avgIn : nVariants * ctx.estimate().input;
    const avgOut = st.measured ? st.avgOut : 1000;
    const left = Math.max(j.total - j.done, 0);
    const est = left * priceAt(price(ctx, 'judge'), avgIn, avgOut);
    estTotal += est;
    by_arm.push({
      arm: 'judge', model_id: ctx.state.settings.judge_model_id, calls_total: Math.max(j.total, js.calls), calls_done: js.calls,
      avg_in: avgIn, avg_out: avgOut, spent_usd: js.cost_usd, est_cost_usd: est, est_total_usd: js.cost_usd + est,
      mock_calls: js.mock.calls, legacy_calls: js.legacy_calls,
      basis: !price(ctx, 'judge') ? 'unpriced' : st.measured ? 'measured' : 'estimated',
    });
  }
  const spent = agg.total.cost_usd;
  const vs = (now, then) => (typeof then === 'number' ? { baseline_total_usd: then, variance_usd: now - then, variance_pct: then > 0 ? ((now - then) / then) * 100 : null } : { baseline_total_usd: null, variance_usd: null, variance_pct: null });
  for (const r of by_arm) Object.assign(r, vs(r.est_total_usd, baseline && baseline.by_arm[r.arm]));
  return {
    baseline: baseline ? { at: baseline.at, expected_total_usd: baseline.expected_total_usd } : null,
    ...vs(spent + estTotal, baseline && baseline.expected_total_usd),
    budget_usd, spent_usd: spent, remaining_usd: budget_usd - spent, expected_total_usd: spent + estTotal,
    over_budget: spent + estTotal > budget_usd,
    eta_minutes: repairCallsLeft === 0 ? 0 : repairCallsPerMin > 0 ? repairCallsLeft / repairCallsPerMin : null,
    by_arm,
    by_machine: agg.machines.map((m) => ({ id: m.id, calls: m.calls, input: m.input, output: m.output, cost_usd: m.cost_usd,
      mock_calls: m.mock_calls, share_pct: spent > 0 ? (m.cost_usd / spent) * 100 : null,
      nodes: Object.values(m.nodes).map((n) => ({ id: n.id, calls: n.calls, input: n.input, output: n.output, cost_usd: n.cost_usd, mock_calls: n.mock_calls }))
        .sort((a, b) => b.calls - a.calls || a.id.localeCompare(b.id)),
      arms: Object.entries(m.arms).map(([arm, b]) => ({ arm, calls: b.calls, input: b.input, output: b.output, cost_usd: b.cost_usd })).sort((a, b) => b.cost_usd - a.cost_usd || a.arm.localeCompare(b.arm)) })),
    by_key: agg.keys.map((k) => ({ id: k.id, arm: k.arm, model_id: k.model_id, calls: k.calls, input: k.input, output: k.output, cost_usd: k.cost_usd })),
    mock_calls: agg.mock_calls, legacy_calls: agg.legacy_calls,
  };
}

module.exports = { cost, priceFor, priceAt, entryCost, aggregate, intake, armStats, project };
