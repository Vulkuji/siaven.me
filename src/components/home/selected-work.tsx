import type { CSSProperties } from "react";
import {
  categories,
  pad,
  titleParts,
  workHeadline,
  works,
} from "@/data/portfolio";
import { showcase, type ShowcaseEntry } from "@/data/showcase";
import { useLang } from "@/i18n";

function WorkSection({
  entry,
  index,
}: {
  entry: ShowcaseEntry;
  index: number;
}) {
  const { t, lang, pick } = useLang();
  const work = works.find((candidate) => candidate.id === entry.id)!;
  const href = `#works/${work.id}`;
  const headline = workHeadline(work);
  const subtitle =
    lang === "zh" ? work.title.zh : titleParts(work.title.en).sub;
  return (
    <section
      className={`sec t-${entry.ground} work`}
      id={index === 0 ? "works" : undefined}
      data-route={work.id}
    >
      <div className="lit" />
      <header className="work-head over reveal">
        <div>
          <p className="eyebrow">
            {pad(index + 1)} / {work.label.en} ·{" "}
            {categories[work.category].en.toUpperCase()}
          </p>
          <h2 className="work-title">{headline}</h2>
          {subtitle && <p className="work-cn">{subtitle}</p>}
        </div>
        <p className="work-sum">{pick(work.summary)}</p>
      </header>
      <div
        className="stage-box"
        style={{ "--h": `${entry.height}vw` } as CSSProperties}
      >
        <div
          className={`word under${entry.accentWord ? " is-blue" : ""}`}
          style={{ "--em": entry.em } as CSSProperties}
          data-drift={entry.drift}
          aria-hidden="true"
        >
          {entry.word.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
        {entry.figures.map((figure, figureIndex) => {
          const picture = work.showcase![figureIndex];
          return (
            <a
              key={picture.src}
              className="fig"
              href={href}
              data-cursor-view
              data-speed={figure.speed}
              data-depth={figure.depth}
              style={
                {
                  "--l": `${figure.left}%`,
                  "--t": `${figure.top}%`,
                  "--w": `${figure.width}%`,
                  "--r": `${figure.tilt}deg`,
                } as CSSProperties
              }
              aria-label={
                figureIndex === 0
                  ? t("canvas.viewWork", { title: headline })
                  : undefined
              }
              aria-hidden={figureIndex === 0 ? undefined : true}
              tabIndex={figureIndex === 0 ? undefined : -1}
            >
              <span className="fig-in">
                <img
                  className="reveal"
                  src={picture.src}
                  width={picture.width}
                  height={picture.height}
                  alt=""
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </span>
            </a>
          );
        })}
      </div>
      <div className="work-go over">
        <a href={href}>
          VIEW PROJECT <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}

export function SelectedWork() {
  const { t, lang, zhOnly } = useLang();
  return (
    <>
      {showcase.map((entry, index) => (
        <WorkSection key={entry.id} entry={entry} index={index} />
      ))}
      <section className="sec t-ink cta" data-route="cta">
        <div className="lit" />
        <a className="cta-link over" href="#all-work">
          <span className="cta-top">
            <span>{works.length} PROJECTS · 4 INDUSTRIES</span>
            <span lang="zh-CN">
              {zhOnly(t("cta.note", { count: works.length }))}
            </span>
          </span>
          <span className="cta-word">
            <span className="roll" data-rolls={lang === "zh"}>
              <span>ALL WORK</span>
              {lang === "zh" && (
                <span className="roll-cn" aria-hidden="true" lang="zh-CN">
                  {t("nav.allWork")}
                </span>
              )}
            </span>
            <i aria-hidden="true">↗</i>
          </span>
        </a>
      </section>
    </>
  );
}
