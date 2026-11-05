import { useEffect, useRef, useState } from "react";
import { ResumeDownload } from "@/components/resume-download";
import { profile } from "@/data/portfolio";
import { useLang } from "@/i18n";

/** Email address as a mail link beside a copy button, for people without a mail app set up. */
export function EmailActions({ onBone = false }: { onBone?: boolean }) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const tone = onBone ? " on-bone" : "";
  return (
    <>
      <a className={`pill solid${tone}`} href={`mailto:${profile.email}`}>
        {profile.email}
      </a>
      <button
        className={`pill${tone}`}
        type="button"
        onClick={() => {
          void navigator.clipboard?.writeText(profile.email).then(() => {
            setCopied(true);
            window.clearTimeout(timer.current);
            timer.current = window.setTimeout(() => setCopied(false), 2000);
          });
        }}
      >
        {t(copied ? "contact.copied" : "contact.copy")}
      </button>
    </>
  );
}

export function Contact() {
  const { t, lang } = useLang();
  return (
    <section className="sec t-ink contact" id="contact" data-route="contact">
      <div className="lit" />
      <div className="over">
        <h2 className="contact-title reveal">
          LET’S MAKE
          <br />
          SOMETHING
          <br />
          VISIBLE<b>?</b>
        </h2>
        {lang === "zh" && (
          <p className="contact-cn reveal" lang="zh-CN">
            {t("contact.note")}
          </p>
        )}
        <div className="contact-acts reveal">
          <EmailActions />
          <ResumeDownload />
        </div>
      </div>
      <div className="cat-slot" aria-hidden="true" />
      <div className="contact-foot over">
        <span>{profile.name} · Siaven · call me 03</span>
        <a href="#playground">{t("contact.playground")} ↗</a>
        <a href="#top">{t("contact.top")} ↑</a>
      </div>
    </section>
  );
}
