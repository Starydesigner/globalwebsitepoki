<script setup lang="ts">
import { computed, ref, watch, type ComponentPublicInstance } from "vue";
import { resolveDomRoot } from "@/lib/resolveDomRoot";
import SiteLayout from "@/components/layout/SiteLayout.vue";
import PageBanner from "@/components/layout/PageBanner.vue";
import HomeHeroBanner from "@/components/layout/HomeHeroBanner.vue";
import type { PageMeta } from "@/config/pages";
import { usePlaceholderBanner } from "@/composables/usePlaceholderBanner";
import { getContentPage, type ContentPageId } from "./contentPages";

const props = defineProps<{
  pageId: ContentPageId;
  meta: PageMeta;
}>();

const pageComponent = computed(() => getContentPage(props.pageId).component);
const bodyHost = ref<HTMLElement | null>(null);

const isPlaceholder = computed(() => props.pageId === "placeholder");
const placeholder = usePlaceholderBanner();

const headerActiveNav = computed(() =>
  isPlaceholder.value ? placeholder.key.value : props.meta.activeNav,
);

watch(
  () => (isPlaceholder.value ? placeholder.documentTitle.value : undefined),
  (title) => {
    if (title) document.title = title;
  },
  { immediate: true },
);

watch(
  () => placeholder?.page.value.title,
  (title) => {
    if (!title || !bodyHost.value) return;
    const el = bodyHost.value.querySelector("[data-placeholder-title]");
    if (el) el.textContent = title;
  },
  { immediate: true },
);

watch(
  () => props.meta,
  (meta) => {
    document.body.className = meta.bodyClass;
    if (!isPlaceholder.value) {
      document.title = meta.documentTitle;
    }
  },
  { immediate: true },
);

function setBodyRef(el: Element | ComponentPublicInstance | null) {
  bodyHost.value = resolveDomRoot(el);
}
</script>

<template>
  <SiteLayout :shell="meta.shell" :header-mode="meta.headerMode" :active-nav="headerActiveNav">
    <template #banner>
      <HomeHeroBanner v-if="meta.banner.type === 'hero'" />
      <PageBanner
        v-else-if="isPlaceholder && meta.banner.type === 'placeholder'"
        variant="placeholder"
        :image="placeholder.page.value.image"
        :title="placeholder.page.value.title"
        :subtitle="placeholder.page.value.subtitle"
      />
      <PageBanner
        v-else-if="meta.banner.type === 'page'"
        :variant="meta.banner.variant ?? 'default'"
        :image="meta.banner.image"
        :title="meta.banner.title"
        :title-highlight="meta.banner.titleHighlight"
        :subtitle="meta.banner.subtitle"
        :photo="meta.banner.photo"
      />
    </template>

    <component :is="pageComponent" :key="pageId" :ref="setBodyRef" class="content-page-body" />
  </SiteLayout>
</template>
