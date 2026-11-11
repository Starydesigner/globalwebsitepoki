<script setup lang="ts">
import { computed, ref, toRef } from "vue";
import MegaMenus from "./MegaMenus.vue";
import SiteLocaleSwitcher from "./SiteLocaleSwitcher.vue";
import { EXTERNAL_LINKS } from "@/config/sitePaths";
import { useSiteHeader, type SiteHeaderMode } from "@/composables/useSiteHeader";
import { useSiteLocale } from "@/i18n/useSiteLocale";

const { t } = useSiteLocale();

const props = withDefaults(
  defineProps<{
    mode?: SiteHeaderMode;
    activeNav?: string;
  }>(),
  {
    mode: "default",
    activeNav: "home",
  },
);

const headerEl = ref<HTMLElement | null>(null);

const headerClass = computed(() =>
  props.mode === "hero" ? "site-header site-header--hero" : "site-header site-header--default",
);

useSiteHeader(() => headerEl.value, {
  mode: props.mode,
  activeNav: toRef(props, "activeNav"),
});
</script>

<template>
  <header
    ref="headerEl"
    :class="headerClass"
    :data-site-header="mode"
    :data-active-nav="activeNav"
    role="banner"
  >
    <div class="site-header__bar">
      <div class="container site-header__inner">
        <AppLink class="site-header__brand" href="/" aria-label="中通国际首页">
          <img
            class="site-header__logo site-header__logo--color"
            src="asset/images/logo-international.png"
            alt="中通国际"
            width="167"
            height="27"
          />
          <img
            class="site-header__logo site-header__logo--glass"
            src="asset/images/logo-glass.png"
            alt="中通国际"
            width="168"
            height="27"
          />
        </AppLink>
        <nav class="site-header__nav" aria-label="主导航">
          <div class="site-header__nav-item" data-nav-item="home">
            <AppLink class="site-header__nav-link" href="/" data-nav-key="home">{{ t("nav.home") }}</AppLink>
            <span class="site-header__indicator" aria-hidden="true" />
          </div>
          <div class="site-header__nav-item" data-nav-item="shipping">
            <AppLink
              class="site-header__nav-link"
              href="/online-send"
              data-nav-key="shipping"
              data-has-mega="true"
              aria-expanded="false"
              aria-haspopup="true"
              >{{ t("nav.shipping") }}</AppLink
            >
            <span class="site-header__indicator" aria-hidden="true" />
          </div>
          <div class="site-header__nav-item" data-nav-item="products">
            <AppLink
              class="site-header__nav-link"
              href="/products"
              data-nav-key="products"
              data-has-mega="true"
              aria-expanded="false"
              aria-haspopup="true"
              >{{ t("nav.products") }}</AppLink
            >
            <span class="site-header__indicator" aria-hidden="true" />
          </div>
          <div class="site-header__nav-item" data-nav-item="tech">
            <AppLink class="site-header__nav-link" href="/tech-global" data-nav-key="tech">{{ t("nav.tech") }}</AppLink>
            <span class="site-header__indicator" aria-hidden="true" />
          </div>
          <div class="site-header__nav-item" data-nav-item="investor">
            <AppLink
              class="site-header__nav-link"
              :href="EXTERNAL_LINKS.investorRelations"
              target="_blank"
              rel="noopener noreferrer"
              data-nav-key="investor"
              >{{ t("nav.investor") }}</AppLink
            >
            <span class="site-header__indicator" aria-hidden="true" />
          </div>
          <div class="site-header__nav-item" data-nav-item="about">
            <AppLink
              class="site-header__nav-link"
              href="/about#about-us"
              data-nav-key="about"
              data-has-mega="true"
              aria-expanded="false"
              aria-haspopup="true"
              >{{ t("nav.about") }}</AppLink
            >
            <span class="site-header__indicator" aria-hidden="true" />
          </div>
          <div class="site-header__nav-item" data-nav-item="news">
            <AppLink
              class="site-header__nav-link"
              href="/news"
              data-nav-key="news"
              data-has-mega="true"
              aria-expanded="false"
              aria-haspopup="true"
              >{{ t("nav.news") }}</AppLink
            >
            <span class="site-header__indicator" aria-hidden="true" />
          </div>
        </nav>
        <div class="site-header__actions">
          <SiteLocaleSwitcher />
          <a class="site-header__auth" href="#">{{ t("header.login") }}</a>
        </div>
      </div>
      <MegaMenus />
    </div>
  </header>
</template>
