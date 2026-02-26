"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import { useSession } from "next-auth/react";
import TopHeader from "@/components/dashboard/TopHeader";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /* eslint-disable no-console */
  const { data: session, status } = useSession();
  const pathname = usePathname();
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

  // Admin routes use their own layout — bypass the NGO sidebar/header
  if (pathname.startsWith('/dashboard/admin')) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex font-sans">
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
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <motion.div 
        className="flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out"
        animate={{ marginLeft: isMobile ? 0 : (sidebarCollapsed ? 80 : 280) }}
      >
        <TopHeader onMenuClick={() => setMobileOpen(true)} />
        
        <main className="flex-1 px-6 py-6 md:px-8 md:py-6 overflow-y-auto">
          <div className="max-w-[1600px] mx-auto w-full space-y-8 animate-fade-in-up">
            {children}
          </div>
        </main>
      </motion.div>
    </div>
  );
}
