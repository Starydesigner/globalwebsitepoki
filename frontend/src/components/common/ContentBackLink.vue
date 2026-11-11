<script setup lang="ts">
import { ref, type ComponentPublicInstance } from "vue";
import AppLink from "@/components/common/AppLink.vue";
import { useContentBackLink } from "@/composables/useContentBackLink";
import { resolveDomRoot } from "@/lib/resolveDomRoot";

const props = defineProps<{
  fallbackHref: string;
}>();

defineOptions({ name: "ContentBackLink", inheritAttrs: false });

const anchorRef = ref<HTMLElement | null>(null);

useContentBackLink(anchorRef, props.fallbackHref);

function setLinkRef(el: Element | ComponentPublicInstance | null) {
  anchorRef.value = resolveDomRoot(el);
}
</script>

<template>
  <AppLink
    :ref="setLinkRef"
    class="content-back-link"
    :href="fallbackHref"
    v-bind="$attrs"
  >
    <span class="content-back-link__icon enterprise-inquiry__back-icon" aria-hidden="true" />
    返回
  </AppLink>
</template>
