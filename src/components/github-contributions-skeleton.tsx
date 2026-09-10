/** Calendar-shaped placeholder shared by module loading and data fetching. */
export default function GithubContributionsSkeleton({
  hidden = false,
}: {
  hidden?: boolean;
}) {
  return (
    <div role="status" aria-hidden={hidden} className="min-h-[150px] w-full">
      <span className="sr-only">Loading GitHub contributions</span>

      <div
        aria-hidden="true"
        className="github-contributions-skeleton-grid relative aspect-[844/129] w-full overflow-hidden rounded-sm"
      >
        <div className="github-contributions-skeleton-shimmer absolute inset-y-0 left-0 w-1/3" />
      </div>

      <div
        aria-hidden="true"
        className="mt-4 h-3 w-48 rounded-full bg-white/8"
      />
    </div>
  );
}
