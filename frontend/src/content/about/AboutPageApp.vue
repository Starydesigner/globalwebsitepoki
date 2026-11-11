<script setup lang="ts">
import { onMounted, ref } from "vue";
import SiteLayout from "@/components/layout/SiteLayout.vue";
import PageBanner from "@/components/layout/PageBanner.vue";
import CbPrimaryTabs from "@/components/tabs/CbPrimaryTabs.vue";
import { useProductLandingTabs } from "@/composables/useProductLandingTabs";
import { ABOUT_BANNER, ABOUT_ROUTE_CONFIG } from "./aboutMeta";
import AboutUsPanel from "./panels/AboutUsPanel.vue";
import AboutSustainabilityPanel from "./panels/AboutSustainabilityPanel.vue";
import AboutSocialPanel from "./panels/AboutSocialPanel.vue";
import AboutJoinPanel from "./panels/AboutJoinPanel.vue";

const contentRef = ref<HTMLElement | null>(null);
const { tab, onPrimaryChange } = useProductLandingTabs(ABOUT_ROUTE_CONFIG, contentRef);

onMounted(() => {
  document.body.className = "about-page cb-page";
  document.title = "中通国际 · 关于我们";
});
</script>

<template>
  <SiteLayout header-mode="default" active-nav="about">
    <template #banner>
      <PageBanner
        :image="ABOUT_BANNER.image"
        :title="ABOUT_BANNER.title"
        :subtitle="ABOUT_BANNER.subtitle"
      />
    </template>

    <CbPrimaryTabs
      :model-value="tab"
      :items="ABOUT_ROUTE_CONFIG.primaryTabs"
      :aria-label="ABOUT_ROUTE_CONFIG.ariaLabel"
      @update:model-value="onPrimaryChange"
    />

    <main ref="contentRef" class="cb-wrap about-wrap">
      <AboutUsPanel />
      <AboutSustainabilityPanel />
      <AboutSocialPanel />
      <AboutJoinPanel />
    </main>
  </SiteLayout>
</template>

<style src="@repo/css/pages/cross-border.css"></style>
<style src="@repo/css/pages/about.css"></style>
