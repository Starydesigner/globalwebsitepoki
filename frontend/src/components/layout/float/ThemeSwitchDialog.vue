<script setup lang="ts">
defineOptions({ name: "ThemeSwitchDialog" });
</script>

<template>
  <div class="theme-switch" data-nav-theme-dialog hidden>
    <button class="theme-switch__mask" type="button" data-nav-theme-close aria-label="关闭风格切换" />
    <div class="theme-switch__panel" role="dialog" aria-modal="true" aria-labelledby="theme-switch-title">
      <div class="theme-switch__head">
        <h2 id="theme-switch-title">框架 UI 风格</h2>
        <button class="theme-switch__close" type="button" data-nav-theme-close aria-label="关闭">×</button>
      </div>
      <div class="theme-switch__options">
        <button class="theme-switch__choice" type="button" data-nav-theme-choice="blue">
          <span class="theme-switch__swatch theme-switch__swatch--blue" aria-hidden="true" />
          蓝色版
        </button>
        <button class="theme-switch__choice" type="button" data-nav-theme-choice="glass">
          <span class="theme-switch__swatch theme-switch__swatch--glass" aria-hidden="true" />
          毛玻璃版
        </button>
      </div>
    </div>
  </div>
</template>
