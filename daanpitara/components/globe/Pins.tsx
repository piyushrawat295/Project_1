"use client";

import { useMemo } from "react";
import { ngos } from "@/data/ngos";
import Marker from "./Marker";
import { latLngToVector3 } from "./utils";
import { useGlobe } from "@/context/GlobeContext";

export default function Pins() {
  const { selectedLocation, viewMode } = useGlobe();

  // ✅ ADDED: Memoize pin positions to avoid recalculation on every render
  const pinData = useMemo(
    () =>
      ngos.map((ngo) => ({
        id: ngo.id,
        position: latLngToVector3(ngo.lat, ngo.lng),
        ngo,
      })),
    [] // ngos is static data
  );

  return (
    <>
      {pinData.map(({ id, position, ngo }) => {
        const isActive =
          viewMode === "focus" &&
          selectedLocation?.name === ngo.name;

        return (
          <Marker
            key={id}
            position={position}
            isActive={isActive}
            label={
              isActive
                ? {
                    name: ngo.name,
                    city: ngo.city,
                    pincode: ngo.pincode,
                  }
                : null
            }
          />
        );
      })}
    </>
  );
}