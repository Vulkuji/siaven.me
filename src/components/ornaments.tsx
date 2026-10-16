import { useId, type CSSProperties, type ReactNode } from "react";
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

export function Orbit({ style }: { style?: CSSProperties }) {
  const gradient = useId();
  return (
    <svg
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
      <ellipse
        cx="700"
        cy="330"
        rx="580"
        ry="235"
        transform="rotate(-8 700 330)"
        fill="none"
        stroke={`url(#${gradient})`}
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx="633" cy="573" r="5" style={{ fill: "var(--accent)" }} />
      <g className="register-mark" transform="translate(211 262)">
        <circle r="13" />
        <circle r="3.5" />
        <path d="M-26 0 H26 M0 -26 V26" />
      </g>
    </svg>
  );
}
