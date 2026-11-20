const { test } = require('node:test');
const assert = require('node:assert/strict');
const dockerLib = require('../lib/docker');

function fake(initial = []) {
  const calls = [];
  const containers = [...initial];
  const run = async (args, env) => {
    calls.push({ args, env });
    if (args[0] === 'ps') return containers.map((n) => JSON.stringify({ Names: n, State: 'running', Status: 'Up', CreatedAt: 'x' })).join('\n');
    if (args[0] === 'run') { containers.push(args[args.indexOf('--name') + 1]); return 'id\n'; }
    if (args[0] === 'rm') { for (const n of args.slice(2)) containers.splice(containers.indexOf(n), 1); return ''; }
    throw new Error('unexpected ' + args[0]);
  };
  return { run, calls };
}
const env = { DOCKER_WORKERS: '1', WORKER_TOKEN: 'tok', DOCKER_MAX_WORKERS: '3', DOCKER_NETWORK: 'net' };

test('disabled by default and refuses to start', async () => {
  const d = dockerLib.create({ env: {}, run: async () => { throw new Error('must not run'); } });
  assert.equal(d.snapshot().enabled, false);
  await assert.rejects(d.start(1, 1), /disabled/);
});

test('start runs labelled containers, token via env not argv, enforces the limit', async () => {
  const f = fake();
  const d = dockerLib.create({ env, run: f.run, port: 9000 });
  const r = await d.start(2, 4);
  assert.equal(r.started.length, 2);
  const run = f.calls.find((c) => c.args[0] === 'run');
  assert.ok(!run.args.join(' ').includes('tok'));
  assert.equal(run.env.WORKER_TOKEN, 'tok');
  assert.ok(run.args.includes('study-worker=1') && run.args.includes('WEB_URL=http://host.docker.internal:9000'));
  assert.ok(run.args.includes('--network'));
  assert.equal(d.snapshot().containers.length, 2);
  await assert.rejects(d.start(2, 4), /limit is 3/);
  await assert.rejects(d.start(0, 4), /count/);
  await assert.rejects(d.start(1, 99), /slots/);
});

test('stop only removes labelled study-worker names', async () => {
  const f = fake(['study-worker-ab12cd-1', 'study-worker-ab12cd-2']);
  const d = dockerLib.create({ env, run: f.run });
  await assert.rejects(d.stop('postgres'), /bad container name/);
  await assert.rejects(d.stop('study-worker-zzzzzz-9'), /no such/);
  assert.deepEqual((await d.stop('study-worker-ab12cd-1')).removed, ['study-worker-ab12cd-1']);
  assert.deepEqual((await d.stop(null)).removed, ['study-worker-ab12cd-2']);
});

test('unreachable docker is reported, not thrown', async () => {
  const d = dockerLib.create({ env, run: async () => { throw new Error('daemon down'); } });
  const s = await d.refresh();
  assert.equal(s.available, false);
  assert.match(s.error, /daemon down/);
  await assert.rejects(d.start(1, 1), /docker unavailable/);
});
