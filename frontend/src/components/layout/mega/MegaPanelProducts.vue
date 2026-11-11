<script setup lang="ts">
import MegaDecor from "./MegaDecor.vue";

defineOptions({ name: "MegaPanelProducts" });
</script>

<template>
  <div class="mega mega--products" data-mega-panel="products">
    <MegaDecor left-src="asset/icons/svg_7fc4c20a.svg" right-src="asset/icons/svg_e5540684.svg" />
    <div class="mega__inner">
      <div class="mega__cols">
        <div class="mega-col mega-col--cross">
          <AppLink class="mega-col__title" href="/cross-border#import">跨境业务</AppLink>
          <span class="mega-col__rule" />
          <div class="mega-col__dual">
            <div class="mega-col__stack">
              <AppLink class="mega-link mega-link--group" href="/cross-border#import">跨境进口</AppLink>
              <AppLink class="mega-link" href="/cross-border#import-general">国际进口</AppLink>
              <AppLink class="mega-link" href="/cross-border#import-bulk">进口大件</AppLink>
              <AppLink class="mega-link" href="/cross-border#import-parcel">电商小件</AppLink>
              <AppLink class="mega-link" href="/cross-border#import-warehouse">国际仓配</AppLink>
            </div>
            <div class="mega-col__stack">
              <AppLink class="mega-link mega-link--group" href="/cross-border#export">跨境出口</AppLink>
              <AppLink class="mega-link" href="/cross-border#express">国际特快</AppLink>
              <AppLink class="mega-link" href="/cross-border#standard">国际标快</AppLink>
              <AppLink class="mega-link" href="/cross-border#consolidate">国际集运</AppLink>
              <AppLink class="mega-link" href="/cross-border#cargo">国际大货</AppLink>
              <AppLink class="mega-link" href="/cross-border#packet">电商小包</AppLink>
            </div>
          </div>
        </div>
        <div class="mega-col">
          <AppLink class="mega-col__title" href="/inner-local#hk">中国港澳本土服务</AppLink>
          <span class="mega-col__rule" />
          <div class="mega-col__links">
            <AppLink class="mega-link mega-link--group" href="/inner-local#hk">中国香港地区</AppLink>
            <AppLink class="mega-link mega-link--group" href="/inner-local#mo">中国澳门地区</AppLink>
          </div>
        </div>
        <div class="mega-col">
          <AppLink class="mega-col__title" href="/overseas-local#asia">海外本土派送</AppLink>
          <span class="mega-col__rule" />
          <div class="mega-col__links">
            <AppLink class="mega-link mega-link--group" href="/overseas-local#asia">亚洲</AppLink>
            <AppLink class="mega-link mega-link--group" href="/overseas-local#africa">非洲</AppLink>
            <AppLink class="mega-link mega-link--group" href="/overseas-local#warehouse">海外仓</AppLink>
          </div>
        </div>
        <div class="mega-col">
          <AppLink class="mega-col__title" href="/solution">跨境解决方案</AppLink>
          <span class="mega-col__rule" />
          <div class="mega-col__links">
            <AppLink class="mega-link mega-link--group" href="/solution">服务介绍</AppLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
