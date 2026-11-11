<script setup lang="ts">
defineOptions({ name: "SolutionBody" });
</script>

<template>
<main class="cb-wrap solution-page">
      <section class="cb-block">
        <div class="cb-stage">
          <div class="cb-stage__copy">
            <div class="cb-stage__name"><h2>跨境解决方案</h2></div>
            <p class="cb-stage__position-text">面向进出口电商、品牌与平台客户，提供从方案咨询、关务合规、干线运输到末端派送的一体化跨境物流解决方案，可按行业与线路灵活组合中通国际产品能力。</p>
            <ul class="cb-points">
              <li>进出口双向：覆盖跨境进口仓配、出口专线小包及大货线路。</li>
              <li>关务与合规：9610 / 1210 / 一般贸易等多模式通关支持。</li>
              <li>本土衔接：港澳、亚洲、非洲本土网络与海外仓协同履约。</li>
            </ul>
          </div>
          <figure class="cb-stage__photo"><img src="asset/images/send/export-biz.png" alt="" /></figure>
        </div>
      </section>
      <section class="cb-block cb-solution-hotline">
        <h3>咨询与下单</h3>
        <div class="cb-solution-cards">
          <article class="cb-solution-card">
            <p class="cb-solution-card__label">全国统一热线</p>
            <p class="cb-solution-card__value"><a href="tel:02159804505">021-59804505</a></p>
          </article>
          <article class="cb-solution-card">
            <p class="cb-solution-card__label">语音转国际查询</p>
            <p class="cb-solution-card__value"><a href="tel:95311">95311</a></p>
            <p class="cb-solution-card__hint">按语音提示选择国际查询</p>
          </article>
          <article class="cb-solution-card">
            <p class="cb-solution-card__label">在线寄件</p>
            <p class="cb-solution-card__value"><AppLink class="cb-stage__cta" href="/online-send#send">前往下单</AppLink></p>
          </article>
        </div>
      </section>

    </main>
</template>
