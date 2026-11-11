<script setup lang="ts">
import { EXTERNAL_LINKS } from "@/config/sitePaths";

defineOptions({ name: "SiteFooterMainPanel" });
</script>

<template>
  <div class="site-footer__body">
    <div class="container">
      <div class="site-footer__hairline" />
      <div class="site-footer__main">
        <div class="site-footer__meta">
          <div class="site-footer__facts">
            <p class="site-footer__fact"><span class="site-footer__label">地址：</span>上海市青浦区华新镇华志路1685号</p>
            <p class="site-footer__fact"><span class="site-footer__label">邮编：</span>201708</p>
            <p class="site-footer__fact">
              <span class="site-footer__label">简历投递：</span><a href="mailto:ztohrzp@zto.com">ztohrzp@zto.com</a>
            </p>
          </div>
          <div class="site-footer__follow">
            <p class="site-footer__follow-title">关注我们:</p>
            <div class="site-footer__socials">
              <a class="site-footer__social site-footer__social--miniapp site-footer__social--qr" href="#"
                ><img src="asset/footer/miniapp.svg" alt="" width="42" height="42" />小程序<span class="site-footer__qrpop"
                  ><span class="site-footer__qr"
                    ><img src="asset/images/qr-export-wechat.png" alt="中通国际小程序" width="128" height="128" /><span
                      >中通国际小程序</span
                    ></span
                  ><span class="site-footer__qr"
                    ><img src="asset/images/qr-express-miniapp.png" alt="中通快递小程序" width="128" height="128" /><span
                      >中通快递小程序</span
                    ></span
                  ></span
                ></a
              >
              <a class="site-footer__social site-footer__social--qr" href="#"
                ><img src="asset/footer/wechat.svg" alt="" width="42" height="42" />公众号<span class="site-footer__qrpop"
                  ><span class="site-footer__qr"
                    ><img src="asset/images/qr-official-account.png?v=2" alt="中通国际公众号" width="128" height="128" /><span
                      >中通国际公众号</span
                    ></span
                  ></span
                ></a
              >
              <a class="site-footer__social site-footer__social--qr" href="#"
                ><img src="asset/footer/service.svg" alt="" width="42" height="42" />服务号<span class="site-footer__qrpop"
                  ><span class="site-footer__qr"
                    ><img src="asset/images/qr-service-account.png" alt="中通国际服务号" width="128" height="128" /><span
                      >中通国际服务号</span
                    ></span
                  ></span
                ></a
              >
              <a class="site-footer__social site-footer__social--qr" href="#"
                ><img src="asset/footer/video.svg" alt="" width="42" height="42" />视频号<span class="site-footer__qrpop"
                  ><span class="site-footer__qr"
                    ><img src="asset/images/qr-video-channel.png" alt="中通国际视频号" width="128" height="128" /><span
                      >中通国际视频号</span
                    ></span
                  ></span
                ></a
              >
              <a class="site-footer__social site-footer__social--qr" href="#"
                ><img src="asset/footer/weibo.svg" alt="" width="42" height="42" />微博<span class="site-footer__qrpop"
                  ><span class="site-footer__qr"
                    ><img src="asset/images/qr-weibo.png" alt="中通国际微博" width="128" height="128" /><span
                      >中通国际微博</span
                    ></span
                  ></span
                ></a
              >
            </div>
          </div>
        </div>
        <div class="site-footer__cols-fit">
        <div class="site-footer__cols">
          <div class="site-footer__col">
            <h2 class="site-footer__title"><img src="asset/footer/accent.svg" alt="" width="2" height="16" />服务导航</h2>
            <nav class="site-footer__links" aria-label="服务导航">
              <AppLink href="/online-send">寄递服务</AppLink>
              <AppLink href="/products">物流产品</AppLink>
              <AppLink href="/tech-global">科技全球</AppLink>
              <AppLink
                :href="EXTERNAL_LINKS.investorRelations"
                target="_blank"
                rel="noopener noreferrer"
                >投资者关系</AppLink
              >
              <a href="#">关于我们</a>
            </nav>
          </div>
          <div class="site-footer__col">
            <h2 class="site-footer__title"><img src="asset/footer/accent.svg" alt="" width="2" height="16" />网站导航</h2>
            <nav class="site-footer__links" aria-label="网站导航">
              <a href="#">柬埔寨中通</a>
              <a href="#">老挝中通</a>
            </nav>
          </div>
          <div class="site-footer__col">
            <h2 class="site-footer__title"><img src="asset/footer/accent.svg" alt="" width="2" height="16" />中通生态</h2>
            <nav class="site-footer__links" aria-label="中通生态">
              <a href="#">中通快递</a>
              <a href="#">中通快运</a>
              <a href="#">中通云仓</a>
              <a href="#">中通科技</a>
              <a href="#">中通金融</a>
              <a href="#">中通智运</a>
            </nav>
          </div>
          <div class="site-footer__col site-footer__col--aside">
            <div class="site-footer__group">
              <h2 class="site-footer__title">联系我们</h2>
              <div class="site-footer__contact-list">
                <a href="tel:95311"><img src="asset/footer/phone.svg" alt="" width="16" height="16" />95311 语音“国际查询”</a>
                <a href="#"><img src="asset/footer/headset.svg" alt="" width="16" height="16" />在线客服</a>
              </div>
            </div>
            <div class="site-footer__group">
              <h2 class="site-footer__title">商标授权</h2>
              <div class="site-footer__contact-list">
                <a href="tel:02160556166"><img src="asset/footer/phone.svg" alt="" width="16" height="16" />021-60556166</a>
                <a href="tel:18827639737"><img src="asset/footer/phone.svg" alt="" width="16" height="16" />18827639737</a>
                <a href="mailto:lidonglin@zto.com"
                  ><img src="asset/footer/mail.svg" alt="" width="16" height="16" />lidonglin@zto.com</a
                >
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
