# Project Blog Drafts

These drafts are meant as long-form portfolio starting points. They combine repository evidence with reasonable placeholders where client/team details were not explicit in code or docs. Update names, screenshots, metrics, exact team size, and client-specific constraints before publishing.

## 1. pdx

GitHub: https://github.com/dey11/pdx  
Type: Personal project

### Overview

PDX is an AI study-material generation platform built around a simple promise: paste a syllabus or study requirement, choose the output format, and receive a structured PDF that can contain theory notes, question banks, or full study material. The product is not just a prompt wrapper. It has authentication, paid credits, generation history, asynchronous workers, object storage, and a deployment setup that separates the web app from long-running PDF generation.

### Problem And Product Thinking

The core problem was that students often need structured, printable material quickly, but a direct chat interface gives inconsistent results. I treated the generation as a workflow: first understand and structure the topic plan, then let the user review it, then reserve credits, then run the heavy generation pipeline outside the request-response path.

### Architecture

The app uses Next.js 16, React 19, TypeScript, Tailwind, Prisma/Postgres, Better Auth, BullMQ/Redis, Bun, Cloudflare R2, Vercel AI SDK, Dodo Payments, Resend, and analytics tools. The App Router handles landing pages, dashboard, history, settings, auth, generation screens, and API routes. Once a user confirms a plan, the app reserves credits and enqueues a BullMQ job. A colocated worker generates markdown and PDFs, uploads partial and final artifacts to R2, reports progress through callback APIs, and exposes signed download links.

### Implementation Decisions

The important decision was to make generation asynchronous from the start. PDF generation can be slow and failure-prone, so putting it in a worker made the user experience and deployment model more honest. I also used a credit reservation model and a one-pending-material guard to avoid duplicate spending and queue abuse. R2 signed URLs made delivery independent of the app server, while Docker/Coolify deployment kept Postgres, Redis, web, and worker services explicit.

### Team And Role

This was built as a solo full-stack product. My role covered product definition, UI, auth, billing, database schema, AI pipeline, worker architecture, PDF delivery, and deployment.

### What This Shows

PDX is a strong AI SaaS case study because it combines product UX, monetization, async jobs, storage, and deployment. It shows that I can move beyond demos and design an AI workflow with real operational boundaries.

### Notes To Personalize

Add real usage numbers, sample PDFs, conversion numbers, and any lessons learned from production failures. Also review worker callback authentication and rate limiting before writing final public claims.

## 2. ballarat box sports landing

GitHub: https://github.com/dey11/ballarat  
Type: Freelance

### Overview

Ballarat Box Sports is a client-facing marketing and lead-capture website for a 24/7 indoor box sports facility covering futsal, AFL, and cricket. The project was less about building a complex backend and more about translating a local venue into a clear, searchable, mobile-friendly web presence that explains pricing, sports formats, rules, and contact paths.

### Client Requirement

The client needed a polished public website that could explain the facility quickly, support different sports audiences, and convert visitors into enquiries. For a local sports venue, trust and clarity matter more than novelty. A visitor should understand what can be played, when the venue operates, what the rules are, and how to get in touch without hunting through social posts.

### Architecture

The site is built with Next.js 15, React 19, TypeScript, Tailwind 4, Radix/shadcn-style UI, Motion, Zod, Biome, and Vercel Analytics. It is mostly a static/server-rendered App Router site, with pages for the home experience, pricing, and sport-specific rulebook content. The homepage is composed from sections for the hero, sports, features, formats, about, and contact. The contact form uses client UI and a server action with Zod validation.

### Implementation Decisions

I focused on local-business fundamentals: SEO metadata, canonical URLs, sitemap/robots, Open Graph details, and SportsActivityLocation structured data. The rules page uses collapsible sport-specific sections and PDF download affordances because the actual venue operations depend on people understanding the format. Pricing is structured around casual play, leagues, and tournaments so different visitor intents are handled separately.

### Team And Role

This was a freelance implementation. The assumed team shape was client-side content/requirements, with me handling web implementation, responsive UI, content structure, SEO, and deployment.

### What This Shows

This project demonstrates practical client delivery: taking a domain-specific local business and turning it into a clear, credible website with search visibility, validated lead capture, and useful content architecture.

### Notes To Personalize

The README is still boilerplate and the contact form currently needs a real email, CRM, or database integration. Replace placeholder social/phone details before publishing.

## 3. voice ai agent landing

GitHub: https://github.com/Dey11/landing  
Type: Freelance

### Overview

This project is a conversion-focused landing page for "2X Sales", an AI voice and outbound sales agent service. The website positions the product as an operated sales system that can call leads, qualify them, book appointments, and report analytics instead of being just another AI tool.

### Client Requirement

The client needed a B2B landing page that could explain a technical service in business language. The page had to make the value obvious to non-technical decision makers: faster follow-ups, round-the-clock calling, fewer missed leads, clear handoff rules, and integrations with existing tools.

### Architecture

The app uses Next.js 16, React 19, TypeScript, Tailwind 4, Motion, Lucide, Radix Switch, Bun scripts, and Vercel Analytics. It is a single-page marketing experience composed from navbar, hero, trusted-by, use cases, impact stats, product dashboard/video, how-it-works timeline, why-choose section, integrations, FAQ, CTA, and footer. The main conversion paths lead to WhatsApp or demo booking.

### Implementation Decisions

The strongest product decision was narrative framing. Instead of only listing features, the page walks through the operational flow: lead capture, AI call, qualification, appointment booking, and human handoff. FAQ content addresses control, compliance, integrations, and edge cases because those are the questions that block a B2B buyer from trying voice automation.

### Team And Role

This was a freelance marketing build. The assumed setup was a client providing the service direction and claims, while I handled information architecture, section design, responsive implementation, interaction polish, and conversion flow.

### What This Shows

The project shows product storytelling and frontend execution for an AI business service. It is useful in a portfolio because it demonstrates that I can make a technical product understandable and sellable.

### Notes To Personalize

The repository does not include the product backend. Hardcoded statistics should be treated as client-provided until verified. Add final client name, campaign results, and conversion metrics if available.

## 4. venturassist

GitHub: https://github.com/dey11/VenturAssist  
Type: Personal project

### Overview

VenturAssist is an AI-powered venture capital analysis platform. It accepts pitch decks and startup documents, extracts structured company data, generates risk analysis, researches competitors, and lets users chat with the resulting investment dossier.

### Product Thinking

The problem was that startup diligence is slow because relevant information is scattered across decks, documents, market context, and investor questions. I designed the product as an AI analyst workflow rather than a single chat box. Documents become structured data sources, the system runs specialized analysis jobs, and the final experience is a dashboard plus a tool-augmented chat interface.

### Architecture

The stack includes Next.js 16, React 19, TypeScript, Tailwind 4, Prisma/Postgres, Better Auth, BullMQ/Redis, Cloudflare R2, Gemini through the AI SDK, Zod, pdf-parse, mammoth, pptx parsing, and TypeScript workers. Users create startups, upload files through signed R2 URLs, create data sources, and enqueue ingestion jobs. Workers extract PDF/DOCX/PPTX/text content, run structured AI extraction, store metrics/team/market/risk data, then trigger RedLens risk analysis and competitor jobs.

### Implementation Decisions

The strongest architecture choice was the relational model around startups, data sources, jobs, structured metrics, competitors, risk modules, and chat history. RedLens runs multiple specialist modules in parallel, while competitor analysis can use search tooling. The chat route queries structured DB tables instead of relying only on raw prompt memory, which makes the experience more grounded.

### Team And Role

The README indicates a hackathon/team context, with my role best framed as lead developer and system architect. I handled core architecture, backend flows, AI orchestration, and significant frontend integration.

### What This Shows

VenturAssist is a strong AI systems project. It demonstrates document ingestion, async processing, multi-agent analysis, structured extraction, tool-augmented chat, and domain modeling for investment workflows.

### Notes To Personalize

Clarify which parts were built by teammates. Add screenshots of the upload, analysis, RedLens, competitor, and chat flows. Mention hackathon result if applicable.

## 5. wabisabi

GitHub: https://github.com/dey11/wabisabi-agency  
Type: Freelance

### Overview

WabiSabi is a portfolio and services website for a design agency focused on banners, logos, VIP packs, Discord headers, and emotes. The project needed to communicate visual taste, show work clearly, and make the agency feel credible to social and gaming-adjacent clients.

### Client Requirement

The client needed a site that behaved like a visual portfolio, not a generic agency template. The work itself had to be central, with smooth gallery browsing, responsive layouts, and enough interaction polish to match the agency's creative positioning.

### Architecture

The site uses Next.js 15, React 19, TypeScript, Tailwind 4, Motion, shadcn-style primitives, Lucide, Next fonts, Cloudinary-hosted assets, and the View Transitions API. Routes cover home, works, services, feedbacks, and contact. Global layout handles header, footer, cursor effects, dark-mode bootstrap, and transitions.

### Implementation Decisions

The asset catalog is centralized so the agency can add or rearrange work without digging through page code. The services page uses category tabs, animated carousel behavior, keyboard navigation, and fullscreen lightbox viewing. The works page uses an infinite scrolling gallery, while responsive variants keep image-heavy content usable across screen sizes.

### Team And Role

This was a freelance agency site. The assumed team shape was designer/client providing portfolio assets and brand direction, while I handled frontend engineering, responsive layout, animation behavior, and final web delivery.

### What This Shows

This is a frontend craft project. It demonstrates animation, gallery UX, responsive asset presentation, and the ability to build around a specific brand rather than using a generic SaaS layout.

### Notes To Personalize

The README mentions future booking/payment/admin work that is not implemented. Update social links and add final client impact, such as inquiries or portfolio usage.

## 6. clarityhub

GitHub: https://github.com/dey11/clarity-hub  
Type: Personal project

### Overview

ClarityHub is an AI learning platform that generates study roadmaps, subtopic explanations, resources, and quizzes. It was built as a DUHacks-style hackathon product with a team context and a practical goal: help students turn a vague learning objective into a structured path.

### Product Thinking

The product starts with a familiar student problem: deciding what to study next is often harder than studying itself. I approached the flow as a progression from roadmap generation to content exploration to assessment. The system creates learning structure, persists it, and gives the user quizzes to reinforce progress.

### Architecture

The stack includes Next.js 15 App Router, React 19, TypeScript, Tailwind 4, Clerk, Prisma 6, PostgreSQL, Radix/shadcn-style primitives, Zod, and external AI APIs for roadmap, study-content, and quiz generation. Clerk middleware protects app and API surfaces. API routes validate input with Zod, call configured AI endpoints, and persist Roadmap, RoadmapItem, Quiz, and QuizItem records in Postgres. Clerk webhooks sync users into the Prisma User table.

### Implementation Decisions

The key decision was to persist generated learning artifacts relationally instead of leaving everything in a one-off AI response. Roadmaps, subtopics, resources, quizzes, and quiz options become queryable product data. The schema also shows planned caching fields for study material, which suggests I was thinking about repeated generation cost and response reuse even if the first prototype did not finish that optimization.

### Team And Role

This was a team hackathon project. My likely role was full-stack implementation across AI integration, auth, database modeling, and the main user flows. Update this section with exact teammate responsibilities before publishing.

### What This Shows

ClarityHub is a good example of shipping an AI education product under time pressure while still covering auth, persistence, validation, and personalized UX.

### Notes To Personalize

External AI services are opaque in the repo, so add model/prompt details if you have them. Clarify hackathon outcome and teammate roles.

## 7. real estate agent

GitHub: https://github.com/Dey11/gemini-conversational-agent  
Type: Personal project

### Overview

This project is a voice-first real estate assistant that uses Gemini Live API and Pinecone to conduct spoken property-search conversations. The user can talk naturally, the system streams audio to the model, and tool calls connect the conversation to property search and property details.

### Product Thinking

The idea was to test what a sales assistant could feel like when voice is the primary interface. Real estate is a useful domain because buyers often describe fuzzy preferences: budget, location, bedrooms, amenities, lifestyle, and urgency. A voice agent can ask follow-up questions and search semantically instead of forcing the user through filters.

### Architecture

The app uses Next.js 15, React 19, TypeScript, Tailwind 4, Google GenAI SDK, Gemini 2.0 Flash Live API, Pinecone, and the Web Audio API. The main page runs a client-side Live API session. Browser audio is captured, resampled to 16k PCM, streamed to Gemini Live, and AI output audio is played back at 24k. Gemini function calls route through local tools. `search_properties` calls a Next API route, embeds the query, searches Pinecone, and formats results. `get_property_details` reads from local JSON.

### Implementation Decisions

The important experiment was combining real-time audio, tool calling, and vector search in one loop. The property search is not just keyword matching; it uses embeddings to handle natural queries. The README also documents a production caveat: API keys and the Live API connection should move server-side.

### Team And Role

This appears to be a solo AI prototype. My role covered the conversational interface, audio pipeline, model/tool wiring, Pinecone search, and UI.

### What This Shows

This project demonstrates comfort with emerging AI interaction patterns: low-latency audio, function calling, RAG-style search, and prototype-to-production reasoning.

### Notes To Personalize

The current setup exposes a public Gemini key pattern and lacks auth, persistence, and observability. Frame it as a prototype unless you harden those pieces.

## 8. tinder scraper

GitHub: https://github.com/Dey11/Tinder-scraper  
Type: Work/interview/take-home assignment

### Overview

Tinder Scraper is an async profile discovery and search system. A user submits a name, age, location, and photo URL. The backend indexes profiles around a location, stores profile images, creates embeddings, and returns fuzzy name matches plus image-similarity matches.

### Assignment Goal

This was a backend-heavy systems exercise. The interesting part was not the UI; it was orchestrating multiple external services, handling asynchronous work, and designing a searchable index from messy external profile data.

### Architecture

The project is split into an Express/TypeScript backend and a Next.js frontend. The backend uses PostgreSQL, Prisma, Pinecone, Replicate CLIP image embeddings, Cloudflare R2/S3, Mapbox geocoding, Fuse.js, Axios, and Zod. Search creation validates input, creates a SearchLog, returns 202, and processes in the background. The worker geocodes the target location, checks whether nearby data was indexed recently, changes Tinder location when needed, scrapes profiles, stores images in R2, generates image vectors, writes Pinecone metadata, stores profile data in Postgres, and combines fuzzy search with vector search.

### Implementation Decisions

The system uses Tinder profile ID as a dedupe key and uses location cache radius/recent-index logic to avoid unnecessary scraping. R2 separates image storage from the app server. Pinecone metadata filters keep vector search scoped by location. The request returns immediately, making the UI poll job state instead of waiting for the entire indexing job.

### Team And Role

This was a solo take-home style assignment. My role was end-to-end system design: scraping orchestration, storage, vector search, backend APIs, and a thin frontend status/results flow.

### What This Shows

It shows practical systems thinking under constraints: async jobs, third-party APIs, vector similarity, object storage, geospatial caching, and search-quality tradeoffs.

### Notes To Personalize

Because it depends on reverse-engineered Tinder APIs, describe it carefully as an assignment/prototype. Do not overstate production readiness.

## 9. drites

GitHub: https://github.com/dey11/drites  
Type: Personal project

### Overview

Drites is a blogging and publishing platform with authenticated authors, markdown posts, likes, bookmarks, comments, profiles, SEO metadata, sitemap generation, and feedback capture. It is a personal full-stack product focused on the mechanics of publishing rather than just a static blog.

### Product Thinking

The goal was to build a writing platform where content, identity, and social actions are all first-class. A reader can browse and interact, while an authenticated author can publish and manage posts. The platform also includes SEO primitives so content can be discovered outside the app.

### Architecture

The stack includes Next.js 15 App Router, React 19 RC, TypeScript, Tailwind 3, Clerk, Prisma, PostgreSQL, Server Actions, React Markdown, Vercel Analytics, Speed Insights, Lucide, and nextjs-toploader. App Router groups separate landing and main application areas. Clerk handles auth and webhooks sync users to Postgres. Server Actions handle post creation/deletion, comments, likes, and bookmarks. Prisma models cover users, posts, likes, bookmarks, comments, and feedback.

### Implementation Decisions

Using Server Actions kept mutations close to the UI while still running on the server. Ownership checks protect destructive post actions. Cascading relations simplify cleanup. Post pages generate dynamic metadata and render markdown. The sitemap includes static pages, posts, and profiles, which shows attention to discoverability.

### Team And Role

This was a solo personal product. My role covered product design, schema design, auth, publishing flows, UI, and SEO.

### What This Shows

Drites is a clear full-stack Next.js case study: auth, relational modeling, markdown content, social interactions, profile views, and SEO-focused app structure.

### Notes To Personalize

Review unique constraints around likes/bookmarks before publicizing. Add examples of posts and any traffic or usage numbers if available.

## 10. ai chat website

GitHub: https://github.com/dey11/chatappui  
Type: Work/interview/take-home assignment

### Overview

This project is a polished single-page AI chat interface. It supports multiple local chat sessions, streaming model responses, generated chat titles, sidebar management, copy actions, light/dark mode, and a responsive chat layout.

### Assignment Goal

The likely assignment was to build a production-feeling AI chat UI without overcomplicating persistence. The result focuses on interaction quality: streaming feedback, clean sidebar behavior, local session management, and theme polish.

### Architecture

The app uses Next.js 15, React 19, TypeScript, Tailwind 4, shadcn-style components, Zustand persistence, Google GenAI SDK, Gemini 2.5 Flash preview, manual SSE streaming, Motion, and Lucide. Client chat state lives in a persisted Zustand store. `useChat` creates chats, appends user and assistant messages, calls `/api/chat-title` for first-message titles, then calls `/api/chat` and parses streamed SSE chunks into the assistant message.

### Implementation Decisions

The app intentionally stores history in localStorage rather than a database, which fits the assignment scope while still allowing multi-session behavior. Hydration guards avoid SSR/client mismatch. Manual SSE parsing gives fine-grained control over the streaming assistant message. The View Transition API adds polish to theme changes.

### Team And Role

This was a solo take-home style project. My role covered frontend UX, state management, API integration, streaming behavior, and visual polish.

### What This Shows

It demonstrates that I can build an AI interface that feels responsive and complete: streaming UX, local persistence, chat management, theme behavior, and server-side API key usage.

### Notes To Personalize

Position it as a focused interface assignment, not a production chat platform. It has no auth or server-side message persistence.

## 11. vidbox

GitHub: https://github.com/Dey11/cinego  
Type: Freelance

### Overview

Vidbox is a movie, TV, and anime discovery and streaming portal. It combines public metadata sources, watch pages, multiple provider embeds, signed-in user features, SEO pages, donation surfaces, and responsive navigation.

### Client Requirement

The client needed a media portal where users could discover titles, search across categories, view detail pages, choose stream providers, and keep watchlist/history. For this type of product, the experience depends on fast browsing, rich metadata, provider fallback, and enough personalization to make the site feel useful after the first visit.

### Architecture

The app uses Next.js 15 App Router, React 19 RC, TypeScript, Tailwind, shadcn/Radix primitives, Clerk, Prisma/Postgres, TMDB API, AniList GraphQL, third-party embed providers, next-themes, Framer Motion, carousel/swiper, and metadata/structured-data helpers. Routes cover landing, `/home`, movie/TV/anime details, watch pages, search, watchlist, history, donation, APK, legal, and support pages. Server components fetch TMDB and AniList metadata with revalidation. API routes persist watchlist and history for Clerk users.

### Implementation Decisions

Metadata fetching is separated into `src/lib/api-calls`, and provider embed constants allow fallback across many stream sources. Watchlist/history use Postgres for signed-in users, while local preference state keeps the watch experience fast. The project includes SEO metadata, sitemap/robots, OG image, structured data helpers, and public donation assets.

### Team And Role

This was a freelance build, likely solo. My role covered frontend, API aggregation, auth integration, persistence, provider selection UX, SEO, and deployment assumptions.

### What This Shows

Vidbox demonstrates full-stack Next.js delivery for a content-heavy product: API aggregation, dynamic metadata pages, authenticated personalization, SEO, and pragmatic third-party integration.

### Notes To Personalize

The README is stale and the legal/compliance posture of third-party stream embeds is unclear. Be careful with public wording and keep it focused on technical implementation.

## 12. dashboard analytics ui

GitHub: https://github.com/Dey11/dashboard-analytics-ui  
Type: Work/interview/take-home assignment

### Overview

Dashboard Analytics UI is a frontend-only dashboard assignment modeled around a lead-management and analytics workflow. It includes lead lists, locked/unlocked lead states, analytics cards, team member tables, role dialogs, sidebar navigation, header/profile UI, and charts.

### Assignment Goal

The README frames it as a Figma-to-dashboard implementation optimized for desktop screens above 1200px. The goal was visual translation, layout accuracy, component structure, and dashboard interaction states rather than backend integration.

### Architecture

The project uses Next.js 15.3, React 19, TypeScript, Tailwind 4, shadcn/Radix-style components, Recharts, Lucide, and static constants. The App Router has `/` for the lead-management view and `/analytics` for metrics. Data comes from typed constants. Recharts renders trend views, while the team table uses dropdowns and a role-edit dialog.

### Implementation Decisions

The app is intentionally static and frontend-focused. UI primitives are componentized, the chart wrapper follows shadcn-compatible patterns, and interactions such as modals, dropdowns, and side navigation are scaffolded to match a real dashboard. The project prioritizes desktop fidelity because that was the assignment constraint.

### Team And Role

This was a solo take-home assignment. My role was to translate the design into a clean, maintainable frontend implementation.

### What This Shows

This project is useful for showing dashboard UI fundamentals: layout systems, charts, tables, sidebars, modals, and stateful interaction scaffolding under visual constraints.

### Notes To Personalize

Do not present it as a production app. It has no backend, auth, or real data fetching, and some actions are intentionally stubbed.

## 13. chat backend socketio

GitHub: https://github.com/Dey11/Chat-System-Backend-with-Socketio  
Type: Work/interview/take-home assignment

### Overview

This project is a real-time chat backend with authentication, REST message APIs, Socket.IO messaging, MongoDB persistence, Redis caching, rate limiting, and Dockerized local infrastructure.

### Assignment Goal

The assignment likely tested backend fundamentals in a compact system: auth, validation, persistence, caching, real-time events, rate limiting, and container setup.

### Architecture

The stack includes Node.js, Express 5, TypeScript, Socket.IO, MongoDB/Mongoose, Redis, JWT, bcryptjs, Joi, and Docker Compose. `src/index.ts` creates the Express app, HTTP server, and Socket.IO server. Auth routes register and log in users with bcrypt and JWT. HTTP message routes validate JWTs, apply per-user Redis rate limiting, persist messages in MongoDB, and cache recent messages in Redis. Socket.IO authenticates during handshake, accepts `message` events, validates/rate-limits, writes Mongo/Redis, and broadcasts messages.

### Implementation Decisions

Redis is used for two separate concerns: fixed-window per-user rate limiting and recent-message caching. Message retrieval prefers Redis when enough cached messages are available and falls back to MongoDB otherwise. A singleton Redis service centralizes cache and rate-limit logic. REST and socket paths share the same persistence concepts, which keeps behavior consistent across transports.

### Team And Role

This was a solo backend take-home assignment. My role was API design, auth, persistence, real-time socket flow, Redis integration, and Docker setup.

### What This Shows

It gives a focused backend systems signal: I can wire core infrastructure pieces together into a coherent service and explain the tradeoffs.

### Notes To Personalize

No real test suite was visible. Tighten environment docs and Compose networking before presenting it as production-ready.

## 14. yunami discord bot

GitHub: https://github.com/Dey11/yunami  
Type: Personal project

### Overview

Yunami Discord Bot is a community utility bot for Anigame clan donation tracking. It handles clan registration, member joins, donation parsing, leaderboards, admin donation adjustments, and small utility/moderation commands.

### Product Thinking

The project came from a practical Discord community problem: donation and activity tracking often happens inside chat messages, but server admins need structured totals and leaderboards. The bot turns message events from another bot into persistent clan/member state.

### Architecture

The bot uses Node.js CommonJS, discord.js v14, MongoDB/Mongoose, pagination.djs, mathjs, keygenerator, and JSON config/state files. `index.js` loads slash commands from grouped folders, registers event handlers, and logs in. `deployCommands.js` publishes global and guild commands. On ready, the bot connects to MongoDB Atlas and sets activity. Clan registration creates secret codes, members join with codes, donation totals are parsed from known Anigame embed text, and `/tracker` displays paginated weekly totals.

### Implementation Decisions

Commands are grouped into admin, help, misc, and registration areas. Mongoose models store clan and member state. Admin checks combine Discord administrator permissions with app-level role/code checks. A config toggle controls raid-filter deletion. Donation parsing uses regex against known embed text, which is pragmatic for a bot-to-bot integration.

### Team And Role

This was a personal/community project, likely solo. My role covered bot architecture, slash commands, Mongo persistence, Discord permissions, and message parsing.

### What This Shows

It shows event-driven development outside a web app: Discord interactions, external message parsing, permissions, persistent community state, and leaderboard UX.

### Notes To Personalize

There are no docs or setup guide. Add screenshots of commands and a short story about actual usage if you want this in the final portfolio.

## 15. directorscut

GitHub: https://github.com/Dey11/directorscut  
Type: Personal / WIP

### Overview

Directorscut is an ambitious WIP platform for AI-assisted short-form video and story generation. It aims to generate a reusable series bible, episodes, characters, scenes, dialogue, image prompts, assets, dialogue placement, overlays, and eventually stitched video output.

### Product Thinking

The interesting idea is decomposing AI video generation into controllable steps. Instead of asking a model for an entire finished video, the system models the creative process: project, series, episode, character, scene, dialogue, image asset, dialogue placement, and render output. This gives the user more control and creates a recoverable pipeline.

### Architecture

The repo is a Bun workspace/Turborepo with `apps/server`, `apps/web`, `packages/ai`, `packages/db`, `packages/s3`, shared config packages, and UI primitives. The server uses Express 5. Data is modeled with Prisma 7 and Postgres. AI generation uses DeepSeek through the AI SDK, Replicate Nano Banana image generation, Zod structured schemas, Bun S3 for R2-compatible storage, Sharp, and Hugging Face Transformers for zero-shot detection/image embeddings.

### Implementation Decisions

The static-image-video pipeline is intentionally split into small API steps. AI text generation uses structured Zod outputs. Character references, scene stills, and slide generation produce persisted asset URLs. Dialogue placement combines stored grid choices with local Sharp-based image analysis. Render flow can use speaker detection and reference matching to avoid covering subjects and to point speech cards toward speakers.

### Team And Role

This is a solo WIP/prototype. My role is backend/platform architecture, AI pipeline design, data modeling, media storage, and early web scaffolding.

### What This Shows

Directorscut is best presented as an AI systems architecture case study. It shows structured LLM output, prompt pipelines, persistent generation state, media asset storage, image processing, and computer-vision-assisted layout.

### Notes To Personalize

Mark it clearly as WIP. The web UI is still starter-level, auth is deferred, queue/worker architecture is not complete, and final video stitching remains TODO.

## 16. reserve-monitoring-p2

GitHub: https://github.com/Dey11/reserve-monitoring-p2  
Type: Freelance

### Overview

Reserve Monitoring P2 is a backend service that polls exchange reserve APIs, detects reserve deltas per currency, and publishes one RabbitMQ message per non-zero change for downstream processing.

### Client Requirement

The client requirement was operational and backend-heavy: monitor many exchange sources reliably, normalize different API responses, detect changes, and emit a clean queue contract. The client likely provided a target list/PDF of exchanges, while the implementation needed to handle flaky APIs, proxies, retries, and monitoring evidence.

### Architecture

The service uses Bun, TypeScript, RabbitMQ via `amqplib`, optional MongoDB monitoring storage, `node-jq`, Pino logging, Undici HTTP, Zod validation, Docker, and Docker Compose. `src/index.ts` orchestrates polling, retries, lifecycle, RabbitMQ publishing, and monitoring startup. `src/exchanges` normalizes route-v2 API responses. `src/tracker.ts` stores baselines and computes signed deltas. `src/publisher.ts` emits queue messages. `src/monitoring` stores monitoring events and supports optional transformations/backups.

### Implementation Decisions

The system is API-first by design, with no browser automation fallback. The first successful snapshot becomes the baseline and emits no messages. Per-exchange proxy settings can override global proxy config. Disabled/deferred exchanges are documented with reasons. RabbitMQ messages are intentionally minimal: `source_id`, `currency`, `timestamp`, and `amount_delta`.

### Team And Role

This was freelance backend delivery. My role was source discovery, API normalization, polling architecture, queue contract, monitoring storage, Dockerization, and handoff docs.

### What This Shows

It is a strong backend automation case study: external API integration, schema validation, retry/proxy handling, queue publishing, and operational monitoring around unreliable third-party services.

### Notes To Personalize

Add client context and deployment result if available. Some exchanges are deferred due to Cloudflare, HTML responses, or timeouts.

## 17. deychat

GitHub: https://github.com/Dey11/deychat  
Type: Personal project

### Overview

Deychat, also described in docs as PDX V2/PuckChat, is an AI-first study planner and research chat application. Users paste a syllabus or study goal, generate a structured plan, edit/confirm it, and then generate or discuss study material inside a persistent thread.

### Product Thinking

This project expands the PDX idea into a more interactive AI workspace. Instead of a single generation flow, the user gets a planning phase, a confirmation state, persistent conversations, annotations, quick asks, provider settings, prompt templates, and BYOK model configuration.

### Architecture

The stack includes Next.js 16 App Router, React 19, Bun, Tailwind 4, shadcn/ui, AI Elements, Vercel AI SDK v6, Prisma 7/PostgreSQL, Better Auth, many AI providers, and encrypted BYOK credentials. App pages live under `app/`, product UI under `components/app`, AI primitives under `components/ai-elements`, and shared server logic in `lib`. `/api/threads/bootstrap` creates threads. `/chat/[threadId]` handles plan/chat modes, streamed replies, checkpoints, annotations, and quick ask. Settings routes manage account, appearance, providers, tools, subagents, and prompt templates.

### Implementation Decisions

Provider/model resolution is centralized. Threads store runtime snapshots while new threads inherit workspace defaults. Plan confirmation is a real DB transition. Large material generation is split into sequential AI calls. Assistant annotations and quick-ask side chats are persisted separately. UI messages store structured parts plus plain text. BYOK credentials are encrypted at rest.

### Team And Role

This is a solo personal product built with SaaS-level architecture. My role covered product design, AI orchestration, persistence, auth, settings, and frontend experience.

### What This Shows

Deychat is a strong AI product-engineering case study: multi-provider runtime, persistent conversation state, structured planning, streaming, annotations, and user-configurable AI settings.

### Notes To Personalize

Docs list deferred billing, retrieval/document upload, analytics, usage accounting, and background jobs. Position accordingly.

## 18. downthecove-pvt

GitHub: https://github.com/Dey11/downthecove-pvt  
Type: Freelance

### Overview

Down The Cove is a bespoke ecommerce platform for a UK coastal fishing/lifestyle brand. It includes a retail storefront, wholesale portal, affiliate portal, custom admin, subscriptions, support/reviews/returns, Cove Club membership, Royal Mail shipping, and Payload-backed content.

### Client Requirement

The client needed more than a brochure store. The platform had to support retail customers, wholesale customers, content, media, shipping, payments, support, reviews, returns, and admin operations. The challenge was choosing where to use existing commerce primitives and where to build custom flows.

### Architecture

The repo is monorepo-like. `dtc` is the Medusa 2 backend and `dtc-frontend` is the Next.js 16 storefront/custom admin/CMS layer. The stack includes React 19, Bun, TypeScript, Tailwind 4, shadcn/Radix, Medusa JS SDK, Stripe, Payload CMS, PostgreSQL/Neon, optional Redis, Cloudflare R2/S3 SDK, Resend, and Royal Mail Click & Drop.

### Implementation Decisions

Medusa owns core commerce primitives. Wholesale is modeled through metadata, customer groups, and price lists instead of a separate engine. Product reads are server-first with split hydration and short caching. Channel visibility gates retail/wholesale exposure. Stripe checkout uses Medusa payment sessions while avoiding race conditions in payment preparation. R2 stores support/review/return/product media. Royal Mail defaults are safe, including disabled/dry-run modes.

### Team And Role

This was substantial freelance full-stack work. My role likely covered backend customization, storefront, integrations, custom admin, deployment, and handoff. Update with exact designer/content roles if there was a team.

### What This Shows

This is one of the strongest real-business case studies: ecommerce domain modeling, Medusa customization, B2B/B2C flows, performance work, payment/subscription/shipping integrations, admin tooling, and production documentation.

### Notes To Personalize

Some docs mention sandbox Stripe and partial admin/content areas. Add final launch status and client outcomes before publishing.

## 19. thomasbewick

GitHub: https://github.com/Dey11/thomasbewick  
Type: Freelance

### Overview

Thomas Bewick is a single-product ecommerce storefront for Thomas Bewick Limited in the UK. The site sells horse bedding pellets through a custom Next.js storefront, Stripe payments, headless WooCommerce order management, and Resend transactional/contact email.

### Client Requirement

The client needed a focused commerce flow for one primary product, without asking customers to create accounts. The operational requirement was equally important: the client could continue using WooCommerce as the order dashboard while the public site stayed fast, modern, and custom.

### Architecture

The app uses Next.js 16 App Router, React 19, Bun, TypeScript, Tailwind 4, Radix/shadcn-style primitives, Lucide, Motion, Embla, Zustand persisted cart, Stripe Elements/Express Checkout, WooCommerce REST API, Resend, and Biome. The storefront owns UX. WooCommerce remains the backend order dashboard.

### Implementation Decisions

Checkout creates a Stripe PaymentIntent through a server route that fetches authoritative price and stock from WooCommerce. Stripe webhook handling creates the paid WooCommerce order after `payment_intent.succeeded`, making order creation webhook-driven rather than browser-driven. Pricing and coupon validation are server-authoritative. PaymentIntent updates verify client secrets. Cart shape migrations can drop stale persisted carts when data contracts change.

### Team And Role

This was freelance solo work for a small business. My role covered storefront implementation, Stripe integration, WooCommerce integration, email setup, deployment/DNS support, and handoff.

### What This Shows

It is a compact but high-signal commerce project: payment hardening, webhook idempotency, headless WooCommerce, operational handoff, and pragmatic scope control.

### Notes To Personalize

Only Horse Bedding appears active. Courier/tracking remains manual through WooCommerce/admin workflow.

## 20. moai

GitHub: https://github.com/Dey11/moai  
Type: Freelance / WIP

### Overview

Moai is a WIP trading journal and performance analytics app for active traders. Users import broker executions, reconstruct trades, track PnL, journal decisions, manage playbooks and tags, and analyze performance through dashboard and calendar views.

### Client Requirement

The client needed a product that could turn messy broker CSV exports into useful trade-level insight. The important requirement was not just displaying uploaded rows; it was reconstructing executions into meaningful trades and then layering journaling and analytics on top.

### Architecture

The app uses Next.js 16 App Router, React 19, TypeScript, Bun, Tailwind 4, TanStack Query, Better Auth, Prisma 7 with PostgreSQL adapter, shadcn/Radix UI, Recharts, and market data assumptions around ForexFactory/FMP. Prisma models cover users, sessions, executions, trades, journals, playbooks, assets, market events, and audit logs.

### Implementation Decisions

The key flow is CSV upload to temporary import preview, Fidelity parser, execution insertion, idempotent matching, derived trade records, and analytics/calendar views. Import preview rows are held temporarily for one hour. Matching logic checks prior execution matches for rerun safety. A separate market-events worker pulls holidays, earnings, dividends, and economic events so trades can be understood in market context.

### Team And Role

This was likely solo freelance full-stack work. My role covered product data modeling, import workflow, matching logic, dashboard UI, auth, and background enrichment.

### What This Shows

Moai is a strong domain-specific workflow project: messy CSV ingestion, idempotency, financial data modeling, analytics UX, and enrichment workers.

### Notes To Personalize

README is stale/default. Non-Fidelity import support appears planned but incomplete, and in-memory import staging should become shared persistence for multi-instance production.

## 21. hanabi

GitHub: https://github.com/Dey11/hanabi  
Type: Personal project

### Overview

Hanabi is a polished portfolio/studio website for a digital design and development studio. It presents services, work samples, team/studio story, and booking flow with a handcrafted visual identity.

### Product Thinking

The project is mostly static, so the value comes from presentation quality and maintainable content structure. I wanted the site to feel designed, not assembled from generic sections. The work gallery and booking CTA are the important conversion points.

### Architecture

The stack includes Next.js 16, React 19, TypeScript, Bun, Tailwind 4, Motion, Lenis smooth scrolling, Cal.com embed, Vercel Analytics, local components, and static image assets. `app/page.tsx` composes hero, services, why-us, works, and studio quote sections. Work data is centralized in `data/work-projects.ts`.

### Implementation Decisions

The site uses a package-free duplicated-track marquee, a first-three-project reveal pattern, image-count-aware project galleries, lazy-loaded visual sections, and separate booking behavior for desktop and mobile. Desktop opens Cal.com in an accessible portal modal; mobile uses a direct link. Visual details include kites, paper cranes, fireflies, and liquid-glass effects.

### Team And Role

This is a personal/studio brand site. My role was frontend architecture, visual implementation, animation, content modeling, and booking integration.

### What This Shows

Hanabi is a frontend craft piece: responsive visual polish, animation restraint, asset orchestration, and content-driven gallery architecture.

### Notes To Personalize

Backend complexity is limited by design. Add the final brand story and explain which showcased works are yours or team/client works.

## 22. leadly

GitHub: https://github.com/Dey11/leadly  
Type: Personal project

### Overview

Leadly is an AI-powered Reddit lead generation platform for founders, agencies, and B2B teams. It monitors Reddit conversations, scores buyer intent against ICPs, tracks keyword mentions, generates outreach drafts, enforces quotas, and supports SEO/content acquisition.

### Product Thinking

The core insight is that social lead generation is noisy. Keyword alerts alone are not enough because a good lead is defined by intent, context, urgency, and fit. Leadly treats Reddit as a signal source, then uses AI and user-defined ICPs to separate noise from actionable leads.

### Architecture

Leadly is a Bun monorepo with backend, frontend, and worker services. The backend uses Express 5, TypeScript, Prisma/Postgres, Redis, BullMQ, Winston, Dodo Payments, Resend, Google OAuth, Reddit/Nitter integrations, Gemini, and AI SDK providers. The frontend uses Next.js 16, React 19, Tailwind 4, Radix/local UI, TanStack Query, Motion, and Markdown rendering. Docker Compose runs backend, worker, and frontend.

### Implementation Decisions

The backend owns cookie-based sessions, billing, monitors, ICPs, keyword monitoring, schedules, leads, blog APIs, and admin logs. Hourly scheduler jobs create BullMQ scrape jobs for ICP monitoring, while keyword monitoring runs separately every 30 minutes. Billing quota enforcement is server-side. Dodo webhooks preserve raw body handling before JSON parsing. The project also includes SEO/GEO content surfaces, sitemap, robots, and `llms.txt`.

### Team And Role

This appears to be solo or very small-team SaaS work. My role covered product, backend, frontend, workers, billing, infra, AI workflows, and growth pages.

### What This Shows

Leadly is one of the strongest full-stack SaaS portfolio projects: async jobs, subscriptions, quotas, AI workflows, SEO content engine, CI/Docker deployment, and dashboard UX.

### Notes To Personalize

Docs are strong, but tests were not obvious. Add real lead-quality metrics, conversion stats, or demo screenshots if available.

## 23. yunami-bot

GitHub: https://github.com/Dey11/yunami-bot  
Type: Personal project

### Overview

Yunami Bot is a multiplayer Discord role-playing and storytelling bot. Users can register profiles, form parties, play branching stories, vote on choices, receive private information, and progress through role-aware narrative/game nodes.

### Product Thinking

The idea was to make Discord feel like a shared interactive game table. Instead of a single-player text adventure, the bot manages party state, votes, timers, private messages, combat, memory, and story progression across users.

### Architecture

The system has two services. The bot uses Discord.js v14, TypeScript, Bun tooling, Zod, and canvas/image dependencies. The server uses Express 5, Prisma 7, PostgreSQL/Neon-compatible adapter, Bun, and Docker Compose. The bot handles slash commands, buttons, modals, story rendering, and timers. The server persists users, party state, progress, sessions, votes, timers, minigames, and combat state. Bot-to-server calls include `x-discord-id`.

### Implementation Decisions

Story content is stored as JSON. The story engine dispatches many node types: narrative, choice, timed, DM, sequence, social, memory, combat, arc split, and meta. Party choices can use majority, first, last, or random outcome rules with a party-leader tiebreaker. On startup, the bot checks server health and restores active sessions, which makes the game more resilient to restarts.

### Team And Role

This was a personal game systems project. My role covered Discord interaction design, backend persistence, story engine architecture, party voting logic, timers, and recovery behavior.

### What This Shows

It is a strong event-driven systems project outside normal CRUD apps: multiplayer state, Discord routing, branching story data, timers, votes, persistence, and restart recovery.

### Notes To Personalize

Add screenshots or a walkthrough of an actual story session. The API auth model is suitable for trusted bot-to-server calls, not a public API.
