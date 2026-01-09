import * as THREE from "three";

/**
 * Convert latitude/longitude to 3D position on sphere
 * ✅ STANDARD SPHERICAL COORDINATES
 */
export function latLngToVector3(
  lat: number,
  lng: number,
  radius = 2.02
) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lng + 180);

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

/**
 * ✅ CORRECT globe rotation to bring lat/lng to camera front (+Z)
 */
export function latLngToGlobeRotation(lat: number, lng: number) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lng + 180);

  return {
    x: -(phi - Math.PI / 2),
    y: theta,
  };
}


/**
 * Smooth rotation with wrapping (Y axis)
 */
export function smoothRotate(
  current: number,
  target: number,
  speed: number
) {
  let delta = target - current;
  if (delta > Math.PI) delta -= Math.PI * 2;
  if (delta < -Math.PI) delta += Math.PI * 2;
  return current + delta * speed;
}
