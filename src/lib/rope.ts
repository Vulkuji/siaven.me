import { curveBasis, line } from "d3-shape";

export type Point = [number, number];

const spline = line<Point>().curve(curveBasis);

export const splinePath = (points: Point[]) => spline(points) ?? "";

export function hexPath(cx: number, cy: number, radius: number) {
  const corners = [30, 90, 150, 210, 270, 330].map((degrees) => {
    const angle = (degrees * Math.PI) / 180;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    return `${x.toFixed(1)} ${y.toFixed(1)}`;
  });
  return `M${corners.join("L")}Z`;
}

/** The logo cat drawn in one line, inside a square slot measured in logo units (0-100). */
export function catLine(slot: { x: number; y: number; size: number }) {
  const unit = slot.size / 100;
  const at = (x: number, y: number) =>
    `${(slot.x + x * unit).toFixed(1)} ${(slot.y + y * unit).toFixed(1)}`;
  const eyeRadius = 7.5 * unit;
  const entry: Point[] = [
    [slot.x + 50 * unit, slot.y + 2 * unit],
    [slot.x + 50 * unit, slot.y + 29 * unit],
  ];
  const path =
    `Q${at(53, 28.6)} ${at(56, 30)}L${at(68.5, 18.5)}Q${at(72.5, 15.5)} ${at(73, 21)}L${at(74, 39)}` +
    `C${at(78, 44)} ${at(80.5, 50)} ${at(81, 58)}C${at(82, 72)} ${at(70, 82)} ${at(50, 82)}` +
    `C${at(30, 82)} ${at(18, 72)} ${at(19, 58)}C${at(19.5, 50)} ${at(22, 44)} ${at(26, 39)}` +
    `L${at(27, 21)}Q${at(27.5, 15.5)} ${at(31.5, 18.5)}L${at(44, 30)}Q${at(47, 29.2)} ${at(50, 29)}` +
    `C${at(50, 37)} ${at(45, 42)} ${at(40, 47.5)}` +
    `A${eyeRadius} ${eyeRadius} 0 1 1 ${at(40, 62.5)}A${eyeRadius} ${eyeRadius} 0 1 1 ${at(40, 47.5)}` +
    `C${at(47, 43)} ${at(52, 50)} ${at(55, 56)}Q${at(60, 50.5)} ${at(65, 56)}`;
  return {
    entry,
    path,
    eye: {
      x: slot.x + 40 * unit,
      y: slot.y + 55 * unit,
      radius: 4.4 * unit,
      bolt: 2.2 * unit,
    },
  };
}

export interface RopeTable {
  step: number;
  /** Lowest page y the rope has reached by each sampled length. */
  reach: number[];
}

export function measureRope(path: SVGPathElement, step = 12): RopeTable {
  const total = path.getTotalLength();
  const reach: number[] = [];
  let lowest = 0;
  for (let length = 0; length <= total; length += step) {
    lowest = Math.max(lowest, path.getPointAtLength(length).y);
    reach.push(lowest);
  }
  return { step, reach };
}

/** Length of rope needed to reach page height y. */
export function lengthAtY({ step, reach }: RopeTable, y: number) {
  let low = 0;
  let high = reach.length - 1;
  while (low < high) {
    const middle = (low + high) >> 1;
    if (reach[middle] < y) low = middle + 1;
    else high = middle;
  }
  return low * step;
}
