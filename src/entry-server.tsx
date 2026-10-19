import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App, { type Page } from "./App";
import type { Lang } from "./i18n";

export { default as zh } from "./locales/zh.json";
export { default as en } from "./locales/en.json";

export function renderPage(page: Page, lang: Lang) {
  return renderToString(
    <StrictMode>
      <App page={page} lang={lang} />
    </StrictMode>,
  );
}
