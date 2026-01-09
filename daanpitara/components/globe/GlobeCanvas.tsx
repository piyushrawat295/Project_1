"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import type { PerspectiveCamera } from "three";
import { useTexture } from "@react-three/drei";
import Pins from "./Pins";
import { latLngToRotation, smoothRotateTo } from "./utils";
import { useGlobe } from "@/context/GlobeContext";
import type { NGOLocation } from "@/context/GlobeContext";

/* ===================== GLOBE ===================== */

function Globe({ target }: { target: NGOLocation | null }) {
  const globeRef = useRef<THREE.Group>(null!);
  const earthTexture = useTexture("/textures/earth.jpg");

  const { camera } = useThree();
  const cam = camera as PerspectiveCamera;

  const { viewMode } = useGlobe();

  // ✅ ADDED: Debug logging
  useEffect(() => {
    if (target) {
      console.log("🎯 Target Location:", {
        name: target.name,
        lat: target.lat,
        lng: target.lng,
        rotation: latLngToRotation(target.lat, target.lng)
      });
    }
  }, [target]);

  useFrame(() => {
    if (!globeRef.current) return;

    /* 🌍 GLOBE MODE — branding / overview */
    if (viewMode === "globe") {
      globeRef.current.rotation.y += 0.0012;

      cam.position.z = THREE.MathUtils.lerp(cam.position.z, 6.2, 0.04);
      cam.fov = THREE.MathUtils.lerp(cam.fov, 45, 0.04);
      cam.updateProjectionMatrix();
    }

    /* 🔍 FOCUS MODE — map-like view with details */
    if (viewMode === "focus" && target) {
      const { x, y } = latLngToRotation(target.lat, target.lng);

      globeRef.current.rotation.x = smoothRotateTo(
        globeRef.current.rotation.x,
        x,
        0.07
      );

      globeRef.current.rotation.y = smoothRotateTo(
        globeRef.current.rotation.y,
        y,
        0.07
      );

      // Zoom closer for detailed view
      cam.position.z = THREE.MathUtils.lerp(cam.position.z, 2.5, 0.06);

      // Tighter FOV for map clarity
      cam.fov = THREE.MathUtils.lerp(cam.fov, 22, 0.06);
      cam.updateProjectionMatrix();
    }
  });

  return (
    <group ref={globeRef}>
      {/* 🌍 Earth */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.7}
          metalness={0.1}
          emissive={
            viewMode === "focus"
              ? new THREE.Color("#0a0a0a")
              : new THREE.Color("#000000")
          }
          emissiveIntensity={viewMode === "focus" ? 0.15 : 0}
        />
      </mesh>

      {/* 📍 Pins */}
      <Pins />
    </group>
  );
}

/* ===================== CANVAS ===================== */

export default function GlobeCanvas({
  target,
}: {
  target: NGOLocation | null;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
      dpr={[1.5, 2]}
      gl={{ antialias: true }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 5, 5]} intensity={1.3} />
      <directionalLight position={[-5, -3, -5]} intensity={0.6} />
      <directionalLight position={[0, 10, 0]} intensity={0.4} />

      <Globe target={target} />
    </Canvas>
  );
}