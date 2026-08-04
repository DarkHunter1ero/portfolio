// ─── Profile ───────────────────────────────────────────────

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  photoUrl: string;
  github: string;
  linkedin: string;
  email: string;
  location?: string;
  cvUrlEn: string;
  cvUrlEs: string;
}

// ─── Experience ────────────────────────────────────────────

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

// ─── Projects ──────────────────────────────────────────────

export interface Project {
  name: string;
  description: string;
  problem: string;
  architecture: string;
  technologies: string[];
  challenges: string[];
  company?: string;
  slug?: string;
  githubUrl?: string;
  liveUrl?: string;
  image: string;
}

// ─── Tech Stack ────────────────────────────────────────────

export interface TechSkill {
  name: string;
  level?: number;
  icon?: string;
}

export interface TechCategory {
  name: string;
  icon: string;
  skills: TechSkill[];
}

// ─── Architecture ──────────────────────────────────────────

export interface ArchitectureDiagram {
  id: string;
  label: string;
  mermaidCode: string;
  description: string;
}

// ─── Navigation ────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
}

// ─── Project Detail ─────────────────────────────────────────

export interface ProjectInstance {
  country: string;
  flag: string;
  description: string;
  highlights: string[];
  videoUrl?: string;
  image?: string;
}

export interface ProjectFeature {
  icon: string;
  title: string;
  description: string;
}

export interface ProjectChallenge {
  title: string;
  description: string;
}

export interface SecurityItem {
  title: string;
  description: string;
}

export interface SecuritySection {
  description: string;
  items: SecurityItem[];
}

export interface ImpactMetric {
  label: string;
  value: string;
  icon?: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface UseCase {
  title: string;
  description: string;
}

export interface ProjectDemoVideo {
  title: string;
  url: string;
}

export interface ProjectDetail {
  slug: string;
  name: string;
  subtitle: string;
  shortDescription: string;
  heroImage: string;
  videoUrl?: string;
  role: string;
  duration: string;
  instances?: ProjectInstance[];
  about: string;
  problem: string;
  solution: string;
  features: ProjectFeature[];
  participation: string[];
  technicalChallenges: ProjectChallenge[];
  security: SecuritySection;
  impact: ImpactMetric[];
  technologies: string[];
  architecture?: {
    description: string;
    mermaidCode?: string;
  };
  lessonsLearned: string[];
  gallery: GalleryImage[];
  useCases?: UseCase[];
  demoVideos?: ProjectDemoVideo[];
  callToAction: {
    text: string;
    link: string;
  };
  metadata: {
    title: string;
    description: string;
  };
}

// GitHub types → see @/types/github
// Contact types → see @/types/contact
