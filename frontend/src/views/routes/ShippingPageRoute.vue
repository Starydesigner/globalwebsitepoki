<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import ShippingApp from "@/shipping/ShippingApp.vue";
import type { ShipViewKey } from "@/shipping/shipNavConfig";

const route = useRoute();
const initialView = computed(() => route.meta.shipInitialView as ShipViewKey | undefined);
</script>

<template>
  <ShippingApp :initial-view="initialView" />
</template>
