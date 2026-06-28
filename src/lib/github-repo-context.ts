import type { UIMessage } from "ai";

type RepoRef = {
  owner: string;
  repo: string;
};

type GithubRepoApiResponse = {
  full_name?: string;
  private?: boolean;
  description?: string | null;
  default_branch?: string;
  language?: string | null;
  topics?: string[];
  html_url?: string;
  homepage?: string | null;
  updated_at?: string;
};

type GithubTreeApiResponse = {
  tree?: {
    path?: string;
    type?: string;
    size?: number;
  }[];
};

type GithubContentApiResponse = {
  content?: string;
  encoding?: string;
  type?: string;
  size?: number;
};

type RepoContext = {
  text: string;
  fetchedAt: number;
};

const CACHE_TTL_MS = 30 * 60 * 1000;
const MAX_CONTEXT_CHARS = 14_000;
const MAX_FILE_CHARS = 2_800;
const MAX_FILES = 8;
const MAX_FILE_BYTES = 80_000;

const repoContextCache = new Map<string, RepoContext>();

const HIGH_SIGNAL_FILES = new Set([
  "readme.md",
  "readme.mdx",
  "package.json",
  "bunfig.toml",
  "turbo.json",
  "docker-compose.yml",
  "compose.yml",
  "prisma/schema.prisma",
  "context.md",
  "todo.md",
  "docs/architecture.md",
  "docs/project_context.md",
  "docs/implementation_guide.md",
  "docs/readme.md",
]);

const SOURCE_QUESTION_HINTS = [
  "architecture",
  "backend",
  "billing",
  "code",
  "database",
  "db",
  "deploy",
  "docker",
  "file",
  "frontend",
  "github",
  "implementation",
  "infra",
  "package",
  "prisma",
  "queue",
  "repo",
  "schema",
  "source",
  "stack",
  "worker",
];

function apiHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    accept: "application/vnd.github+json",
    "x-github-api-version": "2022-11-28",
    "user-agent": "dey-portfolio-project-chat",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

function parseGithubRepoUrl(url: string | null | undefined): RepoRef | null {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    if (parsed.hostname.toLowerCase() !== "github.com") return null;

    const [owner, rawRepo] = parsed.pathname.split("/").filter(Boolean);
    if (!owner || !rawRepo) return null;

    const repo = rawRepo.replace(/\.git$/i, "");
    if (!/^[\w.-]+$/.test(owner) || !/^[\w.-]+$/.test(repo)) return null;

    return { owner, repo };
  } catch {
    return null;
  }
}

async function githubFetch<T>(path: string): Promise<T | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);

  try {
    const response = await fetch(`https://api.github.com${path}`, {
      headers: apiHeaders(),
      next: { revalidate: 1800 },
      signal: controller.signal,
    });

    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function lastUserText(messages: UIMessage[]): string {
  const lastUserMessage = [...messages]
    .reverse()
    .find((m) => m.role === "user");
  if (!lastUserMessage) return "";

  return (lastUserMessage.parts ?? [])
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("\n")
    .toLowerCase();
}

export function shouldIncludeGithubContext(messages: UIMessage[]): boolean {
  const text = lastUserText(messages);
  if (!text) return true;
  if (text.length > 180) return true;

  return SOURCE_QUESTION_HINTS.some((hint) => text.includes(hint));
}

function truncate(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  return `${text.slice(0, maxChars).trimEnd()}\n[truncated]`;
}

function normalizeFileText(text: string): string {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\n{4,}/g, "\n\n\n")
    .trim();
}

function scorePath(path: string): number {
  const lower = path.toLowerCase();
  if (lower === "readme.md" || lower === "readme.mdx") return 100;
  if (lower === "package.json") return 90;
  if (HIGH_SIGNAL_FILES.has(lower)) return 80;
  if (lower.startsWith("docs/") && lower.endsWith(".md")) return 70;
  if (lower.endsWith("/package.json")) return 60;
  if (lower.endsWith("schema.prisma")) return 50;
  if (lower.endsWith(".md") || lower.endsWith(".mdx")) return 40;
  return 0;
}

function selectContextFiles(tree: GithubTreeApiResponse): string[] {
  return (tree.tree ?? [])
    .filter((item) => {
      if (item.type !== "blob" || !item.path) return false;
      if ((item.size ?? 0) > MAX_FILE_BYTES) return false;
      return scorePath(item.path) > 0;
    })
    .sort((a, b) => scorePath(b.path ?? "") - scorePath(a.path ?? ""))
    .slice(0, MAX_FILES)
    .map((item) => item.path)
    .filter((path): path is string => Boolean(path));
}

async function fetchTextFile(ref: RepoRef, branch: string, path: string) {
  const encodedPath = path
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");
  const data = await githubFetch<GithubContentApiResponse>(
    `/repos/${ref.owner}/${ref.repo}/contents/${encodedPath}?ref=${encodeURIComponent(branch)}`,
  );

  if (
    !data ||
    data.type !== "file" ||
    data.encoding !== "base64" ||
    !data.content ||
    (data.size ?? 0) > MAX_FILE_BYTES
  ) {
    return null;
  }

  const decoded = Buffer.from(data.content, "base64").toString("utf8");
  const normalized = normalizeFileText(decoded);
  if (!normalized) return null;

  return {
    path,
    text: truncate(normalized, MAX_FILE_CHARS),
  };
}

function formatRepoContext(
  repo: GithubRepoApiResponse,
  files: { path: string; text: string }[],
) {
  const metadata = [
    `Repository: ${repo.full_name ?? "unknown"}`,
    repo.description ? `Description: ${repo.description}` : null,
    repo.language ? `Primary language: ${repo.language}` : null,
    repo.topics?.length ? `Topics: ${repo.topics.join(", ")}` : null,
    repo.default_branch ? `Default branch: ${repo.default_branch}` : null,
    repo.homepage ? `Homepage: ${repo.homepage}` : null,
    repo.updated_at ? `Last updated on GitHub: ${repo.updated_at}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const fileContext = files
    .map((file) => `--- ${file.path} ---\n${file.text}`)
    .join("\n\n");

  return truncate(`${metadata}\n\n${fileContext}`, MAX_CONTEXT_CHARS);
}

export async function getGithubRepoContext(
  githubUrl: string | null | undefined,
  messages: UIMessage[],
) {
  const ref = parseGithubRepoUrl(githubUrl);
  if (!ref || !shouldIncludeGithubContext(messages)) return null;

  const cacheKey = `${ref.owner}/${ref.repo}`.toLowerCase();
  const cached = repoContextCache.get(cacheKey);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.text;
  }

  const repo = await githubFetch<GithubRepoApiResponse>(
    `/repos/${ref.owner}/${ref.repo}`,
  );

  if (!repo || repo.private || !repo.default_branch) {
    return null;
  }

  const tree = await githubFetch<GithubTreeApiResponse>(
    `/repos/${ref.owner}/${ref.repo}/git/trees/${encodeURIComponent(repo.default_branch)}?recursive=1`,
  );
  const paths = tree ? selectContextFiles(tree) : [];
  const files = (
    await Promise.all(
      paths.map((path) => fetchTextFile(ref, repo.default_branch!, path)),
    )
  ).filter((file): file is { path: string; text: string } => Boolean(file));

  const text = formatRepoContext(repo, files);
  repoContextCache.set(cacheKey, { text, fetchedAt: Date.now() });

  return text;
}
