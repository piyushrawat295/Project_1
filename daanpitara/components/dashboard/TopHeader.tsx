"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { Bell, Search, ChevronDown, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function TopHeader() {
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

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Left: Greeting/Breadcrumb */}
      <div>
        <h1 className="text-xl font-bold text-gray-800">
          Hello {session?.user?.name?.split(" ")[0]} 👋
        </h1>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-gray-50 rounded-full px-4 py-2 border border-gray-100 focus-within:border-blue-200 transition-colors w-64">
          <Search className="w-4 h-4 text-gray-400" />
          <input 
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-sm ml-2 w-full text-gray-600 placeholder:text-gray-400"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 hover:bg-gray-50 p-1.5 pr-3 rounded-full transition-colors border border-transparent hover:border-gray-100"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200">
              <Image
                src={session?.user?.image || `https://ui-avatars.com/api/?name=${session?.user?.name}&background=random`}
                alt="Profile"
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-gray-700 leading-none">
                {session?.user?.name}
              </p>
              <p className="text-[10px] text-gray-500 font-medium bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-full inline-block mt-1">
                NGO Admin
              </p>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 animation-fade-in-up origin-top-right">
              <Link href="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                My Profile
              </Link>
              <Link href="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                Settings
              </Link>
              <div className="h-px bg-gray-100 my-1"></div>
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
