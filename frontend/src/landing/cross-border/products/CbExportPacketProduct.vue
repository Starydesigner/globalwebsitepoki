<script setup lang="ts">
defineOptions({ name: "CbExportPacketProduct" });
</script>

<template>
<div data-cb-product-panel="packet" hidden>
          <div class="cb-stage">
            <div class="cb-stage__copy">
              <div class="cb-stage__name">
                <h2>电商小包</h2>
              </div>
              <p class="cb-stage__lead">面向跨境 B2C 卖家的空运小包。按克计费，覆盖欧洲、北美、非洲、东南亚等地，适合轻小件。</p>
              <ul class="cb-points">
                <li>按克计费，轻小件成本更低。</li>
                <li>便捷清关，运力充足，时效可控。</li>
                <li>自研系统保障，登录中通快递、中通国际官网可一键追踪物流轨迹。</li>
                <li>可承接符合航空标准的内置锂电池产品。</li>
              </ul>
              <AppLink class="cb-stage__cta" href="/online-send#send">马上寄件</AppLink>
            </div>
            <figure class="cb-stage__photo">
              <img src="asset/images/send/personal.jpg" alt="中通国际快递员递出包裹" />
            </figure>
          </div>
          <section class="cb-block cb-block--size">
            <h3>重量、尺寸与时效</h3>
            <div class="cb-table-wrap">
              <table class="cb-table cb-table--parcel-spec">
                <thead>
                  <tr><th>国家或地区</th><th>重量</th><th>尺寸</th><th>时效</th></tr>
                </thead>
                <tbody>
                  <tr><td>美国</td><td>0–20KG</td><td>55×40×35CM 以内，长+宽+高不超过 130CM，最小 10×15CM</td><td>6–15 个工作日</td></tr>
                  <tr><td>英国</td><td>0–20KG</td><td>—</td><td>6–9 个工作日</td></tr>
                  <tr><td>加拿大</td><td>0–5KG</td><td>—</td><td>10–15 个工作日</td></tr>
                  <tr><td>德国</td><td>0–20KG</td><td>—</td><td>7–10 个工作日</td></tr>
                  <tr><td>法国</td><td>0–20KG</td><td>—</td><td>6–9 个工作日</td></tr>
                  <tr><td>意大利、西班牙、波兰、葡萄牙、比利时、荷兰、奥地利、捷克、斯洛伐克、匈牙利、克罗地亚、卢森堡、罗马尼亚、丹麦、瑞典、爱尔兰、希腊、保加利亚、斯洛文尼亚</td><td>0–2KG</td><td>—</td><td>7–18 个工作日</td></tr>
                  <tr><td>芬兰、立陶宛、爱沙尼亚、塞浦路斯、拉脱维亚、马耳他、瑞士、挪威</td><td>—</td><td>—</td><td>12–18 个工作日</td></tr>
                  <tr><td>尼日利亚、加纳、乌干达、肯尼亚、摩洛哥、巴基斯坦、坦桑尼亚、卢旺达、安哥拉、塞内加尔、毛里求斯、留尼汪、马达加斯加、塞舌尔、赞比亚、阿塞拜疆</td><td>0–20KG</td><td>—</td><td>9–14 个工作日</td></tr>
                  <tr><td>澳大利亚</td><td>0–20KG</td><td>长+宽+高小于 140CM，最长边小于 105CM</td><td>4–7 个工作日</td></tr>
                  <tr><td>新西兰</td><td>0–25KG</td><td>最长边不超过 150CM</td><td>5–14 个自然日</td></tr>
                  <tr><td>日本</td><td>0–5KG</td><td>三边之和不超过 160CM，最小长 20CM、宽 11CM、厚 1CM</td><td>4–6 个工作日</td></tr>
                </tbody>
              </table>
            </div>
          </section>
          <section class="cb-block cb-block--size">
            <h3>重量尺寸说明</h3>
            <p class="cb-note">体积重量大于实际重量时按体积重量计费。标准包裹抛重 = 长 × 宽 × 高 / 5000，专线按 6000。凸起或不规则包裹按实测最长边计算，纸箱厚度计入外箱边长。</p>
          </section>
        </div>
</template>
