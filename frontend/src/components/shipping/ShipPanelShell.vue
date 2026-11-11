<script setup lang="ts">
defineProps<{
  visible: boolean;
  panel: string;
  modifier?: string;
  trackRoot?: boolean;
  noticeRoot?: boolean;
}>();
</script>

<template>
  <div
    class="ship-panel"
    :class="modifier"
    :data-ship-panel="panel"
    :data-track-root="trackRoot ? '' : undefined"
    :data-notice-root="noticeRoot ? '' : undefined"
    :hidden="!visible"
  >
    <slot />
  </div>
</template>
