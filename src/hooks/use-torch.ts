import { useEffect } from "react";
import { hasFinePointer } from "@/lib/pointer";

/** Lights the bolt-hole grid of whichever section the mouse is over. */
export function useTorch() {
  useEffect(() => {
    if (!hasFinePointer()) return;
    let active: Element | null = null;
    const move = (event: PointerEvent) => {
      const section = (event.target as Element).closest?.(".sec") ?? null;
      if (section !== active) {
        active?.classList.remove("torch");
        section?.classList.add("torch");
        active = section;
      }
      const lit = section?.querySelector<HTMLElement>(":scope > .lit");
      if (!section || !lit) return;
      const bounds = section.getBoundingClientRect();
      lit.style.setProperty("--mx", `${event.clientX - bounds.left}px`);
      lit.style.setProperty("--my", `${event.clientY - bounds.top}px`);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);
}
