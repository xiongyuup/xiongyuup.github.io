CREATE TABLE IF NOT EXISTS historical_counts (
    source TEXT PRIMARY KEY,
    uv INTEGER NOT NULL CHECK (uv >= 0),
    pv INTEGER NOT NULL CHECK (pv >= uv),
    recorded_at TEXT NOT NULL
);

INSERT OR IGNORE INTO historical_counts (source, uv, pv, recorded_at)
VALUES ('ibruce-before-2026-10-06', 19, 45, '2026-10-06');

CREATE TABLE IF NOT EXISTS visitors (
    visitor_key TEXT PRIMARY KEY,
    first_seen TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS page_views (
    event_id TEXT PRIMARY KEY,
    visitor_key TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS counters (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    uv INTEGER NOT NULL DEFAULT 0,
    pv INTEGER NOT NULL DEFAULT 0
);

INSERT OR IGNORE INTO counters (id, uv, pv) VALUES (1, 0, 0);

CREATE TRIGGER IF NOT EXISTS count_new_view
AFTER INSERT ON page_views
BEGIN
    INSERT OR IGNORE INTO visitors (visitor_key, first_seen)
    VALUES (NEW.visitor_key, NEW.created_at);
    UPDATE counters SET uv = uv + changes(), pv = pv + 1 WHERE id = 1;
END;
