export type Ground = "ink" | "bone" | "blue";

/** Position of one picture on a project stage, in percent of the stage box. */
export interface ShowcaseFigure {
  left: number;
  top: number;
  width: number;
  tilt: number;
  speed: number;
  depth: number;
}

export interface ShowcaseEntry {
  id: string;
  ground: Ground;
  /** Giant background word, one string per line. */
  word: string[];
  /** Width of the widest word line in em, used to fit it to the page in CSS. */
  em: number;
  /** Stage height in vw. */
  height: number;
  drift: 1 | -1;
  accentWord?: boolean;
  figures: ShowcaseFigure[];
}

const figure = (
  left: number,
  top: number,
  width: number,
  tilt: number,
  speed: number,
  depth: number,
): ShowcaseFigure => ({ left, top, width, tilt, speed, depth });

export const showcase: ShowcaseEntry[] = [
  {
    id: "td66",
    ground: "ink",
    word: ["TD66"],
    em: 2.925,
    height: 44,
    drift: -1,
    figures: [
      figure(23, 38, 46, -1.2, 0.05, 10),
      figure(3, 42, 16, 2.2, 0.08, 22),
      figure(72, 58, 27, -1.8, -0.06, 18),
    ],
  },
  {
    id: "mooncake",
    ground: "bone",
    word: ["MOON"],
    em: 3.62,
    height: 42,
    drift: 1,
    accentWord: true,
    figures: [
      figure(4, 36, 40, 1, 0.05, 10),
      figure(47, 42, 26, -1.6, -0.06, 22),
      figure(78, 32, 19, 1.8, 0.08, 18),
    ],
  },
  {
    id: "medical-exhibition",
    ground: "ink",
    word: ["EXPO"],
    em: 3.16,
    height: 44,
    drift: -1,
    figures: [
      figure(30, 39, 40, 0.8, 0.05, 10),
      figure(3, 45, 24, -2, -0.06, 22),
      figure(73, 52, 24, 1.8, 0.08, 18),
    ],
  },
  {
    id: "drink-test",
    ground: "bone",
    word: ["MEDICAL", "PACKAGING"],
    em: 6.79,
    height: 50,
    drift: 1,
    figures: [
      figure(3, 44, 36, -1, 0.05, 10),
      figure(41, 47, 30, 1, -0.06, 22),
      figure(73, 53, 25, -1.5, 0.08, 18),
    ],
  },
  {
    id: "art-space",
    ground: "blue",
    word: ["ART", "EDUCATION"],
    em: 6.694,
    height: 48,
    drift: -1,
    figures: [
      figure(3, 47, 44, -1, 0.05, 10),
      figure(49, 48, 28, 1.4, -0.06, 22),
      figure(80, 44, 16, -1.8, 0.08, 18),
    ],
  },
  {
    id: "corporate-design",
    ground: "bone",
    word: ["CORPORATE", "TRAINING"],
    em: 7.083,
    height: 48,
    drift: 1,
    figures: [
      figure(28, 45, 42, 1, 0.05, 10),
      figure(3, 50, 22, -1.6, 0.08, 22),
      figure(73, 55, 24, 1.6, -0.06, 18),
    ],
  },
];
