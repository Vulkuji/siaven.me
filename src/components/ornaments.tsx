import { useId, type CSSProperties, type ReactNode } from "react";
import { CalendarDays, Coffee, Paintbrush, Plus } from "lucide-react";
import { categories, type Category } from "@/data/portfolio";

const sparkPath =
  "M0 -24 C2 -7 7 -2 24 0 C7 2 2 7 0 24 C-2 7 -7 2 -24 0 C-7 -2 -2 -7 0 -24Z";
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
        <span className="folder-title">作品档案</span>
        <span className="folder-label">
          portfolio archive
          <i />
          <small>{count} WORKS INSIDE ↗</small>
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
        {en[0]}
        <br />
        {en[1]}
      </span>
    </a>
  );
}

export function Orbit({
  style,
  className,
}: {
  style?: CSSProperties;
  className?: string;
}) {
  const gradient = useId();
  const glow = useId();
  return (
    <svg
      className={`orbit ${className ?? ""}`}
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
            style={{ stopColor: "var(--accent)", stopOpacity: 0.6 }}
          />
          <stop
            offset="1"
            style={{ stopColor: "var(--accent)", stopOpacity: 0.12 }}
          />
        </linearGradient>
        <filter id={glow} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <ellipse
        cx="700"
        cy="330"
        rx="610"
        ry="290"
        fill="none"
        style={{ stroke: "var(--line)" }}
      />
      <ellipse
        cx="700"
        cy="330"
        rx="580"
        ry="235"
        transform="rotate(-8 700 330)"
        fill="none"
        stroke={`url(#${gradient})`}
        strokeWidth="1.4"
        vectorEffect="non-scaling-stroke"
      />
      <circle
        cx="633"
        cy="573"
        r="18"
        style={{ fill: "var(--accent)" }}
        opacity="0.14"
      />
      <circle cx="633" cy="573" r="8.5" style={{ fill: "var(--accent)" }} />
      <path
        className="star"
        d={sparkPath}
        transform="translate(385 169)"
        style={{ fill: "var(--accent)" }}
        filter={`url(#${glow})`}
      />
    </svg>
  );
}

export function Spark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="-24 -24 48 48" aria-hidden="true">
      <path d={sparkPath} />
    </svg>
  );
}
