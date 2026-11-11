<script setup lang="ts">
withDefaults(
  defineProps<{
    kind: "origin" | "destination";
    label: string;
    triggerLabel?: string;
    areaCode?: string;
    routeLabel?: string;
    searchPlaceholder: string;
    dialogLabel: string;
    hiddenName: "originCode" | "destCode";
  }>(),
  {
    triggerLabel: "请选择",
    areaCode: "",
    routeLabel: "",
  },
);
</script>

<template>
  <div class="rate-field">
    <span class="rate-label">{{ label }}<em>*</em></span>
    <div class="rate-picker" :data-rate-picker="kind">
      <button
        class="rate-control rate-picker__trigger is-placeholder"
        type="button"
        data-rate-picker-trigger
        :data-rate-origin="kind === 'origin' ? '' : undefined"
        :data-rate-dest="kind === 'destination' ? '' : undefined"
        :data-area-code="areaCode || undefined"
        :data-route-label="routeLabel || undefined"
        aria-expanded="false"
        aria-haspopup="dialog"
      >
        <span data-rate-picker-label>{{ triggerLabel }}</span>
        <img src="asset/rates/caret.svg" alt="" width="16" height="16" />
      </button>
      <div class="rate-picker__panel" data-rate-picker-panel hidden role="dialog" :aria-label="dialogLabel">
        <div class="rate-picker__tabs" data-rate-picker-tabs />
        <div class="rate-picker__subhead" data-rate-picker-subhead hidden>
          <button type="button" class="rate-picker__back" data-rate-picker-back>返回</button>
          <span data-rate-picker-subtitle />
        </div>
        <input
          class="rate-picker__search"
          type="text"
          data-rate-picker-search
          :placeholder="searchPlaceholder"
          autocomplete="off"
        />
        <div class="rate-picker__grid" data-rate-picker-grid />
      </div>
      <input type="hidden" :name="hiddenName === 'originCode' ? 'originCode' : 'destCode'" data-rate-picker-code :value="areaCode" />
    </div>
    <p
      class="rate-field__error"
      :data-rate-field-error="kind === 'origin' ? 'origin' : 'dest'"
      hidden
      role="alert"
    />
  </div>
</template>
