<script setup lang="ts">
import MegaDecor from "./MegaDecor.vue";

defineProps<{
  panel: "about" | "news";
  links: { href: string; label: string }[];
}>();

defineOptions({ name: "MegaPanelCompact" });
</script>

<template>
  <div class="mega mega--compact" :data-mega-panel="panel">
    <MegaDecor left-src="asset/icons/svg_fcef0a67.svg" right-src="asset/icons/svg_e5540684.svg" />
    <div class="mega__inner">
      <div class="mega__row">
        <AppLink
          v-for="link in links"
          :key="link.href + link.label"
          class="mega__row-link"
          :href="link.href"
          >{{ link.label }}</AppLink
        >
      </div>
    </div>
  </div>
</template>
