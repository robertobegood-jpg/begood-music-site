/* Equalizador em WebGL — efeito sutil de fundo do site Begood Music.
   Colunas de segmentos que sobem e descem como um medidor de som
   e acendem perto do dedo/mouse. Pausa fora da tela, com a aba oculta e
   respeita "reduzir movimento". Sem WebGL, cai numa grade em CSS. */
(function () {
  "use strict";

  var VERT = "attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}";

  var FRAG = [
    "precision mediump float;",
    "uniform vec2 uRes;uniform float uTime;uniform vec2 uPtr;uniform float uDpr;",
    "uniform vec3 uInk;uniform vec3 uApp;uniform float uCell;uniform float uForca;",
    "float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}",
    "float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);",
    " return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}",
    "void main(){",
    " vec2 p=gl_FragCoord.xy;",
    " float c=uCell*uDpr;",
    " vec2 id=floor(p/c);",
    " vec2 l=mod(p,c)-c*.5;",
    " float linhas=uRes.y/c;",
    // forma de onda: cada coluna é uma barra de equalizador que sobe e desce
    " float x=id.x;",
    " float onda=.55+.45*sin(x*.19+uTime*1.3)*sin(x*.047-uTime*.55);",
    " float bate=n(vec2(x*.35,uTime*1.6));",
    " float amp=(.15+.85*onda*bate)*linhas*.36+.6;",
    " float d=abs(id.y+.5-linhas*.52)/amp;",
    " float ligado=1.-smoothstep(.75,1.,d);",
    // brilho perto do ponteiro
    " vec2 dp=(p-uPtr)/(170.*uDpr);",
    " float g=exp(-dot(dp,dp)*1.6);",
    // cada célula é um segmento horizontal, como os LEDs de um medidor de volume
    " float W=(c*.36)*(1.+.25*g);",
    " float H=max(1.,c*.11);",
    " float aa=uDpr;",
    " float m=(1.-smoothstep(W,W+aa,abs(l.x)))*(1.-smoothstep(H,H+aa,abs(l.y)));",
    // máscara: some em direção ao canto inferior esquerdo (onde fica o texto)
    " vec2 uv=p/uRes;",
    " float v=smoothstep(.42,.98,uv.x+uv.y*.12);",
    " float a=m*(.035+.55*ligado*(.35+.65*v)+.35*g)*(.04+.96*v)*uForca;",
    " vec3 col=mix(uInk,uApp,clamp(ligado*.9+g,0.,1.));",
    " gl_FragColor=vec4(col*a,a);",
    "}"
  ].join("\n");

  function hexParaRgb(cor) {
    cor = (cor || "").trim();
    var m = cor.match(/^#([0-9a-f]{6})/i);
    if (m) {
      var v = parseInt(m[1], 16);
      return [(v >> 16 & 255) / 255, (v >> 8 & 255) / 255, (v & 255) / 255];
    }
    m = cor.match(/rgba?\(([^)]+)\)/);
    if (m) {
      var p = m[1].split(",").map(parseFloat);
      return [p[0] / 255, p[1] / 255, p[2] / 255];
    }
    return [0.95, 0.95, 0.93];
  }

  function fallback(canvas) {
    var div = document.createElement("div");
    div.className = "campo-fallback";
    canvas.replaceWith(div);
  }

  function iniciar(canvas) {
    var hero = canvas.parentElement;
    var reduzir = window.matchMedia("(prefers-reduced-motion: reduce)");
    var toque = window.matchMedia("(pointer: coarse)").matches;
    var gl;
    try {
      gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false, powerPreference: "low-power" });
    } catch (e) { gl = null; }
    if (!gl) { fallback(canvas); return; }

    function shader(tipo, src) {
      var s = gl.createShader(tipo);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
      return s;
    }
    var prog;
    try {
      prog = gl.createProgram();
      gl.attachShader(prog, shader(gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error("link");
    } catch (e) { fallback(canvas); return; }

    gl.useProgram(prog);
    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    var U = {};
    ["uRes", "uTime", "uPtr", "uDpr", "uInk", "uApp", "uCell", "uForca"].forEach(function (k) { U[k] = gl.getUniformLocation(prog, k); });

    // Celular: menos pixels e 30 fps para poupar bateria.
    var dpr = Math.min(window.devicePixelRatio || 1, toque ? 1.5 : 2);
    var w = 0, h = 0;
    function cores() {
      var cs = getComputedStyle(hero);
      gl.uniform3fv(U.uInk, hexParaRgb(cs.getPropertyValue("--ink")));
      gl.uniform3fv(U.uApp, hexParaRgb(cs.getPropertyValue("--app")));
      var claro = window.matchMedia("(prefers-color-scheme: light)").matches;
      var estreito = canvas.getBoundingClientRect().width < 640;
      gl.uniform1f(U.uForca, (claro ? 0.75 : 1.0) * (estreito ? 0.55 : 1.0));
    }
    function medir() {
      var r = canvas.getBoundingClientRect();
      w = Math.max(1, Math.round(r.width * dpr));
      h = Math.max(1, Math.round(r.height * dpr));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(U.uRes, w, h);
      gl.uniform1f(U.uDpr, dpr);
      gl.uniform1f(U.uCell, r.width < 640 ? 16 : 20);
    }

    // Ponteiro suavizado; sem mouse, ele passeia sozinho devagar.
    var alvo = null, ptr = { x: -9999, y: -9999 }, ultimoMov = 0;
    window.addEventListener("pointermove", function (e) {
      var r = canvas.getBoundingClientRect();
      if (e.clientY < r.top || e.clientY > r.bottom) { alvo = null; return; }
      alvo = { x: (e.clientX - r.left) * dpr, y: (r.bottom - e.clientY) * dpr };
      ultimoMov = performance.now();
    }, { passive: true });

    var visivel = true, rodando = false, t0 = performance.now(), ultimo = 0;
    function quadro(agora) {
      if (!visivel || document.hidden || reduzir.matches) { rodando = false; return; }
      requestAnimationFrame(quadro);
      if (toque && agora - ultimo < 32) return;
      ultimo = agora;
      desenhar(agora);
    }
    function desenhar(agora) {
      var t = (agora - t0) / 1000;
      var a = alvo;
      if (!a || agora - ultimoMov > 2500) {
        a = { x: w * (0.8 + 0.15 * Math.sin(t * 0.21)), y: h * (0.62 + 0.25 * Math.sin(t * 0.17 + 1.3)) };
      }
      if (ptr.x < -9000) { ptr.x = a.x; ptr.y = a.y; }
      ptr.x += (a.x - ptr.x) * 0.06;
      ptr.y += (a.y - ptr.y) * 0.06;
      gl.uniform1f(U.uTime, t);
      gl.uniform2f(U.uPtr, ptr.x, ptr.y);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    function ligar() {
      if (reduzir.matches) { desenhar(t0 + 12000); return; } // um quadro parado
      if (!rodando) { rodando = true; requestAnimationFrame(quadro); }
    }

    cores();
    medir();
    ligar();

    if ("ResizeObserver" in window) new ResizeObserver(function () { medir(); cores(); if (reduzir.matches) ligar(); }).observe(canvas);
    else window.addEventListener("resize", medir);
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) { visivel = es[0].isIntersecting; if (visivel) ligar(); }).observe(canvas);
    }
    document.addEventListener("visibilitychange", function () { if (!document.hidden) ligar(); });
    window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", function () { cores(); ligar(); });
    reduzir.addEventListener("change", ligar);
    canvas.addEventListener("webglcontextlost", function (e) { e.preventDefault(); fallback(canvas); });
  }

  document.querySelectorAll("canvas.campo").forEach(iniciar);
})();
