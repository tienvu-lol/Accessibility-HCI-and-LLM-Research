'use strict';
// CSV export helper: RFC 4180 quoting plus spreadsheet formula-injection guard.

const PLAIN_NUMBER = /^-?\d+(\.\d+)?$/;

function cell(v) {
  if (v === null || v === undefined) return '';
  let s = typeof v === 'number' ? (Number.isFinite(v) ? String(v) : '') : String(v);
  if (/^[=+\-@]/.test(s) && !PLAIN_NUMBER.test(s)) s = "'" + s;
  return /[",\r\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}

function toCsv({ columns = [], rows = [] } = {}) {
  const lines = [columns.map(cell).join(',')];
  for (const r of rows) lines.push(r.map(cell).join(','));
  return lines.join('\r\n') + '\r\n';
}

module.exports = { toCsv };
