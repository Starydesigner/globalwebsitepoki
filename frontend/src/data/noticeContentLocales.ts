import type { SiteUiLang } from "@/i18n/siteMessages";
import {
  NOTICE_EXPORT_LIST,
  NOTICE_FORBIDDEN_ICONS,
  NOTICE_IMPORT_LIST,
  type NoticeForbiddenIcon,
} from "./noticeContent";

const FORBIDDEN_TITLES_EN = [
  "Weapons and ammunition",
  "Explosives",
  "Prohibited import/export items",
  "Hazardous chemicals",
  "Drugs and narcotics",
  "Wildlife products",
  "Other prohibited items",
  "Biological and biochemical agents",
  "Counterfeit and infringing goods",
];

const IMPORT_LIST_EN: string[] = [
  "Rare and endangered species and their products.",
  "Drugs and narcotic chemicals.",
  "Cane sugar and other molasses.",
  "Asbestos and carcinogenic products.",
  "Pesticides that pollute the environment or harm plants and animals.",
  "Mercury-containing products harmful to the environment.",
  "Used electromechanical equipment.",
  "Waste with no recycling value.",
  "Cultural relics.",
  "Animals and products from epidemic areas, meat-and-bone meal, and related biological products.",
  "Right-hand-drive vehicles imported by any trade or donation mode.",
  "Firearms and replicas.",
  "Refrigeration compressors using CFCs.",
  "Radioactively contaminated scrap metal.",
  'Goods bearing the word "DARKIE" or other text/graphics that denigrate Black people.',
  "Used gunny bags.",
  "Potassium chlorate and ammonium nitrate.",
  "Audiovisual works prohibited from import under national rules.",
  'Goods marked with WWII Japanese Zero fighters or Nazi German fighter markings.',
  "Other goods prohibited by customs.",
];

const EXPORT_LIST_EN: string[] = [
  "Rare and endangered species and their products.",
  "Cow bezoar, musk, ephedra, and fa cai (nostoc).",
  "Drugs and narcotic chemicals.",
  "Logs and charcoal.",
  "Unwrought or powdered platinum and platinum plates.",
  "Asbestos and carcinogenic products.",
  "Drugs and narcotic chemicals.",
  "Pesticides that pollute the environment or harm plants and animals.",
  "Mercury-containing products harmful to the environment.",
  "Cultural relics and other relics prohibited from export.",
  "Commercial export of wild taxus and related products.",
  "Reform-through-labor products.",
  "Refrigeration compressors using CFCs.",
  "Domestically produced trichosanthes root (including extracts).",
  "Pearl shells such as white, penguin, and white butterfly varieties.",
  "Goods marked with WWII Japanese Zero fighters or Nazi German fighter markings.",
  "Source plasma.",
  "Audiovisual works prohibited from export under national rules.",
  'Goods bearing the word "DARKIE" or other text/graphics that denigrate Black people.',
];

export function getNoticeForbiddenIcons(lang: SiteUiLang): NoticeForbiddenIcon[] {
  if (lang === "zh") return NOTICE_FORBIDDEN_ICONS;
  return NOTICE_FORBIDDEN_ICONS.map((item, i) => ({
    src: item.src,
    title: FORBIDDEN_TITLES_EN[i] ?? item.title,
  }));
}

export function getNoticeImportList(lang: SiteUiLang): string[] {
  return lang === "en" ? IMPORT_LIST_EN : NOTICE_IMPORT_LIST;
}

export function getNoticeExportList(lang: SiteUiLang): string[] {
  return lang === "en" ? EXPORT_LIST_EN : NOTICE_EXPORT_LIST;
}
