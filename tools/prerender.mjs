import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { renderPage } from "../.build-ssr/entry-server.js";

const scriptHashes = new Set();
for (const [filename, page] of [
  ["index.html", "home"],
  ["404.html", "not-found"],
]) {
  const destination = new URL(`../dist/${filename}`, import.meta.url);
  const template = await readFile(destination, "utf8");
  if (!template.includes("<!--app-html-->")) {
    throw new Error(`Missing React render target in ${filename}`);
  }
  const html = template.replace("<!--app-html-->", renderPage(page));
  for (const [, attributes, content] of html.matchAll(
    /<script\b([^>]*)>([\s\S]*?)<\/script>/g,
  )) {
    if (/\bsrc\s*=/.test(attributes) || !content.trim()) continue;
    scriptHashes.add(
      `'sha256-${createHash("sha256").update(content).digest("base64")}'`,
    );
  }
  await writeFile(destination, html);
}
const headersPath = new URL("../dist/_headers", import.meta.url);
const headers = await readFile(headersPath, "utf8");
await writeFile(
  headersPath,
  headers.replace(
    "script-src 'self'",
    `script-src 'self' ${[...scriptHashes].join(" ")}`,
  ),
);
console.log("Prerendered portfolio and 404 page");
