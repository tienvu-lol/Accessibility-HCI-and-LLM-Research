const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { buildHarness, HEADER } = require('../../human/build_harness.js');

const CONDS = ['wcag', 'both', 'rubric', 'plain'];
const SITES = ['S-01', 'S-02', 'S-03', 'S-04', 'S-05', 'S-06'];

function fixture() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'harness-'));
  const items = ['site_id,category,arm,form_page,seed'];
  const key = ['site_id,arm,label_shown,condition'];
  for (const s of SITES) {
    items.push(`${s},x,A1,form.html,7`);
    CONDS.forEach((c, i) => key.push(`${s},A1,${'ABCD'[(i + s.length) % 4]},${c}`));
  }
  fs.writeFileSync(path.join(dir, 'items.csv'), items.join('\n') + '\n');
  fs.writeFileSync(path.join(dir, 'key.csv'), key.join('\n') + '\n');
  return dir;
}

test('harness is blinded, randomized per rater, recorded, exports schema, autosaves', () => {
  const dir = fixture();
  const out = path.join(dir, 'out');
  const opts = { itemsCsv: path.join(dir, 'items.csv'), keyCsv: path.join(dir, 'key.csv'), outDir: out };
  const plans = buildHarness(opts);
  const html = {};
  for (const r of ['R1', 'R2', 'R3']) {
    html[r] = fs.readFileSync(path.join(out, `rater_${r}.html`), 'utf8');
    assert.doesNotMatch(html[r], /wcag|both/i);
    assert.ok(html[r].includes(JSON.stringify(HEADER.join(',')).slice(1, -1)) || html[r].includes(JSON.stringify(HEADER)));
    assert.match(html[r], /localStorage\.setItem/);
    assert.match(html[r], /<iframe/);
  }
  assert.strictEqual(HEADER.join(','), 'site_id,arm,question,rater_id,verdict,note,shown_left,shown_right,ts');
  const sig = (r) => plans[r].map((p) => `${p.site_id}:${p.shown_left}`).join();
  assert.notStrictEqual(sig('R1'), sig('R2'));
  assert.notStrictEqual(plans.R1.map((p) => p.site_id).join(), plans.R2.map((p) => p.site_id).join());
  const recorded = JSON.parse(fs.readFileSync(path.join(out, 'randomization.json'), 'utf8'));
  assert.deepStrictEqual(recorded, plans);
  // deterministic from seed
  assert.deepStrictEqual(buildHarness({ ...opts, outDir: path.join(dir, 'out2') }), plans);
  fs.rmSync(dir, { recursive: true, force: true });
});
