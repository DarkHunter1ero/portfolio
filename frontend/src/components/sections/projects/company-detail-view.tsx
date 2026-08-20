import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowLeft, ExternalLink, Code2 } from "lucide-react";
import { Container } from "@/components/shared/container";
import { backToExperienceHref, projectDetailHref, withFrom } from "@/lib/routes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Experience, Project } from "@/types";

interface CompanyDetailViewProps {
  company: Experience;
  companyProjects: Project[];
  from?: string;
}

export async function CompanyDetailView({
  company,
  companyProjects,
  from,
}: CompanyDetailViewProps) {
  const t = await getTranslations("Experience");
  const tPd = await getTranslations("ProjectDetail");
  const tHero = await getTranslations("Hero");
  const tProjects = await getTranslations("Projects");
  const translatedProjectItems = tProjects.raw("items") as Array<{
    name: string;
    description: string;
  }>;

  function getTranslatedDesc(name: string): string {
    const item = translatedProjectItems.find((p) => p.name === name);
    return item?.description ?? "";
  }

  // Aggregate unique technologies from all projects
  const allTechs = Array.from(new Set(companyProjects.flatMap((p) => p.technologies)));

  return (
    <div className="min-h-screen">
      {/* Header gradient */}
      <div className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-background to-background pointer-events-none" />

        <Container className="relative z-10">
          <Link
            href={backToExperienceHref(from)}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToExperience")}
          </Link>

          <div className="flex flex-col sm:flex-row items-start gap-6">
            {company.logo ? (
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-border bg-card shrink-0">
                <Image
                  src={company.logo}
                  alt={company.company}
                  fill
                  className="object-contain p-2"
                  sizes="80px"
                />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                <span className="text-accent font-[family-name:var(--font-playfair)] text-3xl font-bold">
                  {company.company.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl font-bold text-foreground">
                {company.company}
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                {company.role} · {company.period}
              </p>
              <p className="text-sm text-muted-foreground mt-4 max-w-2xl leading-relaxed">
                {company.description}
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Projects section */}
      <section className="py-24 sm:py-32">
        <Container>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
            {t("projectsAt", { company: company.company })}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {companyProjects.map((project) => (
              <article
                key={project.name}
                className="rounded-2xl border border-border bg-card p-6 shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20 transition-shadow"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-border bg-secondary/30 shrink-0">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-foreground">
                      {project.name}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {getTranslatedDesc(project.name) || project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                {project.slug && (
                  <Button variant="outline" size="sm" className="gap-1 text-xs" asChild>
                    <a href={withFrom(projectDetailHref(project.slug), from)}>
                      <ExternalLink className="h-3 w-3" />
                      {tPd("viewProject")}
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-accent hover:underline ml-3"
                  >
                    {tHero("github")}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Technologies section */}
      <section className="py-24 sm:py-32 bg-card/30">
        <Container>
          <div className="text-center mb-12">
            <Code2 className="h-8 w-8 text-accent mx-auto mb-4" />
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {t("technologiesUsed")}
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              {t("technologiesUsedDesc", { company: company.company })}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {allTechs.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-sm px-4 py-2">
                {tech}
              </Badge>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
