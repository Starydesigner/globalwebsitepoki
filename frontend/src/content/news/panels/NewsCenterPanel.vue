<script setup lang="ts">
import MgButton from "@/components/common/MgButton.vue";
import { useNewsCenterList } from "@/composables/useNewsCenterList";
import { newsArticlePath, newsHash } from "@/config/sitePaths";
import { assetUrl } from "@/utils/assetUrl";

defineOptions({ name: "NewsCenterPanel" });

const { visibleArticles, canLoadMore, loadMore } = useNewsCenterList();
</script>

<template>
  <div
    id="panel-news-center"
    data-pl-panel="news-center"
    role="tabpanel"
    aria-labelledby="tab-news-center"
    class="news-center-panel"
  >
    <ul class="news-center-list">
      <li v-for="item in visibleArticles" :key="item.id" class="news-center-list__item">
        <article class="news-center-card">
          <div class="news-center-card__date" aria-label="发布日期">
            <span class="news-center-card__day">{{ item.dateParts.day }}</span>
            <span class="news-center-card__month-year">
              <span>{{ item.dateParts.monthLabel }}</span>
              <span class="news-center-card__slash">/</span>
              <span>{{ item.dateParts.year }}</span>
            </span>
          </div>
          <span class="news-center-card__divider" aria-hidden="true" />

          <div class="news-center-card__thumb">
            <img
              :src="assetUrl(item.image)"
              alt=""
              width="320"
              height="180"
              loading="lazy"
              referrerpolicy="no-referrer"
            />
          </div>

          <div class="news-center-card__body">
            <div class="news-center-card__copy">
              <h3 class="news-center-card__title">{{ item.title }}</h3>
              <p v-if="item.brief" class="news-center-card__brief">{{ item.brief }}</p>
            </div>
            <MgButton
              class="news-center-card__read-btn"
              variant="outline"
              size="sm"
              :href="newsArticlePath(item.id, newsHash('news-center'))"
              :external="false"
            >
              阅读全文
            </MgButton>
          </div>
        </article>
      </li>
    </ul>

    <div v-if="canLoadMore" class="news-center-more">
      <button type="button" class="news-center-more__btn" @click="loadMore">查看更多</button>
    </div>
  </div>
</template>
