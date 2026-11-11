import type { ShippingMessageKey } from "@/i18n/shippingMessages";

/** 寄递服务侧边栏：一级入口 / 可折叠二级分组 */

export type ShipViewKey = "send" | "track" | "rates" | "notice" | "upload" | "tw";

export interface ShipNavPrimaryItem {
  type: "primary";
  id: ShipViewKey;
  labelKey: ShippingMessageKey;
  icon: string;
}

export interface ShipNavSecondaryItem {
  type: "secondary";
  id: ShipViewKey;
  labelKey: ShippingMessageKey;
}

export interface ShipNavGroupItem {
  type: "group";
  id: string;
  labelKey: ShippingMessageKey;
  icon: string;
  chevronIcon?: string;
  defaultOpen?: boolean;
  children: ShipNavSecondaryItem[];
}

export type ShipNavItem = ShipNavPrimaryItem | ShipNavGroupItem;

export const SHIP_NAV_ITEMS: ShipNavItem[] = [
  {
    type: "primary",
    id: "send",
    labelKey: "ship.nav.send",
    icon: "asset/shipping/send.svg",
  },
  {
    type: "group",
    id: "query",
    labelKey: "ship.nav.query",
    icon: "asset/shipping/query.svg",
    chevronIcon: "asset/shipping/chevron.svg",
    defaultOpen: true,
    children: [
      { type: "secondary", id: "track", labelKey: "ship.nav.track" },
      { type: "secondary", id: "rates", labelKey: "ship.nav.rates" },
      { type: "secondary", id: "notice", labelKey: "ship.nav.notice" },
    ],
  },
  {
    type: "group",
    id: "customs",
    labelKey: "ship.nav.customs",
    icon: "asset/shipping/customs.svg",
    chevronIcon: "asset/shipping/chevron.svg",
    defaultOpen: true,
    children: [
      { type: "secondary", id: "upload", labelKey: "ship.nav.upload" },
      { type: "secondary", id: "tw", labelKey: "ship.nav.tw" },
    ],
  },
];
