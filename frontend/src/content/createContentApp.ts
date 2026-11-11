import { createApp } from "vue";
import ContentPageApp from "./ContentPageApp.vue";
import type { ContentPageId } from "./contentPages";
import { getPageById } from "@/config/pages";
import "@repo/css/tokens.css?v=10";
import "@repo/css/base.css?v=10";
import "@/styles/entry-shell.css?v=18";
import "@/styles/page-layout.css?v=10";

export function createContentApp(pageId: ContentPageId) {
  const meta = getPageById(pageId);
  if (!meta) throw new Error(`unknown page ${pageId}`);
  createApp(ContentPageApp, { pageId, meta }).mount("#app");
}
