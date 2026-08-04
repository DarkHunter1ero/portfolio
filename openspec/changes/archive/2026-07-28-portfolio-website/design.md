# Design: Portfolio Website — Diego Silva

> **Change**: `portfolio-website` | **Date**: 2026-07-28 | **Architecture**: Single-page App + Express API

---

## 1. Architecture Decision: Accent Color

| Option | Hex | Tradeoff | Verdict |
|--------|-----|----------|---------|
| Deep Blue | `#2563eb` | Conservative but trusted; low visual "punch" | **CHOSEN** |
| Warm Amber | `#d97706` | Distinctive but reads creative/artistic, not enterprise | Rejected |
| Teal | `#0d9488` | Modern but signals startup/agency, not senior architect | Rejected |

**Rationale**: Diego's target audience — recruiters and enterprise technical leads — responds to trust signals. Deep blue (blue-600 in Tailwind) communicates technical rigor without calling attention to itself. It will be used exclusively for: link hover states, active nav indicator, form focus rings, and the CTA button. All other UI stays monochromatic zinc. One color, used sparingly, maximizes impact.

---

## 2. Component Tree (Full Hierarchy with Server/Client Boundaries)

```
RootLayout (Server)
├── SkipLink (Server)
├── ThemeProvider (Client) — next-themes, attribute="class"
├── GlassHeader (Client) — sticky nav, backdrop-blur, theme toggle
│   ├── DesktopNav (Server) — static nav links
│   ├── MobileMenu (Client) — hamburger toggle + slide-in panel
│   └── ThemeToggle (Client) — sun/moon icon button
├── <main>
│   ├── HeroSection (Server)
│   │   ├── HeroContent (Server) — static text, no JS
│   │   │   ├── HeroTitle (Server)
│   │   │   ├── HeroSubtitle (Server)
│   │   │   └── HeroCTA (Client) — hover animations on buttons
│   │   └── HeroBackground (Client) — CSS gradient with opacity pulse (no canvas)
│   ├── AboutSection (Server)
│   │   ├── SectionHeading (Server)
│   │   ├── AboutContent (Server) — prose from data/profile.ts
│   │   └── AboutStats (Server) — 3 stat cards: 6+ years, 50+ projects, 30+ technologies
│   ├── TechStackSection (Server)
│   │   ├── SectionHeading (Server)
│   │   └── TechStackGrid (Client) — staggered card animations via motion/react
│   │       └── TechCategoryCard (Client)[]
│   │           └── TechBadge (Client)[]
│   ├── ExperienceTimeline (Server)
│   │   ├── SectionHeading (Server)
│   │   └── TimelineContainer (Client) — scroll-triggered fade+slide
│   │       └── TimelineItem (Client)[] — vertical line connector + card
│   ├── ProjectsSection (Server)
│   │   ├── SectionHeading (Server)
│   │   └── ProjectCard (Server)[] — static content shell
│   │       └── ProjectCardClient (Client) — hover scale + image zoom ONLY
│   │           ├── ProjectImage (Client) — next/image with blur placeholder
│   │           ├── ProjectContent (Server) — passed as children
│   │           └── ProjectLinks (Client) — GitHub/Demo buttons
│   ├── ArchitectureSection (Server)
│   │   ├── SectionHeading (Server)
│   │   └── DiagramTabs (Client) — tab switcher for 5 diagrams
│   │       └── MermaidDiagram (Client)[] — dynamic import, ssr:false, lazy
│   ├── GitHubSection (Server) — ISR revalidate: 3600
│   │   ├── SectionHeading (Server)
│   │   ├── GitHubStats (Server) — repos, followers, contributions count
│   │   └── RepoGrid (Server)
│   │       └── RepoCard (Server)[] — static card from API data
│   │           └── LanguageBar (Client) — animated language % bar (hover only)
│   └── ContactSection (Server)
│       ├── SectionHeading (Server)
│       ├── ContactInfo (Server) — email, LinkedIn, GitHub, location
│       └── ContactForm (Client) — state machine: idle → submitting → success | error
│           ├── FormField (Client) — name, email inputs
│           ├── FormTextarea (Client) — message textarea
│           └── SubmitButton (Client) — loading spinner + disabled state
└── Footer (Server) — copyright, links, "Built with" tech stack
```

---

## 3. Design System

### 3.1 Color Tokens (Dark Theme — Zinc Scale)

CSS custom properties in `frontend/src/app/globals.css`:

```css
:root {
  --background: #09090b;        /* zinc-950 — page bg */
  --foreground: #fafafa;         /* zinc-50 — primary text */
  --card: #18181b;              /* zinc-900 — card surfaces */
  --card-foreground: #fafafa;
  --popover: #18181b;
  --popover-foreground: #fafafa;
  --primary: #fafafa;           /* zinc-50 — primary button bg (inverted) */
  --primary-foreground: #09090b; /* zinc-950 — text on primary */
  --secondary: #27272a;          /* zinc-800 — secondary surfaces */
  --secondary-foreground: #fafafa;
  --muted: #27272a;             /* zinc-800 — muted backgrounds */
  --muted-foreground: #a1a1aa;  /* zinc-400 — secondary text, labels */
  --accent: #2563eb;            /* blue-600 — links, focus, CTA */
  --accent-foreground: #fafafa;
  --border: #27272a;            /* zinc-800 — dividers, card borders */
  --ring: #3b82f6;              /* blue-500 — focus rings */
  --radius: 0.75rem;            /* rounded-xl default */
}

.dark {
  /* Same values — forced dark theme. Toggle shows light if user chooses. */
  --background: #09090b;
  --foreground: #fafafa;
  --card: #18181b;
  /* ... identical to :root */
}
```

**Glassmorphism** — ONE usage only (header):
```css
.glass-header {
  background: rgba(9, 9, 11, 0.8);
  backdrop-filter: blur(16px) saturate(180%);
  border-bottom: 1px solid rgba(39, 39, 42, 0.6);
}
```

### 3.2 Typography

| Role | Font | next/font/google config | Tailwind class |
|------|------|------------------------|----------------|
| Headings (h1–h3) | Playfair Display | `weight: ["400","600","700"], subsets: ["latin"], display: "swap"` | `font-[family-name:var(--font-playfair)]` |
| Body | Inter | `weight: ["400","500","600"], subsets: ["latin"], display: "swap"` | `font-[family-name:var(--font-inter)]` |
| Code / Tech tags | JetBrains Mono | `weight: ["400","500"], subsets: ["latin"], display: "swap"` | `font-[family-name:var(--font-mono)]` |

Font loading in `layout.tsx`:
```typescript
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});
```

### 3.3 Spacing Scale

| Context | Value | Tailwind |
|---------|-------|----------|
| Section padding (y) | 96px / 128px | `py-24` / `py-32` |
| Section padding (mobile) | 64px | `py-16` |
| Container max-width | 1280px | `max-w-6xl` |
| Container padding (x) | 16px → 24px → 32px | `px-4 sm:px-6 lg:px-8` |
| Card grid gap | 24px / 32px | `gap-6` / `gap-8` |
| Content gap | 16px / 24px | `gap-4` / `gap-6` |

### 3.4 Borders & Shadows

| Element | Classes |
|---------|---------|
| Cards | `rounded-2xl border border-border bg-card shadow-lg shadow-black/10` |
| Buttons (primary) | `rounded-full` |
| Buttons (outline/ghost) | `rounded-full` |
| Images | `rounded-xl` |
| Inputs | `rounded-lg` |
| Focus ring | `ring-2 ring-ring ring-offset-2 ring-offset-background` |
| Dividers | `<Separator />` from shadcn or `border-t border-border` |

### 3.5 Animation Constraints (from proposal, formalized)

```typescript
// frontend/src/lib/animations.ts
export const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.4, ease: "easeOut" },
};

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export const cardHover = {
  whileHover: { scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } },
};

// Reduced motion override (applied in AnimatedSection wrapper):
export const prefersReducedMotion = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0 },
};

// NEVER use: spring, bounce, rotate, y > 32px, duration > 0.6s
```

---

## 4. Route Design

### 4.1 App Router Structure

```
frontend/src/app/
├── layout.tsx              # Root layout: <html>, <body>, fonts, ThemeProvider, Header, Footer
├── page.tsx                # Home: composes all 8 sections (one per <section>)
├── loading.tsx             # Full-page skeleton while initial HTML streams
├── not-found.tsx           # Custom 404 with "Back to Home" link
├── error.tsx               # Global error boundary ("use client")
├── sitemap.ts              # Dynamic sitemap generation
├── robots.ts               # robots.txt generation
└── globals.css             # Tailwind v4 @import + CSS variables + glassmorphism
```

**No dynamic routes needed** (no blog per current scope). Single-page architecture — all sections on `/`. No `/blog`, no `[slug]`.

### 4.2 Loading States

| File | Purpose |
|------|---------|
| `loading.tsx` | Full-page skeleton: pulsing placeholders for hero (h-96), cards (grid of 3), timeline (3 bars). Uses `Skeleton` from shadcn/ui. |
| `ArchitectureSection` dynamic import | `loading.tsx` inside the dynamic import boundary: a centered `Skeleton` card (w-64 h-48) with "Loading diagrams..." text |
| `GitHubSection` | ISR fetches on server — no client loading state. If fetch fails, graceful empty state (see §10). |
| `ContactForm` | Submit button shows `Loader2` spinner + "Sending..." text during fetch. Disabled to prevent double-submit. |

### 4.3 Error States

| File | Purpose |
|------|---------|
| `error.tsx` | Catches unhandled render errors. Shows "Something went wrong" + "Try again" button that calls `reset()`. Centered, minimal. |
| `not-found.tsx` | 404 page: large "404", subtitle "Page not found", link to Home. No layout shift. |
| `ContactForm` | Inline error: if `fetch()` rejects or returns non-200, show `Alert` with error message. Form remains usable. |
| `GitHubSection` | If GitHub fetch throws → `ErrorBoundary` renders fallback: "GitHub data temporarily unavailable. View my profile directly at github.com/DarkHunter1ero." |
| `MermaidDiagram` | If Mermaid render fails → `ErrorBoundary` renders code block fallback with syntax-highlighted Mermaid source + "Diagram rendering failed. View the source below." |

---

## 5. Component Architecture — Per Section

### 5.1 HeroSection

**Files**: `frontend/src/components/sections/HeroSection.tsx`, `HeroBackground.tsx`

```
HeroSection (Server Component — no "use client")
```

`HeroSection` is a Server Component. It imports `HeroBackground` (a "use client" component) for the animated background gradient only. The text content is rendered server-side — no JS needed for the hero text to paint.

```typescript
// frontend/src/components/sections/HeroSection.tsx
import { HeroBackground } from "./HeroBackground";
import { HeroCTA } from "./HeroCTA";
import { profile } from "@/data/profile";

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroBackground />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-accent font-mono text-sm mb-4 tracking-wider uppercase">
          Senior Full Stack Developer
        </p>
        <h1 className="font-[family-name:var(--font-playfair)] text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6">
          {profile.name}
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          {profile.tagline}
        </p>
        <HeroCTA cvUrl={profile.cvUrl} email={profile.email} />
      </div>
    </section>
  );
}
```

```typescript
// HeroCTA props
interface HeroCTAProps {
  cvUrl: string;    // "/cv.pdf"
  email: string;    // "diego1silva2@gmail.com"
}
```

**Animation strategy**: `HeroBackground` uses a CSS-only animated radial gradient (`@keyframes pulse` on opacity, 8s ease-in-out infinite alternate). Two overlapping gradients with different speeds create depth. Zero JavaScript. `HeroCTA` buttons use `motion.button` with `whileHover={{ scale: 1.05 }}` and `whileTap={{ scale: 0.98 }}`.

### 5.2 AboutSection

**File**: `frontend/src/components/sections/AboutSection.tsx`

```
AboutSection (Server Component — zero client JS)
```

```typescript
// frontend/src/components/sections/AboutSection.tsx
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Container } from "@/components/shared/Container";
import { profile } from "@/data/profile";

export function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <Container>
        <SectionHeading title="About Me" subtitle="The engineer behind the code" />
        <div className="grid lg:grid-cols-3 gap-12 mt-16">
          <div className="lg:col-span-2 prose prose-invert max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed">{profile.bio}</p>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <StatCard label="Years Experience" value="6+" />
            <StatCard label="Projects Delivered" value="50+" />
            <StatCard label="Technologies" value="30+" />
          </div>
        </div>
      </Container>
    </section>
  );
}
```

```typescript
// StatCard props
interface StatCardProps {
  label: string;
  value: string;
}
```

**Animation**: None. Static content. No motion needed.

### 5.3 TechStackSection

**Files**: `frontend/src/components/sections/TechStackSection.tsx`, `TechStackGrid.tsx`, `TechCategoryCard.tsx`, `TechBadge.tsx`

```
TechStackSection (Server) → TechStackGrid (Client) → TechCategoryCard[] (Client)
```

The section wrapper is Server, but the grid and cards are Client Components for stagger animation.

```typescript
// frontend/src/components/sections/TechStackSection.tsx
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Container } from "@/components/shared/Container";
import { TechStackGrid } from "./TechStackGrid";
import { techStack } from "@/data/tech-stack";

export function TechStackSection() {
  return (
    <section id="tech-stack" className="py-24 sm:py-32 bg-card/30">
      <Container>
        <SectionHeading title="Tech Stack" subtitle="Tools and technologies I work with daily" />
        <TechStackGrid categories={techStack} />
      </Container>
    </section>
  );
}
```

```typescript
// TechStackGrid props
import type { TechCategory } from "@/data/tech-stack";

interface TechStackGridProps {
  categories: TechCategory[];
}

// TechCategoryCard props
interface TechCategoryCardProps {
  category: TechCategory;
  index: number;  // for stagger delay
}

// TechBadge props
interface TechBadgeProps {
  name: string;
  level?: number;  // 1-5, optional
}
```

**Animation strategy**: `TechStackGrid` uses `motion.div` with `variants` container + `staggerChildren: 0.1`. Each `TechCategoryCard` uses `motion.div` with `fadeInUp` variant, `whileInView` with `once: true`, `viewport={{ once: true, margin: "-100px" }}`. Hover on cards: `whileHover={{ scale: 1.02 }}`.

### 5.4 ExperienceTimeline

**Files**: `frontend/src/components/sections/ExperienceSection.tsx`, `ExperienceTimeline.tsx`, `TimelineItem.tsx`

```
ExperienceSection (Server) → ExperienceTimeline (Client) → TimelineItem[] (Client)
```

```typescript
// frontend/src/components/sections/ExperienceSection.tsx
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Container } from "@/components/shared/Container";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { experience } from "@/data/experience";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 sm:py-32">
      <Container>
        <SectionHeading title="Experience" subtitle="Where I've built and led" />
        <ExperienceTimeline items={experience} />
      </Container>
    </section>
  );
}
```

```typescript
// ExperienceTimeline props
import type { Experience } from "@/data/experience";

interface ExperienceTimelineProps {
  items: Experience[];
}

// TimelineItem props
interface TimelineItemProps {
  item: Experience;
  index: number;
  isLast: boolean;
}
```

**Animation strategy**: Vertical timeline with a left border line (`border-l-2 border-border`). Each `TimelineItem` fades in + slides right 24px as it enters viewport. Uses `whileInView` with `once: true`. Dot connector on the line: `absolute -left-[9px] w-4 h-4 rounded-full bg-accent`. Stagger children at 0.15s.

### 5.5 ProjectsSection

**Files**: `frontend/src/components/sections/ProjectsSection.tsx`, `ProjectCard.tsx`, `ProjectLinks.tsx`

```
ProjectsSection (Server) → ProjectCard (Server wrapper) → ProjectCardClient (Client — hover only)
```

The project card body (title, description, tech tags) is Server-rendered. Only the image hover zoom and button interactions are Client.

```typescript
// frontend/src/components/sections/ProjectsSection.tsx
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Container } from "@/components/shared/Container";
import { ProjectCard } from "./ProjectCard";
import { projects } from "@/data/projects";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 sm:py-32 bg-card/30">
      <Container>
        <SectionHeading title="Featured Projects" subtitle="Selected work that demonstrates my approach" />
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
```

```typescript
// ProjectCard props
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}
```

**Animation strategy**: `ProjectCardClient` wraps the card body with `motion.div` using `whileHover={{ scale: 1.02 }}` on the card, and `whileHover={{ scale: 1.05 }}` on the image only. No scroll animations — the grid layout is static. Buttons (GitHub, Demo) have `whileHover={{ scale: 1.05 }}` and `whileTap={{ scale: 0.98 }}`.

### 5.6 ArchitectureSection

**Files**: `frontend/src/components/sections/ArchitectureSection.tsx`, `DiagramTabs.tsx`, `MermaidDiagram.tsx`

```
ArchitectureSection (Server) → DiagramTabs (Client) → MermaidDiagram[] (Client, dynamic import)
```

```typescript
// frontend/src/components/sections/ArchitectureSection.tsx
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Container } from "@/components/shared/Container";
import { DiagramTabs } from "./DiagramTabs";
import { architectureDiagrams } from "@/data/architecture";

export function ArchitectureSection() {
  return (
    <section id="architecture" className="py-24 sm:py-32">
      <Container>
        <SectionHeading title="Architecture" subtitle="How I design and build systems" />
        <DiagramTabs diagrams={architectureDiagrams} />
      </Container>
    </section>
  );
}
```

```typescript
// DiagramTabs props
interface DiagramTab {
  id: string;
  label: string;
  mermaidCode: string;
  description: string;
}

interface DiagramTabsProps {
  diagrams: DiagramTab[];
}
```

**Animation strategy**: Tab switching uses `AnimatePresence` + `motion.div` with `initial={{ opacity: 0, y: 12 }}`, `animate={{ opacity: 1, y: 0 }}`, `exit={{ opacity: 0, y: -12 }}`. The Mermaid rendering component is dynamically imported:

```typescript
// In DiagramTabs.tsx:
const MermaidDiagram = dynamic(
  () => import("./MermaidDiagram").then((mod) => mod.MermaidDiagram),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-64 rounded-2xl" />,
  }
);
```

Mermaid is NEVER in the main bundle. It loads only when the Architecture section mounts.

### 5.7 GitHubSection

**Files**: `frontend/src/components/sections/GitHubSection.tsx`, `RepoCard.tsx`, `LanguageBar.tsx`

```
GitHubSection (Server, ISR revalidate: 3600) → RepoCard[] (Server) → LanguageBar (Client)
```

```typescript
// frontend/src/components/sections/GitHubSection.tsx
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Container } from "@/components/shared/Container";
import { RepoCard } from "./RepoCard";
import { fetchGitHubRepos, fetchUserProfile } from "@/lib/github";
import { pinnedRepos } from "@/data/pinned-repos";

export async function GitHubSection() {
  try {
    const [profile, repos] = await Promise.all([
      fetchUserProfile(),
      fetchGitHubRepos(pinnedRepos),
    ]);

    return (
      <section id="github" className="py-24 sm:py-32 bg-card/30">
        <Container>
          <SectionHeading title="GitHub Activity" subtitle="Open source contributions and personal projects" />
          <div className="flex gap-8 mb-12 mt-16">
            <StatCard label="Repositories" value={String(profile.public_repos)} />
            <StatCard label="Followers" value={String(profile.followers)} />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        </Container>
      </section>
    );
  } catch {
    return <GitHubFallback />;
  }
}
```

ISR config in `page.tsx`:
```typescript
export const revalidate = 3600; // 1 hour
```

`fetchGitHubRepos` uses native `fetch()` with `next: { revalidate: 3600 }` and PAT auth header.

```typescript
// RepoCard props
import type { GitHubRepo } from "@/types/github";

interface RepoCardProps {
  repo: GitHubRepo;
}

// LanguageBar props (the ONLY client component in this section)
interface LanguageBarProps {
  languages: Record<string, number>; // { "TypeScript": 65, "CSS": 20, ... }
}
```

**Animation**: `LanguageBar` uses `motion.div` for width animation on hover only (`whileHover` expands the bar). No scroll animation — cards are static.

### 5.8 ContactSection

**Files**: `frontend/src/components/sections/ContactSection.tsx`, `ContactForm.tsx`

```
ContactSection (Server) → ContactInfo (Server) + ContactForm (Client)
```

```typescript
// frontend/src/components/sections/ContactSection.tsx
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Container } from "@/components/shared/Container";
import { ContactForm } from "./ContactForm";
import { profile } from "@/data/profile";
import { Mail, MapPin, Linkedin, Github } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-24 sm:py-32">
      <Container>
        <SectionHeading title="Get in Touch" subtitle="Let's discuss your project or opportunity" />
        <div className="grid lg:grid-cols-5 gap-12 mt-16">
          {/* Left: contact info — Server */}
          <div className="lg:col-span-2 space-y-8">
            <ContactInfoItem icon={Mail} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
            <ContactInfoItem icon={Linkedin} label="LinkedIn" value={profile.linkedin.split("/").pop()!} href={profile.linkedin} />
            <ContactInfoItem icon={Github} label="GitHub" value="DarkHunter1ero" href={profile.github} />
            <ContactInfoItem icon={MapPin} label="Location" value={profile.location ?? "Remote"} />
          </div>
          {/* Right: form — Client */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
```

```typescript
// ContactForm state machine:
type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };
```

**Animation**: `ContactForm` — success state fades in a checkmark icon + success message. Error state slides in an alert. Submit button: `whileTap={{ scale: 0.98 }}`, loading spinner during submission.

---

## 6. Data Architecture

### 6.1 TypeScript Interfaces

```typescript
// frontend/src/data/profile.ts
export interface Profile {
  name: string;
  title: string;
  tagline: string;
  bio: string;           // plain text, supports \n for paragraphs
  github: string;        // "https://github.com/DarkHunter1ero"
  linkedin: string;      // "https://linkedin.com/in/diego-silva-..."
  email: string;         // "diego1silva2@gmail.com"
  location?: string;
  cvUrl: string;         // "/cv.pdf"
}
```

```typescript
// frontend/src/data/experience.ts
export interface Experience {
  company: string;
  role: string;
  period: string;        // "2019 — Present"
  description: string;
  highlights: string[];
  technologies: string[];
}
```

```typescript
// frontend/src/data/projects.ts
export interface Project {
  name: string;
  description: string;
  problem: string;
  architecture: string;
  technologies: string[];
  challenges: string[];
  githubUrl?: string;
  liveUrl?: string;
  image: string;         // "/projects/project-name.webp"
}
```

```typescript
// frontend/src/data/tech-stack.ts
export interface TechSkill {
  name: string;
  level?: number;        // 1-5, drives the visual bar width
  icon?: string;         // lucide icon name, e.g. "SiTypescript" for simple-icons
}

export interface TechCategory {
  name: string;           // "Backend", "Frontend", "Databases", "DevOps", "Cloud", "Tools"
  icon: string;           // lucide icon: "Server", "Layout", "Database", "Container", "Cloud", "Wrench"
  skills: TechSkill[];
}
```

```typescript
// frontend/src/data/architecture.ts
export interface ArchitectureDiagram {
  id: string;             // "microservices", "docker", "cicd", "auth", "cloud"
  label: string;          // "Microservices", "Docker Orchestration", "CI/CD Pipeline", "Auth Flow", "Cloud Infrastructure"
  mermaidCode: string;    // Raw Mermaid diagram code string
  description: string;    // 1-2 sentence explanation of what this diagram shows
}
```

```typescript
// frontend/src/data/pinned-repos.ts
export const pinnedRepos: string[] = [
  "DarkHunter1ero/repo-name-1",   // owner/repo format for GitHub API
  "DarkHunter1ero/repo-name-2",
  "DarkHunter1ero/repo-name-3",
  "DarkHunter1ero/repo-name-4",
  "DarkHunter1ero/repo-name-5",
  "DarkHunter1ero/repo-name-6",
];
```

```typescript
// frontend/src/types/github.ts
export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  html_url: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  languages?: Record<string, number>; // fetched via separate API call
}
```

```typescript
// frontend/src/types/contact.ts
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormResponse {
  success: boolean;
  error?: string;
}
```

### 6.2 Zod Schemas (shared validation contract)

```typescript
// frontend/src/types/contact.ts (also used by backend)
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

export type ContactFormData = z.infer<typeof contactSchema>;
```

---

## 7. API Design (Express Backend)

### 7.1 Routes

| Method | Path | Auth | Rate Limit | Description |
|--------|------|------|-----------|-------------|
| `GET` | `/api/health` | None | None | Returns `{ status: "ok", timestamp }` |
| `POST` | `/api/contact` | None | 3 req / 15 min per IP | Validates body with Zod, sends via Resend |

### 7.2 Middleware Chain

```
Request
  → CORS (origin: NEXT_PUBLIC_API_URL or frontend origin)
    → express.json() (body parser, limit: 10kb)
      → rate-limiter (applied to POST /api/contact only)
        → route handler (Zod validate → Resend send)
          → error-handler (global catch-all, formats errors consistently)
```

### 7.3 Entry Point

```typescript
// backend/src/index.ts
import express from "express";
import cors from "cors";
import { config } from "./config";
import { healthRouter } from "./routes/health";
import { contactRouter } from "./routes/contact";
import { errorHandler } from "./middleware/error-handler";

const app = express();

app.use(cors({ origin: config.CORS_ORIGIN }));
app.use(express.json({ limit: "10kb" }));

app.use("/api", healthRouter);
app.use("/api", contactRouter);

app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`Backend running on port ${config.PORT}`);
});
```

### 7.4 Route Handlers

```typescript
// backend/src/routes/health.ts
import { Router } from "express";

export const healthRouter = Router();

healthRouter.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});
```

```typescript
// backend/src/routes/contact.ts
import { Router } from "express";
import { contactSchema } from "../schemas/contact";
import { sendContactEmail } from "../services/email";
import { contactLimiter } from "../middleware/rate-limiter";

export const contactRouter = Router();

contactRouter.post("/contact", contactLimiter, async (req, res, next) => {
  try {
    const parsed = contactSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        success: false,
        error: "Validation failed",
        fieldErrors: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    await sendContactEmail(parsed.data);

    res.status(200).json({ success: true });
  } catch (error) {
    next(error); // Forward to error-handler middleware
  }
});
```

### 7.5 Middleware

```typescript
// backend/src/middleware/rate-limiter.ts
import rateLimit from "express-rate-limit";

export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3,                    // 3 requests per window per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many contact submissions. Please try again in 15 minutes.",
  },
});
```

```typescript
// backend/src/middleware/error-handler.ts
import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error("[API Error]", err);
  res.status(500).json({
    success: false,
    error: "Internal server error. Please try again later.",
  });
};
```

### 7.6 Service Layer

```typescript
// backend/src/services/email.ts
import { Resend } from "resend";
import { config } from "../config";
import type { ContactFormData } from "../schemas/contact";

const resend = new Resend(config.RESEND_API_KEY);

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  await resend.emails.send({
    from: config.EMAIL_FROM,           // "Portfolio Contact <onboarding@resend.dev>" (dev)
    to: config.EMAIL_TO,               // "diego1silva2@gmail.com"
    subject: `Portfolio Contact: ${data.name}`,
    text: `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
    replyTo: data.email,
  });
}
```

### 7.7 Config Validation

```typescript
// backend/src/config.ts
import { z } from "zod";
import "dotenv/config";

const configSchema = z.object({
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required"),
  EMAIL_FROM: z.string().default("Portfolio Contact <onboarding@resend.dev>"),
  EMAIL_TO: z.string().default("diego1silva2@gmail.com"),
});

export const config = configSchema.parse(process.env);
```

---

## 8. State Management

### 8.1 What Needs Client State?

| Concern | Mechanism | Rationale |
|---------|-----------|-----------|
| **Theme (dark/light)** | `next-themes` `ThemeProvider` + `useTheme()` | Persisted to localStorage, `.dark` class on `<html>`, flash prevention via inline `<Script>` |
| **Contact form** | `useReducer` or `useActionState` (React 19) | Form state machine: idle → submitting → success/error. No global store. |
| **GitHub language bars** | Local component state (`useState`) | Each `LanguageBar` manages its own hover state. No cross-component sharing. |
| **Mermaid rendering** | `useState` + `useEffect` (inside `MermaidDiagram`) | Each diagram instance initializes Mermaid once on mount. No global state. |
| **Mobile menu open/close** | `useState` in `MobileMenu` | Boolean toggle. No global state needed. |
| **Active nav section** | `useScrollSpy` hook (IntersectionObserver) | Tracks which section is in viewport for nav highlighting. Local state in `Header`. |

### 8.2 What Does NOT Need State?

- **Section content**: All loaded from TypeScript data files at build time. No runtime fetching.
- **GitHub data**: Fetched server-side in RSC with ISR. Client receives pre-rendered HTML.
- **Animation triggers**: Framer Motion `whileInView` is declarative — no imperative state management.
- **Search/filter**: No search or filtering functionality on the portfolio page.

### 8.3 No Global Store

There is NO Redux, Zustand, Jotai, or Context for app state. The app is read-heavy with minimal interactivity. Server Components handle all data. Client Components handle isolated UI state (form, toggle, hover).

---

## 9. Performance Architecture

### 9.1 Server vs Client Boundary

| Component Type | Count (est.) | JS Sent to Client |
|---------------|-------------|-------------------|
| Server Components (RSC) | ~15 | 0 KB |
| Client Components | ~12 | ~30 KB gzipped (total) |
| Dynamically imported (Mermaid) | 1 | ~120 KB gzipped (lazy, off main thread) |

**Strategy**: Maximize Server Components. Only `"use client"` when the component needs: event handlers (`onClick`, `onSubmit`), hooks (`useState`, `useEffect`), browser APIs (`IntersectionObserver`), or Framer Motion animations.

### 9.2 Rendering Strategy

| Content | Rendering | Cache |
|---------|-----------|-------|
| Hero, About, Tech Stack, Experience, Projects, Architecture tabs (labels only) | Static Generation (build time) | ∞ (never revalidates) |
| GitHub repos + profile | Server Component with `fetch()` + ISR | `revalidate: 3600` |
| Contact section (static parts) | Static Generation | ∞ |
| Blog (if added later) | ISR | `revalidate: 3600` |

### 9.3 Image Strategy

```typescript
// Pattern for all project/hero images:
<Image
  src={project.image}
  alt={project.name}
  width={600}
  height={400}
  className="rounded-xl object-cover"
  placeholder="blur"
  blurDataURL={project.blurDataURL}   // 10px base64 blur placeholder
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  loading="lazy"                       // lazy for all except hero
/>
```

**Hero profile image** (if used): `priority` + `fetchPriority="high"` + `loading="eager"`.

### 9.4 Bundle Splitting

| Module | Import Strategy |
|--------|----------------|
| Mermaid.js (~500KB) | `dynamic(() => import("./MermaidDiagram"), { ssr: false })` — only Architecture section |
| Framer Motion (~30KB) | Tree-shaken by named imports from `motion/react` |
| shadcn/ui components | Individual imports — only used components are bundled |
| Lucide icons | Tree-shaken — each icon is a separate module |
| next-themes | ~2KB — negligible |

### 9.5 LCP Optimization Checklist

1. Hero text is static HTML (RSC) — renders immediately, zero JS
2. Hero background gradient is CSS-only (`@keyframes`) — no canvas, no JS
3. `next/font` with `display: "swap"` — text visible in fallback font instantly
4. No hero image (text-only hero) — LCP is the heading text, sub-500ms
5. `next.config.ts`: `output: "standalone"` for Docker, but no effect on client bundle
6. Tailwind CSS v4: JIT-compiled, zero unused CSS in production

### 9.6 Tailwind v4 Config

```typescript
// frontend/src/app/globals.css (Tailwind v4 syntax)
@import "tailwindcss";

@theme {
  --color-background: #09090b;
  --color-foreground: #fafafa;
  --color-card: #18181b;
  --color-card-foreground: #fafafa;
  /* ... all tokens as defined in §3.1 */
}
```

No `tailwind.config.ts` needed — v4 uses CSS-first configuration.

---

## 10. Docker Architecture

### 10.1 File Structure

```
portfolio_workspace/
├── frontend/
│   ├── Dockerfile              # Multi-stage: deps → builder → runner
│   ├── .dockerignore
│   └── ...
├── backend/
│   ├── Dockerfile              # Multi-stage: deps → builder → runner
│   ├── .dockerignore
│   └── ...
├── docker-compose.yml          # Production
├── docker-compose.dev.yml      # Development overrides
└── .env.example
```

### 10.2 Frontend Dockerfile (Multi-Stage)

```dockerfile
# frontend/Dockerfile
# Stage 1: Dependencies
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci

# Stage 2: Build
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Stage 3: Production Runner
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
```

### 10.3 Backend Dockerfile (Multi-Stage)

```dockerfile
# backend/Dockerfile
# Stage 1: Dependencies
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci

# Stage 2: Build
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build    # tsc compiles to dist/

# Stage 3: Production Runner
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs

COPY --from=deps --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/package.json ./

USER nodejs
EXPOSE 4000
CMD ["node", "dist/index.js"]
```

### 10.4 docker-compose.yml (Production)

```yaml
services:
  frontend:
    build:
      context: ./frontend
      target: runner
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
      target: runner
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=production
      - PORT=4000
      - CORS_ORIGIN=http://localhost:3000
      - RESEND_API_KEY=${RESEND_API_KEY}
      - GITHUB_TOKEN=${GITHUB_TOKEN}
    healthcheck:
      test: ["CMD", "node", "-e", "require('http').get('http://localhost:4000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 10s
```

### 10.5 docker-compose.dev.yml (Development Overrides)

```yaml
services:
  frontend:
    build:
      target: deps
    command: npm run dev
    volumes:
      - ./frontend:/app
      - /app/node_modules
      - /app/.next
    environment:
      - NODE_ENV=development
      - NEXT_PUBLIC_API_URL=http://localhost:4000/api

  backend:
    build:
      target: deps
    command: npm run dev
    volumes:
      - ./backend:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - PORT=4000
      - CORS_ORIGIN=http://localhost:3000
      - RESEND_API_KEY=${RESEND_API_KEY}
    healthcheck:
      disable: true
```

Usage:
```bash
# Production
docker compose up --build

# Development (hot reload)
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

---

## 11. Error Handling Strategy

### 11.1 Error Boundary Hierarchy

```
RootLayout (Server)
└── error.tsx (Global Error Boundary — "use client")
    └── <main>
        ├── HeroSection — static, no errors possible
        ├── AboutSection — static, no errors possible
        ├── TechStackSection — static, no errors possible
        ├── ExperienceSection — static, no errors possible
        ├── ProjectsSection — static, no errors possible
        ├── ArchitectureSection
        │   └── DiagramTabs (Client)
        │       └── MermaidDiagram (Client) → try/catch in useEffect
        │           └── Fallback: syntax-highlighted code block
        ├── GitHubSection (Server)
        │   └── try/catch in RSC → <GitHubFallback /> component
        └── ContactSection
            └── ContactForm (Client) → try/catch in submit handler
                └── Fallback: inline error Alert + email link
```

### 11.2 GitHub API Failure Handling

```typescript
// frontend/src/lib/github.ts
export async function fetchGitHubRepos(repoList: string[]): Promise<GitHubRepo[]> {
  const token = process.env.GITHUB_TOKEN;

  const results = await Promise.allSettled(
    repoList.map(async (fullName) => {
      const res = await fetch(`https://api.github.com/repos/${fullName}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 3600 },
      });

      if (!res.ok) {
        console.error(`GitHub API error for ${fullName}: ${res.status}`);
        return null;
      }

      return res.json();
    })
  );

  return results
    .filter((r): r is PromiseFulfilledResult<GitHubRepo> => r.status === "fulfilled" && r.value !== null)
    .map((r) => r.value);
}
```

`Promise.allSettled` ensures one failing repo doesn't break the entire section. The `GitHubSection` RSC also wraps the fetch in try/catch for a complete API outage fallback.

### 11.3 Contact Form Error States

| State | UI |
|-------|-----|
| **Network error** (fetch rejects) | Red `Alert`: "Unable to send message. Please try again or email me directly at diego1silva2@gmail.com." |
| **Validation error** (400) | Field-level errors from `fieldErrors` response, shown below each input |
| **Rate limit** (429) | Yellow `Alert`: "Too many submissions. Please try again in 15 minutes." |
| **Server error** (500) | Red `Alert`: "Server error. Please email me directly." |
| **Success** (200) | Green success card: "Message sent! I'll get back to you soon." + reset form after 3 seconds |

### 11.4 Mermaid Diagram Error Handling

```typescript
// In MermaidDiagram.tsx:
useEffect(() => {
  try {
    mermaid.run({ nodes: [containerRef.current!] });
  } catch (error) {
    console.error("Mermaid render failed:", error);
    setRenderError(true);
  }
}, [code]);
```

Fallback: a `<pre>` block with syntax-highlighted Mermaid source and a note: "Diagram rendering failed. The source code is shown below."

### 11.5 Global Error Boundary

```typescript
// frontend/src/app/error.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="bg-background text-foreground">
        <Container className="min-h-screen flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="text-muted-foreground mb-8">An unexpected error occurred. Please try again.</p>
          <Button onClick={reset}>Try again</Button>
        </Container>
      </body>
    </html>
  );
}
```

---

## 12. Accessibility Implementation

### 12.1 Skip Link

```typescript
// frontend/src/components/layout/SkipLink.tsx
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:rounded-full"
    >
      Skip to main content
    </a>
  );
}
```

### 12.2 Semantic HTML Checklist

- `<header>` for the nav bar (inside `GlassHeader`)
- `<nav>` for navigation links, with `aria-label="Main navigation"`
- `<main id="main-content">` for the scrollable page content
- `<section id="...">` for each portfolio section, with `aria-labelledby` pointing to the `<h2>`
- `<article>` for each `ProjectCard` (if semantically a standalone unit)
- `<footer>` for the page footer
- `<h1>` — hero heading (one per page)
- `<h2>` — section headings
- No heading level skips (h1 → h2 → h3, never h1 → h3)

### 12.3 Reduced Motion

```typescript
// In AnimatedSection.tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import type { HTMLMotionProps } from "motion/react";

export function AnimatedSection({
  children,
  className,
  ...props
}: HTMLMotionProps<"section">) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.section
      initial={prefersReduced ? undefined : { opacity: 0, y: 24 }}
      whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={prefersReduced ? { duration: 0 } : { duration: 0.5, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}
```

All animation wrappers MUST check `useReducedMotion()` and skip animations when the user prefers reduced motion.

---

## 13. Open Questions

| # | Question | Impact |
|---|----------|--------|
| 1 | **Blog scope conflict**: The proposal includes blog (Phase 5, MDX system, `/blog` routes). The design task explicitly says "NO blog." Which is correct? If blog is deferred, the MDX infrastructure, blog components, and routes should be removed from task planning. | Affects Phases 4-5 of implementation |
| 2 | **GitHub PAT scoping**: Does Diego have a PAT with `public_repo` scope ready? Required before Phase 4. | Blocks GitHubSection implementation |
| 3 | **Resend domain verification**: Is `diegosilva.dev` verified in Resend? If not, dev will use `onboarding@resend.dev` which works for testing but not production. | Blocks contact form production deployment |
| 4 | **Portfolio content**: The 6 data files (`profile.ts`, `experience.ts`, `projects.ts`, `tech-stack.ts`, `architecture.ts`, `pinned-repos.ts`) need real content. Is Diego providing this during implementation, or should we use placeholder content that he fills in later? | Affects Phase 1 and 3 |
| 5 | **Project images**: Where do project screenshots come from? Do they exist already, or should we use placeholder/gradient images initially? | Affects ProjectsSection |
| 6 | **Vercel vs Docker deploy**: The proposal mentions both Vercel (default) and Docker. For initial launch, which takes priority? Docker Compose is fully designed here, but Vercel would skip Docker entirely for frontend. | Affects deployment workflow |
| 7 | **CV PDF**: Does Diego have a current CV PDF ready? This is a blocker for Phase 1. | Blocks CV download button |

---

## 14. Key Deliverables for Validation

| Artifact | Path | Validated By |
|----------|------|-------------|
| Design system CSS variables | `frontend/src/app/globals.css` | Visual inspection against palette |
| Component tree matches code | All section files | grep `"use client"` count matches design |
| GitHub ISR fetch | `frontend/src/lib/github.ts` | `revalidate: 3600` in fetch options |
| Express middleware chain | `backend/src/index.ts` | Order: CORS → json → rate-limit → routes → error-handler |
| Docker health check | `docker-compose.yml` | `docker compose up` → `curl localhost:4000/api/health` |
| Contact form state machine | `ContactForm.tsx` | All 4 states (idle, submitting, success, error) render correctly |
| Reduced motion | `AnimatedSection.tsx` | Toggle `prefers-reduced-motion: reduce` in DevTools → all animations stop |
