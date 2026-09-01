import AboutSection from "@/components/about-section";
import BentoSection from "@/components/bento-section";
import ConnectSection from "@/components/connect-section";
import HeroSection from "@/components/hero-section";
import ExperienceSection from "@/components/experience-section";
import DeferredGithubContributions from "@/components/deferred-github-contributions";
import ScreeningRoomSection from "@/components/screening-room-section";
import { techStackItems } from "@/lib/constants";
import Image from "next/image";
// commented out — sections below are being revamped
// import ContactForm from "@/components/contact-form";
// import HobbiesSection from "@/components/hobbies-section";
// import NowSection from "@/components/now-section";
// import { Mail } from "lucide-react";

export default function Home() {
  return (
    <div className="mt-5">
      <HeroSection />

      <AboutSection />

      <div className="pb-40">
        <DeferredGithubContributions />
      </div>

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
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={96}
                      height={96}
                      sizes="(max-width: 639px) 56px, (max-width: 767px) 64px, 96px"
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
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={96}
                      height={96}
                      sizes="(max-width: 639px) 56px, (max-width: 767px) 64px, 96px"
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
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={96}
                      height={96}
                      sizes="(max-width: 639px) 56px, (max-width: 767px) 64px, 96px"
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
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={96}
                      height={96}
                      sizes="(max-width: 639px) 56px, (max-width: 767px) 64px, 96px"
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

      <ScreeningRoomSection />

      <ConnectSection />

      {/* Legacy Now, Hobbies, and Field Notes sections remain unmounted while
          their strongest material is developed through Screening Room. */}
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
