<script setup lang="ts">
import { computed } from "vue";
import { useProductLandingActiveTab } from "@/landing/productLandingTab";
import OverseasAsiaPanel from "./OverseasAsiaPanel.vue";

defineOptions({ name: "OverseasLocalBody" });

const activeTab = useProductLandingActiveTab();
const showAfrica = computed(() => activeTab.value === "africa");
const showWarehouse = computed(() => activeTab.value === "warehouse");
</script>

<template>
  <OverseasAsiaPanel />
  <section
    v-show="showAfrica"
    data-pl-panel="africa"
    role="tabpanel"
    class="cb-region-flat ol-asia"
    :aria-hidden="showAfrica ? 'false' : 'true'"
  >
    <article class="ol-asia-split">
      <figure class="ol-asia-split__media">
        <img src="asset/images/product-overseas-africa-cover.png" alt="" width="2048" height="870" loading="lazy" />
      </figure>
      <div class="ol-asia-split__copy">
        <span class="ol-asia-split__mark" aria-hidden="true" />
        <h2 class="ol-asia-split__title">非洲</h2>
        <p class="ol-asia-split__text">
          海外合资网络覆盖非洲（南非、尼日利亚、肯尼亚、乌干达、加纳、摩洛哥、埃及、坦桑尼亚、安哥拉、毛里求斯、留尼汪、塞舌尔、马达加斯加、塞内加尔、卢旺达）、中亚（哈萨克斯坦）、南亚（巴基斯坦）等新兴市场，可为客户提供跨境运输（空海运）、快递、仓储、商业等一体化综合物流服务。
        </p>
      </div>
    </article>
  </section>
  <section
    v-show="showWarehouse"
    data-pl-panel="warehouse"
    role="tabpanel"
    class="cb-region-flat ol-asia"
    :aria-hidden="showWarehouse ? 'false' : 'true'"
  >
    <article class="ol-asia-split ol-asia-split--kr">
      <figure class="ol-asia-split__media">
        <img src="asset/images/product-overseas-warehouse-cover.png" alt="" width="2048" height="870" loading="lazy" />
      </figure>
      <div class="ol-asia-split__copy">
        <span class="ol-asia-split__mark" aria-hidden="true" />
        <h2 class="ol-asia-split__title">海外仓</h2>
        <p class="ol-asia-split__text">
          专为跨境电商打造的海外仓一件代发与仓储配送服务，提供一站式物流解决方案。支持多平台订单无缝对接，全面提升海外本土订单的履约能力，助力卖家实现高效、稳定的本地化配送。
        </p>
        <div class="ol-asia-split__blocks">
          <section class="ol-asia-split__block">
            <h3>产品优势</h3>
            <ul class="ol-asia-split__list">
              <li>智能数字平台，全链路实时可视</li>
              <li>订单及时响应，当天出库</li>
            </ul>
          </section>
        </div>
      </div>
    </article>
    <section class="cb-block ol-asia-extra">
      <h3>覆盖国家</h3>
      <div class="cb-table-wrap">
        <table class="cb-table">
          <thead>
            <tr><th>国家</th><th>仓库</th></tr>
          </thead>
          <tbody>
            <tr><td>越南</td><td>胡志明-隆安仓、河内-北宁仓</td></tr>
            <tr><td>泰国</td><td>曼谷-北榄仓</td></tr>
            <tr><td>柬埔寨</td><td>金边仓</td></tr>
            <tr><td>马来</td><td>吉隆坡-巴生仓</td></tr>
            <tr><td>印度尼西亚</td><td>雅加达-马伦达仓、雅加达-坦格朗仓、泗水-泗水仓</td></tr>
            <tr><td>菲律宾</td><td>马尼拉仓</td></tr>
            <tr><td>美国</td><td>洛杉矶仓、新泽西仓、芝加哥仓、休斯敦仓、亚特兰大仓、夏洛特仓</td></tr>
            <tr><td>墨西哥</td><td>蒙特雷仓</td></tr>
            <tr><td>澳大利亚</td><td>墨尔本1仓、墨尔本2仓</td></tr>
            <tr><td>新西兰</td><td>奥克兰1仓、奥克兰2仓</td></tr>
            <tr><td>日本</td><td>大阪仓1仓、大阪仓2仓</td></tr>
            <tr><td>英国</td><td>伦敦仓</td></tr>
            <tr><td>德国</td><td>萨克森仓</td></tr>
            <tr><td>韩国</td><td>釜山仓</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  </section>
</template>

<style src="@repo/css/pages/overseas-asia.css"></style>
