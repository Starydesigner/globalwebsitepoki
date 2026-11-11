<script setup lang="ts">
import ContentBackLink from "@/components/common/ContentBackLink.vue";
import { onlineSendHash } from "@/config/sitePaths";

defineOptions({ name: "EnterpriseInquiryBack" });
</script>

<template>
  <ContentBackLink
    class="enterprise-inquiry__back"
    :fallback-href="onlineSendHash('enterprise')"
    data-inquiry-back
  />
</template>
