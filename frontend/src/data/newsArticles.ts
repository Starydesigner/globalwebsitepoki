import articles from "./newsArticles.json";
import type { SiteUiLang } from "@/i18n/siteMessages";
import summariesEn from "./newsArticlesSummaries.en.json";

/** 新闻中心静态列表（来源：websiteapi.ztoglobal.com，与官网 newsList 一致） */
export interface NewsArticle {
  id: string;
  title: string;
  image: string;
  /** ISO 日期 YYYY-MM-DD */
  publishedAt: string;
  brief?: string;
  contentHtml: string;
}

export const NEWS_ARTICLES: NewsArticle[] = articles as NewsArticle[];

const byId = new Map(NEWS_ARTICLES.map((item) => [item.id, item]));

export function getNewsArticleById(id: string): NewsArticle | undefined {
  return byId.get(id);
}

export function formatNewsArticleDate(isoDate: string, lang: SiteUiLang = "zh") {
  const [y, m, d] = isoDate.split("-").map(Number);
  if (lang === "en") {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${months[m - 1] ?? m} ${d}, ${y}`;
  }
  return `${y}年${m}月${d}日`;
}

type NewsSummaryEn = { title?: string; brief?: string };

const enById = summariesEn as Record<string, NewsSummaryEn>;

export function localizeNewsArticle(article: NewsArticle, lang: SiteUiLang): NewsArticle {
  if (lang === "zh") return article;
  const overlay = enById[article.id];
  if (!overlay) return article;
  return {
    ...article,
    title: overlay.title ?? article.title,
    brief: overlay.brief ?? article.brief,
  };
}
