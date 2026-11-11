<script setup lang="ts">
import ProductSectionHeader from "@/components/products/ProductSectionHeader.vue";
import TechGlobalSystemsSection from "./TechGlobalSystemsSection.vue";

defineOptions({ name: "TechGlobal" });

const INTRO_TEXT =
  "中通拥有强大的科技力量，现有研发团队超千人，秉承“互联网+物流”的理念，自主研发出覆盖业务全场景、全链路的众多智能系统，为中通国际全球业务提供技术支持。";
</script>

<template>
  <main id="main" class="tech-global">
    <section class="tech-global__hub" aria-labelledby="tech-intro-title">
      <div class="container tech-global__hub-inner">
        <div class="tech-global__hub-block">
          <ProductSectionHeader
            heading-id="tech-intro-title"
            title="中通科技"
            meta-label="Brief Introduction"
          />
          <div class="tech-global__intro-card">
            <p class="tech-global__intro-card-text">{{ INTRO_TEXT }}</p>
          </div>
        </div>

        <TechGlobalSystemsSection />
      </div>
    </section>
  </main>
</template>

<style src="@repo/css/pages/tech-global.css"></style>
