import type { SiteUiLang } from "./siteMessages";

const STORAGE_KEY = "zto-global-locale-choice";

/** 供非 Vue 模块（寄递 legacy 脚本）读取当前界面语言 */
export function getUiLang(): SiteUiLang {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === "cn-en") return "en";
  } catch {
    /* ignore */
  }
  return "zh";
}
