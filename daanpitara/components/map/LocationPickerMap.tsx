"use client";

import { GoogleMap, MarkerF, useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
import { useState, useMemo, useCallback, useRef } from "react";
import { Search, MapPin } from "lucide-react";

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "1rem",
};

const libraries: ("places" | "geometry")[] = ["places"];

interface LocationPickerMapProps {
  initialLat?: number;
  initialLng?: number;
  onSave: (lat: number, lng: number) => void;
  onCancel: () => void;
}

export default function LocationPickerMap({ initialLat, initialLng, onSave, onCancel }: LocationPickerMapProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: libraries,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  // Default to India center if no prop provided
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number }>(
    initialLat && initialLng ? { lat: initialLat, lng: initialLng } : { lat: 20.5937, lng: 78.9629 }
  );

  // mapCenter state to control the map's center properly when searching
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>(
      initialLat && initialLng ? { lat: initialLat, lng: initialLng } : { lat: 20.5937, lng: 78.9629 }
  );

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const onSearchLoad = (ref: google.maps.places.SearchBox) => {
    searchBoxRef.current = ref;
  };

  const onPlacesChanged = () => {
    if (searchBoxRef.current) {
        const places = searchBoxRef.current.getPlaces();
        if (places && places.length > 0) {
            const place = places[0];
            if (place.geometry && place.geometry.location) {
                const newLocation = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                };
                setSelectedLocation(newLocation);
                setMapCenter(newLocation); // Pan map to new location
                // If map is loaded, we can also smooth pan
                map?.panTo(newLocation);
                map?.setZoom(15); // Zoom in when specific place found
            }
        }
    }
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setSelectedLocation({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });
    }
  };

  if (!isLoaded) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 rounded-xl">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] rounded-xl overflow-hidden">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={5}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
        options={{
            disableDefaultUI: false,
            zoomControl: true,
            fullscreenControl: false,
            streetViewControl: false,
        }}
      >
        <MarkerF position={selectedLocation} />
        
        {/* Search Box - Centered Top */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-10">
            <StandaloneSearchBox
                onLoad={onSearchLoad}
                onPlacesChanged={onPlacesChanged}
            >
                <div className="relative shadow-lg rounded-lg">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for a location..."
                        className="block w-full pl-10 pr-3 py-3 border-none rounded-lg leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                        style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}
                    />
                </div>
            </StandaloneSearchBox>
        </div>

      </GoogleMap>

      {/* Control Panel Overlay */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white px-6 py-4 rounded-xl shadow-lg flex flex-col gap-3 w-[90%] max-w-md">
         <div>
            <p className="text-xs text-gray-500 font-medium uppercase mb-1">Selected Coordinates</p>
            <div className="flex gap-4 text-sm font-mono bg-gray-50 p-2 rounded border border-gray-100">
                <span>Lat: {selectedLocation.lat.toFixed(6)}</span>
                <span>Lng: {selectedLocation.lng.toFixed(6)}</span>
            </div>
         </div>
         <div className="flex gap-3 pt-2">
            <button 
                onClick={onCancel}
                className="flex-1 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
            >
                Cancel
            </button>
            <button 
                onClick={() => onSave(selectedLocation.lat, selectedLocation.lng)}
                className="flex-1 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
            >
                Set Location
            </button>
         </div>
      </div>
    </div>
  );
}
