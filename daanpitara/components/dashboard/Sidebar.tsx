"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  User, 
  Users,
  Briefcase,
  Calendar,
  UserPlus,
  Folder,
  Handshake,
  BarChart,
  FileText,
  DollarSign,
  Award,
  Globe,
  TrendingUp,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronDown,
  X
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: User, label: "NGO Profile", href: "/dashboard/ngo-profile" },
  { icon: Users, label: "Beneficiaries", href: "/dashboard/beneficiaries" },
  { icon: Briefcase, label: "Projects & Programs", href: "/dashboard/projects" },
  { icon: Calendar, label: "Events & Activities", href: "/dashboard/events" },
  { icon: UserPlus, label: "Volunteer Registration", href: "/dashboard/volunteers" },
  { icon: Folder, label: "Records", href: "/dashboard/records" },
  { icon: Handshake, label: "Collaboration", href: "/dashboard/collaboration" },
  { icon: BarChart, label: "Impact & Reports", href: "/dashboard/impact" },
  { icon: FileText, label: "Profile Verification", href: "/onboarding" },
  { icon: FileText, label: "Legal Documents", href: "/dashboard/documents" },
  { icon: DollarSign, label: "Funding & Donations", href: "/dashboard/funding" },
  { icon: Award, label: "Awards & Recognition", href: "/dashboard/awards" },
  { icon: Globe, label: "Digital Presence", href: "/dashboard/digital-presence" },
  { icon: TrendingUp, label: "Analytics", href: "/dashboard/analytics" },
];

const bottomItems = [
  { icon: Settings, label: "Settings & Help", href: "/dashboard/settings" },
];

export default function Sidebar({ 
  collapsed, 
  setCollapsed,
  mobileOpen = false,
  setMobileOpen
}: { 
  collapsed: boolean; 
  setCollapsed: (v: boolean) => void;
  mobileOpen?: boolean;
  setMobileOpen?: (v: boolean) => void;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  
  const firstName = session?.user?.name?.split(" ")[0] || "User";

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sidebarWidth = collapsed ? 80 : 280;
  const currentWidth = isMobile ? 280 : sidebarWidth;
  const currentX = isMobile ? (mobileOpen ? 0 : -320) : 0;

  return (
    <motion.aside 
      initial={false}
      animate={{ 
        width: currentWidth, 
        x: currentX 
      }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-screen border-r border-gray-100/80 bg-[#FAFBFC] shadow-[1px_0_8px_rgba(0,0,0,0.03)] flex flex-col z-50 font-sans"
    >
      {/* Mobile Close Button */}
      {isMobile && (
        <button 
          onClick={() => setMobileOpen?.(false)}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:bg-gray-100 rounded-xl transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Logo & Toggle */}
      <div className={`relative flex flex-col ${collapsed && !isMobile ? 'items-center justify-center py-4' : 'items-start justify-start pl-5 pt-4'} border-b border-gray-100/60 bg-transparent transition-all duration-300`}>
        
        {/* Toggle Button - Desktop Only */}
        {!isMobile && (
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className={`absolute top-4 right-4 p-1.5 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all duration-200 z-20 ${collapsed ? 'relative top-0 right-0 mx-auto mb-2' : ''}`}
          >
            {collapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
          </button>
        )}

        <AnimatePresence>
          {!collapsed || isMobile ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-start mt-0"
            >
               <div className="w-[96px] h-[88px] relative mb-0">
                 <Image
                  src="/Logo.png"
                  alt="DaanPitara Logo"
                  fill
                  className="object-contain object-left-top"
                  priority
                />
               </div>
            </motion.div>
          ) : (
             <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mb-2"
            >
               <Image
                src="/Logo.png"
                alt="Logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Greeting (Only when open or mobile) */}
      <AnimatePresence>
        {(!collapsed || isMobile) && (
           <motion.div 
             initial={{ opacity: 0, height: 0 }}
             animate={{ opacity: 1, height: 'auto' }}
             exit={{ opacity: 0, height: 0 }}
             transition={{ duration: 0.2 }}
             className="px-5 py-5"
           >
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                Hello {firstName} <span className="text-xl">👋</span>
              </h2>
           </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-2 px-3 space-y-0.5 scrollbar-hide">
        {(!collapsed || isMobile) && (
          <div className="text-[10px] font-bold text-gray-400/80 uppercase tracking-widest mb-2 px-3 mt-1">
            Navigation
          </div>
        )}
        
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => isMobile && setMobileOpen?.(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative
                ${isActive 
                  ? "bg-gray-100/80 text-gray-900 font-semibold" 
                  : "text-gray-500 hover:bg-gray-100/50 hover:text-gray-800"
                } ${collapsed && !isMobile ? 'justify-center' : ''}`}
              title={collapsed && !isMobile ? item.label : undefined}
            >
              {/* Left border indicator */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#1572A1] rounded-r-full" />
              )}
              <item.icon 
                className={`w-[18px] h-[18px] transition-colors duration-200 flex-shrink-0
                  ${isActive ? "text-[#1572A1]" : "text-gray-400 group-hover:text-gray-600"}`} 
              />
              {(!collapsed || isMobile) && (
                <>
                  <span className="whitespace-nowrap overflow-hidden text-[13px] flex-1">{item.label}</span>
                  {/* @ts-ignore */}
                  {item.hasDropdown && <ChevronDown className="w-4 h-4 text-gray-400" />}
                </>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-gray-100/60 bg-transparent">
         {(!collapsed || isMobile) && (
          <div className="text-[10px] font-bold text-gray-400/80 uppercase tracking-widest mb-2 px-3">
            Others
          </div>
        )}
        {bottomItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => isMobile && setMobileOpen?.(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-gray-100/50 hover:text-gray-800 transition-all duration-200 group
             ${collapsed && !isMobile ? 'justify-center' : ''}`}
            title={collapsed && !isMobile ? item.label : undefined}
          >
            <item.icon className="w-[18px] h-[18px] text-gray-400 group-hover:text-gray-600 flex-shrink-0 transition-colors duration-200" />
            {(!collapsed || isMobile) && <span className="text-[13px]">{item.label}</span>}
          </Link>
        ))}
      </div>
    </motion.aside>
  );
}
