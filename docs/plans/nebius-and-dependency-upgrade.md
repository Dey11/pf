# Nebius chat and dependency upgrade

## Status

Implementation complete locally. Deployment is pending fresh Vercel credentials and a rotated Nebius key.

## Goal

Move project chat from DeepSeek's direct provider package to DeepSeek V4 Flash through Nebius Token Factory, then update the application's direct dependencies to current compatible releases.

## Context

The existing `/api/chat` route already owns request limits, project context assembly, GitHub source context, and AI SDK streaming. The migration should preserve that contract while changing the model adapter and environment variable.

## Scope

- Replace `@ai-sdk/deepseek` with `@ai-sdk/openai-compatible`.
- Use Nebius Token Factory's OpenAI-compatible endpoint and `deepseek-ai/DeepSeek-V4-Flash-0731`.
- Replace `DEEPSEEK_API_KEY` with `NEBIUS_API_KEY` and add a tracked environment template.
- Update direct dependencies, including Next.js 16.3, AI SDK 7, Motion 13, and Prisma 7.
- Migrate Prisma 7 CLI configuration and the Neon runtime adapter.

## Non-goals

- No UI redesign or chat behavior changes.
- No database schema migration.
- No deployment, production environment mutation, or secret rotation through repository code.
- No replacement for the existing in-memory rate limiter.

## Chosen architecture

- Keep the route as orchestration and isolate Nebius provider construction in `src/lib/nebius.ts`.
- Preserve AI SDK's streamed UI message response rather than switching the client contract to the OpenAI SDK.
- Return HTTP 503 before processing a chat request when `NEBIUS_API_KEY` is absent.
- Use Prisma's `prisma-client` generator, root `prisma.config.ts`, and `@prisma/adapter-neon` because the configured database is Neon.
- Keep TypeScript 5.9 and ESLint 9 until the parser bundled by `eslint-config-next` supports TypeScript 7 and ESLint 10.

## Alternatives considered

- The OpenAI JavaScript SDK would match Nebius's sample code but would require replacing the existing AI SDK streaming protocol.
- The generic PostgreSQL Prisma adapter would work over PostgreSQL, but the Neon adapter matches the deployed serverless database.
- Updating TypeScript and ESLint to their newest majors was attempted and rejected because the current `typescript-eslint` parser does not support them.

## Validation

- `bun run lint`
- `bunx tsc --noEmit`
- `bun run build`
- Missing-key `/api/chat` request returns HTTP 503.
- Mocked provider request targets Nebius `/v1/chat/completions`, uses the configured model ID, and includes bearer authentication.
- Prisma 7 client generation succeeds.
- Read-only `SELECT 1` succeeds through `@prisma/adapter-neon`.

## Risks and follow-up

- The Nebius credential shared in chat must be rotated before use.
- Vercel needs `NEBIUS_API_KEY` in Development, Preview, and Production, and the obsolete `DEEPSEEK_API_KEY` can then be removed.
- Hosted changes cannot be made until `VERCEL_TOKEN` is replaced with a fresh token scoped to the allowed team.
