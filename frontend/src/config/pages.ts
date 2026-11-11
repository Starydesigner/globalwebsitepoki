export type PageBannerVariant = "default" | "cross-enter" | "ship" | "placeholder";

export type BannerKind =
  | { type: "hero" }
  | { type: "none" }
  | { type: "ship" }
  | { type: "placeholder" }
  | {
      type: "page";
      variant?: PageBannerVariant;
      image?: string;
      title: string;
      titleHighlight?: string;
      subtitle: string;
      photo?: string;
    };

export interface PageMeta {
  id: string;
  /** 已为独立 Vue 应用（SPA 路由） */
  nativeVue?: boolean;
  documentTitle: string;
  bodyClass: string;
  shell: boolean;
  headerMode: "hero" | "default";
  activeNav: string;
  banner: BannerKind;
  /** 额外页面 CSS（相对仓库 css/） */
  pageStyles: string[];
  /** 占位页等由 Vue 处理 banner 时跳过 legacy 内联脚本 */
  skipInlineScripts?: boolean;
}

export const PAGES: PageMeta[] = [
  {
    id: "home",
    nativeVue: true,
    documentTitle: "中通国际 · 首页",
    bodyClass: "page-home",
    shell: true,
    headerMode: "hero",
    activeNav: "home",
    banner: { type: "hero" },
    pageStyles: ["pages/home.css", "pages/mission-scene.css", "components/shared-view-transition.css"],
  },
  {
    id: "online-send",
    nativeVue: true,
    documentTitle: "中通国际 · 寄递服务",
    bodyClass: "ship-page",
    shell: false,
    headerMode: "default",
    activeNav: "shipping",
    banner: { type: "ship" },
    pageStyles: [],
  },
  {
    id: "products",
    nativeVue: true,
    documentTitle: "中通国际 · 物流产品",
    bodyClass: "product-page",
    shell: false,
    headerMode: "default",
    activeNav: "products",
    banner: { type: "page", title: "", subtitle: "" },
    pageStyles: [],
  },
  {
    id: "cross-border",
    nativeVue: true,
    documentTitle: "中通国际 · 跨境业务",
    bodyClass: "cb-page",
    shell: false,
    headerMode: "default",
    activeNav: "products",
    banner: { type: "page", title: "", subtitle: "" },
    pageStyles: [],
  },
  {
    id: "overseas-local",
    nativeVue: true,
    documentTitle: "中通国际 · 海外本土派送",
    bodyClass: "cb-page",
    shell: false,
    headerMode: "default",
    activeNav: "products",
    banner: { type: "page", title: "", subtitle: "" },
    pageStyles: [],
  },
  {
    id: "inner-local",
    nativeVue: true,
    documentTitle: "中通国际 · 中国港澳本土服务",
    bodyClass: "cb-page",
    shell: false,
    headerMode: "default",
    activeNav: "products",
    banner: { type: "page", title: "", subtitle: "" },
    pageStyles: [],
  },
  {
    id: "solution",
    nativeVue: true,
    documentTitle: "中通国际 · 跨境解决方案",
    bodyClass: "cb-page",
    shell: false,
    headerMode: "default",
    activeNav: "products",
    banner: { type: "page", title: "", subtitle: "" },
    pageStyles: [],
  },
  {
    id: "about",
    nativeVue: true,
    documentTitle: "中通国际 · 关于我们",
    bodyClass: "about-page cb-page",
    shell: false,
    headerMode: "default",
    activeNav: "about",
    banner: { type: "none" },
    pageStyles: [],
  },
  {
    id: "enterprise-inquiry",
    nativeVue: true,
    documentTitle: "中通国际 · 企业合作咨询",
    bodyClass: "ship-page subpage-page enterprise-inquiry-page",
    shell: false,
    headerMode: "hero",
    activeNav: "shipping",
    banner: { type: "none" },
    pageStyles: ["components/subpage-frame.css", "pages/enterprise-inquiry.css"],
  },
  {
    id: "news-detail",
    nativeVue: true,
    documentTitle: "中通国际 · 新闻详情",
    bodyClass: "news-page news-detail-page subpage-page enterprise-inquiry-page",
    shell: false,
    headerMode: "hero",
    activeNav: "news",
    banner: { type: "none" },
    pageStyles: ["components/subpage-frame.css", "pages/enterprise-inquiry.css", "pages/news.css"],
  },
  {
    id: "news",
    nativeVue: true,
    documentTitle: "中通国际 · 新闻资讯",
    bodyClass: "news-page cb-page",
    shell: false,
    headerMode: "hero",
    activeNav: "news",
    banner: { type: "none" },
    pageStyles: ["pages/cross-border.css", "pages/news.css"],
  },
  {
    id: "tech-global",
    nativeVue: true,
    documentTitle: "中通国际 · 科技全球",
    bodyClass: "page-tech-global",
    shell: false,
    headerMode: "default",
    activeNav: "tech",
    banner: {
      type: "page",
      variant: "placeholder",
      image: "asset/images/L83A0091-21-1200.jpg",
      title: "中通科技，前沿科技赋能国际业务",
      subtitle: "以科技连接跨境网络，让物流更可视、更可控",
    },
    pageStyles: ["pages/tech-global.css"],
    skipInlineScripts: true,
  },
  {
    id: "placeholder",
    nativeVue: true,
    documentTitle: "中通国际 · 页面建设中",
    bodyClass: "",
    shell: false,
    headerMode: "default",
    activeNav: "tech",
    banner: { type: "placeholder" },
    pageStyles: [],
    skipInlineScripts: true,
  },
  {
    id: "rates",
    nativeVue: true,
    documentTitle: "中通国际 · 运费时效",
    bodyClass: "ship-page",
    shell: false,
    headerMode: "default",
    activeNav: "shipping",
    banner: { type: "none" },
    pageStyles: [],
  },
  {
    id: "nav-framework-demo",
    nativeVue: true,
    documentTitle: "中通国际 · 导航框架演示",
    bodyClass: "demo-nav-framework",
    shell: false,
    headerMode: "default",
    activeNav: "home",
    banner: {
      type: "page",
      image: "asset/images/10-21-1420.jpg",
      title: "导航与 Banner 框架",
      subtitle: "内页统一使用通栏 Banner，文案左对齐，图片覆盖黑色透明蒙层",
    },
    pageStyles: [],
  },
];

export function getPageById(id: string): PageMeta | undefined {
  return PAGES.find((p) => p.id === id);
}
