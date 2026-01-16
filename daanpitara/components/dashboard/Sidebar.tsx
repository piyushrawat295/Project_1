"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  User, 
  Building2, 
  FileCheck, 
  HandHeart, 
  Megaphone, 
  MessageSquare, 
  BarChart3, 
  Settings,
  HelpCircle,
  PanelLeftClose,
  PanelLeftOpen
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: User, label: "My Profile", href: "/dashboard/profile" },
  { icon: Building2, label: "My NGO Details", href: "/dashboard/ngo" },
  { icon: FileCheck, label: "Documents & verification", href: "/dashboard/documents" },
  { icon: BarChart3, label: "Activity Logs", href: "/dashboard/analytics" }, 
  { icon: Megaphone, label: "Manage Fundraising", href: "/dashboard/fundraising" },
  { icon: HandHeart, label: "CSR Opportunities", href: "/dashboard/csr" },
  { icon: MessageSquare, label: "Messages", href: "/dashboard/messages" },
  { icon: BarChart3, label: "Insights & Analytics", href: "/dashboard/insights" },
];

const bottomItems = [
  { icon: HelpCircle, label: "Help & Support", href: "/dashboard/support" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function Sidebar({ 
  collapsed, 
  setCollapsed 
}: { 
  collapsed: boolean; 
  setCollapsed: (v: boolean) => void;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  
  const firstName = session?.user?.name?.split(" ")[0] || "User";

  return (
    <motion.aside 
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      className="fixed left-0 top-0 h-screen border-r border-gray-100 bg-white shadow-sm flex flex-col z-50 transition-all duration-300 ease-in-out font-sans"
    >
      {/* Logo & Toggle */}
      <div className="p-5 border-b border-gray-50 flex items-center justify-between h-[80px]">
        <AnimatePresence>
          {!collapsed && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 overflow-hidden whitespace-nowrap"
            >
               <Image
                src="/Logo.png"
                alt="DaanPitara Logo"
                width={48}
                height={48}
                className="w-12 h-12 object-contain"
              />
              <div className="flex flex-col">
                 <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent leading-none mb-0.5">
                  DaanPitara
                </span>
                <span className="text-[10px] text-gray-400 font-medium">Your compassion,our code</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className={`p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors ${collapsed ? 'mx-auto' : ''}`}
        >
          {collapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
        </button>
      </div>

      {/* Greeting (Only when open) */}
      <AnimatePresence>
        {!collapsed && (
           <motion.div 
             initial={{ opacity: 0, height: 0 }}
             animate={{ opacity: 1, height: 'auto' }}
             exit={{ opacity: 0, height: 0 }}
             className="px-5 py-6"
           >
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                Hello {firstName} <span className="text-2xl">👋</span>
              </h2>
           </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-2 px-3 space-y-1 [&::-webkit-scrollbar]:hidden -mr-1 pr-1">
        {!collapsed && (
          <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3 mt-2">
            Navigation
          </div>
        )}
        
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative
                ${isActive 
                  ? "bg-gray-100 text-gray-900 font-semibold" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                } ${collapsed ? 'justify-center' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon 
                className={`w-[20px] h-[20px] transition-colors flex-shrink-0
                  ${isActive ? "text-gray-900" : "text-gray-400 group-hover:text-gray-600"}
                `} 
              />
              {!collapsed && (
                <span className="whitespace-nowrap overflow-hidden text-[14px]">{item.label}</span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-50 space-y-1 bg-white">
         {!collapsed && (
          <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
            Others
          </div>
        )}
        {bottomItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group
             ${collapsed ? 'justify-center' : ''}`}
            title={collapsed ? item.label : undefined}
          >
            <item.icon className="w-[20px] h-[20px] text-gray-400 group-hover:text-gray-600 flex-shrink-0" />
            {!collapsed && <span className="text-[14px]">{item.label}</span>}
          </Link>
        ))}
      </div>
    </motion.aside>
  );
}
