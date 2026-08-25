# Portfolio

Personal portfolio built with Next.js and Bun.

## Deployment

This app is deployable on Vercel as a standard Next.js project.

- Install command: `bun install`
- Build command: `bun run build`
- Start command: Vercel's default Next.js runtime

Required runtime environment variables:

- `DATABASE_URL`: Neon PostgreSQL connection used by the contact form.
- `NEBIUS_API_KEY`: Nebius Token Factory credential used by project chat.

Recommended runtime environment variables:

- `GITHUB_TOKEN`: used by `src/lib/github-repo-context.ts` for higher GitHub API rate limits when fetching public repository context. The app can still try unauthenticated public GitHub requests without it.
- `NEXT_PUBLIC_ASSET_BASE_URL`: overrides the default public R2 origin. Set this to a custom asset domain when one becomes available.

Copy `.env.example` to `.env.local` and replace its placeholders for local development. Never commit `.env.local`.

The production build runs `bunx prisma generate && next build`. Prisma CLI configuration lives in `prisma.config.ts`, and the runtime client connects to Neon through `@prisma/adapter-neon`.

## Image storage

Portfolio images live in the `pf-assets` Cloudflare R2 bucket and are publicly served from `https://pub-ebb1e004d4fb42dd90caf81433c0b1b4.r2.dev`. The repository no longer ships a local `public/` image tree. Object keys preserve the former public paths without the leading slash, such as `projects/pdx.png` and `logos/stack/react.svg`.

All application references go through `assetUrl()` in `src/lib/assets.ts`. Keep that boundary intact so a future custom domain only requires changing `NEXT_PUBLIC_ASSET_BASE_URL`. Uploaded objects use one-year immutable caching, so replace changed images with a new object key rather than overwriting an existing key.

## Project Chat Runtime

Project popup chat uses `deepseek-ai/DeepSeek-V4-Flash-0731` through Nebius Token Factory's OpenAI-compatible API. It is not wired as a model tool call. The server checks the latest user message, fetches a bounded public GitHub snapshot for source-aware questions when the selected project has a `github.com/owner/repo` link, and inserts that compact context into the system prompt before calling the model.

Use this hosted smoke test after deployment:

1. Open the homepage.
2. Open the Leadly project card.
3. Go to the Chat tab.
4. Ask: `From the GitHub source, what services make up Leadly and how do the scheduler/worker pieces fit together?`

If GitHub context is being fetched, the answer should mention source-backed details from the Leadly repo, such as the Next.js frontend, Express backend, worker service, Reddit monitoring, BullMQ/Redis, quotas, and billing/webhooks.

## Content Notes

- Homepage experience content lives in `src/components/experience-section.tsx`; expanded experience rows render full-width text points and tech tags without preview images.
- Homepage hero project cards live in `src/components/hero-section.tsx`; their shared SVG wave background uses a gray base and a slower red opacity layer on desktop hover, with staggered delay by card distance to make the color progress readable. On mobile, the red brand layer is shown by default because there is no hover interaction.
- Homepage About content lives in `src/components/about-section.tsx`; it uses a single-column editorial layout, compact scale callouts, and project mentions that preview their project image from the mention center on desktop hover/focus before scrolling to and highlighting the matching bento project on click. Inline About reveals keep hover-only overlays hidden on mobile; project thumbnails fade and scale from 90% to 100% with a faster exit, and edge mentions align their thumbnail start/end to avoid clipping.
- About project marks may use stable R2 copies of the live brand favicon; Thomas Bewick's favicon uses the `logos/thomasbewick.png` object.
- Work experience is shown first, followed by a separate freelance experience section.
- Moai copy should describe it as a trading journal with Fidelity support for now, without WIP wording.
- The homepage GitHub contribution chart is rendered below the About section through `src/components/deferred-github-contributions.tsx`, which loads `src/components/github-contributions.tsx` shortly before the chart scrolls into view.
- Homepage project box content and priority ordering live in `src/lib/project-boxes.ts`.
- Homepage bento layout lives in `src/components/bento-section.tsx`; desktop keeps weighted project boxes, while mobile uses equal medium cards with thumbnails and titles already revealed.
- Homepage performance keeps above-the-fold hero screenshots eager via `next/image`, while below-fold bento thumbnails, project popup screenshots, and tech icons use responsive lazy `next/image` rendering.
- The GitHub contribution chart is viewport-deferred by `src/components/deferred-github-contributions.tsx` so the chart and tooltip libraries load shortly before the section enters view instead of during the first viewport.
- Standalone `/projects`, `/blogs`, and `/blogs/use-optimistic-hook` routes are intentionally disabled with `notFound()`; the homepage bento project section is the active projects surface.
- Project box brand colors also live in `src/lib/project-boxes.ts`; darker card colors can set `foreground: "light"` so hover text remains readable.
- Project modal screenshots use `projects/*` objects in R2, with externally sourced screenshots under `projects/external/*`; each project's `images` array controls popup image order.
- Project popup chat is grounded in each box's title, description, long-form content, tech tags, live URL, and GitHub URL. For `github.com/owner/repo` links, the API also fetches a bounded public GitHub snapshot through `src/lib/github-repo-context.ts` so source-aware questions can use README/docs/package/schema snippets at request time. It does not inspect private repositories or arbitrary external URLs.
- Project popup mobile behavior hides prompt suggestions, keeps the lightweight body overflow lock used by the modal, and keeps detail headings visually larger than body copy.
- VenturAssist uses the shared `projects/venturassist.png` R2 object.
- Hanabi's card thumbnail and first popup screenshot use the shared `projects/external/hanabi-site-1.png` R2 object.
- Ballarat's additional site-section screenshots use the `projects/external/ballarat-site-*.webp` R2 naming convention.
- Project blog/source notes are drafted in `PROJECT_BLOG_DRAFTS.md` and the project selection inventory is in `PROJECTS_INVENTORY.md`.
