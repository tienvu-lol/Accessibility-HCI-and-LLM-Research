import {loadSetup,validateSetup,buildReadiness,cliArgs} from './lib.mjs';
try {
  const {positional,flags}=cliArgs(process.argv.slice(2),{ready:'value',model:'value',runtime:'value',operator:'value','model-version':'value'});
  if (positional.length) throw new Error('Usage: node validate.mjs [--ready UNI-04 --model ID --runtime NAME --operator NAME]');
  const setup=loadSetup(); const errors=validateSetup(setup);
  if (flags.ready && !errors.length) errors.push(...buildReadiness(setup,flags.ready,{...setup.config.model,id:flags.model || setup.config.model.id,runtime:flags.runtime || setup.config.model.runtime,operator:flags.operator || setup.config.model.operator,version:flags['model-version'] || setup.config.model.version}));
  if (errors.length) {for (const e of errors) console.error('FAIL',e);process.exitCode=1;}
  else {
    console.log(flags.ready ? `READY ${flags.ready}: approval and provenance prerequisites passed; no generation launched.` : 'PASS: 10 categories, 30 Codex build slots, 10 research tasks, 3/3/4 allocation, and shared paths verified.');
    if (!flags.ready) console.log('Configuration validation does not imply source approval or build readiness. Model selection and source inventories are intentionally unresolved.');
  }
} catch(e) {console.error('ERROR',e.message);process.exitCode=1;}
