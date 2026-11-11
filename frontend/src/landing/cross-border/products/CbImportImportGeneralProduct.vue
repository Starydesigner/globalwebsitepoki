<script setup lang="ts">
defineOptions({ name: "CbImportImportGeneralProduct" });
</script>

<template>
<div data-cb-import-product-panel="import-general" hidden>
          <div class="cb-stage">
            <div class="cb-stage__copy">
              <div class="cb-stage__name">
                <h2>国际进口</h2>
                <p class="cb-stage__kicker">跨境综合物流（B2C 1210 / 9610）</p>
              </div>
              <div class="cb-stage__position">
                <p class="cb-stage__position-text">为跨境电商平台、品牌方、海外仓商提供境外揽收 → 国际干线 → 入境清关 → 末端配送全链路服务，覆盖 9610 直邮、1210 保税备货、一般贸易 B2B 等通关模式。</p>
              </div>
              <ul class="cb-points">
                <li>全球网络覆盖日本、韩国、中国香港、东南亚等重点区域。</li>
                <li>多口岸入境：10+ 保税仓、12+ 直邮口岸，自有清关团队与系统直连。</li>
                <li>一票到底，全程可追踪；典型场景：日韩港及东南亚、老挝 → 中国大陆。</li>
              </ul>
              <a class="cb-stage__cta" href="mailto:zhangmei@zto.com">业务咨询</a>
            </div>
            <figure class="cb-stage__photo">
              <img src="asset/images/send/import.jpg" alt="国际进口干线运输" />
            </figure>
          </div>
          <section class="cb-block">
            <h3>收费标准</h3>
            <ol class="cb-steps">
              <li><span>1</span>计费重量取体积重量与实际重量较大值。体积重量（kg）= 长（cm）× 宽（cm）× 高（cm）÷ 5,000。</li>
              <li><span>2</span>20kg 以下快件以 0.5kg 为计费单位，不足 0.5kg 进位至下一档；20kg 及以上以 1kg 为计费单位，不足 1kg 进位至下一档。</li>
              <li><span>3</span>所示价格均不包含任何政府税项。</li>
            </ol>
          </section>
          <section class="cb-block cb-block--scope">
            <h3>覆盖范围</h3>
            <div class="cb-table-wrap">
              <table class="cb-table">
                <thead>
                  <tr><th>区域</th><th>始发地</th><th>入境口岸（境内）</th></tr>
                </thead>
                <tbody>
                  <tr><td>东亚</td><td>日本、韩国、中国香港、中国澳门、中国台湾</td><td>上海、大连、青岛、宁波、广州、深圳、郑州、石家庄</td></tr>
                  <tr><td>东南亚</td><td>泰国、越南、马来西亚、新加坡、柬埔寨、老挝</td><td>昆明、南宁、广州、海口</td></tr>
                  <tr><td>欧美澳新</td><td>美国、加拿大、英国、德国、法国、意大利、西班牙、澳大利亚、新西兰等</td><td>上海、北京、广州（可扩展）</td></tr>
                </tbody>
              </table>
            </div>
          </section>
          <section class="cb-block cb-block--time">
            <h3>参考时效</h3>
            <div class="cb-table-wrap">
              <table class="cb-table">
                <thead>
                  <tr><th>线路</th><th>干线</th><th>清关</th><th>末端派送</th><th>全程</th></tr>
                </thead>
                <tbody>
                  <tr><td>日本 → 大陆</td><td>2–3 天</td><td>1–2 天</td><td>1–3 天</td><td>5–8 天</td></tr>
                  <tr><td>韩国 → 大陆</td><td>2–3 天</td><td>1–2 天</td><td>1–3 天</td><td>5–8 天</td></tr>
                  <tr><td>中国香港 → 大陆</td><td>1–2 天</td><td>0.5–1 天</td><td>1–3 天</td><td>3–5 天</td></tr>
                  <tr><td>东南亚 → 大陆</td><td>3–5 天</td><td>1–2 天</td><td>1–3 天</td><td>6–10 天</td></tr>
                  <tr><td>欧美 → 大陆</td><td>7–12 天</td><td>2–3 天</td><td>1–3 天</td><td>10–18 天</td></tr>
                </tbody>
              </table>
            </div>
            <p class="cb-note">因始发地与目的地存在差异，具体时效以实际业务为准。</p>
          </section>
          <section class="cb-block cb-block--scope">
            <h3>增值服务</h3>
            <div class="cb-table-wrap">
              <table class="cb-table">
                <thead>
                  <tr><th>服务</th><th>服务内容</th><th>计费</th></tr>
                </thead>
                <tbody>
                  <tr><td>保价服务</td><td>按申报价值投保，最高 5 万元/票；丢失/损毁按保价赔付</td><td>保价金额 3‰</td></tr>
                  <tr><td>签收回单</td><td>签收后回传签收凭证原件/PDF</td><td>5–10 元/票</td></tr>
                  <tr><td>仓储中转</td><td>境外仓集货、保税仓暂存、贴标换箱</td><td>按件/按日</td></tr>
                  <tr><td>退货逆向</td><td>境内 → 境外退货集运</td><td>7–15 天，按重量分档</td></tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
</template>
