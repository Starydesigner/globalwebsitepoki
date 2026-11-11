<script setup lang="ts">
defineOptions({ name: "EnterpriseInquiryCaptchaField" });
</script>

<template>
  <div class="clearance-form__field">
    <label class="clearance-form__label" for="captchaInput"><em aria-hidden="true">*</em>验证码</label>
    <div class="enterprise-inquiry-form__captcha">
      <input
        class="clearance-form__input"
        id="captchaInput"
        name="captcha"
        type="text"
        inputmode="text"
        autocomplete="off"
        placeholder="请输入"
        required
        maxlength="6"
      />
      <button class="enterprise-inquiry-form__captcha-img" type="button" data-captcha-refresh aria-label="换一张验证码">
        <canvas data-captcha-canvas width="120" height="44" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>
