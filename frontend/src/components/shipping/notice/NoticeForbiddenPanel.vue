<script setup lang="ts">
import { computed } from "vue";
import {
  getNoticeExportList,
  getNoticeForbiddenIcons,
  getNoticeImportList,
} from "@/data/noticeContentLocales";
import { useSiteLocale } from "@/i18n/useSiteLocale";

defineOptions({ name: "NoticeForbiddenPanel" });
const { t, uiLang } = useSiteLocale();

const icons = computed(() => getNoticeForbiddenIcons(uiLang.value));
const importList = computed(() => getNoticeImportList(uiLang.value));
const exportList = computed(() => getNoticeExportList(uiLang.value));
</script>

<template>
  <div
    class="notice-panel"
    id="notice-panel-forbidden"
    data-notice-panel="forbidden"
    role="tabpanel"
    aria-labelledby="notice-tab-forbidden"
  >
    <ul class="notice-forbid">
      <li v-for="(item, index) in icons" :key="index" class="notice-forbid__item">
        <img :src="item.src" alt="" width="72" height="72" decoding="async" />
        <p class="notice-forbid__title">
          <template v-if="item.title.includes('\n')">
            {{ item.title.split("\n")[0] }}<br />{{ item.title.split("\n")[1] }}
          </template>
          <template v-else>{{ item.title }}</template>
        </p>
      </li>
    </ul>
    <div class="notice-lists">
      <section class="notice-list-block">
        <h3 class="notice-list-block__title">{{ t("ship.notice.forbidden.importTitle") }}</h3>
        <ol class="notice-list-block__items">
          <li v-for="(text, index) in importList" :key="'import-' + index">{{ index + 1 }}. {{ text }}</li>
        </ol>
      </section>
      <section class="notice-list-block">
        <h3 class="notice-list-block__title">{{ t("ship.notice.forbidden.exportTitle") }}</h3>
        <ol class="notice-list-block__items">
          <li v-for="(text, index) in exportList" :key="'export-' + index">{{ index + 1 }}. {{ text }}</li>
        </ol>
      </section>
    </div>
  </div>
</template>
