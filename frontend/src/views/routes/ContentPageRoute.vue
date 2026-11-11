<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import ContentPageApp from "@/content/ContentPageApp.vue";
import { getPageById } from "@/config/pages";
import type { ContentPageId } from "@/content/contentPages";

const route = useRoute();
const pageId = computed(() => route.meta.pageId as ContentPageId);
const meta = computed(() => getPageById(pageId.value)!);
</script>

<template>
  <ContentPageApp v-if="meta" :key="route.fullPath" :page-id="pageId" :meta="meta" />
</template>
