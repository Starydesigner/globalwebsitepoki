<script setup lang="ts">
defineOptions({ name: "SiteFooterLegalBar" });
</script>

<template>
  <div class="site-footer__legal">
    <div class="container">
      <p class="site-footer__policies">
        <a href="#">隐私政策</a> ｜ <a href="#">法律声明</a> ｜ <a href="#">集团采购</a> ｜ <a href="#">投诉建议</a>｜
        <a href="#">Cookie政策</a>
      </p>
      <div class="site-footer__copy">
        <p>
          <span>中通版权所有</span><a href="#">沪ICP备2025151234号-4</a>
        </p>
        <p>
          <img class="site-footer__police" src="asset/footer/police.png" alt="" width="13" height="14" /><a href="#"
            >沪公网安备 31011802005147号</a
          >
        </p>
      </div>
    </div>
  </div>
</template>
