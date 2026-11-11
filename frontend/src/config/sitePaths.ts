/** 站内路由 path（SPA history 模式） */

/** 站外官方链接（新窗口打开） */
export const EXTERNAL_LINKS = {
  investorRelations: "https://www.zto.com/investor/company",
  /** 集团 ESG / 社会责任报告下载页 */
  esgReports: "https://www.zto.com/introduce/sustainable/esgReport",
  /**
   * 测试站与现网关于我们页 PDF 资源路径一致；若生产 CDN 变更，只需改此 origin。
   */
  aboutFilesOrigin: "https://test-zto-intl-official-web-cn-dme.test.ztosys.com",
} as const;

export function aboutCsrReportUrl(fileName: string) {
  const base = `${EXTERNAL_LINKS.aboutFilesOrigin}/files/cn/社会责任报告`;
  return `${base}/${encodeURIComponent(fileName)}`;
}

export const SITE = {
  home: "/",
  onlineSend: "/online-send",
  rates: "/rates",
  products: "/products",
  crossBorder: "/cross-border",
  innerLocal: "/inner-local",
  overseasLocal: "/overseas-local",
  solution: "/solution",
  enterpriseInquiry: "/enterprise-inquiry",
  about: "/about",
  techGlobal: "/tech-global",
  news: "/news",
  placeholder: "/placeholder",
  navFrameworkDemo: "/nav-framework-demo",
} as const;

export function onlineSendHash(fragment: string) {
  const id = fragment.replace(/^#/, "");
  return `${SITE.onlineSend}#${id}`;
}

export function crossBorderHash(fragment: string) {
  const id = fragment.replace(/^#/, "");
  return `${SITE.crossBorder}#${id}`;
}

export function innerLocalHash(fragment: string) {
  const id = fragment.replace(/^#/, "");
  return `${SITE.innerLocal}#${id}`;
}

export function overseasLocalHash(fragment: string) {
  const id = fragment.replace(/^#/, "");
  return `${SITE.overseasLocal}#${id}`;
}

export function productsHash(fragment: string) {
  const id = fragment.replace(/^#/, "");
  return `${SITE.products}#${id}`;
}

export function aboutHash(fragment: string) {
  const id = fragment.replace(/^#/, "");
  return `${SITE.about}#${id}`;
}

export function newsHash(fragment: string) {
  const id = fragment.replace(/^#/, "");
  return `${SITE.news}#${id}`;
}

/** 新闻详情（可带 return 供返回按钮使用） */
export function newsArticlePath(articleId: string, returnTo?: string) {
  const base = `${SITE.news}/${encodeURIComponent(articleId)}`;
  if (!returnTo) return base;
  return `${base}?return=${encodeURIComponent(returnTo)}`;
}

export function placeholderQuery(nav: string) {
  return `${SITE.placeholder}?nav=${encodeURIComponent(nav)}`;
}

export function enterpriseInquiryReturn(returnPath: string) {
  return `${SITE.enterpriseInquiry}?return=${encodeURIComponent(returnPath)}`;
}

/** 旧 *.html 路径 → 新路由（用于 redirect） */
export const LEGACY_HTML_REDIRECTS: Record<string, string> = {
  "/index.html": SITE.home,
  "/products.html": SITE.products,
  "/online-send.html": SITE.onlineSend,
  "/cross-border.html": SITE.crossBorder,
  "/inner-local.html": SITE.innerLocal,
  "/overseas-local.html": SITE.overseasLocal,
  "/solution.html": SITE.solution,
  "/enterprise-inquiry.html": SITE.enterpriseInquiry,
  "/placeholder.html": SITE.placeholder,
  "/tech-global.html": SITE.techGlobal,
  "/rates.html": SITE.rates,
  "/nav-framework-demo.html": SITE.navFrameworkDemo,
};
