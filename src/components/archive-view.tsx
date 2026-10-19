import { useEffect, useRef, useState } from "react";
import { m, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import {
  categories,
  categoryOrder,
  pad,
  titleParts,
  works,
  type Work,
} from "@/data/portfolio";
import type { Filter } from "@/hooks/use-route";
import { useTorch } from "@/hooks/use-torch";
import { useLang } from "@/i18n";
import { SplitText } from "@/components/split-text";

const ranks = new Map(
  works.map((work, index) => {
    const group = works.filter((item) => item.category === work.category);
    return [
      work.id,
      {
        number: index + 1,
        index: group.indexOf(work) + 1,
        total: group.length,
      },
    ];
  }),
);

function ArchiveCard({
  work,
  position,
  total,
}: {
  work: Work;
  position: number;
  total: number;
}) {
  const { t, pick } = useLang();
  const title = pick(work.title);
  const { sub, main } = titleParts(title);
  const rank = ranks.get(work.id)!;
  return (
    <a
      className="card"
      href={`#works/${work.id}`}
      aria-label={t("canvas.viewWork", { title })}
      data-cursor={t("cursor.view")}
      data-cursor-count={`${pad(position)}/${pad(total)}`}
    >
      <span className="card-media">
        <img
          src={work.card.src}
          width={work.card.width}
          height={work.card.height}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <span className="card-no">No.{pad(rank.number)}</span>
      </span>
      <span className="card-bar" aria-hidden="true">
        <span className="card-meta">
          <span>
            {pick(categories[work.category])}
            {sub && ` · ${sub}`}
          </span>
          <span>
            {pad(rank.index)} / {pad(rank.total)}
          </span>
        </span>
        <span className="card-head">
          <span className="card-title">
            <SplitText text={main} />
          </span>
          <span className="card-go">
            <ArrowUpRight />
          </span>
        </span>
      </span>
    </a>
  );
}

function Filters({ filter }: { filter: Filter }) {
  const { t, pick } = useLang();
  const [open, setOpen] = useState(false);
  const options: { value: Filter; label: string; count: number }[] = [
    { value: "all", label: t("archive.allOption"), count: works.length },
    ...categoryOrder.map((category) => ({
      value: category,
      label: pick(categories[category]),
      count: works.filter((work) => work.category === category).length,
    })),
  ];
  return (
    <div className="filters">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="filters-list"
        onClick={() => setOpen(!open)}
      >
        <span className="box" />
        {t("archive.filters")}{" "}
        <span className="filters-current">
          / {filter === "all" ? t("archive.all") : pick(categories[filter])}
        </span>
      </button>
      <ul className="filters-list" id="filters-list" hidden={!open}>
        {options.map((option) => (
          <li key={option.value}>
            <a
              href={
                option.value === "all" ? "#archive" : `#archive/${option.value}`
              }
              aria-current={filter === option.value ? "true" : undefined}
              onClick={() => setOpen(false)}
            >
              <span className="box" />
              {option.label} <small>{pad(option.count)}</small>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ArchiveView({
  active,
  filter,
}: {
  active: boolean;
  filter: Filter;
}) {
  const { t } = useLang();
  const viewRef = useRef<HTMLElement>(null);
  const torchRef = useRef<HTMLSpanElement>(null);
  const following = useRef(false);
  const [columns, setColumns] = useState(4);
  const scrollY = useSpring(0, { stiffness: 70, damping: 20 });
  const panX = useSpring(0, { stiffness: 60, damping: 20 });
  const visible = works.filter(
    (work) => filter === "all" || work.category === filter,
  );
  useTorch(viewRef, torchRef, panX);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const observer = new ResizeObserver(() => {
      const width = view.clientWidth;
      if (width) setColumns(width < 560 ? 2 : width < 980 ? 3 : 4);
    });
    observer.observe(view);
    const unsubscribe = scrollY.on("change", (value) => {
      if (following.current) view.scrollTop = value;
    });
    return () => {
      observer.disconnect();
      unsubscribe();
    };
  }, [scrollY]);

  useEffect(() => {
    if (!viewRef.current) return;
    viewRef.current.scrollTop = 0;
    scrollY.jump(0);
  }, [filter, scrollY]);

  return (
    <section
      ref={viewRef}
      className="view view-archive"
      hidden={!active}
      aria-label={t("archive.label")}
      onWheel={() => {
        following.current = false;
        scrollY.jump(viewRef.current?.scrollTop ?? 0);
      }}
      onPointerMove={(event) => {
        const view = viewRef.current;
        if (event.pointerType !== "mouse" || !view) return;
        const bounds = view.getBoundingClientRect();
        const ratioY = Math.min(
          1,
          Math.max(
            0,
            (event.clientY - bounds.top - bounds.height * 0.18) /
              (bounds.height * 0.64),
          ),
        );
        const ratioX = (event.clientX - bounds.left) / bounds.width;
        following.current = true;
        scrollY.set(ratioY * (view.scrollHeight - view.clientHeight));
        panX.set(-ratioX * bounds.width * 0.12);
      }}
    >
      <Filters filter={filter} />
      <m.div className="gridwrap" style={{ x: panX }}>
        <span ref={torchRef} className="torch" aria-hidden="true" />
        {Array.from({ length: columns }, (_, column) => (
          <div className="gcol" key={column}>
            {visible
              .filter((_, index) => index % columns === column)
              .map((work) => (
                <ArchiveCard
                  key={work.id}
                  work={work}
                  position={visible.indexOf(work) + 1}
                  total={visible.length}
                />
              ))}
          </div>
        ))}
      </m.div>
    </section>
  );
}
