"use client";

import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState, type PointerEvent } from "react";

const desktopWord = "SHREYAN";
const mobileWord = "DEY";

function WordLetters({
  word,
  onEnter,
  onLeave,
}: {
  word: string;
  onEnter?: (event: PointerEvent<HTMLSpanElement>) => void;
  onLeave?: () => void;
}) {
  return (
    <span className="inline-flex whitespace-nowrap">
      {[...word].map((letter, index) => {
        const tightensYA = word === desktopWord && letter === "Y";

        return (
          <span
            key={`${letter}-${index}`}
            data-footer-letter={letter}
            onPointerEnter={onEnter}
            onPointerLeave={onLeave}
            className={`relative inline-block last:mr-0 ${
              tightensYA ? "-mr-[0.12em] translate-y-px" : "-mr-[0.02em]"
            }`}
          >
            {letter}
          </span>
        );
      })}
    </span>
  );
}

function ResponsiveWord({
  onEnter,
  onLeave,
}: {
  onEnter?: (event: PointerEvent<HTMLSpanElement>) => void;
  onLeave?: () => void;
}) {
  return (
    <>
      <span className="md:hidden">
        <WordLetters word={mobileWord} onEnter={onEnter} onLeave={onLeave} />
      </span>
      <span className="hidden md:inline">
        <WordLetters word={desktopWord} onEnter={onEnter} onLeave={onLeave} />
      </span>
    </>
  );
}

/** Large footer signature with a pointer-origin brand-color reveal. */
export default function FooterWordmark() {
  const wordRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isRevealed, setIsRevealed] = useState(false);
  const radius = useMotionValue(0);
  const originX = useMotionValue(50);
  const originY = useMotionValue(50);
  const clipPath = useMotionTemplate`circle(${radius}% at ${originX}% ${originY}%)`;

  useEffect(() => {
    const controls = animate(radius, isRevealed ? 150 : 0, {
      duration: shouldReduceMotion ? 0 : isRevealed ? 1.05 : 0.35,
      ease: isRevealed ? [0.65, 0, 0.35, 1] : [0.19, 1, 0.22, 1],
    });

    return () => controls.stop();
  }, [isRevealed, radius, shouldReduceMotion]);

  const beginReveal = (event: PointerEvent<HTMLSpanElement>) => {
    if (event.pointerType === "touch") return;

    const bounds = wordRef.current?.getBoundingClientRect();
    if (!bounds) return;

    originX.set(((event.clientX - bounds.left) / bounds.width) * 100);
    originY.set(((event.clientY - bounds.top) / bounds.height) * 100);
    setIsRevealed(true);
  };

  const endReveal = () => {
    setIsRevealed(false);
  };

  return (
    <footer
      aria-label="Shreyan Dey"
      className="h-[clamp(8rem,36vw,10rem)] overflow-hidden md:h-[clamp(4.5rem,16vw,14rem)]"
    >
      <div className="container mx-auto max-w-6xl px-2">
        <div
          ref={wordRef}
          data-footer-wordmark
          aria-hidden
          className="font-display relative w-full -translate-y-[0.015em] text-[clamp(8rem,62vw,15.25rem)] leading-none font-semibold uppercase md:text-[clamp(12rem,27.9vw,20.1rem)]"
        >
          <span className="text-transparent [-webkit-text-stroke:1.25px_rgba(255,255,255,0.46)]">
            <ResponsiveWord onEnter={beginReveal} onLeave={endReveal} />
          </span>

          <motion.span
            aria-hidden
            style={{ clipPath }}
            className="bg-background pointer-events-none absolute inset-0 z-10"
          />

          <motion.span
            initial={false}
            data-footer-fill
            style={{ clipPath }}
            className="text-secondary pointer-events-none absolute inset-0 z-20"
          >
            <ResponsiveWord />
          </motion.span>
        </div>
      </div>
    </footer>
  );
}
