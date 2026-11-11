<script setup lang="ts">
import ClearanceCard from "@/components/shipping/clearance/ClearanceCard.vue";
import UploadClearanceForm from "@/components/shipping/clearance/UploadClearanceForm.vue";
import ShipPanelShell from "@/components/shipping/ShipPanelShell.vue";

defineProps<{ visible: boolean }>();
</script>

<template>
  <ShipPanelShell :visible="visible" panel="upload" modifier="ship-panel--clearance">
    <ClearanceCard view="upload">
      <UploadClearanceForm />
    </ClearanceCard>
  </ShipPanelShell>
</template>
