/** 运费时效：仅澳大利亚（含州/领地子级）需填写目的地邮编 */
const AU_ROOT = "澳大利亚";

export function destinationRouteNeedsPostcode(routeLabel: string): boolean {
  const label = routeLabel.trim();
  return label === AU_ROOT || label.startsWith(`${AU_ROOT}-`);
}

export function destinationNeedsPostcode(root: ParentNode): boolean {
  const dest = root.querySelector<HTMLElement>("[data-rate-dest]");
  if (!dest) return false;
  const routeLabel = dest.getAttribute("data-route-label") ?? "";
  return destinationRouteNeedsPostcode(routeLabel);
}
