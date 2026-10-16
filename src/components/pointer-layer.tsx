import { useEffect, useState, type RefObject } from "react";
import { m, useMotionValue, useSpring } from "motion/react";
import { pad, works } from "@/data/portfolio";

interface PointerState {
  active: boolean;
  label: string;
  count: string;
}

export function PointerLayer({
  stageRef,
  idleLabel,
  disabled,
}: {
  stageRef: RefObject<HTMLDivElement | null>;
  idleLabel: string;
  disabled: boolean;
}) {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const blobX = useSpring(x, { stiffness: 90, damping: 22, mass: 0.6 });
  const blobY = useSpring(y, { stiffness: 90, damping: 22, mass: 0.6 });
  const [state, setState] = useState<PointerState>({
    active: false,
    label: idleLabel,
    count: `01/${pad(works.length)}`,
  });

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const bounds = stage.getBoundingClientRect();
      x.set(event.clientX - bounds.left);
      y.set(event.clientY - bounds.top);
      const element = event.target as Element;
      const target = element.closest<HTMLElement>("[data-cursor]");
      const active = !disabled && !element.closest(".site-head");
      const label = target?.dataset.cursor ?? idleLabel;
      const count = target?.dataset.cursorCount;
      setState((previous) =>
        previous.active === active &&
        previous.label === label &&
        (!count || previous.count === count)
          ? previous
          : { active, label, count: count ?? previous.count },
      );
    };
    const leave = () =>
      setState((previous) => ({ ...previous, active: false }));
    stage.addEventListener("pointermove", move);
    stage.addEventListener("pointerleave", leave);
    return () => {
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerleave", leave);
    };
  }, [stageRef, idleLabel, disabled, x, y]);

  const active = state.active && !disabled;
  useEffect(() => {
    stageRef.current?.toggleAttribute("data-crosshair", active);
  }, [stageRef, active]);

  return (
    <>
      <m.div
        className="blob"
        data-active={active}
        style={{ x: blobX, y: blobY }}
        aria-hidden="true"
      />
      <div className="cross" data-active={active} aria-hidden="true">
        <m.span className="cross-v" style={{ x }}>
          <span className="cross-count">{state.count}</span>
        </m.span>
        <m.span className="cross-h" style={{ y }} />
        <m.span className="cross-pt" style={{ x, y }}>
          <i />
          <span className="cross-label">{state.label}</span>
        </m.span>
      </div>
    </>
  );
}
