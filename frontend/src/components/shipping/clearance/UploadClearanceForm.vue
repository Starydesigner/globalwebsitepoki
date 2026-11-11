<script setup lang="ts">
import MgButton from "@/components/common/MgButton.vue";
import IdCardUploadField from "./IdCardUploadField.vue";

defineOptions({ name: "UploadClearanceForm" });
</script>

<template>
  <form
    class="clearance-form clearance-form--upload"
    id="upload-form"
    data-clearance-form="upload"
    autocomplete="off"
  >
    <div class="clearance-form__field">
      <label class="clearance-form__label" for="upload-name">姓名</label>
      <input
        class="clearance-form__input"
        id="upload-name"
        type="text"
        name="name"
        maxlength="30"
        placeholder="请输入姓名"
        autocomplete="name"
      />
    </div>
    <div class="clearance-form__field">
      <label class="clearance-form__label" for="upload-identity">身份证号码</label>
      <input
        class="clearance-form__input"
        id="upload-identity"
        type="text"
        name="identityNum"
        maxlength="18"
        placeholder="请输入身份证号码"
      />
    </div>
    <IdCardUploadField />
    <label class="clearance-form__agree">
      <input type="checkbox" name="agree" />
      <span
        >我已查看并同意<a href="http://www.ztoglobal.com/contents/5/20.html" target="_blank" rel="noopener noreferrer"
          >《中通国际隐私协议》</a
        >和<a href="http://www.ztoglobal.com/contents/5/26.html" target="_blank" rel="noopener noreferrer"
          >《消费者实名备案协议》</a
        ></span
      >
    </label>
    <div class="clearance-form__foot">
      <p class="clearance-form__tip" data-ship-result hidden role="status" />
      <MgButton class="clearance-form__submit" type="submit" variant="filled" size="lg">提交</MgButton>
    </div>
  </form>
</template>
