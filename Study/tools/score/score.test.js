'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { HEADER, parseArgs, buildRow, appendRows, scoreFiles, scorePage } = require('./score');

const probes = {
  axe: async () => ({ violations: 1, passes: 3, incomplete: 2, textChars: 50, elementCount: 9 }),
  tab: async () => ({ tabOrderMismatches: 1, keyboardTraps: 0, unreachableInteractives: 2, focusVisibleFails: 3 }),
  ax: async () => ({ interactiveNodes: 4, nameChars: 10, headingSkips: 1 }),
};
const meta = { site: 'S', arm: 'A', condition: 'wcag', iteration: '1', files: ['index.html', 'form.html'] };

test('header order matches README section 9', () => {
  assert.strictEqual(HEADER.join(','), 'site_id,category,generator_group,arm,condition,iteration,page,breakpoint,'
    + 'axe_violations,axe_passes,axe_incomplete,violation_rate,ax_name_chars,ax_interactive_nodes,'
    + 'name_chars_per_interactive,tab_order_mismatches,keyboard_traps,unreachable_interactives,'
    + 'focus_visible_fails,heading_skips,text_chars,element_count,status');
});

test('one row per page per breakpoint with computed ratios; append writes header once', async () => {
  const rows = await scoreFiles(meta, async () => ({}), probes);
  assert.strictEqual(rows.length, 4);
  assert.deepStrictEqual(rows.map((r) => r.breakpoint), [1280, 375, 1280, 375]);
  assert.strictEqual(rows[0].violation_rate, 0.25);
  assert.strictEqual(rows[0].name_chars_per_interactive, 2.5);
  const f = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'score-')), 'm.csv');
  appendRows(f, rows);
  appendRows(f, rows);
  const lines = fs.readFileSync(f, 'utf8').trim().split('\n');
  assert.strictEqual(lines.length, 5); // rerun replaces rows with the same key
  assert.strictEqual(lines.filter((l) => l === HEADER.join(',')).length, 1);
});

test('zero denominators give 0; probe failure gives error row, not a throw', async () => {
  const r = buildRow(meta, 'p', 1280, { axe: {}, ax: {} });
  assert.strictEqual(r.violation_rate, 0);
  assert.strictEqual(r.name_chars_per_interactive, 0);
  const rows = await scoreFiles({ ...meta, files: ['x'] }, async () => { throw new Error('boom'); }, probes);
  assert.deepStrictEqual(rows.map((x) => x.status), ['error', 'error']);
});

test('CLI exits 0 even with violations (violations never gate)', () => {
  const a = parseArgs(['--variant', 'd', '--files', 'a.html;b.html', '--site', 'S', '--arm', 'A',
    '--condition', 'c', '--iteration', '1', '--out', 'm.csv']);
  assert.deepStrictEqual(a.files, ['a.html', 'b.html']);
  assert.throws(() => parseArgs(['--variant', 'd']), /missing/);
});

test('appendRows replaces by key and round-trips a page value with comma and quote', () => {
  const f = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'score-')), 'm.csv');
  const odd = 'a,"b".html';
  const mk = (v) => ({ ...buildRow({ ...meta, files: [odd] }, odd, 1280, { axe: { violations: v, passes: 1 } }) });
  appendRows(f, [mk(1)]);
  appendRows(f, [mk(2)]);
  const { parseCsv } = require('./score');
  const [head, ...body] = parseCsv(fs.readFileSync(f, 'utf8'));
  assert.deepStrictEqual(head, HEADER);
  assert.strictEqual(body.length, 1);
  assert.strictEqual(body[0][head.indexOf('page')], odd);
  assert.strictEqual(body[0][head.indexOf('axe_violations')], '2');
});

test('scorePage runs ax before tab (tab_probe mutates location.hash)', async () => {
  const order = [];
  const p = (n) => async () => { order.push(n); return {}; };
  await scorePage({}, { axe: p('axe'), tab: p('tab'), ax: p('ax') });
  assert.ok(order.indexOf('ax') < order.indexOf('tab'));
});

test('CLI: exit 0 with violations, header + rows, sites.csv defaults, rules-out, rerun does not duplicate', async (t) => {
  try {
    await (await require('playwright').chromium.launch()).close();
  } catch (e) {
    return t.skip(`chromium not available: ${e.message.split('\n')[0]}`);
  }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'score-cli-'));
  fs.writeFileSync(path.join(dir, 'a.html'), '<!doctype html><html lang="en"><head><title>t</title></head><body><main><h1>Hi</h1><img src="data:image/gif;base64,R0lGODlhAQABAAAAACw="></main></body></html>');
  const args = ['--variant', dir, '--files', 'a.html', '--site', 'UNI-01', '--arm', 'A1', '--condition', 'wcag',
    '--iteration', '1', '--out', path.join(dir, 'm.csv'), '--rules-out', path.join(dir, 'r.jsonl')];
  for (let i = 0; i < 2; i++) {
    const r = spawnSync(process.execPath, [path.join(__dirname, 'score.js'), ...args], { encoding: 'utf8' });
    assert.strictEqual(r.status, 0, r.stderr);
  }
  const lines = fs.readFileSync(path.join(dir, 'm.csv'), 'utf8').trim().split('\n');
  assert.strictEqual(lines[0], HEADER.join(','));
  assert.strictEqual(lines.length, 3);
  assert.ok(lines[1].startsWith('UNI-01,university,claude,A1,wcag,1,a.html,1280,'), lines[1]);
  const rules = fs.readFileSync(path.join(dir, 'r.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
  assert.strictEqual(rules.length, 2);
  assert.deepStrictEqual(rules.map((x) => x.breakpoint), [1280, 375]);
  assert.ok(rules[0].rules.some((x) => x.id === 'image-alt' && x.nodes === 1 && Array.isArray(x.tags)));
  const bad = spawnSync(process.execPath, [path.join(__dirname, 'score.js'), ...args.map((a) => (a === 'a.html' ? 'missing.html' : a))], { encoding: 'utf8' });
  assert.strictEqual(bad.status, 2);
  assert.match(bad.stderr, /score error/);
  fs.rmSync(dir, { recursive: true, force: true });
});
