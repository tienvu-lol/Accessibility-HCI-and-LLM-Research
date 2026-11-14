// Shared helpers for the open-source pipeline (slots 07-10).
// No third-party dependencies: this pipeline must run with a bare Node runtime.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';

export const PIPELINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const WEBSITES = path.resolve(PIPELINE, '../..');
export const SLOTS = [7, 8, 9, 10];
export const SLOT_RE = /-(07|08|09|10)$/;

export const readJSON = file => JSON.parse(fs.readFileSync(file, 'utf8'));
export const writeJSON = (file, value) => fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n');
export const hash = data => crypto.createHash('sha256').update(data).digest('hex');
export const nowISO = () => new Date().toISOString();
export const stamp = () => new Date().toISOString().replace(/[:.]/g, '-');
export const padSlot = n => String(n).padStart(2, '0');

/** Resolve `relative` under `root`, refusing traversal and symlink escapes. */
export function inside(root, relative) {
  if (typeof relative !== 'string' || !relative || path.isAbsolute(relative)) throw new Error('Expected a relative path');
  const resolved = path.resolve(root, relative);
  if (resolved !== root && !resolved.startsWith(root + path.sep)) throw new Error(`Path escapes root: ${relative}`);
  let existing = resolved;
  while (!fs.existsSync(existing)) existing = path.dirname(existing);
  const real = fs.realpathSync(existing), realRoot = fs.realpathSync(root);
  if (real !== realRoot && !real.startsWith(realRoot + path.sep)) throw new Error('Symlink escapes root');
  return resolved;
}

export function parseCSV(text) {
  text = text.replace(/^﻿/, '');
  const rows = []; let row = [], field = '', quoted = false, closed = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (ch === '"') { quoted = false; closed = true; }
      else field += ch;
    } else if (ch === '"') {
      if (field || closed) throw new Error('Malformed CSV quote');
      quoted = true;
    } else if (ch === ',') { row.push(field); field = ''; closed = false; }
    else if (ch === '\r' || ch === '\n') {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      row.push(field); if (row.some(Boolean)) rows.push(row);
      row = []; field = ''; closed = false;
    } else {
      if (closed) throw new Error('Unexpected text after CSV closing quote');
      field += ch;
    }
  }
  if (quoted) throw new Error('Unterminated CSV quote');
  if (field || row.length || closed) { row.push(field); rows.push(row); }
  if (!rows.length) throw new Error('Empty CSV');
  const headers = rows.shift();
  if (new Set(headers).size !== headers.length) throw new Error('Duplicate CSV columns');
  return rows.map((values, i) => {
    if (values.length !== headers.length) throw new Error(`CSV row ${i + 2}: ${values.length} fields; expected ${headers.length}`);
    return Object.fromEntries(headers.map((key, j) => [key, values[j]]));
  });
}
export const readCSV = file => parseCSV(fs.readFileSync(file, 'utf8'));
export const csvCell = value => /[",\r\n]/.test(value ?? '') ? `"${String(value).replace(/"/g, '""')}"` : (value ?? '');
export const toCSV = (headers, rows) =>
  [headers.join(','), ...rows.map(r => headers.map(h => csvCell(r[h])).join(','))].join('\n') + '\n';

/** Dependency-free validation of the JSON Schema subset used by this pipeline's schemas. */
export function validateSchema(value, schema, label = '$', rootSchema = schema) {
  if (schema.$ref) {
    const target = schema.$ref.replace(/^#\//, '').split('/').reduce((acc, k) => acc?.[k], rootSchema);
    if (!target) return [`${label}: unresolved $ref ${schema.$ref}`];
    return validateSchema(value, target, label, rootSchema);
  }
  const errors = [];
  if ('const' in schema && JSON.stringify(value) !== JSON.stringify(schema.const)) errors.push(`${label}: expected ${JSON.stringify(schema.const)}`);
  if (schema.enum && !schema.enum.some(x => JSON.stringify(x) === JSON.stringify(value))) errors.push(`${label}: not in allowed values`);
  const types = Array.isArray(schema.type) ? schema.type : [schema.type];
  const actual = value === null ? 'null' : Array.isArray(value) ? 'array' : typeof value;
  if (schema.type && !types.some(t => t === actual || (t === 'integer' && Number.isInteger(value)))) return [...errors, `${label}: invalid type ${actual}`];
  if (typeof value === 'number') {
    if (schema.minimum !== undefined && value < schema.minimum) errors.push(`${label}: below minimum`);
    if (schema.maximum !== undefined && value > schema.maximum) errors.push(`${label}: above maximum`);
  }
  if (typeof value === 'string' && schema.minLength && value.trim().length < schema.minLength) errors.push(`${label}: empty string`);
  if (Array.isArray(value)) {
    if (schema.minItems !== undefined && value.length < schema.minItems) errors.push(`${label}: too few items`);
    if (schema.maxItems !== undefined && value.length > schema.maxItems) errors.push(`${label}: too many items`);
    if (schema.uniqueItems && new Set(value.map(x => JSON.stringify(x))).size !== value.length) errors.push(`${label}: duplicate items`);
    if (schema.items) value.forEach((x, i) => errors.push(...validateSchema(x, schema.items, `${label}[${i}]`, rootSchema)));
  } else if (value && typeof value === 'object') {
    for (const key of schema.required || []) if (!(key in value)) errors.push(`${label}: missing ${key}`);
    for (const [key, item] of Object.entries(value)) {
      if (schema.properties?.[key]) errors.push(...validateSchema(item, schema.properties[key], `${label}.${key}`, rootSchema));
      else if (schema.additionalProperties === false) errors.push(`${label}: unknown ${key}`);
    }
  }
  return errors;
}

export function loadSetup(root = WEBSITES) {
  const pipeline = inside(root, 'pipelines/open-source');
  const config = readJSON(path.join(pipeline, 'config.json'));
  const modelsPath = path.join(pipeline, config.models_file);
  return {
    root, pipeline, config,
    categories: readJSON(path.join(pipeline, 'categories.json')).categories,
    queue: readJSON(path.join(pipeline, 'queue/manifest.json')),
    modelsPath,
    models: fs.existsSync(modelsPath) ? readJSON(modelsPath) : null,
  };
}

export const expectedGroup = slot => slot <= 3 ? 'claude' : slot <= 6 ? 'codex' : 'open-source';
export const categoryFor = (setup, target) =>
  setup.categories.find(c => c.prefix === target || c.category === target || new RegExp(`^${c.prefix}-(07|08|09|10)$`).test(target));
export const slotOf = id => Number(String(id).split('-').pop());
export const isOurSlot = id => SLOT_RE.test(String(id));

/** Static integrity of this pipeline against the shared protocols and central register. */
export function validateSetup(setup) {
  const {root, pipeline, config, categories, queue} = setup;
  const errors = validateSchema(config, readJSON(path.join(pipeline, 'schemas/config.schema.json')));
  const required = ['university', 'healthcare', 'company', 'e-commerce', 'news', 'government', 'fashion', 'weather', 'nonprofit', 'church', 'portfolio', 'restaurant'];
  if (JSON.stringify([...categories.map(c => c.category)].sort()) !== JSON.stringify([...required].sort()))
    errors.push('Exactly the twelve active study categories are required');
  const assignments = readCSV(inside(root, config.paths.assignments));
  const allIDs = new Set();
  for (const c of categories) {
    if (!/^[A-Z]+$/.test(c.prefix)) errors.push(`${c.category}: invalid category prefix`);
    const strata = c.sampling_strata;
    if (!Array.isArray(strata) || strata.length !== 10) { errors.push(`${c.category}: ten slot strata required`); continue; }
    for (let slot = 1; slot <= 10; slot++) {
      const id = `${c.prefix}-${padSlot(slot)}`;
      const s = strata.filter(x => x.slot === slot);
      if (s.length !== 1 || s[0].source_id !== id || s[0].model_group !== expectedGroup(slot) || !s[0].stratum?.trim())
        errors.push(`${id}: invalid stratum entry`);
      const rows = assignments.filter(r => r.category === c.category && Number(r.slot) === slot);
      if (rows.length !== 1 || rows[0].source_id !== id || rows[0].model_group !== expectedGroup(slot) ||
          rows[0].relative_path !== `${c.category}/${expectedGroup(slot)}/${id}`)
        errors.push(`${id}: invalid central assignment row`);
      if (allIDs.has(id)) errors.push(`Duplicate source ID ${id}`);
      allIDs.add(id);
    }
    if (!c.representative_pages?.length || !c.conditional_interactions?.length || !c.simulation_notes)
      errors.push(`${c.category}: missing category requirements`);
    const inventory = readCSV(inside(root, `${config.paths.inventories}/${c.category}.csv`));
    if (inventory.length !== 10 || new Set(inventory.map(x => Number(x.slot))).size !== 10)
      errors.push(`${c.category}: inventory must have ten unique slots`);
    for (const r of inventory) {
      const n = Number(r.slot);
      if (r.category !== c.category || !Number.isInteger(n) || n < 1 || n > 10 ||
          r.source_id !== `${c.prefix}-${padSlot(n)}` || r.model_group !== expectedGroup(n))
        errors.push(`${c.category}: invalid inventory slot row ${r.source_id || '(blank)'}`);
    }
  }
  const expected = categories.flatMap(c => [`research-${c.prefix}`, ...SLOTS.map(n => `build-${c.prefix}-${padSlot(n)}`)]);
  if (queue.tasks.length !== 60 || new Set(queue.tasks.map(t => t.id)).size !== 60 || expected.some(id => !queue.tasks.some(t => t.id === id)))
    errors.push('Queue must contain exactly twelve research tasks and forty-eight open-source build tasks');
  for (const t of queue.tasks) {
    const c = categoryFor(setup, t.target);
    if (!c || t.category !== c.category || !['research', 'build'].includes(t.phase) || t.id !== `${t.phase}-${t.target}` ||
        !['planned', 'prepared', 'running', 'completed', 'blocked'].includes(t.status))
      errors.push(`Invalid task ${t.id}`);
    const deps = t.phase === 'research' ? [] : [`research-${c?.prefix}`];
    if (JSON.stringify(t.depends_on) !== JSON.stringify(deps)) errors.push(`Invalid dependencies on ${t.id}`);
  }
  for (const file of Object.values(config.paths)) inside(root, file);
  for (const file of [config.paths.rules, config.paths.allocation, config.paths.qc, config.paths.change_log])
    if (!fs.existsSync(inside(root, file))) errors.push(`Missing shared file ${file}`);
  return errors;
}

/** The declared slot -> open-weight model mapping. Keys live in the environment, never here. */
/**
 * Check the declared slot-to-model mapping.
 * `needSlots` limits the check to the slots a command actually uses, so research with one
 * key does not require all four; `requireKeys` additionally demands their environment
 * variables. MODEL_ALLOCATION.md section 2 still requires all four declared before generation,
 * which `validate.mjs --models` enforces.
 */
export function validateModels(setup, {requireKeys = false, needSlots = SLOTS} = {}) {
  const errors = [];
  if (!setup.models) return [`Missing ${setup.config.models_file}: declare the slot-to-model mapping first (scripts/declare-models.mjs)`];
  errors.push(...validateSchema(setup.models, readJSON(path.join(setup.pipeline, 'schemas/models.schema.json'))));
  if (errors.length) return errors;
  const seen = new Map();
  for (const slot of needSlots) {
    const m = setup.models.slots?.[String(slot)];
    if (!m) { errors.push(`slot ${padSlot(slot)}: not declared yet (scripts/declare-models.mjs --slot ${slot} ...)`); continue; }
    if (/REPLACE/i.test(JSON.stringify(m))) errors.push(`slot ${slot}: placeholder values from models.example.json were not replaced`);
    if (setup.config.approval.require_open_weight_confirmation && m.open_weights !== true)
      errors.push(`slot ${slot}: open-weight eligibility is not confirmed`);
    if (/^https?:\/\//.test(m.base_url) === false) errors.push(`slot ${slot}: base_url must be an http(s) endpoint`);
    if (/key|secret|token/i.test(m.api_key_env) === false)
      errors.push(`slot ${slot}: api_key_env should name an environment variable, e.g. OS_SLOT_${padSlot(slot)}_API_KEY`);
    if (m.api_key_env.length > 80 || /\s/.test(m.api_key_env)) errors.push(`slot ${slot}: api_key_env is not a plausible variable name`);
    if (/^(sk-|hf_|gsk_|tgp_)/.test(m.api_key_env)) errors.push(`slot ${slot}: api_key_env looks like a key itself; store only the variable NAME`);
    if (requireKeys && !process.env[m.api_key_env]) errors.push(`slot ${slot}: environment variable ${m.api_key_env} is not set`);
    seen.set(slot, `${m.provider}|${m.model_id}|${m.model_version ?? ''}`);
  }
  const declared = SLOTS.filter(s2 => setup.models.slots?.[String(s2)]);
  if (declared.length === SLOTS.length) {
    const all = new Set(SLOTS.map(s2 => {
      const m = setup.models.slots[String(s2)];
      return `${m.provider}|${m.model_id}|${m.model_version ?? ''}`;
    }));
    if (all.size !== SLOTS.length)
      errors.push(`Note: slots do not all use distinct models (${all.size} distinct of ${SLOTS.length}); MODEL_ALLOCATION.md section 2 permits one or several models but the mapping must be declared, not assumed`);
  } else if (seen.size) {
    errors.push(`Note: only slots ${declared.map(padSlot).join(', ')} are declared. That is enough to research or build those slots; all four must be declared before this arm is complete.`);
  }
  return errors;
}

export const modelForSlot = (setup, slot) => setup.models?.slots?.[String(slot)] ?? null;
export const modelRecord = m => m && ({
  model_id: m.model_id, model_version: m.model_version ?? null,
  model_provider_or_runtime: `${m.provider} (OpenAI-compatible chat completions at ${m.base_url})`,
  weights_url: m.weights_url, license: m.license, open_weights: m.open_weights,
  eligibility_note: m.eligibility_note, params: m.params,
});

const normalizeUrl = u => {
  try {
    const url = new URL((u || '').trim());
    if (!['http:', 'https:'].includes(url.protocol)) return null;
    url.hostname = url.hostname.replace(/^www\./i, ''); url.hash = ''; url.search = ''; url.protocol = 'https:';
    return url.href.replace(/\/$/, '');
  } catch { return null; }
};
export {normalizeUrl};

function jsonField(row, field) {
  let value;
  try { value = JSON.parse(row[field]); } catch { throw new Error(`${row.source_id}: ${field} must be a JSON array`); }
  if (!Array.isArray(value) || !value.length) throw new Error(`${row.source_id}: empty ${field}`);
  return value;
}

/**
 * Build prerequisites, scoped to this model group's four rows of the category
 * (MODEL_ALLOCATION.md section 4: approval is granted per model group over its own slots).
 */
export function buildReadiness(setup, id, {requireKeys = true} = {}) {
  const errors = [];
  const c = categoryFor(setup, id);
  if (!c || !new RegExp(`^${c?.prefix}-(07|08|09|10)$`).test(id)) return ['Build target must be an allocated open-source ID (07-10)'];
  const inventory = readCSV(inside(setup.root, `${setup.config.paths.inventories}/${c.category}.csv`));
  const register = readCSV(inside(setup.root, setup.config.paths.assignments));
  const reserved = new Map();
  for (const row of inventory) {
    const n = normalizeUrl(row.source_url);
    if (n) reserved.set(n, [...(reserved.get(n) || []), row.source_id]);
  }
  const ourRows = inventory.filter(r => r.model_group === 'open-source');
  if (ourRows.length !== 4) errors.push(`${c.category}: expected four open-source inventory rows, found ${ourRows.length}`);
  for (const row of ourRows) {
    try {
      for (const key of ['source_name','source_url','model_id','subcategory','verified_at','verification_method','verification_result','evidence_reference','complexity','stack_clues','limitations','approved_at','approved_by','approval_reference'])
        if (!row[key]?.trim()) throw new Error(`${row.source_id}: missing ${key}`);
      const normalized = normalizeUrl(row.source_url);
      if (!normalized) throw new Error(`${row.source_id}: invalid source URL`);
      const holders = (reserved.get(normalized) || []).filter(i => i !== row.source_id);
      if (holders.length) throw new Error(`${row.source_id}: duplicate reference URL, also held by ${holders.join(', ')}`);
      if (row.verification_result !== 'verified') throw new Error(`${row.source_id}: source is not verified`);
      if (!['low','medium','high'].includes(row.complexity)) throw new Error(`${row.source_id}: complexity must be low, medium or high`);
      for (const key of ['verified_at','approved_at'])
        if (!/^\d{4}-\d{2}-\d{2}(T.*)?$/.test(row[key]) || Number.isNaN(Date.parse(row[key]))) throw new Error(`${row.source_id}: invalid ${key}`);
      const pages = jsonField(row, 'source_pages'); const names = new Set();
      for (const page of pages) {
        if (!page.title || !/^https?:\/\//.test(page.url) || !/^[a-z0-9][a-z0-9-]*\.html$/.test(page.local_file) || names.has(page.local_file))
          throw new Error(`${row.source_id}: invalid or duplicate page mapping`);
        names.add(page.local_file);
      }
      if (!names.has('index.html')) throw new Error(`${row.source_id}: page map requires index.html`);
      if (names.size < setup.config.research.min_pages_per_source)
        throw new Error(`${row.source_id}: page map has ${names.size} pages, below the configured minimum`);
      jsonField(row, 'key_regions');
      for (const item of jsonField(row, 'key_interactions'))
        if (!item.name || !['observed','inferred'].includes(item.evidence))
          throw new Error(`${row.source_id}: interactions need a name and observed/inferred evidence`);
      const parts = row.evidence_reference.split(';').map(x => x.trim()).filter(Boolean);
      if (!parts.length) throw new Error(`${row.source_id}: missing evidence_reference`);
      for (const part of parts) {
        if (/^https?:\/\//.test(part)) continue;
        const file = part.split('#')[0].trim();
        if (!file || !fs.existsSync(inside(setup.root, file))) throw new Error(`${row.source_id}: missing evidence file ${file || part}`);
      }
      const match = register.find(r => r.category === c.category && r.source_id === row.source_id);
      if (!match || match.source_url !== row.source_url || match.model_id !== row.model_id ||
          (match.model_version || '') !== (row.model_version || '') || match.approved_at !== row.approved_at)
        throw new Error(`${row.source_id}: approval, source or model not synchronized with the assignment register`);
    } catch (e) { errors.push(e.message); }
  }
  errors.push(...validateModels(setup, {requireKeys, needSlots: [slotOf(id)]}).filter(e => !e.startsWith('Note:')));
  const declared = modelForSlot(setup, slotOf(id));
  const selected = inventory.find(r => r.source_id === id);
  if (declared && selected?.model_id && declared.model_id !== selected.model_id)
    errors.push(`${id}: declared model differs from the approved assignment (${declared.model_id} vs ${selected.model_id})`);
  if (declared && (declared.model_version || '') !== (selected?.model_version || ''))
    errors.push(`${id}: declared model version differs from the approved assignment`);
  const running = setup.queue.tasks.filter(t => t.phase === 'build' && t.status === 'running');
  if (running.length >= setup.config.execution.max_concurrent_builds)
    errors.push(`Build concurrency limit reached in the queue (${running.length}); reconcile the active run first`);
  return errors;
}

export function cliArgs(argv, allowed) {
  const positional = [], flags = {};
  for (let i = 0; i < argv.length; i++) {
    const item = argv[i];
    if (!item.startsWith('--')) { positional.push(item); continue; }
    const key = item.slice(2);
    if (!(key in allowed) || key in flags) throw new Error(`Unknown or repeated option ${item}`);
    if (allowed[key] === 'boolean') flags[key] = true;
    else {
      if (!argv[i + 1] || argv[i + 1].startsWith('--')) throw new Error(`Missing value for ${item}`);
      flags[key] = argv[++i];
    }
  }
  return {positional, flags};
}

/** Remove anything that looks like a credential before writing evidence to disk. */
export function redact(text) {
  let out = String(text ?? '');
  for (const [name, value] of Object.entries(process.env))
    if (value && value.length >= 12 && /key|secret|token|password/i.test(name))
      out = out.split(value).join(`[redacted:${name}]`);
  return out.replace(/\b(sk-[A-Za-z0-9_-]{12,}|hf_[A-Za-z0-9]{12,}|gsk_[A-Za-z0-9]{12,}|tgp_v1_[A-Za-z0-9_-]{12,})\b/g, '[redacted-key]')
            .replace(/(Bearer\s+)[A-Za-z0-9._~+/=-]{12,}/gi, '$1[redacted-key]');
}

export function queueUpdate(setup, taskId, patch) {
  const file = path.join(setup.pipeline, 'queue/manifest.json');
  const manifest = readJSON(file);
  const task = manifest.tasks.find(t => t.id === taskId);
  if (!task) throw new Error(`Unknown queue task ${taskId}`);
  Object.assign(task, patch);
  writeJSON(file, manifest);
  return task;
}

/**
 * Pull a JSON value out of a model reply. Fenced ```json blocks win (last first);
 * otherwise the longest balanced {...} or [...] span that parses is used, so a nested
 * object is never mistaken for the whole payload.
 */
export function extractJSON(text) {
  const source = String(text ?? '');
  const fenced = [...source.matchAll(/```(?:json|JSON)?\s*\n([\s\S]*?)```/g)].map(m => m[1]).reverse();
  const spans = [];
  for (let i = 0; i < source.length; i++) {
    if (source[i] !== '{' && source[i] !== '[') continue;
    let depth = 0, inString = false, escaped = false;
    for (let j = i; j < source.length; j++) {
      const ch = source[j];
      if (inString) {
        if (escaped) escaped = false;
        else if (ch === '\\') escaped = true;
        else if (ch === '"') inString = false;
        continue;
      }
      if (ch === '"') inString = true;
      else if (ch === '{' || ch === '[') depth++;
      else if (ch === '}' || ch === ']') {
        depth--;
        if (depth === 0) { spans.push(source.slice(i, j + 1)); break; }
        if (depth < 0) break;
      }
    }
  }
  spans.sort((a, b) => b.length - a.length);
  for (const candidate of [...fenced, ...spans]) {
    try { return JSON.parse(candidate); } catch { /* try the next one */ }
  }
  return null;
}

/**
 * Split a CSV into its physical records, keeping each one's exact original text
 * (a quoted field may span newlines). Used to rewrite only this group's rows and
 * leave every other group's bytes untouched.
 */
export function splitCSVRecords(text) {
  const bom = text.startsWith('﻿') ? '﻿' : '';
  const body = bom ? text.slice(1) : text;
  const records = [];
  let start = 0, quoted = false;
  for (let i = 0; i < body.length; i++) {
    const ch = body[i];
    if (quoted) {
      if (ch === '"') { if (body[i + 1] === '"') i++; else quoted = false; }
      continue;
    }
    if (ch === '"') { quoted = true; continue; }
    if (ch === '\n' || ch === '\r') {
      const eol = ch === '\r' && body[i + 1] === '\n' ? '\r\n' : ch;
      records.push({text: body.slice(start, i), eol});
      if (eol.length === 2) i++;
      start = i + 1;
    }
  }
  if (start < body.length) records.push({text: body.slice(start), eol: ''});
  return {bom, records};
}

/** Rewrite only the records `match` selects; every other record keeps its original bytes. */
export function editCSVRecords(text, {match, update}) {
  const {bom, records} = splitCSVRecords(text);
  if (!records.length) throw new Error('Empty CSV');
  const headerFields = records[0].text.split(',').map(h => h.replace(/^"|"$/g, ''));
  let changed = 0;
  const out = records.map((record, index) => {
    if (index === 0 || !record.text.trim()) return record;
    const values = parseCSV(records[0].text + '\n' + record.text + '\n')[0];
    if (!match(values)) return record;
    const next = update({...values});
    if (!next) return record;
    changed++;
    return {...record, text: headerFields.map(h => csvCell(next[h] ?? '')).join(',')};
  });
  return {text: bom + out.map(r => r.text + r.eol).join(''), changed, headers: headerFields};
}
