# R2 asset migration

## Status

Complete. The tracked image tree was migrated to the `pf-assets` bucket, runtime references now pass through `assetUrl()`, and the local image copies were removed.

## Goal

Move every tracked portfolio image from the application bundle into a dedicated Cloudflare R2 bucket, then make the application load those objects through one configurable public base URL.

## Context

The repository currently contains 99 image files, about 58 MB, under `public/` and `src/app/favicon.ico`. The deployed Vercel project is `pf` in the `rupdey1102` hobby scope. The Cloudflare account does not control the `sdey.me` zone, so it cannot attach `assets.sdey.me` to the bucket.

## Scope

- Create a new `pf-assets` R2 bucket.
- Upload all tracked PNG, JPEG, WebP, SVG, and ICO files with their repository-relative public paths as object keys.
- Enable the bucket's managed `r2.dev` public URL.
- Add one asset URL helper with `NEXT_PUBLIC_ASSET_BASE_URL` support and a working R2 default.
- Update all runtime and metadata image references to use the helper.
- Remove migrated image files from the application bundle after remote verification.
- Document local and Vercel configuration.

## Non-goals

- Image recompression, resizing, format conversion, or visual changes.
- Moving Google Fonts or third-party API content.
- Deploying the application or changing unrelated Vercel projects.
- Moving the `sdey.me` DNS zone between Cloudflare accounts.

## Chosen architecture

R2 object keys preserve current public paths without the leading slash, such as `projects/pdx.png` and `logos/stack/react.svg`. `assetUrl()` owns the public base URL and path joining. This keeps content data readable and gives the project one switch for a future custom asset domain.

The initial public origin is the bucket's managed `r2.dev` domain. This is acceptable for the current hobby deployment, but Cloudflare rate-limits managed development domains. A custom domain should replace it if traffic grows.

## Alternatives considered

- A Cloudflare custom domain is the preferred production delivery path, but this account has no access to the `sdey.me` zone.
- A Vercel proxy could keep R2 private, but it would add runtime code and route image traffic through Vercel.
- Presigned URLs expire and are unsuitable for stable public portfolio assets.

## Implementation phases

1. Inventory assets and references.
2. Create and populate the bucket, then verify object counts and representative checksums.
3. Add centralized URL resolution and update image references.
4. Remove local assets and update documentation.
5. Run lint and a production build, inspect the diff, and verify the allowed Vercel project configuration.

## Validation

- R2 lists all 99 expected object keys.
- Remote objects return the expected content types and byte counts.
- No runtime image reference bypasses `assetUrl()`.
- No migrated image remains in the Git worktree.
- `bun run lint` and `bun run build` pass.

## Risks

- `r2.dev` has Cloudflare-managed rate limits.
- Removing local fallbacks makes R2 availability part of page rendering.
- SVG and ICO objects need correct `Content-Type` metadata.

## Status

Complete on 2026-08-25.

- Created `pf-assets` in Cloudflare R2 and enabled its managed public domain.
- Uploaded and byte-for-byte verified all 99 assets, including MIME type, cache metadata, and ETag.
- Removed the 58 MB local image tree after remote verification.
- Confirmed generated metadata and homepage image URLs use R2.
- Confirmed Next's image optimizer can fetch representative PNG and JPEG objects; SVG objects render directly from R2.
- `bun run build` passes. `bun run lint` has no errors and retains one unrelated pre-existing warning in `src/actions/contact-form.ts`.
- Made no Vercel write or deployment. The CLI did not recognize `rupdey1102` as a scope, so the checked-in R2 default avoids depending on hosted environment configuration.
