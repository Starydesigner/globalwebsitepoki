// @ts-nocheck — 自 legacy js/mission-scene.js 迁入，逐步补类型
/** 使命滚动场景 */
export function initMissionScene(): () => void {
  const root = document.querySelector(".mission-scene");
  if (!root || !document.body.classList.contains("page-home")) return () => {};

  const scene = root.querySelector(".mission-scene__scene");
  const track = root.querySelector(".mission-scene__track");
  const intro = root.querySelector(".mission-scene__intro");
  const title = root.querySelector("#mission-title");
  const introHeadline = root.querySelector(".mission-scene__intro-headline");
  const white = root.querySelector(".mission-scene__layer--white");
  const rig = root.querySelector(".mission-scene__rig");
  const truckWrap = root.querySelector(".mission-scene__truck-wrap");
  const watermark = root.querySelector(".mission-scene__watermark");
  const band = root.querySelector(".mission-scene__band");
  const photos = [...root.querySelectorAll(".mission-scene__layer--photo")];
  const soloHeadline = root.querySelector(".mission-scene__band-headline--solo");
  const valuesRow = root.querySelector(".mission-scene__values-row");
  const valuesTrack = root.querySelector(".mission-scene__values");
  const values = [...root.querySelectorAll(".mission-scene__value")];

  if (!track || !band || !title || !introHeadline || !watermark || !scene || !soloHeadline) {
    return () => {};
  }

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return () => {};

  const INTRO_RELEASE_VH = 0.12;
  /** 第一帧淡出末尾与第二帧照片入场重叠，避免 introPx 边界全黑一帧 */
  const INTRO_FRAME2_OVERLAP = 0.42;
  const MISSION_STEP_VH = 0.88;
  /** 0 第二帧入场 + 3 次价值点切换（多样化→定制化→更便捷→更安全） */
  const MISSION_STEP_COUNT = 4;
  const VALUE_COUNT = 4;
  /** MasterGo 35:7979 滚动2 — 1080 画布，照片区自 172px 起 */
  const DESIGN_SCENE_H = 1080;
  const BAND_TOP_PCT = 0;
  const WM_FIXED_LEFT = (1168 / 1920) * 100;
  const WM_FIXED_TOP = (108 / DESIGN_SCENE_H) * 100;
  const TRUCK_X_LEFT = -95;
  const TRUCK_X_AFTER_BAND = 0;
  /** Q 车终态：车头对齐「中通使命」最后一字「命」（35:00213 @1168，128 字号） */
  const TRUCK_DESIGN_WRAP_LEFT = -78;
  const TRUCK_DESIGN_WRAP_WIDTH = 156;
  const WM_TEXT_LEFT_PX = 1168;
  const WM_FONT_PX = 128;
  const WM_CHAR_INDEX_MING = 3;
  const TRUCK_DESIGN_END_LEFT =
    WM_TEXT_LEFT_PX + WM_CHAR_INDEX_MING * WM_FONT_PX * 0.9 - 24;
  const DESIGN_W = 1920;
  /** morph：先淡出第一帧文案，再同一进度带照片/水印/slogan/多样化一起进 */
  const MORPH_INTRO_COPY_FADE = 0.16;

  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  /** 与滚动进度 1:1，两端仍平滑 */
  const scrollT = (t) => t * t * (3 - 2 * t);

  const measureTruckEndTranslatePct = () => {
    if (truckEndTranslatePctCache > 0) return truckEndTranslatePctCache;
    syncMissionWidth();
    const sceneW = scene.getBoundingClientRect().width;
    const wrapW = (TRUCK_DESIGN_WRAP_WIDTH / DESIGN_W) * sceneW;
    const baseLeft = (TRUCK_DESIGN_WRAP_LEFT / DESIGN_W) * sceneW;
    const targetLeft = (TRUCK_DESIGN_END_LEFT / DESIGN_W) * sceneW;
    truckEndTranslatePctCache = ((targetLeft - baseLeft) / wrapW) * 100;
    return truckEndTranslatePctCache;
  };

  const truckTranslatePct = (stepIndex, stepT) => {
    const end = measureTruckEndTranslatePct();
    const t = scrollT(stepT);
    if (stepIndex === 0) {
      const bandPos = lerp(TRUCK_X_LEFT, TRUCK_X_AFTER_BAND, t);
      const valuePos = lerp(TRUCK_X_AFTER_BAND, end, t / VALUE_COUNT);
      return lerp(bandPos, valuePos, t);
    }
    const progress = (stepIndex + t) / VALUE_COUNT;
    return lerp(TRUCK_X_AFTER_BAND, end, progress);
  };

  let headlineSingleLine = introHeadline.textContent.trim();
  let headMetricsW = 0;
  let valueSlotStepPx = 0;
  let truckEndTranslatePctCache = 0;
  /** 向上滚动时 Q 车不回退，仅首帧重置时归零 */
  let truckTranslatePeak = TRUCK_X_LEFT;
  /** 「中通使命」首帧位置，供与 Q 车同步位移 */
  let titleFlyStart = null;

  const resetTruckTranslatePeak = () => {
    truckTranslatePeak = TRUCK_X_LEFT;
  };

  const truckWrapWidthPx = () => {
    syncMissionWidth();
    return (TRUCK_DESIGN_WRAP_WIDTH / DESIGN_W) * scene.getBoundingClientRect().width;
  };

  /** 终态对齐后，文案与 Q 车共用同一横向像素偏移（与 truck-wrap 的 % 位移一致） */
  const syncMissionTextTruckOffset = (pct) => {
    const endPct = measureTruckEndTranslatePct();
    const wrapW = truckWrapWidthPx();
    const px = ((pct - endPct) / 100) * wrapW;
    const transform = Math.abs(px) < 0.25 ? "none" : `translate3d(${px}px, 0, 0)`;

    if (title.classList.contains("is-title-flying")) {
      title.style.transform = transform;
      title.style.transformOrigin = "0 0";
    }
    if (parseFloat(watermark.style.opacity || "0") > 0.01) {
      watermark.style.transform = transform;
    }
  };

  const truckTitleMorphProgress = (frame2P) => {
    const pct = truckTranslatePct(0, frame2P);
    const endPct = measureTruckEndTranslatePct();
    const startPct = TRUCK_X_LEFT;
    if (endPct <= startPct) return 1;
    return clamp((pct - startPct) / (endPct - startPct), 0, 1);
  };

  const applyTruckTranslate = (pct, resetPeak = false) => {
    if (resetPeak) {
      truckTranslatePeak = pct;
    } else {
      truckTranslatePeak = Math.max(truckTranslatePeak, pct);
    }
    truckWrap.style.transform = `translate3d(${truckTranslatePeak}%, 0, 0)`;
    syncMissionTextTruckOffset(truckTranslatePeak);
  };
  const restoreFlyDom = (el) => {
    if (!el || !el._flyRestoreParent) return;
    el._flyRestoreParent.insertBefore(el, el._flyRestoreNext);
    delete el._flyRestoreParent;
    delete el._flyRestoreNext;
  };

  const valueGapPx = () => {
    const w = scene.getBoundingClientRect().width;
    return Math.min(84, Math.max(24, (w * 84) / 1920));
  };

  const measureValueSlotStep = () => {
    if (valueSlotStepPx > 0) return valueSlotStepPx;
    if (!valuesTrack || !values.length) return 212;
    const gap = valueGapPx();
    let maxW = 0;
    values.forEach((el) => {
      el.classList.add("is-visible");
      maxW = Math.max(maxW, el.getBoundingClientRect().width);
    });
    const w = scene.getBoundingClientRect().width;
    const designColW = Math.min(128, Math.max(96, (w * 128) / 1920));
    valueSlotStepPx = Math.max(maxW, designColW) + gap;
    return valueSlotStepPx;
  };

  const syncMissionWidth = () => {
    const w = scene.getBoundingClientRect().width;
    scene.style.setProperty("--mission-w", `${w}px`);
    if (w !== headMetricsW) {
      valueSlotStepPx = 0;
      truckEndTranslatePctCache = 0;
      titleFlyStart = null;
      headMetricsW = w;
    }
  };

  const layoutTrack = () => {
    const vh = window.innerHeight;
    const scrollVh = INTRO_RELEASE_VH + MISSION_STEP_VH * MISSION_STEP_COUNT;
    track.style.height = `${(1 + scrollVh) * vh}px`;
    syncMissionWidth();
  };

  const setFixedWatermark = (opacity) => {
    watermark.style.opacity = String(opacity);
    watermark.style.left = `${WM_FIXED_LEFT}%`;
    watermark.style.top = `${WM_FIXED_TOP}%`;
    watermark.style.bottom = "auto";
    watermark.style.fontSize = `calc(var(--mission-w) * 128 / 1920)`;
    watermark.style.lineHeight = `calc(var(--mission-w) * 179 / 1920)`;
    watermark.style.letterSpacing = "0";
    if (opacity > 0) {
      syncMissionTextTruckOffset(truckTranslatePeak);
    } else {
      watermark.style.transform = "none";
    }
  };

  const resetPhotosOffscreen = () => {
    photos.forEach((layer) => {
      layer.style.opacity = "0";
      layer.style.visibility = "hidden";
      layer.style.transform = "translate3d(100%, 0, 0)";
    });
  };

  const hideAllValues = () => {
    values.forEach((el) => {
      el.classList.remove("is-visible");
      el.style.opacity = "0";
      el.style.transform = "translate3d(120%, 0, 0)";
    });
  };

  const resetTitleFlyMetrics = () => {
    titleFlyStart = null;
    title.classList.remove("is-title-flying");
  };

  const captureTitleFlyStart = () => {
    if (titleFlyStart) return titleFlyStart;
    syncMissionWidth();
    const sceneRect = scene.getBoundingClientRect();
    const rect = title.getBoundingClientRect();
    const cs = getComputedStyle(title);
    titleFlyStart = {
      left: rect.left - sceneRect.left,
      top: rect.top - sceneRect.top,
      fontSize: parseFloat(cs.fontSize) || 40,
      lineHeight: parseFloat(cs.lineHeight) || rect.height,
    };
    return titleFlyStart;
  };

  const mountTitleToScene = () => {
    if (title.parentNode === scene) return;
    title._flyRestoreNext = title.nextSibling;
    title._flyRestoreParent = title.parentNode;
    scene.appendChild(title);
  };

  /** 四字与 Q 车同一滚动进度位移至水印位，终态再交给 DOM 水印 */
  const applyTitleFlyWithTruck = (frame2P) => {
    const t = truckTitleMorphProgress(frame2P);
    if (t <= 0) {
      resetTitleFlyMetrics();
      return false;
    }

    captureTitleFlyStart();
    mountTitleToScene();

    title.classList.add("is-title-flying", "is-watermark-style");
    title.classList.remove("is-in");

    const sceneRect = scene.getBoundingClientRect();
    const sceneW = sceneRect.width;
    const sceneH = sceneRect.height;
    const start = titleFlyStart;
    const endLeft = (WM_FIXED_LEFT / 100) * sceneW;
    const endTop = (WM_FIXED_TOP / 100) * sceneH;
    const endFont = (WM_FONT_PX / DESIGN_W) * sceneW;
    const endLine = (179 / DESIGN_W) * sceneW;

    title.style.position = "absolute";
    title.style.left = `${lerp(start.left, endLeft, t)}px`;
    title.style.top = `${lerp(start.top, endTop, t)}px`;
    title.style.width = "auto";
    title.style.height = "auto";
    title.style.margin = "0";
    title.style.padding = "0";
    title.style.fontSize = `${lerp(start.fontSize, endFont, t)}px`;
    title.style.lineHeight = `${lerp(start.lineHeight, endLine, t)}px`;
    title.style.textAlign = "left";
    title.style.visibility = "visible";
    title.style.opacity = "1";
    title.style.pointerEvents = "none";
    title.style.zIndex = "7";
    title.style.whiteSpace = "nowrap";

    if (t >= 0.985) {
      setFixedWatermark(t);
    } else {
      setFixedWatermark(0);
    }
    syncMissionTextTruckOffset(truckTranslatePct(0, frame2P));

    return true;
  };

  const clearMotionStyles = () => {
    resetTitleFlyMetrics();
    restoreFlyDom(title);
    restoreFlyDom(introHeadline);
    [title, introHeadline, intro, band, rig, truckWrap, watermark, soloHeadline, valuesRow].forEach((el) => {
      if (el) el.removeAttribute("style");
    });
    photos.forEach((el) => el.removeAttribute("style"));
    values.forEach((el) => el.removeAttribute("style"));
    introHeadline.textContent = headlineSingleLine;
  };

  const applyMorphPhotos = (frame2P) => {
    const enter = scrollT(frame2P);
    photos.forEach((layer, i) => {
      if (i === 0) {
        layer.style.visibility = enter > 0 ? "visible" : "hidden";
        layer.style.opacity = String(enter);
        layer.style.transform = `translate3d(${lerp(100, 0, enter)}%, 0, 0)`;
        return;
      }
      layer.style.opacity = "0";
      layer.style.visibility = "hidden";
      layer.style.transform = "translate3d(100%, 0, 0)";
    });
  };

  const applyMorphFirstValue = (frame2P) => {
    const revealT = scrollT(frame2P);
    values.forEach((el, i) => {
      if (i !== 0) {
        el.classList.remove("is-visible");
        el.style.opacity = "0";
        el.style.transform = "translate3d(120%, 0, 0)";
      }
    });
    if (revealT <= 0) {
      values[0].classList.remove("is-visible");
      values[0].style.opacity = "0";
      values[0].style.transform = "translate3d(120%, 0, 0)";
      return;
    }
    values[0].classList.add("is-visible");
    values[0].style.opacity = String(revealT);
    values[0].style.transform = `translate3d(${lerp(120, 0, revealT)}%, 0, 0)`;
  };

  const syncMissionLearnMore = (stepIndex) => {
    root.classList.toggle("is-mission-learn-visible", stepIndex >= VALUE_COUNT - 1);
  };

  const setIntroFrame = () => {
    root.classList.remove(
      "is-phase-a",
      "is-phase-b",
      "is-truck-q",
      "is-morphing",
      "is-intro-release",
      "is-mission-learn-visible"
    );
    root.classList.add("is-frame-intro");
    title.classList.remove("is-watermark-style");
    clearMotionStyles();
    syncMissionWidth();
    if (title) title.style.visibility = "";
    if (white) white.style.opacity = "";
    root.style.setProperty("--mission-intro-bg-opacity", "1");
    resetPhotosOffscreen();
    hideAllValues();
    if (soloHeadline) soloHeadline.style.opacity = "0";
    band.style.top = `${BAND_TOP_PCT}%`;
    band.style.transform = "translate3d(100%, 0, 0)";
    resetTruckTranslatePeak();
    applyTruckTranslate(TRUCK_X_LEFT, true);
    rig.style.transform = "scale(1)";
    setFixedWatermark(0);
    if (!root.classList.contains("mission-scene--train-hero")) {
      armIntroTextMotion();
    }
  };

  const layoutIntroTypography = () => {
    intro.style.left = "50%";
    intro.style.top = "50%";
  };

  const lockTitleAsWatermark = () => {
    resetTitleFlyMetrics();
    restoreFlyDom(title);
    title.classList.remove("is-watermark-style", "is-title-flying");
    title.style.visibility = "hidden";
    title.style.opacity = "0";
    title.style.pointerEvents = "none";
    setFixedWatermark(1);
  };

  const lockSoloInBand = () => {
    introHeadline.style.opacity = "0";
    introHeadline.style.visibility = "hidden";
    introHeadline.style.pointerEvents = "none";
    soloHeadline.removeAttribute("style");
    soloHeadline.style.opacity = "1";
  };

  const applyMorphText = (introCopyOpacity, frame2P) => {
    const flyT = scrollT(frame2P);

    if (flyT > 0) {
      restoreFlyDom(introHeadline);
      root.classList.remove("is-frame-intro");
      intro.style.opacity = introCopyOpacity > 0 ? String(introCopyOpacity) : "1";
      intro.style.pointerEvents = "none";

      applyTitleFlyWithTruck(frame2P);

      introHeadline.style.visibility = "hidden";
      introHeadline.style.opacity = "0";

      soloHeadline.style.visibility = "visible";
      soloHeadline.style.opacity = String(flyT);
      return;
    }

    resetTitleFlyMetrics();
    restoreFlyDom(title);
    restoreFlyDom(introHeadline);

    if (introCopyOpacity > 0) {
      root.classList.add("is-frame-intro");
      layoutIntroTypography();
      intro.style.opacity = String(introCopyOpacity);
      title.classList.remove("is-watermark-style", "is-title-flying");
      title.style.visibility = "visible";
      title.style.removeProperty("opacity");
      if (title.classList.contains("is-split")) title.classList.add("is-in");
      introHeadline.style.visibility = "visible";
      introHeadline.style.removeProperty("opacity");
      if (introHeadline.classList.contains("reveal-motion")) {
        introHeadline.classList.add("is-in");
        introHeadline.classList.remove("is-armed");
      }
      soloHeadline.style.visibility = "hidden";
      soloHeadline.style.opacity = "0";
    } else {
      root.classList.remove("is-frame-intro");
      title.style.visibility = "hidden";
      title.style.opacity = "0";
      introHeadline.style.visibility = "hidden";
      introHeadline.style.opacity = "0";
    }

    setFixedWatermark(0);
    soloHeadline.style.visibility = "hidden";
    soloHeadline.style.opacity = "0";
  };

  const applyValuesForStep = (valueStep, stepT) => {
    const slot = measureValueSlotStep();
    const t = scrollT(stepT);
    values.forEach((el, i) => {
      if (i > valueStep) {
        el.classList.remove("is-visible");
        el.style.opacity = "0";
        el.style.transform = `translate3d(${slot}px, 0, 0)`;
        return;
      }
      el.classList.add("is-visible");
      const fromX = -Math.max(0, valueStep - 1 - i) * slot;
      const toX = -(valueStep - i) * slot;
      let x;
      if (i === valueStep) {
        x = lerp(slot, toX, t);
        el.style.opacity = String(t);
      } else {
        x = lerp(fromX, toX, t);
        el.style.opacity = "1";
      }
      el.style.transform = `translate3d(${x}px, 0, 0)`;
    });
  };

  const applyPhotosForStep = (valueStep, stepT) => {
    const t = scrollT(stepT);
    const prevIndex = valueStep - 1;

    photos.forEach((layer, i) => {
      if (i < prevIndex || (i === prevIndex && prevIndex >= 0 && t >= 1)) {
        layer.style.opacity = "0";
        layer.style.visibility = "hidden";
        layer.style.transform = "translate3d(-100%, 0, 0)";
        return;
      }
      if (i > valueStep) {
        layer.style.opacity = "0";
        layer.style.visibility = "hidden";
        layer.style.transform = "translate3d(100%, 0, 0)";
        return;
      }
      if (i === prevIndex && prevIndex >= 0 && t < 1) {
        layer.style.visibility = "visible";
        layer.style.opacity = String(1 - t);
        layer.style.transform = "translate3d(0, 0, 0)";
        return;
      }
      if (i === valueStep) {
        layer.style.visibility = "visible";
        const entering = valueStep === 0 ? 1 : t;
        layer.style.opacity = String(entering);
        layer.style.transform =
          valueStep === 0 && t >= 1
            ? "translate3d(0, 0, 0)"
            : `translate3d(${lerp(100, 0, t)}%, 0, 0)`;
      }
    });
  };

  /** 第一帧光晕/文案淡出；frame2P>0 时与第二帧照片/底栏重叠入场 */
  const applyIntroRelease = (scrolled, introPx, frame2P = 0) => {
    const frame2T = scrollT(frame2P);
    root.classList.add("is-intro-release");
    root.classList.remove("is-mission-learn-visible");
    intro.style.pointerEvents = "none";
    band.style.top = `${BAND_TOP_PCT}%`;
    applyTruckTranslate(truckTranslatePct(0, frame2P));
    rig.style.transform = "scale(1)";
    if (white) white.style.opacity = "0";

    const releaseT = introPx > 0 ? clamp(scrolled / introPx, 0, 1) : 1;
    const introBgOpacity =
      frame2P > 0 ? clamp(1 - frame2P / 0.42, 0, 1) : 1;
    root.style.setProperty("--mission-intro-bg-opacity", String(introBgOpacity));
    const introCopyOpacity = clamp(1 - releaseT / MORPH_INTRO_COPY_FADE, 0, 1);

    if (frame2P > 0) {
      root.classList.add("is-phase-a", "is-truck-q", "is-morphing");
      root.classList.toggle("is-phase-b", frame2P > 0.02);
      intro.style.opacity = "1";
      band.style.transform = `translate3d(${lerp(100, 0, frame2T)}%, 0, 0)`;
      applyMorphText(introCopyOpacity, frame2P);
      applyMorphPhotos(frame2P);
      applyMorphFirstValue(frame2P);
    } else {
      root.classList.remove("is-morphing", "is-phase-a", "is-phase-b", "is-truck-q");
      band.style.transform = "translate3d(100%, 0, 0)";
      resetTruckTranslatePeak();
      applyTruckTranslate(TRUCK_X_LEFT, true);
      applyMorphText(introCopyOpacity, 0);
      resetPhotosOffscreen();
    }

    if (releaseT < 1) {
      root.classList.add("is-frame-intro");
    } else {
      root.classList.remove("is-intro-release", "is-frame-intro");
    }
    if (frame2P <= 0) {
      hideAllValues();
    }
    missionUiLocked = false;
  };

  /** 第二帧：照片 / 文案 / 多样化 — 只在 mission stepIndex=0 播放一次 */
  const applyFrame2Entrance = (frame2P) => {
    const t = scrollT(frame2P);
    const bandTx = lerp(100, 0, t);

    root.classList.remove("is-intro-release", "is-frame-intro", "is-mission-learn-visible");
    root.classList.add("is-phase-a", "is-truck-q", "is-morphing");
    root.classList.toggle("is-phase-b", frame2P > 0);
    intro.style.opacity = "1";
    intro.style.pointerEvents = "none";
    band.style.top = `${BAND_TOP_PCT}%`;
    band.style.transform = `translate3d(${bandTx}%, 0, 0)`;
    applyTruckTranslate(truckTranslatePct(0, frame2P));
    rig.style.transform = "scale(1)";
    if (white) white.style.opacity = "0";
    root.style.setProperty("--mission-intro-bg-opacity", "0");

    applyMorphText(0, frame2P);
    applyMorphPhotos(frame2P);
    applyMorphFirstValue(frame2P);
  };

  const applyMissionStep = (stepIndex, stepT, bScroll, stepPx) => {
    if (stepIndex === 0) {
      const frame2P = scrollT(stepT);
      if (frame2P >= 1) {
        root.classList.remove("is-phase-a", "is-morphing", "is-frame-intro", "is-intro-release");
        root.classList.add("is-truck-q", "is-phase-b");
        intro.style.opacity = "1";
        intro.style.pointerEvents = "none";
        band.style.top = `${BAND_TOP_PCT}%`;
        band.style.transform = "translate3d(0, 0, 0)";
        applyTruckTranslate(truckTranslatePct(0, 1));
        rig.style.transform = "scale(1)";
        if (white) white.style.opacity = "0";
        root.style.setProperty("--mission-intro-bg-opacity", "0");
        applyMorphText(0, 1);
        applyPhotosForStep(0, 1);
        applyValuesForStep(0, 1);
        syncMissionLearnMore(0);
        if (!missionUiLocked) {
          lockTitleAsWatermark();
          lockSoloInBand();
          missionUiLocked = true;
        }
        return;
      }
      applyFrame2Entrance(frame2P);
      if (stepT >= 1 && !missionUiLocked) {
        lockTitleAsWatermark();
        lockSoloInBand();
        missionUiLocked = true;
      }
      return;
    }

    root.classList.remove("is-phase-a", "is-morphing");
    root.classList.add("is-truck-q");
    root.classList.toggle("is-phase-b", stepIndex >= 1);
    root.classList.remove("is-frame-intro");
    intro.style.opacity = "1";
    rig.style.transform = "scale(1)";
    band.style.top = `${BAND_TOP_PCT}%`;
    band.style.transform = "translate3d(0, 0, 0)";

    applyTruckTranslate(truckTranslatePct(stepIndex, stepT));

    white.style.opacity = "0";
    root.style.setProperty("--mission-intro-bg-opacity", "0");
    if (!missionUiLocked) {
      lockTitleAsWatermark();
      lockSoloInBand();
      missionUiLocked = true;
    }

    const valueStep = Math.min(stepIndex, VALUE_COUNT - 1);
    applyPhotosForStep(valueStep, stepT);
    applyValuesForStep(valueStep, stepT);
    syncMissionLearnMore(stepIndex);
  };

  let introTextPlayed = false;

  const armIntroTextMotion = () => {
    introHeadline.classList.add("reveal-motion", "reveal-motion--headline", "is-armed");
    introHeadline.style.setProperty("--reveal-delay", "0.14s");
  };

  const playIntroTitle = () => {
    title.classList.remove("is-in");
    void title.offsetWidth;
    title.classList.add("is-in");
  };

  const playIntroHeadline = () => {
    if (!introHeadline.classList.contains("reveal-motion")) armIntroTextMotion();
    introHeadline.classList.remove("is-in");
    introHeadline.classList.add("is-armed");
    void introHeadline.offsetWidth;
    introHeadline.classList.remove("is-armed");
    introHeadline.classList.add("is-in");
  };

  const playIntroText = () => {
    if (introTextPlayed) return;
    introTextPlayed = true;
    layoutIntroTypography();
    intro.style.opacity = "1";
    if (root.classList.contains("mission-scene--train-hero")) {
      root.classList.add("is-intro-entrance");
      return;
    }
    playIntroTitle();
    playIntroHeadline();
  };

  let raf = 0;
  let missionView = "intro"; /* intro | morph | mission */
  let missionUiLocked = false;
  let snapSettleTimer = 0;
  let missionScrollDir = 0;
  let prevMissionScrolled = null;
  let missionSnapping = false;
  let snapAnimFrame = 0;

  const cancelSnapAnimation = () => {
    if (snapAnimFrame) cancelAnimationFrame(snapAnimFrame);
    snapAnimFrame = 0;
    missionSnapping = false;
  };

  const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);

  const animateMissionScrollTo = (targetScrolled) => {
    cancelSnapAnimation();
    const { trackRect, scrolled, stepPx } = missionScrollMetrics();
    const from = scrolled;
    const delta = targetScrolled - from;
    if (Math.abs(delta) < 3) {
      missionScrollDir = 0;
      prevMissionScrolled = targetScrolled;
      return;
    }

    const duration = clamp((Math.abs(delta) / stepPx) * 480 + 280, 300, 620);
    const startTime = performance.now();
    missionSnapping = true;

    const tick = (now) => {
      const p = clamp((now - startTime) / duration, 0, 1);
      const eased = easeOutQuint(p);
      const current = from + delta * eased;
      const rect = track.getBoundingClientRect();
      const anchor = window.scrollY + rect.top;
      window.scrollTo({ top: anchor + current, behavior: "auto" });
      if (p < 1) {
        snapAnimFrame = requestAnimationFrame(tick);
        return;
      }
      snapAnimFrame = 0;
      missionSnapping = false;
      missionScrollDir = 0;
      prevMissionScrolled = targetScrolled;
    };
    snapAnimFrame = requestAnimationFrame(tick);
  };

  const missionScrollMetrics = () => {
    const vh = window.innerHeight;
    const trackRect = track.getBoundingClientRect();
    const scrollRange = Math.max(0, track.offsetHeight - vh);
    const scrolled = scrollRange > 0 ? clamp(-trackRect.top, 0, scrollRange) : 0;
    const introPx = INTRO_RELEASE_VH * vh;
    const stepPx = MISSION_STEP_VH * vh;
    return { vh, trackRect, scrollRange, scrolled, introPx, stepPx };
  };

  const missionSnapPoints = (scrollRange, introPx, stepPx) => {
    const points = [0];
    for (let i = 1; i <= MISSION_STEP_COUNT - 1; i++) {
      points.push(introPx + i * stepPx);
    }
    const lastStop = points[points.length - 1];
    if (scrollRange > lastStop + 1) {
      points.push(scrollRange);
    }
    return points.filter((p) => p <= scrollRange + 1);
  };

  /** 滚得少 → 回当前帧；滚得多 → 进下一帧；中间按滚动方向 */
  const resolveSnapTarget = (scrolled, points, direction, introPx) => {
    if (points.length < 2) return points[0] ?? 0;
    let seg = 0;
    for (let i = 0; i < points.length - 1; i++) {
      if (scrolled < points[i + 1] - 0.5) {
        seg = i;
        break;
      }
      seg = i;
    }
    const start = points[seg];
    const end = points[seg + 1];
    if (end === undefined) return start;
    const span = end - start;
    if (span <= 0) return start;
    const ratio = clamp((scrolled - start) / span, 0, 1);
    const edge = 0.14;
    if (ratio <= edge) {
      if (scrolled >= introPx - 0.5 && start < introPx - 0.5) return end;
      return start;
    }
    if (ratio >= 1 - edge) return end;
    if (direction > 0) return end;
    if (direction < 0) return start;
    return ratio >= 0.5 ? end : start;
  };

  const missionSnapSettle = () => {
    if (missionSnapping) return;
    const { vh, trackRect, scrollRange, scrolled, introPx, stepPx } = missionScrollMetrics();
    if (scrollRange <= 0) return;
    if (trackRect.top > 1 || trackRect.bottom < vh * 0.55) return;

    const points = missionSnapPoints(scrollRange, introPx, stepPx);
    const target = resolveSnapTarget(scrolled, points, missionScrollDir, introPx);
    if (Math.abs(scrolled - target) < 3) {
      missionScrollDir = 0;
      return;
    }

    animateMissionScrollTo(target);
  };

  const scheduleMissionSnapSettle = () => {
    if (missionSnapping) return;
    window.clearTimeout(snapSettleTimer);
    snapSettleTimer = window.setTimeout(missionSnapSettle, 220);
  };

  const trackMissionScrollDirection = () => {
    const { scrolled } = missionScrollMetrics();
    if (missionSnapping) return;
    if (prevMissionScrolled !== null) {
      if (scrolled > prevMissionScrolled + 0.5) missionScrollDir = 1;
      else if (scrolled < prevMissionScrolled - 0.5) missionScrollDir = -1;
    }
    prevMissionScrolled = scrolled;
  };

  const apply = () => {
    raf = 0;
    const vh = window.innerHeight;
    const trackRect = track.getBoundingClientRect();
    const sectionRect = root.getBoundingClientRect();
    const scrollRange = Math.max(0, track.offsetHeight - vh);
    const scrolled = scrollRange > 0 ? clamp(-trackRect.top, 0, scrollRange) : 0;

    const introPx = INTRO_RELEASE_VH * vh;
    const stepPx = MISSION_STEP_VH * vh;

    const pinned = trackRect.top <= 1 && trackRect.bottom >= vh * 0.5;
    const sectionInView = sectionRect.top < vh && sectionRect.bottom > 0;
    const introAtRest = pinned ? scrolled <= 0 : sectionInView && scrolled === 0;

    if (scrollRange <= 0 || introAtRest) {
      if (missionView !== "intro") {
        setIntroFrame();
        layoutIntroTypography();
        missionView = "intro";
        missionUiLocked = false;
        introTextPlayed = false;
      }
      if (pinned || sectionRect.top <= vh * 0.15) playIntroText();
      return;
    }

    const overlapPx = introPx * INTRO_FRAME2_OVERLAP;
    const frame2MorphStart = Math.max(0, introPx - overlapPx);
    const frame2MorphSpan = stepPx + overlapPx;

    if (scrolled < frame2MorphStart) {
      missionView = "intro-release";
      applyIntroRelease(scrolled, introPx, 0);
      return;
    }

    if (scrolled < introPx + stepPx) {
      missionView = "mission";
      const frame2P = clamp((scrolled - frame2MorphStart) / frame2MorphSpan, 0, 1);
      applyIntroRelease(scrolled, introPx, frame2P);
      if (frame2P >= 1 && !missionUiLocked) {
        lockTitleAsWatermark();
        lockSoloInBand();
        missionUiLocked = true;
      }
      return;
    }

    missionView = "mission";
    const bScroll = scrolled - introPx;
    const stepIndex = Math.min(MISSION_STEP_COUNT - 1, Math.floor(bScroll / stepPx));
    const stepT = clamp((bScroll - stepIndex * stepPx) / stepPx, 0, 1);
    applyMissionStep(stepIndex, stepT, bScroll, stepPx);
  };

  const onScroll = () => {
    trackMissionScrollDirection();
    if (!raf) raf = requestAnimationFrame(apply);
    scheduleMissionSnapSettle();
  };

  layoutTrack();
  setIntroFrame();
  layoutIntroTypography();
  apply();

  const onWheel = () => {
    if (missionSnapping) cancelSnapAnimation();
  };
  const onTouchStart = () => {
    if (missionSnapping) cancelSnapAnimation();
  };
  const onResize = () => {
    layoutTrack();
    onScroll();
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("wheel", onWheel, { passive: true });
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("resize", onResize);

  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("wheel", onWheel);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("resize", onResize);
    if (raf) cancelAnimationFrame(raf);
    if (snapAnimFrame) cancelAnimationFrame(snapAnimFrame);
  };
}
