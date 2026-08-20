export const DEVELOPER_PATH = "/developer";
export const SOPORTE_PATH = "/support";

export function projectDetailHref(slug: string): string {
  return `/projects/${slug}`;
}

export function companyDetailHref(slug: string): string {
  return `/companies/${slug}`;
}

export type OriginPortfolio = "dev" | "support";

/**
 * Back target for project detail pages. Users coming from the support
 * portfolio stay in it (its shared experience/education page); dev users
 * return to the dev landing projects section.
 */
export function backToProjectsHref(from?: string): string {
  return from === "support" ? `${SOPORTE_PATH}/education` : `${DEVELOPER_PATH}#projects`;
}

/**
 * Back target for company detail pages. Same origin rule as projects.
 */
export function backToExperienceHref(from?: string): string {
  return from === "support" ? `${SOPORTE_PATH}/education` : `${DEVELOPER_PATH}#experience`;
}

/**
 * Appends the origin portfolio query param so global detail pages can route
 * their "back" actions to the portfolio the user actually came from. The dev
 * origin is the default and is omitted to keep URLs clean.
 */
export function withFrom(href: string, from?: string): string {
  if (!from || from === "dev") return href;
  return `${href}${href.includes("?") ? "&" : "?"}from=${from}`;
}