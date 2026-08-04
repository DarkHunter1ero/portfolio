# Tasks: Portfolio Website — Diego Silva

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~3,500 |
| 400-line budget risk | **High** |
| Chained PRs recommended | **Yes** |
| Suggested split | PR 1: Scaffolding → PR 2: Layout+Data → PR 3: Hero+About+Tech+Exp → PR 4: Projects+Arch+GitHub+Contact → PR 5: Polish |
| Delivery strategy | single-pr-default |
| Chain strategy | size-exception |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: size-exception
400-line budget risk: High

> ⚠️ **Budget exceeded by ~3,100 lines.** Single PR requires `size:exception` approval. Alternatively, split into 5 chained PRs (see work units below).

### Suggested Work Units

| Unit | Goal | Likely PR | Est. Lines | Notes |
|------|------|-----------|------------|-------|
| 1 | Project scaffolding (Next.js, Express, Docker, shadcn/ui) | PR 1 | ~830 | Base: `feature/portfolio-website` tracker branch |
| 2 | Layout shell + shared components + data layer | PR 2 | ~980 | Base: PR 1 branch |
| 3 | Hero, About, Tech Stack, Experience sections | PR 3 | ~582 | Base: PR 2 branch |
| 4 | Projects, Architecture, GitHub, Contact sections + backend | PR 4 | ~880 | Base: PR 3 branch |
| 5 | SEO, accessibility, error states, responsive QA | PR 5 | ~215 | Base: PR 4 branch |

---

## Phase 1: Project Scaffolding

- [x] **1.1** Init Next.js 15 with TypeScript, Tailwind CSS v4, `src/` directory
  - **Files**: `frontend/package.json`, `frontend/tsconfig.json`, `frontend/next.config.ts`, `frontend/postcss.config.mjs`
  - **Specs**: DOCKER-05
  - **Description**: Scaffold Next.js app via `create-next-app` with TypeScript, Tailwind, App Router, and `src/` dir. Configure Tailwind v4 CSS-first theme in `globals.css` with dark zinc tokens per design §3.1.
  - **Acceptance**: `npm run dev` serves on localhost:3000. Tailwind v4 `@import "tailwindcss"` works. Design tokens visible as CSS custom properties.
  - **Est. lines**: ~120

- [x] **1.2** Install and configure shadcn/ui
  - **Files**: `frontend/components.json`, `frontend/src/lib/utils.ts`, `frontend/src/components/ui/*`
  - **Specs**: None (infrastructure)
  - **Description**: Init shadcn/ui with `components.json` (zinc base, css variables). Add components: Button, Card, Badge, Separator, Skeleton, Input, Textarea, Alert.
  - **Acceptance**: All 8 UI components importable. Button renders with zinc theme. `npx shadcn@latest add` works for future additions.
  - **Est. lines**: ~170

- [x] **1.3** Configure fonts via next/font/google
  - **Files**: `frontend/src/app/layout.tsx` (stub), `frontend/src/app/globals.css`
  - **Specs**: PERF-03
  - **Description**: Load Playfair Display (headings), Inter (body), JetBrains Mono (code) via `next/font/google` with `display: "swap"` and CSS variables (`--font-playfair`, `--font-inter`, `--font-mono`).
  - **Acceptance**: Font CSS variables defined in layout. All three fonts load with swap behavior. No FOUT on slow connections.
  - **Est. lines**: ~30

- [x] **1.4** Set up ESLint + Prettier
  - **Files**: `frontend/.eslintrc.json`, `frontend/.prettierrc`
  - **Specs**: None (infrastructure)
  - **Description**: Configure ESLint with Next.js preset, TypeScript rules. Configure Prettier with consistent formatting (semi, singleQuote, trailingComma).
  - **Acceptance**: `npm run lint` passes. `npx prettier --check .` passes. Editor integration works.
  - **Est. lines**: ~25

- [x] **1.5** Create Express backend scaffold
  - **Files**: `backend/package.json`, `backend/tsconfig.json`, `backend/src/index.ts`, `backend/src/config.ts`, `backend/.env.example`
  - **Specs**: CONTACT-03, CONTACT-04
  - **Description**: Init Express + TypeScript project with tsx for dev. Create entry point with CORS, JSON parser, health route, contact route, error handler. Zod-validated config from env vars.
  - **Acceptance**: `npm run dev` serves Express on port 4000. `GET /api/health` returns `{ status: "ok", timestamp }`. Config validates env vars on startup.
  - **Est. lines**: ~120

- [x] **1.6** Implement backend contact route + middleware + email service
  - **Files**: `backend/src/routes/contact.ts`, `backend/src/middleware/rate-limiter.ts`, `backend/src/middleware/error-handler.ts`, `backend/src/services/email.ts`, `backend/src/schemas/contact.ts`
  - **Specs**: CONTACT-03, CONTACT-04
  - **Description**: POST /api/contact with Zod validation, rate limiting (3 req/15min), Resend email delivery. Global error handler. Zod schema shared between frontend and backend.
  - **Acceptance**: Valid POST returns 200 and sends email via Resend. Invalid body returns 400 with field errors. Rate limit exceeded returns 429. Resend failure returns 500 with fallback message.
  - **Est. lines**: ~125

- [x] **1.7** Create Docker Compose config (production + dev)
  - **Files**: `frontend/Dockerfile`, `backend/Dockerfile`, `docker-compose.yml`, `docker-compose.dev.yml`, `.dockerignore` ×2
  - **Specs**: DOCKER-01, DOCKER-02, DOCKER-03, DOCKER-04
  - **Description**: Multi-stage Dockerfiles (deps → builder → runner) for frontend (Next.js standalone output) and backend (tsc compile). docker-compose.yml with health check. Dev override with volume mounts and hot reload.
  - **Acceptance**: `docker compose up --build` starts both services, backend health check passes, frontend accessible on port 3000. Dev mode filesystem changes hot-reload.
  - **Est. lines**: ~170

- [x] **1.8** Create Vercel deployment config + .env.example
  - **Files**: `vercel.json`, `.env.example`
  - **Specs**: DOCKER-05
  - **Description**: vercel.json with nextjs framework preset, build command, output directory. .env.example listing all required env vars (RESEND_API_KEY, GITHUB_TOKEN, etc.).
  - **Acceptance**: `vercel.json` matches Vercel Next.js preset. .env.example documents all needed variables.
  - **Est. lines**: ~25

---

## Phase 2: Layout & Shared Components

- [x] **2.1** Build RootLayout with ThemeProvider, fonts, metadata
  - **Files**: `frontend/src/app/layout.tsx`
  - **Specs**: NAV-04, THEME-01, SEO-01
  - **Description**: Wrap `<html>` and `<body>` with next-themes `ThemeProvider` (`defaultTheme="dark"`, `attribute="class"`). Apply font CSS variables. Include `metadataBase`, title/description template. Compose Header, main content, Footer.
  - **Acceptance**: Dark theme applied on first visit. No flash of wrong theme. Fonts load correctly. Metadata tags present in `<head>`.
  - **Est. lines**: ~60

- [x] **2.2** Build GlassHeader with DesktopNav, MobileMenu, ThemeToggle
  - **Files**: `frontend/src/components/layout/GlassHeader.tsx`, `DesktopNav.tsx`, `MobileMenu.tsx`, `ThemeToggle.tsx`
  - **Specs**: NAV-01, NAV-04
  - **Description**: Sticky header with glassmorphism (backdrop-blur). DesktopNav shows inline nav links with scroll spy (IntersectionObserver). MobileMenu toggles full-screen overlay. ThemeToggle switches dark/light via `useTheme()`.
  - **Acceptance**: Header sticky on scroll. Nav links highlight active section. Mobile hamburger opens/closes menu. Theme toggle persists via localStorage. Escape closes mobile menu.
  - **Est. lines**: ~180

- [x] **2.3** Build Footer and SkipLink
  - **Files**: `frontend/src/components/layout/Footer.tsx`, `SkipLink.tsx`
  - **Specs**: NAV-02, NAV-03
  - **Description**: Static footer with copyright, GitHub/LinkedIn links, back-to-top anchor. SkipLink as first focusable element, SR-only until focused.
  - **Acceptance**: Footer renders at page bottom with working links. SkipLink visible on Tab, moves focus to `<main id="main-content">`.
  - **Est. lines**: ~50

- [x] **2.4** Build shared SectionHeading, Container, AnimatedSection
  - **Files**: `frontend/src/components/shared/SectionHeading.tsx`, `Container.tsx`, `AnimatedSection.tsx`
  - **Specs**: A11Y-01, A11Y-05, THEME-02
  - **Description**: SectionHeading renders h2 with subtitle. Container provides max-w-6xl + responsive padding. AnimatedSection wraps motion.section with `useReducedMotion()` gate for all scroll animations.
  - **Acceptance**: SectionHeading uses `id` for aria-labelledby. Container caps at 1280px. AnimatedSection disables all motion when `prefers-reduced-motion: reduce`.
  - **Est. lines**: ~60

- [x] **2.5** Create animation presets library
  - **Files**: `frontend/src/lib/animations.ts`
  - **Specs**: THEME-02
  - **Description**: Export `fadeInUp`, `fadeIn`, `staggerContainer`, `cardHover`, `prefersReducedMotion` presets per design §3.5. Enforce constraints: y ≤ 24px, scale ≤ 1.02, no spring/bounce/rotate.
  - **Acceptance**: All presets exportable. Constraints documented. Used by all animated components.
  - **Est. lines**: ~25

- [x] **2.6** Build home page composition
  - **Files**: `frontend/src/app/page.tsx`
  - **Specs**: PERF-01
  - **Description**: Compose all 8 sections sequentially: Hero, About, TechStack, Experience, Projects, Architecture, GitHub, Contact. Each section is a Server Component where possible. Wrap `<main id="main-content">`.
  - **Acceptance**: Page renders all sections. No JS errors on initial load. Each section has `<section id="...">` with aria-labelledby.
  - **Est. lines**: ~50

- [x] **2.7** Apply design token CSS variables to globals.css
  - **Files**: `frontend/src/app/globals.css`
  - **Specs**: THEME-01
  - **Description**: Define complete Tailwind v4 `@theme` block with all tokens from design §3.1: background, foreground, card, primary, secondary, muted, accent, border, ring, radius. Add glass-header class. `.dark` block mirrors `:root`.
  - **Acceptance**: All 14 tokens defined. Glass header renders with backdrop-blur. Dark/light toggle changes colors correctly.
  - **Est. lines**: ~50

- [x] **2.8** Verify layout accessibility baseline
  - **Files**: All Phase 2 files
  - **Specs**: A11Y-01, A11Y-02, A11Y-03
  - **Description**: Audit semantic HTML (header, nav, main, footer). Verify heading hierarchy (single h1). Add aria-labels to icon-only buttons. Ensure visible focus rings on all interactive elements.
  - **Acceptance**: Tab navigation reaches all interactive elements with visible focus rings. Screen reader announces "Toggle theme", "Skip to main content". Heading structure: h1 → h2 → h3, no skips.
  - **Est. lines**: ~10

---

## Phase 3: Data Layer

- [x] **3.1** Create profile data file with AI-generated Diego Silva content
  - **Files**: `frontend/src/data/profile.ts`
  - **Specs**: ABOUT-01, HERO-01
  - **Description**: Export `Profile` object with name ("Diego Silva"), title, tagline, professional bio (3-4 paragraphs — enterprise Java, digital identity focus, problem-solving approach), social links, email, CV URL. Transform CV data into recruiter-focused narrative. NOT literal CV copy.
  - **Acceptance**: Profile exports correctly typed. Bio is recruiter-focused prose, ~300 words. All links valid.
  - **Est. lines**: ~45

- [x] **3.2** Create experience data file
  - **Files**: `frontend/src/data/experience.ts`
  - **Specs**: EXP-01
  - **Description**: Export `Experience[]` array with 3 entries: ISA Interfase (2019–present, Full Stack Java), Beacon42 (2018–2019, Magento dev), Portlike (2017–2018, Programmer Analyst). Each with role, period, description, 3-4 highlights, technologies array.
  - **Acceptance**: Three entries correctly typed. Each has 3+ highlights. Technologies match Diego's actual stack. Ordered most recent first.
  - **Est. lines**: ~55

- [x] **3.3** Create projects data file
  - **Files**: `frontend/src/data/projects.ts`
  - **Specs**: PROJ-01
  - **Description**: Export `Project[]` with 4 entries: ISCERT, MiRecibo, FirmaPDF, Crowdfunding Platform. Each with name, description, problem statement, architecture overview, tech stack, challenges array, optional GitHub/demo URLs, image path. AI-generated content, not literal tech specs.
  - **Acceptance**: Four projects with complete fields. Problem and architecture sections are narrative. Tech stacks are accurate. Image paths valid.
  - **Est. lines**: ~100

- [x] **3.4** Create tech stack data file
  - **Files**: `frontend/src/data/tech-stack.ts`
  - **Specs**: TECH-01
  - **Description**: Export `TechCategory[]` with 5 categories: Backend, Frontend, Databases, DevOps, Security. Each with name, Lucide icon name, and skills array (name + optional proficiency level). Include all technologies from Diego's CV.
  - **Acceptance**: Five categories with correct Lucide icon names. All technologies covered (Java, Spring, React, Angular, PostgreSQL, Docker, OAuth2, etc.).
  - **Est. lines**: ~80

- [x] **3.5** Create architecture diagrams data file
  - **Files**: `frontend/src/data/architecture.ts`
  - **Specs**: ARCH-01
  - **Description**: Export `ArchitectureDiagram[]` with 5 entries: Microservices Architecture, Docker Container Orchestration, CI/CD Pipeline, Authentication Flow, Cloud Infrastructure. Each with Mermaid diagram code, label, and description.
  - **Acceptance**: Five diagrams with valid Mermaid syntax. Each has descriptive label and explanation. Diagrams reflect enterprise patterns Diego has worked with.
  - **Est. lines**: ~100

- [x] **3.6** Create navigation and site config data files
  - **Files**: `frontend/src/data/navigation.ts`, `frontend/src/data/site-config.ts`
  - **Specs**: NAV-01
  - **Description**: Navigation: array of { label, href } for all 8 sections. Site config: site name, description, base URL, social links, author info.
  - **Acceptance**: navLinks maps correctly to section IDs. Site config has all required metadata fields.
  - **Est. lines**: ~30

- [x] **3.7** Create TypeScript type definitions
  - **Files**: `frontend/src/types/github.ts`, `frontend/src/types/contact.ts`
  - **Specs**: GH-01, CONTACT-02
  - **Description**: GitHubUser, GitHubRepo interfaces matching REST API response. ContactFormData interface + Zod schema shared between frontend and backend. ContactFormResponse type.
  - **Acceptance**: Types match API response shapes. Zod schema validates correctly. Types importable from both frontend and backend.
  - **Est. lines**: ~35

- [x] **3.8** Create pinned repos data file
  - **Files**: `frontend/src/data/pinned-repos.ts`
  - **Specs**: GH-02
  - **Description**: Export `pinnedRepos: string[]` with 6 hardcoded `owner/repo` names. These drive the GitHubSection pinned repo display.
  - **Acceptance**: Array contains valid `DarkHunter1ero/repo-name` strings. At least 4 repos listed.
  - **Est. lines**: ~10

---

## Phase 4: Hero + About Sections

- [x] **4.1** Build HeroSection (Server Component) with static content
  - **Files**: `frontend/src/components/sections/HeroSection.tsx`, `HeroTitle.tsx`, `HeroSubtitle.tsx`
  - **Specs**: HERO-01, PERF-01
  - **Description**: Server Component. Renders professional tag ("Senior Full Stack Developer"), h1 name from profile, subtitle from profile.tagline. Zero client JS for text rendering.
  - **Acceptance**: Hero text renders as static HTML. CSS-only (no JS needed for LCP). Heading is single h1 on page.
  - **Est. lines**: ~55

- [x] **4.2** Build HeroBackground (Client Component) with CSS-only gradient animation
  - **Files**: `frontend/src/components/sections/HeroBackground.tsx`
  - **Specs**: HERO-02
  - **Description**: Animated radial gradient background using CSS `@keyframes pulseOpacity`. Two overlapping gradients at different speeds. Respects `prefers-reduced-motion` — static gradient when reduced motion preferred. No canvas, no JS animation loop.
  - **Acceptance**: Gradient animates on load. Animation disabled when reduced motion is set. No performance impact on LCP (CSS-only).
  - **Est. lines**: ~45

- [x] **4.3** Build HeroCTA (Client Component) with animated buttons
  - **Files**: `frontend/src/components/sections/HeroCTA.tsx`
  - **Specs**: HERO-01
  - **Description**: Three CTA buttons: Download CV (links `/cv.pdf` with download attr), GitHub (links `github.com/DarkHunter1ero`), LinkedIn. Primary button uses accent color. Hover: `scale: 1.05`. Tap: `scale: 0.98`.
  - **Acceptance**: All three buttons render and link correctly. CV button has `download` attribute. Hover animation works. Buttons responsive on mobile.
  - **Est. lines**: ~40

- [x] **4.4** Build AboutSection (Server Component)
  - **Files**: `frontend/src/components/sections/AboutSection.tsx`, `AboutContent.tsx`
  - **Specs**: ABOUT-01
  - **Description**: Two-column layout: bio prose (lg:col-span-2) + stat cards (1 col). Sources content from `profile.bio`. Renders as static HTML.
  - **Acceptance**: Bio text is indexable by search engines. Layout switches to single column on mobile. Zero client JS.
  - **Est. lines**: ~50

- [x] **4.5** Build StatCard and AboutStats components
  - **Files**: `frontend/src/components/sections/AboutStats.tsx`, `frontend/src/components/sections/StatCard.tsx`
  - **Specs**: ABOUT-01
  - **Description**: StatCard renders label + value with accent bottom border. Three cards: 6+ years, 50+ projects, 30+ technologies. No animation — static content.
  - **Acceptance**: Three stat cards render in a column. Values match profile data. Visual treatment uses accent color for emphasis.
  - **Est. lines**: ~30

- [x] **4.6** Verify Hero + About against spec scenarios
  - **Files**: Phase 4 files
  - **Specs**: HERO-01, HERO-02, ABOUT-01
  - **Description**: Manual verification: Hero text LCP, reduced motion disables gradient animation, CV download attribute, bio content indexable, stat cards display correctly.
  - **Acceptance**: All 5 Phase 4 spec scenarios pass manual verification.
  - **Est. lines**: ~0 (QA task)

---

## Phase 5: Tech Stack + Experience

- [x] **5.1** Build TechStackSection (Server wrapper)
  - **Files**: `frontend/src/components/sections/TechStackSection.tsx`
  - **Specs**: TECH-01
  - **Description**: Server Component importing `techStack` data and passing to `TechStackGrid` client component. Background: `bg-card/30`.
  - **Acceptance**: Section renders SectionHeading + grid. TechStackGrid receives correctly typed categories.
  - **Est. lines**: ~25

- [x] **5.2** Build TechStackGrid (Client Component) with stagger animation
  - **Files**: `frontend/src/components/sections/TechStackGrid.tsx`
  - **Specs**: TECH-01, TECH-02
  - **Description**: Motion container with `staggerChildren: 0.1`. Maps categories to TechCategoryCard. Uses `whileInView: once`. Responsive grid: 1 col mobile, 2 cols tablet, 3 cols desktop.
  - **Acceptance**: Cards animate in with stagger. Each card triggers once. Grid responsive at all breakpoints.
  - **Est. lines**: ~45

- [x] **5.3** Build TechCategoryCard and TechBadge
  - **Files**: `frontend/src/components/sections/TechCategoryCard.tsx`, `TechBadge.tsx`
  - **Specs**: TECH-01, TECH-02
  - **Description**: Card with Lucide category icon, title, and TechBadge list. Hover: `scale: 1.02`, elevated shadow (0.3s ease). Each TechBadge renders pill-shaped label with optional proficiency indicator.
  - **Acceptance**: Card hover animation works. Reduced motion disables hover scale. Badges display tech names correctly.
  - **Est. lines**: ~75

- [x] **5.4** Build ExperienceSection (Server wrapper)
  - **Files**: `frontend/src/components/sections/ExperienceSection.tsx`
  - **Specs**: EXP-01
  - **Description**: Server Component importing `experience` data and passing to `ExperienceTimeline` client component.
  - **Acceptance**: Section renders SectionHeading + timeline. Data passes correctly.
  - **Est. lines**: ~25

- [x] **5.5** Build ExperienceTimeline + TimelineItem (Client Components)
  - **Files**: `frontend/src/components/sections/ExperienceTimeline.tsx`, `TimelineItem.tsx`, `TimelineDot.tsx`
  - **Specs**: EXP-01, EXP-02
  - **Description**: Vertical timeline with left border line. Alternating left/right cards on desktop, single column on mobile. Dot connector on line. Each item fades in + slides up 24px with 0.15s stagger. `whileInView: once`.
  - **Acceptance**: Desktop shows alternating layout. Mobile stacks single column. Scroll-triggered animation fires once per item. Reduced motion disables all.
  - **Est. lines**: ~125

- [x] **5.6** Verify Tech Stack + Experience against spec scenarios
  - **Files**: Phase 5 files
  - **Specs**: TECH-01, TECH-02, EXP-01, EXP-02
  - **Description**: Verify: 5 category cards with icons + badges, hover scale 1.02, reduced motion disables hover, timeline alternating layout, scroll stagger animation, once:true behavior.
  - **Acceptance**: All 6 Phase 5 spec scenarios pass manual verification.
  - **Est. lines**: ~0 (QA task)

---

## Phase 6: Projects + Architecture

- [x] **6.1** Build ProjectsSection + ProjectCard (Server wrapper)
  - **Files**: `frontend/src/components/sections/ProjectsSection.tsx`, `ProjectCard.tsx`
  - **Specs**: PROJ-01
  - **Description**: Server Component rendering responsive grid (1 col mobile, 2 cols tablet+). ProjectCard renders title, description, tech tags as children passed to ProjectCardClient. Missing image shows placeholder gradient.
  - **Acceptance**: Four project cards in grid. Responsive column count works. Missing image shows placeholder, not broken image.
  - **Est. lines**: ~70

- [x] **6.2** Build ProjectCardClient, ProjectImage, ProjectLinks (Client)
  - **Files**: `frontend/src/components/sections/ProjectCardClient.tsx`, `ProjectImage.tsx`, `ProjectLinks.tsx`
  - **Specs**: PROJ-01, PROJ-02
  - **Description**: Client wrapper adding hover: card lifts 4px, shadow increases, image scales 1.05. ProjectImage uses `next/image` with blur placeholder, lazy loading, responsive sizes. ProjectLinks renders GitHub/Demo buttons with hover scale.
  - **Acceptance**: Card hover lift works. Image lazy loads with blur-up. GitHub/Demo buttons link correctly. Reduced motion disables all hover effects.
  - **Est. lines**: ~100

- [x] **6.3** Build ArchitectureSection (Server wrapper)
  - **Files**: `frontend/src/components/sections/ArchitectureSection.tsx`
  - **Specs**: ARCH-01
  - **Description**: Server Component importing `architectureDiagrams` data and passing to `DiagramTabs` client component.
  - **Acceptance**: Section renders SectionHeading + tab switcher. Data passes correctly.
  - **Est. lines**: ~25

- [x] **6.4** Build DiagramTabs (Client Component) with tab switcher
  - **Files**: `frontend/src/components/sections/DiagramTabs.tsx`
  - **Specs**: ARCH-01
  - **Description**: Tab buttons for 5 diagrams. Active tab uses accent border. Tab content uses `AnimatePresence` for fade + slide transition. Dynamically imports `MermaidDiagram` with `{ ssr: false, loading: Skeleton }`.
  - **Acceptance**: Tab click switches diagrams with animation. Only active diagram's Mermaid is loaded. Skeleton shown during dynamic import.
  - **Est. lines**: ~70

- [x] **6.5** Build MermaidDiagram (Client Component, dynamic import)
  - **Files**: `frontend/src/components/sections/MermaidDiagram.tsx`
  - **Specs**: ARCH-01, PERF-04
  - **Description**: Dynamically imported (NEVER in main bundle). Initializes Mermaid on mount via `useEffect`. Renders SVG with `role="img"` and `aria-label`. Error boundary shows raw Mermaid code as fallback.
  - **Acceptance**: Mermaid loads lazily. Diagram renders as interactive SVG. Invalid syntax shows fallback with raw code. Screen reader sees aria-label.
  - **Est. lines**: ~75

- [x] **6.6** Verify Projects + Architecture against spec scenarios
  - **Files**: Phase 6 files
  - **Specs**: PROJ-01, PROJ-02, ARCH-01, PERF-04
  - **Description**: Verify: 4 project cards, missing image fallback, hover lift 4px, Mermaid lazy load, skeleton during load, error fallback for invalid syntax, keyboard accessibility on SVGs.
  - **Acceptance**: All 6 Phase 6 spec scenarios pass manual verification.
  - **Est. lines**: ~0 (QA task)

- [x] **6.7** Verify bundle analysis: Mermaid excluded from main bundle
  - **Files**: `frontend/next.config.ts`, bundle analysis output
  - **Specs**: PERF-04
  - **Description**: Run `ANALYZE=true next build`. Confirm no client chunk > 50KB gzipped. Mermaid in separate chunk. Framer Motion tree-shaken.
  - **Acceptance**: Bundle analysis shows Mermaid isolated. All chunks under 50KB gzipped.
  - **Est. lines**: ~5

---

## Phase 7: GitHub + Contact

- [x] **7.1** Build GitHub API client library
  - **Files**: `frontend/src/lib/github.ts`
  - **Specs**: GH-01, GH-02, ERR-04
  - **Description**: `fetchGitHubRepos()` fetches from `/users/DarkHunter1ero/repos` and `/repos/DarkHunter1ero/{repo}/languages` with PAT auth, ISR caching (`revalidate: 3600`). Uses `Promise.allSettled` for resilience. `fetchUserProfile()` gets user stats.
  - **Acceptance**: Fetches work with valid GITHUB_TOKEN. Rate limit fallback returns cached data. Missing token still works (unauthenticated). Console warning in dev without token.
  - **Est. lines**: ~80

- [x] **7.2** Build GitHubSection (Server Component, ISR) with sub-components
  - **Files**: `frontend/src/components/sections/GitHubSection.tsx`, `GitHubStats.tsx`, `RepoCard.tsx`, `RepoGrid.tsx`, `GitHubFallback.tsx`
  - **Specs**: GH-01, GH-02, GH-03, ERR-04
  - **Description**: Server Component with `try/catch` around GitHub fetches. Renders GitHubStats (repos count, followers), pinned repos first (from `pinned-repos.ts`) then general list. RepoCard shows name, description, stars, language. GitHubFallback shows "temporarily unavailable" + direct link.
  - **Acceptance**: Repos render from API. Pinned repos have priority. Stats summary row visible. Fallback shows when API fails with no cache. Stale cache served during revalidation.
  - **Est. lines**: ~160

- [x] **7.3** Build LanguageBar (Client Component)
  - **Files**: `frontend/src/components/sections/LanguageBar.tsx`
  - **Specs**: GH-02
  - **Description**: Colored bar segments proportional to language percentages. Hover expands width slightly. Single Client Component in GitHubSection.
  - **Acceptance**: Language segments render proportionally. Hover animation works. Reduced motion disables hover.
  - **Est. lines**: ~45

- [x] **7.4** Build ContactSection (Server wrapper) + ContactInfo
  - **Files**: `frontend/src/components/sections/ContactSection.tsx`, `ContactInfo.tsx`
  - **Specs**: CONTACT-01
  - **Description**: Two-column layout: ContactInfo (email, LinkedIn, GitHub, Location with Lucide icons) on left, ContactForm on right. All contact info is Server-rendered.
  - **Acceptance**: Contact info renders with correct icons and links. `mailto:` link works. Layout stacks on mobile.
  - **Est. lines**: ~60

- [x] **7.5** Build ContactForm (Client Component) with state machine
  - **Files**: `frontend/src/components/sections/ContactForm.tsx`, `FormField.tsx`, `FormTextarea.tsx`, `SubmitButton.tsx`
  - **Specs**: CONTACT-01, CONTACT-02, CONTACT-03, ERR-05
  - **Description**: Form with name, email, message fields. Client-side Zod validation on submit. State machine: idle → submitting → success | error. Submit button shows Loader2 spinner + "Sending...". Disabled during submission. Error states: validation (field-level), rate limit (429), server error (500), network error. Success shows checkmark + message.
  - **Acceptance**: Empty submission shows inline errors. Invalid email caught client-side. Valid submission POSTs to `/api/contact`. All 4 states render correctly. Error fields linked via aria-describedby. Tab order logical.
  - **Est. lines**: ~160

- [x] **7.6** Configure ISR revalidation for page
  - **Files**: `frontend/src/app/page.tsx` (update)
  - **Specs**: PERF-02
  - **Description**: Add `export const revalidate = 3600` to page.tsx for GitHubSection ISR.
  - **Acceptance**: Page uses ISR with 1-hour revalidation. Static sections unaffected.
  - **Est. lines**: ~3

- [x] **7.7** Verify GitHub + Contact against spec scenarios
  - **Files**: Phase 7 files
  - **Specs**: GH-01, GH-02, GH-03, CONTACT-01, CONTACT-02, CONTACT-03, ERR-04, ERR-05
  - **Description**: Verify: GitHub fetch with ISR, rate limit fallback, missing token behavior, pinned repos priority, language bar, stats display, contact form all states (idle/submitting/success/error), backend validation, rate limiting, Resend delivery.
  - **Acceptance**: All 14 Phase 7 spec scenarios pass manual verification.
  - **Est. lines**: ~0 (QA task)

- [x] **7.8** Verify backend health check and Docker integration
  - **Files**: `backend/src/routes/health.ts`, `docker-compose.yml`
  - **Specs**: CONTACT-04, DOCKER-03
  - **Description**: Confirm GET /api/health returns 200. Docker health check passes within 30s. Backend starts before frontend in compose.
  - **Acceptance**: `docker compose up` shows healthy backend before frontend starts. `curl localhost:4000/api/health` returns ok.
  - **Est. lines**: ~0 (QA task)

- [x] **7.9** Verify end-to-end contact form flow
  - **Files**: Frontend ContactForm + backend contact route
  - **Specs**: CONTACT-03
  - **Description**: Full flow: fill form → submit → backend validates → Resend sends → success response → frontend shows success. Test error paths: 400, 429, 500.
  - **Acceptance**: E2E flow works with real Resend API key. All error states display correct messages.
  - **Est. lines**: ~0 (QA task)

---

## Phase 8: Polish & Optimization

- [x] **8.1** Add SEO metadata to RootLayout
  - **Files**: `frontend/src/app/layout.tsx`
  - **Specs**: SEO-01
  - **Description**: Complete metadata export: title.template `"%s | Diego Silva"`, description, metadataBase, openGraph (type, locale, siteName, images), twitter card. Favicon configuration.
  - **Acceptance**: Open Graph tags visible in page source. Twitter card validator passes. LinkedIn preview shows correct title/description.
  - **Est. lines**: ~30

- [x] **8.2** Add JSON-LD structured data (Person schema)
  - **Files**: `frontend/src/components/seo/JsonLd.tsx`
  - **Specs**: SEO-02
  - **Description**: Render `<script type="application/ld+json">` with Person schema: name, jobTitle, url, sameAs (GitHub, LinkedIn), knowsAbout (technologies).
  - **Acceptance**: Google Rich Results Test validates schema. Schema injected in `<head>`.
  - **Est. lines**: ~25

- [x] **8.3** Generate sitemap.xml and robots.txt
  - **Files**: `frontend/src/app/sitemap.ts`, `frontend/src/app/robots.ts`
  - **Specs**: SEO-03
  - **Description**: `sitemap.ts` exports dynamic sitemap with homepage URL. `robots.ts` returns `Allow: /` with Sitemap directive.
  - **Acceptance**: `/sitemap.xml` returns valid XML. `/robots.txt` returns correct directives. Both accessible in production.
  - **Est. lines**: ~20

- [x] **8.4** Build loading.tsx, error.tsx, not-found.tsx
  - **Files**: `frontend/src/app/loading.tsx`, `frontend/src/app/error.tsx`, `frontend/src/app/not-found.tsx`
  - **Specs**: ERR-01, ERR-02, ERR-03
  - **Description**: Loading: full-page skeleton with Skeleton components mirroring layout. Error: "use client" boundary with "Something went wrong" + reset button, error details in dev only. Not-found: 404 page with centered message + link home.
  - **Acceptance**: Skeleton renders during streaming/SSG. Error boundary catches rendering failures. 404 serves correct HTTP status. Dev mode shows error stack.
  - **Est. lines**: ~90

- [x] **8.5** Accessibility audit and fixes
  - **Files**: All components
  - **Specs**: A11Y-01–05
  - **Description**: Run Lighthouse Accessibility audit. Verify: WCAG AA contrast (≥4.5:1), semantic HTML throughout, heading hierarchy no skips, all interactive elements keyboard-accessible, aria-labels on icon-only elements, form error aria-describedby, reduced motion gates all animations, 44×44px touch targets on mobile.
  - **Acceptance**: Lighthouse Accessibility score ≥ 95. All 5 A11Y spec scenarios pass.
  - **Est. lines**: ~40

- [x] **8.6** Performance optimization pass
  - **Files**: All components, `next.config.ts`
  - **Specs**: PERF-01–05
  - **Description**: Run Lighthouse Performance audit. Optimize: ensure Server Components for static content, verify Mermaid not in main bundle, image optimization with next/image (WebP/AVIF, explicit dimensions, lazy loading), font display swap, CSS-only animations, no render-blocking resources. Target LCP < 2.5s.
  - **Acceptance**: Lighthouse Performance score ≥ 95. CLS < 0.1. No client chunk > 50KB gzipped.
  - **Est. lines**: ~30

- [x] **8.7** Responsive design QA
  - **Files**: All components
  - **Specs**: RESP-01, RESP-02, RESP-03
  - **Description**: Verify at 375px (iPhone SE), 768px (iPad), 1024px, 1920px. Check: no horizontal scroll, hamburger menu at <768px, cards stack single column mobile, timeline single column mobile, all touch targets ≥44px, container max-w-6xl on desktop, typography scales correctly.
  - **Acceptance**: All 3 RESP spec scenarios pass. No overflow at any breakpoint. Content readable at all sizes.
  - **Est. lines**: ~10
