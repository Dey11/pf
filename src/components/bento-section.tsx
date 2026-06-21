"use client";

import { AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import ProjectPopup from "./project-popup";
import {
  prioritizedProjectColumns,
  projectBoxesByInventoryId,
  projectSlug,
  type ProjectBox,
} from "@/lib/project-boxes";
import {
  PROJECT_EVENT,
  clearProjectHighlight,
  slugFromHash,
} from "@/lib/project-highlight";

type Slot = { weight: number; projectId: number };

// mobile shows 2 columns and only the projects that have an image. distribute
// those projects across two columns, greedily balancing total weight so the
// two columns end up with roughly equal combined height.
const mobileColumns: Slot[][] = (() => {
  const withImages = prioritizedProjectColumns.flat().filter(({ projectId }) => {
    const box = projectBoxesByInventoryId[projectId];
    return Boolean(box.thumbnail ?? box.images[0]);
  });

  const cols: Slot[][] = [[], []];
  const totals = [0, 0];
  for (const slot of withImages) {
    const target = totals[0] <= totals[1] ? 0 : 1;
    cols[target].push(slot);
    totals[target] += slot.weight;
  }
  return cols;
})();

function BentoCard({
  box,
  weight,
  onSelect,
  highlight,
}: {
  box: ProjectBox;
  weight: number;
  onSelect: (box: ProjectBox) => void;
  highlight: string | null;
}) {
  const thumbnail = box.thumbnail ?? box.images[0];
  const slug = projectSlug(box);
  const isActive = highlight === slug;
  const isDimmed = highlight !== null && !isActive;

  return (
    <button
      type="button"
      onClick={() => onSelect(box)}
      data-project-box
      data-project-slug={slug}
      style={{ flexGrow: weight, flexBasis: 0 }}
      aria-label={`Open ${box.name} project details`}
      className={`group relative min-h-0 w-full cursor-pointer overflow-hidden rounded-xl text-left transition-all duration-300 sm:rounded-2xl ${box.color} ${
        isActive
          ? "ring-secondary ring-offset-background z-10 opacity-100 ring-2 ring-offset-2"
          : isDimmed
            ? "opacity-40"
            : "opacity-100"
      }`}
    >
      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.38),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.22),transparent_46%)] opacity-80" />

      {thumbnail ? (
        /* peeking thumbnail — ~3/6 visible by default, rising to ~5/6 on hover
           with an elastic overshoot. clipped by the card's overflow-hidden. */
        <span
          aria-hidden
          style={{
            backgroundImage: `url(${thumbnail})`,
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
          className="pointer-events-none absolute inset-x-2 bottom-0 h-[80%] translate-y-[50%] rounded-t-lg border border-black/10 shadow-[0_-10px_30px_rgba(0,0,0,0.28)] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-y-[17%] sm:inset-x-3 sm:rounded-t-xl"
        />
      ) : (
        <span className="pointer-events-none absolute right-3 bottom-3 left-3 line-clamp-3 text-xs leading-snug text-black/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:text-sm">
          {box.tagline}
        </span>
      )}

      <span className="font-display pointer-events-none absolute top-0 right-3 z-10 max-w-[90%] -translate-y-full truncate text-right text-[32px] leading-none font-semibold text-black lowercase transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-y-2">
        {box.name}
      </span>
    </button>
  );
}

export default function BentoSection() {
  const [selected, setSelected] = useState<ProjectBox | null>(null);
  // the slug of the project to highlight (from a hero-box click or a deep link)
  const [highlight, setHighlight] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // smooth-scroll the projects section into view, preferring the shared Lenis
  // instance so it matches the rest of the site's scrolling feel.
  const scrollToProjects = () => {
    const el = sectionRef.current;
    if (!el) return;
    const lenis = (
      window as unknown as {
        lenis?: { scrollTo: (t: HTMLElement, o?: object) => void };
      }
    ).lenis;
    if (lenis) lenis.scrollTo(el, { offset: -16, duration: 1.2 });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // deep link on load: /#downthecove-project -> scroll + highlight
  useEffect(() => {
    const slug = slugFromHash(window.location.hash);
    if (!slug) return;
    setHighlight(slug);
    // give Lenis + layout a beat to settle before scrolling
    const t = setTimeout(scrollToProjects, 350);
    return () => clearTimeout(t);
  }, []);

  // react to hero-box clicks (custom event) and manual hash changes
  useEffect(() => {
    const onEvent = (e: Event) => {
      const slug = (e as CustomEvent<{ slug: string | null }>).detail.slug;
      setHighlight(slug);
      if (slug) scrollToProjects();
    };
    const onHashChange = () => {
      const slug = slugFromHash(window.location.hash);
      setHighlight(slug);
      if (slug) scrollToProjects();
    };
    window.addEventListener(PROJECT_EVENT, onEvent);
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener(PROJECT_EVENT, onEvent);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  // clicking anywhere that isn't a project box clears the highlight
  useEffect(() => {
    if (!highlight) return;
    const onClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("[data-project-box]")) return;
      clearProjectHighlight();
    };
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, [highlight]);

  return (
    <section ref={sectionRef} className="scroll-mt-6 pb-40 text-start">
      <p className="font-display pb-2 text-end text-lg md:text-xl">(011)</p>

      <h1 className="text-end text-3xl font-semibold sm:text-4xl md:text-5xl lg:text-6xl">
        projects<span className="text-secondary">.</span>
      </h1>

      {/* mobile / tablet — 2 columns, image projects only */}
      <div className="flex h-[760px] gap-3 pt-10 sm:h-[1000px] sm:gap-4 lg:hidden">
        {mobileColumns.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className="flex h-full flex-1 flex-col gap-3 sm:gap-4"
          >
            {column.map(({ weight, projectId }) => (
              <BentoCard
                key={projectId}
                box={projectBoxesByInventoryId[projectId]}
                weight={weight}
                onSelect={setSelected}
                highlight={highlight}
              />
            ))}
          </div>
        ))}
      </div>

      {/* desktop — 3 columns, all projects */}
      <div className="hidden h-[1200px] gap-4 pt-10 lg:flex">
        {prioritizedProjectColumns.map((column, columnIndex) => (
          <div key={columnIndex} className="flex h-full flex-1 flex-col gap-4">
            {column.map(({ weight, projectId }) => (
              <BentoCard
                key={projectId}
                box={projectBoxesByInventoryId[projectId]}
                weight={weight}
                onSelect={setSelected}
                highlight={highlight}
              />
            ))}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectPopup box={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
