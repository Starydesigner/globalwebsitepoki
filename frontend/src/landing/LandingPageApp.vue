<script setup lang="ts">
import { onBeforeMount, onMounted } from "vue";
import SiteLayout from "@/components/layout/SiteLayout.vue";
import PageBanner from "@/components/layout/PageBanner.vue";
import { getLandingPage } from "./landingPages";
import type { LandingPageId } from "./types";

const props = defineProps<{
  pageId: LandingPageId;
}>();

const config = getLandingPage(props.pageId);

onBeforeMount(() => {
  document.body.className = config.bodyClass;
});

onMounted(() => {
  document.title = config.documentTitle;
});
</script>

<template>
  <SiteLayout header-mode="default" :active-nav="config.activeNav">
    <template #banner>
      <PageBanner
        v-if="config.banner.type === 'page'"
        :variant="config.banner.variant ?? 'default'"
        :image="config.banner.image"
        :title="config.banner.title"
        :title-highlight="config.banner.titleHighlight"
        :subtitle="config.banner.subtitle"
        :photo="config.banner.photo"
      />
    </template>
    <component :is="config.bodyComponent" class="landing-page-body" />
  </SiteLayout>
</template>
