<script setup lang="ts">
import { ref } from "vue";
import AboutSectionHeading from "@/components/about/AboutSectionHeading.vue";
import joinContent from "../aboutJoin.generated.json";

defineOptions({ name: "AboutJoinPanel" });

type JoinMode = "info" | "join";

const mode = ref<JoinMode>("info");

const jobs = joinContent.jobs as Array<{
  title: string;
  meta: string[];
  sections: Array<{ heading: string; lines: string[] }>;
}>;

const franchise = joinContent.franchise as {
  title: string;
  meta: string[];
  sections: Array<{ heading: string; lines: string[] }>;
};

const franchiseBanners = joinContent.franchiseBanners as Array<{ title: string }>;
</script>

<template>
  <div id="panel-join" data-pl-panel="join" role="tabpanel" aria-labelledby="tab-join">
    <section class="about-section about-join-section" aria-labelledby="about-join-title">
      <AboutSectionHeading title="加入我们" meta-label="JOIN US" />

      <div class="about-join-tabs" role="tablist" aria-label="招聘与加盟">
        <button
          type="button"
          role="tab"
          class="about-join-tabs__btn"
          :class="{ 'is-active': mode === 'info' }"
          :aria-selected="mode === 'info'"
          @click="mode = 'info'"
        >
          招聘信息
        </button>
        <button
          type="button"
          role="tab"
          class="about-join-tabs__btn"
          :class="{ 'is-active': mode === 'join' }"
          :aria-selected="mode === 'join'"
          @click="mode = 'join'"
        >
          加盟合作
        </button>
      </div>

      <div v-show="mode === 'info'" class="about-join-stack" role="tabpanel">
        <article v-for="job in jobs" :key="job.title" class="about-job-card">
          <header class="about-job-card__head">
            <h3>{{ job.title }}</h3>
            <ul v-if="job.meta.length" class="about-job-card__meta">
              <li v-for="(line, index) in job.meta" :key="`${job.title}-meta-${index}`">{{ line }}</li>
            </ul>
          </header>
          <div v-for="block in job.sections" :key="block.heading" class="about-job-card__block">
            <h4>{{ block.heading }}</h4>
            <ul>
              <li v-for="(line, index) in block.lines" :key="`${block.heading}-${index}`">{{ line }}</li>
            </ul>
          </div>
          <p class="about-job-card__mail">
            简历投递：<a href="mailto:ztohrzp@zto.com">ztohrzp@zto.com</a>
          </p>
        </article>
      </div>

      <div v-show="mode === 'join'" class="about-join-stack" role="tabpanel">
        <article class="about-job-card about-franchise-card">
          <header class="about-job-card__head">
            <h3>{{ franchise.title }}</h3>
          </header>
          <div v-for="block in franchise.sections" :key="block.heading" class="about-job-card__block">
            <h4>{{ block.heading }}</h4>
            <ul>
              <li v-for="(line, index) in block.lines" :key="`${block.heading}-${index}`">{{ line }}</li>
            </ul>
          </div>
        </article>
        <div class="about-franchise-banners">
          <div v-for="banner in franchiseBanners" :key="banner.title" class="about-franchise-banner">
            <p>{{ banner.title }}</p>
            <span>欢迎通过当地中通官网或 95311 咨询加盟详情。</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
