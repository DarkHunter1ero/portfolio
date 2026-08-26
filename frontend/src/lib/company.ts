import { experience } from "@/data/shared/experience";
import { companySlug } from "@/lib/utils";
import type { Experience, Project } from "@/types";

/**
 * Serializable company reference passed from server pages down to client
 * components (the full Experience entry stays server-side).
 */
export interface CompanyRef {
  name: string;
  slug: string;
  logo?: string;
  period?: string;
}

/**
 * Matches a project to its experience (company) entry using the same rule as
 * the company detail page: exact match or prefix â€” "Portlike Â· DIRECTV"
 * belongs to the "Portlike" experience entry. Returns undefined for projects
 * without a company or with no matching experience entry.
 */
export function resolveCompanyExperience(
  project: Pick<Project, "company">
): Experience | undefined {
  const pc = (project.company ?? "").toLowerCase();
  if (!pc) return undefined;
  return experience.find((e) => {
    const ec = e.company.toLowerCase();
    return pc === ec || pc.startsWith(ec);
  });
}

/** Builds the company detail route slug + serializable reference for an entry. */
export function toCompanyRef(exp: Experience): CompanyRef {
  return {
    name: exp.company,
    slug: companySlug(exp.company),
    logo: exp.logo,
    period: exp.period,
  };
}
