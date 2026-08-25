"use client";

import { assetUrl } from "@/lib/assets";
import { projectBoxesByInventoryId, projectSlug } from "@/lib/project-boxes";
import { hashForSlug, highlightProject } from "@/lib/project-highlight";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";

type ProjectId = keyof typeof projectBoxesByInventoryId;

const projectLogos: Partial<Record<ProjectId, string | null>> = {
  1: null,
  18: assetUrl("/landing-images/downthecove-logo.svg"),
  19: assetUrl("/logos/thomasbewick.png"),
  21: assetUrl("/landing-images/hanabi-logo.svg"),
};

function InlineFact({
  children,
  icon,
  detail,
}: {
  children: ReactNode;
  icon: string;
  detail: string;
}) {
  return (
    <span className="group/fact relative inline-flex align-baseline whitespace-nowrap">
      <span
        tabIndex={0}
        className="hover:decoration-secondary focus-visible:decoration-secondary inline-flex cursor-help items-center gap-1.5 text-white underline decoration-white/25 decoration-dashed underline-offset-4 transition-colors outline-none"
      >
        <Image
          src={icon}
          alt=""
          width={18}
          height={18}
          aria-hidden
          className="size-[0.8em] object-contain"
        />
        {children}
      </span>

      <span className="pointer-events-none absolute bottom-[calc(100%+0.65rem)] left-1/2 z-30 hidden w-[min(20rem,calc(100vw-2rem))] -translate-x-1/2 rounded-md border border-white/15 bg-[#161616] px-3 py-2 text-left text-sm leading-snug whitespace-normal text-white/75 opacity-0 shadow-[0_16px_45px_rgba(0,0,0,0.45)] transition-opacity duration-100 ease-out group-focus-within/fact:opacity-100 group-focus-within/fact:duration-0 group-hover/fact:opacity-100 group-hover/fact:duration-150 md:block">
        {detail}
      </span>
    </span>
  );
}

function ProjectMention({ projectId }: { projectId: ProjectId }) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [previewAlign, setPreviewAlign] = useState<"start" | "center" | "end">(
    "center",
  );
  const project = projectBoxesByInventoryId[projectId];
  const slug = projectSlug(project);
  const preview = project.thumbnail ?? project.images[0];
  const configuredLogo = projectLogos[projectId];
  const logo = configuredLogo === null ? null : (configuredLogo ?? preview);
  const previewPosition =
    previewAlign === "start"
      ? "left-0 origin-bottom-left translate-x-0"
      : previewAlign === "end"
        ? "right-0 origin-bottom-right translate-x-0"
        : "left-1/2 origin-bottom -translate-x-1/2";

  const syncPreviewAlign = () => {
    const rect = linkRef.current?.getBoundingClientRect();
    if (!rect) return;
    const boundary = linkRef.current
      ?.closest("#about")
      ?.getBoundingClientRect();
    const previewWidth = 240;
    const gutter = 16;
    const leftEdge = boundary?.left ?? 0;
    const rightEdge = boundary?.right ?? window.innerWidth;
    const centeredLeft = rect.left + rect.width / 2 - previewWidth / 2;
    const centeredRight = centeredLeft + previewWidth;
    if (centeredLeft < leftEdge + gutter) setPreviewAlign("start");
    else if (centeredRight > rightEdge - gutter) setPreviewAlign("end");
    else setPreviewAlign("center");
  };

  return (
    <Link
      ref={linkRef}
      href={`/#${hashForSlug(slug)}`}
      data-project-box
      data-project-slug={slug}
      onClick={() => highlightProject(slug)}
      onMouseEnter={syncPreviewAlign}
      onFocus={syncPreviewAlign}
      aria-label={`Show ${project.name} in the projects section`}
      className="group/project relative inline-flex cursor-pointer align-baseline whitespace-nowrap text-white outline-none"
    >
      <span className="group-hover/project:decoration-secondary group-focus-visible/project:decoration-secondary inline-flex items-center gap-1.5 underline decoration-white/25 decoration-dashed underline-offset-4 transition-colors">
        {logo && (
          <span className="relative inline-flex size-[0.9em] shrink-0 overflow-hidden rounded-[0.2em] bg-white/95 p-[0.1em] align-[-0.08em]">
            <Image
              src={logo}
              alt=""
              fill
              sizes="24px"
              aria-hidden
              className="object-contain"
            />
          </span>
        )}
        {project.name}
      </span>

      {preview && (
        <span
          className={`pointer-events-none absolute bottom-[calc(100%+0.85rem)] z-30 hidden w-60 scale-90 overflow-hidden rounded-lg border border-white/15 bg-[#111] opacity-0 shadow-[0_22px_65px_rgba(0,0,0,0.58)] transition-[opacity,scale] duration-100 ease-out group-hover/project:scale-100 group-hover/project:opacity-100 group-hover/project:duration-150 group-focus-visible/project:scale-100 group-focus-visible/project:opacity-100 group-focus-visible/project:duration-0 motion-reduce:scale-100 motion-reduce:transition-opacity md:block ${previewPosition}`}
        >
          <span className="relative block aspect-[16/10] w-full overflow-hidden bg-white/5">
            <Image
              src={preview}
              alt={`${project.name} project preview`}
              fill
              sizes="256px"
              className="object-cover object-top"
            />
          </span>
          <span className="flex items-center justify-between gap-3 px-3 py-2 text-left">
            <span className="font-display truncate text-base leading-none lowercase">
              {project.name}
            </span>
            <span className="shrink-0 text-[10px] tracking-[0.12em] text-white/45 uppercase">
              view project ↓
            </span>
          </span>
        </span>
      )}
    </Link>
  );
}

function DeyNickname() {
  return (
    <span className="group/dey relative inline-flex whitespace-nowrap">
      <span
        tabIndex={0}
        className="font-display text-secondary cursor-default text-[1.16em] leading-none font-semibold lowercase outline-none"
      >
        dey
      </span>
      <span
        aria-hidden
        className="font-handwriting pointer-events-none absolute bottom-[calc(100%+0.15rem)] left-1/2 hidden w-max -translate-x-1/2 text-base leading-none text-white opacity-0 transition-opacity duration-100 ease-out group-focus-within/dey:opacity-100 group-focus-within/dey:duration-0 group-hover/dey:opacity-100 group-hover/dey:duration-150 md:block md:text-lg"
      >
        that&apos;s my surname
      </span>
    </span>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="mb-16 scroll-mt-6 overflow-x-clip md:mb-20">
      <p className="font-display pb-2 text-lg md:text-xl">(000)</p>

      <h1 className="text-3xl font-semibold sm:text-4xl md:text-5xl lg:text-6xl">
        about me<span className="text-secondary">.</span>
      </h1>

      <div className="w-full space-y-6 pt-10 text-lg leading-[1.5] text-white/58 sm:space-y-7 sm:text-2xl md:text-[1.75rem] md:leading-[1.38]">
        <p>
          Hey, I&apos;m Shreyan (or you can call me just <DeyNickname />
          ), a full-stack product engineer from India. I like the messy stretch
          between <span className="text-white">“this might work”</span> and{" "}
          <span className="text-white">“people are using it”</span>: shaping the
          product, building the system, and polishing the interface until it
          feels inevitable.
        </p>

        <p>
          At work, I build and operate voice AI systems that have handled{" "}
          <InlineFact
            icon={assetUrl("/logos/stack/elevenlabs.svg")}
            detail="Outbound voice agents, batch orchestration, transcript extraction, and custom CRM workflows."
          >
            200k+ calls
          </InlineFact>
          , and help run a free-to-play fantasy auction product used by{" "}
          <InlineFact
            icon={assetUrl("/logos/stack/supabase.svg")}
            detail="Auction rooms across IPL, FIFA, and the Women's T20 World Cup."
          >
            130k+ players
          </InlineFact>
          . I am equally happy tracing a queue failure and moving a button two
          pixels because both can be the thing standing between a product and a
          good day.
        </p>

        <p>
          Outside work, I keep building. <ProjectMention projectId={22} /> finds
          high-intent conversations on Reddit, <ProjectMention projectId={1} />{" "}
          turns a syllabus into structured study material, and{" "}
          <ProjectMention projectId={21} /> gives the visual side of my brain
          somewhere to misbehave. I also freelance regularly for founders and
          small teams. Recent builds include <ProjectMention projectId={18} />{" "}
          and <ProjectMention projectId={19} />.
        </p>

        <p>
          I care about software that is clear, fast, and honest about its
          constraints. I also collect more domains than I can reasonably
          justify, but at least some of them become products.
        </p>
      </div>

      {/* The previous two-column quote treatment is intentionally paused while
          the About section uses this single-column editorial layout. */}
    </section>
  );
}
