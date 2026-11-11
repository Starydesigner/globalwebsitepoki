<script setup lang="ts">
defineOptions({ name: "CbExportConsolidateProduct" });
</script>

<template>
<div data-cb-product-panel="consolidate" hidden>
          <div class="cb-stage">
            <div class="cb-stage__copy">
              <div class="cb-stage__name">
                <h2>国际集运</h2>
              </div>
              <ul class="cb-points">
                <li>快递先寄到国内仓库后合并打包，一次性寄到目的国。</li>
                <li>节省运费，更省心。全流程、全环节跟踪监控；自研系统保障，登录中通快递、中通国际官网可一键追踪物流轨迹。</li>
              </ul>
              <AppLink class="cb-stage__cta" href="/online-send#send">马上寄件</AppLink>
            </div>
            <figure class="cb-stage__photo">
              <img src="asset/images/send/consolidate.jpg" alt="港口集装箱与货轮" />
            </figure>
          </div>
          <section class="cb-block">
            <h3>重量计费</h3>
            <ol class="cb-steps">
              <li><span>1</span>最低计费重量 1KG，不足 1KG 按 1KG 计算。</li>
              <li><span>2</span>计费重量取体积重量与实际重量中的较大值。体积重量 = 长(CM) × 宽(CM) × 高(CM) / 6000。</li>
            </ol>
          </section>
          <section class="cb-block cb-block--time">
            <h3>参考时效</h3>
            <div class="cb-table-wrap">
              <table class="cb-table cb-table--consolidate-time">
                <thead>
                  <tr><th>集运仓</th><th>国家或地区</th><th>参考时效</th></tr>
                </thead>
                <tbody>
                  <tr><td>上海仓</td><td>中国台湾</td><td>2–5 个工作日</td></tr>
                  <tr><td rowspan="9">广州仓</td><td>德国</td><td>卡航 20–30 个工作日 / 空运 6–12 个工作日</td></tr>
                  <tr><td>法国</td><td>卡航 20–30 个工作日 / 空运 6–12 个工作日</td></tr>
                  <tr><td>斯里兰卡</td><td>5–7 个工作日</td></tr>
                  <tr><td>加拿大</td><td>8–12 个工作日</td></tr>
                  <tr><td>英国</td><td>6–12 个工作日</td></tr>
                  <tr><td>泰国</td><td>8–11 个工作日</td></tr>
                  <tr><td>越南</td><td>5–9 个工作日</td></tr>
                  <tr><td>柬埔寨</td><td>9–11 个工作日</td></tr>
                  <tr><td>老挝</td><td>9–11 个工作日</td></tr>
                  <tr><td rowspan="5">深圳仓</td><td>马来西亚</td><td>空运 6–12 个工作日 / 海运 20–30 个工作日</td></tr>
                  <tr><td>新西兰</td><td>5–7 个工作日</td></tr>
                  <tr><td>澳大利亚</td><td>5–7 个工作日</td></tr>
                  <tr><td>新加坡</td><td>5–8 个工作日</td></tr>
                  <tr><td>中国香港</td><td>1–3 个工作日</td></tr>
                  <tr><td>青岛仓</td><td>韩国</td><td>3–6 个工作日</td></tr>
                </tbody>
              </table>
            </div>
          </section>
          <section class="cb-block cb-block--size">
            <h3>重量尺寸限制</h3>
            <div class="cb-table-wrap">
              <table class="cb-table">
                <thead>
                  <tr><th>国家或地区</th><th>重量尺寸限制</th></tr>
                </thead>
                <tbody>
                  <tr><td>德国</td><td>单个合单包裹不超过计费重 30KG。最长限制 170CM，围长（1 长 + 2 宽 + 2 高）小于 300CM。合单包裹申报金额限制 150 欧元以下。</td></tr>
                  <tr><td>法国</td><td>单个合单包裹计费重 30KG 以内。长 + 2×宽 + 2×高不超过 350CM，最长边不超过 200CM。合单包裹申报金额限制 150 欧元以下。</td></tr>
                  <tr><td>斯里兰卡</td><td>单个合单包裹不超过计费重 30KG。最长限制 170CM，围长（1 长 + 2 宽 + 2 高）小于 300CM。</td></tr>
                  <tr><td>加拿大</td><td>单个合包包裹不超过实重 20KG。最长限制 100CM，次边 76CM 以内，围长小于 300CM。合单包裹申报金额限制 25 美元以下。</td></tr>
                  <tr><td>英国</td><td>单个合单包裹不超过实重 20KG。最长边小于 60CM，次长边小于 45CM。</td></tr>
                  <tr><td>老挝</td><td>单边边长小于 150CM，不限制合包数量。</td></tr>
                  <tr><td>马来西亚</td><td>空运：最长边不超过 150CM，长 + 宽 + 高不超过 250CM，单件重量限制 50KG。海运：单件限重 500KG，单边不超过 2 米，长 + 宽 + 高不超过 5 米。</td></tr>
                  <tr><td>新西兰</td><td>最长边不超过 150CM，仅接受一票一件，单件收费重限制 25KG。</td></tr>
                  <tr><td>澳大利亚</td><td>单件限实重 20KG，最长边不超过 100CM。</td></tr>
                  <tr><td>新加坡</td><td>最长边不超过 150CM，长 + 宽 + 高不超过 300CM，单件重量限制 40KG。</td></tr>
                  <tr><td>中国香港</td><td>最长边不超过 150CM，长 + 宽 + 高不超过 250CM，单件重量限制 50KG。</td></tr>
                </tbody>
              </table>
            </div>
          </section>
          <section class="cb-block cb-block--size">
            <h3>重量尺寸说明</h3>
            <p class="cb-note">国际快递按实际重量和体积重量计费。体积重量大于实际重量时，按体积重量计费（抛重）。</p>
            <div class="cb-measures">
              <article class="cb-measure">
                <h4>标准包裹</h4>
                <p>规则纸箱按长宽高计算。抛重 = 长 × 宽 × 高 / 5000，专线按 6000 计算。单位为厘米。</p>
              </article>
              <article class="cb-measure">
                <h4>曲面包裹</h4>
                <p>箱子因挤压凸起时，按实际最长边计算。例如箱子实重 1KG，标称 20×20×20CM，凸起后测得 20×20×23CM，计费重量为 20×20×23 / 5000 = 1.84KG。</p>
              </article>
              <article class="cb-measure">
                <h4>不规则包裹</h4>
                <p>无法方形打包时，按最长边计算抛重。纸箱外箱边长含厚度，标称 20×20×20 时按外箱边长核算。</p>
              </article>
            </div>
          </section>
          <section class="cb-block cb-block--ban">
            <h3>拒收</h3>
            <ul class="cb-prohibit">
              <li class="cb-prohibit__item">
                <span class="cb-prohibit__icon" aria-hidden="true">
                  <img src="asset/icons/prohibit/flammable.png?v=4" alt="" width="56" height="56" decoding="async" />
                </span>
                <div class="cb-prohibit__copy">
                  <p class="cb-prohibit__title">含酒精物品</p>
                  <p class="cb-prohibit__desc">任何含酒精的物品</p>
                </div>
              </li>
              <li class="cb-prohibit__item">
                <span class="cb-prohibit__icon" aria-hidden="true">
                  <img src="asset/icons/prohibit/food.png?v=4" alt="" width="56" height="56" decoding="async" />
                </span>
                <div class="cb-prohibit__copy">
                  <p class="cb-prohibit__title">植物、种子与生鲜</p>
                  <p class="cb-prohibit__desc">任何植物、种子，非真空包装的肉类食品、海鲜等生鲜</p>
                </div>
              </li>
              <li class="cb-prohibit__item">
                <span class="cb-prohibit__icon" aria-hidden="true">
                  <img src="asset/icons/prohibit/chemical.png?v=4" alt="" width="56" height="56" decoding="async" />
                </span>
                <div class="cb-prohibit__copy">
                  <p class="cb-prohibit__title">不明粉末与液体</p>
                  <p class="cb-prohibit__desc">1. 任何白色粉末或不明粉末<br />2. 任何不明液体</p>
                </div>
              </li>
              <li class="cb-prohibit__item">
                <span class="cb-prohibit__icon" aria-hidden="true">
                  <img src="asset/icons/prohibit/pressure.png?v=4" alt="" width="56" height="56" decoding="async" />
                </span>
                <div class="cb-prohibit__copy">
                  <p class="cb-prohibit__title">气压型物品</p>
                  <p class="cb-prohibit__desc">如压缩气体、干冰、灭火器、蓄气筒、带压缩装置的喷雾器</p>
                </div>
              </li>
              <li class="cb-prohibit__item">
                <span class="cb-prohibit__icon" aria-hidden="true">
                  <img src="asset/icons/prohibit/counterfeit.png?v=4" alt="" width="56" height="56" decoding="async" />
                </span>
                <div class="cb-prohibit__copy">
                  <p class="cb-prohibit__title">仿冒、侵权物品</p>
                  <p class="cb-prohibit__desc">任何仿冒、侵权物品</p>
                </div>
              </li>
              <li class="cb-prohibit__item">
                <span class="cb-prohibit__icon" aria-hidden="true">
                  <img src="asset/icons/prohibit/battery.png?v=4" alt="" width="56" height="56" decoding="async" />
                </span>
                <div class="cb-prohibit__copy">
                  <p class="cb-prohibit__title">电池及带电产品</p>
                  <p class="cb-prohibit__desc">纯电池、充电宝、超功率电池（超 100WH）、液体蓄电池、平衡车、独轮车</p>
                </div>
              </li>
              <li class="cb-prohibit__item">
                <span class="cb-prohibit__icon" aria-hidden="true">
                  <img src="asset/icons/prohibit/medicine.png?v=4" alt="" width="56" height="56" decoding="async" />
                </span>
                <div class="cb-prohibit__copy">
                  <p class="cb-prohibit__title">禁寄药物</p>
                  <p class="cb-prohibit__desc">伟哥、壮阳药、西药、处方药等</p>
                </div>
              </li>
              <li class="cb-prohibit__item">
                <span class="cb-prohibit__icon" aria-hidden="true">
                  <img src="asset/icons/prohibit/flammable.png?v=4" alt="" width="56" height="56" decoding="async" />
                </span>
                <div class="cb-prohibit__copy">
                  <p class="cb-prohibit__title">易燃物品</p>
                  <p class="cb-prohibit__desc">酒类、酒精、摩丝、香水、指甲油、胶水、油漆、涂料、机油、喷雾、强酸、强碱、充气打火机、火柴等</p>
                </div>
              </li>
              <li class="cb-prohibit__item">
                <span class="cb-prohibit__icon" aria-hidden="true">
                  <img src="asset/icons/prohibit/flammable.png?v=4" alt="" width="56" height="56" decoding="async" />
                </span>
                <div class="cb-prohibit__copy">
                  <p class="cb-prohibit__title">易爆物品</p>
                  <p class="cb-prohibit__desc">气囊、气压泵、潜水泵、压缩气体、导火索、炸药、烟花、鞭炮、喷雾器等</p>
                </div>
              </li>
              <li class="cb-prohibit__item">
                <span class="cb-prohibit__icon" aria-hidden="true">
                  <img src="asset/icons/prohibit/gun.png?v=4" alt="" width="56" height="56" decoding="async" />
                </span>
                <div class="cb-prohibit__copy">
                  <p class="cb-prohibit__title">法规违禁品</p>
                  <p class="cb-prohibit__desc">枪支弹药、毒品、香烟、黄色书籍与光碟、赌具、现金及卡</p>
                </div>
              </li>
              <li class="cb-prohibit__item">
                <span class="cb-prohibit__icon" aria-hidden="true">
                  <img src="asset/icons/prohibit/chemical.png?v=4" alt="" width="56" height="56" decoding="async" />
                </span>
                <div class="cb-prohibit__copy">
                  <p class="cb-prohibit__title">有毒及仿军玩具等</p>
                  <p class="cb-prohibit__desc">仿军火类玩具、砒霜、水银、温度计</p>
                </div>
              </li>
            </ul>
          </section>
        </div>
</template>
