// Record the slot -> open-weight model mapping that MODEL_ALLOCATION.md section 2 requires
// before generation ("The project lead must declare the precise model-to-slot mapping before
// generation; do not silently assume four different models").
// API keys are never written here: --key-env names an environment variable.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {loadSetup, validateModels, writeJSON, readJSON, cliArgs, nowISO, SLOTS, padSlot} from './lib.mjs';

const FIELDS = ['model-id', 'model-version', 'weights-url', 'license', 'provider', 'base-url', 'key-env', 'eligibility-note', 'temperature', 'max-tokens'];

function usage() {
  return `Declare one slot at a time:

  node Websites/pipelines/open-source/scripts/declare-models.mjs --slot 7 \\
    --model-id "org/Model-Name" --weights-url https://huggingface.co/org/Model-Name \\
    --license apache-2.0 --provider together --base-url https://api.together.xyz/v1 \\
    --key-env OS_SLOT_07_API_KEY --eligibility-note "open weights confirmed <date> by <person>" \\
    --declared-by "project lead"

Then check the whole declaration:

  node Websites/pipelines/open-source/scripts/declare-models.mjs --show

Optional: --model-version, --temperature (default 0.3), --max-tokens (default 16000).
The key itself stays in the environment: export OS_SLOT_07_API_KEY=... before running a build.`;
}

try {
  const {positional, flags} = cliArgs(process.argv.slice(2), Object.fromEntries([
    ['slot', 'value'], ['declared-by', 'value'], ['show', 'boolean'], ['init', 'boolean'],
    ...FIELDS.map(f => [f, 'value']),
  ]));
  if (positional.length) throw new Error(usage());
  const setup = loadSetup();
  const target = setup.modelsPath;

  if (flags.show) {
    if (!setup.models) throw new Error(`No ${setup.config.models_file} yet. ${usage()}`);
    const errors = validateModels(setup, {requireKeys: false});
    for (const slot of SLOTS) {
      const m = setup.models.slots[String(slot)];
      const keySet = Boolean(process.env[m.api_key_env]);
      console.log(`slot ${padSlot(slot)}  ${m.model_id}${m.model_version ? ` @${m.model_version}` : ''}`);
      console.log(`         provider=${m.provider}  license=${m.license}  open_weights=${m.open_weights}`);
      console.log(`         endpoint=${m.base_url}  key env ${m.api_key_env}=${keySet ? 'set' : 'NOT SET'}`);
    }
    console.log(`\ndeclared_by=${setup.models.declared_by}  declared_at=${setup.models.declared_at}`);
    const notes = errors.filter(e => e.startsWith('Note:')), hard = errors.filter(e => !e.startsWith('Note:'));
    notes.forEach(n => console.log(n));
    if (hard.length) { hard.forEach(e => console.error('FAIL', e)); process.exitCode = 1; }
    else console.log('Declaration is structurally valid. It is an operator statement; these scripts cannot authenticate it.');
  } else if (flags.init) {
    if (fs.existsSync(target)) throw new Error(`${setup.config.models_file} already exists; edit it or use --slot to replace one slot`);
    const example = readJSON(path.join(setup.pipeline, 'models.example.json'));
    writeJSON(target, {...example, declared_at: nowISO(), declared_by: flags['declared-by'] ?? 'REPLACE_WITH_PROJECT_LEAD'});
    console.log(`Wrote ${setup.config.models_file} from the example. Every REPLACE value must be set before a build; it will not validate until then.`);
  } else {
    const slot = Number(flags.slot);
    if (!SLOTS.includes(slot)) throw new Error(`--slot must be one of ${SLOTS.join(', ')}\n\n${usage()}`);
    for (const required of ['model-id', 'weights-url', 'license', 'provider', 'base-url', 'key-env', 'eligibility-note'])
      if (!flags[required]) throw new Error(`--${required} is required\n\n${usage()}`);
    if (/^(sk-|hf_|gsk_|tgp_)/.test(flags['key-env'])) throw new Error('--key-env takes the NAME of an environment variable, not the key itself');
    if (process.env[flags['key-env']] === flags['key-env']) throw new Error('--key-env looks like a literal value; pass the variable name');
    const models = setup.models ?? {schema_version: '1.0', declared_at: nowISO(), declared_by: flags['declared-by'] ?? 'unrecorded', slots: {}};
    models.slots[String(slot)] = {
      model_id: flags['model-id'],
      model_version: flags['model-version'] ?? null,
      weights_url: flags['weights-url'],
      license: flags.license,
      open_weights: true,
      eligibility_note: flags['eligibility-note'],
      provider: flags.provider,
      base_url: flags['base-url'],
      api_key_env: flags['key-env'],
      params: {temperature: Number(flags.temperature ?? 0.3), max_tokens: Number(flags['max-tokens'] ?? 16000)},
    };
    models.declared_at = nowISO();
    if (flags['declared-by']) models.declared_by = flags['declared-by'];
    models.note = 'Operator declaration of the open-weight model used for each slot. Keys live in the environment variables named by api_key_env and are never stored here.';
    writeJSON(target, models);
    const missing = SLOTS.filter(s => !models.slots[String(s)]);
    console.log(`Recorded slot ${padSlot(slot)} = ${flags['model-id']} (${flags.provider}).`);
    console.log(`open_weights is recorded as true from your --eligibility-note; this script cannot verify a licence.`);
    if (missing.length) console.log(`Still undeclared: ${missing.map(padSlot).join(', ')}.`);
    else console.log('All four slots declared. Run validate.mjs --ready <ID> before a build.');
  }
} catch (e) { console.error(e.message); process.exitCode = 1; }
