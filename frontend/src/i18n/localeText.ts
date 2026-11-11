import type { SiteUiLang } from "./siteMessages";

/** 中英成对文案 */
export type Bilingual<T extends string = string> = { zh: T; en: T };

export function pickBilingual<T extends string>(value: Bilingual<T>, lang: SiteUiLang): T {
  return lang === "en" ? value.en : value.zh;
}

export function pickBilingualField(
  zh: string,
  en: string | undefined,
  lang: SiteUiLang,
): string {
  if (lang === "en" && en) return en;
  return zh;
}
