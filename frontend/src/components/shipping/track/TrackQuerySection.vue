<script setup lang="ts">
import MgButton from "@/components/common/MgButton.vue";
import ShipPanelCrumb from "@/components/shipping/ShipPanelCrumb.vue";
import { useSiteLocale } from "@/i18n/useSiteLocale";

const { t } = useSiteLocale();
</script>

<template>
  <div class="ship-panel-stack">
    <ShipPanelCrumb view="track" />

    <section class="track-query-card" :aria-label="t('ship.track.aria')">
      <form class="track-query" id="track-form" data-track-form autocomplete="off">
        <div class="track-query__group">
          <div class="track-query__field" data-track-field>
            <div class="track-query__tags" data-track-tags aria-live="polite" />
            <input
              class="track-query__input"
              type="text"
              data-track-input
              inputmode="numeric"
              :placeholder="t('ship.track.placeholder')"
              :aria-label="t('ship.track.inputAria')"
              aria-describedby="track-query-error"
            />
            <button type="button" class="field-clear track-query__clear" data-track-clear hidden>
              {{ t("ship.track.clear") }}
            </button>
          </div>
          <p class="track-query__tip track-result__tip">{{ t("ship.track.resultTip") }}</p>
          <p id="track-query-error" class="track-query__error" data-track-error hidden role="alert" />
        </div>
        <MgButton class="track-query__submit" type="submit" variant="filled" size="lg">
          {{ t("ship.track.submit") }}
        </MgButton>
      </form>

      <div class="track-result-wrap" data-track-result hidden :aria-label="t('ship.track.resultAria')">
        <div class="track-result__list" data-track-list />
      </div>
    </section>
  </div>
</template>
