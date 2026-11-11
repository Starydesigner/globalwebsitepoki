import { computed, ref } from "vue";
import { localizeNewsArticle, NEWS_ARTICLES, type NewsArticle } from "@/data/newsArticles";
import { useSiteLocale } from "@/i18n/useSiteLocale";

const PAGE_SIZE = 10;

export function parseNewsDateParts(isoDate: string, lang: "zh" | "en" = "zh") {
  const [y, m, d] = isoDate.split("-").map(Number);
  const monthsEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return {
    day: String(d).padStart(2, "0"),
    monthLabel: lang === "en" ? (monthsEn[m - 1] ?? String(m)) : `${m}月`,
    year: String(y),
  };
}

function sortByDateDesc(items: NewsArticle[]) {
  return [...items].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function useNewsCenterList() {
  const { uiLang } = useSiteLocale();
  const visibleCount = ref(PAGE_SIZE);

  const sortedArticles = computed(() => sortByDateDesc(NEWS_ARTICLES));

  const visibleArticles = computed(() =>
    sortedArticles.value.slice(0, visibleCount.value).map((article) => {
      const localized = localizeNewsArticle(article, uiLang.value);
      return {
        ...localized,
        dateParts: parseNewsDateParts(article.publishedAt, uiLang.value),
      };
    }),
  );

  const canLoadMore = computed(() => visibleCount.value < sortedArticles.value.length);

  function loadMore() {
    visibleCount.value = Math.min(visibleCount.value + PAGE_SIZE, sortedArticles.value.length);
  }

  return {
    visibleArticles,
    canLoadMore,
    loadMore,
    totalCount: computed(() => sortedArticles.value.length),
  };
}
