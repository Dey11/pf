"use client";

import { AnimatePresence } from "motion/react";
import { useState } from "react";
import ProjectPopup, { type ProjectBox } from "./project-popup";

const placeholderDescription =
  "A short description of this project goes here — what it does and the problem it solves.";

// markdown — h1/h2/lists/links all render in the Details tab
const placeholderContent = `## Overview

This is **markdown** content. Write headings, lists, \`code\`, and [links](https://example.com) — it all renders.

## What I Did

- Built the full application end-to-end, frontend to backend
- Implemented authentication, payments, and a custom dashboard
- Shipped and deployed with logging and monitoring in place

## Notes

Add any extra detail here — challenges, learnings, architecture decisions.`;

// each inner array is one masonry column (top -> bottom). `weight` is the box's
// `flexGrow` share of the column height (every column sums to 50 so the three
// columns always end at the same line); `color` fills the preview area.
const bentoColumns: { weight: number; box: ProjectBox }[][] = [
  [
    {
      weight: 12,
      box: makeBox("p01", "bg-neutral-200", [
        "/projects/pdx.png",
        "/projects/dashboard.png",
      ]),
    },
    {
      weight: 10,
      box: makeBox("p02", "bg-rose-200", [
        "/projects/ballarat.png",
        "/projects/realestate.png",
      ]),
    },
    {
      weight: 8,
      box: makeBox("p03", "bg-sky-200", [
        "/projects/clarityhub.png",
        "/projects/aichat.png",
      ]),
    },
    {
      weight: 20,
      box: makeBox("p04", "bg-amber-200", [
        "/projects/venturassist.png",
        "/projects/dashboard.png",
      ]),
    },
  ],
  [
    {
      weight: 6,
      box: makeBox("p05", "bg-emerald-200", [
        "/projects/doublesalesai.png",
        "/projects/realestate.png",
      ]),
    },
    {
      weight: 12,
      box: makeBox("p06", "bg-violet-200", [
        "/projects/vidbox.png",
        "/projects/aichat.png",
      ]),
    },
    {
      weight: 12,
      box: makeBox("p07", "bg-orange-200", [
        "/projects/drites.png",
        "/projects/dashboard.png",
      ]),
    },
    {
      weight: 7,
      box: makeBox("p08", "bg-teal-200", [
        "/projects/pdx.png",
        "/projects/clarityhub.png",
      ]),
    },
    {
      weight: 13,
      box: makeBox("p09", "bg-pink-200", [
        "/projects/ballarat.png",
        "/projects/venturassist.png",
      ]),
    },
  ],
  [
    {
      weight: 12,
      box: makeBox("p10", "bg-indigo-200", [
        "/projects/aichat.png",
        "/projects/dashboard.png",
      ]),
    },
    {
      weight: 12,
      box: makeBox("p11", "bg-lime-200", [
        "/projects/realestate.png",
        "/projects/drites.png",
      ]),
    },
    {
      weight: 9,
      box: makeBox("p12", "bg-cyan-200", [
        "/projects/clarityhub.png",
        "/projects/pdx.png",
      ]),
    },
    {
      weight: 12,
      box: makeBox("p13", "bg-fuchsia-200", [
        "/projects/vidbox.png",
        "/projects/doublesalesai.png",
      ]),
    },
    {
      weight: 5,
      box: makeBox("p14", "bg-stone-200", [
        "/projects/venturassist.png",
        "/projects/ballarat.png",
      ]),
    },
  ],
];

function makeBox(id: string, color: string, images: string[]): ProjectBox {
  return {
    id,
    color,
    name: "Project Name",
    tagline: "A one-line description of what this project does",
    description: placeholderDescription,
    content: placeholderContent,
    url: "https://example.com",
    github: "https://github.com/dey11",
    tags: ["nextjs", "typescript", "postgresql"],
    type: "Freelance",
    status: "Live",
    duration: "~3 weeks",
    year: "2025",
    images,
  };
}

export default function BentoSection() {
  const [selected, setSelected] = useState<ProjectBox | null>(null);

  return (
    <section className="pb-40 text-start">
      <p className="font-display pb-2 text-end text-lg md:text-xl">(011)</p>

      <h1 className="text-end text-3xl font-semibold sm:text-4xl md:text-5xl lg:text-6xl">
        projects<span className="text-secondary">.</span>
      </h1>

      <div className="flex h-[680px] gap-3 pt-10 sm:h-[920px] sm:gap-4 lg:h-[1200px]">
        {bentoColumns.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className="flex h-full flex-1 flex-col gap-3 sm:gap-4"
          >
            {column.map(({ weight, box }) => (
              <div
                key={box.id}
                onClick={() => setSelected(box)}
                style={{ flexGrow: weight, flexBasis: 0 }}
                className={`group relative min-h-0 w-full cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl ${box.color}`}
              >
                {/* later: <img> of the project fills the block here */}

                {/* project name drops in from the top-right with an elastic
                    overshoot on hover */}
                <p className="pointer-events-none absolute top-0 right-3 max-w-[90%] -translate-y-full truncate text-right text-[32px] leading-none font-bold text-black transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-y-2">
                  {box.name}
                </p>
              </div>
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
