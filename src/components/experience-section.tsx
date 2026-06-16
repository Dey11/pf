"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { techMeta, type TechKey } from "@/lib/tech-stack";

type Experience = {
  role: string;
  period: string;
  description: string;
  tags: TechKey[];
  images: [string, string];
};

const experiences: Experience[] = [
  {
    role: "fullstack web developer – freelance",
    period: "2024",
    description:
      "Developed a full-featured streaming platform, handling all aspects of the web application from backend to frontend, with a focus on seamless user experience and robust content delivery. Implemented secure authentication, scalable infrastructure, and custom video player integrations, delivering a performant, end-to-end solution for high-traffic media consumption.",
    tags: ["nextjs", "typescript", "postgresql"],
    images: ["/projects/vidbox.png", "/projects/dashboard.png"],
  },
  {
    role: "frontend web developer – freelance",
    period: "2024",
    description:
      "Designed and built interactive crate-opening animations and UI for a gaming rewards platform, inspired by popular digital marketplaces. Leveraged React and advanced CSS/JS animation techniques to create engaging, responsive user flows that enhanced user engagement and retention through visually compelling frontend experiences.",
    tags: ["react", "tailwindcss", "motion"],
    images: ["/projects/clarityhub.png", "/projects/realestate.png"],
  },
  {
    role: "fullstack web developer – freelance",
    period: "2025",
    description:
      "Developed and launched Ballarat Sports, a comprehensive booking and management platform for an Australian indoor sports facility. Built landing pages, integrated CRM and Stripe for seamless customer bookings and payments, and architected scalable backend services that enabled automated scheduling and payments, improving operational efficiency and customer satisfaction.",
    tags: ["nextjs", "stripe", "postgresql"],
    images: ["/projects/ballarat.png", "/projects/realestate.png"],
  },
  {
    role: "fullstack web developer",
    period: "2025",
    description:
      "Contributed to frontend React components, focusing on onboarding flows, bulk password reset features, and RBAC role management. Collaborated on UI/UX improvements and platform stability initiatives, addressing bugs and enhancing user experience to support platform reliability and usability through targeted feature enhancements and maintenance.",
    tags: ["react", "typescript", "tailwindcss"],
    images: ["/projects/clarityhub.png", "/projects/dashboard.png"],
  },
  {
    role: "fullstack web developer – freelance",
    period: "2025",
    description:
      "Building an AI-powered collaborative whiteboard application for a stealth startup, enabling real-time visual ideation and smart drawing assistance. Integrated intelligent shape recognition, seamless multi-user collaboration, and dynamic canvas scaling for a smooth user experience, delivering a novel platform for teams and individuals to co-create and brainstorm more effectively with the help of generative AI.",
    tags: ["nextjs", "websockets", "aisdk"],
    images: ["/projects/aichat.png", "/projects/doublesalesai.png"],
  },
  {
    role: "fullstack web developer – freelance",
    period: "present",
    description:
      "Building a trade journal application for stock traders, providing tools for strategy tracking, analytics, and note-taking. Designed and implemented a rich text editor, data visualization dashboards, and secure user authentication that empowered traders to analyze and refine strategies, supporting better decision-making and learning.",
    tags: ["nextjs", "typescript", "prisma"],
    images: ["/projects/dashboard.png", "/projects/venturassist.png"],
  },
  {
    role: "fullstack web developer – freelance",
    period: "present",
    description:
      "Building a scalable ecommerce application, with DevOps to optimize the deployment, logging and monitoring. Focused on enabling a smooth, reliable, and scalable platform for high-volume e-commerce operations.",
    tags: ["nextjs", "docker", "postgresql"],
    images: ["/projects/realestate.png", "/projects/drites.png"],
  },
];

const imagePositions = [
  { className: "left-[6%] top-6 z-10 w-[62%]", rotate: -6 },
  { className: "bottom-0 right-[6%] w-[62%]", rotate: 6 },
] as const;

export default function ExperienceSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
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
          const number = (index + 1).toString(2).padStart(3, "0");

          return (
            <motion.div
              key={index}
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
                <h3 className="grow text-xl font-semibold md:text-3xl lg:text-4xl">
                  {exp.role}
                  <span className="text-secondary">.</span>
                </h3>
                <span className="hidden text-sm text-white/50 sm:block md:text-base">
                  {exp.period}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
                    transition={{ type: "spring", stiffness: 200, damping: 30 }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-8 pb-12 lg:grid-cols-2">
                      <div className="flex flex-col gap-6">
                        <p className="text-lg leading-relaxed text-white/85 md:text-xl">
                          {exp.description}
                        </p>

                        <div className="flex flex-wrap gap-2.5">
                          {exp.tags.map((tag) => {
                            const tech = techMeta[tag];
                            return (
                              <span
                                key={tag}
                                className="group/tag inline-flex items-center rounded-full bg-white/10 p-2.5 text-sm font-medium text-white/90 shadow-sm inset-shadow-2xs inset-shadow-white/10 backdrop-blur-sm transition-all duration-300 text-shadow-2xs hover:px-4 sm:text-base"
                              >
                                <img
                                  src={tech.logo}
                                  alt=""
                                  aria-hidden
                                  className="size-5 shrink-0"
                                />
                                <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover/tag:ml-2 group-hover/tag:max-w-[160px] group-hover/tag:opacity-100">
                                  {tech.label}
                                </span>
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      <div className="relative mx-auto min-h-[240px] w-full max-w-sm lg:max-w-md">
                        {exp.images.map((src, imageIndex) => {
                          const pos = imagePositions[imageIndex];
                          return (
                            <motion.img
                              key={src}
                              src={src}
                              alt={`${exp.role} preview`}
                              initial={{
                                y: 90,
                                opacity: 0,
                                rotate: pos.rotate,
                              }}
                              animate={{ y: 0, opacity: 1, rotate: pos.rotate }}
                              transition={{
                                type: "spring",
                                stiffness: 180,
                                damping: 22,
                                delay: 0.12 + imageIndex * 0.12,
                              }}
                              className={`absolute rounded-xl border border-white/10 shadow-2xl ${pos.className}`}
                            />
                          );
                        })}
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
