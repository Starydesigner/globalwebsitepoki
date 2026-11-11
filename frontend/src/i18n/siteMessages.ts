import { HOME_MESSAGES, type HomeMessageKey } from "./homeMessages";
import { LAYOUT_MESSAGES, type LayoutMessageKey } from "./layoutMessages";
import { PAGE_MESSAGES, type PageMessageKey } from "./pageMessages";
import { SHIPPING_MESSAGES, type ShippingMessageKey } from "./shippingMessages";

export type SiteMessageKey =
  | HomeMessageKey
  | ShippingMessageKey
  | LayoutMessageKey
  | PageMessageKey
  | "nav.home"
  | "nav.shipping"
  | "nav.products"
  | "nav.tech"
  | "nav.investor"
  | "nav.about"
  | "nav.news"
  | "header.login"
  | "locale.aria"
  | "locale.panelLabel";

const navZh = {
  "nav.home": "首页",
  "nav.shipping": "寄递服务",
  "nav.products": "物流产品",
  "nav.tech": "科技全球",
  "nav.investor": "投资者关系",
  "nav.about": "关于我们",
  "nav.news": "新闻资讯",
  "header.login": "登录｜注册",
  "locale.aria": "切换地区与语言",
  "locale.panelLabel": "选择站点语言",
} satisfies Record<
  | "nav.home"
  | "nav.shipping"
  | "nav.products"
  | "nav.tech"
  | "nav.investor"
  | "nav.about"
  | "nav.news"
  | "header.login"
  | "locale.aria"
  | "locale.panelLabel",
  string
>;

const navEn = {
  "nav.home": "Home",
  "nav.shipping": "Shipping",
  "nav.products": "Products",
  "nav.tech": "Technology",
  "nav.investor": "Investors",
  "nav.about": "About Us",
  "nav.news": "News",
  "header.login": "Log in | Sign up",
  "locale.aria": "Change region and language",
  "locale.panelLabel": "Region & language",
} satisfies typeof navZh;

const zh: Record<SiteMessageKey, string> = {
  ...HOME_MESSAGES.zh,
  ...SHIPPING_MESSAGES.zh,
  ...LAYOUT_MESSAGES.zh,
  ...PAGE_MESSAGES.zh,
  ...navZh,
};

const en: Record<SiteMessageKey, string> = {
  ...HOME_MESSAGES.en,
  ...SHIPPING_MESSAGES.en,
  ...LAYOUT_MESSAGES.en,
  ...PAGE_MESSAGES.en,
  ...navEn,
};

export const SITE_MESSAGES = { zh, en } as const;

export type SiteUiLang = keyof typeof SITE_MESSAGES;
