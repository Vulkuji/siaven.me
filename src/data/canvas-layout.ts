import type { Category } from "./portfolio";

interface Point {
  x: number;
  y: number;
}

export const canvasSize = { width: 3200, height: 2800 };
export const canvasHome: Point = { x: 2050, y: 1470 };

export const cluster = {
  profile: { x: 1690, y: 1372 },
  folder: { x: 2210, y: 1384, size: 210 },
  orbit: { x: 1344, y: 1081 },
  badges: {
    medical: { x: 1697, y: 1200 },
    food: { x: 1505, y: 1550 },
    art: { x: 2493, y: 1193 },
    event: { x: 2526, y: 1425 },
  } satisfies Record<Category, Point>,
};

export const workPlacement: Record<string, Point & { size: number }> = {
  "health-platform": { x: 1150, y: 760, size: 240 },
  "drink-test": { x: 1540, y: 700, size: 220 },
  "medical-exhibition": { x: 1880, y: 560, size: 240 },
  "diagnostic-pen": { x: 780, y: 640, size: 220 },
  "alcohol-test": { x: 1260, y: 280, size: 220 },
  "medical-editorial": { x: 1640, y: 140, size: 240 },
  "art-space": { x: 2700, y: 760, size: 260 },
  "corporate-design": { x: 2700, y: 1720, size: 260 },
  td66: { x: 1380, y: 1760, size: 260 },
  mooncake: { x: 960, y: 1700, size: 220 },
  pomegranate: { x: 1580, y: 2250, size: 200 },
  "spring-anniversary": { x: 560, y: 1880, size: 200 },
  "bistro-menu": { x: 1080, y: 2200, size: 240 },
  "black-garlic": { x: 300, y: 2350, size: 220 },
  "french-badge": { x: 700, y: 2420, size: 220 },
  "tea-break": { x: 140, y: 1780, size: 220 },
};
