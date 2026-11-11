<script setup lang="ts">
import { ref } from "vue";
import {
  SHIP_NAV_ITEMS,
  type ShipNavGroupItem,
  type ShipNavItem,
  type ShipViewKey,
} from "@/shipping/shipNavConfig";
import { useSiteLocale } from "@/i18n/useSiteLocale";

const { t } = useSiteLocale();

const props = defineProps<{
  activeView: ShipViewKey;
}>();

const emit = defineEmits<{
  select: [view: ShipViewKey];
}>();

const openGroups = ref<Record<string, boolean>>(
  Object.fromEntries(
    SHIP_NAV_ITEMS.filter((i): i is ShipNavGroupItem => i.type === "group").map((g) => [
      g.id,
      g.defaultOpen !== false,
    ]),
  ),
);

function toggleGroup(group: ShipNavGroupItem) {
  openGroups.value[group.id] = !openGroups.value[group.id];
}

function onSelect(view: ShipViewKey, event: Event) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  emit("select", view);
}

function isPrimaryActive(item: ShipNavItem): boolean {
  return item.type === "primary" && item.id === props.activeView;
}

function isSecondaryActive(id: ShipViewKey): boolean {
  return id === props.activeView;
}
</script>

<template>
  <nav class="ship-side" :aria-label="t('ship.nav.aria')">
    <template v-for="item in SHIP_NAV_ITEMS" :key="item.type === 'primary' ? item.id : item.id">
      <a
        v-if="item.type === 'primary'"
        class="ship-side__head"
        :class="{ 'is-active': isPrimaryActive(item) }"
        :href="`#${item.id}`"
        :aria-current="isPrimaryActive(item) ? 'page' : undefined"
        @click="onSelect(item.id, $event)"
      >
        <img :src="item.icon" alt="" width="32" height="32" decoding="async" />
        <span class="ship-side__label">{{ t(item.labelKey) }}</span>
      </a>

      <div
        v-else
        class="ship-side__group"
        :class="{ 'is-open': openGroups[item.id] }"
        data-ship-group
      >
        <button
          class="ship-side__head ship-side__toggle"
          type="button"
          data-ship-toggle
          :aria-expanded="openGroups[item.id] ? 'true' : 'false'"
          @click="toggleGroup(item)"
        >
          <img :src="item.icon" alt="" width="32" height="32" decoding="async" />
          <span class="ship-side__label">{{ t(item.labelKey) }}</span>
          <img
            :src="item.chevronIcon ?? 'asset/shipping/chevron.svg'"
            alt=""
            width="16"
            height="16"
            decoding="async"
            class="ship-side__chevron"
          />
        </button>
        <a
          v-for="child in item.children"
          :key="child.id"
          class="ship-side__sub"
          :class="{ 'is-active': isSecondaryActive(child.id) }"
          :href="`#${child.id}`"
          :aria-current="isSecondaryActive(child.id) ? 'page' : undefined"
          data-ship-view
          @click="onSelect(child.id, $event)"
        >
          {{ t(child.labelKey) }}
        </a>
      </div>
    </template>
  </nav>
</template>
