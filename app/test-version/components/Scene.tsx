"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * The camera flies forward through a tunnel as you scroll.
 * Section i sits at depth z = -i * D. Each section has one object beside the
 * camera path, and a set of portal rings sits between sections so you fly
 * through them on every transition.
 * The number of [data-v3-section] elements must match OBJECTS.length.
 */
const D = 16;

type Obj = { kind: 0 | 1 | 2 | 3; x: number; y: number; s: number };
const OBJECTS: Obj[] = [
  { kind: 0, x: 2.5, y: 0.1, s: 1.3 }, // hero
  { kind: 1, x: -2.7, y: 0.2, s: 1.3 }, // about
  { kind: 2, x: 2.7, y: 0, s: 1.15 }, // services
  { kind: 3, x: -2.6, y: 0.6, s: 1.1 }, // work
  { kind: 0, x: 2.6, y: 0, s: 1.1 }, // experience
  { kind: 1, x: -2.6, y: 0, s: 1.2 }, // resume
  { kind: 2, x: 0, y: 0, s: 2.1 }, // contact
];

const DARK_SOLID = new THREE.Color("#c9d4ff");
const LIGHT_SOLID = new THREE.Color("#15151a");
const DARK_WIRE = new THREE.Color("#7da2ff");
const LIGHT_WIRE = new THREE.Color("#2d4bff");
const DARK_LINE = new THREE.Color("#8fa8ff");
const LIGHT_LINE = new THREE.Color("#15151a");
const DARK_DOT = new THREE.Color("#ffffff");
const LIGHT_DOT = new THREE.Color("#15151a");

export default function Scene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    gsap.registerPlugin(ScrollTrigger);
    const themeRoot = canvas.closest<HTMLElement>("[data-theme]");

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 200);
    camera.position.z = 8;

    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(3, 4, 5);
    const rim = new THREE.DirectionalLight(0x6f8cff, 1.6);
    rim.position.set(-4, -2, -3);
    scene.add(key, rim);

    const solid = new THREE.MeshStandardMaterial({ metalness: 0.65, roughness: 0.28, color: DARK_SOLID });
    const wire = new THREE.MeshBasicMaterial({ wireframe: true, transparent: true, opacity: 0.28, color: DARK_WIRE });
    const lineMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.75, color: DARK_LINE });

    const geos = [
      new THREE.TorusKnotGeometry(1, 0.34, 220, 32),
      new THREE.IcosahedronGeometry(1.35, 1),
      new THREE.TorusGeometry(1.1, 0.45, 24, 72),
      new THREE.OctahedronGeometry(1.4, 0),
    ];

    const objects: THREE.Group[] = OBJECTS.map((o, i) => {
      const g = new THREE.Group();
      g.add(new THREE.Mesh(geos[o.kind], solid));
      const w = new THREE.Mesh(geos[o.kind], wire);
      w.scale.setScalar(1.015);
      g.add(w);
      g.scale.setScalar(o.s);
      g.position.set(o.x, o.y, -i * D);
      g.rotation.set(Math.random() * 2, Math.random() * 2, 0);
      scene.add(g);
      return g;
    });

    // Portal rings between sections
    const ringGeos: THREE.TorusGeometry[] = [];
    for (let i = 1; i < OBJECTS.length; i++) {
      const zc = -(i - 0.5) * D;
      for (let k = 0; k < 5; k++) {
        const r = 2.3 + k * 0.45;
        const g = new THREE.TorusGeometry(r, 0.022, 8, 120);
        ringGeos.push(g);
        const ring = new THREE.Mesh(g, lineMat);
        ring.position.z = zc - k * 1.4;
        scene.add(ring);
      }
    }

    // Particles through the whole depth range
    const count = 1600;
    const pos = new Float32Array(count * 3);
    const depth = D * OBJECTS.length + 20;
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 26;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = 10 - Math.random() * depth;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const pMat = new THREE.PointsMaterial({ size: 0.03, transparent: true, opacity: 0.6, color: DARK_DOT });
    scene.add(new THREE.Points(pGeo, pMat));

    const cam = { z: 8 };
    const mouse = { x: 0, y: 0 };
    let mx = 0;
    let my = 0;
    let boost = 0;
    let lightV = 0;
    const clock = new THREE.Clock();

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const onMove = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);

    const tick = () => {
      const t = clock.getElapsedTime();
      mx += (mouse.x - mx) * 0.05;
      my += (mouse.y - my) * 0.05;
      boost *= 0.93;

      const narrow = camera.aspect < 0.9;
      camera.position.set(mx * 0.7, -my * 0.45, cam.z);
      camera.lookAt(mx * 0.2, -my * 0.12, cam.z - 10);

      objects.forEach((g, i) => {
        const o = OBJECTS[i];
        g.position.x = narrow ? o.x * 0.25 : o.x;
        g.position.y = narrow ? o.y + 1.5 : o.y;
        g.scale.setScalar(o.s * (narrow ? 0.65 : 1));
        g.rotation.y += 0.004 + boost;
        g.rotation.x += 0.0015 + boost * 0.4;
        g.position.y += Math.sin(t * 0.6 + i) * 0.06;
      });

      // Smooth switch between dark and light palettes
      const target = themeRoot?.getAttribute("data-theme") === "light" ? 1 : 0;
      lightV += (target - lightV) * 0.06;
      solid.color.lerpColors(DARK_SOLID, LIGHT_SOLID, lightV);
      wire.color.lerpColors(DARK_WIRE, LIGHT_WIRE, lightV);
      lineMat.color.lerpColors(DARK_LINE, LIGHT_LINE, lightV);
      pMat.color.lerpColors(DARK_DOT, LIGHT_DOT, lightV);
      pMat.opacity = 0.6 - lightV * 0.3;

      renderer.render(scene, camera);
    };
    gsap.ticker.add(tick);

    // Create scroll triggers after the page has built its own pins,
    // so trigger positions include pin spacing.
    let ctx: gsap.Context | undefined;
    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        const sections = gsap.utils.toArray<HTMLElement>("[data-v3-section]");
        sections.forEach((el, i) => {
          if (i === 0 || i >= OBJECTS.length) return;
          gsap.to(cam, {
            z: 8 - i * D,
            ease: "none",
            immediateRender: false,
            scrollTrigger: { trigger: el, start: "top bottom", end: "top 15%", scrub: 1 },
          });
        });
        ScrollTrigger.create({
          onUpdate: (self) => {
            boost = Math.min(Math.abs(self.getVelocity()) / 60000, 0.08);
          },
        });
      });
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(raf);
      ctx?.revert();
      gsap.ticker.remove(tick);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      geos.forEach((g) => g.dispose());
      ringGeos.forEach((g) => g.dispose());
      pGeo.dispose();
      solid.dispose();
      wire.dispose();
      lineMat.dispose();
      pMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}
    />
  );
}
