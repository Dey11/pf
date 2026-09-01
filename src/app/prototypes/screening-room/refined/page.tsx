import type { Metadata } from "next";
import RefinedPrototypeHarness from "./prototype-harness";

export const metadata: Metadata = {
  title: "Refined Screening Room prototypes",
  robots: { index: false, follow: false },
};

export default async function RefinedScreeningRoomPrototypePage({
  searchParams,
}: {
  searchParams: Promise<{ v?: string | string[] }>;
}) {
  const rawVariant = (await searchParams).v;
  const parsedVariant = Number.parseInt(
    Array.isArray(rawVariant) ? rawVariant[0] : (rawVariant ?? "1"),
    10,
  );
  const initialVariant = Number.isFinite(parsedVariant)
    ? Math.min(Math.max(parsedVariant - 1, 0), 2)
    : 0;

  return <RefinedPrototypeHarness initialVariant={initialVariant} />;
}
