// each inner array is one masonry column (top -> bottom). `weight` is the
// box's `flexGrow` share of the column height (every column sums to 50 so the
// three columns always end at the same line); `color` fills the preview area.
const bentoColumns = [
  [
    { weight: 12, color: "bg-neutral-200" },
    { weight: 10, color: "bg-rose-200" },
    { weight: 8, color: "bg-sky-200" },
    { weight: 20, color: "bg-amber-200" },
  ],
  [
    { weight: 6, color: "bg-emerald-200" },
    { weight: 12, color: "bg-violet-200" },
    { weight: 12, color: "bg-orange-200" },
    { weight: 7, color: "bg-teal-200" },
    { weight: 13, color: "bg-pink-200" },
  ],
  [
    { weight: 12, color: "bg-indigo-200" },
    { weight: 12, color: "bg-lime-200" },
    { weight: 9, color: "bg-cyan-200" },
    { weight: 12, color: "bg-fuchsia-200" },
    { weight: 5, color: "bg-stone-200" },
  ],
];

export default function BentoSection() {
  return (
    <section className="pb-20 text-start">
      <p className="pb-2 text-sm md:text-base">(100)</p>

      <h1 className="text-2xl font-semibold md:text-3xl lg:text-4xl">
        projects<span className="text-secondary">.</span>
      </h1>

      <div className="flex h-[680px] gap-3 pt-10 sm:h-[920px] sm:gap-4 lg:h-[1200px]">
        {bentoColumns.map((column, columnIndex) => (
          <div key={columnIndex} className="flex h-full flex-1 flex-col gap-3 sm:gap-4">
            {column.map((box, boxIndex) => (
              <div
                key={boxIndex}
                style={{ flexGrow: box.weight, flexBasis: 0 }}
                className="flex min-h-0 w-full flex-col rounded-xl border border-white/15 bg-white/[0.02] p-1 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_6px_16px_-4px_rgba(0,0,0,0.7)] sm:rounded-2xl sm:p-1.5"
              >
                {/* screenshot goes here */}
                <div
                  className={`${box.color} min-h-0 flex-1 rounded-lg border border-white/[0.06] sm:rounded-xl`}
                />

                <div className="shrink-0 px-1.5 pt-2 pb-1 sm:px-2 sm:pt-3 sm:pb-1.5">
                  <p className="truncate text-sm font-medium text-white/90 sm:text-base">
                    project name
                  </p>
                  <p className="truncate text-xs text-white/45 sm:text-sm">
                    https://example.com
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
