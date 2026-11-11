import type { ComponentPublicInstance } from "vue";

/** 组件 ref 或 DOM ref 统一解析为 HTMLElement（供 Tab 同步等 DOM 脚本使用） */
export function resolveDomRoot(
  el: HTMLElement | ComponentPublicInstance | null | undefined,
): HTMLElement | null {
  if (!el) return null;
  if (el instanceof HTMLElement) return el;
  const root = el.$el;
  return root instanceof HTMLElement ? root : null;
}
