import { useEffect, useRef } from "react";
import { useAnimationFrame } from "motion/react";
import {
  clamp,
  hasFinePointer,
  pointer,
  prefersReducedMotion,
} from "@/lib/pointer";

interface Letter {
  element: HTMLElement;
  x: number;
  y: number;
  amount: number;
  serif: boolean;
}

/** Giant name letters thin out under the mouse. Each keeps a fixed box so the line never reflows. */
export function useProximity(key: unknown) {
  const letters = useRef<Letter[]>([]);

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    const measure = () => {
      const lines = document.querySelectorAll<HTMLElement>("[data-prox]");
      const next: Letter[] = [];
      lines.forEach((line) => {
        const spans = [...line.children] as HTMLElement[];
        spans.forEach((span) => (span.style.width = ""));
        spans.forEach((span) => {
          const bounds = span.getBoundingClientRect();
          span.style.width = `${bounds.width}px`;
          next.push({
            element: span,
            x: bounds.left + bounds.width / 2,
            y: bounds.top + window.scrollY + bounds.height / 2,
            amount: 0,
            serif: line.dataset.prox === "serif",
          });
        });
      });
      letters.current = next;
    };
    const settle = setTimeout(measure, 1600);
    void document.fonts.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(settle);
      window.removeEventListener("resize", measure);
      letters.current = [];
    };
  }, [key]);

  useAnimationFrame(() => {
    if (!pointer.moved || window.scrollY > window.innerHeight) return;
    const reach = window.innerWidth * 0.17;
    for (const letter of letters.current) {
      const distance = Math.hypot(
        letter.x - pointer.x,
        letter.y - window.scrollY - pointer.y,
      );
      const target = clamp(1 - distance / reach, 0, 1);
      letter.amount += (target * target - letter.amount) * 0.14;
      letter.element.style.fontVariationSettings = letter.serif
        ? `"wght" ${(800 - letter.amount * 560).toFixed(0)}`
        : `"wdth" 112, "wght" ${(800 - letter.amount * 640).toFixed(0)}`;
    }
  });
}
