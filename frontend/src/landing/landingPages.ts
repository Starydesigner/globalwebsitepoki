import type { LandingPageConfig, LandingPageId } from "./types";
import ProductsBody from "./products/ProductsBody.vue";
import InnerLocalBody from "./inner-local/InnerLocalBody.vue";
import OverseasLocalBody from "./overseas-local/OverseasLocalBody.vue";
import SolutionBody from "./solution/SolutionBody.vue";
import { PRODUCT_LANDING_PAGE_BANNER } from "./productLandingBanner";

const PAGES: Record<LandingPageId, LandingPageConfig> = {
  products: {
    id: "products",
    documentTitle: "中通国际 · 物流产品",
    bodyClass: "product-page",
    activeNav: "products",
    banner: {
      type: "page",
      ...PRODUCT_LANDING_PAGE_BANNER,
    },
    bodyComponent: ProductsBody,
  },
  "inner-local": {
    id: "inner-local",
    documentTitle: "中通国际 · 中国港澳本土服务",
    bodyClass: "cb-page",
    activeNav: "products",
    banner: {
      type: "page",
      ...PRODUCT_LANDING_PAGE_BANNER,
    },
    bodyComponent: InnerLocalBody,
  },
  "overseas-local": {
    id: "overseas-local",
    documentTitle: "中通国际 · 海外本土派送",
    bodyClass: "cb-page",
    activeNav: "products",
    banner: {
      type: "page",
      ...PRODUCT_LANDING_PAGE_BANNER,
    },
    bodyComponent: OverseasLocalBody,
  },
  solution: {
    id: "solution",
    documentTitle: "中通国际 · 跨境解决方案",
    bodyClass: "cb-page",
    activeNav: "products",
    banner: {
      type: "page",
      ...PRODUCT_LANDING_PAGE_BANNER,
    },
    bodyComponent: SolutionBody,
  },
};

export function getLandingPage(id: LandingPageId): LandingPageConfig {
  const page = PAGES[id];
  if (!page) throw new Error(`Unknown landing page: ${id}`);
  return page;
}
