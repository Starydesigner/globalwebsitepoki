<script setup lang="ts">
import { computed } from "vue";
import { aboutHash, newsHash } from "@/config/sitePaths";
import { useSiteLocale } from "@/i18n/useSiteLocale";
import MegaPanelCompact from "./mega/MegaPanelCompact.vue";
import MegaPanelProducts from "./mega/MegaPanelProducts.vue";
import MegaPanelShipping from "./mega/MegaPanelShipping.vue";

defineOptions({ name: "MegaMenusLayer" });
const { t } = useSiteLocale();

const aboutLinks = computed(() => [
  { href: aboutHash("about-us"), label: t("layout.mega.aboutUs") },
  { href: aboutHash("sustainability"), label: t("layout.mega.sustainability") },
  { href: aboutHash("social"), label: t("layout.mega.social") },
  { href: aboutHash("join"), label: t("layout.mega.join") },
]);

const newsLinks = computed(() => [
  { href: newsHash("news-center"), label: t("layout.mega.newsCenter") },
  { href: newsHash("corporate-video"), label: t("layout.mega.corporateVideo") },
]);
</script>

<template>
  <div class="site-header__mega-layer">
    <MegaPanelShipping />
    <MegaPanelProducts />
    <MegaPanelCompact panel="about" :links="aboutLinks" />
    <MegaPanelCompact panel="news" :links="newsLinks" />
  </div>
</template>
