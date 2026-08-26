import { z } from "zod";

/**
 * Zod schemas for the editable site content living in src/content/*.json.
 * Plain z.object (intentionally NOT .strict()) so adding new keys in JSON
 * never breaks the build — schemas exist to catch typos and shape drift,
 * not to police the contents.
 */

// ─── Shared types ──────────────────────────────────────────

export const teamMemberSchema = z.object({
  name: z.string(),
  role: z.string().optional(),
});

// ─── Experience ─────────────────────────────────────────────

export const experienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  period: z.string(),
  description: z.string(),
  highlights: z.array(z.string()),
  technologies: z.array(z.string()),
  logo: z.string().optional(),
  team: z.array(teamMemberSchema).optional(),
});

export const experienceArraySchema = z.array(experienceSchema);

// ─── Projects ───────────────────────────────────────────────

export const projectSchema = z.object({
  name: z.string(),
  description: z.string(),
  problem: z.string(),
  architecture: z.string(),
  technologies: z.array(z.string()),
  challenges: z.array(z.string()),
  company: z.string().optional(),
  slug: z.string().optional(),
  date: z.string(),
  githubUrl: z.string().optional(),
  liveUrl: z.string().optional(),
  image: z.string(),
});

export const projectArraySchema = z.array(projectSchema);

// ─── Project details ───────────────────────────────────────

const projectInstanceSchema = z.object({
  country: z.string(),
  flag: z.string(),
  description: z.string(),
  highlights: z.array(z.string()),
  videoUrl: z.string().optional(),
  image: z.string().optional(),
});

const projectFeatureSchema = z.object({
  icon: z.string(),
  title: z.string(),
  description: z.string(),
});

const projectChallengeSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const securitySectionSchema = z.object({
  description: z.string(),
  items: z.array(z.object({ title: z.string(), description: z.string() })),
});

const impactMetricSchema = z.object({
  label: z.string(),
  value: z.string(),
  icon: z.string().optional(),
});

export const projectDetailSchema = z.object({
  slug: z.string(),
  name: z.string(),
  subtitle: z.string(),
  shortDescription: z.string(),
  heroImage: z.string(),
  videoUrl: z.string().optional(),
  role: z.string(),
  duration: z.string(),
  instances: z.array(projectInstanceSchema).optional(),
  about: z.string(),
  problem: z.string(),
  solution: z.string(),
  features: z.array(projectFeatureSchema),
  participation: z.array(z.string()),
  technicalChallenges: z.array(projectChallengeSchema),
  security: securitySectionSchema,
  impact: z.array(impactMetricSchema),
  technologies: z.array(z.string()),
  architecture: z
    .object({
      description: z.string(),
      mermaidCode: z.string().optional(),
    })
    .optional(),
  lessonsLearned: z.array(z.string()),
  gallery: z.array(z.object({ src: z.string(), alt: z.string() })),
  useCases: z
    .array(z.object({ title: z.string(), description: z.string() }))
    .optional(),
  demoVideos: z.array(z.object({ title: z.string(), url: z.string() })).optional(),
  callToAction: z.object({ text: z.string(), link: z.string() }),
  metadata: z.object({ title: z.string(), description: z.string() }),
});

export const projectDetailArraySchema = z.array(projectDetailSchema);

// ─── Profiles ───────────────────────────────────────────────

// Dev portfolio profile (typed as Profile in @/types).
export const profileSchema = z.object({
  name: z.string(),
  title: z.string(),
  tagline: z.string(),
  bio: z.string(),
  photoUrl: z.string(),
  github: z.string(),
  linkedin: z.string(),
  email: z.string(),
  location: z.string().optional(),
  birthDate: z.string(),
  nationality: z.string(),
  cvUrlEn: z.string(),
  cvUrlEs: z.string(),
});

// ─── Specialties ──────────────────────────────────────────

// Dev specialties (with lucide icon names).
export const devSpecialtySchema = z.object({
  name: z.string(),
  icon: z.string(),
  description: z.string(),
});
export const devSpecialtiesSchema = z.array(devSpecialtySchema);

// Soporte specialties (service cards with images).
export const soporteSpecialtySchema = z.object({
  name: z.string(),
  description: z.string(),
  image: z.string().nullable(),
});
export const soporteSpecialtiesSchema = z.array(soporteSpecialtySchema);

// ─── Tech stack ───────────────────────────────────────────

export const techSkillSchema = z.object({
  name: z.string(),
  level: z.number().optional(),
  icon: z.string().optional(),
});

export const techCategorySchema = z.object({
  name: z.string(),
  icon: z.string(),
  skills: z.array(techSkillSchema),
});

export const techStackSchema = z.array(techCategorySchema);

// ─── Soporte professional profile ─────────────────────────

export const professionalProfileSummarySchema = z.string();
