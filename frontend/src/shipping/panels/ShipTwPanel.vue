<script setup lang="ts">
import ClearanceCard from "@/components/shipping/clearance/ClearanceCard.vue";
import TwClearanceForm from "@/components/shipping/clearance/TwClearanceForm.vue";
import ShipPanelShell from "@/components/shipping/ShipPanelShell.vue";

defineProps<{ visible: boolean }>();
</script>

<template>
  <ShipPanelShell :visible="visible" panel="tw" modifier="ship-panel--clearance">
    <ClearanceCard view="tw">
      <TwClearanceForm />
    </ClearanceCard>
  </ShipPanelShell>
</template>
