// Runs the shared QC tool and records exactly what it reported.
// A missing browser or a crashed tool is recorded as unavailable, never as a pass.
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {inside, hash, nowISO, stamp, redact} from './lib.mjs';

export function runQC(setup, siteDir, runDir, {label = 'qc'} = {}) {
  const tool = inside(setup.root, setup.config.paths.qc);
  const tag = `${label}-${stamp()}`;
  const reportPath = path.join(runDir, `${tag}.json`);
  const logPath = path.join(runDir, `${tag}.log`);
  const started = nowISO();
  const result = spawnSync(process.execPath, [tool, siteDir, '--json', reportPath], {
    cwd: setup.root, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024,
  });
  const stdout = result.stdout ?? '', stderr = result.stderr ?? '';
  fs.writeFileSync(logPath, redact(stdout + stderr + (result.error?.message ?? '')));
  let report = null;
  try { report = JSON.parse(fs.readFileSync(reportPath, 'utf8')); } catch { /* the tool may not have got that far */ }
  const identifies = report && path.resolve(report.site ?? '') === path.resolve(siteDir);
  const executed = result.status !== null && result.status !== 2 && Boolean(report) && identifies;
  const passed = executed && result.status === 0 && report.fails === 0;
  return {
    started_at: started, completed_at: nowISO(), exit_code: result.status,
    executed, passed,
    outcome: passed ? 'pass' : executed ? 'fail' : 'unavailable',
    failures: report?.failures ?? [], failure_count: report?.fails ?? null,
    warnings: report?.warns ?? [], axe: report?.axe ?? null,
    pages: report?.pages ?? null, files: report?.files ?? null,
    qc_tool_sha256: hash(fs.readFileSync(tool)),
    report: report ? path.basename(reportPath) : null, log: path.basename(logPath),
    stdout_tail: redact(stdout).split('\n').slice(-25).join('\n'),
    note: executed ? null : 'The QC tool did not produce a usable report for this site; treat accessibility and interaction gates as not-tested, not as passing.',
  };
}

/** The checks RULES.md section 9 names, filled only from a QC run that actually executed. */
export function validationSummary(qc, {interactionsReviewed = false} = {}) {
  const gate = qc.executed ? (qc.passed ? 'pass' : 'fail') : 'not-tested';
  return {
    technology: gate,
    completeness: gate,
    structure: gate,
    interaction: interactionsReviewed ? gate : 'not-tested',
    accessibility: qc.executed ? (qc.passed ? 'partial' : 'fail') : 'not-tested',
    traceability: 'not-tested',
    scope: 'not-tested',
  };
}

export const qcHeadline = qc =>
  qc.outcome === 'pass' ? `QC pass (exit 0, failures=0, ${qc.pages} pages)`
  : qc.outcome === 'fail' ? `QC fail (exit ${qc.exit_code}, ${qc.failure_count} failures)`
  : `QC unavailable (exit ${qc.exit_code}); results are not-tested`;
