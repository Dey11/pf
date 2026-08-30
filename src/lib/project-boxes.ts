import { assetUrl } from "./assets";

export type ProjectImage =
  | string
  | {
      src: string;
      width: number;
      height: number;
    };

export type ProjectBox = {
  id: string;
  color: string;
  foreground?: "dark" | "light";
  name: string;
  tagline: string;
  description: string;
  content: string;
  url: string;
  github: string | null;
  tags: string[];
  type: string;
  status: "Live" | "Archived" | "WIP" | "In progress";
  duration: string;
  year: string;
  images: ProjectImage[];
  // peeking thumbnail shown on the bento card. defaults to images[0] when
  // omitted; set it explicitly to use a different screenshot.
  thumbnail?: string;
};

/** Returns the URL for either a standard screenshot or a natural-ratio image. */
export function projectImageSource(image: ProjectImage): string {
  return typeof image === "string" ? image : image.src;
}

// stable url-friendly slug for a project, e.g. "project-18-downthecove" ->
// "downthecove". used for deep-link hashes (#downthecove-project) and to match
// a hero box to its bento card for the click-to-highlight interaction.
export function projectSlug(box: ProjectBox): string {
  return box.id.replace(/^project-\d+-/, "");
}

export const projectBoxesByInventoryId: Record<number, ProjectBox> = {
  1: {
    id: "project-01-pdx",
    color: "bg-[#F4C651]",
    name: "pdx",
    tagline: "free byok study-material generation with async pdf delivery",
    description:
      "A free BYOK study-material platform that turns a syllabus into structured PDFs through user-selected OpenAI-compatible providers, background workers, and durable download history.",
    content: `## Overview

PDX is a free BYOK study-material generator. You connect an OpenAI-compatible provider, paste a syllabus, review the proposed topics, and let background workers produce and combine the final PDF. PDX does not sell credits or provide a paid AI plan.

## Architecture

The product uses Next.js 16, React 19, TypeScript, Tailwind, Prisma/Postgres, Better Auth, BullMQ/Redis, Cloudflare R2, the AI SDK, Puppeteer/Chromium, Resend, Bun, and Docker Compose on Coolify. The web app owns the public pages, email/password and social authentication, BYOK settings, dashboard, history, generation APIs, and worker callbacks. The worker resolves each user's encrypted provider credential through an authenticated server callback, calls the selected model, renders topic PDFs, stores them in R2, and combines them into the final material.

## What I built

- Email/password, GitHub, and Google authentication
- Encrypted BYOK settings for OpenAI-compatible providers and editable model IDs
- Topic planning and review before final generation
- Theory-note and question-bank generation workflows
- Topic-level task tracking with progress, partial outputs, merged PDFs, and signed downloads
- BullMQ fan-out workers for provider calls, PDF rendering, upload, merge, and completion aggregation
- Cloudflare R2 storage with signed application downloads
- A production Compose stack with migration, Redis, web, and worker roles backed by Neon Postgres
- A restored pricing page that explains the free BYOK model without active purchases

## Role and decisions

I built PDX as a full-stack product and treated generation as a durable workflow instead of a long HTTP request. Provider keys never enter browser responses, queue payloads, logs, or generated documents. The web process decrypts a key only when the worker requests it for an active material. Deterministic queue jobs, task-level callbacks, and R2-backed artifacts make retries and progress tracking explicit.

## Demo material

[View or download the 101-page Computer Networks study guide](${assetUrl("/projects/pdx/computer-networks-study-guide-v1.pdf")})`,
    url: "https://pdx.sdey.me",
    github: "https://github.com/dey11/pdx",
    tags: ["nextjs", "typescript", "postgresql", "prisma", "aisdk", "docker"],
    type: "Personal",
    status: "Live",
    duration: "Product build and BYOK relaunch",
    year: "2025-2026",
    images: [
      assetUrl("/projects/pdx/landing-v1.png"),
      assetUrl("/projects/pdx/dashboard-v1.png"),
      assetUrl("/projects/pdx/generate-theory-v1.png"),
      assetUrl("/projects/pdx/byok-settings-v1.png"),
      assetUrl("/projects/pdx/materials-v1.png"),
      assetUrl("/projects/pdx/pricing-byok-v1.png"),
      assetUrl("/projects/pdx/computer-networks-output-v1.png"),
    ],
  },
  2: {
    id: "project-02-ballarat",
    color: "bg-[#36C279]",
    name: "ballarat box sports",
    tagline:
      "local sports venue website with seo, pricing, rules, and lead capture",
    description:
      "A client-facing website for a 24/7 indoor box sports facility covering futsal, AFL, and cricket, built to explain the venue clearly and convert visitors into enquiries.",
    content: `## Overview

Ballarat Box Sports is a launch and conversion site for a physical sports venue. The site explains the facility, the sports formats, rules, pricing, location, contact paths, and launch-interest flow for visitors who may not know the venue yet.

## Architecture

The repo is a Next.js 15 App Router marketing site with TypeScript, Tailwind, Vercel Analytics, local constants for SEO/social/contact, schema.org SportsActivityLocation JSON-LD, route groups for public pages, and a Zod-validated server action for the launch-interest form. Most content is intentionally static because the product needed fast SEO-friendly pages before a booking backend existed.

## What I built

- First-viewport hero for the 24/7 Ballarat sports facility
- Sport sections for Box Cricket, Futsal, and Box AFL with capacity and imagery
- Feature sections for digital scoreboards, instant replay, social matching, equipment, WhatsApp community, and smart-access-code messaging
- Pricing page for knockout tournaments, casual play, and competitive leagues
- Sportsbook/rulebook page with collapsible rules for Cricket, Futsal, and AFL
- PDF download affordance for rules
- Launch-interest contact form with selectable sports, preferred formats, update opt-in, and Zod validation
- SEO metadata, Open Graph details, sitemap/robots coverage, and local-business structured data

## Role and decisions

This was freelance client work. I optimized for a launch-stage local business: fast static pages, clear pricing/rules, local SEO, mobile readability, and simple lead capture. The server action currently validates and logs interest data, so I would not claim a finished CRM or booking integration from this code alone.`,
    url: "https://ballaratsports.vercel.app/",
    github: "https://github.com/dey11/ballarat",
    tags: ["nextjs", "typescript", "tailwindcss", "react", "motion"],
    type: "Freelance",
    status: "Live",
    duration: "Client build",
    year: "2025",
    images: [
      assetUrl("/projects/external/hanabi-ballarat-1.png"),
      assetUrl("/projects/external/hanabi-ballarat-2.png"),
      assetUrl("/projects/external/ballarat-site-sports.webp"),
      assetUrl("/projects/external/ballarat-site-features.webp"),
      assetUrl("/projects/external/ballarat-site-formats.webp"),
      assetUrl("/projects/external/ballarat-site-about.webp"),
      assetUrl("/projects/external/ballarat-site-contact.webp"),
      assetUrl("/projects/external/ballarat-site-pricing.webp"),
      assetUrl("/projects/external/hanabi-ballarat-3.png"),
    ],
  },
  4: {
    id: "project-04-venturassist",
    color: "bg-[#246B8B]",
    foreground: "light",
    name: "venturassist",
    tagline: "ai venture-capital analysis from decks, documents, and chat",
    description:
      "An AI-powered venture capital analysis platform that ingests startup documents, extracts structured company data, runs risk analysis, researches competitors, and supports chat over the investment dossier.",
    content: `## Overview

VenturAssist turns startup decks and documents into an investment-analysis workspace. It extracts structured company information, runs risk and competitor analysis, and lets users chat with the resulting dossier.

## Architecture

The system uses Next.js, React, TypeScript, Tailwind, Prisma/Postgres, Better Auth, BullMQ workers, Cloudflare R2 signed uploads, Gemini 2.5 Flash, AI SDK structured outputs, Zod, and document parsers for PDF, PPTX, and DOCX. Central Startup records connect uploaded data sources, async jobs, extracted metrics, risks, RedLens assessments, competitor analysis, benchmarks, and chat history. The ingestion worker parses source content, runs analysis, stores structured findings, then chains RedLens and competitor jobs.

## What I built

- Startup workspace and document upload flow
- Signed object-storage upload path for pitch decks and source files
- Data-source ingestion jobs for PDF, DOCX, PPTX, and text-like inputs
- Startup workspace model for source files, team, metrics, markets, risks, and benchmarks
- Multi-agent analysis pipeline across ingestion, RedLens risk assessment, and competitor intelligence
- Structured AI extraction into persistent startup records
- Web-search-enhanced risk and competitor analysis through Gemini tooling
- Dashboard surfaces for extracted company data
- Interactive VC chat that can query facts, metrics, risks, competitors, benchmarks, jobs, and uploaded sources

## Role and decisions

This was built in a hackathon/team context, and the repo credits me as Lead Developer & System Architecture. I approached it as an analyst workflow instead of a generic chatbot because diligence needs repeatable structure: uploaded documents become typed data, typed data feeds analysis, and chat becomes a way to query the dossier rather than the only source of truth. Async workers keep slow parsing and chained AI jobs away from the interactive routes.`,
    url: "https://venturassist.xyz",
    github: "https://github.com/dey11/VenturAssist",
    tags: [
      "nextjs",
      "typescript",
      "postgresql",
      "prisma",
      "aisdk",
      "tailwindcss",
    ],
    type: "Personal",
    status: "Live",
    duration: "Hackathon build",
    year: "2025",
    images: [assetUrl("/projects/venturassist.png")],
  },
  5: {
    id: "project-05-wabisabi",
    color: "bg-[#EDD1E3]",
    name: "wabisabi",
    tagline:
      "design-agency portfolio with galleries, services, and motion-heavy browsing",
    description:
      "A visual portfolio and services website for a design agency, built around image-heavy work discovery, smooth browsing, responsive galleries, and a brand-specific frontend feel.",
    content: `## Overview

WabiSabi is a front-office site for a design agency. The product goal was to make the agency's banners, logos, VIP packs, headers, and emotes easy to browse while keeping the experience visual, animated, and brand-specific.

## Architecture

The app uses Next.js 15 App Router, React, TypeScript, Tailwind, shadcn-style primitives, Motion, Lucide, Next fonts, theme persistence, React view transitions, cursor effects, local constants, and many external Cloudinary portfolio assets. Routes cover the home page, services, works, feedbacks, and contact.

## What I built

- Animated home page with social tiles, hero artwork, and responsive desktop/mobile copy
- Services gallery with filters for Banner, Logo, VIP Packs, Header, and Emote work
- Desktop carousel and mobile animated panel for service browsing
- Keyboard arrow navigation for gallery movement
- Fullscreen lightbox for image inspection
- Works page with service filters and an infinite horizontal motion carousel
- Feedback page with randomized testimonial selection and shuffle interaction
- Contact/founder page with Discord, Instagram, and Behance calls to action

## Role and decisions

This was freelance frontend work for a visual agency. I kept the project as a fast, static portfolio surface because the repo only supports portfolio browsing and contact paths; payment, booking, dynamic pricing, and admin surfaces are listed as future work and should not be claimed as already built. The interaction work exists to make the agency's visual output feel central rather than hidden inside generic cards.`,
    url: "https://wabisabi.pics",
    github: "https://github.com/dey11/wabisabi-agency",
    tags: ["nextjs", "typescript", "tailwindcss", "motion", "react"],
    type: "Freelance",
    status: "Live",
    duration: "Agency site",
    year: "2025",
    images: [
      assetUrl("/projects/external/hanabi-wabisabi-1.png"),
      assetUrl("/projects/external/hanabi-wabisabi-2.png"),
      assetUrl("/projects/external/hanabi-wabisabi-3.png"),
    ],
    thumbnail: assetUrl("/projects/external/hanabi-wabisabi-1.png"),
  },
  8: {
    id: "project-08-tinder-scraper",
    color: "bg-[#fde1ea]",
    name: "tinder scraper",
    tagline:
      "async profile indexing with scraping, fuzzy search, vectors, and storage",
    description:
      "A backend-heavy assignment where a user submits identity and location inputs, the system indexes nearby profiles, stores images, creates embeddings, and returns fuzzy plus image-similarity matches.",
    content: `## Overview

This is a reverse-engineering and search-systems project around Tinder profile discovery. A user submits a name, age, location, and photo URL; the backend creates an async job that indexes nearby profiles and returns both name-based and image-similarity matches.

## Architecture

The system is split into an Express/TypeScript backend and a Next.js frontend. The backend exposes APIs under /api/v1, creates search jobs with 202 responses, geocodes target locations with Mapbox, checks recently indexed locations, changes Tinder location, scrapes recommendations, stores images in Cloudflare R2, generates Replicate CLIP embeddings, indexes vectors in Pinecone, and combines Fuse.js fuzzy search with Pinecone similarity search. Prisma/Postgres stores search logs, profiles, indexed locations, image keys, and job state.

## What I built

- Async profile-search job API with history and status endpoints
- Location-aware Tinder indexing with seven-day recency checks and 100km proximity reuse
- Tinder profile dedupe by external Tinder profile ID
- R2 image ingestion under deterministic face-image keys
- Replicate CLIP embedding generation for profile and query images
- Pinecone vector indexing and cosine similarity search
- Fuse.js fuzzy name matching
- Frontend form that submits search details and polls job results every five seconds
- Result cards for name matches and visual matches with scores

## Role and decisions

This was a solo take-home style systems project. I separated controllers, services, storage, embedding, search, and persistence because scraping and indexing are long-running side effects. The job model keeps requests responsive while still giving the frontend trackable progress and repeatable result retrieval.`,
    url: "",
    github: "https://github.com/Dey11/Tinder-scraper",
    tags: ["nextjs", "typescript", "postgresql", "prisma", "aisdk", "docker"],
    type: "Take-home",
    status: "Archived",
    duration: "Assignment",
    year: "2025",
    images: [assetUrl("/projects/external/tinder-architecture.png")],
  },
  13: {
    id: "project-13-chat-backend",
    color: "bg-[#e6dbff]",
    name: "chat backend socketio",
    tagline:
      "real-time chat backend with auth, sockets, mongodb, redis, and rate limits",
    description:
      "A real-time chat backend with REST message APIs, Socket.IO events, JWT authentication, MongoDB persistence, Redis caching, rate limiting, and Dockerized local infrastructure.",
    content: `## Overview

This is a message-submission and retrieval backend that supports both REST and Socket.IO clients. It covers authentication, message persistence, recent-message caching, rate limiting, and local infrastructure.

## Architecture

The backend uses Express, an HTTP server, Socket.IO, TypeScript, MongoDB/Mongoose for durable users/messages, Redis as a singleton service for recent-message caching and per-user fixed-window rate limiting, JWT auth shared across REST middleware and Socket.IO handshake auth, Joi validation, bcrypt password hashing, and Docker Compose for Mongo, Redis, mongo-express, and the backend service.

## What I built

- User registration and login with bcrypt password hashing
- JWT authentication middleware for REST routes
- Socket.IO handshake authentication
- Authenticated REST POST /api/messages and GET /api/messages behavior
- Authenticated Socket.IO message event handling
- Redis-backed five-requests-per-ten-seconds per-user rate limit
- Redis cache for the ten most recent messages
- MongoDB fallback query with sender population when cache is insufficient
- Message validation with a 500-character cap
- Dockerized local stack for API, Redis, MongoDB, and mongo-express

## Role and decisions

This was a solo backend systems/API assignment. Redis is used where low-latency shared state matters: rate limits and recent-message reads. Mongo remains the durable store. Keeping REST and Socket.IO on the same auth, validation, cache, and persistence concepts made the service easier to reason about across realtime and HTTP clients.`,
    url: "",
    github: "https://github.com/Dey11/Chat-System-Backend-with-Socketio",
    tags: ["typescript", "websockets", "docker"],
    type: "Take-home",
    status: "Archived",
    duration: "Assignment",
    year: "2025",
    images: [],
  },
  14: {
    id: "project-14-yunami",
    color: "bg-[#e7e0d6]",
    name: "yunami discord bot",
    tagline:
      "discord community bot for clan registration, donations, and leaderboards",
    description:
      "A Discord utility bot for Anigame clan donation tracking, with clan registration, member joins, donation parsing, leaderboards, admin adjustments, and moderation utilities.",
    content: `## Overview

Yunami is a Discord community automation bot for Anigame clan donation tracking. It turns Discord slash commands and third-party bot embed messages into persistent clan, user, and donation state.

## Architecture

The bot uses Node.js, discord.js v14, dynamic command and event loading, global/guild slash-command deployment, MongoDB Atlas through Mongoose, clan and user models, pagination for tracker output, mathjs for utility calculation, and JSON-backed configuration for automod toggles.

## What I built

- Dynamic slash-command registry split across command folders
- Clan registration that generates a six-character clan key and DMs it to the leader
- User registration through clan keys
- Donation parsing from Anigame cl donate embed content
- Persistent weekly and total donation tracking in MongoDB
- Paginated weekly tracker sorted by donation totals
- Admin commands to add gold, reduce weekly totals, remove users, set roles, and configure donation requirements
- Automod toggle that can delete raid-filter command messages
- Utility calculation command using Math.js

## Role and decisions

This was a personal/community bot project. The architecture is event-driven because the workflow lives inside Discord: slash commands gather intent, message events observe third-party bot output, and Mongo persists clan state across server activity. The practical constraint was parsing known embed text reliably enough for community operations.`,
    url: "",
    github: "https://github.com/Dey11/yunami",
    tags: ["typescript"],
    type: "Personal",
    status: "Archived",
    duration: "Community bot",
    year: "2025",
    images: [],
  },
  15: {
    id: "project-15-directorscut",
    color: "bg-[#ffe1ed]",
    name: "directorscut",
    tagline:
      "wip ai pipeline for series bibles, scenes, assets, dialogue, and video output",
    description:
      "An ambitious WIP platform for AI-assisted short-form video and story generation, decomposed into controllable creative steps instead of one opaque generation prompt.",
    content: `## Overview

Directorscut is a WIP AI video/story generation system. Instead of asking a model for a finished video in one step, it models the creative pipeline as project, series, episode, character, scene, dialogue, image prompt, generated asset, dialogue placement, overlay, and render output.

## Architecture

The repo is structured as a Bun/Turborepo monorepo with an Express API, a web app, shared Prisma database package, shared AI package, Bun S3/R2 storage package, UI/config packages, and a product model centered on projects, series bibles, episodes, characters, scenes, and dialogue-grid cells. Server routes orchestrate DeepSeek story planning, Replicate/Nano Banana image generation, R2 artifact storage, Sharp-based image rendering, and local zero-shot speaker detection through Xenova/owlvit-base-patch32.

## What I built

- Project, series, episode, character, scene, and dialogue modeling
- Project CRUD and user/project ownership model
- Structured AI text generation for creative planning
- Shared AI prompt/schema package for base series bible and episode generation
- Static-image video pipeline for base bible, episode generation, character prompts/images, scene stills, slides, dialogue boxes, dialogue placement validation, rendered dialogue slides, and final video assembly manifest
- R2-compatible artifact upload layer for generated stills, slides, and renders
- Dialogue placement system with grid analysis, speaker anchors, duplicate-dialogue warnings, long-dialogue warnings, and debug artifacts
- Early web scaffolding around the generation workflow
- Package-separated code so AI, DB, storage, server, and UI concerns can evolve separately

## Role and decisions

This is a solo WIP systems prototype where my role is best framed as AI systems and full-stack engineering for a generative video pipeline. I split the pipeline into small persisted steps because creative generation needs control, retries, inspection, and partial reuse. The monorepo boundaries keep API orchestration, prompts/schemas, persistence, storage, and UI separated while the final product shape is still evolving.`,
    url: "",
    github: "https://github.com/Dey11/directorscut",
    tags: ["typescript", "postgresql", "prisma", "aisdk", "docker"],
    type: "Personal",
    status: "WIP",
    duration: "Ongoing",
    year: "2026",
    images: [],
  },
  17: {
    id: "project-17-puckchat",
    color: "bg-[#d7e8ff]",
    name: "puckchat",
    tagline:
      "ai study planner and research chat with persistent threads and byok settings",
    description:
      "An AI-first study planner and research chat app where users generate a plan, edit and confirm it, then continue studying inside persistent AI threads.",
    content: `## Overview

PuckChat is an AI study planner and research chat product. It expands the PDX idea from one-off material generation into a persistent workspace where users can plan, confirm, discuss, annotate, and continue study threads.

## Architecture

The product uses Next.js 16 App Router, React, Bun, Tailwind, shadcn/ui, AI Elements, AI SDK v6, Better Auth, Prisma/PostgreSQL, many provider adapters, encrypted BYOK provider credentials, thread runtime snapshots, settings modules, tools, subagents, annotations, checkpoints, and plan drafts. Prisma models persistent threads, messages, annotations, checkpoints, hierarchical plan drafts, user settings, provider credentials, tools, and subagents.

## What I built

- Thread bootstrap and persistent study-chat workspace
- Plan-generation mode and chat mode
- Threaded chat UX with composer, attachments, markdown, code copy/download, suggestions, stop/cancel, checkpoints, and annotations
- Plan generation, plan revision, confirmation, and sequential material generation from confirmed plans
- Streamed AI replies with structured message parts
- Runtime model/provider selection across Google, Gateway, OpenAI, Anthropic, xAI, Groq, Mistral, DeepSeek, Perplexity, Cohere, Fireworks, Together, Cerebras, DeepInfra, and OpenAI-compatible providers
- Encrypted BYOK settings, custom provider base URLs, prompt templates, tools, and nested subagent tools

## Role and decisions

This is a solo personal AI product. I designed it around persistent state and configurable model runtime because study workflows are long-running: users revise plans, ask follow-ups, switch providers, and return to previous threads. Runtime snapshots make outputs easier to reproduce, while the provider registry and BYOK design keep the product flexible across model vendors without hardcoding one backend.`,
    url: "https://puckchat.vercel.app",
    github: "https://github.com/Dey11/deychat",
    tags: [
      "nextjs",
      "typescript",
      "postgresql",
      "prisma",
      "aisdk",
      "tailwindcss",
    ],
    type: "Personal",
    status: "WIP",
    duration: "Product build",
    year: "2026",
    images: [],
  },
  18: {
    id: "project-18-downthecove",
    color: "bg-[#DDD4C1]",
    name: "downthecove",
    tagline:
      "bespoke ecommerce with medusa, payload, wholesale, affiliates, and royal mail",
    description:
      "A substantial ecommerce platform for a UK coastal fishing/lifestyle brand, with storefront, wholesale portal, affiliate portal, custom admin, subscriptions, support, reviews, returns, media, shipping, and CMS content.",
    content: `## Overview

Down The Cove is a serious commerce migration and custom platform build for a coastal lifestyle and fishing brand. It combines retail commerce, wholesale operations, editorial content, subscriptions, reviews, returns, support, affiliates, shipping, and admin tooling.

## Architecture

The repo is split into a Medusa 2 backend and a Next.js 16 frontend/custom admin/CMS layer. Medusa owns core commerce, checkout, orders, customers, returns, promotions, and custom commerce APIs. The frontend uses Medusa SDK/admin proxy flows and also embeds Payload CMS. Custom Medusa modules cover affiliates, support, product reviews, stock alerts, Royal Mail shipment state, product subscriptions, Cove Club gifts, Resend email, and R2 storage. Payload runs with its own Postgres schema and collections for fishes, recipes, coastlines, categories, media, and users.

## What I built

- Retail storefront with dynamic homepage rails, category grids, trust sections, regional sections, and server-fetched Medusa products
- Wholesale flows modeled through customer groups, metadata, channel visibility, and price-list behavior
- Retail and wholesale Stripe checkout paths
- Cove Club Stripe Billing and product subscription surfaces
- Customer account flows, wishlist, marketing preferences, support, and returns
- Google OAuth integration
- Custom Next admin for customers, orders, products, returns, wholesale review, support, affiliates, analytics, Cove Club gifts, product media upload, channel visibility, and preorder metadata
- Medusa custom modules for affiliates, support, reviews, stock alerts, Royal Mail, subscriptions, gifts, email, and R2
- WordPress-to-Payload content migration for fishes, recipes, coastlines, RNLI merging, aliases, and media backfill

## Role and decisions

This was substantial freelance full-stack work. I built it as a platform rather than a storefront because the business needed commerce operations, editorial content, support workflows, B2B pricing, shipping state, and admin control to evolve independently. Medusa handles transactional primitives, Payload handles coastal/editorial content, and custom modules/API routes fill the gaps where default commerce behavior was too broad, too slow, or too generic.`,
    url: "https://dtc.cooldash.xyz/",
    github: "https://github.com/Dey11/downthecove-pvt",
    tags: [
      "nextjs",
      "typescript",
      "postgresql",
      "stripe",
      "tailwindcss",
      "docker",
    ],
    type: "Freelance",
    status: "Live",
    duration: "Full-stack client platform",
    year: "2026",
    images: [
      assetUrl("/projects/external/downthecove-home-desktop-2026-08-30.png"),
      assetUrl("/projects/external/downthecove-pdp-desktop-2026-08-30.png"),
      {
        src: assetUrl(
          "/projects/external/downthecove-pdp-mobile-full-2026-08-30.png",
        ),
        width: 780,
        height: 10940,
      },
      assetUrl(
        "/projects/external/downthecove-cove-club-desktop-2026-08-30.png",
      ),
      assetUrl("/projects/external/downthecove-sign-in-desktop-2026-08-30.png"),
      assetUrl("/projects/external/downthecove-cart-desktop-2026-08-30.png"),
    ],
    thumbnail: assetUrl(
      "/projects/external/downthecove-home-desktop-2026-08-30.png",
    ),
  },
  19: {
    id: "project-19-thomasbewick",
    color: "bg-[#8A6356]",
    foreground: "light",
    name: "thomasbewick",
    tagline:
      "single-product ecommerce with stripe, woocommerce operations, and resend email",
    description:
      "A focused ecommerce storefront for Thomas Bewick Limited, selling horse bedding pellets through a custom Next.js frontend, Stripe payments, WooCommerce order management, and Resend email.",
    content: `## Overview

Thomas Bewick is a focused single-product ecommerce storefront for horse bedding pellets. The frontend is custom, but WooCommerce remains the operational order backend so the client can keep a familiar admin workflow.

## Architecture

The app is a Next.js storefront backed by headless WooCommerce and Stripe. Checkout is guest-only. Product display reads live WooCommerce price, stock, description, and variation data with local fallbacks. Stripe PaymentIntents are created server-side after WooCommerce price/stock/coupon validation. Orders are created by a Stripe webhook after payment_intent.succeeded, not by browser redirect.

## What I built

- Product flow for the active horse-bedding product and variations
- Cart persistence and buy-now checkout
- Server-authoritative PaymentIntent creation with phone-required checkout
- WooCommerce price, stock, variation, and coupon validation
- PaymentIntent reuse and metadata handling
- Stripe webhook signature verification
- Duplicate WooCommerce order prevention through recent-order metadata checks
- Paid WooCommerce order creation after successful payment
- Coupon retry fallback if WooCommerce rejects coupon data after payment
- Contact form through Resend
- Marketing pages for home, product, checkout, success/cancel, contact, about, wholesale, privacy, and terms

## Role and decisions

This was freelance solo work for a small business. I chose a headless WooCommerce model because the client needed a faster, cleaner storefront without losing their existing order/admin workflow. The webhook-first order model protects against redirect/SCA failures, while WooCommerce-authoritative pricing and stock checks protect the checkout from stale or tampered client cart state.`,
    url: "https://thomasbewick.co.uk",
    github: "https://github.com/Dey11/thomasbewick",
    tags: ["nextjs", "typescript", "stripe", "tailwindcss", "react"],
    type: "Freelance",
    status: "Live",
    duration: "Small-business commerce",
    year: "2026",
    images: [
      assetUrl("/projects/external/hanabi-thomasbewick-2.png"),
      assetUrl("/projects/external/hanabi-thomasbewick-1.png"),
      assetUrl("/projects/external/thomasbewick-pdp-desktop-2026-08-30.png"),
      {
        src: assetUrl(
          "/projects/external/thomasbewick-pdp-mobile-full-2026-08-30.png",
        ),
        width: 780,
        height: 8366,
      },
      assetUrl(
        "/projects/external/thomasbewick-checkout-desktop-2026-08-30.png",
      ),
      {
        src: assetUrl(
          "/projects/external/thomasbewick-checkout-mobile-full-2026-08-30.png",
        ),
        width: 780,
        height: 5488,
      },
    ],
  },
  20: {
    id: "project-20-moai",
    color: "bg-[#FFC107]",
    name: "moai",
    tagline:
      "trading journal with Fidelity imports, trade reconstruction, and analytics",
    description:
      "A trading journal and performance analytics app for active traders, built around Fidelity broker imports, trade reconstruction, PnL tracking, journaling, playbooks, tags, and dashboard/calendar analysis.",
    content: `## Overview

Moai is a trading journal and performance analytics app for active traders. It supports Fidelity imports for now, turning broker execution exports into reconstructed trades before layering journaling, playbooks, tags, dashboard views, and calendar analysis on top.

## Architecture

The app uses Next.js 16 App Router, React, TypeScript, Bun, Tailwind, TanStack Query, Better Auth, Prisma/PostgreSQL, shadcn/Radix UI, Recharts, CSV import flows, and market-event enrichment assumptions. Prisma models cover users, sessions, executions, trades, journals, playbooks, assets, market events, and audit logs.

## What I built

- Broker CSV import flow with parsed-row preview
- Fidelity execution parser and temporary import staging
- Execution insertion and idempotent trade matching
- Derived trade records with realized PnL and position reconstruction
- Journaling, playbook, tag, and asset modeling
- Dashboard and calendar analytics surfaces
- Market-event enrichment worker direction for holidays, earnings, dividends, and economic events
- Better Auth backed dashboard shell
- TanStack Query powered client data flows

## Role and decisions

This is freelance full-stack product work. I treated the import pipeline as the core product surface because a trading journal is only useful if raw broker rows become reliable trade-level insight. The matching flow is designed for rerun safety, while the dashboard and calendar views sit on derived trade data instead of raw CSV rows.`,
    url: "",
    github: "https://github.com/Dey11/moai",
    tags: ["nextjs", "typescript", "postgresql", "prisma", "tailwindcss"],
    type: "Freelance",
    status: "In progress",
    duration: "Client product build",
    year: "2026",
    images: [
      assetUrl("/projects/external/krish-trade-moai-1.jpg"),
      assetUrl("/projects/external/krish-trade-moai-2.jpg"),
      assetUrl("/projects/external/krish-trade-moai-3.jpg"),
      assetUrl("/projects/external/krish-trade-moai-4.jpg"),
    ],
  },
  21: {
    id: "project-21-hanabi",
    color: "bg-[#F90]",
    name: "hanabi",
    tagline:
      "polished studio portfolio with handcrafted visuals, motion, gallery, and booking",
    description:
      "A portfolio/studio website for a digital design and development studio, focused on services, work samples, studio story, booking flow, and a handcrafted visual identity.",
    content: `## Overview

Hanabi is a studio website for a product design and web development brand. It presents services, recent work, studio positioning, team profiles, booking flow, and a handcrafted visual system.

## Architecture

The app uses Next.js 16, React 19, Tailwind 4, Bun, Motion, Lenis smooth scrolling, Vercel Analytics, Umami, Cal.com booking, and local data files. The homepage is composed from modular sections for hero, services, why-us, works, studio/team, and footer reveal. Work projects are data-driven, and hero media is read from public hero-project image filenames.

## What I built

- Studio homepage with hero, kites, marquee, service cards, why-us cards, work list, quote/team section, and footer reveal
- Data-driven work project cards with categories, descriptions, contributors, and image arrays
- Responsive gallery layouts that adapt based on image count
- Collapsed works list with blurred preview and See more reveal
- Package-free seamless marquee using ResizeObserver and duplicated tracks
- Viewport reveal animation primitives
- Desktop Cal.com modal embed and mobile direct booking link
- Contact/social constants and same-day response mail CTA
- Team section with avatars, banners, roles, and studio copy

## Role and decisions

This was a frontend/product-design implementation for a studio brand. I kept project, hero, team, services, and contact content in small data-driven structures so the site can evolve as the studio adds work. The visual system is intentionally detailed, but the page composition stays modular so the brand layer does not make the code hard to maintain.`,
    url: "https://hanabi.works",
    github: "https://github.com/Dey11/hanabi",
    tags: ["nextjs", "typescript", "tailwindcss", "motion", "react"],
    type: "Personal",
    status: "Live",
    duration: "Studio site",
    year: "2026",
    images: [
      assetUrl("/projects/external/hanabi-site-1.png"),
      assetUrl("/projects/external/hanabi-site-2.png"),
      assetUrl("/projects/external/hanabi-site-3.png"),
      assetUrl("/projects/external/hanabi-site-4.png"),
    ],
    thumbnail: assetUrl("/projects/external/hanabi-site-1.png"),
  },
  22: {
    id: "project-22-leadly",
    color: "bg-[#B7495F]",
    foreground: "light",
    name: "leadly",
    tagline:
      "ai reddit lead-generation saas with workers, quotas, billing, and seo surfaces",
    description:
      "An AI-powered Reddit lead generation platform for founders, agencies, and B2B teams, built to monitor conversations, score buyer intent, track keyword mentions, generate outreach drafts, and enforce quotas.",
    content: `## Overview

Leadly is an AI-powered Reddit lead-generation SaaS. It monitors Reddit conversations, scores buyer intent against user-defined ICPs, tracks keyword mentions, creates outreach drafts, enforces quotas, and includes content/SEO surfaces for acquisition.

## Architecture

Leadly is a Bun monorepo with an Express 5 backend, Prisma 7/Postgres, Redis/BullMQ worker, Gemini/Cerebras/Nebius AI integrations, Dodo billing, Resend, Google OAuth, and a Next.js 16/React 19/Tailwind/TanStack frontend. The frontend proxies backend access by forwarding the session token, while backend sessions are DB/cookie based. Worker/scheduler flows enqueue Reddit scrape jobs by user schedule, quota, retry rules, and stuck-job recovery.

## What I built

- Cookie-based auth/session backend
- Billing and quota enforcement
- ICP management, monitors, keyword tracking, schedules, leads, blog APIs, and admin logs
- Scheduler and BullMQ worker for ICP-based monitoring and keyword monitoring
- Reddit processors that fetch posts, dedupe results, AI-score relevance, filter vendor/self-promotional content, persist leads, and advance cursors
- AI cold-DM generation plus persona, intent, and sentiment-style enrichment
- Dodo webhook handling with raw-body preservation
- Resend email surfaces
- Dashboard surfaces for ICPs, monitors, keyword sets, schedules, leads, billing, onboarding, and settings
- SEO/content system with marketing pages, comparison and alternatives pages, solution pages, blog generation, sitemap, robots, llms.txt, and structured data
- Docker/CI-oriented service split for backend, worker, and frontend

## Role and decisions

This is a solo or very small-team SaaS build. I designed it around async workers and server-side quota enforcement because lead generation is noisy, rate-limited, and expensive if every user action triggers immediate scraping. The product separates signal collection from AI scoring so keyword noise, ICP fit, billing limits, and outreach generation can each be controlled independently.`,
    url: "https://leadly.live",
    github: "https://github.com/Dey11/leadly",
    tags: ["nextjs", "typescript", "postgresql", "prisma", "aisdk", "docker"],
    type: "Personal",
    status: "Live",
    duration: "SaaS build",
    year: "2026",
    images: [
      assetUrl("/projects/external/hanabi-leadly-2.png"),
      assetUrl("/projects/external/hanabi-leadly-1.png"),
      assetUrl("/projects/external/leadly-leads-desktop-2026-08-30.png"),
      assetUrl("/projects/external/leadly-icps-desktop-2026-08-30.png"),
      assetUrl("/projects/external/leadly-monitors-desktop-2026-08-30.png"),
      assetUrl("/projects/external/leadly-schedule-desktop-2026-08-30.png"),
      assetUrl(
        "/projects/external/leadly-settings-billing-desktop-2026-08-30.png",
      ),
    ],
  },
  23: {
    id: "project-23-mahindra-beaconhill",
    color: "bg-[#D10A2C]",
    foreground: "light",
    name: "mahindra beaconhill",
    tagline:
      "luxury property launch site with interactive plans and enquiry capture",
    description:
      "A freelance property marketing website for Mahindra BeaconHill in Mahalaxmi, designed and developed end to end with interactive residence plans, amenity browsing, location context, and a Resend-backed enquiry flow.",
    content: `## Overview

Mahindra BeaconHill is a responsive property marketing and lead-generation website for a residential launch in Mahalaxmi, Mumbai. The site takes prospective buyers through the project story, sustainability commitments, residence configurations, amenities, connectivity, developer background, frequently asked questions, and enquiry flow.

## Architecture

The website uses Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Vercel Analytics, and Resend. Project facts, unit configurations, amenities, location details, specifications, and FAQs live in a typed content model. Interactive client components handle the residence-plan and amenity selectors, while a server API route validates enquiries and sends them to the configured sales inbox through Resend.

## What I designed and built

- Complete visual and interaction design for the website
- Responsive two-level navigation and image-led launch hero
- Editorial overview and project-stat sections
- Sustainability section covering energy, water, waste, and biodiversity commitments
- Interactive unit-plan selector with unit, floor, and master-plan views
- Custom SVG plan illustrations and configuration details
- Tabbed amenity browser with category-specific imagery and facilities
- Location section with connectivity details and an embedded Google map
- Developer profile, specification list, and accessible FAQ section
- Responsive enquiry form with client feedback, server validation, and Resend delivery
- Metadata, analytics, and production deployment setup

## Role and decisions

This was a freelance engagement that I owned from design through development. I created the visual direction, information hierarchy, responsive behavior, interactive states, and production implementation. The restrained black, white, and Mahindra-red system keeps the property imagery prominent, while typed content and focused interactive components make the long landing page easier to maintain and update.

Commercial figures on the site are presented as indicative project information and remain subject to the client's final legal and sales review.`,
    url: "https://www.mahindranewlaunch.in",
    github: null,
    tags: ["nextjs", "typescript", "react", "tailwindcss", "resend"],
    type: "Freelance",
    status: "Live",
    duration: "Full website design and development",
    year: "2026",
    images: [
      {
        src: assetUrl(
          "/projects/external/mahindra-hero-desktop-2026-08-30.png",
        ),
        width: 1440,
        height: 900,
      },
      {
        src: assetUrl(
          "/projects/external/mahindra-overview-desktop-2026-08-30.png",
        ),
        width: 1440,
        height: 900,
      },
      {
        src: assetUrl(
          "/projects/external/mahindra-plans-desktop-2026-08-30.png",
        ),
        width: 1440,
        height: 900,
      },
      {
        src: assetUrl(
          "/projects/external/mahindra-location-desktop-2026-08-30.png",
        ),
        width: 1440,
        height: 900,
      },
      {
        src: assetUrl(
          "/projects/external/mahindra-overview-mobile-2026-08-30.png",
        ),
        width: 780,
        height: 1688,
      },
      {
        src: assetUrl(
          "/projects/external/mahindra-plans-mobile-2026-08-30.png",
        ),
        width: 780,
        height: 1688,
      },
    ],
  },
};

export const projectCardHeightByWeight = {
  3: 256,
  4: 304,
  5: 400,
} as const;

export type ProjectCardWeight = keyof typeof projectCardHeightByWeight;

export const prioritizedProjectColumns: {
  weight: ProjectCardWeight;
  projectId: keyof typeof projectBoxesByInventoryId;
}[][] = [
  // Temporarily hidden, with their full records kept above for restoration.
  // Their legacy flex weights were directorscut (15, 6), puckchat (17, 7), and
  // yunami (14, 5). Map them to weight 3, 4, or 5 when restoring.
  // Each column has at least one 4 and one 5. Across the grid, sizes 3 and 4
  // appear four times each, while size 5 appears three times.
  [
    { weight: 4, projectId: 18 },
    { weight: 3, projectId: 20 },
    { weight: 3, projectId: 4 },
    { weight: 5, projectId: 21 },
  ],
  [
    { weight: 3, projectId: 2 },
    { weight: 5, projectId: 8 },
    { weight: 4, projectId: 22 },
  ],
  [
    { weight: 5, projectId: 1 },
    { weight: 4, projectId: 5 },
    { weight: 4, projectId: 23 },
    { weight: 3, projectId: 19 },
  ],
];
