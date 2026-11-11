import { nextTick, onMounted, type Ref } from "vue";

/** 首页 Hero 物流查询条输入/清空（提交由 HomeHeroBanner + MgButton 处理） */
export function useHomeTrackBar(heroRoot: Ref<HTMLElement | null>) {
  onMounted(() => {
    void nextTick(() => {
      const root = heroRoot.value;
      if (!root) return;

      const trackSearch = root.querySelector(".track-bar__search");
      if (!trackSearch) return;

      const trackInput = trackSearch.querySelector(".track-bar__input") as HTMLTextAreaElement | null;
      const trackClear = trackSearch.querySelector(".track-bar__clear") as HTMLButtonElement | null;
      if (!trackInput || !trackClear) return;

      const syncTrackClear = () => {
        trackClear.hidden = trackInput.value.trim() === "";
      };

      trackInput.addEventListener("input", syncTrackClear);
      trackClear.addEventListener("click", () => {
        trackInput.value = "";
        syncTrackClear();
        trackInput.focus();
      });

      trackSearch.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;
        if (target.closest(".track-bar__submit, .track-bar__clear")) return;
        trackInput.focus();
      });

      syncTrackClear();
    });
  });
}
