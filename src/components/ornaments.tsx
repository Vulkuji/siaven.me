import {
  useEffect,
  useId,
  useRef,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";
import { CalendarDays, Coffee, Paintbrush, Plus } from "lucide-react";
import { categories, type Category } from "@/data/portfolio";

const folderPath =
  "M20 0 H128 C140 0 147 6 153 14 L162 27 C166 33 172 36 180 36 H320 C331 36 340 45 340 56 V230 C340 241 331 250 320 250 H20 C9 250 0 241 0 230 V20 C0 9 9 0 20 0 Z";
const icons = {
  medical: Plus,
  art: Paintbrush,
  food: Coffee,
  event: CalendarDays,
};

export function Headline({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`headline ${className ?? ""}`} aria-hidden="true">
      {children}
    </div>
  );
}

export function GlassFolder({ count }: { count: number }) {
  const gradient = useId();
  return (
    <span className="folder" aria-hidden="true">
      <svg className="folder-back" viewBox="0 0 340 250">
        <defs>
          <linearGradient id={gradient} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: "var(--glass-hi)" }} />
            <stop offset="1" style={{ stopColor: "var(--glass-lo)" }} />
          </linearGradient>
        </defs>
        <path
          d={folderPath}
          fill={`url(#${gradient})`}
          style={{ stroke: "var(--glass-edge)" }}
        />
      </svg>
      {["a", "b", "c"].map((sheet) => (
        <span key={sheet} className={`sheet sheet-${sheet}`}>
          <i />
          <i />
          <i />
          <i />
        </span>
      ))}
      <span className="folder-front">
        <span className="folder-meta">
          <span>作品档案</span>
          <span>{count} ↗</span>
        </span>
      </span>
    </span>
  );
}

export function CategoryBadge({
  category,
  style,
}: {
  category: Category;
  style?: CSSProperties;
}) {
  const Icon = icons[category];
  const { zh, en } = categories[category];
  return (
    <a
      className="cat-obj"
      href={`#archive/${category}`}
      data-cursor={`筛选 ${zh}`}
      style={style}
      draggable={false}
    >
      <span className="cat-icon glass-fill">
        <Icon aria-hidden="true" />
      </span>
      <span className="cat-label">
        <b>{zh}</b>
        {en}
      </span>
    </a>
  );
}

function usePauseWhenReduced(ref: RefObject<SVGSVGElement | null>) {
  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () =>
      media.matches ? svg.pauseAnimations() : svg.unpauseAnimations();
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [ref]);
}

export function OrbitTrack({
  cx,
  cy,
  rx,
  ry,
  duration,
  stroke,
  rotate = -8,
  companion = false,
}: {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  duration: number;
  stroke: string;
  rotate?: number;
  companion?: boolean;
}) {
  const track = useId();
  const d = `M ${cx - rx} ${cy} A ${rx} ${ry} 0 1 1 ${cx + rx} ${cy} A ${rx} ${ry} 0 1 1 ${cx - rx} ${cy} Z`;
  return (
    <g transform={`rotate(${rotate} ${cx} ${cy})`}>
      <path
        id={track}
        d={d}
        fill="none"
        style={{ stroke }}
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <g className="orbit-dot">
        <circle r="11" opacity="0.16" />
        <circle r="4.5" />
        <animateMotion dur={`${duration}s`} repeatCount="indefinite">
          <mpath href={`#${track}`} />
        </animateMotion>
      </g>
      {companion && (
        <g className="orbit-ring">
          <circle r="6" />
          <animateMotion
            dur={`${duration}s`}
            begin={`-${duration / 2}s`}
            repeatCount="indefinite"
          >
            <mpath href={`#${track}`} />
          </animateMotion>
        </g>
      )}
    </g>
  );
}

export function Orbit({ style }: { style?: CSSProperties }) {
  const gradient = useId();
  const ref = useRef<SVGSVGElement>(null);
  usePauseWhenReduced(ref);
  return (
    <svg
      ref={ref}
      className="orbit"
      viewBox="0 0 1400 660"
      style={style}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradient} x1="0" y1="0" x2="1" y2="0">
          <stop
            offset="0"
            style={{ stopColor: "var(--accent)", stopOpacity: 0.05 }}
          />
          <stop
            offset="0.45"
            style={{ stopColor: "var(--accent)", stopOpacity: 0.5 }}
          />
          <stop
            offset="1"
            style={{ stopColor: "var(--accent)", stopOpacity: 0.1 }}
          />
        </linearGradient>
      </defs>
      <OrbitTrack
        cx={700}
        cy={330}
        rx={580}
        ry={235}
        duration={60}
        companion
        stroke={`url(#${gradient})`}
      />
    </svg>
  );
}
