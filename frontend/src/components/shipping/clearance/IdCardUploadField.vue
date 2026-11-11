<script setup lang="ts">
const sides = [
  {
    name: "idFront" as const,
    guide: "asset/images/clearance/id-front-guide.png",
    uploadLabel: "上传人像面",
  },
  {
    name: "idBack" as const,
    guide: "asset/images/clearance/id-back-guide.png",
    uploadLabel: "上传国徽面",
  },
];
</script>

<template>
  <div class="clearance-form__field clearance-form__field--id">
    <span class="clearance-form__label">身份证照片</span>
    <div class="clearance-id-uploads">
      <label v-for="side in sides" :key="side.name" class="clearance-id-card">
        <input type="file" :name="side.name" accept="image/jpeg,image/png,image/bmp" hidden />
        <span class="clearance-id-card__preview">
          <img
            class="clearance-id-card__guide"
            :src="side.guide"
            alt=""
            width="208"
            height="132"
            decoding="async"
          />
          <span class="clearance-id-card__action">
            <span class="clearance-id-card__plus" aria-hidden="true" />
            <span class="clearance-id-card__upload-text">{{ side.uploadLabel }}</span>
          </span>
          <img class="clearance-id-card__photo" alt="" hidden decoding="async" />
        </span>
      </label>
    </div>
    <p class="clearance-form__id-hint">
      1.证件信息清晰可辨认，身份证必须在有效期范围内；<br />
      2.请上传 jpg、jpeg、png 或 bmp 格式的图片，大小不超过 5M。
    </p>
  </div>
</template>
