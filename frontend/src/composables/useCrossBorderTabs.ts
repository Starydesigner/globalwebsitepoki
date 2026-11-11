import { nextTick, onMounted, onUnmounted, ref, watch, type ComponentPublicInstance, type Ref } from "vue";
import { useRouter } from "vue-router";
import { resolveDomRoot } from "@/lib/resolveDomRoot";
import {
  hashFromPrimaryTab,
  stateFromHash,
  type CrossBorderPrimaryTab,
  type CrossBorderTabState,
  type ExportProductId,
  type ImportProductId,
} from "@/components/cross-border/crossBorderTabMeta";
import { fragmentId, useRouteFragment } from "./useRouteFragment";

export function useCrossBorderTabs(
  contentRef: Ref<HTMLElement | ComponentPublicInstance | null>,
) {
  const router = useRouter();
  const routeFragment = useRouteFragment();
  const tab = ref<CrossBorderPrimaryTab>("import");
  const exportProduct = ref<ExportProductId>("express");
  const importProduct = ref<ImportProductId>("import-general");

  const applyState = (state: CrossBorderTabState) => {
    tab.value = state.tab;
    exportProduct.value = state.exportProduct;
    importProduct.value = state.importProduct;
  };

  const syncPanelsInDom = () => {
    const root = resolveDomRoot(contentRef.value);
    if (!root) return;

    root.querySelectorAll("[data-cb-panel]").forEach((panel) => {
      const el = panel as HTMLElement;
      el.hidden = el.getAttribute("data-cb-panel") !== tab.value;
    });
    root.querySelectorAll("[data-cb-product-panel]").forEach((panel) => {
      const el = panel as HTMLElement;
      el.hidden = el.getAttribute("data-cb-product-panel") !== exportProduct.value;
    });
    root.querySelectorAll("[data-cb-import-product-panel]").forEach((panel) => {
      const el = panel as HTMLElement;
      el.hidden = el.getAttribute("data-cb-import-product-panel") !== importProduct.value;
    });
  };

  const syncFromHash = () => {
    applyState(stateFromHash(routeFragment.value));
    syncPanelsInDom();
  };

  const pushHash = (hash: string) => {
    const next = hash.startsWith("#") ? hash : `#${hash}`;
    if (routeFragment.value !== next) {
      void router.push({ hash: next });
    }
    syncFromHash();
  };

  const onPrimaryChange = (next: string) => {
    pushHash(hashFromPrimaryTab(next as CrossBorderPrimaryTab));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onExportProductChange = (id: string) => {
    pushHash(id);
  };

  const onImportProductChange = (id: string) => {
    pushHash(id);
  };

  watch([tab, exportProduct, importProduct], syncPanelsInDom);
  watch(contentRef, () => syncPanelsInDom());
  watch(routeFragment, () => syncFromHash(), { flush: "post" });

  onMounted(async () => {
    await nextTick();
    if (!fragmentId(routeFragment.value)) {
      await router.replace({ hash: "#import" });
    }
    syncFromHash();
    await nextTick();
    syncPanelsInDom();
    window.addEventListener("hashchange", syncFromHash);
  });

  onUnmounted(() => {
    window.removeEventListener("hashchange", syncFromHash);
  });

  return {
    tab,
    exportProduct,
    importProduct,
    onPrimaryChange,
    onExportProductChange,
    onImportProductChange,
  };
}
