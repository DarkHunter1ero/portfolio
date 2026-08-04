import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/shared/section-heading";
import { Container } from "@/components/shared/container";
import { RepoCard } from "./repo-card";
import { fetchUserProfile, fetchGitHubRepos } from "@/lib/github";
import { pinnedRepos } from "@/data/pinned-repos";
import { Github, FolderGit2, Users } from "lucide-react";

async function GitHubFallback() {
  const t = await getTranslations("GitHub");

  return (
    <div className="text-center py-12">
      <Github className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {t("unavailable")}
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        {t("unavailableDesc")}
      </p>
      <a
        href="https://github.com/DarkHunter1ero"
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent hover:underline text-sm font-medium"
      >
        github.com/DarkHunter1ero
      </a>
    </div>
  );
}

export async function GitHubSection() {
  const t = await getTranslations("GitHub");

  try {
    const [profile, repos] = await Promise.all([
      fetchUserProfile(),
      fetchGitHubRepos(pinnedRepos),
    ]);

    const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);

    return (
      <section
        id="github"
        className="py-24 sm:py-32 bg-card/30"
        aria-labelledby="github-heading"
      >
        <Container>
          <SectionHeading
            id="github-heading"
            title={t("heading")}
            subtitle={t("subheading")}
          />

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto mb-12">
            <div className="text-center p-4 rounded-2xl border border-border bg-card/50">
              <FolderGit2 className="h-5 w-5 text-accent mx-auto mb-2" />
              <span className="block font-[family-name:var(--font-playfair)] text-2xl font-bold text-foreground">
                {profile.public_repos}
              </span>
              <span className="text-xs text-muted-foreground">
                {t("reposCount")}
              </span>
            </div>
            <div className="text-center p-4 rounded-2xl border border-border bg-card/50">
              <Users className="h-5 w-5 text-accent mx-auto mb-2" />
              <span className="block font-[family-name:var(--font-playfair)] text-2xl font-bold text-foreground">
                {profile.followers}
              </span>
              <span className="text-xs text-muted-foreground">
                {t("followersCount")}
              </span>
            </div>
            <div className="text-center p-4 rounded-2xl border border-border bg-card/50">
              <Github className="h-5 w-5 text-accent mx-auto mb-2" />
              <span className="block font-[family-name:var(--font-playfair)] text-2xl font-bold text-foreground">
                {totalStars}
              </span>
              <span className="text-xs text-muted-foreground">
                {t("starsCount")}
              </span>
            </div>
          </div>

          {/* Repos grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        </Container>
      </section>
    );
  } catch {
    return (
      <section
        id="github"
        className="py-24 sm:py-32 bg-card/30"
        aria-labelledby="github-heading"
      >
        <Container>
          <SectionHeading
            id="github-heading"
            title={t("heading")}
            subtitle={t("subheading")}
          />
          <GitHubFallback />
        </Container>
      </section>
    );
  }
}
