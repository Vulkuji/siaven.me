import { useEffect, useRef } from "react";
import { useAnimationFrame } from "motion/react";
import { ropeRoutes } from "@/data/rope-routes";
import {
  catLine,
  hexPath,
  lengthAtY,
  measureRope,
  splinePath,
  type Point,
  type RopeTable,
} from "@/lib/rope";
import { hasFinePointer, pointer, prefersReducedMotion } from "@/lib/pointer";

const svgNamespace = "http://www.w3.org/2000/svg";

interface RopeState {
  total: number;
  drawn: number;
  table: RopeTable | null;
  catStart: number;
  bolts: { element: SVGGElement; at: number }[];
  blue: [number, number];
  eye: { x: number; y: number; radius: number } | null;
}

const pageRect = (element: Element) => {
  const bounds = element.getBoundingClientRect();
  return {
    x: bounds.left + window.scrollX,
    y: bounds.top + window.scrollY,
    width: bounds.width,
    height: bounds.height,
  };
};

/** One rope falls through the page with the scroll and, on the home page, ends as the logo cat. */
export function RopeLayer({ layoutKey }: { layoutKey: string }) {
  const svg = useRef<SVGSVGElement>(null);
  const line = useRef<SVGPathElement>(null);
  const lineOnBlue = useRef<SVGPathElement>(null);
  const blueRect = useRef<SVGRectElement>(null);
  const boltLayer = useRef<SVGGElement>(null);
  const eye = useRef<SVGGElement>(null);
  const head = useRef<SVGCircleElement>(null);
  const halo = useRef<SVGCircleElement>(null);
  const reduced = useRef(false);
  const fine = useRef(false);
  const rope = useRef<RopeState>({
    total: 0,
    drawn: 0,
    table: null,
    catStart: 0,
    bolts: [],
    blue: [0, 0],
    eye: null,
  });

  function render() {
    const state = rope.current;
    if (!line.current || !lineOnBlue.current || !state.total) return;
    const offset = String(state.total - state.drawn);
    line.current.style.strokeDashoffset = offset;
    lineOnBlue.current.style.strokeDashoffset = offset;
    const tip = line.current.getPointAtLength(state.drawn);
    for (const circle of [head.current, halo.current]) {
      circle?.setAttribute("cx", String(tip.x));
      circle?.setAttribute("cy", String(tip.y));
    }
    svg.current?.classList.toggle(
      "head-white",
      tip.y > state.blue[0] && tip.y < state.blue[1],
    );
    for (const bolt of state.bolts) {
      bolt.element.classList.toggle("on", state.drawn >= bolt.at);
    }
    eye.current?.classList.toggle(
      "on",
      Boolean(state.eye) && state.drawn >= state.total - 4,
    );
  }

  useEffect(() => {
    reduced.current = prefersReducedMotion();
    fine.current = hasFinePointer();
    rope.current.drawn = 0;

    const build = () => {
      const element = svg.current;
      const path = line.current;
      if (!element || !path || !lineOnBlue.current) return;
      const state = rope.current;
      const root = document.documentElement;
      element.style.display = "none";
      const width = root.clientWidth;
      const height = root.scrollHeight;
      element.style.display = "";
      element.setAttribute("width", String(width));
      element.setAttribute("height", String(height));
      element.setAttribute("viewBox", `0 0 ${width} ${height}`);

      const sections = [
        ...document.querySelectorAll<HTMLElement>("[data-route]"),
      ];
      const points: Point[] = sections.flatMap((section) => {
        const box = pageRect(section);
        return (ropeRoutes[section.dataset.route!] ?? []).map(
          ([x, y]): Point => [
            box.x + (box.width * x) / 100,
            box.y + (box.height * y) / 100,
          ],
        );
      });

      const slot = document.querySelector(".cat-slot");
      const box = slot && pageRect(slot);
      const cat = box ? catLine({ x: box.x, y: box.y, size: box.width }) : null;
      const body = splinePath(cat ? [...points, ...cat.entry] : points);
      path.setAttribute("d", body);
      state.catStart = path.getTotalLength();
      const whole = cat ? body + cat.path : body;
      path.setAttribute("d", whole);
      lineOnBlue.current.setAttribute("d", whole);
      state.total = path.getTotalLength();
      state.table = measureRope(path);
      const dash = `${state.total} ${state.total}`;
      path.style.strokeDasharray = dash;
      lineOnBlue.current.style.strokeDasharray = dash;

      const blue = document.querySelector(".t-blue");
      const band = blue && pageRect(blue);
      state.blue = band ? [band.y, band.y + band.height] : [0, 0];
      blueRect.current?.setAttribute("width", String(width));
      blueRect.current?.setAttribute("y", String(band?.y ?? 0));
      blueRect.current?.setAttribute("height", String(band?.height ?? 0));

      /* Bolts sit exactly where the rope crosses into the next section. */
      const layer = boltLayer.current!;
      layer.textContent = "";
      const crossings = [
        0,
        ...sections.slice(1).map((section) => {
          return lengthAtY(state.table!, pageRect(section).y);
        }),
      ];
      state.bolts = crossings.map((at) => {
        const { x, y } = path.getPointAtLength(at);
        const bolt = document.createElementNS(svgNamespace, "g");
        bolt.setAttribute("class", "bolt");
        const ring = document.createElementNS(svgNamespace, "circle");
        ring.setAttribute("cx", String(x));
        ring.setAttribute("cy", String(y));
        ring.setAttribute("r", "10");
        const nut = document.createElementNS(svgNamespace, "path");
        nut.setAttribute("d", hexPath(x, y, 5.5));
        bolt.append(ring, nut);
        layer.append(bolt);
        return { element: bolt, at };
      });

      state.eye = cat?.eye ?? null;
      if (cat && eye.current) {
        const [iris, socket] = [
          eye.current.querySelector("circle")!,
          eye.current.querySelector("path")!,
        ];
        iris.setAttribute("cx", String(cat.eye.x));
        iris.setAttribute("cy", String(cat.eye.y));
        iris.setAttribute("r", String(cat.eye.radius));
        socket.setAttribute("d", hexPath(0, 0, cat.eye.bolt));
        socket.setAttribute(
          "transform",
          `translate(${cat.eye.x} ${cat.eye.y})`,
        );
      }
      if (reduced.current) state.drawn = state.total;
      state.drawn = Math.min(state.drawn, state.total);
      render();
    };

    build();
    let pending = 0;
    const observer = new ResizeObserver(() => {
      window.clearTimeout(pending);
      pending = window.setTimeout(build, 120);
    });
    observer.observe(document.body);
    return () => {
      window.clearTimeout(pending);
      observer.disconnect();
    };
  }, [layoutKey]);

  useAnimationFrame(() => {
    const state = rope.current;
    if (!state.table || reduced.current) return;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    let target = state.total;
    if (window.scrollY < maxScroll - 4) {
      const length = lengthAtY(
        state.table,
        window.scrollY + window.innerHeight * 0.72,
      );
      target = length >= state.catStart ? state.total : length;
    }
    const delta = target - state.drawn;
    if (Math.abs(delta) > 0.3) {
      const cap =
        state.drawn > state.catStart && delta > 0
          ? 11
          : Math.max(16, Math.abs(delta) * 0.16);
      state.drawn += Math.sign(delta) * Math.min(Math.abs(delta), cap);
      render();
    }
    if (state.eye && fine.current && pointer.moved && eye.current) {
      const angle = Math.atan2(
        pointer.y + window.scrollY - state.eye.y,
        pointer.x - state.eye.x,
      );
      const shift = state.eye.radius * 0.28;
      const x = state.eye.x + Math.cos(angle) * shift;
      const y = state.eye.y + Math.sin(angle) * shift;
      eye.current
        .querySelector("path")
        ?.setAttribute(
          "transform",
          `translate(${x} ${y}) rotate(${(angle * 180) / Math.PI})`,
        );
    }
  });

  return (
    <svg ref={svg} className="rope" aria-hidden="true">
      <defs>
        <clipPath id="rope-blue-clip">
          <rect ref={blueRect} />
        </clipPath>
      </defs>
      <path ref={line} className="rope-line" />
      <path
        ref={lineOnBlue}
        className="rope-line on-blue"
        clipPath="url(#rope-blue-clip)"
      />
      <g ref={boltLayer} />
      <g ref={eye} className="cat-eye">
        <circle />
        <path />
      </g>
      <circle ref={halo} className="rope-halo" r="11" />
      <circle ref={head} className="rope-head" r="5" />
    </svg>
  );
}
