/** 与 ztoglobal.com 顶栏地区/语言一致 */
export const ZTO_GLOBAL_ORIGIN = "https://www.ztoglobal.com";

export type SiteLocaleChoiceId = "cn-zh" | "cn-en" | "hk-zh" | "kh-zh" | "kh-en" | "kh-km" | "la-zh";

export interface SiteLocaleLanguageOption {
  id: SiteLocaleChoiceId;
  label: string;
  /** 站内切换（中国大陆中英文） */
  inApp?: boolean;
  /** 跳转国际官网 hash */
  officialHash?: string;
  htmlLang: string;
}

export interface SiteLocaleRegion {
  id: string;
  title: string;
  subtitle: string;
  flagSrc: string;
  languages: SiteLocaleLanguageOption[];
}

export const SITE_LOCALE_REGIONS: SiteLocaleRegion[] = [
  {
    id: "cn",
    title: "中国大陆",
    subtitle: "Chinese Mainland",
    flagSrc: "asset/icons/svg_561ed45e.svg",
    languages: [
      { id: "cn-zh", label: "中文", inApp: true, htmlLang: "zh-CN" },
      {
        id: "cn-en",
        label: "English",
        inApp: true,
        htmlLang: "en",
      },
    ],
  },
  {
    id: "hk",
    title: "中国香港",
    subtitle: "HongKong",
    flagSrc: "asset/icons/svg_561ed45e.svg",
    languages: [
      {
        id: "hk-zh",
        label: "繁体",
        officialHash: "#/zh/hk/home",
        htmlLang: "zh-HK",
      },
    ],
  },
  {
    id: "kh",
    title: "柬埔寨",
    subtitle: "Cambodia",
    flagSrc: "asset/icons/svg_561ed45e.svg",
    languages: [
      { id: "kh-zh", label: "中文", officialHash: "#/zh/kh/home", htmlLang: "zh-CN" },
      { id: "kh-en", label: "English", officialHash: "#/en/kh/home", htmlLang: "en" },
      { id: "kh-km", label: "Cambodia", officialHash: "#/km/kh/home", htmlLang: "km" },
    ],
  },
  {
    id: "la",
    title: "老挝",
    subtitle: "Laos",
    flagSrc: "asset/icons/svg_561ed45e.svg",
    languages: [
      { id: "la-zh", label: "中文", officialHash: "#/zh/la/home", htmlLang: "zh-CN" },
    ],
  },
];

export function findLocaleChoice(id: SiteLocaleChoiceId): SiteLocaleLanguageOption | undefined {
  for (const region of SITE_LOCALE_REGIONS) {
    const found = region.languages.find((lang) => lang.id === id);
    if (found) return found;
  }
  return undefined;
}

export function regionForChoice(id: SiteLocaleChoiceId): SiteLocaleRegion | undefined {
  return SITE_LOCALE_REGIONS.find((region) => region.languages.some((lang) => lang.id === id));
}
