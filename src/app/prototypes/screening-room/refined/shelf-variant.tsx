"use client";

import { useState } from "react";
import { screeningTitles } from "../content";
import PosterArt from "./poster-art";

/** Overlapping poster archive with a single quiet lift on hover. */
export default function ShelfVariant() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedTitle = screeningTitles[selectedIndex];

  return (
    <section className="py-10 sm:py-16">
      <div className="flex items-end justify-between gap-5">
        <h1 className="font-display text-5xl leading-none font-semibold tracking-[-0.045em] sm:text-7xl">
          the watch shelf<span className="text-secondary">.</span>
        </h1>
        <p className="hidden text-right text-[10px] tracking-[0.17em] text-white/35 uppercase sm:block sm:text-xs">
          current + permanent
          <br />
          four titles only
        </p>
      </div>

      <div className="relative mt-10 border-y border-white/15 py-10 sm:mt-14 sm:py-14">
        <div className="pointer-events-none absolute top-1/2 left-0 h-px w-full bg-white/10" />
        <div className="flex touch-pan-x snap-x [scrollbar-width:none] items-center overflow-x-auto px-[12vw] py-2 sm:justify-center sm:overflow-visible sm:px-12 [&::-webkit-scrollbar]:hidden">
          {screeningTitles.map((item, index) => {
            const isSelected = selectedIndex === index;

            return (
              <button
                key={item.title}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedIndex(index)}
                className="group/shelf relative -ml-[9vw] w-[42vw] shrink-0 snap-center text-left first:ml-0 focus-visible:z-30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:-ml-[2%] sm:w-[25%]"
                style={{
                  zIndex: isSelected ? 20 : screeningTitles.length - index,
                }}
              >
                <span
                  className={`bg-background relative block aspect-[2/3] overflow-hidden outline -outline-offset-1 outline-white/10 transition-transform duration-200 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover/shelf:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none ${
                    isSelected ? "-translate-y-1" : ""
                  }`}
                >
                  <PosterArt title={item.title} className="size-full" />
                </span>
                <span
                  aria-hidden
                  className={`mx-auto mt-3 block h-px transition-colors duration-150 motion-reduce:transition-none ${
                    isSelected ? "bg-secondary w-full" : "w-5 bg-white/20"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 pt-8 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <p className="text-[10px] tracking-[0.18em] text-white/35 uppercase sm:text-xs">
            selected / {selectedTitle.kind} / {selectedTitle.status}
          </p>
          <h2 className="font-display mt-2 text-[clamp(3.8rem,9vw,8rem)] leading-[0.78] font-semibold tracking-[-0.055em] text-balance uppercase">
            {selectedTitle.title}
          </h2>
        </div>
        <p className="font-display text-right text-2xl text-white/35 tabular-nums sm:text-4xl">
          {String(selectedIndex + 1).padStart(2, "0")} / 04
        </p>
      </div>
    </section>
  );
}
