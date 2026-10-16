import type { CSSProperties } from "react";
import { categories, pad, profile, works, type Work } from "@/data/portfolio";
import { workPlacement } from "@/data/canvas-layout";

export function CanvasWork({ work, index }: { work: Work; index: number }) {
  const place = workPlacement[work.id];
  const style = {
    left: place.x,
    top: place.y,
    width: place.size,
    "--dur": `${7 + (index % 5) * 1.3}s`,
    "--delay": `${-((index * 1.7) % 7)}s`,
    "--fx": `${(index % 2 ? 1 : -1) * (4 + (index % 3) * 3)}px`,
    "--fy": `${-(8 + (index % 4) * 3)}px`,
  } as CSSProperties;
  return (
    <a
      className="obj"
      href={`#works/${work.id}`}
      aria-label={`查看 ${work.title}`}
      data-cursor="查看 VIEW"
      data-cursor-count={`${pad(index + 1)}/${pad(works.length)}`}
      draggable={false}
      style={style}
    >
      <span className="obj-cap" aria-hidden="true">
        {work.title}
      </span>
      <span className="obj-frame">
        <img
          src={work.cover.src}
          width={work.cover.width}
          height={work.cover.height}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </span>
      <span className="obj-meta" aria-hidden="true">
        <span>{pad(index + 1)}</span>
        <span>{categories[work.category].zh}</span>
      </span>
      <span className="obj-pill glass-fill" aria-hidden="true">
        查看
      </span>
    </a>
  );
}

export function ProfileCard({ style }: { style: CSSProperties }) {
  return (
    <div className="intro" style={style}>
      <p className="kicker">SELECTED WORKS PORTFOLIO · 2026</p>
      <h1 className="profile-name">{profile.name}</h1>
      <p className="profile-line">
        {profile.role} · {profile.focus}
      </p>
      <p className="profile-contact">
        <span className="status">{profile.status}</span>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </p>
    </div>
  );
}
