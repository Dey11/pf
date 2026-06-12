// svgl.app logos (baked to render on a dark pill), with a display label.
// shared by the experience section and the project popup.
export const techMeta = {
  nextjs: { label: "Next.js", logo: "/logos/stack/nextjs.svg" },
  typescript: { label: "TypeScript", logo: "/logos/stack/typescript.svg" },
  postgresql: { label: "PostgreSQL", logo: "/logos/stack/postgresql.svg" },
  react: { label: "React", logo: "/logos/stack/react.svg" },
  tailwindcss: { label: "Tailwind CSS", logo: "/logos/stack/tailwindcss.svg" },
  motion: { label: "Motion", logo: "/logos/stack/motion.svg" },
  stripe: { label: "Stripe", logo: "/logos/stack/stripe.svg" },
  websockets: { label: "WebSockets", logo: "/logos/stack/socketio.svg" },
  aisdk: { label: "AI SDK", logo: "/logos/stack/vercel.svg" },
  prisma: { label: "Prisma", logo: "/logos/stack/prisma.svg" },
  docker: { label: "Docker", logo: "/logos/stack/docker.svg" },
} as const;

export type TechKey = keyof typeof techMeta;
