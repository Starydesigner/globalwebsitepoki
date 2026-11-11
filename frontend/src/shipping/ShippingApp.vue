<script setup lang="ts">
import SiteLayout from "@/components/layout/SiteLayout.vue";
import ShipServiceBanner from "@/components/shipping/ShipServiceBanner.vue";
import ShipSideNav from "@/components/shipping/ShipSideNav.vue";
import { useShipHub } from "@/composables/useShipHub";
import { SHIP_PAGE_BANNER_IMAGE } from "@/shipping/shipHubConfig";
import { useSiteLocale } from "@/i18n/useSiteLocale";
import { computed } from "vue";
import { useShippingDomEnhancements } from "@/composables/useShippingPanelScripts";
import { SHIP_PANEL_COMPONENTS, SHIP_PANEL_KEYS } from "@/shipping/shipPanels";
import type { ShipViewKey } from "@/shipping/shipNavConfig";

const props = withDefaults(
  defineProps<{
    /** 路由 /rates 等独立 path 时的默认面板 */
    initialView?: ShipViewKey;
  }>(),
  {},
);

const initialRaw = props.initialView ?? undefined;
const { activeView, navigate } = useShipHub(initialRaw);
const { t } = useSiteLocale();

const shipBanner = computed(() => ({
  image: SHIP_PAGE_BANNER_IMAGE,
  title: t("ship.banner.line1"),
  titleLine2: t("ship.banner.line2"),
  highlight: t("ship.banner.highlight"),
  subtitle: t("ship.banner.subtitle"),
}));

useShippingDomEnhancements();

</script>

<template>
  <SiteLayout header-mode="default" active-nav="shipping">
    <template #banner>
      <ShipServiceBanner :banner="shipBanner" />
    </template>

    <main class="ship-layout">
      <ShipSideNav :active-view="activeView" @select="(v) => navigate(v)" />
      <div class="ship-main">
        <component
          :is="SHIP_PANEL_COMPONENTS[key]"
          v-for="key in SHIP_PANEL_KEYS"
          :key="key"
          :visible="activeView === key"
        />
      </div>
    </main>
  </SiteLayout>
</template>
