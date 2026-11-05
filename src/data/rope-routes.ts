import type { Point } from "@/lib/rope";

/**
 * Control points of the rope, per section, as [x%, y%] of that section.
 * They steer a B-spline, so the rope bends toward them without passing through
 * them. That keeps it free of kinks however far apart two points land.
 * The all-title and all-rows boxes stop at the page gutter, so 102% lands inside it.
 */
export const ropeRoutes: Record<string, Point[]> = {
  hero: [
    [4.2, 15],
    [12, 21],
    [32, 48],
    [52, 62],
    [68, 34],
    [90, 38],
    [84, 66],
    [64, 70],
    [72, 94],
  ],
  about: [
    [78, 10],
    [98, 34],
    [84, 60],
    [46, 70],
    [16, 78],
    [6, 96],
  ],
  td66: [
    [4, 14],
    [6, 40],
    [30, 66],
    [62, 32],
    [98, 24],
    [98, 62],
    [80, 94],
  ],
  mooncake: [
    [96, 12],
    [94, 46],
    [60, 34],
    [26, 26],
    [1, 42],
    [6, 78],
    [36, 94],
  ],
  "medical-exhibition": [
    [66, 12],
    [98, 20],
    [88, 46],
    [48, 60],
    [12, 58],
    [2, 84],
    [24, 98],
  ],
  "drink-test": [
    [8, 12],
    [1, 46],
    [20, 92],
    [50, 74],
    [60, 40],
    [99, 36],
    [99, 80],
    [72, 98],
  ],
  "art-space": [
    [94, 18],
    [70, 30],
    [38, 22],
    [5, 26],
    [1, 72],
    [34, 96],
    [62, 76],
    [68, 98],
  ],
  "corporate-design": [
    [88, 1.5],
    [99, 5],
    [99, 30],
    [78, 58],
    [58, 78],
    [60, 100],
  ],
  cta: [
    [74, 6],
    [92, 8],
    [99.5, 24],
    [99.5, 70],
    [92, 90],
    [60, 98],
  ],
  cv: [
    [36, 2.4],
    [26, 6],
    [60, 8],
    [99, 16],
    [99.4, 60],
    [92, 86],
    [58, 95],
    [26, 99],
  ],
  contact: [
    [24, 7],
    [40, 5],
  ],
  "all-title": [
    [94, -220],
    [94, -40],
    [96, 60],
    [102, 100],
    [102, 190],
  ],
  "all-rows": [
    [102, 50],
    [102, 100],
  ],
  "all-foot": [[98.3, 0]],
};
