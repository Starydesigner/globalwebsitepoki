<script setup lang="ts">
import { onMounted, ref } from "vue";
import SiteLayout from "@/components/layout/SiteLayout.vue";
import PageBanner from "@/components/layout/PageBanner.vue";
import CbPrimaryTabs from "@/components/tabs/CbPrimaryTabs.vue";
import CbPillTabs from "@/components/tabs/CbPillTabs.vue";
import {
  CB_EXPORT_PRODUCTS,
  CB_IMPORT_PRODUCTS,
  CB_PRIMARY_TABS,
} from "@/components/cross-border/crossBorderTabMeta";
import { useCrossBorderTabs } from "@/composables/useCrossBorderTabs";
import CrossBorderBody from "@/landing/cross-border/CrossBorderBody.vue";
import { PRODUCT_LANDING_PAGE_BANNER } from "@/landing/productLandingBanner";

const contentRef = ref<HTMLElement | null>(null);
const {
  tab,
  exportProduct,
  importProduct,
  onPrimaryChange,
  onExportProductChange,
  onImportProductChange,
} = useCrossBorderTabs(contentRef);

onMounted(() => {
  document.body.className = "cb-page";
  document.title = "中通国际 · 跨境业务";
});
</script>

<template>
  <SiteLayout header-mode="default" active-nav="products">
    <template #banner>
      <PageBanner
        :image="PRODUCT_LANDING_PAGE_BANNER.image"
        :title="PRODUCT_LANDING_PAGE_BANNER.title"
        :subtitle="PRODUCT_LANDING_PAGE_BANNER.subtitle"
      />
    </template>

    <CbPrimaryTabs
      :model-value="tab"
      :items="CB_PRIMARY_TABS"
      ariaLabel="跨境业务"
      @update:model-value="onPrimaryChange"
    />

    <main ref="contentRef" class="cb-wrap">
      <CbPillTabs
        v-if="tab === 'export'"
        :model-value="exportProduct"
        :items="CB_EXPORT_PRODUCTS"
        ariaLabel="出口产品"
        @update:model-value="onExportProductChange"
      />
      <CbPillTabs
        v-if="tab === 'import'"
        :model-value="importProduct"
        :items="CB_IMPORT_PRODUCTS"
        ariaLabel="进口产品"
        @update:model-value="onImportProductChange"
      />
      <CrossBorderBody />
    </main>
  </SiteLayout>
</template>
