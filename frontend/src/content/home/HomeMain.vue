<script setup lang="ts">
import HomeMissionSection from "@/components/home/HomeMissionSection.vue";
import HomeNewsSection from "@/components/home/HomeNewsSection.vue";
import HomeProductsSection from "@/components/home/HomeProductsSection.vue";
import { useHomePageEffects } from "@/composables/home/useHomePageEffects";

defineOptions({ name: "HomeMain" });
useHomePageEffects();
</script>

<template>
  <HomeProductsSection />
  <HomeMissionSection />
  <HomeNewsSection />
</template>
