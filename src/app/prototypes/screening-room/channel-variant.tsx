"use client";

import { useState } from "react";
import { screeningTitles } from "./content";

const channelLabels = ["ST", "BCS", "BB", "TO"];

/** Broadcast-guide direction where each favorite occupies a title channel. */
export default function ChannelVariant() {
  const [activeChannel, setActiveChannel] = useState(0);
  const activeTitle = screeningTitles[activeChannel];

  return (
    <section className="py-10 sm:py-16">
      <div className="mb-5 flex items-center justify-between gap-4 text-[10px] font-medium tracking-[0.18em] uppercase sm:text-xs">
        <span className="text-secondary">dey vision / on air</span>
        <span className="text-white/40">four channels / zero spoilers</span>
      </div>

      <div className="overflow-hidden border border-white/20">
        <div
          className="relative min-h-[30rem] overflow-hidden border-b border-white/20 px-4 py-6 sm:min-h-[36rem] sm:px-8 sm:py-8"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent 0 7px, rgba(255,255,255,0.028) 7px 8px)",
          }}
        >
          <div className="relative z-10 flex items-start justify-between gap-6">
            <div>
              <p className="font-display text-2xl font-medium sm:text-3xl">
                CH–{String(activeChannel + 1).padStart(2, "0")}
              </p>
              <p className="mt-1 text-[10px] tracking-[0.2em] text-white/40 uppercase sm:text-xs">
                {activeTitle.status}
              </p>
            </div>
            <div className="text-right text-[10px] tracking-[0.18em] text-white/45 uppercase sm:text-xs">
              <p>signal / clean</p>
              <p>format / {activeTitle.kind}</p>
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center px-4">
            <span className="font-display text-secondary absolute text-[clamp(18rem,51vw,44rem)] leading-none font-semibold tracking-[-0.08em] opacity-15">
              {channelLabels[activeChannel]}
            </span>
            <h1 className="font-display relative z-10 max-w-5xl text-center text-[clamp(4rem,11vw,10rem)] leading-[0.76] font-semibold tracking-[-0.055em] uppercase drop-shadow-[0_4px_20px_rgba(5,5,5,0.8)]">
              {activeTitle.title}
            </h1>
          </div>

          <p className="absolute right-4 bottom-5 left-4 z-10 text-center text-[10px] tracking-[0.2em] text-white/45 uppercase sm:right-8 sm:left-8 sm:text-xs">
            screening room transmission / selected by shreyan
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4">
          {screeningTitles.map((item, index) => {
            const isActive = activeChannel === index;

            return (
              <button
                key={item.title}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveChannel(index)}
                className={`group/channel min-h-28 border-white/20 p-4 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white max-md:odd:border-r max-md:nth-[-n+2]:border-b md:border-r md:last:border-r-0 ${
                  isActive ? "bg-secondary text-black" : "bg-background"
                }`}
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="text-[10px] tracking-[0.18em] uppercase sm:text-xs">
                    CH–{String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden
                    className={`inline-block size-2 rounded-full transition-colors duration-150 motion-reduce:transition-none ${
                      isActive
                        ? "bg-black"
                        : "group-hover/channel:bg-secondary bg-white/20"
                    }`}
                  />
                </span>
                <span className="font-display mt-6 block text-xl leading-none font-semibold sm:text-2xl">
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
