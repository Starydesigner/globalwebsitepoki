<script setup lang="ts">
import AboutCultureShowcase from "@/components/about/AboutCultureShowcase.vue";
import AboutHistoryTimeline from "@/components/about/AboutHistoryTimeline.vue";
import AboutSectionHeading from "@/components/about/AboutSectionHeading.vue";
import { ABOUT_INTRO_PARAGRAPHS } from "../aboutContent";

defineOptions({ name: "AboutUsPanel" });
</script>

<template>
  <div id="panel-about-us" data-pl-panel="about-us" role="tabpanel" aria-labelledby="tab-about-us">
    <section class="about-section" aria-labelledby="about-intro-title">
      <AboutSectionHeading title="中通国际简介" meta-label="Brief Introduction" />
      <div class="about-prose">
        <p v-for="(paragraph, index) in ABOUT_INTRO_PARAGRAPHS" :key="index">{{ paragraph }}</p>
      </div>
    </section>

    <section class="about-section about-section--culture" aria-labelledby="about-culture-title">
      <div class="about-culture-module">
        <AboutSectionHeading title="企业文化" meta-label="Corporate Culture" />
        <AboutCultureShowcase />
      </div>
    </section>

    <section class="about-section about-section--history" aria-labelledby="about-history-title">
      <div class="about-history-band">
        <AboutHistoryTimeline />
      </div>
    </section>
  </div>
</template>
