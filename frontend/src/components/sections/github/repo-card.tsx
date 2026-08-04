import type { GitHubRepo } from "@/types/github";
import { Badge } from "@/components/ui/badge";
import { LanguageBar } from "./language-bar";
import { Star, GitFork, ExternalLink } from "lucide-react";

interface RepoCardProps {
  repo: GitHubRepo;
}

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <article className="group rounded-2xl border border-border bg-card p-6 shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20 transition-all duration-300">
      <div className="flex items-start justify-between mb-2">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-[family-name:var(--font-mono)] text-sm font-medium text-foreground hover:text-accent transition-colors truncate pr-2"
        >
          {repo.name}
        </a>
        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {repo.description && (
        <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
          {repo.description}
        </p>
      )}

      {repo.languages && Object.keys(repo.languages).length > 0 && (
        <div className="mb-3">
          <LanguageBar languages={repo.languages} />
        </div>
      )}

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-accent" />
            {repo.language}
          </span>
        )}

        {repo.stargazers_count > 0 && (
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3" />
            {repo.stargazers_count}
          </span>
        )}

        {repo.forks_count > 0 && (
          <span className="flex items-center gap-1">
            <GitFork className="h-3 w-3" />
            {repo.forks_count}
          </span>
        )}

        {repo.topics && repo.topics.length > 0 && (
          <div className="flex gap-1 flex-wrap ml-auto">
            {repo.topics.slice(0, 2).map((topic) => (
              <Badge key={topic} variant="secondary" className="text-[10px] px-1.5 py-0">
                {topic}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
