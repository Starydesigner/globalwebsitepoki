<script setup lang="ts">
import { computed } from "vue";
import AppLink from "@/components/common/AppLink.vue";
import {
  formatNewsArticleDate,
  localizeNewsArticle,
  NEWS_ARTICLES,
} from "@/data/newsArticles";
import { newsArticlePath } from "@/config/sitePaths";
import { useSiteLocale } from "@/i18n/useSiteLocale";

defineOptions({ name: "HomeNewsSection" });
const { t, uiLang } = useSiteLocale();

const sortedArticles = computed(() =>
  [...NEWS_ARTICLES].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
);

const featureArticle = computed(() => {
  const raw = sortedArticles.value[0];
  return raw ? localizeNewsArticle(raw, uiLang.value) : null;
});

function homeNewsDateParts(isoDate: string) {
  const [y, m, d] = isoDate.split("-").map(Number);
  return {
    day: String(d).padStart(2, "0"),
    monthYear: `${y}.${String(m).padStart(2, "0")}`,
  };
}

const listArticles = computed(() =>
  sortedArticles.value.slice(1, 7).map((raw) => {
    const article = localizeNewsArticle(raw, uiLang.value);
    return {
      article,
      dateParts: homeNewsDateParts(raw.publishedAt),
      href: newsArticlePath(raw.id),
    };
  }),
);

const featureDateLabel = computed(() => {
  if (!featureArticle.value) return "";
  return `${t("news.category.corporate")} · ${formatNewsArticleDate(featureArticle.value.publishedAt, uiLang.value)}`;
});
</script>

<template>
<section class="section-block section-news" aria-labelledby="news-title">
          <div class="container">
            <div class="section-heading">
              <div>
                <h2 id="news-title" class="section-heading__title">{{ t("home.news.title") }}</h2>
                <div class="section-heading__meta">
                  <img src="asset/icons/svg_1adbd74b.svg" alt="" />
                  <span>{{ t("home.news.meta") }}</span>
                </div>
              </div>
              <AppLink class="btn-outline" href="/news">
                {{ t("home.learnMore") }}
                <span class="btn-outline__icon" aria-hidden="true"></span>
              </AppLink>
            </div>
            <div v-if="featureArticle" class="news-layout">
              <article class="news-feature">
                <AppLink class="news-feature__cover" :href="newsArticlePath(featureArticle.id)">
                  <img
                    :src="featureArticle.image"
                    alt=""
                    width="672"
                    height="414"
                    loading="lazy"
                    referrerpolicy="no-referrer"
                  />
                </AppLink>
                <div class="news-feature__body">
                  <p class="news-feature__meta">{{ featureDateLabel }}</p>
                  <h3 class="news-feature__title">
                    <AppLink class="news-feature__title-link" :href="newsArticlePath(featureArticle.id)">
                      {{ featureArticle.title }}
                    </AppLink>
                  </h3>
                  <p v-if="featureArticle.brief" class="news-feature__excerpt">
                    {{ featureArticle.brief }}
                  </p>
                </div>
              </article>
              <div class="news-list">
                <article v-for="item in listArticles" :key="item.article.id" class="news-item">
                  <div class="news-item__date">
                    <span class="news-item__day">{{ item.dateParts.day }}</span>
                    <span class="news-item__month">{{ item.dateParts.monthYear }}</span>
                  </div>
                  <div class="news-item__content">
                    <h4 class="news-item__title">
                      <AppLink class="news-item__title-link" :href="item.href">
                        {{ item.article.title }}
                      </AppLink>
                    </h4>
                    <p v-if="item.article.brief" class="news-item__summary">{{ item.article.brief }}</p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
</template>
