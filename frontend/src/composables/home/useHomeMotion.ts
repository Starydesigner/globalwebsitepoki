import { onMounted } from "vue";

/** 首页入场、标题拆字、滚动 reveal（原 home-motion.js） */
export function useHomeMotion() {
  onMounted(() => {
    const body = document.body;
    if (!body.classList.contains("page-home")) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fluidEase = "cubic-bezier(0.16, 1, 0.3, 1)";

    const markEntered = () => body.classList.add("is-entered");

    if (reduced) {
      markEntered();
    } else {
      requestAnimationFrame(() => requestAnimationFrame(markEntered));
      document.querySelectorAll(".site-header--hero .site-header__nav-item").forEach((el, i) => {
        (el as HTMLElement).style.setProperty("--nav-i", String(i));
      });
    }

    const titleSplitModes: Record<string, string> = {
      "products-title": "is-split--flip",
      "mission-title": "is-split--slide",
      "news-title": "is-split--zoom",
    };

    const splitIntoLetters = (el: HTMLElement, mode: string) => {
      const text = el.textContent?.trim() ?? "";
      el.textContent = "";
      el.classList.add("is-split", mode);
      el.setAttribute("aria-label", text);
      [...text].forEach((ch, i) => {
        const span = document.createElement("span");
        span.className = "letter";
        span.textContent = ch;
        span.setAttribute("aria-hidden", "true");
        span.style.transitionDelay = `${0.04 + i * 0.038}s`;
        el.append(span);
      });
    };

    const splitSectionTitles = () => {
      const titles = document.querySelectorAll("#products-title, #mission-title, #news-title");
      if (!titles.length || reduced) return;
      titles.forEach((node) => {
        const title = node as HTMLElement;
        if (title.closest(".mission-scene")) return;
        splitIntoLetters(title, titleSplitModes[title.id] ?? "is-split--flip");
      });
    };

    const playTitle = (title: HTMLElement | null) => {
      if (!title || reduced) return;
      title.classList.remove("is-in");
      void title.offsetWidth;
      title.classList.add("is-in");
    };

    const resetTitle = (title: HTMLElement | null) => {
      title?.classList.remove("is-in");
    };

    const cardModes = ["card-left", "card-up", "card-right"];

    const armReveal = (el: HTMLElement, delay: number, mode?: string) => {
      el.classList.add("reveal-motion", "is-armed");
      if (mode) el.classList.add(`reveal-motion--${mode}`);
      el.style.setProperty("--reveal-delay", `${delay}s`);
    };

    const playReveal = (el: HTMLElement) => {
      if (!el.classList.contains("reveal-motion")) return;
      el.classList.remove("is-in");
      el.classList.add("is-armed");
      void el.offsetWidth;
      el.classList.remove("is-armed");
      el.classList.add("is-in");
    };

    const resetReveal = (el: HTMLElement) => {
      el.classList.remove("is-in");
      el.classList.add("is-armed");
    };

    const setupScrollReveals = () => {
      if (reduced) return;

      const buttons = [...document.querySelectorAll(".section-heading .btn-outline")] as HTMLElement[];
      const metas = [...document.querySelectorAll(".section-heading__meta")] as HTMLElement[];
      const productsTitle = document.querySelector("#products-title") as HTMLElement | null;
      const newsTitle = document.querySelector("#news-title") as HTMLElement | null;
      const productCards = [...document.querySelectorAll(".product-card")] as HTMLElement[];

      type RevealItem = [HTMLElement, number, string | undefined];
      type RevealGroup = {
        root: Element | null;
        title?: HTMLElement | null;
        items: RevealItem[];
      };

      const groups: RevealGroup[] = [
        {
          root: document.querySelector(".section-products .section-heading"),
          title: productsTitle,
          items: [
            [metas[0], 0.1, "meta"],
            [buttons[0], 0.2, "cta"],
          ],
        },
        {
          root: document.querySelector(".product-grid"),
          items: productCards.map((el, i) => [el, i * 0.09, cardModes[i] ?? "card-up"]),
        },
        {
          root: document.querySelector(".section-news .section-heading"),
          title: newsTitle,
          items: [
            [metas[1], 0.1, "meta"],
            [buttons[1], 0.2, "cta"],
          ],
        },
        {
          root: document.querySelector(".news-layout"),
          items: [[document.querySelector(".news-feature") as HTMLElement, 0, "card-left"]],
        },
        {
          root: document.querySelector(".news-list"),
          items: [...document.querySelectorAll(".news-item")].map(
            (el, i) => [el as HTMLElement, i * 0.06, "news-right"] as RevealItem,
          ),
        },
        {
          root: document.querySelector(".site-footer__brand"),
          items: [
            [document.querySelector(".site-footer__mark") as HTMLElement, 0, "footer-mark"],
            [document.querySelector(".site-footer__mark-world") as HTMLElement, 0.14, "meta"],
          ],
        },
      ];

      const jobs = groups.filter(
        (group) => group.root && group.items.every(([el]) => el),
      );

      jobs.forEach((group) => {
        group.items.forEach(([el, delay, mode]) => armReveal(el, delay, mode));
      });

      const playGroup = (group: RevealGroup) => {
        if (group.title) playTitle(group.title);
        group.items.forEach(([el]) => playReveal(el));
      };

      const resetGroup = (group: RevealGroup) => {
        if (group.title) resetTitle(group.title ?? null);
        group.items.forEach(([el]) => resetReveal(el));
      };

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const group = jobs.find((item) => item.root === entry.target);
            if (!group) return;
            if (entry.isIntersecting) playGroup(group);
            else resetGroup(group);
          });
        },
        { threshold: 0.14, rootMargin: "0px 0px -7% 0px" },
      );

      jobs.forEach((group) => observer.observe(group.root!));
    };

    splitSectionTitles();
    setupScrollReveals();

    if (!reduced) {
      document.documentElement.style.setProperty("--home-ease-fluid", fluidEase);
    }
  });
}
