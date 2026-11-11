<script setup lang="ts">
import { useHomeProductGridHover } from "@/composables/home/useHomeProductGridHover";
import { useProductCardSharedTransition } from "@/composables/home/useProductCardSharedTransition";
import { useSiteLocale } from "@/i18n/useSiteLocale";

defineOptions({ name: "HomeProductsSection" });
useHomeProductGridHover();
useProductCardSharedTransition();
const { t } = useSiteLocale();
</script>

<template>
<section class="section-block section-products" aria-labelledby="products-title">
          <div class="section-products__glow" aria-hidden="true">
            <img src="asset/images/product-section-glow.png" alt="" width="1024" height="475" />
          </div>
          <div class="product-scene product-scene--overseas" aria-hidden="true">
            <img src="asset/images/product-overseas-scene.png" alt="" />
          </div>
          <div class="product-scene product-scene--cross" aria-hidden="true">
            <img src="asset/images/product-cross-scene.png" alt="" />
          </div>
          <div class="container">
            <div class="section-heading">
              <div>
                <h2 id="products-title" class="section-heading__title">{{ t("home.products.title") }}</h2>
                <div class="section-heading__meta">
                  <img src="asset/icons/svg_1adbd74b.svg" alt="" />
                  <span>{{ t("home.products.meta") }}</span>
                </div>
              </div>
              <AppLink class="btn-outline" href="/products">
                {{ t("home.learnMore") }}
                <span class="btn-outline__icon" aria-hidden="true"></span>
              </AppLink>
            </div>
            <div class="product-grid">
              <article class="product-card product-card--cross">
                <AppLink                   class="product-card__hit"
                  href="/cross-border"
                  :aria-label="t('home.products.cross.aria')"
                  data-shared-transition="cross-card"
                ></AppLink>
                <span class="product-card__corner" aria-hidden="true">
                  <img src="asset/icons/svg_755fc7a8.svg" alt="" width="602" height="602" />
                </span>
                <div class="product-card__content">
                  <div class="product-card__intro">
                    <h3 class="product-card__title">{{ t("home.products.cross.title") }}</h3>
                    <p class="product-card__desc">
                      {{ t("home.products.cross.desc") }}
                    </p>
                  </div>
                  <ul class="product-card__tags">
                    <li class="product-card__tag">
                      <img src="asset/icons/svg_f6579766.svg" alt="" width="12" height="12" aria-hidden="true" />
                      <span>{{ t("home.products.cross.import") }}</span>
                    </li>
                    <li class="product-card__tag">
                      <img src="asset/icons/svg_f6579766.svg" alt="" width="12" height="12" aria-hidden="true" />
                      <span>{{ t("home.products.cross.export") }}</span>
                    </li>
                  </ul>
                </div>
                <div class="product-card__visual">
                  <img src="asset/images/product-cross-card.png" alt="" width="564" height="329" />
                </div>
                <div class="cross-panel">
                  <div class="cross-panel__head">
                    <span>{{ t("home.products.cross.panelTitle") }}</span>
                    <div class="cross-panel__head-photo" aria-hidden="true">
                      <img src="asset/images/product-cross-team.png?v=2" alt="" width="690" height="492" />
                    </div>
                  </div>
                  <div class="cross-panel__sheet">
                    <div class="cross-panel__lanes">
                      <AppLink class="cross-panel__lane" href="/cross-border#import" :aria-label="t('home.products.cross.import.aria')">
                        <div class="cross-panel__lane-stack">
                          <div class="cross-panel__lane-top">
                            <div class="cross-panel__lane-intro">
                              <h4 class="cross-panel__lane-title">{{ t("home.products.cross.import.title") }}</h4>
                              <p class="cross-panel__lane-desc">
                                {{ t("home.products.cross.import.desc") }}
                              </p>
                            </div>
                            <div class="cross-panel__lane-tags">
                              <span>{{ t("home.products.cross.import.tag1") }}</span>
                              <span>{{ t("home.products.cross.import.tag2") }}</span>
                              <span>{{ t("home.products.cross.import.tag3") }}</span>
                              <span>{{ t("home.products.cross.import.tag4") }}</span>
                            </div>
                          </div>
                          <span class="cross-panel__lane-more">
                            {{ t("home.learnMore") }}
                            <img src="asset/icons/svg_eda3ad84.svg" alt="" width="18" height="18" aria-hidden="true" />
                          </span>
                        </div>
                        <div class="cross-panel__lane-visual" aria-hidden="true">
                          <img class="cross-panel__lane-art" src="asset/images/cross-import-deco.png" alt="" width="185" height="185" />
                        </div>
                      </AppLink>
                      <AppLink class="cross-panel__lane" href="/cross-border#export" :aria-label="t('home.products.cross.export.aria')">
                        <div class="cross-panel__lane-stack">
                          <div class="cross-panel__lane-top">
                            <div class="cross-panel__lane-intro">
                              <h4 class="cross-panel__lane-title">{{ t("home.products.cross.export.title") }}</h4>
                              <p class="cross-panel__lane-desc">
                                {{ t("home.products.cross.export.desc") }}
                              </p>
                            </div>
                            <div class="cross-panel__lane-tags">
                              <span>{{ t("home.products.cross.export.tag1") }}</span>
                              <span>{{ t("home.products.cross.export.tag2") }}</span>
                              <span>{{ t("home.products.cross.export.tag3") }}</span>
                              <span>{{ t("home.products.cross.export.tag4") }}</span>
                            </div>
                          </div>
                          <span class="cross-panel__lane-more">
                            {{ t("home.learnMore") }}
                            <img src="asset/icons/svg_eda3ad84.svg" alt="" width="18" height="18" aria-hidden="true" />
                          </span>
                        </div>
                        <div class="cross-panel__lane-visual" aria-hidden="true">
                          <img class="cross-panel__lane-art" src="asset/images/cross-export-deco.png" alt="" width="185" height="185" />
                        </div>
                      </AppLink>
                    </div>
                  </div>
                </div>
              </article>
              <div class="product-side">
              <article class="product-card product-card--overseas">
                <AppLink class="product-card__hit" href="/products#overseas" :aria-label="t('home.products.overseas.aria')"></AppLink>
                <span class="product-card__corner" aria-hidden="true">
                  <img src="asset/icons/svg_755fc7a8.svg" alt="" width="602" height="602" />
                </span>
                <div class="product-card__content">
                  <div class="product-card__intro">
                    <h3 class="product-card__title">{{ t("home.products.overseas.title") }}</h3>
                    <p class="product-card__desc">
                      {{ t("home.products.overseas.desc") }}
                    </p>
                  </div>
                  <ul class="product-card__tags">
                    <li class="product-card__tag">
                      <img src="asset/icons/svg_f6579766.svg" alt="" width="12" height="12" aria-hidden="true" />
                      <span>{{ t("home.products.overseas.asia") }}</span>
                    </li>
                    <li class="product-card__tag">
                      <img src="asset/icons/svg_f6579766.svg" alt="" width="12" height="12" aria-hidden="true" />
                      <span>{{ t("home.products.overseas.africa") }}</span>
                    </li>
                    <li class="product-card__tag">
                      <img src="asset/icons/svg_f6579766.svg" alt="" width="12" height="12" aria-hidden="true" />
                      <span>{{ t("home.products.overseas.warehouse") }}</span>
                    </li>
                  </ul>
                </div>
                <div class="product-card__visual">
                  <img src="asset/images/product-overseas-card.png" alt="" width="564" height="329" />
                </div>
                <div class="cross-panel">
                  <div class="cross-panel__head">
                    <span>{{ t("home.products.overseas.panelTitle") }}</span>
                    <div class="cross-panel__head-photo" aria-hidden="true">
                      <img src="asset/images/product-overseas-team.png?v=2" alt="" width="230" height="164" />
                    </div>
                  </div>
                  <div class="cross-panel__sheet">
                    <div class="cross-panel__lanes">
                      <AppLink class="cross-panel__lane" href="/products#overseas" :aria-label="t('home.products.overseas.asia.aria')">
                        <div class="cross-panel__lane-stack">
                          <div class="cross-panel__lane-top">
                            <div class="cross-panel__lane-intro">
                              <h4 class="cross-panel__lane-title">{{ t("home.products.overseas.asia") }}</h4>
                              <p class="cross-panel__lane-desc">
                                {{ t("home.products.overseas.asia.desc") }}
                              </p>
                            </div>
                          </div>
                          <span class="cross-panel__lane-more">
                            {{ t("home.learnMore") }}
                            <img src="asset/icons/svg_eda3ad84.svg" alt="" width="18" height="18" aria-hidden="true" />
                          </span>
                        </div>
                        <div class="cross-panel__lane-visual" aria-hidden="true">
                          <img class="cross-panel__lane-art" src="asset/images/overseas-warehouse-deco.png" alt="" width="185" height="185" />
                        </div>
                      </AppLink>
                      <AppLink class="cross-panel__lane cross-panel__lane--africa" href="/products#overseas" :aria-label="t('home.products.overseas.africa.aria')">
                        <div class="cross-panel__lane-stack">
                          <div class="cross-panel__lane-top">
                            <div class="cross-panel__lane-intro">
                              <h4 class="cross-panel__lane-title">{{ t("home.products.overseas.africa") }}</h4>
                              <p class="cross-panel__lane-desc">
                                {{ t("home.products.overseas.africa.desc") }}
                              </p>
                            </div>
                          </div>
                          <span class="cross-panel__lane-more">
                            {{ t("home.learnMore") }}
                            <img src="asset/icons/svg_eda3ad84.svg" alt="" width="18" height="18" aria-hidden="true" />
                          </span>
                        </div>
                        <div class="cross-panel__lane-visual" aria-hidden="true">
                          <img class="cross-panel__lane-art" src="asset/images/overseas-asia-deco.png" alt="" width="185" height="185" />
                        </div>
                      </AppLink>
                      <AppLink class="cross-panel__lane cross-panel__lane--warehouse" href="/products#overseas" :aria-label="t('home.products.overseas.warehouse.aria')">
                        <div class="cross-panel__lane-stack">
                          <div class="cross-panel__lane-top">
                            <div class="cross-panel__lane-intro">
                              <h4 class="cross-panel__lane-title">{{ t("home.products.overseas.warehouse") }}</h4>
                              <p class="cross-panel__lane-desc">
                                {{ t("home.products.overseas.warehouse.desc") }}
                              </p>
                            </div>
                          </div>
                          <span class="cross-panel__lane-more">
                            {{ t("home.learnMore") }}
                            <img src="asset/icons/svg_eda3ad84.svg" alt="" width="18" height="18" aria-hidden="true" />
                          </span>
                        </div>
                        <div class="cross-panel__lane-visual" aria-hidden="true">
                          <img class="cross-panel__lane-art" src="asset/images/overseas-africa-deco.png" alt="" width="185" height="185" />
                        </div>
                      </AppLink>
                    </div>
                  </div>
                </div>
              </article>
              </div>
            </div>
          </div>
        </section>
</template>
