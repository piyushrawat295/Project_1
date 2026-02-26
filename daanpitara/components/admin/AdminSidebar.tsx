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
    <aside className="fixed left-0 top-0 h-screen w-[250px] bg-white border-r border-gray-100 flex flex-col z-50 font-sans shadow-sm">
      {/* Logo */}
      <div className="px-5 pt-5 pb-4 border-b border-gray-100">
        <Link href="/dashboard/admin" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-[#1572A1] flex items-center justify-center">
            <Image src="/Logo.png" alt="DaanPitara" width={28} height={28} className="object-contain" />
          </div>
          <span className="text-lg font-bold text-gray-900 tracking-tight">DaanPitara</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5 [&::-webkit-scrollbar]:hidden">
        {adminNavItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== "/dashboard/admin" && pathname.startsWith(item.href));
          const isExactDashboard = item.href === "/dashboard/admin" && pathname === "/dashboard/admin";
          const active = isExactDashboard || (item.href !== "/dashboard/admin" && isActive);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group text-[14px]
                ${active
                  ? "bg-[#F59E0B] text-white font-semibold shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
            >
              <item.icon
                className={`w-[18px] h-[18px] flex-shrink-0 transition-colors
                  ${active ? "text-white" : "text-gray-400 group-hover:text-gray-600"}`}
              />
              <span className="whitespace-nowrap overflow-hidden">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Exit Admin Portal */}
      <div className="p-3 border-t border-gray-100">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 text-[14px] group"
        >
          <ArrowLeft className="w-[18px] h-[18px] text-gray-400 group-hover:text-gray-600 flex-shrink-0" />
          <span>Exit Admin Portal</span>
        </Link>
      </div>
    </aside>
  );
}
