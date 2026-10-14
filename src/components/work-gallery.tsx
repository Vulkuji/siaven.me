import { useState, type MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { m } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { categories, works, type Category, type Work } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export type OpenProject = (
  index: number,
  event: MouseEvent<HTMLAnchorElement>,
) => void;

function WorkCard({ work, onOpen }: { work: Work; onOpen: OpenProject }) {
  const index = works.indexOf(work);
  return (
    <m.article
      className="work-card group min-w-0"
      data-category={work.category}
      initial={{ y: 24 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <Card className="gap-0 overflow-visible rounded-none bg-transparent py-0 shadow-none ring-0">
        <a
          href={work.images[0].src}
          data-project={work.id}
          onClick={(event) => onOpen(index, event)}
          aria-label={`查看${work.title}`}
          className="work-link block rounded-xl"
        >
          <CardContent className="relative overflow-hidden rounded-xl bg-muted p-0 ring-1 ring-foreground/5">
            <img
              src={`/assets/${work.id}-thumb.webp`}
              srcSet={`/assets/${work.id}-thumb.webp 640w, /assets/${work.id}-cover.webp 1200w`}
              sizes="(max-width: 720px) calc(100vw - 44px), (max-width: 1600px) 54vw, 840px"
              width={1200}
              height={800}
              loading="lazy"
              decoding="async"
              alt={`${work.title}的设计作品`}
              className={cn(
                "work-image aspect-[3/2] w-full object-cover",
                work.id === "td66" && "bg-[#b0d4e3] object-contain",
              )}
            />
            <span
              aria-hidden="true"
              className="work-arrow absolute right-5 bottom-5 grid size-12 place-items-center rounded-full bg-card text-card-foreground transition-all duration-300 max-[720px]:size-10"
            >
              <ArrowUpRight className="size-5" />
            </span>
          </CardContent>
          <CardHeader className="flex items-baseline gap-4 px-0 pt-5">
            <span className="text-[11px] text-muted-foreground tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <CardTitle className="text-[22px] font-semibold tracking-tight max-[949px]:text-lg">
                <h3>{work.title}</h3>
              </CardTitle>
              <CardDescription className="mt-2 text-[10px] tracking-[.7px] text-muted-foreground">
                {work.label}
              </CardDescription>
            </div>
          </CardHeader>
        </a>
      </Card>
    </m.article>
  );
}

export function WorkGallery({ onOpen }: { onOpen: OpenProject }) {
  const [category, setCategory] = useState<Category>("all");
  const visibleCount =
    category === "all"
      ? works.length
      : works.filter((work) => work.category === category).length;
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="px-[var(--gutter)] pt-16 pb-12 min-[721px]:pt-28 min-[721px]:pb-24"
    >
      <div className="mb-8 flex items-end justify-between gap-4 min-[721px]:mb-12">
        <div>
          <p className="eyebrow mb-5 text-muted-foreground">01 / 精选作品</p>
          <h2
            id="work-title"
            className="font-display text-[clamp(36px,6.4vw,100px)] font-black leading-[.9] tracking-[-.07em]"
          >
            SELECTED
            <br />
            WORK<span className="text-primary">.</span>
          </h2>
        </div>
        <Badge
          variant="outline"
          aria-live="polite"
          className="work-count mb-1 -rotate-6 rounded-full border-foreground/30 px-4 py-2.5 text-[10px] font-normal tracking-wider text-foreground"
        >
          {visibleCount} PROJECTS
        </Badge>
      </div>
      <Tabs
        value={category}
        onValueChange={(value) => setCategory(value as Category)}
      >
        <TabsList
          aria-label="作品分类"
          className="mb-10 flex h-auto w-auto flex-wrap justify-start gap-2 rounded-none bg-transparent p-0 group-data-horizontal/tabs:h-auto min-[721px]:mb-14"
        >
          {categories.map(({ value, label }) => (
            <TabsTrigger
              key={value}
              value={value}
              data-filter={value}
              className="h-auto flex-none rounded-full border border-border px-4 py-2.5 text-xs font-normal shadow-none hover:border-foreground data-active:border-highlight data-active:bg-highlight data-active:text-highlight-foreground data-active:shadow-none dark:data-active:border-highlight dark:data-active:bg-highlight dark:data-active:text-highlight-foreground"
            >
              {label}
              {value === "all" && (
                <span className="ml-1 text-[10px] opacity-60">
                  {works.length}
                </span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map(({ value }) => (
          <TabsContent key={value} value={value} className="mt-0">
            <div className="work-grid">
              {works
                .filter((work) => value === "all" || work.category === value)
                .map((work) => (
                  <WorkCard key={work.id} work={work} onOpen={onOpen} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
