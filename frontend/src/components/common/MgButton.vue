<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { isAppInternalHref, toAppLinkRoute } from "@/utils/appLinkRoute";

const props = withDefaults(
  defineProps<{
    /** 面型 filled / 灰边 outline / 蓝边详情 detail（右箭头） */
    variant?: "filled" | "outline" | "detail";
    size?: "sm" | "lg";
    /** 左侧图标 URL */
    iconSrc?: string;
    /** 右侧图标 URL（详情按钮箭头等） */
    iconTrailingSrc?: string;
    href?: string;
    type?: "button" | "submit" | "reset";
    /** 外链时默认 target=_blank */
    external?: boolean;
    disabled?: boolean;
  }>(),
  {
    variant: "filled",
    size: "lg",
    type: "button",
    external: true,
  },
);

defineEmits<{
  click: [event: MouseEvent];
}>();

defineOptions({ name: "MgButton", inheritAttrs: false });

const isLink = computed(() => Boolean(props.href));

const isInternalLink = computed(() => (props.href ? isAppInternalHref(props.href) : false));

const routerTo = computed(() => (props.href ? toAppLinkRoute(props.href) : "/"));

const linkTarget = computed(() => {
  if (!props.href) return undefined;
  if (props.external === false) return undefined;
  if (props.href.startsWith("http") || props.href.startsWith("//")) return "_blank";
  return undefined;
});

const linkRel = computed(() => (linkTarget.value === "_blank" ? "noopener noreferrer" : undefined));

const btnClass = computed(() => [
  "mg-btn",
  `mg-btn--${props.variant}`,
  props.variant !== "detail" && `mg-btn--${props.size}`,
]);
</script>

<template>
  <RouterLink
    v-if="isLink && isInternalLink"
    v-bind="$attrs"
    :class="btnClass"
    :to="routerTo"
  >
    <img v-if="iconSrc" class="mg-btn__icon" :src="iconSrc" alt="" decoding="async" />
    <slot />
    <img
      v-if="iconTrailingSrc"
      class="mg-btn__icon mg-btn__icon--trailing"
      :src="iconTrailingSrc"
      alt=""
      decoding="async"
    />
  </RouterLink>
  <a
    v-else-if="isLink"
    v-bind="$attrs"
    :class="btnClass"
    :href="href"
    :target="linkTarget"
    :rel="linkRel"
  >
    <img v-if="iconSrc" class="mg-btn__icon" :src="iconSrc" alt="" decoding="async" />
    <slot />
    <img
      v-if="iconTrailingSrc"
      class="mg-btn__icon mg-btn__icon--trailing"
      :src="iconTrailingSrc"
      alt=""
      decoding="async"
    />
  </a>
  <button
    v-else
    v-bind="$attrs"
    :class="btnClass"
    :type="type"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <img v-if="iconSrc" class="mg-btn__icon" :src="iconSrc" alt="" decoding="async" />
    <slot />
    <img
      v-if="iconTrailingSrc"
      class="mg-btn__icon mg-btn__icon--trailing"
      :src="iconTrailingSrc"
      alt=""
      decoding="async"
    />
  </button>
</template>
