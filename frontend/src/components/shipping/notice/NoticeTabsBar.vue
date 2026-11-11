<script setup lang="ts">
import { useSiteLocale } from "@/i18n/useSiteLocale";

defineOptions({ name: "NoticeTabsBar" });
const { t } = useSiteLocale();
</script>

<template>
  <div class="notice-tabs">
    <div class="notice-tabs__list" role="tablist" :aria-label="t('ship.notice.aria')">
      <button
        class="notice-tabs__btn is-active"
        type="button"
        role="tab"
        id="notice-tab-forbidden"
        data-notice-tab="forbidden"
        aria-selected="true"
        aria-controls="notice-panel-forbidden"
      >
        {{ t("ship.notice.tab.forbidden") }}
      </button>
      <button
        class="notice-tabs__btn"
        type="button"
        role="tab"
        id="notice-tab-tariff"
        data-notice-tab="tariff"
        aria-selected="false"
        aria-controls="notice-panel-tariff"
        tabindex="-1"
      >
        {{ t("ship.notice.tab.tariff") }}
      </button>
    </div>
  </div>
</template>
