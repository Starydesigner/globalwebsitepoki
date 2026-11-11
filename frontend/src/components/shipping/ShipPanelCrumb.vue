<script setup lang="ts">
import { computed } from "vue";
import { shipPanelCrumbFor } from "@/shipping/shipPanelCrumb";
import type { ShipViewKey } from "@/shipping/shipNavConfig";
import { useSiteLocale } from "@/i18n/useSiteLocale";

const { uiLang } = useSiteLocale();

const props = defineProps<{
  /** 侧栏二级页 id，与 SHIP_NAV_ITEMS 同步 */
  view?: ShipViewKey;
  parent?: string;
  current?: string;
}>();

const labels = computed(() => {
  void uiLang.value;
  if (props.parent && props.current) {
    return { parent: props.parent, current: props.current };
  }
  if (props.view) {
    return shipPanelCrumbFor(props.view);
  }
  return null;
});
</script>

<template>
  <header v-if="labels" class="ship-panel-crumb-card">
    <nav class="ship-panel-crumb" aria-label="当前位置">
      <span class="ship-panel-crumb__parent">{{ labels.parent }}</span>
      <img
        class="ship-panel-crumb__sep"
        src="asset/shipping/chevron.svg"
        alt=""
        width="16"
        height="16"
        decoding="async"
      />
      <span class="ship-panel-crumb__current" aria-current="page">{{ labels.current }}</span>
    </nav>
  </header>
</template>
