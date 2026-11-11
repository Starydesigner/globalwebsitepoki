import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "node-html-parser";

const repoRoot = path.resolve(fileURLToPath(new URL("../..", import.meta.url)));
const htmlPath = path.join(repoRoot, "legacy/static/online-send.html");
const outDir = path.join(repoRoot, "frontend/src/shipping/panels");

const html = fs.readFileSync(htmlPath, "utf8");
const doc = parse(html);
const panels = doc.querySelectorAll("[data-ship-panel]");

fs.mkdirSync(outDir, { recursive: true });

for (const panel of panels) {
  const key = panel.getAttribute("data-ship-panel");
  if (!key) continue;
  const inner = panel.innerHTML.trim();
  fs.writeFileSync(path.join(outDir, `${key}.html`), `${inner}\n`);
  console.log("extracted", key, inner.length);
}
