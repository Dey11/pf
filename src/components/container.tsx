"use client";

import { cn } from "@/lib/utils";
import { useEffect } from "react";
import Lenis from "lenis";

export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis();

    // Use requestAnimationFrame to continuously update the scroll
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div className={cn("container mx-auto max-w-5xl px-2 py-2", className)}>
      {children}
    </div>
  );
}
