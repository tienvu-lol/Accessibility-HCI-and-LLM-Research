const PROVIDERS = ['openai', 'anthropic', 'gemini'];
const ENV = { openai: 'OPENAI_API_KEY', anthropic: 'ANTHROPIC_API_KEY', gemini: 'GEMINI_API_KEY' };

// Memory only: nothing here is ever written to disk, logged or returned except {set,last4,source}.
function create(env = process.env) {
  const store = {};
  for (const p of PROVIDERS) if (env[ENV[p]]) store[p] = { key: env[ENV[p]], source: 'env' };
  return {
    PROVIDERS,
    set(p, key) { store[p] = { key, source: 'ui' }; },
    delete(p) { delete store[p]; },
    get(p) { return store[p] ? store[p].key : null; },
    status() {
      return Object.fromEntries(PROVIDERS.map((p) => [p, store[p]
        ? { set: true, last4: store[p].key.slice(-4), source: store[p].source }
        : { set: false, last4: null, source: null }]));
    },
  };
}

module.exports = { create, PROVIDERS };
