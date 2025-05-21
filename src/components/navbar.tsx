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
    if (latest > 0.1) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <motion.nav
      animate={{
        y: isScrolled ? 5 : 0,
        width: isScrolled ? "90%" : "100%",
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="sticky inset-x-0 top-0 z-50 mx-auto"
    >
      <ul className="flex items-center justify-between">
        {navItems.map((item) => (
          <Link href={item.href} key={item.href}>
            <li
              className={cn(
                "text-xl font-medium hover:underline",
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
    title: "skills",
    href: "/skills",
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
