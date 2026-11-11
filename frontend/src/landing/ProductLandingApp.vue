<script setup lang="ts">
import { onMounted, provide, ref } from "vue";
import { PRODUCT_LANDING_TAB_KEY } from "./productLandingTab";
import SiteLayout from "@/components/layout/SiteLayout.vue";
import PageBanner from "@/components/layout/PageBanner.vue";
import CbPrimaryTabs from "@/components/tabs/CbPrimaryTabs.vue";
import { useProductLandingTabs } from "@/composables/useProductLandingTabs";
import { getLandingPage } from "./landingPages";
import { PRODUCT_LANDING_ROUTES } from "./productLandingMeta";
import type { LandingPageId } from "./types";

const props = defineProps<{
  pageId: Extract<LandingPageId, "inner-local" | "overseas-local">;
}>();

const page = getLandingPage(props.pageId);
const route = PRODUCT_LANDING_ROUTES[props.pageId];
const contentRef = ref<HTMLElement | null>(null);
const { tab, onPrimaryChange } = useProductLandingTabs(route, contentRef);
provide(PRODUCT_LANDING_TAB_KEY, tab);

onMounted(() => {
  if (!page) return;
  document.body.className = page.bodyClass;
  document.title = page.documentTitle;
});
</script>

<template>
  <SiteLayout v-if="page" header-mode="default" :active-nav="page.activeNav">
    <template #banner>
      <PageBanner
        v-if="page.banner.type === 'page'"
        :variant="page.banner.variant ?? 'default'"
        :image="page.banner.image"
        :title="page.banner.title"
        :subtitle="page.banner.subtitle"
      />
    </template>

    <CbPrimaryTabs
      :model-value="tab"
      :items="route.primaryTabs"
      :ariaLabel="route.ariaLabel"
      @update:model-value="onPrimaryChange"
    />

    <main
      ref="contentRef"
      :class="pageId === 'overseas-local' ? 'cb-wrap overseas-local' : 'cb-wrap'"
    >
      <component :is="page.bodyComponent" />
    </main>
  </SiteLayout>
</template>
