import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/pointer";

/** Sharpens elements as they enter. Only what starts below the fold is ever blurred. */
export function useReveal(key: unknown) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.remove("armed");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -6% 0px" },
    );
    document.querySelectorAll(".reveal").forEach((element) => {
      if (element.getBoundingClientRect().top <= window.innerHeight * 0.94)
        return;
      element.classList.add("armed");
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, [key]);
}
