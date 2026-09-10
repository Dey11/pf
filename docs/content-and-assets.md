# Content and assets

## Content ownership

Update content at its canonical owner instead of copying it into another constants module.

| Content                                                       | Canonical owner                         | Notes                                                                      |
| ------------------------------------------------------------- | --------------------------------------- | -------------------------------------------------------------------------- |
| Homepage order and technology section markup                  | `src/app/page.tsx`                      | `techStackItems` supplies the technology records                           |
| Hero featured projects and location                           | `src/lib/constants.ts`                  | `heroItems` drives the three featured cards                                |
| About narrative and inline project mentions                   | `src/components/about-section.tsx`      | Numeric mentions resolve into canonical project boxes                      |
| Experience entries                                            | `src/components/experience-section.tsx` | Keep newest-to-oldest ordering and the current full-time role pinned first |
| Project cards, popup details, chat grounding, and bento order | `src/lib/project-boxes.ts`              | This is the canonical project model                                        |
| Technology labels and popup/experience logos                  | `src/lib/tech-stack.ts`                 | Keys must match normalized project and experience tags                     |
| Connect copy and links                                        | `src/components/connect-section.tsx`    | Update the manual `lastUpdated` value when visible content changes         |
| Dormant blog post                                             | `src/blog-content/`                     | Not publicly routed                                                        |
| Unpublished project research                                  | `docs/content/`                         | Verify every claim before moving it into public copy                       |

The `projects` export at the end of `src/lib/constants.ts` is legacy data and has no current consumer. Do not add new project content there. Decide whether to remove it during the component cleanup.

## Adding or changing a project

1. Add or update the typed record in `projectBoxesByInventoryId`.
2. Keep the numeric inventory key stable if About mentions or other source material refer to it.
3. Keep `ProjectBox.id` stable unless changing its public deep-link slug is intentional.
4. Use concise card copy in `tagline` and `description`; keep evidence-based long-form copy in `content`.
5. Resolve every portfolio-owned image with `assetUrl()`, except the three hero-card screenshots, which stay in `public/landing-images/`.
6. Use `thumbnail` only when the bento card should differ from the first popup image.
7. Add the project to `prioritizedProjectColumns` if it should appear. Desktop weights still use the 3/4/5 presets as each card's flex basis; columns stretch so their bottoms align. Mobile flattens this configuration into equal image-backed cards.
8. Add or update entries in `techMeta` before introducing a new normalized technology tag.
9. If the project should be featured in the hero, update `heroItems` and preserve its `projectId` mapping to the canonical project record.

Project popup chat receives the record's name, description, tags, live link, GitHub link, and rendered long-form notes. Write the record so it remains truthful even when GitHub context is unavailable.

## Deep links and mentions

`projectSlug()` removes the `project-<number>-` prefix from a `ProjectBox.id`. The resulting `#<slug>-project` hash connects:

- hero cards;
- inline About project mentions;
- the bento highlight event;
- copied deep links.

Treat ID and slug changes as migrations. Verify direct page load with the old and new hash expectations, hero clicks, About clicks, scroll position, highlight clearing, and popup opening.

## Asset storage

Portfolio-owned images live in the Cloudflare R2 bucket named `pf-assets` and use repository-style keys without a leading slash. Two exceptions stay in the repo: the three hero-card screenshots under `public/landing-images/` so the first viewport does not depend on R2, and the favicon set so browsers can request same-origin `/favicon.ico`.

```ts
assetUrl("/projects/pdx.png");
assetUrl("/logos/stack/react.svg");
```

`src/lib/assets.ts` strips duplicate slashes and joins the key to the configured public origin. External absolute URLs pass through unchanged.

Uploaded assets use long-lived immutable caching. When image contents change, upload a new object key and update the source reference instead of overwriting the existing object. This avoids stale browser and edge caches.

Use these key families consistently:

- `landing-images/` for hero logos, wave backgrounds, and other brand treatment assets. The three hero-card screenshots themselves live in `public/landing-images/` instead of this R2 prefix;
- `logos/` for general logos and `logos/stack/` for technology icons;
- `projects/` for portfolio screenshots;
- `projects/external/` for screenshots originating from other public project sites or collaborators;
- a versioned `og-*.png` for social previews (currently `og-2026-09-10.png`).

Favicons are same-origin Next metadata files (`src/app/favicon.ico`, `src/app/icon.svg`, `src/app/apple-icon.png`) plus Android chrome PNGs in `public/`.

The managed `r2.dev` domain is the checked-in fallback. A future custom domain should be introduced through `NEXT_PUBLIC_ASSET_BASE_URL`, not by rewriting every asset reference.

## Editorial checks

Before publishing content sourced from `docs/content/`:

- verify project ownership, team role, dates, and whether the work was personal, freelance, or employment;
- verify usage numbers, performance claims, client outcomes, and product status;
- distinguish current behavior from planned or incomplete work;
- avoid implying access to private repositories or files not present in the public GitHub snapshot;
- confirm live and source links still point to the intended public targets;
- use screenshots that can be published and attribute externally sourced material when needed.

After visible content or assets change, check `/` at mobile and desktop widths, all affected hero/About links, the relevant bento card and popup image order, and a project-chat question that can be answered from curated copy alone.
