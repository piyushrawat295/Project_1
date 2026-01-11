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

    // Reduced scale for smaller pins
    const baseScale = isActive ? 1.2 : 0.8;
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
        {/* Pin Head (Sphere) - Reduced size */}
        <mesh position={[0, 0.05, 0]}>
          <sphereGeometry args={[0.025, 32, 32]} />
          <meshStandardMaterial
            color={isActive ? "#ef4444" : "#f87171"}
            emissive={isActive ? "#991b1b" : "#7f1d1d"}
            emissiveIntensity={isActive ? 0.8 : 0.2}
            roughness={0.3}
            metalness={0.2}
          />
        </mesh>

        {/* Pin Body (Cone) - Reduced size */}
        <mesh position={[0, 0.025, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.015, 0.06, 32]} />
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
          distanceFactor={4}
          style={{ pointerEvents: "none" }}
          zIndexRange={[100, 0]}
        >
          <div className="rounded bg-white/90 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold shadow-lg border-l-2 border-red-500 whitespace-nowrap text-gray-900 animate-in fade-in zoom-in duration-200">
            {name}
          </div>
        </Html>
      )}
    </group>
  );
}
