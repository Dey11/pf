"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import ProjectPopup, { type ProjectBox } from "./project-popup";

const placeholderDescription =
  "a short description of this project goes here — what it does, the problem it solves, and the stack it's built on. click the input below to ask the assistant anything about it.";

// each inner array is one masonry column (top -> bottom). `weight` is the box's
// `flexGrow` share of the column height (every column sums to 50 so the three
// columns always end at the same line); `color` fills the preview area.
const bentoColumns: { weight: number; box: ProjectBox }[][] = [
  [
    { weight: 12, box: makeBox("p01", "bg-neutral-200", ["/projects/pdx.png", "/projects/dashboard.png"]) },
    { weight: 10, box: makeBox("p02", "bg-rose-200", ["/projects/ballarat.png", "/projects/realestate.png"]) },
    { weight: 8, box: makeBox("p03", "bg-sky-200", ["/projects/clarityhub.png", "/projects/aichat.png"]) },
    { weight: 20, box: makeBox("p04", "bg-amber-200", ["/projects/venturassist.png", "/projects/dashboard.png"]) },
  ],
  [
    { weight: 6, box: makeBox("p05", "bg-emerald-200", ["/projects/doublesalesai.png", "/projects/realestate.png"]) },
    { weight: 12, box: makeBox("p06", "bg-violet-200", ["/projects/vidbox.png", "/projects/aichat.png"]) },
    { weight: 12, box: makeBox("p07", "bg-orange-200", ["/projects/drites.png", "/projects/dashboard.png"]) },
    { weight: 7, box: makeBox("p08", "bg-teal-200", ["/projects/pdx.png", "/projects/clarityhub.png"]) },
    { weight: 13, box: makeBox("p09", "bg-pink-200", ["/projects/ballarat.png", "/projects/venturassist.png"]) },
  ],
  [
    { weight: 12, box: makeBox("p10", "bg-indigo-200", ["/projects/aichat.png", "/projects/dashboard.png"]) },
    { weight: 12, box: makeBox("p11", "bg-lime-200", ["/projects/realestate.png", "/projects/drites.png"]) },
    { weight: 9, box: makeBox("p12", "bg-cyan-200", ["/projects/clarityhub.png", "/projects/pdx.png"]) },
    { weight: 12, box: makeBox("p13", "bg-fuchsia-200", ["/projects/vidbox.png", "/projects/doublesalesai.png"]) },
    { weight: 5, box: makeBox("p14", "bg-stone-200", ["/projects/venturassist.png", "/projects/ballarat.png"]) },
  ],
];

function makeBox(
  id: string,
  color: string,
  images: [string, string],
): ProjectBox {
  return {
    id,
    color,
    name: "project name",
    description: placeholderDescription,
    url: "https://example.com",
    tags: ["nextjs", "typescript"],
    images,
  };
}

export default function BentoSection() {
  const [selected, setSelected] = useState<ProjectBox | null>(null);

  return (
    <section className="pb-20 text-start">
      <p className="pb-2 text-end text-sm md:text-base">(100)</p>

      <h1 className="text-end text-2xl font-semibold md:text-3xl lg:text-4xl">
        projects<span className="text-secondary">.</span>
      </h1>

      <div className="flex h-[680px] gap-3 pt-10 sm:h-[920px] sm:gap-4 lg:h-[1200px]">
        {bentoColumns.map((column, columnIndex) => (
          <div key={columnIndex} className="flex h-full flex-1 flex-col gap-3 sm:gap-4">
            {column.map(({ weight, box }) => (
              <motion.div
                key={box.id}
                layoutId={`box-${box.id}`}
                onClick={() => setSelected(box)}
                style={{ flexGrow: weight, flexBasis: 0 }}
                className="flex min-h-0 w-full cursor-pointer flex-col rounded-xl border border-white/15 bg-white/[0.02] p-1 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_6px_16px_-4px_rgba(0,0,0,0.7)] transition-transform hover:-translate-y-0.5 sm:rounded-2xl sm:p-1.5"
              >
                {/* screenshot goes here */}
                <div
                  className={`${box.color} min-h-0 flex-1 rounded-lg sm:rounded-xl`}
                />

                <div className="shrink-0 px-1.5 pt-2 pb-1 sm:px-2 sm:pt-3 sm:pb-1.5">
                  <p className="truncate text-sm font-medium text-white/90 sm:text-base">
                    {box.name}
                  </p>
                  <p className="truncate text-xs text-white/45 sm:text-sm">
                    {box.url}
                  </p>
                </div>
              </motion.div>
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
