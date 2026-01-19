"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import { useSession } from "next-auth/react";
import TopHeader from "@/components/dashboard/TopHeader";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /* eslint-disable no-console */
  const { data: session, status } = useSession();
  console.log("DashboardLayout Session:", { status, role: session?.user?.role, email: session?.user?.email });

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size for responsiveness
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check on mount
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar */}
      <Sidebar 
        collapsed={sidebarCollapsed} 
        setCollapsed={setSidebarCollapsed} 
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      
      {/* Mobile Backdrop */}
      {isMobile && mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <motion.div 
        className="flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out"
        animate={{ marginLeft: isMobile ? 0 : (sidebarCollapsed ? 80 : 280) }}
      >
        <TopHeader onMenuClick={() => setMobileOpen(true)} />
        
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-[1600px] mx-auto w-full space-y-8 animate-fade-in">
            {children}
          </div>
        </main>
      </motion.div>
    </div>
  );
}
