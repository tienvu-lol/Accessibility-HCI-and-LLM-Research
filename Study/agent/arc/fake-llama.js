'use strict';
// Stand-in for one ARC llama.cpp server, for agent/arc/e2e-open-arms.sh. Never used in a real run.
// Speaks the two OpenAI-compatible routes the study needs and answers a repair prompt in the
// <<<EVAL>>>/<<<FILE: ...>>> protocol by echoing the input files back with one marker comment added,
// so a finished cell proves the bytes travelled through the SSH tunnel from this server.
const http = require('node:http');

const KEY = process.env.EXPECT_KEY || '';
const ARM = process.env.ARM || 'A?';
const PORT = Number(process.env.PORT) || 8000;
let calls = 0;

const files = (prompt) => {
  const block = /<<<INPUT FILE:[\s\S]*?(?=<<<END INPUT>>>)/.exec(prompt);
  const parts = (block ? block[0] : '').split(/<<<INPUT FILE: ([^>]*)>>>\n?/);
  const out = [];
  for (let i = 1; i < parts.length; i += 2) out.push([parts[i].trim(), parts[i + 1].replace(/\n$/, '')]);
  return out;
};

// The marker goes inside the document: check_truncation requires the file to still end with </html>.
const mark = (path, text, n) => {
  const tag = `${path.endsWith('.css') ? '/*' : '<!--'} arc-e2e ${ARM} call ${n} ${path.endsWith('.css') ? '*/' : '-->'}`;
  // no whitespace added: guards.normalize_hash strips comments, so iteration 2 then matches and the cell converges
  if (/<\/html>\s*$/i.test(text)) return text.replace(/<\/html>(\s*)$/i, `${tag}</html>$1`);
  return `${text}\n${tag}`;
};

const server = http.createServer((req, res) => {
  let body = '';
  req.on('data', (d) => { body += d; });
  req.on('end', () => {
    const send = (code, obj) => { res.writeHead(code, { 'content-type': 'application/json' }); res.end(JSON.stringify(obj)); };
    const path = req.url.split('?')[0];
    if (KEY && req.headers.authorization !== `Bearer ${KEY}`) {
      console.log(`[fake-llama ${ARM}] 401 ${req.method} ${path} (bad or missing key)`);
      return send(401, { error: { message: 'invalid api key' } });
    }
    if (path.endsWith('/models')) return send(200, { object: 'list', data: [{ id: `fake-${ARM}`, object: 'model' }] });
    if (!path.endsWith('/chat/completions')) return send(404, { error: { message: 'not found' } });
    let q = {};
    try { q = JSON.parse(body); } catch { return send(400, { error: { message: 'bad json' } }); }
    const prompt = (q.messages || []).map((m) => m.content).join('\n');
    const got = files(prompt);
    if (!got.length) return send(400, { error: { message: 'no <<<INPUT FILE>>> blocks in the prompt' } });
    const n = ++calls;
    const text = ['<<<EVAL>>>', '{"findings":[]}',
      ...got.flatMap(([p, t]) => [`<<<FILE: ${p}>>>`, mark(p, t, n)]), '<<<END>>>'].join('\n');
    console.log(`[fake-llama ${ARM}] call ${n}: model=${q.model} files=${got.map(([p]) => p).join(',')} prompt=${prompt.length}B`);
    send(200, { id: `fake-${n}`, object: 'chat.completion', model: q.model,
      choices: [{ index: 0, message: { role: 'assistant', content: text }, finish_reason: 'stop' }],
      usage: { prompt_tokens: Math.ceil(prompt.length / 4), completion_tokens: Math.ceil(text.length / 4) } });
  });
});
server.listen(PORT, () => console.log(`[fake-llama ${ARM}] listening on ${PORT}, key ${KEY ? 'required' : 'not checked'}`));
