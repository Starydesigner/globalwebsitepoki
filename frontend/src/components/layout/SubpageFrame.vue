<script setup lang="ts">
import ContentBackLink from "@/components/common/ContentBackLink.vue";

withDefaults(
  defineProps<{
    title: string;
    fallbackHref: string;
    /** 内容区最大宽度 */
    maxWidth?: "md" | "lg";
  }>(),
  {
    maxWidth: "md",
  },
);

defineOptions({ name: "SubpageFrame" });
</script>

<template>
  <div class="subpage-shell">
    <div class="subpage-nav-bleed" aria-hidden="true" />
    <main id="main" class="subpage">
      <div class="subpage__wrap" :class="`subpage__wrap--${maxWidth}`">
        <header class="subpage__head">
          <ContentBackLink
            class="subpage__back enterprise-inquiry__back"
            :fallback-href="fallbackHref"
          />
          <h1 class="subpage__title">{{ title }}</h1>
        </header>
        <div class="subpage__body">
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>

<style src="@repo/css/components/subpage-frame.css"></style>
