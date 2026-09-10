# Component map

## Purpose

This map captures current ownership before the planned cleanup and visual revamp. It is descriptive, not a refactor prescription. Update it as boundaries change so future work starts from the shipped system rather than old assumptions.

## Active page tree

```text
RootLayout
  +-- ScrollToTop
  +-- Container
      +-- Home
          +-- HeroSection
          |   +-- Signature
          +-- AboutSection
          +-- DeferredGithubContributions
          |   +-- GithubContributions (dynamic client import)
          +-- technology stack markup (inline in Home)
          +-- ExperienceSection
          +-- BentoSection
          |   +-- BentoCard
          |   +-- ProjectPopup
          |       +-- image list
          |       +-- project details/markdown
          |       +-- AI chat
          +-- ConnectSection
```

## Responsibilities and coupling

| Module                                         | Current responsibility                                            | Important coupling                                        |
| ---------------------------------------------- | ----------------------------------------------------------------- | --------------------------------------------------------- |
| `app/layout.tsx`                               | Global metadata, fonts, analytics, development overlay, container | Asset origin, production domain, global page wrapper      |
| `app/page.tsx`                                 | Active section order and technology-stack rendering               | `techStackItems`; commented dormant sections              |
| `components/container.tsx`                     | Responsive page width and Lenis lifecycle                         | Publishes `window.lenis` for bento scrolling              |
| `components/hero-section.tsx`                  | Intro, IST clock, location, featured-project cards                | `heroItems`, asset backgrounds, project highlight hashes  |
| `components/about-section.tsx`                 | Editorial bio and inline hover/focus facts                        | Canonical project IDs, project highlight events, R2 marks |
| `components/deferred-github-contributions.tsx` | Viewport-triggered code loading and skeleton                      | Dynamic import of chart dependencies                      |
| `components/experience-section.tsx`            | Experience data, accordion state, tag presentation                | `techMeta`, Motion animation                              |
| `components/bento-section.tsx`                 | Responsive project grid, highlight state, selection               | Project model/layout, hashes, Lenis, popup lifecycle      |
| `components/project-popup.tsx`                 | Modal, screenshots, markdown details, chat client                 | AI SDK stream, `/api/chat`, body scroll lock, R2 icons    |
| `components/connect-section.tsx`               | Contact links and availability footer                             | Manual last-updated date                                  |
| `lib/project-boxes.ts`                         | Canonical project records and bento weights                       | Asset keys, popup/chat contract, numeric About mappings   |
| `lib/project-highlight.ts`                     | Hash parsing and cross-component browser event                    | `ProjectBox.id`-derived slugs                             |

## Dormant code

The following code is present but does not participate in the active homepage:

- `components/navbar.tsx` links to the disabled `/projects` route.
- `components/now-section.tsx`, `components/hobbies-section.tsx`, `components/screening-room-section.tsx`, and `components/field-notes-section.tsx` are unmounted from `app/page.tsx`.
- `components/contact-form.tsx` and `actions/contact-form.ts` remain implemented, but the form is commented out of `app/page.tsx`.
- `app/projects/` and `app/blogs/` keep route placeholders that intentionally return `404`.
- `lib/constants.ts` exports a legacy `projects` array that is not imported anywhere.

Do not preserve dormant code by default or delete it as generic cleanup. Resolve each item against the intended revamp, especially the contact data path and disabled routes. If the form returns, remove submitted-field logging and add typed validation and abuse protection before exposing the action publicly.

## Candidate boundaries for the cleanup

These boundaries are likely to improve cohesion if the revamp needs them:

1. Extract the inline technology-stack section from `app/page.tsx` into one focused section component. Keep its data separate from its alternating layout rules.
2. Split `ProjectPopup` by behavior: modal shell and accessibility, media gallery, details renderer, and chat panel. Keep its public props small.
3. Separate project editorial records from bento layout configuration if project content will evolve independently of the grid.
4. Keep interaction protocols such as project hashes/events in a small shared module; do not duplicate slug logic in components.
5. Prefer section-local content for one-off editorial copy. Use typed shared content only when multiple active surfaces consume the same record.

The revamp should not introduce a generic component layer before repeated behavior is known. Existing patterns should be deepened around stable ownership boundaries instead of collecting unrelated sections into a broad UI abstraction.

## Behavior to preserve unless explicitly redesigned

- The homepage remains the only indexed page.
- Hero and About project links scroll to and highlight the correct bento card.
- Mobile cards are equal-sized, image-backed, and readable without hover.
- Desktop bento weights and project ordering remain intentional. Preset heights are the flex basis; columns stretch to one shared bottom edge.
- The project popup preserves its current body-scroll lock, backdrop/close-button behavior, and Escape-key close path. If it is split or redesigned, add proper dialog semantics and focus management rather than assuming the current modal is complete.
- Project screenshots stay responsive and lazy below the fold.
- The GitHub contribution package loads only shortly before its section enters the viewport.
- Chat remains bounded, source-aware, and honest about unavailable repository context.
- Motion changes include reduced-motion and performance review during implementation.

## Verification map

For component work, prefer focused checks plus the production build:

```bash
bun run lint
bunx tsc --noEmit
bun run build
```

Visual and interaction checks should cover:

- `/` at mobile, tablet, and desktop widths;
- hero hover/touch presentation and all featured-project links;
- About inline reveals and project mentions;
- experience accordion open/close behavior;
- mobile and desktop bento layouts;
- project popup open, close, scrolling, images, Details/Chat tab changes, and streamed responses;
- direct `#<slug>-project` page loads;
- the deferred contribution-chart transition from skeleton to chart;
- absent API configuration and rate-limit errors where server behavior changes.
