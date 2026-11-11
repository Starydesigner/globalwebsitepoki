import { onMounted, onUnmounted } from "vue";

const STORAGE_KEY = "zto-nav-theme";

function readTheme(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeTheme(theme: string) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* 忽略 */
  }
}

/** 悬浮工具条 + 导航风格弹层（替代 js/float-tools.js） */
export function useFloatTools() {
  const cleanup: (() => void)[] = [];
  let toolsRoot: HTMLElement | null = null;
  let dialogRoot: HTMLElement | null = null;

  onMounted(() => {
    const root = document.documentElement;
    document.querySelectorAll(".float-tools").forEach((node, index) => {
      if (index > 0) node.remove();
    });
    document.querySelectorAll("[data-nav-theme-dialog]").forEach((node, index) => {
      if (index > 0) node.remove();
    });

    const dialog = document.querySelector("[data-nav-theme-dialog]");
    const tools = document.querySelector(".float-tools");
    toolsRoot = tools instanceof HTMLElement ? tools : null;
    dialogRoot = dialog instanceof HTMLElement ? dialog : null;

    if (dialogRoot && dialogRoot.parentElement !== document.body) {
      document.body.appendChild(dialogRoot);
    }
    if (toolsRoot && toolsRoot.parentElement !== document.body) {
      document.body.appendChild(toolsRoot);
    }

    let closeTimer = 0;

    const apply = (theme: string) => {
      const next = theme === "glass" ? "glass" : "blue";
      root.dataset.navTheme = next;
      document.querySelectorAll("[data-nav-theme-choice]").forEach((button) => {
        const el = button as HTMLElement;
        const active = el.dataset.navThemeChoice === next;
        el.classList.toggle("is-active", active);
        el.setAttribute("aria-pressed", active ? "true" : "false");
      });
    };

    const setOpen = (open: boolean) => {
      if (!dialog) return;
      window.clearTimeout(closeTimer);
      if (open) {
        dialog.removeAttribute("hidden");
        window.requestAnimationFrame(() => dialog.classList.add("is-open"));
      } else {
        dialog.classList.remove("is-open");
        closeTimer = window.setTimeout(() => {
          if (!dialog.classList.contains("is-open")) dialog.setAttribute("hidden", "");
        }, 180);
      }
      document.querySelectorAll("[data-nav-theme-open]").forEach((button) => {
        button.setAttribute("aria-expanded", open ? "true" : "false");
        button.classList.toggle("is-open", open);
      });
    };

    apply(readTheme() || "glass");

    const onOpen = (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
      if (!dialog) return;
      const isHidden = dialog.hasAttribute("hidden");
      setOpen(isHidden || !dialog.classList.contains("is-open"));
    };

    document.querySelectorAll("[data-nav-theme-open]").forEach((button) => {
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-haspopup", "dialog");
      button.addEventListener("click", onOpen);
      cleanup.push(() => button.removeEventListener("click", onOpen));
    });

    document.querySelectorAll("[data-nav-theme-close]").forEach((button) => {
      const handler = () => setOpen(false);
      button.addEventListener("click", handler);
      cleanup.push(() => button.removeEventListener("click", handler));
    });

    document.querySelectorAll("[data-nav-theme-choice]").forEach((button) => {
      const handler = () => {
        const el = button as HTMLElement;
        const choice = el.dataset.navThemeChoice || "blue";
        writeTheme(choice);
        apply(choice);
        setOpen(false);
      };
      button.addEventListener("click", handler);
      cleanup.push(() => button.removeEventListener("click", handler));
    });

    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeydown);
    cleanup.push(() => document.removeEventListener("keydown", onKeydown));

    const top = document.querySelector("[data-back-top]");
    if (top) {
      const update = () => {
        const pastFirstScreen = window.scrollY > window.innerHeight;
        top.classList.toggle("is-visible", pastFirstScreen);
        top.setAttribute("aria-hidden", pastFirstScreen ? "false" : "true");
        (top as HTMLButtonElement).tabIndex = pastFirstScreen ? 0 : -1;
      };
      const onTopClick = () => window.scrollTo({ top: 0, behavior: "smooth" });
      top.addEventListener("click", onTopClick);
      update();
      window.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);
      cleanup.push(() => {
        top.removeEventListener("click", onTopClick);
        window.removeEventListener("scroll", update);
        window.removeEventListener("resize", update);
      });
    }
  });

  onUnmounted(() => {
    cleanup.forEach((fn) => fn());
    toolsRoot?.remove();
    dialogRoot?.remove();
  });
}
