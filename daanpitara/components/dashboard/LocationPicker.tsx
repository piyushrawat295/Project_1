"use client";

import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import { useState, useMemo, useCallback, useEffect } from "react";
import { MapPin, Loader2 } from "lucide-react";

type Location = {
  lat: number;
  lng: number;
};

interface LocationPickerProps {
  value?: Location;
  onLocationChange: (location: Location) => void;
  readOnly?: boolean;
}

const libraries: ("places" | "geometry")[] = ["places"];

export default function LocationPicker({ 
  value, 
  onLocationChange,
  readOnly = false
}: LocationPickerProps) {
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: libraries,
  });

  // Default to somewhere in India (e.g. Nagpur center) if no location
  const defaultCenter = useMemo(() => ({ lat: 21.1458, lng: 79.0882 }), []);
  
  const [center, setCenter] = useState<Location>(defaultCenter);
  const [markerPosition, setMarkerPosition] = useState<Location | null>(null);

  useEffect(() => {
    if (value && value.lat && value.lng) {
      setCenter(value);
      setMarkerPosition(value);
    }
  }, [value]);

  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newPos = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      setMarkerPosition(newPos);
      onLocationChange(newPos);
    }
  }, [onLocationChange]);

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(pos);
          setMarkerPosition(pos);
          onLocationChange(pos);
        },
        () => {
          alert("Error fetching your location.");
        }
      );
    }
  };

  if (loadError) return <div className="p-4 text-red-500 bg-red-50 rounded-lg">Error loading maps</div>;
  
  if (!isLoaded) return (
    <div className="w-full h-[300px] bg-gray-100 rounded-xl flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
    </div>
  );

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">
          Pin Organization Location
        </label>
        <button
          type="button"
          onClick={handleCurrentLocation}
          className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
        >
          <MapPin className="w-3 h-3" />
          Use Current Location
        </button>
      </div>

      <div className="w-full h-[350px] rounded-xl overflow-hidden border border-gray-200 shadow-sm relative">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={center}
          zoom={12} // initial zoom
          onClick={readOnly ? undefined : handleMapClick}
          options={{
            disableDefaultUI: false,
            streetViewControl: false,
            mapTypeControl: false,
          }}
        >
          {markerPosition && (
            <MarkerF 
              position={markerPosition} 
              draggable={!readOnly}
              onDragEnd={handleMapClick}
            />
          )}
        </GoogleMap>
        
        {!markerPosition && (
          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 shadow-sm">
            Tap on map to set location
          </div>
        )}
      </div>
      
      {markerPosition && (
        <p className="text-xs text-gray-500">
          Selected: {markerPosition.lat.toFixed(6)}, {markerPosition.lng.toFixed(6)}
        </p>
      )}
    </div>
  );
}
