/**
 * 从 newsArticles.json 生成 title/brief 英文摘要（机翻占位）。
 * 使用：node frontend/scripts/generate-news-summaries-en.mjs
 * 完整正文 HTML 需另行维护 newsArticlesSummaries.en.json 或官网英文源。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const src = path.join(root, "src/data/newsArticles.json");
const out = path.join(root, "src/data/newsArticlesSummaries.en.json");

const articles = JSON.parse(fs.readFileSync(src, "utf8"));
const map = {};

for (const item of articles) {
  map[item.id] = {
    title: item.title,
    brief: item.brief ?? "",
    _note: "Replace with English machine translation",
  };
}

fs.writeFileSync(out, JSON.stringify(map, null, 2) + "\n");
console.log(`Wrote ${Object.keys(map).length} entries to ${out}`);
