"use client";

import { ChevronRight, Phone, MapPin } from "lucide-react";
import TypewriterText from "@/components/animations/TypewriterText";
import dynamic from "next/dynamic";
import { useGlobe } from "@/context/GlobeContext";
import { Suspense } from "react";
import { GlobeErrorBoundary } from "../globe/GlobeErrorBoundary";
import { motion } from "framer-motion";
import Link from "next/link";
import GlobeSearch from "../globe/GlobeSearch";

import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();

  const handleRegisterClick = () => {
    return session ? "/dashboard" : "/signin";
  };

  return (
    <section className="bg-[#FFFDF9]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 xl:px-[72px] pt-[56px] pb-12"
      >
        {/* Top */}
        <div className="flex flex-col xl:flex-row items-center gap-12 xl:gap-[50px]">
          
          {/* LEFT: Text Content */}
          <div className="w-full xl:w-[659px] order-1">
            {selectedLocation?.city ? (
              <h1 className="text-black text-[28px] sm:text-[32px] xl:text-[40px] font-medium leading-normal mb-4">
                DaanPitara <span className="text-[#0F71A8]">{selectedLocation.city}</span>
              </h1>
            ) : (
              <h1 className="text-black text-[32px] sm:text-[40px] xl:text-[48px] font-bold leading-tight mb-6">
                Discover Verified NGOs Across India Through an <span className="text-[#0F71A8]">Interactive Global Map</span>
              </h1>
            )}

            <p className="text-[#4C4B4B] text-[16px] xl:text-[18px] leading-relaxed mb-8 max-w-[90%]">
              DaanPitara connects donors, NGOs, and CSR partners through a real-time interactive globe. Explore verified organizations by location, track social impact visually, and support causes with transparent digital fundraising.
            </p>

            {/* Desktop Buttons (Hidden on Mobile, Visible on XL) */}
            <div className="hidden xl:flex flex-wrap gap-4">
              <Link href="/map-view">
                <button className="flex h-[52px] items-center gap-[10px] rounded-lg bg-[#0F71A8] px-8 text-white font-medium hover:bg-[#0c5d8a] transition-colors shadow-sm">
                  Explore NGOs on Map
                  <ChevronRight size={20} />
                </button>
              </Link>

              <Link href={session ? "/dashboard" : "/signin"}>
                <button className="flex h-[52px] items-center gap-[10px] rounded-lg border-2 border-[#0F71A8] px-8 text-[#0F71A8] font-medium hover:bg-blue-50 transition-colors">
                  <span className="relative">Register Your NGO</span>
                </button>
              </Link>
            </div>
          </div>

          {/* RIGHT: Globe & Search (Order 2 on Desktop, Order 2 on Mobile) */}
          <div className="flex flex-col gap-6 w-full max-w-[600px] order-2">
            
            {/* Globe Container */}
            <div className="relative w-full">
                <div className="w-full h-[350px] sm:h-[420px] xl:h-[500px] relative overflow-hidden rounded-2xl shadow-lg border border-gray-100 bg-white">
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
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50">
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



                    {/* Location Badge Overlay */}
                    {selectedLocation && (
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg px-4 py-3 border-l-4 border-green-500 pointer-events-auto">
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

            {/* Search Section */}
            <div className="w-full flex flex-col items-center gap-2">
                <GlobeSearch />
            </div>

             {/* Mobile Buttons (Visible on Mobile, Hidden on XL) */}
             <div className="flex xl:hidden flex-col sm:flex-row gap-3 w-full mt-4">
              <Link href="/map-view" className="w-full sm:w-auto">
                <button className="flex h-[48px] w-full sm:w-auto justify-center items-center gap-[10px] rounded-lg bg-[#0F71A8] px-6 text-white font-medium hover:bg-[#0c5d8a] transition-colors shadow-sm">
                  Explore NGOs on Map
                  <ChevronRight size={20} />
                </button>
              </Link>

              <Link href={session ? "/dashboard" : "/signin"} className="w-full sm:w-auto">
                <button className="flex h-[48px] w-full sm:w-auto justify-center items-center gap-[10px] rounded-lg border border-[#0F71A8] px-6 text-[#0F71A8] font-medium hover:bg-blue-50 transition-colors">
                  Partner With Us
                </button>
              </Link>
            </div>

          </div>
        </div>

        {/* 📍 LOCATION INFO - Details below */}
        {selectedLocation && (
          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg text-sm max-w-2xl mx-auto xl:mx-0">
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
      </motion.div>
    </section>
  );
}
