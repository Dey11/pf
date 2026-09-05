"use client";

import { AnimatePresence } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ProjectPopup from "./project-popup";
import {
  projectCardHeightByWeight,
  prioritizedProjectColumns,
  projectBoxesByInventoryId,
  projectImageSource,
  projectSlug,
  type ProjectBox,
} from "@/lib/project-boxes";
import {
  PROJECT_EVENT,
  clearProjectHighlight,
  slugFromHash,
} from "@/lib/project-highlight";

// mobile shows a uniform two-column grid with only image-backed projects. since
// touch devices do not have a reliable hover state, every card renders with its
// thumbnail/title already in the revealed position.
const mobileProjects = (() => {
  return prioritizedProjectColumns.flat().filter(({ projectId }) => {
    const box = projectBoxesByInventoryId[projectId];
    return Boolean(box.thumbnail ?? box.images[0]);
  });
})();

const wipTapeInk = "#171717";
const wipTapeYellow = "#FFEE00";
const wipTapeStripe = `repeating-linear-gradient(-45deg, ${wipTapeInk} 0 0.45rem, ${wipTapeYellow} 0.45rem 0.9rem)`;
const wipTapeBandShadow = `inset 0 0 0 1px ${wipTapeInk}, 0 0 0 1px ${wipTapeInk}, 0 0 0 2px ${wipTapeYellow}, 0 1px 2px rgba(0,0,0,0.45)`;

const wipTapeBandClassName =
  "pointer-events-none absolute left-[-45%] h-[0.95rem] w-[190%] -translate-y-1/2 sm:h-[1.15rem]";

function isWorkInProgress(status: ProjectBox["status"]) {
  return status === "WIP" || status === "In progress";
}

function WipTape() {
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0 z-[1]">
      <span
        className={`${wipTapeBandClassName} top-[70%] rotate-[13deg]`}
        style={{ backgroundImage: wipTapeStripe, boxShadow: wipTapeBandShadow }}
      />
      <span
        className={`${wipTapeBandClassName} top-[67%] -rotate-[8deg]`}
        style={{ backgroundImage: wipTapeStripe, boxShadow: wipTapeBandShadow }}
      />
    </span>
  );
}

function BentoCard({
  box,
  onSelect,
  highlight,
}: {
  box: ProjectBox;
  onSelect: (box: ProjectBox) => void;
  highlight: string | null;
}) {
  const firstImage = box.images[0];
  const thumbnail =
    box.thumbnail ?? (firstImage ? projectImageSource(firstImage) : undefined);
  const slug = projectSlug(box);
  const isActive = highlight === slug;
  const isDimmed = highlight !== null && !isActive;
  const textClass = box.foreground === "light" ? "text-white" : "text-black";
  const mutedTextClass =
    box.foreground === "light" ? "text-white/70" : "text-black/45";
  const showWipTape = isWorkInProgress(box.status);

  return (
    <button
      type="button"
      onClick={() => onSelect(box)}
      data-project-box
      data-project-slug={slug}
      aria-label={`Open ${box.name} project details`}
      className={`group relative h-full min-h-0 w-full cursor-pointer overflow-hidden rounded-xl text-left transition-[opacity,box-shadow] duration-300 sm:rounded-2xl ${box.color} ${
        isActive
          ? "ring-secondary ring-offset-background z-10 opacity-100 ring-2 ring-offset-2"
          : isDimmed
            ? "opacity-40"
            : "opacity-100"
      }`}
    >
      {showWipTape ? <WipTape /> : null}

      <span
        className={`font-display pointer-events-none absolute top-3 left-3 z-10 text-xs leading-none font-medium tabular-nums opacity-55 ${textClass}`}
      >
        {box.year}
      </span>

      {thumbnail ? (
        /* The panel is 4/5 of the card. A 25% downward offset leaves exactly
           3/5 visible; a 12.5% offset reveals 3.5/5 on hover or keyboard focus. */
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-2 bottom-0 h-[80%] translate-y-[25%] overflow-hidden rounded-t-lg border border-black/10 shadow-[0_-10px_30px_rgba(0,0,0,0.28)] transition-transform duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none sm:inset-x-3 sm:rounded-t-xl motion-safe:lg:group-hover:translate-y-[12.5%] motion-safe:lg:group-focus-visible:translate-y-[12.5%]"
        >
          <Image
            src={thumbnail}
            alt=""
            fill
            sizes="(max-width: 1023px) 50vw, 28vw"
            className="object-cover object-top"
          />
        </span>
      ) : null}

      <span
        className={`pointer-events-none absolute top-0 right-3 z-10 flex max-w-[68%] translate-y-2 flex-col items-end transition-transform duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none sm:max-w-[90%] lg:-translate-y-full motion-safe:lg:group-hover:translate-y-2 motion-safe:lg:group-focus-visible:translate-y-2 motion-reduce:lg:translate-y-2 ${textClass}`}
      >
        <span className="flex max-w-full items-center justify-end">
          <span className="font-display truncate text-right text-[22px] leading-none font-semibold lowercase sm:text-[28px] lg:text-[32px]">
            {box.name}
          </span>
        </span>
        <span
          className={`mt-1 max-w-full text-right text-[10px] leading-tight font-medium text-balance normal-case sm:text-xs ${mutedTextClass}`}
        >
          {box.cardSummary}
        </span>
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
              onSelect={setSelected}
              highlight={highlight}
            />
          </div>
        ))}
      </div>

      {/* desktop — 3 columns, all projects */}
      <div className="hidden items-start gap-4 pt-10 lg:flex">
        {prioritizedProjectColumns.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-1 flex-col gap-4">
            {column.map(({ weight, projectId }) => (
              <div
                key={projectId}
                className="shrink-0"
                style={{ height: projectCardHeightByWeight[weight] }}
              >
                <BentoCard
                  box={projectBoxesByInventoryId[projectId]}
                  onSelect={setSelected}
                  highlight={highlight}
                />
              </div>
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
