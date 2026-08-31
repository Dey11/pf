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

function CustomOutline({ letter }: { letter: string }) {
  if (letter !== "H" && letter !== "A") return null;

  const path =
    letter === "H"
      ? "M 1 0 V 100 M 18 0 V 100 M 82 0 V 100 M 99 0 V 100 M 18 52 H 82"
      : "M 1 100 L 42 0 M 20 100 L 49 0 M 51 0 L 80 100 M 58 0 L 99 100 M 27 63 H 73";

  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute top-[31.5%] h-[57%] overflow-visible text-white/45 ${
        letter === "H" ? "left-[10%] w-[80%]" : "left-[1%] w-[98%]"
      }`}
    >
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function WordLetters({
  word,
  outline = false,
  onEnter,
  onLeave,
}: {
  word: string;
  outline?: boolean;
  onEnter?: (event: PointerEvent<HTMLSpanElement>) => void;
  onLeave?: () => void;
}) {
  return (
    <span className="inline-flex whitespace-nowrap">
      {[...word].map((letter, index) => {
        const usesCustomOutline = outline && (letter === "H" || letter === "A");

        return (
          <span
            key={`${letter}-${index}`}
            data-footer-letter={letter}
            onPointerEnter={onEnter}
            onPointerLeave={onLeave}
            className={`relative -mr-[0.02em] inline-block last:mr-0 ${
              usesCustomOutline ? "[-webkit-text-stroke:0]" : ""
            } ${onEnter ? "[clip-path:inset(24%_0_0_0)]" : ""}`}
          >
            {letter}
            {usesCustomOutline ? <CustomOutline letter={letter} /> : null}
          </span>
        );
      })}
    </span>
  );
}

function ResponsiveWord({
  outline = false,
  onEnter,
  onLeave,
}: {
  outline?: boolean;
  onEnter?: (event: PointerEvent<HTMLSpanElement>) => void;
  onLeave?: () => void;
}) {
  return (
    <>
      <span className="md:hidden">
        <WordLetters
          word={mobileWord}
          outline={outline}
          onEnter={onEnter}
          onLeave={onLeave}
        />
      </span>
      <span className="hidden md:inline">
        <WordLetters
          word={desktopWord}
          outline={outline}
          onEnter={onEnter}
          onLeave={onLeave}
        />
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
          className="font-display relative w-full translate-y-[0.04em] text-[clamp(8rem,62vw,15.25rem)] leading-none font-semibold uppercase md:text-[clamp(12rem,27.1vw,19.55rem)]"
        >
          <span className="text-transparent [-webkit-text-stroke:1.25px_rgba(255,255,255,0.46)]">
            <ResponsiveWord outline onEnter={beginReveal} onLeave={endReveal} />
          </span>

          <motion.span
            initial={false}
            data-footer-fill
            style={{ clipPath }}
            className="text-secondary pointer-events-none absolute inset-0"
          >
            <ResponsiveWord />
          </motion.span>
        </div>
      </div>
    </footer>
  );
}
