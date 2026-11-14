// A local stand-in for an OpenAI-compatible endpoint, so the executor can be tested
// end to end without a provider, a key or a network call leaving the machine.
import http from 'node:http';

export async function startMockProvider({replies, expectKey = 'fixture-key-value'} = {}) {
  const calls = [];
  const server = http.createServer((req, res) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      if (req.method !== 'POST' || !req.url.endsWith('/chat/completions')) {
        res.writeHead(404).end('{}');
        return;
      }
      const auth = req.headers.authorization ?? '';
      if (auth !== `Bearer ${expectKey}`) {
        res.writeHead(401, {'content-type': 'application/json'}).end(JSON.stringify({error: 'bad key'}));
        return;
      }
      const payload = JSON.parse(body);
      calls.push(payload);
      const reply = typeof replies === 'function' ? replies(calls.length, payload) : replies[calls.length - 1];
      if (reply === undefined) {
        res.writeHead(500, {'content-type': 'application/json'}).end(JSON.stringify({error: 'mock ran out of replies'}));
        return;
      }
      res.writeHead(200, {'content-type': 'application/json'}).end(JSON.stringify({
        id: `mock-${calls.length}`, model: payload.model,
        choices: [{index: 0, finish_reason: 'stop', message: {role: 'assistant', content: reply}}],
        usage: {prompt_tokens: 100, completion_tokens: 200, total_tokens: 300},
      }));
    });
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const {port} = server.address();
  return {
    baseUrl: `http://127.0.0.1:${port}/v1`,
    calls,
    close: () => new Promise(resolve => server.close(resolve)),
  };
}

export const fileBlock = (p, content) => `=== FILE: ${p} ===\n${content}\n=== END FILE ===`;
