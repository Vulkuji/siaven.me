import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/portfolio";
import { resume, type Experience } from "@/data/resume";
import { Headline } from "@/components/ornaments";

function Section({
  zh,
  en,
  children,
}: {
  zh: string;
  en: string;
  children: ReactNode;
}) {
  return (
    <section className="resume-section">
      <h3>
        {zh}
        <small>/ {en}</small>
      </h3>
      <div>{children}</div>
    </section>
  );
}

function Experiences({ items }: { items: Experience[] }) {
  return items.map((item) => (
    <article key={item.company} className="resume-entry">
      <header>
        <h4>
          {item.company}
          <span>{item.role}</span>
        </h4>
        <time>{item.period}</time>
      </header>
      <ul>
        {item.points.map((point) => (
          <li key={point.text}>
            {point.title && <b>{point.title}</b>}
            {point.text}
          </li>
        ))}
      </ul>
    </article>
  ));
}

const facts: { label: string; content: ReactNode }[] = [
  {
    label: "教育",
    content: (
      <>
        {resume.education.school}｜{resume.education.college}
        <br />
        {resume.education.major}
      </>
    ),
  },
  ...resume.skills.map((skill) => ({
    label: skill.label,
    content: skill.text,
  })),
  {
    label: "联系",
    content: (
      <a href={`mailto:${profile.email}`}>
        {profile.email}
        <ArrowUpRight aria-hidden="true" />
      </a>
    ),
  },
];

export function ResumeView({ active }: { active: boolean }) {
  return (
    <section
      className="view view-resume"
      hidden={!active}
      aria-label="个人简历"
    >
      <div className="resume">
        <aside className="resume-card">
          <p className="kicker">RESUME · 个人简历</p>
          <h2 className="resume-name">{profile.name}</h2>
          <p className="resume-intent">意向岗位 · {resume.intent}</p>
          <span className="status">{profile.status}</span>
          <dl className="resume-facts">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.content}</dd>
              </div>
            ))}
          </dl>
        </aside>
        <div className="resume-body">
          <Section zh="自我评价" en="About Me">
            {resume.about.map((line) => (
              <p key={line} className="resume-about">
                {line}
              </p>
            ))}
          </Section>
          <Section zh="工作经历" en="Work Experience">
            <Experiences items={resume.work} />
          </Section>
          <Section zh="实习经历" en="Internship">
            <Experiences items={resume.internships} />
          </Section>
          <Section zh="个人荣誉" en="Honors">
            <ul className="resume-honors">
              {resume.honors.map((honor) => (
                <li key={honor}>{honor}</li>
              ))}
            </ul>
          </Section>
        </div>
        <Headline className="resume-headline">
          <span className="en">design for a</span>
          <span className="en">brighter tomorrow.</span>
        </Headline>
      </div>
    </section>
  );
}
