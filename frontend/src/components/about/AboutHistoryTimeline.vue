<script setup lang="ts">
import { computed, ref } from "vue";
import AboutSectionHeading from "@/components/about/AboutSectionHeading.vue";
import { ABOUT_HISTORY_ITEMS } from "@/content/about/aboutContent";
import {
  ABOUT_HISTORY_PATH_D,
  historyConnectorPolyline,
  useAboutHistoryFlight,
} from "@/composables/about/useAboutHistoryFlight";
import { assetUrl } from "@/utils/assetUrl";

defineOptions({ name: "AboutHistoryTimeline" });

const items = computed(() => ABOUT_HISTORY_ITEMS);

const skyRef = ref<HTMLElement | null>(null);
const cloudARef = ref<HTMLElement | null>(null);
const cloudBRef = ref<HTMLElement | null>(null);
const headingRef = ref<HTMLElement | null>(null);
const canvasRef = ref<HTMLElement | null>(null);
const nodesRef = ref<HTMLElement | null>(null);

const {
  stageRef,
  pathRef,
  trailRef,
  planeRef,
  nodePoints,
  nodeAnchorStyle,
  isNodeRevealed,
} = useAboutHistoryFlight(() => items.value.length, {
  sky: skyRef,
  clouds: [cloudARef, cloudBRef],
  heading: headingRef,
  canvasLayer: canvasRef,
  nodesLayer: nodesRef,
});

function nodePlacement(index: number) {
  return nodePoints.value[index]?.placement ?? "above";
}

</script>

<template>
  <div ref="stageRef" class="about-history-stage" aria-label="发展历程时间轴">
    <div class="about-history-stage__bg" aria-hidden="true">
      <img
        ref="skyRef"
        class="about-history-stage__sky"
        :src="assetUrl('asset/about/history-sky.jpg')"
        alt=""
        width="1920"
        height="1080"
        decoding="async"
      />
      <img
        ref="cloudARef"
        class="about-history-stage__cloud about-history-stage__cloud--1"
        :src="assetUrl('asset/about/history-cloud.png')"
        alt=""
        width="1200"
        height="400"
        decoding="async"
      />
      <img
        ref="cloudBRef"
        class="about-history-stage__cloud about-history-stage__cloud--2"
        :src="assetUrl('asset/about/history-cloud.png')"
        alt=""
        width="1200"
        height="400"
        decoding="async"
      />
    </div>

    <div ref="headingRef" class="about-history-stage__head">
      <AboutSectionHeading
        title-id="about-history-title"
        title="发展历程"
        meta-label="Corporate History"
      />
    </div>

    <div ref="canvasRef" class="about-history-stage__canvas" aria-hidden="true">
    <svg
      class="about-history-stage__svg"
      viewBox="0 0 1200 680"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient
          id="about-history-trail-grad"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="568"
          x2="1200"
          y2="64"
        >
          <stop offset="0%" stop-color="#9adfff" stop-opacity="0.2" />
          <stop offset="12%" stop-color="#ffffff" stop-opacity="0.88" />
          <stop offset="68%" stop-color="#ffffff" stop-opacity="0.98" />
          <stop offset="92%" stop-color="#e8fcff" stop-opacity="0.75" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0.15" />
        </linearGradient>
        <linearGradient
          id="about-history-base-grad"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="568"
          x2="1200"
          y2="64"
        >
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0" />
          <stop offset="8%" stop-color="#ffffff" stop-opacity="0.1" />
          <stop offset="88%" stop-color="#ffffff" stop-opacity="0.1" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
        </linearGradient>
        <filter id="about-history-trail-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        class="about-history-stage__path-base"
        :d="ABOUT_HISTORY_PATH_D"
        stroke="url(#about-history-base-grad)"
      />
      <path
        ref="pathRef"
        class="about-history-stage__path-guide"
        :d="ABOUT_HISTORY_PATH_D"
      />
      <path
        ref="trailRef"
        class="about-history-stage__path-trail"
        :d="ABOUT_HISTORY_PATH_D"
        filter="url(#about-history-trail-glow)"
      />
      <g class="about-history-stage__markers" aria-hidden="true">
        <polyline
          v-for="(item, index) in items"
          v-show="nodePoints[index]"
          :key="`connector-${item.year}`"
          class="about-history-stage__connector"
          :class="{ 'about-history-stage__connector--lit': isNodeRevealed(index) }"
          :points="nodePoints[index] ? historyConnectorPolyline(nodePoints[index]) : ''"
        />
        <circle
          v-for="(item, index) in items"
          :key="`marker-${item.year}`"
          class="about-history-stage__marker"
          :class="{ 'about-history-stage__marker--lit': isNodeRevealed(index) }"
          :cx="nodePoints[index]?.x ?? -9999"
          :cy="nodePoints[index]?.y ?? -9999"
          :r="isNodeRevealed(index) ? 7 : 6"
        />
      </g>
    </svg>
    </div>

    <img
      ref="planeRef"
      class="about-history-stage__plane"
      :src="assetUrl('asset/about/history-plane.png')"
      alt=""
      width="160"
      height="160"
      decoding="async"
    />

    <ol ref="nodesRef" class="about-history-nodes">
      <li
        v-for="(item, index) in items"
        :key="item.year"
        class="about-history-node"
        :class="[
          `about-history-node--${nodePlacement(index)}`,
          'about-history-node--bend-left',
          { 'about-history-node--head': index === 0 },
          { 'about-history-node--tail': index === items.length - 1 },
          { 'about-history-node--revealed': isNodeRevealed(index) },
        ]"
        :style="nodeAnchorStyle(index)"
      >
        <div class="about-history-node__dock">
          <div class="about-history-node__copy">
            <strong class="about-history-node__year">{{ item.year }}</strong>
            <p class="about-history-node__desc">{{ item.description }}</p>
          </div>
        </div>
      </li>
    </ol>

    <ol class="about-history-nodes about-history-nodes--fallback">
      <li v-for="item in items" :key="`fb-${item.year}`" class="about-history-node-fallback">
        <strong class="about-history-node__year">{{ item.year }}</strong>
        <p class="about-history-node__desc">{{ item.description }}</p>
      </li>
    </ol>
  </div>
</template>
