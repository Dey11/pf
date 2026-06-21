"use client";

import { useEffect, useRef, useState } from "react";

type GithubContributionsComponent =
  typeof import("./github-contributions").default;

function GithubContributionsSkeleton() {
  return (
    <div className="h-[150px] w-full animate-pulse rounded-lg bg-white/5" />
  );
}

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
    <div ref={rootRef}>
      {Component ? <Component /> : <GithubContributionsSkeleton />}
    </div>
  );
}
