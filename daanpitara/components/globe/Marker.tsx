"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

type MarkerProps = {
  position: THREE.Vector3;
  isActive: boolean;
  label: {
    name: string;
    city?: string;
    pincode?: string;
  } | null;
};

export default function Marker({ position, isActive, label }: MarkerProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { camera } = useThree();

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    // 🎯 Billboard: always face camera
    meshRef.current.lookAt(camera.position);

    // 🔥 Animate only active pin
    const baseScale = isActive ? 1.8 : 1; // ✅ UPDATED: Slightly larger (was 1.6)
    const pulse =
      isActive ? Math.sin(clock.elapsedTime * 4) * 0.25 : 0; // ✅ UPDATED: More pulse

    const scale = baseScale + pulse;
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <group position={position}>
      {/* 📍 Pin - ✅ UPDATED: Larger and more visible */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.055, 16, 16]} /> {/* Was 0.045, now 0.055 */}
        <meshStandardMaterial
          color={isActive ? "#22c55e" : "#60a5fa"}
          emissive={isActive ? "#22c55e" : "#3b82f6"}
          emissiveIntensity={isActive ? 1.5 : 0.3} // ✅ UPDATED: Brighter glow
        />
      </mesh>

      {/* 🏷️ Label - ✅ UPDATED: Enhanced styling */}
      {isActive && label && (
        <Html
          distanceFactor={8}
          position={[0, 0.2, 0]} // ✅ UPDATED: Higher position (was 0.15)
          center
          style={{ pointerEvents: "none" }}
        >
          <div className="rounded-lg bg-white px-4 py-2 shadow-lg text-sm text-gray-800 whitespace-nowrap border-2 border-green-500">
            <div className="font-bold text-base">{label.name}</div>
            {label.city && label.pincode && (
              <div className="text-xs text-gray-600 mt-1">
                📍 {label.city} • PIN: {label.pincode}
              </div>
            )}
          </div>
        </Html>
      )}

      {/* ✅ ADDED: Pulsing ring around active marker */}
      {isActive && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
          <ringGeometry args={[0.08, 0.12, 32]} />
          <meshBasicMaterial
            color="#22c55e"
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}