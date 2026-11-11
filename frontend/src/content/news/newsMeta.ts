import type { CbPrimaryTabItem } from "@/components/tabs/types";
import type { ProductLandingRouteConfig } from "@/landing/productLandingMeta";

export type NewsTabId = "news-center" | "corporate-video";

export const NEWS_PRIMARY_TABS: CbPrimaryTabItem[] = [
  {
    id: "news-center",
    label: "新闻中心",
    tabId: "tab-news-center",
    panelId: "panel-news-center",
  },
  {
    id: "corporate-video",
    label: "企业视频",
    tabId: "tab-corporate-video",
    panelId: "panel-corporate-video",
  },
];

export const NEWS_ROUTE_CONFIG: ProductLandingRouteConfig = {
  defaultTab: "news-center",
  primaryTabs: NEWS_PRIMARY_TABS,
  ariaLabel: "新闻资讯",
  panelOnly: false,
};

export const NEWS_BANNER = {
  image: "asset/images/10-21-1420.jpg",
  title: "新闻资讯",
  subtitle: "了解中通国际最新动态与企业资讯",
} as const;
