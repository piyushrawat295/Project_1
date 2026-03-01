"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopHeader from "@/components/admin/AdminTopHeader";
import { useState, useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check on mount
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex font-sans overflow-x-hidden">
      {/* Yellow accent bar at top */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F59E0B] via-[#F59E0B] to-[#FBBF24] z-[70]" />
      
      {/* Sidebar */}
      <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Mobile Backdrop */}
      {isMobile && mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div 
        className="flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out md:ml-[260px] w-full"
      >
        <div className="mt-1">
          <AdminTopHeader onMenuClick={() => setMobileOpen(true)} />
        </div>

        <main className="flex-1 px-4 py-6 md:px-8 md:py-6 overflow-y-auto w-full">
          <div className="max-w-[1400px] mx-auto w-full space-y-6 animate-fade-in-up">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
