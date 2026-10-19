import { createInstance, type i18n } from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import zh from "@/locales/zh.json";
import en from "@/locales/en.json";

export const languages = ["zh", "en"] as const;
export type Lang = (typeof languages)[number];
export type Localized = Record<Lang, string>;

export const htmlLang: Record<Lang, string> = { zh: "zh-CN", en: "en" };
export const basePath: Record<Lang, string> = { zh: "/", en: "/en/" };
export const langStorageKey = "siaven-lang";

export const langFromPath = (pathname: string): Lang =>
  pathname.startsWith("/en") ? "en" : "zh";

export const otherLang = (lang: Lang): Lang => (lang === "zh" ? "en" : "zh");

export function createI18n(lng: Lang): i18n {
  const instance = createInstance();
  void instance.use(initReactI18next).init({
    lng,
    fallbackLng: "zh",
    resources: { zh: { translation: zh }, en: { translation: en } },
    initAsync: false,
    interpolation: { escapeValue: false },
  });
  return instance;
}

export function useLang() {
  const { t, i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage ?? "zh") as Lang;
  return {
    t,
    i18n,
    lang,
    other: otherLang(lang),
    pick: (value: Localized) => value[lang],
  };
}
