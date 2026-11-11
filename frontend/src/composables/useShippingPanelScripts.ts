import { onMounted } from "vue";
import { useShippingLegacyInits } from "@/composables/shipping/useShippingLegacyInits";

/** 寄递页内 send-qr、清关表单等交互（原 online-send 内联脚本） */
export function useShippingDomEnhancements() {
  useShippingLegacyInits();

  onMounted(() => {
    const closeQr = (root: Element) => {
      root.classList.remove("is-open");
      const button = root.querySelector("button");
      button?.setAttribute("aria-expanded", "false");
    };

    document.querySelectorAll(".send-qr").forEach((root) => {
      const button = root.querySelector("button");
      if (!button) return;
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        const open = root.classList.contains("is-open");
        document.querySelectorAll(".send-qr.is-open").forEach(closeQr);
        if (!open) {
          root.classList.add("is-open");
          button.setAttribute("aria-expanded", "true");
        } else {
          button.blur();
        }
      });
    });

    document.addEventListener("click", (event) => {
      if ((event.target as Element).closest?.(".send-qr")) return;
      document.querySelectorAll(".send-qr.is-open").forEach(closeQr);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      document.querySelectorAll(".send-qr.is-open").forEach(closeQr);
    });

    document.querySelectorAll("[data-ship-form]").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (form.id === "track-form" || form.hasAttribute("data-track-form")) return;
        const parent = form.parentElement;
        if (!parent) return;
        const result = parent.querySelector("[data-ship-result]");
        const emptyView = parent.querySelector("[data-ship-empty-view]");
        const filled = Array.from(form.querySelectorAll("input, select, textarea")).some(
          (field) => {
            const el = field as HTMLInputElement;
            return el.type !== "file" && el.value.trim();
          },
        );
        if (!result) return;
        result.removeAttribute("hidden");
        result.textContent = filled
          ? form.getAttribute("data-ship-done")
          : form.getAttribute("data-ship-empty");
        if (emptyView instanceof HTMLElement) {
          emptyView.hidden = filled;
        }
      });
    });
  });
}

/** @deprecated 使用 useShippingDomEnhancements，保留空实现避免旧调用报错 */
export function ensureShippingScripts(): Promise<void> {
  return Promise.resolve();
}
