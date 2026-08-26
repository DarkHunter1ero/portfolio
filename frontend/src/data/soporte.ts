import type { TechCategory } from "@/types";
import {
  professionalProfileSummarySchema,
  soporteSpecialtiesSchema,
  techStackSchema,
} from "@/lib/content/schemas";
import specialtiesRaw from "@/content/soporte/specialties.json";
import techStackRaw from "@/content/soporte/tech-stack.json";
import professionalProfileRaw from "@/content/soporte/professional-profile.json";

// ─────────────────────────────────────────────────────────────
// IT support (soporte) portfolio data. Content lives in
// src/content/soporte/*.json — this module validates the JSON
// shape (zod) and re-exports it typed.
// ─────────────────────────────────────────────────────────────

/** IT support services shown in the services grid. */
export const specialties: { name: string; description: string; image: string | null }[] =
  soporteSpecialtiesSchema.parse(specialtiesRaw);

/** Tech stack grouped by category. */
export const techStack: TechCategory[] = techStackSchema.parse(techStackRaw);

/**
 * IT-focused professional profile summary for the soporte route.
 * Overrides the dev ProfessionalProfile i18n text when passed as a prop.
 */
export const professionalProfileSummary: string =
  professionalProfileSummarySchema.parse(professionalProfileRaw);
