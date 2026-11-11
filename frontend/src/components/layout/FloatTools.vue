<script setup lang="ts">
import { useFloatTools } from "@/composables/useFloatTools";
import FloatToolsMarkup from "./FloatToolsMarkup.vue";

useFloatTools();
</script>

<template>
  <Teleport to="body">
    <FloatToolsMarkup />
  </Teleport>
</template>
