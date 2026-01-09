"use client";

import { latLngToGlobeRotation, smoothRotate } from "./utils";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import Pins from "./Pins";
import { useGlobe } from "@/context/GlobeContext";
import type { NGOLocation } from "@/context/GlobeContext";

/* ===================== GLOBE ===================== */

function Globe({ target }: { target: NGOLocation | null }) {
  const globeRef = useRef<THREE.Group>(null!);
  const isDragging = useRef(false);
  const prevMouse = useRef({ x: 0, y: 0 });
  // After the user has manually dragged in focus mode we stop auto-recentering
  const hasUserInteracted = useRef(false);

  const { gl } = useThree();
  const { viewMode } = useGlobe();

  const texture = useLoader(TextureLoader, "/textures/earth.jpg");

  /* ===================== DRAG EVENTS ===================== */

  useEffect(() => {
    const el = gl.domElement;

    const onPointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      hasUserInteracted.current = true;
      prevMouse.current = { x: e.clientX, y: e.clientY };
    };

    const endDrag = () => {
      isDragging.current = false;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current || !globeRef.current) return;

      const dx = e.clientX - prevMouse.current.x;
      const dy = e.clientY - prevMouse.current.y;

      // Yaw around vertical axis, pitch around horizontal axis
      globeRef.current.rotation.y += dx * 0.005;
      globeRef.current.rotation.x += dy * 0.005;

      globeRef.current.rotation.x = THREE.MathUtils.clamp(
        globeRef.current.rotation.x,
        -Math.PI / 2,
        Math.PI / 2
      );

      prevMouse.current = { x: e.clientX, y: e.clientY };
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointerleave", endDrag);
    el.addEventListener("pointermove", onPointerMove);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointerleave", endDrag);
      el.removeEventListener("pointermove", onPointerMove);
    };
  }, [gl]);

  /* ===================== ANIMATION ===================== */

  // Reset auto-focus whenever a new target is selected
  useEffect(() => {
    hasUserInteracted.current = false;
  }, [target]);

  useFrame(() => {
    if (!globeRef.current) return;

    /* 🌍 AUTO ROTATION (ONLY WHEN NOT SEARCHING & NOT DRAGGING) */
    if (viewMode === "globe" && !isDragging.current) {
      globeRef.current.rotation.y += 0.0012;
      return;
    }

    /* 🎯 SEARCH MODE → ROTATE TO LOCATION */
    if (viewMode === "focus" && target && !isDragging.current && !hasUserInteracted.current) {
      const { x: targetX, y: targetY } = latLngToGlobeRotation(
        target.lat,
        target.lng
      );

      const currentX = globeRef.current.rotation.x;
      const currentY = globeRef.current.rotation.y;

      const nextX = smoothRotate(currentX, targetX, 0.12);
      const nextY = smoothRotate(currentY, targetY, 0.12);

      globeRef.current.rotation.x = nextX;
      globeRef.current.rotation.y = nextY;
    }
  });

  return (
    <group ref={globeRef}>
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.7}
          metalness={0.1}
          emissive="#0a0a0a"
          emissiveIntensity={viewMode === "focus" ? 0.15 : 0}
        />
      </mesh>
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
      style={{ width: "100%", height: "100%", cursor: "grab" }}
      dpr={[1.5, 2]}
      gl={{ antialias: true }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 5, 5]} intensity={1.3} />
      <directionalLight position={[-5, -3, -5]} intensity={0.6} />
      <directionalLight position={[0, 10, 0]} intensity={0.4} />

      <Globe target={target} />
    </Canvas>
  );
}
