"use client";

import { GoogleMap, MarkerF, InfoWindowF, useJsApiLoader } from "@react-google-maps/api";
import { useGlobe, NGOLocation } from "@/context/GlobeContext";
import { useMemo, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

/**
 * Custom Map Styles (Optional - for a cleaner look)
 */
const mapStyles = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "1rem", // Matches the rounded-xl look of the globe container
};

const libraries: ("places" | "geometry")[] = ["places"];

export default function GoogleMapComponent() {
  const { selectedLocation } = useGlobe();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: libraries,
  });

  const center = useMemo(() => {
    if (selectedLocation) {
      return { lat: selectedLocation.lat, lng: selectedLocation.lng };
    }
    return { lat: 20.5937, lng: 78.9629 }; // Fallback: Center of India
  }, [selectedLocation]);

  const onLoad = (mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  };

  const onUnmount = () => {
    setMap(null);
  };

  // Open InfoWindow automatically when location changes
  useEffect(() => {
    if (selectedLocation) {
      setInfoWindowOpen(true);
    }
  }, [selectedLocation]);

  if (!isLoaded) {
    return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    )
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14} // Close enough to see streets
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        styles: mapStyles,
        disableDefaultUI: false, // Keep default UI for usability
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: true,
      }}
    >
      {selectedLocation && (
        <MarkerF
          position={center}
          onClick={() => setInfoWindowOpen(true)}
          // Custom marker icon can be added here if needed
        //   icon={{
        //     url: "/marker-icon.png", 
        //     scaledSize: new window.google.maps.Size(40, 40)
        //   }}
        >
          {infoWindowOpen && (
            <InfoWindowF
              onCloseClick={() => setInfoWindowOpen(false)}
              position={center}
            >
              <div className="p-2 min-w-[200px] max-w-[250px]">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {selectedLocation.name}
                </h3>
                {selectedLocation.city && (
                  <p className="text-sm text-gray-600 mb-2">
                    📍 {selectedLocation.city}, India
                    {selectedLocation.pincode ? ` - ${selectedLocation.pincode}` : ''}
                  </p>
                )}
                
                <button 
                  className="mt-2 w-full flex items-center justify-center gap-2 bg-[#0F71A8] text-white text-xs font-semibold py-2 px-3 rounded hover:bg-[#0c5a86] transition-colors"
                  onClick={() => alert(`View details for ${selectedLocation.name}`)} // Placeholder for navigation
                >
                  View Details
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </InfoWindowF>
          )}
        </MarkerF>
      )}
    </GoogleMap>
  );
}
