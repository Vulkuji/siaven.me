import { useEffect, type RefObject } from "react";
import type { MotionValue } from "motion/react";

export function useTorch(
  viewRef: RefObject<HTMLElement | null>,
  torchRef: RefObject<HTMLElement | null>,
  pan: MotionValue<number>,
) {
  useEffect(() => {
    const view = viewRef.current;
    const torch = torchRef.current;
    if (!view || !torch) return;
    let pointer: { x: number; y: number } | null = null;
    const aim = () => {
      if (!pointer) return;
      const bounds = torch.getBoundingClientRect();
      torch.style.setProperty("--torch-x", `${pointer.x - bounds.left}px`);
      torch.style.setProperty("--torch-y", `${pointer.y - bounds.top}px`);
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer = { x: event.clientX, y: event.clientY };
      torch.dataset.on = "";
      aim();
    };
    const leave = () => {
      pointer = null;
      delete torch.dataset.on;
    };
    view.addEventListener("pointermove", move);
    view.addEventListener("pointerleave", leave);
    view.addEventListener("scroll", aim, { passive: true });
    const unsubscribe = pan.on("change", aim);
    return () => {
      view.removeEventListener("pointermove", move);
      view.removeEventListener("pointerleave", leave);
      view.removeEventListener("scroll", aim);
      unsubscribe();
    };
  }, [viewRef, torchRef, pan]);
}
