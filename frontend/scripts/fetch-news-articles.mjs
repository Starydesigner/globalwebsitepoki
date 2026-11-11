/**
 * 从官网接口拉取中文新闻列表，写入 src/data/newsArticles.json。
 * 用法：node scripts/fetch-news-articles.mjs
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "../src/data/newsArticles.json");
const API = "https://websiteapi.ztoglobal.com/news/queryPage";

async function fetchPage(pageNum, pageSize) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      condition: { country: "CN", language: "cn" },
      pageNum,
      pageSize,
    }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  if (!json.success) throw new Error(json.message ?? "API failed");
  return json.data;
}

function toDateString(ms) {
  const d = new Date(ms);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const first = await fetchPage(1, 50);
const all = [...first.result];
for (let p = 2; p <= first.pages; p += 1) {
  const page = await fetchPage(p, 50);
  all.push(...page.result);
}

const items = all
  .map((row) => ({
    id: String(row.id),
    title: row.newsTitle,
    image: row.coverPicUrl ?? "",
    publishedAt: toDateString(row.newUploadDate),
    brief: (row.briefInf ?? "").trim(),
    contentHtml: row.newContent ?? "",
  }))
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

writeFileSync(outPath, `${JSON.stringify(items, null, 2)}\n`, "utf8");
console.log(`Wrote ${items.length} articles → ${outPath}`);
