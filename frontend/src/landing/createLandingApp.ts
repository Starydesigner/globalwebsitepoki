import { createApp } from "vue";
import LandingPageApp from "./LandingPageApp.vue";
import type { LandingPageId } from "./types";
import "@repo/css/tokens.css?v=10";
import "@repo/css/base.css?v=10";
import "@/styles/entry-shell.css?v=18";
import "@/styles/page-layout.css?v=10";

export function createLandingApp(pageId: LandingPageId) {
  createApp(LandingPageApp, { pageId }).mount("#app");
}
