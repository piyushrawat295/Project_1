"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import { useSession } from "next-auth/react";
import TopHeader from "@/components/dashboard/TopHeader";
import { useState } from "react";
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

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      {/* Main Content Area */}
      <motion.div 
        className="flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out"
        animate={{ marginLeft: sidebarCollapsed ? 80 : 280 }}
      >
        <TopHeader />
        
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-[1600px] mx-auto w-full space-y-8 animate-fade-in">
            {children}
          </div>
        </main>
      </motion.div>
    </div>
  );
}
