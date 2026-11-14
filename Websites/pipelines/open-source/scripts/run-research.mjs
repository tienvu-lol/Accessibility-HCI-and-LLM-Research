// Phase A executor: the assigned open-weight model proposes references, the orchestrator
// verifies them over real HTTP, and the model maps pages only from that evidence.
// Writes research notes, durable HTTP evidence and proposed inventory rows. It never
// writes approval cells and never touches the central register.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {
  loadSetup, validateSetup, validateModels, categoryFor, modelForSlot, modelRecord,
  readCSV, inside, cliArgs, hash, nowISO, stamp, writeJSON, readJSON, extractJSON, redact,
  queueUpdate, padSlot, SLOTS, normalizeUrl,
} from './lib.mjs';
import {Agent} from './provider.mjs';
import {fetchAll, evidenceSummary} from './verify-sources.mjs';

const isMain = meta => process.argv[1] && fileURLToPath(meta.url) === path.resolve(process.argv[1]);

const USAGE = `Usage: node run-research.mjs <PREFIX|category> [--slot 7] [--model-slot 7] [--dry-run] [--candidates 3]

  --slot         research one slot only, or a comma list (default: all of ${SLOTS.join(', ')})
  --model-slot   which declared slot's model does the research (default: the lowest researched slot)
  --candidates   candidate sites per slot in exchange 1 (default 3)
  --compact      trim the evidence for a small served context window (recommended under ~32k)
  --max-pages    cap the proposed page map (default config max, currently 16)
  --dry-run      print the exchange-1 prompt and exit; no API call, no files written`;

/** Reference URLs already recorded in this category, and whether each belongs to a slot being researched. */
export function reservedUrls(inventory, researchedSlots = SLOTS) {
  const held = new Map();
  for (const row of inventory) {
    const url = normalizeUrl(row.source_url);
    if (!url) continue;
    held.set(url, {
      source_id: row.source_id, model_group: row.model_group,
      ours: researchedSlots.includes(Number(row.slot)),
    });
  }
  return held;
}

const slotBrief = (category, slots) =>
  category.sampling_strata.filter(s => slots.includes(s.slot)).map(s => ({
    source_id: s.source_id, slot: s.slot, stratum: s.stratum,
  }));

const idsFor = (category, slots) => slots.map(s => `${category.prefix}-${padSlot(s)}`);

function candidatePrompt(setup, category, inventory, count, slots) {
  const brief = slotBrief(category, slots);
  const held = [...reservedUrls(inventory, slots).entries()].filter(([, v]) => !v.ours);
  const partial = slots.length < SLOTS.length;
  return `${fs.readFileSync(path.join(setup.pipeline, 'prompts/research.md'), 'utf8')}

## Exchange 1 of 3 — candidates

Category: **${category.category}** (${category.name}), ID prefix ${category.prefix}.

${partial
  ? `This run covers **${slots.length === 1 ? 'one slot only' : `${slots.length} slots only`}**: ${idsFor(category, slots).join(', ')}. The other open-source slots of this category are being researched separately, so propose nothing for them.`
  : `This run covers all four open-source slots of the category.`}

Slot${slots.length > 1 ? 's' : ''} and stratum:

${brief.map(s => `- ${s.source_id} (slot ${padSlot(s.slot)}): ${s.stratum}`).join('\n')}

References already recorded for this category, which you must not pick:
${held.length ? held.map(([url, v]) => `- ${url} (${v.source_id}, ${v.model_group})`).join('\n') : '- none recorded yet'}

Category page types to expect, where the source actually has them: ${category.representative_pages.join('; ')}.
Category interactions to look for: ${category.conditional_interactions.join('; ')}.
Simulation restrictions that will apply at build time: ${category.simulation_notes}

Propose ${count} candidates for ${slots.length > 1 ? 'each slot' : 'this slot'}, best first. Reply with a short rationale, then one JSON object, fenced as \`\`\`json, in exactly this shape:

\`\`\`json
{"candidates": {${brief.map(s => `"${s.slot}": [{"name": "...", "url": "https://...", "why": "..."}]`).join(', ')}}}
\`\`\`

Use canonical homepage URLs with no tracking parameters. I will fetch them over HTTP and report what actually came back; do not state that any of them is live.`;
}

function selectionPrompt(category, evidence, maxPages, slots) {
  const ids = idsFor(category, slots);
  return `## Exchange 2 of 3 — choose ${slots.length > 1 ? 'one site per slot' : 'the site'} and propose pages

Here is what the HTTP GETs actually returned. This is your only evidence; anything not shown here is unverified.

\`\`\`json
${JSON.stringify(evidence, null, 1)}
\`\`\`

Pick exactly one site ${slots.length > 1 ? `per slot, ${slots.length} distinct organizations in all` : 'for this slot'}, from the candidates that answered with a 2xx status. If no candidate is usable, say so and propose a different site in the same stratum instead of settling for a broken one.

Then list the interior pages you want verified: between 6 and ${maxPages} URLs ${slots.length > 1 ? 'per site' : ''}, drawn from the nav_links and other_links above where possible, always including the homepage. Choose pages that carry the information architecture — listings, detail pages, a form, a search or directory page — not legal boilerplate.

Note on evidence quality: a site that returned a large page but only one or two nav_links is probably rendering its navigation with JavaScript, which this method cannot see. Prefer a candidate whose links are actually visible in the fetched markup, because pages you cannot verify cannot be mapped.

Reply with a brief note, then one fenced JSON object:

\`\`\`json
{"selected": {${ids.map(id => `"${id}": {"name": "...", "url": "https://...", "pages": ["https://...", "https://..."]}`).join(', ')}}}
\`\`\`

Use ${ids.length > 1 ? `every one of ${ids.join(', ')} as a key` : `exactly ${ids[0]} as the key`}.`;
}

function notesPrompt(category, evidence, slots) {
  const ids = idsFor(category, slots);
  return `## Exchange 3 of 3 — research block${ids.length > 1 ? 's' : ''} and inventory row${ids.length > 1 ? 's' : ''}

The interior pages you asked for were fetched. Results:

\`\`\`json
${JSON.stringify(evidence, null, 1)}
\`\`\`

Write the research block${ids.length > 1 ? 's' : ''} exactly as Phase A specifies: a \`### <SOURCE_ID>\` heading ${ids.length > 1 ? 'per slot' : ''} with source_id, subcategory, source_name, official_url, verified_at, verification_result, source_pages, key_regions, key_interactions, complexity, stack_clues and limitations. Map only URLs that returned 2xx above. A page that failed goes in limitations with its status. Every interaction is marked observed only if the fetched markup supports it, otherwise inferred.

Then, after the block${ids.length > 1 ? 's' : ''}, emit one fenced JSON object with the proposed inventory row${ids.length > 1 ? 's' : ''}:

\`\`\`json
{"rows": [{"source_id": "${ids[0]}", "subcategory": "...", "source_name": "...", "source_url": "https://...", "verified_at": "YYYY-MM-DD", "verification_method": "...", "verification_result": "verified", "evidence_reference": "", "source_pages": [{"url": "https://...", "title": "...", "local_file": "index.html"}], "key_regions": ["..."], "key_interactions": [{"name": "...", "evidence": "observed", "notes": "..."}], "complexity": "medium", "stack_clues": "...", "limitations": "..."}]}
\`\`\`

${ids.length > 1 ? `One row per slot, ${ids.length} rows.` : 'Exactly one row.'} Leave evidence_reference as an empty string — I fill it with the evidence file path. Do not include model_id, approved_at, approved_by or approval_reference: the model is recorded by me, and approval is the project lead's decision, not ours.`;
}

export async function runResearch({target, modelSlot, slots = SLOTS, candidates = 3, dryRun = false, compact = false, maxPages, root} = {}) {
  const setup = loadSetup(root);
  const setupErrors = validateSetup(setup);
  if (setupErrors.length) throw new Error('Pipeline validation failed:\n' + setupErrors.join('\n'));
  const category = categoryFor(setup, target);
  if (!category || ![category.prefix, category.category].includes(target))
    throw new Error(`Research target must be a category name or prefix (got "${target}")`);
  const researched = [...new Set(slots)].sort((a, b) => a - b);
  if (!researched.length || researched.some(s => !SLOTS.includes(s)))
    throw new Error(`--slot values must be among ${SLOTS.join(', ')}`);
  const researchModelSlot = modelSlot ?? researched[0];
  if (!SLOTS.includes(researchModelSlot)) throw new Error(`--model-slot must be one of ${SLOTS.join(', ')}`);

  // Only the researching model is called, so only its key is required; the researched slots
  // must be declared so each proposed row records the model that will build it.
  const needSlots = [...new Set([researchModelSlot, ...researched])].sort((a, b) => a - b);
  const modelErrors = setup.models || !dryRun
    ? validateModels(setup, {requireKeys: false, needSlots}).filter(e => !e.startsWith('Note:'))
    : [];
  if (modelErrors.length) throw new Error('Model declaration not usable:\n' + modelErrors.join('\n'));
  const model = modelForSlot(setup, researchModelSlot) ?? {
    model_id: '(undeclared)', provider: '(undeclared)', license: '(undeclared)', model_version: null,
    base_url: '(undeclared)', weights_url: '(undeclared)', open_weights: null,
    eligibility_note: '(undeclared)', api_key_env: '(undeclared)', params: {},
  };
  if (!dryRun && !process.env[model.api_key_env])
    throw new Error(`slot ${padSlot(researchModelSlot)}: environment variable ${model.api_key_env} is not set, so the research model cannot be called`);

  // A small served context cannot hold a full link dump, so --compact keeps the homepage's
  // navigation and reduces interior pages to their own URL, status, title and a few links.
  const caps = compact
    ? {candidate: {navLimit: 12, otherLimit: 4}, home: {navLimit: 30, otherLimit: 6}, interior: {navLimit: 0, otherLimit: 5}}
    : {candidate: {navLimit: 40, otherLimit: 40}, home: {navLimit: 40, otherLimit: 40}, interior: {navLimit: 40, otherLimit: 40}};
  const pageCap = Math.min(maxPages ?? setup.config.research.max_pages_per_source, setup.config.research.max_pages_per_source);
  if (pageCap < setup.config.research.min_pages_per_source)
    throw new Error(`--max-pages must be at least the configured minimum of ${setup.config.research.min_pages_per_source}`);

  const inventoryPath = inside(setup.root, `${setup.config.paths.inventories}/${category.category}.csv`);
  const inventory = readCSV(inventoryPath);
  const system = fs.readFileSync(path.join(setup.pipeline, 'prompts/system.md'), 'utf8');
  const prompt1 = candidatePrompt(setup, category, inventory, candidates, researched);

  if (dryRun) return {dryRun: true, system, prompt: prompt1, model: modelRecord(model),
    category: category.category, slots: researched, modelSlot: researchModelSlot, compact, pageCap};

  const label = researched.length === SLOTS.length ? category.prefix : `${category.prefix}-${researched.map(padSlot).join('-')}`;
  const runID = `${stamp()}-research-${label}`;
  const dir = inside(setup.pipeline, `runs/${runID}`);
  fs.mkdirSync(dir, {recursive: false});
  const snapshotFiles = [
    inside(setup.root, setup.config.paths.rules),
    inside(setup.root, setup.config.paths.allocation),
    path.join(setup.pipeline, 'config.json'),
    path.join(setup.pipeline, 'categories.json'),
    path.join(setup.pipeline, 'prompts/system.md'),
    path.join(setup.pipeline, 'prompts/research.md'),
    path.join(setup.pipeline, setup.config.models_file),
    inventoryPath,
    inside(setup.root, setup.config.paths.assignments),
  ];
  const snapDir = path.join(dir, 'snapshots');
  fs.mkdirSync(snapDir);
  const snapshots = snapshotFiles.map((file, i) => {
    fs.copyFileSync(file, path.join(snapDir, `${padSlot(i + 1)}-${path.basename(file)}`), fs.constants.COPYFILE_EXCL);
    return {path: path.relative(setup.root, file).split(path.sep).join('/'), sha256: hash(fs.readFileSync(file))};
  });

  const run = {
    run_id: runID, phase: 'research', target: category.prefix, category: category.category,
    slots: researched, partial_run: researched.length < SLOTS.length,
    evidence_detail: compact ? 'compact: interior-page navigation omitted to fit a small served context' : 'full',
    page_cap: pageCap,
    status: 'running', started_at: nowISO(), completed_at: null,
    research_model: modelRecord(model), research_model_slot: researchModelSlot,
    attribution_note: researched.length > 1
      ? 'Reference selection for these slots was performed by this one declared model, as in the Claude and Codex arms. The per-slot build models are declared separately.'
      : 'Reference selection for this slot was performed by the declared research model, which may differ from the model that builds it.',
    tool_access: 'no browsing, no shell: the orchestrator performed every HTTP GET and passed the results in',
    protocol_snapshots: snapshots, exchanges: [], http_rounds: [], usage: null, errors: [],
  };
  const runFile = path.join(dir, 'run.json');
  writeJSON(runFile, run);
  const save = () => writeJSON(runFile, run);
  const queueTask = `research-${category.prefix}`;
  queueUpdate(setup, queueTask, {status: 'running', run_id: runID});

  const agent = new Agent({model, api: setup.config.api, system});
  const fail = message => {
    run.status = 'failed'; run.completed_at = nowISO(); run.errors.push(message); run.usage = agent.usage; save();
    queueUpdate(setup, queueTask, {status: 'blocked'});
    throw new Error(message);
  };

  try {
    // Exchange 1 — candidates.
    await agent.ask(prompt1, {label: 'candidates'});
    let parsed = extractJSON(agent.turns.at(-1).response);
    if (!parsed?.candidates) {
      await agent.ask('That reply did not contain a parseable JSON object. Resend only the fenced ```json object with the "candidates" key, nothing else.', {label: 'candidates-retry'});
      parsed = extractJSON(agent.turns.at(-1).response);
    }
    if (!parsed?.candidates) fail('The model did not return parseable candidates after a retry; see the transcript.');

    const wanted = [];
    for (const slot of researched) {
      const list = parsed.candidates[String(slot)] ?? parsed.candidates[slot];
      if (!Array.isArray(list) || !list.length) fail(`No candidates proposed for slot ${slot}`);
      for (const item of list.slice(0, candidates)) if (item?.url) wanted.push({slot, name: item.name ?? null, url: String(item.url).trim()});
    }
    const held = reservedUrls(inventory, researched);
    const collisions = wanted.filter(c => {
      const owner = held.get(normalizeUrl(c.url));
      return owner && !owner.ours;
    });
    run.exchanges.push({exchange: 1, label: 'candidates', proposed: wanted.length, collisions: collisions.map(c => c.url)});
    save();

    // HTTP round 1 — homepages.
    const homepageUrls = [...new Set(wanted.map(c => c.url))];
    const round1 = await fetchAll(homepageUrls, setup.config.research);
    run.http_rounds.push({round: 1, kind: 'candidate homepages', requested: homepageUrls.length,
      ok: round1.filter(r => r.ok).length, at: nowISO()});
    save();
    const evidence1 = {
      method: 'HTTP GET by the orchestrator', user_agent: setup.config.research.http_user_agent,
      note: 'Availability only. No page was rendered, no script ran, no interaction was exercised.',
      candidates: wanted.map(c => {
        const rec = round1.find(r => r.url === c.url);
        const sum = rec ? evidenceSummary([rec], caps.candidate)[0] : null;
        return {slot: c.slot, proposed_name: c.name, ...(sum ?? {url: c.url, error: 'not fetched'}),
          already_recorded_for_another_slot: collisions.some(x => x.url === c.url)};
      }),
    };

    // Exchange 2 — selection and page proposals.
    await agent.ask(selectionPrompt(category, evidence1, pageCap, researched), {label: 'selection'});
    let selection = extractJSON(agent.turns.at(-1).response);
    if (!selection?.selected) {
      await agent.ask('That reply did not contain a parseable JSON object. Resend only the fenced ```json object with the "selected" key.', {label: 'selection-retry'});
      selection = extractJSON(agent.turns.at(-1).response);
    }
    if (!selection?.selected) fail('The model did not return a parseable site selection after a retry.');

    const chosen = [];
    for (const slot of researched) {
      const id = `${category.prefix}-${padSlot(slot)}`;
      const pick = selection.selected[id] ?? selection.selected[String(slot)];
      if (!pick?.url) fail(`No site selected for ${id}`);
      const pages = [...new Set([String(pick.url).trim(), ...(Array.isArray(pick.pages) ? pick.pages.map(p => String(p).trim()) : [])])]
        .slice(0, pageCap);
      chosen.push({source_id: id, slot, name: pick.name ?? null, url: String(pick.url).trim(), pages});
    }
    const chosenKeys = chosen.map(c => normalizeUrl(c.url) ?? c.url);
    if (new Set(chosenKeys).size !== chosen.length)
      fail(`The selected sites are not distinct: ${chosen.map(c => c.url).join(', ')}`);
    for (const c of chosen) {
      const owner = held.get(normalizeUrl(c.url));
      if (owner && !owner.ours) fail(`${c.source_id}: ${c.url} is already recorded for ${owner.source_id} (${owner.model_group}); a reference may not be reused across slots`);
    }
    run.exchanges.push({exchange: 2, label: 'selection', selected: chosen.map(c => ({source_id: c.source_id, url: c.url, pages: c.pages.length}))});
    save();

    // HTTP round 2 — the proposed interior pages.
    const interiorUrls = [...new Set(chosen.flatMap(c => c.pages))];
    const round2 = await fetchAll(interiorUrls, setup.config.research);
    run.http_rounds.push({round: 2, kind: 'proposed interior pages', requested: interiorUrls.length,
      ok: round2.filter(r => r.ok).length, at: nowISO()});
    save();
    const byUrl = new Map(round2.map(r => [r.url, r]));
    const evidence2 = {
      method: 'HTTP GET by the orchestrator', user_agent: setup.config.research.http_user_agent,
      note: 'Availability and markup inspection only; nothing was rendered or interacted with.',
      note_on_detail: compact
        ? 'Interior-page navigation is omitted because it repeats the homepage navigation; each interior page still shows its own URL, status, title, size and a few in-page links.'
        : undefined,
      sources: chosen.map(c => {
        const records = c.pages.map(u => byUrl.get(u)).filter(Boolean);
        const [home, ...rest] = records;
        return {
          source_id: c.source_id, name: c.name, url: c.url,
          pages: [
            ...(home ? evidenceSummary([home], caps.home) : []),
            ...evidenceSummary(rest, caps.interior),
          ],
        };
      }),
    };

    // Durable evidence file, referenced by the inventory rows.
    const evidenceDir = inside(setup.pipeline, 'research/evidence');
    fs.mkdirSync(evidenceDir, {recursive: true});
    const day = new Date().toISOString().slice(0, 10);
    const evidenceName = `${label}-http-${day}.json`;
    const evidencePath = path.join(evidenceDir, evidenceName);
    writeJSON(evidencePath, {
      tool: 'pipelines/open-source/scripts/verify-sources.mjs', run_id: runID, model_group: 'open-source',
      category: category.category, slots: researched, fetched_at: nowISO(),
      method: 'HTTP GET', rendered: false, interactions_tested: false,
      user_agent: setup.config.research.http_user_agent,
      rounds: [{round: 1, kind: 'candidate homepages', records: round1}, {round: 2, kind: 'interior pages', records: round2}],
    });
    const evidenceRef = `pipelines/open-source/research/evidence/${evidenceName}`;

    // Exchange 3 — research blocks and proposed rows.
    await agent.ask(notesPrompt(category, evidence2, researched), {label: 'notes'});
    const notesReply = agent.turns.at(-1).response;
    let rows = extractJSON(notesReply)?.rows;
    if (!Array.isArray(rows) || rows.length !== researched.length) {
      await agent.ask(`That reply did not contain ${researched.length} parseable inventory row(s). Resend only the fenced \`\`\`json object with a "rows" array of exactly ${researched.length} object(s).`, {label: 'notes-retry'});
      rows = extractJSON(agent.turns.at(-1).response)?.rows;
    }
    if (!Array.isArray(rows) || rows.length !== researched.length)
      fail(`The model did not return ${researched.length} parseable inventory row(s) after a retry.`);

    const okUrls = new Set(round2.filter(r => r.ok).map(r => normalizeUrl(r.final_url ?? r.url)));
    const proposals = rows.map(row => {
      const id = String(row.source_id ?? '').trim();
      const slot = Number(id.split('-').pop());
      const pages = Array.isArray(row.source_pages) ? row.source_pages : [];
      const unverifiedPages = pages.filter(p => !okUrls.has(normalizeUrl(p?.url)));
      return {
        ...row, source_id: id, slot, category: category.category, model_group: 'open-source',
        evidence_reference: evidenceRef,
        model_id: modelForSlot(setup, slot)?.model_id ?? '',
        model_version: modelForSlot(setup, slot)?.model_version ?? '',
        approved_at: '', approved_by: '', approval_reference: '',
        researched_by: {model_id: model.model_id, slot: researchModelSlot},
        orchestrator_checks: {
          pages_proposed: pages.length,
          pages_without_successful_fetch: unverifiedPages.map(p => p?.url ?? '(malformed)'),
          page_map_has_index: pages.some(p => p?.local_file === 'index.html'),
          source_url_fetched_ok: okUrls.has(normalizeUrl(row.source_url)),
          meets_min_pages: pages.length >= setup.config.research.min_pages_per_source,
        },
      };
    });
    const unexpected = proposals.filter(p => !researched.includes(p.slot));
    if (unexpected.length) fail(`The model returned rows for slots outside this run: ${unexpected.map(p => p.source_id).join(', ')}`);

    const notesName = researched.length === SLOTS.length ? `${category.prefix}.md` : `${label}.md`;
    const notesPath = inside(setup.pipeline, `research/${notesName}`);
    const header = `# ${label} — open-source source research (slot${researched.length > 1 ? 's' : ''} ${researched.map(padSlot).join(', ')})

- **Run:** \`${runID}\`${researched.length < SLOTS.length ? `\n- **Scope:** partial — this file covers ${idsFor(category, researched).join(', ')} only. The rest of the category is researched separately.` : ''}
- **Research model:** ${model.model_id} (${model.provider}, ${model.license}, open weights) declared for slot ${padSlot(researchModelSlot)}
- **Verification:** HTTP GET performed by the orchestrator (\`scripts/verify-sources.mjs\`), ${round1.filter(r => r.ok).length}/${round1.length} candidate homepages and ${round2.filter(r => r.ok).length}/${round2.length} interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** \`${evidenceRef}\`
- **Status:** proposals only. No source is approved and no row has been written to \`metadata/\`. The Claude group's Phase A waiver does not apply here.

`;
    fs.writeFileSync(notesPath, header + redact(notesReply).trim() + '\n');

    // Proposals are merged by source_id so partial runs accumulate into one file per category.
    const proposalDir = inside(setup.pipeline, 'research/proposals');
    fs.mkdirSync(proposalDir, {recursive: true});
    const proposalPath = path.join(proposalDir, `${category.prefix}-rows.json`);
    const existing = fs.existsSync(proposalPath) ? readJSON(proposalPath) : null;
    const merged = new Map((existing?.rows ?? []).map(r => [r.source_id, r]));
    for (const row of proposals) merged.set(row.source_id, row);
    const mergedRows = [...merged.values()].sort((a, b) => a.slot - b.slot);
    writeJSON(proposalPath, {
      category: category.category, prefix: category.prefix, updated_at: nowISO(),
      slots_proposed: mergedRows.map(r => r.slot),
      slots_outstanding: SLOTS.filter(s => !mergedRows.some(r => r.slot === s)),
      approval_state: 'unapproved: approval cells are left empty for the project lead',
      runs: [...new Set([...(existing?.runs ?? []), runID])],
      rows: mergedRows,
    });

    writeJSON(path.join(dir, 'transcript.json'), {run_id: runID, model: modelRecord(model), turns: agent.transcript});
    run.status = 'completed';
    run.completed_at = nowISO();
    run.usage = agent.usage;
    run.outputs = {
      research_notes: `pipelines/open-source/research/${notesName}`,
      proposed_rows: `pipelines/open-source/research/proposals/${category.prefix}-rows.json`,
      evidence: evidenceRef,
      transcript: `pipelines/open-source/runs/${runID}/transcript.json`,
    };
    save();
    const outstanding = SLOTS.filter(s => !mergedRows.some(r => r.slot === s));
    queueUpdate(setup, queueTask, {
      status: outstanding.length ? 'prepared' : 'completed',
      slots_researched: mergedRows.map(r => r.slot),
    });
    return {runID, dir, category: category.category, slots: researched, proposals, evidenceRef,
      usage: agent.usage, outstanding, notes: `pipelines/open-source/research/${notesName}`,
      httpOk: {homepages: `${round1.filter(r => r.ok).length}/${round1.length}`, interior: `${round2.filter(r => r.ok).length}/${round2.length}`}};
  } catch (e) {
    if (run.status === 'running') {
      run.status = 'failed'; run.completed_at = nowISO(); run.usage = agent.usage;
      run.errors.push(redact(e.message)); save();
      queueUpdate(setup, queueTask, {status: 'blocked'});
    }
    throw e;
  }
}

if (isMain(import.meta)) {
  try {
    const {positional, flags} = cliArgs(process.argv.slice(2), {
      'model-slot': 'value', 'dry-run': 'boolean', candidates: 'value', slot: 'value',
      compact: 'boolean', 'max-pages': 'value',
    });
    if (positional.length !== 1) throw new Error(USAGE);
    const result = await runResearch({
      target: positional[0],
      slots: flags.slot ? flags.slot.split(',').map(s => Number(s.trim())) : SLOTS,
      modelSlot: flags['model-slot'] ? Number(flags['model-slot']) : undefined,
      candidates: flags.candidates ? Number(flags.candidates) : 3,
      dryRun: Boolean(flags['dry-run']),
      compact: Boolean(flags.compact),
      maxPages: flags['max-pages'] ? Number(flags['max-pages']) : undefined,
    });
    if (result.dryRun) {
      console.log(`--- system (${result.model.model_id}) ---\n${result.system}\n--- exchange 1 prompt ---\n${result.prompt}`);
      console.log(`\nDry run for ${result.category}, slot(s) ${result.slots.map(padSlot).join(', ')}, research model from slot ${padSlot(result.modelSlot)}, evidence ${result.compact ? 'compact' : 'full'}, page cap ${result.pageCap}. No API call was made and nothing was written.`);
    } else {
      console.log(`Research run ${result.runID} completed for ${result.category}, slot(s) ${result.slots.map(padSlot).join(', ')}.`);
      console.log(`HTTP verified: homepages ${result.httpOk.homepages}, interior pages ${result.httpOk.interior}. Evidence: ${result.evidenceRef}`);
      console.log(`Tokens: ${result.usage.total_tokens || 'not reported'} over ${result.usage.requests} requests (${result.usage.retries} retries).`);
      for (const row of result.proposals) {
        const c = row.orchestrator_checks;
        console.log(`  ${row.source_id}  ${row.source_url}`);
        console.log(`    pages=${c.pages_proposed} unverified=${c.pages_without_successful_fetch.length} index=${c.page_map_has_index} min-pages=${c.meets_min_pages} complexity=${row.complexity}`);
      }
      console.log(`Notes: ${result.notes}`);
      if (result.outstanding.length) console.log(`Still outstanding in this category: slots ${result.outstanding.map(padSlot).join(', ')}.`);
      console.log('Proposals only: no approval cell was filled and the central register was not touched.');
    }
  } catch (e) { console.error(e.message); process.exitCode = 1; }
}
