import type { Category } from "./portfolio";

interface Point {
  x: number;
  y: number;
}

export const canvasSize = { width: 3800, height: 3400 };
export const canvasHome: Point = { x: 2450, y: 1770 };

export const cluster = {
  profile: { x: 2090, y: 1680 },
  folder: { x: 2530, y: 1695, size: 200 },
  orbit: { x: 1744, y: 1381 },
  badges: {
    medical: { x: 2056, y: 1535 },
    food: { x: 1931, y: 1865 },
    art: { x: 2715, y: 1442 },
    event: { x: 2946, y: 1704 },
  } satisfies Record<Category, Point>,
};

export const workPlacement: Record<string, Point & { size: number }> = {
  "medical-editorial": { x: 670, y: 660, size: 240 },
  "alcohol-test": { x: 1330, y: 540, size: 220 },
  "medical-exhibition": { x: 1960, y: 720, size: 250 },
  "health-platform": { x: 1050, y: 1160, size: 240 },
  "drink-test": { x: 1640, y: 1240, size: 220 },
  "diagnostic-pen": { x: 480, y: 1450, size: 220 },
  "art-space": { x: 3120, y: 1000, size: 260 },
  "corporate-design": { x: 3140, y: 1800, size: 260 },
  td66: { x: 1250, y: 2000, size: 260 },
  mooncake: { x: 700, y: 1850, size: 220 },
  "tea-break": { x: 180, y: 2050, size: 220 },
  "spring-anniversary": { x: 1800, y: 2350, size: 200 },
  "bistro-menu": { x: 980, y: 2600, size: 240 },
  pomegranate: { x: 1520, y: 2780, size: 200 },
  "black-garlic": { x: 420, y: 2700, size: 220 },
  "french-badge": { x: 2080, y: 2900, size: 220 },
};
