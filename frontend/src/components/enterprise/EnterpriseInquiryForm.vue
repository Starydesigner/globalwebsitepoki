<script setup lang="ts">
import MgButton from "@/components/common/MgButton.vue";
import EnterpriseInquiryCaptchaField from "./EnterpriseInquiryCaptchaField.vue";

defineOptions({ name: "EnterpriseInquiryForm" });
</script>

<template>
  <form
    class="clearance-form enterprise-inquiry-form"
    id="enterprise-inquiry-form"
    autocomplete="off"
    novalidate
  >
    <div class="clearance-form__field">
      <span class="clearance-form__label">业务类型</span>
      <div class="rate-radios" role="radiogroup" aria-label="业务类型">
        <label class="rate-radio"><input type="radio" name="bizType" value="import" checked />进口</label>
        <label class="rate-radio"><input type="radio" name="bizType" value="export" />出口</label>
        <label class="rate-radio"><input type="radio" name="bizType" value="other" />其他</label>
      </div>
    </div>

    <div class="clearance-form__field">
      <label class="clearance-form__label" for="companyName"><em aria-hidden="true">*</em>公司全称</label>
      <input
        class="clearance-form__input"
        id="companyName"
        name="companyName"
        type="text"
        placeholder="请输入"
        required
      />
    </div>

    <div class="clearance-form__field">
      <label class="clearance-form__label" for="contactName"><em aria-hidden="true">*</em>联系人姓名</label>
      <input
        class="clearance-form__input"
        id="contactName"
        name="contactName"
        type="text"
        placeholder="请输入"
        required
      />
    </div>

    <div class="clearance-form__field">
      <label class="clearance-form__label" for="contactMobile"><em aria-hidden="true">*</em>联系人手机号</label>
      <input
        class="clearance-form__input"
        id="contactMobile"
        name="contactMobile"
        type="tel"
        inputmode="tel"
        autocomplete="tel"
        placeholder="请输入"
        required
      />
    </div>

    <div class="clearance-form__field">
      <label class="clearance-form__label" for="shippingNeed"><em aria-hidden="true">*</em>发货需求</label>
      <textarea
        class="clearance-form__input enterprise-inquiry-form__textarea"
        id="shippingNeed"
        name="shippingNeed"
        rows="4"
        placeholder="请输入"
        required
      />
    </div>

    <EnterpriseInquiryCaptchaField />

    <div class="clearance-form__foot">
      <p class="clearance-form__tip is-info" data-inquiry-tip hidden />
      <MgButton class="enterprise-inquiry-form__submit" type="submit" variant="filled" size="lg">提交</MgButton>
    </div>
  </form>
</template>
