import { useEffect, useState } from "react";
import { m, useMotionValue, useSpring } from "motion/react";
import { hasFinePointer } from "@/lib/pointer";
import { useLang } from "@/i18n";

const spring = { stiffness: 900, damping: 50, mass: 0.35 };

export function Cursor({ hidden }: { hidden: boolean }) {
  const { t } = useLang();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const smoothX = useSpring(x, spring);
  const smoothY = useSpring(y, spring);
  const [ready, setReady] = useState(false);
  const [viewing, setViewing] = useState(false);
  const [light, setLight] = useState(false);

  useEffect(() => {
    if (!hasFinePointer()) return;
    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setReady(true);
      const target = event.target as Element;
      setViewing(Boolean(target.closest?.("[data-cursor-view]")));
      setLight(Boolean(target.closest?.(".t-bone")));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <m.div
      className="cursor"
      data-ready={ready && !hidden}
      data-viewing={viewing}
      data-light={light}
      style={{ x: smoothX, y: smoothY }}
      aria-hidden="true"
    >
      <span>
        <b>{t("cursor.view")}</b>
      </span>
    </m.div>
  );
}
