"use client"

const gitHubEndpoint = "https://api.github.com"

export const fetchGitHubApi = <T>(path: string) => {
  const nextPath = path.replace(gitHubEndpoint, "")

  return fetch(gitHubEndpoint + nextPath).then((res) => {
    if (res.status === 403) {
      throw new Error("GitHub API rate limit exceeded")
    }

    return res.json()
  }) as Promise<T>
}
