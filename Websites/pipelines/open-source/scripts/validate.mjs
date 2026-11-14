// Static integrity of this pipeline, and optionally the prerequisites for one build.
import {loadSetup, validateSetup, validateModels, buildReadiness, cliArgs, SLOTS} from './lib.mjs';
try {
  const {positional, flags} = cliArgs(process.argv.slice(2), {ready: 'value', models: 'boolean', 'skip-keys': 'boolean'});
  if (positional.length) throw new Error('Usage: node validate.mjs [--models] [--ready UNI-07 [--skip-keys]]');
  const setup = loadSetup();
  const errors = validateSetup(setup);
  const notes = [];
  if ((flags.models || flags.ready) && !errors.length) {
    const modelErrors = validateModels(setup, {requireKeys: Boolean(flags.ready) && !flags['skip-keys']});
    notes.push(...modelErrors.filter(e => e.startsWith('Note:')));
    errors.push(...modelErrors.filter(e => !e.startsWith('Note:')));
  }
  if (flags.ready && !errors.length) errors.push(...buildReadiness(setup, flags.ready, {requireKeys: !flags['skip-keys']}));
  notes.forEach(n => console.log(n));
  if (errors.length) { for (const e of errors) console.error('FAIL', e); process.exitCode = 1; }
  else if (flags.ready) {
    console.log(`READY ${flags.ready}: source approval, model declaration and provenance prerequisites pass. Nothing has been generated.`);
  } else {
    const research = setup.queue.tasks.filter(t => t.phase === 'research').length;
    const builds = setup.queue.tasks.filter(t => t.phase === 'build').length;
    console.log(`PASS: ${setup.categories.length} categories, slots ${SLOTS.join('/')}, ${builds} build tasks, ${research} research tasks, 3/3/4 allocation and shared paths verified.`);
    console.log('Configuration validity is not source approval, model eligibility or build readiness.');
  }
} catch (e) { console.error('ERROR', e.message); process.exitCode = 1; }
