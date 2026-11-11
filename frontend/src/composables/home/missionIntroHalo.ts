// @ts-nocheck — 自 legacy js/mission-intro-halo.js 迁入
/** 使命区 WebGL 光晕 */
export function initMissionIntroHalo(): () => void {
  const root = document.querySelector(".mission-scene");
  const container = root?.querySelector(".mission-scene__intro-art");
  const canvas = container?.querySelector(".mission-scene__intro-halo-canvas");
  if (!root || !container || !canvas || !document.body.classList.contains("page-home")) return () => {};
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  const fallback = container.querySelector(".mission-scene__intro-halo-fallback");

  const vertSrc = `#version 300 es
in vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

  const fragSrc = `#version 300 es
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
out vec4 fragColor;

const float ROTATION_SPEED = 3.9;
const float HIGHLIGHT_SPEED = 1.4;
const float NOISE_SCALE = 1.6;
const float INNER_RADIUS = 0.5;
const vec3 COLOR_MAIN_1 = vec3(0.0708, 0.5353, 1.0);
const vec3 COLOR_MAIN_2 = vec3(0.2876, 0.8456, 1.0);
const vec3 COLOR_BACK = vec3(0.0, 0.1275, 0.1667);
const vec4 BG_COLOR = vec4(0.0, 0.0, 0.0, 0.0);

vec3 hash33(vec3 p3) {
  p3 = fract(p3 * vec3(0.1031, 0.11369, 0.13787));
  p3 += dot(p3, p3.yxz + 19.19);
  return -1.0 + 2.0 * fract(vec3(p3.x + p3.y, p3.x + p3.z, p3.y + p3.z) * p3.zyx);
}

float snoise3(vec3 p) {
  const float K1 = 0.333333333;
  const float K2 = 0.166666667;
  vec3 i = floor(p + (p.x + p.y + p.z) * K1);
  vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);
  vec3 e = step(vec3(0.0), d0 - d0.yzx);
  vec3 i1 = e * (1.0 - e.zxy);
  vec3 i2 = 1.0 - e.zxy * (1.0 - e);
  vec3 d1 = d0 - (i1 - K2);
  vec3 d2 = d0 - (i2 - K1);
  vec3 d3 = d0 - 0.5;
  vec4 h = max(0.6 - vec4(dot(d0, d0), dot(d1, d1), dot(d2, d2), dot(d3, d3)), 0.0);
  vec4 n = h * h * h * h * vec4(
    dot(d0, hash33(i)),
    dot(d1, hash33(i + i1)),
    dot(d2, hash33(i + i2)),
    dot(d3, hash33(i + 1.0))
  );
  return dot(vec4(31.316), n);
}

vec4 extractAlpha(vec3 colorIn) {
  float maxValue = min(max(max(colorIn.r, colorIn.g), colorIn.b), 1.0);
  if (maxValue > 1e-5) {
    return vec4(colorIn.rgb * (1.0 / maxValue), maxValue);
  }
  return vec4(0.0);
}

float light1(float intensity, float attenuation, float dist) {
  return intensity / (1.0 + dist * attenuation);
}

float light2(float intensity, float attenuation, float dist) {
  return intensity / (1.0 + dist * dist * attenuation);
}

void main() {
  vec2 res = u_resolution;
  vec2 uv = (gl_FragCoord.xy * 2.0 - res) / res.y;
  float time = u_time * 0.001;

  float ang = atan(uv.y, uv.x);
  float len = length(uv);

  float n0 = snoise3(vec3(uv * NOISE_SCALE, time * 0.5)) * 0.5 + 0.5;
  float r0 = mix(mix(INNER_RADIUS, 1.0, 0.4), mix(INNER_RADIUS, 1.0, 0.6), n0);
  float d0 = distance(uv, r0 / len * uv);

  float v0 = light1(1.0, 10.0, d0);
  v0 *= smoothstep(r0 * 1.05, r0, len);
  float cl = cos(ang + time * ROTATION_SPEED) * 0.5 + 0.5;

  float a = time * HIGHLIGHT_SPEED;
  vec2 pos = vec2(cos(a), sin(a)) * r0;
  float d = distance(uv, pos);
  float v1 = light2(1.5, 5.0, d);
  v1 *= light1(1.0, 50.0, d0);

  float v2 = smoothstep(1.0, mix(INNER_RADIUS, 1.0, n0 * 0.5), len);
  float v3 = smoothstep(INNER_RADIUS, mix(INNER_RADIUS, 1.0, 0.5), len);

  vec3 col = mix(COLOR_MAIN_1, COLOR_MAIN_2, cl);
  col = mix(COLOR_BACK, col, v0);
  col = (col + v1 * 1.15) * v2 * v3;
  col = clamp(col, 0.0, 1.0);

  vec3 deepBg = mix(vec3(0.004, 0.018, 0.055), vec3(0.015, 0.08, 0.2), smoothstep(-0.75, 0.85, uv.y));
  float vign = smoothstep(1.35, 0.22, len);
  deepBg *= mix(0.5, 1.0, vign);

  float aur = snoise3(vec3(uv * vec2(2.4, 0.55) + vec2(time * 0.08, time * 0.05), time * 0.18));
  aur = smoothstep(0.05, 0.82, aur * 0.5 + 0.5);
  aur *= smoothstep(0.95, 0.08, abs(uv.y + 0.12));
  deepBg += vec3(0.05, 0.14, 0.32) * aur * 0.42;

  float rim = smoothstep(0.72, 0.38, len) * (0.22 + 0.18 * cl);
  deepBg += COLOR_MAIN_2 * rim * 0.35;

  vec4 halo = extractAlpha(col);
  vec3 rgb = deepBg + halo.rgb * halo.a;
  float alpha = clamp(max(halo.a, vign * 0.88), 0.0, 1.0);
  fragColor = vec4(clamp(rgb, 0.0, 1.0), alpha);
}`;

  function compileShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  const gl = canvas.getContext("webgl2", {
    alpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "high-performance",
  });

  if (!gl) {
    root.classList.add("is-halo-fallback");
    return () => {};
  }

  const vs = compileShader(gl.VERTEX_SHADER, vertSrc);
  const fs = compileShader(gl.FRAGMENT_SHADER, fragSrc);
  if (!vs || !fs) {
    root.classList.add("is-halo-fallback");
    return () => {};
  }

  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    root.classList.add("is-halo-fallback");
    return () => {};
  }

  gl.deleteShader(vs);
  gl.deleteShader(fs);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW
  );

  const aPosition = gl.getAttribLocation(program, "a_position");
  const uResolution = gl.getUniformLocation(program, "u_resolution");
  const uTime = gl.getUniformLocation(program, "u_time");
  let raf = 0;
  let startMs = performance.now();
  let visible = false;

  const resize = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w < 2 || h < 2) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
  };

  const shouldRenderHalo = () => {
    if (root.classList.contains("is-frame-intro") || root.classList.contains("is-intro-release")) {
      const fade = parseFloat(getComputedStyle(root).getPropertyValue("--mission-intro-bg-opacity"));
      return fade > 0.02;
    }
    if (!root.classList.contains("is-phase-a")) return false;
    const fade = parseFloat(getComputedStyle(root).getPropertyValue("--mission-intro-bg-opacity"));
    return fade > 0.02;
  };

  const draw = (now) => {
    raf = 0;
    if (!shouldRenderHalo()) {
      visible = false;
      return;
    }

    const rect = container.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) {
      visible = false;
      raf = requestAnimationFrame(draw);
      return;
    }

    visible = true;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.uniform2f(uResolution, canvas.width, canvas.height);
    gl.uniform1f(uTime, now - startMs);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    raf = requestAnimationFrame(draw);
  };

  const kick = () => {
    resize();
    if (!raf) raf = requestAnimationFrame(draw);
  };

  resize();
  kick();

  let ro: ResizeObserver | undefined;
  if (typeof ResizeObserver !== "undefined") {
    ro = new ResizeObserver(kick);
    ro.observe(container);
  } else {
    window.addEventListener("resize", kick);
  }

  const mo = new MutationObserver(kick);
  mo.observe(root, { attributes: true, attributeFilter: ["class"] });

  const onVisibility = () => {
    if (document.hidden) {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    } else {
      kick();
    }
  };
  document.addEventListener("visibilitychange", onVisibility);

  return () => {
    if (raf) cancelAnimationFrame(raf);
    if (ro) ro.disconnect();
    else window.removeEventListener("resize", kick);
    mo.disconnect();
    document.removeEventListener("visibilitychange", onVisibility);
  };
}
