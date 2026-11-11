<script setup lang="ts">
import NoticeForbiddenPanel from "@/components/shipping/notice/NoticeForbiddenPanel.vue";
import NoticeTabsBar from "@/components/shipping/notice/NoticeTabsBar.vue";
import NoticeTariffPanel from "@/components/shipping/notice/NoticeTariffPanel.vue";
import ShipPanelCrumb from "@/components/shipping/ShipPanelCrumb.vue";
import ShipPanelShell from "@/components/shipping/ShipPanelShell.vue";

defineProps<{ visible: boolean }>();
</script>

<template>
  <ShipPanelShell :visible="visible" panel="notice" modifier="ship-panel--notice" notice-root>
    <div class="ship-panel-stack ship-panel-stack--notice">
      <ShipPanelCrumb view="notice" />
      <section class="notice-shell-card" id="notice-body" aria-label="寄件须知">
        <NoticeTabsBar />
        <NoticeForbiddenPanel />
        <NoticeTariffPanel />
      </section>
    </div>
  </ShipPanelShell>
</template>
