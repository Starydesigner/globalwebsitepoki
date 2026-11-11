<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue";
import { CORPORATE_VIDEOS } from "@/data/corporateVideos";

defineOptions({ name: "CorporateVideoPanel" });

const activeId = ref(CORPORATE_VIDEOS[0]!.id);
const playerRef = ref<HTMLVideoElement | null>(null);

const activeVideo = computed(
  () => CORPORATE_VIDEOS.find((item) => item.id === activeId.value) ?? CORPORATE_VIDEOS[0]!,
);

function selectVideo(id: string) {
  if (id === activeId.value) return;
  activeId.value = id;
}

watch(
  () => activeVideo.value.videoUrl,
  async () => {
    await nextTick();
    const el = playerRef.value;
    if (!el) return;
    el.load();
    try {
      await el.play();
    } catch {
      /* 浏览器可能拦截自动播放 */
    }
  },
);

function isActive(id: string) {
  return activeId.value === id;
}
</script>

<template>
  <div
    id="panel-corporate-video"
    data-pl-panel="corporate-video"
    role="tabpanel"
    aria-labelledby="tab-corporate-video"
    class="corp-video-panel"
  >
    <div class="corp-video-player">
      <h2 class="corp-video-player__title">{{ activeVideo.title }}</h2>
      <div class="corp-video-player__frame">
        <video
          ref="playerRef"
          class="corp-video-player__video"
          controls
          playsinline
          :poster="activeVideo.posterUrl"
          :src="activeVideo.videoUrl"
        />
      </div>
    </div>

    <ul class="corp-video-list" role="list">
      <li v-for="item in CORPORATE_VIDEOS" :key="item.id" class="corp-video-list__item">
        <button
          type="button"
          class="corp-video-card"
          :class="{ 'is-active': isActive(item.id) }"
          :aria-pressed="isActive(item.id)"
          @click="selectVideo(item.id)"
        >
          <span
            class="corp-video-card__thumb"
            :style="{ backgroundImage: `url(${item.posterUrl})` }"
          >
            <span v-if="isActive(item.id)" class="corp-video-card__playing">播放中</span>
          </span>
          <span class="corp-video-card__title">{{ item.title }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>
