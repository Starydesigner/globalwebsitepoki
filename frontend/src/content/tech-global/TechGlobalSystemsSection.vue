<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import ProductSectionHeader from "@/components/products/ProductSectionHeader.vue";
import { initTechGlobalCultureComet } from "@/composables/techGlobalCultureComet";
import { TECH_GLOBAL_SYSTEMS } from "./techGlobalSystems";

defineOptions({ name: "TechGlobalSystemsSection" });

const gridRef = ref<HTMLElement | null>(null);
let disposeComet: (() => void) | undefined;

function moveGlow(event: MouseEvent) {
  const card = (event.target as HTMLElement).closest<HTMLElement>(".tech-global__culture-item-body");
  const glows = gridRef.value?.querySelectorAll<HTMLElement>(".tech-global__culture-item-glow");
  if (!glows?.length) return;

  for (const glow of glows) {
    glow.style.opacity = "0";
    glow.style.transform = "translate(-140px, -140px)";
  }

  if (!card) return;
  const glow = card.querySelector<HTMLElement>(".tech-global__culture-item-glow");
  if (!glow) return;
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  glow.style.transform = `translate(${x - 140}px, ${y - 140}px)`;
  glow.style.opacity = "1";
}

function resetGlows() {
  gridRef.value?.querySelectorAll<HTMLElement>(".tech-global__culture-item-glow").forEach((glow) => {
    glow.style.opacity = "0";
    glow.style.transform = "translate(-140px, -140px)";
  });
}

onMounted(() => {
  const grid = gridRef.value;
  if (!grid) return;
  grid.addEventListener("mousemove", moveGlow);
  grid.addEventListener("mouseleave", resetGlows);
  disposeComet = initTechGlobalCultureComet(grid);
});

onUnmounted(() => {
  disposeComet?.();
  const grid = gridRef.value;
  if (!grid) return;
  grid.removeEventListener("mousemove", moveGlow);
  grid.removeEventListener("mouseleave", resetGlows);
});
</script>

<template>
  <div class="tech-global__hub-block tech-global__systems" aria-labelledby="tech-systems-title">
    <ProductSectionHeader
      heading-id="tech-systems-title"
      title="全面的系统保障"
      meta-label="System Guarantee"
    />

    <ul ref="gridRef" class="tech-global__culture-grid">
      <li
        v-for="item in TECH_GLOBAL_SYSTEMS"
        :key="item.title"
        class="tech-global__culture-item"
      >
        <span class="tech-global__culture-item-band" aria-hidden="true">
          <span class="tech-global__culture-item-comet">
            <span class="tech-global__culture-item-comet-layer" data-comet-layer="glow" />
            <span class="tech-global__culture-item-comet-layer" data-comet-layer="core" />
          </span>
        </span>
        <article class="tech-global__culture-item-body">
          <img class="tech-global__culture-icon" :src="item.icon" alt="" width="48" height="48" />
          <h3 class="tech-global__culture-name">{{ item.title }}</h3>
          <p class="tech-global__culture-desc">{{ item.description }}</p>
          <span class="tech-global__culture-item-glow" aria-hidden="true" />
        </article>
      </li>
    </ul>
  </div>
</template>
