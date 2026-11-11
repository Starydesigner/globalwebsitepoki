import {
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  shallowRef,
  toValue,
  watch,
  type MaybeRefOrGetter,
  type Ref,
} from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

/**
 * 全宽航迹：前段近似平直向右，后段曲率渐增拐向右上（viewBox 0 0 1200 680）
 * 起止 x 贴齐 0 / 1200
 */
export const ABOUT_HISTORY_PATH_D =
  "M 0 568 C 320 566, 560 556, 740 520 C 930 452, 1100 268, 1200 64";

export const ABOUT_HISTORY_VIEWBOX = { w: 1200, h: 680 } as const;

/** 节点相对内容区内侧的额外留白（px） */
const CONTENT_NODE_PAD = 18;

/** 首节点距航迹起点（内容层）内缩 */
const NODE_START_INSET = 12;

/** 末节点距内容区右缘 / 航迹最右点内缩 */
const NODE_END_INSET = 20;

/** 最后一个里程碑之后仍保留的航迹长度（飞机续飞至通栏末端） */
const PATH_TAIL_AFTER_LAST_NODE_RATIO = 0.1;
const PATH_TAIL_AFTER_LAST_NODE_MIN = 80;

/** 指示线在 viewBox 坐标（与航迹 path 一致） */
export const HISTORY_CONNECTOR_STEM_SVG = 32;
export const HISTORY_CONNECTOR_ELBOW_SVG = 14;

export type AboutHistoryBend = "left";
export type AboutHistoryPlacement = "above" | "left";

export function historyConnectorPolyline(pt: AboutHistoryNodePoint): string {
  const { x, y, placement } = pt;
  const stem = HISTORY_CONNECTOR_STEM_SVG;
  const elbow = HISTORY_CONNECTOR_ELBOW_SVG;
  if (placement === "left") {
    return `${x},${y} ${x - stem},${y}`;
  }
  return `${x},${y} ${x},${y - stem} ${x - elbow},${y - stem}`;
}

export function historyCardAnchorSvg(
  pt: { x: number; y: number },
  placement: AboutHistoryPlacement,
): { x: number; y: number } {
  const stem = HISTORY_CONNECTOR_STEM_SVG;
  const elbow = HISTORY_CONNECTOR_ELBOW_SVG;
  if (placement === "left") {
    return { x: pt.x - stem, y: pt.y };
  }
  return { x: pt.x - elbow, y: pt.y - stem };
}

function measurePathLayerXExtents(
  path: SVGPathElement,
  layer: HTMLElement,
): { minX: number; maxX: number; atMin: number; atMax: number } {
  const total = path.getTotalLength();
  const samples = 100;
  let minX = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let atMin = 0;
  let atMax = total;

  for (let i = 0; i <= samples; i += 1) {
    const at = (i / samples) * total;
    const pt = path.getPointAtLength(at);
    const mapped = mapPointToLayerContent(path, layer, pt.x, pt.y);
    if (!mapped) continue;
    if (mapped.left < minX) {
      minX = mapped.left;
      atMin = at;
    }
    if (mapped.left > maxX) {
      maxX = mapped.left;
      atMax = at;
    }
  }

  if (!Number.isFinite(minX) || !Number.isFinite(maxX)) {
    return { minX: 0, maxX: layer.clientWidth, atMin: 0, atMax: total };
  }

  return { minX, maxX, atMin, atMax };
}

function mapAnchorAtLength(
  path: SVGPathElement,
  layer: HTMLElement,
  at: number,
): AboutHistoryNodeAnchor | null {
  const pt = path.getPointAtLength(at);
  return mapPointToLayerContent(path, layer, pt.x, pt.y);
}

/** S 形路径上 x 非单调，只能沿弧长正向扫描 */
function findStartArcLength(path: SVGPathElement, layer: HTMLElement, targetMinX: number): number {
  const total = path.getTotalLength();
  const steps = 320;
  for (let i = 0; i <= steps; i += 1) {
    const at = (i / steps) * total;
    const mapped = mapAnchorAtLength(path, layer, at);
    if (mapped && mapped.left >= targetMinX) return at;
  }
  return 0;
}

/** 取层坐标不超过 targetMaxX 的最远弧长点，且不超过 maxArc（留出尾段航迹） */
function findEndArcLength(
  path: SVGPathElement,
  layer: HTMLElement,
  targetMaxX: number,
  maxArc: number,
): number {
  const total = path.getTotalLength();
  const arcCap = Math.min(maxArc, total);
  const steps = 320;
  let bestAt = 0;
  let bestLayerX = Number.NEGATIVE_INFINITY;

  for (let i = 0; i <= steps; i += 1) {
    const at = (i / steps) * total;
    if (at > arcCap) break;
    const mapped = mapAnchorAtLength(path, layer, at);
    if (!mapped || mapped.left > targetMaxX) continue;
    if (mapped.left > bestLayerX || (Math.abs(mapped.left - bestLayerX) < 0.75 && at > bestAt)) {
      bestLayerX = mapped.left;
      bestAt = at;
    }
  }

  return bestAt;
}

function layerContentWidth(layer: HTMLElement): number {
  const style = getComputedStyle(layer);
  const padX =
    (Number.parseFloat(style.paddingLeft) || 0) + (Number.parseFloat(style.paddingRight) || 0);
  return Math.max(0, layer.clientWidth - padX);
}

function contentPathSpan(path: SVGPathElement, layer: HTMLElement): { start: number; end: number } {
  const contentWidth = layerContentWidth(layer);
  const extent = measurePathLayerXExtents(path, layer);

  const targetMinX = Math.max(CONTENT_NODE_PAD, extent.minX + NODE_START_INSET);
  const targetMaxX = Math.min(
    contentWidth - CONTENT_NODE_PAD - NODE_END_INSET,
    extent.maxX - NODE_END_INSET,
  );

  const total = path.getTotalLength();
  const tailArcGap = Math.max(total * PATH_TAIL_AFTER_LAST_NODE_RATIO, PATH_TAIL_AFTER_LAST_NODE_MIN);
  const nodeArcMax = Math.max(0, total - tailArcGap);

  let start = findStartArcLength(path, layer, targetMinX);
  let end = findEndArcLength(path, layer, targetMaxX, nodeArcMax);

  const minSpan = total * 0.12;
  if (end - start < minSpan) {
    end = Math.min(nodeArcMax, start + minSpan);
  }

  end = Math.min(end, nodeArcMax, extent.atMax - tailArcGap * 0.65);

  return { start, end: Math.max(start + total * 0.01, end) };
}

function buildEvenArcLengths(start: number, end: number, nodeCount: number): number[] {
  if (nodeCount <= 1) return [start];
  const denom = nodeCount - 1;
  const span = end - start;
  return Array.from({ length: nodeCount }, (_, i) => start + (i / denom) * span);
}

/** 卡片仅在曲线上方或左侧：前段平缓区偏左，抬升段偏上 */
function pickNodePlacement(path: SVGPathElement, at: number, index: number): AboutHistoryPlacement {
  const total = path.getTotalLength();
  const delta = Math.min(16, total * 0.016);
  const a = path.getPointAtLength(Math.max(0, at - delta));
  const b = path.getPointAtLength(Math.min(total, at + delta));
  const tx = b.x - a.x;
  const ty = b.y - a.y;
  const gentle = Math.abs(ty) < Math.abs(tx) * 0.38;
  if (gentle) {
    return index % 2 === 0 ? "left" : "above";
  }
  return "above";
}

/** 俯视图素材机头朝右上；前段近水平、末段上扬 */
const PLANE_AUTOROTATE_OFFSET = 32;

const FLIGHT_DURATION = 16;

export interface AboutHistoryNodePoint {
  x: number;
  y: number;
  placement: AboutHistoryPlacement;
  bend: AboutHistoryBend;
}

export interface AboutHistoryNodeAnchor {
  left: number;
  top: number;
}

/** 相对内容区（padding 内侧）的坐标，用于沿航迹分布节点 */
function mapPointToLayerContent(
  path: SVGPathElement,
  layer: HTMLElement,
  x: number,
  y: number,
): AboutHistoryNodeAnchor | null {
  const svg = path.ownerSVGElement;
  if (!svg) return null;
  const ctm = path.getScreenCTM();
  if (!ctm) return null;
  const pt = svg.createSVGPoint();
  pt.x = x;
  pt.y = y;
  const onScreen = pt.matrixTransform(ctm);
  const layerRect = layer.getBoundingClientRect();
  const layerStyle = getComputedStyle(layer);
  const padLeft = Number.parseFloat(layerStyle.paddingLeft) || 0;
  const padTop = Number.parseFloat(layerStyle.paddingTop) || 0;
  const borderLeft = Number.parseFloat(layerStyle.borderLeftWidth) || 0;
  const borderTop = Number.parseFloat(layerStyle.borderTopWidth) || 0;
  return {
    left: onScreen.x - layerRect.left - borderLeft - padLeft,
    top: onScreen.y - layerRect.top - borderTop - padTop,
  };
}

/** 相对定位层 padding 外缘的坐标，用于 absolute 的 left/top */
function mapPointToLayerPosition(
  path: SVGPathElement,
  layer: HTMLElement,
  x: number,
  y: number,
): AboutHistoryNodeAnchor | null {
  const svg = path.ownerSVGElement;
  if (!svg) return null;
  const ctm = path.getScreenCTM();
  if (!ctm) return null;
  const pt = svg.createSVGPoint();
  pt.x = x;
  pt.y = y;
  const onScreen = pt.matrixTransform(ctm);
  const layerRect = layer.getBoundingClientRect();
  const layerStyle = getComputedStyle(layer);
  const borderLeft = Number.parseFloat(layerStyle.borderLeftWidth) || 0;
  const borderTop = Number.parseFloat(layerStyle.borderTopWidth) || 0;
  return {
    left: onScreen.x - layerRect.left - borderLeft,
    top: onScreen.y - layerRect.top - borderTop,
  };
}

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useAboutHistoryFlight(
  itemCount: MaybeRefOrGetter<number>,
  ambientRefs: {
    sky?: Ref<HTMLElement | null>;
    clouds?: Ref<HTMLElement | null>[];
    heading?: Ref<HTMLElement | null>;
    canvasLayer?: Ref<HTMLElement | null>;
    nodesLayer?: Ref<HTMLElement | null>;
  } = {},
) {
  const stageRef = ref<HTMLElement | null>(null);
  const pathRef = ref<SVGPathElement | null>(null);
  const trailRef = ref<SVGPathElement | null>(null);
  const planeRef = ref<HTMLElement | null>(null);
  const progress = ref(0);
  const nodePoints = shallowRef<AboutHistoryNodePoint[]>([]);
  const nodeAnchors = shallowRef<AboutHistoryNodeAnchor[]>([]);
  const pathSpanStart = ref(0);
  const pathSpanEnd = ref(1);
  const isPlaying = ref(false);

  let flightTimeline: gsap.core.Timeline | null = null;
  let enterTrigger: ScrollTrigger | null = null;
  let resizeObserver: ResizeObserver | undefined;
  const ambientTweens: gsap.core.Tween[] = [];

  const resolveCount = () => Math.max(0, Math.floor(toValue(itemCount)));

  function layoutNodeAnchors() {
    const path = pathRef.value;
    const layer = ambientRefs.nodesLayer?.value ?? ambientRefs.canvasLayer?.value;
    if (!layer || !path || !nodePoints.value.length) return;
    nodeAnchors.value = nodePoints.value.map((pt) => {
      const cardPt = historyCardAnchorSvg(pt, pt.placement);
      const anchor = mapPointToLayerPosition(path, layer, cardPt.x, cardPt.y);
      return anchor ?? { left: 0, top: 0 };
    });
  }

  function rebuildNodePoints() {
    const path = pathRef.value;
    const layer = ambientRefs.nodesLayer?.value ?? ambientRefs.canvasLayer?.value;
    const nodeCount = resolveCount();
    if (!path || !layer || nodeCount < 1) return;

    const total = path.getTotalLength();
    const span = contentPathSpan(path, layer);
    pathSpanStart.value = span.start;
    pathSpanEnd.value = span.end;

    const arcLengths = buildEvenArcLengths(span.start, span.end, nodeCount);
    const points: AboutHistoryNodePoint[] = arcLengths.map((at, i) => {
      const pt = path.getPointAtLength(at);
      const placement = pickNodePlacement(path, at, i);
      return {
        x: pt.x,
        y: pt.y,
        placement,
        bend: "left",
      };
    });
    nodePoints.value = points;
    layoutNodeAnchors();

    if (total > 0) {
      pathSpanEnd.value = Math.min(pathSpanEnd.value, total);
    }
  }

  function nodeRevealProgress(index: number): number {
    const path = pathRef.value;
    const nodeCount = resolveCount();
    if (!path || nodeCount <= 1) return index;
    const total = path.getTotalLength();
    if (total <= 0) return 0;
    const denom = Math.max(nodeCount - 1, 1);
    const at = pathSpanStart.value + (index / denom) * (pathSpanEnd.value - pathSpanStart.value);
    return at / total;
  }

  function startAmbientMotion() {
    const reduced = prefersReducedMotion();
    if (reduced) return;

    const sky = ambientRefs.sky?.value;
    if (sky) {
      ambientTweens.push(
        gsap.to(sky, {
          scale: 1.05,
          duration: 22,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          transformOrigin: "50% 40%",
        }),
      );
    }

    ambientRefs.clouds?.forEach((cloudRef, index) => {
      const el = cloudRef.value;
      if (!el) return;
      ambientTweens.push(
        gsap.fromTo(
          el,
          { x: index % 2 === 0 ? "-4%" : "3%", y: "0%" },
          {
            x: index % 2 === 0 ? "5%" : "-6%",
            y: index % 2 === 0 ? "-2%" : "2%",
            duration: 26 + index * 6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          },
        ),
      );
    });
  }

  function runFlightAnimation() {
    const path = pathRef.value;
    const trail = trailRef.value;
    const plane = planeRef.value;
    if (!path || !trail || !plane || isPlaying.value) return;

    const reduced = prefersReducedMotion();
    isPlaying.value = true;

    if (reduced) {
      const length = path.getTotalLength();
      trail.style.strokeDashoffset = "0";
      progress.value = 1;
      gsap.set(plane, {
        motionPath: {
          path,
          align: path,
          alignOrigin: [0.5, 0.5],
          autoRotate: PLANE_AUTOROTATE_OFFSET,
          end: 1,
        },
      });
      return;
    }

    const length = path.getTotalLength();
    trail.style.strokeDasharray = `${length}`;
    gsap.set(trail, { strokeDashoffset: length });

    const motionPathConfig = {
      path,
      align: path,
      alignOrigin: [0.5, 0.5] as [number, number],
      autoRotate: PLANE_AUTOROTATE_OFFSET,
      start: 0,
      end: 0,
    };

    gsap.set(plane, {
      motionPath: { ...motionPathConfig },
      transformOrigin: "50% 50%",
    });

    flightTimeline?.kill();
    flightTimeline = gsap.timeline({
      defaults: { ease: "power1.inOut" },
      onUpdate: () => {
        progress.value = flightTimeline?.progress() ?? 0;
      },
      onComplete: () => {
        isPlaying.value = false;
      },
    });

    flightTimeline.to(
      trail,
      {
        strokeDashoffset: 0,
        duration: FLIGHT_DURATION,
        ease: "power1.inOut",
      },
      0,
    );

    flightTimeline.to(
      plane,
      {
        motionPath: {
          ...motionPathConfig,
          end: 1,
        },
        duration: FLIGHT_DURATION,
        ease: "power1.inOut",
      },
      0,
    );

    const heading = ambientRefs.heading?.value;
    if (heading) {
      gsap.fromTo(
        heading,
        { opacity: 0, x: -14, y: 8 },
        { opacity: 1, x: 0, y: 0, duration: 1.1, ease: "power2.out" },
      );
    }
  }

  onMounted(() => {
    const stage = stageRef.value;
    const path = pathRef.value;
    const trail = trailRef.value;
    const plane = planeRef.value;
    if (!stage || !path || !trail || !plane || resolveCount() < 1) return;

    const length = path.getTotalLength();
    trail.style.strokeDasharray = `${length}`;
    trail.style.strokeDashoffset = `${length}`;

    nextTick(() => {
      rebuildNodePoints();
    });
    startAmbientMotion();

    watch(
      () => resolveCount(),
      () => {
        nextTick(() => rebuildNodePoints());
      },
    );

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => rebuildNodePoints());
      resizeObserver.observe(stage);
      const svg = path.ownerSVGElement;
      if (svg) resizeObserver.observe(svg);
      const nodesLayer = ambientRefs.nodesLayer?.value;
      if (nodesLayer) resizeObserver.observe(nodesLayer);
    }
    window.addEventListener("resize", rebuildNodePoints, { passive: true });

    enterTrigger = ScrollTrigger.create({
      trigger: stage,
      start: "top 78%",
      once: true,
      onEnter: () => runFlightAnimation(),
    });

    if (stage.getBoundingClientRect().top < window.innerHeight * 0.85) {
      runFlightAnimation();
    }
  });

  onUnmounted(() => {
    flightTimeline?.kill();
    enterTrigger?.kill();
    ambientTweens.forEach((t) => t.kill());
    resizeObserver?.disconnect();
    window.removeEventListener("resize", rebuildNodePoints);
    flightTimeline = null;
    enterTrigger = null;
  });

  function isNodeRevealed(index: number): boolean {
    if (resolveCount() <= 1) return progress.value > 0.15;
    const threshold = nodeRevealProgress(index);
    return progress.value >= threshold - 0.03;
  }

  function nodeAnchorStyle(index: number): Record<string, string> | undefined {
    const anchor = nodeAnchors.value[index];
    if (!anchor) return undefined;

    return {
      left: `${anchor.left}px`,
      top: `${anchor.top}px`,
    };
  }

  return {
    stageRef,
    pathRef,
    trailRef,
    planeRef,
    progress,
    nodePoints,
    nodeAnchors,
    nodeAnchorStyle,
    isNodeRevealed,
  };
}
