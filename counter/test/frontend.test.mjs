import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { webcrypto } from "node:crypto";
import vm from "node:vm";

const source = readFileSync(new URL("../../index.html", import.meta.url), "utf8").match(/<script>\s*([\s\S]*?)<\/script>/)[1];
const flush = () => new Promise((resolve) => setImmediate(resolve));

function page({ api = "", cached, fetchImpl, storageBlocked = false }) {
    const nodes = new Map();
    const storage = new Map(cached || []);
    const requests = [];
    const node = (id) => {
        if (!nodes.has(id)) nodes.set(id, {
            textContent: "", innerHTML: "", hidden: false, attrs: {}, handlers: {},
            setAttribute(key, value) { this.attrs[key] = value; },
            addEventListener(key, callback) { this.handlers[key] = callback; }
        });
        return nodes.get(id);
    };
    const context = vm.createContext({
        document: { documentElement: {}, getElementById: node, querySelector: () => null, querySelectorAll: () => [] },
        window: {
            location: new URL("https://xiongyuup.github.io/?query=1#publications"),
            matchMedia: () => ({ matches: false }), setTimeout, clearTimeout,
            localStorage: {
                getItem(key) { if (storageBlocked) throw new Error("Blocked"); return storage.get(key) || null; },
                setItem(key, value) { if (storageBlocked) throw new Error("Blocked"); storage.set(key, value); }
            }
        },
        crypto: webcrypto, URL, Intl, AbortController, Date,
        fetch: async (url, options) => { requests.push({ url, options }); return fetchImpl(url, options); }
    });
    vm.runInContext(source.replace('const visitorApi = "";', `const visitorApi = ${JSON.stringify(api)};`), context);
    return { node, requests, storage, context };
}

test("owned totals include history once; retries reuse identifiers and language does not recount", async () => {
    let failed = true;
    const result = page({ api: "https://counter.example", fetchImpl: async () => {
        if (failed) throw new Error("Network error");
        return { ok: true, json: async () => ({ uv: 25, pv: 62, includesHistory: true }) };
    } });
    await flush();
    assert.equal(result.node("visitorRetry").hidden, false);
    failed = false;
    await result.node("visitorRetry").handlers.click();
    assert.equal(result.node("visitorUvValue").textContent, "25");
    assert.equal(result.node("visitorPvValue").textContent, "62");
    assert.equal(result.requests[0].options.body, result.requests[1].options.body);
    assert.equal(result.requests[1].url, "https://counter.example/visit");
    assert.equal(result.requests[1].options.headers["Content-Type"], "application/json");
    assert.ok(result.storage.get("homepage-visitor-id:v1"));
    vm.runInContext('setLanguage("zh")', result.context);
    assert.equal(result.requests.length, 2);
    assert.equal(result.node("visitorPvValue").textContent, "62");
});

test("current provider still adds history and canonicalizes page URL", async () => {
    const result = page({ fetchImpl: async () => ({ ok: true, json: async () => ({ busuanzi_site_uv: 4, busuanzi_site_pv: 11 }) }) });
    await flush();
    assert.equal(result.node("visitorUvValue").textContent, "23");
    assert.equal(result.node("visitorPvValue").textContent, "56");
    assert.equal(JSON.parse(result.requests[0].options.body).url, "https://xiongyuup.github.io/");
});

test("D1 keeps cached totals on outage and works without browser storage", async () => {
    const api = "https://counter.example";
    const offline = page({ api, cached: [[`visitor-counts:d1:${api}`, JSON.stringify({ uv: 30, pv: 80 })]], fetchImpl: async () => { throw new Error("Offline"); } });
    await flush();
    assert.equal(offline.node("visitorPvValue").textContent, "80");
    assert.equal(offline.node("visitorNote").textContent, "Last recorded totals");
    const blocked = page({ api, storageBlocked: true, fetchImpl: async () => ({ ok: true, json: async () => ({ uv: 31, pv: 81, includesHistory: true }) }) });
    await flush();
    assert.equal(blocked.node("visitorPvValue").textContent, "81");
});
