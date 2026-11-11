import { inject, type InjectionKey, type Ref } from "vue";

/** ProductLandingApp 注入，供 inner-local / overseas-local 子面板 v-show 切换 */
export const PRODUCT_LANDING_TAB_KEY: InjectionKey<Ref<string>> = Symbol("productLandingTab");

export function useProductLandingActiveTab(): Ref<string> {
  const tab = inject(PRODUCT_LANDING_TAB_KEY, null);
  if (!tab) {
    throw new Error("useProductLandingActiveTab: 需在 ProductLandingApp 下使用");
  }
  return tab;
}
