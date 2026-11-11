<script setup lang="ts">
defineProps<{
  leftSrc: string;
  rightSrc?: string;
}>();
</script>

<template>
  <div class="mega__decor" aria-hidden="true">
    <img class="mega__decor-left" :src="leftSrc" alt="" />
    <img v-if="rightSrc" class="mega__decor-right" :src="rightSrc" alt="" />
  </div>
</template>
