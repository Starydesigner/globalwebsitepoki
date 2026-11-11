import { onMounted, onUnmounted, type Ref } from "vue";

/** 首屏视频自动播放与 track-bar 吸顶（原 hero.js） */
export function useHeroVideo(heroRef: Ref<HTMLElement | null>) {
  let cleanup: (() => void) | undefined;

  onMounted(() => {
    const hero = heroRef.value;
    if (!hero || !hero.matches("[data-hero-video-toggle]")) return;

    const heroVideo = hero.querySelector(".hero__media video") as HTMLVideoElement | null;
    const trackBar = document.querySelector(".track-bar");
    if (!heroVideo || !trackBar) return;

    const interactiveSelector =
      "a, button, input, textarea, select, label, [contenteditable='true'], .track-bar, .track-bar__search, .track-bar__shortcut";

    let booted = false;

    const readHeaderOffset = () => {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--header-height-hero")
        .trim();
      const parsed = parseFloat(raw);
      return Number.isFinite(parsed) ? parsed : 64;
    };

    const syncTrackBarStuck = () => {
      const stickTop = readHeaderOffset() + 16;
      const stuck = trackBar.getBoundingClientRect().top <= stickTop + 0.5;
      trackBar.classList.toggle("is-stuck", stuck);
      hero.classList.toggle("is-track-bar-stuck", stuck);
    };

    const syncUi = () => {
      const playing = !heroVideo.paused && !heroVideo.ended;
      hero.setAttribute("aria-pressed", playing ? "true" : "false");
      hero.setAttribute(
        "aria-label",
        playing ? "首屏：点击空白区域暂停背景视频" : "首屏：点击空白区域播放背景视频",
      );
      hero.classList.toggle("is-video-playing", playing);
    };

    const togglePlayPause = () => {
      if (heroVideo.paused || heroVideo.ended) {
        void heroVideo.play().catch(() => syncUi());
        return;
      }
      heroVideo.pause();
    };

    const onPlaying = () => syncUi();
    const onPause = () => syncUi();

    const onHeroClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest(interactiveSelector)) return;
      togglePlayPause();
    };

    const boot = () => {
      if (booted) return;
      booted = true;
      heroVideo.loop = true;
      void heroVideo.play().catch(() => syncUi());
      syncUi();
    };

    heroVideo.addEventListener("playing", onPlaying);
    heroVideo.addEventListener("pause", onPause);
    hero.addEventListener("click", onHeroClick);
    heroVideo.addEventListener("loadeddata", boot, { once: true });
    if (heroVideo.readyState >= 2) boot();
    else heroVideo.addEventListener("canplay", boot, { once: true });

    syncTrackBarStuck();
    window.addEventListener("scroll", syncTrackBarStuck, { passive: true });
    window.addEventListener("resize", syncTrackBarStuck);

    cleanup = () => {
      heroVideo.removeEventListener("playing", onPlaying);
      heroVideo.removeEventListener("pause", onPause);
      hero.removeEventListener("click", onHeroClick);
      window.removeEventListener("scroll", syncTrackBarStuck);
      window.removeEventListener("resize", syncTrackBarStuck);
    };
  });

  onUnmounted(() => cleanup?.());
}
