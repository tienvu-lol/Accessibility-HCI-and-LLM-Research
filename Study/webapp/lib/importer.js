// POST /api/import: streaming gunzip of NDJSON cells for open-source arms.
const zlib = require('zlib');
const { StringDecoder } = require('string_decoder');
const { HttpError } = require('./http');
const { validateFiles } = require('./store');
const { CONDITIONS } = require('./state');

const MAX_COMPRESSED = 1024 ** 3;
const MAX_LINE = 90 * 1024 * 1024; // 50 MB of files as base64 plus JSON overhead
const CELL = /^(A\d+)\/([a-z]+)\/([A-Za-z0-9-]+)$/;

function importLine(ctx, text) {
  let rec;
  try { rec = JSON.parse(text); } catch { throw new Error('invalid JSON'); }
  const m = rec && typeof rec.cell === 'string' && CELL.exec(rec.cell);
  if (!m) throw new Error('bad cell');
  const [, arm, cond, site] = m;
  if (!ctx.state.arms[arm] || ctx.armKind(arm) !== 'open_source') throw new Error(`arm ${arm} is not open_source`);
  if (!CONDITIONS.includes(cond)) throw new Error('bad condition');
  if (!ctx.sites.some((s) => s.site_id === site)) throw new Error('unknown site');
  const prefix = `runs/${rec.cell}/`;
  const prefixed = {};
  for (const [rel, f] of Object.entries(rec.files || {})) prefixed[prefix + rel] = f;
  const entries = validateFiles(prefixed, prefix);
  if (!entries.length) throw new Error('no files');
  let input = 0, output = 0, calls = 0, modelId = null;
  for (const { rel, buf } of entries) {
    if (!rel.endsWith('/status.json')) continue;
    try {
      const st = JSON.parse(buf.toString('utf8'));
      const u = st.usage || {};
      input += u.input || 0; output += u.output || 0; calls++;
      modelId = st.model_id || st.model_version || modelId;
    } catch { /* usage unknown */ }
  }
  ctx.store.writeFiles(entries);
  // an imported cell was run elsewhere (on ARC, by hand), so the "machine" is the import itself and
  // the model is whatever that run recorded; it is real usage, never mock
  if (!ctx.state.imported.includes(rec.cell)) {
    ctx.coord.addLedger({ worker: '(imported)', arm, kind: 'repair', model_id: modelId, key_id: null, mock: false }, input, output, calls);
  }
  ctx.coord.markImported([rec.cell]);
  return arm;
}

async function run(ctx, req) {
  let received = 0;
  req.on('data', (c) => { received += c.length; if (received > MAX_COMPRESSED) req.destroy(); });
  const gunzip = zlib.createGunzip();
  req.on('error', (e) => gunzip.destroy(e));
  req.pipe(gunzip);

  const decoder = new StringDecoder('utf8');
  const arms = new Set();
  const rejected = [];
  let imported = 0, line = 0, buf = '';
  const handle = (text) => {
    line++;
    if (!text.trim()) return;
    try { arms.add(importLine(ctx, text)); imported++; } catch (e) { rejected.push({ line, reason: e.message }); }
  };
  try {
    for await (const chunk of gunzip) {
      buf += decoder.write(chunk);
      let i;
      while ((i = buf.indexOf('\n')) >= 0) { handle(buf.slice(0, i)); buf = buf.slice(i + 1); }
      if (buf.length > MAX_LINE) throw new HttpError(413, 'line too large');
    }
  } catch (e) {
    if (e instanceof HttpError) throw e;
    throw new HttpError(400, 'invalid gzip stream');
  }
  handle(buf + decoder.end());
  ctx.state.imports.push({ ts: ctx.now(), arms: [...arms], cells: imported, rejected: rejected.length });
  ctx.state.save();
  return { imported_cells: imported, rejected };
}

module.exports = { run };
