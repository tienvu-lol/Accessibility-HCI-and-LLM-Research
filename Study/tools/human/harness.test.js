const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const { buildHarness, HEADER, cleanPath } = require('../../human/build_harness.js');

const REPO = path.resolve(__dirname, '../../..');
const CONDS = ['naive', 'wcag', 'nielsen', 'both'];
const SITES = ['S-01', 'S-02', 'S-03'];
const NAMES = /wcag|both|nielsen|naive/i;

function py(script, args) {
  const r = spawnSync('python', [path.join(REPO, 'Study/human', script), ...args], { encoding: 'utf8' });
  assert.strictEqual(r.status, 0, r.stderr);
  return r;
}

// runs tree + sites/items csvs; page names deliberately contain a condition name.
function fixture() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'harness-'));
  const sites = ['category,site_id,generator_group,slot,index_bytes,form_page,form_controls,low_form_density,relative_path,stylesheet,slice_files'];
  const items = ['item_id,category,site_id,generator_group,arm,form_page,form_controls,seed'];
  for (const s of SITES) {
    sites.push(`x,${s},g,1,1,wcag-form.html,3,0,x/g/${s},css/s.css,index.html;wcag-form.html`);
    items.push(`${s}-A1,x,${s},g,A1,wcag-form.html,3,7`);
    for (const c of CONDS) {
      const d = path.join(dir, 'runs', 'A1', c, s, 'iter1');
      fs.mkdirSync(d, { recursive: true });
      fs.writeFileSync(path.join(d, 'index.html'), `<html><body>index ${c}</body></html>`);
      fs.writeFileSync(path.join(d, 'wcag-form.html'), `<html><body><label>Name <input id="q"></label></body></html>`);
    }
  }
  fs.writeFileSync(path.join(dir, 'sites.csv'), sites.join('\n') + '\n');
  fs.writeFileSync(path.join(dir, 'items.csv'), items.join('\n') + '\n');
  const variants = path.join(dir, 'runs', 'variants');
  const key = path.join(dir, 'blinding_key.csv');
  py('materialize_variants.py', ['--runs', path.join(dir, 'runs'), '--key', key, '--items', path.join(dir, 'items.csv'),
    '--sites', path.join(dir, 'sites.csv'), '--out', variants]);
  const out = path.join(dir, 'site', 'harness');
  const opts = { itemsCsv: path.join(dir, 'items.csv'), keyCsv: key, outDir: out, variantsDir: variants };
  return { dir, out, opts, key };
}

test('harness HTML is blinded (incl. decoded base64), randomized, sidecar outside html dir', () => {
  const { dir, out, opts } = fixture();
  const plans = buildHarness(opts);
  for (const r of ['R1', 'R2', 'R3']) {
    const html = fs.readFileSync(path.join(out, `rater_${r}.html`), 'utf8');
    assert.doesNotMatch(html, NAMES);
    for (const blob of html.match(/[A-Za-z0-9+/]{16,}={0,2}/g) || []) {
      assert.doesNotMatch(Buffer.from(blob, 'base64').toString('latin1'), NAMES);
    }
    assert.match(html, /localStorage\.setItem/);
    assert.match(html, /harness_' *\+ *RATER *\+ *'_[0-9a-f]{8}'/);
    assert.match(html, /<iframe/);
  }
  assert.strictEqual(HEADER.join(','), 'site_id,arm,question,rater_id,verdict,note,shown_left,shown_right,ts');
  assert.ok(!fs.existsSync(path.join(out, 'randomization.json')));
  const recorded = JSON.parse(fs.readFileSync(path.join(dir, 'site', 'randomization.json'), 'utf8'));
  assert.deepStrictEqual(recorded, plans);
  assert.notStrictEqual(plans.R1.map((p) => p.site_id).join(), plans.R2.map((p) => p.site_id).join());
  assert.deepStrictEqual(buildHarness({ ...opts, outDir: path.join(dir, 'site2', 'harness') }), plans);
  assert.strictEqual(cleanPath('css/wcag-both.css'), 'css/f.css');
  fs.writeFileSync(opts.itemsCsv, fs.readFileSync(opts.itemsCsv, 'utf8').replace(/,7\n/, ',8\n'));
  assert.throws(() => buildHarness(opts), /one seed/);
  fs.rmSync(dir, { recursive: true, force: true });
});

test('every iframe src points at a materialized variant page', () => {
  const { dir, out, opts } = fixture();
  const plans = buildHarness(opts);
  let n = 0;
  for (const r of Object.values(plans)) {
    for (const p of r) {
      for (const base of [p.left_src, p.right_src]) {
        for (const pg of p.pages) {
          assert.ok(fs.existsSync(path.resolve(out, base + pg)), base + pg);
          n++;
        }
      }
    }
  }
  assert.strictEqual(n, 3 * SITES.length * 4);
  fs.rmSync(dir, { recursive: true, force: true });
});

test('browser: answers autosave, survive reload, export raw CSV that merge un-blinds', async (t) => {
  let browser;
  try {
    browser = await require('playwright').chromium.launch();
  } catch (e) {
    return t.skip(`chromium not available: ${e.message.split('\n')[0]}`);
  }
  const { dir, out, opts, key } = fixture();
  try {
    const plans = buildHarness(opts);
    const page = await browser.newPage();
    const url = require('url').pathToFileURL(path.join(out, 'rater_R1.html')).href;
    await page.goto(url);
    await page.fill('#n2', 'typed first');
    await page.fill('#n1', '=SUM(1,2) "x"');
    await page.click('input[name=q1][value=A]');
    await page.click('input[name=q3][value=Tie]');
    await page.reload();
    assert.ok(await page.isChecked('input[name=q1][value=A]'));
    assert.strictEqual(await page.inputValue('#n2'), 'typed first');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.click('#export')]);
    const lines = fs.readFileSync(await dl.path(), 'utf8').trim().split('\n');
    assert.strictEqual(lines[0], HEADER.join(','));
    assert.strictEqual(lines.length, 3); // Q1, Q3; Q2 has a note but no verdict
    const first = plans.R1[0];
    assert.ok(lines[1].startsWith(`${first.site_id},${first.arm},Q1,R1,A,"'=SUM(1,2) ""x""",${first.left_label},,`), lines[1]);
    assert.match(lines[2], new RegExp(`^${first.site_id},${first.arm},Q3,R1,tie,,${first.left_label},,`));
    const exp = path.join(dir, 'exp.csv'), merged = path.join(dir, 'merged.csv');
    fs.copyFileSync(await dl.path(), exp);
    py('merge_ratings.py', ['--key', key, '--sidecar', path.join(dir, 'site', 'randomization.json'), '--out', merged, exp]);
    const m = fs.readFileSync(merged, 'utf8').trim().split('\n');
    assert.ok(m[1].includes(`,R1,${first.shown_left},`) && m[1].includes(`,${first.shown_left},${first.shown_right},`), m[1]);
    assert.ok(m[2].includes(',R1,tie,'));
  } finally {
    await browser.close();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
