import { getTranslations } from "next-intl/server";
import { Container } from "@/components/shared/container";
import { WaveDivider } from "@/components/shared/wave-divider";
import { ProjectCard } from "./project-card";
import { projects } from "@/data/dev/projects";
import { experience } from "@/data/dev/experience";
import { companySlug } from "@/lib/utils";
import type { Project } from "@/types";

/**
 * Matches a project to its experience entry using the same rule as the
 * company detail page: exact match or prefix ("Portlike · DIRECTV" belongs
 * to the "Portlike" experience entry).
 */
function resolveCompany(project: Project): {
  slug: string | undefined;
  period: string | undefined;
} {
  const pc = (project.company ?? "").toLowerCase();
  const exp = experience.find((e) => {
    const ec = e.company.toLowerCase();
    return pc === ec || pc.startsWith(ec);
  });
  if (!exp) return { slug: undefined, period: undefined };
  return { slug: companySlug(exp.company), period: exp.period };
}

export async function ProjectsSection() {
  const t = await getTranslations("Projects");
  // Newest first; `date` is a "YYYY-MM" sort key (display dates come later).
  const sorted = [...projects].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <WaveDivider from="dark" to="light" />
      <section id="projects" className="bg-slate-50 py-24 sm:py-32" aria-labelledby="projects-heading">
        <Container>
          {/* Custom heading: SectionHeading uses theme tokens, which resolve to
              dark-theme colors and break on this light island. */}
          <div className="text-center">
            <h2
              id="projects-heading"
              className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-semibold text-slate-900"
            >
              {t("heading")}
            </h2>
            <p className="mt-3 text-slate-600">{t("subheading")}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {sorted.map((project, index) => {
              const company = resolveCompany(project);
              return (
                <ProjectCard
                  key={project.slug ?? project.name}
                  project={project}
                  index={index}
                  companySlug={company.slug}
                  companyPeriod={company.period}
                />
              );
            })}
          </div>
        </Container>
      </section>
      <WaveDivider from="light" to="dark" />
    </>
  );
}
