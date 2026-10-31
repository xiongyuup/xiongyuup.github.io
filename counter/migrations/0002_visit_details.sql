CREATE TABLE IF NOT EXISTS visit_details (
    event_id TEXT PRIMARY KEY,
    created_at TEXT NOT NULL,
    ip_mask TEXT NOT NULL,
    device TEXT NOT NULL,
    os TEXT NOT NULL,
    browser TEXT NOT NULL,
    country TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS visit_details_time ON visit_details(created_at DESC, event_id DESC);
