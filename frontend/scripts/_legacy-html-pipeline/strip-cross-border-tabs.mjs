import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "node-html-parser";

const bodyPath = path.resolve(
  fileURLToPath(new URL("../src/landing/cross-border/body.html", import.meta.url)),
);
const html = fs.readFileSync(bodyPath, "utf8");
const doc = parse(html, { comment: false });

doc.querySelector(".cb-tabs")?.remove();
doc.querySelectorAll(".cb-switch").forEach((el) => el.remove());

fs.writeFileSync(bodyPath, `${doc.toString().trim()}\n`);
console.log("stripped tabs from cross-border/body.html");
