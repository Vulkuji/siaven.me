import { useRef } from "react";
import { m } from "motion/react";
import { cluster } from "@/data/canvas-layout";
import { categoryOrder, works } from "@/data/portfolio";
import { homeFor, useCanvasPan } from "@/hooks/use-canvas-pan";
import {
  CategoryBadge,
  GlassFolder,
  Headline,
  Orbit,
} from "@/components/ornaments";
import { CanvasWork, ProfileCard } from "@/components/canvas/canvas-items";

export function WorksCanvas({ active }: { active: boolean }) {
  const viewRef = useRef<HTMLElement>(null);
  const dragged = useRef(false);
  const { x, y, scale, constraints, idle, wake, centerOn } =
    useCanvasPan(viewRef);

  return (
    <section
      ref={viewRef}
      className="view view-canvas"
      hidden={!active}
      aria-label="作品画布"
      onDoubleClick={(event) => {
        if ((event.target as Element).closest("a")) return;
        const home = homeFor(event.currentTarget.clientWidth);
        centerOn(home.x, home.y);
      }}
    >
      <m.div
        className="canvas"
        drag
        dragConstraints={constraints}
        dragElastic={0.05}
        dragTransition={{ power: 0.25, timeConstant: 300 }}
        style={{ x, y, scale, transformOrigin: "0 0" }}
        onPointerDown={wake}
        onDragStart={() => {
          dragged.current = true;
          wake();
        }}
        onDragEnd={() => {
          requestAnimationFrame(() => (dragged.current = false));
          wake();
        }}
        onClickCapture={(event) => {
          if (!dragged.current) return;
          event.preventDefault();
          event.stopPropagation();
        }}
        onFocus={(event) => {
          const target = event.target as HTMLElement;
          if (!target.matches(":focus-visible")) return;
          centerOn(
            target.offsetLeft + target.offsetWidth / 2,
            target.offsetTop + target.offsetHeight / 2,
          );
        }}
      >
        <div className="canvas-drift" data-idle={idle}>
          <Orbit style={{ left: cluster.orbit.x, top: cluster.orbit.y }} />
          <ProfileCard
            style={{ left: cluster.profile.x, top: cluster.profile.y }}
          />
          <a
            className="folder-obj"
            href="#archive"
            aria-label="打开作品档案"
            data-cursor="打开档案 OPEN"
            draggable={false}
            style={{
              left: cluster.folder.x,
              top: cluster.folder.y,
              width: cluster.folder.size,
            }}
          >
            <GlassFolder count={works.length} />
            <span className="obj-pill glass-fill" aria-hidden="true">
              打开档案
            </span>
          </a>
          {categoryOrder.map((category) => (
            <CategoryBadge
              key={category}
              category={category}
              style={{
                left: cluster.badges[category].x,
                top: cluster.badges[category].y,
              }}
            />
          ))}
          {works.map((work, index) => (
            <CanvasWork key={work.id} work={work} index={index} />
          ))}
        </div>
      </m.div>
      <p className="hint">拖动画布浏览 · 双击空白回到中心 · 点作品看详情</p>
      <Headline>
        <span className="zh">作品集</span>
        <span className="en">portfolio</span>
      </Headline>
    </section>
  );
}
