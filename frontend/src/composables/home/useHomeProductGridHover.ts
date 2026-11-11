import { onMounted, onUnmounted } from "vue";

type GridMode = "cross" | "overseas";

/** 首页产品双卡桌面 hover 展开 */
export function useHomeProductGridHover() {
  let cleanup: (() => void) | undefined;

  onMounted(() => {
    const grid = document.querySelector(".product-grid");
    const cards: Record<GridMode, Element | null> = {
      cross: document.querySelector(".product-card--cross"),
      overseas: document.querySelector(".product-card--overseas"),
    };
    if (!grid || !cards.cross || !cards.overseas) return;

    const mq = window.matchMedia("(hover: hover) and (min-width: 1201px)");
    const names: GridMode[] = ["cross", "overseas"];
    let mode: GridMode | "" = "";
    let timer = 0;
    let lockUntil = 0;

    const setMode = (next: GridMode) => {
      if (!mq.matches || mode === next || performance.now() < lockUntil) return;
      clearTimeout(timer);
      names.forEach((name) => {
        grid.classList.remove(`is-${name}-closing`);
        grid.classList.toggle(`is-${name}-open`, name === next);
      });
      mode = next;
      lockUntil = performance.now() + 180;
    };

    const close = () => {
      if (!mode) return;
      const closing = mode;
      grid.classList.remove(`is-${closing}-open`, `is-${closing}-closing`);
      mode = "";
    };

    const handlers = names.map((name) => {
      const fn = () => setMode(name);
      cards[name]!.addEventListener("mouseenter", fn);
      return { el: cards[name]!, fn };
    });
    grid.addEventListener("mouseleave", close);

    cleanup = () => {
      clearTimeout(timer);
      handlers.forEach(({ el, fn }) => el.removeEventListener("mouseenter", fn));
      grid.removeEventListener("mouseleave", close);
    };
  });

  onUnmounted(() => cleanup?.());
}
