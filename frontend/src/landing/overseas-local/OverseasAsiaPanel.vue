<script setup lang="ts">
import { computed } from "vue";
import { useProductLandingActiveTab } from "@/landing/productLandingTab";

defineOptions({ name: "OverseasAsiaPanel" });

const activeTab = useProductLandingActiveTab();
const showAsia = computed(() => activeTab.value === "asia");
</script>

<template>
  <section
    v-show="showAsia"
    data-pl-panel="asia"
    role="tabpanel"
    class="cb-region-flat ol-asia"
    :aria-hidden="showAsia ? 'false' : 'true'"
  >
    <article class="ol-asia-split">
      <figure class="ol-asia-split__media">
        <img src="asset/images/product-overseas-kh.png" alt="" width="2048" height="870" loading="lazy" />
      </figure>
      <div class="ol-asia-split__copy">
        <span class="ol-asia-split__mark" aria-hidden="true" />
        <h2 class="ol-asia-split__title">柬埔寨</h2>
        <p class="ol-asia-split__text">
          柬埔寨中通成立于2017年5月，在金边、西港设有两大分拨中心，仓库面积10000余平米，自营及加盟网点近400家，服务覆盖柬埔寨全境。当前柬埔寨金边市同城配送最快3小时内达，市外配送最快次日达。
        </p>
      </div>
    </article>

    <article class="ol-asia-split">
      <figure class="ol-asia-split__media">
        <img src="asset/images/product-overseas-la.png" alt="" width="2048" height="870" loading="lazy" />
      </figure>
      <div class="ol-asia-split__copy">
        <span class="ol-asia-split__mark" aria-hidden="true" />
        <h2 class="ol-asia-split__title">老挝</h2>
        <p class="ol-asia-split__text">
          老挝中通于2017年开始本土运营，目前设有2个分拨中心，总面积接近10000平米，服务网点230+家，覆盖老挝全境，可为客户提供国际物流、国际包裹、跨境电商进出口、老挝国内传统快递物流与电子商务以及淘宝代购、进出口退税、清关等服务。
        </p>
      </div>
    </article>

    <article class="ol-asia-split ol-asia-split--kr">
      <figure class="ol-asia-split__media">
        <img src="asset/images/product-overseas-kr.png" alt="" width="2048" height="870" loading="lazy" />
      </figure>
      <div class="ol-asia-split__copy">
        <span class="ol-asia-split__mark" aria-hidden="true" />
        <h2 class="ol-asia-split__title">韩国</h2>
        <div class="ol-asia-split__blocks">
          <section class="ol-asia-split__block">
            <h3>跨境进口</h3>
            <p>
              可提供韩国至中国门到门的海运、空运快递服务，全程物流轨迹可追踪，可运输品类较多，时效稳定，涵盖电商平台企业、代购、留学生、网店店主、品牌方等客户群。
            </p>
            <p class="ol-asia-split__meta"><strong>时效</strong> 3-7日</p>
          </section>
          <section class="ol-asia-split__block">
            <h3>本土仓储</h3>
            <p>
              为淘宝、微商、电商平台企业、网店、代购等客户提供仓储服务，解决了他们提前采购却无法存储的问题。
            </p>
          </section>
          <p class="ol-asia-split__meta ol-asia-split__meta--foot">
            <strong>咨询热线</strong> 010-5729-1681
          </p>
        </div>
      </div>
    </article>
  </section>
</template>

<style src="@repo/css/pages/overseas-asia.css"></style>
