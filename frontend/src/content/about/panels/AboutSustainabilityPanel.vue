<script setup lang="ts">
import MgButton from "@/components/common/MgButton.vue";
import { EXTERNAL_LINKS } from "@/config/sitePaths";
import { ABOUT_SUSTAINABILITY_INTRO, ABOUT_SUSTAINABILITY_ITEMS } from "../aboutContent";
import { sustainIconMarkup } from "../sustainIconRaw";
import { assetUrl } from "@/utils/assetUrl";

defineOptions({ name: "AboutSustainabilityPanel" });
</script>

<template>
  <div
    id="panel-sustainability"
    data-pl-panel="sustainability"
    role="tabpanel"
    aria-labelledby="tab-sustainability"
  >
    <section class="about-section" aria-label="可持续发展">
      <p class="about-sustain-lead">{{ ABOUT_SUSTAINABILITY_INTRO }}</p>
      <ul class="about-sustain-grid">
        <li
          v-for="item in ABOUT_SUSTAINABILITY_ITEMS"
          :key="item.title"
          class="about-sustain-card"
          :style="{ '--sustain-hover-bg': `url(${assetUrl(item.hoverImage)})` }"
        >
          <div class="about-sustain-card__surface">
            <div
              class="about-sustain-card__icon"
              aria-hidden="true"
              v-html="sustainIconMarkup(item.icon)"
            />
            <h3 class="about-sustain-card__title">{{ item.title }}</h3>
            <hr class="about-sustain-card__rule" aria-hidden="true" />
            <p
              class="about-sustain-card__metric"
              :aria-label="`${item.metricValue}${item.metricUnit ?? ''}`"
            >
              <span class="about-sustain-card__metric-value">{{ item.metricValue }}</span>
              <span v-if="item.metricUnit" class="about-sustain-card__metric-unit">{{
                item.metricUnit
              }}</span>
            </p>
            <p class="about-sustain-card__metric-label">{{ item.metricLabel }}</p>
            <ul v-if="item.detailLines.length" class="about-sustain-card__details">
              <li v-for="(line, index) in item.detailLines" :key="index">{{ line }}</li>
            </ul>
          </div>
        </li>
      </ul>
      <div class="about-sustain-more">
        <MgButton variant="outline" size="lg" :href="EXTERNAL_LINKS.investorRelations">
          了解更多
        </MgButton>
      </div>
    </section>
  </div>
</template>
