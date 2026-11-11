<script setup lang="ts">
import MgButton from "@/components/common/MgButton.vue";
import { MG_BUTTON_ICON_SEND } from "@/config/mgButtonIcons";
import { useSiteLocale } from "@/i18n/useSiteLocale";
import MegaDecor from "./MegaDecor.vue";

defineOptions({ name: "MegaPanelShipping" });
const { t } = useSiteLocale();
</script>

<template>
  <div class="mega mega--shipping" data-mega-panel="shipping">
    <MegaDecor left-src="asset/icons/svg_7fc4c20a.svg" right-src="asset/icons/svg_e5540684.svg" />
    <div class="mega__inner">
      <div class="mega__split mega__split--shipping">
        <div class="mega-col mega-col--send">
          <AppLink class="mega-col__title" href="/online-send#send">{{ t("layout.mega.send") }}</AppLink>
          <span class="mega-col__rule" />
          <div class="mega-cards mega-cards--under-send">
            <article class="mega-card">
              <div class="mega-card__head">
                <span class="mega-card__head-mark" aria-hidden="true" />
                <div>
                  <h3>{{ t("layout.mega.webTitle") }}</h3>
                  <p>{{ t("layout.mega.webDesc") }}</p>
                </div>
              </div>
              <div class="mega-card__visual">
                <img src="asset/images/send/web-order.png?v=5" alt="" />
              </div>
              <MgButton
                class="mega-card__cta"
                size="sm"
                variant="filled"
                href="https://plutus.ztoglobal.com"
                :icon-src="MG_BUTTON_ICON_SEND"
              >
                {{ t("common.goOrder") }}
              </MgButton>
            </article>
            <article class="mega-card">
              <div class="mega-card__head">
                <span class="mega-card__head-mark" aria-hidden="true" />
                <div>
                  <h3>{{ t("layout.mega.mobileTitle") }}</h3>
                  <p>{{ t("layout.mega.mobileDesc") }}</p>
                </div>
              </div>
              <div class="mega-card__qr">
                <div class="mega-card__qr-box">
                  <img src="asset/images/image-21-3509.png" alt="" />
                </div>
              </div>
              <span class="mega-card__qr-hint">{{ t("layout.mega.qrHint") }}</span>
            </article>
          </div>
        </div>
        <div class="mega-col mega-col--track">
          <AppLink class="mega-col__title" href="/online-send#track">{{ t("layout.mega.query") }}</AppLink>
          <span class="mega-col__rule" />
          <div class="mega-col__links">
            <AppLink class="mega-link mega-link--group" href="/online-send#track">{{ t("ship.nav.track") }}</AppLink>
            <AppLink class="mega-link mega-link--group" href="/online-send#rates">{{ t("ship.nav.rates") }}</AppLink>
            <AppLink class="mega-link mega-link--group" href="/online-send#notice">{{ t("ship.nav.notice") }}</AppLink>
          </div>
        </div>
        <div class="mega-col mega-col--customs">
          <AppLink class="mega-col__title" href="/online-send#upload">{{ t("layout.mega.customs") }}</AppLink>
          <span class="mega-col__rule" />
          <div class="mega-col__links">
            <AppLink class="mega-link mega-link--group" href="/online-send#tw">{{ t("ship.nav.tw") }}</AppLink>
            <AppLink class="mega-link mega-link--group" href="/online-send#upload">{{ t("ship.nav.upload") }}</AppLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
