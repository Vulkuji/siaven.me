import entries from "./works.json";

export const works = entries;
export type Work = (typeof works)[number];
export const contactEmail = "muasiaven@gmail.com";

export const categories = [
  { value: "all", label: "全部作品" },
  { value: "brand", label: "品牌与包装" },
  { value: "campaign", label: "活动与传播" },
  { value: "medical", label: "医疗与界面" },
  { value: "culture", label: "艺术与企业" },
] as const;

export type Category = (typeof categories)[number]["value"];
