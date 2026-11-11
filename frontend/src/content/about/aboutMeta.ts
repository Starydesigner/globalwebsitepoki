import type { CbPrimaryTabItem } from "@/components/tabs/types";
import type { ProductLandingRouteConfig } from "@/landing/productLandingMeta";

export type AboutTabId = "about-us" | "sustainability" | "social" | "join";

export const ABOUT_PRIMARY_TABS: CbPrimaryTabItem[] = [
  {
    id: "about-us",
    label: "关于我们",
    tabId: "tab-about-us",
    panelId: "panel-about-us",
  },
  {
    id: "sustainability",
    label: "可持续发展",
    tabId: "tab-sustainability",
    panelId: "panel-sustainability",
  },
  {
    id: "social",
    label: "社会责任",
    tabId: "tab-social",
    panelId: "panel-social",
  },
  {
    id: "join",
    label: "加入我们",
    tabId: "tab-join",
    panelId: "panel-join",
  },
];

export const ABOUT_ROUTE_CONFIG: ProductLandingRouteConfig = {
  defaultTab: "about-us",
  primaryTabs: ABOUT_PRIMARY_TABS,
  ariaLabel: "关于我们",
  panelOnly: false,
};

export const ABOUT_BANNER = {
  image: "asset/images/10-21-1420.jpg",
  title: "链通全球 世界无界",
  subtitle: "ZTO: Anywhere",
} as const;
