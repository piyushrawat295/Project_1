"use client";

import { useMemo } from "react";
import { ngos } from "@/data/ngos";
import Marker from "./Marker";
import { latLngToVector3 } from "./utils";
import { useGlobe } from "@/context/GlobeContext";

import { useRouter } from "next/navigation";

export default function Pins() {
  const { selectedLocation, viewMode } = useGlobe();
  const router = useRouter();

  const pinData = useMemo(
    () =>
      ngos.map((ngo) => ({
        id: ngo.id,
        position: latLngToVector3(ngo.lat, ngo.lng),
        ngo,
      })),
    []
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
            name={ngo.name}
            onClick={() => router.push(`/ngos/${ngo.slug}`)}
          />
        );
      })}
    </>
  );
}
