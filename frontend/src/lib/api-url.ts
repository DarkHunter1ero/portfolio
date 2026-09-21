/**
 * Base URL of the backend API.
 *
 * Production (docker-compose with the nginx edge): same-origin relative
 * "/api" — nginx routes /api/* to the backend service, so no .env config
 * is needed and the cookie-based admin session just works (no CORS, no
 * SameSite=None, no cross-origin headaches).
 *
 * Local dev without Docker (npm run dev on :3000, backend on :4000):
 * set NEXT_PUBLIC_API_URL=http://localhost:4000/api in frontend/.env.local.
 */
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api";
