<script setup lang="ts">
defineOptions({ name: "CbExportExpressProduct" });
</script>

<template>
<div data-cb-product-panel="express" hidden>
          <div class="cb-stage">
            <div class="cb-stage__copy">
              <div class="cb-stage__name">
                <h2>国际特快</h2>
              </div>
              <ul class="cb-points">
                <li>门到门服务，时效快，单票清关，隔离风险，安全有保障。</li>
                <li>全流程、全环节跟踪监控。自研系统保障，登录中通快递、中通国际官网可一键追踪物流轨迹。</li>
              </ul>
              <AppLink class="cb-stage__cta" href="/online-send#send">马上寄件</AppLink>
            </div>
            <figure class="cb-stage__photo">
              <img src="asset/images/send/export.jpg" alt="中通国际货车编队" />
            </figure>
          </div>
          <section class="cb-block">
            <h3>重量计费</h3>
            <ol class="cb-steps">
              <li><span>1</span>单票计费重量不足 20KG：首重 0.5KG，续重 0.5KG，不足 0.5KG 按 0.5KG 计算。</li>
              <li><span>2</span>单票计费重量达到或超过 20KG：最低计费重量 1KG，不足 1KG 按 1KG 计算。</li>
              <li><span>3</span>计费重量取体积重量与实际重量中的较大值。体积重量 = 长(CM) × 宽(CM) × 高(CM) / 5000。</li>
            </ol>
          </section>
          <section class="cb-block cb-block--scope">
            <h3>服务范围</h3>
            <div class="cb-regions">
              <article class="cb-region"><h4><img class="cb-region__icon" src="asset/icons/regions/asia.svg" alt="" width="24" height="24" decoding="async" />亚洲</h4><p>中国香港、中国澳门、中国台湾、蒙古、韩国、日本、越南、老挝、柬埔寨、缅甸、泰国、马来西亚、新加坡、文莱、菲律宾、印度尼西亚、东帝汶、哈萨克斯坦、吉尔吉斯斯坦、乌兹别克斯坦、土库曼斯坦、阿富汗、巴基斯坦、尼泊尔、不丹、印度、孟加拉国、斯里兰卡、马尔代夫、伊拉克、科威特、沙特阿拉伯、巴林、阿拉伯联合酋长国、阿曼、也门、约旦、以色列、叙利亚、黎巴嫩、土耳其、塞浦路斯、格鲁吉亚、亚美尼亚</p></article>
              <article class="cb-region"><h4><img class="cb-region__icon" src="asset/icons/regions/europe.svg" alt="" width="24" height="24" decoding="async" />欧洲</h4><p>英国、法国、德国、意大利、西班牙、丹麦、冰岛、挪威、瑞典、芬兰、法罗群岛（丹麦）、爱尔兰、荷兰、比利时、卢森堡、摩纳哥、奥地利、瑞士、波兰、捷克、匈牙利、斯洛伐克、列支敦士登、希腊、葡萄牙、塞浦路斯、罗马尼亚、保加利亚、塞尔维亚、黑山、克罗地亚、斯洛文尼亚、波斯尼亚和黑塞哥维那、阿尔巴尼亚、梵蒂冈、圣马力诺、马耳他、安道尔、乌克兰、立陶宛、爱沙尼亚、拉脱维亚、摩尔多瓦、北马其顿</p></article>
              <article class="cb-region"><h4><img class="cb-region__icon" src="asset/icons/regions/north-america.svg" alt="" width="24" height="24" decoding="async" />北美洲</h4><p>美国、加拿大、墨西哥、危地马拉、伯利兹、萨尔瓦多、洪都拉斯、巴拿马、巴哈马、古巴、牙买加、多米尼加、哥斯达黎加、圣基茨和尼维斯、安提瓜和巴布达、多米尼克、圣卢西亚、圣文森特和格林纳丁斯、巴巴多斯、格林纳达、特立尼达和多巴哥、尼加拉瓜</p></article>
              <article class="cb-region"><h4><img class="cb-region__icon" src="asset/icons/regions/south-america.svg" alt="" width="24" height="24" decoding="async" />南美洲</h4><p>阿根廷、玻利维亚、巴西、智利、哥伦比亚、厄瓜多尔、圭亚那、巴拉圭、秘鲁、苏里南、乌拉圭、委内瑞拉、法属圭亚那、福克兰群岛</p></article>
              <article class="cb-region"><h4><img class="cb-region__icon" src="asset/icons/regions/oceania.svg" alt="" width="24" height="24" decoding="async" />大洋洲</h4><p>澳大利亚、新西兰、巴布亚新几内亚、所罗门群岛、瓦努阿图、斐济、基里巴斯、瑙鲁、密克罗尼西亚联邦、马绍尔群岛、帕劳、萨摩亚、汤加、图瓦卢</p></article>
              <article class="cb-region"><h4><img class="cb-region__icon" src="asset/icons/regions/africa.svg" alt="" width="24" height="24" decoding="async" />非洲</h4><p>埃及、利比亚、突尼斯、阿尔及利亚、摩洛哥、埃塞俄比亚、厄立特里亚、吉布提、索马里、肯尼亚、坦桑尼亚、乌干达、卢旺达、布隆迪、塞舌尔、科摩罗、马达加斯加、毛里求斯、毛里塔尼亚、塞内加尔、冈比亚、马里、布基纳法索、几内亚、几内亚比绍、佛得角、塞拉利昂、利比里亚、科特迪瓦、加纳、多哥、贝宁、尼日尔、尼日利亚、乍得、喀麦隆、赤道几内亚、加蓬、刚果（金）、刚果（布）、圣多美和普林西比、安哥拉、赞比亚、马拉维、莫桑比克、津巴布韦、博茨瓦纳、纳米比亚、南非、斯威士兰、莱索托、留尼汪、马约特、加那利群岛、休达（西班牙）、梅利利亚（西班牙）、圣赫勒拿</p></article>
            </div>
          </section>
          <section class="cb-block cb-block--ban">
            <h3>禁止寄递</h3>
            <ul class="cb-prohibit">
              <li class="cb-prohibit__item">
                <span class="cb-prohibit__icon" aria-hidden="true">
                  <img src="asset/icons/prohibit/flammable.png?v=4" alt="" width="56" height="56" decoding="async" />
                </span>
                <div class="cb-prohibit__copy">
                  <p class="cb-prohibit__title">易燃易爆物品</p>
                  <p class="cb-prohibit__desc">1. 易燃易爆等危险品<br />2. 航空禁运品</p>
                </div>
              </li>
              <li class="cb-prohibit__item">
                <span class="cb-prohibit__icon" aria-hidden="true">
                  <img src="asset/icons/prohibit/gun.png?v=4" alt="" width="56" height="56" decoding="async" />
                </span>
                <div class="cb-prohibit__copy">
                  <p class="cb-prohibit__title">枪支、弹药与管制器具</p>
                  <p class="cb-prohibit__desc">海关禁寄产品：如仿冒品牌、香烟、电子烟、武器、仿真武器、管制器具</p>
                </div>
              </li>
              <li class="cb-prohibit__item">
                <span class="cb-prohibit__icon" aria-hidden="true">
                  <img src="asset/icons/prohibit/chemical.png?v=4" alt="" width="56" height="56" decoding="async" />
                </span>
                <div class="cb-prohibit__copy">
                  <p class="cb-prohibit__title">化学与生物危险品</p>
                  <p class="cb-prohibit__desc">1. 生化制品、传染性、感染性物质<br />2. 腐蚀性制品</p>
                </div>
              </li>
              <li class="cb-prohibit__item">
                <span class="cb-prohibit__icon" aria-hidden="true">
                  <img src="asset/icons/prohibit/drugs.png?v=4" alt="" width="56" height="56" decoding="async" />
                </span>
                <div class="cb-prohibit__copy">
                  <p class="cb-prohibit__title">毒品</p>
                  <p class="cb-prohibit__desc">各类毒品及制毒相关物品</p>
                </div>
              </li>
              <li class="cb-prohibit__item">
                <span class="cb-prohibit__icon" aria-hidden="true">
                  <img src="asset/icons/prohibit/plants.png?v=4" alt="" width="56" height="56" decoding="async" />
                </span>
                <div class="cb-prohibit__copy">
                  <p class="cb-prohibit__title">食品与动植物</p>
                  <p class="cb-prohibit__desc">1. 食品<br />2. 动植物</p>
                </div>
              </li>
              <li class="cb-prohibit__item">
                <span class="cb-prohibit__icon" aria-hidden="true">
                  <img src="asset/icons/prohibit/counterfeit.png?v=4" alt="" width="56" height="56" decoding="async" />
                </span>
                <div class="cb-prohibit__copy">
                  <p class="cb-prohibit__title">货币、证券与仿造品</p>
                  <p class="cb-prohibit__desc">1. 货币和有价证券<br />2. 伪造或者变造的货币、有价证券、证件、公章等非法伪造物品</p>
                </div>
              </li>
              <li class="cb-prohibit__item">
                <span class="cb-prohibit__icon" aria-hidden="true">
                  <img src="asset/icons/prohibit/valuables.png?v=4" alt="" width="56" height="56" decoding="async" />
                </span>
                <div class="cb-prohibit__copy">
                  <p class="cb-prohibit__title">贵重物品</p>
                  <p class="cb-prohibit__desc">如艺术品、古董、珠宝、黄金等贵金属</p>
                </div>
              </li>
              <li class="cb-prohibit__item">
                <span class="cb-prohibit__icon" aria-hidden="true">
                  <img src="asset/icons/prohibit/battery.png?v=4" alt="" width="56" height="56" decoding="async" />
                </span>
                <div class="cb-prohibit__copy">
                  <p class="cb-prohibit__title">电池及带电产品</p>
                  <p class="cb-prohibit__desc">纯电池、充电宝、超功率电池（超 100WH）、液体蓄电池、平衡车、独轮车等产品</p>
                </div>
              </li>
            </ul>
          </section>
        </div>
</template>
