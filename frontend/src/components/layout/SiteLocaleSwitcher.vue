<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { SITE_LOCALE_REGIONS } from "@/config/siteLocaleConfig";
import { useSiteLocale } from "@/i18n/useSiteLocale";

const open = ref(false);
const rootRef = ref<HTMLElement | null>(null);
const { activeRegionTitle, t, selectLanguage, isActiveLanguage } = useSiteLocale();

let closeTimer: ReturnType<typeof setTimeout> | undefined;

const openPanel = () => {
  clearTimeout(closeTimer);
  open.value = true;
};

const closePanel = () => {
  open.value = false;
};

const scheduleClose = () => {
  clearTimeout(closeTimer);
  closeTimer = setTimeout(closePanel, 120);
};

const onFocusOut = (event: FocusEvent) => {
  const next = event.relatedTarget;
  if (next instanceof Node && rootRef.value?.contains(next)) return;
  scheduleClose();
};

const onDocumentKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") closePanel();
};

onMounted(() => {
  document.addEventListener("keydown", onDocumentKeydown);
});

onUnmounted(() => {
  clearTimeout(closeTimer);
  document.removeEventListener("keydown", onDocumentKeydown);
});
</script>

<template>
  <div
    ref="rootRef"
    class="site-header__locale-wrap"
    :class="{ 'is-open': open }"
    @mouseenter="openPanel"
    @mouseleave="scheduleClose"
    @focusin="openPanel"
    @focusout="onFocusOut"
  >
    <button
      type="button"
      class="site-header__locale"
      :aria-label="t('locale.aria')"
      :aria-expanded="open"
      aria-haspopup="true"
    >
      <span>{{ activeRegionTitle }}</span>
      <img class="site-header__locale-caret" src="asset/icons/svg_4fa633cb.svg" alt="" decoding="async" />
    </button>

    <div v-show="open" class="site-header__locale-panel" role="dialog" :aria-label="t('locale.panelLabel')">
      <ul class="site-header__locale-list">
        <li v-for="region in SITE_LOCALE_REGIONS" :key="region.id" class="site-header__locale-row">
          <div class="site-header__locale-row-head">
            <div class="site-header__locale-col-titles">
              <span class="site-header__locale-col-title">{{ region.title }}</span>
              <span class="site-header__locale-col-sub">{{ region.subtitle }}</span>
            </div>
          </div>
          <ul class="site-header__locale-langs">
            <li v-for="lang in region.languages" :key="lang.id">
              <button
                type="button"
                class="site-header__locale-lang"
                :class="{ 'is-active': isActiveLanguage(lang) }"
                @click.stop="selectLanguage(lang); closePanel()"
              >
                {{ lang.label }}
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
