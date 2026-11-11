// @ts-nocheck — freight scroll hero：滚动 scrub 视频 + track 高度
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MISSION_SCENE_POSTER_ASSET, MISSION_SCENE_VIDEO_ASSET } from "@/config/siteVideos";
import { assetUrl } from "@/utils/assetUrl";

const MISSION_VIDEO_URL = assetUrl(MISSION_SCENE_VIDEO_ASSET);
const MISSION_POSTER_URL = assetUrl(MISSION_SCENE_POSTER_ASSET);

export function initMissionScrollHero(root: HTMLElement): () => void {
  const track = root.querySelector(".mission-scene__track");
  const scene = root.querySelector(".mission-scene__scene");
  const content = root.querySelector(".mission-scene__content");
  const video = root.querySelector(".mission-scene__video");
  if (!track || !scene || !content || !video) return () => {};

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = navigator.connection?.saveData === true;

  let duration = 0;
  let curTime = 0;
  let seeking = false;
  let endPx = 0;
  let knee = 0.75;
  let ctaStartP = 0.5;
  let raf = 0;
  let activeSrc = "";

  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

  const pickSrc = () => MISSION_VIDEO_URL;

  const applySrc = () => {
    const src = pickSrc();
    if (activeSrc === src) return;
    activeSrc = src;
    seeking = false;
    curTime = 0;
    video.src = src;
    video.load();
  };

  video.muted = true;
  video.playsInline = true;
  video.preload = "auto";
  video.poster = MISSION_POSTER_URL;

  const onMeta = () => {
    duration = video.duration;
    if (!Number.isFinite(duration) || duration <= 0) return;
    video.currentTime = 0;
    curTime = 0;
  };

  const onSeeked = () => {
    seeking = false;
  };

  video.addEventListener("loadedmetadata", onMeta);
  video.addEventListener("durationchange", onMeta);
  video.addEventListener("seeked", onSeeked);
  applySrc();

  const layoutTrack = () => {
    const vh = window.innerHeight;
    const blocks = [...content.querySelectorAll("[data-mission-block]")];
    let lastBottom = 0;
    blocks.forEach((block) => {
      const el = block;
      lastBottom = Math.max(lastBottom, el.offsetTop + el.offsetHeight);
    });
    endPx = lastBottom + 0.55 * vh;
    track.style.height = `${endPx + vh}px`;
    knee = endPx > 0 ? lastBottom / endPx : 0.75;

    ctaStartP = knee * 0.32;
    const row2Blocks = [...content.querySelectorAll(".mission-scene__feature--row2")];
    if (row2Blocks.length && endPx > 0) {
      let row2Bottom = 0;
      row2Blocks.forEach((block) => {
        row2Bottom = Math.max(row2Bottom, block.offsetTop + block.offsetHeight);
      });
      const triggerScroll = row2Bottom - vh * 0.88;
      ctaStartP = clamp(triggerScroll / endPx, 0.16, knee * 0.98);
    }

    root.style.setProperty("--mission-scroll-end", `${endPx}px`);
  };

  const clipProgress = (p) => {
    if (p < knee) return (p / knee) * 0.46;
    if (knee >= 1) return 0.46;
    return 0.46 + ((p - knee) / (1 - knee)) * 0.54;
  };

  const tick = () => {
    raf = 0;
    const vh = window.innerHeight;
    const trackRect = track.getBoundingClientRect();
    const scrollRange = Math.max(0, track.offsetHeight - vh);
    const scrolled = scrollRange > 0 ? clamp(-trackRect.top, 0, scrollRange) : 0;
    const p = endPx > 0 ? clamp(scrolled / endPx, 0, 1) : 0;

    const cloudMix =
      knee >= 1 || p <= knee ? 0 : clamp((p - knee) / (1 - knee), 0, 1);
    root.style.setProperty("--mission-cloud", String(cloudMix));

    const ctaMix =
      p >= ctaStartP || root.classList.contains("is-mission-features-done") ? 1 : 0;
    root.style.setProperty("--mission-cta", String(ctaMix));
    root.classList.toggle("is-mission-cta-active", ctaMix > 0);

    if (reduced || !Number.isFinite(duration) || duration <= 0) return;

    const target = clipProgress(p) * (duration - 1 / 48);
    curTime += (target - curTime) * 0.22;

    if (seeking) return;
    if (Math.abs(video.currentTime - curTime) > 1 / 60) {
      seeking = true;
      video.currentTime = curTime;
    }
  };

  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(tick);
  };

  const onResize = () => {
    applySrc();
    layoutTrack();
    onScroll();
    ScrollTrigger.refresh();
  };

  layoutTrack();
  tick();
  root.style.setProperty("--mission-cloud", "0");
  root.style.setProperty("--mission-cta", "0");

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);

  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
    video.removeEventListener("loadedmetadata", onMeta);
    video.removeEventListener("durationchange", onMeta);
    video.removeEventListener("seeked", onSeeked);
    if (raf) cancelAnimationFrame(raf);
    video.pause();
  };
}
