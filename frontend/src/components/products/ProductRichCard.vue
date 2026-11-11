<script setup lang="ts">
import MgButton from "@/components/common/MgButton.vue";
import { MG_BUTTON_ICON_DETAIL_ARROW } from "@/config/mgButtonIcons";
import type { ProductRichCardItem } from "@/data/productsPageContent";

defineProps<{ item: ProductRichCardItem }>();
</script>

<template>
  <article class="product-rich-card product-rich-card--stack">
    <div class="product-rich-card__body">
      <h3>{{ item.title }}</h3>
      <p>{{ item.description }}</p>
      <AppLink class="product-rich-card__link" :href="item.href"
        >查看详情<img src="asset/icons/icon-detail-arrow.svg" alt=""
      /></AppLink>
    </div>
    <div class="product-rich-card__visual">
      <img
        :src="item.image"
        alt=""
        :width="item.imageWidth"
        :height="item.imageHeight"
        loading="lazy"
      />
    </div>
  </article>
</template>

<style src="@repo/css/pages/products.css"></style>
