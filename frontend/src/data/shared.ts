import type { Experience, Project, ProjectDetail } from "@/types";
import {
  experienceArraySchema,
  projectArraySchema,
  projectDetailArraySchema,
} from "@/lib/content/schemas";
import experienceRaw from "@/content/experience.json";
import projectsRaw from "@/content/projects.json";
import detailsEnRaw from "@/content/project-details.en.json";
import detailsEsRaw from "@/content/project-details.es.json";

// ─────────────────────────────────────────────────────────────
// Career data shared by both portfolios (companies, projects).
// Editable content lives in src/content/*.json — this module
// validates the JSON shape (zod) and re-exports it typed.
// ─────────────────────────────────────────────────────────────

/** Companies I worked at, with roles, periods, and teams. */
export const experience: Experience[] = experienceArraySchema.parse(experienceRaw);

/** Project cards (listing data; detail content lives below). */
export const projects: Project[] = projectArraySchema.parse(projectsRaw);

/** Full project detail content, English locale. */
export const projectDetailsEn: ProjectDetail[] = projectDetailArraySchema.parse(detailsEnRaw);

/** Full project detail content, Spanish locale. */
export const projectDetailsEs: ProjectDetail[] = projectDetailArraySchema.parse(detailsEsRaw);

/**
 * Default (English) details, for locale-agnostic lookups such as
 * checking whether a project has a detail page by slug.
 */
export const projectDetails = projectDetailsEn;
