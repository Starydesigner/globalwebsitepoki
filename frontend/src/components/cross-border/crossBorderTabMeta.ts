export type CrossBorderPrimaryTab = "import" | "export";

import type { CbPillTabItem, CbPrimaryTabItem } from "@/components/tabs/types";

export const CB_PRIMARY_TABS: CbPrimaryTabItem[] = [
  { id: "import" as const, label: "跨境进口", tabId: "tab-import", panelId: "panel-import" },
  { id: "export" as const, label: "跨境出口", tabId: "tab-export", panelId: "panel-export" },
];

export const CB_EXPORT_PRODUCTS: readonly CbPillTabItem[] = [
  { id: "express", label: "国际特快" },
  { id: "standard", label: "国际标快" },
  { id: "consolidate", label: "国际集运" },
  { id: "cargo", label: "国际大货" },
  { id: "packet", label: "电商小包" },
] as const;

export const CB_IMPORT_PRODUCTS: readonly CbPillTabItem[] = [
  { id: "import-general", label: "国际进口" },
  { id: "import-bulk", label: "进口大件" },
  { id: "import-parcel", label: "电商小件" },
  { id: "import-warehouse", label: "国际仓配" },
] as const;

export type ExportProductId = (typeof CB_EXPORT_PRODUCTS)[number]["id"];
export type ImportProductId = (typeof CB_IMPORT_PRODUCTS)[number]["id"];

const EXPORT_IDS = CB_EXPORT_PRODUCTS.map((i) => i.id);
const IMPORT_PRODUCT_IDS = CB_IMPORT_PRODUCTS.map((i) => i.id);

export interface CrossBorderTabState {
  tab: CrossBorderPrimaryTab;
  exportProduct: ExportProductId;
  importProduct: ImportProductId;
}

const DEFAULT_EXPORT: ExportProductId = "express";
const DEFAULT_IMPORT: ImportProductId = "import-general";

/** 与 legacy hash 路由一致 */
export function stateFromHash(hashRaw: string): CrossBorderTabState {
  const hash = hashRaw.replace(/^#/, "").trim() || "import";
  if (hash === "import") {
    return { tab: "import", exportProduct: DEFAULT_EXPORT, importProduct: DEFAULT_IMPORT };
  }
  if ((IMPORT_PRODUCT_IDS as readonly string[]).includes(hash)) {
    return {
      tab: "import",
      exportProduct: DEFAULT_EXPORT,
      importProduct: hash as ImportProductId,
    };
  }
  if (hash === "export" || (EXPORT_IDS as readonly string[]).includes(hash)) {
    return {
      tab: "export",
      exportProduct: (hash === "export" ? DEFAULT_EXPORT : hash) as ExportProductId,
      importProduct: DEFAULT_IMPORT,
    };
  }
  return { tab: "import", exportProduct: DEFAULT_EXPORT, importProduct: DEFAULT_IMPORT };
}

export function hashFromPrimaryTab(tab: CrossBorderPrimaryTab): string {
  return tab === "import" ? "import" : "export";
}
