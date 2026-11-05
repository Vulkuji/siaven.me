import { useEffect, useRef, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { domMax, LazyMotion, MotionConfig } from "motion/react";
import { works } from "@/data/portfolio";
import { basePath, createI18n, useLang, type Lang } from "@/i18n";
import { useRoute, type View } from "@/hooks/use-route";
import { usePageSwap } from "@/hooks/use-page-swap";
import { useTorch } from "@/hooks/use-torch";
import { useDepth } from "@/hooks/use-depth";
import { useScrub } from "@/hooks/use-scrub";
import { useProximity } from "@/hooks/use-proximity";
import { useReveal } from "@/hooks/use-reveal";
import { trackPointer } from "@/lib/pointer";
import { SiteHeader, Wordmark } from "@/components/site-header";
import { RopeLayer } from "@/components/rope-layer";
import { Cursor } from "@/components/cursor";
import { Hero } from "@/components/home/hero";
import { About } from "@/components/home/about";
import { SelectedWork } from "@/components/home/selected-work";
import { Experience } from "@/components/home/experience";
import { Contact } from "@/components/home/contact";
import { AllWorkPage } from "@/components/all-work";
import { WorksCanvas } from "@/components/canvas/works-canvas";
import { PointerLayer } from "@/components/pointer-layer";
import { WorkDetail } from "@/components/work-detail";

export type Page = "home" | "not-found";

function PageEffects({ layoutKey }: { layoutKey: string }) {
  useEffect(trackPointer, []);
  useTorch();
  useDepth(layoutKey);
  useScrub(layoutKey);
  useProximity(layoutKey);
  useReveal(layoutKey);
  return null;
}

function Playground({ detailOpen }: { detailOpen: boolean }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();
  return (
    <div ref={stageRef} className="stage" data-view="canvas">
      <main>
        <WorksCanvas active />
      </main>
      <PointerLayer
        stageRef={stageRef}
        idleLabel={t("cursor.drag")}
        disabled={detailOpen}
      />
    </div>
  );
}

function ScrollingPage({
  view,
  filter,
  workOpen,
}: {
  view: Exclude<View, "playground">;
  filter: Parameters<typeof AllWorkPage>[0]["filter"];
  workOpen: boolean;
}) {
  const { lang } = useLang();
  const layoutKey = `${view}-${lang}`;
  return (
    <>
      <RopeLayer layoutKey={layoutKey} />
      <PageEffects layoutKey={layoutKey} />
      <Cursor hidden={workOpen} />
      {view === "home" ? (
        <main className="page">
          <Hero />
          <About />
          <SelectedWork />
          <Experience />
          <Contact />
        </main>
      ) : (
        <AllWorkPage filter={filter} />
      )}
    </>
  );
}

function Portfolio() {
  const { t } = useLang();
  const { route, closeWork, stepWork } = useRoute();
  const { shown, wipe } = usePageSwap(route.view);
  const work = works.find((entry) => entry.id === route.work) ?? null;

  return (
    <>
      <a className="skip-link" href="#works">
        {t("skip")}
      </a>
      <div className="grain" aria-hidden="true" />
      <div className="wipe" data-phase={wipe} aria-hidden="true" />
      <SiteHeader view={shown} />
      {shown === "playground" ? (
        <Playground detailOpen={Boolean(work)} />
      ) : (
        <ScrollingPage
          view={shown}
          filter={route.filter}
          workOpen={Boolean(work)}
        />
      )}
      <WorkDetail work={work} onClose={closeWork} onStep={stepWork} />
    </>
  );
}

function NotFound() {
  const { lang } = useLang();
  return (
    <div className="stage not-found">
      <SiteHeader base={basePath[lang]} />
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
      <LazyMotion features={domMax} strict>
        <MotionConfig reducedMotion="user">
          {page === "not-found" ? <NotFound /> : <Portfolio />}
        </MotionConfig>
      </LazyMotion>
    </I18nextProvider>
  );
}
