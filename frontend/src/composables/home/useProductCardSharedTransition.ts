import { onMounted, onUnmounted } from "vue";

/** 跨境产品卡 → 跨境页 Banner 共享元素过渡（原 product-card-shared-transition.js） */
export function useProductCardSharedTransition() {
  let cleanup: (() => void) | undefined;

  onMounted(() => {
    const hit = document.querySelector(".product-card--cross .product-card__hit") as HTMLAnchorElement | null;
    const card = document.querySelector(".product-card--cross") as HTMLElement | null;
    const grid = document.querySelector(".product-grid");
    if (!hit || !card || !grid) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nativeCrossVt = CSS.supports("view-transition-name", "cross-card");

    const readHeaderOffset = () => {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--header-height-hero")
        .trim();
      const parsed = parseFloat(raw);
      return Number.isFinite(parsed) ? parsed : 64;
    };

    const readBannerHeight = () => {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--header-height-hero")
        .trim();
      const header = parseFloat(raw);
      return (Number.isFinite(header) ? header : 64) + 400 + 108 + 48;
    };

    const closeCrossPanel = () => {
      grid.classList.remove("is-cross-open", "is-cross-closing");
    };

    const runFlipTransition = (href: string) => {
      const open = grid.classList.contains("is-cross-open");
      const source = open ? card.querySelector(".cross-panel") : card;
      const rect = (source || card).getBoundingClientRect();
      const radius =
        getComputedStyle(open ? card.querySelector(".cross-panel__sheet") || card : card).borderRadius ||
        "16px";
      const titleEl = card.querySelector(".product-card__title");
      const visualEl = card.querySelector(".product-card__visual img");

      const overlay = document.createElement("div");
      overlay.className = "shared-transition-overlay";
      const shell = document.createElement("div");
      shell.className = "shared-transition-shell";
      shell.style.left = `${rect.left}px`;
      shell.style.top = `${rect.top}px`;
      shell.style.width = `${rect.width}px`;
      shell.style.height = `${rect.height}px`;
      shell.style.borderRadius = radius;

      const content = document.createElement("div");
      content.className = "shared-transition-shell__content";
      const title = document.createElement("p");
      title.className = "shared-transition-shell__title";
      title.textContent = titleEl?.textContent ?? "";
      content.append(title);

      const visualWrap = document.createElement("div");
      visualWrap.className = "shared-transition-shell__visual";
      if (visualEl) {
        visualWrap.append(visualEl.cloneNode(true));
      }

      shell.append(content, visualWrap);
      overlay.append(shell);
      document.body.append(overlay);

      const targetTop = readHeaderOffset();
      const targetHeight = readBannerHeight();

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          shell.classList.add("is-morphing", "is-banner");
          shell.style.left = "0px";
          shell.style.top = `${targetTop}px`;
          shell.style.width = `${window.innerWidth}px`;
          shell.style.height = `${targetHeight}px`;
          shell.style.borderRadius = "0px";
        });
      });

      const finish = () => {
        window.location.assign(href);
      };

      const onTransitionEnd = (event: TransitionEvent) => {
        if (event.target !== shell || event.propertyName !== "height") return;
        finish();
      };

      shell.addEventListener("transitionend", onTransitionEnd);
      window.setTimeout(finish, 980);
    };

    const onPrefetch = () => {
      if (hit.dataset.prefetched) return;
      hit.dataset.prefetched = "1";
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = hit.href;
      document.head.append(link);
    };

    const onClick = (event: MouseEvent) => {
      if (reduced) return;

      const open = grid.classList.contains("is-cross-open");
      sessionStorage.setItem("vt-cross-card", "1");

      if (open) {
        const panel = card.querySelector(".cross-panel") as HTMLElement | null;
        if (panel) panel.style.viewTransitionName = "cross-card";
      } else {
        card.style.viewTransitionName = "cross-card";
        const visual = card.querySelector(".product-card__visual") as HTMLElement | null;
        if (visual) visual.style.viewTransitionName = "cross-card-visual";
      }

      if (nativeCrossVt) {
        closeCrossPanel();
        return;
      }

      event.preventDefault();
      runFlipTransition(hit.href);
      closeCrossPanel();
    };

    hit.addEventListener("pointerenter", onPrefetch, { once: true });
    hit.addEventListener("click", onClick);

    cleanup = () => {
      hit.removeEventListener("click", onClick);
    };
  });

  onUnmounted(() => cleanup?.());
}
