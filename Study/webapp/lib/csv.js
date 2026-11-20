const fs = require('fs');
const path = require('path');

function parse(text) {
  const rows = [];
  let row = [], cell = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') q = false;
      else cell += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(cell); cell = '';
      if (row.some((x) => x !== '')) rows.push(row);
      row = [];
    } else cell += c;
  }
  if (cell !== '' || row.length) rows.push([...row, cell]);
  return rows;
}

const quote = (v) => {
  const s = v === null || v === undefined ? '' : String(v);
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const stringify = (rows) => rows.map((r) => r.map(quote).join(',')).join('\n') + '\n';

function readRows(file) {
  try { return parse(fs.readFileSync(file, 'utf8')); } catch (e) { if (e.code === 'ENOENT') return []; throw e; }
}

function writeAtomic(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const tmp = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, data);
  fs.renameSync(tmp, file);
}

// Replace rows sharing the key columns, append new ones; header written once.
function upsert(file, header, newRows, keyIdx) {
  const rows = readRows(file);
  const body = rows.length ? rows.slice(1) : [];
  const key = (r) => keyIdx.map((i) => r[i]).join('\u0001');
  const at = new Map(body.map((r, i) => [key(r), i]));
  for (const r of newRows) {
    const k = key(r);
    if (at.has(k)) body[at.get(k)] = r;
    else { at.set(k, body.length); body.push(r); }
  }
  writeAtomic(file, stringify([rows.length ? rows[0] : header, ...body]));
}

module.exports = { parse, stringify, readRows, writeAtomic, upsert };
