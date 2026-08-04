"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, Glitch } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

// ─── Wireframe Octahedron — the main 3D hero object ───────────────────────
function HoloOctahedron() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.12;
    meshRef.current.rotation.y += delta * 0.18;
  });

  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1.6, 0]} />
        <MeshDistortMaterial
          color="#00F0FF"
          distort={0.35}
          speed={1.8}
          roughness={0}
          metalness={1}
          wireframe
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* Inner glow orb */}
      <mesh scale={0.45}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.06} />
      </mesh>
    </Float>
  );
}

// ─── Particle Field — 2000 points scattered around ──────────────────────
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const COUNT = 2000;

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    // Simple deterministic pseudo-random generator to avoid Math.random during render
    let seed = 42;
    const pseudoRandom = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 0] = (pseudoRandom() - 0.5) * 12;
      arr[i * 3 + 1] = (pseudoRandom() - 0.5) * 12;
      arr[i * 3 + 2] = (pseudoRandom() - 0.5) * 12;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = clock.getElapsedTime() * 0.025;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#00F0FF"
        sizeAttenuation
        transparent
        opacity={0.55}
      />
    </points>
  );
}

// ─── Grid Floor — subtle HUD grid below octahedron ──────────────────────
function GridFloor() {
  return (
    <gridHelper
      args={[30, 40, "#9D4EDD", "#9D4EDD"]}
      position={[0, -2.8, 0]}
      rotation={[0, 0, 0]}
    >
      <meshBasicMaterial
        attach="material"
        color="#9D4EDD"
        transparent
        opacity={0.12}
      />
    </gridHelper>
  );
}

// ─── Scene ────────────────────────────────────────────────────────────────
function Scene() {
  const { size } = useThree();
  const isMobile = size.width < 768;

  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[4, 4, 4]} intensity={2} color="#00F0FF" />
      <pointLight position={[-4, -2, -4]} intensity={1.5} color="#FF2E9F" />

      <HoloOctahedron />
      {!isMobile && <ParticleField />}
      <GridFloor />

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.15}
          luminanceSmoothing={0.9}
          mipmapBlur
          intensity={1.6}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new THREE.Vector2(0.0015, 0.0015)}
          radialModulation={false}
          modulationOffset={0}
        />
        <Glitch
          delay={new THREE.Vector2(3, 8)}
          duration={new THREE.Vector2(0.1, 0.25)}
          strength={new THREE.Vector2(0.01, 0.04)}
          active
          ratio={0.85}
        />
      </EffectComposer>
    </>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────
interface HeroCanvasProps {
  className?: string;
}

export default function HeroCanvas({ className = "" }: HeroCanvasProps) {
  return (
    <Canvas
      className={className}
      camera={{ position: [0, 0.5, 5], fov: 45 }}
      gl={{
        antialias: false,
        powerPreference: "high-performance",
        alpha: true,
      }}
      dpr={[0.75, 1.5]}
      aria-hidden="true"
    >
      <Scene />
      {/* OrbitControls disabled — only auto-rotation */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        enableRotate={false}
      />
    </Canvas>
  );
}
