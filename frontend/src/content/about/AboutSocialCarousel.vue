<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import AppLink from "@/components/common/AppLink.vue";
import { aboutHash, newsArticlePath } from "@/config/sitePaths";
import { getNewsArticleById } from "@/data/newsArticles";
import type { AboutSocialStory } from "./aboutContent";
import { assetUrl } from "@/utils/assetUrl";

function resolveStoryRegionMarker(title: string): string | undefined {
  if (title.includes("越南")) return "越南中通";
  if (title.includes("柬埔寨")) return "柬埔寨中通";
  if (title.includes("老挝")) return "老挝中通";
  return undefined;
}

/** 正文里的测试站内网图在公网/GitHub Pages 无法加载 */
function isUsableRemoteImage(url: string): boolean {
  if (!/^https?:\/\//i.test(url)) return false;
  try {
    const host = new URL(url).hostname;
    if (host === "fs.test.ztosys.com" || host === "fs.test.zto.com") return false;
  } catch {
    return false;
  }
  return true;
}

/** 合辑稿中按「越南中通 / 柬埔寨中通 …」段落取首图（如援助灾区 66 号稿） */
function firstImageAfterMarker(html: string, marker: string): string | undefined {
  const idx = html.indexOf(marker);
  if (idx < 0) return undefined;
  const match = html.slice(idx).match(/<img[^>]+src="([^"]+)"/i);
  const src = match?.[1];
  return src && isUsableRemoteImage(src) ? src : undefined;
}

function storyImageSrc(story: AboutSocialStory): string {
  if (story.coverImage) {
    if (/^https?:\/\//i.test(story.coverImage)) {
      if (isUsableRemoteImage(story.coverImage)) return story.coverImage;
    } else {
      return assetUrl(story.coverImage);
    }
  }

  const marker = resolveStoryRegionMarker(story.title);
  const article = getNewsArticleById(story.newsArticleId);

  if (article) {
    if (marker) {
      const sectionImg = firstImageAfterMarker(article.contentHtml, marker);
      if (sectionImg) return sectionImg;
    }
    if (marker && !/^https?:\/\//i.test(story.image)) {
      return assetUrl(story.image);
    }
    const listCover = article.image;
    if (listCover && isUsableRemoteImage(listCover)) {
      return listCover;
    }
  }

  if (story.image && isUsableRemoteImage(story.image)) {
    return story.image;
  }
  return assetUrl(story.image);
}

const props = defineProps<{
  stories: AboutSocialStory[];
}>();

const CAROUSEL_GAP = 20;

const viewportRef = ref<HTMLElement | null>(null);
const index = ref(0);
const visibleCount = ref(2);
const slideStepPx = ref(0);

const returnTo = aboutHash("social");

const maxIndex = computed(() => Math.max(0, props.stories.length - visibleCount.value));

const canPrev = computed(() => index.value > 0);
const canNext = computed(() => index.value < maxIndex.value);

const trackStyle = computed(() => ({
  transform: slideStepPx.value
    ? `translateX(${-index.value * slideStepPx.value}px)`
    : undefined,
  transition: "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
}));

function measure() {
  const viewport = viewportRef.value;
  if (!viewport) return;
  visibleCount.value = window.innerWidth <= 640 ? 1 : 2;
  const cards = viewport.querySelectorAll<HTMLElement>(".about-social-carousel__item");
  if (!cards.length) return;
  const cardWidth = cards[0]!.offsetWidth;
  slideStepPx.value = cardWidth + CAROUSEL_GAP;
  if (index.value > maxIndex.value) {
    index.value = maxIndex.value;
  }
}

function goPrev() {
  if (!canPrev.value) return;
  index.value -= 1;
}

function goNext() {
  if (!canNext.value) return;
  index.value += 1;
}

let resizeObserver: ResizeObserver | undefined;

onMounted(() => {
  measure();
  window.addEventListener("resize", measure, { passive: true });
  if (viewportRef.value && typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(() => measure());
    resizeObserver.observe(viewportRef.value);
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", measure);
  resizeObserver?.disconnect();
});
</script>

<template>
  <div
    class="about-social-carousel"
    :class="{ 'about-social-carousel--single': stories.length === 1 }"
  >
    <div ref="viewportRef" class="about-social-carousel__viewport">
      <ul
        class="about-social-carousel__track"
        :style="trackStyle"
        :aria-label="`共 ${stories.length} 条案例`"
      >
        <li
          v-for="story in stories"
          :key="`${story.newsArticleId}-${story.title}`"
          class="about-social-carousel__item"
        >
          <AppLink
            class="about-social-card about-social-card--link"
            :href="newsArticlePath(story.newsArticleId, returnTo)"
            :external="false"
          >
            <div class="about-social-card__media">
              <img
                :src="storyImageSrc(story)"
                :alt="story.title"
                loading="lazy"
                decoding="async"
              />
            </div>
            <p class="about-social-card__text">{{ story.title }}</p>
          </AppLink>
        </li>
      </ul>
    </div>

    <div
      v-if="stories.length > visibleCount"
      class="about-social-carousel__nav"
      role="group"
      aria-label="案例切换"
    >
      <button
        type="button"
        class="about-social-carousel__nav-btn"
        :disabled="!canPrev"
        aria-label="上一条"
        @click="goPrev"
      >
        <span aria-hidden="true">‹</span>
      </button>
      <button
        type="button"
        class="about-social-carousel__nav-btn"
        :disabled="!canNext"
        aria-label="下一条"
        @click="goNext"
      >
        <span aria-hidden="true">›</span>
      </button>
    </div>
  </div>
</template>
