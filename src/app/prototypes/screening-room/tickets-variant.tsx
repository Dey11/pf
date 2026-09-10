"use client";

import { useState } from "react";
import { screeningTitles } from "./content";

const ticketRotations = [
  "-rotate-[1.5deg]",
  "rotate-[0.8deg]",
  "-rotate-[0.5deg]",
  "rotate-[1.2deg]",
];

/** Tactile ticket-stack direction with a focused title marquee. */
export default function TicketsVariant() {
  const [selectedTicket, setSelectedTicket] = useState(0);
  const selectedTitle = screeningTitles[selectedTicket];

  return (
    <section className="py-10 sm:py-16">
      <div className="mb-9 flex items-end justify-between gap-5 border-b border-white/20 pb-5">
        <div>
          <p className="font-display text-lg text-white/45">admit one / 004</p>
          <h1 className="font-display text-5xl leading-none font-semibold tracking-[-0.04em] sm:text-7xl">
            ticket archive<span className="text-secondary">.</span>
          </h1>
        </div>
        <p className="hidden text-right text-[10px] tracking-[0.18em] text-white/40 uppercase sm:block sm:text-xs">
          currently screening
          <br />+ forever favorites
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative isolate min-h-[30rem] py-6">
          <div className="absolute top-1/2 left-0 -z-10 h-px w-full -translate-y-1/2 bg-white/15" />
          <div className="grid gap-3">
            {screeningTitles.map((item, index) => {
              const isSelected = selectedTicket === index;

              return (
                <button
                  key={item.title}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedTicket(index)}
                  className="group/ticket w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <span
                    className={`grid min-h-24 grid-cols-[1fr_5.5rem] overflow-hidden border transition-transform duration-200 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transform-none motion-reduce:transition-none sm:grid-cols-[1fr_7rem] ${ticketRotations[index]} ${
                      isSelected
                        ? "border-secondary bg-secondary text-black"
                        : "bg-background border-white/30 group-hover/ticket:-translate-y-0.5 group-hover/ticket:border-white/60"
                    }`}
                    style={{
                      clipPath:
                        "polygon(0 0, 100% 0, 100% 38%, 97% 50%, 100% 62%, 100% 100%, 0 100%, 0 62%, 3% 50%, 0 38%)",
                    }}
                  >
                    <span className="flex flex-col justify-between px-5 py-4">
                      <span className="text-[10px] tracking-[0.18em] uppercase sm:text-xs">
                        {item.status}
                      </span>
                      <span className="font-display text-2xl leading-none font-semibold sm:text-3xl">
                        {item.title}
                      </span>
                    </span>
                    <span
                      className={`flex flex-col items-center justify-between border-l border-dashed px-2 py-4 ${
                        isSelected ? "border-black/40" : "border-white/25"
                      }`}
                    >
                      <span className="text-[9px] tracking-[0.12em] uppercase sm:text-[10px]">
                        {item.kind}
                      </span>
                      <span className="font-display text-3xl leading-none font-semibold tabular-nums sm:text-4xl">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative min-h-[30rem] overflow-hidden border-y border-white/20 py-8 lg:border-y-0 lg:border-l lg:py-10 lg:pl-10">
          <div className="flex items-center justify-between gap-5 text-[10px] tracking-[0.18em] uppercase sm:text-xs">
            <span className="text-secondary">house selection</span>
            <span className="text-white/40">
              stub {String(selectedTicket + 1).padStart(2, "0")}
            </span>
          </div>

          <div className="flex min-h-[23rem] flex-col justify-center py-12">
            <p className="font-display text-[clamp(1.5rem,3vw,2.5rem)] text-white/35">
              presents
            </p>
            <h2 className="font-display text-[clamp(4.5rem,10vw,9rem)] leading-[0.75] font-semibold tracking-[-0.06em] text-balance uppercase">
              {selectedTitle.title}
            </h2>
          </div>

          <div className="grid grid-cols-2 border-t border-white/15 pt-4 text-[10px] tracking-[0.16em] uppercase sm:text-xs">
            <div>
              <p className="text-white/35">format</p>
              <p className="mt-2">{selectedTitle.kind}</p>
            </div>
            <div>
              <p className="text-white/35">shelf</p>
              <p className="mt-2">{selectedTitle.status}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
