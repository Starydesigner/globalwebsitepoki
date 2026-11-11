import type { Component } from "vue";
import HomeMain from "./home/HomeMain.vue";
import EnterpriseInquiry from "./enterprise-inquiry/EnterpriseInquiry.vue";
import Placeholder from "./placeholder/Placeholder.vue";
import TechGlobal from "./tech-global/TechGlobal.vue";
import NavFrameworkDemo from "./nav-framework-demo/NavFrameworkDemo.vue";

export type ContentPageId =
  | "home"
  | "enterprise-inquiry"
  | "tech-global"
  | "placeholder"
  | "nav-framework-demo";

export interface ContentPageBundle {
  component: Component;
}

const BUNDLES: Record<ContentPageId, ContentPageBundle> = {
  home: { component: HomeMain },
  "enterprise-inquiry": { component: EnterpriseInquiry },
  "tech-global": { component: TechGlobal },
  placeholder: { component: Placeholder },
  "nav-framework-demo": { component: NavFrameworkDemo },
};

export function getContentPage(id: ContentPageId): ContentPageBundle {
  const bundle = BUNDLES[id];
  if (!bundle) throw new Error(`Unknown content page: ${id}`);
  return bundle;
}
