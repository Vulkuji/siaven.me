import type { Localized } from "@/i18n";
import entries from "./works.json";

export type Category = "food" | "medical" | "art" | "event";
export type DetailKey = "background" | "role" | "approach" | "outcome";

export interface Picture {
  src: string;
  width: number;
  height: number;
}

export interface Work {
  id: string;
  title: Localized;
  category: Category;
  label: Localized;
  summary: Localized;
  details: { key: DetailKey; text: Localized }[];
  images: Picture[];
  cover: Picture;
  card: Picture;
}

export const works = entries as Work[];

export const categories: Record<Category, Localized> = {
  food: { zh: "茶饮餐饮", en: "Food & Beverage" },
  medical: { zh: "医疗视觉", en: "Medical Visuals" },
  art: { zh: "艺术教育", en: "Art Education" },
  event: { zh: "企业活动", en: "Corporate Events" },
};

export const categoryOrder: Category[] = ["food", "medical", "art", "event"];

export const profile = {
  name: "lingshan.zhu",
  role: { zh: "视觉设计师", en: "Visual Designer" } satisfies Localized,
  status: {
    zh: "OPEN TO WORK · 求职中",
    en: "OPEN TO WORK",
  } satisfies Localized,
  focus: {
    zh: "品牌视觉 / 包装设计 / 广告传播",
    en: "Brand Identity / Packaging / Advertising",
  } satisfies Localized,
  email: "muasiaven@gmail.com",
};

export const pad = (value: number) => String(value).padStart(2, "0");

export function titleParts(title: string) {
  const [first, ...rest] = title.split(" · ");
  return rest.length
    ? { sub: first, main: rest.join(" · ") }
    : { sub: "", main: first };
}
