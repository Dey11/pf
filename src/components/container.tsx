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
  const pathname = usePathname();

  useEffect(() => {
    // Initialize Lenis with proper configuration
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Use requestAnimationFrame to continuously update the scroll
    function raf(time: number) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

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
      lenis.destroy();
      lenisRef.current = null;
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

  // Force resize when content changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (lenisRef.current) {
        lenisRef.current.resize();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [children]);

  return (
    <div className={cn("container mx-auto max-w-5xl px-2 py-2", className)}>
      {children}
    </div>
  );
}
