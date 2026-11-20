'use strict';
// Scorer driver (design/CONTRACTS.md C6): file:// pages x {1280,375} -> appended metrics.csv rows.
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const HEADER = ['site_id', 'category', 'generator_group', 'arm', 'condition', 'iteration', 'page', 'breakpoint',
  'axe_violations', 'axe_passes', 'axe_incomplete', 'violation_rate',
  'ax_name_chars', 'ax_interactive_nodes', 'name_chars_per_interactive',
  'tab_order_mismatches', 'keyboard_traps', 'unreachable_interactives', 'focus_visible_fails',
  'heading_skips', 'text_chars', 'element_count', 'status'];
const BREAKPOINTS = [1280, 375];

const SITES_CSV = path.join(__dirname, '..', '..', 'sample', 'sites.csv');

function parseCsv(text) {
  const rows = [];
  let row = [], cell = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') q = false;
      else cell += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(cell); cell = ''; rows.push(row); row = [];
    } else cell += c;
  }
  if (cell !== '' || row.length) { row.push(cell); rows.push(row); }
  return rows.filter((r) => r.some((x) => x !== ''));
}

// Unknown site -> empty category/group (the lookup is only a default; --category/--generator-group override).
function lookupSite(siteId) {
  if (!fs.existsSync(SITES_CSV)) return {};
  const [head, ...body] = parseCsv(fs.readFileSync(SITES_CSV, 'utf8'));
  const row = body.find((r) => r[head.indexOf('site_id')] === siteId);
  return row ? Object.fromEntries(head.map((h, i) => [h, row[i]])) : {};
}

function parseArgs(argv) {
  const o = {};
  for (let i = 0; i < argv.length; i += 2) {
    if (!argv[i].startsWith('--') || argv[i + 1] === undefined) throw new Error(`bad argument: ${argv[i]}`);
    o[argv[i].slice(2)] = argv[i + 1];
  }
  for (const k of ['variant', 'files', 'site', 'arm', 'condition', 'iteration', 'out']) {
    if (o[k] === undefined) throw new Error(`missing --${k}`);
  }
  o.files = o.files.split(';').filter(Boolean);
  if (o.category === undefined || o['generator-group'] === undefined) {
    const site = lookupSite(o.site);
    if (o.category === undefined) o.category = site.category;
    if (o['generator-group'] === undefined) o['generator-group'] = site.generator_group;
  }
  return o;
}

async function scorePage(page, probes) {
  // tab_probe presses Enter on skip links (mutates location.hash), so it runs after the others.
  const axe = await probes.axe(page);
  const ax = await probes.ax(page);
  return { axe, ax, tab: await probes.tab(page) };
}

function buildRow(meta, pageName, breakpoint, r, status = 'ok') {
  const { axe = {}, tab = {}, ax = {} } = r || {};
  const v = axe.violations || 0, p = axe.passes || 0;
  const nameChars = ax.nameChars || 0, nodes = ax.interactiveNodes || 0;
  return {
    site_id: meta.site, category: meta.category || '', generator_group: meta.generatorGroup || '', arm: meta.arm, condition: meta.condition,
    iteration: meta.iteration, page: pageName, breakpoint,
    axe_violations: v, axe_passes: p, axe_incomplete: axe.incomplete || 0,
    violation_rate: v + p ? v / (v + p) : 0,
    ax_name_chars: nameChars, ax_interactive_nodes: nodes,
    name_chars_per_interactive: nodes ? nameChars / nodes : 0,
    tab_order_mismatches: tab.tabOrderMismatches || 0, keyboard_traps: tab.keyboardTraps || 0,
    unreachable_interactives: tab.unreachableInteractives || 0, focus_visible_fails: tab.focusVisibleFails || 0,
    heading_skips: ax.headingSkips || 0, text_chars: axe.textChars || 0, element_count: axe.elementCount || 0,
    status,
  };
}

const csvCell = (x) => (/[",\r\n]/.test(String(x)) ? `"${String(x).replace(/"/g, '""')}"` : String(x));

const KEY_FIELDS = ['site_id', 'arm', 'condition', 'iteration', 'page', 'breakpoint'];
const keyOf = (r) => JSON.stringify(KEY_FIELDS.map((k) => String(r[k])));

// Rows with the same (site,arm,condition,iteration,page,breakpoint) key replace the earlier ones.
function appendRows(file, rows) {
  let kept = [];
  if (fs.existsSync(file) && fs.statSync(file).size > 0) {
    const [head, ...body] = parseCsv(fs.readFileSync(file, 'utf8'));
    kept = body.map((r) => Object.fromEntries(head.map((h, i) => [h, r[i]])));
  }
  const fresh = new Set(rows.map(keyOf));
  const all = kept.filter((r) => !fresh.has(keyOf(r))).concat(rows);
  fs.mkdirSync(path.dirname(path.resolve(file)), { recursive: true });
  fs.writeFileSync(file, [HEADER.join(',')].concat(all.map((r) => HEADER.map((h) => csvCell(r[h])).join(','))).join('\n') + '\n');
}

// Same replace-on-key behaviour for the per-page axe rule lines.
function appendRules(file, lines) {
  const fresh = new Set(lines.map(keyOf));
  const old = fs.existsSync(file) ? fs.readFileSync(file, 'utf8').split('\n').filter(Boolean) : [];
  const kept = old.filter((l) => !fresh.has(keyOf(JSON.parse(l))));
  fs.mkdirSync(path.dirname(path.resolve(file)), { recursive: true });
  fs.writeFileSync(file, kept.concat(lines.map((l) => JSON.stringify(l))).join('\n') + '\n');
}

// loadPage(pageName, breakpoint) -> page ready to probe.
async function scoreFiles(meta, loadPage, probes, ruleLines = []) {
  const rows = [];
  for (const name of meta.files) {
    for (const bp of BREAKPOINTS) {
      try {
        const r = await scorePage(await loadPage(name, bp), probes);
        rows.push(buildRow(meta, name, bp, r));
        ruleLines.push({ site_id: meta.site, arm: meta.arm, condition: meta.condition, iteration: meta.iteration,
          page: name, breakpoint: bp, rules: (r.axe && r.axe.rules) || [] });
      } catch (e) {
        console.error(`score error ${name}@${bp}: ${e.message}`);
        rows.push(buildRow(meta, name, bp, null, 'error'));
      }
    }
  }
  return rows;
}

async function main(argv) {
  const meta = parseArgs(argv);
  meta.generatorGroup = meta['generator-group'];
  const browser = await require('playwright').chromium.launch();
  try {
    const page = await browser.newPage();
    const loadPage = async (name, bp) => {
      await page.setViewportSize({ width: bp, height: 900 });
      await page.goto(pathToFileURL(path.resolve(meta.variant, name)).href);
      return page;
    };
    const probes = { axe: require('./axe_probe').run, tab: require('./tab_probe').run, ax: require('./ax_tree').run };
    const ruleLines = [];
    const rows = await scoreFiles(meta, loadPage, probes, ruleLines);
    appendRows(meta.out, rows);
    if (meta['rules-out']) appendRules(meta['rules-out'], ruleLines);
    // Violations never gate, but a run where every row errored is a failure.
    if (rows.every((r) => r.status === 'error')) {
      console.error('score: every row errored');
      return 2;
    }
  } finally {
    await browser.close();
  }
  return 0;
}

module.exports = { HEADER, BREAKPOINTS, parseCsv, parseArgs, scorePage, buildRow, appendRows, appendRules, scoreFiles, main };

if (require.main === module) {
  main(process.argv.slice(2)).then((c) => process.exit(c), (e) => { console.error(e.message); process.exit(1); });
}
