import { onMounted, onUnmounted, watch, type Ref } from "vue";

export type SiteHeaderMode = "hero" | "default";

export interface UseSiteHeaderOptions {
  mode?: SiteHeaderMode;
  activeNav?: Ref<string | undefined> | string;
}

/** 顶栏滚动、Mega 展开与当前页高亮（SiteHeader.vue 挂载后调用） */
export function useSiteHeader(
  headerRef: () => HTMLElement | null,
  options: UseSiteHeaderOptions = {},
) {
  const mode = options.mode ?? "hero";
  const activeNavRef =
    typeof options.activeNav === "object" && options.activeNav && "value" in options.activeNav
      ? options.activeNav
      : null;
  const pageKey = () => activeNavRef?.value ?? (options.activeNav as string | undefined) ?? "home";

  let closeTimer: ReturnType<typeof setTimeout> | undefined;
  let hideTimer: ReturnType<typeof setTimeout> | undefined;

  const cleanupFns: (() => void)[] = [];

  onMounted(() => {
    const header = headerRef();
    if (!header) return;

    const items = header.querySelectorAll(".site-header__nav-item");
    const panels = header.querySelectorAll("[data-mega-panel]");
    const megaLayer = header.querySelector(".site-header__mega-layer");
    const missionScene = document.querySelector(".mission-scene__scene");

    const headerBarHeight = () => {
      const bar = header.querySelector(".site-header__bar");
      return bar ? bar.getBoundingClientRect().height : 64;
    };

    const missionDarkNavSurface = () => {
      if (!missionScene) return false;
      const headerH = headerBarHeight();
      const rect = missionScene.getBoundingClientRect();
      return rect.top <= headerH && rect.bottom > headerH;
    };

    /** 进入新闻资讯区即用浅色顶栏（使命 sticky 会长期压在 header 下，不能仅靠 scrollY） */
    const heroLightNav = () => {
      const news = document.querySelector(".section-news");
      if (!news) return window.scrollY > 24;
      const headerH = headerBarHeight();
      return news.getBoundingClientRect().top <= headerH + 32;
    };

    const onScroll = () => {
      const lightNav = heroLightNav();
      const overDark = mode === "hero" && !lightNav && missionDarkNavSurface();
      header.classList.toggle("is-over-dark", overDark);
      header.classList.toggle("is-scrolled", lightNav || (window.scrollY > 24 && !overDark));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanupFns.push(() => window.removeEventListener("scroll", onScroll));

    const setPageActive = () => {
      const key = pageKey();
      items.forEach((item) => {
        const active = item.getAttribute("data-nav-item") === key;
        item.classList.toggle("is-active", active);
        const link = item.querySelector(".site-header__nav-link");
        if (link) link.classList.toggle("is-active", active);
      });
    };

    const setOpenKey = (key: string) => {
      items.forEach((item) => {
        const open = Boolean(key) && item.getAttribute("data-nav-item") === key;
        item.classList.toggle("is-open", open);
        const link = item.querySelector(".site-header__nav-link");
        if (link && link.getAttribute("data-has-mega") === "true") {
          link.setAttribute("aria-expanded", open ? "true" : "false");
        }
      });
    };

    const showMega = (key: string) => {
      clearTimeout(hideTimer);
      const wasOpen = header.classList.contains("has-mega-open");
      let panel: HTMLElement | null = null;
      panels.forEach((item) => {
        const el = item as HTMLElement;
        const visible = Boolean(key) && el.dataset.megaPanel === key;
        el.classList.toggle("is-visible", visible);
        if (visible) panel = el;
      });

      header.classList.toggle("is-mega-hovering", Boolean(panel));
      setOpenKey(panel ? key : "");

      if (panel) {
        if (megaLayer instanceof HTMLElement) {
          megaLayer.style.height = "auto";
          const height = panel.offsetHeight;
          header.style.setProperty("--mega-h", `${height}px`);
          megaLayer.style.height = wasOpen ? `${height}px` : "0px";
          if (!wasOpen) {
            megaLayer.getBoundingClientRect();
            megaLayer.style.height = `${height}px`;
          }
        }
        header.classList.add("is-mega-sheet");
        if (wasOpen) {
          header.classList.add("has-mega-open");
          return;
        }
        header.classList.remove("has-mega-open");
        requestAnimationFrame(() => header.classList.add("has-mega-open"));
        return;
      }

      header.classList.remove("has-mega-open");
      header.style.setProperty("--mega-h", "0px");
      hideTimer = setTimeout(() => {
        if (header.classList.contains("has-mega-open")) return;
        header.classList.remove("is-mega-sheet");
        panels.forEach((item) => item.classList.remove("is-visible"));
        if (megaLayer instanceof HTMLElement) megaLayer.style.height = "0px";
      }, 420);
    };

    const scheduleCloseMega = (event: MouseEvent) => {
      const next = event.relatedTarget;
      if (next instanceof Node && header.contains(next)) return;
      clearTimeout(closeTimer);
      closeTimer = setTimeout(() => showMega(""), 120);
    };

    items.forEach((item) => {
      const link = item.querySelector("[data-nav-key]");
      if (!link) return;
      const key = link.getAttribute("data-nav-key") ?? "";
      const hasMega = link.getAttribute("data-has-mega") === "true";

      const onEnter = () => {
        clearTimeout(closeTimer);
        if (hasMega) showMega(key);
        else showMega("");
      };
      const onFocus = () => {
        clearTimeout(closeTimer);
        if (hasMega) showMega(key);
      };
      const onClick = (event: Event) => {
        if (!hasMega) return;
        const href = link.getAttribute("href");
        if (href && href !== "#") return;
        event.preventDefault();
        clearTimeout(closeTimer);
        showMega(key);
      };

      item.addEventListener("mouseenter", onEnter);
      link.addEventListener("focus", onFocus);
      link.addEventListener("click", onClick);
      cleanupFns.push(() => {
        item.removeEventListener("mouseenter", onEnter);
        link.removeEventListener("focus", onFocus);
        link.removeEventListener("click", onClick);
      });
    });

    const localeWrap = header.querySelector(".site-header__locale-wrap");
    if (localeWrap) {
      const onLocaleEnter = () => {
        clearTimeout(closeTimer);
        showMega("");
      };
      localeWrap.addEventListener("mouseenter", onLocaleEnter);
      cleanupFns.push(() => localeWrap.removeEventListener("mouseenter", onLocaleEnter));
    }

    header.addEventListener("mouseleave", scheduleCloseMega);
    cleanupFns.push(() => header.removeEventListener("mouseleave", scheduleCloseMega));

    if (megaLayer) {
      const onMegaEnter = () => clearTimeout(closeTimer);
      const onMegaLeave = scheduleCloseMega;
      megaLayer.addEventListener("mouseenter", onMegaEnter);
      megaLayer.addEventListener("mouseleave", onMegaLeave);
      cleanupFns.push(() => {
        megaLayer.removeEventListener("mouseenter", onMegaEnter);
        megaLayer.removeEventListener("mouseleave", onMegaLeave);
      });
    }

    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") showMega("");
    };
    document.addEventListener("keydown", onKeydown);
    cleanupFns.push(() => document.removeEventListener("keydown", onKeydown));

    setPageActive();

    if (activeNavRef) {
      watch(activeNavRef, () => setPageActive());
    }
  });

  onUnmounted(() => {
    clearTimeout(closeTimer);
    clearTimeout(hideTimer);
    cleanupFns.forEach((fn) => fn());
  });
}
