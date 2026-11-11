<script setup lang="ts">
import { usePlaceholderBanner } from "@/composables/usePlaceholderBanner";

defineOptions({ name: "Placeholder" });

const { page } = usePlaceholderBanner();
</script>

<template>
  <main class="demo-main">
    <div class="container demo-card">
      <p class="text-caption" style="color: var(--color-text-muted); margin-bottom: 8px">页面建设中</p>
      <h1 class="text-subtitle" data-placeholder-title style="color: var(--color-text-primary); margin-bottom: 16px">
        {{ page.title }}
      </h1>
      <p>这里是临时占位页，正式内容稍后补充。当前导航已选中本页。</p>
      <p style="margin-top: 16px">
        <AppLink href="/" style="color: var(--mg-blue-60)">返回首页</AppLink>
      </p>
    </div>
  </main>
</template>
