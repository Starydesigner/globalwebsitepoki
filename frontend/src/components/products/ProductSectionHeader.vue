<script setup lang="ts">
defineProps<{
  headingId: string;
  title: string;
  metaLabel: string;
  lead?: string;
}>();
</script>

<template>
  <header class="product-section__head">
    <div>
      <h2 :id="headingId">{{ title }}</h2>
      <div class="product-section__meta">
        <img src="asset/icons/svg_1adbd74b.svg" alt="" />
        <span>{{ metaLabel }}</span>
      </div>
    </div>
    <p v-if="lead" class="product-section__lead">{{ lead }}</p>
  </header>
</template>

<style src="@repo/css/pages/products.css"></style>
