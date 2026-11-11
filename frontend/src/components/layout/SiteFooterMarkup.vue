<script setup lang="ts">
import SiteFooterBrandBand from "./footer/SiteFooterBrandBand.vue";
import SiteFooterLegalBar from "./footer/SiteFooterLegalBar.vue";
import SiteFooterMainPanel from "./footer/SiteFooterMainPanel.vue";
import { assetUrl } from "@/utils/assetUrl";

defineOptions({ name: "SiteFooterMarkup" });

const footerPanelVideoSrc = assetUrl("asset/footer/footer-panel-bg.mp4");
</script>

<template>
  <footer class="site-footer" data-node-id="20:9977">
    <SiteFooterBrandBand />
    <div class="site-footer__panel">
      <video
        class="site-footer__panel-bg"
        :src="footerPanelVideoSrc"
        autoplay
        muted
        loop
        playsinline
        preload="auto"
        aria-hidden="true"
      />
      <SiteFooterMainPanel />
      <div class="site-footer__split" />
      <SiteFooterLegalBar />
    </div>
  </footer>
</template>
