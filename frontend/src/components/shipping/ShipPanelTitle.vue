<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <header class="ship-panel-title">
    <h2 class="ship-panel-title__text">{{ title }}</h2>
  </header>
</template>
