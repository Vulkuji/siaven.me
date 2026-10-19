import type { CSSProperties, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  categories,
  pad,
  profile,
  works,
  type Category,
} from "@/data/portfolio";
import { resume, type Experience } from "@/data/resume";
import { useLang } from "@/i18n";
import { Headline } from "@/components/ornaments";

function Section({
  titleKey,
  children,
}: {
  titleKey: string;
  children: ReactNode;
}) {
  const { t, other } = useLang();
  return (
    <section className="resume-section">
      <h3>
        {t(titleKey)}
        <small>/ {t(titleKey, { lng: other })}</small>
      </h3>
      <div>{children}</div>
    </section>
  );
}

function RelatedWorks({ category }: { category: Category }) {
  const { t, pick } = useLang();
  const related = works.filter((work) => work.category === category);
  const name = pick(categories[category]);
  return (
    <a
      className="resume-related"
      href={`#archive/${category}`}
      data-cursor={t("cursor.related", { name })}
    >
      <span className="resume-peek" aria-hidden="true">
        {related.slice(0, 3).map((work, index) => (
          <img
            key={work.id}
            src={work.card.src}
            width={work.card.width}
            height={work.card.height}
            alt=""
            loading="lazy"
            style={{ "--i": index } as CSSProperties}
          />
        ))}
      </span>
      <span>
        {t("resume.related", { name })} <small>{pad(related.length)}</small>
      </span>
      <ArrowUpRight aria-hidden="true" />
    </a>
  );
}

function Experiences({ items }: { items: Experience[] }) {
  const { pick } = useLang();
  return items.map((item) => (
    <article key={item.company.zh} className="resume-entry">
      <header>
        <h4>
          {pick(item.company)}
          <span>{pick(item.role)}</span>
        </h4>
        <time>{pick(item.period)}</time>
      </header>
      <ul>
        {item.points.map((point) => (
          <li key={point.text.zh}>
            {point.title && <b>{pick(point.title)}</b>}
            {pick(point.text)}
          </li>
        ))}
      </ul>
      {item.category && <RelatedWorks category={item.category} />}
    </article>
  ));
}

function Facts() {
  const { t, pick } = useLang();
  const { school, college, major } = resume.education;
  const facts: { label: string; content: ReactNode }[] = [
    {
      label: t("resume.education"),
      content: (
        <>
          {pick(school)}
          {pick({ zh: "｜", en: " | " })}
          {pick(college)}
          <br />
          {pick(major)}
        </>
      ),
    },
    ...resume.skills.map((skill) => ({
      label: pick(skill.label),
      content: pick(skill.text),
    })),
    {
      label: t("resume.contact"),
      content: (
        <a href={`mailto:${profile.email}`}>
          {profile.email}
          <ArrowUpRight aria-hidden="true" />
        </a>
      ),
    },
  ];
  return (
    <dl className="resume-facts">
      {facts.map((fact) => (
        <div key={fact.label}>
          <dt>{fact.label}</dt>
          <dd>{fact.content}</dd>
        </div>
      ))}
    </dl>
  );
}

const [first, last] = profile.name.split(".");

export function ResumeView({ active }: { active: boolean }) {
  const { t, pick } = useLang();
  return (
    <section
      className="view view-resume"
      hidden={!active}
      aria-label={t("resume.label")}
    >
      <div className="resume-scroll">
        <div className="resume">
          <aside className="resume-card">
            <p className="kicker">{t("resume.kicker")}</p>
            <h2 className="resume-name" aria-label={profile.name}>
              {first}
              <span className="name-dot" aria-hidden="true" />
              {last}
            </h2>
            <p className="resume-intent">
              {t("resume.intent", { intent: pick(resume.intent) })}
            </p>
            <span className="status">{pick(profile.status)}</span>
            <Facts />
          </aside>
          <div className="resume-body">
            <Section titleKey="resume.about">
              {resume.about.map((line) => (
                <p key={line.zh} className="resume-about">
                  {pick(line)}
                </p>
              ))}
            </Section>
            <Section titleKey="resume.work">
              <Experiences items={resume.work} />
            </Section>
            <Section titleKey="resume.internship">
              <Experiences items={resume.internships} />
            </Section>
            <Section titleKey="resume.honors">
              <ul className="resume-honors">
                {resume.honors.map((honor) => (
                  <li key={honor.zh}>{pick(honor)}</li>
                ))}
              </ul>
            </Section>
          </div>
        </div>
      </div>
      <Headline>
        <span className="en">
          resume<small>个人简历</small>
        </span>
        <span className="en">design for a brighter tomorrow.</span>
      </Headline>
    </section>
  );
}
