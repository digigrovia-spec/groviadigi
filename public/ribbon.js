/* Groviadigi hero ribbon.
   A rope of points simulated with Verlet integration (gravity, damping, fixed segment length),
   pulled towards the brand loop shape. That pull gives the springy "rubber" opening and the
   silky snake motion. Everything is redrawn on a canvas every frame at device resolution,
   so the line stays sharp at any zoom level. */
(() => {
  const BRAND = [[0, [255, 175, 87]], [0.40, [52, 120, 255]], [0.62, [138, 73, 234]], [1, [138, 73, 234]]];
  const NIGHT = [13, 11, 38];
  // The loop shape, in design units (stroke width 46). Only the curved middle is sampled;
  // straight runs to both screen edges are added in pixels.
  const TAIL_Y = 330;
  const SHAPE = 'M 420 330 C 560 330 590 120 700 120 C 805 120 815 262 725 262 C 640 262 650 120 765 120 C 880 120 905 330 1040 330';
  const HW_U = 23;            // half the stroke width, in units
  const TOP_U = 120 - HW_U;   // top edge of the loop
  const BOT_U = 330 + HW_U;   // bottom edge of the straight line
  const FOCUS_U = [725, 262]; // the bottom of the loop: the camera dives into the ribbon here
  const smooth = t => t * t * (3 - 2 * t);
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const range = (v, a, b) => clamp((v - a) / (b - a));
  const mix = (a, b, t) => a + (b - a) * t;

  function colourAt(t) {
    t = clamp(t);
    let i = 0;
    while (i < BRAND.length - 2 && t > BRAND[i + 1][0]) i++;
    const [t0, c0] = BRAND[i], [t1, c1] = BRAND[i + 1], k = (t - t0) / (t1 - t0);
    return c0.map((c, j) => Math.round(mix(c, c1[j], k)));
  }

  // sample the SVG curve once
  const svgNS = 'http://www.w3.org/2000/svg';
  const shapePath = document.createElementNS(svgNS, 'path');
  shapePath.setAttribute('d', SHAPE);
  const shapeLen = shapePath.getTotalLength();
  const shapePts = [];
  for (let i = 0; i <= 240; i++) { const p = shapePath.getPointAtLength(shapeLen * i / 240); shapePts.push([p.x, p.y]); }

  function resample(poly, step) {
    const out = [poly[0].slice()];
    let carry = 0;
    for (let i = 1; i < poly.length; i++) {
      let [x0, y0] = poly[i - 1]; const [x1, y1] = poly[i];
      let d = Math.hypot(x1 - x0, y1 - y0);
      while (carry + d >= step) {
        const k = (step - carry) / d;
        x0 += (x1 - x0) * k; y0 += (y1 - y0) * k;
        out.push([x0, y0]);
        d = Math.hypot(x1 - x0, y1 - y0); carry = 0;
      }
      carry += d;
    }
    out.push(poly[poly.length - 1].slice());
    return out;
  }

  class Ribbon {
    constructor(canvas, opts = {}) {
      this.c = canvas; this.ctx = canvas.getContext('2d');
      this.reduce = !!opts.reduce;
      this.p = 0; this.pull = 0; this.introAt = -1; this.acc = 0; this.lastT = 0;
      this.mouse = null;
      this.n = 0;
    }

    // band: {w, h, top, bottom} in CSS px of the canvas; the loop fits between top and bottom
    layout(band) {
      const { w, h, top, bottom } = band;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      this.dpr = dpr; this.w = w; this.h = h;
      this.c.width = Math.round(w * dpr); this.c.height = Math.round(h * dpr);
      const mobile = w <= 820;
      const s = Math.min((w / 1440) * (mobile ? 1.8 : 1), Math.max(0.12, (bottom - top - 30) / (BOT_U - TOP_U)));
      const ox = w / 2 - 732 * s, oy = top + 14 - TOP_U * s;
      const hw = HW_U * s;
      this.hw = hw; this.s = s;
      const toPx = ([x, y]) => [ox + x * s, oy + y * s];
      const lineY = oy + TAIL_Y * s;
      const poly = [[-hw * 3, lineY], ...shapePts.map(toPx), [w + hw * 3, lineY]];
      const step = Math.max(3, hw * 0.55);
      const pts = resample(poly, step);
      const n = pts.length;
      const keep = this.n === n;
      this.step = step; this.n = n;
      this.tx = new Float32Array(n); this.ty = new Float32Array(n);
      if (!keep) { this.x = new Float32Array(n); this.y = new Float32Array(n); this.px = new Float32Array(n); this.py = new Float32Array(n); }
      // keep the live rope when only the size changed; reset it when the shape changed
      const reset = !keep || this.reduce || (!this.dropped && this.introAt < 0);
      pts.forEach(([x, y], i) => {
        this.tx[i] = x; this.ty[i] = y;
        if (reset) { this.x[i] = this.px[i] = x; this.y[i] = this.py[i] = y; }
      });
      this._needsDrop = !keep && this.dropped && this.introAt < 0;
      // the colour runs across the whole shape, left edge of the G to the right edge of the screen
      let mn = Infinity; for (let i = 0; i < n; i++) if (this.tx[i] < mn) mn = this.tx[i];
      this.gx0 = mn - hw; this.gx1 = w + hw * 3;
      const f = toPx(FOCUS_U);
      let fi = 0, best = 1e9;
      for (let i = 0; i < n; i++) { const d = Math.hypot(this.tx[i] - f[0], this.ty[i] - f[1]); if (d < best) { best = d; fi = i; } }
      this.fi = fi;
      this.floor = h * 1.6;
      this.zMax = Math.max(6, Math.hypot(w, h) / (hw * 1.5));
      if (this._needsDrop) this.drop();
    }

    // let the rope fall and hang below the screen, ready to spring up
    drop() {
      if (this.reduce) return;
      this.dropped = true; this._needsDrop = false;
      this.pull = 0;
      for (let i = 0; i < 260; i++) this.step1(0, 1 / 120, 0);
    }
    startIntro(now) { this.introAt = now; }

    step1(t, dt, wob) {
      const { n, x, y, px, py, tx, ty } = this;
      const g = 2400 * dt * dt, damp = 0.978, pull = this.pull;
      for (let i = 1; i < n - 1; i++) {
        const vx = (x[i] - px[i]) * damp, vy = (y[i] - py[i]) * damp;
        px[i] = x[i]; py[i] = y[i];
        x[i] += vx; y[i] += vy + g * (1 - pull);
        if (pull > 0) {
          x[i] += (tx[i] - x[i]) * pull * 0.09;
          y[i] += (ty[i] - y[i]) * pull * 0.09;
        }
      }
      if (this.mouse) {
        const { mx, my, vx, vy } = this.mouse, r = this.hw * 3;
        for (let i = 1; i < n - 1; i++) {
          const d = Math.hypot(x[i] - mx, y[i] - my);
          if (d < r) { const k = (1 - d / r) * 0.5; px[i] -= clamp(vx * k, -30, 30); py[i] -= clamp(vy * k, -30, 30); }
        }
        this.mouse = null;
      }
      const L = this.step;
      for (let it = 0; it < 6; it++) {
        for (let i = 0; i < n - 1; i++) {
          const dx = x[i + 1] - x[i], dy = y[i + 1] - y[i];
          const d = Math.hypot(dx, dy) || 1e-4, k = (d - L) / d * 0.5;
          if (i > 0) { x[i] += dx * k; y[i] += dy * k; }
          if (i + 1 < n - 1) { x[i + 1] -= dx * k; y[i + 1] -= dy * k; }
        }
        for (let i = 1; i < n - 1; i++) if (y[i] > this.floor) y[i] = this.floor;
      }
      x[0] = tx[0]; y[0] = ty[0]; x[n - 1] = tx[n - 1]; y[n - 1] = ty[n - 1];
    }

    // the colour the screen fills with at the end of the dive (from the resting shape, so it never flickers)
    diveColour() {
      const t = (this.tx[this.fi] - this.gx0) / (this.gx1 - this.gx0);
      return colourAt(t).join(',');
    }

    nudge(mx, my, vx, vy) { if (this.p < 0.05) this.mouse = { mx, my, vx, vy }; }

    frame(now, p) {
      this.p = p;
      const t = now / 1000;
      if (!this.reduce) {
        if (this.introAt >= 0) this.pull = smooth(clamp((now - this.introAt) / 1300));
        // wobble eases down as the camera dives in, but never fully stops
        const wob = 1 - 0.65 * range(p, 0.35, 0.85);
        let dt = Math.min(0.05, this.lastT ? (now - this.lastT) / 1000 : 1 / 60);
        this.lastT = now; this.acc += dt;
        let steps = 0;
        while (this.acc >= 1 / 120 && steps < 6) { this.step1(t, 1 / 120, wob); this.acc -= 1 / 120; steps++; }
        if (steps === 6) this.acc = 0;
      }
      this.draw(t);
    }

    draw(t) {
      const { ctx, dpr, w, h, n, x, y, hw } = this;
      const p = this.p;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, this.c.width, this.c.height);

      // camera: zoom into the loop and bring it to the centre of the screen
      const zt = smooth(range(p, 0.04, 0.9));
      const z = Math.exp(Math.log(this.zMax) * Math.pow(zt, 2.1));
      const fx = x[this.fi], fy = y[this.fi];
      const c = smooth(range(p, 0.04, 0.7));
      const cx = mix(fx, w / 2, c), cy = mix(fy, h / 2, c);
      const roll = 0.18 * c;  // a slight roll while diving in, like turning a silk ribbon
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.translate(cx, cy); ctx.rotate(roll); ctx.scale(z, z); ctx.translate(-fx, -fy);

      const path = () => {
        ctx.beginPath(); ctx.moveTo(x[0], y[0]);
        for (let i = 1; i < n - 1; i++) ctx.quadraticCurveTo(x[i], y[i], (x[i] + x[i + 1]) / 2, (y[i] + y[i + 1]) / 2);
        ctx.lineTo(x[n - 1], y[n - 1]);
      };
      ctx.lineJoin = 'round'; ctx.lineCap = 'butt';

      // soft shadow under the ribbon, gone once we are inside it
      const sh = 1 - range(p, 0.2, 0.45);
      if (sh > 0) {
        ctx.save(); ctx.translate(0, hw * 0.35);
        for (const [m, a] of [[1.15, 0.05], [1.45, 0.03], [1.8, 0.015]]) {
          ctx.strokeStyle = `rgba(13,11,38,${(a * sh).toFixed(4)})`; ctx.lineWidth = hw * 2 * m; path(); ctx.stroke();
        }
        ctx.restore();
      }
      const g = ctx.createLinearGradient(this.gx0, 0, this.gx1, 0);
      for (const [o, col] of BRAND) g.addColorStop(o, `rgb(${col})`);
      ctx.strokeStyle = g; ctx.lineWidth = hw * 2; path(); ctx.stroke();

      // once the ribbon fills the screen, its colour flows into the night of the next section
      // the ribbon's own colour floods the edges; the next section opens out of this colour
      const a = smooth(range(p, 0.5, 0.8));
      if (a > 0) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fillStyle = `rgba(${this.diveColour()},${a.toFixed(3)})`;
        ctx.fillRect(0, 0, this.c.width, this.c.height);
      }
    }
  }
  window.GroviaRibbon = Ribbon;
})();
