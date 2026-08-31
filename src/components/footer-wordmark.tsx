"use client";

import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState, type PointerEvent } from "react";

const letters = [..."SHREYAN"];

function WordLetters({
  onEnter,
  onLeave,
}: {
  onEnter?: (event: PointerEvent<HTMLSpanElement>) => void;
  onLeave?: () => void;
}) {
  return (
    <span className="flex w-full justify-between">
      {letters.map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          data-footer-letter={letter}
          onPointerEnter={onEnter}
          onPointerLeave={onLeave}
          className={onEnter ? "[clip-path:inset(24%_0_0_0)]" : undefined}
        >
          {letter}
        </span>
      ))}
    </span>
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
      aria-label="Shreyan"
      className="h-[clamp(4.5rem,16vw,14rem)] overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl px-2">
        <div
          ref={wordRef}
          data-footer-wordmark
          aria-hidden
          className="font-display relative w-full translate-y-[0.04em] text-[clamp(5.75rem,18vw,16rem)] leading-none font-semibold uppercase"
        >
          <span className="text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.9)]">
            <WordLetters onEnter={beginReveal} onLeave={endReveal} />
          </span>

          <motion.span
            initial={false}
            data-footer-fill
            style={{ clipPath }}
            className="text-secondary pointer-events-none absolute inset-0"
          >
            <WordLetters />
          </motion.span>
        </div>
      </div>
    </footer>
  );
}
