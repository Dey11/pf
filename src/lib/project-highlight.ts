import { projectBoxesByInventoryId, projectSlug } from "./project-boxes";

// shared plumbing for the "click a hero box -> scroll to + highlight its project"
// interaction, and the matching shareable deep links (e.g. /#downthecove-project).

export const PROJECT_EVENT = "project-highlight";
const HASH_SUFFIX = "-project";

// every linkable project slug, so we ignore unknown / stale hashes
export const projectSlugs = new Set(
  Object.values(projectBoxesByInventoryId).map(projectSlug),
);

export function hashForSlug(slug: string) {
  return `${slug}${HASH_SUFFIX}`;
}

// "#downthecove-project" -> "downthecove" (only if it's a known project)
export function slugFromHash(hash: string): string | null {
  const raw = hash.replace(/^#/, "");
  if (!raw.endsWith(HASH_SUFFIX)) return null;
  const slug = raw.slice(0, -HASH_SUFFIX.length);
  return projectSlugs.has(slug) ? slug : null;
}

// update the url (shareable) and tell the bento section to scroll + highlight
export function highlightProject(slug: string) {
  if (typeof window === "undefined") return;
  history.replaceState(null, "", `#${hashForSlug(slug)}`);
  window.dispatchEvent(new CustomEvent(PROJECT_EVENT, { detail: { slug } }));
}

// clear the highlight and strip the hash from the url
export function clearProjectHighlight() {
  if (typeof window === "undefined") return;
  history.replaceState(null, "", window.location.pathname + window.location.search);
  window.dispatchEvent(new CustomEvent(PROJECT_EVENT, { detail: { slug: null } }));
}
