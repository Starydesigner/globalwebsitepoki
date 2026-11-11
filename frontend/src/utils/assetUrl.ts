/** 将仓库内 asset/ 路径转为带 BASE 的绝对 URL（避免 /news 等子路由相对路径 404） */
export function assetUrl(path: string | undefined): string {
  if (!path) return "";
  if (/^(https?:)?\/\//i.test(path) || path.startsWith("data:")) return path;
  const normalized = path.replace(/^\//, "");
  const base = import.meta.env.BASE_URL || "/";
  return `${base}${normalized}`;
}
