import { useGround } from "@/hooks/use-ground";
import type { View } from "@/hooks/use-route";
import {
  basePath,
  htmlLang,
  langStorageKey,
  languages,
  useLang,
  type Lang,
} from "@/i18n";

const links = [
  { hash: "#works", key: "nav.work", short: "WORK" },
  { hash: "#all-work", key: "nav.allWork", short: "ALL" },
  { hash: "#experience", key: "nav.experience", short: "CV" },
  { hash: "#contact", key: "nav.contact", short: "HELLO" },
];

const languageNames: Record<Lang, string> = { zh: "中", en: "EN" };

export function Wordmark() {
  return (
    <span className="wordmark">
      <img src="/favicon.svg" alt="" width={100} height={100} />
      siaven
    </span>
  );
}

function LangToggle() {
  const { t, lang, i18n } = useLang();
  const choose = (next: Lang) => {
    if (next === lang) return;
    void i18n.changeLanguage(next);
    try {
      localStorage.setItem(langStorageKey, next);
    } catch {
      // Storage can be unavailable; the URL still carries the language.
    }
    window.history.replaceState(
      window.history.state,
      "",
      basePath[next] + window.location.hash,
    );
    document.documentElement.lang = htmlLang[next];
    document.title = t("meta.title", { lng: next });
  };
  return (
    <div className="lang-switch" role="group" aria-label={t("language.label")}>
      {languages.map((code) => (
        <button
          key={code}
          type="button"
          lang={htmlLang[code]}
          aria-pressed={lang === code}
          onClick={() => choose(code)}
        >
          {languageNames[code]}
        </button>
      ))}
    </div>
  );
}

function NavLabel({ labelKey, short }: { labelKey: string; short?: string }) {
  const { t, lang } = useLang();
  return (
    <span className="roll" data-rolls={lang === "zh"}>
      <span className="long">{t(labelKey, { lng: "en" })}</span>
      {short && <span className="short">{short}</span>}
      {lang === "zh" && (
        <span className="roll-cn" aria-hidden="true" lang="zh-CN">
          {t(labelKey, { lng: "zh" })}
        </span>
      )}
    </span>
  );
}

export function SiteHeader({
  view,
  base = "",
}: {
  view?: View;
  /** Prefix for section links when the header sits outside the home page. */
  base?: string;
}) {
  const { t } = useLang();
  const light = useGround(view);
  return (
    <>
      <a className="brand" href={base || "#top"} aria-label={t("nav.home")}>
        <img src="/favicon.svg" alt="" width={100} height={100} />
      </a>
      <header className="bar" data-light={light}>
        <a className="bar-word" href={base || "#top"} tabIndex={-1}>
          siaven
        </a>
        <nav aria-label={t("nav.label")}>
          {links.map((link) => (
            <a
              key={link.hash}
              className="nav-a"
              href={base + link.hash}
              aria-current={
                link.hash === "#all-work" && view === "all" ? "page" : undefined
              }
            >
              <NavLabel labelKey={link.key} short={link.short} />
            </a>
          ))}
          <a className="nav-a bar-cv" href={`${base}#experience`}>
            <NavLabel labelKey="nav.resume" />
          </a>
          <LangToggle />
        </nav>
      </header>
    </>
  );
}
