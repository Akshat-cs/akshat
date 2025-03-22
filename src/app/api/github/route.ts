import { NextResponse } from "next/server";

interface GitHubRepo {
  name: string;
  description: string | null;
  language: string | null;
  updated_at: string;
  html_url: string;
}

export async function GET() {
  try {
    const headers = {
      Accept: "application/vnd.github.v3+json",
      Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
    };

    // Fetch all repos using pagination
    let allRepos: GitHubRepo[] = [];
    let page = 1;
    let hasMorePages = true;

    while (hasMorePages) {
      const reposResponse = await fetch(
        `https://api.github.com/users/akshat-cs/repos?per_page=100&page=${page}`,
        { headers }
      );

      if (!reposResponse.ok) {
        throw new Error(`GitHub API error: ${reposResponse.statusText}`);
      }

      const repos = (await reposResponse.json()) as GitHubRepo[];

      if (repos.length === 0) {
        hasMorePages = false;
      } else {
        allRepos = [...allRepos, ...repos];
        page++;
      }
    }

    // Fetch languages for each repo
    const reposWithLanguages = await Promise.all(
      allRepos.map(async (repo: GitHubRepo) => {
        const languagesResponse = await fetch(
          `https://api.github.com/repos/akshat-cs/${repo.name}/languages`,
          { headers }
        );

        let languages = [];
        if (languagesResponse.ok) {
          const languagesData = await languagesResponse.json();
          languages = Object.keys(languagesData).sort(
            (a, b) => languagesData[b] - languagesData[a]
          );
        } else {
          languages = repo.language ? [repo.language] : [];
        }

        return {
          name: repo.name,
          description: repo.description,
          language: repo.language,
          languages: languages,
          updated_at: repo.updated_at,
          html_url: repo.html_url,
        };
      })
    );

    // Sort by most recently updated
    const sortedRepos = reposWithLanguages.sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );

    return NextResponse.json(sortedRepos);
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub projects" },
      { status: 500 }
    );
  }
}
