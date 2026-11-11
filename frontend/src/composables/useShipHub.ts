import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { ShipViewKey } from "@/shipping/shipNavConfig";
import { SHIP_VIEW_TITLE_KEYS, resolveShipView } from "@/shipping/shipHubConfig";
import { siteMsg } from "@/i18n/siteMsg";
import type { SiteMessageKey } from "@/i18n/siteMessages";
import { fragmentId, useRouteFragment } from "./useRouteFragment";

export function useShipHub(initialRaw?: string) {
  const route = useRoute();
  const router = useRouter();
  const routeFragment = useRouteFragment();
  const activeView = ref<ShipViewKey>("send");
  const lastRawHash = ref("");

  const resolveRawInput = (): string => {
    const routeDefault = route.meta.shipInitialView as ShipViewKey | undefined;
    if (routeDefault) return routeDefault;
    const fromFragment = fragmentId(routeFragment.value);
    if (fromFragment) return fromFragment;
    if (initialRaw) return initialRaw;
    return "send";
  };

  const navigate = (raw: string, options?: { scrollTop?: boolean; pushHash?: boolean }) => {
    const scrollTop = options?.scrollTop ?? true;
    const pushHash = options?.pushHash ?? true;
    const view = resolveShipView(raw);
    lastRawHash.value = raw.replace(/^#/, "") || view;
    activeView.value = view;

    if (pushHash) {
      const next = `#${lastRawHash.value}`;
      if (routeFragment.value !== next) {
        void router.push({ hash: next });
      }
    }

    const viewKey = SHIP_VIEW_TITLE_KEYS[view];
    const viewTitle = viewKey ? siteMsg(viewKey as SiteMessageKey) : siteMsg("page.onlineSend");
    document.title = `${siteMsg("page.brand")} · ${viewTitle}`;
    document.dispatchEvent(
      new CustomEvent("ship-panel-change", {
        detail: { key: view, raw: lastRawHash.value },
      }),
    );

    if (scrollTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const anchorId = lastRawHash.value;
    if (anchorId && anchorId !== view) {
      requestAnimationFrame(() => {
        const anchor = document.getElementById(anchorId);
        anchor?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  };

  const syncFromRoute = () => {
    navigate(resolveRawInput(), { scrollTop: false, pushHash: false });
  };

  const onHashChange = () => {
    navigate(fragmentId(location.hash) || resolveRawInput(), { scrollTop: false, pushHash: false });
  };

  watch(routeFragment, () => syncFromRoute(), { flush: "post" });
  watch(
    () => route.path,
    () => syncFromRoute(),
    { flush: "post" },
  );

  onMounted(async () => {
    await nextTick();
    syncFromRoute();
    window.addEventListener("hashchange", onHashChange);
  });

  onUnmounted(() => {
    window.removeEventListener("hashchange", onHashChange);
  });

  return { activeView, navigate };
}
