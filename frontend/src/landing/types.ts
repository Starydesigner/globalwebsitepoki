import type { Component } from "vue";
import type { BannerKind } from "@/config/pages";

export type LandingPageId = "products" | "inner-local" | "overseas-local" | "solution";

export interface LandingPageConfig {
  id: LandingPageId;
  documentTitle: string;
  bodyClass: string;
  activeNav: string;
  banner: BannerKind;
  bodyComponent: Component;
}
