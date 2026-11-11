import { onMounted, onUnmounted } from "vue";

/** 物流产品页卡片滚动显现（原 products-page.js） */
export function useProductsPageReveal() {
  const cleanups: (() => void)[] = [];

  onMounted(() => {
    const cards = document.querySelectorAll(
      ".product-rich-card, .product-overseas-card, .product-service-card",
    );
    if (!cards.length) return;

    const revealCard = (card: Element, observer: IntersectionObserver | null) => {
      const el = card as HTMLElement;
      if (el.classList.contains("is-visible")) return;
      el.classList.add("is-visible");
      if (observer) observer.unobserve(el);
    };

    const revealInViewport = (observer: IntersectionObserver) => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      cards.forEach((card) => {
        if ((card as HTMLElement).classList.contains("is-visible")) return;
        const rect = card.getBoundingClientRect();
        if (rect.bottom > 8 && rect.top < vh - 8) {
          revealCard(card, observer);
        }
      });
    };

    const revealCardsInHashSection = (observer: IntersectionObserver) => {
      const hash = location.hash;
      if (!hash || hash.length < 2) return;
      const section = document.getElementById(hash.slice(1));
      if (!section) return;
      section
        .querySelectorAll(".product-rich-card, .product-overseas-card, .product-service-card")
        .forEach((card) => revealCard(card, observer));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cards.forEach((card) => revealCard(card, null));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) revealCard(entry.target, observer);
        });
      },
      { root: null, rootMargin: "0px 0px 12% 0px", threshold: 0.05 },
    );

    cards.forEach((card, index) => {
      (card as HTMLElement).style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 80}ms`);
      observer.observe(card);
    });

    const flushReveal = () => {
      revealCardsInHashSection(observer);
      revealInViewport(observer);
    };

    flushReveal();
    requestAnimationFrame(() => requestAnimationFrame(flushReveal));

    const onLoad = () => flushReveal();
    const onHash = () => requestAnimationFrame(flushReveal);
    const onScroll = () => revealInViewport(observer);

    window.addEventListener("load", onLoad);
    window.addEventListener("hashchange", onHash);
    window.addEventListener("scroll", onScroll, { passive: true });

    cleanups.push(() => {
      observer.disconnect();
      window.removeEventListener("load", onLoad);
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("scroll", onScroll);
    });
  });

  onUnmounted(() => cleanups.forEach((fn) => fn()));
}
