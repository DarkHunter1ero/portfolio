# Arquitectura del Proyecto

## Resumen

Este proyecto utiliza **arquitecturas diferentes para desarrollo local y producción**, optimizadas para cada entorno:

| Entorno | Frontend | Backend | Base de Datos | Entry Point |
|---------|----------|---------|---------------|-------------|
| **Desarrollo Local** | Next.js (Docker) | Express (Docker) | PostgreSQL (Docker) | Nginx (puerto 80) |
| **Producción** | Next.js (Vercel) | Express (Vercel Serverless) | PostgreSQL Externo (Managed) | Vercel Edge (HTTPS) |

---

## Desarrollo Local

### Arquitectura

```
Usuario → http://localhost (puerto 80)
    │
    ├─ / (rutas frontend) → Nginx → Next.js container (puerto 3000)
    │
    └─ /api/* → Nginx → Express container (puerto 4000) → PostgreSQL container (puerto 5432)
```

### Servicios (docker-compose.yml)

| Servicio | Puerto | Descripción |
|----------|--------|-------------|
| **nginx** | 80 | Reverse proxy único: `/` → frontend, `/api/*` → backend |
| **frontend** | 3000 | Next.js standalone build (`output: "standalone"`) |
| **backend** | 4000 | Express + TypeScript (tsx watch en dev) |
| **db** | 5432 | PostgreSQL 16 Alpine con volumen persistente `postgres_data` |

### Comandos

```bash
# Entorno tipo producción local (con nginx)
docker-compose up -d --build

# Desarrollo con hot reload (sin nginx, puertos directos)
docker-compose -f docker-compose.dev.yml up
```

### Variables de Entorno Local

**Frontend** (`.env.local` o `docker-compose.dev.yml`):
```bash
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

**Backend** (`.env` o `docker-compose.yml`):
```bash
NODE_ENV=development
PORT=4000
CORS_ORIGIN=http://localhost:3000
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}
TRUST_PROXY=1
COOKIE_SAMESITE=lax
```

### Flujo de Request Local

1. Usuario accede a `http://localhost`
2. Nginx recibe en puerto 80
3. Si request es `/api/*` → proxy a `backend:4000`
4. Si request es `/` u otra → proxy a `frontend:3000`
5. Backend conecta a PostgreSQL en `db:5432` (nombre de servicio Docker)

---

## Producción

### Arquitectura

```
GitHub → Jenkins (disparo manual)
    │
    ├─→ Vercel Frontend: https://portfolio-six-azure-69.vercel.app
    │     Next.js (standalone, Serverless)
    │     NEXT_PUBLIC_API_URL=https://portfolio-api-six-azure-69.vercel.app/api
    │
    └─→ Vercel Backend: https://portfolio-api-six-azure-69.vercel.app
          Express + TypeScript (Serverless Functions @vercel/node)
          ├── /api/health
          ├── /api/contact
          ├── /api/analytics/events
          ├── /api/admin/auth
          └── /api/admin/analytics
          │
          └─→ PostgreSQL Externo (Managed: Neon, Supabase, Railway, etc.)
                DATABASE_URL provista por proveedor
```

### Despliegue (Jenkins)

**Pipeline stages:**
1. **Checkout** — Clona repositorio
2. **Install** — `npm ci` en frontend y backend (paralelo)
3. **Validate Frontend** — lint, type-check, format
4. **Test** — tests unitarios frontend y backend (paralelo, DB mockeada)
5. **Build** — `npm run build` en frontend y backend (paralelo)
6. **DB Migrate** — `npm run db:migrate` en backend (contra DB de producción)
7. **Deploy Frontend** — `vercel deploy --prod --project portfolio`
8. **Deploy Backend** — `vercel deploy --prod --project portfolio-api`

### Variables de Entorno en Vercel Dashboard

#### Proyecto Frontend (`portfolio`)
| Variable | Valor |
|----------|-------|
| `NEXT_PUBLIC_API_URL` | `https://portfolio-api-six-azure-69.vercel.app/api` |

#### Proyecto Backend (`portfolio-api`)
| Variable | Valor | Nota |
|----------|-------|------|
| `NODE_ENV` | `production` | |
| `CORS_ORIGIN` | `https://portfolio-six-azure-69.vercel.app` | Exacto, sin trailing slash |
| `DATABASE_URL` | *(proveedor PostgreSQL)* | Configurar en Vercel Dashboard |
| `ADMIN_JWT_SECRET` | `openssl rand -hex 32` | Mínimo 32 chars |
| `ANALYTICS_IP_SALT` | `openssl rand -hex 32` | Mínimo 32 chars |
| `RESEND_API_KEY` | `re_...` | |
| `GITHUB_TOKEN` | `ghp_...` | |
| `TRUST_PROXY` | `1` | Vercel usa proxy |
| `COOKIE_SAMESITE` | `none` | Cross-subdomain cookies |
| `SESSION_TTL_HOURS` | `24` | |
| `ADMIN_EMAIL` | *(opcional)* | Para auto-seed admin |
| `ADMIN_PASSWORD` | *(opcional)* | Para auto-seed admin |

> **Nota**: En `backend/vercel.json` se usan referencias `@secret-name` para que Vercel las inyecte desde el Dashboard.

### Flujo de Request Producción

1. Usuario accede a `https://portfolio-six-azure-69.vercel.app`
2. Vercel Edge sirve frontend Next.js (static/SSR/ISR)
3. Frontend hace fetch a `/api/*` (relativo)
4. `NEXT_PUBLIC_API_URL` resuelve a `https://portfolio-api-six-azure-69.vercel.app/api`
5. Navegador hace request CORS a backend Vercel
6. Vercel Backend ejecuta Serverless Function Express
7. Backend conecta a PostgreSQL externo via `DATABASE_URL`
8. Respuesta vuelve por misma ruta

---

## Diferencias Clave

| Aspecto | Desarrollo Local | Producción |
|---------|------------------|------------|
| **Entry Point** | Nginx (HTTP, puerto 80) | Vercel Edge (HTTPS, auto) |
| **Frontend** | Docker container (Next.js) | Vercel Serverless (Next.js) |
| **Backend** | Docker container (Express persistente) | Vercel Serverless Functions (Express + `@vercel/node`) |
| **PostgreSQL** | Container Docker local | Externo administrado (Managed) |
| **HTTPS** | No (HTTP only) | Sí (Vercel automático, certs válidos) |
| **Dominio** | `localhost` | `portfolio-six-azure-69.vercel.app` + `portfolio-api-six-azure-69.vercel.app` |
| **Deploy** | Manual `docker-compose up` | Jenkins → Vercel CLI |
| **Cookies Admin** | `SameSite=lax`, HTTP | `SameSite=none`, Secure (cross-subdomain) |
| **CORS** | `http://localhost:3000` | `https://portfolio-six-azure-69.vercel.app` |
| **TRUST_PROXY** | `1` (nginx) | `1` (Vercel proxy) |
| **Migraciones** | Auto al inicio (`main()`) | Jenkins stage `db:migrate` antes de deploy |

---

## Configuración de Archivos por Entorno

### Archivos Compartidos (ambos entornos)
```
backend/src/           # Código Express (compatible con ambos)
backend/package.json   # Dependencias + scripts
frontend/src/          # Código Next.js
frontend/next.config.ts # Rewrite condicional (solo dev)
```

### Archivos Solo Desarrollo Local
```
docker-compose.yml           # Stack completo: nginx + frontend + backend + db
docker-compose.dev.yml       # Hot reload: frontend + backend
nginx/default.conf           # Proxy local HTTP
frontend/.env.example        # Variables dev
backend/.env.example         # Variables dev
```

### Archivos Solo Producción (Vercel)
```
vercel.json                  # Config frontend (root)
backend/vercel.json          # Config backend (Serverless)
backend/.vercelignore        # Excluir archivos de deploy backend
Jenkinsfile                  # Pipeline CI/CD
```

---

## Migración de Desarrollo a Producción

### Checklist Pre-Deploy

- [ ] Proyecto `portfolio-api` creado en Vercel Dashboard
- [ ] Token `VERCEL_TOKEN_FOR_PORTFOLIO_API` agregado a Jenkins Credentials
- [ ] Variables de entorno backend configuradas en Vercel Dashboard (`portfolio-api`)
- [ ] Variable `NEXT_PUBLIC_API_URL` configurada en Vercel Dashboard (`portfolio`)
- [ ] PostgreSQL externo provisionado y `DATABASE_URL` obtenida
- [ ] Secrets generados: `ADMIN_JWT_SECRET`, `ANALYTICS_IP_SALT` (`openssl rand -hex 32`)
- [ ] `CORS_ORIGIN` = `https://portfolio-six-azure-69.vercel.app` (exacto)

### Comandos Útiles

```bash
# Verificar build local backend (simula Vercel)
cd backend && npm run vercel-build && ls dist/

# Testear Serverless function localmente (requiere @vercel/node)
cd backend && npx vercel dev

# Migraciones manuales contra DB producción
cd backend && DATABASE_URL="postgresql://..." npm run db:migrate

# Deploy manual a Vercel (testing)
cd frontend && npx vercel deploy --prod --project portfolio
cd backend && npx vercel deploy --prod --project portfolio-api
```

---

## Notas Técnicas

### Backend en Vercel Serverless
- **Entry point**: `dist/index.js` (exporta `app` como default)
- **Inicialización**: `initializeApp()` se ejecuta en cold start (migraciones + seed)
- **Servidor HTTP**: Solo en `require.main === module` (local/Docker), nunca en Vercel
- **Timeout**: 30s configurado en `vercel.json` (`functions.maxDuration`)
- **Body limit**: 10kb (middleware `express.json({ limit: "10kb" })`)

### Frontend → Backend Communication
- **Producción**: `NEXT_PUBLIC_API_URL` absoluto → CORS cross-origin
- **Local (Docker)**: `/api/*` relativo → nginx proxy same-origin
- **Local (dev fuera Docker)**: `NEXT_PUBLIC_API_URL=http://localhost:4000/api` → CORS localhost

### PostgreSQL
- **Local**: `postgresql://user:pass@db:5432/db` (servicio Docker `db`)
- **Producción**: `DATABASE_URL` de proveedor gestionado
- **Migraciones**: Drizzle Kit (`drizzle-kit generate` / `npm run db:migrate`)
- **Pool**: `pg` Pool en `backend/src/db/index.ts` (funciona en ambos entornos)