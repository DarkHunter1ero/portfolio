import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/shared/section-heading";
import { Container } from "@/components/shared/container";
import { ProjectCard } from "./project-card";
import { projects } from "@/data/projects";
import type { Project } from "@/types";

const COMPANY_ORDER = ["Quiero Realizarlo", "ISA Interfase", "Beacon42", "Portlike · DIRECTV"];

function groupByCompany(projects: Project[]): Array<{
  company: string;
  items: Project[];
}> {
  const map = new Map<string, Project[]>();

  for (const project of projects) {
    const key = project.company ?? "Other";
    const group = map.get(key) ?? [];
    group.push(project);
    map.set(key, group);
  }

  // Sort groups by COMPANY_ORDER, append any unknown companies at the end
  return COMPANY_ORDER.filter((c) => map.has(c))
    .map((c) => ({ company: c, items: map.get(c)! }))
    .concat(
      Array.from(map.entries())
        .filter(([c]) => !COMPANY_ORDER.includes(c))
        .map(([company, items]) => ({ company, items }))
    );
}

export async function ProjectsSection() {
  const t = await getTranslations("Projects");
  const groups = groupByCompany(projects);

  // Compute flat index across all groups for animation delays
  let flatIndex = 0;

  return (
    <section id="projects" className="py-24 sm:py-32 bg-card/30" aria-labelledby="projects-heading">
      <Container>
        <SectionHeading id="projects-heading" title={t("heading")} subtitle={t("subheading")} />

        <div className="space-y-10">
          {groups.map((group) => {
            const startIndex = flatIndex;
            flatIndex += group.items.length;

            return (
              <div key={group.company}>
                {groups.length > 1 && (
                  <p className="text-xs font-medium text-muted-foreground/60 uppercase tracking-widest mb-4 pl-1">
                    {group.company}
                  </p>
                )}
                <div className="grid md:grid-cols-2 gap-8">
                  {group.items.map((project, i) => (
                    <ProjectCard key={project.name} project={project} index={startIndex + i} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
