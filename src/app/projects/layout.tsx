import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "not found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
