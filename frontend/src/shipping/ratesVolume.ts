/** 体积重换算除数（cm³ → kg） */
export const RATE_VOLUMETRIC_DIVISOR = 6000;

export function parseCmDimension(raw: string | undefined | null): number | null {
  if (raw == null) return null;
  const value = parseFloat(String(raw).replace(/,/g, "").trim());
  if (!Number.isFinite(value) || value <= 0) return null;
  return value;
}

export function parseKgWeight(raw: string | undefined | null): number | null {
  if (raw == null) return null;
  const value = parseFloat(String(raw).replace(/,/g, "").trim());
  if (!Number.isFinite(value) || value <= 0) return null;
  return value;
}

export function volumetricWeightKg(lengthCm: number, widthCm: number, heightCm: number): number {
  return (lengthCm * widthCm * heightCm) / RATE_VOLUMETRIC_DIVISOR;
}

/** 计费重：实重与体积重取大 */
export function chargeableWeightKg(actualKg: number | null, volumetricKg: number | null): number | null {
  if (volumetricKg == null && actualKg == null) return null;
  if (volumetricKg == null) return actualKg;
  if (actualKg == null) return volumetricKg;
  return Math.max(actualKg, volumetricKg);
}
