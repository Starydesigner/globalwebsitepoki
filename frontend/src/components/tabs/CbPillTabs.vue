<script setup lang="ts">
import type { CbPillTabItem } from "./types";

defineProps<{
  modelValue: string;
  items: readonly CbPillTabItem[] | CbPillTabItem[];
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
  <div class="cb-switch" role="tablist" :aria-label="ariaLabel">
    <button
      v-for="item in items"
      :key="item.id"
      class="cb-switch__btn"
      :class="{ 'is-active': item.id === modelValue }"
      type="button"
      role="tab"
      :aria-selected="item.id === modelValue ? 'true' : 'false'"
      @click="select(item.id)"
    >
      {{ item.label }}
    </button>
  </div>
</template>
