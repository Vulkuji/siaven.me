import type { ReactNode } from "react";
import { ResumeDownload } from "@/components/resume-download";
import { honors, jobs, resumeBlocks } from "@/data/resume";
import { useLang } from "@/i18n";

function ResumeBlock({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string | null;
  children: ReactNode;
}) {
  return (
    <div className="cv-block over reveal">
      <h3 className="cv-head">
        {title}
        <b>.</b>
        {subtitle && <span lang="zh-CN">{subtitle}</span>}
      </h3>
      <div className="cv-body">{children}</div>
    </div>
  );
}

export function Experience() {
  const { t, lang, pick, zhOnly } = useLang();
  return (
    <section className="sec t-bone cv" id="experience" data-route="cv">
      <div className="lit" />
      <div className="cv-top over reveal">
        <h2 className="big">
          EXPERIENCE
          {lang === "zh" && (
            <span className="big-cn" lang="zh-CN">
              {t("experience.subtitle")}
            </span>
          )}
        </h2>
        <ResumeDownload className="pill solid on-bone" />
      </div>
      <ResumeBlock title="WORK" subtitle={zhOnly(t("experience.work"))}>
        {jobs.map((job) => (
          <article className="job" key={job.company.en}>
            <span className="job-when">{pick(job.when)}</span>
            <div>
              <h4>{job.company.en}</h4>
              <p className="job-role">
                {lang === "zh"
                  ? `${job.company.zh} · ${job.role.en} ${job.role.zh}`
                  : job.role.en}
              </p>
            </div>
            <p className="job-note">{pick(job.note)}</p>
          </article>
        ))}
      </ResumeBlock>
      {resumeBlocks.map((block) => (
        <ResumeBlock
          key={block.title.en}
          title={block.title.en}
          subtitle={zhOnly(block.title.zh)}
        >
          <p className="cv-main">{block.main}</p>
          <p className="cv-sub">{pick(block.sub)}</p>
        </ResumeBlock>
      ))}
      <ResumeBlock title="HONORS" subtitle={zhOnly(t("experience.honors"))}>
        <ul className="cv-list">
          {honors.map((honor) => (
            <li key={honor.en}>{pick(honor)}</li>
          ))}
        </ul>
      </ResumeBlock>
    </section>
  );
}
