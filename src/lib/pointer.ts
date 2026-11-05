/** Latest mouse position, shared by the per-frame effects so each avoids its own listener. */
export const pointer = { x: 0, y: 0, moved: false };

export const hasFinePointer = () =>
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function trackPointer() {
  const move = (event: PointerEvent) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.moved = true;
  };
  window.addEventListener("pointermove", move, { passive: true });
  return () => window.removeEventListener("pointermove", move);
}

export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));
