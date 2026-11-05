import type { Localized } from "@/i18n";

export const facts: { label: string; value: Localized }[] = [
  { label: "EXPERIENCE", value: { en: "5 years", zh: "5 年设计经验" } },
  {
    label: "FOCUS",
    value: {
      en: "Brand, Packaging, Advertising",
      zh: "品牌视觉 / 包装设计 / 广告传播",
    },
  },
  {
    label: "INDUSTRIES",
    value: {
      en: "Medical, F&B, Art Education, Events",
      zh: "医疗 · 茶饮餐饮 · 艺术教育 · 企业活动",
    },
  },
  {
    label: "WORKED AT",
    value: {
      en: "Assure Tech, Proya, Hikvision...",
      zh: "安旭生物 · 珀莱雅 · 海康威视（实习）...",
    },
  },
];

export interface Job {
  when: Localized;
  company: Localized;
  role: Localized;
  note: Localized;
}

export const jobs: Job[] = [
  {
    when: { en: "2024.12 — NOW", zh: "2024.12 — 至今" },
    company: { en: "Assure Tech", zh: "安旭生物" },
    role: { en: "Designer", zh: "设计师" },
    note: {
      en: "Designs full material sets and shoots on site for trade shows such as CACLP and CMEF; leads medical device packaging and chronic disease dashboard UI.",
      zh: "负责 CACLP、CMEF 等行业展会全系列物料与现场拍摄，主导医疗器械包装和慢病数据大屏 UI。",
    },
  },
  {
    when: { en: "2023.4 — 2024.4", zh: "2023.4 — 2024.4" },
    company: { en: "Proya · Former F&B Division", zh: "珀莱雅 · 原餐饮事业部" },
    role: { en: "Marketing Designer", zh: "市场部设计岗" },
    note: {
      en: "TD66 brand visual upgrade proposal and marketing design for five brands, with 15+ campaign projects completed.",
      zh: "TD66 品牌视觉升级提案，五大品牌的营销宣传设计，完成活动类项目 15+。",
    },
  },
  {
    when: { en: "2022.7 — 2023.3", zh: "2022.7 — 2023.3" },
    company: { en: "Zhujin Culture & Art", zh: "杭州铸金文化艺术" },
    role: { en: "New Media & Design", zh: "新媒体运营及设计" },
    note: {
      en: "Posters for the WeChat official account, offline advertising boards and other design tasks.",
      zh: "公众号海报宣传设计、线下广告展板设计及其他设计任务。",
    },
  },
  {
    when: { en: "2022.3 — 2022.6", zh: "2022.3 — 2022.6" },
    company: { en: "Dawan Network Technology", zh: "杭州大腕网络科技" },
    role: { en: "Designer", zh: "设计岗" },
    note: {
      en: "Posters for online livestreams and materials for offline conferences, plus some product brochures and video editing.",
      zh: "线上直播海报、线下会议物料设计，及部分产品画册和视频剪辑。",
    },
  },
  {
    when: { en: "2020.10 — 2021.2", zh: "2020.10 — 2021.2" },
    company: { en: "Hikvision (Intern)", zh: "杭州海康威视（实习）" },
    role: { en: "Design Specialist", zh: "设计专员" },
    note: {
      en: "Independently created the complete VI for the group's CMR Manager program; led the annual meeting key visual and extended materials.",
      zh: "独立完成集团 CMR 经理人项目全套 VI，主导年度会议主 KV 及延伸物料。",
    },
  },
  {
    when: { en: "2020.6 — 2020.9", zh: "2020.6 — 2020.9" },
    company: { en: "Xuetian Education (Intern)", zh: "杭州学天教育（实习）" },
    role: { en: "Designer", zh: "设计岗" },
    note: {
      en: "PowerPoint design, poster production and video review.",
      zh: "负责 PPT 美化、海报制作及视频审核。",
    },
  },
];

export interface ResumeBlock {
  title: Localized;
  main: string;
  sub: Localized;
}

export const resumeBlocks: ResumeBlock[] = [
  {
    title: { en: "EDUCATION", zh: "教育背景" },
    main: "Zhejiang Sci-Tech University",
    sub: {
      en: "School of Art and Design · Packaging Engineering (Visual Communication)",
      zh: "浙江理工大学 · 艺术与设计学院 · 包装工程（视觉传达）",
    },
  },
  {
    title: { en: "SOFTWARE", zh: "设计软件" },
    main: "Photoshop, Illustrator, Lightroom, CapCut",
    sub: {
      en: "Experienced with AI-assisted design",
      zh: "PS、AI、LR、剪映等，可运用 AI 辅助设计",
    },
  },
  {
    title: { en: "LANGUAGE & CRAFT", zh: "语言与工艺" },
    main: "CET-6",
    sub: {
      en: "Familiar with digital prepress and packaging printing processes",
      zh: "了解数字印前、包装印刷相关工艺",
    },
  },
];

export const honors: Localized[] = [
  {
    zh: "第五届浙江理工大学“互联网+”大赛三等奖",
    en: "Third Prize, 5th Zhejiang Sci-Tech University “Internet+” Competition",
  },
  {
    zh: "2019 浙江省大学生新苗人才计划立项项目负责人",
    en: "2019 Project Lead, Zhejiang Xinmiao Talent Program for College Students",
  },
  {
    zh: "2018 公费韩国庆南大学交流活动",
    en: "2018 Funded exchange program at Kyungnam University, South Korea",
  },
  {
    zh: "校优秀学生二等奖学金及三等奖学金",
    en: "University Outstanding Student Scholarships (Second and Third Class)",
  },
];
