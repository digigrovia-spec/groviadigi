/* Groviadigi "Recent builds" strand.
   Each card is captured to a texture once, then drawn on a WebGL plane. A vertex shader bends
   all planes along one continuous surface (by world x, so neighbouring cards read as one strand):
   the middle swells towards you, the sides fall back, and the strand twists like DNA, harder
   when you scroll fast. Libraries load only when the section is near; if anything fails the
   page keeps the plain HTML cards. */
(() => {
  const THREE_URL = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  const H2C_URL = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
  const load = src => new Promise((ok, fail) => {
    if ([...document.scripts].some(s => s.src === src)) return ok();
    const s = document.createElement('script'); s.src = src; s.async = true;
    s.onload = ok; s.onerror = fail; document.head.appendChild(s);
  });

  const VERT = `
    #define PI 3.141592653589793
    uniform float uW;      // half the strand's visible width, px
    uniform float uV;      // scroll speed, 0..1
    uniform float uBulge;  // how far the middle swells towards you
    uniform float uFall;   // how far the sides fall back
    varying vec2 vUv;
    varying float vS;
    void main() {
      vUv = uv;
      vec4 w = modelMatrix * vec4(position, 1.0);
      float s = w.x / uW;                       // -1 left edge .. 1 right edge
      vS = s;
      float g = exp(-s * s * 1.7);              // the swell in the middle
      // twist about the strand's own axis: an S at rest, wrung harder at speed
      float side = smoothstep(0.25, 0.95, abs(s)) * sign(s);
      float a = 0.42 * sin(PI * s * 0.85) * (1.0 - 0.45 * g) + 0.95 * uV * side;
      float y = w.y;
      w.y = y * cos(a);
      w.z = y * sin(a);
      // depth: swell forward in the middle, fall back towards the sides
      w.z += uBulge * g - uFall * s * s;
      // a slight rise to the right; at speed the left side lifts and comes towards you
      w.y += 0.035 * w.x;
      float left = (1.0 - smoothstep(-1.0, 0.3, s)) * uV;
      w.y += 0.09 * uW * left;
      w.z += 0.18 * uW * left;
      gl_Position = projectionMatrix * viewMatrix * w;
    }`;
  const FRAG = `
    uniform sampler2D uMap;
    uniform vec2 uSize;
    uniform float uR;
    varying vec2 vUv;
    varying float vS;
    float box(vec2 p, vec2 b, float r) { vec2 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r; }
    void main() {
      vec4 tex = texture2D(uMap, vUv);
      vec2 p = (vUv - 0.5) * uSize;
      float d = box(p, uSize * 0.5, uR);
      float a = 1.0 - smoothstep(-1.0, 1.0, d);
      // light falls off towards the far sides; a soft sheen near the top
      float shade = 1.0 - 0.32 * smoothstep(0.35, 1.25, abs(vS));
      vec3 col = tex.rgb * shade + vec3(0.06) * (1.0 - vUv.y) * (1.0 - smoothstep(0.0, 0.8, abs(vS)));
      a *= tex.a * (1.0 - smoothstep(1.35, 1.85, abs(vS)));
      if (a < 0.003) discard;
      gl_FragColor = vec4(col, a);
    }`;

  class Strand {
    constructor(host, cards) { this.host = host; this.cards = cards; this.ready = false; this.failed = false; }

    async init() {
      if (this.ready || this.busy || this.failed) return;
      this.busy = true;
      try {
        await Promise.all([load(THREE_URL), load(H2C_URL)]);
        if (!window.THREE || !window.html2canvas) throw new Error('libraries missing');
        const T = window.THREE;
        const canvas = document.createElement('canvas');
        canvas.className = 'strand-canvas';
        canvas.setAttribute('aria-hidden', 'true');
        this.renderer = new T.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
        this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
        this.renderer.setClearColor(0x000000, 0);
        this.scene = new T.Scene();
        this.camera = new T.PerspectiveCamera(30, 1, 10, 20000);
        this.host.appendChild(canvas);
        this.canvas = canvas;
        await document.fonts.ready;
        await this.capture();
        if (this.failed) { this.busy = false; return; }   // lite mode was switched on meanwhile
        this.layout();
        this.ready = true;
        this.host.classList.add('strand-on');
      } catch (e) {
        this.failed = true;
        if (this.canvas) this.canvas.remove();
      }
      this.busy = false;
    }

    // draw each HTML card to a texture, flat (without its scroll transform).
    // The live page is never touched: html2canvas works on its own copy of the page, where the
    // cards are made visible and flat. Touching the live cards (as before) flashed the plain HTML
    // cards over the strand for a moment, which read as a glitch.
    async capture() {
      const T = window.THREE;
      const textures = [];
      const scale = Math.min(2, Math.max(1.5, window.devicePixelRatio || 1));
      // html2canvas finds the text baseline with a test <img>; the page sets img{display:block},
      // which throws that off and drops every line of text a few pixels (the +28% badge text fell
      // out of its pill). Undo the rule only while capturing. The one <img> on the page sits absolutely
      // positioned in the blog card, so switching it to inline moves nothing.
      const fix = document.createElement("style");
      fix.textContent = "img{display:inline!important}";
      document.head.appendChild(fix);
      try {
      for (const card of this.cards) {
        const cv = await window.html2canvas(card, {
          scale, backgroundColor: null, logging: false, useCORS: true,
          // copy only what the card needs; skipping the rest of the page keeps each capture short
          ignoreElements: el => el !== card && !el.contains(card) && !card.contains(el) && /^(SECTION|HEADER|FOOTER|NAV|ASIDE|CANVAS)$/.test(el.tagName),
          onclone: doc => {
            const host = doc.querySelector(".work-sticky"); if (host) host.classList.remove("strand-on");
            const rail = doc.getElementById("cards"); if (rail) rail.style.transform = "none";
            doc.querySelectorAll(".card").forEach(c => { c.style.transform = "none"; });
          },
        });
        const tex = new T.CanvasTexture(cv);
        tex.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
        tex.minFilter = T.LinearMipmapLinearFilter;
        tex.generateMipmaps = true;
        textures.push(tex);
        await new Promise(r => setTimeout(r, 16));       // let the page draw a frame between cards
      }
      } finally { fix.remove(); }
      const old = this.textures; this.textures = textures;
      old && old.forEach(t => t.dispose());
    }

    layout() {
      const T = window.THREE;
      const W = this.host.clientWidth, H = this.host.clientHeight;
      this.W = W; this.H = H;
      this.renderer.setSize(W, H, false);
      this.camera.aspect = W / H;
      // one world unit = one CSS pixel at z = 0
      this.camera.position.set(0, 0, (H / 2) / Math.tan((this.camera.fov * Math.PI / 180) / 2));
      this.camera.updateProjectionMatrix();
      const r0 = this.host.getBoundingClientRect();
      const first = this.cards[0];
      const cw = first.offsetWidth, ch = first.offsetHeight;
      const rail = first.parentElement.getBoundingClientRect();
      this.centreY = -((rail.top + rail.height / 2) - (r0.top + H / 2));
      this.xs = this.cards.map(c => c.offsetLeft + c.offsetWidth / 2);
      if (this.meshes) this.meshes.forEach(m => { this.scene.remove(m); m.geometry.dispose(); m.material.dispose(); });
      const radius = parseFloat(getComputedStyle(first).borderTopLeftRadius) || 22;
      this.meshes = this.textures.map(tex => {
        const mat = new T.ShaderMaterial({
          vertexShader: VERT, fragmentShader: FRAG, transparent: true, depthWrite: false,
          uniforms: {
            uMap: { value: tex }, uSize: { value: new T.Vector2(cw, ch) }, uR: { value: radius },
            // on narrow screens the curve is spread wider, so a card is bent less and its text stays readable
            uW: { value: W < 700 ? W * 0.9 : W / 2 }, uV: { value: 0 }, uBulge: { value: Math.min(260, W * 0.2) }, uFall: { value: Math.min(420, W * (W < 700 ? 0.22 : 0.32)) },
          },
        });
        const m = new T.Mesh(new T.PlaneGeometry(cw, ch, 64, 16), mat);
        this.scene.add(m);
        return m;
      });
    }

    async resize() {
      if (!this.ready) return;
      await this.capture();
      this.layout();
    }

    // lite mode: drop the WebGL strand and go back to the plain HTML cards
    destroy() {
      this.failed = true; this.ready = false;
      this.host.classList.remove("strand-on");
      if (this.meshes) this.meshes.forEach(m => { m.geometry.dispose(); m.material.dispose(); });
      if (this.textures) this.textures.forEach(t => t.dispose());
      if (this.renderer) { this.renderer.dispose(); this.renderer.forceContextLoss && this.renderer.forceContextLoss(); }
      if (this.canvas) this.canvas.remove();
    }

    // shift: how far the strand has slid (px); v: scroll speed 0..1
    update(shift, v) {
      if (!this.ready) return;
      const x0 = this.xs[0];
      this.meshes.forEach((m, i) => {
        m.position.set(this.xs[i] - x0 - shift, this.centreY, 0);
        m.renderOrder = -Math.abs(this.xs[i] - x0 - shift);   // nearer cards drawn last
        m.material.uniforms.uV.value = v;
      });
      this.renderer.render(this.scene, this.camera);
    }
  }
  window.GroviaStrand = Strand;
})();
