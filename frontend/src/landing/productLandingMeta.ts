import type { CbPrimaryTabItem } from "@/components/tabs/types";
import type { LandingPageId } from "./types";

export interface ProductLandingRouteConfig {
  defaultTab: string;
  hashToTab?: Record<string, string>;
  primaryTabs: CbPrimaryTabItem[];
  ariaLabel: string;
  /** 仅切换 data-pl-panel（无二级胶囊） */
  panelOnly: true;
}

export const PRODUCT_LANDING_ROUTES: Record<
  Extract<LandingPageId, "inner-local" | "overseas-local">,
  ProductLandingRouteConfig
> = {
  "inner-local": {
    defaultTab: "hk",
    hashToTab: {
      "hk-delivery": "hk",
      "hk-pickup": "hk",
      "hk-locker": "hk",
    },
    ariaLabel: "港澳本土服务",
    panelOnly: true,
    primaryTabs: [
      { id: "hk", label: "中国香港地区" },
      { id: "mo", label: "中国澳门地区" },
    ],
  },
  "overseas-local": {
    defaultTab: "asia",
    ariaLabel: "海外本土服务",
    panelOnly: true,
    primaryTabs: [
      { id: "asia", label: "亚洲" },
      { id: "africa", label: "非洲" },
      { id: "warehouse", label: "海外仓" },
    ],
  },
};
