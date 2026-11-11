<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  title: string;
  titleLine2?: string;
  highlight?: string;
  /** 寄递/占位 Banner 等需要 data-banner-title */
  dataBannerTitle?: boolean;
}>();

function splitHighlight(text: string, highlight?: string) {
  if (!highlight || !text.includes(highlight)) {
    return { kind: "plain" as const, text };
  }
  const index = text.indexOf(highlight);
  return {
    kind: "split" as const,
    before: text.slice(0, index),
    highlight,
    after: text.slice(index + highlight.length),
  };
}

const firstLine = computed(() => splitHighlight(props.title, props.titleLine2 ? undefined : props.highlight));

const secondLine = computed(() =>
  props.titleLine2 ? splitHighlight(props.titleLine2, props.highlight) : null,
);
</script>

<template>
  <h1 :data-banner-title="dataBannerTitle ? true : undefined">
    <template v-if="secondLine">
      <span class="page-banner__title-line">{{ title }}</span>
      <br />
      <span class="page-banner__title-line">
        <template v-if="secondLine.kind === 'plain'">{{ secondLine.text }}</template>
        <template v-else>
          {{ secondLine.before }}<span class="banner-title__accent">{{ secondLine.highlight }}</span
          >{{ secondLine.after }}
        </template>
      </span>
    </template>
    <template v-else-if="firstLine.kind === 'plain'">{{ firstLine.text }}</template>
    <template v-else>
      {{ firstLine.before }}<span class="banner-title__accent">{{ firstLine.highlight }}</span
      >{{ firstLine.after }}
    </template>
  </h1>
</template>
