"use client";

import Link from "next/link";
import { useState } from "react";

const email = "deydevelops@gmail.com";
const discordUsername = "sdey.";

// bump this when the site changes (dd/mm/yy)
const lastUpdated = "10/09/26";

type SocialItem =
  | {
      kind: "link";
      label: string;
      handle: string;
      href: string;
    }
  | {
      kind: "copy";
      label: string;
      handle: string;
      copyValue: string;
    };

const socials: SocialItem[] = [
  {
    kind: "copy",
    label: "discord",
    handle: discordUsername,
    copyValue: discordUsername,
  },
  {
    kind: "link",
    label: "github",
    handle: "dey11",
    href: "https://github.com/dey11",
  },
  {
    kind: "link",
    label: "email",
    handle: email,
    href: `mailto:${email}`,
  },
];

const rowClassName =
  "group flex w-full items-center justify-between gap-4 border-b border-white/15 py-5 text-left transition-colors hover:border-white/40";

function SocialRowContent({
  label,
  handle,
}: {
  label: string;
  handle: string;
}) {
  return (
    <>
      <span className="flex items-baseline gap-3">
        <span className="text-xl font-semibold md:text-2xl">{label}</span>
        <span className="text-sm text-white/45 md:text-base">{handle}</span>
      </span>
      <span className="inline-block text-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 md:text-2xl">
        ↗
      </span>
    </>
  );
}

export default function ConnectSection() {
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

  async function copyHandle(value: string, label: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedLabel(label);
      window.setTimeout(() => setCopiedLabel(null), 1600);
    } catch {
      setCopiedLabel(null);
    }
  }

  return (
    <section id="connect" className="pb-24 text-start">
      <p className="font-display pb-2 text-lg md:text-xl">(100)</p>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-semibold sm:text-4xl md:text-5xl lg:text-6xl">
            connect with me<span className="text-secondary">.</span>
          </h1>
          <p className="max-w-md text-lg text-pretty text-white/80 sm:text-xl">
            Got an idea, a role, or just want to say hi? The fastest way to
            reach me is Discord.
          </p>
        </div>

        <ul className="flex flex-col">
          {socials.map((social) => {
            const handle =
              social.kind === "copy" && copiedLabel === social.label
                ? "copied"
                : social.handle;

            return (
              <li key={social.label}>
                {social.kind === "link" ? (
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={rowClassName}
                  >
                    <SocialRowContent label={social.label} handle={handle} />
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => copyHandle(social.copyValue, social.label)}
                    aria-label={`Copy Discord username ${social.handle}`}
                    className={`${rowClassName} cursor-pointer`}
                  >
                    <SocialRowContent label={social.label} handle={handle} />
                    <span className="sr-only" aria-live="polite">
                      {copiedLabel === social.label
                        ? "Discord username copied"
                        : ""}
                    </span>
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-8 flex flex-col items-start justify-between gap-4 pt-2 text-sm text-white/50 sm:flex-row sm:items-center md:text-base">
        <p>
          Last updated on {lastUpdated} by dey
          <span className="text-secondary">.</span>
        </p>
        <p className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75 [animation-duration:1.6s] motion-reduce:animate-none" />
            <span className="relative inline-flex size-2 rounded-full bg-green-500" />
          </span>
          open for work
        </p>
      </div>
    </section>
  );
}
