<script setup lang="ts">
import type { CbPrimaryTabItem } from "./types";

defineProps<{
  modelValue: string;
  items: readonly CbPrimaryTabItem[] | CbPrimaryTabItem[];
  ariaLabel: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [id: string];
}>();

function select(id: string) {
  emit("update:modelValue", id);
}
</script>

<template>
  <div class="cb-tabs">
    <div class="cb-tabs__list" role="tablist" :aria-label="ariaLabel">
      <button
        v-for="item in items"
        :key="item.id"
        class="cb-tabs__btn"
        :class="{ 'is-active': item.id === modelValue }"
        type="button"
        role="tab"
        :id="item.tabId"
        :aria-selected="item.id === modelValue ? 'true' : 'false'"
        :aria-controls="item.panelId"
        :tabindex="item.id === modelValue ? 0 : -1"
        @click="select(item.id)"
      >
        {{ item.label }}
      </button>
    </div>
  </div>
</template>
