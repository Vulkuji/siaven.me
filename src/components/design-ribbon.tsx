import { useRef } from "react";
import { Asterisk } from "lucide-react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";

export function DesignRibbon() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  return (
    <div ref={ref} className="design-ribbon" aria-hidden="true">
      <m.div className="ribbon-track" style={{ x: reducedMotion ? 0 : x }}>
        {Array.from({ length: 4 }, (_, index) => (
          <span key={index} className="flex items-center gap-8">
            BRAND <Asterisk strokeWidth={1.4} /> VISUAL{" "}
            <Asterisk strokeWidth={1.4} /> DIGITAL{" "}
            <Asterisk strokeWidth={1.4} />
          </span>
        ))}
      </m.div>
    </div>
  );
}
