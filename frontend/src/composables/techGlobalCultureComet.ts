const ARC_VAR = "--comet-arc";
const SOLID_VAR = "--comet-solid";
const DEG_PER_UNIT = 36;
const HOVER_ARC_RATIO = 0.42;
const GLOW_BLUR = 14;
const CORE_OPACITY = 0.62;

const solidOf = (arcDeg: number) => (arcDeg * arcDeg) / 360;

const cometBackground = (arcDeg: number) => {
  const solid = solidOf(arcDeg);
  const t1 = solid * 0.22;
  const t2 = solid * 0.45;
  const t3 = solid * 0.72;
  const t4 = solid * 0.92;
  /* 0° 为光束头部：偏亮的蓝色描边光晕 */
  return `conic-gradient(from 0deg, #5eb5ff 0deg, #7ec8ff ${t1}deg, #a8ddff ${t2}deg, rgb(214 236 255 / 0.95) ${t3}deg, rgb(235 246 255 / 0.55) ${t4}deg, rgba(0,0,0,0) ${arcDeg}deg, rgba(0,0,0,0) 360deg)`;
};

const setArc = (comet: HTMLElement, deg: number) => {
  comet.style.setProperty(ARC_VAR, `${deg}deg`);
  comet.style.setProperty(SOLID_VAR, `${solidOf(deg)}deg`);
  const bg = cometBackground(deg);
  comet.querySelectorAll<HTMLElement>("[data-comet-layer]").forEach((layer) => {
    layer.style.background = bg;
  });
};

export function initTechGlobalCultureComet(root: ParentNode): () => void {
  const items = [...root.querySelectorAll<HTMLElement>(".tech-global__culture-item")];
  const cleanups: (() => void)[] = [];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  for (const item of items) {
    const comet = item.querySelector<HTMLElement>(".tech-global__culture-item-comet");
    if (!comet) continue;

    const hoverArc = HOVER_ARC_RATIO * 360;
    let arcDeg = hoverArc;
    let angle = 0;
    let lastT = 0;
    let rafRotate = 0;

    const glow = comet.querySelector<HTMLElement>("[data-comet-layer='glow']");
    const core = comet.querySelector<HTMLElement>("[data-comet-layer='core']");
    if (glow) glow.style.filter = `blur(${GLOW_BLUR}px)`;
    if (core) core.style.opacity = String(CORE_OPACITY);

    const measureComet = () => {
      const w = item.offsetWidth;
      const h = item.offsetHeight;
      if (!w || !h) return;
      const side = Math.ceil(Math.hypot(w, h) * 1.02);
      comet.style.width = `${side}px`;
      comet.style.height = `${side}px`;
      comet.style.marginTop = `${-side / 2}px`;
      comet.style.marginLeft = `${-side / 2}px`;
    };

    const stopRotate = () => {
      cancelAnimationFrame(rafRotate);
      rafRotate = 0;
      lastT = 0;
    };

    const startRotate = () => {
      stopRotate();
      if (reduced) return;
      rafRotate = requestAnimationFrame(tickRotate);
    };

    const tickRotate = (t: number) => {
      if (!lastT) lastT = t;
      const degPerSec = 3 * DEG_PER_UNIT * -1;
      angle = (angle + (degPerSec * (t - lastT)) / 1000) % 360;
      lastT = t;
      comet.style.transform = `rotate(${angle}deg)`;
      rafRotate = requestAnimationFrame(tickRotate);
    };

    const onEnter = () => {
      setArc(comet, hoverArc);
      startRotate();
    };

    const onLeave = () => {
      stopRotate();
      comet.style.transform = "rotate(0deg)";
      angle = 0;
    };

    setArc(comet, hoverArc);
    measureComet();

    const ro = new ResizeObserver(measureComet);
    ro.observe(item);

    item.addEventListener("pointerenter", onEnter);
    item.addEventListener("pointerleave", onLeave);

    cleanups.push(() => {
      stopRotate();
      ro.disconnect();
      item.removeEventListener("pointerenter", onEnter);
      item.removeEventListener("pointerleave", onLeave);
    });
  }

  return () => cleanups.forEach((fn) => fn());
}
