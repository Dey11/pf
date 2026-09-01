"use client";

import { useState } from "react";
import { screeningTitles } from "../content";
import PosterArt from "./poster-art";

/** Equal-weight poster gallery with a restrained selected-title footer. */
export default function GalleryVariant() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedTitle = screeningTitles[selectedIndex];

  return (
    <section className="py-10 sm:py-16">
      <div className="flex items-end justify-between gap-6 pb-8 sm:pb-12">
        <div>
          <p className="font-display text-sm text-white/40">
            (100) / watchlist
          </p>
          <h1 className="font-display mt-2 text-5xl leading-none font-semibold tracking-[-0.045em] sm:text-7xl">
            screening room<span className="text-secondary">.</span>
          </h1>
        </div>
        <p className="hidden max-w-52 text-right text-xs leading-relaxed text-white/40 sm:block">
          A small edit of what I am watching and what stayed with me.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-4">
        {screeningTitles.map((item, index) => {
          const isSelected = selectedIndex === index;

          return (
            <button
              key={item.title}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setSelectedIndex(index)}
              className="group/poster min-w-0 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <span className="block aspect-[2/3] overflow-hidden bg-white/[0.03] outline -outline-offset-1 outline-white/10">
                <span className="block size-full transition-transform duration-200 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover/poster:scale-[1.015] motion-reduce:transform-none motion-reduce:transition-none">
                  <PosterArt title={item.title} className="size-full" />
                </span>
              </span>

              <span className="mt-3 flex items-start justify-between gap-3">
                <span className="min-w-0">
                  <span className="font-display block truncate text-lg leading-none font-semibold sm:text-xl">
                    {item.title}
                  </span>
                  <span className="mt-1.5 block text-[9px] tracking-[0.16em] text-white/35 uppercase sm:text-[10px]">
                    {item.kind} / {item.status}
                  </span>
                </span>
                <span
                  aria-hidden
                  className={`mt-1 h-px w-5 shrink-0 transition-colors duration-150 motion-reduce:transition-none ${
                    isSelected
                      ? "bg-secondary"
                      : "bg-white/20 group-hover/poster:bg-white/55"
                  }`}
                />
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-10 flex items-baseline justify-between gap-5 border-t border-white/15 pt-4 text-xs sm:mt-14">
        <span className="text-white/40">selected / {selectedTitle.status}</span>
        <span className="font-display text-xl font-semibold sm:text-2xl">
          {selectedTitle.title}
        </span>
      </div>
    </section>
  );
}
