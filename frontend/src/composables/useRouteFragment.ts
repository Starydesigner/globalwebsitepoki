import { computed } from "vue";
import { useRoute } from "vue-router";

/** 当前 URL fragment（优先 Vue Router，与浏览器 location 对齐） */
export function useRouteFragment() {
  const route = useRoute();
  return computed(() => {
    const fromRoute = route.hash ?? "";
    if (fromRoute) return fromRoute;
    if (typeof window !== "undefined" && window.location.hash) {
      return window.location.hash;
    }
    return "";
  });
}

export function fragmentId(fragment: string): string {
  return fragment.replace(/^#/, "").trim();
}
