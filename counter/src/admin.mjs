import Bowser from "bowser";
import adminHtml from "./admin-page.mjs";

export function maskedIp(ip = "") {
    if (/^(?:\d{1,3}\.){3}\d{1,3}$/.test(ip) && ip.split(".").every(n => Number(n) <= 255)) {
        return ip.split(".").slice(0, 3).join(".") + ".0/24";
    }
    try {
        if (!ip.includes(":")) return "Unknown";
        const normalized = new URL(`http://[${ip}]/`).hostname.slice(1, -1);
        const [left, right] = normalized.split("::");
        const start = left ? left.split(":") : [];
        const end = right ? right.split(":") : [];
        const groups = normalized.includes("::") ? [...start, ...Array(8 - start.length - end.length).fill("0"), ...end] : start;
        return groups.slice(0, 3).join(":") + "::/48";
    } catch { return "Unknown"; }
}

export function visitDetails(request) {
    const parsed = Bowser.parse((request.headers.get("User-Agent") || "Unknown").slice(0, 1024));
    return {
        ip: maskedIp(request.headers.get("CF-Connecting-IP") || ""),
        device: parsed.platform.type || "unknown",
        os: parsed.os.name || "Unknown",
        browser: parsed.browser.name || "Unknown",
        country: /^[A-Z]{2}$/.test(request.cf?.country || "") ? request.cf.country : "Unknown"
    };
}

export async function tokenMatches(supplied, expected) {
    if (!expected || expected.length < 32 || supplied.length > 256) return false;
    const encode = value => new TextEncoder().encode(value);
    const a = new Uint8Array(await crypto.subtle.digest("SHA-256", encode(supplied)));
    const b = new Uint8Array(await crypto.subtle.digest("SHA-256", encode(expected)));
    let diff = 0;
    for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
    return diff === 0;
}

export async function adminResponse(request, env) {
    const url = new URL(request.url);
    const headers = {
        "Cache-Control": "no-store", "Referrer-Policy": "no-referrer",
        "X-Content-Type-Options": "nosniff", "X-Frame-Options": "DENY",
        "X-Robots-Tag": "noindex, nofollow"
    };
    const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { ...headers, "Content-Type": "application/json; charset=utf-8" } });
    if (request.method !== "GET") return json({ error: "Method not allowed" }, 405);
    if (url.pathname === "/admin" || url.pathname === "/admin/") {
        const nonce = crypto.randomUUID().replaceAll("-", "");
        return new Response(adminHtml.replaceAll("__NONCE__", nonce), { headers: {
            ...headers, "Content-Type": "text/html; charset=utf-8",
            "Content-Security-Policy": `default-src 'none'; script-src 'nonce-${nonce}'; style-src 'nonce-${nonce}'; connect-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'`
        } });
    }
    if (url.pathname !== "/admin/api") return json({ error: "Not found" }, 404);
    if (!env.ADMIN_TOKEN) return json({ error: "Admin not configured" }, 503);
    if (request.headers.get("Origin") && request.headers.get("Origin") !== url.origin) return json({ error: "Origin not allowed" }, 403);
    const bearer = request.headers.get("Authorization") || "";
    if (!bearer.startsWith("Bearer ") || !await tokenMatches(bearer.slice(7), env.ADMIN_TOKEN)) return json({ error: "Unauthorized" }, 401);
    const days = Number(url.searchParams.get("days") || 7);
    const page = Number(url.searchParams.get("page") || 0);
    if (![1, 7, 30].includes(days) || !Number.isSafeInteger(page) || page < 0 || page > 10000) return json({ error: "Invalid filters" }, 400);
    const since = new Date(Date.now() - days * 86400000).toISOString();
    try {
        const result = await env.DB.batch([
            env.DB.prepare("SELECT counters.uv + COALESCE((SELECT SUM(uv) FROM historical_counts),0) AS uv, counters.pv + COALESCE((SELECT SUM(pv) FROM historical_counts),0) AS pv FROM counters WHERE id=1"),
            env.DB.prepare("SELECT COUNT(*) AS count FROM visit_details WHERE created_at >= ?").bind(since),
            env.DB.prepare("SELECT created_at, ip_mask, device, os, browser, country FROM visit_details WHERE created_at >= ? ORDER BY created_at DESC, event_id DESC LIMIT 50 OFFSET ?").bind(since, page * 50),
            env.DB.prepare("SELECT device, COUNT(*) AS count FROM visit_details WHERE created_at >= ? GROUP BY device ORDER BY count DESC").bind(since)
        ]);
        return json({ totals: result[0].results[0], count: result[1].results[0].count, rows: result[2].results, devices: result[3].results, page, days });
    } catch { return json({ error: "Dashboard temporarily unavailable" }, 503); }
}

export async function purgeDetails(env) {
    await env.DB.prepare("DELETE FROM visit_details WHERE created_at < ?").bind(new Date(Date.now() - 30 * 86400000).toISOString()).run();
}
