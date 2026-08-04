# Exploration: Portfolio Website

> **Date**: 2026-07-28
> **Author**: SDD Explore Phase — AI Executor
> **Change**: `portfolio-website`
> **Status**: Greenfield — zero existing code

---

## Current State

Greenfield project. No existing code, no repository, no dependencies. The workspace directory contains only the OpenSpec scaffolding (`openspec/config.yaml`, empty `specs/` and `changes/` directories). There is nothing to investigate in the codebase — this exploration is pure research into optimal patterns and approaches.

**Config context** (from `openspec/config.yaml`):
- Frontend: Next.js 15, React 19, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion
- Backend: Node.js/Express (TypeScript)
- DevOps: Docker Compose
- Design: Dark theme, premium Awwwards-level, 95+ Lighthouse
- Testing: None configured (Strict TDD disabled)

---

## Affected Areas

Nothing yet — greenfield. All decisions made here will shape the entire project structure.

---

## Research Findings

### 1. Project Structure

**Recommendation**: Flat root with separate `frontend/` and `backend/` directories. NOT a formal pnpm/npm monorepo.

```
portfolio_workspace/
├── frontend/             # Next.js 15 app
│   ├── src/
│   │   ├── app/          # App Router pages & layouts
│   │   ├── components/   # React components
│   │   ├── lib/          # Utilities, API clients
│   │   ├── hooks/        # Custom hooks
│   │   ├── data/         # Static content (profile, projects, etc.)
│   │   └── styles/       # Global CSS
│   ├── public/           # Static assets
│   ├── next.config.ts
│   ├── tailwind.config.ts (or CSS-based config for v4)
│   ├── components.json   # shadcn/ui config
│   └── package.json
├── backend/              # Express API
│   ├── src/
│   │   ├── routes/       # API route handlers
│   │   ├── middleware/    # CORS, rate limiting, validation
│   │   ├── services/     # Business logic (email, GitHub proxy)
│   │   └── index.ts      # Entry point
│   ├── tsconfig.json
│   └── package.json
├── docker-compose.yml
├── docker-compose.dev.yml
└── openspec/             # SDD artifacts
```

**Rationale**:
- **No formal monorepo needed**: Only 2 packages. pnpm workspaces/turborepo add complexity with minimal benefit here.
- **Shared types**: Create a `frontend/src/types/` and `backend/src/types/` with duplicated but consistent type definitions. For a portfolio with ~5-10 shared types (contact form request/response, GitHub API types), duplication is cheaper than a shared package build step.
- **Alternative considered**: Single Next.js project using API Routes instead of a separate Express backend. Rejected because: (a) the user explicitly wants a separate Express backend, (b) Docker Compose orchestration is a portfolio showcase requirement, and (c) it demonstrates full-stack architecture.

| Approach | Pros | Cons | Complexity |
|----------|------|------|------------|
| Flat dirs (frontend/ + backend/) | Simple, clear separation, easy Docker config | Duplicated shared types, two separate build configs | Low |
| pnpm monorepo with shared package | Single install, shared types in one place | Overhead of workspace config, build order complexity | Medium |
| Single Next.js (API Routes only) | Simplest, no backend process | Doesn't fulfill Docker Compose requirement, less impressive as portfolio piece | Low |

---

### 2. Next.js 15 + shadcn/ui Setup

**Scaffolding steps** (verified against current docs):

```bash
# 1. Create Next.js app
npx create-next-app@latest frontend --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# 2. Initialize shadcn/ui with Tailwind v4 defaults
cd frontend
npx shadcn@latest init --defaults
```

**Key configurations**:

- `next.config.ts`: Set `output: "standalone"` for Docker deployment
- `components.json`: Uses `base-nova` style, CSS variables, `neutral` base color, `lucide` icons
- `globals.css` (Tailwind CSS v4 format):
  ```css
  @import "tailwindcss";
  @import "tw-animate-css";
  @import "shadcn/tailwind.css";
  
  @custom-variant dark (&:is(.dark *));
  
  @theme inline {
    --color-background: var(--background);
    --color-foreground: var(--foreground);
    /* ... all CSS variable mappings */
  }
  
  :root { /* light theme variables */ }
  .dark { /* dark theme variable overrides */ }
  
  @layer base {
    * { @apply border-border outline-ring/50; }
    body { @apply bg-background text-foreground; }
  }
  ```

**Dark mode**: Use `next-themes` with `ThemeProvider` (`attribute="class"`, `defaultTheme="dark"`, `enableSystem`). The `.dark` class on `<html>` triggers all CSS variable swaps.

**Component organization**:
```
src/components/
├── ui/              # shadcn/ui primitives (button, card, badge, etc.)
├── layout/          # Header, Footer, Navigation, ThemeToggle
├── sections/        # One folder per page section
│   ├── hero/
│   ├── about/
│   ├── tech-stack/
│   ├── experience/
│   ├── projects/
│   ├── architecture/
│   ├── github/
│   ├── blog/
│   └── contact/
└── shared/          # Shared across sections (SectionHeading, Container, etc.)
```

---

### 3. Framer Motion Patterns

**Core patterns for professional aesthetic** (verified against Motion library docs):

```tsx
// Pattern 1: Scroll-triggered fade-in (most common for sections)
import { motion } from "motion/react";

function Section({ children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}

// Pattern 2: Staggered children (for card grids, timeline items)
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

// Pattern 3: Subtle hover effects
<motion.div whileHover={{ scale: 1.02, y: -2 }} transition={{ duration: 0.2 }}>
  {/* card content */}
</motion.div>

// Pattern 4: useInView for imperative control (more complex triggers)
const [scope, animate] = useAnimate();
const isInView = useInView(scope, { once: true, margin: "-100px" });

useEffect(() => {
  if (isInView) animate(scope.current, { opacity: 1, y: 0 });
}, [isInView]);
```

**Design constraints for professional aesthetic**:
- Use `viewport: { once: true }` — animations only trigger once, not on every scroll up/down
- Duration: 0.3s–0.5s max — fast enough to feel responsive, slow enough to be noticed
- Easing: `easeOut` for entrances, `easeInOut` for hover
- Translate Y: 10–24px — subtle movement, not dramatic
- **No**: spring physics (too bouncy), rotate transforms (disorienting), scale beyond 1.05
- **Yes**: opacity fades, slight Y translations, subtle scale on hover

---

### 4. Docker Compose Setup

**Production Docker Compose** (verified against Docker docs and Next.js guides):

```yaml
# docker-compose.yml
services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
      target: runner          # multi-stage: only production stage
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=http://backend:4000/api
    depends_on:
      backend:
        condition: service_healthy

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
      target: runner
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=production
      - PORT=4000
      - RESEND_API_KEY=${RESEND_API_KEY}
      - GITHUB_TOKEN=${GITHUB_TOKEN}
      - CORS_ORIGIN=http://localhost:3000
    healthcheck:
      test: ["CMD", "node", "-e", "require('http').get('http://localhost:4000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"]
      interval: 30s
      timeout: 5s
      retries: 3
```

**Development override** (docker-compose.dev.yml with hot reload):

```yaml
# docker-compose.dev.yml
services:
  frontend:
    build:
      target: dependencies   # dev stage with all deps
    command: npm run dev
    volumes:
      - ./frontend:/app
      - /app/node_modules
      - /app/.next
    environment:
      - NODE_ENV=development

  backend:
    build:
      target: dependencies
    command: npm run dev
    volumes:
      - ./backend:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
```

Usage: `docker compose -f docker-compose.yml -f docker-compose.dev.yml up`

**Next.js Dockerfile** (multi-stage, standalone output):
- Stage 1 (`dependencies`): Install all deps (cached via BuildKit mounts)
- Stage 2 (`builder`): `npm run build` → produces `.next/standalone/`
- Stage 3 (`runner`): Copy standalone + static + public → `node server.js`

**Express Dockerfile** (similar multi-stage):
- Stage 1: Install deps
- Stage 2: `tsc` compile TypeScript
- Stage 3: Copy compiled JS + production deps → `node dist/index.js`

**Key `next.config.ts` setting**: `output: "standalone"` — this is REQUIRED for Docker. Next.js auto-detects needed files via output file tracing.

---

### 5. Performance Strategy (95+ Lighthouse)

| Technique | Implementation | Impact |
|-----------|---------------|--------|
| `next/image` | All images use `<Image>` with `loading="lazy"` (default). Hero/LCP images use `priority` + `loading="eager"` | Largest Contentful Paint (LCP) |
| `next/font` | Google Fonts via `next/font/google` with `display: 'swap'` and `variable` | Eliminates render-blocking font requests |
| Server Components | Default to RSC. Only `'use client'` for interactive elements (animations, theme toggle, contact form) | Zero JS shipped for static content |
| Static Generation | Home page, about, experience — all static at build time | Instant TTFB |
| ISR for blog | `revalidate: 3600` on blog pages | Fresh content without rebuild |
| Bundle analysis | `@next/bundle-analyzer` or `ANALYZE=true` build flag | Identify heavy chunks |
| CSS optimization | Tailwind v4 purges unused styles by default. No `tailwind.config.ts` needed for v4 | Minimal CSS |
| LCP audit | Next.js 15 runtime warns if LCP image uses `loading="lazy"` | Catch issues early |

**LCP target pathway**:
1. Hero image/text loads first (priority, eager, preloaded)
2. Fonts load async with swap (no invisible text)
3. Below-fold images lazy-load
4. JavaScript is minimal (mostly static, no heavy client bundles)

**Cache strategy**: Set `Cache-Control: public, max-age=31536000, immutable` for static assets in `next.config.ts` headers. Use `stale-while-revalidate` for dynamic data (GitHub API).

---

### 6. SEO & Structured Data

**Global metadata** (root `layout.tsx`):

```tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://diegosilva.dev'),
  title: {
    default: 'Diego Silva — Senior Full Stack Developer',
    template: '%s | Diego Silva',
  },
  description: 'Senior Full Stack Developer specialized in Java/Spring Boot, React, and cloud-native architectures.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Diego Silva — Portfolio',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};
```

**JSON-LD Structured Data** (in `page.tsx` or dedicated component):

```tsx
// For the home page — Person schema
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Diego Silva',
  jobTitle: 'Senior Full Stack Developer',
  url: 'https://diegosilva.dev',
  sameAs: [
    'https://github.com/diegosilva',
    'https://linkedin.com/in/diegosilva',
  ],
  knowsAbout: ['Java', 'Spring Boot', 'React', 'TypeScript', 'Cloud Architecture'],
};
```

**OG Image**: Place a static `opengraph-image.png` (1200×630) in `app/` or use `generateImageMetadata` for dynamic OG images (blog posts). Optionally use `@vercel/og` for programmatic generation.

---

### 7. GitHub API Integration

**Recommended approach**: GitHub REST API v3, called from Next.js Server Components with ISR.

**Endpoints needed**:

| Data | Endpoint | Notes |
|------|----------|-------|
| User profile | `GET /users/{username}` | Bio, avatar, followers, public repos count |
| Repositories | `GET /users/{username}/repos?sort=updated&per_page=10` | Filter by `!fork` in code |
| Pinned repos | `GET /users/{username}/repos?type=owner&sort=updated` | Manual pinning: hardcode 4-6 repo names, fetch details individually |
| Repo details | `GET /repos/{owner}/{repo}` | Stars, language, description, topics |
| Repo languages | `GET /repos/{owner}/{repo}/languages` | Language breakdown per repo |
| Contribution data | GraphQL `contributionsCollection` | Needs PAT token; fallback: manual hardcode |

**Implementation pattern** (Server Component):

```tsx
// lib/github.ts
export async function getGitHubRepos(username: string) {
  const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    },
    next: { revalidate: 3600 }, // ISR: revalidate every hour
  });
  return res.json();
}
```

**Rate limiting**: Unauthenticated requests: 60/hour. With PAT (classic token, no scopes needed for public repos): 5000/hour. Create a fine-grained PAT with read-only access to public repositories.

**Pinned repos workaround**: GitHub REST API has no "pinned repos" endpoint (only GraphQL). Two strategies:
1. **Hardcode** (recommended): Diego manually lists 4-6 featured repo names in a TypeScript data file. The API fetches details for each. Simple, no GraphQL token complexity.
2. **GraphQL** (`pinnedItems`): Requires a PAT with `read:user` scope. More complex setup but automatic.

**Contribution graph**: The contribution calendar is only available via GraphQL. Alternative: embed GitHub's own contribution graph via iframe or image (unofficial endpoints exist but are unreliable). Better to showcase total contributions stat count from the user profile endpoint + hardcoded notable contributions.

---

### 8. Contact Form Strategy

| Option | Pros | Cons | Monthly Cost | Recommendation |
|--------|------|------|-------------|----------------|
| **Resend** | Clean API, React email templates, 100 emails/day free, great deliverability | Requires API key, free tier has sending limits | $0 (free tier: 100/day) | **RECOMMENDED** |
| Nodemailer + Gmail SMTP | Zero cost, no third-party, full control | Gmail app password setup, spam folder risk, rate limits (~500/day) | $0 | Good fallback |
| Nodemailer + SendGrid/Mailgun | Better deliverability than raw SMTP | Another third-party, API key to manage | $0 (free tiers exist) | Overkill for contact form |
| Next.js API Route only (no email) | Simplest possible | No notification when someone contacts you | $0 | Not viable |

**Recommended implementation**: Resend + Express endpoint

```
User submits form (Next.js client component)
  → POST /api/contact (Express backend)
    → Validate input (zod)
    → Rate limit (express-rate-limit: 3 requests/15min)
    → resend.emails.send({ from, to: diego@email.com, subject, html })
    → Return 200 { success: true }
```

**Express contact route**:
```typescript
// backend/src/routes/contact.ts
import { Router } from 'express';
import { Resend } from 'resend';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
});

router.post('/contact', async (req, res) => {
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { data, error } = await resend.emails.send({
    from: 'Portfolio Contact <onboarding@resend.dev>',
    to: process.env.CONTACT_EMAIL!,
    subject: `Portfolio: ${parsed.data.name} — ${parsed.data.subject || 'New message'}`,
    html: `<p><strong>From:</strong> ${parsed.data.email}</p><p>${parsed.data.message}</p>`,
  });

  if (error) return res.status(500).json({ error: 'Failed to send' });
  return res.json({ success: true });
});
```

**Rate limiting**: `express-rate-limit` middleware configured per-IP. 3 requests per 15-minute window is standard for contact forms.

---

### 9. Content Architecture

**Recommendation**: TypeScript data files for static content + Markdown for blog.

```
frontend/src/data/
├── profile.ts          # Name, title, bio, social links, CV URL
├── experience.ts       # Array of work experiences (company, role, dates, description)
├── tech-stack.ts       # Categorized skills (Backend, Frontend, Databases, etc.)
├── projects.ts         # Featured projects with all metadata
└── architecture.ts     # Architecture diagram descriptions (text + diagram tool data)

frontend/src/content/
├── blog/
│   ├── post-1.mdx      # MDX blog posts with frontmatter
│   └── post-2.mdx
```

**Why TypeScript data files over alternatives**:

| Option | Pros | Cons | Best for |
|--------|------|------|----------|
| **TypeScript data files** | Type-safe, no build step for content, easy to edit, zero dependencies | Content edits require redeploy | **RECOMMENDED** — portfolio with infrequent updates |
| Markdown/MDX | Human-readable, version-controlled, great for blog | Parser dependency (gray-matter, next-mdx-remote), more complex rendering | Blog posts only |
| Headless CMS (Contentful, Strapi) | GUI for editing, no redeploys | Overkill for personal site, monthly cost, added complexity | Teams, frequent content updates |
| Hardcoded in components | No files to manage | Mixes content with presentation, hard to maintain | Never |

**Type-safe content** (optional enhancement):

```typescript
// data/profile.ts
import { z } from 'zod';

export const ProfileSchema = z.object({
  name: z.string(),
  title: z.string(),
  bio: z.string(),
  github: z.string().url(),
  linkedin: z.string().url(),
  cvUrl: z.string(),
});

export type Profile = z.infer<typeof ProfileSchema>;

export const profile: Profile = {
  name: 'Diego Silva',
  title: 'Senior Full Stack Developer',
  bio: '...',
  github: 'https://github.com/diegosilva',
  linkedin: 'https://linkedin.com/in/diegosilva',
  cvUrl: '/cv.pdf',
};
```

**Blog approach**: Use MDX with `next-mdx-remote` or `contentlayer` (if maintained). For a portfolio blog with < 10 posts, `next-mdx-remote` in RSC is sufficient. Frontmatter for title, date, excerpt, tags.

---

## Recommended Approach

### Architecture Decision: Flat Root, TypeScript Data Files, Resend Contact Form

**Project structure**: `frontend/` + `backend/` at root, no formal monorepo tooling. Docker Compose orchestrates both.

**Content**: TypeScript data files (`src/data/`) for profile, experience, tech stack, projects. MDX for blog posts.

**Contact form**: Express backend with Resend API + Zod validation + express-rate-limit.

**GitHub integration**: REST API with ISR caching (1-hour revalidation). Pinned repos hardcoded as a list of repo names, fetched individually via API.

**Performance**: Next.js standalone output, Server Components by default, `next/image` with priority on LCP, `next/font` with swap display.

### Key Architectural Decisions

| Decision | Choice | Tradeoff |
|----------|--------|----------|
| Monorepo vs flat dirs | Flat dirs | Simpler setup, but duplicated type definitions |
| Express vs Next.js API Routes | Express | Docker demo value, but another process to manage |
| Content: TS files vs CMS | TypeScript files | Fast, type-safe, no cost — but content edits need redeploy |
| Pinned repos: hardcode vs GraphQL | Hardcode | Simple, no GraphQL token — but manual upkeep |
| Email: Resend vs Nodemailer | Resend | Better deliverability, cleaner API — but third-party dependency |

---

## Risks

1. **GitHub API rate limiting**: If the site gets heavy traffic (unlikely for a portfolio), ISR caching mitigates this. PAT token with 5000 req/hour provides ample headroom.

2. **Resend free tier limits**: 100 emails/day. For a portfolio contact form, this is more than sufficient. If exceeded, fallback to Nodemailer with Gmail SMTP.

3. **Next.js 15 + Tailwind CSS v4 compatibility**: Both are stable releases, but v4 CSS-first configuration is relatively new. shadcn/ui explicitly supports v4 via the `next-app` template, reducing risk.

4. **Docker build times on Windows**: Multi-stage builds with BuildKit cache mounts require Docker Desktop with WSL2 backend. Cold builds may be slow on first run.

5. **Content updates require redeploy**: Since content is in TypeScript files, any typo fix requires a rebuild + redeploy. Acceptable for a portfolio with infrequent updates.

6. **OG image generation**: Static PNG works but looks generic. Dynamic `@vercel/og` generation adds build complexity. Evaluate post-launch.

---

## Open Questions

1. **What is Diego's GitHub username?** Required for GitHub API integration and social links.

2. **What is Diego's contact email?** Required for Resend `to` field.

3. **Does Diego have a custom domain?** Affects `metadataBase`, OG image URLs, and SEO. If not, Vercel's default `*.vercel.app` domain works but `metadataBase` must be set correctly per environment.

4. **CV format?** PDF download vs inline web version. PDF is simpler and more expected for a developer portfolio.

5. **Architecture diagrams tool?** Needs decision: Mermaid (markdown-rendered, lightweight), Excalidraw (hand-drawn style), or static SVG/PNG exported from a diagramming tool. Mermaid is recommended — renders client-side, version-controllable, no external tool dependency.

---

## Ready for Proposal

**Yes**. All research areas have clear recommendations. The project structure, tech stack integrations, performance strategy, and content architecture are well-defined. The proposal phase can proceed with:

- Project structure (Section 1)
- Scaffolding instructions (Section 2)
- Animation patterns (Section 3)
- Docker setup (Section 4)
- Performance strategy (Section 5)
- SEO approach (Section 6)
- GitHub API integration (Section 7)
- Contact form implementation (Section 8)
- Content architecture (Section 9)

The open questions above should be resolved during the proposal or spec phase — they don't block architectural decisions.
