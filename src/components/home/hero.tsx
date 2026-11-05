import { LetterLine } from "@/components/letter-line";
import { profile } from "@/data/portfolio";
import { useLang } from "@/i18n";

export function Hero() {
  const { t, lang, pick, zhOnly } = useLang();
  return (
    <section className="sec t-ink hero" id="top" data-route="hero">
      <div className="lit" />
      <h1
        className="hero-title"
        aria-label={`${profile.name}, ${pick(profile.role)}`}
      >
        <LetterLine className="name under" text="LINGSHAN.ZHU" />
        {lang === "zh" ? (
          <span className="role over" aria-hidden="true">
            <span className="role-cn">视觉设计师</span>
            <b>.</b>
            <span className="role-en">
              VISUAL
              <br />
              DESIGNER
            </span>
          </span>
        ) : (
          <span className="role role-full over" aria-hidden="true">
            VISUAL DESIGNER
            <b>.</b>
          </span>
        )}
      </h1>
      <div className="hero-foot over">
        <div className="hero-lede">
          <p className="lede-en">{t("hero.lede", { lng: "en" })}</p>
          {lang === "zh" && (
            <p className="lede-cn" lang="zh-CN">
              {t("hero.lede")}
            </p>
          )}
        </div>
        <p className="hero-state">
          <span className="pulse" aria-hidden="true" />
          {t("hero.status", { lng: "en" })}
          {zhOnly(` · ${t("hero.status")}`)}
        </p>
        <a className="hero-cue" href="#works">
          FOLLOW THE ROPE<i aria-hidden="true">↓</i>
        </a>
      </div>
    </section>
  );
}
