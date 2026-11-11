<script setup lang="ts">
import ShipPanelShell from "@/components/shipping/ShipPanelShell.vue";
import TrackQuerySection from "@/components/shipping/track/TrackQuerySection.vue";

defineProps<{ visible: boolean }>();
</script>

<template>
  <ShipPanelShell :visible="visible" panel="track" modifier="ship-panel--track" track-root>
    <TrackQuerySection />
  </ShipPanelShell>
</template>
