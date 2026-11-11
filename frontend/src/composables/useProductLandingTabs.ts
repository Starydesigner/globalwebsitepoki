import { nextTick, onMounted, onUnmounted, ref, watch, type ComponentPublicInstance, type Ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { resolveDomRoot } from "@/lib/resolveDomRoot";
import type { ProductLandingRouteConfig } from "@/landing/productLandingMeta";
import { fragmentId, useRouteFragment } from "./useRouteFragment";

function scrollToHashAnchor(hash: string) {
  const id = fragmentId(hash);
  if (!id) return;
  const el = document.getElementById(id);
  if (!el) return;
  requestAnimationFrame(() => {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function resolveTab(config: ProductLandingRouteConfig, hashRaw: string): string {
  const hash = fragmentId(hashRaw);
  if (!hash) return config.defaultTab;
  if (config.hashToTab?.[hash]) return config.hashToTab[hash];
  if (config.primaryTabs.some((t) => t.id === hash)) return hash;
  return config.defaultTab;
}

export function useProductLandingTabs(
  config: ProductLandingRouteConfig,
  contentRef: Ref<HTMLElement | ComponentPublicInstance | null>,
) {
  const router = useRouter();
  const route = useRoute();
  const routeFragment = useRouteFragment();
  const tab = ref(config.defaultTab);

  const syncPanelsInDom = () => {
    if (config.panelOnly) return;

    const root = resolveDomRoot(contentRef.value);
    if (!root) return;

    root.querySelectorAll("[data-pl-panel]").forEach((panel) => {
      const el = panel as HTMLElement;
      const isActive = el.getAttribute("data-pl-panel") === tab.value;
      el.hidden = !isActive;
      el.setAttribute("aria-hidden", isActive ? "false" : "true");
    });
  };

  const syncFromHash = () => {
    tab.value = resolveTab(config, routeFragment.value);
    syncPanelsInDom();
    scrollToHashAnchor(routeFragment.value);
  };

  const onPrimaryChange = (next: string) => {
    const nextHash = `#${next}`;
    if (routeFragment.value !== nextHash) {
      void router.push({ path: route.path, hash: nextHash });
    }
    tab.value = next;
    syncPanelsInDom();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  watch(tab, syncPanelsInDom);
  watch(contentRef, () => syncPanelsInDom());
  watch(routeFragment, () => syncFromHash(), { flush: "post" });

  onMounted(async () => {
    await nextTick();
    if (!fragmentId(routeFragment.value)) {
      await router.replace({ hash: `#${config.defaultTab}` });
    }
    syncFromHash();
    await nextTick();
    syncPanelsInDom();
    window.addEventListener("hashchange", syncFromHash);
  });

  onUnmounted(() => {
    window.removeEventListener("hashchange", syncFromHash);
  });

  return { tab, onPrimaryChange };
}
