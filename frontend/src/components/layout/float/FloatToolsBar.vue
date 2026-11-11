<script setup lang="ts">
import { useSiteLocale } from "@/i18n/useSiteLocale";

defineOptions({ name: "FloatToolsBar" });
const { t } = useSiteLocale();
</script>

<template>
  <aside class="float-tools" :aria-label="t('layout.float.aria')">
    <div class="float-tools__panel">
      <button class="float-tools__item" type="button" data-nav-theme-open>
        <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <rect x="4.5" y="6.5" width="19" height="15" rx="3" stroke="currentColor" stroke-width="1.6" />
          <path d="M4.5 12h19" stroke="currentColor" stroke-width="1.6" />
        </svg>
        {{ t("layout.float.theme") }}
      </button>
      <span class="float-tools__divider" aria-hidden="true" />
      <a class="float-tools__item" href="#">
        <img src="asset/icons/svg_fbb7da61.svg" alt="" />
        {{ t("layout.float.service") }}
      </a>
      <span class="float-tools__divider" aria-hidden="true" />
      <a class="float-tools__item" href="#">
        <img src="asset/icons/svg_c586ba4d.svg" alt="" />
        {{ t("layout.float.jobs") }}
      </a>
    </div>
    <button
      class="float-tools__top"
      type="button"
      data-back-top
      aria-hidden="true"
      tabindex="-1"
      :aria-label="t('layout.float.backTop')"
    >
      <img src="asset/icons/svg_90b9afaf.svg" alt="" />
    </button>
  </aside>
</template>
