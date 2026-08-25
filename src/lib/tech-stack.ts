import { assetUrl } from "./assets";

// svgl.app logos (baked to render on a dark pill), with a display label.
// shared by the experience section and the project popup.
export const techMeta = {
  nextjs: { label: "Next.js", logo: assetUrl("/logos/stack/nextjs.svg") },
  typescript: {
    label: "TypeScript",
    logo: assetUrl("/logos/stack/typescript.svg"),
  },
  postgresql: {
    label: "PostgreSQL",
    logo: assetUrl("/logos/stack/postgresql.svg"),
  },
  react: { label: "React", logo: assetUrl("/logos/stack/react.svg") },
  tailwindcss: {
    label: "Tailwind CSS",
    logo: assetUrl("/logos/stack/tailwindcss.svg"),
  },
  motion: { label: "Motion", logo: assetUrl("/logos/stack/motion.svg") },
  stripe: { label: "Stripe", logo: assetUrl("/logos/stack/stripe.svg") },
  websockets: {
    label: "WebSockets",
    logo: assetUrl("/logos/stack/socketio.svg"),
  },
  aisdk: { label: "AI SDK", logo: assetUrl("/logos/stack/vercel.svg") },
  prisma: { label: "Prisma", logo: assetUrl("/logos/stack/prisma.svg") },
  docker: { label: "Docker", logo: assetUrl("/logos/stack/docker.svg") },
  supabase: { label: "Supabase", logo: assetUrl("/logos/stack/supabase.svg") },
  elevenlabs: {
    label: "ElevenLabs",
    logo: assetUrl("/logos/stack/elevenlabs.svg"),
  },
  resend: { label: "Resend", logo: assetUrl("/logos/stack/resend.svg") },
  redis: { label: "Redis", logo: assetUrl("/logos/stack/redis.svg") },
  tanstackquery: {
    label: "TanStack Query",
    logo: assetUrl("/logos/stack/tanstack.svg"),
  },
  woocommerce: {
    label: "WooCommerce",
    logo: assetUrl("/logos/stack/woocommerce.svg"),
  },
  python: { label: "Python", logo: assetUrl("/logos/stack/python.svg") },
  zod: { label: "Zod", logo: assetUrl("/logos/stack/zod.svg") },
} as const;

export type TechKey = keyof typeof techMeta;
