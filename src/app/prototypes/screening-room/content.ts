export type ScreeningTitle = {
  title: string;
  kind: "Film" | "Series";
  status: "Now watching" | "Favorite";
};

export const screeningTitles: ScreeningTitle[] = [
  {
    title: "Stranger Things",
    kind: "Series",
    status: "Now watching",
  },
  {
    title: "Better Call Saul",
    kind: "Series",
    status: "Favorite",
  },
  {
    title: "Breaking Bad",
    kind: "Series",
    status: "Favorite",
  },
  {
    title: "The Office",
    kind: "Series",
    status: "Favorite",
  },
];
