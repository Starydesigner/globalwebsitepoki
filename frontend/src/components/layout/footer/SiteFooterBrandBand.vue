<script setup lang="ts">
defineOptions({ name: "SiteFooterBrandBand" });
</script>

<template>
  <div class="site-footer__brand">
    <div class="container">
      <AppLink class="site-footer__mark" href="/" aria-label="中通国际首页">
        <span class="site-footer__mark-scale">
          <span class="site-footer__mark-row">
            <img class="site-footer__mark-zto" src="asset/footer/animate/zto.png" alt="" width="167" height="54" />
            <span class="site-footer__mark-reel">
              <span class="site-footer__mark-track">
                <img v-for="n in 20" :key="n" :src="`asset/footer/animate/${n}.png`" alt="" width="298" height="55" />
                <img src="asset/footer/animate/1.png" alt="" width="298" height="55" />
              </span>
            </span>
          </span>
          <img
            class="site-footer__mark-world"
            src="asset/footer/animate/world.png"
            alt="世界无界"
            width="224"
            height="26"
          />
        </span>
      </AppLink>
    </div>
  </div>
</template>
