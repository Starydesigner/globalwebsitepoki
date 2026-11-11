import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SplitOptions = {
  delayMs?: number;
  duration?: number;
  threshold?: number;
  rootMargin?: string;
};

const splitChars = (el: HTMLElement) => {
  const text = (el.textContent ?? "").trim();
  el.textContent = "";
  el.classList.add("mission-split");
  el.setAttribute("aria-label", text);

  const chars: HTMLElement[] = [];
  [...text].forEach((ch) => {
    const span = document.createElement("span");
    span.className = "mission-split__char";
    span.setAttribute("aria-hidden", "true");
    span.textContent = ch === " " ? "\u00a0" : ch;
    el.append(span);
    chars.push(span);
  });
  return chars;
};

const scrollStart = (threshold: number, rootMargin: string) => {
  const startPct = (1 - threshold) * 100;
  const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin.trim());
  const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
  const marginUnit = marginMatch?.[2] ?? "px";
  const sign =
    marginValue === 0
      ? ""
      : marginValue < 0
        ? `-=${Math.abs(marginValue)}${marginUnit}`
        : `+=${marginValue}${marginUnit}`;
  return `top ${startPct}%${sign}`;
};

/** 使命主文案：SplitText rise + ScrollTrigger（view） */
export function initMissionIntroSplitText(root: HTMLElement, options: SplitOptions = {}): () => void {
  const {
    delayMs = 50,
    duration = 1.25,
    threshold = 0.1,
    rootMargin = "-100px",
  } = options;

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const intro = root.querySelector(".mission-scene__intro") as HTMLElement | null;
  const scene = root.querySelector(".mission-scene__scene") as HTMLElement | null;
  const splitTargets = [
    root.querySelector(".mission-scene__eyebrow span"),
    root.querySelector(".mission-scene__hl--1"),
    root.querySelector(".mission-scene__hl--2"),
  ].filter(Boolean) as HTMLElement[];

  if (!intro || !splitTargets.length || reduced) return () => {};

  let disposed = false;
  let timeline: gsap.core.Timeline | null = null;
  const triggers: ScrollTrigger[] = [];

  const run = () => {
    if (disposed) return;

    const pieces = splitTargets.flatMap((el) => splitChars(el));
    if (!pieces.length) return;

    gsap.set(pieces, { opacity: 0, y: 40, willChange: "transform, opacity" });

    timeline = gsap.timeline({
      scrollTrigger: {
        trigger: scene ?? intro,
        start: scrollStart(threshold, rootMargin),
        once: true,
        fastScrollEnd: true,
        anticipatePin: 0.4,
      },
      onComplete: () => {
        gsap.set(pieces, { clearProps: "willChange" });
      },
    });

    const st = timeline.scrollTrigger;
    if (st) triggers.push(st);

    timeline.to(pieces, {
      opacity: 1,
      y: 0,
      duration,
      ease: "power3.out",
      stagger: delayMs / 1000,
    });
  };

  if (document.fonts?.ready) {
    document.fonts.ready.then(() => {
      if (!disposed) run();
    });
  } else {
    run();
  }

  return () => {
    disposed = true;
    timeline?.kill();
    triggers.forEach((st) => st.kill());
    ScrollTrigger.getAll().forEach((st) => {
      if (st.trigger === intro) st.kill();
    });
    splitTargets.forEach((el) => {
      const text = el.getAttribute("aria-label");
      if (text) {
        el.textContent = text;
        el.removeAttribute("aria-label");
      }
      el.classList.remove("mission-split");
    });
  };
}
