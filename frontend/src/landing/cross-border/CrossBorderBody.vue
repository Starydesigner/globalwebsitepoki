<script setup lang="ts">
import CrossBorderExportPanel from "./CrossBorderExportPanel.vue";
import CrossBorderImportPanel from "./CrossBorderImportPanel.vue";

defineOptions({ name: "CrossBorderBody" });
</script>

<template>
  <CrossBorderExportPanel />
  <CrossBorderImportPanel />
</template>
