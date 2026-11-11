<script setup lang="ts">
import MgButton from "@/components/common/MgButton.vue";

defineOptions({ name: "TwClearanceForm" });
</script>

<template>
  <form class="clearance-form clearance-form--tw" id="tw-form" data-clearance-form="tw" autocomplete="off">
    <p class="clearance-form__alert is-info" data-tw-alert role="status">
      <img
        class="clearance-form__alert-icon"
        src="asset/icons/alert-info.svg"
        alt=""
        width="16"
        height="16"
        decoding="async"
      />
      <span class="clearance-form__alert-text">填写姓名，并填写电话或证件号码其中一项即可查询</span>
    </p>
    <div class="clearance-form__field">
      <label class="clearance-form__label" for="tw-name">姓名<em aria-hidden="true">*</em></label>
      <input
        class="clearance-form__input"
        id="tw-name"
        type="text"
        name="name"
        maxlength="30"
        placeholder="请输入姓名"
        autocomplete="name"
      />
      <p class="clearance-form__field-error" data-tw-field-error="name" hidden role="alert" />
    </div>
    <div class="clearance-form__field">
      <label class="clearance-form__label" for="tw-mobile">联系电话</label>
      <input
        class="clearance-form__input"
        id="tw-mobile"
        type="tel"
        name="mobile"
        maxlength="20"
        placeholder="请输入联系电话"
        autocomplete="tel"
      />
      <p class="clearance-form__field-error" data-tw-field-error="mobile" hidden role="alert" />
    </div>
    <div class="clearance-form__field">
      <label class="clearance-form__label" for="tw-identity">证件号码</label>
      <input
        class="clearance-form__input"
        id="tw-identity"
        type="text"
        name="identityNum"
        maxlength="18"
        placeholder="请输入证件号码"
      />
      <p class="clearance-form__field-error" data-tw-field-error="identityNum" hidden role="alert" />
    </div>
    <div class="clearance-form__foot">
      <p class="clearance-form__tip is-success" data-tw-result hidden role="status" />
      <MgButton class="clearance-form__submit" type="submit" variant="filled" size="lg">提交</MgButton>
    </div>
  </form>
</template>
