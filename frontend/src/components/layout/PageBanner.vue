<script setup lang="ts">
import { computed } from "vue";
import BannerTitle from "./BannerTitle.vue";
import { assetUrl } from "@/utils/assetUrl";

export type PageBannerVariant = "default" | "cross-enter" | "ship" | "placeholder";

const props = withDefaults(
  defineProps<{
    variant?: PageBannerVariant;
    image?: string;
    title?: string;
    /** 标题中需要 `<span>` 高亮的单字（如寄递 Banner「购」） */
    titleHighlight?: string;
    subtitle?: string;
    photo?: string;
    globeSrc?: string;
  }>(),
  {
    variant: "default",
    image: "asset/images/10-21-1420.jpg",
    title: "",
    subtitle: "",
    photo: "asset/images/send/consolidate.jpg",
    globeSrc: "asset/images/product-cross-globe.png",
  },
);

const rootAttrs = computed(() => {
  if (props.variant === "ship") {
    return { "data-ship-banner": true };
  }
  if (props.variant === "placeholder") {
    return { "data-page-banner": true };
  }
  return {};
});

const sectionClass = computed(() => {
  const base = ["page-banner"];
  if (props.variant === "cross-enter") base.push("page-banner--cross-enter");
  return base;
});

const useDataBannerTitle = computed(
  () => props.variant === "ship" || props.variant === "placeholder",
);

const resolvedImage = computed(() => assetUrl(props.image));
const resolvedPhoto = computed(() => assetUrl(props.photo));
const resolvedGlobe = computed(() => assetUrl(props.globeSrc));
</script>

<template>
  <section :class="sectionClass" v-bind="rootAttrs">
    <template v-if="variant === 'cross-enter'">
      <div class="page-banner__cross-morph" aria-hidden="true" />
      <img class="page-banner__photo" :src="resolvedPhoto" alt="" />
      <img
        class="page-banner__cross-globe"
        :src="resolvedGlobe"
        alt=""
        width="420"
        height="420"
        aria-hidden="true"
      />
    </template>
    <img
      v-else
      :data-banner-image="variant === 'ship' || variant === 'placeholder' ? true : undefined"
      :src="resolvedImage"
      alt=""
    />
    <div class="page-banner__veil" aria-hidden="true" />
    <div class="container page-banner__copy">
      <h1 v-if="variant === 'cross-enter'" class="page-banner__cross-title">
        {{ title }}
      </h1>
      <BannerTitle
        v-else-if="title"
        :title="title"
        :highlight="titleHighlight"
        :data-banner-title="useDataBannerTitle"
      />
      <p
        class="page-banner__sub"
        :data-banner-subtitle="variant === 'ship' || variant === 'placeholder' ? true : undefined"
      >
        {{ subtitle }}
      </p>
    </div>
  </section>
</template>
