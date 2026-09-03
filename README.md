# Portfolio

Dey's public portfolio is a Next.js application centered on a single editorial homepage. It presents selected work and experience, and gives each featured project a source-aware AI chat grounded in curated project copy plus a bounded snapshot of its public GitHub repository.

The homepage is the only active public page. `/projects`, `/blogs`, and `/blogs/use-optimistic-hook` intentionally return `404` until a future product decision restores them.

## Local development

Requirements:

- Bun
- PostgreSQL, through a `DATABASE_URL` compatible with the Neon Prisma adapter
- A Nebius Token Factory API key if project chat needs to run locally

```bash
cp .env.example .env.local
bun install --frozen-lockfile
bun run dev
```

Open [http://localhost:3000](http://localhost:3000). The development layout also enables Agentation; it is excluded from production.

## Commands

| Command             | Purpose                                                 |
| ------------------- | ------------------------------------------------------- |
| `bun run dev`       | Start the Next.js development server                    |
| `bun run lint`      | Run ESLint across the repository                        |
| `bunx tsc --noEmit` | Run a standalone TypeScript check                       |
| `bun run build`     | Generate the Prisma client and build the production app |
| `bun run start`     | Start a completed production build                      |

## Environment variables

| Variable                     | Required     | Used by                                                             |
| ---------------------------- | ------------ | ------------------------------------------------------------------- |
| `DATABASE_URL`               | Yes          | Prisma and the dormant contact-form server action                   |
| `NEBIUS_API_KEY`             | Yes for chat | The `/api/chat` model provider; missing configuration returns `503` |
| `GITHUB_TOKEN`               | No           | Raises GitHub's API rate limit for public repository context        |
| `NEXT_PUBLIC_ASSET_BASE_URL` | No           | Replaces the default public R2 asset origin                         |

Copy `.env.example` to `.env.local` and replace the placeholders. Never commit local environment files.

## Architecture at a glance

- `src/app/page.tsx` composes the active homepage sections.
- `src/lib/project-boxes.ts` is the canonical project-content and bento-layout source.
- `src/components/project-popup.tsx` renders project details and owns the project-chat client.
- `src/app/api/chat/route.ts` enforces request limits, assembles bounded context, and streams the model response.
- `src/lib/github-repo-context.ts` conditionally fetches compact context from linked public GitHub repositories.
- `src/lib/assets.ts` resolves all portfolio-owned images through the public `pf-assets` R2 bucket.
- Prisma stores contact submissions, although the contact form is not currently mounted on the homepage.

See [docs/architecture.md](docs/architecture.md) for the runtime and component boundaries.

## Documentation

Start with [docs/README.md](docs/README.md). It separates durable architecture and maintenance guidance from historical plans and unpublished content research.

- [Architecture](docs/architecture.md): routes, component ownership, data flow, server boundaries, and known cleanup seams.
- [Content and assets](docs/content-and-assets.md): where portfolio copy lives and how to update projects, screenshots, technology labels, and R2 objects.
- [Component map](docs/maintenance/component-map.md): current component responsibilities and constraints for the upcoming cleanup/revamp.
- [Project research](docs/content/): internal inventory and unpublished long-form drafts; these are working material, not verified public claims.
- [Plans](docs/plans/): living or completed implementation records for material changes.

Repository-specific operating rules live in [AGENTS.md](AGENTS.md).

## Deployment

The app is deployable as a standard Next.js project on Vercel:

- Install command: `bun install --frozen-lockfile`
- Build command: `bun run build`
- Start command: Vercel's default Next.js runtime

Set `DATABASE_URL` and `NEBIUS_API_KEY` for every environment that needs the corresponding runtime. `GITHUB_TOKEN` and `NEXT_PUBLIC_ASSET_BASE_URL` remain optional.

After a hosted change, verify the homepage, a project details popup, and a source-aware project chat request. Deployment or hosted-environment changes require explicit authorization.
