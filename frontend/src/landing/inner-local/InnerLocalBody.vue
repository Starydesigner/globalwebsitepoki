<script setup lang="ts">
import { computed } from "vue";
import { useProductLandingActiveTab } from "@/landing/productLandingTab";
import HkPeripheralWarehouseQuery from "./HkPeripheralWarehouseQuery.vue";

defineOptions({ name: "InnerLocalBody" });

const activeTab = useProductLandingActiveTab();
const showHk = computed(() => activeTab.value === "hk");
const showMo = computed(() => activeTab.value === "mo");
</script>

<template>
<section
  v-show="showHk"
  data-pl-panel="hk"
  role="tabpanel"
  class="cb-region-flat"
  :aria-hidden="showHk ? 'false' : 'true'"
>
        <div class="cb-local-services">
          <div class="cb-block cb-block--section-head">
            <h3>中国香港本地服务</h3>
          </div>
          <div class="product-service-cards product-overseas-cards--row-1">
          <article class="product-service-card is-visible" id="hk-delivery">
            <div class="product-service-card__media">
              <img src="asset/images/product-hk-delivery.jpg" alt="" width="800" height="600" loading="lazy" />
            </div>
            <div class="product-service-card__body">
              <h3>
                <img
                  class="product-service-card__scene-icon"
                  src="asset/images/icon-hk-local-delivery.svg"
                  alt=""
                  width="32"
                  height="32"
                  loading="lazy"
                />
                本土派送
              </h3>
              <p class="product-service-card__desc">
                主要经营国际快件及香港本地派送，共有自提网点578个，寄件网点192个，派送服务网络覆盖香港大部分地区。
              </p>
              <div class="product-service-card__timing">
                <p class="product-service-card__timing-label">时效:</p>
                <p class="product-service-card__timing-value">95%的48H派送签收率</p>
              </div>
            </div>
          </article>
          <article class="product-service-card is-visible" id="hk-pickup">
            <div class="product-service-card__media">
              <img src="asset/images/product-hk-pickup.jpg" alt="" width="800" height="600" loading="lazy" />
            </div>
            <div class="product-service-card__body">
              <h3>
                <img
                  class="product-service-card__scene-icon"
                  src="asset/images/icon-hk-pickup-point.svg"
                  alt=""
                  width="32"
                  height="32"
                  loading="lazy"
                />
                自提点
              </h3>
              <p class="product-service-card__desc">
                只需选择所需自提点，快件到达自提点后就会发送包含取件密码的短讯给收件人，提醒收件人取件及保障快件安全。自提取货较上门派送运费便宜，取件时间亦更弹性。
              </p>
              <div class="product-service-card__timing">
                <p class="product-service-card__timing-label">时效:</p>
                <p class="product-service-card__timing-value">于T+0收到快件，T+1送达自提点(如T+1为香港公众假期将顺延至下一个工作日)</p>
              </div>
            </div>
          </article>
          <article class="product-service-card is-visible" id="hk-locker">
            <div class="product-service-card__media">
              <img src="asset/images/product-hk-locker.jpg" alt="" width="800" height="600" loading="lazy" />
            </div>
            <div class="product-service-card__body">
              <h3>
                <img
                  class="product-service-card__scene-icon"
                  src="asset/images/icon-hk-parcel-locker.svg"
                  alt=""
                  width="32"
                  height="32"
                  loading="lazy"
                />
                自提柜
              </h3>
              <p class="product-service-card__desc">
                只需选择所需自提柜，快件到达自提柜后就会发送包含取件密码的短讯给收件人，提醒收件人取件及保障快件安全。自提取货较上门派送运费便宜，取件时间亦更弹性，部分自提柜地点更可24小时取件服务。
              </p>
              <div class="product-service-card__timing">
                <p class="product-service-card__timing-label">时效:</p>
                <p class="product-service-card__timing-value">于T+0收到快件，T+1送达自提点(如T+1为香港公众假期将顺延至下一个工作日)</p>
              </div>
            </div>
          </article>
          </div>
        </div>

        <HkPeripheralWarehouseQuery />
      </section>
      <section
        v-show="showMo"
        data-pl-panel="mo"
        role="tabpanel"
        class="cb-region-flat"
        :aria-hidden="showMo ? 'false' : 'true'"
      >
        <div class="cb-local-services">
          <div class="cb-block cb-block--section-head">
            <h3>中国澳门本地服务</h3>
          </div>
          <article class="cb-stage cb-stage--mo-local is-visible" id="mo-delivery">
            <div class="cb-stage__copy">
              <div class="cb-mo-local-list">
                <div class="cb-mo-local-list__item">
                  <h3>本土派送</h3>
                  <p>· 可提供宅配服务</p>
                </div>
                <div class="cb-mo-local-list__item">
                  <h3>干线运力</h3>
                  <p>· 珠海直送中国澳门，珠海仓出库后第二天派送签收</p>
                </div>
                <div class="cb-mo-local-list__item">
                  <h3>平均时效</h3>
                  <p>· 2–3天</p>
                </div>
              </div>
            </div>
            <figure class="cb-stage__photo">
              <img src="asset/images/product-mo-local.jpg" alt="" width="1024" height="632" loading="lazy" />
            </figure>
          </article>
        </div>
      </section>
</template>
