import * as THREE from "three";

/**
 * Convert latitude / longitude to 3D position on sphere
 * Used for pin placement
 */
export function latLngToVector3(
  lat: number,
  lng: number,
  radius = 2.02 // slightly above earth surface
) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
}

/**
 * ✅ FIXED: Convert latitude / longitude to globe rotation
 * This rotates the globe so the target location faces the camera
 */
export function latLngToRotation(lat: number, lng: number) {
  // Convert to radians
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  return {
    x: phi - Math.PI / 2, // Tilt to show latitude
    y: -theta,            // Rotate to show longitude
  };
}

/**
 * Calculate shortest rotation path to avoid 360° spins
 * Use this in useFrame loop for smooth rotation across date line
 */
export function smoothRotateTo(
  current: number,
  target: number,
  speed: number
) {
  // Handle 360° wrapping (e.g., from 350° to 10°)
  let delta = target - current;
  
  if (delta > Math.PI) delta -= Math.PI * 2;
  if (delta < -Math.PI) delta += Math.PI * 2;

  return current + delta * speed;
}