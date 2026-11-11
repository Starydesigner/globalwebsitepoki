<script setup lang="ts">
import ProductLandingSection from "@/components/products/ProductLandingSection.vue";
import ProductOverseasCard from "@/components/products/ProductOverseasCard.vue";
import ProductRichCard from "@/components/products/ProductRichCard.vue";
import {
  PRODUCT_CROSS_CARDS,
  PRODUCT_CROSS_SECTION,
  PRODUCT_GTM_CARDS,
  PRODUCT_GTM_SECTION,
  PRODUCT_OVERSEAS_CARDS,
  PRODUCT_OVERSEAS_SECTION,
} from "@/data/productsPageContent";
import { useProductsPageEffects } from "@/composables/products/useProductsPageEffects";

defineOptions({ name: "ProductsBody" });
useProductsPageEffects();
</script>

<template>
  <main class="product-landing">
    <ProductLandingSection :section="PRODUCT_CROSS_SECTION" cards-layout="rich-three">
      <ProductRichCard v-for="item in PRODUCT_CROSS_CARDS" :key="item.href" :item="item" />
    </ProductLandingSection>

    <ProductLandingSection :section="PRODUCT_GTM_SECTION" cards-layout="overseas">
      <ProductOverseasCard v-for="item in PRODUCT_GTM_CARDS" :key="item.href" :item="item" />
    </ProductLandingSection>

    <ProductLandingSection :section="PRODUCT_OVERSEAS_SECTION" cards-layout="overseas">
      <ProductOverseasCard v-for="item in PRODUCT_OVERSEAS_CARDS" :key="item.href" :item="item" />
    </ProductLandingSection>
  </main>
</template>

<style src="@repo/css/pages/products.css"></style>
