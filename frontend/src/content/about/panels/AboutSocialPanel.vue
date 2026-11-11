<script setup lang="ts">
import AboutSectionHeading from "@/components/about/AboutSectionHeading.vue";
import MgButton from "@/components/common/MgButton.vue";
import AboutSocialCarousel from "../AboutSocialCarousel.vue";
import AboutSocialReportCover from "../AboutSocialReportCover.vue";
import { aboutCsrReportUrl } from "@/config/sitePaths";
import { ABOUT_SOCIAL_REPORTS, ABOUT_SOCIAL_SECTIONS } from "../aboutContent";
import { assetUrl } from "@/utils/assetUrl";

defineOptions({ name: "AboutSocialPanel" });

const reportFallbackIcon = assetUrl("asset/about/social/baogao@2x.png");
</script>

<template>
  <div id="panel-social" data-pl-panel="social" role="tabpanel" aria-labelledby="tab-social">
    <section
      v-for="section in ABOUT_SOCIAL_SECTIONS"
      :key="section.title"
      class="about-section about-social-section"
    >
      <AboutSectionHeading :title="section.title" :meta-label="section.metaLabel" />
      <AboutSocialCarousel :stories="section.stories" />
    </section>

    <section class="about-section about-social-section about-social-section--reports" aria-labelledby="about-social-reports">
      <AboutSectionHeading title="相关文件" meta-label="RELATED DOCUMENTS" />
      <ul class="about-social-reports">
        <li v-for="report in ABOUT_SOCIAL_REPORTS" :key="report.fileName">
          <AboutSocialReportCover
            :pdf-url="aboutCsrReportUrl(report.fileName)"
            :alt="report.label"
            :fallback-src="reportFallbackIcon"
          />
          <div class="about-social-reports__body">
            <p class="about-social-reports__org">中通快递集团</p>
            <p class="about-social-reports__name">{{ report.label }}</p>
            <MgButton
              class="about-social-reports__btn"
              variant="outline"
              size="sm"
              :href="aboutCsrReportUrl(report.fileName)"
            >
              立即下载
            </MgButton>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>
