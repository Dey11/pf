const DEFAULT_ASSET_BASE_URL =
  "https://pub-ebb1e004d4fb42dd90caf81433c0b1b4.r2.dev";

/** Public origin for portfolio images, overridable when R2 gets a custom domain. */
export const ASSET_BASE_URL = (
  process.env.NEXT_PUBLIC_ASSET_BASE_URL ?? DEFAULT_ASSET_BASE_URL
).replace(/\/+$/, "");

/** Resolves a repository-style asset path against the configured R2 origin. */
export function assetUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;

  return `${ASSET_BASE_URL}/${path.replace(/^\/+/, "")}`;
}

const preSizedAssetKeys = new Set([
  "logos/11auction-2026-11-25.webp",
  "logos/expo-2026-11-25.webp",
  "logos/monkeep-2026-11-25.webp",
  "logos/prisma-2026-11-25.webp",
  "logos/redis-2026-11-25.webp",
  "logos/supabase-2026-11-25.webp",
  "projects/external/11auction-app-store-01-2026-11-25.webp",
  "projects/external/11auction-app-store-02-2026-11-25.webp",
  "projects/external/11auction-app-store-03-2026-11-25.webp",
  "projects/external/11auction-app-store-04-2026-11-25.webp",
  "projects/external/11auction-home-desktop-2026-11-25.webp",
  "projects/external/acomodo-browse-desktop-2026-11-25.webp",
  "projects/external/acomodo-home-desktop-2026-11-25.webp",
  "projects/external/acomodo-home-tall-2026-11-25.webp",
  "projects/external/acomodo-property-desktop-2026-11-25.webp",
  "projects/monkeep-app-01-home-2026-11-25.webp",
  "projects/monkeep-app-02-budget-2026-11-25.webp",
  "projects/monkeep-app-03-activity-2026-11-25.webp",
  "projects/monkeep-app-04-insights-2026-11-25.webp",
  "projects/monkeep-app-06-simulator-2026-11-25.webp",
  "projects/monkeep-header-2026-11-25.webp",
  "projects/monkeep-landing-desktop-2026-11-25.webp",
]);

export function isPreSizedAsset(src: string): boolean {
  if (!src.startsWith(`${ASSET_BASE_URL}/`)) return false;
  return preSizedAssetKeys.has(src.slice(ASSET_BASE_URL.length + 1));
}
