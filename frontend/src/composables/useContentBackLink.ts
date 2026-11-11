import { onMounted, onUnmounted, type Ref } from "vue";
import { useRoute } from "vue-router";

/** 子页「返回」：优先 history.back，支持 ?return= 回落地址（与企业合作咨询一致） */
export function useContentBackLink(anchorRef: Ref<HTMLElement | null>, defaultHref: string) {
  const route = useRoute();

  let removeClick: (() => void) | undefined;

  onMounted(() => {
    const backBtn = anchorRef.value;
    if (!backBtn) return;

    const returnRaw = typeof route.query.return === "string" ? route.query.return : null;
    if (returnRaw) {
      try {
        const decoded = decodeURIComponent(returnRaw);
        if (decoded.startsWith("/") && !decoded.startsWith("//")) {
          backBtn.setAttribute("href", decoded);
        }
      } catch {
        /* keep default */
      }
    } else {
      backBtn.setAttribute("href", defaultHref);
    }

    const onBackClick = (event: MouseEvent) => {
      const href = backBtn.getAttribute("href") || defaultHref;
      const ref = document.referrer;
      if (ref) {
        try {
          if (new URL(ref).origin === location.origin) {
            event.preventDefault();
            history.back();
            return;
          }
        } catch {
          /* fall through */
        }
      }
      if (history.length > 1 && !returnRaw) {
        event.preventDefault();
        history.back();
        return;
      }
      if (returnRaw) {
        event.preventDefault();
        location.assign(href);
      }
    };

    backBtn.addEventListener("click", onBackClick);
    removeClick = () => backBtn.removeEventListener("click", onBackClick);
  });

  onUnmounted(() => removeClick?.());
}
