import { onMounted, onUnmounted } from "vue";
import { initProductParticleBg } from "./productParticleBg";
import { useProductsPageReveal } from "./useProductsPageReveal";

/** 物流产品页交互（原 products-page.js + product-particle-bg.js） */
export function useProductsPageEffects() {
  useProductsPageReveal();

  let cleanupParticle: (() => void) | undefined;

  onMounted(() => {
    cleanupParticle = initProductParticleBg();
  });

  onUnmounted(() => {
    cleanupParticle?.();
  });
}
