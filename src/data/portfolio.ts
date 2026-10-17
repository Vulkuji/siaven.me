import entries from "./works.json";

export type Category = "food" | "medical" | "art" | "event";

export interface Picture {
  src: string;
  width: number;
  height: number;
}

export interface Work {
  id: string;
  title: string;
  category: Category;
  label: string;
  summary: string;
  details: { label: string; text: string }[];
  images: Picture[];
  cover: Picture;
  thumb: Picture;
}

export const works = entries as Work[];

export const categories: Record<Category, { zh: string; en: string }> = {
  food: { zh: "茶饮餐饮", en: "FOOD & BEVERAGE" },
  medical: { zh: "医疗视觉", en: "MEDICAL VISUAL" },
  art: { zh: "艺术教育", en: "ART EDUCATION" },
  event: { zh: "企业活动", en: "CORPORATE EVENT" },
};

export const categoryOrder: Category[] = ["food", "medical", "art", "event"];

export const profile = {
  name: "lingshan.zhu",
  role: "视觉设计师",
  status: "OPEN TO WORK · 求职中",
  intent: "视觉设计方向",
  focus: "品牌视觉 / 包装设计 / 广告传播",
  email: "muasiaven@gmail.com",
};

export const pad = (value: number) => String(value).padStart(2, "0");
