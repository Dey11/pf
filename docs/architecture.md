# Architecture

## Product shape

The portfolio is a Next.js App Router application with one active public page, the homepage at `/`. It combines mostly static editorial content with a few client-side interactions and one streamed AI endpoint. The standalone projects and blog routes remain in the tree but intentionally call `notFound()`.

The core architectural rule is simple: content stays close to its owning presentation or in typed content modules, browser interaction stays in client components, and external complexity is isolated behind server modules and route/action boundaries.

## Runtime map

```text
Browser
  |
  +-- GET / ----------------------> app/page.tsx
  |                                  |
  |                                  +-- homepage section components
  |                                  +-- project-boxes.ts
  |                                  +-- constants.ts / tech-stack.ts
  |                                  +-- assetUrl() -> public R2 objects
  |
  +-- project popup chat ----------> POST /api/chat
                                       |
                                       +-- request and output guards
                                       +-- curated project context
                                       +-- optional public GitHub snapshot
                                       +-- Nebius-hosted DeepSeek model
                                       +-- AI SDK UI message stream

Dormant contact form -------------> contactFormAction()
                                       |
                                       +-- Prisma Neon adapter
                                       +-- PostgreSQL Contact record
```

## Routes and rendering boundaries

| Route or action              | Status   | Boundary                                                                  |
| ---------------------------- | -------- | ------------------------------------------------------------------------- |
| `/`                          | Active   | Server page composing server and client sections                          |
| `/api/chat`                  | Active   | Public server route with per-instance rate limiting and input/output caps |
| `/projects`                  | Disabled | Calls `notFound()`; homepage bento is canonical                           |
| `/blogs`                     | Disabled | Calls `notFound()`; MDX content remains as dormant source material        |
| `/blogs/use-optimistic-hook` | Disabled | Calls `notFound()`                                                        |
| Contact server action        | Dormant  | Implemented, but its form is commented out of the homepage                |

`src/app/layout.tsx` owns global fonts, metadata, structured data, analytics, the main container, scroll behavior, and the development-only Agentation overlay. `src/app/page.tsx` owns homepage order and currently embeds the technology-stack markup directly.

## Homepage composition

The active page renders these sections in order:

1. `HeroSection`
2. `AboutSection`
3. `DeferredGithubContributions`
4. Inline technology stack section in `app/page.tsx`
5. `ExperienceSection`
6. `BentoSection`
7. `ConnectSection`

`NowSection`, `HobbiesSection`, `ScreeningRoomSection`, `FieldNotesSection`, and `ContactForm` remain in source but are not mounted. Their presence should not be treated as active product behavior.

### Project interaction flow

`src/lib/project-boxes.ts` is the canonical source for project cards, popup copy, images, links, tags, status, and desktop bento weights. Desktop columns keep those 3/4/5 presets as flex basis and grow leftover height so the three columns share a bottom edge. `HeroSection` has a smaller featured-project data set in `src/lib/constants.ts`.

Hero and inline About mentions use `src/lib/project-highlight.ts` to update a hash and dispatch a browser event. `BentoSection` listens for the event or hash changes, scrolls to the project grid, and highlights the matching card. Selecting a bento card opens `ProjectPopup`.

The project slug derived from each `ProjectBox.id` is therefore a public interaction contract. Changing an ID can break hero links, About mentions, and existing `#<slug>-project` deep links.

## Project chat

`ProjectPopup` sends AI SDK `UIMessage` history and selected project metadata to `POST /api/chat`. The route:

1. Refuses chat with `503` when `NEBIUS_API_KEY` is absent.
2. Applies an in-memory, fixed-window per-IP limit of 8 requests per minute.
3. Caps a request at 20 messages and 6,000 input characters.
4. Assembles a system prompt from the selected project's curated metadata.
5. Requests optional GitHub context only for a valid `github.com/<owner>/<repo>` URL and a source-oriented user question.
6. Streams at most 500 output tokens through the AI SDK UI-message protocol.

`src/lib/github-repo-context.ts` accepts only public GitHub repositories. It scores high-signal README, package, schema, and documentation files; fetches at most 8 small files; truncates each file and the total snapshot; and caches the result in memory for 30 minutes. The model must not imply access to any file absent from that snapshot.

The rate limiter and GitHub cache are process-local. They are adequate for the current portfolio deployment, but they are not global coordination mechanisms across server instances.

## Data and external services

| Concern                              | Owner                                              | External dependency                 |
| ------------------------------------ | -------------------------------------------------- | ----------------------------------- |
| Project and popup content            | `src/lib/project-boxes.ts`                         | None at render time                 |
| Featured hero content and tech lists | `src/lib/constants.ts`                             | None at render time                 |
| Technology labels and icons          | `src/lib/tech-stack.ts`                            | Public R2 assets                    |
| Portfolio images                     | `src/lib/assets.ts`, `public/landing-images/`      | R2 public origin; hero screenshots are local |
| Favicon and app icons                | `src/app/favicon.ico`, `icon.svg`, `apple-icon.png`, `manifest.ts` | Same-origin Next metadata files; Android chrome PNGs in `public/` |
| Project chat model                   | `src/lib/nebius.ts`                                | Nebius Token Factory                |
| Optional source context              | `src/lib/github-repo-context.ts`                   | Public GitHub API                   |
| Contact submissions                  | `src/lib/prisma.ts`, `src/actions/contact-form.ts` | Neon PostgreSQL                     |
| Usage telemetry                      | `src/app/layout.tsx`                               | Vercel Analytics and Speed Insights |

All portfolio-owned image paths must pass through `assetUrl()`, except the three hero-card screenshots (served from `public/landing-images/`) and the site favicon set (Next metadata files under `src/app/` plus Android chrome PNGs in `public/`). The default `assetUrl()` origin is the managed `r2.dev` domain and can be replaced with `NEXT_PUBLIC_ASSET_BASE_URL`.

## Styling and motion

Tailwind CSS 4 supplies the utility layer. `src/app/globals.css` defines the black, white, and red color tokens, global type utilities, blog prose rules, the contribution calendar layout, and popup scrollbars. Dark presentation is intentional and should remain high contrast.

Interactive sections use Motion for React. Lenis smooth scrolling is initialized by `Container` and exposed as `window.lenis` for the project-highlight flow. Changes to modal scroll locking, project-card hover states, accordion animation, or hash-driven scrolling should be treated as behavior changes, not cosmetic class cleanup.

## Known cleanup seams

These are observations for the upcoming component work, not pre-approved deletions:

- `src/app/page.tsx` owns a large repeated technology-stack section that is a natural extraction candidate.
- `src/components/project-popup.tsx` combines modal mechanics, image browsing, markdown rendering, and chat behavior in one client module.
- `src/lib/project-boxes.ts` combines a typed domain record, long-form editorial content, asset references, and layout configuration in a large file.
- `src/lib/constants.ts` still exports an older `projects` array with no current consumer; the live project model is `projectBoxesByInventoryId`.
- `Navbar`, `NowSection`, `HobbiesSection`, `ContactForm`, and its server action are dormant or unmounted. Product intent should decide whether they are restored or removed.
- The dormant contact action logs submitted fields and relies on basic presence checks. Remove personal-data logging and add typed validation plus abuse protection before restoring the public form.
- Content for hero projects, bento projects, experience, About, and Connect uses different ownership patterns. Consolidation may help, but a single catch-all constants file would weaken cohesion.

Any cleanup should preserve active route behavior, project deep links, responsive bento differences, chat limits, R2 path handling, and the editorial visual language unless the agreed revamp explicitly changes them.
