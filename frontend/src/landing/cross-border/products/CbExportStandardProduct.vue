<script setup lang="ts">
defineOptions({ name: "CbExportStandardProduct" });
</script>

<template>
<div data-cb-product-panel="standard" hidden>
          <div class="cb-stage">
            <div class="cb-stage__copy">
              <div class="cb-stage__name">
                <h2>国际标快</h2>
              </div>
              <p class="cb-stage__lead">为电商客户和个人件推出的经济型门到门国际快件服务。价格优惠、时效稳定，安全有保障。</p>
              <ul class="cb-points">
                <li>门到门服务，时效快，单票清关，隔离风险，安全有保障。</li>
                <li>分重量段计费，重量越重，每公斤运费越便宜。</li>
                <li>全流程、全环节跟踪监控。自研系统保障，登录中通快递、中通国际官网可一键追踪物流轨迹。</li>
                <li>可提供 0110 正式报关服务。</li>
              </ul>
              <AppLink class="cb-stage__cta" href="/online-send#send">马上寄件</AppLink>
            </div>
            <figure class="cb-stage__photo">
              <img src="asset/images/send/southeast.jpg" alt="中通国际工作人员交接包裹" />
            </figure>
          </div>
          <section class="cb-block">
            <h3>重量计费</h3>
            <ol class="cb-steps">
              <li><span>1</span>最低计费重量 1KG，不足 1KG 按 1KG 计算。</li>
              <li><span>2</span>计费重量取体积重量与实际重量中的较大值。体积重量 = 长(CM) × 宽(CM) × 高(CM) / 5000。</li>
            </ol>
          </section>
          <section class="cb-block cb-block--scope">
            <h3>服务范围与运输方式</h3>
            <div class="cb-table-wrap">
              <table class="cb-table cb-table--scope-region">
                <thead>
                  <tr><th>区域</th><th>国家或地区</th><th>运输方式</th></tr>
                </thead>
                <tbody>
                  <tr><td>北美</td><td>美国、加拿大</td><td>空运、海运</td></tr>
                  <tr><td>亚洲</td><td>柬埔寨</td><td>陆运、空运</td></tr>
                  <tr><td>亚洲</td><td>泰国、越南</td><td>陆运、海运</td></tr>
                  <tr><td>亚洲</td><td>中国香港、中国澳门、老挝</td><td>陆运</td></tr>
                  <tr><td>亚洲</td><td>中国台湾、日本、韩国、新加坡、马来西亚、印度尼西亚</td><td>空运、海运</td></tr>
                  <tr><td>欧洲</td><td>英国、德国、法国、意大利、西班牙、波兰、葡萄牙、比利时、荷兰、奥地利、捷克、斯洛伐克、匈牙利、芬兰、克罗地亚、立陶宛、卢森堡、罗马尼亚、丹麦、瑞典、爱尔兰、希腊、爱沙尼亚、保加利亚</td><td>空运、陆运、海运</td></tr>
                  <tr><td>大洋洲</td><td>澳大利亚、新西兰</td><td>空运、海运</td></tr>
                  <tr><td>非洲</td><td>尼日利亚、加纳、乌干达、肯尼亚</td><td>空运</td></tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
</template>
