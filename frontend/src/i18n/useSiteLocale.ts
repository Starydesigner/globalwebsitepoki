import { computed, inject, provide, ref, watch, type InjectionKey, type Ref } from "vue";
import {
  findLocaleChoice,
  regionForChoice,
  ZTO_GLOBAL_ORIGIN,
  type SiteLocaleChoiceId,
  type SiteLocaleLanguageOption,
} from "@/config/siteLocaleConfig";
import { pickBilingual, type Bilingual } from "./localeText";
import { formatShipMsg } from "./shippingMessages";
import { SITE_MESSAGES, type SiteMessageKey, type SiteUiLang } from "./siteMessages";

const STORAGE_KEY = "zto-global-locale-choice";

const SiteLocaleKey: InjectionKey<Ref<SiteLocaleChoiceId>> = Symbol("siteLocale");

function readStoredChoice(): SiteLocaleChoiceId {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === "cn-en" || raw === "cn-zh") return raw;
  } catch {
    /* ignore */
  }
  return "cn-zh";
}

function applyDocumentLocale(choice: SiteLocaleLanguageOption | undefined) {
  if (!choice) return;
  document.documentElement.lang = choice.htmlLang;
  document.documentElement.dataset.locale = choice.id;
}

function emitLocaleChange(lang: SiteUiLang) {
  window.dispatchEvent(new CustomEvent("site-locale-change", { detail: { lang } }));
}

export type ProvideSiteLocaleResult = ReturnType<typeof provideSiteLocale>;

export function provideSiteLocale() {
  const choiceId = ref<SiteLocaleChoiceId>(readStoredChoice());

  const apply = (id: SiteLocaleChoiceId) => {
    choiceId.value = id;
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* ignore */
    }
    applyDocumentLocale(findLocaleChoice(id));
    emitLocaleChange(id === "cn-en" ? "en" : "zh");
  };

  watch(
    choiceId,
    (id) => {
      applyDocumentLocale(findLocaleChoice(id));
      emitLocaleChange(id === "cn-en" ? "en" : "zh");
    },
    { immediate: true },
  );

  provide(SiteLocaleKey, choiceId);

  const uiLang = computed<SiteUiLang>(() => (choiceId.value === "cn-en" ? "en" : "zh"));

  const activeRegion = computed(() => regionForChoice(choiceId.value));

  const activeRegionTitle = computed(() => activeRegion.value?.title ?? "中国大陆");

  const t = (key: SiteMessageKey, vars?: Record<string, string | number>) => {
    const raw = SITE_MESSAGES[uiLang.value][key] ?? SITE_MESSAGES.zh[key] ?? key;
    return vars ? formatShipMsg(raw, vars) : raw;
  };

  const pick = <T extends string>(value: Bilingual<T>) => pickBilingual(value, uiLang.value);

  const selectLanguage = (option: SiteLocaleLanguageOption) => {
    if (option.officialHash) {
      const hash = option.officialHash.startsWith("#") ? option.officialHash : `#/${option.officialHash}`;
      window.location.href = `${ZTO_GLOBAL_ORIGIN}${hash}`;
      return;
    }
    if (option.inApp) {
      apply(option.id);
    }
  };

  return { choiceId, uiLang, activeRegionTitle, t, pick, selectLanguage };
}

export function useSiteLocale() {
  const choiceId = inject(SiteLocaleKey);
  if (!choiceId) {
    throw new Error("useSiteLocale requires provideSiteLocale()");
  }

  const uiLang = computed<SiteUiLang>(() => (choiceId.value === "cn-en" ? "en" : "zh"));
  const activeRegion = computed(() => regionForChoice(choiceId.value));
  const activeRegionTitle = computed(() => activeRegion.value?.title ?? "中国大陆");

  const t = (key: SiteMessageKey, vars?: Record<string, string | number>) => {
    const raw = SITE_MESSAGES[uiLang.value][key] ?? SITE_MESSAGES.zh[key] ?? key;
    return vars ? formatShipMsg(raw, vars) : raw;
  };

  const pick = <T extends string>(value: Bilingual<T>) => pickBilingual(value, uiLang.value);

  const selectLanguage = (option: SiteLocaleLanguageOption) => {
    if (option.officialHash) {
      const hash = option.officialHash.startsWith("#") ? option.officialHash : `#/${option.officialHash}`;
      window.location.href = `${ZTO_GLOBAL_ORIGIN}${hash}`;
      return;
    }
    if (option.inApp) {
      choiceId.value = option.id;
      try {
        localStorage.setItem(STORAGE_KEY, option.id);
      } catch {
        /* ignore */
      }
      applyDocumentLocale(option);
      emitLocaleChange(option.id === "cn-en" ? "en" : "zh");
    }
  };

  const isActiveLanguage = (option: SiteLocaleLanguageOption) => option.id === choiceId.value;

  return { choiceId, uiLang, activeRegionTitle, t, pick, selectLanguage, isActiveLanguage };
}
