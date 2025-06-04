"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.02) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <motion.nav
      initial={{
        y: 5,
        filter: "blur(3px)",
      }}
      animate={{
        y: isScrolled ? 5 : 0,
        width: isScrolled ? "98%" : "100%",
        filter: "blur(0px)",
        backgroundColor: isScrolled ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0)",
        padding: isScrolled ? "0px 20px 5px 20px" : "",
        borderRadius: isScrolled ? "20px" : "",
        backdropFilter: isScrolled ? "blur(2px)" : "",
      }}
      transition={{
        duration: 0.2,
        ease: "easeInOut",
      }}
      className="sticky inset-x-0 top-0 z-50 mx-auto"
    >
      <ul className="flex items-center justify-between">
        {navItems.map((item) => (
          <Link href={item.href} key={item.href}>
            <li
              className={cn(
                "text-2xl font-medium hover:underline",
                item.href === pathname && "text-secondary",
              )}
            >
              {item.title}
            </li>
          </Link>
        ))}
      </ul>
    </motion.nav>
  );
}

const navItems = [
  {
    title: "dey.",
    href: "/",
  },
  {
    title: "projects",
    href: "/projects",
  },
  {
    title: "blog",
    href: "/blog",
  },
  {
    title: "contact",
    href: "/contact",
  },
];
