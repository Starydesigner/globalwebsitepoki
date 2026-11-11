<script setup lang="ts">
defineOptions({ name: "NavFrameworkDemo" });
</script>

<template>
<main class="demo-main">
<div class="container demo-card">
        <h1 class="text-subtitle" style="color: var(--color-text-primary); margin-bottom: 16px">
          顶部导航框架（内页样式）
        </h1>
        <p>
          悬停「寄递服务」「物流产品」「关于我们」「新闻资讯」可展开下拉。当前页激活项为寄递服务，悬停其他菜单时高亮会临时切到该项。
        </p>
        <p style="margin-top: 16px">
          <AppLink href="/" style="color: var(--mg-blue-60)">返回首页（Hero 透明导航）</AppLink>
        </p>
      </div>

</main>
</template>
