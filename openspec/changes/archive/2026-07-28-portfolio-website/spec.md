# Portfolio Website — Diego Silva · Specification

> **Change**: `portfolio-website` | **Type**: New (greenfield) | **Blog**: Excluded per user decision

## Purpose

Define the behavioral contract for Diego Silva's professional portfolio website — a dark-themed, performance-optimized single-page application built with Next.js 15, React 19, TypeScript, Tailwind CSS v4, and Docker Compose for local development. Deployed to Vercel free tier.

---

## 1. Navigation & Layout

### Requirement: NAV-01 — Global Header with Navigation

The system SHALL render a sticky header containing the site logo/name, navigation links to all page sections (Hero, About, Tech Stack, Experience, Projects, Architecture, GitHub, Contact), a theme toggle, and a mobile hamburger menu. The header MUST be a Client Component (`'use client'`) to handle theme state and mobile menu interactivity.

#### Scenario: Desktop navigation scroll tracking
- **GIVEN** the user is on a desktop viewport (>1024px)
- **WHEN** the user scrolls through page sections
- **THEN** the active nav link SHALL highlight based on the currently visible section (scroll spy)

#### Scenario: Mobile menu toggle
- **GIVEN** the user is on a mobile viewport (<768px)
- **WHEN** the user taps the hamburger icon
- **THEN** a full-screen overlay menu SHALL open with all nav links
- **AND** tapping a link SHALL close the menu and scroll to the target section
- **AND** pressing Escape SHALL close the menu

#### Scenario: Theme toggle persistence
- **GIVEN** the user toggles the theme from dark to light (or vice versa)
- **WHEN** the page reloads
- **THEN** the theme preference SHALL persist via localStorage

### Requirement: NAV-02 — Global Footer

The system SHALL render a static footer (Server Component) containing copyright text, social links (GitHub, LinkedIn), and a back-to-top link.

#### Scenario: Footer visibility
- **GIVEN** the page is fully rendered
- **WHEN** the user scrolls to the bottom
- **THEN** the footer SHALL be present with working links

### Requirement: NAV-03 — Skip to Main Content

The system SHALL provide a "Skip to main content" link as the first focusable element on every page.

#### Scenario: Keyboard navigation skip
- **GIVEN** the user presses Tab on page load
- **WHEN** the skip link receives focus
- **THEN** it SHALL become visible
- **AND** pressing Enter SHALL move focus to the `<main>` element

### Requirement: NAV-04 — Forced Dark Theme Default

The system SHALL default to dark theme on first visit. The `next-themes` Provider MUST be configured with `defaultTheme="dark"` and `enableSystem={false}` (or respect system preference if `enableSystem` is set).

#### Scenario: First visit theme
- **GIVEN** a new user with no theme cookie/localStorage
- **WHEN** the page loads
- **THEN** the dark theme SHALL be applied immediately with no flash of light theme

---

## 2. Hero Section

### Requirement: HERO-01 — Hero Content

The system SHALL render a hero section containing: full name ("Diego Silva"), professional title, a subtitle describing expertise ("I build secure, scalable and high-performance enterprise applications…"), and three CTA buttons (Download CV, GitHub, LinkedIn).

#### Scenario: Hero renders static content
- **GIVEN** the homepage loads
- **WHEN** the Hero section is in the viewport
- **THEN** all text content and CTA buttons SHALL be visible immediately (RSC → static HTML)
- **AND** the CV button SHALL link to `/cv.pdf` with `download` attribute
- **AND** the GitHub button SHALL link to `https://github.com/DarkHunter1ero`
- **AND** the LinkedIn button SHALL link to Diego's LinkedIn profile

### Requirement: HERO-02 — Animated Gradient Background

The system SHALL display a CSS-only animated gradient background behind the hero section. The animation MUST be subtle, use opacity/position transitions only (no neon, no particles), and respect `prefers-reduced-motion`.

#### Scenario: Reduced motion preference
- **GIVEN** the user has `prefers-reduced-motion: reduce` enabled
- **WHEN** the hero section renders
- **THEN** the gradient background animation SHALL be disabled
- **AND** a static gradient SHALL display instead

#### Scenario: Performance budget
- **GIVEN** the hero section is in the initial viewport
- **WHEN** Lighthouse audits LCP
- **THEN** the hero SHALL contribute no render-blocking resources (CSS-only background, no JS, no canvas, no external images that aren't `priority`-tagged)

---

## 3. About Me

### Requirement: ABOUT-01 — Professional Story

The system SHALL render a Server Component with Diego's professional narrative: his background in enterprise Java development, focus on digital identity and electronic signatures, problem-solving approach, and career goals. Content SHALL be sourced from `src/data/profile.ts`.

#### Scenario: Static content delivery
- **GIVEN** the homepage is built and deployed
- **WHEN** the About section renders
- **THEN** content SHALL be delivered as static HTML with zero client-side JavaScript required for rendering
- **AND** search engines SHALL index the full bio text

---

## 4. Tech Stack

### Requirement: TECH-01 — Categorized Tech Cards

The system SHALL display technology skills organized into five categories: Backend, Frontend, Databases, DevOps, and Security. Each category SHALL render as a card with a title, category icon (Lucide), and a list of technology badges. Data SHALL be sourced from `src/data/tech-stack.ts`.

#### Scenario: Category cards render with icons
- **GIVEN** the Tech Stack section is in the viewport
- **WHEN** the section renders
- **THEN** five category cards SHALL be visible, each with a Lucide icon and technology list
- **AND** each technology SHALL render as a badge/label with the tech name

### Requirement: TECH-02 — Card Hover Animation

The system SHALL apply a subtle scale-up (`scale: 1 → 1.02`) and elevated shadow on hover for each tech category card. The TechStackCard component MUST be a Client Component to handle hover state.

#### Scenario: Hover interaction
- **GIVEN** the user hovers over a tech category card
- **WHEN** the cursor enters the card boundary
- **THEN** the card SHALL scale to 1.02 with a smooth 0.3s ease transition
- **AND** the shadow SHALL increase subtly
- **AND** the cursor exit SHALL reverse the animation

#### Scenario: Reduced motion
- **GIVEN** the user has `prefers-reduced-motion: reduce` enabled
- **WHEN** the user hovers over a tech card
- **THEN** no scale or shadow animation SHALL play

---

## 5. Experience Timeline

### Requirement: EXP-01 — Vertical Timeline Layout

The system SHALL render a vertical timeline showing Diego's three professional roles: ISA Interfase (2019–present), Beacon42 (2018–2019), and Portlike (2017–2018). Each entry SHALL display company name, role title, date range, and key achievements. The layout SHALL use an alternating left/right card pattern on desktop and a single-column layout on mobile. Data SHALL be sourced from `src/data/experience.ts`.

#### Scenario: Desktop alternating layout
- **GIVEN** the user is on a desktop viewport (>1024px)
- **WHEN** the Experience section renders
- **THEN** timeline entries SHALL alternate left and right of the central line
- **AND** the most recent role (ISA Interfase) SHALL appear first

#### Scenario: Mobile single column
- **GIVEN** the user is on a mobile viewport (<768px)
- **WHEN** the Experience section renders
- **THEN** all entries SHALL stack in a single column left of the timeline line

### Requirement: EXP-02 — Staggered Scroll Animation

The system SHALL animate timeline entries into view as the user scrolls. Each entry SHALL fade in and slide up (`translateY: 24px → 0`) with a 0.1s stagger between entries. The ExperienceTimeline component MUST be a Client Component (`'use client'`) using Framer Motion's `whileInView` with `once: true`.

#### Scenario: Scroll-triggered entry animation
- **GIVEN** the Experience section is below the fold
- **WHEN** the user scrolls and the first timeline entry enters the viewport
- **THEN** it SHALL fade in and slide up over 0.4s
- **AND** subsequent entries SHALL appear with 0.1s stagger delay
- **AND** each animation SHALL fire only once (`once: true`)

---

## 6. Featured Projects

### Requirement: PROJ-01 — Project Cards

The system SHALL display four featured projects as cards: ISCERT, MiRecibo, FirmaPDF, and Crowdfunding Platform. Each card SHALL include a project title, description, technology tags, an image placeholder (with `next/image`), and optional GitHub/Demo buttons. Data SHALL be sourced from `src/data/projects.ts`.

#### Scenario: All four projects render
- **GIVEN** the Projects section is in the viewport
- **WHEN** the section renders
- **THEN** four project cards SHALL be visible in a responsive grid (1 col mobile, 2 cols tablet, 2 cols desktop)
- **AND** each card SHALL show title, description, tech tags, and action buttons

#### Scenario: Missing image fallback
- **GIVEN** a project has no image defined in the data file
- **WHEN** the project card renders
- **THEN** a placeholder gradient or icon SHALL display instead of a broken image

### Requirement: PROJ-02 — Card Hover Effect

The system SHALL apply a subtle card lift on hover. The ProjectCard component MUST be a Client Component.

#### Scenario: Card hover
- **GIVEN** the user hovers over a project card
- **WHEN** the cursor enters the card
- **THEN** the card SHALL translate up by 4px with a 0.3s transition
- **AND** the shadow SHALL increase

---

## 7. Architecture Showcase

### Requirement: ARCH-01 — Mermaid Diagram Rendering

The system SHALL render five interactive Mermaid diagrams: Microservices Architecture, Docker Container Orchestration, CI/CD Pipeline, Authentication Flow, and Cloud Infrastructure. The ArchitectureSection and ArchitectureDiagram components MUST be Client Components using dynamic import with `{ ssr: false }` to prevent Mermaid from bloating the main bundle. Diagram definitions SHALL be sourced from `src/data/architecture.ts`.

#### Scenario: Lazy-loaded Mermaid rendering
- **GIVEN** the Architecture section is below the fold
- **WHEN** the user scrolls near the section (within 200px of viewport entry)
- **THEN** the Mermaid library SHALL be dynamically imported
- **AND** a loading skeleton SHALL display while Mermaid loads
- **AND** the diagram SHALL render as an SVG with interactive zoom/pan support

#### Scenario: Diagram rendering failure
- **GIVEN** a Mermaid diagram definition contains invalid syntax
- **WHEN** the diagram attempts to render
- **THEN** an error message SHALL display: "Diagram could not be rendered"
- **AND** the raw diagram code SHALL be available for debugging (collapsed by default)

#### Scenario: Keyboard accessibility for SVGs
- **GIVEN** a Mermaid diagram has rendered as SVG
- **WHEN** a screen reader encounters the diagram
- **THEN** the SVG SHALL have `role="img"` and an `aria-label` describing the diagram content

---

## 8. GitHub Activity

### Requirement: GH-01 — Repository Fetch with ISR

The system SHALL fetch Diego's public repositories from the GitHub REST API (`/users/DarkHunter1ero/repos`) in a Server Component using `fetch()` with `Authorization: Bearer {GITHUB_TOKEN}` header and ISR caching (`next: { revalidate: 3600 }`). The `src/lib/github.ts` module SHALL contain the fetch logic.

#### Scenario: Successful data fetch
- **GIVEN** a valid GITHUB_TOKEN environment variable is set
- **WHEN** the GitHub section renders during build or ISR revalidation
- **THEN** repository data SHALL be fetched and rendered
- **AND** the response SHALL be cached for 1 hour

#### Scenario: Rate limit exceeded
- **GIVEN** the GitHub API returns HTTP 403 with rate limit headers
- **WHEN** the fetch occurs
- **THEN** the section SHALL display cached data if available (stale-while-revalidate)
- **AND** if no cache exists, it SHALL display: "GitHub data temporarily unavailable"

#### Scenario: Missing token
- **GIVEN** no GITHUB_TOKEN is configured
- **WHEN** the fetch occurs
- **THEN** the request SHALL still proceed (unauthenticated, 60 req/h limit)
- **AND** a warning SHALL be logged in development mode

### Requirement: GH-02 — Pinned Repositories

The system SHALL display a curated list of pinned repositories (hardcoded names in `src/data/pinned-repos.ts`) with priority placement above the full repo list. Each pinned repo SHALL show name, description, language breakdown (via `/repos/DarkHunter1ero/{repo}/languages`), star count, and a link to GitHub.

#### Scenario: Pinned repos render first
- **GIVEN** pinned repos are configured in the data file
- **WHEN** the GitHub section renders
- **THEN** pinned repos SHALL appear before the general repository list
- **AND** each SHALL display a language bar showing proportionally colored segments

### Requirement: GH-03 — Contribution Stats

The system SHALL display Diego's GitHub contribution statistics: total public repos, total stars received, and contribution graph (summary or embedded image via `ghchart` or similar).

#### Scenario: Stats render
- **GIVEN** GitHub data is successfully fetched
- **WHEN** the GitHub section renders
- **THEN** statistics SHALL be displayed in a summary row above the repo cards

---

## 9. Contact Section

### Requirement: CONTACT-01 — Contact Form Client Component

The system SHALL render a contact form with fields: name (text), email (email), and message (textarea). The ContactForm component MUST be a Client Component (`'use client'`) managing form state, client-side validation, submission, and response handling. The ContactSection wrapper SHALL be a Server Component.

#### Scenario: Form renders with all fields
- **GIVEN** the Contact section is in the viewport
- **WHEN** the section renders
- **THEN** name, email, and message fields SHALL be visible
- **AND** the submit button SHALL be labeled "Send Message" or equivalent
- **AND** social links (GitHub, LinkedIn, email) SHALL be displayed alongside the form

### Requirement: CONTACT-02 — Form Validation

The system SHALL validate all fields before submission: name MUST be non-empty (min 2 chars), email MUST match email format, message MUST be non-empty (min 10 chars). Validation errors SHALL display inline below each field with descriptive messages.

#### Scenario: Empty field submission
- **GIVEN** the user leaves all fields empty
- **WHEN** the user clicks submit
- **THEN** error messages SHALL appear below each field: "Name is required", "Valid email is required", "Message must be at least 10 characters"
- **AND** no network request SHALL be made

#### Scenario: Invalid email format
- **GIVEN** the user enters "notanemail" in the email field
- **WHEN** the user clicks submit
- **THEN** the error message "Please enter a valid email address" SHALL display below the email field

#### Scenario: Successful validation
- **GIVEN** all fields contain valid data
- **WHEN** the user clicks submit
- **THEN** the form SHALL POST to the backend at `/api/contact`
- **AND** the submit button SHALL show a loading state during the request

### Requirement: CONTACT-03 — Backend Contact API

The system SHALL provide an Express endpoint at `POST /api/contact` that: validates the request body with Zod, sends the message via Resend to `diego1silva2@gmail.com`, and rate-limits to 3 requests per 15 minutes per IP. The Express server SHALL run on port 4000 with CORS configured for the frontend origin.

#### Scenario: Successful email delivery
- **GIVEN** valid contact form data is submitted
- **WHEN** the Express server receives the POST request
- **THEN** Zod validation SHALL pass
- **AND** Resend SHALL deliver the email to `diego1silva2@gmail.com`
- **AND** the response SHALL be `200 { success: true }`
- **AND** the frontend SHALL display a success message

#### Scenario: Backend validation failure
- **GIVEN** the frontend bypasses client validation (or validation differs)
- **WHEN** the Express server receives invalid data
- **THEN** the response SHALL be `400 { error: "Validation failed", details: [...] }`
- **AND** the frontend SHALL display the server-returned error messages

#### Scenario: Rate limit exceeded
- **GIVEN** the user has submitted 3 contact forms in 15 minutes
- **WHEN** the user submits a fourth form
- **THEN** the response SHALL be `429 { error: "Too many requests. Please try again later." }`
- **AND** the frontend SHALL display the rate limit message

#### Scenario: Resend API failure
- **GIVEN** the Resend API is unreachable or returns an error
- **WHEN** the contact form is submitted with valid data
- **THEN** the response SHALL be `500 { error: "Failed to send message. Please try again or email directly." }`
- **AND** the frontend SHALL display the error message
- **AND** the contact section SHALL also show a direct email link (`mailto:diego1silva2@gmail.com`) as fallback

### Requirement: CONTACT-04 — Health Check Endpoint

The system SHALL provide a `GET /api/health` endpoint that returns `200 { status: "ok", timestamp: "<ISO-8601>" }` for Docker health checks and monitoring.

#### Scenario: Health check response
- **GIVEN** the Express server is running
- **WHEN** a GET request hits `/api/health`
- **THEN** the response SHALL be HTTP 200 with status "ok" and a current timestamp

---

## 10. Performance & SEO

### Requirement: PERF-01 — Static Generation for Non-Dynamic Sections

All content sections that source data from static TypeScript files (Hero, About, Tech Stack, Experience, Projects) SHALL be Server Components rendered at build time as static HTML. No client-side JavaScript SHALL be required for their initial render.

#### Scenario: Lighthouse Performance audit
- **GIVEN** the site is built and deployed
- **WHEN** a Lighthouse Performance audit runs
- **THEN** the score SHALL be ≥ 95

### Requirement: PERF-02 — ISR Caching for Dynamic Sections

The GitHub Activity section SHALL use Incremental Static Regeneration with `revalidate: 3600` (1 hour). Stale content SHALL be served while revalidation occurs in the background.

#### Scenario: Stale-while-revalidate
- **GIVEN** cached GitHub data exists and is 1.5 hours old
- **WHEN** a user visits the page
- **THEN** the cached (stale) data SHALL be served immediately
- **AND** a background revalidation SHALL fetch fresh data for the next visitor

### Requirement: PERF-03 — LCP Optimization

The hero section SHALL be optimized for Largest Contentful Paint: hero image (if any) uses `priority` and `fetchPriority="high"`, fonts use `display: 'swap'`, no render-blocking CSS or JS in `<head>`. Target LCP: < 2.5s.

#### Scenario: Font swap during slow connection
- **GIVEN** the user is on a slow 3G connection
- **WHEN** the page loads
- **THEN** text SHALL render immediately in the fallback system font
- **AND** Playfair Display / Geist SHALL swap in once loaded without layout shift

### Requirement: PERF-04 — Mermaid Dynamic Import

The Mermaid.js library SHALL NOT be included in the initial bundle. It MUST be loaded via `next/dynamic` with `{ ssr: false }` and `loading` component (skeleton).

#### Scenario: Bundle analysis gate
- **GIVEN** `ANALYZE=true next build` runs
- **WHEN** bundle analysis completes
- **THEN** no client chunk SHALL exceed 50KB gzipped
- **AND** Mermaid SHALL be in its own separate chunk

### Requirement: PERF-05 — Image Optimization

All images SHALL use `next/image` with WebP/AVIF conversion, explicit `width` and `height` for CLS prevention, `loading="lazy"` for below-fold images, and responsive `sizes` attribute.

#### Scenario: No Cumulative Layout Shift from images
- **GIVEN** images are present on the page
- **WHEN** Lighthouse measures CLS
- **THEN** CLS SHALL be < 0.1
- **AND** all images SHALL have explicit dimensions

### Requirement: SEO-01 — Metadata and Open Graph

The root layout SHALL include `metadataBase`, `title.template`, `description`, `openGraph` (type, locale, siteName, images), and `twitter:card`. The homepage description SHALL reflect Diego's professional identity.

#### Scenario: Social media sharing preview
- **GIVEN** the page URL is shared on LinkedIn/Twitter
- **WHEN** the platform scrapes Open Graph tags
- **THEN** the preview SHALL show the site title, description, and a 1200×630 OG image

### Requirement: SEO-02 — JSON-LD Structured Data

The homepage SHALL include a JSON-LD `Person` schema with Diego's name, jobTitle ("Senior Full Stack Developer"), url, sameAs (GitHub, LinkedIn), and knowsAbout (technologies).

#### Scenario: Google Rich Results validation
- **GIVEN** the page HTML is parsed
- **WHEN** Google's Rich Results Test validates the JSON-LD
- **THEN** the Person schema SHALL pass validation with no errors

### Requirement: SEO-03 — Sitemap and robots.txt

The system SHALL generate `sitemap.xml` via `app/sitemap.ts` and `robots.txt` via `app/robots.ts`, including the homepage URL.

#### Scenario: Search engine crawl
- **GIVEN** the site is deployed
- **WHEN** a crawler requests `/robots.txt`
- **THEN** it SHALL receive `Allow: /` and a `Sitemap:` directive
- **WHEN** the crawler requests `/sitemap.xml`
- **THEN** it SHALL receive a valid XML sitemap containing the homepage URL

---

## 11. Accessibility

### Requirement: A11Y-01 — Semantic HTML Structure

The page SHALL use semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>` (each with `aria-labelledby` referencing the section heading `id`), `<article>` (for project/experience cards), and `<footer>`. Heading hierarchy SHALL be logical: single `<h1>` (hero), `<h2>` for sections, `<h3>` for cards.

#### Scenario: Screen reader outline
- **GIVEN** a screen reader navigates the page by headings
- **WHEN** the user cycles through headings
- **THEN** the heading structure SHALL be: one h1 → eight h2 section titles → h3 card titles

### Requirement: A11Y-02 — ARIA Labels and Descriptions

Icon-only interactive elements (theme toggle, social links, hamburger) SHALL have `aria-label`. Form inputs SHALL be associated with labels via `htmlFor`. Error messages SHALL be linked to inputs via `aria-describedby`.

#### Scenario: Theme toggle announced
- **GIVEN** a screen reader user tabs to the theme toggle button
- **WHEN** the button receives focus
- **THEN** the screen reader SHALL announce "Toggle theme" or equivalent

#### Scenario: Form error announcement
- **GIVEN** the user submits an invalid contact form
- **WHEN** error messages appear
- **THEN** the error message SHALL be linked to the input via `aria-describedby`
- **AND** screen readers SHALL announce the error when the input receives focus

### Requirement: A11Y-03 — Keyboard Navigation

All interactive elements SHALL be reachable via Tab key in logical order. Focus rings SHALL be visible (`ring-2 ring-ring`) on all interactive elements. No keyboard traps SHALL exist.

#### Scenario: Full page tab navigation
- **GIVEN** the user tabs through the entire page
- **WHEN** every interactive element is encountered
- **THEN** focus SHALL be visible on each element
- **AND** the tab order SHALL follow the visual layout order

### Requirement: A11Y-04 — Color Contrast

All text/background combinations SHALL meet WCAG AA contrast ratio minimums (≥ 4.5:1 for normal text, ≥ 3:1 for large text). The dark theme palette SHALL be verified: `#fafafa` on `#09090b` = 17.5:1, `#a1a1aa` on `#27272a` = 7.2:1.

#### Scenario: Lighthouse Accessibility audit
- **GIVEN** the site is built and deployed
- **WHEN** a Lighthouse Accessibility audit runs
- **THEN** the score SHALL be ≥ 95

### Requirement: A11Y-05 — Reduced Motion

All Framer Motion animations and CSS transitions SHALL be disabled when the user has `prefers-reduced-motion: reduce` enabled. A global CSS media query or Framer Motion's `useReducedMotion()` hook SHALL gate all animations.

#### Scenario: System reduced motion preference
- **GIVEN** the user's OS has "Reduce motion" enabled
- **WHEN** the page loads and animates
- **THEN** no animations SHALL play (fade, slide, scale, stagger — all disabled)
- **AND** content SHALL appear in its final position immediately

---

## 12. Responsive Design

### Requirement: RESP-01 — Mobile Breakpoint (< 768px)

On viewports below 768px: the navigation SHALL collapse to a hamburger menu, section padding SHALL reduce to `py-16`, cards SHALL stack in a single column, the experience timeline SHALL use single-column layout, and the hero heading SHALL scale to `text-4xl`/`text-5xl`.

#### Scenario: iPhone SE viewport (375px)
- **GIVEN** the user visits on a 375px-wide viewport
- **WHEN** the page renders
- **THEN** all content SHALL be readable without horizontal scroll
- **AND** all interactive elements SHALL have minimum 44×44px touch targets

### Requirement: RESP-02 — Tablet Breakpoint (768px–1024px)

On viewports between 768px and 1024px: the navigation SHALL display inline (no hamburger), project cards SHALL use a 2-column grid, and the experience timeline SHALL use alternating layout.

#### Scenario: iPad viewport (768px)
- **GIVEN** the user visits on a 768px-wide viewport
- **WHEN** the page renders
- **THEN** the header nav SHALL be fully visible (no hamburger)
- **AND** project cards SHALL display in 2 columns

### Requirement: RESP-03 — Desktop Breakpoint (> 1024px)

On viewports above 1024px: all sections SHALL use `max-w-6xl` (1280px) container, section padding SHALL be `py-24`/`py-32`, hero heading SHALL be `text-6xl`/`text-7xl`, and the layout SHALL match the full design spec.

#### Scenario: 1920px viewport
- **GIVEN** the user visits on a 1920px-wide viewport
- **WHEN** the page renders
- **THEN** content SHALL be centered and capped at 1280px
- **AND** generous whitespace SHALL frame the content

---

## 13. Docker & Deployment

### Requirement: DOCKER-01 — Multi-Stage Frontend Build

The frontend `Dockerfile` SHALL use three stages: `dependencies` (install deps with BuildKit cache mount), `builder` (`next build` producing standalone output), and `runner` (Node 22-alpine, copy standalone + static + public, run `node server.js`). The runner SHALL be the default target.

#### Scenario: Production build success
- **GIVEN** `docker compose up --build` is executed
- **WHEN** the frontend Dockerfile builds
- **THEN** all three stages SHALL complete without errors
- **AND** the runner SHALL serve the Next.js app on port 3000

### Requirement: DOCKER-02 — Multi-Stage Backend Build

The backend `Dockerfile` SHALL use three stages: `dependencies` (install deps), `builder` (`tsc` compile to `dist/`), and `runner` (Node 22-alpine, copy dist + node_modules, run `node dist/index.js`).

#### Scenario: TypeScript compilation in Docker
- **GIVEN** the backend Dockerfile builds
- **WHEN** the `builder` stage runs `tsc`
- **THEN** TypeScript SHALL compile without errors
- **AND** the compiled JavaScript SHALL be copied to the runner stage

### Requirement: DOCKER-03 — Docker Compose Production

The `docker-compose.yml` SHALL define two services: `frontend` (build target `runner`, port 3000) and `backend` (build target `runner`, port 4000). The backend SHALL include a health check (`GET /api/health`). The frontend SHALL depend on the backend with `condition: service_healthy`.

#### Scenario: Health check passes
- **GIVEN** `docker compose up` runs
- **WHEN** the backend starts
- **THEN** the health check SHALL pass within 30 seconds
- **AND** the frontend SHALL start after the backend is healthy

### Requirement: DOCKER-04 — Docker Compose Development Override

The `docker-compose.dev.yml` SHALL override both services with `target: dependencies`, source code volume mounts for hot reload, anonymous volumes for `node_modules` and `.next`, and `NODE_ENV=development`.

#### Scenario: Dev mode hot reload
- **GIVEN** `docker compose -f docker-compose.yml -f docker-compose.dev.yml up` runs
- **WHEN** a source file is modified on the host
- **THEN** the respective dev server SHALL hot-reload the change

### Requirement: DOCKER-05 — Vercel Deployment Configuration

The frontend SHALL be deployable to Vercel free tier. A `vercel.json` config SHALL define the build command (`next build`), output directory (`.next`), and framework preset (`nextjs`). The Express backend SHALL NOT be deployed via Vercel (contact form uses a separate deployment or Vercel Serverless Functions as fallback).

#### Scenario: Vercel deployment
- **GIVEN** the frontend is pushed to a Git repository connected to Vercel
- **WHEN** Vercel builds and deploys
- **THEN** the site SHALL be accessible at a Vercel preview URL
- **AND** static sections SHALL render without the backend

---

## 14. Error & Loading States

### Requirement: ERR-01 — Global Loading Skeleton

The system SHALL provide an `app/loading.tsx` that displays a skeleton UI (shadcn Skeleton components) while the page is being statically generated or streamed. The skeleton SHALL mirror the page layout structure.

#### Scenario: Slow page generation
- **GIVEN** the page is being generated (build time or streaming)
- **WHEN** the loading state is active
- **THEN** skeleton placeholders SHALL display for hero, section headings, and card areas

### Requirement: ERR-02 — Global Error Boundary

The system SHALL provide an `app/error.tsx` that catches rendering errors in the page tree. The error UI SHALL display a friendly message, the error details (in development only), and a "Try again" button that re-renders the error boundary's children.

#### Scenario: Server Component rendering failure
- **GIVEN** a data file import fails or throws during rendering
- **WHEN** the error boundary catches the error
- **THEN** a styled error message SHALL display: "Something went wrong"
- **AND** a "Try again" button SHALL be present
- **AND** in development mode, the error stack SHALL be shown

### Requirement: ERR-03 — Custom 404 Page

The system SHALL provide an `app/not-found.tsx` with a centered message ("Page not found — 404"), a brief description, and a link back to the homepage.

#### Scenario: Visiting a non-existent route
- **GIVEN** the user navigates to `/nonexistent`
- **WHEN** Next.js cannot match the route
- **THEN** the custom 404 page SHALL render
- **AND** the HTTP status code SHALL be 404

### Requirement: ERR-04 — GitHub API Fallback States

The GitHub section SHALL handle three states: loading (skeleton cards), error (graceful message with cached data if available), and empty (no pinned repos configured or empty repo list). Each state SHALL present a distinct, non-breaking UI.

#### Scenario: Loading state
- **GIVEN** the GitHub section is fetching data (ISR revalidation or first build)
- **WHEN** data is not yet available
- **THEN** skeleton cards SHALL display as placeholders

#### Scenario: Error state with cache
- **GIVEN** a previous successful fetch is cached (ISR)
- **WHEN** a subsequent fetch fails (network error, rate limit)
- **THEN** the cached data SHALL continue to display
- **AND** a subtle indicator SHALL note "Last updated: {timestamp}" (optional)

#### Scenario: Error state without cache
- **GIVEN** no cached data exists and the GitHub API fetch fails
- **WHEN** the section renders
- **THEN** it SHALL display: "GitHub data temporarily unavailable. Please check back later."
- **AND** a link to `https://github.com/DarkHunter1ero` SHALL be shown

### Requirement: ERR-05 — Contact Form Loading and Feedback

The contact form SHALL display three states: idle (normal), submitting (button shows spinner/loading text, inputs disabled), success ("Message sent! I'll get back to you soon."), and error (server error message with retry option).

#### Scenario: Submitting state
- **GIVEN** the user clicks submit with valid data
- **WHEN** the POST request is in flight
- **THEN** the submit button SHALL show a loading spinner
- **AND** all inputs SHALL be disabled during submission
- **AND** the button text SHALL change to "Sending..."

#### Scenario: Success state
- **GIVEN** the backend returns `200 { success: true }`
- **WHEN** the response is received
- **THEN** the form SHALL be replaced with a success message
- **AND** the success message SHALL include: "Message sent! I'll get back to you soon."

#### Scenario: Error state
- **GIVEN** the backend returns an error (400, 429, 500)
- **WHEN** the response is received
- **THEN** the error message SHALL display above the form
- **AND** the form SHALL remain editable for retry
- **AND** the submit button SHALL re-enable

---

## 15. Cross-Cutting: Theme

### Requirement: THEME-01 — Dark Theme Default

The theme provider SHALL default to dark mode on first visit. The `.dark` class SHALL be added to the `<html>` element by `next-themes`. All color tokens (background, foreground, muted, border, primary, accent, ring) SHALL be defined as CSS custom properties in `globals.css` under `.dark {}` and `:root {}` to support future light theme toggling.

#### Scenario: No flash of wrong theme
- **GIVEN** a first-time visitor loads the page
- **WHEN** the page initially renders
- **THEN** no flash of white/light background SHALL be visible
- **AND** the dark theme colors SHALL be applied from the first paint

### Requirement: THEME-02 — Animation Constraints

All animations SHALL adhere to the constraints defined in the proposal: opacity-only, translateY ≤ 32px, scale ≤ 1.05, duration 0.3s–0.5s, easing `easeOut`/`easeInOut`, trigger `whileInView` with `once: true`, stagger ≤ 0.1s. No spring physics, no bounce, no rotate transforms, no continuous/scroll-driven animations.

#### Scenario: No animation abuse
- **GIVEN** all animated components are rendered
- **WHEN** animations play
- **THEN** no element SHALL rotate, bounce, scale beyond 1.05, or translate more than 32px
- **AND** no neon, gaming, or cyberpunk visual effects SHALL be present
- **AND** no floating particles or excessive gradients SHALL animate

---

## Specification Summary

| Section | Requirements | Scenarios | Key Edge Cases |
|---------|-------------|-----------|----------------|
| 1. Navigation & Layout | 4 (NAV-01–04) | 5 | Mobile menu keyboard close, theme flash prevention |
| 2. Hero Section | 2 (HERO-01–02) | 4 | Reduced motion, LCP budget |
| 3. About Me | 1 (ABOUT-01) | 1 | Static = always available |
| 4. Tech Stack | 2 (TECH-01–02) | 3 | Reduced motion on hover |
| 5. Experience Timeline | 2 (EXP-01–02) | 3 | Mobile layout switch, once:true |
| 6. Featured Projects | 2 (PROJ-01–02) | 3 | Missing image fallback |
| 7. Architecture Showcase | 1 (ARCH-01) | 3 | Invalid syntax, lazy loading, screen reader |
| 8. GitHub Activity | 3 (GH-01–03) | 5 | Rate limit, missing token, no cache |
| 9. Contact Section | 4 (CONTACT-01–04) | 9 | Backend down, rate limit, validation mismatch |
| 10. Performance & SEO | 8 (PERF-01–05, SEO-01–03) | 7 | Slow connection font swap, stale-while-revalidate |
| 11. Accessibility | 5 (A11Y-01–05) | 5 | Screen reader outline, form error linking |
| 12. Responsive Design | 3 (RESP-01–03) | 3 | Smallest phone (375px), largest desktop |
| 13. Docker & Deployment | 5 (DOCKER-01–05) | 5 | Health check timing, hot reload |
| 14. Error & Loading States | 5 (ERR-01–05) | 8 | No cache + error, submitting + re-enable |
| 15. Theme | 2 (THEME-01–02) | 2 | Flash prevention, animation gate |
| **TOTAL** | **49** | **66** | |
