// Test environment: must be set before any src module (config.ts) loads.
process.env.NODE_ENV = "test";
process.env.DATABASE_URL = "postgresql://test:test@localhost:5432/test";
process.env.ADMIN_JWT_SECRET = "test-admin-jwt-secret-at-least-32-chars";
process.env.ANALYTICS_IP_SALT = "test-ip-salt-at-least-32-characters";
process.env.COOKIE_SAMESITE = "strict";
process.env.SESSION_TTL_HOURS = "24";
