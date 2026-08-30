"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ArrowUp, Globe, X } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { assetUrl } from "@/lib/assets";
import { projectImageSource, type ProjectBox } from "@/lib/project-boxes";
import { techMeta, type TechKey } from "@/lib/tech-stack";

type Tab = "images" | "details" | "chat";

const TABS: { id: Tab; label: string }[] = [
  { id: "details", label: "Details" },
  { id: "chat", label: "Chat" },
];

const statusColor: Record<string, string> = {
  Live: "bg-emerald-400",
  WIP: "bg-amber-400",
  "In progress": "bg-amber-400",
  Archived: "bg-white/40",
};

const suggestions = [
  "What does this project do?",
  "What's the tech stack?",
  "What did you build here?",
];

export default function ProjectPopup({
  box,
  onClose,
}: {
  box: ProjectBox;
  onClose: () => void;
}) {
  const hasImages = box.images.length > 0;
  const [tab, setTab] = useState<Tab>("details");
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: {
          project: {
            name: box.name,
            description: `${box.description}\n\n${box.content}`,
            tags: box.tags,
            live: box.url,
            github: box.github,
          },
        },
      }),
    [box.name, box.description, box.content, box.tags, box.url, box.github],
  );

  const { messages, sendMessage, status } = useChat({ transport });

  const isBusy = status === "submitted" || status === "streaming";
  const lastMessage = messages[messages.length - 1];
  const assistantHasText =
    lastMessage?.role === "assistant" &&
    lastMessage.parts.some((p) => p.type === "text" && p.text.length > 0);
  const showThinking = isBusy && !assistantHasText;
  const hasMessages = messages.length > 0;

  // lock background scroll + close on escape while the popup is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  // keep the chat pinned to the latest message
  useEffect(() => {
    if (tab !== "chat") return;
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isBusy, tab]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isBusy) return;
    sendMessage({ text: trimmed });
    setInput("");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden overscroll-none bg-black/60 p-3 backdrop-blur-md sm:p-5"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 8 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
        className={`relative flex h-[90vh] w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0c] md:flex-row ${
          hasImages ? "max-w-5xl" : "max-w-3xl"
        }`}
      >
        {/* LEFT — project images (desktop). on mobile this becomes a tab. */}
        {hasImages && (
          <div
            data-lenis-prevent
            className={`custom-scrollbar hidden shrink-0 overflow-y-auto overscroll-contain md:block md:w-2/5 md:border-r md:border-white/10 ${box.color}`}
          >
            <div className="p-3">
              <ImageList box={box} />
            </div>
          </div>
        )}

        {/* RIGHT — tabs + content */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          {/* tab bar (with the close button, vertically centered) */}
          <div className="flex items-end justify-between gap-6 border-b border-white/10 px-6">
            <div className="flex items-center gap-6">
              {/* mobile-only Images tab — the left pane on desktop */}
              {hasImages && (
                <button
                  onClick={() => setTab("images")}
                  className={`relative pt-3 pb-2 text-base font-medium transition-colors md:hidden ${
                    tab === "images"
                      ? "text-white"
                      : "text-white/45 hover:text-white/70"
                  }`}
                >
                  Images
                  {tab === "images" && (
                    <motion.span
                      layoutId="tab-underline"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 32,
                      }}
                      className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-white"
                    />
                  )}
                </button>
              )}

              {TABS.map((t) => {
                const active = tab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`relative pt-3 pb-2 text-base font-medium transition-colors ${
                      active
                        ? "text-white"
                        : "text-white/45 hover:text-white/70"
                    }`}
                  >
                    {t.label}
                    {active && (
                      <motion.span
                        layoutId="tab-underline"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 32,
                        }}
                        className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-white"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={onClose}
              aria-label="Close"
              className="flex size-9 shrink-0 items-center justify-center self-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* content */}
          <div
            ref={scrollRef}
            data-lenis-prevent
            className="custom-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6"
          >
            {tab === "images" && hasImages ? (
              <ImageList box={box} />
            ) : tab === "details" ? (
              <Details box={box} />
            ) : (
              <ChatMessages
                messages={messages}
                showThinking={showThinking}
                name={box.name}
              />
            )}
          </div>

          {/* chat composer — only on the chat tab, pinned to the bottom */}
          {tab === "chat" && (
            <div className="shrink-0">
              {!hasMessages && (
                <div className="hidden flex-wrap gap-2 px-3 pb-1 sm:flex">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="m-3 mt-2 flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 p-1.5 pl-4"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`ask anything about ${box.name}`}
                  className="min-w-0 flex-1 bg-transparent py-2 text-sm text-white placeholder:text-white/40 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isBusy}
                  aria-label="Send"
                  className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-black transition-opacity disabled:opacity-30"
                >
                  <ArrowUp className="size-4.5" strokeWidth={2.4} />
                </button>
              </form>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ImageList({ box }: { box: ProjectBox }) {
  return (
    <div className="flex flex-col gap-3">
      {box.images.map((image, i) => {
        const src = projectImageSource(image);
        const alt = `${box.name} screenshot ${i + 1}`;

        if (typeof image !== "string") {
          return (
            <div
              key={src}
              className="w-full overflow-hidden rounded-lg bg-white/5"
            >
              <Image
                src={src}
                alt={alt}
                width={image.width}
                height={image.height}
                sizes="(max-width: 767px) calc(100vw - 4.5rem), 380px"
                className="h-auto w-full"
              />
            </div>
          );
        }

        return (
          <div
            key={src}
            className="relative aspect-video w-full overflow-hidden rounded-lg bg-white/5"
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 767px) calc(100vw - 4.5rem), 380px"
              className="object-cover object-top"
            />
          </div>
        );
      })}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="pb-2 text-xs font-semibold tracking-wider text-white/40 uppercase">
      {children}
    </h4>
  );
}

function Details({ box }: { box: ProjectBox }) {
  return (
    <div className="space-y-7">
      <div>
        <h3 className="text-2xl font-semibold text-white sm:text-3xl">
          {box.name}
          <span className="text-secondary">.</span>
        </h3>
        <p className="pt-1 text-sm text-white/60 sm:text-base">{box.tagline}</p>
      </div>

      <p className="text-sm leading-relaxed text-white/80 sm:text-base">
        {box.description}
      </p>

      {/* meta row — plain text with dividers, no chips */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm leading-none text-white/60">
        <span className="text-white/80">{box.type}</span>
        <Divider />
        <span className="inline-flex items-center gap-1.5 text-white/80">
          <span
            className={`size-2 rounded-full ${statusColor[box.status] ?? "bg-white/40"}`}
          />
          {box.status}
        </span>
        <Divider />
        <span>{box.year}</span>
        <Divider />
        <span>{box.duration}</span>
      </div>

      {/* markdown body */}
      <Markdown>{box.content}</Markdown>

      <div>
        <SectionLabel>tech stack</SectionLabel>
        <div className="flex flex-wrap gap-2.5">
          {box.tags.map((tag) => {
            const tech = techMeta[tag as TechKey];
            return (
              <span
                key={tag}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 shadow-sm inset-shadow-2xs inset-shadow-white/10 backdrop-blur-sm text-shadow-2xs"
              >
                {tech && (
                  <Image
                    src={tech.logo}
                    alt=""
                    width={16}
                    height={16}
                    aria-hidden
                    className="size-4 shrink-0"
                  />
                )}
                {tech?.label ?? tag}
              </span>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {box.url && (
          <a
            href={box.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            <Globe className="size-4" />
            live site
          </a>
        )}
        {box.github && (
          <a
            href={box.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            <Image
              src={assetUrl("/logos/github-form.svg")}
              alt=""
              width={16}
              height={16}
              aria-hidden
              className="size-4"
            />
            source
          </a>
        )}
      </div>
    </div>
  );
}

function Divider() {
  return <span className="h-3.5 w-px shrink-0 bg-white/20" />;
}

function Markdown({ children }: { children: string }) {
  return (
    <div className="space-y-3">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h2 className="pt-2 text-2xl leading-none font-semibold text-white sm:text-2xl">
              {children}
            </h2>
          ),
          h2: ({ children }) => (
            <h3 className="pt-2 text-xl leading-tight font-semibold text-white sm:text-xl">
              {children}
            </h3>
          ),
          h3: ({ children }) => (
            <h4 className="pt-2 text-lg leading-tight font-semibold text-white/90 sm:text-lg">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="text-sm leading-relaxed text-white/75 sm:text-base">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="marker:text-secondary list-disc space-y-1.5 pl-5 text-sm text-white/75 sm:text-base">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal space-y-1.5 pl-5 text-sm text-white/75 sm:text-base">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-secondary underline underline-offset-2"
            >
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-white">{children}</strong>
          ),
          code: ({ children }) => (
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm text-white">
              {children}
            </code>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-white/20 pl-3 text-white/60 italic">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="border-white/10" />,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

function ChatMessages({
  messages,
  showThinking,
  name,
}: {
  messages: ReturnType<typeof useChat>["messages"];
  showThinking: boolean;
  name: string;
}) {
  if (messages.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <p className="text-lg font-medium text-white/80">ask about {name}</p>
        <p className="max-w-xs pt-2 text-sm text-white/45">
          the assistant knows this project&apos;s details, stack, and what i
          built.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {messages.map((m) => {
        const text = m.parts
          .filter((p) => p.type === "text")
          .map((p) => p.text)
          .join("");
        // assistant message still reasoning (no text yet) — the dots cover it
        if (m.role === "assistant" && text.length === 0) return null;
        if (m.role === "user") {
          return (
            <div
              key={m.id}
              className="max-w-[82%] self-end rounded-2xl rounded-br-md bg-white/15 px-4 py-2.5 text-sm whitespace-pre-wrap text-white"
            >
              {text}
            </div>
          );
        }
        return (
          <div
            key={m.id}
            className="max-w-[88%] self-start rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm leading-relaxed text-white/90"
          >
            <Markdown>{text}</Markdown>
          </div>
        );
      })}

      {showThinking && (
        <div className="max-w-[88%] self-start rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] px-4 py-3">
          <span className="flex gap-1">
            {[0, 1, 2].map((d) => (
              <motion.span
                key={d}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }}
                className="size-1.5 rounded-full bg-white/70"
              />
            ))}
          </span>
        </div>
      )}
    </div>
  );
}
