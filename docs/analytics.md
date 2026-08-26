# Portfolio Analytics — Self-Hosted, Privacy-First Visitor Analytics

This document covers the portfolio's built-in analytics system: a self-hosted, cookie-free visitor tracker with an admin dashboard. The Next.js frontend sends anonymous events to an Express API, which enriches and stores them in PostgreSQL. No third-party analytics service is involved, and no personally identifiable visitor data is ever stored.

## Quick start (Docker)

1. **Configure environment** (from a clean clone, in the workspace root):

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set at minimum:

   ```bash
   POSTGRES_USER=portfolio_user
   POSTGRES_PASSWORD=a_real_password
   POSTGRES_DB=portfolio
   ADMIN_JWT_SECRET=<output of: openssl rand -hex 32>   # must be ≥ 32 chars
   ANALYTICS_IP_SALT=<output of: openssl rand -hex 32>  # must be ≥ 32 chars
   TRUST_PROXY=1                                        # only if behind a reverse proxy
   ```

2. **Start the stack:**

   ```bash
   docker compose up --build -d
   ```

   What happens automatically:
   - The `db` service (PostgreSQL 16) starts with a healthcheck; data persists in the `postgres_data` volume.
   - The `backend` service waits until the database is healthy, then **runs all pending migrations** from `backend/drizzle/` at boot (the server exits if migration fails).
   - If `ADMIN_EMAIL` **and** `ADMIN_PASSWORD` are set (root `.env`), the backend **upserts the admin user at startup** — no manual command needed. The seed is idempotent: re-running with the same email updates the password hash. Leave both unset to disable admin login entirely.
   - The `frontend` service starts once the backend is healthy.

3. **Verify:**
   - Frontend: http://localhost:3000
   - Backend health: http://localhost:4000/api/health → `{"status":"ok",...}`
   - Dashboard: http://localhost:3000/admin/analytics → redirects to login → sign in with the seeded credentials.

> **Docker networking caveat:** `docker-compose.yml` sets `NEXT_PUBLIC_API_URL=http://backend:4000/api` as a *runtime* environment variable, but Next.js inlines `NEXT_PUBLIC_*` values into the client bundle at *build* time. In practice the browser-side tracker and dashboard fall back to the baked-in default `http://localhost:4000/api`. That works when you browse from the same machine that runs Docker (port 4000 is published). For remote access, rebuild the frontend with the browser-reachable API URL as a build argument.

## Local development without Docker

The frontend and backend can run directly with Node 22+, but **you must provide a local PostgreSQL 16 instance yourself** — there is no bundled database outside Docker.

```bash
# 1. Backend
cd backend
cp .env.example .env
# Edit backend/.env: DATABASE_URL must point at your local Postgres,
# e.g. postgresql://portfolio_user:password@localhost:5432/portfolio
npm install
npm run db:migrate        # apply migrations
npm run db:seed           # create/update the admin user (reads ADMIN_EMAIL / ADMIN_PASSWORD)
npm run dev               # http://localhost:4000

# 2. Frontend (separate terminal)
cd frontend
cp .env.example .env.local
npm install
npm run dev               # http://localhost:3000
```

> `DATABASE_URL` in `backend/.env` is what the backend uses **outside Docker**. Inside `docker compose`, it is constructed from the `POSTGRES_*` variables in the root `.env` (host `db`), and the value in `backend/.env` is ignored.

Other backend scripts:

| Script | What it does |
|--------|--------------|
| `npm run db:generate` | Generates a new SQL migration in `backend/drizzle/` from changes to `src/db/schema.ts` (drizzle-kit, reads `DATABASE_URL` from `backend/.env`) |
| `npm run db:migrate` | Applies pending migrations from `backend/drizzle/` to the database |
| `npm run db:seed` | Creates or updates the admin user from `ADMIN_EMAIL` / `ADMIN_PASSWORD` |
| `npm run test` | Runs the backend test suite (vitest) |

## Architecture

```text
┌─────────────────────┐   fire-and-forget POST /api/analytics/events    ┌──────────────────────┐        ┌───────────────┐
│  Next.js frontend   │ ─────────────────────────────────────────────▶ │  Express API (TS)    │ ─────▶ │ PostgreSQL 16 │
│  localhost:3000     │   anonymous UUID visitor/session ids           │  localhost:4000      │  drizzle │  (service db) │
│                     │                                                │  zod validation       │        │               │
│  /admin/analytics   │   GET /api/admin/analytics/* (cookie auth)     │  server-side          │        │ analytics_    │
│  /admin/login       │ ◀───────────────────────────────────────────── │  enrichment + SQL     │        │ events,       │
│                     │                                                │  aggregation          │        │ admin_users   │
└─────────────────────┘                                                └──────────────────────┘        └───────────────┘
```

| Concern | Where it lives |
|---------|----------------|
| Event emission (fire-and-forget, deduped) | `frontend/src/lib/analytics/{tracker,session,events}.ts` + small components (`route-view-tracker`, `project-view-tracker`, `tracked-anchor`) |
| Ingestion validation (zod, strict) | `backend/src/schemas/analytics.ts`, `backend/src/routes/analytics/events.ts` |
| Server-side enrichment (IP hash, geo, UA, referrer) | `backend/src/services/analytics-enrichment.ts` — client-supplied values are never trusted for these fields |
| Aggregation (SQL: `date_trunc`, `count`, `group by`) | `backend/src/services/analytics-stats.ts` — never fetched and aggregated in JS |
| Admin auth (JWT cookie) | `backend/src/routes/admin/auth.ts`, `backend/src/services/admin-auth.ts`, `backend/src/middleware/require-admin.ts` |
| Dashboard UI (custom SVG charts) | `frontend/src/app/admin/**`, `frontend/src/lib/admin/api.ts` |

Deployment topology (Docker Compose): `frontend` (port 3000) depends on a healthy `backend` (port 4000), which depends on a healthy `db` (PostgreSQL 16-alpine, `pg_isready` healthcheck, persistent `postgres_data` volume).

> **Reverse proxy deployments:** by default the backend treats `X-Forwarded-For` as untrusted (it is client-spoofable) and derives the client IP from the socket address. If you put the backend behind a reverse proxy, set `TRUST_PROXY` (to `1`, `true`, or your proxy hop count) — otherwise every visitor appears to come from the proxy IP: geo lookups degrade, all visitors share one 120 req/5 min ingestion bucket, and the admin login limiter would let a single attacker lock out the real admin.

## Environment variables

### Root `.env` — read by `docker compose`

| Variable | Used by | Required | Example | Purpose |
|----------|---------|----------|---------|---------|
| `POSTGRES_USER` | `db` service + backend `DATABASE_URL` | Yes | `portfolio_user` | PostgreSQL superuser name |
| `POSTGRES_PASSWORD` | `db` service + backend `DATABASE_URL` | Yes | *(strong password)* | PostgreSQL password |
| `POSTGRES_DB` | `db` service + backend `DATABASE_URL` | Yes | `portfolio` | Database name |
| `ADMIN_JWT_SECRET` | backend | Yes (min 32 chars) | `openssl rand -hex 32` output | HS256 signing key for admin session JWTs |
| `ANALYTICS_IP_SALT` | backend | Yes (min 32 chars) | `openssl rand -hex 32` output | Salt for the visitor IP hash (see [Privacy](#privacy)) |
| `TRUST_PROXY` | backend | No (default: off) | `1` \| `true` \| *(hop count, e.g. `1`)* | Enables Express `trust proxy`. **Set it when the backend runs behind a reverse proxy** (nginx, Traefik, a cloud LB…) so `req.ip`, geo, the IP hash, and all rate-limit buckets use the real client IP from `X-Forwarded-For`. Leave unset/empty when the backend port is exposed directly — then `X-Forwarded-For` is ignored (unspoofable) and `req.ip` is the socket address. A hop count (e.g. `1` for a single proxy) is more precise than `true`. |
| `COOKIE_SAMESITE` | backend | No (default `strict`) | `strict` \| `lax` \| `none` | `SameSite` attribute of the admin session cookie |
| `SESSION_TTL_HOURS` | backend | No (default `24`) | `24` | Admin session lifetime (JWT expiry + cookie `maxAge`) |
| `RESEND_API_KEY` | backend (contact form) | Yes | `re_...` | Pre-existing; contact form email |
| `GITHUB_TOKEN` | GitHub data fetching | No | `ghp_...` | Pre-existing; raises GitHub API rate limits |
| `NEXT_PUBLIC_API_URL` | frontend container | No | `http://backend:4000/api` | See the Docker networking caveat in [Quick start](#quick-start-docker) |

### Backend `backend/.env` — local dev, migrations, seed

| Variable | Required | Default | Purpose |
|----------|----------|---------|---------|
| `DATABASE_URL` | Yes* | `postgresql://postgres:postgres@localhost:5432/portfolio` | Postgres connection string. *Required outside Docker; ignored inside compose (built from `POSTGRES_*` above). Also used by `db:generate`. |
| `PORT` | No | `4000` | API listen port |
| `NODE_ENV` | No | `development` | `production` enables the `Secure` cookie flag |
| `CORS_ORIGIN` | No | `http://localhost:3000` | The single allowed cross-origin (credentials are enabled) |
| `ADMIN_JWT_SECRET` | Yes (min 32 chars) | — | See root table |
| `ANALYTICS_IP_SALT` | Yes (min 32 chars) | — | See root table |
| `TRUST_PROXY` | No | *(unset = off)* | See root table — set when running behind a reverse proxy |
| `COOKIE_SAMESITE` | No | `strict` | See root table |
| `SESSION_TTL_HOURS` | No | `24` | See root table |
| `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_TO` | See `.env.example` | — | Pre-existing contact form settings |

### Seed-time only — `backend/.env` (or passed inline with `-e`)

| Variable | Required | Validation | Purpose |
|----------|----------|------------|---------|
| `ADMIN_EMAIL` | Yes (only when seeding/auto-seeding) | valid email | Email of the admin user. When set with `ADMIN_PASSWORD`, the backend upserts the admin at startup |
| `ADMIN_PASSWORD` | Yes (only when seeding) | min 8 characters | Admin password; hashed with bcrypt (cost 12) and never logged |

### Frontend `frontend/.env.local`

| Variable | Required | Default | Purpose |
|----------|----------|---------|---------|
| `NEXT_PUBLIC_API_URL` | No | `http://localhost:4000/api` | Browser-reachable API base URL used by the analytics tracker and admin dashboard. Inlined at **build** time. |

## Database

### `analytics_events` — one row per ingested event

| Column | Type | Nullable | Why it exists |
|--------|------|----------|---------------|
| `id` | `uuid` PK, default `gen_random_uuid()` | No | Row identity without any sequential leak |
| `event_type` | `varchar(50)` | No | Which of the 6 whitelisted events this is |
| `visitor_id` | `varchar(36)` | No | Anonymous random UUID from the visitor's localStorage — powers `uniqueVisitors` |
| `session_id` | `varchar(36)` | No | Anonymous random UUID per browser tab — powers the `sessions` metric |
| `page` | `varchar(512)` | Yes | Path only (query string/fragment stripped server-side); required for `page_view` / `project_view`, null otherwise |
| `referrer` | `varchar(255)` | Yes | **Hostname only** of the `Referer` header (never the full URL) |
| `device_type` | `varchar(20)` | Yes | Normalized `desktop` / `mobile` / `tablet` / `other` from the User-Agent |
| `browser` | `varchar(50)` | Yes | Normalized browser name (e.g. `Chrome`), max 50 chars |
| `os` | `varchar(50)` | Yes | Normalized OS name (e.g. `Windows`), max 50 chars |
| `country` | `varchar(2)` | Yes | Approximate ISO country code from geoip-lite |
| `region` | `varchar(100)` | Yes | Approximate region name |
| `city` | `varchar(100)` | Yes | Approximate city name |
| `ip_hash` | `varchar(64)` | Yes | Salted SHA-256 of the client IP; **null** for private/local IPs. Raw IPs are never stored |
| `metadata` | `jsonb` | Yes | Whitelisted, validated key-value pairs (e.g. `{ "slug": "my-project" }`) |
| `created_at` | `timestamptz`, default `now()` | No | Server-side timestamp (client clocks are never trusted) |

Indexes:

| Index | Why it exists |
|-------|---------------|
| `analytics_events_created_at_idx` | Every stats query filters on a `from`/`to` range |
| `analytics_events_event_type_idx` | `eventType` filter and per-event counts |
| `analytics_events_visitor_id_idx` | `count(distinct visitor_id)` aggregations |
| `analytics_events_session_id_idx` | `count(distinct session_id)` aggregations |
| `analytics_events_event_type_created_at_idx` | Combined `eventType` + time-range queries (the most common dashboard shape) |

### `admin_users` — dashboard login accounts

| Column | Type | Notes |
|--------|------|-------|
| `id` | `serial` PK | Becomes the JWT `sub` claim |
| `email` | `varchar(255)`, `NOT NULL`, `UNIQUE` | Login identifier (lowercased on insert/login) |
| `password_hash` | `varchar(255)`, `NOT NULL` | bcrypt hash, cost 12 |
| `role` | `varchar(20)`, default `'admin'` | Placeholder for future multi-role support |
| `created_at` / `updated_at` | `timestamptz`, default `now()` | `updated_at` bumps on password change (re-seed) |

### Migration workflow

1. **Automatic at boot:** the backend runs `runMigrations()` (drizzle-orm migrator) against `backend/drizzle/` on every start and exits the process if a migration fails — so Docker/CI crashes loudly instead of serving a stale schema.
2. **Manual:** `cd backend && npm run db:migrate` (same migrator, standalone).
3. **New migrations:** edit `backend/src/db/schema.ts`, then `npm run db:generate` — drizzle-kit diffs the schema and writes a new numbered SQL file into `backend/drizzle/`. Commit that file; it is applied automatically on next boot.

## Admin setup

- **Seeding:** automatic at backend startup whenever `ADMIN_EMAIL` + `ADMIN_PASSWORD` are set (see [Quick start](#quick-start-docker)). A manual path still exists via `npm run db:seed` (local dev).
- **Changing credentials:** update `ADMIN_PASSWORD` in `.env` and restart/redeploy the backend — startup re-seeding updates the stored bcrypt hash (idempotent). A different `ADMIN_EMAIL` creates a second admin account.
- **How sessions work:** on successful login the backend signs an HS256 JWT (`sub` = admin id, `exp` = `SESSION_TTL_HOURS`) with `ADMIN_JWT_SECRET` and sets it as the `admin_session` cookie: `httpOnly`, `sameSite` from `COOKIE_SAMESITE`, `secure` in production, `path=/`, `maxAge` = `SESSION_TTL_HOURS`. Every admin request re-verifies the JWT **and** confirms the admin still exists in the database — deleting an admin user immediately invalidates their outstanding tokens.

## Event catalog

| Event | When it fires in the UI | Allowed metadata keys |
|-------|------------------------|----------------------|
| `page_view` | Every route change, via `RouteViewTracker` (all pages). Requires `page`. | *(none)* |
| `project_view` | Landing on `/projects/[slug]`. Requires `page` (`/projects/{slug}`). | `slug` |
| `github_click` | GitHub links: hero CTA (`source: "hero"`), footer (`source: "footer"`), project card repo link (`project: <slug>`), GitHub section fallback (`source: "github-section"`), contact section (`source: "contact"`). | `source`, `project` |
| `linkedin_click` | LinkedIn links: hero (`source: "hero"`), footer (`source: "footer"`), contact section (`source: "contact"`). | `source` |
| `cv_download` | CV download button in the hero (`lang: <locale>`). | `lang` |
| `contact_submit` | Contact form submission. | *(none)* |

Behavior of the tracker (`frontend/src/lib/analytics/tracker.ts`): fire-and-forget `fetch` with `keepalive` and `credentials: "omit"` — never blocks navigation, all errors swallowed; identical event+page pairs within a 1.5 s window are deduped (protects against React strict-mode double effects and double clicks); query strings/fragments are stripped from paths. `visitorId` is a random UUID v4 in localStorage with a 1-year rolling expiry; `sessionId` is a random UUID v4 in sessionStorage (per tab). Storage-restricted browsers fall back to in-memory ids — tracking never breaks the UX.

## API reference

All endpoints are served by the Express backend (default `http://localhost:4000`). Error envelope for all failures: `{ "success": false, "error": "...", "fieldErrors"?: { [field]: string[] } }`.

### `POST /api/analytics/events` — public ingestion

Rate limit: **120 requests / 5 min / IP**. Request body limit: **10 KB**.

Body (strict — unknown top-level keys are rejected):

| Field | Type | Rules |
|-------|------|-------|
| `event` | string | One of the 6 event types above |
| `sessionId` | string | UUID **v4** exactly |
| `visitorId` | string | UUID **v4** exactly |
| `page` | string | Optional. Required for `page_view` / `project_view`. Query string and fragment are stripped, then must match `^\/[A-Za-z0-9\-._~\/]{0,180}$` |
| `metadata` | object | Optional. Max **5** keys, keys whitelisted per event (see catalog), values max **100** chars matching `^[A-Za-z0-9\-._~:@ \/]{0,100}$` |

The server enriches the row with IP hash, geo, device/browser/OS, referrer hostname, and the timestamp — client-supplied values are never used for those fields.

```bash
curl -X POST http://localhost:4000/api/analytics/events \
  -H "Content-Type: application/json" \
  -d '{
    "event": "project_view",
    "visitorId": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    "sessionId": "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
    "page": "/projects/portfolio",
    "metadata": { "slug": "portfolio" }
  }'
```

```json
// 200 OK
{ "success": true }

// 400 Bad Request (validation)
{ "success": false, "error": "Validation failed", "fieldErrors": { "event": ["Invalid enum value..."] } }

// 429 Too Many Requests
{ "success": false, "error": "Too many requests" }
```

### `POST /api/admin/auth/login` — public, rate-limited

Rate limit: **5 attempts / 15 min / IP** (brute-force protection). Body: `{ "email": string (valid email), "password": string (min 1) }`. Failures always return the same generic `401 "Invalid credentials"` regardless of whether the email exists (a dummy bcrypt hash is compared for unknown emails so timing does not leak account existence).

```bash
curl -c cookies.txt -X POST http://localhost:4000/api/admin/auth/login \
  -H "Content-Type: application/json" \
  -d '{ "email": "admin@example.com", "password": "your_admin_password" }'
# → { "success": true }   (sets the httpOnly admin_session cookie)
```

### `POST /api/admin/auth/logout` — public

Clears the `admin_session` cookie. → `{ "success": true }`.

### `GET /api/admin/auth/me` — requires admin cookie

→ `{ "success": true, "admin": { "email": "admin@example.com", "role": "admin" } }` or `401 Unauthorized`.

### `GET /api/admin/analytics/*` — requires admin cookie

Seven endpoints, all sharing the same query parameters (strict — unknown params are rejected):

| Param | Rules |
|-------|-------|
| `from` | Optional. ISO datetime with offset (e.g. `2026-01-01T00:00:00.000Z`). Default: `to` minus 30 days |
| `to` | Optional. ISO datetime with offset. Default: now. Must be ≥ `from`; max range **366 days** |
| `eventType` | Optional. One of the 6 event types |
| `page` | Optional. Exact path match (same regex as ingestion) |
| `granularity` | Optional. `day` (default) \| `week` \| `month` — affects `/timeseries` bucketing only |

| Endpoint | Response `data` |
|----------|-----------------|
| `/api/admin/analytics/overview` | `{ pageViews, uniqueVisitors, sessions, events }` |
| `/api/admin/analytics/timeseries` | `[{ bucket, events, pageViews, uniqueVisitors, sessions }]` — UTC buckets via `date_trunc` |
| `/api/admin/analytics/pages` | `[{ page, pageViews, uniqueVisitors }]` — `page_view` events only, top 20 by page views |
| `/api/admin/analytics/events` | `[{ eventType, count }]` — sorted by count desc |
| `/api/admin/analytics/geography` | `[{ country, region, uniqueVisitors, events }]` — country/region may be `null` (unknown IP) |
| `/api/admin/analytics/referrers` | `[{ referrer, events, uniqueVisitors }]` — events with no `Referer` are grouped under `"direct"` |
| `/api/admin/analytics/devices` | `{ devices: [{ deviceType, count }], browsers: [{ browser, count }], operatingSystems: [{ os, count }] }` — nulls become `"unknown"` |

```bash
curl -b cookies.txt \
  "http://localhost:4000/api/admin/analytics/overview?from=2026-07-01T00:00:00.000Z&to=2026-08-01T00:00:00.000Z"
```

```json
{
  "success": true,
  "data": { "pageViews": 142, "uniqueVisitors": 61, "sessions": 74, "events": 230 }
}
```

## Dashboard

- **URL:** `/admin/analytics` — unauthenticated visitors (or expired sessions) are redirected to `/admin/login`.
- **Login:** email + password form; too many attempts (429) shows a "try again in a few minutes" message.
- **Date filters:** presets *Today / Last 7 days / Last 30 days / Last 90 days / Custom* (custom shows two date inputs; invalid ranges block the fetch). All seven API endpoints are re-fetched in parallel whenever the range or granularity changes.
- **Granularity:** *Day / Week / Month* buttons on the traffic chart.
- **Sections:** four overview cards (Visitors, Sessions, Page views, Events) → *Traffic over time* (custom SVG timeseries chart) → *Top pages* (table) → *Events* (bar list per type) → *Geography* (visitors by country/region) → *Referrers* (events by source, `"direct"` for none) → *Devices* (device type / browsers / operating systems side by side). A Refresh button re-fetches; Log out clears the session.

The dashboard UI is English-only by design; it lives under `/admin/*` and is excluded from the public site's localization.

## Privacy

### What we store

| Data | Form |
|------|------|
| Event type | One of 6 whitelisted names |
| Anonymous ids | Random UUID v4 `visitorId` (localStorage, 1-year rolling expiry) and `sessionId` (sessionStorage, per tab) — no cookies are set for visitors |
| Page path | Path only — query strings and fragments are stripped |
| Referrer | Hostname only |
| Device / browser / OS | Normalized, truncated labels parsed server-side from the User-Agent |
| Geo | Approximate country / region / city from geoip-lite |
| IP hash | Salted SHA-256 of the IP (see below), null for private IPs |
| Metadata | Small whitelisted key-value pairs validated by zod |
| Timestamp | Server clock (`created_at`) |

### What we NEVER store

- Raw IP addresses
- Visitor names, emails, or any personal identifiers
- Precise/GPS location
- Browser fingerprints
- Contact form content (the `contact_submit` event carries **no** metadata)
- The full User-Agent string
- The full referrer URL

**Why the IP hash exists:** unique-visitor counting already uses the random `visitorId`, so the salted SHA-256 hash is only a secondary, approximate way to correlate activity from the same network address (e.g. rough deduplication across cleared storage). It is one-way and salted with `ANALYTICS_IP_SALT` — it cannot be reversed into an IP without the salt, and it is stored as `null` for private/local addresses.

**Geo is approximate:** locations come from geoip-lite's bundled offline database and are coarse country/region/city guesses — never precise coordinates.

## Security measures

| Measure | Detail |
|---------|--------|
| Strict input validation | zod `.strict()` schemas reject unknown top-level fields, unknown metadata keys, non-v4 UUIDs, bad paths, and metadata values outside a safe URL-safe character class |
| Request body cap | `express.json({ limit: "10kb" })` |
| Rate limits | Events ingestion: 120 req / 5 min / IP. Admin login: 5 attempts / 15 min / IP. (Contact form: 3 / 15 min, pre-existing.) All return a generic `429` JSON |
| Password hashing | bcrypt, cost 12 (`bcryptjs`) |
| Session tokens | `jose` HS256 JWT in an `httpOnly` cookie (`admin_session`), `SameSite` from `COOKIE_SAMESITE`, `Secure` in production; every request re-checks the admin still exists in the DB |
| Generic auth errors | Unknown email and wrong password return the identical `401 "Invalid credentials"`; a dummy hash is compared for unknown emails so timing does not reveal account existence |
| Brute-force lockout | The login rate limiter blocks an IP after 5 failed attempts for 15 minutes |
| CORS | Single origin (`CORS_ORIGIN`) with `credentials: true` — required for the cross-origin admin cookie, and narrow by construction |
| No secrets in the frontend | Only `NEXT_PUBLIC_API_URL` is exposed client-side; JWT secret, IP salt, and DB credentials stay server-side |
| SQL safety | All queries (ingestion and aggregation) go through drizzle-orm with parameterized values |
| Error hygiene | Unexpected errors are logged server-side only; clients get a generic message — `400 "Bad request"` for malformed JSON, `413 "Payload too large"` over the body cap, `500 "Internal server error"` for anything else. No SQL or stack leaks |

### Known limitations (be aware of these)

- **`X-Forwarded-For` trust is explicit:** the client IP always comes from `req.ip`. Without `TRUST_PROXY`, Express ignores `X-Forwarded-For` (a spoofed header cannot affect geo, the IP hash, or rate-limit keys) — but the backend must then not sit behind a proxy, or all visitors share the proxy's rate-limit buckets. With `TRUST_PROXY` set, Express resolves `X-Forwarded-For` up to the configured hop count; set it to the exact number of trusted proxy hops rather than `true` when you can.
- **geoip-lite is static:** the geo database ships inside the npm package and only updates when the dependency is updated. Lookups can be stale or wrong, and unknown/private IPs produce `null` geo fields.
- **In-memory rate limiting:** counters live in the Node process — they reset on restart and are not shared across multiple backend replicas.
- **IP hash is not anonymity against the salt holder:** anyone who knows `ANALYTICS_IP_SALT` and a candidate IP can compute and match hashes. Rotating the salt periodically is safe for stats (unique visitors use `visitorId`, not `ip_hash`) but breaks comparing hashes across rotation periods.
- **User-Agent is client-controlled:** device/browser/OS labels are best-effort parsing of a spoofable header.
- **No retention policy:** `analytics_events` rows are never automatically purged. Add a scheduled cleanup if the table growth matters to you.
- **Visitors can reset their identity:** clearing localStorage mints a new `visitorId`; private-browsing falls back to per-page-load in-memory ids.

## Checklist

- [ ] `docker compose up --build -d` brings up db → backend (migrations applied) → frontend
- [x] Admin seeded automatically at backend startup when `ADMIN_EMAIL` / `ADMIN_PASSWORD` are set
- [ ] `POST /api/analytics/events` returns `{ "success": true }` for a valid payload and `400` with `fieldErrors` for an invalid one
- [ ] `/admin/analytics` redirects to login without a session and shows data after login
- [ ] No raw IPs, full user agents, or full referrer URLs anywhere in `analytics_events`

## Next step

Browse the site, then open the [dashboard](http://localhost:3000/admin/analytics) — events should appear within seconds. For deeper changes, start from `backend/src/db/schema.ts` (schema) and `backend/src/schemas/analytics.ts` (the event whitelist both sides mirror).
