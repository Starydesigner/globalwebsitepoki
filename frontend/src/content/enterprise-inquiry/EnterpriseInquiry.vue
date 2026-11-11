<script setup lang="ts">
import SubpageFrame from "@/components/layout/SubpageFrame.vue";
import EnterpriseInquiryForm from "@/components/enterprise/EnterpriseInquiryForm.vue";
import { onlineSendHash } from "@/config/sitePaths";
import { useEnterpriseInquiry } from "@/composables/enterprise/useEnterpriseInquiry";

defineOptions({ name: "EnterpriseInquiry" });
useEnterpriseInquiry();
</script>

<template>
  <SubpageFrame title="企业合作咨询" :fallback-href="onlineSendHash('enterprise')">
    <div class="ship-card enterprise-inquiry__card">
      <header class="send-group__head enterprise-inquiry__head">
        <p class="enterprise-inquiry__lead">
          请留下您的联系方式，期待与您合作。<br />
          提交成功后，我们会有专人与您尽快联络。（本网站将对您的信息保密）
        </p>
      </header>
      <EnterpriseInquiryForm />
    </div>
  </SubpageFrame>
</template>
