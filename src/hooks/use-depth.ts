import { useEffect, useRef } from "react";
import { useAnimationFrame } from "motion/react";
import { hasFinePointer, pointer, prefersReducedMotion } from "@/lib/pointer";

interface Layer {
  element: HTMLElement;
  center: number;
  speed: number;
  depth: number;
  x: number;
  y: number;
}

const measuredCenter = (element: Element) => {
  const bounds = element.getBoundingClientRect();
  return bounds.top + window.scrollY + bounds.height / 2;
};

/** Pictures float at different depths with scroll and mouse; giant words drift sideways. */
export function useDepth(key: unknown) {
  const figures = useRef<Layer[]>([]);
  const words = useRef<{ element: HTMLElement; center: number; dir: number }[]>(
    [],
  );
  const enabled = useRef(false);
  const fine = useRef(false);

  useEffect(() => {
    fine.current = hasFinePointer();
    const reduced = prefersReducedMotion();
    const measure = () => {
      enabled.current = !reduced && window.innerWidth > 820;
      const previous = new Map(figures.current.map((f) => [f.element, f]));
      figures.current = [...document.querySelectorAll<HTMLElement>(".fig")].map(
        (element) => ({
          element,
          center: measuredCenter(element.parentElement!),
          speed: Number(element.dataset.speed),
          depth: Number(element.dataset.depth),
          x: previous.get(element)?.x ?? 0,
          y: previous.get(element)?.y ?? 0,
        }),
      );
      words.current = [...document.querySelectorAll<HTMLElement>(".word")].map(
        (element) => ({
          element,
          center: measuredCenter(element.parentElement!),
          dir: Number(element.dataset.drift),
        }),
      );
      if (!enabled.current) {
        figures.current.forEach((f) => (f.element.style.transform = ""));
        words.current.forEach((w) => w.element.style.removeProperty("--drift"));
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    return () => observer.disconnect();
  }, [key]);

  useAnimationFrame(() => {
    if (!enabled.current) return;
    const height = window.innerHeight;
    const middle = window.scrollY + height / 2;
    const nx = fine.current ? pointer.x / window.innerWidth - 0.5 : 0;
    const ny = fine.current ? pointer.y / height - 0.5 : 0;
    for (const layer of figures.current) {
      const distance = layer.center - middle;
      if (Math.abs(distance) > height * 1.6) continue;
      layer.y += (distance * layer.speed + ny * layer.depth - layer.y) * 0.1;
      layer.x += (nx * layer.depth - layer.x) * 0.1;
      layer.element.style.transform = `translate3d(${layer.x.toFixed(2)}px, ${layer.y.toFixed(2)}px, 0)`;
    }
    for (const word of words.current) {
      const distance = word.center - middle;
      if (Math.abs(distance) > height * 1.6) continue;
      const drift = (distance / height) * word.dir * window.innerWidth * 0.07;
      word.element.style.setProperty("--drift", `${drift.toFixed(1)}px`);
    }
  });
}
