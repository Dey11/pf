import Signature from "@/components/signature";
import { heroItems, locationUrl } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="mt-5">
      <section className="mb-[13svh] flex min-h-[87svh] flex-col overflow-hidden">
        <p className="pb-2">(000)</p>

        <div className="flex flex-row-reverse justify-center gap-2">
          {heroItems.map((item, idx) => (
            <div
              key={item.title}
              style={{
                backgroundImage: `url(${item.imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: `calc(60svh - ${idx * 10}svh)`,
              }}
              className={`group relative lg:w-[341px]`}
            >
              <div className="absolute inset-x-0 bottom-0 flex h-full flex-col justify-end gap-3 bg-gradient-to-t from-black/80 to-black/0 p-4 text-white opacity-0 backdrop-blur-[2px] transition-opacity delay-75 duration-300 group-hover:opacity-100">
                <img
                  src={item.titleLogo}
                  alt={item.title}
                  fetchPriority="high"
                  className={cn(
                    "size-10",
                    item.title === "clarityhub" && "h-8 w-28",
                    item.title === "wabisabi design agency" && "h-8 w-36",
                  )}
                />
                <p className="cursor-default leading-tight">
                  {item.description}
                </p>

                <Link
                  href={item.live}
                  target="_blank"
                  className="w-fit underline underline-offset-2"
                >
                  live preview <span className="text-sm">→</span>
                </Link>

                <p className="cursor-default">tech stack</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex h-full grow flex-col items-center gap-4 lg:flex-row lg:justify-between">
          <p className="pt-4 text-lg font-semibold md:text-xl lg:block">
            currently open for work
          </p>
          <Signature />
          <Link
            href={locationUrl}
            target="_blank"
            className="pt-2 text-lg font-semibold underline underline-offset-3 md:text-xl lg:block lg:pt-4"
          >
            based on earth
          </Link>
        </div>
      </section>

      <section className="mb-20 flex flex-col overflow-hidden">
        <p className="pb-2">(001)</p>

        <h1 className="text-4xl font-semibold">
          about me<span className="text-secondary">.</span>
        </h1>

        <div className="flex flex-col justify-between gap-10 pt-10 lg:flex-row">
          <p className="order-2 text-5xl font-bold lg:order-1">
            it is{" "}
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
            <span className="text-secondary">.</span>
          </p>

          <div className="order-1 flex max-w-md flex-col items-end justify-between gap-10 lg:order-2">
            <p className="grow text-end text-2xl">
              im a passionate cs undergrad always keen to learn about new
              technology<span className="text-secondary">.</span> currently
              trying to get my foundations right also a quick learner with
              unwavering determination
              <span className="text-secondary">.</span>
            </p>

            <div className="group relative">
              <img
                src="/logos/github.svg"
                alt="github"
                className="absolute -top-4.5 right-2 -z-10 size-5 translate-y-0 transition-all duration-300 group-hover:translate-y-2"
              />
              <button className="bg-background flex cursor-pointer items-center justify-center gap-1 rounded-full border border-white px-5 pt-1 pb-2 leading-none">
                read more
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 text-end">
        <p className="pb-2">(010)</p>

        <h1 className="text-4xl font-semibold">
          tech stack {"<>"} skills<span className="text-secondary">.</span>
        </h1>

        <div className="flex justify-between">
          <div className="flex items-end gap-2">
            <p className="text-6xl font-semibold">
              /01<span className="text-secondary">.</span>
            </p>
            <h2 className="text-5xl font-semibold">languages</h2>
          </div>
        </div>
      </section>
    </div>
  );
}
