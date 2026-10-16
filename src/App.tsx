import { useRef } from "react";
import { domMax, LazyMotion, MotionConfig } from "motion/react";
import { works } from "@/data/portfolio";
import { useRoute } from "@/hooks/use-route";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader, Wordmark } from "@/components/site-header";
import { WorksCanvas } from "@/components/canvas/works-canvas";
import { ArchiveView } from "@/components/archive-view";
import { AboutView } from "@/components/about-view";
import { WorkDetail } from "@/components/work-detail";
import { PointerLayer } from "@/components/pointer-layer";

export type Page = "home" | "not-found";

function Portfolio() {
  const stageRef = useRef<HTMLDivElement>(null);
  const { route, closeWork, stepWork } = useRoute();
  const work = works.find((entry) => entry.id === route.work) ?? null;

  return (
    <div ref={stageRef} className="stage" data-view={route.view}>
      <a className="skip-link" href="#archive">
        跳至作品档案
      </a>
      <SiteHeader view={route.view} />
      <main>
        <WorksCanvas active={route.view === "canvas"} />
        <ArchiveView active={route.view === "archive"} filter={route.filter} />
        <AboutView active={route.view === "about"} />
      </main>
      <PointerLayer
        stageRef={stageRef}
        idleLabel={route.view === "canvas" ? "拖动 DRAG" : ""}
        disabled={Boolean(work)}
      />
      <WorkDetail work={work} onClose={closeWork} onStep={stepWork} />
    </div>
  );
}

function NotFound() {
  return (
    <div className="stage not-found">
      <SiteHeader />
      <main className="not-found-body">
        <Wordmark />
        <p className="kicker">404 / PAGE NOT FOUND</p>
        <h1>这一页还没有作品。</h1>
        <a className="not-found-link glass-fill" href="/">
          返回作品集
        </a>
      </main>
    </div>
  );
}

export default function App({ page = "home" }: { page?: Page }) {
  return (
    <ThemeProvider>
      <LazyMotion features={domMax} strict>
        <MotionConfig reducedMotion="user">
          {page === "not-found" ? <NotFound /> : <Portfolio />}
        </MotionConfig>
      </LazyMotion>
    </ThemeProvider>
  );
}
