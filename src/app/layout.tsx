import type { Metadata } from "next";
import { Darker_Grotesque } from "next/font/google";
import "./globals.css";
import Container from "@/components/container";
import Navbar from "@/components/navbar";

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
    <html lang="en">
      <body
        className={`${darkerGrotesque.className} bg-background text-foreground antialiased`}
      >
        <Container>
          <Navbar />
          {children}
        </Container>
      </body>
    </html>
  );
}
