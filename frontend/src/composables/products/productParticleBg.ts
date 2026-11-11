// @ts-nocheck — 自 js 迁入，后续可补类型与 teardown
export function initProductParticleBg(): () => void {
  var landing = document.querySelector(".product-landing");
  if (!landing) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var sections = landing.querySelectorAll(".product-section");
  if (!sections.length) return;

  var BRAND_COLORS = ["#7eb0e4", "#68a1e4", "#8eb5e8", "#9ec4ef"];
  var instances = [];

  function ParticleZone(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.particles = [];
    this.mouse = { x: null, y: null };
    this.logicalWidth = 1;
    this.logicalHeight = 1;
    this.config = {
      baseDensity: 11,
      maxParticles: 72,
      minParticles: 32,
      particleSpeed: 0.22,
      lineMaxDistance: 132,
      lineOpacity: 0.44,
      mouseRadius: 130,
      mouseLinkDistance: 148,
      mouseMaxLinks: 14,
      mousePull: 0.011,
      maxConnections: 6,
      mobileFactor: 1.35,
    };
    this.resizeCanvas();
  }

  ParticleZone.prototype.resizeCanvas = function () {
    var w = this.canvas.clientWidth;
    var h = this.canvas.clientHeight;
    if (w < 2 || h < 2) return;

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.floor(w * dpr);
    this.canvas.height = Math.floor(h * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.logicalWidth = w;
    this.logicalHeight = h;
    this.createParticles(true);
  };

  ParticleZone.prototype.createParticles = function (reset) {
    if (reset) this.particles = [];
    var w = this.logicalWidth;
    var h = this.logicalHeight;
    var count = Math.floor((w * h) / (this.config.baseDensity * 420));
    count = Math.min(count, this.config.maxParticles);
    if (window.innerWidth < 768) {
      count = Math.floor(count / this.config.mobileFactor);
    }
    count = Math.max(count, this.config.minParticles);

    for (var i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * this.config.particleSpeed,
        vy: (Math.random() - 0.5) * this.config.particleSpeed,
        radius: Math.random() * 1.1 + 0.75,
        color: BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)],
      });
    }
  };

  ParticleZone.prototype.updateMouse = function (clientX, clientY) {
    var rect = this.canvas.getBoundingClientRect();
    if (
      clientX < rect.left ||
      clientX > rect.right ||
      clientY < rect.top ||
      clientY > rect.bottom
    ) {
      this.mouse.x = null;
      this.mouse.y = null;
      return;
    }
    this.mouse.x = clientX - rect.left;
    this.mouse.y = clientY - rect.top;
  };

  ParticleZone.prototype.drawConnection = function (ax, ay, bx, by, distance, maxDistance, opacityScale) {
    var span = maxDistance || this.config.lineMaxDistance;
    var scale = opacityScale == null ? 1 : opacityScale;
    var opacity = (1 - distance / span) * this.config.lineOpacity * scale;
    this.ctx.beginPath();
    this.ctx.strokeStyle = "rgba(104,161,228," + opacity + ")";
    this.ctx.lineWidth = 0.85;
    this.ctx.moveTo(ax, ay);
    this.ctx.lineTo(bx, by);
    this.ctx.stroke();
  };

  ParticleZone.prototype.step = function () {
    var self = this;
    var w = this.logicalWidth;
    var h = this.logicalHeight;
    if (w < 2 || h < 2) return;

    this.ctx.clearRect(0, 0, w, h);

    var connectionCount = new Map();
    this.particles.forEach(function (p) {
      connectionCount.set(p, 0);
    });

    for (var index = 0; index < this.particles.length; index++) {
      var particle = this.particles[index];
      var neighbors = [];
      for (var j = index + 1; j < this.particles.length; j++) {
        var other = this.particles[j];
        var dx = particle.x - other.x;
        var dy = particle.y - other.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.config.lineMaxDistance) {
          neighbors.push({ other: other, distance: distance });
        }
      }
      neighbors.sort(function (a, b) {
        return a.distance - b.distance;
      });
      neighbors.slice(0, this.config.maxConnections).forEach(function (entry) {
        var other = entry.other;
        var distance = entry.distance;
        if (
          connectionCount.get(particle) < self.config.maxConnections &&
          connectionCount.get(other) < self.config.maxConnections
        ) {
          self.drawConnection(particle.x, particle.y, other.x, other.y, distance);
          connectionCount.set(particle, connectionCount.get(particle) + 1);
          connectionCount.set(other, connectionCount.get(other) + 1);
        }
      });
    }

    this.particles.forEach(function (particle) {
      if (particle.x <= 0 || particle.x >= w) particle.vx *= -1;
      if (particle.y <= 0 || particle.y >= h) particle.vy *= -1;

      if (self.mouse.x != null && self.mouse.y != null) {
        var dx = particle.x - self.mouse.x;
        var dy = particle.y - self.mouse.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < self.config.mouseRadius && distance > 0.5) {
          var force = (self.config.mouseRadius - distance) / self.config.mouseRadius;
          particle.x -= dx * force * self.config.mousePull;
          particle.y -= dy * force * self.config.mousePull;
        }
      }

      particle.x += particle.vx;
      particle.y += particle.vy;

      self.ctx.beginPath();
      self.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      self.ctx.fillStyle = particle.color;
      self.ctx.globalAlpha = 0.62;
      self.ctx.fill();
      self.ctx.globalAlpha = 1;
    });

    if (this.mouse.x != null && this.mouse.y != null) {
      var mx = this.mouse.x;
      var my = this.mouse.y;
      var mouseLinks = [];

      this.particles.forEach(function (particle) {
        var dx = particle.x - mx;
        var dy = particle.y - my;
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < self.config.mouseLinkDistance) {
          mouseLinks.push({ particle: particle, distance: distance });
        }
      });

      mouseLinks.sort(function (a, b) {
        return a.distance - b.distance;
      });

      mouseLinks.slice(0, this.config.mouseMaxLinks).forEach(function (entry) {
        self.drawConnection(
          entry.particle.x,
          entry.particle.y,
          mx,
          my,
          entry.distance,
          self.config.mouseLinkDistance,
          1.15,
        );
      });

      this.ctx.beginPath();
      this.ctx.arc(mx, my, 2.8, 0, Math.PI * 2);
      this.ctx.fillStyle = "#68a1e4";
      this.ctx.globalAlpha = 0.85;
      this.ctx.fill();
      this.ctx.globalAlpha = 1;
    }
  };

  sections.forEach(function (section, index) {
    var head = section.querySelector(".product-section__head");
    if (!head) return;

    var side = index % 2 === 0 ? "right" : "left";
    head.classList.add(
      side === "right" ? "product-section__head--particles-right" : "product-section__head--particles-left",
    );

    var canvas = document.createElement("canvas");
    canvas.className = "product-section__particles";
    canvas.setAttribute("aria-hidden", "true");
    head.insertBefore(canvas, head.firstChild);
    instances.push(new ParticleZone(canvas));
  });

  if (!instances.length) return;

  var running = true;
  var resizeObserver;

  function onResize() {
    instances.forEach(function (zone) {
      zone.resizeCanvas();
    });
  }

  function onMouseMove(e) {
    instances.forEach(function (zone) {
      zone.updateMouse(e.clientX, e.clientY);
    });
  }

  function onVisibility() {
    if (document.hidden) {
      running = false;
    } else {
      running = true;
      requestAnimationFrame(tick);
    }
  }

  function tick() {
    if (!running) return;
    instances.forEach(function (zone) {
      zone.step();
    });
    requestAnimationFrame(tick);
  }

  window.addEventListener("resize", onResize);
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseout", function () {
    instances.forEach(function (zone) {
      zone.mouse.x = null;
      zone.mouse.y = null;
    });
  });
  document.addEventListener("visibilitychange", onVisibility);

  if (typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(onResize);
    instances.forEach(function (zone) {
      resizeObserver.observe(zone.canvas);
    });
  }

  requestAnimationFrame(tick);

  return () => {};
}
