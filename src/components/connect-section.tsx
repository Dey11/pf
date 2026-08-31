import Link from "next/link";

const email = "deydevelops@gmail.com";

// bump this when the site changes (dd/mm/yy)
const lastUpdated = "21/06/26";

const socials = [
  {
    label: "twitter",
    handle: "@dey_twts",
    href: "https://x.com/dey_twts",
  },
  {
    label: "github",
    handle: "dey11",
    href: "https://github.com/dey11",
  },
  {
    label: "email",
    handle: email,
    href: `mailto:${email}`,
  },
];

export default function ConnectSection() {
  return (
    <section id="connect" className="pb-24 text-start">
      <p className="font-display pb-2 text-lg md:text-xl">(100)</p>

      {/* two columns: heading + pitch on the left, links on the right. */}
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* col 1 — heading + pitch */}
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-semibold sm:text-4xl md:text-5xl lg:text-6xl">
            connect with me<span className="text-secondary">.</span>
          </h1>
          <p className="max-w-md text-lg text-white/80 sm:text-xl">
            Got an idea, a role, or just want to say hi? My inbox is always
            open. The fastest way to reach me is a quick email.
          </p>
        </div>

        {/* col 2 — social rows with sliding arrow */}
        <ul className="flex flex-col">
          {socials.map((social) => (
            <li key={social.label}>
              <Link
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 border-b border-white/15 py-5 transition-colors hover:border-white/40"
              >
                <span className="flex items-baseline gap-3">
                  <span className="text-xl font-semibold md:text-2xl">
                    {social.label}
                  </span>
                  <span className="text-sm text-white/45 md:text-base">
                    {social.handle}
                  </span>
                </span>
                <span className="inline-block text-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 md:text-2xl">
                  ↗
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* footer line */}
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
