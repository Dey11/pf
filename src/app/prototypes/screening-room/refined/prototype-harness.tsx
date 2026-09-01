"use client";

import PrototypeStage from "../../prototype-stage";
import FocusVariant from "./focus-variant";
import GalleryVariant from "./gallery-variant";
import ShelfVariant from "./shelf-variant";

const variants = [
  { name: "Gallery", Component: GalleryVariant },
  { name: "Focus", Component: FocusVariant },
  { name: "Shelf", Component: ShelfVariant },
];

export default function RefinedPrototypeHarness({
  initialVariant,
}: {
  initialVariant: number;
}) {
  return (
    <PrototypeStage
      variants={variants}
      initialVariant={initialVariant}
      label="screening room / refined"
    />
  );
}
