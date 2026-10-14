import { useRef, useState } from "react";
import { domAnimation, LazyMotion, MotionConfig } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  About,
  SiteFooter,
  SiteHeader,
  Wordmark,
} from "@/components/site-layout";
import { Hero } from "@/components/hero";
import { DesignRibbon } from "@/components/design-ribbon";
import { WorkGallery, type OpenProject } from "@/components/work-gallery";
import { ProjectDialog } from "@/components/project-dialog";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { works } from "@/data/portfolio";

export type Page = "home" | "not-found";

function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const opener = useRef<HTMLAnchorElement>(null);
  const openProject: OpenProject = (index, event) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    event.preventDefault();
    opener.current = event.currentTarget;
    setActiveIndex(index);
    setOpen(true);
  };

  return (
    <>
      <SiteHeader />
      <main id="top" className="mx-auto max-w-[1600px]">
        <Hero onOpen={openProject} />
        <DesignRibbon />
        <WorkGallery onOpen={openProject} />
        <About />
      </main>
      <SiteFooter />
      <ProjectDialog
        work={works[activeIndex]}
        index={activeIndex}
        open={open}
        onOpenChange={setOpen}
        onStep={(direction) =>
          setActiveIndex((index) =>
            Math.min(works.length - 1, Math.max(0, index + direction)),
          )
        }
        returnFocus={() => opener.current?.focus({ preventScroll: true })}
      />
    </>
  );
}

function PageContent({ page = "home" }: { page?: Page }) {
  if (page === "not-found")
    return (
      <main className="relative grid min-h-dvh place-items-center px-6">
        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>
        <div>
          <Wordmark />
          <p className="eyebrow mt-12 text-muted-foreground">
            404 / PAGE NOT FOUND
          </p>
          <h1 className="my-6 text-[clamp(32px,6vw,60px)] font-semibold tracking-tight">
            这一页还没有作品。
          </h1>
          <Button asChild>
            <a href="/">返回作品集</a>
          </Button>
        </div>
      </main>
    );
  return <Portfolio />;
}

export default function App({ page }: { page?: Page }) {
  return (
    <ThemeProvider>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig
          reducedMotion="user"
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <PageContent page={page} />
        </MotionConfig>
      </LazyMotion>
    </ThemeProvider>
  );
}
