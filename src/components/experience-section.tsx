"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { techMeta, type TechKey } from "@/lib/tech-stack";

type Experience = {
  title: string;
  kind: "FTE" | "FREELANCE";
  period: string;
  points: string[];
  tags: string[];
};

// one flat list, ordered newest -> oldest (present first, then 2026 -> 2024)
// with the current FTE role (genesis) pinned on top.
const experiences: Experience[] = [
  {
    title: "genesis ai",
    kind: "FTE",
    period: "present",
    points: [
      "Build and operate voice AI systems that have handled 200k+ calls across client campaigns.",
      "Own agent prompt design, custom CRM integration, lead-batch workflows, transcript extraction, and post-call automation.",
      "Build and operate a free to play fantasy sports auction platform (IPL, FIFA, Women's T20) for a 130k+ user base.",
    ],
    tags: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "ElevenLabs",
      "Resend",
      "Redis",
    ],
  },
  {
    title: "moai",
    kind: "FREELANCE",
    period: "2026",
    points: [
      "Building a trading journal that supports Fidelity imports for now.",
      "Tracks PnL with journaling, playbooks, and tags.",
      "Surfaces performance through dashboard and calendar analytics views.",
    ],
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "TanStack Query"],
  },
  {
    title: "downthecove",
    kind: "FREELANCE",
    period: "2026",
    points: [
      "Built a bespoke ecommerce platform for a UK coastal fishing & lifestyle brand.",
      "Medusa backend with a Next.js storefront, custom admin, Payload CMS, and Stripe payments.",
      "Handled retail/wholesale channels, subscriptions, Royal Mail shipping, and Cloudflare R2 media.",
    ],
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Docker"],
  },
  {
    title: "thomasbewick",
    kind: "FREELANCE",
    period: "2026",
    points: [
      "Built a single-product storefront for a UK horse-bedding business.",
      "Storefront owns the customer journey while WooCommerce stays the order backend.",
      "Stripe PaymentIntents with webhook-driven order creation and Resend transactional emails.",
    ],
    tags: ["Next.js", "TypeScript", "Stripe", "WooCommerce", "Resend"],
  },
  {
    title: "rudra cybersecurity",
    kind: "FTE",
    period: "2025",
    points: [
      "Worked on FutureKonnect, a maritime platform managing connectivity and devices on remote ships.",
      "Shipped features, security improvements, page revamps, and bulk crew-user tooling.",
      "Tested against real ship networks over VPN and live remote routers.",
    ],
    tags: [
      "Python",
      "TypeScript",
      "React",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "Tailwind CSS",
    ],
  },
  {
    title: "ballarat box sports",
    kind: "FREELANCE",
    period: "2025",
    points: [
      "Built the public web presence for an Australian indoor sports facility.",
      "Covered sports formats, pricing, rulebooks, venue details, and contact paths.",
      "Added local-business SEO, structured data, and validated lead capture.",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Motion", "Zod"],
  },
];

function getTech(tag: string) {
  const key = tag
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/\s+/g, "") as TechKey;

  return techMeta[key];
}

export default function ExperienceSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="pb-40 text-start">
      <p className="font-display pb-2 text-lg md:text-xl">(010)</p>

      <h1 className="text-3xl font-semibold sm:text-4xl md:text-5xl lg:text-6xl">
        experience<span className="text-secondary">.</span>
      </h1>

      <div className="pt-10">
        {experiences.map((exp, index) => {
          const isOpen = openIndex === index;
          const isDimmed = hovered !== null && hovered !== index;
          const number = (index + 1).toString(2).padStart(4, "0");

          return (
            <motion.div
              key={exp.title}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              animate={{ opacity: isDimmed ? 0.4 : 1 }}
              transition={{ duration: 0.25 }}
              className="border-b border-white/15"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full cursor-pointer items-center gap-4 py-6 text-left md:gap-8"
              >
                <span className="text-3xl font-semibold tabular-nums md:text-5xl">
                  {number}
                </span>
                <span className="flex grow flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-xl font-semibold md:text-3xl lg:text-4xl">
                    {exp.title}
                    <span className="text-secondary">.</span>
                  </span>
                  <span className="rounded-full border border-white/25 px-2 py-0.5 text-[10px] font-medium tracking-[0.08em] text-white/60 lowercase md:text-xs">
                    {exp.kind}
                  </span>
                </span>
                <span className="hidden text-sm text-white/50 sm:block md:text-base">
                  {exp.period}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className="flex size-8 shrink-0 items-center justify-center md:size-10"
                >
                  <Plus className="size-6 md:size-8" strokeWidth={1.5} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 30,
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pb-12">
                      <div className="flex w-full flex-col gap-6">
                        <ul className="marker:text-secondary flex list-disc flex-col gap-2.5 pl-5 text-lg leading-relaxed text-white/85 md:text-xl">
                          {exp.points.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-2.5">
                          {exp.tags.map((tag) => {
                            const tech = getTech(tag);

                            return (
                              <span
                                key={tag}
                                className="group/tag inline-flex items-center rounded-full bg-white/10 p-2.5 text-sm font-medium text-white/90 shadow-sm inset-shadow-2xs inset-shadow-white/10 backdrop-blur-sm transition-all duration-300 text-shadow-2xs hover:px-4 sm:text-base"
                              >
                                {tech && (
                                  <img
                                    src={tech.logo}
                                    alt=""
                                    aria-hidden
                                    className="size-5 shrink-0"
                                  />
                                )}
                                <span
                                  className={
                                    tech
                                      ? "max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover/tag:ml-2 group-hover/tag:max-w-[180px] group-hover/tag:opacity-100"
                                      : "px-1 whitespace-nowrap"
                                  }
                                >
                                  {tech?.label ?? tag}
                                </span>
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
