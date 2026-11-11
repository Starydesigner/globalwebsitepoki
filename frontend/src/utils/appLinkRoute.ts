import type { RouteLocationRaw } from "vue-router";

export function isAppInternalHref(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

/** 与 AppLink 一致：解析站内 path / query / hash */
export function toAppLinkRoute(href: string): RouteLocationRaw {
  const hashIndex = href.indexOf("#");
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : "";
  const withoutHash = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const queryIndex = withoutHash.indexOf("?");
  if (queryIndex >= 0) {
    const path = withoutHash.slice(0, queryIndex) || "/";
    const query = Object.fromEntries(new URLSearchParams(withoutHash.slice(queryIndex)));
    return { path, hash, query };
  }
  return { path: withoutHash || "/", hash: hash || undefined };
}
