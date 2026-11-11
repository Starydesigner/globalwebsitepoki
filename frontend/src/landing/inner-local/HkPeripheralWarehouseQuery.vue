<script setup lang="ts">
import { computed, ref } from "vue";
import MgButton from "@/components/common/MgButton.vue";
import CbPillTabs from "@/components/tabs/CbPillTabs.vue";

defineOptions({ name: "HkPeripheralWarehouseQuery" });

type QueryMode = "address" | "name" | "code";

const MODES: { id: QueryMode; label: string; placeholder: string }[] = [
  { id: "address", label: "按地址查询", placeholder: "请输入地址信息" },
  { id: "name", label: "按仓名查询", placeholder: "请输入仓名" },
  { id: "code", label: "按仓号查询", placeholder: "请输入仓号" },
];

const activeMode = ref<QueryMode>("address");
const keyword = ref("");

const activeConfig = computed(() => MODES.find((m) => m.id === activeMode.value) ?? MODES[0]);

function onSubmit(event: Event) {
  event.preventDefault();
}
</script>

<template>
  <section class="cb-block cb-block--query" aria-labelledby="hk-warehouse-query-title">
    <h3 id="hk-warehouse-query-title">中国香港外围仓查询</h3>
    <div class="cb-warehouse-query">
      <form class="cb-warehouse-form" autocomplete="off" @submit="onSubmit">
        <CbPillTabs v-model="activeMode" :items="MODES" aria-label="查询方式" />
        <div class="cb-warehouse-form__field">
          <label class="visually-hidden" for="hk-warehouse-keyword">关键词</label>
          <input
            id="hk-warehouse-keyword"
            v-model="keyword"
            class="cb-warehouse-form__input"
            type="search"
            name="q"
            :placeholder="activeConfig.placeholder"
          />
        </div>
        <div class="cb-warehouse-form__actions">
          <MgButton type="submit" variant="filled" size="lg">查询</MgButton>
        </div>
      </form>
    </div>
  </section>
</template>
