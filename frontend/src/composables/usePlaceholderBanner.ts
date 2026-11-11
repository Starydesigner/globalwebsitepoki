import { computed } from "vue";
import { useRoute } from "vue-router";

const PAGES = {
  tech: {
    title: "科技全球",
    subtitle: "以科技连接跨境网络，让物流更可视、更可控",
    image: "asset/images/L83A0091-21-1200.jpg",
  },
  investor: {
    title: "投资者关系",
    subtitle: "了解中通国际的经营进展与公开信息",
    image: "asset/images/image-21-3509.png",
  },
  about: {
    title: "关于我们",
    subtitle: "了解中通国际的业务布局与全球网络",
    image: "asset/images/L83A0091-21-1200.jpg",
  },
  news: {
    title: "新闻中心",
    subtitle: "查看中通国际的最新动态与企业资讯",
    image: "asset/images/10-21-1420.jpg",
  },
} as const;

type PlaceholderKey = keyof typeof PAGES;

export function usePlaceholderBanner() {
  const route = useRoute();

  const key = computed(() => {
    const raw = route.query.nav as PlaceholderKey | null;
    if (raw && raw in PAGES) return raw;
    return "tech";
  });

  const page = computed(() => PAGES[key.value]);

  const documentTitle = computed(() => `中通国际 · ${page.value.title}`);

  return { key, page, documentTitle };
}
