<script setup lang="ts">
import { onMounted, onUnmounted, watch } from "vue";
import { RouterView, useRoute } from "vue-router";
import FloatTools from "@/components/layout/FloatTools.vue";
import { initFieldClear } from "@/composables/fieldClear";
import { provideSiteLocale } from "@/i18n/useSiteLocale";
import { useSiteRouteTitle } from "@/composables/useSiteRouteTitle";

defineOptions({ name: "AppRoot" });

const siteLocale = provideSiteLocale();
useSiteRouteTitle(siteLocale);

const route = useRoute();

const scheduleFieldClear = () => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => initFieldClear());
  });
};

onMounted(() => {
  document.addEventListener("ship-panel-change", scheduleFieldClear);
});

onUnmounted(() => {
  document.removeEventListener("ship-panel-change", scheduleFieldClear);
});

watch(() => route.fullPath, scheduleFieldClear, { flush: "post", immediate: true });
</script>

<template>
  <RouterView />
  <FloatTools />
</template>
