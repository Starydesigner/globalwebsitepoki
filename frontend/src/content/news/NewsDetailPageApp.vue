<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import SiteLayout from "@/components/layout/SiteLayout.vue";
import SubpageFrame from "@/components/layout/SubpageFrame.vue";
import { formatNewsArticleDate, getNewsArticleById, localizeNewsArticle } from "@/data/newsArticles";
import { useSiteLocale } from "@/i18n/useSiteLocale";
import { newsHash } from "@/config/sitePaths";
import { assetUrl } from "@/utils/assetUrl";

const route = useRoute();
const { t, uiLang } = useSiteLocale();

const articleId = computed(() => String(route.params.id ?? ""));
const article = computed(() => {
  const raw = getNewsArticleById(articleId.value);
  return raw ? localizeNewsArticle(raw, uiLang.value) : undefined;
});
const contentHost = ref<HTMLElement | null>(null);

watch(
  article,
  (item) => {
    document.title = item ? `${t("page.brand")} · ${item.title}` : t("news.detail.notFound");
  },
  { immediate: true },
);

function enhanceContentImages(root: HTMLElement | null) {
  if (!root) return;
  root.querySelectorAll("img").forEach((img) => {
    img.referrerPolicy = "no-referrer";
    const raw = img.getAttribute("src");
    if (raw && !/^https?:\/\//i.test(raw)) {
      img.src = assetUrl(raw);
    }
  });
}

watch(article, () => nextTick(() => enhanceContentImages(contentHost.value)));

onMounted(() => {
  enhanceContentImages(contentHost.value);
});
</script>

<template>
  <SiteLayout header-mode="hero" active-nav="news">
    <SubpageFrame :title="t('news.detail.title')" :fallback-href="newsHash('news-center')" max-width="lg">
      <div v-if="article" class="ship-card news-detail__card">
        <header class="news-detail__header">
          <h2 class="news-detail__title">{{ article.title }}</h2>
          <time class="news-detail__time" :datetime="article.publishedAt">
            {{ formatNewsArticleDate(article.publishedAt, uiLang) }}
          </time>
        </header>
        <figure v-if="article.image" class="news-detail__cover">
          <img
            :src="assetUrl(article.image)"
            alt=""
            loading="lazy"
            referrerpolicy="no-referrer"
          />
        </figure>
        <div ref="contentHost" class="news-detail__content" v-html="article.contentHtml" />
      </div>
      <div v-else class="ship-card news-detail__card news-detail__card--empty">
        <p>{{ t("news.detail.missing") }}</p>
      </div>
    </SubpageFrame>
  </SiteLayout>
</template>

<style src="@repo/css/pages/enterprise-inquiry.css"></style>
<style src="@repo/css/pages/news.css"></style>
