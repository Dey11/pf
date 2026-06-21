# Portfolio

Personal portfolio built with Next.js and Bun.

## Content Notes

- Homepage experience content lives in `src/components/experience-section.tsx`; expanded experience rows render full-width text points and tech tags without preview images.
- Work experience is shown first, followed by a separate freelance experience section.
- Moai copy should describe it as a trading journal with Fidelity support for now, without WIP wording.
- The homepage GitHub contribution chart is rendered below the About section by `src/components/github-contributions.tsx`.
- Homepage project box content and priority ordering live in `src/lib/project-boxes.ts`.
- Project box brand colors also live in `src/lib/project-boxes.ts`; darker card colors can set `foreground: "light"` so hover text remains readable.
- Project modal screenshots are stored under `public/projects` and externally sourced project screenshots are stored under `public/projects/external`; each project's `images` array controls popup image order.
- Project popup chat is grounded in each box's title, description, long-form content, tech tags, live URL, and GitHub URL. It can answer architecture questions from those maintained notes, but it does not browse GitHub or inspect repositories at request time.
- VenturAssist uses the shared screenshot asset at `public/projects/venturassist.png`.
- Hanabi's card thumbnail and first popup screenshot use the shared screenshot asset at `public/projects/external/hanabi-site-1.png`.
- Ballarat's additional site-section screenshots use the `ballarat-site-*.webp` naming convention in `public/projects/external`.
- Project blog/source notes are drafted in `PROJECT_BLOG_DRAFTS.md` and the project selection inventory is in `PROJECTS_INVENTORY.md`.
