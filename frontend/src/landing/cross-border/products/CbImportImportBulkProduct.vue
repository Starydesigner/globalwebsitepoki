<script setup lang="ts">
defineOptions({ name: "CbImportImportBulkProduct" });
</script>

<template>
<div data-cb-import-product-panel="import-bulk" hidden>
          <div class="cb-stage">
            <div class="cb-stage__copy">
              <div class="cb-stage__name">
                <h2>国际进口大件</h2>
                <p class="cb-stage__kicker">大件 / 抛货 / 特殊品类</p>
              </div>
              <div class="cb-stage__position">
                <p class="cb-stage__position-text">针对家居、健身器材、3C 数码、汽车配件等，提供海运/空运/铁路多式联运 → 入境清关 → 上门派送一体化方案，含打托缠膜、木箱加固、专属车辆配送等。</p>
              </div>
              <ul class="cb-points">
                <li>海运整柜/拼柜、空运、海空联运、中欧班列等多式联运能力。</li>
                <li>大件清关专业团队，部分城市支持末端送装一体。</li>
                <li>旺季保舱保柜，保障大宗货物稳定入境。</li>
              </ul>
              <a class="cb-stage__cta" href="mailto:zhangmei@zto.com">业务咨询</a>
            </div>
            <figure class="cb-stage__photo">
              <img src="asset/images/send/consolidate.jpg" alt="国际进口大件运输" />
            </figure>
          </div>
          <section class="cb-block">
            <h3>收费标准</h3>
            <div class="cb-table-wrap">
              <table class="cb-table">
                <thead>
                  <tr><th>运输方式</th><th>计费单位</th><th>参考单价</th><th>最低起运</th></tr>
                </thead>
                <tbody>
                  <tr><td>海运拼柜（LCL）</td><td>按体积（CBM）</td><td>面议</td><td>1 CBM</td></tr>
                  <tr><td>海运整柜（FCL）</td><td>20'/40' 整柜</td><td>面议</td><td>1 整柜</td></tr>
                  <tr><td>国际空运大件</td><td>按重量分档（300kg 起）</td><td>面议</td><td>300kg</td></tr>
                  <tr><td>大件末端派送</td><td>按件 + 楼层费</td><td>面议</td><td>含上楼加价</td></tr>
                </tbody>
              </table>
            </div>
          </section>
          <section class="cb-block cb-block--scope">
            <h3>覆盖范围</h3>
            <div class="cb-table-wrap">
              <table class="cb-table">
                <thead>
                  <tr><th>始发地</th><th>运输方式</th><th>入境口岸</th></tr>
                </thead>
                <tbody>
                  <tr><td>日本 / 韩国</td><td>海运拼柜/整柜、空运、海空联运</td><td>上海、宁波、青岛、天津、大连</td></tr>
                  <tr><td>东南亚</td><td>海运整柜/拼柜、空运、中柬陆运</td><td>昆明、南宁、磨憨/磨丁口岸</td></tr>
                  <tr><td>欧美</td><td>空运 + 陆运多式联运</td><td>上海、宁波、青岛、连云港、重庆</td></tr>
                  <tr><td>澳洲 / 中东</td><td>空运</td><td>上海、广州</td></tr>
                </tbody>
              </table>
            </div>
          </section>
          <section class="cb-block cb-block--time">
            <h3>参考时效</h3>
            <div class="cb-table-wrap">
              <table class="cb-table">
                <thead>
                  <tr><th>运输方式</th><th>始发地</th><th>干线时效</th><th>全程（含清关+派送）</th></tr>
                </thead>
                <tbody>
                  <tr><td>海运拼柜</td><td>日本 / 韩国</td><td>7–10 天</td><td>15–20 天</td></tr>
                  <tr><td>海运拼柜</td><td>欧美</td><td>25–35 天</td><td>35–50 天</td></tr>
                  <tr><td>海运整柜</td><td>日本 / 韩国</td><td>5–7 天</td><td>12–18 天</td></tr>
                  <tr><td>海运整柜</td><td>东南亚</td><td>5–10 天</td><td>10–15 天</td></tr>
                  <tr><td>国际空运大件</td><td>全球</td><td>3–7 天</td><td>7–12 天</td></tr>
                </tbody>
              </table>
            </div>
          </section>
          <section class="cb-block cb-block--scope">
            <h3>增值服务</h3>
            <div class="cb-table-wrap">
              <table class="cb-table">
                <thead>
                  <tr><th>服务</th><th>服务内容</th><th>计费</th></tr>
                </thead>
                <tbody>
                  <tr><td>打托缠膜</td><td>木托盘加固 + 缠膜防潮</td><td>¥80–200/托</td></tr>
                  <tr><td>木箱定制</td><td>按尺寸定做出口木箱（熏蒸/免熏蒸）</td><td>按立方米报价</td></tr>
                  <tr><td>送装一体</td><td>配送 + 搬运 + 简单安装（指定城市）</td><td>¥100–500/件</td></tr>
                  <tr><td>开箱验货</td><td>签收前拆箱检验、拍照确认</td><td>¥10–30/件</td></tr>
                  <tr><td>大件保价</td><td>按申报价值 100% 投保，丢失全赔</td><td>申报价值 0.5%</td></tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
</template>
