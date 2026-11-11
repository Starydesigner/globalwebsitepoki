<script setup lang="ts">
import ShipPanelCrumb from "../ShipPanelCrumb.vue";
import type { ShipViewKey } from "@/shipping/shipNavConfig";

defineProps<{
  view: ShipViewKey;
}>();
</script>

<template>
  <div class="ship-panel-stack">
    <ShipPanelCrumb :view="view" />
    <section class="clearance-card" aria-label="清关服务">
      <slot />
    </section>
  </div>
</template>
