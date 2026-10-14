import type { PointerEvent } from "react";
import { ArrowUpRight, Asterisk } from "lucide-react";
import { m, useReducedMotion, useSpring } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { works } from "@/data/portfolio";
import type { OpenProject } from "@/components/work-gallery";

const previews = [
  { index: 1, placement: "back" },
  { index: 0, placement: "front" },
  { index: 3, placement: "small" },
] as const;

export function HeroCollage({ onOpen }: { onOpen: OpenProject }) {
  const reducedMotion = useReducedMotion();
  const rotateX = useSpring(0, { stiffness: 120, damping: 22 });
  const rotateY = useSpring(0, { stiffness: 120, damping: 22 });
  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };
  const tilt = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    rotateX.set((0.5 - (event.clientY - bounds.top) / bounds.height) * 10);
    rotateY.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 12);
  };

  return (
    <m.div
      className="hero-collage"
      initial={{ scale: 0.97 }}
      animate={{ scale: 1 }}
      onPointerMove={tilt}
      onPointerLeave={reset}
    >
      <div className="collage-orbit" aria-hidden="true" />
      <m.div
        className="collage-plane"
        style={{ rotateX, rotateY, transformPerspective: 1100 }}
      >
        {previews.map(({ index, placement }) => {
          const work = works[index];
          return (
            <Card
              key={work.id}
              className={`collage-card collage-${placement} gap-0 rounded-xl bg-card p-2 ring-1 ring-foreground/10`}
            >
              <a
                href={work.images[0].src}
                data-project={work.id}
                onClick={(event) => onOpen(index, event)}
                aria-label={`查看${work.title}`}
                className="group block rounded-lg"
              >
                <CardContent className="overflow-hidden rounded-md bg-muted p-0">
                  <img
                    src={`/assets/${work.id}-cover.webp`}
                    alt={`${work.title}的设计作品`}
                    width={1200}
                    height={placement === "front" ? 583 : 1000}
                    fetchPriority={placement === "front" ? "high" : "auto"}
                    className="collage-image"
                  />
                </CardContent>
                <div className="flex items-center justify-between gap-2 px-1 pt-3 pb-1 text-[10px] font-medium">
                  <span className="truncate">{work.title}</span>
                  <ArrowUpRight
                    className="size-4 shrink-0 transition-transform group-hover:rotate-45"
                    aria-hidden="true"
                  />
                </div>
              </a>
            </Card>
          );
        })}
        <div className="collage-sticker" aria-hidden="true">
          <Asterisk strokeWidth={1.3} className="size-9" />
          <span>
            GOOD IDEAS.
            <br />
            BOLD VISUALS.
          </span>
        </div>
      </m.div>
    </m.div>
  );
}
