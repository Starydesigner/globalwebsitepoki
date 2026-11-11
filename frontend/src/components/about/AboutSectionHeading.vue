<script setup lang="ts">
defineProps<{
  title: string;
  metaLabel: string;
  titleId?: string;
}>();
</script>

<template>
  <header class="about-section__head">
    <h2 :id="titleId" class="about-section__title">{{ title }}</h2>
    <p class="about-section__meta">{{ metaLabel }}</p>
  </header>
</template>
