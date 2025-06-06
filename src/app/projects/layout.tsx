import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "projects",
  description:
    "explore my portfolio of web applications, ai integrations, and full-stack solutions.",
  keywords: [
    "dey's projects",
    "portfolio projects",
    "web applications",
    "ai integrations",
    "full-stack solutions",
  ],
  openGraph: {
    title: "projects | dey",
    description:
      "explore my portfolio of web applications, ai integrations, and full-stack solutions.",
    url: "https://sdey.me/projects",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "projects | dey",
    description:
      "explore my portfolio of web applications, ai integrations, and full-stack solutions built with modern technologies.",
  },
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
