<script setup lang="ts">
import { ref } from "vue";
import SiteLayout from "@/components/layout/SiteLayout.vue";
import PageBanner from "@/components/layout/PageBanner.vue";
import CbPrimaryTabs from "@/components/tabs/CbPrimaryTabs.vue";
import { useProductLandingTabs } from "@/composables/useProductLandingTabs";
import { NEWS_BANNER, NEWS_ROUTE_CONFIG } from "./newsMeta";
import NewsCenterPanel from "./panels/NewsCenterPanel.vue";
import CorporateVideoPanel from "./panels/CorporateVideoPanel.vue";

const contentRef = ref<HTMLElement | null>(null);
const { tab, onPrimaryChange } = useProductLandingTabs(NEWS_ROUTE_CONFIG, contentRef);
</script>

<template>
  <SiteLayout header-mode="hero" active-nav="news">
    <template #banner>
      <PageBanner
        :image="NEWS_BANNER.image"
        :title="NEWS_BANNER.title"
        :subtitle="NEWS_BANNER.subtitle"
      />
    </template>

    <CbPrimaryTabs
      :model-value="tab"
      :items="NEWS_ROUTE_CONFIG.primaryTabs"
      :aria-label="NEWS_ROUTE_CONFIG.ariaLabel"
      @update:model-value="onPrimaryChange"
    />

    <main ref="contentRef" class="cb-wrap news-wrap">
      <NewsCenterPanel />
      <CorporateVideoPanel />
    </main>
  </SiteLayout>
</template>

<style src="@repo/css/pages/cross-border.css"></style>
<style src="@repo/css/pages/news.css"></style>
