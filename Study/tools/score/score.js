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
  return o;
}

async function scorePage(page, probes) {
  return { axe: await probes.axe(page), tab: await probes.tab(page), ax: await probes.ax(page) };
}

function buildRow(meta, pageName, breakpoint, r, status = 'ok') {
  const { axe = {}, tab = {}, ax = {} } = r || {};
  const v = axe.violations || 0, p = axe.passes || 0;
  const nameChars = ax.nameChars || 0, nodes = ax.interactiveNodes || 0;
  return {
    site_id: meta.site, category: '', generator_group: '', arm: meta.arm, condition: meta.condition,
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

const csvCell = (x) => (/[",\n]/.test(String(x)) ? `"${String(x).replace(/"/g, '""')}"` : String(x));

function appendRows(file, rows) {
  const fresh = !fs.existsSync(file) || fs.statSync(file).size === 0;
  let text = fresh ? HEADER.join(',') + '\n' : '';
  for (const r of rows) text += HEADER.map((h) => csvCell(r[h])).join(',') + '\n';
  fs.mkdirSync(path.dirname(path.resolve(file)), { recursive: true });
  fs.appendFileSync(file, text);
}

// loadPage(pageName, breakpoint) -> page ready to probe.
async function scoreFiles(meta, loadPage, probes) {
  const rows = [];
  for (const name of meta.files) {
    for (const bp of BREAKPOINTS) {
      try {
        rows.push(buildRow(meta, name, bp, await scorePage(await loadPage(name, bp), probes)));
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
  const browser = await require('playwright').chromium.launch();
  try {
    const page = await browser.newPage();
    const loadPage = async (name, bp) => {
      await page.setViewportSize({ width: bp, height: 900 });
      await page.goto(pathToFileURL(path.resolve(meta.variant, name)).href);
      return page;
    };
    const probes = { axe: require('./axe_probe').run, tab: require('./tab_probe').run, ax: require('./ax_tree').run };
    appendRows(meta.out, await scoreFiles(meta, loadPage, probes));
  } finally {
    await browser.close();
  }
  return 0;
}

module.exports = { HEADER, BREAKPOINTS, parseArgs, scorePage, buildRow, appendRows, scoreFiles, main };

if (require.main === module) {
  main(process.argv.slice(2)).then((c) => process.exit(c), (e) => { console.error(e.message); process.exit(1); });
}
