"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { sceneState, type PoseName } from "@/lib/store";
import { look } from "@/data/character";

const ACCENT = "#d4ff3a";
const { clamp, damp, lerp } = THREE.MathUtils;

/* ------------------------------------------------------------------ */
/* Pose maths                                                          */
/* ------------------------------------------------------------------ */

const KEYS = [
  "bodyY", "yaw", "lean", "headX", "headY",
  "lsX", "lsZ", "leX", "leZ",
  "rsX", "rsZ", "reX", "reZ",
  "lhX", "rhX", "lkX", "rkX",
] as const;
type Joints = Record<(typeof KEYS)[number], number>;

const zero = (): Joints => Object.fromEntries(KEYS.map((k) => [k, 0])) as Joints;

/** Relaxed standing arms; each pose overrides what it needs. */
const base = (): Joints => ({ ...zero(), lsZ: 0.12, rsZ: -0.12, leX: -0.12, reX: -0.12 });

type Ctx = {
  t: number;
  px: number;
  py: number;
  wave: number;
  phase: number;
  k: number;
  dir: number;
};

/*
 * Conventions (character faces +z, his left arm is on +x):
 *  - shoulder/hip X < 0 swings forward; elbow X < 0 bends the forearm forward
 *  - shoulder Z > 0 raises the left arm outwards (right arm uses negative)
 *  - head X > 0 looks down, head Y > 0 turns towards +x
 */
function evalPose(name: PoseName, c: Ctx): Joints {
  const j = base();
  const { t, px, py } = c;
  const breathe = Math.sin(t * 1.6) * 0.012;

  switch (name) {
    case "hero": {
      // Standing, head + eyes follow the mouse, one wave after the loader.
      j.bodyY = breathe;
      j.yaw = -0.3 + px * 0.3;
      j.headY = px * 0.75;
      j.headX = -py * 0.45;
      j.lsX = Math.sin(t * 1.3) * 0.05;
      j.rsX = -Math.sin(t * 1.3) * 0.05;
      j.rsZ = lerp(-0.12, -2.5, c.wave);
      j.reZ = -Math.sin(t * 9) * 0.5 * c.wave;
      j.reX = lerp(-0.12, -0.05, c.wave);
      break;
    }
    case "about": {
      // Seated at a laptop, typing.
      j.bodyY = -0.5;
      j.yaw = 0.8;
      j.lean = 0.22;
      j.headX = 0.3 + Math.sin(t * 0.8) * 0.03;
      j.headY = px * 0.12;
      j.lsX = -0.8;
      j.rsX = -0.8;
      j.lsZ = 0.1;
      j.rsZ = -0.1;
      j.leX = -0.95 + Math.sin(t * 13) * 0.14;
      j.reX = -0.95 + Math.sin(t * 13 + 2.4) * 0.14;
      j.lhX = -1.5;
      j.rhX = -1.5;
      j.lkX = 1.5;
      j.rkX = 1.5;
      break;
    }
    case "work": {
      // Walks along the progress bar; speed follows scroll velocity.
      const s = Math.sin(c.phase);
      const co = Math.cos(c.phase);
      const k = c.k;
      j.bodyY = Math.abs(s) * 0.06 * k;
      j.yaw = 1.2 * c.dir;
      j.lean = 0.08 + 0.1 * k;
      j.headY = -0.55 * c.dir;
      j.lhX = s * 0.75 * k;
      j.rhX = -s * 0.75 * k;
      j.lkX = Math.max(0, -co) * 0.9 * k + 0.05;
      j.rkX = Math.max(0, co) * 0.9 * k + 0.05;
      j.lsX = -s * 0.6 * k;
      j.rsX = s * 0.6 * k;
      j.leX = -0.5 - 0.3 * k;
      j.reX = -0.5 - 0.3 * k;
      break;
    }
    case "stack": {
      // Arms up, conjuring the orbiting tech cubes.
      j.bodyY = Math.sin(t * 2) * 0.03;
      j.yaw = -0.15 + px * 0.25;
      j.headX = -0.3 - py * 0.2;
      j.headY = px * 0.3;
      j.lsX = -0.2;
      j.rsX = -0.2;
      j.lsZ = 1.55 + Math.sin(t * 2.2) * 0.08;
      j.rsZ = -(1.55 + Math.sin(t * 2.2 + 1) * 0.08);
      j.leZ = 1.0;
      j.reZ = -1.0;
      j.leX = -0.3;
      j.reX = -0.3;
      break;
    }
    case "contact": {
      // Friendly wave, other hand on hip.
      j.bodyY = breathe;
      j.yaw = -0.35 + px * 0.25;
      j.headY = px * 0.5 - 0.1;
      j.headX = -py * 0.3;
      j.rsZ = -2.4;
      j.reZ = -0.25 - Math.sin(t * 8) * 0.5;
      j.reX = 0;
      j.lsZ = 0.55;
      j.lsX = 0.1;
      j.leX = -0.3;
      j.leZ = -1.0;
      break;
    }
  }
  return j;
}

const POSES: PoseName[] = ["hero", "about", "work", "stack", "contact"];

/* ------------------------------------------------------------------ */
/* Character                                                           */
/* ------------------------------------------------------------------ */

type Mat = { c: string; r?: number; m?: number };
const M = ({ c, r = 0.75, m = 0.05 }: Mat) => (
  <meshStandardMaterial color={c} roughness={r} metalness={m} />
);

const CODE_LINES: { x: number; w: number; c: string }[] = [
  { x: 0, w: 0.28, c: ACCENT },
  { x: 0.08, w: 0.4, c: "#9aa6ff" },
  { x: 0.08, w: 0.22, c: "#ffffff" },
  { x: 0.16, w: 0.34, c: ACCENT },
  { x: 0.16, w: 0.46, c: "#9aa6ff" },
  { x: 0.08, w: 0.18, c: "#ffffff" },
  { x: 0, w: 0.3, c: ACCENT },
];

const CUBE_COLORS = [ACCENT, "#4f6bff", "#f2f0ea", ACCENT, "#4f6bff", "#f2f0ea"];

/** Registry of rig nodes (there is only ever one character on the page). */
const R: { current: Record<string, THREE.Object3D | null> } = { current: {} };
const reg = (k: string) => (o: THREE.Object3D | null) => {
  R.current[k] = o;
};

function Character() {
  const viewport = useThree((s) => s.viewport);
  const noseColor = useMemo(() => new THREE.Color(look.skin).multiplyScalar(0.88), []);

  const S = useRef({
    intro: 0,
    readyAt: -1,
    phase: 0,
    dir: 1,
    w: { hero: 1, about: 0, work: 0, stack: 0, contact: 0 } as Record<PoseName, number>,
    laptop: 0,
    cubes: 0,
  });

  useFrame((state, dtRaw) => {
    const dt = Math.min(dtRaw, 0.05);
    const t = state.clock.elapsedTime;
    const s = S.current;
    const tg = sceneState.target;
    const root = R.current.root;
    if (!root) return;

    /* ---- placement ---- */
    s.intro = damp(s.intro, sceneState.ready ? 1 : 0, 2.2, dt);
    const isWork = tg.pose === "work";
    const wide = viewport.width > 4.2;
    const fit = isWork ? 1 : clamp(viewport.width / 7.5, 0.5, 1.1);
    const ts = tg.s * fit * s.intro;
    const tx = isWork
      ? (-0.88 + 1.76 * sceneState.hProgress) * (viewport.width / 2)
      : wide
        ? tg.x * (viewport.width / 2)
        : 0;
    const ty = isWork
      ? -viewport.height / 2 + viewport.height * 0.05 + 1.25 * tg.s * fit
      : wide
        ? tg.y
        : tg.y + viewport.height * 0.18;

    root.position.x = damp(root.position.x, tx, isWork ? 6 : 3, dt);
    root.position.y = damp(root.position.y, ty, 3, dt);
    root.scale.setScalar(damp(root.scale.x, ts, 3, dt));

    /* ---- pose blending ---- */
    if (sceneState.ready && s.readyAt < 0) s.readyAt = t;
    const since = s.readyAt < 0 ? -1 : t - s.readyAt;
    const wave =
      since < 0
        ? 0
        : clamp((since - 0.8) / 0.5, 0, 1) * (1 - clamp((since - 4) / 0.6, 0, 1));

    const v = sceneState.velocity;
    const k = clamp(Math.abs(v) / 6, 0.12, 1);
    if (Math.abs(v) > 2) s.dir = damp(s.dir, Math.sign(v), 5, dt);
    s.phase += dt * (3 + 7 * k);

    const ctx: Ctx = {
      t,
      px: sceneState.pointer.x,
      py: sceneState.pointer.y,
      wave,
      phase: s.phase,
      k,
      dir: s.dir,
    };

    const J = zero();
    let sum = 0;
    for (const p of POSES) {
      s.w[p] = damp(s.w[p], p === tg.pose ? 1 : 0, 4, dt);
      const w = s.w[p];
      if (w < 0.001) continue;
      const j = evalPose(p, ctx);
      for (const key of KEYS) J[key] += j[key] * w;
      sum += w;
    }
    if (sum > 0) for (const key of KEYS) J[key] /= sum;

    /* ---- apply to the rig ---- */
    const o = R.current;
    o.body?.position.set(0, J.bodyY, 0);
    if (o.body) o.body.rotation.y = J.yaw;
    if (o.torso) o.torso.rotation.x = J.lean;
    o.head?.rotation.set(J.headX, J.headY, 0);
    o.lSh?.rotation.set(J.lsX, 0, J.lsZ);
    o.rSh?.rotation.set(J.rsX, 0, J.rsZ);
    o.lEl?.rotation.set(J.leX, 0, J.leZ);
    o.rEl?.rotation.set(J.reX, 0, J.reZ);
    if (o.lHip) o.lHip.rotation.x = J.lhX;
    if (o.rHip) o.rHip.rotation.x = J.rhX;
    if (o.lKnee) o.lKnee.rotation.x = J.lkX;
    if (o.rKnee) o.rKnee.rotation.x = J.rkX;

    // Pupils follow the pointer.
    const ex = clamp(ctx.px, -1, 1) * 0.014;
    const ey = clamp(ctx.py, -1, 1) * 0.012;
    o.pupL?.position.set(0.1 + ex, 0.33 + ey, 0.292);
    o.pupR?.position.set(-0.1 + ex, 0.33 + ey, 0.292);

    /* ---- props ---- */
    s.laptop = damp(s.laptop, tg.pose === "about" ? 1 : 0, 5, dt);
    s.cubes = damp(s.cubes, tg.pose === "stack" ? 1 : 0, 4, dt);

    if (o.laptop) {
      o.laptop.visible = s.laptop > 0.01;
      o.laptop.scale.setScalar(Math.max(s.laptop, 0.0001));
    }
    const glow = o.glow as THREE.PointLight | null | undefined;
    if (glow) glow.intensity = s.laptop * 2.5;

    o.lines?.children.forEach((line, i) => {
      line.scale.x = 0.55 + 0.45 * Math.abs(Math.sin(t * 1.8 + i * 1.7));
    });

    if (o.cubes) {
      o.cubes.visible = s.cubes > 0.01;
      o.cubes.scale.setScalar(Math.max(s.cubes, 0.0001));
      o.cubes.children.forEach((cube, i) => {
        const a = t * 0.9 + (i * Math.PI * 2) / CUBE_COLORS.length;
        cube.position.set(
          Math.cos(a) * 1.5,
          2.55 + Math.sin(t * 1.6 + i) * 0.18,
          Math.sin(a) * 1.0
        );
        cube.rotation.set(t * 0.8 + i, t * 1.1 + i, 0);
      });
    }
  });

  return (
    <group ref={reg("root")} scale={0}>
      {/* origin = centre of the character, so shift the rig down by half its height */}
      <group position={[0, -1.25, 0]}>
        {/* floor ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <ringGeometry args={[0.85, 0.88, 64]} />
          <meshBasicMaterial color={ACCENT} transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
          <circleGeometry args={[0.85, 48]} />
          <meshBasicMaterial color={ACCENT} transparent opacity={0.07} side={THREE.DoubleSide} />
        </mesh>

        <group ref={reg("body")}>
          {/* hips */}
          <group position={[0, 1.05, 0]}>
            {/* legs */}
            {(
              [
                { side: 1, hip: "lHip", knee: "lKnee" },
                { side: -1, hip: "rHip", knee: "rKnee" },
              ] as const
            ).map(({ side, hip, knee }) => (
              <group key={hip} ref={reg(hip)} position={[0.15 * side, 0, 0]}>
                <mesh position={[0, -0.25, 0]}>
                  <capsuleGeometry args={[0.13, 0.24, 6, 12]} />
                  <M c={look.pants} />
                </mesh>
                <group ref={reg(knee)} position={[0, -0.5, 0]}>
                  <mesh position={[0, -0.25, 0]}>
                    <capsuleGeometry args={[0.11, 0.28, 6, 12]} />
                    <M c={look.pants} />
                  </mesh>
                  <RoundedBox args={[0.2, 0.1, 0.36]} radius={0.04} position={[0, -0.53, 0.07]}>
                    <M c={look.shoes} r={0.5} />
                  </RoundedBox>
                </group>
              </group>
            ))}

            {/* torso */}
            <group ref={reg("torso")}>
              <mesh position={[0, 0.45, 0]} scale={[1, 1, 0.78]}>
                <capsuleGeometry args={[0.27, 0.36, 8, 16]} />
                <M c={look.hoodie} r={0.85} />
              </mesh>
              {/* hoodie strings */}
              {[-0.06, 0.06].map((x) => (
                <mesh key={x} position={[x, 0.68, 0.21]}>
                  <boxGeometry args={[0.018, 0.2, 0.018]} />
                  <M c={look.trim} r={0.5} />
                </mesh>
              ))}

              {/* arms */}
              {(
                [
                  { side: 1, sh: "lSh", el: "lEl" },
                  { side: -1, sh: "rSh", el: "rEl" },
                ] as const
              ).map(({ side, sh, el }) => (
                <group key={sh} ref={reg(sh)} position={[0.37 * side, 0.8, 0]}>
                  <mesh>
                    <sphereGeometry args={[0.12, 16, 12]} />
                    <M c={look.hoodie} r={0.85} />
                  </mesh>
                  <mesh position={[0, -0.21, 0]}>
                    <capsuleGeometry args={[0.095, 0.23, 6, 12]} />
                    <M c={look.hoodie} r={0.85} />
                  </mesh>
                  <group ref={reg(el)} position={[0, -0.42, 0]}>
                    <mesh position={[0, -0.2, 0]}>
                      <capsuleGeometry args={[0.085, 0.23, 6, 12]} />
                      <M c={look.hoodie} r={0.85} />
                    </mesh>
                    <mesh position={[0, -0.43, 0]}>
                      <sphereGeometry args={[0.09, 16, 12]} />
                      <M c={look.skin} />
                    </mesh>
                  </group>
                </group>
              ))}

              {/* head */}
              <group ref={reg("head")} position={[0, 0.97, 0]}>
                <mesh position={[0, 0.06, 0]}>
                  <cylinderGeometry args={[0.09, 0.1, 0.14, 16]} />
                  <M c={look.skin} />
                </mesh>
                <mesh position={[0, 0.3, 0]} scale={[1, 1.08, 1]}>
                  <sphereGeometry args={[0.28, 32, 24]} />
                  <M c={look.skin} r={0.65} />
                </mesh>
                {/* ears */}
                {[-1, 1].map((sd) => (
                  <mesh key={sd} position={[0.28 * sd, 0.3, 0]}>
                    <sphereGeometry args={[0.045, 12, 10]} />
                    <M c={look.skin} />
                  </mesh>
                ))}
                {/* hair */}
                <mesh position={[0, 0.315, 0]} rotation={[-0.5, 0, 0]}>
                  <sphereGeometry args={[0.296, 32, 20, 0, Math.PI * 2, 0, Math.PI * 0.52]} />
                  <M c={look.hair} r={0.9} />
                </mesh>
                {/* eyes */}
                {[-1, 1].map((sd) => (
                  <mesh key={sd} position={[0.1 * sd, 0.33, 0.243]} scale={[1, 1, 0.5]}>
                    <sphereGeometry args={[0.052, 16, 12]} />
                    <meshStandardMaterial color="#f4f1ea" roughness={0.4} />
                  </mesh>
                ))}
                <mesh ref={reg("pupL")} position={[0.1, 0.33, 0.292]}>
                  <sphereGeometry args={[0.028, 12, 10]} />
                  <meshStandardMaterial color="#0b0b0f" roughness={0.3} />
                </mesh>
                <mesh ref={reg("pupR")} position={[-0.1, 0.33, 0.292]}>
                  <sphereGeometry args={[0.028, 12, 10]} />
                  <meshStandardMaterial color="#0b0b0f" roughness={0.3} />
                </mesh>
                {/* brows */}
                {[-1, 1].map((sd) => (
                  <mesh key={sd} position={[0.1 * sd, 0.405, 0.252]} rotation={[0, 0, -0.1 * sd]}>
                    <boxGeometry args={[0.09, 0.018, 0.02]} />
                    <M c={look.hair} />
                  </mesh>
                ))}
                {/* nose */}
                <mesh position={[0, 0.28, 0.272]}>
                  <sphereGeometry args={[0.036, 12, 10]} />
                  <meshStandardMaterial color={noseColor} roughness={0.7} />
                </mesh>
                {/* smile */}
                <mesh position={[0, 0.2, look.beard ? 0.275 : 0.258]} rotation={[0, 0, Math.PI]}>
                  <torusGeometry args={[0.06, 0.011, 8, 20, Math.PI]} />
                  <meshStandardMaterial color={look.beard ? "#f4f1ea" : "#5a2a22"} roughness={0.6} />
                </mesh>
                {look.beard && (
                  <mesh position={[0, 0.3, 0]} scale={[1, 1.08, 1]}>
                    <sphereGeometry args={[0.287, 32, 16, 0, Math.PI * 2, Math.PI * 0.6, Math.PI * 0.4]} />
                    <M c={look.hair} r={0.95} />
                  </mesh>
                )}
                {look.glasses && (
                  <group position={[0, 0.33, 0.275]}>
                    {[-1, 1].map((sd) => (
                      <mesh key={sd} position={[0.1 * sd, 0, 0]}>
                        <torusGeometry args={[0.075, 0.01, 8, 28]} />
                        <M c="#0b0b0f" r={0.3} m={0.4} />
                      </mesh>
                    ))}
                    <mesh>
                      <boxGeometry args={[0.05, 0.01, 0.01]} />
                      <M c="#0b0b0f" />
                    </mesh>
                  </group>
                )}
              </group>
            </group>
          </group>

          {/* ---- laptop + desk (about) ---- */}
          <group ref={reg("laptop")} visible={false} scale={0.0001}>
            {/* stool */}
            <mesh position={[0, 0.45, -0.02]}>
              <cylinderGeometry args={[0.3, 0.3, 0.07, 24]} />
              <M c="#2a2a38" />
            </mesh>
            <mesh position={[0, 0.22, -0.02]}>
              <cylinderGeometry args={[0.05, 0.05, 0.45, 12]} />
              <M c="#14141b" />
            </mesh>
            <mesh position={[0, 0.02, -0.02]}>
              <cylinderGeometry args={[0.28, 0.3, 0.04, 24]} />
              <M c="#14141b" />
            </mesh>
            {/* desk */}
            <RoundedBox args={[1.5, 0.06, 0.9]} radius={0.02} position={[0, 0.98, 0.7]}>
              <M c="#23232f" r={0.6} />
            </RoundedBox>
            {[-0.68, 0.68].flatMap((x) =>
              [0.35, 1.05].map((z) => (
                <mesh key={`${x}${z}`} position={[x, 0.49, z]}>
                  <boxGeometry args={[0.06, 0.98, 0.06]} />
                  <M c="#14141b" />
                </mesh>
              ))
            )}
            {/* laptop */}
            <RoundedBox args={[0.8, 0.04, 0.55]} radius={0.015} position={[0, 1.03, 0.72]}>
              <M c="#9a9aa6" r={0.35} m={0.6} />
            </RoundedBox>
            <group position={[0, 1.05, 0.99]} rotation={[0.25, 0, 0]}>
              <RoundedBox args={[0.8, 0.52, 0.03]} radius={0.015} position={[0, 0.27, 0]}>
                <M c="#0b0b10" r={0.4} m={0.5} />
              </RoundedBox>
              <mesh position={[0, 0.27, -0.0175]} rotation={[0, Math.PI, 0]}>
                <planeGeometry args={[0.72, 0.44]} />
                <meshBasicMaterial color="#0a120d" />
              </mesh>
              <group ref={reg("lines")} position={[-0.32, 0.43, -0.022]}>
                {CODE_LINES.map((l, i) => (
                  <group key={i} position={[l.x, -i * 0.055, 0]}>
                    <mesh position={[l.w / 2, 0, 0]} scale={[1, 1, 1]}>
                      <boxGeometry args={[l.w, 0.022, 0.004]} />
                      <meshBasicMaterial color={l.c} />
                    </mesh>
                  </group>
                ))}
              </group>
            </group>
            <pointLight ref={reg("glow")} position={[0, 1.4, 0.5]} color={ACCENT} distance={3} intensity={0} />
          </group>

          {/* ---- orbiting tech cubes (stack) ---- */}
          <group ref={reg("cubes")} visible={false} scale={0.0001}>
            {CUBE_COLORS.map((c, i) => (
              <RoundedBox key={i} args={[0.24, 0.24, 0.24]} radius={0.04}>
                <meshStandardMaterial color={c} roughness={0.35} metalness={0.2} emissive={c} emissiveIntensity={0.25} />
              </RoundedBox>
            ))}
          </group>
        </group>
      </group>
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
        <ambientLight intensity={0.9} />
        <hemisphereLight args={["#8fa0ff", "#1a1a22", 1.0]} />
        <pointLight position={[4, 3, 4]} intensity={110} color={ACCENT} />
        <pointLight position={[-5, -2, 3]} intensity={90} color="#4f6bff" />
        <directionalLight position={[1, 4, 4]} intensity={2.4} color="#ffffff" />
        <Character />
        <PointerSync />
      </Canvas>
    </div>
  );
}
