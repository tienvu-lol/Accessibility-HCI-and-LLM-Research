// Minimal OpenAI-compatible chat-completions client.
// Works with any host that exposes POST {base_url}/chat/completions: Together, Fireworks,
// Groq, DeepInfra, OpenRouter, Hyperbolic, Nebius, or a local vLLM / llama.cpp / Ollama server.
// The API key is read from the environment variable named in models.json and is never stored or logged.
import {redact} from './lib.mjs';

const sleep = ms => new Promise(r => setTimeout(r, ms));

export class ProviderError extends Error {
  constructor(message, {status = null, retriable = false} = {}) {
    super(message); this.name = 'ProviderError'; this.status = status; this.retriable = retriable;
  }
}

export async function chat({model, messages, api, signal}) {
  const key = process.env[model.api_key_env];
  if (!key) throw new ProviderError(`Environment variable ${model.api_key_env} is not set`);
  const url = `${model.base_url.replace(/\/$/, '')}/chat/completions`;
  const body = {
    model: model.model_id,
    messages,
    stream: false,
    ...model.params,
  };
  let lastError = null;
  for (let attempt = 0; attempt <= api.max_retries; attempt++) {
    if (attempt) await sleep(api.retry_backoff_ms * 2 ** (attempt - 1));
    const controller = new AbortController();
    const onAbort = () => controller.abort();
    signal?.addEventListener('abort', onAbort, {once: true});
    const timer = setTimeout(() => controller.abort(), api.timeout_ms);
    const started = Date.now();
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {'content-type': 'application/json', authorization: `Bearer ${key}`},
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      const text = await res.text();
      if (!res.ok) {
        const retriable = res.status === 408 || res.status === 409 || res.status === 429 || res.status >= 500;
        lastError = new ProviderError(`HTTP ${res.status} from ${model.provider}: ${redact(text).slice(0, 600)}`, {status: res.status, retriable});
        if (!retriable) throw lastError;
        continue;
      }
      let payload;
      try { payload = JSON.parse(text); }
      catch { lastError = new ProviderError(`Unparseable response from ${model.provider}: ${redact(text).slice(0, 300)}`, {retriable: true}); continue; }
      const choice = payload.choices?.[0];
      const content = choice?.message?.content;
      if (typeof content !== 'string' || !content.trim()) {
        lastError = new ProviderError(`Empty completion from ${model.provider} (finish_reason=${choice?.finish_reason ?? 'unknown'})`, {retriable: true});
        continue;
      }
      return {
        text: content,
        finish_reason: choice.finish_reason ?? null,
        usage: payload.usage ?? null,
        response_model: payload.model ?? null,
        attempts: attempt + 1,
        latency_ms: Date.now() - started,
      };
    } catch (e) {
      if (e instanceof ProviderError && !e.retriable) throw e;
      const aborted = e.name === 'AbortError';
      lastError = e instanceof ProviderError ? e
        : new ProviderError(aborted ? `Request timed out after ${api.timeout_ms}ms` : `Network error: ${redact(e.message)}`, {retriable: !signal?.aborted});
      if (signal?.aborted) throw lastError;
    } finally {
      clearTimeout(timer);
      signal?.removeEventListener('abort', onAbort);
    }
  }
  throw lastError ?? new ProviderError('Request failed with no further detail');
}

/** A conversation with one slot's model, with token accounting and a full redacted transcript. */
export class Agent {
  constructor({model, api, system}) {
    this.model = model; this.api = api;
    this.messages = system ? [{role: 'system', content: system}] : [];
    this.turns = [];
    this.usage = {prompt_tokens: 0, completion_tokens: 0, total_tokens: 0, requests: 0, retries: 0};
  }
  get transcript() {
    return this.turns.map(t => ({turn: t.turn, label: t.label, prompt: redact(t.prompt), response: redact(t.response),
      usage: t.usage, finish_reason: t.finish_reason, latency_ms: t.latency_ms, attempts: t.attempts, at: t.at}));
  }
  async ask(prompt, {label = null} = {}) {
    this.messages.push({role: 'user', content: prompt});
    const res = await chat({model: this.model, messages: this.messages, api: this.api});
    this.messages.push({role: 'assistant', content: res.text});
    this.usage.requests += 1;
    this.usage.retries += res.attempts - 1;
    for (const k of ['prompt_tokens', 'completion_tokens', 'total_tokens'])
      if (Number.isFinite(res.usage?.[k])) this.usage[k] += res.usage[k];
    this.turns.push({turn: this.turns.length + 1, label, prompt, response: res.text, usage: res.usage ?? null,
      finish_reason: res.finish_reason, latency_ms: res.latency_ms, attempts: res.attempts, at: new Date().toISOString()});
    return res;
  }
  /** Drop the oldest exchanges, keeping the system message, when a long build nears the context limit. */
  trim(keepExchanges = 6) {
    const system = this.messages[0]?.role === 'system' ? [this.messages[0]] : [];
    const rest = this.messages.slice(system.length);
    if (rest.length <= keepExchanges * 2) return false;
    this.messages = [...system, ...rest.slice(-keepExchanges * 2)];
    return true;
  }
}
