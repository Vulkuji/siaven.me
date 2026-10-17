import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("../", import.meta.url));
const source = process.argv[2];
if (!source) throw new Error("Usage: npm run export -- <works folder>");

const categories = {
  茶饮餐饮: "food",
  医疗视觉: "medical",
  艺术教育: "art",
  企业活动: "event",
};
const detailLabels = ["项目背景", "我负责的部分", "设计思路", "最终成果"];
const imagePattern = /\.(webp|png|jpe?g|gif)$/i;
const output = {
  works: path.join(root, "static/assets/works"),
  covers: path.join(root, "static/assets/covers"),
  thumbs: path.join(root, "static/assets/thumbs"),
};

function field(text, label) {
  return text.match(new RegExp(`^${label}：(.*)$`, "m"))?.[1].trim() ?? "";
}

const titleFrom = (folder) =>
  folder
    .replace(/^\d+\s*/, "")
    .trim()
    .replace(/\s*_\s*/g, " · ");

function parseIntro(text, folder) {
  const summary = text
    .split(/^一句话介绍[^\n]*\n/m)[1]
    ?.split(/^详细描述/m)[0]
    .split("\n")
    .map((line) => line.trim())
    .find(Boolean);
  const category = categories[field(text, "所属分类")];
  const work = {
    title: titleFrom(folder),
    category,
    label: field(text, "作品标签"),
    summary: summary ?? "",
    details: detailLabels
      .map((label) => ({ label, text: field(text, label) }))
      .filter((detail) => detail.text),
  };
  for (const key of ["title", "category", "label", "summary"]) {
    if (!work[key]) throw new Error(`${folder}: missing ${key}`);
  }
  return work;
}

const publicPath = (file) =>
  `/${path.relative(path.join(root, "static"), file).split(path.sep).join("/")}`;

async function writeImage(input, file, width, quality) {
  const animated = ((await sharp(input).metadata()).pages ?? 1) > 1;
  const image = animated
    ? sharp(input, { animated: true }).resize({
        width: 720,
        withoutEnlargement: true,
      })
    : sharp(input).rotate().resize({ width, withoutEnlargement: true });
  const info = await image
    .webp({ quality: animated ? 72 : quality, effort: 5 })
    .toFile(file);
  return {
    src: publicPath(file),
    width: info.width,
    height: info.pageHeight ?? info.height,
  };
}

async function writeCrop(input, region, file, width) {
  const { data, info } = await sharp(input)
    .rotate()
    .toBuffer({ resolveWithObject: true });
  const [x0, y0, x1, y1] = region.crop ?? [0, 0, 1, 1];
  const cropped = sharp(data).extract({
    left: Math.round(x0 * info.width),
    top: Math.round(y0 * info.height),
    width: Math.round((x1 - x0) * info.width),
    height: Math.round((y1 - y0) * info.height),
  });
  const result = await cropped
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(file);
  return { src: publicPath(file), width: result.width, height: result.height };
}

const config = JSON.parse(
  await readFile(path.join(root, "content/works.json"), "utf8"),
);
const folders = (await readdir(source, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);
for (const directory of Object.values(output)) {
  await rm(directory, { recursive: true, force: true });
  await mkdir(directory, { recursive: true });
}

const works = [];
for (const entry of config) {
  const folder = folders.find((name) => name.startsWith(entry.folder));
  if (!folder) throw new Error(`No folder starting with ${entry.folder}`);
  const files = (await readdir(path.join(source, folder))).sort();
  const texts = files.filter((name) => name.endsWith(".txt"));
  const intro = texts.includes("介绍.txt") ? "介绍.txt" : texts[0];
  if (!intro) throw new Error(`${folder}: missing 介绍.txt`);
  const work = parseIntro(
    await readFile(path.join(source, folder, intro), "utf8"),
    folder,
  );
  const sources = files
    .filter((name) => imagePattern.test(name))
    .map((name) => path.join(source, folder, name));

  const images = [];
  for (const [index, input] of sources.entries()) {
    const name = `${entry.id}-${String(index + 1).padStart(2, "0")}.webp`;
    images.push(
      await writeImage(input, path.join(output.works, name), 1600, 80),
    );
  }
  const cover = await writeCrop(
    sources[entry.cover.image - 1],
    entry.cover,
    path.join(output.covers, `${entry.id}.webp`),
    720,
  );
  const thumb = await writeCrop(
    sources[entry.thumb.image - 1],
    entry.thumb,
    path.join(output.thumbs, `${entry.id}.webp`),
    640,
  );
  works.push({ id: entry.id, ...work, images, cover, thumb });
  console.log(`${entry.id}: ${images.length} images`);
}

await writeFile(
  path.join(root, "src/data/works.json"),
  `${JSON.stringify(works, null, 2)}\n`,
);
console.log(`Exported ${works.length} works`);
