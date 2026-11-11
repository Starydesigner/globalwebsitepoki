export type PageMessageKey =
  | "page.brand"
  | "page.home"
  | "page.onlineSend"
  | "page.products"
  | "page.crossBorder"
  | "page.overseasLocal"
  | "page.innerLocal"
  | "page.solution"
  | "page.techGlobal"
  | "page.about"
  | "page.news"
  | "page.enterpriseInquiry"
  | "page.placeholder";

const zh: Record<PageMessageKey, string> = {
  "page.brand": "中通国际",
  "page.home": "中通国际 · 首页",
  "page.onlineSend": "中通国际 · 寄递服务",
  "page.products": "中通国际 · 物流产品",
  "page.crossBorder": "中通国际 · 跨境业务",
  "page.overseasLocal": "中通国际 · 海外本土服务",
  "page.innerLocal": "中通国际 · 中国港澳本土服务",
  "page.solution": "中通国际 · 解决方案",
  "page.techGlobal": "中通国际 · 科技全球",
  "page.about": "中通国际 · 关于我们",
  "page.news": "中通国际 · 新闻资讯",
  "page.enterpriseInquiry": "中通国际 · 企业咨询",
  "page.placeholder": "中通国际",
};

const en: Record<PageMessageKey, string> = {
  "page.brand": "ZTO Global",
  "page.home": "ZTO Global · Home",
  "page.onlineSend": "ZTO Global · Shipping",
  "page.products": "ZTO Global · Products",
  "page.crossBorder": "ZTO Global · Cross-border",
  "page.overseasLocal": "ZTO Global · Overseas local",
  "page.innerLocal": "ZTO Global · HK & MO local",
  "page.solution": "ZTO Global · Solutions",
  "page.techGlobal": "ZTO Global · Technology",
  "page.about": "ZTO Global · About",
  "page.news": "ZTO Global · News",
  "page.enterpriseInquiry": "ZTO Global · Business inquiry",
  "page.placeholder": "ZTO Global",
};

export const PAGE_MESSAGES = { zh, en } as const;

export const ROUTE_PAGE_TITLE: Record<string, PageMessageKey> = {
  home: "page.home",
  "online-send": "page.onlineSend",
  products: "page.products",
  "cross-border": "page.crossBorder",
  "overseas-local": "page.overseasLocal",
  "inner-local": "page.innerLocal",
  solution: "page.solution",
  "tech-global": "page.techGlobal",
  about: "page.about",
  news: "page.news",
  "enterprise-inquiry": "page.enterpriseInquiry",
};
