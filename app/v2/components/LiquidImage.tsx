"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "@/lib/gsap";

type Props = { src: string; colors: [string, string]; className?: string };

const GRID = 64;

const vert = /* glsl */ `
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

const frag = /* glsl */ `
precision highp float;
uniform sampler2D uTex;
uniform sampler2D uFlow;
uniform vec2 uScale;
uniform float uTime;
varying vec2 vUv;
void main(){
  vec2 flow = (texture2D(uFlow, vUv).rg - 0.5) * 2.0;
  float m = length(flow);
  vec2 uv = (vUv - 0.5) * uScale + 0.5;
  uv += vec2(sin(vUv.y * 7.0 + uTime * 0.6), cos(vUv.x * 7.0 + uTime * 0.5)) * 0.003;
  vec2 off = flow * 0.075;
  float r = texture2D(uTex, uv - off * 1.0).r;
  float g = texture2D(uTex, uv - off * 1.35).g;
  float b = texture2D(uTex, uv - off * 1.7).b;
  vec3 col = vec3(r, g, b) + m * 0.05;
  gl_FragColor = vec4(col, 1.0);
}
`;

/**
 * An image rendered with Three.js whose pixels are pushed around by the mouse,
 * like liquid. A small CPU velocity grid is uploaded as a texture and used as a
 * displacement map (with a touch of RGB split). No 3D objects — one flat plane.
 */
export default function LiquidImage({ src, colors, className }: Props) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current!;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    } catch {
      return; // WebGL unavailable: the CSS gradient behind stays visible
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    const canvas = renderer.domElement;
    canvas.style.cssText = "width:100%;height:100%;display:block;opacity:0";
    el.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // velocity grid → texture
    const vx = new Float32Array(GRID * GRID);
    const vy = new Float32Array(GRID * GRID);
    const data = new Uint8Array(GRID * GRID * 4);
    for (let i = 0; i < GRID * GRID; i++) {
      data[i * 4] = 128;
      data[i * 4 + 1] = 128;
      data[i * 4 + 2] = 128;
      data[i * 4 + 3] = 255;
    }
    const flowTex = new THREE.DataTexture(data, GRID, GRID, THREE.RGBAFormat);
    flowTex.magFilter = flowTex.minFilter = THREE.LinearFilter;
    flowTex.needsUpdate = true;

    const uniforms = {
      uTex: { value: null as THREE.Texture | null },
      uFlow: { value: flowTex },
      uScale: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
    };
    const material = new THREE.ShaderMaterial({ vertexShader: vert, fragmentShader: frag, uniforms });
    material.visible = false;
    const geometry = new THREE.PlaneGeometry(2, 2);
    scene.add(new THREE.Mesh(geometry, material));

    let imgAspect = 1;
    let visible = true;
    let active = false;
    let disposed = false;

    const resize = () => {
      const w = el.clientWidth || 1;
      const h = el.clientHeight || 1;
      renderer.setSize(w, h, false);
      const fa = w / h;
      uniforms.uScale.value.set(fa > imgAspect ? 1 : fa / imgAspect, fa > imgAspect ? imgAspect / fa : 1);
    };

    const useTexture = (t: THREE.Texture, w: number, h: number) => {
      if (disposed) return;
      uniforms.uTex.value = t;
      imgAspect = w / h;
      material.visible = true;
      resize();
      gsap.to(canvas, { opacity: 1, duration: 1.2, ease: "power2.out" });
    };

    const fallback = () => {
      const c = document.createElement("canvas");
      c.width = 900;
      c.height = 1100;
      const g = c.getContext("2d")!;
      const grad = g.createLinearGradient(0, 0, c.width, c.height);
      grad.addColorStop(0, colors[0]);
      grad.addColorStop(1, colors[1]);
      g.fillStyle = grad;
      g.fillRect(0, 0, c.width, c.height);
      g.strokeStyle = "rgba(255,255,255,0.13)";
      g.lineWidth = 2;
      for (let x = 0; x <= c.width; x += 75) {
        g.beginPath();
        g.moveTo(x, 0);
        g.lineTo(x, c.height);
        g.stroke();
      }
      for (let y = 0; y <= c.height; y += 75) {
        g.beginPath();
        g.moveTo(0, y);
        g.lineTo(c.width, y);
        g.stroke();
      }
      useTexture(new THREE.CanvasTexture(c), c.width, c.height);
    };

    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    loader.load(
      src,
      (t) => {
        t.minFilter = THREE.LinearFilter;
        t.generateMipmaps = false;
        const im = t.image as HTMLImageElement;
        useTexture(t, im.width, im.height);
      },
      undefined,
      fallback
    );

    // pointer → flow
    let last: { u: number; v: number } | null = null;
    const splat = (u: number, v: number, dx: number, dy: number) => {
      const cx = u * (GRID - 1);
      const cy = v * (GRID - 1);
      const R = 7;
      const x0 = Math.max(0, Math.floor(cx - R * 2));
      const x1 = Math.min(GRID - 1, Math.ceil(cx + R * 2));
      const y0 = Math.max(0, Math.floor(cy - R * 2));
      const y1 = Math.min(GRID - 1, Math.ceil(cy + R * 2));
      for (let j = y0; j <= y1; j++) {
        for (let i = x0; i <= x1; i++) {
          const d2 = (i - cx) * (i - cx) + (j - cy) * (j - cy);
          const w = Math.exp(-d2 / (R * R * 0.6));
          const k = j * GRID + i;
          vx[k] = Math.max(-1, Math.min(1, vx[k] + dx * w));
          vy[k] = Math.max(-1, Math.min(1, vy[k] + dy * w));
        }
      }
      active = true;
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const u = (e.clientX - r.left) / r.width;
      const v = 1 - (e.clientY - r.top) / r.height;
      if (u < -0.05 || u > 1.05 || v < -0.05 || v > 1.05) {
        last = null;
        return;
      }
      if (last) splat(u, v, (u - last.u) * 11, (v - last.v) * 11);
      last = { u, v };
    };
    window.addEventListener("pointermove", onMove);

    const tick = (time: number) => {
      if (!visible || !material.visible) return;
      uniforms.uTime.value = time;
      if (active) {
        let max = 0;
        for (let k = 0; k < GRID * GRID; k++) {
          vx[k] *= 0.955;
          vy[k] *= 0.955;
          const a = Math.max(Math.abs(vx[k]), Math.abs(vy[k]));
          if (a < 0.002) {
            vx[k] = 0;
            vy[k] = 0;
          }
          if (a > max) max = a;
          data[k * 4] = Math.round((vx[k] * 0.5 + 0.5) * 255);
          data[k * 4 + 1] = Math.round((vy[k] * 0.5 + 0.5) * 255);
        }
        flowTex.needsUpdate = true;
        if (max < 0.002) active = false;
      }
      renderer.render(scene, camera);
    };
    gsap.ticker.add(tick);

    const ro = new ResizeObserver(resize);
    ro.observe(el);
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting));
    io.observe(el);
    resize();

    return () => {
      disposed = true;
      gsap.ticker.remove(tick);
      window.removeEventListener("pointermove", onMove);
      ro.disconnect();
      io.disconnect();
      uniforms.uTex.value?.dispose();
      flowTex.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
    };
  }, [src, colors]);

  return <div ref={host} className={className} />;
}
