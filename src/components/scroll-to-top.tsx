"use client";

import { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "scrollRestoration" in window.history
    ) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);

    const handleLoad = () => {
      window.scrollTo(0, 0);
    };

    if (document.readyState === "complete") {
      window.scrollTo(0, 0);
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return null;
}
