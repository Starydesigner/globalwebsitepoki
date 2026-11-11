<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

const props = defineProps<{
  pdfUrl: string;
  alt: string;
  fallbackSrc: string;
}>();

const coverSrc = ref<string | null>(null);
const failed = ref(false);

let destroyLoadingTask: (() => void) | undefined;

onMounted(async () => {
  try {
    const pdfjs = await import("pdfjs-dist");
    pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

    const loadingTask = pdfjs.getDocument({
      url: props.pdfUrl,
      isEvalSupported: false,
    });
    destroyLoadingTask = () => loadingTask.destroy();

    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);
    const baseViewport = page.getViewport({ scale: 1 });
    const targetWidth = 240;
    const scale = targetWidth / baseViewport.width;
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) {
      failed.value = true;
      return;
    }

    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);

    await page.render({ canvasContext: context, viewport, canvas }).promise;
    coverSrc.value = canvas.toDataURL("image/jpeg", 0.88);
  } catch {
    failed.value = true;
  }
});

onUnmounted(() => {
  destroyLoadingTask?.();
});
</script>

<template>
  <img
    v-if="coverSrc"
    class="about-social-reports__cover"
    :src="coverSrc"
    :alt="alt"
    width="160"
    height="213"
    decoding="async"
  />
  <img
    v-else-if="failed"
    class="about-social-reports__icon"
    :src="fallbackSrc"
    alt=""
    width="48"
    height="48"
    decoding="async"
  />
  <div
    v-else
    class="about-social-reports__cover about-social-reports__cover--loading"
    aria-hidden="true"
  />
</template>
