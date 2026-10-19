import { useRef, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { domMax, LazyMotion, MotionConfig } from "motion/react";
import { works } from "@/data/portfolio";
import { createI18n, useLang, type Lang } from "@/i18n";
import { useRoute } from "@/hooks/use-route";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader, Wordmark } from "@/components/site-header";
import { WorksCanvas } from "@/components/canvas/works-canvas";
import { ArchiveView } from "@/components/archive-view";
import { ResumeView } from "@/components/resume-view";
import { WorkDetail } from "@/components/work-detail";
import { PointerLayer } from "@/components/pointer-layer";

export type Page = "home" | "not-found";

function Portfolio() {
  const stageRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();
  const { route, closeWork, stepWork } = useRoute();
  const work = works.find((entry) => entry.id === route.work) ?? null;

  return (
    <div ref={stageRef} className="stage" data-view={route.view}>
      <a className="skip-link" href="#archive">
        {t("skip")}
      </a>
      <SiteHeader view={route.view} />
      <main>
        <WorksCanvas active={route.view === "canvas"} />
        <ArchiveView active={route.view === "archive"} filter={route.filter} />
        <ResumeView active={route.view === "resume"} />
      </main>
      <PointerLayer
        stageRef={stageRef}
        idleLabel={route.view === "canvas" ? t("cursor.drag") : ""}
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
        <h1>
          这一页还没有作品。
          <span lang="en">There’s no work on this page yet.</span>
        </h1>
        <a className="not-found-link glass-fill" href="/">
          返回作品集 · Back to portfolio
        </a>
      </main>
    </div>
  );
}

export default function App({
  page = "home",
  lang = "zh",
}: {
  page?: Page;
  lang?: Lang;
}) {
  const [i18n] = useState(() => createI18n(lang));
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <LazyMotion features={domMax} strict>
          <MotionConfig reducedMotion="user">
            {page === "not-found" ? <NotFound /> : <Portfolio />}
          </MotionConfig>
        </LazyMotion>
      </ThemeProvider>
    </I18nextProvider>
  );
}
