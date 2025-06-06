import type { Metadata } from "next";
import { Darker_Grotesque } from "next/font/google";
import "./globals.css";
import Container from "@/components/container";
import Navbar from "@/components/navbar";
import { unstable_ViewTransition as ViewTransition } from "react";
import ScrollToTop from "@/components/scroll-to-top";
import { Analytics } from "@vercel/analytics/next";

const darkerGrotesque = Darker_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "dey's portfolio",
  description: "a fullstack developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ scrollBehavior: "smooth" }}>
      <body
        className={`${darkerGrotesque.className} bg-background text-foreground antialiased`}
      >
        <Analytics />
        <ScrollToTop />
        <Container>
          <ViewTransition>
            <Navbar />
            {children}
          </ViewTransition>
        </Container>
      </body>
    </html>
  );
}
