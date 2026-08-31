"use client";

import { useEffect, useRef, useState } from "react";
import GithubContributionsSkeleton from "./github-contributions-skeleton";

type GithubContributionsComponent =
  typeof import("./github-contributions").default;

export default function DeferredGithubContributions() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [Component, setComponent] =
    useState<GithubContributionsComponent | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "500px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad || Component) return;
    let cancelled = false;

    import("./github-contributions").then((mod) => {
      if (!cancelled) setComponent(() => mod.default);
    });

    return () => {
      cancelled = true;
    };
  }, [Component, shouldLoad]);

  return (
    <div ref={rootRef} data-github-contributions-root>
      {Component ? <Component /> : <GithubContributionsSkeleton />}
    </div>
  );
}
