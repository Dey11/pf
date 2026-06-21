"use client";

import { heroItems, locationUrl } from "@/lib/constants";
import { highlightProject } from "@/lib/project-highlight";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Signature from "./signature";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

// how far IST (UTC+5:30) is from the visitor's own timezone, phrased from
// their perspective — e.g. "4h 30m ahead of you".
function istOffsetLabel() {
  const visitorOffset = -new Date().getTimezoneOffset(); // visitor's UTC offset, in minutes
  const diff = 330 - visitorOffset; // IST (+330) minus the visitor
  if (diff === 0) return "same time as you";

  const abs = Math.abs(diff);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  const parts = [];
  if (h) parts.push(`${h}h`);
  if (m) parts.push(`${m}m`);
  return `${parts.join(" ")} ${diff > 0 ? "ahead of" : "behind"} you`;
}

// live IST clock + visitor offset — computed on the client only (gated by
// `mounted`) so the server/client markup matches and there's no hydration
// mismatch.
function useIstTime() {
  const [time, setTime] = useState<string | null>(null);
  const [offset, setOffset] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date());

    const frame = requestAnimationFrame(() => {
      setTime(format());
      setOffset(istOffsetLabel());
    });
    const id = setInterval(() => setTime(format()), 1000);
    return () => {
      cancelAnimationFrame(frame);
      clearInterval(id);
    };
  }, []);

  return { time, offset };
}

// fixed-width, per-digit clock. every digit lives in a `w-[1ch]` tabular slot
// so changing numbers never shift the layout. before the real time loads it
// renders a static 00:00:00; once loaded each tick rolls only the digits that
// actually changed (no entrance animation).
function IstClock({ time }: { time: string | null }) {
  const chars = (time ?? "00:00:00").split("");

  return (
    <span className="inline-flex tabular-nums">
      {chars.map((c, i) =>
        c === ":" ? (
          <span key={`colon-${i}`} className="px-px text-white/70">
            :
          </span>
        ) : (
          <span
            key={`slot-${i}`}
            className="relative inline-block w-[1ch] text-center"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={c}
                initial={{ y: "-45%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "45%", opacity: 0 }}
                transition={{ duration: 0.25, delay: i * 0.02 }}
                className="inline-block"
              >
                {c}
              </motion.span>
            </AnimatePresence>
          </span>
        ),
      )}
    </span>
  );
}

// below lg the boxes scale with the viewport (svh); from laptop up the width is
// fixed (370px) so we freeze the height too — keeps the framing constant. the
// row renders reversed, so index 0 is the tallest box on the right.
const heroHeights = [
  "h-[60svh] lg:h-[580px]",
  "h-[50svh] lg:h-[495px]",
  "h-[40svh] lg:h-[410px]",
];

// each box paints its own third of one shared wave background. all three boxes
// are equal width at lg, so `background-size: 300% auto` makes the image span
// the whole row and these positions slice it into seamless, gap-aware thirds
// (right / middle / left, matching the reversed render order).
const heroSlice = [
  "lg:[background-position:100%_top]",
  "lg:[background-position:50%_top]",
  "lg:[background-position:0%_top]",
];

export default function HeroSection() {
  const { time, offset } = useIstTime();
  // hovering any box turns every box's waves from gray to brand red. the colour
  // spreads outward from the hovered box: each box's red layer is delayed by its
  // distance (in boxes) from the one under the cursor, so the fill ripples out.
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    // fill the viewport (minus the mt-5 + container pt-4 offset above) so the
    // status/signature row sits at the bottom of the screen on desktop. no
    // overflow-hidden here — it was clipping the signature's "i'm" /
    // "a fullstack dev"; the body already has overflow-x:hidden globally.
    <section
      className="mb-[13svh] flex min-h-[calc(100svh-2.25rem)] flex-col pb-[6svh]"
      style={{ fontFamily: "var(--font-darker-grotesque)" }}
    >
      <div className="flex flex-row-reverse justify-center gap-2 pt-2">
        {heroItems.map((item, idx) => {
          const isHot = hovered !== null;
          const redDelay = isHot ? Math.abs(idx - hovered) * 0.18 : 0;

          return (
            <motion.div
              key={item.title}
              role="link"
              tabIndex={0}
              aria-label={`View ${item.title} in projects`}
              data-project-box
              data-project-slug={item.title}
              onClick={() => highlightProject(item.title)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  highlightProject(item.title);
                }
              }}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              initial={{
                opacity: 0,
                y: 50,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: idx === 0 ? 0.5 : idx === 1 ? 0.4 : 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "group relative w-full cursor-pointer overflow-hidden bg-[#3a3d3e] last:hidden even:hidden sm:even:block lg:w-[370px] lg:first:block lg:last:block",
                heroHeights[idx],
              )}
            >
              {/* shared wave background — gray base with a red layer that fades in
                on hover (delayed per box so the colour ripples across the row) */}
              <span
                aria-hidden
                style={{
                  backgroundImage: "url(/landing-images/hero-bg-gray.svg)",
                }}
                className={cn(
                  "pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat lg:[background-size:300%_auto]",
                  heroSlice[idx],
                )}
              />
              <span
                aria-hidden
                style={{
                  backgroundImage: "url(/landing-images/hero-bg.svg)",
                  transition: "opacity 950ms ease",
                  transitionDelay: `${redDelay}s`,
                }}
                className={cn(
                  "pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100 lg:[background-size:300%_auto] lg:opacity-0",
                  isHot && "lg:opacity-100",
                  heroSlice[idx],
                )}
              />

              {/* project screenshots layered on the shared wave background */}
              {item.layout === "bottom" ? (
                <img
                  src={item.screens[0]}
                  alt={`${item.title} screenshot`}
                  fetchPriority="high"
                  className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto w-[94%] rounded-t-xl border-x border-t border-black/10 shadow-[0_-12px_40px_rgba(0,0,0,0.35)]"
                />
              ) : (
                <>
                  <img
                    src={item.screens[0]}
                    alt={`${item.title} screenshot 1`}
                    fetchPriority="high"
                    className="pointer-events-none absolute top-4 right-0 w-[80%] rounded-l-lg border-y border-l border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                  />
                  <img
                    src={item.screens[1]}
                    alt={`${item.title} screenshot 2`}
                    fetchPriority="high"
                    className="pointer-events-none absolute bottom-4 left-0 w-[80%] rounded-r-lg border-y border-r border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                  />
                </>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-auto flex flex-col items-center gap-4 pt-8 lg:flex-row lg:justify-between">
        <p className="group relative flex w-fit cursor-default items-center gap-2 text-lg font-semibold md:text-xl">
          <IstClock time={time} />
          <span className="text-white/50">IST</span>
          {offset && (
            <span className="pointer-events-none absolute bottom-full left-0 mb-1 flex items-start gap-1">
              {/* hand-drawn curved arrow that draws itself in on hover */}
              <svg
                viewBox="0 0 70 80"
                fill="none"
                className="h-16 w-14 shrink-0"
              >
                <path
                  d="M8 76 C2 42 18 18 50 14 M50 14 L40 9 M50 14 L46 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-[stroke-dashoffset] delay-100 duration-700 ease-out [stroke-dasharray:160] [stroke-dashoffset:160] group-hover:[stroke-dashoffset:0]"
                />
              </svg>
              <span className="font-handwriting max-w-[150px] -translate-y-1 text-base leading-[1.05] font-medium opacity-0 transition-opacity delay-300 duration-300 group-hover:opacity-100 md:text-lg">
                {offset}
              </span>
            </span>
          )}
        </p>
        <Signature />
        <Link
          href={locationUrl}
          target="_blank"
          className="text-lg font-semibold underline underline-offset-3 md:text-xl"
        >
          based on earth
        </Link>
      </div>
    </section>
  );
}
