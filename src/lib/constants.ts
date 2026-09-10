import { assetUrl } from "./assets";

export const locationUrl =
  "https://earth.google.com/web/@22.58006218,88.3624072,29.07700058a,16012.63427221d,35y,294.87206119h,0t,0r/data=CgRCAggBOgMKATBCAggASg0I____________ARAA";

// the three hero showcase boxes. they share one continuous wave background
// (hero-bg.svg, sliced across the row) with project screenshots layered on top.
// `layout: "bottom"` sits a single screenshot flush against the box bottom;
// `layout: "split"` floats two screenshots (top-right + bottom-left).
// order here is right -> middle -> left because the row renders reversed.
// descriptions/urls/stacks mirror the projects section; titleLogo is filled in
// later — until then the overlay falls back to the project name.
// Hero screenshots are served from `public/` so the first viewport does not
// wait on R2. Logos and other assets still go through assetUrl().
export type HeroItem = {
  title: string;
  titleLogo: string;
  description: string;
  live: string;
  techStack: string[];
  layout: "bottom" | "split";
  screens: string[];
};

export const heroItems: HeroItem[] = [
  {
    title: "downthecove",
    titleLogo: assetUrl("/landing-images/downthecove-logo.svg"),
    description:
      "a bespoke ecommerce platform for a uk coastal brand — retail + wholesale, subscriptions, a custom admin, payload cms, and royal mail shipping.",
    live: "https://staging.fe.downthecove.com/",
    techStack: ["nextjs", "typescript", "postgresql", "stripe", "docker"],
    layout: "bottom",
    screens: ["/landing-images/hero-downthecove.png"],
  },
  {
    title: "moai",
    titleLogo: "",
    description:
      "a wip trading journal for active traders — imports broker executions, reconstructs trades, and surfaces pnl through dashboard & calendar analytics.",
    live: "",
    techStack: ["nextjs", "typescript", "postgresql", "prisma", "tailwindcss"],
    layout: "split",
    screens: [
      "/landing-images/hero-moai-1.png",
      "/landing-images/hero-moai-2.png",
    ],
  },
  {
    title: "hanabi",
    titleLogo: assetUrl("/landing-images/hanabi-logo.svg"),
    description:
      "a studio website for a design & development brand — services, work, the studio story, and a booking flow wrapped in a handcrafted visual identity.",
    live: "https://hanabi.works",
    techStack: ["nextjs", "typescript", "tailwindcss", "motion", "react"],
    layout: "bottom",
    screens: ["/landing-images/hero-hanabi.png"],
  },
];

export const techStackItems = {
  languages: [
    {
      id: 1,
      name: "typescript",
      icon: assetUrl("/logos/ts.png"),
    },
    {
      id: 2,
      name: "cpp",
      icon: assetUrl("/logos/c++.png"),
    },
    {
      id: 3,
      name: "js",
      icon: assetUrl("/logos/js.png"),
    },
  ],
  frontend: [
    {
      id: 1,
      name: "html",
      icon: assetUrl("/logos/html.png"),
    },
    {
      id: 2,
      name: "nextjs",
      icon: assetUrl("/logos/nextjs.png"),
    },
    {
      id: 3,
      name: "react",
      icon: assetUrl("/logos/react.png"),
    },
    {
      id: 4,
      name: "tailwindcss",
      icon: assetUrl("/logos/tailwindcss.png"),
    },
    {
      id: 5,
      name: "css",
      icon: assetUrl("/logos/css.png"),
    },
  ],
  backend: [
    {
      id: 1,
      name: "express",
      icon: assetUrl("/logos/express.png"),
    },
    {
      id: 2,
      name: "nodejs",
      icon: assetUrl("/logos/nodejs.png"),
    },
    {
      id: 3,
      name: "postgres",
      icon: assetUrl("/logos/postgresql.png"),
    },
  ],
  miscellaneous: [
    {
      id: 1,
      name: "github",
      icon: assetUrl("/logos/Github.png"),
    },
    {
      id: 2,
      name: "docker",
      icon: assetUrl("/logos/docker.png"),
    },
    {
      id: 3,
      name: "git",
      icon: assetUrl("/logos/git.png"),
    },
  ],
};

export const projects = [
  {
    id: "0001",
    name: "pdx",
    tags: ["typescript", "nextjs", "gemini", "bullmq", "authjs", "postgresql"],
    description: `Generates study material pdfs (theory/qna) with AI from syllabus - can exceed 100 pages of content, in one click.
      • Worker backend with Puppeteer (for generating PDFs) and Docker for easy deployment
      • Generates study materials in a redis queue system and Bullmq workers
      • AI-powered content generation with comprehensive study materials`,
    live: "https://usepdx.tech",
    github: "https://github.com/dey11/pdx",
    image: assetUrl("/projects/pdx.png"),
    createdAt: "2025",
  },
  {
    id: "0010",
    name: "ballarat box sports landing",
    tags: ["typescript", "nextjs", "tailwindcss", "framer-motion"],
    description: `A landing page for an indoor sports facility in ballarat. a freelance project.
      • Clean, modern design showcasing agency work
      • Custom animations and micro-interactions throughout
      • Built from scratch without heavy dependencies`,
    live: "https://ballaratsports.vercel.app",
    github: "https://github.com/dey11/ballarat",
    image: assetUrl("/projects/ballarat.png"),
    createdAt: "2025",
  },
  {
    id: "0011",
    name: "voice ai agent landing",
    tags: ["typescript", "nextjs", "tailwindcss", "framer-motion"],
    description: `A landing page for a real estate voice ai agent. a freelance project.
      • Clean, modern design showcasing agency work
      • Custom animations and micro-interactions throughout
      • Built from scratch without heavy dependencies`,
    live: "https://doublesalesai.vercel.app",
    // github: "https://github.com/dey11/ballarat",
    image: assetUrl("/projects/doublesalesai.png"),
    createdAt: "2025",
  },
  {
    id: "0011",
    name: "venturassist",
    tags: [
      "typescript",
      "nextjs",
      "tailwindcss",
      "better-auth",
      "prisma",
      "postgresql",
      "bullmq",
      "ai sdk",
    ],
    description: `AI-powered platform for automating and enhancing VC due diligence, risk assessment, and competitive analysis.
      • Multi-agent system processes pitch decks and documents for deep insights and risk scoring
      • RedLens agent delivers forensic, market, talent, and contrarian risk analysis
      • Automated competitor discovery, market positioning, and interactive chat for real-time insights`,
    live: "https://venturassist.xyz",
    github: "https://github.com/dey11/VenturAssist",
    image: assetUrl("/projects/venturassist.png"),
    createdAt: "2025",
  },
  {
    id: "0100",
    name: "wabisabi",
    tags: ["typescript", "nextjs", "tailwind", "framer-motion", "shadcn"],
    description: `A design agency's portfolio site with micro-interactions and animations.
      • Clean, modern design showcasing agency work
      • Custom animations and micro-interactions throughout
      • Built from scratch without heavy dependencies`,
    live: "https://wabisabi.agency",
    github: "https://github.com/dey11/wabisabi-agency",
    image: assetUrl("/landing-images/wabisabi.png"),
    createdAt: "2025",
  },
  {
    id: "0101",
    name: "clarityhub",
    tags: ["typescript", "nextjs", "gemini", "tailwindcss", "clerk", "prisma"],
    description: `Generates roadmaps and quizzes using AI for learning purposes.
      • AI-powered roadmap generation for structured learning paths
      • Interactive quizzes with intelligent question generation
      • User authentication and progress tracking`,
    live: "https://clarityhub.vercel.app",
    github: "https://github.com/dey11/clarity-hub",
    image: assetUrl("/projects/clarityhub.png"),
    createdAt: "2025",
  },
  {
    id: "0110",
    name: "real estate agent",
    tags: ["typescript", "nextjs", "tailwind", "gemini", "pinecone"],
    description: `A voice-based chatbot for real estate sales and property information.
      • Voice-based interaction using Gemini Live API
      • RAG system with 100 dummy property data through tool calling
      • Real-time streaming voice API through websockets`,
    live: "https://convoagent.vercel.app/",
    github: "https://github.com/Dey11/gemini-conversational-agent",
    image: assetUrl("/projects/realestate.png"),
    createdAt: "2025",
  },
  {
    id: "0111",
    name: "tinder scraper",
    tags: ["typescript", "nextjs", "nodejs", "express", "postgresql", "prisma"],
    description: `Reverse engineered Tinder API for educational profile scraping.
      • Fuzzy match names from scraped Tinder profiles
      • Image matching using vector embeddings with Pinecone
      • Location-based scraping with 7-day caching mechanism`,
    live: null,
    github: "https://github.com/Dey11/Tinder-scraper",
    image: assetUrl("/projects/placeholder.png"),
    createdAt: "2025",
  },
  {
    id: "1000",
    name: "drites",
    tags: ["typescript", "nextjs", "prisma", "postgresql", "clerk"],
    description: `A personal blogging platform with markdown support.
      • Markdown-based content creation and editing
      • User authentication and authorization
      • Clean, minimalist design for reading experience`,
    live: "https://www.drites.site",
    github: "https://github.com/dey11/drites",
    image: assetUrl("/projects/drites.png"),
    createdAt: "2025",
  },
  {
    id: "1001",
    name: "ai chat website",
    tags: [
      "typescript",
      "nextjs",
      "gemini",
      "tailwindcss",
      "shadcn",
      "zustand",
    ],
    description: `Simple 1-page implementation of an AI Chat application.
      • Multiple chat session management (create, select, delete)
      • Persistent storage using Zustand persistence
      • Auto-generated chat titles based on conversation content`,
    live: "https://chatappui.vercel.app",
    github: "https://github.com/dey11/chatappui",
    image: assetUrl("/projects/aichat.png"),
    createdAt: "2025",
  },
  {
    id: "1011",
    name: "dashboard analytics ui",
    tags: ["reactjs", "charts", "tailwindcss"],
    description: `Comprehensive dashboard interface with data visualization.
      • Interactive charts and statistics visualization
      • User management and custom sidebar navigation
      • Designed for desktop screens (1200px+)`,
    live: "https://dey-dashboard.vercel.app",
    github: "https://github.com/Dey11/dashboard-analytics-ui",
    image: assetUrl("/projects/dashboard.png"),
    createdAt: "2025",
  },
  {
    id: "1100",
    name: "chat backend socketio",
    tags: ["nodejs", "socketio", "redis", "jwt", "mongodb", "docker"],
    description: `Real-time chat system backend with authentication and rate limiting.
      • User authentication with JWT and bcrypt password hashing
      • Real-time messaging with Socket.io authentication
      • Rate limiting and caching with Redis, Docker containerization`,
    live: null,
    github: "https://github.com/Dey11/Chat-System-Backend-with-Socketio",
    image: assetUrl("/projects/placeholder.png"),
    createdAt: "2025",
  },
  {
    id: "1101",
    name: "yunami discord bot",
    tags: ["discordjs", "mongodb", "cron"],
    description: `Discord bot for tracking currencies in Anigame discord game.
      • Automated currency tracking and notifications
      • Used by 200+ users daily before shutdown
      • Scheduled tasks with cron jobs for regular updates`,
    live: null,
    github: "https://github.com/Dey11/yunami",
    image: assetUrl("/projects/placeholder.png"),
    createdAt: "2023",
  },
];
