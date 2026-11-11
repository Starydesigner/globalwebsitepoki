<script setup lang="ts">
defineOptions({ name: "CbExportCargoProduct" });
</script>

<template>
<div data-cb-product-panel="cargo" hidden>
          <div class="cb-stage">
            <div class="cb-stage__copy">
              <div class="cb-stage__name">
                <h2>国际大货</h2>
              </div>
              <p class="cb-stage__lead">专为跨境电商大货量客户定制。匹配大宗货物计费，支持一票多件，末端卡车派送。</p>
              <ul class="cb-points">
                <li>按方数计费，末端开车派送，整体价格经济实惠。</li>
                <li>全程提供物流追踪，货物动态实时可视，帮助客户以更低成本完成稳定交付。</li>
              </ul>
              <AppLink class="cb-stage__cta" href="/online-send#send">马上寄件</AppLink>
            </div>
            <figure class="cb-stage__photo">
              <img src="asset/images/send/import.jpg" alt="货轮装载集装箱" />
            </figure>
          </div>
          <section class="cb-block cb-block--scope">
            <h3>服务范围与运输方式</h3>
            <div class="cb-table-wrap">
              <table class="cb-table">
                <thead>
                  <tr><th>国家或地区</th><th>运输方式</th></tr>
                </thead>
                <tbody>
                  <tr><td>美国</td><td>海运</td></tr>
                  <tr><td>英国</td><td>海运、陆运、铁路</td></tr>
                  <tr><td>德国</td><td>海运、陆运、铁路</td></tr>
                  <tr><td>法国</td><td>海运、陆运、铁路</td></tr>
                  <tr><td>澳大利亚</td><td>海运</td></tr>
                  <tr><td>新西兰</td><td>海运</td></tr>
                  <tr><td>泰国</td><td>陆运、海运</td></tr>
                  <tr><td>越南</td><td>陆运、海运</td></tr>
                  <tr><td>马来西亚</td><td>海运</td></tr>
                  <tr><td>新加坡</td><td>海运</td></tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
</template>
