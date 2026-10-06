const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const TOTALS_SQL = `SELECT
    counters.uv + COALESCE((SELECT SUM(uv) FROM historical_counts), 0) AS uv,
    counters.pv + COALESCE((SELECT SUM(pv) FROM historical_counts), 0) AS pv
    FROM counters WHERE id = 1`;

function response(body, status, origin) {
    return new Response(body === null ? null : JSON.stringify(body), {
        status,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "no-store",
            "Vary": "Origin",
            ...(origin ? {
                "Access-Control-Allow-Origin": origin,
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type"
            } : {})
        }
    });
}

async function hashVisitor(identifier) {
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(identifier.toLowerCase()));
    return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export default {
    async fetch(request, env) {
        const path = new URL(request.url).pathname;
        const origin = request.headers.get("Origin");
        if (origin && origin !== env.SITE_ORIGIN) return response({ error: "Origin not allowed" }, 403);
        const cors = origin === env.SITE_ORIGIN ? origin : null;
        if (!env.DB) return response({ error: "Database unavailable" }, 503, cors);
        if (path !== "/stats" && path !== "/visit") return response({ error: "Not found" }, 404, cors);
        if (request.method === "OPTIONS") return response(null, 204, cors);
        if (request.method !== "GET" && request.method !== "POST") return response({ error: "Method not allowed" }, 405, cors);
        if ((path === "/stats" && request.method !== "GET") || (path === "/visit" && request.method !== "POST")) {
            return response({ error: "Method not allowed" }, 405, cors);
        }

        try {
            if (path === "/stats") {
                const totals = await env.DB.prepare(TOTALS_SQL).first();
                return response({ ...totals, includesHistory: true }, 200, cors);
            }
            if (!cors) return response({ error: "Origin required" }, 403);
            if (request.headers.get("Content-Type")?.split(";")[0].trim() !== "application/json") {
                return response({ error: "JSON required" }, 415, cors);
            }
            if (Number(request.headers.get("Content-Length")) > 1024) return response({ error: "Request too large" }, 413, cors);
            const text = await request.text();
            if (new TextEncoder().encode(text).length > 1024) return response({ error: "Request too large" }, 413, cors);
            let body;
            try {
                body = JSON.parse(text);
            } catch {
                return response({ error: "Invalid JSON" }, 400, cors);
            }
            if (!UUID.test(body?.eventId) || !UUID.test(body?.visitorId)) {
                return response({ error: "Invalid visit identifier" }, 400, cors);
            }
            const visitorKey = await hashVisitor(body.visitorId);
            // The insert, trigger and returned totals share one transaction; retrying an event is harmless.
            const results = await env.DB.batch([
                env.DB.prepare("INSERT OR IGNORE INTO page_views (event_id, visitor_key, created_at) VALUES (?, ?, ?)")
                    .bind(body.eventId.toLowerCase(), visitorKey, new Date().toISOString()),
                env.DB.prepare(TOTALS_SQL)
            ]);
            return response({ ...results[1].results[0], includesHistory: true }, 200, cors);
        } catch {
            return response({ error: "Statistics temporarily unavailable" }, 503, cors);
        }
    }
};
