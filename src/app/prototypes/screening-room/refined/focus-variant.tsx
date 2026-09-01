"use client";

import { useState } from "react";
import { screeningTitles } from "../content";
import PosterArt from "./poster-art";

/** One dominant poster paired with a slim, low-noise title index. */
export default function FocusVariant() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedTitle = screeningTitles[selectedIndex];

  return (
    <section className="py-10 sm:py-16">
      <div className="mb-8 flex items-center justify-between border-b border-white/15 pb-4 text-[10px] tracking-[0.18em] uppercase sm:text-xs">
        <span>screening room / selected viewing</span>
        <span className="text-white/35">
          {String(selectedIndex + 1).padStart(2, "0")} / 04
        </span>
      </div>

      <div className="grid min-h-[38rem] border-b border-white/15 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="flex items-center justify-center border-white/15 bg-white/[0.018] px-4 py-8 lg:border-r lg:px-10">
          <div className="aspect-[2/3] w-[min(72vw,22rem)] overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.1)]">
            <PosterArt title={selectedTitle.title} className="size-full" />
          </div>
        </div>

        <div className="flex flex-col justify-between py-8 lg:py-10 lg:pl-10">
          <div>
            <p className="text-secondary text-[10px] tracking-[0.18em] uppercase sm:text-xs">
              {selectedTitle.status}
            </p>
            <h1 className="font-display mt-5 max-w-2xl text-[clamp(4rem,8vw,8rem)] leading-[0.75] font-semibold tracking-[-0.06em] text-balance uppercase">
              {selectedTitle.title}
            </h1>
          </div>

          <div className="mt-12 border-t border-white/15">
            {screeningTitles.map((item, index) => {
              const isSelected = selectedIndex === index;

              return (
                <button
                  key={item.title}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedIndex(index)}
                  className="group/focus flex min-h-16 w-full items-center gap-4 border-b border-white/10 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
                >
                  <span className="aspect-[2/3] h-10 shrink-0 overflow-hidden bg-white/[0.04] outline -outline-offset-1 outline-white/10">
                    <span className="block size-full transition-transform duration-150 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover/focus:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none">
                      <PosterArt title={item.title} className="size-full" />
                    </span>
                  </span>
                  <span
                    className={`font-display min-w-0 flex-1 truncate text-xl font-semibold transition-colors duration-150 motion-reduce:transition-none ${
                      isSelected
                        ? "text-white"
                        : "text-white/45 group-hover/focus:text-white/80"
                    }`}
                  >
                    {item.title}
                  </span>
                  <span
                    className={`text-[10px] tracking-[0.14em] uppercase ${
                      isSelected ? "text-secondary" : "text-white/25"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
