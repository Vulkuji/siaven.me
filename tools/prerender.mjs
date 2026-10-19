import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { en, renderPage, zh } from "../.build-ssr/entry-server.js";

const site = "https://siaven.me";
const meta = { zh: zh.meta, en: en.meta };
const htmlLang = { zh: "zh-CN", en: "en" };
const pages = [
  { file: "index.html", template: "index.html", page: "home", lang: "zh" },
  { file: "en/index.html", template: "index.html", page: "home", lang: "en" },
  { file: "404.html", template: "404.html", page: "not-found", lang: "zh" },
];

const dist = (file) => new URL(`../dist/${file}`, import.meta.url);
const escape = (text) =>
  text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function localizeHead(html, lang, path) {
  const text = meta[lang];
  const attribute = (pattern, value) =>
    html.replace(pattern, (_, start) => `${start}${escape(value)}"`);
  html = html.replace(/<html lang="[^"]*">/, `<html lang="${htmlLang[lang]}">`);
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escape(text.title)}</title>`,
  );
  html = attribute(
    /(<meta\s+name="description"\s+content=")[^"]*"/,
    text.description,
  );
  html = attribute(
    /(<meta\s+property="og:title"\s+content=")[^"]*"/,
    text.ogTitle,
  );
  html = attribute(
    /(<meta\s+property="og:description"\s+content=")[^"]*"/,
    text.ogDescription,
  );
  html = attribute(
    /(<link\s+rel="canonical"\s+href=")[^"]*"/,
    `${site}${path}`,
  );
  return attribute(
    /(<meta\s+property="og:url"\s+content=")[^"]*"/,
    `${site}${path}`,
  );
}

const templates = new Map();
for (const { template } of pages) {
  if (!templates.has(template)) {
    templates.set(template, await readFile(dist(template), "utf8"));
  }
}

const scriptHashes = new Set();
for (const { file, template, page, lang } of pages) {
  const source = templates.get(template);
  if (!source.includes("<!--app-html-->")) {
    throw new Error(`Missing React render target in ${template}`);
  }
  let html = source.replace("<!--app-html-->", renderPage(page, lang));
  if (page === "home")
    html = localizeHead(html, lang, lang === "en" ? "/en/" : "/");
  for (const [, attributes, content] of html.matchAll(
    /<script\b([^>]*)>([\s\S]*?)<\/script>/g,
  )) {
    if (/\bsrc\s*=/.test(attributes) || !content.trim()) continue;
    scriptHashes.add(
      `'sha256-${createHash("sha256").update(content).digest("base64")}'`,
    );
  }
  await mkdir(new URL(".", dist(file)), { recursive: true });
  await writeFile(dist(file), html);
}

const headersPath = dist("_headers");
const headers = await readFile(headersPath, "utf8");
await writeFile(
  headersPath,
  headers.replace(
    "script-src 'self'",
    `script-src 'self' ${[...scriptHashes].join(" ")}`,
  ),
);
console.log("Prerendered portfolio (zh, en) and 404 page");
