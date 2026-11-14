// Tests for the open-source pipeline. No provider, no network egress, no real dataset writes:
// every case runs against a temporary fixture tree and a local mock endpoint.
// Passing these tests does not mean any replica exists, any source is approved, or any site passed QC.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  parseCSV, toCSV, editCSVRecords, splitCSVRecords, validateSchema, extractJSON, inside,
  loadSetup, validateSetup, validateModels, buildReadiness, redact, cliArgs, readJSON, writeJSON, slotOf, expectedGroup,
} from '../scripts/lib.mjs';
import {parseResponse, rejectPath, contentProblems, applyFiles, LIMITS} from '../scripts/fileproto.mjs';
import {validationSummary} from '../scripts/qc-runner.mjs';
import {makeFixture, declareFixtureModels, cleanup} from './fixture.mjs';
import {startMockProvider, fileBlock} from './mock-provider.mjs';
import {runBuild, missingDeliverables} from '../scripts/run-build.mjs';
import {reservedUrls} from '../scripts/run-research.mjs';

test('CSV parsing handles quotes, embedded commas and newlines, and rejects malformed input', () => {
  const rows = parseCSV('a,b\n1,"x,y"\n2,"line\nbreak"\n');
  assert.equal(rows.length, 2);
  assert.equal(rows[0].b, 'x,y');
  assert.equal(rows[1].b, 'line\nbreak');
  assert.throws(() => parseCSV('a,b\n"unterminated,1\n'), /Unterminated/);
  assert.throws(() => parseCSV('a,a\n1,2\n'), /Duplicate/);
  assert.throws(() => parseCSV('a,b\n1,2,3\n'), /expected 2/);
});

test('a no-op record edit is byte-identical and a targeted edit changes only its own record', () => {
  const raw = 'id,note\nA,"keeps, quoting"\nB,plain\n';
  const none = editCSVRecords(raw, {match: () => false, update: r => r});
  assert.equal(none.text, raw);
  assert.equal(none.changed, 0);
  const one = editCSVRecords(raw, {match: r => r.id === 'B', update: r => ({...r, note: 'changed'})});
  assert.equal(one.changed, 1);
  assert.match(one.text, /A,"keeps, quoting"/);
  assert.match(one.text, /B,changed/);
  assert.equal(splitCSVRecords(one.text).records.length, 3);
});

test('schema validation enforces const, required, unknown keys and $ref', () => {
  const schema = {
    type: 'object', additionalProperties: false, required: ['kind', 'slot'],
    properties: {kind: {const: 'open-source'}, slot: {$ref: '#/$defs/slot'}},
    $defs: {slot: {type: 'integer', minimum: 7, maximum: 10}},
  };
  assert.deepEqual(validateSchema({kind: 'open-source', slot: 7}, schema), []);
  assert.ok(validateSchema({kind: 'codex', slot: 7}, schema).length);
  assert.ok(validateSchema({kind: 'open-source', slot: 4}, schema).length);
  assert.ok(validateSchema({kind: 'open-source', slot: 7, extra: 1}, schema).some(e => /unknown extra/.test(e)));
  assert.ok(validateSchema({kind: 'open-source'}, schema).some(e => /missing slot/.test(e)));
});

test('JSON extraction finds the object in a fenced or trailing reply and gives up cleanly', () => {
  assert.deepEqual(extractJSON('notes\n```json\n{"a":1}\n```\n'), {a: 1});
  assert.deepEqual(extractJSON('prose {"a":{"b":[1,2]}} tail'), {a: {b: [1, 2]}});
  assert.deepEqual(extractJSON('text with { a brace but no json'), null);
  assert.deepEqual(extractJSON('```json\n{"rows":[{"s":"a {b} c"}]}\n```'), {rows: [{s: 'a {b} c'}]});
});

test('the file protocol parses blocks, strips fences, and reports a cut-off block', () => {
  const parsed = parseResponse([
    'plan text',
    fileBlock('index.html', '```html\n<!doctype html>\n<p>x</p>\n```'),
    fileBlock('css/styles.css', 'body{color:#111}'),
    '=== STATUS: CONTINUE ===',
  ].join('\n'));
  assert.equal(parsed.files.length, 2);
  assert.equal(parsed.files[0].content, '<!doctype html>\n<p>x</p>');
  assert.equal(parsed.status, 'CONTINUE');
  assert.equal(parsed.prose.includes('plan text'), true);
  const cut = parseResponse('=== FILE: a.html ===\n<p>unfinished');
  assert.equal(cut.truncated, true);
  assert.equal(cut.files.length, 0);
});

test('path rules refuse traversal, absolute paths, case, bad directories and prohibited types', () => {
  assert.equal(rejectPath('index.html'), null);
  assert.equal(rejectPath('assets/logo.svg'), null);
  assert.match(rejectPath('../escape.html'), /traversal/);
  assert.match(rejectPath('/etc/passwd'), /absolute/);
  assert.match(rejectPath('css/Styles.css'), /lowercase/);
  assert.match(rejectPath('src/app.tsx'), /prohibited|not allowed|directory/);
  assert.match(rejectPath('package.json'), /prohibited/);
  assert.match(rejectPath('js/jquery-3.7.js'), /prohibited/);
  assert.match(rejectPath('deep/nested/file.html'), /directory/);
  assert.match(rejectPath('notes.pdf'), /extension/);
});

test('content rules catch remote dependencies, CDN use and invalid JSON', () => {
  assert.deepEqual(contentProblems('css/styles.css', 'body{color:#111}'), []);
  assert.ok(contentProblems('index.html', '<script src="https://cdn.jsdelivr.net/x.js"></script>').length);
  assert.ok(contentProblems('css/styles.css', '@import url(https://fonts.googleapis.com/css?x);').length);
  assert.ok(contentProblems('component-inventory.json', '{not json').some(p => /invalid JSON/.test(p)));
  assert.ok(contentProblems('js/main.js', "require('lodash')").length);
  assert.ok(contentProblems('index.html', 'x'.repeat(LIMITS.maxFileBytes + 10)).some(p => /exceeds/.test(p)));
});

test('writes land inside the slot directory and an escaping path never reaches disk', () => {
  const root = fs.mkdtempSync(path.join(fs.realpathSync(process.env.TMPDIR ?? '/tmp'), 'os-apply-'));
  try {
    const site = path.join(root, 'site');
    fs.mkdirSync(site);
    const {results} = applyFiles(site, [
      {path: 'index.html', content: '<p>ok</p>'},
      {path: '../escape.html', content: 'nope'},
      {path: 'app.tsx', content: 'nope'},
    ]);
    assert.equal(results[0].ok, true);
    assert.equal(results[1].ok, false);
    assert.equal(results[2].ok, false);
    assert.ok(fs.existsSync(path.join(site, 'index.html')));
    assert.ok(!fs.existsSync(path.join(root, 'escape.html')));
    assert.throws(() => inside(site, '../escape.html'), /escapes root/);
  } finally { fs.rmSync(root, {recursive: true, force: true}); }
});

test('pipeline configuration validates against the real shared register', () => {
  assert.deepEqual(validateSetup(loadSetup()), []);
});

test('slot drift, a wrong relative path and a short inventory are all rejected', () => {
  const root = makeFixture();
  try {
    const regFile = path.join(root, 'metadata/assignments.csv');
    const broken = editCSVRecords(fs.readFileSync(regFile, 'utf8'), {
      match: r => r.source_id === 'UNI-07',
      update: r => ({...r, model_group: 'codex'}),
    });
    fs.writeFileSync(regFile, broken.text);
    assert.ok(validateSetup(loadSetup(root)).some(e => /UNI-07/.test(e)));
    const fixed = editCSVRecords(fs.readFileSync(regFile, 'utf8'), {
      match: r => r.source_id === 'UNI-07',
      update: r => ({...r, model_group: 'open-source', relative_path: 'university/codex/UNI-07'}),
    });
    fs.writeFileSync(regFile, fixed.text);
    assert.ok(validateSetup(loadSetup(root)).some(e => /UNI-07/.test(e)));
  } finally { cleanup(root); }
});

test('the model declaration is required, must be open-weight, and must name env variables not keys', () => {
  const root = makeFixture();
  try {
    assert.ok(validateModels(loadSetup(root)).some(e => /Missing models.json/.test(e)));
    declareFixtureModels(root, {baseUrl: 'http://127.0.0.1:1/v1', openWeights: false});
    assert.ok(validateModels(loadSetup(root)).some(e => /open_weights|open-weight/.test(e)));
    declareFixtureModels(root, {baseUrl: 'http://127.0.0.1:1/v1'});
    const notes = validateModels(loadSetup(root));
    assert.ok(notes.every(e => e.startsWith('Note:')), `unexpected: ${notes}`);
    assert.ok(notes.some(e => /do not all use distinct models/.test(e)));
    declareFixtureModels(root, {baseUrl: 'http://127.0.0.1:1/v1', keyEnv: 'sk-live-abcdefghijkl'});
    assert.ok(validateModels(loadSetup(root)).some(e => /looks like a key itself|plausible variable/.test(e)));
    declareFixtureModels(root, {baseUrl: 'http://127.0.0.1:1/v1', keyEnv: 'OS_UNSET_KEY_FOR_TEST'});
    assert.ok(validateModels(loadSetup(root), {requireKeys: true}).some(e => /is not set/.test(e)));
  } finally { cleanup(root); }
});

test('build readiness blocks an unapproved, unverified or unsynchronized source', () => {
  const root = makeFixture({approveOpenSource: false});
  declareFixtureModels(root, {baseUrl: 'http://127.0.0.1:1/v1', keyEnv: 'OS_FIXTURE_KEY'});
  process.env.OS_FIXTURE_KEY = 'fixture-key-value';
  try {
    const blocked = buildReadiness(loadSetup(root), 'UNI-07');
    assert.ok(blocked.length >= 4);
    assert.ok(blocked.some(e => /missing source_url|missing source_name/.test(e)));
    assert.ok(buildReadiness(loadSetup(root), 'UNI-03').some(e => /must be an allocated open-source ID/.test(e)));
    assert.ok(buildReadiness(loadSetup(root), 'UNI-04').some(e => /must be an allocated open-source ID/.test(e)));
  } finally { cleanup(root); delete process.env.OS_FIXTURE_KEY; }
});

test('readiness passes on a complete category and then catches each individual defect', () => {
  const root = makeFixture({approveOpenSource: true});
  declareFixtureModels(root, {baseUrl: 'http://127.0.0.1:1/v1', keyEnv: 'OS_FIXTURE_KEY'});
  process.env.OS_FIXTURE_KEY = 'fixture-key-value';
  const invFile = path.join(root, 'metadata/source-inventories/university.csv');
  const original = fs.readFileSync(invFile, 'utf8');
  const mutate = update => fs.writeFileSync(invFile, editCSVRecords(original, {match: r => r.source_id === 'UNI-07', update}).text);
  try {
    assert.deepEqual(buildReadiness(loadSetup(root), 'UNI-07'), []);

    mutate(r => ({...r, verification_result: 'UNVERIFIED'}));
    assert.ok(buildReadiness(loadSetup(root), 'UNI-07').some(e => /not verified/.test(e)));

    mutate(r => ({...r, approved_by: ''}));
    assert.ok(buildReadiness(loadSetup(root), 'UNI-07').some(e => /missing approved_by/.test(e)));

    mutate(r => ({...r, source_url: 'https://fixture-uni-08.example/'}));
    assert.ok(buildReadiness(loadSetup(root), 'UNI-07').some(e => /duplicate reference URL/.test(e)));

    mutate(r => ({...r, model_id: 'someone-else/Other-Model'}));
    assert.ok(buildReadiness(loadSetup(root), 'UNI-07').some(e => /not synchronized|differs from the approved assignment/.test(e)));

    mutate(r => ({...r, source_pages: JSON.stringify([{url: 'https://fixture-uni-07.example/a', title: 'a', local_file: 'a.html'}])}));
    assert.ok(buildReadiness(loadSetup(root), 'UNI-07').some(e => /requires index.html|below the configured minimum/.test(e)));

    mutate(r => ({...r, key_interactions: JSON.stringify([{name: 'nav', evidence: 'guessed'}])}));
    assert.ok(buildReadiness(loadSetup(root), 'UNI-07').some(e => /observed\/inferred/.test(e)));

    mutate(r => ({...r, evidence_reference: 'pipelines/open-source/research/evidence/does-not-exist.json'}));
    assert.ok(buildReadiness(loadSetup(root), 'UNI-07').some(e => /missing evidence file/.test(e)));
  } finally { fs.writeFileSync(invFile, original); cleanup(root); delete process.env.OS_FIXTURE_KEY; }
});

test('reserved URLs mark other groups\' references as off limits', () => {
  const held = reservedUrls([
    {slot: '01', source_id: 'UNI-01', model_group: 'claude', source_url: 'https://www.wisc.edu/'},
    {slot: '07', source_id: 'UNI-07', model_group: 'open-source', source_url: ''},
  ]);
  assert.equal(held.get('https://wisc.edu').ours, false);
  assert.equal(held.size, 1);
});

test('the validation summary never reports a pass from a QC run that did not execute', () => {
  const unavailable = validationSummary({executed: false, passed: false});
  assert.equal(unavailable.accessibility, 'not-tested');
  assert.equal(unavailable.technology, 'not-tested');
  const failed = validationSummary({executed: true, passed: false});
  assert.equal(failed.technology, 'fail');
  assert.equal(failed.accessibility, 'fail');
  const passed = validationSummary({executed: true, passed: true});
  assert.equal(passed.technology, 'pass');
  assert.equal(passed.accessibility, 'partial', 'a QC pass is not evidence of conformance');
  assert.equal(passed.interaction, 'not-tested');
  assert.equal(passed.traceability, 'not-tested');
});

test('credentials are redacted from anything written to disk', () => {
  process.env.TEST_REDACT_TOKEN = 'super-secret-value-123';
  try {
    assert.match(redact('key=super-secret-value-123'), /\[redacted:TEST_REDACT_TOKEN\]/);
    assert.match(redact('Authorization: Bearer sk-abcdefghijklmnop'), /\[redacted-key\]/);
  } finally { delete process.env.TEST_REDACT_TOKEN; }
});

test('CLI argument parsing rejects unknown, repeated and valueless options', () => {
  assert.deepEqual(cliArgs(['UNI-07', '--operator', 'me'], {operator: 'value'}), {positional: ['UNI-07'], flags: {operator: 'me'}});
  assert.throws(() => cliArgs(['--nope'], {operator: 'value'}), /Unknown/);
  assert.throws(() => cliArgs(['--operator', 'a', '--operator', 'b'], {operator: 'value'}), /repeated/);
  assert.throws(() => cliArgs(['--operator'], {operator: 'value'}), /Missing value/);
});

test('slot helpers keep the 3/3/4 allocation straight', () => {
  assert.equal(expectedGroup(3), 'claude');
  assert.equal(expectedGroup(6), 'codex');
  assert.equal(expectedGroup(7), 'open-source');
  assert.equal(expectedGroup(10), 'open-source');
  assert.equal(slotOf('HOSP-09'), 9);
});

const page = heading => `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${heading}</title><link rel="stylesheet" href="css/styles.css"></head><body><a href="#main-content">Skip to content</a><header data-section="global-header" data-component="site-header"><nav aria-label="Primary" data-section="global-navigation" data-component="primary-nav"><a href="index.html">Home</a></nav></header><main id="main-content" data-section="main-content" data-component="page-main"><h1>${heading}</h1></main><footer data-section="global-footer" data-component="site-footer"><p>Fictional fixture</p></footer><script src="js/main.js"></script></body></html>`;

test('end to end: one replica is generated, bounded, provenanced and never accepted', async t => {
  const root = makeFixture({approveOpenSource: true, pages: 6});
  const site = path.join(root, 'university/open-source/UNI-07');
  const docs = {
    'README.md': '# UNI-07 fixture replica\n\nSource verified by HTTP GET only. QC: not run in this fixture.\n',
    'fidelity-notes.md': '# Fidelity\n\nReplicated: nav. Simulated: search. Unverified: nothing rendered.\n',
    'component-inventory.json': JSON.stringify({protocol_version: '1.0', replica_id: 'UNI-07', category: 'university',
      source_url: 'https://fixture-uni-07.example/', components: [{id: 'primary-nav', selector: "[data-component='primary-nav']",
      pages: ['index.html'], behavior: ['desktop navigation'], keyboard: ['Tab'], status: 'implemented', validation: 'not-tested'}]}, null, 2),
    'generation-metadata.json': JSON.stringify({category: 'university', slot: 99, source_id: 'WRONG-ID',
      model_group: 'claude', model_id: 'not-the-declared-model',
      validation_summary: {technology: 'pass', completeness: 'pass', structure: 'pass', interaction: 'pass',
        accessibility: 'pass', traceability: 'pass', scope: 'pass'}}, null, 2),
  };
  const mock = await startMockProvider({
    replies: [
      'Plan: index.html plus page-1 to page-5, shared header/footer, 4 sample rows.\n=== STATUS: CONTINUE ===',
      [
        fileBlock('index.html', page('Fixture home')),
        ...[1, 2, 3, 4, 5].map(n => fileBlock(`page-${n}.html`, page(`Page ${n}`))),
        fileBlock('404.html', page('Not found')),
        fileBlock('css/styles.css', ':root{color-scheme:light dark}body{font:16px/1.5 system-ui}'),
        fileBlock('js/main.js', 'document.addEventListener("DOMContentLoaded",()=>{});'),
        fileBlock('../escape.html', 'should never be written'),
        fileBlock('src/app.tsx', 'export default 1;'),
        '=== STATUS: CONTINUE ===',
      ].join('\n'),
      [...Object.entries(docs).map(([p, c]) => fileBlock(p, c)), '=== STATUS: COMPLETE ==='].join('\n'),
    ],
  });
  declareFixtureModels(root, {baseUrl: mock.baseUrl, keyEnv: 'OS_E2E_KEY'});
  process.env.OS_E2E_KEY = 'fixture-key-value';
  try {
    const result = await runBuild({id: 'UNI-07', operator: 'fixture operator', root, noQC: true, repairs: 0, maxTurns: 6});

    assert.equal(result.status, 'completed');
    assert.equal(result.delivered.missing_required.length, 0, `missing: ${result.delivered.missing_required}`);
    for (const f of ['index.html', 'page-1.html', 'page-5.html', '404.html', 'css/styles.css', 'js/main.js', ...Object.keys(docs)])
      assert.ok(fs.existsSync(path.join(site, f)), `expected ${f}`);

    // Nothing escaped the slot directory.
    assert.ok(!fs.existsSync(path.join(root, 'escape.html')));
    assert.ok(!fs.existsSync(path.join(root, 'university/open-source/escape.html')));
    assert.ok(!fs.existsSync(path.join(site, 'src/app.tsx')));
    assert.ok(!fs.existsSync(path.join(root, 'university/claude/UNI-01')));

    const run = readJSON(path.join(root, 'pipelines/open-source/runs', result.runID, 'run.json'));
    assert.equal(run.rejected_files.length, 2);
    assert.ok(run.rejected_files.some(r => /traversal/.test(r.reason)));
    assert.equal(run.acceptance.startsWith('not accepted'), true);
    assert.equal(run.model.model_id, 'fixture-org/Fixture-Model');
    assert.equal(run.tool_access.includes('no browsing'), true);
    assert.equal(run.usage.requests, 3);
    assert.equal(run.usage.total_tokens, 900);

    // The raw artifact is preserved before any correction round.
    assert.ok(fs.existsSync(path.join(root, 'pipelines/open-source/runs', result.runID, 'initial/index.html')));

    // Provenance is normalized from recorded fact, not from what the model claimed.
    const meta = readJSON(path.join(site, 'generation-metadata.json'));
    assert.equal(meta.source_id, 'UNI-07');
    assert.equal(meta.slot, 7);
    assert.equal(meta.model_group, 'open-source');
    assert.equal(meta.model_id, 'fixture-org/Fixture-Model');
    assert.equal(meta.operator, 'fixture operator');
    assert.equal(meta.approved_source_url, 'https://fixture-uni-07.example/');
    assert.ok(meta.generation_started_at && meta.generation_completed_at);
    for (const [gate, value] of Object.entries(meta.validation_summary))
      assert.equal(value, 'not-tested', `${gate} must not claim a pass when QC was skipped`);
    assert.ok(meta.human_edits.some(e => /orchestrator/i.test(e.by)));

    // The transcript is kept and carries no credential.
    const transcript = fs.readFileSync(path.join(root, 'pipelines/open-source/runs', result.runID, 'transcript.json'), 'utf8');
    assert.ok(!transcript.includes('fixture-key-value'));
    assert.ok(transcript.includes('Plan: index.html'));

    // The queue moved, and a rerun over an existing site is refused.
    const queue = readJSON(path.join(root, 'pipelines/open-source/queue/manifest.json'));
    assert.equal(queue.tasks.find(x => x.id === 'build-UNI-07').status, 'completed');
    await assert.rejects(() => runBuild({id: 'UNI-07', operator: 'fixture operator', root, noQC: true}), /already has files/);
  } finally {
    await mock.close();
    delete process.env.OS_E2E_KEY;
    cleanup(root);
  }
});

test('a build is refused without an operator, on another group\'s slot, and with no key', async () => {
  const root = makeFixture({approveOpenSource: true, pages: 2});
  declareFixtureModels(root, {baseUrl: 'http://127.0.0.1:1/v1', keyEnv: 'OS_MISSING_KEY'});
  try {
    await assert.rejects(() => runBuild({id: 'UNI-07', operator: '', root}), /--operator is required/);
    await assert.rejects(() => runBuild({id: 'UNI-04', operator: 'me', root}), /allocated open-source ID/);
    await assert.rejects(() => runBuild({id: 'UNI-07', operator: 'me', root}), /OS_MISSING_KEY is not set/);
  } finally { cleanup(root); }
});

test('missing deliverables are reported against the approved page map', () => {
  const root = fs.mkdtempSync(path.join(fs.realpathSync(process.env.TMPDIR ?? '/tmp'), 'os-missing-'));
  try {
    fs.writeFileSync(path.join(root, 'index.html'), 'x');
    const missing = missingDeliverables(root, [{local_file: 'index.html'}, {local_file: 'about.html'}]);
    assert.ok(missing.includes('about.html'));
    assert.ok(missing.includes('generation-metadata.json'));
    assert.ok(!missing.includes('index.html'));
  } finally { fs.rmSync(root, {recursive: true, force: true}); }
});

test('a partial declaration is enough for the slot in hand and noted for the rest', () => {
  const root = makeFixture({approveOpenSource: true});
  declareFixtureModels(root, {baseUrl: 'http://127.0.0.1:1/v1', keyEnv: 'OS_PARTIAL_KEY'});
  process.env.OS_PARTIAL_KEY = 'fixture-key-value';
  const modelsPath = path.join(root, 'pipelines/open-source/models.json');
  const full = readJSON(modelsPath);
  try {
    // Only slot 07 declared, as in a single-slot test run.
    writeJSON(modelsPath, {...full, slots: {7: full.slots['7']}});
    const scoped = validateModels(loadSetup(root), {needSlots: [7], requireKeys: true});
    assert.deepEqual(scoped.filter(e => !e.startsWith('Note:')), []);
    assert.ok(scoped.some(e => /only slots 07 are declared/.test(e)));

    // A slot that is not declared is a hard error for that slot.
    assert.ok(validateModels(loadSetup(root), {needSlots: [8]}).some(e => /slot 08: not declared/.test(e)));

    // The pre-generation check still wants all four.
    assert.ok(validateModels(loadSetup(root)).some(e => /slot 08: not declared/.test(e)));

    // A build of the declared slot is not blocked by the undeclared ones.
    assert.deepEqual(buildReadiness(loadSetup(root), 'UNI-07'), []);
    assert.ok(buildReadiness(loadSetup(root), 'UNI-08').some(e => /slot 08: not declared/.test(e)));
  } finally { cleanup(root); delete process.env.OS_PARTIAL_KEY; }
});

test('a single-slot research run treats the other three slots as reserved', () => {
  const rows = [
    {slot: '01', source_id: 'UNI-01', model_group: 'claude', source_url: 'https://www.wisc.edu/'},
    {slot: '07', source_id: 'UNI-07', model_group: 'open-source', source_url: ''},
    {slot: '08', source_id: 'UNI-08', model_group: 'open-source', source_url: 'https://www.ufl.edu/'},
  ];
  const single = reservedUrls(rows, [7]);
  assert.equal(single.get('https://ufl.edu').ours, false, 'slot 08 is off limits during a slot-07 run');
  assert.equal(single.get('https://wisc.edu').ours, false);
  const all = reservedUrls(rows, [7, 8, 9, 10]);
  assert.equal(all.get('https://ufl.edu').ours, true, 'during a full-category run it is this run to assign');
});
