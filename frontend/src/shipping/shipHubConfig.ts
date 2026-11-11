import type { ShipViewKey } from "./shipNavConfig";

export type ShipHashKey = ShipViewKey | string;

export const SHIP_HASH_ALIAS: Record<string, ShipViewKey> = {
  send: "send",
  enterprise: "send",
  personal: "send",
  lookup: "track",
  track: "track",
  "track-form": "track",
  rates: "rates",
  "rates-form": "rates",
  notice: "notice",
  "notice-body": "notice",
  "notice-forbidden": "notice",
  forbidden: "notice",
  "notice-tariff": "notice",
  tariff: "notice",
  tax: "notice",
  "notice-tax": "notice",
  tw: "tw",
  "tw-form": "tw",
  upload: "upload",
  "upload-form": "upload",
};

export interface ShipBannerConfig {
  image: string;
  title: string;
  titleLine2?: string;
  highlight?: string;
  subtitle: string;
}

/** 寄递服务全站固定 Hero（不随侧栏切换变化） */
export const SHIP_PAGE_BANNER_IMAGE = "asset/images/ship-banner-handoff.jpg";

/** @deprecated 文案见 shippingMessages；ShippingApp 内 computed */
export const SHIP_PAGE_BANNER: ShipBannerConfig = {
  image: SHIP_PAGE_BANNER_IMAGE,
  title: "",
  subtitle: "",
};

export const SHIP_VIEW_TITLE_KEYS: Record<ShipViewKey, import("@/i18n/shippingMessages").ShippingMessageKey> = {
  send: "ship.nav.send",
  track: "ship.nav.track",
  rates: "ship.nav.rates",
  notice: "ship.nav.notice",
  tw: "ship.nav.tw",
  upload: "ship.nav.upload",
};

export function resolveShipView(raw: string): ShipViewKey {
  const key = raw.replace(/^#/, "").trim();
  if (!key) return "send";
  return SHIP_HASH_ALIAS[key] ?? "send";
}
