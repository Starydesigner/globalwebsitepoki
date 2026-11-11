<script setup lang="ts">
import CbImportImportGeneralProduct from "./products/CbImportImportGeneralProduct.vue";
import CbImportImportBulkProduct from "./products/CbImportImportBulkProduct.vue";
import CbImportImportParcelProduct from "./products/CbImportImportParcelProduct.vue";
import CbImportImportWarehouseProduct from "./products/CbImportImportWarehouseProduct.vue";

defineOptions({ name: "CrossBorderImportPanel" });
</script>

<template>
<section id="panel-import" data-cb-panel="import" role="tabpanel" aria-labelledby="tab-import">
  <CbImportImportGeneralProduct />
  <CbImportImportBulkProduct />
  <CbImportImportParcelProduct />
  <CbImportImportWarehouseProduct />
</section>
</template>
