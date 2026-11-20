// Cost, intake and projection maths. All pure over ctx.ledger / ctx.state.
const DEFAULT_ITER = 2;
const MIN = 60000;

function modelOf(ctx, arm) {
  if (arm === 'judge') return { model_id: ctx.state.settings.judge_model_id, provider: 'gemini', open: false };
  const a = ctx.state.arms[arm];
  return { model_id: a.model_id, provider: a.provider, open: ctx.armKind(arm) === 'open_source' };
}

// pricing by exact model id, else by provider; open-source arms cost 0 unless a price is set for the model
function price(ctx, arm) {
  const m = modelOf(ctx, arm);
  const p = ctx.state.pricing;
  return p[m.model_id] || (m.open ? null : p[m.provider]) || null;
}

function cost(ctx, arm, input, output) {
  const p = price(ctx, arm);
  return p ? (input * p.input_per_mtok + output * p.output_per_mtok) / 1e6 : 0;
}

function aggregate(ctx, now) {
  const by = {};
  for (const id of [...Object.keys(ctx.state.arms), 'judge']) {
    by[id] = { id, input: 0, output: 0, cost_usd: 0, calls: 0, rtokens: 0, rcalls: 0 };
  }
  const total = { input: 0, output: 0, cost_usd: 0 };
  const roll = { tokens: 0, cost_usd: 0 };
  const t0 = Math.floor(now / MIN) * MIN - 119 * MIN;
  const buckets = Array.from({ length: 120 }, () => ({ cost: 0, tokens: 0 }));
  let preCost = 0, preTokens = 0;

  for (const e of ctx.ledger) {
    const id = e.kind === 'judge' ? 'judge' : e.arm;
    const s = by[id];
    if (!s) continue;
    const c = cost(ctx, id, e.input, e.output);
    const tokens = e.input + e.output;
    s.input += e.input; s.output += e.output; s.cost_usd += c; s.calls += e.calls;
    total.input += e.input; total.output += e.output; total.cost_usd += c;
    if (e.ts >= now - 5 * MIN) { s.rtokens += tokens; s.rcalls += e.calls; roll.tokens += tokens; roll.cost_usd += c; }
    const b = Math.floor((e.ts - t0) / MIN);
    if (b < 0) { preCost += c; preTokens += tokens; } else if (b < 120) { buckets[b].cost += c; buckets[b].tokens += tokens; }
  }
  let cc = preCost, ct = preTokens;
  const series = buckets.map((b, i) => {
    cc += b.cost; ct += b.tokens;
    return { t: t0 + (i + 1) * MIN, cum_cost_usd: cc, cum_tokens: ct };
  });
  return { by, total, roll, series };
}

function intake(agg) {
  return {
    total: agg.total,
    rolling5m: agg.roll,
    sources: Object.values(agg.by).map((s) => ({
      id: s.id, input: s.input, output: s.output, cost_usd: s.cost_usd, calls: s.calls, tokens_per_min: s.rtokens / 5,
    })),
    series: agg.series,
  };
}

// expected iterations (measured mean, default 2, capped) and per-call tokens (measured, else estimate.json)
function armStats(ctx, agg, id, done) {
  const s = agg.by[id];
  const est = ctx.estimate();
  const maxIter = ctx.state.settings.max_iter;
  const measured = s.calls > 0;
  const expectedIter = Math.min(maxIter, measured && done > 0 ? s.calls / done : DEFAULT_ITER);
  const avgIn = measured ? s.input / s.calls : est.input;
  const avgOut = measured ? s.output / s.calls : est.output;
  return { measured, expectedIter, avgIn, avgOut, perCell: expectedIter * cost(ctx, id, avgIn, avgOut) };
}

// counts: {<arm>: {total, done}}
function project(ctx, agg, counts) {
  const { budget_usd } = ctx.state.settings;
  let estTotal = 0, repairCallsLeft = 0, repairCallsPerMin = 0;
  const by_arm = Object.keys(ctx.state.arms).map((id) => {
    const { total, done } = counts[id];
    const st = armStats(ctx, agg, id, done);
    const open = ctx.armKind(id) === 'open_source';
    const left = (total - done) * st.expectedIter;
    const est = open ? 0 : (total - done) * st.perCell;
    estTotal += est;
    if (!open) { repairCallsLeft += left; repairCallsPerMin += agg.by[id].rcalls / 5; }
    return {
      arm: id, calls_total: Math.round(total * st.expectedIter), calls_done: agg.by[id].calls,
      avg_in: st.avgIn, avg_out: st.avgOut, est_cost_usd: est,
      basis: open ? 'self-hosted' : st.measured ? 'measured' : 'estimated',
    };
  });
  const spent = agg.total.cost_usd;
  return {
    budget_usd, spent_usd: spent, remaining_usd: budget_usd - spent, expected_total_usd: spent + estTotal,
    over_budget: spent + estTotal > budget_usd,
    eta_minutes: repairCallsLeft === 0 ? 0 : repairCallsPerMin > 0 ? repairCallsLeft / repairCallsPerMin : null,
    by_arm,
  };
}

module.exports = { cost, aggregate, intake, armStats, project };
