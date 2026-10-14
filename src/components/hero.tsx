import { ArrowDownRight, Asterisk } from "lucide-react";
import { m } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HeroCollage } from "@/components/hero-collage";
import { categories, works } from "@/data/portfolio";
import type { OpenProject } from "@/components/work-gallery";

export function Hero({ onOpen }: { onOpen: OpenProject }) {
  return (
    <section aria-labelledby="hero-title" className="hero-stage">
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="flex items-center justify-between gap-4">
        <p className="eyebrow flex items-center gap-2.5 text-muted-foreground">
          <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
          GRAPHIC & VISUAL DESIGN
        </p>
        <Badge
          variant="outline"
          className="rounded-full px-3 py-1.5 text-[9px] font-normal tracking-wider max-[540px]:hidden"
        >
          SELECTED PORTFOLIO / 2026
        </Badge>
      </div>
      <div className="hero-body">
        <m.div initial={{ y: 20 }} animate={{ y: 0 }} className="hero-copy">
          <p className="mb-5 text-xs font-medium text-muted-foreground">
            你好，我是 Siaven。让想法，有形可见。
          </p>
          <h1
            id="hero-title"
            className="hero-title"
            aria-label="Make it visible — 让想法，有形可见"
          >
            <span>MAKE IT</span>
            <span className="hero-outline">
              VISIBLE<span className="hero-period">.</span>
            </span>
          </h1>
          <div className="hero-intro">
            <p className="max-w-[310px] text-sm leading-loose text-muted-foreground">
              从品牌的一种可能，到生活里的每个触点。
              <br />
              用图形、色彩与一点不循规蹈矩，让设计被看见。
            </p>
            <Button
              asChild
              className="hero-cta h-auto rounded-full bg-foreground py-2 pr-2 pl-6 text-sm font-normal text-background hover:bg-foreground/90"
            >
              <a href="#work">
                探索精选作品
                <span className="ml-6 grid size-10 place-items-center rounded-full bg-highlight text-highlight-foreground">
                  <ArrowDownRight className="size-5" aria-hidden="true" />
                </span>
              </a>
            </Button>
          </div>
          <div className="hero-index flex items-center gap-7 text-[10px] tracking-wider text-muted-foreground">
            <span>
              <strong className="mr-2 font-display text-xl font-bold text-foreground">
                {String(works.length).padStart(2, "0")}
              </strong>
              个精选项目
            </span>
            <span className="h-5 border-l" aria-hidden="true" />
            <span>
              <strong className="mr-2 font-display text-xl font-bold text-foreground">
                0{categories.length - 1}
              </strong>
              种设计表达
            </span>
          </div>
        </m.div>
        <HeroCollage onOpen={onOpen} />
      </div>
      <div className="flex items-center justify-between border-t py-5 text-[9px] tracking-[.14em] text-muted-foreground">
        <span>INDEPENDENT MIND. DISTINCTIVE DESIGN.</span>
        <a
          href="#work"
          aria-label="向下浏览作品"
          className="flex items-center gap-3 text-foreground"
        >
          <span className="max-[540px]:hidden">SCROLL TO EXPLORE</span>
          <ArrowDownRight className="size-5" aria-hidden="true" />
        </a>
      </div>
      <Asterisk aria-hidden="true" className="hero-side-mark" strokeWidth={1} />
    </section>
  );
}
