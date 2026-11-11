<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { isAppInternalHref, toAppLinkRoute } from "@/utils/appLinkRoute";

const props = defineProps<{
  href: string;
}>();

defineOptions({ inheritAttrs: false });

const isInternal = computed(() => isAppInternalHref(props.href));
const routerTo = computed(() => toAppLinkRoute(props.href));
</script>

<template>
  <RouterLink v-if="isInternal" v-bind="$attrs" :to="routerTo">
    <slot />
  </RouterLink>
  <a v-else v-bind="$attrs" :href="href">
    <slot />
  </a>
</template>
