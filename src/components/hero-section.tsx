"use client";

import { heroItems, locationUrl } from "@/lib/constants";
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

    setTime(format());
    setOffset(istOffsetLabel());
    const id = setInterval(() => setTime(format()), 1000);
    return () => clearInterval(id);
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
// fixed (370px) so we freeze the height too — keeps the framing constant and
// stops `background-size: cover` from zooming the image in on taller screens.
const heroHeights = [
  "h-[60svh] lg:h-[580px]",
  "h-[50svh] lg:h-[495px]",
  "h-[40svh] lg:h-[410px]",
];

export default function HeroSection() {
  const { time, offset } = useIstTime();

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
        {heroItems.map((item, idx) => (
          <motion.div
            key={item.title}
            style={{
              backgroundImage: `url(${item.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
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
              "group relative w-full last:hidden even:hidden sm:even:block lg:w-[370px] lg:first:block lg:last:block",
              heroHeights[idx],
            )}
          >
            <div className="absolute inset-x-0 bottom-0 flex h-full flex-col justify-end gap-3 bg-gradient-to-t from-black/80 to-black/0 p-4 text-white opacity-100 backdrop-blur-[2px] transition-opacity delay-75 duration-300 group-hover:opacity-100 lg:opacity-0">
              <img
                src={item.titleLogo}
                alt={item.title}
                fetchPriority="high"
                className={cn(
                  "size-10",
                  item.title === "clarityhub" && "h-8 w-28",
                  item.title === "drites" && "h-6 w-24",
                  item.title === "wabisabi design agency" && "h-8 w-36",
                )}
              />
              <p className="cursor-default text-sm leading-tight md:text-base">
                {item.description}
              </p>

              <Link
                href={item.live}
                target="_blank"
                className="w-fit text-sm underline underline-offset-2 md:text-base"
              >
                live preview <span className="text-xs md:text-sm">→</span>
              </Link>

              <p className="cursor-default text-sm md:text-base">tech stack</p>
            </div>
          </motion.div>
        ))}
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
                  className="[stroke-dasharray:160] [stroke-dashoffset:160] transition-[stroke-dashoffset] delay-100 duration-700 ease-out group-hover:[stroke-dashoffset:0]"
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
