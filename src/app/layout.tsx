import type { Metadata } from "next";
import { Darker_Grotesque, Inter, Caveat } from "next/font/google";
import "./globals.css";
import Container from "@/components/container";
import { ViewTransition } from "react";
import ScrollToTop from "@/components/scroll-to-top";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Agentation } from "agentation";
import { assetUrl } from "@/lib/assets";

const darkerGrotesque = Darker_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-darker-grotesque",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-handwriting",
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
  icons: {
    icon: [{ url: assetUrl("/favicon.ico"), type: "image/x-icon" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sdey.me",
    title: "dey's portfolio",
    description: "just another cs grad.",
    siteName: "dey's portfolio",
    images: [
      {
        url: assetUrl("/og.jpg"),
        width: 1200,
        height: 630,
        alt: "Dey Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "dey's portfolio",
    description: "just another cs grad.",
    creator: "@dey_twts",
    site: "@dey_twts",
    images: [assetUrl("/og.jpg")],
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
        className={`${darkerGrotesque.variable} ${inter.variable} ${caveat.variable} bg-background text-foreground antialiased`}
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <SpeedInsights />
        <Analytics />
        <ScrollToTop />
        <Container>
          <ViewTransition>
            <main>{children}</main>
          </ViewTransition>
        </Container>
        <footer
          aria-label="Shreyan"
          className="group/footer h-[clamp(3.5rem,13vw,11rem)] overflow-hidden"
        >
          <p
            aria-hidden
            className="font-display group-hover/footer:text-secondary translate-y-[0.08em] text-center text-[clamp(5.75rem,23vw,24rem)] leading-[0.68] font-bold tracking-[-0.08em] text-transparent uppercase transition-colors duration-200 ease-[cubic-bezier(0.19,1,0.22,1)] [-webkit-text-stroke:1.5px_rgba(255,255,255,0.9)] motion-reduce:transition-none"
          >
            Shreyan
          </p>
        </footer>
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
