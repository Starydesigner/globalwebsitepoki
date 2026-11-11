import type { SiteMessageKey, SiteUiLang } from "./siteMessages";
import { SITE_MESSAGES } from "./siteMessages";
import { getUiLang } from "./getUiLang";

import { formatShipMsg } from "./shippingMessages";

export function siteMsg(
  key: SiteMessageKey,
  lang: SiteUiLang = getUiLang(),
  vars?: Record<string, string | number>,
): string {
  const raw = SITE_MESSAGES[lang][key] ?? SITE_MESSAGES.zh[key] ?? key;
  return vars ? formatShipMsg(raw, vars) : raw;
}
