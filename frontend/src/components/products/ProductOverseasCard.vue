<script setup lang="ts">
import MgButton from "@/components/common/MgButton.vue";
import { MG_BUTTON_ICON_DETAIL_ARROW } from "@/config/mgButtonIcons";
import type { ProductOverseasCardItem } from "@/data/productsPageContent";

defineProps<{ item: ProductOverseasCardItem }>();
</script>

<template>
  <article class="product-overseas-card">
    <div class="product-overseas-card__media">
      <img
        :src="item.image"
        alt=""
        :width="item.imageWidth"
        :height="item.imageHeight"
        loading="lazy"
      />
    </div>
    <div class="product-overseas-card__body">
      <h3>{{ item.title }}</h3>
      <p>{{ item.description }}</p>
      <AppLink class="product-rich-card__link" :href="item.href"
        >查看详情<img src="asset/icons/icon-detail-arrow.svg" alt=""
      /></AppLink>
    </div>
  </article>
</template>

<style src="@repo/css/components/product-service-card.css"></style>
