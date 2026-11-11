<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import LandingPageApp from "@/landing/LandingPageApp.vue";
import ProductLandingApp from "@/landing/ProductLandingApp.vue";
import type { LandingPageId } from "@/landing/types";

const route = useRoute();
const pageId = computed(() => route.meta.pageId as LandingPageId);

const useProductLanding = computed(
  () => pageId.value === "inner-local" || pageId.value === "overseas-local",
);
</script>

<template>
  <!-- pageId 变化时必须 remount（港澳 ↔ 海外共用 ProductLandingApp） -->
  <ProductLandingApp v-if="useProductLanding" :key="pageId" :page-id="pageId" />
  <LandingPageApp v-else :key="pageId" :page-id="pageId" />
</template>
