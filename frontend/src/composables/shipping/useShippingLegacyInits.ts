import { onMounted, onUnmounted } from "vue";
import { initClearanceForms } from "./clearanceForms";
import { initNoticePanel } from "./noticePanel";
import { initRateCard } from "./rateCard";
import { initRateRegionPicker } from "./rateRegionPicker";
import { initTrackQuery } from "./trackQuery";

const INITS = [
  initClearanceForms,
  initNoticePanel,
  initTrackQuery,
  initRateRegionPicker,
  initRateCard,
] as const;

/** 寄递面板 legacy 交互（原 js/clearance-forms 等，已迁入 composables） */
export function useShippingLegacyInits() {
  const cleanups: (() => void)[] = [];

  onMounted(() => {
    for (const init of INITS) {
      cleanups.push(init());
    }
  });

  onUnmounted(() => {
    cleanups.forEach((fn) => fn());
  });
}
