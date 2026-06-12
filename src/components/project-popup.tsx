"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ArrowUp, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

export type ProjectBox = {
  id: string;
  color: string;
  name: string;
  description: string;
  url: string;
  tags: string[];
  images: [string, string];
};

const imagePositions = [
  { className: "left-[8%] top-[16%] z-10 w-[58%]", rotate: -7 },
  { className: "right-[8%] bottom-[12%] w-[60%]", rotate: 6 },
] as const;

export default function ProjectPopup({
  box,
  onClose,
}: {
  box: ProjectBox;
  onClose: () => void;
}) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: {
          project: {
            name: box.name,
            description: box.description,
            tags: box.tags,
            live: box.url,
          },
        },
      }),
    [box.name, box.description, box.tags, box.url],
  );

  const { messages, sendMessage, status } = useChat({ transport });

  const chatActive = messages.length > 0;
  const isBusy = status === "submitted" || status === "streaming";

  // v4-flash reasons before answering — keep the typing indicator up until the
  // assistant has actually produced visible answer text (not just reasoning).
  const lastMessage = messages[messages.length - 1];
  const assistantHasText =
    lastMessage?.role === "assistant" &&
    lastMessage.parts.some((p) => p.type === "text" && p.text.length > 0);
  const showThinking = isBusy && !assistantHasText;

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
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isBusy]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isBusy) return;
    sendMessage({ text });
    setInput("");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-3 backdrop-blur-md sm:p-4"
    >
      <motion.div
        layoutId={`box-${box.id}`}
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-[88vh] max-h-[760px] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0b0b0d] p-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_24px_60px_-12px_rgba(0,0,0,0.8)] sm:rounded-3xl"
      >
        {/* close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-30 flex size-8 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/80 backdrop-blur-sm transition-colors hover:text-white"
        >
          <X className="size-4" />
        </button>

        {/* content area: project view + chat overlay stacked */}
        <div className="relative min-h-0 flex-1">
          {/* project view — blurs when the chat is active */}
          <motion.div
            animate={{
              filter: chatActive ? "blur(12px)" : "blur(0px)",
              scale: chatActive ? 1.03 : 1,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 overflow-y-auto"
          >
            {/* top: project images */}
            <div
              className={`${box.color} relative h-56 overflow-hidden rounded-[1.1rem] sm:h-72 sm:rounded-[1.25rem]`}
            >
              {box.images.map((src, i) => {
                const pos = imagePositions[i];
                return (
                  <motion.img
                    key={src + i}
                    src={src}
                    alt=""
                    aria-hidden
                    initial={{ y: 80, opacity: 0, rotate: pos.rotate }}
                    animate={{ y: 0, opacity: 1, rotate: pos.rotate }}
                    transition={{
                      type: "spring",
                      stiffness: 180,
                      damping: 22,
                      delay: 0.18 + i * 0.12,
                    }}
                    className={`absolute rounded-xl border border-white/20 object-cover shadow-2xl ${pos.className}`}
                  />
                );
              })}
            </div>

            {/* name + description */}
            <div className="px-3 pt-5 pb-20 sm:px-4 sm:pt-6 sm:pb-24">
              <h3 className="text-xl font-semibold sm:text-2xl md:text-3xl">
                {box.name}
                <span className="text-secondary">.</span>
              </h3>
              <p className="pt-3 text-sm leading-relaxed text-white/75 sm:text-base">
                {box.description}
              </p>
            </div>
          </motion.div>

          {/* chat overlay — frosted, sits above the blurred project view */}
          <AnimatePresence>
            {chatActive && (
              <motion.div
                ref={scrollRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 overflow-y-auto px-4 pt-14 pb-6"
              >
                <div className="flex flex-col gap-3">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={
                        m.role === "user"
                          ? "max-w-[82%] self-end rounded-2xl rounded-br-md border border-white/10 bg-white/15 px-4 py-2.5 text-sm text-white shadow-sm backdrop-blur-sm"
                          : "max-w-[88%] self-start rounded-2xl rounded-bl-md border border-white/10 bg-black/30 px-4 py-2.5 text-sm leading-relaxed text-white/90 backdrop-blur-sm"
                      }
                    >
                      {m.parts.map((part, i) =>
                        part.type === "text" ? (
                          <span key={i} className="whitespace-pre-wrap">
                            {part.text}
                          </span>
                        ) : null,
                      )}
                    </div>
                  ))}

                  {showThinking && (
                    <div className="max-w-[88%] self-start rounded-2xl rounded-bl-md border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-sm">
                      <span className="flex gap-1">
                        {[0, 1, 2].map((d) => (
                          <motion.span
                            key={d}
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: d * 0.2,
                            }}
                            className="size-1.5 rounded-full bg-white/70"
                          />
                        ))}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* input — pinned to the absolute bottom, never blurred */}
        <form
          onSubmit={handleSubmit}
          className="relative z-20 flex shrink-0 items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.04] p-1.5 pl-4 backdrop-blur-sm"
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
      </motion.div>
    </motion.div>
  );
}
