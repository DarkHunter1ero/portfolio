# Proposal: Portfolio Website — Diego Silva

> **Change**: `portfolio-website` | **Date**: 2026-07-28 | **Mode**: Interactive · Single-PR | **Review Budget**: 400 lines

---

## 1. Intent

Build a professional, Awwwards-level portfolio website for Diego Silva — a Senior Full Stack Developer with 6+ years in enterprise backend systems. The portfolio showcases deep technical competence through clean design and architecture, not flash. It replaces having no online presence and serves as both a career asset and a demonstration of full-stack Docker orchestration skills.

---

## 2. Summary

- **What**: Dark-themed, performance-optimized portfolio with 9 content sections, blog (MDX), contact form (Resend), and GitHub activity integration.
- **Stack**: Next.js 15 + React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui + Framer Motion | Express + Resend + Zod | Docker Compose (multi-stage)
- **Audience**: Recruiters, technical leads, enterprise clients evaluating architecture competence.
- **Tone**: Professional software engineer — no neon, no gaming aesthetic, no clichés. Elegant, restrained, technically substantive.

---

## 3. Scope

### In Scope

| # | Deliverable | Details |
|---|-------------|---------|
| 1 | **Frontend app** | Next.js 15 App Router, all 9 portfolio sections, responsive (mobile/tablet/desktop), dark theme, glassmorphism accents only where contextually appropriate |
| 2 | **Backend API** | Express + TypeScript: `/api/health`, `POST /api/contact`, CORS middleware, rate limiting |
| 3 | **Contact form** | Client component → Express validation (Zod) → Resend email delivery → rate-limited at 3 req/15min |
| 4 | **GitHub integration** | REST API with ISR caching (1h revalidate), pinned repos (hardcoded list), contribution stats |
| 5 | **Blog** | MDX via `next-mdx-remote`, frontmatter, ISR revalidation (1h), /blog index + /blog/[slug] |
| 6 | **CV download** | Static PDF served from `/public/cv.pdf` |
| 7 | **Architecture diagrams** | Mermaid-rendered diagrams for Microservices, Docker, CI/CD, Auth, Cloud — interactive, version-controlled |
| 8 | **Docker setup** | `frontend/Dockerfile` (multi-stage, standalone), `backend/Dockerfile` (multi-stage, compiled TS), `docker-compose.yml` + `docker-compose.dev.yml` |
| 9 | **SEO & accessibility** | Full metadata (OG, Twitter, JSON-LD Person schema), ARIA labels, semantic HTML, keyboard navigation, 95+ Lighthouse target |
| 10 | **Analytics-ready** | Placeholder for analytics script injection (no framework commitment yet) |

### Out of Scope

- Custom domain setup (diegosilva.dev is placeholder — deploy to Vercel free domain initially)
- Analytics framework (Verceal Analytics, Plausible, PostHog — TBD post-launch)
- i18n / multi-language
- CMS integration (content is static TypeScript files)
- Automated testing suite (TDD disabled — add post-MVP if needed)
- CI/CD pipeline (GitHub Actions — add post-launch)
- Authentication / admin panel

---

## 4. Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                    User Browser                      │
│  ┌──────────────┐  ┌──────────────┐                 │
│  │ Static Pages  │  │ Client       │                 │
│  │ (RSC — 0 JS) │  │ Components   │                 │
│  │ Home, About,  │  │ Contact Form,│                 │
│  │ Experience,   │  │ Theme Toggle,│                 │
│  │ Tech Stack,   │  │ GitHub Cards,│                 │
│  │ Projects,     │  │ Mermaid Diag.│                 │
│  │ Architecture  │  │ (use client) │                 │
│  └──────┬───────┘  └──────┬───────┘                 │
└─────────┼──────────────────┼────────────────────────┘
          │                  │
    ISR (1h)           POST /api/contact
          │                  │
          ▼                  ▼
┌─────────────────┐  ┌──────────────────┐
│  Next.js Server  │  │  Express Server   │
│  (Port 3000)     │  │  (Port 4000)      │
│                  │  │                    │
│  • Server        │  │  • POST /contact   │
│    Components    │  │    → Zod validate  │
│  • ISR cache     │  │    → Resend send   │
│  • GitHub proxy  │  │  • GET /health     │
│  • MDX render    │  │  • rate-limit (3/  │
│                  │  │    15min)          │
└────────┬────────┘  └────────┬───────────┘
         │                    │
    ISR fetch         Resend API
         │                    │
         ▼                    ▼
┌─────────────────┐  ┌──────────────────┐
│  GitHub REST API │  │  Email (Gmail)    │
│  (ratelimit:     │  │                   │
│   5000/h w/PAT)  │  │  diego1silva2@    │
└─────────────────┘  │  gmail.com        │
                     └──────────────────┘
```

### Key Flows

| Flow | Path | Caching |
|------|------|---------|
| Static content → page | `data/*.ts` → RSC → rendered HTML | Static generation (build time) |
| GitHub repos → page | Server Component → `fetch()` → GitHub API | ISR `revalidate: 3600` |
| Blog posts → page | `content/blog/*.mdx` → `next-mdx-remote` → RSC | ISR `revalidate: 3600` |
| Contact submit → email | Client form → `POST /api/contact` → Express → Resend | No cache (POST) |
| Theme toggle | `next-themes` Provider → localStorage + `.dark` class | Client-side only |

---

## 5. Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Framework** | Next.js 15 (App Router) | RSC by default, static generation, ISR, standalone Docker output, image optimization |
| **UI Library** | React 19 | Latest stable, aligns with Next.js 15 |
| **Language** | TypeScript (strict) | Type safety across data files, API types, component props |
| **Styling** | Tailwind CSS v4 + shadcn/ui | Zero-runtime, CSS-first v4 config, shadcn provides accessible primitives |
| **Animations** | Framer Motion (`motion/react`) | Declarative scroll/hover animations, tree-shakeable, no spring/bounce misuse |
| **Icons** | Lucide React | Tree-shakeable, consistent style, shadcn default |
| **Dark Mode** | next-themes | `.dark` class strategy, `defaultTheme="dark"`, `enableSystem` |
| **Backend** | Express 5 + TypeScript | Lightweight, well-known, demonstrates full-stack architecture |
| **Validation** | Zod | Type-safe schemas shared between frontend types and backend validation |
| **Email** | Resend | 100 emails/day free, clean API, good deliverability, React email template support |
| **Rate Limiting** | express-rate-limit | Per-IP window limiting, standard contact form protection |
| **Blog** | next-mdx-remote | RSC-compatible MDX rendering, frontmatter parsing |
| **Diagrams** | Mermaid.js | Client-rendered, version-controllable, no external tool dependency |
| **Fonts** | next/font/google | Geist (body), Playfair Display (headings) — loaded with `display:'swap'`, no render-blocking |
| **DevOps** | Docker Compose (multi-stage) | Production + dev overrides, BuildKit cache mounts, standalone output |
| **Package Manager** | npm | Default, no workspace complexity needed for 2 packages |

### Decision: Playfair Display for Headings

Geist is the obvious body choice (Inter alternative, geometric sans-serif from Vercel). For headings, Playfair Display adds the "elegant" quality the user wants without being flashy — it's a respected serif used by professional publications. Pairing: sans-serif body + serif headings signals both technical competence and design maturity.

---

## 6. Design System

### Colors (Dark Theme)

| Token | Hex | Usage |
|-------|-----|-------|
| `--background` | `#09090b` (zinc-950) | Page background |
| `--foreground` | `#fafafa` (zinc-50) | Primary text |
| `--muted` | `#27272a` (zinc-800) | Card backgrounds, subtle surfaces |
| `--muted-foreground` | `#a1a1aa` (zinc-400) | Secondary text, labels |
| `--border` | `#27272a` (zinc-800) | Card borders, dividers |
| `--primary` | `#fafafa` (zinc-50) | Primary buttons, active states |
| `--primary-foreground` | `#18181b` (zinc-900) | Text on primary |
| `--accent` | `#27272a` (zinc-800) | Hover states, subtle highlights |
| `--ring` | `#52525b` (zinc-600) | Focus rings |
| `--glassmorphism` | `rgba(255,255,255,0.03)` + `backdrop-blur-xl` | Glassmorphism cards (used sparingly) |

### Typography

| Role | Font | Weight | Size (desktop) |
|------|------|--------|----------------|
| Hero heading | Playfair Display | 700 | `text-6xl` / `text-7xl` |
| Section titles | Playfair Display | 600 | `text-4xl` |
| Body text | Geist Sans | 400 | `text-base` / `text-lg` |
| Labels / Meta | Geist Sans | 500 | `text-sm` |
| Code / Tech tags | Geist Mono | 400 | `text-sm` |

### Spacing Scale

- **Section padding**: `py-24` / `py-32` (generous vertical breathing room)
- **Container max-width**: `max-w-6xl` (1280px) — content stays focused, doesn't stretch
- **Card gaps**: `gap-6` / `gap-8` (Grid/Flexbox gaps)
- **Component spacing**: Tailwind default scale (4, 8, 12, 16, 24, 32, 48, 64)

### Component Patterns

| Pattern | Implementation |
|---------|---------------|
| Cards | `rounded-2xl`, `border border-border`, `bg-muted`, soft shadow via `shadow-lg shadow-black/5` |
| Glassmorphism | `bg-white/[0.03]`, `backdrop-blur-xl`, `border border-white/[0.05]` — **only** on hero overlay and architecture cards |
| Section container | `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8` |
| Buttons | shadcn variants: `default` (primary, dark bg), `outline` (bordered), `ghost` (subtle) |
| Section heading | `<h2>` with Playfair Display, subtitle `<p>` with muted-foreground, centered or left-aligned |
| Focus rings | `ring-2 ring-ring ring-offset-2 ring-offset-background` — every interactive element |
| Dividers | `<Separator />` from shadcn or `border-t border-border` |

### Animation Constraints

| Property | Allowed | Blocked |
|----------|---------|---------|
| Opacity | `0 → 1` (fade in) | — |
| Translate Y | `10px → 0` or `24px → 0` | `> 32px` |
| Scale | `0.98 → 1` or `1 → 1.02` (hover) | `> 1.05` |
| Duration | `0.3s – 0.5s` | `> 0.6s` |
| Easing | `easeOut`, `easeInOut` | Spring physics, bounce |
| Trigger | `whileInView` with `once: true` | Scroll-driven, continuous |
| Stagger | `staggerChildren: 0.1` | `> 0.2` (feels slow) |
| Rotate | Blocked entirely | Any rotate transform |

---

## 7. Route Map

```
/                           → Home page (all 9 sections, single-page scroll)
/blog                       → Blog index (article cards, ISR)
/blog/[slug]                 → Blog post (MDX rendered, ISR)
/404                        → Custom 404 page
```

**Architecture**: Single-page app for portfolio content (all sections on `/`), separate routes for blog.

| Section | Visibility | Rendering |
|---------|-----------|-----------|
| Hero | Always on `/` | RSC (static) + client gradient background |
| About Me | Always on `/` | RSC (static) |
| Tech Stack | Always on `/` | RSC (static) |
| Experience | Always on `/` | RSC (static) + client animation |
| Featured Projects | Always on `/` | RSC (static) + client animation |
| Architecture | Always on `/` | Client (`use client` — Mermaid) |
| GitHub Activity | Always on `/` | RSC (ISR via Server Component fetch) |
| Blog (preview) | Always on `/` | RSC (ISR — latest 3 posts) |
| Contact | Always on `/` | Client (`use client` — form) |
| Header/Nav | Global layout | Client (`use client` — theme toggle, mobile menu) |
| Footer | Global layout | RSC (static) |

---

## 8. Data Flow

### Flow 1: Static Content → Server Component → HTML

```
TypeScript data files (src/data/*.ts)
  → imported by Server Components (sections/)
    → rendered to HTML at build time (static generation)
      → served instantly, zero client JS
        → Google indexes full content
```

### Flow 2: GitHub Activity → ISR → Page

```
Server Component (GitHubSection)
  → fetch() GitHub REST API with PAT auth header
    → ISR cache (next: { revalidate: 3600 })
      → stale-while-revalidate on subsequent requests
        → Client component for interactive cards (stars, language tags)
```

### Flow 3: Blog → ISR → Page

```
MDX files (src/content/blog/*.mdx)
  → generateStaticParams() builds slug list
    → Server Component reads MDX, passes to next-mdx-remote
      → RSC renders to HTML
        → ISR revalidate: 3600 (new posts appear within 1h)
```

### Flow 4: Contact Form → Express → Resend

```
Client Component (ContactForm — 'use client')
  → form submit → fetch('http://localhost:4000/api/contact', { method: 'POST', body })
    → Express middleware: CORS check, rate-limit check (3 req/15min per IP)
      → Zod validation (name, email, message)
        → IF invalid → 400 { error: fieldErrors }
        → IF valid → resend.emails.send() → 200 { success: true }
          → Resend delivers to diego1silva2@gmail.com
```

### Flow 5: Theme Toggle → Client State → CSS Variables

```
next-themes ThemeProvider (attribute="class", defaultTheme="dark")
  → toggle adds/removes .dark class on <html>
    → CSS variables swap globally
      → persisted to localStorage
        → flash prevention: <Script> in head injects class before paint
```

---

## 9. Docker Architecture

### Production (`docker-compose.yml`)

```yaml
services:
  frontend:
    build: { context: ./frontend, target: runner }
    ports: ["3000:3000"]
    environment: [NODE_ENV=production, NEXT_PUBLIC_API_URL=http://backend:4000/api]
    depends_on: { backend: { condition: service_healthy } }

  backend:
    build: { context: ./backend, target: runner }
    ports: ["4000:4000"]
    environment: [NODE_ENV=production, PORT=4000, RESEND_API_KEY, GITHUB_TOKEN, CORS_ORIGIN=http://frontend:3000]
    healthcheck: { test: ["CMD", "node", "-e", "require('http').get('http://localhost:4000/api/health', ...)"], interval: 30s, timeout: 5s, retries: 3 }
```

### Multi-Stage Frontend Dockerfile

| Stage | Purpose | Key Layer |
|-------|---------|-----------|
| `dependencies` | Install production + dev deps | BuildKit cache mount for `~/.npm` |
| `builder` | `next build` | Produces `.next/standalone/` |
| `runner` | Production runtime (Node 22-alpine) | `COPY --from=builder /app/.next/standalone ./`, `COPY --from=builder /app/.next/static ./.next/static`, `COPY --from=builder /app/public ./public`, `CMD ["node", "server.js"]` |

### Multi-Stage Backend Dockerfile

| Stage | Purpose | Key Layer |
|-------|---------|-----------|
| `dependencies` | Install production + dev deps | BuildKit cache mount |
| `builder` | `tsc` compile to `dist/` | TypeScript → JavaScript |
| `runner` | Production runtime (Node 22-alpine) | `COPY --from=builder /app/dist ./dist`, `COPY --from=dependencies /app/node_modules ./node_modules`, `CMD ["node", "dist/index.js"]` |

### Development (`docker-compose.dev.yml`)

- Overrides `target: dependencies` for both services
- Mounts source code as volumes (hot reload via `npm run dev`)
- Anonymous volumes for `node_modules` and `.next` (prevents host override)
- `NODE_ENV=development` environment

Usage: `docker compose -f docker-compose.yml -f docker-compose.dev.yml up`

---

## 10. Performance Strategy (95+ Lighthouse)

| Metric | Target | How |
|--------|--------|-----|
| **LCP** | < 2.5s | Hero image `priority` + `loading="eager"`, fonts `display: 'swap'`, static generation for all non-dynamic content |
| **FID/INP** | < 100ms | Minimal JS — only interactive components are `'use client'`, zero heavy client bundles |
| **CLS** | < 0.1 | Explicit `width`/`height` on all images, font size-adjust fallback, no layout shift from animations |
| **TTFB** | < 800ms | Static generation, CDN edge caching (Verceal), no SSR for homepage |
| **CSS** | < 50KB | Tailwind CSS v4 auto-purges unused styles, no runtime CSS-in-JS |
| **JS** | < 150KB total | RSC by default, dynamic imports for Mermaid (client-only diagram lib), bundle analyzer gate |
| **Images** | < 1MB total | `next/image` with WebP/AVIF conversion, lazy loading below fold, responsive `sizes` |

### LCP Optimization Cheat Sheet

1. Hero section text and image are both rendered statically (RSC → HTML)
2. Hero background gradient is CSS-only (no JS, no canvas)
3. `next/font` with `display: 'swap'` — text renders in fallback font immediately
4. `fetchPriority="high"` on any hero image
5. No render-blocking resources (no external CSS/JS, no synchronous scripts)

### Bundle Budget Gate

- Run `ANALYZE=true next build` before merging
- If any client chunk exceeds 50KB gzipped → refactor or dynamic import
- Mermaid.js (heaviest client dep) → dynamic import with `{ ssr: false }` + loading skeleton

---

## 11. Accessibility Strategy

| Requirement | Implementation |
|-------------|---------------|
| **Semantic HTML** | `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<h1>`–`<h6>` hierarchy |
| **ARIA labels** | `aria-label` on icon-only buttons (theme toggle, social links), `aria-describedby` on form fields |
| **Keyboard nav** | All interactive elements focusable, `Tab` order follows visual order, focus rings visible (`ring-2 ring-ring`) |
| **Contrast** | Dark theme: `#fafafa` on `#09090b` = 17.5:1 (AAA). `#a1a1aa` on `#27272a` = 7.2:1 (AAA) |
| **Screen readers** | `sr-only` for section labels, `role="img"` + `aria-label` for Mermaid SVGs, `alt` text on all images |
| **Reduced motion** | `prefers-reduced-motion` media query — disable all Framer Motion animations, respect `transition: none` |
| **Form accessibility** | Labels associated with inputs (`htmlFor`), error messages linked via `aria-describedby`, submit button has clear text |
| **Skip link** | `Skip to main content` link as first focusable element, visible on focus |

### Accessibility Gate (Must Pass)

- [ ] Tab through entire page — every element reachable, focus visible
- [ ] Lighthouse Accessibility audit: 95+
- [ ] `prefers-reduced-motion: reduce` disables all animations
- [ ] Form error messages announced to screen readers
- [ ] All images have `alt` text (decorative: `alt=""`)

---

## 12. SEO Strategy

| Layer | Implementation |
|-------|---------------|
| **Metadata** | Root `layout.tsx`: `metadataBase`, `title.template`, `description`, `openGraph` (type, locale, siteName, image 1200×630), `twitter:card`, `robots: index/follow` |
| **Per-page overrides** | Blog posts generate dynamic metadata from MDX frontmatter (`generateMetadata`) |
| **JSON-LD** | Home page: `Person` schema (name, jobTitle, url, sameAs, knowsAbout). Blog: `Article` schema |
| **Open Graph image** | Static `opengraph-image.png` (1200×630) in `app/`. Blog: text-overlay style via CSS/SVG or deferred to `@vercel/og` |
| **Canonical URLs** | Set `metadataBase` to `https://diegosilva.dev` (production) or Vercel preview URL (auto-detected) |
| **Sitemap** | `sitemap.ts` in `app/` — Next.js auto-generates from routes. Includes blog posts via `generateSitemaps` |
| **robots.txt** | Generated via `robots.ts` — allow all, point to sitemap |
| **Structured content** | Sections use semantic HTML: `<section>` with `aria-labelledby`, schema-compatible markup |

---

## 13. Project Structure

```
portfolio_workspace/
├── frontend/
│   ├── public/
│   │   ├── cv.pdf
│   │   ├── og-image.png           # 1200×630 OG image
│   │   └── favicon.ico
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx          # Root layout: metadata, ThemeProvider, fonts, header, footer
│   │   │   ├── page.tsx            # Home page: composes all 9 sections
│   │   │   ├── loading.tsx         # Global loading skeleton
│   │   │   ├── not-found.tsx       # Custom 404
│   │   │   ├── error.tsx           # Global error boundary
│   │   │   ├── sitemap.ts          # Dynamic sitemap generation
│   │   │   ├── robots.ts           # robots.txt generation
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx        # Blog index (ISR)
│   │   │   │   ├── [slug]/
│   │   │   │   │   └── page.tsx    # Blog post (ISR, generateMetadata from frontmatter)
│   │   │   │   └── loading.tsx
│   │   │   └── globals.css         # Tailwind v4 imports + CSS variables + dark theme
│   │   ├── components/
│   │   │   ├── ui/                 # shadcn/ui primitives (button, card, badge, input, textarea, separator, skeleton, tooltip)
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx       # 'use client' — nav, theme toggle, mobile menu
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── ThemeProvider.tsx # 'use client' — next-themes wrapper
│   │   │   │   ├── ThemeToggle.tsx  # 'use client'
│   │   │   │   └── SkipLink.tsx
│   │   │   ├── sections/
│   │   │   │   ├── HeroSection.tsx        # 'use client' (gradient background animation)
│   │   │   │   ├── AboutSection.tsx       # RSC
│   │   │   │   ├── TechStackSection.tsx   # RSC
│   │   │   │   ├── TechStackCard.tsx      # 'use client' (hover animation)
│   │   │   │   ├── ExperienceSection.tsx  # RSC
│   │   │   │   ├── ExperienceTimeline.tsx # 'use client' (scroll animations)
│   │   │   │   ├── ProjectsSection.tsx    # RSC
│   │   │   │   ├── ProjectCard.tsx        # 'use client' (hover animation)
│   │   │   │   ├── ArchitectureSection.tsx # 'use client' (Mermaid rendering)
│   │   │   │   ├── ArchitectureDiagram.tsx # 'use client' (Mermaid wrapper)
│   │   │   │   ├── GitHubSection.tsx      # RSC (ISR fetch) + client cards
│   │   │   │   ├── GitHubRepoCard.tsx     # 'use client' (language bar, stats)
│   │   │   │   ├── BlogPreviewSection.tsx # RSC (ISR — latest 3 posts)
│   │   │   │   ├── BlogCard.tsx           # RSC (article card layout)
│   │   │   │   ├── ContactSection.tsx     # RSC wrapper
│   │   │   │   └── ContactForm.tsx        # 'use client' (form state, validation, fetch)
│   │   │   └── shared/
│   │   │       ├── SectionHeading.tsx     # Reusable h2 + subtitle + divider
│   │   │       ├── Container.tsx          # max-w-6xl wrapper
│   │   │       ├── AnimatedSection.tsx    # 'use client' — motion.section wrapper (fade+slide)
│   │   │       ├── JsonLd.tsx             # JSON-LD structured data component
│   │   │       └── TechBadge.tsx          # Tech stack tag/badge
│   │   ├── lib/
│   │   │   ├── github.ts         # fetchGitHubRepos(), fetchUserProfile(), getRepoLanguages()
│   │   │   ├── blog.ts           # getBlogPosts(), getBlogPost(slug) — MDX parsing
│   │   │   ├── constants.ts      # Site-wide constants (URLs, social links)
│   │   │   └── utils.ts          # cn() helper, formatDate(), etc.
│   │   ├── hooks/
│   │   │   ├── use-scroll-spy.ts # Active section tracking for nav
│   │   │   └── use-media-query.ts# Responsive breakpoint hook
│   │   ├── data/
│   │   │   ├── profile.ts        # Name, title, bio, social, CV URL — TypeScript + Zod
│   │   │   ├── experience.ts     # Work history array with company, role, dates, achievements
│   │   │   ├── tech-stack.ts     # Categorized skills (Backend, Frontend, DB, DevOps, Cloud, Tools)
│   │   │   ├── projects.ts       # Featured projects with full metadata
│   │   │   ├── architecture.ts   # Diagram definitions (Mermaid code strings + descriptions)
│   │   │   └── pinned-repos.ts   # Hardcoded list of 4-6 GitHub repo names to fetch
│   │   ├── content/
│   │   │   └── blog/
│   │   │       ├── example-post.mdx    # Template/reference MDX post
│   │   │       └── ...                # Additional blog posts
│   │   └── types/
│   │       ├── github.ts         # GitHub API response types
│   │       ├── blog.ts           # Blog post frontmatter types
│   │       └── contact.ts        # Contact form request/response types
│   ├── next.config.ts            # output: "standalone", image domains, headers, redirects
│   ├── components.json           # shadcn/ui config (base-nova, neutral, lucide)
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
├── backend/
│   ├── src/
│   │   ├── index.ts              # Express app entry: CORS, JSON parser, routes, health
│   │   ├── routes/
│   │   │   ├── contact.ts        # POST /api/contact — Zod + Resend
│   │   │   └── health.ts         # GET /api/health
│   │   ├── middleware/
│   │   │   ├── rate-limiter.ts   # express-rate-limit config (3 req/15min for contact)
│   │   │   └── error-handler.ts  # Global error handler middleware
│   │   ├── services/
│   │   │   └── email.ts          # Resend client initialization + send function
│   │   ├── schemas/
│   │   │   └── contact.ts        # Zod contact schema (mirrors frontend/src/types/contact.ts)
│   │   └── config.ts             # Environment variable validation (Zod)
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
├── docker-compose.yml
├── docker-compose.dev.yml
├── .env.example                  # Template for required env vars
├── .gitignore
└── openspec/                     # SDD artifacts (already exists)
```

---

## 14. Implementation Phases

### Phase 1: Scaffolding & Foundation (Days 1-2)

- `create-next-app` frontend, `npm init` backend
- shadcn/ui init + install base components (button, card, badge, input, textarea, separator, skeleton, tooltip)
- Tailwind CSS v4 setup, CSS variables, dark theme
- next-themes ThemeProvider
- Dockerfiles (both) + docker-compose.yml + docker-compose.dev.yml
- Express skeleton: health route, CORS, error handler, config validation
- TypeScript data files populated with Diego's real content

### Phase 2: Layout & Shared Components (Day 2)

- Header (nav, theme toggle, mobile menu)
- Footer
- Container, SectionHeading, AnimatedSection, SkipLink
- Root layout: fonts, metadata, ThemeProvider, JSON-LD

### Phase 3: Static Sections (Days 2-3)

- HeroSection (gradient background, CTAs)
- AboutSection
- TechStackSection + TechStackCard + TechBadge
- ExperienceSection + ExperienceTimeline
- ProjectsSection + ProjectCard

### Phase 4: Dynamic Sections (Day 3-4)

- GitHubSection: Server Component with ISR fetch, GitHubRepoCard
- BlogPreviewSection: latest 3 posts via MDX
- ArchitectureSection: Mermaid diagrams (5 diagrams)
- ContactSection + ContactForm: client form with validation

### Phase 5: Blog (Day 4)

- `/blog` page with article cards
- `/blog/[slug]` with MDX rendering
- generateMetadata per post
- BlogCard component

### Phase 6: Backend Contact API (Day 4-5)

- Contact route: Zod validation + Resend
- Rate limiting middleware
- CORS configuration
- Health check endpoint

### Phase 7: Polish & Performance (Day 5)

- LCP optimization (hero priority, font loading)
- Accessibility audit (ARIA, keyboard, screen reader)
- Bundle analysis + code splitting (Mermaid dynamic import)
- Open Graph image + verify metadata
- Sitemap + robots.txt
- Lighthouse audit → iterate until 95+

### Phase 8: Docker Verification (Day 5)

- Test production build: `docker compose up --build`
- Verify health check
- Verify contact form end-to-end
- Verify GitHub data fetches in Docker context

---

## 15. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| GitHub API rate limit (60 req/h unauthenticated) | Low | Medium | PAT token: 5000 req/h. ISR caches for 1h. Portfolio traffic is low. |
| Resend free tier exhausted (100/day) | Low | Low | 100/day is 3x expected contact form traffic. Fallback: Nodemailer + Gmail SMTP documented in code. |
| Tailwind CSS v4 + shadcn/ui compatibility edge cases | Low | Medium | Both officially support v4. Test during scaffolding. shadcn docs provide v4 migration guide. |
| Mermaid bundle size (~500KB) bloating main bundle | Medium | Medium | Dynamic import with `{ ssr: false }`. Only loads when Architecture section enters viewport. |
| Docker build times on Windows (WSL2) | Medium | Low | BuildKit cache mounts speed up npm install. Cold builds ~2min, warm builds ~30s. |
| Content edits require redeploy | Medium | Low | Acceptable for portfolio. Blog posts via MDX with ISR don't need redeploy — new files trigger rebuild on Vercel. |
| CV PDF: stale content vs. manual update | Low | Low | Single file, trivial to replace. Add to README deployment steps. |
| OG image: static vs. dynamic | Low | Low | Start with static PNG. Defer `@vercel/og` to post-launch if dynamic images are needed for blog. |

---

## 16. Success Criteria

- [ ] All 9 portfolio sections render correctly on mobile, tablet, and desktop breakpoints
- [ ] Lighthouse Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100
- [ ] `docker compose up` starts both services, health check passes, contact form delivers email
- [ ] GitHub activity section displays real data from Diego's account (DarkHunter1ero)
- [ ] Blog index and individual post pages render MDX correctly with working frontmatter
- [ ] Theme toggle switches dark/light seamlessly with persisted preference
- [ ] All interactive elements are keyboard-accessible with visible focus rings
- [ ] `prefers-reduced-motion: reduce` disables all animations
- [ ] JSON-LD Person schema validates in Google Rich Results Test
- [ ] Contact form: valid submission sends email, invalid submission shows field errors, rate limit blocks after 3 attempts
- [ ] No console errors, no 404s for assets, no hydration mismatches

---

## 17. Rollback Plan

| Scenario | Rollback |
|----------|----------|
| Deployment fails | Vercel auto-rolls back to last successful deployment (immutable deploys). No manual intervention needed. |
| Contact form breaks | Form falls back to showing email link (`mailto:diego1silva2@gmail.com`). Express route returns 503 with fallback message. |
| GitHub API returns errors | Section shows cached data (ISR). If no cache, shows graceful empty state: "GitHub data temporarily unavailable." |
| Docker build fails in CI | Local-only: dev uses npm directly, no Docker dependency for development. Docker is production-only concern. |
| Content error (typo in data file) | Fix in `src/data/*.ts`, redeploy. Static generation ensures no runtime errors from content. |

---

## 18. Dependencies

| Dependency | Status | Notes |
|-----------|--------|-------|
| GitHub PAT (classic token, `public_repo` scope) | **Required** | Create at github.com/settings/tokens. Stored in `.env` as `GITHUB_TOKEN` |
| Resend API key | **Required** | Sign up at resend.com. Free tier: 100 emails/day. Stored as `RESEND_API_KEY` |
| Resend domain verification | **Required for production** | Verify `diegosilva.dev` in Resend dashboard (post-custom-domain). Dev: use `onboarding@resend.dev` |
| Diego's CV (PDF) | **Required before Phase 1** | Place in `frontend/public/cv.pdf` |
| Profile content (all data files) | **Required before Phase 3** | Diego must provide: bio text, experience entries, project details, tech stack categories |
| Blog posts (MDX) | **Optional — can launch with placeholder** | At least 1 real post recommended before launch |
| Open Graph image | **Required before Phase 7** | Static 1200×630 PNG with Diego's name, title, and subtle branding |

---

## 19. Capabilities

### New Capabilities

- `portfolio-homepage`: Single-page portfolio with 9 sections, dark theme, professional aesthetic, responsive layout
- `blog-system`: MDX-based blog with index page, slug routes, frontmatter-driven metadata, ISR caching
- `github-integration`: REST API proxy with ISR caching, pinned repos, user profile stats, language breakdowns
- `contact-form`: Client form → Express validation → Resend email delivery with rate limiting and CORS
- `architecture-diagrams`: Mermaid-rendered interactive diagrams for Microservices, Docker, CI/CD, Auth, Cloud
- `docker-orchestration`: Multi-stage Dockerfiles, docker-compose production + dev configs, health checks, service dependencies

### Modified Capabilities

None — greenfield project. No existing specs to modify.

---

## 20. Open Questions

All resolved from exploration + user profile:

| Question | Resolution |
|----------|-----------|
| GitHub username? | **DarkHunter1ero** |
| Contact email? | **diego1silva2@gmail.com** |
| Custom domain? | Placeholder `diegosilva.dev` — launch on Vercel free domain first |
| CV format? | **Downloadable PDF** (`public/cv.pdf`) |
| Architecture diagrams tool? | **Mermaid** (version-controllable, client-rendered) |
| Heading font? | **Playfair Display** (elegant serif for section titles) |

---

## Proposal Question Round

Before finalizing, confirm these product assumptions:

1. **GitHub username**: "DarkHunter1ero" — confirmed correct? The repo list for pinned projects and the contribution section depend on this being exact.

2. **Contact form email**: `diego1silva2@gmail.com` — confirmed as the destination for all contact form submissions? Resend will deliver there.

3. **Blog content**: Is there existing content to populate the blog, or should we launch with a single "Hello World" post and Diego adds more later? The blog system works from day 1, but needs at least one post to render.

4. **Portfolio content readiness**: Are the data files (`experience.ts`, `projects.ts`, `tech-stack.ts`) ready to be populated, or does Diego need to provide structured content (company names, dates, project descriptions, tech stack categorization)?

5. **Deployment target**: Vercel (default for Next.js) or a VPS/Droplet with Docker? The Docker setup works for both, but the deployment step differs.
