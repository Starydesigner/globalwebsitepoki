<script setup lang="ts">
import BannerTitle from "@/components/layout/BannerTitle.vue";
import type { ShipBannerConfig } from "@/shipping/shipHubConfig";

defineProps<{
  banner: ShipBannerConfig;
}>();
</script>

<template>
  <section class="page-banner" data-ship-banner>
    <img data-banner-image :src="banner.image" alt="" />
    <div class="page-banner__veil" aria-hidden="true" />
    <div class="container page-banner__copy">
      <p class="page-banner__sub" data-banner-subtitle>{{ banner.subtitle }}</p>
      <BannerTitle
        :title="banner.title"
        :title-line2="banner.titleLine2"
        :highlight="banner.highlight"
        data-banner-title
      />
    </div>
  </section>
</template>
