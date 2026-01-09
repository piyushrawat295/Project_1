"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

type MarkerProps = {
  position: THREE.Vector3;
  isActive: boolean;
  name?: string;
};

export default function Marker({ position, isActive, name }: MarkerProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { camera } = useThree();

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    // Always face camera
    meshRef.current.lookAt(camera.position);

    const baseScale = isActive ? 1.6 : 1;
    const pulse = isActive ? Math.sin(clock.elapsedTime * 4) * 0.2 : 0;
    const scale = baseScale + pulse;

    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <group position={position}>
      {/* Pin */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial
          color={isActive ? "#ef4444" : "#f97373"}
          emissive={isActive ? "#ef4444" : "#b91c1c"}
          emissiveIntensity={isActive ? 1.2 : 0.4}
        />
      </mesh>

      {/* DEBUG LABEL */}
      {isActive && name && (
        <Html
          position={[0, 0.25, 0]}
          center
          distanceFactor={7}
          style={{ pointerEvents: "none" }}
        >
          <div className="rounded-md bg-white px-2 py-0.5 text-xs font-medium shadow-md border border-red-500 whitespace-nowrap">
            📍 {name}
          </div>
        </Html>
      )}
    </group>
  );
}
