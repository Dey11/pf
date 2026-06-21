import BentoSection from "@/components/bento-section";
import ConnectSection from "@/components/connect-section";
import HeroSection from "@/components/hero-section";
import ExperienceSection from "@/components/experience-section";
import GithubContributions from "@/components/github-contributions";
import { techStackItems } from "@/lib/constants";
import Link from "next/link";
// commented out — sections below are being revamped
// import ContactForm from "@/components/contact-form";
// import HobbiesSection from "@/components/hobbies-section";
// import NowSection from "@/components/now-section";
// import { Mail } from "lucide-react";

export default function Home() {
  return (
    <div className="mt-5">
      <HeroSection />

      <section className="mb-40 flex flex-col overflow-hidden">
        <p className="font-display pb-2 text-lg md:text-xl">(000)</p>

        <h1 className="text-3xl font-semibold sm:text-4xl md:text-5xl lg:text-6xl">
          about me<span className="text-secondary">.</span>
        </h1>

        <div className="flex flex-col justify-between gap-10 pt-10 lg:flex-row">
          <p className="order-2 hidden text-xl font-bold sm:text-2xl md:text-3xl lg:order-1 lg:block lg:text-4xl">
            It is{" "}
            <span className="bg-gradient-to-r from-[#576265] via-[#757A7B] to-[#576265] bg-clip-text text-transparent">
              not in the stars
            </span>{" "}
            to
            <br />
            hold our destiny{" "}
            <span className="bg-gradient-to-r from-[#576265] via-[#757A7B] to-[#576265] bg-clip-text text-transparent">
              but in
              <br />
              ourselves
            </span>
          </p>

          <div className="order-1 ml-auto flex max-w-md flex-col items-end justify-between gap-10 lg:order-2 lg:ml-0">
            <p className="grow text-end text-lg sm:text-xl md:text-2xl">
              I write code, collect domains I'll probably never use, and
              over-engineer projects until they stop feeling like side projects
              <span className="text-secondary">.</span> Always learning, always
              shipping<span className="text-secondary">.</span> Looking for
              like-minded people to collab with
            </p>

            <div className="group relative w-fit">
              <img
                src="/logos/github.svg"
                alt="GitHub logo"
                className="absolute top-0 right-3 -z-10 size-5 translate-y-0 transition-transform duration-300 group-hover:-translate-y-5"
              />
              <Link href="https://github.com/dey11" target="_blank">
                <button
                  aria-label="Visit my GitHub"
                  className="bg-background flex cursor-pointer items-center justify-center gap-1 rounded-full border border-white px-5 py-2 text-sm md:text-base"
                >
                  GitHub
                  <span>→</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-16">
          <GithubContributions />
        </div>
      </section>

      <section className="pb-40 text-end">
        <p className="font-display pb-2 text-lg md:text-xl">(001)</p>

        <h1 className="text-3xl font-semibold sm:text-4xl md:text-5xl lg:text-6xl">
          tech stack {"<>"} skills<span className="text-secondary">.</span>
        </h1>

        <div className="flex flex-col items-end gap-5 pt-6 lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:pt-10">
          <div className="flex items-end gap-2">
            <p className="text-3xl font-semibold sm:text-4xl md:text-5xl lg:text-6xl">
              /01<span className="text-secondary">.</span>
            </p>
            <h2 className="text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl">
              languages
            </h2>
          </div>

          <ul className="flex flex-col overflow-x-hidden pl-5">
            <div className="flex flex-wrap justify-center gap-2 lg:-mr-5">
              {techStackItems.languages.map((item) => (
                <li key={item.id} className="group">
                  <div className="relative size-14 sm:size-16 md:size-24 lg:-skew-x-[15deg]">
                    <p className="absolute pl-1 text-xs font-semibold group-odd:top-0 group-even:bottom-0 lg:skew-x-[15deg] lg:text-sm">
                      {item.name}
                      <span className="text-secondary">.</span>
                    </p>
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="size-14 sm:size-16 md:size-24"
                    />
                  </div>
                </li>
              ))}
            </div>
          </ul>
        </div>

        <div className="flex flex-col items-start gap-5 pt-6 lg:flex-row-reverse lg:items-center lg:justify-between lg:gap-0 lg:pt-10">
          <div className="flex items-end gap-2">
            <p className="text-3xl font-semibold sm:text-4xl md:text-5xl lg:text-6xl">
              /02<span className="text-secondary">.</span>
            </p>
            <h2 className="text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl">
              frontend
            </h2>
          </div>

          <ul className="flex flex-col overflow-x-hidden lg:pr-5">
            <div className="flex flex-wrap gap-2 lg:-ml-5">
              {techStackItems.frontend.map((item) => (
                <li key={item.id} className="group">
                  <div className="relative size-14 sm:size-16 md:size-24 lg:skew-x-[15deg]">
                    <p className="absolute right-0 pr-1 text-xs font-semibold group-odd:top-0 group-even:bottom-0 lg:-skew-x-[15deg] lg:text-sm">
                      {item.name}
                      <span className="text-secondary">.</span>
                    </p>
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="size-14 sm:size-16 md:size-24"
                    />
                  </div>
                </li>
              ))}
            </div>
          </ul>
        </div>

        <div className="flex flex-col items-end gap-5 pt-6 lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:pt-10">
          <div className="flex items-end gap-2">
            <p className="text-3xl font-semibold sm:text-4xl md:text-5xl lg:text-6xl">
              /03<span className="text-secondary">.</span>
            </p>
            <h2 className="text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl">
              backend
            </h2>
          </div>

          <ul className="flex flex-col overflow-x-hidden pl-5">
            <div className="flex flex-wrap justify-center gap-2 lg:-mr-5">
              {techStackItems.backend.map((item) => (
                <li key={item.id} className="group">
                  <div className="relative size-14 sm:size-16 md:size-24 lg:-skew-x-[15deg]">
                    <p className="absolute pl-1 text-xs font-semibold group-odd:top-0 group-even:bottom-0 lg:skew-x-[15deg] lg:text-sm">
                      {item.name}
                      <span className="text-secondary">.</span>
                    </p>
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="size-14 sm:size-16 md:size-24"
                    />
                  </div>
                </li>
              ))}
            </div>
          </ul>
        </div>

        <div className="flex flex-col items-start gap-5 pt-6 lg:flex-row-reverse lg:items-center lg:justify-between lg:gap-0 lg:pt-10">
          <div className="flex items-end gap-2">
            <p className="text-3xl font-semibold sm:text-4xl md:text-5xl lg:text-6xl">
              /04<span className="text-secondary">.</span>
            </p>
            <h2 className="text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl">
              others
            </h2>
          </div>

          <ul className="flex flex-col overflow-x-hidden pr-5">
            <div className="flex flex-wrap justify-center gap-2 lg:-ml-5">
              {techStackItems.miscellaneous.map((item) => (
                <li key={item.id} className="group">
                  <div className="relative size-14 sm:size-16 md:size-24 lg:skew-x-[15deg]">
                    <p className="absolute right-0 pr-1 text-xs font-semibold group-odd:top-0 group-even:bottom-0 lg:-skew-x-[15deg] lg:text-sm">
                      {item.name}
                      <span className="text-secondary">.</span>
                    </p>
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="size-14 sm:size-16 md:size-24"
                    />
                  </div>
                </li>
              ))}
            </div>
          </ul>
        </div>
      </section>

      <ExperienceSection />

      <BentoSection />

      <ConnectSection />

      {/* ----------------------------------------------------------------
          The sections below (now / hobbies) are being revamped.
          Commented out for now — renumber the binary indices when restored:
          now -> (101), hobbies -> (110).
      ------------------------------------------------------------------- */}
      {/* <NowSection /> */}

      {/* <HobbiesSection /> */}

      {/* <section id="contact" className="py-10 md:py-20 md:pt-0">
        <p className="font-display pb-2 text-lg md:text-xl">(110)</p>

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
          <div className="flex flex-col gap-5 pb-5 md:gap-8 md:pb-0">
            <h1 className="text-3xl font-semibold sm:text-4xl md:text-5xl lg:text-6xl">
              connect with{" "}
              <span className="text-secondary tracking-tighter">dey.</span>
            </h1>

            <p className="max-w-sm text-lg">
              I’m always open to new opportunities and conversations. Drop me a
              message, and let’s connect about your role, ideas or projects!
            </p>

            <div className="flex gap-2">
              <Link href="https://x.com/dey_twts" target="_blank">
                <img
                  src="/logos/twt.svg"
                  alt="Dey's Twitter"
                  className="size-5"
                />
              </Link>
              <Link href="https://github.com/dey11" target="_blank">
                <img
                  src="/logos/github-form.svg"
                  alt="Dey's GitHub"
                  className="size-5"
                />
              </Link>
              <Link href="mailto:deydevelops@gmail.com" target="_blank">
                <Mail className="size-5" />
              </Link>
            </div>
          </div>

          <ContactForm />
        </div>
      </section> */}
    </div>
  );
}
