"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { Bell, Search, ChevronDown, LogOut, Menu, Trash2 } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { getNotifications, markNotificationsAsRead } from "@/actions/notifications";
import { Notification } from "@/lib/schema";

export default function TopHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  const { data: session } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const fetchNotes = useCallback(async () => {
      const res = await getNotifications();
      if (res?.data) {
          setNotifications(res.data);
      }
  }, []);

  useEffect(() => {
      fetchNotes();
      const interval = setInterval(fetchNotes, 10000); 
      return () => clearInterval(interval);
  }, [fetchNotes]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleOpenDropdown = async () => {
      setIsNotificationOpen(!isNotificationOpen);
      if (!isNotificationOpen && unreadCount > 0) {
          await markNotificationsAsRead();
          setNotifications(notifications.map(n => ({...n, isRead: true})));
      }
  };

  const handleClearAll = () => {
      setNotifications([]);
      setIsNotificationOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatTime = (dateStr: string | Date) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return d.toLocaleDateString();
  };

  return (
    <header className="h-16 bg-white border-b border-gray-100/80 flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Left: Greeting/Breadcrumb */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">
          DASHBOARD
        </h1>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-gray-50 rounded-xl px-4 py-2 border border-gray-100 focus-within:border-blue-200 focus-within:ring-2 focus-within:ring-blue-50 transition-all w-56">
          <Search className="w-4 h-4 text-gray-400" />
          <input 
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-sm ml-2 w-full text-gray-600 placeholder:text-gray-400"
          />
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
            <button 
              onClick={handleOpenDropdown}
              className="relative p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200 btn-press"
            >
              <Bell className="w-[18px] h-[18px]" />
              {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-[18px] h-[18px] bg-red-500 rounded-full ring-2 ring-white flex items-center justify-center text-[9px] font-bold text-white shadow-sm px-1">
                      {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
              )}
            </button>
            {isNotificationOpen && (
                <div className="absolute top-full right-0 mt-2 w-[340px] bg-white rounded-2xl shadow-xl border border-gray-100/80 text-sm z-50 animate-dropdown-in overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100/60">
                        <h4 className="font-semibold text-gray-900 text-sm">Notifications</h4>
                        {notifications.length > 0 && (
                            <button onClick={handleClearAll} className="text-[11px] text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1">
                                <Trash2 className="w-3 h-3" /> Clear all
                            </button>
                        )}
                    </div>
                    <div className="max-h-80 overflow-y-auto scrollbar-hide divide-y divide-gray-50">
                        {notifications.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-10 px-4">
                                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                                    <Bell className="w-5 h-5 text-gray-300" />
                                </div>
                                <p className="text-sm font-medium text-gray-400">All caught up!</p>
                                <p className="text-[11px] text-gray-300 mt-0.5">No new notifications</p>
                            </div>
                        ) : (
                            notifications.map(n => (
                                <div key={n.id} className="px-4 py-3 hover:bg-gray-50/60 transition-colors flex gap-3 items-start">
                                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${!n.isRead ? 'bg-blue-500' : 'bg-gray-200'}`} />
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-[13px] font-medium ${!n.isRead ? 'text-gray-900' : 'text-gray-600'} line-clamp-1`}>{n.title}</p>
                                        <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-2">{n.message}</p>
                                        <p className="text-[10px] text-gray-300 mt-1">{formatTime(n.createdAt)}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-gray-100 hidden md:block" />

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2.5 hover:bg-gray-50 p-1.5 pr-3 rounded-xl transition-all duration-200 border border-transparent hover:border-gray-100"
          >
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <Image
                src={session?.user?.image || `https://ui-avatars.com/api/?name=${session?.user?.name}&background=random`}
                alt="Profile"
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-[13px] font-semibold text-gray-700 leading-none">
                {session?.user?.name}
              </p>
              <p className="text-[10px] text-blue-600 font-medium bg-blue-50 px-1.5 py-0.5 rounded-full inline-block mt-1">
                NGO Admin
              </p>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100/80 py-1.5 animate-dropdown-in">
              <Link href="/dashboard/profile" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                My Profile
              </Link>
              <Link href="/dashboard/settings" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                Settings
              </Link>
              <div className="h-px bg-gray-100 my-1"></div>
              <button 
                onClick={() => signOut({ callbackUrl: '/' })}
                className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 rounded-b-2xl"
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
