"use client";

import { useSession, signOut } from "next-auth/react";
import { Bell, Settings, ChevronDown, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function AdminTopHeader() {
  const { data: session } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials = session?.user?.name
    ? session.user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : "AD";

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40">
      {/* Left: Welcome */}
      <div>
        <h1 className="text-lg font-semibold text-gray-800">
          Welcome, <span className="text-[#1572A1]">Admin</span>
        </h1>
        <p className="text-xs text-gray-400 -mt-0.5">Platform Administrator</p>
      </div>

      {/* Right: Icons & Profile */}
      <div className="flex items-center gap-4">
        {/* Settings */}
        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
          <Settings className="w-5 h-5" />
        </button>

        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 hover:bg-gray-50 p-1.5 pr-3 rounded-full transition-colors border border-transparent hover:border-gray-100"
          >
            <div className="w-9 h-9 rounded-full bg-[#1572A1] flex items-center justify-center text-white font-bold text-sm">
              {initials}
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1">
              <div className="px-4 py-2 border-b border-gray-50">
                <p className="text-sm font-semibold text-gray-800">{session?.user?.name || 'Admin'}</p>
                <p className="text-xs text-gray-400">{session?.user?.email}</p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
