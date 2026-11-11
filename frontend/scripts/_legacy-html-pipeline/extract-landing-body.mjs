import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "node-html-parser";

const repoRoot = path.resolve(fileURLToPath(new URL("../..", import.meta.url)));
const legacyDir = path.join(repoRoot, "legacy/static");
const outRoot = path.join(repoRoot, "frontend/src/landing");

const PAGE_FILES = [
  "products",
  "cross-border",
  "inner-local",
  "overseas-local",
  "solution",
];

const SKIP_SCRIPT = /site-header\.js|float-tools\.js/i;

function shouldSkipMount(node) {
  if (node.nodeType !== 1) return false;
  const el = node;
  if (el.tagName === "HEADER" && el.getAttribute("data-site-header") != null) return true;
  if (el.tagName === "FOOTER" && el.classList.contains("site-footer")) return true;
  if (el.tagName === "ASIDE" && el.classList.contains("float-tools")) return true;
  if (el.classList.contains("theme-switch")) return true;
  if (el.tagName === "SECTION" && el.classList.contains("hero")) return true;
  if (el.tagName === "SECTION" && el.classList.contains("page-banner")) return true;
  return false;
}

function collectMountHtml(doc) {
  const shell = doc.querySelector(".page-shell");
  if (shell) {
    const main = shell.querySelector("main");
    if (!main) return "";
    const clone = parse(main.toString());
    clone.querySelector("section.hero")?.remove();
    return clone.toString().trim();
  }

  const parts = [];
  for (const child of doc.querySelector("body").childNodes) {
    if (child.nodeType === 3 && !child.text.trim()) continue;
    if (child.nodeType === 1 && child.tagName === "SCRIPT") continue;
    if (child.nodeType === 1 && shouldSkipMount(child)) continue;
    parts.push(child.toString());
  }
  return parts.join("\n").trim();
}

function extractScripts(doc) {
  const scriptSrcs = [];
  const inlineScripts = [];
  for (const script of doc.querySelectorAll("body script")) {
    const src = script.getAttribute("src");
    if (src) {
      if (!SKIP_SCRIPT.test(src)) scriptSrcs.push(src);
    } else if (script.text.trim()) {
      inlineScripts.push(script.text);
    }
  }
  const headInlineScripts = [];
  for (const script of doc.querySelectorAll("head script")) {
    if (!script.getAttribute("src") && script.text.trim()) {
      headInlineScripts.push(script.text);
    }
  }
  return { scriptSrcs, inlineScripts, headInlineScripts };
}

const TAB_STRIPPED_PAGES = new Set(["cross-border", "inner-local", "overseas-local"]);

function stripTabMarkup(html) {
  const stripped = parse(html);
  stripped.querySelector(".cb-tabs")?.remove();
  stripped.querySelectorAll(".cb-switch").forEach((el) => el.remove());
  const main = stripped.querySelector("main");
  return main ? main.innerHTML.trim() : stripped.toString().trim();
}

const registry = {};

for (const id of PAGE_FILES) {
  const sourcePath = path.join(legacyDir, `${id}.html`);
  if (!fs.existsSync(sourcePath)) {
    console.warn("skip missing", sourcePath);
    continue;
  }
  const html = fs.readFileSync(sourcePath, "utf8");
  const doc = parse(html);
  const bodyHtml = collectMountHtml(doc);
  const scripts = extractScripts(doc);

  const pageDir = path.join(outRoot, id);
  fs.mkdirSync(pageDir, { recursive: true });
  let finalBody = bodyHtml;
  if (TAB_STRIPPED_PAGES.has(id)) {
    finalBody = stripTabMarkup(finalBody);
  }
  fs.writeFileSync(path.join(pageDir, "body.html"), `${finalBody}\n`);
  fs.writeFileSync(
    path.join(pageDir, "scripts.json"),
    `${JSON.stringify({ scriptSrcs: [], inlineScripts: [], headInlineScripts: [] }, null, 2)}\n`,
  );

  registry[id] = { bodyFile: `./${id}/body.html`, scriptsFile: `./${id}/scripts.json` };
  console.log("extracted", id, bodyHtml.length, "bytes");
}

fs.writeFileSync(
  path.join(outRoot, "extract-manifest.json"),
  `${JSON.stringify(registry, null, 2)}\n`,
);

console.log("Done.", PAGE_FILES.length, "pages");
