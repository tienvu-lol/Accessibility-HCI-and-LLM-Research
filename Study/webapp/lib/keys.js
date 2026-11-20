// Hosted-provider keys (one per provider, shared by the arms that use it) plus one key per
// open-source arm: A5 (DeepSeek) and A6 (Qwen) are separate llama.cpp servers with separate
// credentials, so they get separate slots and are never interchangeable.
const PROVIDERS = ['openai', 'anthropic', 'gemini'];
const ARM_KEYS = ['a5', 'a6'];
const SLOTS = [...PROVIDERS, ...ARM_KEYS];
const ENV = {
  openai: 'OPENAI_API_KEY', anthropic: 'ANTHROPIC_API_KEY', gemini: 'GEMINI_API_KEY',
  a5: 'A5_API_KEY', a6: 'A6_API_KEY',
};
const armSlot = (arm) => (typeof arm === 'string' && ARM_KEYS.includes(arm.toLowerCase()) ? arm.toLowerCase() : null);

// Memory only: nothing here is ever written to disk, logged or returned except {set,last4,source}.
// `id` is what the usage ledger records so spend can be split by the credential that paid for it;
// it holds no secret, only the slot and the last four characters.
function create(env = process.env) {
  const store = {};
  for (const p of SLOTS) if (env[ENV[p]]) store[p] = { key: env[ENV[p]], source: 'env' };
  const entry = (p) => store[p] || null;
  return {
    PROVIDERS, ARM_KEYS, SLOTS,
    set(p, key) { store[p] = { key, source: 'ui' }; },
    delete(p) { delete store[p]; },
    get(p) { const e = entry(p); return e ? e.key : null; },
    // stable, secret-free identity of the credential behind a slot, e.g. "openai:f4a1"
    id(p) { const e = entry(p); return e ? `${p}:${e.key.slice(-4)}` : null; },
    envName(p) { return ENV[p] || null; },
    status() {
      return Object.fromEntries(SLOTS.map((p) => [p, store[p]
        ? { set: true, last4: store[p].key.slice(-4), source: store[p].source }
        : { set: false, last4: null, source: null }]));
    },
  };
}

module.exports = { create, PROVIDERS, ARM_KEYS, SLOTS, ENV, armSlot };
