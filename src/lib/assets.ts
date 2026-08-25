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
