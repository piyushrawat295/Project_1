"use client";

import { ChevronRight, Phone, MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import { useGlobe } from "@/context/GlobeContext";
import { Suspense } from "react";
import { GlobeErrorBoundary } from "../globe/GlobeErrorBoundary";
import { motion } from "framer-motion";

// 🔥 IMPORTANT: dynamic import (SSR off)
const GlobeCanvas = dynamic(() => import("../globe/GlobeCanvas"), {
  ssr: false,
});

export default function Hero() {
  const { selectedLocation } = useGlobe();

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
            <h1 className="text-black text-[28px] sm:text-[32px] xl:text-[40px] font-medium leading-normal mb-6">
              {selectedLocation?.city ? (
                <>
                  DaanPitara <span className="text-[#0F71A8]">{selectedLocation.city}</span>
                </>
              ) : (
                "Trusted Digital Platform For NGOs & Fundraising"
              )}
            </h1>

            <p className="text-[#4C4B4B] text-[16px] xl:text-[18px] leading-normal mb-10">
              DaanPitara empowers NGOs across the globe to embrace digital
              transformation, amplify their social impact, and attract
              meaningful CSR partnerships.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="flex h-[48px] items-center gap-[10px] rounded-lg bg-[#0F71A8] px-6 text-white">
                Explore Services
                <ChevronRight size={20} />
              </button>

              <button className="flex h-[48px] items-center gap-[10px] rounded-lg border border-[#0F71A8] px-6 text-[#0F71A8]">
                <Phone size={20} />
                Contact Us
              </button>
            </div>
          </div>

          {/* RIGHT → 🌍 GLOBE - ✅ UPDATED: Added overlay badge */}
          {/* RIGHT → 🌍 GLOBE - ✅ UPDATED: Removed container styling */}
          <div className="w-full max-w-[565px] h-[350px] sm:h-[420px] xl:h-[500px] relative">
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
                    {selectedLocation.pincode && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        PIN: {selectedLocation.pincode}
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
                <strong>Pincode:</strong> {selectedLocation.pincode}
              </p>
              <p className="sm:col-span-2">
                <strong>Coordinates:</strong> {selectedLocation.lat}°N, {selectedLocation.lng}°E
              </p>
            </div>
          </div>
        )}

        {/* Pills */}
        <div className="mt-[56px] mb-[36px] flex flex-wrap gap-4 sm:gap-6">
          {[
            "Empowering NGOs",
            "Digital & Funding Support",
            "Trust & Transparency",
          ].map((item) => (
            <span
              key={item}
              className="rounded-lg border border-gray-300 px-6 py-3 text-[#4C4B4B]"
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}