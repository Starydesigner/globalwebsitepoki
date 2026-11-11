<script setup lang="ts">
import CbExportExpressProduct from "./products/CbExportExpressProduct.vue";
import CbExportStandardProduct from "./products/CbExportStandardProduct.vue";
import CbExportConsolidateProduct from "./products/CbExportConsolidateProduct.vue";
import CbExportCargoProduct from "./products/CbExportCargoProduct.vue";
import CbExportPacketProduct from "./products/CbExportPacketProduct.vue";

defineOptions({ name: "CrossBorderExportPanel" });
</script>

<template>
<section id="panel-export" data-cb-panel="export" role="tabpanel" aria-labelledby="tab-export" hidden>
  <CbExportExpressProduct />
  <CbExportStandardProduct />
  <CbExportConsolidateProduct />
  <CbExportCargoProduct />
  <CbExportPacketProduct />
</section>
</template>
