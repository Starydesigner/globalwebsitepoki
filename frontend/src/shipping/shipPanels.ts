import type { Component } from "vue";
import ShipSendPanel from "./panels/ShipSendPanel.vue";
import ShipTrackPanel from "./panels/ShipTrackPanel.vue";
import ShipRatesPanel from "./panels/ShipRatesPanel.vue";
import ShipNoticePanel from "./panels/ShipNoticePanel.vue";
import ShipTwPanel from "./panels/ShipTwPanel.vue";
import ShipUploadPanel from "./panels/ShipUploadPanel.vue";
import type { ShipViewKey } from "./shipNavConfig";

export const SHIP_PANEL_COMPONENTS: Record<ShipViewKey, Component> = {
  send: ShipSendPanel,
  track: ShipTrackPanel,
  rates: ShipRatesPanel,
  notice: ShipNoticePanel,
  tw: ShipTwPanel,
  upload: ShipUploadPanel,
};

export const SHIP_PANEL_KEYS = Object.keys(SHIP_PANEL_COMPONENTS) as ShipViewKey[];
