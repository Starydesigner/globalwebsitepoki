<script setup lang="ts">
import SendLaneSection from "@/components/shipping/send/SendLaneSection.vue";
import ShipPanelShell from "@/components/shipping/ShipPanelShell.vue";
import { useLocalizedSendLanes } from "@/composables/useLocalizedSendLanes";

const { enterpriseLane, personalLane } = useLocalizedSendLanes();

defineProps<{ visible: boolean }>();
</script>

<template>
  <ShipPanelShell :visible="visible" panel="send">
    <SendLaneSection :lane="enterpriseLane" />
    <SendLaneSection :lane="personalLane" />
  </ShipPanelShell>
</template>
