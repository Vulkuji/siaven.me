import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { m } from "motion/react";
import type { View } from "@/hooks/use-route";
import {
  basePath,
  htmlLang,
  langStorageKey,
  languages,
  useLang,
  type Lang,
} from "@/i18n";

const links: { view: View; href: string; key: string }[] = [
  { view: "canvas", href: "#", key: "nav.canvas" },
  { view: "archive", href: "#archive", key: "nav.archive" },
  { view: "resume", href: "#resume", key: "nav.resume" },
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

function ModeToggle() {
  const { t } = useLang();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <div className="mode-dots" role="group" aria-label={t("theme.label")}>
      {(["light", "dark"] as const).map((mode) => (
        <button
          key={mode}
          type="button"
          aria-pressed={mounted && resolvedTheme === mode}
          onClick={() => setTheme(mode)}
        >
          {t(`theme.${mode}`)}
        </button>
      ))}
    </div>
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

export function SiteHeader({ view }: { view?: View }) {
  const { t, other } = useLang();
  return (
    <header className="site-head">
      <a href="#" aria-label={t("nav.home")}>
        <Wordmark />
      </a>
      <nav className="site-nav" aria-label={t("nav.label")}>
        {links.map((link) => {
          const label = (
            <>
              {t(link.key)}
              <small>{t(link.key, { lng: other })}</small>
            </>
          );
          return (
            <a
              key={link.view}
              href={link.href}
              aria-current={view === link.view ? "page" : undefined}
              className="nav-link"
            >
              <span className="nav-roll">
                <span>{label}</span>
                <span aria-hidden="true">{label}</span>
              </span>
              {view === link.view && (
                <m.span
                  layoutId="nav-indicator"
                  className="nav-indicator"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </a>
          );
        })}
      </nav>
      <div className="head-tools">
        <LangToggle />
        <ModeToggle />
      </div>
    </header>
  );
}
