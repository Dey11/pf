import type { Metadata } from "next";
import { Darker_Grotesque } from "next/font/google";
import "./globals.css";
import Container from "@/components/container";
import Navbar from "@/components/navbar";
import { unstable_ViewTransition as ViewTransition } from "react";
import ScrollToTop from "@/components/scroll-to-top";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const darkerGrotesque = Darker_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "dey",
    template: "%s | dey",
  },
  description: "just another cs grad.",
  keywords: [
    "shreyan dey",
    "fullstack developer",
    "portfolio",
    "TypeScript",
    "Next.js",
    "React",
    "Node.js",
    "web developer",
    "frontend developer",
    "backend developer",
    "CS student",
    "software engineer",
    "JavaScript developer",
    "Tailwind CSS",
    "PostgreSQL",
    "Prisma",
    "AI applications",
    "web applications",
  ],
  authors: [{ name: "dey", url: "https://github.com/dey11" }],
  creator: "dey",
  publisher: "dey",
  metadataBase: new URL("https://sdey.me"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sdey.me",
    title: "dey's portfolio",
    description: "just another cs grad.",
    siteName: "dey's portfolio",
    images: [
      { url: "/og.jpg", width: 1200, height: 630, alt: "Dey Portfolio" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "dey's portfolio",
    description: "just another cs grad.",
    creator: "@dey_twts",
    site: "@dey_twts",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ scrollBehavior: "smooth" }}>
      <head>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Shreyan Dey",
              url: "https://sdey.me",
              sameAs: ["https://github.com/dey11", "https://x.com/dey_twts"],
              jobTitle: "Full‑stack Developer",
            }),
          }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "dey's portfolio",
              url: "https://sdey.me",
            }),
          }}
        />
      </head>
      <body
        className={`${darkerGrotesque.className} bg-background text-foreground antialiased`}
      >
        <SpeedInsights />
        <Analytics />
        <ScrollToTop />
        <Container>
          <ViewTransition>
            <header>
              <Navbar />
            </header>
            <main>{children}</main>
          </ViewTransition>
        </Container>
      </body>
    </html>
  );
}
