// @ts-nocheck — 使命区特性块滚动入场（主标题见 missionIntroSplitText）
export function initMissionTextReveal(root: HTMLElement): () => void {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return () => {};

  const arm = (el: HTMLElement, delay: number, mode: string) => {
    el.classList.add("reveal-motion", "is-armed", `reveal-motion--${mode}`);
    el.style.setProperty("--reveal-delay", `${delay}s`);
  };

  const play = (el: HTMLElement) => {
    el.classList.remove("is-in");
    void el.offsetWidth;
    el.classList.remove("is-armed");
    el.classList.add("is-in");
  };

  const reset = (el: HTMLElement) => {
    el.classList.remove("is-in");
    el.classList.add("is-armed");
  };

  const features = [...root.querySelectorAll(".mission-scene__feature")] as HTMLElement[];
  features.forEach((el) => {
    const mode = el.classList.contains("mission-scene__feature--left") ? "feature" : "feature-right";
    arm(el, 0.06, mode);
  });

  const syncFeaturesDone = () => {
    const done =
      features.length > 0 && features.every((f) => f.classList.contains("is-in"));
    root.classList.toggle("is-mission-features-done", done);
  };

  const featObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) play(el);
        else reset(el);
      });
      syncFeaturesDone();
    },
    { threshold: 0.22, rootMargin: "0px 0px -8% 0px" },
  );
  features.forEach((el) => featObs.observe(el));

  return () => {
    featObs.disconnect();
    root.classList.remove("is-mission-features-done");
  };
}
