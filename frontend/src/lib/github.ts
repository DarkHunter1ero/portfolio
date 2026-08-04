import type { GitHubRepo, GitHubUser } from "@/types/github";

const GITHUB_API = "https://api.github.com";
const USERNAME = "DarkHunter1ero";

function getHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  } else if (process.env.NODE_ENV === "development") {
    console.warn(
      "[GitHub] No GITHUB_TOKEN found. Using unauthenticated requests (60 req/h limit)."
    );
  }

  return headers;
}

export async function fetchUserProfile(): Promise<GitHubUser> {
  const res = await fetch(`${GITHUB_API}/users/${USERNAME}`, {
    headers: getHeaders(),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`GitHub API: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function fetchGitHubRepos(
  pinnedList: string[]
): Promise<GitHubRepo[]> {
  // First fetch pinned repos (they get priority placement)
  const pinnedResults = await Promise.allSettled(
    pinnedList.map(async (fullName) => {
      const res = await fetch(`${GITHUB_API}/repos/${fullName}`, {
        headers: getHeaders(),
        next: { revalidate: 3600 },
      });

      if (!res.ok) {
        console.error(`GitHub API error for ${fullName}: ${res.status}`);
        return null;
      }

      const repo: GitHubRepo = await res.json();

      // Fetch languages for pinned repos
      try {
        const langRes = await fetch(
          `${GITHUB_API}/repos/${fullName}/languages`,
          {
            headers: getHeaders(),
            next: { revalidate: 3600 },
          }
        );
        if (langRes.ok) {
          repo.languages = await langRes.json();
        }
      } catch {
        // Languages fetch is optional, don't fail
      }

      return repo;
    })
  );

  const pinnedRepos = pinnedResults
    .filter(
      (r): r is PromiseFulfilledResult<GitHubRepo> =>
        r.status === "fulfilled" && r.value !== null
    )
    .map((r) => r.value);

  // Then fetch general repos
  const reposRes = await fetch(
    `${GITHUB_API}/users/${USERNAME}/repos?sort=updated&per_page=30`,
    {
      headers: getHeaders(),
      next: { revalidate: 3600 },
    }
  );

  const allRepos: GitHubRepo[] = reposRes.ok ? await reposRes.json() : [];

  // Combine: pinned first, then general (deduplicated)
  const pinnedNames = new Set(pinnedRepos.map((r) => r.id));
  const generalRepos = allRepos.filter((r) => !pinnedNames.has(r.id));

  return [...pinnedRepos, ...generalRepos].slice(0, 12);
}
