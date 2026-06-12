"use client";

import { heroItems, locationUrl } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Signature from "./signature";
import { motion } from "motion/react";

// below lg the boxes scale with the viewport (svh); from laptop up the width is
// fixed (370px) so we freeze the height too — keeps the framing constant and
// stops `background-size: cover` from zooming the image in on taller screens.
const heroHeights = [
  "h-[60svh] lg:h-[520px]",
  "h-[50svh] lg:h-[435px]",
  "h-[40svh] lg:h-[350px]",
];

export default function HeroSection() {
  return (
    <section
      className="mb-[13svh] flex min-h-[87svh] flex-col overflow-hidden pb-[6svh]"
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
        <p className="flex items-center gap-2 text-lg font-semibold md:text-xl">
          <span className="relative flex size-2.5 translate-y-[2px]">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-green-500" />
          </span>
          open for work
        </p>
        <Signature />
        <Link
          href={locationUrl}
          target="_blank"
          className="pt-2 text-lg font-semibold underline underline-offset-3 md:text-xl lg:block lg:pt-4"
        >
          based on earth
        </Link>
      </div>
    </section>
  );
}
