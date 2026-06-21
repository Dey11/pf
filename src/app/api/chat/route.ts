import { deepseek } from "@ai-sdk/deepseek";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

export const maxDuration = 30;

// ---- guards -----------------------------------------------------------------
// per-IP fixed-window rate limit + input/output size caps so the public chat
// endpoint can't be abused. the limiter is in-memory (per server instance) —
// fine for a portfolio; swap for Upstash/Redis if distributed limits are needed.
const RATE_LIMIT = 8; // requests
const RATE_WINDOW_MS = 60_000; // per minute
const MAX_MESSAGES = 20; // conversation length cap
const MAX_INPUT_CHARS = 6_000; // total user-text cap per request
const MAX_OUTPUT_TOKENS = 500; // model output cap

const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return { ok: true, remaining: RATE_LIMIT - 1, retryAfter: 0 };
  }

  if (entry.count >= RATE_LIMIT) {
    return {
      ok: false,
      remaining: 0,
      retryAfter: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  entry.count += 1;
  return { ok: true, remaining: RATE_LIMIT - entry.count, retryAfter: 0 };
}

// opportunistically drop expired entries so the map doesn't grow unbounded
function sweep() {
  const now = Date.now();
  for (const [key, entry] of hits) if (now > entry.resetAt) hits.delete(key);
}

function textLength(messages: UIMessage[]) {
  let total = 0;
  for (const m of messages) {
    for (const part of m.parts ?? []) {
      if (part.type === "text") total += part.text.length;
    }
  }
  return total;
}

type ProjectContext = {
  name?: string;
  description?: string;
  tags?: string[];
  live?: string | null;
  github?: string | null;
};

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "anonymous";

  if (Math.random() < 0.1) sweep();

  const limit = rateLimit(ip);
  if (!limit.ok) {
    return new Response(
      JSON.stringify({ error: "Too many requests. Please slow down." }),
      {
        status: 429,
        headers: {
          "content-type": "application/json",
          "retry-after": String(limit.retryAfter),
        },
      },
    );
  }

  const {
    messages,
    project,
  }: { messages: UIMessage[]; project?: ProjectContext } = await req.json();

  // input guards
  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: "No messages provided." }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }
  if (messages.length > MAX_MESSAGES || textLength(messages) > MAX_INPUT_CHARS) {
    return new Response(
      JSON.stringify({ error: "Conversation too long. Start a new chat." }),
      { status: 413, headers: { "content-type": "application/json" } },
    );
  }

  const system = `You are a concise, friendly assistant embedded in Dey's portfolio. You help visitors learn about the project below by answering their questions.

Project:
- Name: ${project?.name ?? "n/a"}
- Description: ${project?.description ?? "n/a"}
${project?.tags?.length ? `- Tech stack: ${project.tags.join(", ")}` : ""}
${project?.live ? `- Live URL: ${project.live}` : ""}
${project?.github ? `- Source: ${project.github}` : ""}

Keep replies short (1-3 sentences unless asked for more). Stay focused on this project and its technology. If asked something unrelated, gently steer the conversation back to the project.`;

  const result = streamText({
    model: deepseek("deepseek-v4-flash"),
    system,
    messages: await convertToModelMessages(messages),
    maxOutputTokens: MAX_OUTPUT_TOKENS,
  });

  return result.toUIMessageStreamResponse();
}
