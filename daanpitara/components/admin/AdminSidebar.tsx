"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Users,
  FolderKanban,
  IndianRupee,
  FileCheck,
  CheckCircle2,
  BarChart3,
  FileText,
  Settings,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";

const adminNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/admin" },
  { icon: Building2, label: "NGO Management", href: "/dashboard/admin/ngo-management" },
  { icon: Users, label: "User Management", href: "/dashboard/admin/user-management" },
  { icon: FolderKanban, label: "Project Monitoring", href: "/dashboard/admin/project-monitoring" },
  { icon: IndianRupee, label: "Financial Oversight", href: "/dashboard/admin/financial-oversight" },
  { icon: FileCheck, label: "Document Approval", href: "/dashboard/admin/document-approval" },
  { icon: CheckCircle2, label: "Verifications & Approvals", href: "/dashboard/admin/verifications" },
  { icon: BarChart3, label: "Analytics & Insights", href: "/dashboard/admin/analytics" },
  { icon: FileText, label: "Reports & Compliance", href: "/dashboard/admin/reports" },
  { icon: Settings, label: "Platform Settings", href: "/dashboard/admin/settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] bg-[#FAFBFC] border-r border-gray-100/80 flex flex-col z-50 font-sans shadow-[1px_0_8px_rgba(0,0,0,0.03)]">
      {/* Logo */}
      <div className="px-5 pt-4 pb-4 border-b border-gray-100/60">
        <Link href="/dashboard/admin" className="flex items-center gap-3">
          <Image src="/Logo.png" alt="DaanPitara" width={40} height={40} className="object-contain rounded-xl" />
          <div>
            <span className="text-[17px] font-bold text-gray-900 tracking-tight leading-none">DaanPitara</span>
            <span className="block text-[11px] text-gray-400 font-medium mt-0.5">Admin Portal</span>
          </div>
        </Link>
      </div>

      {/* Navigation Label */}
      <div className="px-5 pt-5 pb-1">
        <span className="text-[10px] font-bold text-gray-400/80 uppercase tracking-widest">Main Menu</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-3 space-y-1 scrollbar-hide">
        {adminNavItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== "/dashboard/admin" && pathname.startsWith(item.href));
          const isExactDashboard = item.href === "/dashboard/admin" && pathname === "/dashboard/admin";
          const active = isExactDashboard || (item.href !== "/dashboard/admin" && isActive);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group text-[14px] relative
                ${active
                  ? "bg-[#F59E0B]/10 text-[#B45309] font-semibold"
                  : "text-gray-500 hover:bg-gray-100/60 hover:text-gray-800"
                }`}
            >
              {/* Left border indicator for active */}
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#F59E0B] rounded-r-full" />
              )}
              <item.icon
                className={`w-[18px] h-[18px] flex-shrink-0 transition-colors duration-200
                  ${active ? "text-[#D97706]" : "text-gray-400 group-hover:text-gray-600"}`}
              />
              <span className="whitespace-nowrap overflow-hidden">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Exit Admin Portal */}
      <div className="p-3 border-t border-gray-100/60">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200 text-[14px] group"
        >
          <ArrowLeft className="w-[18px] h-[18px] group-hover:text-red-500 flex-shrink-0 transition-colors duration-200" />
          <span>Exit Admin Portal</span>
        </Link>
      </div>
    </aside>
  );
}
