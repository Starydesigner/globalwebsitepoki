import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "node-html-parser";

const repoRoot = path.resolve(fileURLToPath(new URL("../..", import.meta.url)));
const outRoot = path.join(repoRoot, "frontend/src/content");

/** @type {{ id: string; source: string; stripHero?: boolean }[]} */
const PAGES = [
  { id: "home", source: path.join(repoRoot, "legacy/static/index.html"), stripHero: true },
  {
    id: "enterprise-inquiry",
    source: path.join(repoRoot, "enterprise-inquiry.html"),
  },
  {
    id: "placeholder",
    source: path.join(repoRoot, "placeholder.html"),
  },
  {
    id: "nav-framework-demo",
    source: path.join(repoRoot, "nav-framework-demo.html"),
  },
];

function shouldSkipMount(el) {
  if (el.tagName === "HEADER" && el.getAttribute("data-site-header") != null) return true;
  if (el.tagName === "FOOTER" && el.classList.contains("site-footer")) return true;
  if (el.tagName === "ASIDE" && el.classList.contains("float-tools")) return true;
  if (el.classList.contains("theme-switch")) return true;
  if (el.tagName === "SECTION" && el.classList.contains("hero")) return true;
  if (el.tagName === "SECTION" && el.classList.contains("page-banner")) return true;
  return false;
}

function extractMainBody(doc, { stripHero }) {
  const shell = doc.querySelector(".page-shell");
  const main = shell?.querySelector("main") ?? doc.querySelector("main");
  if (!main) {
    const parts = [];
    for (const child of doc.querySelector("body").childNodes) {
      if (child.nodeType === 3 && !child.text.trim()) continue;
      if (child.nodeType === 1 && child.tagName === "SCRIPT") continue;
      if (child.nodeType === 1 && shouldSkipMount(child)) continue;
      parts.push(child.toString());
    }
    return {
      rootTag: "div",
      rootClass: "",
      rootId: "",
      innerHtml: parts.join("\n").trim(),
    };
  }
  if (stripHero) main.querySelector("section.hero")?.remove();
  return {
    rootTag: main.tagName.toLowerCase(),
    rootClass: main.getAttribute("class") ?? "",
    rootId: main.getAttribute("id") ?? "",
    innerHtml: main.innerHTML.trim(),
  };
}

fs.mkdirSync(outRoot, { recursive: true });
const registry = {};

for (const page of PAGES) {
  if (!fs.existsSync(page.source)) {
    console.warn("skip missing", page.source);
    continue;
  }
  const html = fs.readFileSync(page.source, "utf8");
  const doc = parse(html);
  const body = extractMainBody(doc, page);

  const pageDir = path.join(outRoot, page.id);
  fs.mkdirSync(pageDir, { recursive: true });
  fs.writeFileSync(path.join(pageDir, "body.html"), `${body.innerHtml}\n`);
  fs.writeFileSync(
    path.join(pageDir, "root.json"),
    `${JSON.stringify({ tag: body.rootTag, class: body.rootClass, id: body.rootId }, null, 2)}\n`,
  );
  fs.writeFileSync(
    path.join(pageDir, "scripts.json"),
    `${JSON.stringify({ scriptSrcs: [], inlineScripts: [], headInlineScripts: [] }, null, 2)}\n`,
  );
  registry[page.id] = page.id;
  console.log("extracted", page.id, body.innerHtml.length, "bytes");
}

fs.writeFileSync(
  path.join(outRoot, "extract-manifest.json"),
  `${JSON.stringify(registry, null, 2)}\n`,
);

console.log("Done.", Object.keys(registry).length, "content pages");
