<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import MgButton from "@/components/common/MgButton.vue";
import { destinationNeedsPostcode } from "@/shipping/ratesPostcode";
import RateRegionPicker from "./RateRegionPicker.vue";
import RatesQueryResult from "./RatesQueryResult.vue";
import ShipPanelCrumb from "../ShipPanelCrumb.vue";
import { useSiteLocale } from "@/i18n/useSiteLocale";

defineOptions({ name: "RatesQueryCard" });

const { t } = useSiteLocale();

const showDestPostcode = ref(false);

function syncPostcodeField(form: HTMLElement) {
  showDestPostcode.value = destinationNeedsPostcode(form);
  if (!showDestPostcode.value) {
    const input = form.querySelector<HTMLInputElement>('[name="postcode"]');
    if (input) input.value = "";
  }
}

function onRegionChange(event: Event) {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const picker = target.closest("[data-rate-picker]");
  if (picker?.getAttribute("data-rate-picker") !== "destination") return;
  const form = picker.closest("form");
  if (form instanceof HTMLElement) syncPostcodeField(form);
}

let boundForm: HTMLElement | null = null;

onMounted(() => {
  const form = document.getElementById("rates-form");
  if (!(form instanceof HTMLElement)) return;
  boundForm = form;
  syncPostcodeField(form);
  form.addEventListener("rate-region-change", onRegionChange);
});

onUnmounted(() => {
  boundForm?.removeEventListener("rate-region-change", onRegionChange);
  boundForm = null;
});
</script>

<template>
  <div class="ship-panel-stack">
    <ShipPanelCrumb view="rates" />
    <section class="rate-card" data-rate-card aria-label="运费时效">
    <form class="rate-form" id="rates-form">
      <div class="rate-pair">
        <RateRegionPicker
          kind="origin"
          label="始发地"
          search-placeholder="搜索省或直辖市"
          dialog-label="选择始发地"
          hidden-name="originCode"
        />
        <RateRegionPicker
          kind="destination"
          label="目的地"
          search-placeholder="搜索国家或地区"
          dialog-label="选择目的地"
          hidden-name="destCode"
        />
        <img class="rate-pair__arrow" src="asset/rates/swap.svg" alt="" width="48" height="11" />
      </div>
      <div class="rate-pair">
        <label v-show="showDestPostcode" class="rate-field" data-rate-postcode-field>
          <span class="rate-label">目的地邮编<em>*</em><img src="asset/rates/info.svg" alt="" width="18" height="18" /></span>
          <input class="rate-control rate-control--input" type="text" name="postcode" placeholder="请输入" autocomplete="postal-code" />
          <p class="rate-field__error" data-rate-field-error="postcode" hidden role="alert" />
        </label>
        <div class="rate-field" data-rate-goods-field>
          <span class="rate-label">物品信息<em>*</em></span>
          <div class="rate-radios" data-rate-goods-radios>
            <label class="rate-radio"><input type="radio" name="goods" value="normal" />普货</label>
            <label class="rate-radio"><input type="radio" name="goods" value="battery" />带电物品</label>
            <label class="rate-radio"><input type="radio" name="goods" value="doc" />文件</label>
          </div>
          <p class="rate-field__error" data-rate-field-error="goods" hidden role="alert" />
        </div>
      </div>
      <div class="rate-pair">
        <label class="rate-field">
          <span class="rate-label">{{ t("ship.rates.weight") }}<em>*</em></span>
          <input class="rate-control rate-control--input" type="text" name="weight" inputmode="decimal" :placeholder="t('ship.rates.dimPlaceholder')" />
          <p class="rate-field__error" data-rate-field-error="weight" hidden role="alert" />
        </label>
        <div class="rate-field rate-field--volume" data-rate-volume-field>
          <div class="rate-field__head">
            <span class="rate-label"
              >{{ t("ship.rates.volume") }}<span class="rate-hint">{{ t("ship.rates.volumeHint") }}</span></span
            >
            <span class="rate-volume-bill" data-rate-volume-bill hidden>
              {{ t("ship.rates.chargeableWeight") }}
              <em data-rate-volume-bill-value>--</em>
            </span>
          </div>
          <div class="rate-dims">
            <label class="rate-dim">
              <span class="rate-dim__label">{{ t("ship.rates.dimLength") }}</span>
              <input
                class="rate-dim__input"
                type="text"
                name="length"
                inputmode="decimal"
                autocomplete="off"
              />
              <span class="rate-dim__unit">CM</span>
            </label>
            <label class="rate-dim">
              <span class="rate-dim__label">{{ t("ship.rates.dimWidth") }}</span>
              <input
                class="rate-dim__input"
                type="text"
                name="width"
                inputmode="decimal"
                autocomplete="off"
              />
              <span class="rate-dim__unit">CM</span>
            </label>
            <label class="rate-dim">
              <span class="rate-dim__label">{{ t("ship.rates.dimHeight") }}</span>
              <input
                class="rate-dim__input"
                type="text"
                name="height"
                inputmode="decimal"
                autocomplete="off"
              />
              <span class="rate-dim__unit">CM</span>
            </label>
          </div>
        </div>
      </div>
      <MgButton type="submit" variant="filled" size="lg">查询</MgButton>
    </form>
    <RatesQueryResult />
    </section>
  </div>
</template>
