"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function AfricaGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Africa-themed colors (Gold and Deep Green)
  const color1 = "#FFD700"; // Gold
  const color2 = "#004B49"; // Deep Green

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]}>
        <MeshDistortMaterial
          color={color1}
          speed={3}
          distort={0.4}
          radius={1}
        />
      </Sphere>
      <Sphere args={[1.52, 64, 64]}>
        <meshStandardMaterial
          color={color2}
          wireframe
          transparent
          opacity={0.15}
        />
      </Sphere>
    </Float>
  );
}

export function Africa3D() {
  return (
    <div className="w-full h-[300px] md:h-[500px] pointer-events-none">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <AfricaGlobe />
      </Canvas>
    </div>
  );
}
