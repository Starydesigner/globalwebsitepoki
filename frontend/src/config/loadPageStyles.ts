import type { PageMeta } from "./pages";

const loaded = new Set<string>();

/** 按页懒加载仓库 css（与原 MPA main.ts 一致） */
export async function loadPageStyles(pageId: string): Promise<void> {
  if (loaded.has(pageId)) return;

  switch (pageId) {
    case "home":
      await import("@repo/css/pages/home.css");
      await import("@repo/css/pages/mission-scene.css");
      await import("@repo/css/components/shared-view-transition.css");
      break;
    case "online-send":
      await import("@repo/css/components/ship-side.css");
      await import("@repo/css/components/rate-card.css");
      await import("@repo/css/pages/online-send.css");
      break;
    case "products":
      /* 样式由 frontend/src/components/products/*.vue 与 ProductsBody 共置引入 */
      break;
    case "about":
      /* 样式由 AboutPageApp 共置引入 */
      break;
    case "cross-border":
      await import("@repo/css/components/shared-view-transition.css");
      await import("@repo/css/pages/cross-border.css");
      break;
    case "overseas-local":
    case "inner-local":
      await import("@repo/css/components/product-service-card.css");
      await import("@repo/css/pages/cross-border.css");
      break;
    case "solution":
      await import("@repo/css/pages/cross-border.css");
      break;
    case "enterprise-inquiry":
      await import("@repo/css/components/subpage-frame.css");
      await import("@repo/css/pages/online-send.css");
      await import("@repo/css/pages/enterprise-inquiry.css");
      break;
    case "tech-global":
      await import("@repo/css/pages/tech-global.css");
      break;
    case "news":
      /* 样式由 NewsPageApp 共置引入 */
      break;
    case "news-detail":
      /* 样式由 NewsDetailPageApp 共置引入 */
      break;
    case "placeholder":
      await import("@/styles/demo-main.css");
      break;
    case "nav-framework-demo":
      await import("@/styles/demo-main.css");
      break;
    case "rates":
      /* 与 online-send 共用布局；勿用 shipping.css 里的 .ship-main 大 padding（仅 legacy ship-hub） */
      await import("@repo/css/components/ship-side.css");
      await import("@repo/css/components/rate-card.css");
      await import("@repo/css/pages/online-send.css");
      break;
    default:
      break;
  }

  loaded.add(pageId);
}

export function applyPageDocumentMeta(meta: PageMeta | undefined) {
  if (!meta) return;
  document.body.className = meta.bodyClass;
  if (meta.id !== "placeholder") {
    document.title = meta.documentTitle;
  }
}
