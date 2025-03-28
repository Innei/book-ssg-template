import { HighLighter } from "../code-highlighter"

const ext2FileType = {
  ".js": "javascript",
  ".ts": "typescript",
  ".jsx": "javascript",
  ".tsx": "typescript",
  ".md": "markdown",
  ".css": "css",
  ".scss": "scss",
  ".html": "html",
  ".json": "json",
  ".yml": "yaml",
  ".yaml": "yaml",
  ".toml": "toml",
  ".xml": "xml",
  ".sh": "bash",
  ".bash": "bash",
  ".zsh": "bash",
  ".fish": "bash",
  ".ps1": "powershell",
  ".bat": "batch",
  ".cmd": "batch",
  ".go": "go",
  ".py": "python",
  ".rb": "ruby",
  ".java": "java",
  ".c": "c",
  ".cpp": "cpp",
  ".cs": "csharp",
  ".rs": "rust",
  ".swift": "swift",
  ".kt": "kotlin",
  ".clj": "clojure",
  ".lua": "lua",
  ".sql": "sql",
  ".graphql": "graphql",
  ".groovy": "groovy",
  ".scala": "scala",
  ".pl": "perl",
  ".r": "r",
  ".dart": "dart",
  ".elm": "elm",
  ".erl": "erlang",
  ".ex": "elixir",
  ".h": "c",
  ".hpp": "cpp",
  ".hxx": "cpp",
  ".hh": "cpp",
  ".h++": "cpp",
  ".m": "objectivec",
  ".mm": "objectivec",
  ".vue": "vue",
}
export const EmbedGithubFile = async ({
  owner,
  path,
  repo,
  refType,
}: {
  owner: string
  repo: string
  path: string
  refType?: string
}) => {
  const ext = path.slice(path.lastIndexOf("."))
  const fileType = (ext2FileType as any)[ext] || "text"
  const data = await fetch(
    `https://cdn.jsdelivr.net/gh/${owner}/${repo}${refType ? `@${refType}` : ""}/${path}`,
  ).then(async (res) => {
    return res.text()
  })

  if (!data) return null

  return <HighLighter content={data} lang={fileType} />
}
