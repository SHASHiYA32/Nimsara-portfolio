"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { sceneState } from "@/lib/store";

const ACCENT = "#d4ff3a";

function Object3D() {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const mat = useRef<{ distort: number } | null>(null);
  const viewport = useThree((s) => s.viewport);
  const intro = useRef(0);

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    const t = sceneState.target;

    // Entrance: scale up once the loader curtain lifts.
    intro.current = THREE.MathUtils.damp(intro.current, sceneState.ready ? 1 : 0, 2.2, dt);

    const wide = viewport.width > 4.2;
    const fit = THREE.MathUtils.clamp(viewport.width / 7.5, 0.5, 1.1);
    const tx = wide ? t.x * (viewport.width / 2) : 0;
    const ty = wide ? t.y : t.y + viewport.height * 0.18;
    const ts = t.s * fit * intro.current;

    g.position.x = THREE.MathUtils.damp(g.position.x, tx, 3, dt);
    g.position.y = THREE.MathUtils.damp(g.position.y, ty, 3, dt);
    const s = THREE.MathUtils.damp(g.scale.x, ts, 3, dt);
    g.scale.setScalar(s);

    // Pointer tilt + scroll-driven spin.
    const v = THREE.MathUtils.clamp(sceneState.velocity, -60, 60);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, sceneState.pointer.y * 0.35, 3, dt);
    g.rotation.y += dt * 0.25 + v * dt * 0.05;
    g.rotation.z = THREE.MathUtils.damp(g.rotation.z, sceneState.hProgress * Math.PI * 2, 2, dt);

    if (core.current) core.current.rotation.x += dt * 0.15;
    if (shell.current) {
      shell.current.rotation.y -= dt * 0.18;
      shell.current.rotation.x += dt * 0.06;
    }
    if (ring.current) ring.current.rotation.z += dt * 0.4;

    if (mat.current) {
      mat.current.distort = THREE.MathUtils.damp(
        mat.current.distort,
        0.32 + Math.min(Math.abs(v) * 0.012, 0.35),
        4,
        dt
      );
    }
  });

  return (
    <group ref={group} scale={0}>
      <mesh ref={core}>
        <icosahedronGeometry args={[1.05, 24]} />
        <MeshDistortMaterial
          ref={mat as never}
          color="#2c2c3a"
          roughness={0.36}
          metalness={0.5}
          distort={0.32}
          speed={1.6}
        />
      </mesh>
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.55, 2]} />
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.22} />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[1.95, 0.008, 8, 160]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

function PointerSync() {
  useFrame((state) => {
    sceneState.pointer.x = state.pointer.x;
    sceneState.pointer.y = state.pointer.y;
  });
  return null;
}

export default function Scene() {
  return (
    <div className="scene" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 40 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        eventSource={typeof document !== "undefined" ? document.body : undefined}
        eventPrefix="client"
      >
        <ambientLight intensity={1.1} />
        <hemisphereLight args={["#8fa0ff", "#1a1a22", 1.2]} />
        <pointLight position={[4, 3, 4]} intensity={140} color={ACCENT} />
        <pointLight position={[-5, -2, 3]} intensity={110} color="#4f6bff" />
        <directionalLight position={[0, 4, 3]} intensity={2.2} color="#ffffff" />
        <Object3D />
        <PointerSync />
      </Canvas>
    </div>
  );
}
