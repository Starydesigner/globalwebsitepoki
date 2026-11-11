<script setup lang="ts">
import RatesQueryCard from "@/components/shipping/rates/RatesQueryCard.vue";
import ShipPanelShell from "@/components/shipping/ShipPanelShell.vue";

defineProps<{ visible: boolean }>();
</script>

<template>
  <ShipPanelShell :visible="visible" panel="rates" modifier="ship-panel--rates">
    <RatesQueryCard />
  </ShipPanelShell>
</template>
