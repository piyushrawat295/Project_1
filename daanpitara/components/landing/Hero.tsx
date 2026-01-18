"use client";

import { ChevronRight, Phone, MapPin } from "lucide-react";
import TypewriterText from "@/components/animations/TypewriterText";
import dynamic from "next/dynamic";
import { useGlobe } from "@/context/GlobeContext";
import { Suspense } from "react";
import { GlobeErrorBoundary } from "../globe/GlobeErrorBoundary";
import { motion } from "framer-motion";
import Link from "next/link";

// 🔥 IMPORTANT: dynamic import (SSR off)
const GlobeCanvas = dynamic(() => import("../globe/GlobeCanvas"), {
  ssr: false,
});

// 🔥 Dynamic Import for Google Map
const GoogleMapComponent = dynamic(() => import("../map/GoogleMapComponent"), {
  ssr: false,
});

export default function Hero() {
  const { selectedLocation, viewMode } = useGlobe();

  return (
    <section className="bg-[#FFFDF9]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 xl:px-[72px] pt-[56px]"
      >
        {/* Top */}
        <div className="flex flex-col xl:flex-row items-center gap-12 xl:gap-[50px]">
          
          {/* LEFT */}
          <div className="w-full xl:w-[659px]">
            {selectedLocation?.city ? (
              <h1 className="text-black text-[28px] sm:text-[32px] xl:text-[40px] font-medium leading-normal mb-6">
                DaanPitara <span className="text-[#0F71A8]">{selectedLocation.city}</span>
              </h1>
            ) : (
              <TypewriterText 
                text="Trusted Digital Platform For NGOs & Fundraising" 
                className="text-black text-[28px] sm:text-[32px] xl:text-[40px] font-medium leading-normal mb-6"
              />
            )}

            <p className="text-[#4C4B4B] text-[16px] xl:text-[18px] leading-normal mb-10">
              DaanPitara empowers NGOs across the globe to embrace digital
              transformation, amplify their social impact, and attract
              meaningful CSR partnerships.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/services">
                <button className="flex h-[48px] items-center gap-[10px] rounded-lg bg-[#0F71A8] px-6 text-white hover:bg-[#0c5d8a] transition-colors">
                  Explore Services
                  <ChevronRight size={20} />
                </button>
              </Link>

              <Link href="/contact">
                <button className="flex h-[48px] items-center gap-[10px] rounded-lg border border-[#0F71A8] px-6 text-[#0F71A8] hover:bg-blue-50 transition-colors">
                  <Phone size={20} />
                  Contact Us
                </button>
              </Link>
            </div>
          </div>

          {/* RIGHT → 🌍 GLOBE - ✅ UPDATED: Added overlay badge */}
          {/* RIGHT → 🌍 GLOBE - ✅ UPDATED: Removed container styling */}
          <div className="w-full max-w-[565px] h-[350px] sm:h-[420px] xl:h-[500px] relative overflow-hidden rounded-xl">
            {viewMode === "map" ? (
               <motion.div
                 key="map"
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 transition={{ duration: 0.5 }}
                 className="w-full h-full"
               >
                  <GoogleMapComponent />
               </motion.div>
            ) : (
               <motion.div
                 key="globe"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 transition={{ duration: 0.5 }} // Smooth fade
                 className="w-full h-full"
               >
                <GlobeErrorBoundary>
                  <Suspense
                    fallback={
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                        <div className="text-center">
                          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                          <p className="text-sm text-gray-600">Loading globe...</p>
                        </div>
                      </div>
                    }
                  >
                    <GlobeCanvas target={selectedLocation} />
                  </Suspense>
                </GlobeErrorBoundary>
               </motion.div>
            )}

            {/* ✅ ADDED: Location Badge Overlay */}
            {selectedLocation && (
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg px-4 py-3 border-l-4 border-green-500">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-gray-900 text-sm">
                      {selectedLocation.name}
                    </p>
                    {selectedLocation.city && (
                      <p className="text-xs text-gray-600 mt-1">
                        📍 {selectedLocation.city}, India
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 📍 LOCATION INFO - ✅ UPDATED: Better styling */}
        {selectedLocation && (
          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg text-sm">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-green-600" />
              <span className="font-semibold text-green-900">Location Details</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
              <p>
                <strong>City:</strong> {selectedLocation.city}
              </p>
              <p>
                <strong>Coordinates:</strong> {selectedLocation.lat}°N, {selectedLocation.lng}°E
              </p>
            </div>
          </div>
        )}

        {/* Pills Removed - Moved to Services.tsx */}
      </motion.div>
    </section>
  );
}