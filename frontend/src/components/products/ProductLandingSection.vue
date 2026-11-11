<script setup lang="ts">
import ProductSectionHeader from "./ProductSectionHeader.vue";
import type { ProductSectionConfig } from "@/data/productsPageContent";

defineProps<{
  section: ProductSectionConfig;
  cardsLayout: "rich-three" | "overseas";
}>();
</script>

<template>
  <section :id="section.id" class="product-section" :aria-labelledby="section.headingId">
    <div class="container">
      <ProductSectionHeader
        :heading-id="section.headingId"
        :title="section.title"
        :meta-label="section.metaLabel"
        :lead="section.lead"
      />
      <div
        :class="
          cardsLayout === 'rich-three' ? 'product-cards product-cards--three' : 'product-overseas-cards'
        "
      >
        <slot />
      </div>
    </div>
  </section>
</template>

<style src="@repo/css/components/product-service-card.css"></style>
