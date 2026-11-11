import { siteMsg } from "@/i18n/siteMsg";
import type { SiteMessageKey } from "@/i18n/siteMessages";
import { SHIP_NAV_ITEMS, type ShipViewKey } from "./shipNavConfig";

export interface ShipPanelCrumbLabels {
  parent: string;
  current: string;
}

/** 侧栏分组名 + 当前子页，用于寄递子面板面包屑 */
export function shipPanelCrumbFor(view: ShipViewKey): ShipPanelCrumbLabels | null {
  for (const item of SHIP_NAV_ITEMS) {
    if (item.type !== "group") continue;
    const child = item.children.find((c) => c.id === view);
    if (child) {
      return {
        parent: siteMsg(item.labelKey as SiteMessageKey),
        current: siteMsg(child.labelKey as SiteMessageKey),
      };
    }
  }
  return null;
}
