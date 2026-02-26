"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopHeader from "@/components/admin/AdminTopHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8F9FB] flex font-sans">
      {/* Yellow accent bar at top */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F59E0B] via-[#F59E0B] to-[#FBBF24] z-[60]" />
      
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen ml-[250px]">
        <div className="mt-1">
          <AdminTopHeader />
        </div>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-[1400px] mx-auto w-full space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
