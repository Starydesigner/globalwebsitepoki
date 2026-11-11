import { watch } from "vue";
import { useRoute } from "vue-router";
import { ROUTE_PAGE_TITLE } from "@/i18n/pageMessages";
import type { PageMessageKey } from "@/i18n/pageMessages";
import { SITE_MESSAGES } from "@/i18n/siteMessages";
import { useSiteLocale, type ProvideSiteLocaleResult } from "@/i18n/useSiteLocale";

/** 根据路由 meta.pageId 同步 document.title */
export function useSiteRouteTitle(locale?: ProvideSiteLocaleResult) {
  const route = useRoute();
  const { uiLang } = locale ?? useSiteLocale();

  watch(
    [() => route.meta.pageId, uiLang],
    () => {
      const pageId = String(route.meta.pageId ?? "");
      const key = ROUTE_PAGE_TITLE[pageId] as PageMessageKey | undefined;
      const lang = uiLang.value;
      if (key) {
        document.title = SITE_MESSAGES[lang][key] ?? SITE_MESSAGES.zh[key];
        return;
      }
      if (route.path.startsWith("/news/")) return;
      document.title = SITE_MESSAGES[lang]["page.brand"];
    },
    { immediate: true },
  );
}
