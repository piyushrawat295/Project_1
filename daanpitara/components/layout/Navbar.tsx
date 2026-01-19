"use client";

import { useState, useEffect } from "react";
import { Search, Menu, X, SlidersHorizontal } from "lucide-react";
import FilterModal from "./FilterModal";
import { motion } from "framer-motion";
import { useGlobe } from "@/context/GlobeContext";
import Link from 'next/link';

import { usePathname } from 'next/navigation';

import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  // Hooks must be called before any early returns
  
  // Other state hooks
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [showResults, setShowResults] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  
  // Custom hooks
  const { setSelectedLocation, setViewMode, allNgos } = useGlobe();

  // Conditional logic AFTER all hooks
  const isAuthPage = pathname === '/signin' || pathname === '/signup' || pathname === '/forgot-password' || pathname === '/verify-otp';
  const isDashboard = pathname?.startsWith('/dashboard');

  /* Debounce Effect */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Now we can return early if needed
  if (isAuthPage || isDashboard) return null;

  /* 🔍 Filter NGOs from Context */
  // Use allNgos instead of static imported "ngos"
  const filteredNgos = allNgos
    .filter((ngo) => {
      const q = debouncedQuery.trim().toLowerCase();
      
      // Category Filter (Looser match for robustness)
      if (category !== "All" && !ngo.category.includes(category) && ngo.category !== category) return false;

      // If category is "All" and no query, show nothing
      if (category === "All" && !q) return false;

      // Text Match (only if query exists)
      if (q) {
        const textMatch =
          ngo.name.toLowerCase().includes(q) ||
          (ngo.city && ngo.city.toLowerCase().includes(q)) ||
          ngo.state.toLowerCase().includes(q);
        
        if (!textMatch) return false;
      }

      return true;
    })
    .slice(0, 5); // Limit to 5 results

  function handleSelect(ngo: any) { // Using any or explicit type from context
    setSelectedLocation(ngo);
    setViewMode("map");
    setOpen(false);
    setShowResults(false);
    setQuery(""); // Optional: keep or clear query? User request implies specific flow.
                 // Clearing might feel better as the "selection" is done.
                 // But let's keep it consistent.
  }

  function handleSearchSubmit() {
    if (filteredNgos.length > 0) {
      handleSelect(filteredNgos[0]);
    }
  }

  /* Categories derived from data or static */
  const categories = ["All", "Education", "Health", "Environment", "Elderly Care", "Multi-domain"];

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Contact Us", href: "/contact" },
    { label: "Blogs", href: "/blogs" },
    { label: "About Us", href: "/about" },
  ];

  const user = session?.user;
  const dashboardLink = user?.role === 'admin' ? '/admin' : user?.role === 'ngo' ? '/dashboard' : '/';

  if (isAuthPage) return null;

  return (
    <motion.header 
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: -20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
            duration: 0.5
          }
        }
      }}
      className="sticky top-0 z-50 bg-white shadow-sm"
    >
      <div className="mx-auto flex h-[106px] w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 xl:px-[50px]" onClick={() => setShowResults(false)}>
        
        {/* LEFT */}
        <div className="flex items-center gap-6 xl:gap-12">
          
          {/* Logo */}
          <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
          <Link
            href="/"
            className="flex items-center gap-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2"
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
              className="h-20 w-auto object-contain"
            />
          </Link>
          </motion.div>

          {/* Desktop Search & Filter Group */}
          <div className="hidden xl:flex items-center gap-3">
            <motion.div 
              variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
              className="relative z-50" 
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex h-[48px] w-[380px] items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-1 shadow-sm focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all duration-200">
                 
                 {/* Search Icon & Input Container */}
                 <div className="flex-1 flex items-center h-full pl-3 gap-2">
                    <Search className="h-4 w-4 text-gray-400" />
                    <input
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        setShowResults(true);
                      }}
                      onFocus={() => setShowResults(true)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
                      className="flex-1 bg-transparent text-[15px] text-gray-900 outline-none placeholder:text-gray-400"
                      placeholder="Search organizations..."
                      aria-label="Search"
                    />
                 </div>
              </div>

              {/* Dropdown Results */}
              {showResults && (debouncedQuery || category !== "All") && (
                <div className="absolute top-[52px] left-0 w-full bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden py-2 z-50 max-h-[400px] overflow-y-auto">
                  {filteredNgos.length > 0 ? (
                    filteredNgos.map((ngo) => (
                      <div
                        key={ngo.id}
                        onClick={() => handleSelect(ngo)}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-none flex justify-between items-center"
                      >
                        <div>
                          <p className="font-medium text-gray-900">{ngo.name}</p>
                          <p className="text-sm text-gray-500">{ngo.city}, {ngo.state}</p>
                        </div>
                        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                          {ngo.category}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-gray-500 text-sm">No results found</div>
                  )}
                </div>
              )}
            </motion.div>

            {/* Filter Button (Desktop) */}
            <motion.div 
                variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
            >
               <button 
                  onClick={() => setIsFilterModalOpen(true)}
                  className={`flex items-center gap-2 h-[48px] px-4 rounded-lg border transition-all duration-200 shadow-sm
                     ${category !== 'All' 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-[#E5E7EB] bg-white text-gray-600 hover:bg-gray-50'
                     }`}
               >
                  <span className="text-sm font-medium">Filter</span>
                  <SlidersHorizontal className="h-4 w-4" />
               </button>
            </motion.div>
          </div>
        </div>

        {/* RIGHT - NAV LINKS */}
        <div className="hidden xl:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = link.href === '/' 
              ? pathname === '/' 
              : (pathname?.startsWith(link.href) && (pathname === link.href || pathname[link.href.length] === '/'));

            return (
              <motion.div key={link.label} variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }}>
                <Link
                  href={link.href}
                  className={`text-[16px] font-medium transition-colors relative group ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
              </motion.div>
            );
          })}

          {user ? (
            <div className="relative ml-4">
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
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                      {/* Wait, logout action needs to be called. I can use a button inside form or a server action directly?
                          But Navbar is client side. `logout` action is in `actions/auth.ts` (server).
                          I can import `logout` but passing it to onClick requires it to be safe.
                          Better: use a form with action.
                          Or just a button calling a transition.
                       */}
                      <button 
                         type="submit"
                         className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                         formAction={async () => {
                             // Dynamic import or passed prop?
                             // Since 'logout' is a server action, I can import it if I mark it 'use server'?
                             // But this file is 'use client'.
                             // Server actions can be imported in client components.
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
            <Link href="/signin" className="rounded-md border border-blue-500 px-5 py-2 text-blue-500 hover:bg-blue-50">
              Sign In
            </Link>
          )}

        </div>

        {/* Hamburger */}
        <button
          className="xl:hidden text-black focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="xl:hidden border-t bg-white px-6 py-6 space-y-6">
          
          {/* Mobile Search */}
          {/* Mobile Search & Filter */}
          <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
            <div className="relative flex-1">
               <div className="flex h-[48px] items-center gap-3 rounded-lg border border-[#99A1AF] bg-[#F9FAFB] px-4">
                <Search className="h-5 w-5 text-[#99A1AF]" />
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowResults(true);
                  }}
                   onFocus={() => setShowResults(true)}
                  className="flex-1 bg-transparent text-[16px] outline-none placeholder:text-[#99A1AF]"
                  placeholder="Search..."
                />
              </div>
              
                {/* Mobile Dropdown Results */}
               {showResults && (debouncedQuery || category !== "All") && (
                <div className="absolute top-[52px] left-0 z-50 w-full bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden py-2 max-h-[300px] overflow-y-auto">
                  {filteredNgos.length > 0 ? (
                    filteredNgos.map((ngo) => (
                      <div
                        key={ngo.id}
                        onClick={() => handleSelect(ngo)}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-none"
                      >
                        <p className="font-medium text-gray-900">{ngo.name}</p>
                        <p className="text-sm text-gray-500">{ngo.city}</p>
                      </div>
                    ))
                  ) : (
                     <div className="px-4 py-3 text-gray-500 text-sm">No results found</div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Filter Button */}
            <button 
                onClick={() => setIsFilterModalOpen(true)}
                className={`flex items-center justify-center h-[48px] w-[48px] rounded-lg border transition-all duration-200 shrink-0
                   ${category !== 'All' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-[#99A1AF] bg-[#F9FAFB] text-gray-600 hover:bg-gray-200'
                   }`}
                aria-label="Filter"
             >
                <SlidersHorizontal className="h-5 w-5" />
             </button>
          </div>

          {/* Links */}
          <nav className="space-y-4 text-[16px] text-gray-700">
            {navLinks.map((link) => {
              const isActive = link.href === '/' 
                ? pathname === '/' 
                : (pathname?.startsWith(link.href) && (pathname === link.href || pathname[link.href.length] === '/'));
              
              return (
                <Link 
                  key={link.label}
                  href={link.href} 
                  className={`block ${isActive ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {session ? (
            <Link href={dashboardLink} className="w-full block text-center rounded-md border border-blue-500 px-5 py-2 text-white bg-blue-500">
              Dashboard
            </Link>
          ) : (
            <Link href="/signin" className="w-full block text-center rounded-md border border-blue-500 px-5 py-2 text-blue-500">
              Sign In
            </Link>
          )}
        </div>
      )}
      <FilterModal 
        isOpen={isFilterModalOpen} 
        onClose={() => setIsFilterModalOpen(false)}
        selectedCategory={category}
        onSelectCategory={setCategory}
        onApply={() => {
            setIsFilterModalOpen(false);
            if (category !== "All") setShowResults(true);
        }}
      />
    </motion.header>
  );
}
