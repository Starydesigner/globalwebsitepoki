<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { initMissionScrollHero } from "@/composables/home/missionScrollHero";
import { initMissionIntroSplitText } from "@/composables/home/missionIntroSplitText";
import { initMissionTextReveal } from "@/composables/home/missionTextReveal";
import { useSiteLocale } from "@/i18n/useSiteLocale";

defineOptions({ name: "HomeMissionSection" });
const { t } = useSiteLocale();

const sectionRef = ref<HTMLElement | null>(null);
let cleanupScroll: (() => void) | undefined;
let cleanupReveal: (() => void) | undefined;
let cleanupIntroSplit: (() => void) | undefined;
onMounted(() => {
  const el = sectionRef.value;
  if (!el) return;
  cleanupScroll = initMissionScrollHero(el);
  cleanupIntroSplit = initMissionIntroSplitText(el, {
    threshold: 0.22,
    rootMargin: "0px",
  });
  cleanupReveal = initMissionTextReveal(el);
});

onUnmounted(() => {
  cleanupScroll?.();
  cleanupIntroSplit?.();
  cleanupReveal?.();
});
</script>

<template>
  <section ref="sectionRef" class="mission-scene" aria-labelledby="mission-title">
    <div class="mission-scene__track">
      <div class="mission-scene__scene">
        <video
          class="mission-scene__video"
          muted
          playsinline
          preload="auto"
          :aria-label="t('home.mission.videoAria')"
        ></video>
        <div class="mission-scene__video-tint" aria-hidden="true"></div>
        <div class="mission-scene__stern-cta">
          <AppLink class="btn-outline btn-outline--inverse mission-scene__stern-btn" href="/placeholder?nav=about">
            {{ t("home.mission.learnMore") }}
            <span class="btn-outline__icon" aria-hidden="true"></span>
          </AppLink>
        </div>
      </div>

      <div class="mission-scene__content">
        <div class="mission-scene__intro mission-scene__block" data-mission-block>
          <p id="mission-title" class="mission-scene__eyebrow">
            <span>{{ t("home.mission.eyebrow") }}</span>
          </p>
          <h2 class="mission-scene__headline">
            <span class="mission-scene__hl mission-scene__hl--1">{{ t("home.mission.headline1") }}</span>
            <span class="mission-scene__hl mission-scene__hl--2">{{ t("home.mission.headline2") }}</span>
          </h2>
        </div>

        <article
          class="mission-scene__feature mission-scene__feature--left mission-scene__block"
          data-mission-block
        >
          <img
            class="mission-scene__feature-icon"
            src="asset/icons/mission-feature-diverse.png?v=9"
            alt=""
            decoding="async"
          />
          <h3 class="mission-scene__feature-title">
            <span>{{ t("home.mission.feature.diverse.title") }}</span>
          </h3>
          <p class="mission-scene__feature-body">
            <span>{{ t("home.mission.feature.diverse.line1") }}</span>
            <span>{{ t("home.mission.feature.diverse.line2") }}</span>
          </p>
        </article>

        <article
          class="mission-scene__feature mission-scene__feature--right mission-scene__block"
          data-mission-block
        >
          <img
            class="mission-scene__feature-icon"
            src="asset/icons/mission-feature-custom.png"
            alt=""
            decoding="async"
          />
          <h3 class="mission-scene__feature-title">
            <span>{{ t("home.mission.feature.custom.title") }}</span>
          </h3>
          <p class="mission-scene__feature-body">
            <span>{{ t("home.mission.feature.custom.line1") }}</span>
            <span>{{ t("home.mission.feature.custom.line2") }}</span>
          </p>
        </article>

        <article
          class="mission-scene__feature mission-scene__feature--left mission-scene__feature--row2 mission-scene__block"
          data-mission-block
        >
          <img
            class="mission-scene__feature-icon"
            src="asset/icons/mission-feature-convenient.png"
            alt=""
            decoding="async"
          />
          <h3 class="mission-scene__feature-title">
            <span>{{ t("home.mission.feature.convenient.title") }}</span>
          </h3>
          <p class="mission-scene__feature-body">
            <span>{{ t("home.mission.feature.convenient.line1") }}</span>
            <span>{{ t("home.mission.feature.convenient.line2") }}</span>
          </p>
        </article>

        <article
          class="mission-scene__feature mission-scene__feature--right mission-scene__feature--row2 mission-scene__block"
          data-mission-block
        >
          <img
            class="mission-scene__feature-icon"
            src="asset/icons/mission-feature-secure.png"
            alt=""
            decoding="async"
          />
          <h3 class="mission-scene__feature-title">
            <span>{{ t("home.mission.feature.secure.title") }}</span>
          </h3>
          <p class="mission-scene__feature-body">
            <span>{{ t("home.mission.feature.secure.line1") }}</span>
            <span>{{ t("home.mission.feature.secure.line2") }}</span>
          </p>
        </article>
      </div>
    </div>
    <div class="mission-scene__handoff" aria-hidden="true"></div>
  </section>
</template>
