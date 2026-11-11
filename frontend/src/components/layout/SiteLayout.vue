<script setup lang="ts">
import SiteHeader from "./SiteHeader.vue";
import SiteFooter from "./SiteFooter.vue";
import type { SiteHeaderMode } from "@/composables/useSiteHeader";

withDefaults(
  defineProps<{
    shell?: boolean;
    headerMode?: SiteHeaderMode;
    activeNav?: string;
    mainId?: string;
  }>(),
  {
    shell: false,
    headerMode: "default",
    activeNav: "home",
    mainId: "main",
  },
);
</script>

<template>
  <div v-if="shell" class="page-shell">
    <SiteHeader :mode="headerMode" :active-nav="activeNav" />
    <main :id="mainId">
      <slot name="banner" />
      <slot />
    </main>
    <SiteFooter />
  </div>
  <template v-else>
    <SiteHeader :mode="headerMode" :active-nav="activeNav" />
    <slot name="banner" />
    <slot />
    <SiteFooter />
  </template>
</template>
