"use client";

import { useState } from "react";
import { screeningTitles } from "./content";

/** Dense editorial ledger with a selected-title reading pane. */
export default function IndexVariant() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedTitle = screeningTitles[selectedIndex];

  return (
    <section className="py-10 sm:py-16">
      <div className="flex items-end justify-between gap-6 border-b border-white/20 pb-5">
        <div>
          <p className="text-secondary text-xs font-medium tracking-[0.2em] uppercase">
            viewing ledger
          </p>
          <h1 className="font-display text-5xl leading-none font-semibold tracking-[-0.04em] sm:text-7xl">
            screening index<span className="text-secondary">.</span>
          </h1>
        </div>
        <p className="hidden max-w-40 text-right text-xs leading-relaxed text-white/45 uppercase sm:block">
          one current obsession / three forever favorites
        </p>
      </div>

      <div className="grid min-h-[34rem] border-b border-white/20 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="border-white/20 lg:border-r">
          {screeningTitles.map((item, index) => {
            const isSelected = index === selectedIndex;

            return (
              <button
                key={item.title}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedIndex(index)}
                className="group/index flex min-h-28 w-full items-center gap-4 border-b border-white/15 px-1 text-left last:border-b-0 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white sm:px-4"
              >
                <span
                  className={`font-display w-10 text-2xl font-medium tabular-nums transition-colors duration-150 motion-reduce:transition-none ${
                    isSelected
                      ? "text-secondary"
                      : "text-white/30 group-hover/index:text-white/65"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={`font-display block text-2xl leading-none font-semibold transition-colors duration-150 motion-reduce:transition-none sm:text-3xl ${
                      isSelected ? "text-white" : "text-white/65"
                    }`}
                  >
                    {item.title}
                  </span>
                  <span className="mt-2 flex gap-4 text-[10px] tracking-[0.16em] text-white/35 uppercase sm:text-xs">
                    <span>{item.kind}</span>
                    <span>{item.status}</span>
                  </span>
                </span>
                <span
                  aria-hidden
                  className={`font-display text-2xl transition-[color,transform] duration-150 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none ${
                    isSelected
                      ? "text-secondary translate-x-0"
                      : "-translate-x-2 text-transparent group-hover/index:translate-x-0 group-hover/index:text-white/50 motion-reduce:translate-x-0"
                  }`}
                >
                  ↗
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative flex min-h-[26rem] flex-col justify-between overflow-hidden px-1 py-8 sm:px-8 lg:min-h-0">
          <span className="font-display pointer-events-none absolute -right-2 -bottom-[0.2em] text-[clamp(15rem,36vw,31rem)] leading-none font-semibold text-white/[0.035] tabular-nums">
            {selectedIndex + 1}
          </span>

          <div className="relative flex items-center justify-between text-[10px] tracking-[0.18em] text-white/40 uppercase sm:text-xs">
            <span>selected title</span>
            <span>{String(selectedIndex + 1).padStart(3, "0")} / 004</span>
          </div>

          <div className="relative max-w-xl py-14">
            <p className="text-secondary mb-5 text-xs font-medium tracking-[0.18em] uppercase">
              {selectedTitle.status}
            </p>
            <h2 className="font-display text-[clamp(4rem,9vw,8.5rem)] leading-[0.76] font-semibold tracking-[-0.055em] text-balance uppercase">
              {selectedTitle.title}
            </h2>
          </div>

          <p className="relative text-xs tracking-[0.16em] text-white/40 uppercase">
            personal screening archive / films + series
          </p>
        </div>
      </div>
    </section>
  );
}
