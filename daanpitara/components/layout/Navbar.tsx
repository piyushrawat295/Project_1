"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useGlobe } from "@/context/GlobeContext";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  
  const [profileOpen, setProfileOpen] = useState(false);
  
  const { setSelectedLocation, setViewMode } = useGlobe();

  const isAuthPage = pathname === '/signin' || pathname === '/signup' || pathname === '/forgot-password' || pathname === '/verify-otp';
  const isDashboard = pathname?.startsWith('/dashboard');

  if (isAuthPage || isDashboard) return null;

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Contact Us", href: "/contact" },
    { label: "Blogs", href: "/blogs" },
    { label: "About Us", href: "/about" },
  ];

  const user = session?.user;
  const dashboardLink = user?.role === 'admin' ? '/admin' : user?.role === 'ngo' ? '/dashboard' : '/';

  return (
    <header 
      className="sticky top-0 z-50 bg-white shadow-sm w-full"
    >
      <div className="mx-auto flex h-[64px] sm:h-[80px] w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 xl:px-[50px]">
        
        {/* LEFT - Logo */}
        <div className="flex items-center shrink-0">
          <div>
          <Link
            href="/"
            className="flex items-center gap-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
            onClick={() => {
              setViewMode("globe");
              setSelectedLocation(null);
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setViewMode("globe");
                setSelectedLocation(null);
              }
            }}
            aria-label="Reset to globe view"
          >
            <img
              src="/Logo.png"
              alt="DaanPitara"
              className="h-12 sm:h-20 w-auto object-contain"
            />
          </Link>
          </div>
        </div>

        {/* RIGHT - NAV LINKS & AUTH */}
        <div className="flex items-center ml-auto min-w-0 max-w-full pl-1 gap-2 sm:gap-6 xl:gap-8">
          
          {/* Scrollable Links Container */}
          <div className="flex items-center gap-2 sm:gap-6 xl:gap-8 overflow-x-auto no-scrollbar max-w-full flex-1 justify-end sm:justify-start">
            {navLinks.map((link) => {
              const isActive = link.href === '/' 
                ? pathname === '/' 
                : (pathname?.startsWith(link.href) && (pathname === link.href || pathname[link.href.length] === '/'));

              return (
                <div key={link.label} className="shrink-0">
                  <Link
                    href={link.href}
                    className={`text-[13px] sm:text-[16px] font-medium transition-colors relative group whitespace-nowrap ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                  >
                    {link.label === "Contact Us" ? (
                      <>
                        <span className="sm:hidden">Contact</span>
                        <span className="hidden sm:inline">Contact Us</span>
                      </>
                    ) : link.label === "About Us" ? (
                      <>
                        <span className="sm:hidden">About</span>
                        <span className="hidden sm:inline">About Us</span>
                      </>
                    ) : (
                      link.label
                    )}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Fixed User Profile / Sign In Section (Outside Scroll) */}
          <div className="shrink-0">
            {user ? (
              <div className="relative ml-0">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 rounded-full ring-2 ring-gray-100 focus:outline-none focus:ring-blue-500"
                >
                  <div className="h-8 w-8 overflow-hidden rounded-full bg-blue-100 flex items-center justify-center relative">
                      {user.image ? (
                        <img 
                          src={user.image} 
                          alt={user.name || "Profile"} 
                          className="h-full w-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span className="font-semibold text-blue-600">
                          {user.name ? user.name.charAt(0).toUpperCase() : (user.role?.charAt(0).toUpperCase() || 'U')}
                        </span>
                      )}
                  </div>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 capitalize">{user.name || user.role}</p>
                    </div>
                    <Link
                      href={dashboardLink}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setProfileOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <form action="/auth/logout"> 
                        <button 
                          type="submit"
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          formAction={async () => {
                              const { logout } = await import('@/actions/auth');
                              await logout();
                          }}
                        >
                          Sign Out
                        </button>
                    </form>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/signin" className="rounded-md border border-blue-500 px-3 sm:px-5 py-1.5 sm:py-2 text-[13px] sm:text-[16px] text-blue-500 hover:bg-blue-50 shrink-0 whitespace-nowrap">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
