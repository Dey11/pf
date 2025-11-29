export const locationUrl =
  "https://earth.google.com/web/@22.58006218,88.3624072,29.07700058a,16012.63427221d,35y,294.87206119h,0t,0r/data=CgRCAggBOgMKATBCAggASg0I____________ARAA";

export const heroItems = [
  {
    title: "pdx",
    titleLogo: "/landing-images/pdx-logo.png",
    imageUrl: "/landing-images/pdx.png",
    description:
      "a website that generates end to end study materials (theory/question banks) with ai, often a 100 page pdf.",
    live: "https://usepdx.tech",
    github: "https://github.com/dey11/pdx",
    techStack: [
      "nextjs",
      "tailwindcss",
      "typescript",
      "dodopayments",
      "upstash",
      "gemini",
      "vercel",
      "docker",
      "bullmq",
    ],
    readMore: "/projects#pdx",
  },
  {
    title: "wabisabi design agency",
    titleLogo: "/landing-images/wabisabi-logo.png",
    imageUrl: "/landing-images/wabisabi.png",
    description:
      "a website for a design agency. it's a simple, clean, and modern website that showcases the agency's work. includes micro-interactions.",
    live: "https://wabisabi.agency",
    github: "https://github.com/dey11/wabisabi-agency",
    techStack: ["typescript", "nextjs", "tailwind", "framer-motion"],
    readMore: "/projects#wabisabi",
  },
  // {
  //   title: "drites",
  //   titleLogo: "/landing-images/drites-logo.png",
  //   imageUrl: "/landing-images/drites.png",
  //   description: "a simple blogging platform.",
  //   live: "https://drites.site",
  //   github: "https://github.com/dey11/drites",
  //   techStack: ["typescript", "nextjs", "prisma", "postgresql", "clerk"],
  //   readMore: "/projects#drites",
  // },
  {
    title: "ballarat box sports landing",
    titleLogo: "/landing-images/ballarat-logo.png",
    imageUrl: "/landing-images/ballarat.png",
    description:
      "a landing page for an indoor sports facility in ballarat. a freelance project.",
    live: "https://ballaratsports.vercel.app",
    github: "https://github.com/dey11/ballarat",
    techStack: ["nextjs", "tailwindcss", "typescript", "framer-motion"],
    readMore: "/projects#ballarat",
  },
];

export const techStackItems = {
  languages: [
    {
      id: 1,
      name: "typescript",
      icon: "/logos/ts.png",
    },
    {
      id: 2,
      name: "cpp",
      icon: "/logos/c++.png",
    },
    {
      id: 3,
      name: "javascript",
      icon: "/logos/js.png",
    },
  ],
  frontend: [
    {
      id: 1,
      name: "html",
      icon: "/logos/html.png",
    },
    {
      id: 2,
      name: "nextjs",
      icon: "/logos/nextjs.png",
    },
    {
      id: 3,
      name: "react",
      icon: "/logos/react.png",
    },
    {
      id: 4,
      name: "tailwindcss",
      icon: "/logos/tailwindcss.png",
    },
    {
      id: 5,
      name: "css",
      icon: "/logos/css.png",
    },
  ],
  backend: [
    {
      id: 1,
      name: "express",
      icon: "/logos/express.png",
    },
    {
      id: 2,
      name: "nodejs",
      icon: "/logos/nodejs.png",
    },
    {
      id: 3,
      name: "postgresql",
      icon: "/logos/postgresql.png",
    },
  ],
  miscellaneous: [
    {
      id: 1,
      name: "github",
      icon: "/logos/Github.png",
    },
    {
      id: 2,
      name: "docker",
      icon: "/logos/docker.png",
    },
    {
      id: 3,
      name: "git",
      icon: "/logos/git.png",
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
    image: "/projects/pdx.png",
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
    image: "/projects/ballarat.png",
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
    image: "/projects/venturassist.png",
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
    image: "/landing-images/wabisabi.png",
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
    image: "/projects/clarityhub.png",
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
    image: "/projects/realestate.png",
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
    image: "/projects/placeholder.png",
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
    image: "/projects/drites.png",
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
    image: "/projects/aichat.png",
    createdAt: "2025",
  },
  {
    id: "1010",
    name: "vidbox",
    tags: ["typescript", "nextjs", "postgresql"],
    description: `Movie and series streaming platform (freelance project).
      • Comprehensive media streaming functionality
      • User-friendly interface for content discovery
      • Database-driven content management`,
    live: "https://vidbox.cc",
    github: null,
    image: "/projects/vidbox.png",
    createdAt: "2024",
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
    image: "/projects/dashboard.png",
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
    image: "/projects/placeholder.png",
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
    image: "/projects/placeholder.png",
    createdAt: "2023",
  },
];
