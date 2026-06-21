"use client";

import { AnimatePresence } from "motion/react";
import { useState } from "react";
import ProjectPopup from "./project-popup";
import {
  prioritizedProjectColumns,
  projectBoxesByInventoryId,
  type ProjectBox,
} from "@/lib/project-boxes";

type Slot = { weight: number; projectId: number };

// mobile shows 2 columns and only the projects that have an image. distribute
// those projects across two columns, greedily balancing total weight so the
// two columns end up with roughly equal combined height.
const mobileColumns: Slot[][] = (() => {
  const withImages = prioritizedProjectColumns.flat().filter(({ projectId }) => {
    const box = projectBoxesByInventoryId[projectId];
    return Boolean(box.thumbnail ?? box.images[0]);
  });

  const cols: Slot[][] = [[], []];
  const totals = [0, 0];
  for (const slot of withImages) {
    const target = totals[0] <= totals[1] ? 0 : 1;
    cols[target].push(slot);
    totals[target] += slot.weight;
  }
  return cols;
})();

function BentoCard({
  box,
  weight,
  onSelect,
}: {
  box: ProjectBox;
  weight: number;
  onSelect: (box: ProjectBox) => void;
}) {
  const thumbnail = box.thumbnail ?? box.images[0];

  return (
    <button
      type="button"
      onClick={() => onSelect(box)}
      style={{ flexGrow: weight, flexBasis: 0 }}
      aria-label={`Open ${box.name} project details`}
      className={`group relative min-h-0 w-full cursor-pointer overflow-hidden rounded-xl text-left sm:rounded-2xl ${box.color}`}
    >
      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.38),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.22),transparent_46%)] opacity-80" />

      {thumbnail ? (
        /* peeking thumbnail — ~3/6 visible by default, rising to ~5/6 on hover
           with an elastic overshoot. clipped by the card's overflow-hidden. */
        <span
          aria-hidden
          style={{
            backgroundImage: `url(${thumbnail})`,
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
          className="pointer-events-none absolute inset-x-2 bottom-0 h-[80%] translate-y-[50%] rounded-t-lg border border-black/10 shadow-[0_-10px_30px_rgba(0,0,0,0.28)] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-y-[17%] sm:inset-x-3 sm:rounded-t-xl"
        />
      ) : (
        <span className="pointer-events-none absolute right-3 bottom-3 left-3 line-clamp-3 text-xs leading-snug text-black/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:text-sm">
          {box.tagline}
        </span>
      )}

      <span className="font-display pointer-events-none absolute top-0 right-3 z-10 max-w-[90%] -translate-y-full truncate text-right text-[32px] leading-none font-semibold text-black lowercase transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-y-2">
        {box.name}
      </span>
    </button>
  );
}

export default function BentoSection() {
  const [selected, setSelected] = useState<ProjectBox | null>(null);

  return (
    <section className="pb-40 text-start">
      <p className="font-display pb-2 text-end text-lg md:text-xl">(011)</p>

      <h1 className="text-end text-3xl font-semibold sm:text-4xl md:text-5xl lg:text-6xl">
        projects<span className="text-secondary">.</span>
      </h1>

      {/* mobile / tablet — 2 columns, image projects only */}
      <div className="flex h-[760px] gap-3 pt-10 sm:h-[1000px] sm:gap-4 lg:hidden">
        {mobileColumns.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className="flex h-full flex-1 flex-col gap-3 sm:gap-4"
          >
            {column.map(({ weight, projectId }) => (
              <BentoCard
                key={projectId}
                box={projectBoxesByInventoryId[projectId]}
                weight={weight}
                onSelect={setSelected}
              />
            ))}
          </div>
        ))}
      </div>

      {/* desktop — 3 columns, all projects */}
      <div className="hidden h-[1200px] gap-4 pt-10 lg:flex">
        {prioritizedProjectColumns.map((column, columnIndex) => (
          <div key={columnIndex} className="flex h-full flex-1 flex-col gap-4">
            {column.map(({ weight, projectId }) => (
              <BentoCard
                key={projectId}
                box={projectBoxesByInventoryId[projectId]}
                weight={weight}
                onSelect={setSelected}
              />
            ))}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectPopup box={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
