"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const count = 1200;
  const { positions, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
      sz[i] = Math.random() * 0.8 + 0.2;
    }
    return { positions: pos, sizes: sz };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#10b981" sizeAttenuation transparent opacity={0.55} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

function FloatingShapes() {
  const torusRef = useRef<THREE.Mesh>(null);
  const icoRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.15;
      torusRef.current.rotation.y = t * 0.2;
      torusRef.current.position.y = Math.sin(t * 0.5) * 0.3;
    }
    if (icoRef.current) {
      icoRef.current.rotation.x = t * -0.12;
      icoRef.current.rotation.y = t * 0.18;
      icoRef.current.position.y = Math.cos(t * 0.45) * 0.25;
    }
  });
  return (
    <>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.8}>
        <mesh ref={torusRef} position={[3.2, 0.8, -2.5]} scale={0.9}>
          <torusKnotGeometry args={[0.9, 0.28, 128, 32]} />
          <meshStandardMaterial color="#10b981" emissive="#065f46" emissiveIntensity={0.4} roughness={0.25} metalness={0.7} wireframe transparent opacity={0.9} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
        <mesh ref={icoRef} position={[-3.4, -1.0, -3]} scale={1.1}>
          <icosahedronGeometry args={[0.85, 1]} />
          <meshStandardMaterial color="#3b82f6" emissive="#1e3a8a" emissiveIntensity={0.35} roughness={0.2} metalness={0.8} wireframe transparent opacity={0.75} />
        </mesh>
      </Float>
      {/* subtle ring */}
      <Float speed={0.8} floatIntensity={0.4}>
        <mesh position={[0, -2.2, -4]} rotation={[Math.PI / 2.2, 0, 0]} scale={1}>
          <ringGeometry args={[2.8, 3.0, 64]} />
          <meshBasicMaterial color="#10b981" transparent opacity={0.06} side={THREE.DoubleSide} />
        </mesh>
      </Float>
    </>
  );
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 -z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => gl.setClearColor("#0f172a", 0)}
      >
        <fog attach="fog" args={["#0f172a", 7, 14]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 6, 4]} intensity={1.2} />
        <pointLight position={[-4, -3, 4]} intensity={0.9} color="#10b981" />
        <pointLight position={[4, -2, 3]} intensity={0.7} color="#3b82f6" />
        <Stars radius={12} depth={40} count={1800} factor={2.2} saturation={0} fade speed={0.6} />
        <ParticleField />
        <FloatingShapes />
      </Canvas>
      {/* premium vignette + grain */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/0 via-slate-900/0 to-slate-900/75 pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
    </div>
  );
}
