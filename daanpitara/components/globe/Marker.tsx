"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

type MarkerProps = {
  position: THREE.Vector3;
  isActive: boolean;
  name?: string;
  onClick?: () => void;
};

export default function Marker({ position, isActive, name, onClick }: MarkerProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const { camera } = useThree();

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    // Always face camera
    groupRef.current.lookAt(camera.position);

    const baseScale = isActive ? 1.8 : 1.2;
    const pulse = isActive ? Math.sin(clock.elapsedTime * 8) * 0.1 : 0;
    const scale = baseScale + pulse;

    groupRef.current.scale.set(scale, scale, scale);
  });

  return (
    <group position={position}>
      <group 
        ref={groupRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'auto'}
      >
        {/* Pin Head (Sphere) */}
        <mesh position={[0, 0.08, 0]}>
          <sphereGeometry args={[0.04, 32, 32]} />
          <meshStandardMaterial
            color={isActive ? "#ef4444" : "#f87171"}
            emissive={isActive ? "#991b1b" : "#7f1d1d"}
            emissiveIntensity={isActive ? 0.8 : 0.2}
            roughness={0.3}
            metalness={0.2}
          />
        </mesh>

        {/* Pin Body (Cone) */}
        <mesh position={[0, 0.04, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.025, 0.09, 32]} />
          <meshStandardMaterial
             color={isActive ? "#ef4444" : "#f87171"}
             roughness={0.3}
             metalness={0.2}
          />
        </mesh>
      </group>

      {/* DEBUG LABEL */}
      {isActive && name && (
        <Html
          position={[0, 0.35, 0]}
          center
          distanceFactor={8}
          style={{ pointerEvents: "none" }}
        >
          <div className="rounded-md bg-white px-3 py-1 text-sm font-bold shadow-xl border-l-4 border-red-500 whitespace-nowrap text-gray-900 animate-in fade-in zoom-in duration-200">
            {name}
          </div>
        </Html>
      )}
    </group>
  );
}
