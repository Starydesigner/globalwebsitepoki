<script setup lang="ts">
import AboutSectionHeading from "@/components/about/AboutSectionHeading.vue";

defineProps<{
  panelId: string;
  tabId: string;
  tabKey: string;
  title: string;
  metaLabel: string;
  lead: string;
}>();
</script>

<template>
  <div
    :id="panelId"
    :data-pl-panel="tabKey"
    class="about-panel"
    role="tabpanel"
    :aria-labelledby="tabId"
  >
    <section class="about-section">
      <AboutSectionHeading :title="title" :meta-label="metaLabel" />
      <p class="about-stub">{{ lead }}</p>
      <p class="about-stub">
        <AppLink href="/" style="color: var(--mg-blue-60)">返回首页</AppLink>
      </p>
    </section>
  </div>
</template>
