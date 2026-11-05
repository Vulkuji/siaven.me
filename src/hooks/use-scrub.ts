import { useEffect, useRef } from "react";
import { useAnimationFrame } from "motion/react";
import { clamp, prefersReducedMotion } from "@/lib/pointer";

/** Lights a statement character by character as it scrolls through the viewport. */
export function useScrub(key: unknown) {
  const text = useRef<HTMLElement | null>(null);
  const chars = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    text.current = document.querySelector<HTMLElement>("[data-scrub]");
    chars.current = text.current
      ? [...text.current.querySelectorAll<HTMLElement>("[data-char]")]
      : [];
    return () => {
      text.current = null;
      chars.current = [];
    };
  }, [key]);

  useAnimationFrame(() => {
    if (!text.current) return;
    const bounds = text.current.getBoundingClientRect();
    const height = window.innerHeight;
    if (bounds.bottom < -height || bounds.top > height * 2) return;
    const progress = clamp(
      (height * 0.82 - bounds.top) / (bounds.height + height * 0.32),
      0,
      1,
    );
    const lit = progress * chars.current.length * 1.06;
    chars.current.forEach((char, index) => {
      char.style.opacity = clamp(lit - index + 1, 0.14, 1).toFixed(2);
    });
  });
}
