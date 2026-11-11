<script setup lang="ts">
import MgButton from "@/components/common/MgButton.vue";

defineOptions({ name: "RatesQueryResult" });
</script>

<template>
  <div class="rate-result" hidden>
    <div class="rate-result__head">
      <strong>查询结果</strong>
      <span>注：费用具体以包裹揽收到仓库后称重为准</span>
    </div>
    <div class="rate-route">
      <span class="rate-place">
        <span class="rate-pin"><img src="asset/rates/pin-from.svg" alt="" /><span>寄</span></span>
        <span data-rate-from>中国大陆-广东省-深圳市</span>
      </span>
      <img class="rate-route__line" src="asset/rates/route.svg" alt="" />
      <span class="rate-place">
        <span class="rate-pin"><img src="asset/rates/pin-to.svg" alt="" /><span>收</span></span>
        <span data-rate-to>德国</span>
      </span>
    </div>
    <article class="rate-product">
      <div class="rate-product__name"><span>澳大利亚标快</span><em class="rate-badge">荐</em></div>
      <div class="rate-product__row">
        <div class="rate-meta"><span>物品类型</span><strong data-rate-goods>普货</strong></div>
        <div class="rate-meta">
          <span class="rate-meta__label">计费重<img src="asset/rates/info.svg" alt="" /></span><strong data-rate-weight>10.00kg</strong>
        </div>
        <div class="rate-meta"><span>预计送达时间</span><strong class="is-emphasis" data-rate-eta>最快2026-08-31送达</strong></div>
        <div class="rate-meta"><span>个人寄件价格</span><strong class="rate-price">CNY 100.89</strong></div>
        <div class="rate-meta"><span>企业寄件价格</span><strong class="rate-price">CNY 100.89</strong></div>
      </div>
    </article>
    <article class="rate-product">
      <div class="rate-product__name"><span>澳大利亚标快</span></div>
      <div class="rate-product__row">
        <div class="rate-meta"><span>物品类型</span><strong data-rate-goods>普货</strong></div>
        <div class="rate-meta">
          <span class="rate-meta__label">计费重<img src="asset/rates/info.svg" alt="" /></span><strong data-rate-weight>10.00kg</strong>
        </div>
        <div class="rate-meta"><span>预计送达时间</span><strong class="is-emphasis" data-rate-eta>最快2026-08-31送达</strong></div>
        <div class="rate-meta"><span>个人寄件价格</span><strong class="rate-price">CNY 100.89</strong></div>
      </div>
    </article>
    <AppLink class="rate-go" href="/online-send#send">去寄件</AppLink>
  </div>
</template>
