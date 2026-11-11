import icon01 from "@repo/asset/about/sustainability/01-reusable-transit-bag.svg?raw";
import icon02 from "@repo/asset/about/sustainability/02-electronic-waybill.svg?raw";
import icon03 from "@repo/asset/about/sustainability/03-packaging-recycling.svg?raw";
import icon04 from "@repo/asset/about/sustainability/04-linehaul-optimization.svg?raw";
import icon05 from "@repo/asset/about/sustainability/05-new-energy-vehicle.svg?raw";
import icon06 from "@repo/asset/about/sustainability/06-green-channel.svg?raw";

const SUSTAIN_ICON_BY_ASSET: Record<string, string> = {
  "asset/about/sustainability/01-reusable-transit-bag.svg": icon01,
  "asset/about/sustainability/02-electronic-waybill.svg": icon02,
  "asset/about/sustainability/03-packaging-recycling.svg": icon03,
  "asset/about/sustainability/04-linehaul-optimization.svg": icon04,
  "asset/about/sustainability/05-new-energy-vehicle.svg": icon05,
  "asset/about/sustainability/06-green-channel.svg": icon06,
};

export function sustainIconMarkup(iconAssetPath: string): string {
  return SUSTAIN_ICON_BY_ASSET[iconAssetPath] ?? "";
}
