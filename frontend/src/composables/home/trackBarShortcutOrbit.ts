const ARC_VAR = "--comet-arc";
const SOLID_VAR = "--comet-solid";
const DEG_PER_UNIT = 36;
const IDLE_ARC_RATIO = 0.3;
const GLOW_BLUR = 13;
const CORE_OPACITY = 0.45;
const HOVER_SCALE = 1.02;
const ARC_MS = 450;

const solidOf = (arcDeg: number) => (arcDeg * arcDeg) / 360;

const cometBackground = (arcDeg: number) => {
  const solid = solidOf(arcDeg);
  const t1 = solid * 0.28;
  const t2 = solid * 0.52;
  const t3 = solid * 0.78;
  const t4 = solid * 0.94;
  return `conic-gradient(from 0deg, #0670e8 0deg, #00a5e3 ${t1}deg, #34c759 ${t2}deg, #00a5e3 ${t3}deg, #69acff ${t4}deg, rgba(0,0,0,0) ${arcDeg}deg, rgba(0,0,0,0) 360deg)`;
};

const setArc = (comet: HTMLElement, deg: number) => {
  comet.style.setProperty(ARC_VAR, `${deg}deg`);
  comet.style.setProperty(SOLID_VAR, `${solidOf(deg)}deg`);
  const bg = cometBackground(deg);
  comet.querySelectorAll<HTMLElement>("[data-comet-layer]").forEach((layer) => {
    layer.style.background = bg;
  });
};

export function initTrackBarShortcutOrbit(root: ParentNode): () => void {
  const buttons = [...root.querySelectorAll<HTMLElement>(".track-bar__shortcut")];
  const cleanups: (() => void)[] = [];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  for (const btn of buttons) {
    const comet = btn.querySelector<HTMLElement>(".track-bar__shortcut-comet");
    if (!comet) continue;

    const idleArc = IDLE_ARC_RATIO * 360;
    let arcDeg = idleArc;
    let angle = 0;
    let lastT = 0;
    let rafRotate = 0;
    let rafArc = 0;

    const glow = comet.querySelector<HTMLElement>("[data-comet-layer='glow']");
    const core = comet.querySelector<HTMLElement>("[data-comet-layer='core']");
    if (glow) glow.style.filter = `blur(${GLOW_BLUR}px)`;
    if (core) core.style.opacity = String(CORE_OPACITY);

    const measureComet = () => {
      const w = btn.offsetWidth;
      const h = btn.offsetHeight;
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

    const animateArc = (target: number) => {
      cancelAnimationFrame(rafArc);
      if (reduced) {
        arcDeg = target;
        setArc(comet, arcDeg);
        return;
      }
      const start = arcDeg;
      const t0 = performance.now();
      const easeOut = (x: number) => 1 - (1 - x) ** 3;
      const step = (now: number) => {
        const t = Math.min((now - t0) / ARC_MS, 1);
        arcDeg = start + (target - start) * easeOut(t);
        setArc(comet, arcDeg);
        if (t < 1) rafArc = requestAnimationFrame(step);
      };
      rafArc = requestAnimationFrame(step);
    };

    const onEnter = () => {
      btn.classList.add("is-comet-paused");
      btn.style.transform = `scale(${HOVER_SCALE})`;
      cancelAnimationFrame(rafArc);
      stopRotate();
    };

    const onLeave = () => {
      btn.classList.remove("is-comet-paused");
      btn.style.transform = "scale(1)";
      animateArc(idleArc);
      startRotate();
    };

    setArc(comet, idleArc);
    measureComet();
    startRotate();

    const ro = new ResizeObserver(measureComet);
    ro.observe(btn);

    btn.addEventListener("pointerenter", onEnter);
    btn.addEventListener("pointerleave", onLeave);
    btn.addEventListener("focus", onEnter);
    btn.addEventListener("blur", onLeave);

    cleanups.push(() => {
      stopRotate();
      cancelAnimationFrame(rafArc);
      ro.disconnect();
      btn.removeEventListener("pointerenter", onEnter);
      btn.removeEventListener("pointerleave", onLeave);
      btn.removeEventListener("focus", onEnter);
      btn.removeEventListener("blur", onLeave);
      btn.style.transform = "";
    });
  }

  return () => cleanups.forEach((fn) => fn());
}
