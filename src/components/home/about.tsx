import { facts } from "@/data/resume";
import { useLang } from "@/i18n";

const statement = [
  { text: "Make ideas " },
  { text: "visible.", accent: true },
  {
    text: " Brands, packaging and spaces for tea & dining, medical and art education.",
  },
];

function ScrubbedStatement() {
  const label = statement.map((part) => part.text).join("");
  return (
    <p className="statement over" data-scrub aria-label={label}>
      {statement.map((part, partIndex) => {
        const chars = [...part.text].map((char, index) => (
          <span key={index} data-char aria-hidden="true">
            {char}
          </span>
        ));
        return part.accent ? (
          <em key={partIndex}>{chars}</em>
        ) : (
          <span key={partIndex}>{chars}</span>
        );
      })}
    </p>
  );
}

export function About() {
  const { t, lang } = useLang();
  return (
    <section className="sec t-bone about" data-route="about">
      <div className="lit" />
      <ScrubbedStatement />
      {lang === "zh" && (
        <p className="about-cn over reveal" lang="zh-CN">
          {t("about.note")}
        </p>
      )}
      <dl className="facts over reveal">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt>{fact.label}</dt>
            <dd>
              {fact.value.en}
              {lang === "zh" && <span lang="zh-CN">{fact.value.zh}</span>}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
