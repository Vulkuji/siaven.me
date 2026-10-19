import type { CSSProperties } from "react";
import {
  categories,
  pad,
  profile,
  titleParts,
  works,
  type Work,
} from "@/data/portfolio";
import { workPlacement } from "@/data/canvas-layout";
import { useLang } from "@/i18n";

export function CanvasWork({ work, index }: { work: Work; index: number }) {
  const { t, lang, pick } = useLang();
  const title = pick(work.title);
  const { sub, main } = titleParts(title);
  const place = workPlacement[work.id];
  const style = {
    left: place.x,
    top: place.y,
    width: place.size,
    "--size": `${place.size}px`,
    "--dur": `${7 + (index % 5) * 1.3}s`,
    "--delay": `${-((index * 1.7) % 7)}s`,
    "--fx": `${(index % 2 ? 1 : -1) * (4 + (index % 3) * 3)}px`,
    "--fy": `${-(8 + (index % 4) * 3)}px`,
  } as CSSProperties;
  return (
    <a
      className="obj"
      href={`#works/${work.id}`}
      aria-label={t("canvas.viewWork", { title })}
      data-cursor={t("cursor.view")}
      data-cursor-count={`${pad(index + 1)}/${pad(works.length)}`}
      draggable={false}
      style={style}
    >
      <span className="obj-cap" aria-hidden="true">
        {lang === "en" ? (
          <>
            <span className="obj-cap-main">{main}</span>
            {sub && <span className="obj-cap-sub">{sub}</span>}
          </>
        ) : (
          title
        )}
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
        <span className="obj-cat">{pick(categories[work.category])}</span>
      </span>
      <span className="obj-pill glass-fill" aria-hidden="true">
        {t("canvas.view")}
      </span>
    </a>
  );
}

export function ProfileCard({ style }: { style: CSSProperties }) {
  const { pick } = useLang();
  return (
    <div className="intro" style={style}>
      <p className="kicker">SELECTED WORKS PORTFOLIO · 2026</p>
      <h1 className="profile-name">{profile.name}</h1>
      <p className="profile-line">
        {pick(profile.role)} · {pick(profile.focus)}
      </p>
      <p className="profile-contact">
        <span className="status">{pick(profile.status)}</span>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </p>
    </div>
  );
}
