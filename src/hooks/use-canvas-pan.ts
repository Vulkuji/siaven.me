import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { animate, useMotionValue } from "motion/react";
import { canvasHome, canvasSize, cluster } from "@/data/canvas-layout";

interface Bounds {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

const margin = { side: 80, top: 120, bottom: 160 };
const homeSpring = { type: "spring", stiffness: 55, damping: 18 } as const;
const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const compactHome = { x: cluster.profile.x + 220, y: cluster.profile.y + 110 };
export const homeFor = (width: number) =>
  width < 700 ? compactHome : canvasHome;

function boundsFor(width: number, height: number, scale: number): Bounds {
  const left = width - canvasSize.width * scale - margin.side;
  const top = height - canvasSize.height * scale - margin.bottom;
  return {
    left: Math.min(left, margin.side),
    right: margin.side,
    top: Math.min(top, margin.top),
    bottom: margin.top,
  };
}

export function useCanvasPan(stageRef: RefObject<HTMLElement | null>) {
  const x = useMotionValue(720 - canvasHome.x);
  const y = useMotionValue(450 - canvasHome.y);
  const scale = useMotionValue(1);
  const [constraints, setConstraints] = useState(() => boundsFor(1440, 900, 1));
  const constraintsRef = useRef(constraints);
  const [idle, setIdle] = useState(false);
  const idleTimer = useRef<number | undefined>(undefined);

  const wake = useCallback(() => {
    setIdle(false);
    window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => setIdle(true), 1500);
  }, []);

  const centerOn = useCallback(
    (canvasX: number, canvasY: number, instant = false) => {
      const stage = stageRef.current;
      if (!stage) return;
      const bounds = constraintsRef.current;
      const targetX = clamp(
        stage.clientWidth / 2 - canvasX * scale.get(),
        bounds.left,
        bounds.right,
      );
      const targetY = clamp(
        stage.clientHeight / 2 - canvasY * scale.get(),
        bounds.top,
        bounds.bottom,
      );
      if (instant) {
        x.set(targetX);
        y.set(targetY);
      } else {
        animate(x, targetX, homeSpring);
        animate(y, targetY, homeSpring);
      }
      wake();
    },
    [stageRef, scale, x, y, wake],
  );

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let placed = false;
    const observer = new ResizeObserver(() => {
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      if (!width || !height) return;
      scale.set(clamp(width / 1200, 0.5, 1));
      constraintsRef.current = boundsFor(width, height, scale.get());
      setConstraints(constraintsRef.current);
      if (!placed) {
        const home = homeFor(width);
        centerOn(home.x, home.y, true);
      }
      placed = true;
    });
    observer.observe(stage);
    return () => observer.disconnect();
  }, [stageRef, scale, centerOn]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const bounds = constraintsRef.current;
      x.stop();
      y.stop();
      x.set(clamp(x.get() - event.deltaX, bounds.left, bounds.right));
      y.set(clamp(y.get() - event.deltaY, bounds.top, bounds.bottom));
      wake();
    };
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      stage.removeEventListener("wheel", onWheel);
      window.clearTimeout(idleTimer.current);
    };
  }, [stageRef, x, y, wake]);

  return { x, y, scale, constraints, idle, wake, centerOn };
}
