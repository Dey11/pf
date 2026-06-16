import Link from "next/link";

const email = "deydevelops@gmail.com";

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
    handle: "deydevelops",
    href: `mailto:${email}`,
  },
];

export default function ConnectSection() {
  return (
    <section id="connect" className="pb-24 text-start">
      <p className="font-display pb-2 text-lg md:text-xl">(100)</p>

      <h1 className="text-3xl font-semibold sm:text-4xl md:text-5xl lg:text-6xl">
        connect with me<span className="text-secondary">.</span>
      </h1>

      <div className="flex flex-col gap-12 pt-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
        {/* left — pitch */}
        <div className="flex max-w-xl flex-col gap-8">
          <p className="text-lg text-white/80 sm:text-xl md:text-2xl">
            Got an idea, a role, or just want to say hi? My inbox is always open.
            The fastest way to reach me is a quick email.
          </p>
        </div>

        {/* right — social rows with sliding arrow */}
        <ul className="flex w-full flex-col lg:max-w-sm">
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
      <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/15 pt-6 text-sm text-white/50 sm:flex-row sm:items-center md:text-base">
        <p>© {new Date().getFullYear()} shreyan dey</p>
        <p className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-green-500" />
          </span>
          open for work
        </p>
      </div>
    </section>
  );
}
