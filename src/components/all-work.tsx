import { useEffect, useState } from "react";
import {
  m,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import {
  categories,
  categoryOrder,
  categoryShort,
  pad,
  workHeadline,
  works,
  type Work,
} from "@/data/portfolio";
import { EmailActions } from "@/components/home/contact";
import { hasFinePointer } from "@/lib/pointer";
import type { Filter } from "@/hooks/use-route";
import { useLang } from "@/i18n";

type Layout = "grid" | "list";

const follow = { stiffness: 160, damping: 22, mass: 0.5 };

/** Preview that trails the mouse over the list layout and leans with its speed. */
function Peek({ work }: { work: Work | null }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, follow);
  const smoothY = useSpring(y, follow);
  const rotate = useTransform(useVelocity(smoothX), (speed) =>
    Math.max(-9, Math.min(9, speed * 0.006)),
  );
  useEffect(() => {
    if (!hasFinePointer()) return;
    const move = (event: PointerEvent) => {
      x.set(event.clientX + 28);
      y.set(event.clientY - 120);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);
  return (
    <m.div
      className="peek"
      data-on={Boolean(work)}
      style={{ x: smoothX, y: smoothY, rotate }}
      aria-hidden="true"
    >
      {work && <img src={work.card.src} alt="" />}
    </m.div>
  );
}

function FilterChips({ filter }: { filter: Filter }) {
  const { t, lang, pick } = useLang();
  const options: { key: Filter; short: string; zh: string; count: number }[] = [
    { key: "all", short: "ALL", zh: "全部", count: works.length },
    ...categoryOrder.map((category) => ({
      key: category,
      short: categoryShort[category],
      zh: pick(categories[category]),
      count: works.filter((work) => work.category === category).length,
    })),
  ];
  return (
    <div className="chips" role="group" aria-label={t("all.filters")}>
      {options.map((option) => (
        <a
          key={option.key}
          href={option.key === "all" ? "#all-work" : `#all-work/${option.key}`}
          aria-current={filter === option.key ? "true" : undefined}
        >
          {option.short}
          {lang === "zh" && <span lang="zh-CN"> {option.zh}</span>}{" "}
          {option.count}
        </a>
      ))}
    </div>
  );
}

export function AllWorkPage({ filter }: { filter: Filter }) {
  const { t, lang, zhOnly } = useLang();
  const [layout, setLayout] = useState<Layout>("grid");
  const [hovered, setHovered] = useState<Work | null>(null);
  const visible = works.filter(
    (work) => filter === "all" || work.category === filter,
  );

  return (
    <main className="page">
      <section className="sec t-ink all" data-route="all">
        <div className="lit" />
        <h1 className="big all-title over">
          ALL WORK<sup>{works.length}</sup>
          {lang === "zh" && (
            <span className="big-cn" lang="zh-CN">
              {t("all.subtitle")}
            </span>
          )}
        </h1>
        <div className="all-tools over">
          <FilterChips filter={filter} />
          <div
            className="layout-switch"
            role="group"
            aria-label={t("all.layout")}
          >
            {(["grid", "list"] as const).map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={layout === option}
                onClick={() => {
                  setLayout(option);
                  setHovered(null);
                }}
              >
                {option.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <div className="rows over" data-layout={layout}>
          {visible.map((work) => (
            <a
              key={work.id}
              className="row"
              href={`#works/${work.id}`}
              data-cursor-view={layout === "grid" ? "" : undefined}
              onPointerEnter={() => layout === "list" && setHovered(work)}
              onPointerLeave={() => setHovered(null)}
            >
              <span className="row-pic">
                <img
                  className="row-thumb"
                  src={work.card.src}
                  width={work.card.width}
                  height={work.card.height}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className="row-no">{pad(works.indexOf(work) + 1)}</span>
              <span className="row-main">
                <span className="row-title">{workHeadline(work)}</span>
                {lang === "zh" && (
                  <span className="row-cn" lang="zh-CN">
                    {work.title.zh}
                  </span>
                )}
              </span>
              <span className="row-type">{work.label.en}</span>
              <span className="row-cat">
                {categories[work.category].en.toUpperCase()}
              </span>
              <span className="row-go" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </div>
      </section>
      <section className="sec t-bone all-foot">
        <div className="lit" />
        <p className="all-foot-line over">
          Like what you see?
          {zhOnly(t("all.footNote")) && (
            <span lang="zh-CN">{t("all.footNote")}</span>
          )}
        </p>
        <div className="contact-acts over">
          <EmailActions onBone />
          <a className="pill on-bone" href="#experience">
            {t("contact.resume")}
          </a>
          <a className="pill on-bone" href="#top">
            {t("all.home")}
          </a>
        </div>
      </section>
      <Peek work={hovered} />
    </main>
  );
}
