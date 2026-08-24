import {
  index,
  jsonb,
  pgTable,
  serial,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * Public analytics events ingested via POST /api/analytics/events.
 * Privacy rules: raw IPs are never stored (only a salted SHA-256 hash),
 * referrer is stored as hostname only, and geo fields are approximate.
 */
export const analyticsEvents = pgTable(
  "analytics_events",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    eventType: varchar("event_type", { length: 50 }).notNull(),
    visitorId: varchar("visitor_id", { length: 36 }).notNull(),
    sessionId: varchar("session_id", { length: 36 }).notNull(),
    page: varchar("page", { length: 512 }),
    referrer: varchar("referrer", { length: 255 }),
    deviceType: varchar("device_type", { length: 20 }),
    browser: varchar("browser", { length: 50 }),
    os: varchar("os", { length: 50 }),
    country: varchar("country", { length: 2 }),
    region: varchar("region", { length: 100 }),
    city: varchar("city", { length: 100 }),
    ipHash: varchar("ip_hash", { length: 64 }),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("analytics_events_created_at_idx").on(table.createdAt),
    index("analytics_events_event_type_idx").on(table.eventType),
    index("analytics_events_visitor_id_idx").on(table.visitorId),
    index("analytics_events_session_id_idx").on(table.sessionId),
    index("analytics_events_event_type_created_at_idx").on(
      table.eventType,
      table.createdAt,
    ),
  ],
);

/**
 * Admin users for the analytics dashboard. The `role` field keeps the
 * door open for multiple admins/roles without schema changes.
 */
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  role: varchar("role", { length: 20 }).notNull().default("admin"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type AnalyticsEventRow = typeof analyticsEvents.$inferSelect;
export type NewAnalyticsEvent = typeof analyticsEvents.$inferInsert;
export type AdminUserRow = typeof adminUsers.$inferSelect;
