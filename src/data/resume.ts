import type { Localized } from "@/i18n";
import type { Category } from "./portfolio";

export interface Experience {
  company: Localized;
  category?: Category;
  role: Localized;
  period: Localized;
  points: { title?: Localized; text: Localized }[];
}

export const resume = {
  intent: { zh: "视觉设计方向", en: "Visual Design" } satisfies Localized,
  education: {
    school: { zh: "浙江理工大学", en: "Zhejiang Sci-Tech University" },
    college: { zh: "艺术与设计学院", en: "School of Art and Design" },
    major: {
      zh: "包装工程（视觉传达）",
      en: "Packaging Engineering (Visual Communication)",
    },
  } satisfies Record<string, Localized>,
  about: [
    {
      zh: "有 5 年多类行业的设计经验，了解教育美育、互联网、餐饮行业的设计需求，主导多项营销活动的设计项目。",
      en: "Five years of design experience across industries, with a solid understanding of design needs in arts education, the internet and food & beverage, and experience leading design for multiple marketing campaigns.",
    },
    {
      zh: "熟悉线下物料的设计及落地，能基于期望的效果探讨合适的材料和工艺，输出合适的方案推进落地。",
      en: "Experienced in designing offline materials and seeing them through to production; able to weigh suitable materials and finishes against the intended effect and deliver workable solutions.",
    },
    {
      zh: "具备良好的设计思维和自驱力，定期关注流行的设计趋势，结合 AI 工具提升设计效率，从活动反馈、用户体验中挖掘问题，协同运营部门改进设计方案。",
      en: "Strong design thinking and self-motivation; keeps up with design trends, uses AI tools to work more efficiently, and finds problems in campaign feedback and user experience to refine designs together with the operations team.",
    },
  ] satisfies Localized[],
  work: [
    {
      company: {
        zh: "杭州安旭生物科技股份有限公司",
        en: "Assure Tech",
      },
      category: "medical",
      role: { zh: "设计师", en: "Designer" },
      period: { zh: "2024.12 — 至今", en: "2024.12 — Present" },
      points: [
        {
          title: { zh: "核心展会支持", en: "Key Trade Show Support" },
          text: {
            zh: "深度参与 CACLP（2 次）、CMEF、北京警博会等顶级行业展会，独立完成全系列物料设计及现场拍摄。",
            en: "Deeply involved in top industry exhibitions including CACLP (twice), CMEF and the Beijing Police Equipment Expo; independently designed the full range of materials and handled on-site photography.",
          },
        },
        {
          title: {
            zh: "医疗器械及检测类产品包装设计",
            en: "Packaging for Medical Devices & Test Kits",
          },
          text: {
            zh: "主导多款多品类医疗产品包装及公共 / 民用检测类包装，满足法规要求的同时兼顾临床便捷性与用户心理感知。",
            en: "Led packaging for a wide range of medical products as well as public and consumer test kits, meeting regulatory requirements while balancing clinical convenience with how users perceive the product.",
          },
        },
        {
          title: {
            zh: "定制化医疗数据可视化产品",
            en: "Custom Medical Data Visualization",
          },
          text: {
            zh: "为医院及社区设计慢病数据大屏整体 UI 框架，核心图表与风格自研，其余模块支持客户定制，将复杂医疗数据转化为易读视觉语言。",
            en: "Designed the overall UI framework of chronic disease data dashboards for hospitals and communities, with in-house core charts and styling and other modules customizable for clients, turning complex medical data into an easy-to-read visual language.",
          },
        },
        {
          title: { zh: "品牌与企业文化建设", en: "Brand & Corporate Culture" },
          text: {
            zh: "负责公众号节气 / 医疗节日海报、产品推文配图及官网更新维护；设计多款周边礼品（手提袋、掼蛋牌、台历等）。",
            en: "Created WeChat official account posters for solar terms and medical observances, graphics for product articles, and kept the corporate website up to date; designed branded merchandise such as tote bags, Guandan playing cards and desk calendars.",
          },
        },
        {
          title: {
            zh: "日常与跨部门协作",
            en: "Daily Work & Cross-team Collaboration",
          },
          text: {
            zh: "完成产品宣传册、单页、易拉宝等销售物料设计及操作视频剪辑，跨部门高效协作。",
            en: "Designed sales materials such as product brochures, flyers and roll-up banners, edited how-to videos, and worked efficiently across departments.",
          },
        },
      ],
    },
    {
      company: {
        zh: "珀莱雅 · 原餐饮事业部",
        en: "Proya · Former Food & Beverage Division",
      },
      category: "food",
      role: { zh: "市场部设计岗", en: "Designer, Marketing Department" },
      period: { zh: "2023.4 — 2024.4", en: "2023.4 — 2024.4" },
      points: [
        {
          title: {
            zh: "TD66 品牌视觉升级设计提案",
            en: "TD66 Brand Visual Upgrade Proposal",
          },
          text: {
            zh: "洞察设计趋势，重塑品牌形象，传递新品牌的活力与时尚感，打造年轻化视觉形象。",
            en: "Drew on design trends to reshape the brand image, conveying the energy and style of the new brand through a younger visual identity.",
          },
        },
        {
          title: {
            zh: "五大品牌营销宣传设计",
            en: "Marketing Design for Five Brands",
          },
          text: {
            zh: "负责品牌营销活动、宣传渠道、门店应用等视觉设计，电商板块套图及部分摄影修图工作，完成活动类项目 15+。",
            en: "Handled visual design for brand campaigns, promotional channels and in-store applications, plus e-commerce image sets and some photo retouching; completed 15+ campaign projects.",
          },
        },
      ],
    },
    {
      company: { zh: "杭州铸金文化艺术", en: "Hangzhou Zhujin Culture & Art" },
      category: "art",
      role: { zh: "新媒体运营及设计", en: "New Media Operations & Design" },
      period: { zh: "2022.7 — 2023.3", en: "2022.7 — 2023.3" },
      points: [
        {
          text: {
            zh: "公众号海报宣传设计、线下广告展板设计及其他设计任务。",
            en: "Poster design for the WeChat official account, offline advertising boards and other design tasks.",
          },
        },
      ],
    },
    {
      company: {
        zh: "杭州大腕网络科技",
        en: "Hangzhou Dawan Network Technology",
      },
      role: { zh: "设计岗", en: "Designer" },
      period: { zh: "2022.3 — 2022.6", en: "2022.3 — 2022.6" },
      points: [
        {
          text: {
            zh: "线上直播海报、线下会议物料设计，及部分产品画册和视频剪辑。",
            en: "Posters for online livestreams and materials for offline conferences, plus some product brochures and video editing.",
          },
        },
      ],
    },
  ] satisfies Experience[],
  internships: [
    {
      company: { zh: "杭州海康威视", en: "Hikvision, Hangzhou" },
      category: "event",
      role: { zh: "设计专员", en: "Design Specialist" },
      period: { zh: "2020.10 — 2021.2", en: "2020.10 — 2021.2" },
      points: [
        {
          title: {
            zh: "人才储备项目品牌设计",
            en: "Talent Reserve Program Branding",
          },
          text: {
            zh: "独立完成集团 CMR 经理人项目的全套 VI 设计，规范培训材料视觉，提升项目专业观感。",
            en: "Independently created the complete VI for the group's CMR Manager program, standardizing the look of training materials and giving the program a more professional image.",
          },
        },
        {
          title: {
            zh: "CMR 经理人年度会议活动物料设计",
            en: "CMR Manager Annual Meeting Materials",
          },
          text: {
            zh: "个人主导完成 P7 级以上 30 余人员的年度会议主 KV 及延伸物料设计，寻找供应商并跟踪进度。",
            en: "Led the key visual and extended materials for an annual meeting of 30+ managers at level P7 and above, sourcing suppliers and tracking production.",
          },
        },
      ],
    },
    {
      company: { zh: "杭州学天教育", en: "Hangzhou Xuetian Education" },
      role: { zh: "设计岗", en: "Designer" },
      period: { zh: "2020.6 — 2020.9", en: "2020.6 — 2020.9" },
      points: [
        {
          text: {
            zh: "负责 PPT 美化、海报制作及视频审核。",
            en: "PowerPoint design, poster production and video review.",
          },
        },
      ],
    },
  ] satisfies Experience[],
  skills: [
    {
      label: { zh: "英语能力", en: "English" },
      text: { zh: "CET-6", en: "CET-6 (College English Test, Band 6)" },
    },
    {
      label: { zh: "设计软件", en: "Software" },
      text: {
        zh: "PS、AI、LR、剪映等，可运用 AI 辅助设计",
        en: "Photoshop, Illustrator, Lightroom, CapCut and more; experienced with AI-assisted design",
      },
    },
    {
      label: { zh: "专业知识", en: "Expertise" },
      text: {
        zh: "品牌视觉 / 包装设计 / 广告传播 / 信息编排，了解数字印前、包装印刷相关工艺",
        en: "Brand identity, packaging, advertising and editorial layout; familiar with digital prepress and packaging printing processes",
      },
    },
  ] satisfies { label: Localized; text: Localized }[],
  honors: [
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
  ] satisfies Localized[],
};
