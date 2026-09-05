"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Initialize Lenis with proper configuration
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    // expose the instance so other components can smooth-scroll programmatically
    // (e.g. clicking a hero box scrolls to its project in the bento grid)
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    // Use requestAnimationFrame to continuously update the scroll
    function raf(time: number) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    // Lenis observes the document root, whose box does not reliably resize when
    // an animated descendant grows. Watch the rendered page container so its
    // final height always refreshes the scroll limit.
    let contentResizeTimer: ReturnType<typeof setTimeout> | null = null;
    const contentResizeObserver = new ResizeObserver(() => {
      if (contentResizeTimer) clearTimeout(contentResizeTimer);
      contentResizeTimer = setTimeout(() => lenis.resize(), 100);
    });

    if (containerRef.current) {
      contentResizeObserver.observe(containerRef.current);
    }

    // Handle window resize to recalculate scroll bounds
    const handleResize = () => {
      lenis.resize();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener("resize", handleResize);
      contentResizeObserver.disconnect();
      if (contentResizeTimer) clearTimeout(contentResizeTimer);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  // Handle route changes - scroll to top and resize
  useEffect(() => {
    if (lenisRef.current) {
      // Small delay to ensure content is rendered
      setTimeout(() => {
        lenisRef.current?.scrollTo(0, { immediate: true });
        lenisRef.current?.resize();
      }, 100);
    }
  }, [pathname]);

  return (
    <div
      ref={containerRef}
      className={cn("container mx-auto max-w-6xl px-2 pt-4 pb-1", className)}
    >
      {children}
    </div>
  );
}
