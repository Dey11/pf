# Portfolio — AGENTS.md

This repository is Dey's public portfolio: a Next.js application that presents projects, experience, and contact details, with project-specific AI chat grounded in curated content and bounded public GitHub context.

## Non-Negotiable Core Principles

- Keep the homepage as the primary product surface; `/projects` and `/blogs` remain intentionally disabled unless a product decision explicitly restores them.
- Preserve the portfolio's established editorial visual language, responsive behavior, accessibility, and performance characteristics.
- Keep project chat context bounded and source-aware. Never imply access to repository files that were not included in the fetched snapshot.
- Treat public API routes as abuse-sensitive. Preserve input limits, output limits, and rate limiting unless a replacement provides equivalent or stronger protection.
- Keep secrets server-side and out of source control, logs, client bundles, and generated artifacts.

## Note

User instructions take precedence over this file. Keep changes focused on the requested outcome, prefer the smallest durable design, and do not deploy or change hosted resources without explicit authorization. Preserve existing behavior unless the request intentionally changes it.

## Project Glossary

- **Homepage:** The active portfolio experience rendered from `src/app/page.tsx` and its section components.
- **Project box:** Canonical project content and display metadata defined in `src/lib/project-boxes.ts`.
- **Project popup:** The modal project detail and chat experience implemented in `src/components/project-popup.tsx`.
- **Project chat:** The `/api/chat` route backed by DeepSeek V4 Flash through Nebius Token Factory, with optional public GitHub repository context.
- **GitHub context:** A bounded snapshot fetched by `src/lib/github-repo-context.ts` for source-aware project questions.
- **Portfolio assets:** Public images stored in the `pf-assets` Cloudflare R2 bucket and resolved through `src/lib/assets.ts`.
- **Contact form:** The server action and Prisma-backed persistence path for portfolio contact submissions.

## Development & Execution Rules

- Use Bun for dependency installation, scripts, and local tooling. Keep `bun.lock` authoritative.
- Primary commands:
  - `bun install --frozen-lockfile` installs dependencies without changing the lockfile.
  - `bun run dev` starts local development.
  - `bun run lint` runs ESLint.
  - `bun run build` generates the Prisma client and creates the production Next.js build.
- Use TypeScript throughout. Keep server-only concerns in server modules or route/action boundaries, and do not expose environment variables through client components.
- Required local and hosted variables are `DATABASE_URL` and `NEBIUS_API_KEY`. `GITHUB_TOKEN` is optional and only raises the public GitHub API rate limit. `NEXT_PUBLIC_ASSET_BASE_URL` optionally replaces the checked-in R2 origin when the bucket gets a custom domain.
- Keep `.env*`, `.vercel/`, generated Prisma output, Next.js output, and caches untracked.
- Prisma CLI configuration is `prisma.config.ts`, the schema is `prisma/schema.prisma`, and the Neon runtime adapter is initialized in `src/lib/prisma.ts`. Generated client code belongs in `src/generated/prisma` and must not be edited or committed.
- Keep portfolio images in the `pf-assets` R2 bucket rather than `public/`. Resolve repository-style object keys with `assetUrl()`, and use a new object key whenever image content changes because uploaded assets use immutable caching.
- Preserve the existing component patterns, Tailwind setup, and motion vocabulary. Reuse current primitives before adding dependencies or new abstractions.
- Homepage section labels are a sequential binary index, not decimal item counts. The active order is About `(000)`, tech stack `(001)`, experience `(010)`, projects `(011)`, Screening Room `(100)`, and Connect `(101)`; renumber the sequence when mounted sections change.
- Update `README.md` when setup, deployment, environment requirements, routes, or visible behavior changes.
- Before handing off a change, inspect the diff and run lint plus a production build when relevant. For frontend work, also report the routes and interactions that need visual verification.
