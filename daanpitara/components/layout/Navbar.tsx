"use client";

import { useState, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";
import { useGlobe } from "@/context/GlobeContext";
import { ngos } from "@/data/ngos";
import Link from 'next/link';

export default function Navbar({ session }: { session: any }) {
  const [open, setOpen] = useState(false);
  /* 🎯 Search Logic */
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [showResults, setShowResults] = useState(false);

  /* Debounce Effect */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const { setSelectedLocation, setViewMode } = useGlobe();

  /* 🔍 Filter NGOs */
  const filteredNgos = ngos
    .filter((ngo) => {
      const q = debouncedQuery.trim().toLowerCase();
      if (!q) return false;

      // Category Filter
      if (category !== "All" && ngo.category !== category) return false;

      // Text Match
      const textMatch =
        ngo.name.toLowerCase().includes(q) ||
        (ngo.city && ngo.city.toLowerCase().includes(q)) ||
        ngo.state.toLowerCase().includes(q);

      return textMatch;
    })
    .slice(0, 5); // Limit to 5 results

  function handleSelect(ngo: (typeof ngos)[number]) {
    setSelectedLocation(ngo);
    setViewMode("focus");
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

  const dashboardLink = session?.role === 'admin' ? '/admin' : session?.role === 'ngo' ? '/ngo' : '/';

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm" onClick={() => setShowResults(false)}>
      <div className="mx-auto flex h-[106px] w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 xl:px-[50px]">
        
        {/* LEFT */}
        <div className="flex items-center gap-6 xl:gap-[93px]">
          
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
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
              className="h-10 w-10 rounded-full"
            />
            <div>
              <p className="font-semibold text-[16px] leading-none">
                DaanPitara
              </p>
              <p className="text-[12px] text-gray-500">
                Your compassion our code
              </p>
            </div>
          </Link>

          {/* Desktop Search */}
          <div className="relative hidden xl:block" onClick={(e) => e.stopPropagation()}>
            <div className="flex h-[48px] w-[500px] items-center gap-2 rounded-lg border border-[#99A1AF] bg-[#F9FAFB] px-4">
              <Search className="h-5 w-5 text-[#99A1AF]" />
              
              {/* Category Select (Simple) */}
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-transparent text-sm text-gray-600 outline-none border-r border-gray-300 pr-2 cursor-pointer"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>

              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowResults(true);
                }}
                onFocus={() => setShowResults(true)}
                onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
                className="flex-1 bg-transparent text-[16px] text-[#111827] outline-none placeholder:text-[#99A1AF]"
                placeholder="Search NGO, City..."
                aria-label="Search"
              />

              <button
                onClick={handleSearchSubmit}
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Go
              </button>
            </div>

            {/* Dropdown Results */}
            {showResults && debouncedQuery && (
              <div className="absolute top-[52px] left-0 w-full bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden py-2">
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
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-8 text-[16px] text-gray-700">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/services" className="hover:text-blue-600">Services</Link>
          <Link href="/contact" className="hover:text-blue-600">Contact Us</Link>
          <Link href="/blogs" className="hover:text-blue-600">Blogs</Link>
          <Link href="/about" className="hover:text-blue-600">About Us</Link>

          {session ? (
             <Link href={dashboardLink} className="rounded-md border border-blue-500 px-5 py-2 text-white bg-blue-500 hover:bg-blue-600">
                Dashboard
             </Link>
          ) : (
            <Link href="/signin" className="rounded-md border border-blue-500 px-5 py-2 text-blue-500 hover:bg-blue-50">
              Sign In
            </Link>
          )}
        </nav>

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
          <div className="relative" onClick={(e) => e.stopPropagation()}>
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
             {showResults && debouncedQuery && (
              <div className="mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden py-2">
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

          {/* Links */}
          <nav className="space-y-4 text-[16px] text-gray-700">
            <Link href="/" className="block">Home</Link>
            <Link href="/services" className="block">Services</Link>
            <Link href="/contact" className="block">Contact Us</Link>
            <Link href="/blogs" className="block">Blogs</Link>
            <Link href="/about" className="block">About Us</Link>
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
    </header>
  );
}
