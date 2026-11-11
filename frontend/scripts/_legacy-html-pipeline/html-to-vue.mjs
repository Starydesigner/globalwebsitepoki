/**
 * 将抽取的 HTML 片段编译为 Vue SFC（template，非运行时 v-html）
 * 用法：node scripts/html-to-vue.mjs
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const repoRoot = path.resolve(root, "..");

function normalizeForVueTemplate(html) {
  let s = html.trim();
  s = s.replace(/\r\n/g, "\n");
  s = s.replace(/<!--[\s\S]*?-->/g, "");
  s = s.replace(/<img([^>]*?)(?<!\/)\s*>/gi, "<img$1 />");
  s = s.replace(/<br([^>]*?)(?<!\/)\s*>/gi, "<br$1 />");
  s = s.replace(/<hr([^>]*?)(?<!\/)\s*>/gi, "<hr$1 />");
  s = s.replace(/<input([^>]*?)(?<!\/)\s*>/gi, "<input$1 />");
  return s;
}

function writeSfc(outPath, { scriptSetup = "", template, name }) {
  const body = normalizeForVueTemplate(template);
  const script = scriptSetup.trim()
    ? `<script setup lang="ts">\n${scriptSetup.trim()}\n</script>\n\n`
    : `<script setup lang="ts">\ndefineOptions({ name: "${name}" });\n</script>\n\n`;
  const sfc = `${script}<template>\n${body}\n</template>\n`;
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, sfc);
  console.log("wrote", path.relative(repoRoot, outPath), body.length, "chars");
}

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function wrapRoot(rootMeta, inner) {
  const tag = rootMeta.tag || "div";
  const cls = rootMeta.class ? ` class="${rootMeta.class}"` : "";
  const id = rootMeta.id ? ` id="${rootMeta.id}"` : "";
  return `<${tag}${id}${cls}>\n${inner}\n</${tag}>`;
}

/** @type {{ name: string; out: string; template: string; scriptSetup?: string }[]} */
const jobs = [];

for (const id of ["enterprise-inquiry", "placeholder", "nav-framework-demo"]) {
  const dir = path.join(root, "src/content", id);
  const inner = fs.readFileSync(path.join(dir, "body.html"), "utf8");
  const rootMeta = readJson(path.join(dir, "root.json"));
  const pascal = id
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
  const scriptSetup =
    id === "enterprise-inquiry"
      ? `import { useEnterpriseInquiry } from "@/composables/enterprise/useEnterpriseInquiry";

defineOptions({ name: "${pascal}" });
useEnterpriseInquiry();`
      : undefined;
  jobs.push({
    name: pascal,
    out: path.join(dir, `${pascal}.vue`),
    template: wrapRoot(rootMeta, inner),
    scriptSetup,
  });
}

for (const id of ["products", "solution", "cross-border", "inner-local", "overseas-local"]) {
  const dir = path.join(root, "src/landing", id);
  const inner = fs.readFileSync(path.join(dir, "body.html"), "utf8");
  const pascal =
    id === "cross-border"
      ? "CrossBorderBody"
      : id
          .split("-")
          .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
          .join("") + "Body";
  const scriptSetup =
    id === "products"
      ? `import { useProductsPageEffects } from "@/composables/products/useProductsPageEffects";

defineOptions({ name: "${pascal}" });
useProductsPageEffects();`
      : undefined;
  jobs.push({
    name: pascal,
    out: path.join(dir, `${pascal}.vue`),
    template: inner,
    scriptSetup,
  });
}

const panelMeta = {
  send: { class: "", extra: "" },
  track: { class: "ship-panel--track", extra: ' data-track-root=""' },
  rates: { class: "ship-panel--rates", extra: "" },
  notice: { class: "ship-panel--notice", extra: ' data-notice-root=""' },
  tw: { class: "ship-panel--clearance", extra: "" },
  upload: { class: "ship-panel--clearance", extra: "" },
};

for (const [key, meta] of Object.entries(panelMeta)) {
  const inner = fs.readFileSync(path.join(root, "src/shipping/panels", `${key}.html`), "utf8");
  const pascal = `Ship${key.charAt(0).toUpperCase()}${key.slice(1)}Panel`;
  const cls = meta.class ? ` ship-panel ${meta.class}` : " ship-panel";
  jobs.push({
    name: pascal,
    out: path.join(root, "src/shipping/panels", `${pascal}.vue`),
    scriptSetup: "defineProps<{ visible: boolean }>();",
    template: `<div class="${cls.trim()}" data-ship-panel="${key}"${meta.extra} :hidden="!visible">\n${inner}\n</div>`,
  });
}

const partials = [
  { file: "mega-menus.html", name: "MegaMenusLayer", out: "src/components/layout/MegaMenusLayer.vue" },
  { file: "site-footer.html", name: "SiteFooterMarkup", out: "src/components/layout/SiteFooterMarkup.vue" },
  { file: "float-tools-bundle.html", name: "FloatToolsMarkup", out: "src/components/layout/FloatToolsMarkup.vue" },
];

for (const p of partials) {
  const html = fs.readFileSync(path.join(repoRoot, "partials", p.file), "utf8");
  jobs.push({
    name: p.name,
    out: path.join(root, p.out),
    template: html,
  });
}

for (const job of jobs) {
  writeSfc(job.out, job);
}

console.log("Done.", jobs.length, "Vue SFCs");

const split = spawnSync(process.execPath, ["scripts/split-home-main.mjs"], {
  cwd: root,
  stdio: "inherit",
});
if (split.status !== 0) {
  process.exit(split.status ?? 1);
}
