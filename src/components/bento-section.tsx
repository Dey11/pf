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

// mobile shows a uniform two-column grid with only image-backed projects. since
// touch devices do not have a reliable hover state, every card renders with its
// thumbnail/title already in the revealed position.
const mobileProjects: Slot[] = (() => {
  return prioritizedProjectColumns.flat().filter(({ projectId }) => {
    const box = projectBoxesByInventoryId[projectId];
    return Boolean(box.thumbnail ?? box.images[0]);
  });
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
  const textClass = box.foreground === "light" ? "text-white" : "text-black";
  const mutedTextClass =
    box.foreground === "light" ? "text-white/70" : "text-black/45";

  return (
    <button
      type="button"
      onClick={() => onSelect(box)}
      data-project-box
      data-project-slug={slug}
      style={{ flexGrow: weight, flexBasis: 0 }}
      aria-label={`Open ${box.name} project details`}
      className={`group relative h-full min-h-0 w-full cursor-pointer overflow-hidden rounded-xl text-left transition-all duration-300 sm:rounded-2xl ${box.color} ${
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
          className="pointer-events-none absolute inset-x-2 bottom-0 h-[80%] translate-y-[17%] rounded-t-lg border border-black/10 shadow-[0_-10px_30px_rgba(0,0,0,0.28)] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] sm:inset-x-3 sm:rounded-t-xl lg:translate-y-[50%] lg:group-hover:translate-y-[17%]"
        />
      ) : (
        <span
          className={`pointer-events-none absolute right-3 bottom-3 left-3 line-clamp-3 text-xs leading-snug opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:text-sm ${mutedTextClass}`}
        >
          {box.tagline}
        </span>
      )}

      <span
        className={`font-display pointer-events-none absolute top-0 right-3 z-10 max-w-[90%] translate-y-2 truncate text-right text-[28px] leading-none font-semibold lowercase transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] sm:text-[32px] lg:-translate-y-full lg:group-hover:translate-y-2 ${textClass}`}
      >
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
    // give Lenis + layout a beat to settle before scrolling
    const t = setTimeout(() => {
      setHighlight(slug);
      scrollToProjects();
    }, 350);
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

      {/* mobile / tablet — uniform 2-column grid, image projects only */}
      <div className="grid grid-cols-2 gap-3 pt-10 sm:gap-4 lg:hidden">
        {mobileProjects.map(({ projectId }) => (
          <div key={projectId} className="h-48 sm:h-60">
            <BentoCard
              box={projectBoxesByInventoryId[projectId]}
              weight={1}
              onSelect={setSelected}
              highlight={highlight}
            />
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
