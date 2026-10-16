import type { Category } from "./portfolio";

interface Point {
  x: number;
  y: number;
}

export const canvasSize = { width: 3200, height: 2800 };
export const canvasHome: Point = { x: 2050, y: 1470 };

export const cluster = {
  profile: { x: 1674, y: 1311 },
  folder: { x: 2174, y: 1326, size: 210 },
  orbit: { x: 1344, y: 1081 },
  badges: {
    medical: { x: 1523, y: 1311 },
    food: { x: 1505, y: 1550 },
    art: { x: 2493, y: 1193 },
    event: { x: 2526, y: 1425 },
  } satisfies Record<Category, Point>,
};

export const workPlacement: Record<string, Point & { size: number }> = {
  td66: { x: 1500, y: 1740, size: 300 },
  mooncake: { x: 874, y: 1747, size: 220 },
  pomegranate: { x: 1530, y: 2155, size: 190 },
  "spring-anniversary": { x: 554, y: 2047, size: 190 },
  "bistro-menu": { x: 1018, y: 2195, size: 260 },
  "black-garlic": { x: 602, y: 2387, size: 240 },
  "french-badge": { x: 1210, y: 2483, size: 230 },
  "tea-break": { x: 230, y: 1690, size: 210 },
  "drink-test": { x: 858, y: 1123, size: 220 },
  "health-platform": { x: 1240, y: 1060, size: 260 },
  "diagnostic-pen": { x: 786, y: 675, size: 240 },
  "alcohol-test": { x: 506, y: 947, size: 220 },
  "medical-editorial": { x: 1034, y: 371, size: 260 },
  "medical-exhibition": { x: 1354, y: 579, size: 280 },
  "art-space": { x: 2720, y: 900, size: 300 },
  "corporate-design": { x: 2610, y: 1690, size: 280 },
};
